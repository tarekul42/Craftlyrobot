import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { jsonOk, jsonBadRequest, jsonForbidden, jsonTooManyRequests, jsonMethodNotAllowed, jsonInternalError } from "@/lib/api-response";
import { logApiError } from "@/lib/api-error";
import { checkOrigin, corsHeaders } from "@/lib/api-origin";

const earlyAccessSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Please enter your WhatsApp number")
    .max(20, "Number is too long"),
  turnstileToken: z.string().min(1, "Please verify you're human"),
});

const MAX_BODY_SIZE = 10_000;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      ...corsHeaders(),
    },
  });
}

export async function POST(req: Request) {
  if (!checkOrigin(req)) {
    return jsonForbidden();
  }

  const ip = getClientIP(req);

  const limit = await rateLimit(`early-access:${ip}`, {
    limit: 2,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return jsonTooManyRequests(
      "Too many submissions. Please try again tomorrow.",
      Math.ceil((limit.resetAt - Date.now()) / 1000),
    );
  }

  const contentLength = parseInt(req.headers.get("content-length") ?? "0", 10);
  if (contentLength > MAX_BODY_SIZE) {
    return jsonBadRequest("Request too large.");
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonBadRequest("Invalid request body.");
  }

  const result = earlyAccessSchema.safeParse(body);
  if (!result.success) {
    return jsonBadRequest("Validation failed.", result.error.flatten().fieldErrors);
  }

  const data = result.data;

  try {
    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileOk) {
      return jsonBadRequest("Bot verification failed.");
    }

    if (!process.env.DATABASE_URL) {
      console.log("[early-access] (dev mode — not saved)", data.phoneNumber);
      return jsonOk({ saved: false }, { route: "early-access", mode: "dev" });
    }

    await prisma.earlyAccessSignup.create({
      data: {
        phoneNumber: data.phoneNumber,
        ipAddress: ip,
      },
    });

    return jsonOk({ saved: true }, { route: "early-access" });
  } catch (error) {
    logApiError("early-access", error, req);
    return jsonInternalError();
  }
}

export function GET() {
  return jsonMethodNotAllowed(["POST"]);
}

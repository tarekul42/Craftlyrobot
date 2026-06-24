import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { jsonOk, jsonBadRequest, jsonForbidden, jsonTooManyRequests, jsonMethodNotAllowed, jsonInternalError } from "@/lib/api-response";
import { logApiError } from "@/lib/api-error";
import { checkOrigin, corsHeaders } from "@/lib/api-origin";
import crypto from "crypto";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
});

const MAX_BODY_SIZE = 10_000;
const TOKEN_EXPIRY_MS = 48 * 60 * 60 * 1000;

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

  const limit = await rateLimit(`newsletter:${ip}`, {
    limit: 3,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return jsonTooManyRequests(
      "Too many signups. Please try again tomorrow.",
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

  const result = newsletterSchema.safeParse(body);
  if (!result.success) {
    return jsonBadRequest("Validation failed.", result.error.flatten().fieldErrors);
  }

  const { email } = result.data;

  if (!process.env.DATABASE_URL) {
    console.log("[newsletter] (dev mode — not saved)", email);
    return jsonOk({ saved: false }, { route: "newsletter", mode: "dev" });
  }

  try {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return jsonOk({ subscribed: true, isNew: false }, { route: "newsletter" });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        status: "pending",
        token: crypto.randomBytes(32).toString("hex"),
        tokenExpiresAt: new Date(Date.now() + TOKEN_EXPIRY_MS),
      },
    });

    return jsonOk({ subscribed: true, isNew: true }, { route: "newsletter" });
  } catch (error) {
    logApiError("newsletter", error, req);
    return jsonInternalError();
  }
}

export function GET() {
  return jsonMethodNotAllowed(["POST"]);
}

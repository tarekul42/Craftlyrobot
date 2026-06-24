import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
import { jsonOk, jsonBadRequest, jsonForbidden, jsonTooManyRequests, jsonMethodNotAllowed, jsonInternalError } from "@/lib/api-response";
import { logApiError } from "@/lib/api-error";
import crypto from "crypto";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
});

const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "https://craftlyrobot.com";

function checkOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  if (!origin && !referer) return true;
  if (origin && !origin.startsWith(allowedOrigin)) return false;
  if (referer && !referer.startsWith(allowedOrigin)) return false;
  return true;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Headers": "Content-Type",
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

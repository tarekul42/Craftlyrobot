import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";
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

export async function POST(req: Request) {
  if (!checkOrigin(req)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIP(req);

  const limit = await rateLimit(`newsletter:${ip}`, {
    limit: 3,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { message: "Too many signups. Please try again tomorrow." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = newsletterSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { email } = result.data;

  if (!process.env.DATABASE_URL) {
    console.log("[newsletter] (dev mode — not saved)", email);
    return NextResponse.json(
      { ok: true, message: "Thanks! Check your inbox to confirm." },
      { status: 200 },
    );
  }

  try {
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { ok: true, message: "You're already subscribed!" },
        { status: 200 },
      );
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        status: "pending",
        token: crypto.randomBytes(32).toString("hex"),
      },
    });

    return NextResponse.json(
      { ok: true, message: "Thanks! Check your inbox to confirm." },
      { status: 200 },
    );
  } catch (error) {
    console.error("[newsletter] Failed:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } },
  );
}

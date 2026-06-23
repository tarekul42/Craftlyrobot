import { NextResponse } from "next/server";
import { z } from "zod";
import { getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/db";

const earlyAccessSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Please enter your WhatsApp number")
    .max(20, "Number is too long"),
});

export async function POST(req: Request) {
  const ip = getClientIP(req);

  const limit = await rateLimit(`early-access:${ip}`, {
    limit: 2,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { message: "Too many submissions. Please try again tomorrow." },
      { status: 429 },
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

  const result = earlyAccessSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { phoneNumber } = result.data;

  if (!process.env.DATABASE_URL) {
    console.log("[early-access] (dev mode — not saved)", phoneNumber);
    return NextResponse.json(
      { ok: true, message: "You're on the list." },
      { status: 200 },
    );
  }

  try {
    await prisma.earlyAccessSignup.create({
      data: {
        phoneNumber,
        ipAddress: ip,
      },
    });

    return NextResponse.json(
      { ok: true, message: "You're on the list." },
      { status: 200 },
    );
  } catch (error) {
    console.error("[early-access] Failed:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong. Please try again or email hello@craftlyrobot.com.",
      },
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

import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactConfirmation } from "@/lib/email";
import { notifyContactReceived } from "@/lib/slack";
import { saveContactMessage } from "@/lib/db";

/**
 * POST /api/contact
 *
 * Full pipeline:
 *   1. Rate limit (5/hour per IP)
 *   2. Validate with Zod
 *   3. Verify Turnstile
 *   4. Save to database
 *   5. Send confirmation email
 *   6. Notify team via Slack
 */
export async function POST(req: Request) {
  const ip = getClientIP(req);

  const limit = await rateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { message: "Too many messages. Please try again later." },
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

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = result.data;

  try {
    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileOk) {
      return NextResponse.json(
        { message: "Bot verification failed." },
        { status: 400 },
      );
    }
    const saved = await saveContactMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip,
    });

    await sendContactConfirmation(data.email, data.name);
    await notifyContactReceived({
      name: data.name,
      email: data.email,
      subject: data.subject,
    });

    console.log("[contact] Processed:", { id: saved?.id, name: data.name, ip });

    return NextResponse.json(
      { ok: true, message: "Message received." },
      { status: 200 },
    );
  } catch (error) {
    console.error("[contact] Failed:", error);
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

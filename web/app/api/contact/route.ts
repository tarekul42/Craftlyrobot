import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/contact
 *
 * Handles contact form submissions.
 * Pipeline:
 *   1. Rate limit (per IP, 5 per hour)
 *   2. Parse + validate body with Zod
 *   3. Verify Turnstile token server-side
 *   4. Notify the team (TODO: wire to email/Slack)
 *   5. Return success
 */
export async function POST(req: Request) {
  // 1. Rate limit — 5 messages per IP per hour
  const ip = getClientIP(req);
  const limit = rateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  });
  if (!limit.success) {
    return NextResponse.json(
      {
        message: "Too many messages. Please try again later.",
        retryAt: new Date(limit.resetAt).toISOString(),
      },
      { status: 429 }
    );
  }

  // 2. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  // 3. Validate with Zod
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        message: "Validation failed.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = result.data;

  // 4. Verify Turnstile
  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { message: "Bot verification failed. Please try again." },
      { status: 400 }
    );
  }

  // 5. Process
  try {
    // TODO: Wire up when backend is ready:
    //   - Send email to team (hello@craftlyrobot.com)
    //   - Send confirmation email to sender
    //   - Log to database for tracking
    console.log("[contact] New message:", {
      name: data.name,
      email: data.email,
      subject: data.subject,
      messageLength: data.message.length,
      submittedAt: new Date().toISOString(),
      ip,
    });

    return NextResponse.json(
      { ok: true, message: "Message received." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact] Submission failed:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong on our end. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

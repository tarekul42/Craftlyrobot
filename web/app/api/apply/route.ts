import { NextResponse } from "next/server";
import { applySchema } from "@/lib/validations/apply";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { sendApplicationConfirmation } from "@/lib/email";
import { notifyApplicationReceived } from "@/lib/slack";
import { saveApplication } from "@/lib/db";

/**
 * POST /api/apply
 *
 * Full pipeline:
 *   1. Rate limit (1/day per IP)
 *   2. Validate with Zod
 *   3. Verify Turnstile
 *   4. Save to database (if DATABASE_URL set)
 *   5. Send confirmation email
 *   6. Notify team via Slack
 */
export async function POST(req: Request) {
  const ip = getClientIP(req);

  const limit = rateLimit(`apply:${ip}`, {
    limit: 1,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      {
        message: "You've already submitted an application. Please wait 24 hours.",
        retryAt: new Date(limit.resetAt).toISOString(),
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const result = applySchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { message: "Validation failed.", errors: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = result.data;

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json({ message: "Bot verification failed." }, { status: 400 });
  }

  try {
    const saved = await saveApplication({
      fullName: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      role: data.role,
      department: data.department,
      commitment: data.commitment,
      skills: data.skills,
      portfolio: data.portfolio,
      whyCraftly: data.whyCraftly,
      ip,
    });

    await sendApplicationConfirmation(data.email, data.fullName);
    await notifyApplicationReceived({
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      department: data.department,
      commitment: data.commitment,
      skillsCount: data.skills.length,
    });

    console.log("[apply] Processed:", { id: saved?.id, name: data.fullName, ip });

    return NextResponse.json({ ok: true, message: "Application received." }, { status: 200 });
  } catch (error) {
    console.error("[apply] Failed:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again or email hello@craftlyrobot.com." },
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

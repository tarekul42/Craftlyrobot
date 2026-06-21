import { NextResponse } from "next/server";
import { applySchema } from "@/lib/validations/apply";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/apply
 *
 * Handles contributor application submissions.
 * Pipeline:
 *   1. Rate limit (per IP, 1 per day)
 *   2. Parse + validate body with Zod
 *   3. Verify Turnstile token server-side
 *   4. Store / notify (TODO: wire to database + email)
 *   5. Return success
 *
 * Security:
 *   - Server-side validation (NEVER trust client)
 *   - Rate limiting per IP
 *   - Bot protection via Turnstile
 *   - No secrets in response
 */
export async function POST(req: Request) {
  // 1. Rate limit — 1 application per IP per day
  const ip = getClientIP(req);
  const limit = rateLimit(`apply:${ip}`, {
    limit: 1,
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
  });
  if (!limit.success) {
    return NextResponse.json(
      {
        message:
          "You've already submitted an application. Please wait 24 hours before trying again.",
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
  const result = applySchema.safeParse(body);
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

  // 5. Process the submission
  try {
    // TODO: Wire up the following when backend is ready:
    //   - Save to database (Postgres via Prisma or Drizzle)
    //   - Send confirmation email to applicant
    //   - Notify the team (Slack webhook or internal email)
    //
    // For now, log it (server-side only, never exposed to client)
    console.log("[apply] New application:", {
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      department: data.department,
      commitment: data.commitment,
      skillsCount: data.skills.length,
      hasPortfolio: !!data.portfolio,
      whyCraftlyLength: data.whyCraftly.length,
      submittedAt: new Date().toISOString(),
      ip,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Application received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[apply] Submission failed:", error);
    return NextResponse.json(
      {
        message:
          "Something went wrong on our end. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/apply — method not allowed.
 * Prevents accidental exposure of application data.
 */
export function GET() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST." },
    { status: 405, headers: { Allow: "POST" } }
  );
}

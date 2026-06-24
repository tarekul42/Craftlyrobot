import { NextResponse } from "next/server";
import { applySchema } from "@/lib/validations/apply";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { sendApplicationConfirmation } from "@/lib/email";
import { notifyApplicationReceived } from "@/lib/slack";
import { saveApplication } from "@/lib/db";

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

  const limit = await rateLimit(`apply:${ip}`, {
    limit: 1,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return NextResponse.json(
      {
        message:
          "You've already submitted an application. Please wait 24 hours.",
        retryAt: new Date(limit.resetAt).toISOString(),
      },
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

  const result = applySchema.safeParse(body);
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

    if (!saved) {
      console.warn("[apply] DB save returned null — skipping email/Slack notifications");
    } else {
      await sendApplicationConfirmation(data.email, data.fullName);
      await notifyApplicationReceived({
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        department: data.department,
        commitment: data.commitment,
        skillsCount: data.skills.length,
      });
    }

    console.log("[apply] Processed:", {
      id: saved?.id,
      name: data.fullName,
      ip,
    });

    return NextResponse.json(
      { ok: true, message: "Application received." },
      { status: 200 },
    );
  } catch (error) {
    console.error("[apply] Failed:", error);
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

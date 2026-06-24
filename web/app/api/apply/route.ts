import { NextResponse } from "next/server";
import { applySchema } from "@/lib/validations/apply";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { sendApplicationConfirmation } from "@/lib/email";
import { notifyApplicationReceived } from "@/lib/slack";
import { saveApplication } from "@/lib/db";
import { jsonOk, jsonBadRequest, jsonForbidden, jsonTooManyRequests, jsonMethodNotAllowed, jsonInternalError } from "@/lib/api-response";
import { logApiError } from "@/lib/api-error";

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

  const limit = await rateLimit(`apply:${ip}`, {
    limit: 1,
    windowMs: 24 * 60 * 60 * 1000,
  });
  if (!limit.success) {
    return jsonTooManyRequests(
      "You've already submitted an application. Please wait 24 hours.",
      Math.ceil((limit.resetAt - Date.now()) / 1000),
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonBadRequest("Invalid request body.");
  }

  const result = applySchema.safeParse(body);
  if (!result.success) {
    return jsonBadRequest("Validation failed.", result.error.flatten().fieldErrors);
  }

  const data = result.data;

  try {
    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileOk) {
      return jsonBadRequest("Bot verification failed.");
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

    return jsonOk({ id: saved?.id }, { route: "apply" });
  } catch (error) {
    logApiError("apply", error, req);
    return jsonInternalError();
  }
}

export function GET() {
  return jsonMethodNotAllowed(["POST"]);
}

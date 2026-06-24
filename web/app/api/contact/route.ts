import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactConfirmation } from "@/lib/email";
import { notifyContactReceived } from "@/lib/slack";
import { saveContactMessage } from "@/lib/db";
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

  const limit = await rateLimit(`contact:${ip}`, {
    limit: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!limit.success) {
    return jsonTooManyRequests(
      "Too many messages. Please try again later.",
      Math.ceil((limit.resetAt - Date.now()) / 1000),
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonBadRequest("Invalid request body.");
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return jsonBadRequest("Validation failed.", result.error.flatten().fieldErrors);
  }

  const data = result.data;

  try {
    const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileOk) {
      return jsonBadRequest("Bot verification failed.");
    }

    const saved = await saveContactMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip,
    });

    if (!saved) {
      console.warn("[contact] DB save returned null — skipping email/Slack notifications");
    } else {
      await sendContactConfirmation(data.email, data.name);
      await notifyContactReceived({
        name: data.name,
        email: data.email,
        subject: data.subject,
      });
    }

    return jsonOk({ id: saved?.id }, { route: "contact" });
  } catch (error) {
    logApiError("contact", error, req);
    return jsonInternalError();
  }
}

export function GET() {
  return jsonMethodNotAllowed(["POST"]);
}

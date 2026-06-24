import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contact";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { sendContactConfirmation } from "@/lib/email";
import { notifyContactReceived } from "@/lib/slack";
import { saveContactMessage } from "@/lib/db";
import { jsonOk, jsonBadRequest, jsonForbidden, jsonTooManyRequests, jsonMethodNotAllowed, jsonInternalError } from "@/lib/api-response";
import { logApiError } from "@/lib/api-error";
import { checkOrigin, corsHeaders } from "@/lib/api-origin";
import { checkIdempotency, getIdempotencyKey } from "@/lib/idempotency";

const MAX_BODY_SIZE = 100_000;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      ...corsHeaders(),
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

  const idempotencyKey = getIdempotencyKey(req);
  if (idempotencyKey && !checkIdempotency(`contact:${idempotencyKey}`)) {
    return jsonTooManyRequests("This request was already submitted. Please wait a few minutes.", 60);
  }

  const contentLength = parseInt(req.headers.get("content-length") ?? "0", 10);
  if (contentLength > MAX_BODY_SIZE) {
    return jsonBadRequest("Request too large.");
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

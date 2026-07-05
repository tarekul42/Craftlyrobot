import { NextResponse } from "next/server";
import type { z } from "zod";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import {
  jsonBadRequest,
  jsonForbidden,
  jsonTooManyRequests,
  jsonMethodNotAllowed,
  jsonInternalError,
} from "@/lib/api-response";
import { logApiError } from "@/lib/api-error";
import { checkOrigin, corsHeaders } from "@/lib/api-origin";
import { checkIdempotency, getIdempotencyKey } from "@/lib/idempotency";

interface RateLimitConfig {
  limit: number;
  windowMs: number;
  message?: string;
}

export interface ApiHandlerOptions<T extends z.ZodType> {
  schema: T;
  rateLimit: RateLimitConfig;
  turnstile?: boolean;
  idempotency?: boolean;
  maxBodySize?: number;
  routeName: string;
  handler: (ctx: {
    data: z.infer<T>;
    ip: string;
    req: Request;
  }) => Promise<Response>;
}

const DEFAULT_MAX_BODY_SIZE = 100_000;

function getRetryAfterSeconds(resetAt: number): number {
  return Math.ceil((resetAt - Date.now()) / 1000);
}

function checkBodySize(req: Request, maxBodySize: number): Response | null {
  const contentLength = parseInt(req.headers.get("content-length") ?? "0", 10);
  return contentLength > maxBodySize
    ? jsonBadRequest("Request too large.")
    : null;
}

async function parseBody(
  req: Request,
): Promise<{ body: unknown } | { error: Response }> {
  try {
    const body = await req.json();
    return { body };
  } catch {
    return { error: jsonBadRequest("Invalid request body.") };
  }
}

function validateBody<T extends z.ZodType>(
  schema: T,
  body: unknown,
): { data: z.infer<T> } | { error: Response } {
  const result = schema.safeParse(body);
  if (!result.success) {
    const flattened = result.error.flatten();
    const fieldErrors = flattened.fieldErrors as
      | Record<string, string[]>
      | undefined;
    return { error: jsonBadRequest("Validation failed.", fieldErrors) };
  }
  return { data: result.data };
}

async function checkTurnstile(
  body: Record<string, unknown>,
  ip: string,
): Promise<Response | null> {
  const token = body.turnstileToken;
  if (typeof token !== "string" || token.length === 0) {
    return jsonBadRequest("Please verify you're human.");
  }
  const turnstileOk = await verifyTurnstile(token, ip);
  return turnstileOk ? null : jsonBadRequest("Bot verification failed.");
}

export function createApiHandler<T extends z.ZodType>(
  options: ApiHandlerOptions<T>,
) {
  const {
    schema,
    rateLimit: rateLimitCfg,
    turnstile = false,
    idempotency = false,
    maxBodySize = DEFAULT_MAX_BODY_SIZE,
    routeName,
    handler,
  } = options;

  return {
    OPTIONS() {
      return new NextResponse(null, {
        status: 204,
        headers: {
          Allow: "POST, OPTIONS",
          ...corsHeaders(),
        },
      });
    },

    GET() {
      return jsonMethodNotAllowed(["POST"]);
    },

    async POST(req: Request) {
      if (!checkOrigin(req)) {
        return jsonForbidden();
      }

      const ip = getClientIP(req);

      const limit = await rateLimit(`${routeName}:${ip}`, {
        limit: rateLimitCfg.limit,
        windowMs: rateLimitCfg.windowMs,
      });
      if (!limit.success) {
        return jsonTooManyRequests(
          rateLimitCfg.message ?? "Too many requests. Please try again later.",
          getRetryAfterSeconds(limit.resetAt),
        );
      }

      if (idempotency) {
        const idempotencyKey = getIdempotencyKey(req);
        if (
          idempotencyKey &&
          !checkIdempotency(`${routeName}:${idempotencyKey}`)
        ) {
          return jsonTooManyRequests(
            "This request was already submitted. Please wait a few minutes.",
            60,
          );
        }
      }

      const sizeError = checkBodySize(req, maxBodySize);
      if (sizeError) return sizeError;

      const parsed = await parseBody(req);
      if ("error" in parsed) return parsed.error;

      const validated = validateBody(schema, parsed.body);
      if ("error" in validated) return validated.error;

      const data = validated.data;

      try {
        if (turnstile) {
          const turnstileError = await checkTurnstile(
            data as unknown as Record<string, unknown>,
            ip,
          );
          if (turnstileError) return turnstileError;
        }

        return await handler({ data, ip, req });
      } catch (error) {
        logApiError(routeName, error, req);
        return jsonInternalError();
      }
    },
  };
}

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
          rateLimitCfg.message ??
            "Too many requests. Please try again later.",
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

      const contentLength = parseInt(
        req.headers.get("content-length") ?? "0",
        10,
      );
      if (contentLength > maxBodySize) {
        return jsonBadRequest("Request too large.");
      }

      let body: unknown;
      try {
        body = await req.json();
      } catch {
        return jsonBadRequest("Invalid request body.");
      }

      const result = schema.safeParse(body);
      if (!result.success) {
        const flattened = result.error.flatten();
        const fieldErrors = flattened.fieldErrors as Record<string, string[]> | undefined;
        return jsonBadRequest("Validation failed.", fieldErrors);
      }

      const data = result.data;

      try {
        if (turnstile) {
          const token = (data as Record<string, unknown>).turnstileToken;
          if (typeof token !== "string" || token.length === 0) {
            return jsonBadRequest("Please verify you're human.");
          }
          const turnstileOk = await verifyTurnstile(token, ip);
          if (!turnstileOk) {
            return jsonBadRequest("Bot verification failed.");
          }
        }

        return await handler({ data, ip, req });
      } catch (error) {
        logApiError(routeName, error, req);
        return jsonInternalError();
      }
    },
  };
}

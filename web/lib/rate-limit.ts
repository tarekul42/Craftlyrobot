/**
 * Simple in-memory rate limiter for development.
 *
 * ⚠️ WARNING: This does NOT work in production with multiple server instances
 * (each instance has its own memory). For production, use Upstash Ratelimit:
 *
 *   import { Ratelimit } from "@upstash/ratelimit";
 *   import { Redis } from "@upstash/redis";
 *   export const ratelimit = new Ratelimit({
 *     redis: Redis.fromEnv(),
 *     limiter: Ratelimit.slidingWindow(5, "1 h"),
 *   });
 *
 * For now, this in-memory version works for single-instance deployments
 * (Vercel preview, single VPS, local dev).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(
    () => {
      const now = Date.now();
      for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now) store.delete(key);
      }
    },
    5 * 60 * 1000,
  ).unref?.();
}

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check if a key (usually IP) is within the rate limit.
 * Increments the counter on each call.
 */
export function rateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    // First request or window expired
    const entry: RateLimitEntry = {
      count: 1,
      resetAt: now + options.windowMs,
    };
    store.set(key, entry);
    return {
      success: true,
      remaining: options.limit - 1,
      resetAt: entry.resetAt,
    };
  }

  if (existing.count >= options.limit) {
    return {
      success: false,
      remaining: 0,
      resetAt: existing.resetAt,
    };
  }

  existing.count += 1;
  return {
    success: true,
    remaining: options.limit - existing.count,
    resetAt: existing.resetAt,
  };
}

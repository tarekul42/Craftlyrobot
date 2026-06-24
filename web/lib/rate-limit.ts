interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

let upstashRatelimit: {
  limit: (key: string) => Promise<{ success: boolean; remaining: number; reset: number }>;
} | null = null;

async function getUpstashRatelimit(options: RateLimitOptions) {
  if (upstashRatelimit) return upstashRatelimit;
  try {
    const { Ratelimit } = await import("@upstash/ratelimit");
    const { Redis } = await import("@upstash/redis");
    if (process.env.UPSTASH_REDIS_REST_URL) {
      upstashRatelimit = new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(options.limit, `${options.windowMs}ms`),
        analytics: true,
        prefix: process.env.KV_PREFIX ?? "craftly",
      });
      return upstashRatelimit;
    }
  } catch {
    // @upstash packages not installed — fall back to in-memory
  }
  return null;
}

const STORE_MAX = 10000;
const store = new Map<string, { count: number; resetAt: number }>();

let cleanupInterval: ReturnType<typeof setInterval> | null = null;

function startCleanup() {
  if (cleanupInterval || typeof setInterval === "undefined") return;
  cleanupInterval = setInterval(
    () => {
      const now = Date.now();
      for (const [key, entry] of store.entries()) {
        if (entry.resetAt < now) store.delete(key);
      }
      if (store.size > STORE_MAX) {
        const entries = [...store.entries()].sort(
          (a, b) => a[1].resetAt - b[1].resetAt,
        );
        const toDelete = entries.slice(0, store.size - STORE_MAX);
        for (const [key] of toDelete) store.delete(key);
      }
    },
    5 * 60 * 1000,
  );
  if (typeof cleanupInterval?.unref === "function") cleanupInterval.unref();
}

startCleanup();

export async function rateLimit(
  key: string,
  options: RateLimitOptions,
): Promise<RateLimitResult> {
  const upstash = await getUpstashRatelimit(options);
  if (upstash) {
    const result = await upstash.limit(key);
    return {
      success: result.success,
      remaining: result.remaining,
      resetAt: result.reset * 1000,
    };
  }

  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.resetAt < now) {
    const entry = { count: 1, resetAt: now + options.windowMs };
    store.set(key, entry);
    return { success: true, remaining: options.limit - 1, resetAt: entry.resetAt };
  }

  if (existing.count >= options.limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { success: true, remaining: options.limit - existing.count, resetAt: existing.resetAt };
}

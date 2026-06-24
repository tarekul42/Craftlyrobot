const IDEMPOTENCY_TTL = 5 * 60 * 1000;

const store = new Map<string, number>();

let cleanupInterval: ReturnType<typeof setInterval> | null = null;

function startCleanup() {
  if (cleanupInterval || typeof setInterval === "undefined") return;
  cleanupInterval = setInterval(() => {
    const now = Date.now();
    for (const [key, expiresAt] of store.entries()) {
      if (expiresAt < now) store.delete(key);
    }
  }, 60_000);
  if (typeof cleanupInterval?.unref === "function") cleanupInterval.unref();
}

startCleanup();

export function checkIdempotency(key: string): boolean {
  const now = Date.now();
  if (store.has(key)) {
    const expiresAt = store.get(key)!;
    if (expiresAt > now) return false;
    store.delete(key);
  }
  store.set(key, now + IDEMPOTENCY_TTL);
  return true;
}

export function getIdempotencyKey(req: Request): string | null {
  return req.headers.get("Idempotency-Key");
}

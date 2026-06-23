import { describe, it, expect } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  it("allows first request", async () => {
    const result = await rateLimit("test:1", { limit: 3, windowMs: 60000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks after limit is exceeded", async () => {
    const key = `test:block:${Date.now()}`;
    await rateLimit(key, { limit: 2, windowMs: 60000 });
    await rateLimit(key, { limit: 2, windowMs: 60000 });
    const result = await rateLimit(key, { limit: 2, windowMs: 60000 });
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("allows request after reset", async () => {
    const key = `test:reset:${Date.now()}`;
    await rateLimit(key, { limit: 1, windowMs: 1 });
    await new Promise((r) => setTimeout(r, 5));
    const result = await rateLimit(key, { limit: 1, windowMs: 1 });
    expect(result.success).toBe(true);
  });

  it("returns zero remaining when exhausted", async () => {
    const key = `test:exhausted:${Date.now()}`;
    await rateLimit(key, { limit: 1, windowMs: 60000 });
    const result = await rateLimit(key, { limit: 1, windowMs: 60000 });
    expect(result.remaining).toBe(0);
  });

  it("tracks remaining correctly", async () => {
    const key = `test:remaining:${Date.now()}`;
    const r1 = await rateLimit(key, { limit: 5, windowMs: 60000 });
    expect(r1.remaining).toBe(4);
    const r2 = await rateLimit(key, { limit: 5, windowMs: 60000 });
    expect(r2.remaining).toBe(3);
  });
});

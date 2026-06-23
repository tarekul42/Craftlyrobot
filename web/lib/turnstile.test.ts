import { describe, it, expect } from "vitest";
import { getClientIP } from "./turnstile";

describe("getClientIP", () => {
  it("extracts IP from x-forwarded-for", () => {
    const req = new Request("https://example.com", {
      headers: { "x-forwarded-for": "203.0.113.1, 10.0.0.1" },
    });
    expect(getClientIP(req)).toBe("203.0.113.1");
  });

  it("falls back to x-real-ip", () => {
    const req = new Request("https://example.com", {
      headers: { "x-real-ip": "198.51.100.2" },
    });
    expect(getClientIP(req)).toBe("198.51.100.2");
  });

  it("returns unknown when no IP header found", () => {
    const req = new Request("https://example.com");
    expect(getClientIP(req)).toBe("unknown");
  });
});

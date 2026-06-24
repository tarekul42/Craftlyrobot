import { describe, it, expect, beforeEach } from "vitest";
import { checkOrigin } from "./api-origin";

beforeEach(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://craftlyrobot.com";
});

function createRequest(overrides?: {
  origin?: string;
  referer?: string;
}): Request {
  const headers: Record<string, string> = {};
  if (overrides?.origin) headers["origin"] = overrides.origin;
  if (overrides?.referer) headers["referer"] = overrides.referer;
  return new Request("https://craftlyrobot.com/api/apply", { headers });
}

describe("checkOrigin", () => {
  it("allows requests with matching origin", () => {
    const req = createRequest({ origin: "https://craftlyrobot.com" });
    expect(checkOrigin(req)).toBe(true);
  });

  it("allows requests with matching referer", () => {
    const req = createRequest({ referer: "https://craftlyrobot.com/apply" });
    expect(checkOrigin(req)).toBe(true);
  });

  it("allows requests with no origin or referer", () => {
    const req = createRequest();
    expect(checkOrigin(req)).toBe(true);
  });

  it("rejects requests with mismatched origin", () => {
    const req = createRequest({ origin: "https://evil.com" });
    expect(checkOrigin(req)).toBe(false);
  });

  it("rejects requests with origin that only starts with allowed", () => {
    const req = createRequest({ origin: "https://craftlyrobot.com.evil.com" });
    expect(checkOrigin(req)).toBe(false);
  });

  it("rejects requests with mismatched referer", () => {
    const req = createRequest({ referer: "https://evil.com/apply" });
    expect(checkOrigin(req)).toBe(false);
  });

  it("rejects requests with referer that only starts with allowed", () => {
    const req = createRequest({ referer: "https://craftlyrobot.com.evil.com/apply" });
    expect(checkOrigin(req)).toBe(false);
  });

  it("rejects malformed origin", () => {
    const req = createRequest({ origin: "not-a-url" });
    expect(checkOrigin(req)).toBe(false);
  });

  it("rejects malformed referer", () => {
    const req = createRequest({ referer: "not-a-url" });
    expect(checkOrigin(req)).toBe(false);
  });
});

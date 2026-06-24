import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstile: vi.fn().mockResolvedValue(true),
  getClientIP: vi.fn().mockReturnValue("127.0.0.1"),
}));

vi.mock("@/lib/rate-limit", () => ({
  rateLimit: vi.fn().mockResolvedValue({ success: true, remaining: 99, resetAt: Date.now() + 60000 }),
}));

vi.mock("@/lib/db", () => ({
  prisma: {
    newsletterSubscriber: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
    earlyAccessSignup: {
      create: vi.fn(),
    },
  },
  saveApplication: vi.fn(),
  saveContactMessage: vi.fn(),
}));

vi.mock("@/lib/email", () => ({
  sendApplicationConfirmation: vi.fn().mockResolvedValue(undefined),
  sendContactConfirmation: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/slack", () => ({
  notifyApplicationReceived: vi.fn().mockResolvedValue(undefined),
  notifyContactReceived: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/api-error", () => ({
  logApiError: vi.fn(),
}));

import { POST as applyPOST, GET as applyGET, OPTIONS as applyOPTIONS } from "@/app/api/apply/route";
import { POST as contactPOST, GET as contactGET, OPTIONS as contactOPTIONS } from "@/app/api/contact/route";
import { POST as newsletterPOST, GET as newsletterGET, OPTIONS as newsletterOPTIONS } from "@/app/api/newsletter/route";
import { POST as earlyAccessPOST, GET as earlyAccessGET, OPTIONS as earlyAccessOPTIONS } from "@/app/api/early-access/route";
import { verifyTurnstile, getClientIP } from "@/lib/turnstile";
import { rateLimit } from "@/lib/rate-limit";
import { saveApplication, saveContactMessage } from "@/lib/db";

function mockRequest(method: string, path: string, options?: {
  body?: unknown;
  origin?: string;
  headers?: Record<string, string>;
}): Request {
  const headers = new Headers({
    "content-type": "application/json",
    ...(options?.origin ? { origin: options.origin } : {}),
    ...options?.headers,
  });
  if (options?.origin) headers.set("origin", options.origin);
  const body = options?.body !== undefined ? JSON.stringify(options.body) : undefined;
  if (body) headers.set("content-length", String(new TextEncoder().encode(body).length));
  return new Request(`http://localhost${path}`, {
    method,
    headers,
    body,
  });
}

const validApplyBody = {
  fullName: "Jane Doe",
  email: "jane@example.com",
  whatsapp: "+1234567890",
  role: "frontend",
  department: "engineering",
  commitment: "fulltime",
  skills: ["React", "TypeScript"],
  portfolio: "",
  whyCraftly: "I love this project because it represents exactly what I want to build. The vision and the team are incredible.",
  turnstileToken: "valid-token",
};

const validContactBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Hello",
  message: "This is a test message. I want to say hello and learn more about this amazing project.",
  turnstileToken: "valid-token",
};

describe("API routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_SITE_URL = "http://localhost";
    process.env.DATABASE_URL = "postgresql://localhost:5432/test";
  });

  describe("OPTIONS", () => {
    it.each([
      ["apply", applyOPTIONS],
      ["contact", contactOPTIONS],
      ["newsletter", newsletterOPTIONS],
      ["early-access", earlyAccessOPTIONS],
    ])("%s returns 204 with CORS headers", async (_, handler) => {
      const res = await handler();
      expect(res.status).toBe(204);
      expect(res.headers.get("Access-Control-Allow-Origin")).toBe("http://localhost");
      expect(res.headers.get("Access-Control-Allow-Methods")).toContain("POST");
    });
  });

  describe("GET", () => {
    it.each([
      ["apply", applyGET],
      ["contact", contactGET],
      ["newsletter", newsletterGET],
      ["early-access", earlyAccessGET],
    ])("%s returns 405", async (_, handler) => {
      const res = await handler();
      expect(res.status).toBe(405);
      const body = await res.json();
      expect(body.ok).toBe(false);
      expect(body.code).toBe("METHOD_NOT_ALLOWED");
    });
  });

  describe("POST apply", () => {
    it("rejects missing origin", async () => {
      const req = mockRequest("POST", "/api/apply", {
        body: validApplyBody,
        origin: "https://evil.com",
      });
      const res = await applyPOST(req);
      expect(res.status).toBe(403);
    });

    it("rejects large body", async () => {
      const bigBody = { ...validApplyBody, whyCraftly: "x".repeat(200_000) };
      const req = mockRequest("POST", "/api/apply", { body: bigBody });
      const res = await applyPOST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.message).toContain("large");
    });

    it("rejects missing body fields", async () => {
      const req = mockRequest("POST", "/api/apply", { body: {} });
      const res = await applyPOST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.ok).toBe(false);
    });

    it("rejects when rate limited", async () => {
      vi.mocked(rateLimit).mockResolvedValueOnce({ success: false, remaining: 0, resetAt: Date.now() + 60000 });
      const req = mockRequest("POST", "/api/apply", { body: validApplyBody });
      const res = await applyPOST(req);
      expect(res.status).toBe(429);
    });

    it("rejects when Turnstile fails", async () => {
      vi.mocked(verifyTurnstile).mockResolvedValueOnce(false);
      const req = mockRequest("POST", "/api/apply", { body: validApplyBody });
      const res = await applyPOST(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.message).toBe("Bot verification failed.");
    });

    it("accepts valid submission", async () => {
      vi.mocked(saveApplication).mockResolvedValueOnce({ id: "app-1" });
      const req = mockRequest("POST", "/api/apply", { body: validApplyBody });
      const res = await applyPOST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(body.data.id).toBe("app-1");
    });

    it("accepts valid submission with idempotency key", async () => {
      vi.mocked(saveApplication).mockResolvedValueOnce({ id: "app-2" });
      const req = mockRequest("POST", "/api/apply", {
        body: validApplyBody,
        headers: { "Idempotency-Key": "unique-key" },
      });
      const res = await applyPOST(req);
      expect(res.status).toBe(200);
    });
  });

  describe("POST contact", () => {
    it("rejects missing origin", async () => {
      const req = mockRequest("POST", "/api/contact", {
        body: validContactBody,
        origin: "https://evil.com",
      });
      const res = await contactPOST(req);
      expect(res.status).toBe(403);
    });

    it("rejects missing body fields", async () => {
      const req = mockRequest("POST", "/api/contact", { body: { email: "bad" } });
      const res = await contactPOST(req);
      expect(res.status).toBe(400);
    });

    it("accepts valid submission", async () => {
      vi.mocked(saveContactMessage).mockResolvedValueOnce({ id: "msg-1" });
      const req = mockRequest("POST", "/api/contact", { body: validContactBody });
      const res = await contactPOST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(body.data.id).toBe("msg-1");
    });
  });

  describe("POST newsletter", () => {
    it("rejects missing origin", async () => {
      const req = mockRequest("POST", "/api/newsletter", {
        body: { email: "jane@example.com" },
        origin: "https://evil.com",
      });
      const res = await newsletterPOST(req);
      expect(res.status).toBe(403);
    });

    it("rejects invalid email", async () => {
      const req = mockRequest("POST", "/api/newsletter", { body: { email: "bad" } });
      const res = await newsletterPOST(req);
      expect(res.status).toBe(400);
    });

    it("accepts new subscription", async () => {
      const prisma = (await import("@/lib/db")).prisma;
      vi.mocked(prisma.newsletterSubscriber.findUnique).mockResolvedValueOnce(null);
      vi.mocked(prisma.newsletterSubscriber.create).mockResolvedValueOnce({
        id: "sub-1",
        email: "jane@example.com",
        status: "pending",
        token: "abc123",
        tokenExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const req = mockRequest("POST", "/api/newsletter", { body: { email: "jane@example.com" } });
      const res = await newsletterPOST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(body.data.isNew).toBe(true);
    });

    it("returns existing subscriber without duplicate", async () => {
      const prisma = (await import("@/lib/db")).prisma;
      vi.mocked(prisma.newsletterSubscriber.findUnique).mockResolvedValueOnce({
        id: "sub-1",
        email: "jane@example.com",
        status: "confirmed",
        token: "abc",
        tokenExpiresAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const req = mockRequest("POST", "/api/newsletter", { body: { email: "jane@example.com" } });
      const res = await newsletterPOST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.data.isNew).toBe(false);
      expect(prisma.newsletterSubscriber.create).not.toHaveBeenCalled();
    });
  });

  describe("POST early-access", () => {
    it("rejects missing origin", async () => {
      const req = mockRequest("POST", "/api/early-access", {
        body: {
          phoneNumber: "+1234567890",
          turnstileToken: "valid-token",
        },
        origin: "https://evil.com",
      });
      const res = await earlyAccessPOST(req);
      expect(res.status).toBe(403);
    });

    it("rejects missing body fields", async () => {
      const req = mockRequest("POST", "/api/early-access", { body: {} });
      const res = await earlyAccessPOST(req);
      expect(res.status).toBe(400);
    });

    it("accepts valid submission", async () => {
      const prisma = (await import("@/lib/db")).prisma;
      vi.mocked(prisma.earlyAccessSignup.create).mockResolvedValueOnce({
        id: "ea-1",
        phoneNumber: "+1234567890",
        ipAddress: "127.0.0.1",
        createdAt: new Date(),
      });
      const req = mockRequest("POST", "/api/early-access", {
        body: {
          phoneNumber: "+1234567890",
          turnstileToken: "valid-token",
        },
      });
      const res = await earlyAccessPOST(req);
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body.ok).toBe(true);
      expect(body.data.saved).toBe(true);
    });
  });
});

import { z } from "zod";
import { createApiHandler } from "@/lib/api-handler";
import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-response";
import crypto from "crypto";

const newsletterSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
});

const TOKEN_EXPIRY_MS = 48 * 60 * 60 * 1000;

export const { POST, GET, OPTIONS } = createApiHandler({
  schema: newsletterSchema,
  routeName: "newsletter",
  rateLimit: { limit: 3, windowMs: 24 * 60 * 60 * 1000 },
  maxBodySize: 10_000,
  handler: async ({ data }) => {
    const { email } = data;

    if (!process.env.DATABASE_URL) {
      console.log("[newsletter] (dev mode — not saved)", email);
      return jsonOk({ saved: false }, { route: "newsletter", mode: "dev" });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existing) {
      return jsonOk({ subscribed: true, isNew: false }, { route: "newsletter" });
    }

    await prisma.newsletterSubscriber.create({
      data: {
        email,
        status: "pending",
        token: crypto.randomBytes(32).toString("hex"),
        tokenExpiresAt: new Date(Date.now() + TOKEN_EXPIRY_MS),
      },
    });

    return jsonOk({ subscribed: true, isNew: true }, { route: "newsletter" });
  },
});

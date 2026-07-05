import { z } from "zod";
import { createApiHandler } from "@/lib/api-handler";
import { prisma } from "@/lib/db";
import { jsonOk } from "@/lib/api-response";
import { devModeGuard } from "@/lib/dev-mode";

const earlyAccessSchema = z.object({
  phoneNumber: z
    .string()
    .min(8, "Please enter your WhatsApp number")
    .max(20, "Number is too long"),
  turnstileToken: z.string().min(1, "Please verify you're human"),
});

export const { POST, GET, OPTIONS } = createApiHandler({
  schema: earlyAccessSchema,
  routeName: "early-access",
  rateLimit: { limit: 2, windowMs: 24 * 60 * 60 * 1000 },
  turnstile: true,
  maxBodySize: 10_000,
  handler: async ({ data, ip }) => {
    if (devModeGuard("early-access")) {
      console.log("[early-access] (dev mode — not saved)", data.phoneNumber);
      return jsonOk({ saved: false }, { route: "early-access", mode: "dev" });
    }

    await prisma.earlyAccessSignup.create({
      data: {
        phoneNumber: data.phoneNumber,
        ipAddress: ip,
      },
    });

    return jsonOk({ saved: true }, { route: "early-access" });
  },
});

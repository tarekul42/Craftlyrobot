import { createApiHandler } from "@/lib/api-handler";
import { applySchema } from "@/lib/validations/apply";
import { sendApplicationConfirmation } from "@/lib/email";
import { notifyApplicationReceived } from "@/lib/slack";
import { saveApplication } from "@/lib/db";
import { jsonOk, jsonInternalError } from "@/lib/api-response";

export const { POST, GET, OPTIONS } = createApiHandler({
  schema: applySchema,
  routeName: "apply",
  rateLimit: { limit: 1, windowMs: 24 * 60 * 60 * 1000 },
  turnstile: true,
  idempotency: true,
  maxBodySize: 100_000,
  handler: async ({ data, ip }) => {
    const saved = await saveApplication({
      fullName: data.fullName,
      email: data.email,
      whatsapp: data.whatsapp,
      role: data.role,
      department: data.department,
      commitment: data.commitment,
      skills: data.skills,
      portfolio: data.portfolio,
      whyCraftly: data.whyCraftly,
      ip,
    });

    if (!saved) {
      return jsonInternalError("Failed to save application. Please try again.");
    }

    await sendApplicationConfirmation(data.email, data.fullName);
    await notifyApplicationReceived({
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      department: data.department,
      commitment: data.commitment,
      skillsCount: data.skills.length,
    });

    return jsonOk({ id: saved.id }, { route: "apply" });
  },
});

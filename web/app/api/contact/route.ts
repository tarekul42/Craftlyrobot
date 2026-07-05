import { createApiHandler } from "@/lib/api-handler";
import { contactSchema } from "@/lib/validations/contact";
import { sendContactConfirmation } from "@/lib/email";
import { notifyContactReceived } from "@/lib/slack";
import { saveContactMessage } from "@/lib/db";
import { jsonOk, jsonInternalError } from "@/lib/api-response";

export const { POST, GET, OPTIONS } = createApiHandler({
  schema: contactSchema,
  routeName: "contact",
  rateLimit: { limit: 5, windowMs: 60 * 60 * 1000 },
  turnstile: true,
  idempotency: true,
  maxBodySize: 100_000,
  handler: async ({ data, ip }) => {
    const saved = await saveContactMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      ip,
    });

    if ("code" in saved) {
      return jsonInternalError(saved.message);
    }

    await sendContactConfirmation(data.email, data.name);
    await notifyContactReceived({
      name: data.name,
      email: data.email,
      subject: data.subject,
    });

    return jsonOk({ id: saved.id }, { route: "contact" });
  },
});

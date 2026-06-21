import { z } from "zod";

/**
 * Contact form schema.
 * Used by:
 *   - components/blocks/contact-form.tsx (client)
 *   - app/api/contact/route.ts (server)
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(100, "Name is too long"),

  email: z
    .string()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),

  subject: z
    .string()
    .min(3, "Please enter a subject")
    .max(200, "Subject is too long"),

  message: z
    .string()
    .min(20, "Please tell us more (at least 20 characters)")
    .max(2000, "Message is too long (max 2000 characters)"),

  turnstileToken: z
    .string()
    .min(1, "Please verify you're human"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

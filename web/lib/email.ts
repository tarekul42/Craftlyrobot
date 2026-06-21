/**
 * Email sending utility.
 *
 * Currently uses Resend (https://resend.com) — generous free tier, simple API.
 * To use a different provider (SendGrid, Postmark, AWS SES), swap the
 * implementation below. The interface stays the same.
 *
 * Requires RESEND_API_KEY in environment.
 * In development (no key), emails are logged to console instead of sent.
 */

interface EmailParams {
  to: string;
  subject: string;
  /** Plain text body */
  text?: string;
  /** HTML body (optional — if omitted, text is used) */
  html?: string;
  /** Reply-to address (optional) */
  replyTo?: string;
  /** From address — defaults to EMAIL_FROM env var */
  from?: string;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send an email via Resend.
 * In development (no API key), logs to console and returns success.
 */
export async function sendEmail(params: EmailParams): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = params.from ?? process.env.EMAIL_FROM ?? "hello@craftlyrobot.com";

  // Development mode — log instead of sending
  if (!apiKey) {
    console.log("[email] (dev mode — not actually sent)", {
      to: params.to,
      from: fromAddress,
      subject: params.subject,
      textPreview: params.text?.slice(0, 100),
    });
    return { success: true, messageId: "dev-mode" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: params.to,
        subject: params.subject,
        text: params.text,
        html: params.html,
        reply_to: params.replyTo,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("[email] Send failed:", error);
      return { success: false, error };
    }

    const data = (await res.json()) as { id?: string };
    return { success: true, messageId: data.id };
  } catch (err) {
    console.error("[email] Error:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/**
 * Send a confirmation email to an applicant.
 */
export async function sendApplicationConfirmation(
  email: string,
  name: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Application received — Craftly",
    text: `Hi ${name},\n\nWe received your application to Craftly. We review applications weekly and will respond within 7 days.\n\nIn the meantime, feel free to join our Facebook group (https://www.facebook.com/groups/peopleofcraftly) or watch us on YouTube (https://www.youtube.com/@WasifbuildingCraftly).\n\n— The Craftly team`,
  });
}

/**
 * Send a confirmation email to someone who contacted us.
 */
export async function sendContactConfirmation(
  email: string,
  name: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Message received — Craftly",
    text: `Hi ${name},\n\nThanks for reaching out. We've received your message and will respond within 2 business days.\n\n— The Craftly team`,
  });
}

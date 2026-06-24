/**
 * Server-side Turnstile token verification.
 *
 * Used by API routes to verify that a Turnstile token is valid.
 * NEVER trust the client — always verify server-side.
 *
 * Requires TURNSTILE_SECRET_KEY in environment.
 */

interface TurnstileVerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Verify a Turnstile token with Cloudflare's siteverify endpoint.
 *
 * @returns true if the token is valid, false otherwise
 */
export async function verifyTurnstile(
  token: string,
  remoteip?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("TURNSTILE_SECRET_KEY is not set — blocking request in production");
      return false;
    }
    console.warn(
      "TURNSTILE_SECRET_KEY not set — skipping verification. Do NOT use in production.",
    );
    return true;
  }

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });
    if (remoteip) body.set("remoteip", remoteip);

    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      },
    );

    const data = (await res.json()) as TurnstileVerifyResponse;
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verification failed:", err);
    return false;
  }
}

/**
 * Get the client IP from a request, accounting for Vercel's forwarding.
 */
export function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

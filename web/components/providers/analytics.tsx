import Script from "next/script";

/**
 * Analytics — Plausible script loader.
 *
 * Privacy-friendly, cookieless, GDPR-compliant out of the box.
 * No consent banner needed (Plausible doesn't track personal data).
 *
 * Requires NEXT_PUBLIC_PLAUSIBLE_DOMAIN in environment.
 * In development (no domain set), the script is not loaded.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

  if (!domain) {
    return null;
  }

  return (
    <Script
      defer
      data-domain={domain}
      src={src}
      strategy="afterInteractive"
    />
  );
}

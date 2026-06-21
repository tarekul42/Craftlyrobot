/**
 * Analytics event tracking helper.
 *
 * Uses Plausible's custom events API.
 * Safe to call on server (no-op) or client without Plausible loaded (no-op).
 *
 * @example
 * import { trackEvent } from "@/lib/analytics";
 * trackEvent("cta_click", { location: "hero", destination: "/apply" });
 */

type EventProps = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, props?: EventProps): void {
  if (typeof window === "undefined") return;

  const plausible = (
    window as unknown as {
      plausible?: (event: string, options?: { props?: EventProps }) => void;
    }
  ).plausible;

  if (!plausible) return;

  plausible(name, props ? { props } : undefined);
}

// === Pre-defined events for consistency ===

export const analytics = {
  ctaClick: (location: string, destination: string) =>
    trackEvent("cta_click", { location, destination }),

  applicationSubmitted: (role: string) =>
    trackEvent("application_submitted", { role }),

  contactSubmitted: () => trackEvent("contact_submitted"),

  newsletterSignup: () => trackEvent("newsletter_signup"),

  blogPostView: (slug: string) => trackEvent("blog_post_view", { slug }),

  themeToggle: (theme: "light" | "dark") =>
    trackEvent("theme_toggle", { theme }),
} as const;

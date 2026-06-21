"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackEvent } from "@/lib/analytics";

/**
 * WebVitals — reports Core Web Vitals to analytics.
 *
 * Reports: CLS, INP, LCP, FCP, TTFB
 * Place in root layout (only once).
 *
 * @example
 * <body>
 *   {children}
 *   <WebVitals />
 * </body>
 */
export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(
        `[web-vitals] ${metric.name}: ${metric.value} (${metric.rating})`,
      );
    }

    // Report to analytics in production
    if (process.env.NODE_ENV === "production") {
      trackEvent("web_vital", {
        name: metric.name,
        value: Math.round(metric.value),
        rating: metric.rating,
        id: metric.id,
      });
    }
  });

  return null;
}

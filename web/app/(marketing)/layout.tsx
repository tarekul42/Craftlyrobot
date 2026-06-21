import { PageShell } from "@/components/layout/page-shell";

/**
 * Marketing layout — wraps every page in the (marketing) route group.
 * Adds the full chrome: SiteHeader (top) + SiteFooter (bottom).
 *
 * Pages in this group: homepage, products, community, contribute, about, blog.
 * Legal pages use a different layout ((legal)/layout.tsx) with minimal chrome.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}

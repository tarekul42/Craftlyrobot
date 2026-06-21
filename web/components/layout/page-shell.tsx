import { SkipLink } from "@/components/ui";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

/**
 * PageShell — the outermost wrapper for every marketing page.
 * Renders skip link + header + main content + footer.
 *
 * Used by app/(marketing)/layout.tsx to wrap all marketing pages.
 */
interface PageShellProps {
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export function PageShell({ children, hideHeader, hideFooter }: PageShellProps) {
  return (
    <>
      <SkipLink href="#main-content">Skip to content</SkipLink>
      <div className="flex min-h-dvh flex-col">
        {!hideHeader && <SiteHeader />}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {!hideFooter && <SiteFooter />}
      </div>
    </>
  );
}

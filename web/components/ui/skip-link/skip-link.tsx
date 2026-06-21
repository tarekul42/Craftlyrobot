import * as React from "react";

interface SkipLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/**
 * SkipLink — accessibility skip-to-content link.
 * Must be the first focusable element on every page.
 * Visually hidden until focused.
 *
 * @example
 * <SkipLink href="#main-content">Skip to content</SkipLink>
 * <main id="main-content">...</main>
 */
function SkipLink({ href, children, ...props }: SkipLinkProps) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:shadow-lg focus:border focus:border-border"
      {...props}
    >
      {children}
    </a>
  );
}

export { SkipLink };

"use client";

import { useToc } from "@/hooks/use-toc";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  /** ID of the element containing the headings to track */
  containerId: string;
  className?: string;
}

/**
 * TableOfContents — sticky sidebar showing the page's H2/H3 structure.
 * Highlights the current section based on scroll position.
 *
 * Used on blog posts and /what-is-craftly.
 *
 * @example
 * <article id="post-content">...</article>
 * <TableOfContents containerId="post-content" />
 */
export function TableOfContents({
  containerId,
  className,
}: TableOfContentsProps) {
  const toc = useToc(containerId);
  const tocIds = toc.map((item) => item.id);
  const activeSection = useActiveSection(tocIds);

  if (toc.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={cn("space-y-1 text-sm", className)}
    >
      <p className="text-foreground mb-3 font-semibold">On this page</p>
      <ul className="border-border space-y-1 border-l">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "hover:text-foreground block border-l-2 border-transparent py-1 pl-3 transition-colors",
                item.level === 3 && "pl-6",
                activeSection === item.id
                  ? "border-primary text-foreground font-medium"
                  : "text-muted-foreground",
              )}
              aria-current={activeSection === item.id ? "location" : undefined}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

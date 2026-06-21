import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Array<{ label: string; href?: string }>;
  separator?: React.ReactNode;
}

/**
 * Breadcrumbs — navigation trail for deep pages.
 *
 * @example
 * <Breadcrumbs items={[
 *   { label: "Home", href: "/" },
 *   { label: "Community", href: "/community" },
 *   { label: "Departments", href: "/community/departments" },
 *   { label: "Engineering" },
 * ]} />
 */
function Breadcrumbs({
  items,
  separator,
  className,
  ...props
}: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)} {...props}>
      <ol className="text-muted-foreground flex items-center gap-1.5 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(isLast && "text-foreground font-medium")}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast &&
                (separator ?? (
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                ))}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export { Breadcrumbs };

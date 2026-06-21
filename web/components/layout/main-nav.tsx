"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNav } from "@/config/navigation";

/**
 * Logo — the Craftly wordmark in Pacifico font.
 * Links to the homepage.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("font-logo text-2xl leading-none text-foreground", className)}
      aria-label="Craftly — home"
    >
      Craftly
    </Link>
  );
}

/**
 * MainNav — desktop primary navigation (5 top-level items).
 * Hidden on mobile (mobile nav takes over).
 */
export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="hidden md:flex items-center gap-1">
      {mainNav.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

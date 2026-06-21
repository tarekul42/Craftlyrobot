"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { MobileNav } from "@/components/ui";
import { mainNav } from "@/config/navigation";
import { Logo, MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

/**
 * SiteHeader — sticky global header.
 *
 * Structure:
 *   [Logo] [MainNav]                    [ThemeToggle] [Get Access] [MobileNav]
 *
 * Behavior:
 * - Transparent at top of page (over hero)
 * - Solid background + border on scroll (backdrop blur)
 * - Mobile: hides nav, shows hamburger
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  // Flatten nav items for mobile menu (top-level only)
  const mobileItems = mainNav.map((item) => ({
    title: item.title,
    href: item.href,
  }));

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "sticky top-0 z-[1100] w-full transition-colors duration-300",
        scrolled
          ? "bg-background/80 border-border border-b backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="max-w-screen-default px-section mx-auto flex h-16 items-center justify-between">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Logo />
          <MainNav />
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contribute/apply">Get Access</Link>
          </Button>
          <MobileNav items={mobileItems} logo={<Logo />} />
        </div>
      </div>
    </motion.header>
  );
}

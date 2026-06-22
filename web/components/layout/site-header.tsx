"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button/button";
import { MobileNav } from "@/components/ui/mobile-nav/mobile-nav";
import { mainNav } from "@/config/navigation";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

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
        "fixed top-0 z-[1100] w-full transition-colors duration-300",
        scrolled
          ? "glass border-border border-b"
          : "bg-transparent",
      )}
    >
      <div className="max-w-screen-default px-section mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Logo />
        </div>

        <MainNav />

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

"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface ReadingProgressProps {
  className?: string;
}

/**
 * ReadingProgress — a progress bar at the top of the viewport
 * showing how far the user has scrolled through the article.
 *
 * Place at the top of a blog post page, fixed to the viewport.
 *
 * @example
 * <ReadingProgress />
 * <article>...</article>
 */
export function ReadingProgress({ className }: ReadingProgressProps) {
  const prefersReduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Avoid hydration mismatch — don't render until mounted
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || prefersReduced) return null;

  return (
    <motion.div
      className={cn(
        "bg-primary fixed left-0 right-0 top-0 z-[1200] h-1 origin-left",
        className,
      )}
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface BackToTopProps {
  /** Scroll threshold in pixels before button appears (default 600) */
  threshold?: number;
  className?: string;
}

/**
 * BackToTop — floating button that scrolls to the top of the page.
 * Appears after the user scrolls down `threshold` pixels.
 *
 * Place once per page (or in the root layout).
 *
 * @example
 * <BackToTop />
 */
export function BackToTop({ threshold = 600, className }: BackToTopProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > threshold);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  const handleClick = () => {
    if (prefersReduced) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (prefersReduced) {
    return visible ? (
      <button
        onClick={handleClick}
        aria-label="Back to top"
        className={cn(
          "border-border bg-background hover:bg-muted fixed bottom-6 right-6 z-[1200] flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-colors",
          className,
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    ) : null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "border-border bg-background hover:bg-muted fixed bottom-6 right-6 z-[1200] flex h-11 w-11 items-center justify-center rounded-full border shadow-lg transition-colors",
            className,
          )}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

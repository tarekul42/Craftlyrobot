"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface ScreenshotShowcaseProps {
  images: string[];
  alt: string;
  /** ms between auto-advances (default 3500) */
  interval?: number;
  className?: string;
}

/**
 * ScreenshotShowcase — crossfade carousel of product screenshots.
 * Auto-advances every 3.5s. Respects prefers-reduced-motion.
 *
 * Used in the homepage "Foundation" section.
 */
export function ScreenshotShowcase({
  images,
  alt,
  interval = 3500,
  className,
}: ScreenshotShowcaseProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (prefersReduced || images.length <= 1) return;
    const t = setInterval(() => {
      setActiveIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(t);
  }, [images.length, interval, prefersReduced]);

  if (images.length === 0) return null;

  return (
    <div
      className={cn(
        "border-border bg-muted relative aspect-[3/4] w-full overflow-hidden rounded-lg border",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={activeIndex}
          src={images[activeIndex]}
          alt={`${alt} — screenshot ${activeIndex + 1}`}
          className="absolute inset-0 h-full w-full object-contain p-4"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.42 }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show screenshot ${i + 1}`}
              aria-current={i === activeIndex}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === activeIndex
                  ? "bg-foreground w-6"
                  : "bg-foreground/40 hover:bg-foreground/60 w-1.5",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

interface ScreenshotShowcaseProps {
  images: string[];
  alt: string;
  interval?: number;
  className?: string;
}

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

  const currentSrc = images[activeIndex];
  if (!currentSrc) return null;

  return (
    <div
      className={cn(
        "border-border bg-muted relative aspect-[3/4] w-full overflow-hidden rounded-lg border",
        className,
      )}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 h-full w-full"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.42 }}
        >
          <Image
            src={currentSrc}
            alt={`${alt} — screenshot ${activeIndex + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-4"
          />
        </motion.div>
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

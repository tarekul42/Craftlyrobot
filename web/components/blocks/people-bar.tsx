"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface PeopleBarProps {
  count: number;
  target: number;
  /** Optional label, default "Students Joined" */
  label?: string;
  className?: string;
}

/**
 * PeopleBar — animated progress counter shown on the homepage.
 * Counts up from 0 to the current count when scrolled into view.
 * Shows progress toward the target.
 *
 * Pattern preserved from hello.craftlyrobot.com.
 */
export function PeopleBar({
  count,
  target,
  label = "Students Joined",
  className,
}: PeopleBarProps) {
  const [displayCount, setDisplayCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setDisplayCount(Math.floor(eased * count));
            if (progress < 1) requestAnimationFrame(animate);
            else setDisplayCount(count);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById("people-bar");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [count, hasAnimated]);

  const percentage = Math.min((displayCount / target) * 100, 100);
  const formattedCount = displayCount.toLocaleString();
  const formattedTarget = target.toLocaleString();

  return (
    <div
      id="people-bar"
      className={cn(
        "rounded-lg border border-border bg-muted/30 p-6",
        className
      )}
      role="region"
      aria-label={`${label} progress`}
    >
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-4xl font-bold tabular-nums text-foreground">
            {formattedCount}
          </span>
          <span className="ml-2 text-sm text-muted-foreground">{label}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Target <span className="font-semibold">{formattedTarget}</span>
        </div>
      </div>

      <div
        className="mt-4 h-3 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={displayCount}
        aria-label={`Progress toward ${formattedTarget} ${label.toLowerCase()}`}
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

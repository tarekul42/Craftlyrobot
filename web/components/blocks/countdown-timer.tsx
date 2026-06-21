"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CountdownTimerProps {
  /** ISO date string */
  targetDate: string;
  label?: string;
  className?: string;
}

/**
 * CountdownTimer — counts down to a target date.
 * Pattern preserved from hello.craftlyrobot.com.
 */
export function CountdownTimer({
  targetDate,
  label = "Time remaining",
  className,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();

    const update = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  if (!mounted) {
    return null; // avoid hydration mismatch
  }

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2 font-mono text-sm",
        className,
      )}
      aria-label={`${label}: ${timeLeft.days} days ${timeLeft.hours} hours ${timeLeft.minutes} minutes ${timeLeft.seconds} seconds`}
    >
      <span className="text-muted-foreground">{label}:</span>
      <span className="bg-muted rounded-md px-2 py-1">{timeLeft.days}d</span>
      <span className="bg-muted rounded-md px-2 py-1">
        {pad(timeLeft.hours)}h
      </span>
      <span className="bg-muted rounded-md px-2 py-1">
        {pad(timeLeft.minutes)}m
      </span>
      <span className="bg-muted rounded-md px-2 py-1">
        {pad(timeLeft.seconds)}s
      </span>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface Message {
  sender: "you" | "your-agent" | "network" | "donor";
  text: string;
  badge?: string;
  badgeVariant?: "searching" | "skip" | "checking" | "match" | "agreed" | "done";
}

const script: Message[] = [
  { sender: "you", text: "Need 1 bag O+ blood — Dhaka" },
  {
    sender: "your-agent",
    text: "Searching network for O+ donors...",
    badge: "SEARCHING",
    badgeVariant: "searching",
  },
  {
    sender: "network",
    text: "Found 3 O+ donors nearby. Verifying eligibility...",
  },
  {
    sender: "donor",
    text: "Last donated 1 month ago — Not eligible",
    badge: "SKIP",
    badgeVariant: "skip",
  },
  {
    sender: "donor",
    text: "O+ · Healthy · 2.3 km — Checking...",
    badge: "CHECKING",
    badgeVariant: "checking",
  },
  {
    sender: "donor",
    text: "O+ · 8mo · Healthy · 1.1 km · Available",
    badge: "MATCH",
    badgeVariant: "match",
  },
  {
    sender: "your-agent",
    text: "Negotiating pickup with donor...",
    badge: "NEGOTIATING",
    badgeVariant: "searching",
  },
  {
    sender: "donor",
    text: "Agreed. 4pm today, Banani.",
    badge: "AGREED",
    badgeVariant: "agreed",
  },
  {
    sender: "your-agent",
    text: "Done. Donor confirmed for 4pm.",
    badge: "DONE",
    badgeVariant: "done",
  },
];

const senderConfig = {
  you: { label: "You", icon: "👤", dot: "bg-primary" },
  "your-agent": { label: "Your Agent", icon: "🤖", dot: "bg-blue-500" },
  network: { label: "Network", icon: "🌐", dot: "bg-amber-500" },
  donor: { label: "Donor", icon: "🩸", dot: "bg-green-500" },
};

const badgeStyles = {
  searching: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800 dark:text-blue-400",
  skip: "bg-muted text-muted-foreground border-border",
  checking: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800 dark:text-amber-400",
  match: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 dark:text-green-400",
  agreed: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 dark:text-green-400",
  done: "bg-primary/10 text-primary border-primary/20",
};

const TYPING_DURATION = 600;
const PAUSE_AFTER_END = 4000;

export function AgentNegotiation({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (prefersReduced) {
      setVisibleCount(script.length);
      return;
    }

    if (paused) return;

    if (visibleCount >= script.length) {
      setPaused(true);
      const t = setTimeout(() => {
        setVisibleCount(0);
        setPaused(false);
      }, PAUSE_AFTER_END);
      return () => clearTimeout(t);
    }

    setIsTyping(true);
    const typingTimer = setTimeout(() => {
      setIsTyping(false);
      const msgTimer = setTimeout(() => {
        setVisibleCount((c) => c + 1);
      }, 200);
      return () => clearTimeout(msgTimer);
    }, TYPING_DURATION);

    return () => clearTimeout(typingTimer);
  }, [visibleCount, paused, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className={cn("border-border bg-background max-h-[500px] w-full max-w-md overflow-y-auto rounded-xl border p-4 font-mono text-[13px] leading-relaxed", className)}>
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-destructive h-2 w-2 rounded-full" />
          <span className="text-muted-foreground text-xs font-semibold uppercase">LIVE</span>
        </div>
        {script.map((msg, i) => {
          const config = senderConfig[msg.sender];
          return (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-1.5">
                <span>{config.icon}</span>
                <span className="font-semibold">{config.label}</span>
              </div>
              <p className="text-muted-foreground ml-5 mt-0.5">{msg.text}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "border-border bg-background relative w-full max-w-md overflow-hidden rounded-xl border",
        "shadow-xl shadow-black/5",
        className,
      )}
    >
      <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
        <span className="bg-destructive relative h-2 w-2 rounded-full">
          <span className="bg-destructive absolute inset-0 animate-ping rounded-full opacity-75" />
        </span>
        <span className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider">
          Live Negotiation
        </span>
      </div>

      <div className="max-h-[420px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed">
        <AnimatePresence>
          {script.slice(0, visibleCount).map((msg, i) => {
            const config = senderConfig[msg.sender];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-3"
              >
                <div className="flex items-center gap-1.5">
                  <span>{config.icon}</span>
                  <span className="font-semibold">{config.label}</span>
                  {msg.badge && msg.badgeVariant && (
                    <span
                      className={cn(
                        "ml-auto rounded-full border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        badgeStyles[msg.badgeVariant],
                      )}
                    >
                      {msg.badge}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground ml-5 mt-0.5">
                  {msg.text}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <div className="text-muted-foreground ml-5 mt-1 flex items-center gap-1.5">
            <span className="flex gap-0.5">
              <span className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "0ms" }} />
              <span className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "150ms" }} />
              <span className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "300ms" }} />
            </span>
          </div>
        )}

        {visibleCount === script.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mt-4 text-center text-[11px]"
          >
            Restarting...
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

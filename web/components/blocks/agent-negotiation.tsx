"use client";

import { useEffect, useState, useRef } from "react";
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
  { sender: "your-agent", text: "Searching network for O+ donors...", badge: "SEARCHING", badgeVariant: "searching" },
  { sender: "network", text: "Found 3 O+ donors nearby. Verifying eligibility..." },
  { sender: "donor", text: "Last donated 1 month ago — Not eligible", badge: "SKIP", badgeVariant: "skip" },
  { sender: "donor", text: "O+ · 8mo · Healthy · 1.1 km · Available", badge: "MATCH", badgeVariant: "match" },
  { sender: "your-agent", text: "Negotiating pickup with donor..." },
  { sender: "donor", text: "Agreed. 4pm today, Banani.", badge: "AGREED", badgeVariant: "agreed" },
  { sender: "your-agent", text: "Done. Donor confirmed for 4pm.", badge: "DONE", badgeVariant: "done" },
];

const senderConfig: Record<string, { label: string; icon: string }> = {
  you: { label: "You", icon: "👤" },
  "your-agent": { label: "Your Agent", icon: "🤖" },
  network: { label: "Network", icon: "🌐" },
  donor: { label: "Donor", icon: "🩸" },
};

const badgeStyles = {
  searching: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800 dark:text-blue-400",
  skip: "bg-muted text-muted-foreground border-border",
  checking: "bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800 dark:text-amber-400",
  match: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 dark:text-green-400",
  agreed: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800 dark:text-green-400",
  done: "bg-primary/10 text-primary border-primary/20",
};

const TYPING_DURATION = 500;
const PAUSE_AFTER_END = 3000;
const MAX_VISIBLE = 5;

export function AgentNegotiation({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReduced) {
      setVisibleCount(script.length);
      return;
    }
    if (completed) return;
    if (visibleCount >= script.length) {
      const t = setTimeout(() => setCompleted(true), PAUSE_AFTER_END);
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
  }, [visibleCount, completed, prefersReduced]);

  const visibleMessages = script.slice(
    Math.max(0, visibleCount - MAX_VISIBLE),
    visibleCount,
  );

  if (prefersReduced) {
    return (
      <div className={cn("border-border/80 bg-background/95 w-full max-w-md rounded-xl border p-4 font-mono text-[13px] leading-relaxed backdrop-blur-sm", className)}>
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-destructive h-2 w-2 rounded-full" />
          <span className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider">Agent Network</span>
        </div>
        {script.map((msg, i) => {
          const config = senderConfig[msg.sender] ?? { label: msg.sender, icon: "❓" };
          return (
            <div key={i} className="mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px]">{config.icon}</span>
                <span className="text-[11px] font-semibold">{config.label}</span>
              </div>
              <p className="text-muted-foreground ml-5 mt-0.5">{msg.text}</p>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border-border/80 bg-background/95 overflow-hidden rounded-xl border shadow-2xl shadow-black/5 backdrop-blur-sm"
      >
        <div className="border-border/80 flex items-center gap-2 border-b px-4 py-2.5">
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className={cn("h-2 w-2 rounded-full", completed ? "bg-green-500" : "bg-destructive")} />
            {!completed && <span className="bg-destructive absolute inset-0 animate-ping rounded-full opacity-75" />}
          </span>
          <span className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider">
            {completed ? "Complete" : "Live"}
          </span>
          {!completed && <span className="text-muted-foreground/40 mx-1">·</span>}
          {!completed && <span className="text-muted-foreground text-[11px] font-medium">Agent Network</span>}
        </div>

        <div className="relative h-[320px] overflow-hidden p-4" ref={containerRef}>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent"
            aria-hidden="true"
          />

          <div className="font-mono text-[13px] leading-relaxed" role="region" aria-label="Agent negotiation simulation">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleMessages.map((msg, i) => {
                const config = senderConfig[msg.sender] ?? { label: msg.sender, icon: "❓" };
                const isLatest = i === visibleMessages.length - 1;
                return (
                  <motion.div
                    key={msg.text}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={isLatest ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-3 last:mb-0"
                  >
                    <div className="flex items-center gap-1.5">
                      <span aria-hidden="true" className="text-[11px]">{config.icon}</span>
                      <span className="text-[11px] font-semibold">{config.label}</span>
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
                    <p className="text-muted-foreground ml-5 mt-0.5">{msg.text}</p>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground ml-5 mt-2 flex items-center gap-1.5"
              >
                <span className="flex gap-0.5">
                  <span className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "0ms" }} />
                  <span className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "150ms" }} />
                  <span className="bg-muted-foreground/50 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "300ms" }} />
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

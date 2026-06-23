"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface Message {
  sender: "you" | "your-agent" | "network" | "donor";
  text: string;
  status?: "searching" | "skip" | "checking" | "match" | "agreed" | "done";
  showTimer?: boolean;
}

const script: Message[] = [
  { sender: "you", text: "Need 1 bag O+ blood — Dhaka" },
  { sender: "your-agent", text: "Searching network for O+ donors...", status: "searching", showTimer: true },
  { sender: "network", text: "Found 3 O+ donors nearby. Verifying eligibility..." },
  { sender: "donor", text: "Last donated 1 month ago — Not eligible", status: "skip" },
  { sender: "donor", text: "O+ · 8mo · Healthy · 1.1 km · Available", status: "match" },
  { sender: "your-agent", text: "Negotiating pickup with donor..." },
  { sender: "donor", text: "Agreed. 4pm today, Banani.", status: "agreed" },
  { sender: "your-agent", text: "Done. Donor confirmed for 4pm.", status: "done" },
];

const senderMeta = {
  you: { label: "You", initial: "U" },
  "your-agent": { label: "Your Agent", initial: "A" },
  network: { label: "Network", initial: "N" },
  donor: { label: "Donor", initial: "D" },
} as const;

const statusStyles: Record<string, string> = {
  searching: "text-foreground/35",
  skip: "text-foreground/20",
  checking: "text-foreground/35",
  match: "text-foreground font-semibold",
  agreed: "text-foreground font-semibold",
  done: "text-foreground font-bold",
};

const statusLabels: Record<string, string> = {
  searching: "SEARCHING",
  skip: "SKIP",
  checking: "CHECKING",
  match: "MATCH",
  agreed: "AGREED",
  done: "DONE",
};

const TYPING_DURATION = 500;
const PAUSE_AFTER_END = 3000;
const SEARCHING_HOLD = 3500;
const MAX_VISIBLE = 4;

function Timer() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="mt-1.5 flex items-center gap-1 text-[11px] text-foreground/40">
      <span className="bg-foreground/40 h-1 w-1 animate-pulse rounded-full" />
      {elapsed}s elapsed
    </span>
  );
}

function TypingBubbles() {
  return (
    <div className="mb-3 flex items-start gap-2.5">
      <div className="bg-foreground/[0.08] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-foreground/60">
        A
      </div>
      <div className="border-foreground/[0.08] inline-flex items-center gap-1 rounded-2xl border px-4 py-2.5">
        <span className="bg-foreground/25 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "0ms" }} />
        <span className="bg-foreground/25 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "150ms" }} />
        <span className="bg-foreground/25 h-1.5 w-1.5 animate-bounce rounded-full" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

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

    const msg = script[visibleCount];

    if (msg?.showTimer) {
      const hold = setTimeout(() => {
        setIsTyping(true);
        const typing = setTimeout(() => {
          setIsTyping(false);
          const advance = setTimeout(() => setVisibleCount((c) => c + 1), 200);
          return () => clearTimeout(advance);
        }, TYPING_DURATION);
        return () => clearTimeout(typing);
      }, SEARCHING_HOLD);
      return () => clearTimeout(hold);
    }

    setIsTyping(true);
    const typing = setTimeout(() => {
      setIsTyping(false);
      const advance = setTimeout(() => setVisibleCount((c) => c + 1), 200);
      return () => clearTimeout(advance);
    }, TYPING_DURATION);
    return () => clearTimeout(typing);
  }, [visibleCount, completed, prefersReduced]);

  const visibleMessages = script.slice(
    Math.max(0, visibleCount - MAX_VISIBLE),
    visibleCount,
  );

  if (prefersReduced) {
    return (
      <div className={cn("border-foreground/[0.08] bg-background/95 w-full max-w-md rounded-2xl border p-4 text-sm leading-relaxed backdrop-blur-sm", className)}>
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-foreground h-1.5 w-1.5 rounded-full" />
          <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-widest">Agent Network</span>
        </div>
        {script.map((msg, i) => {
          const meta = senderMeta[msg.sender];
          return (
            <div key={i} className="mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold text-foreground/60">{meta.label}</span>
                {msg.status && (
                  <span className={cn("text-[9px] font-bold uppercase tracking-wider", statusStyles[msg.status])}>
                    {statusLabels[msg.status]}
                  </span>
                )}
              </div>
              <p className="text-foreground/70 ml-0 mt-0.5">{msg.text}</p>
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
        className="border-foreground/[0.08] bg-background/95 overflow-hidden rounded-2xl border shadow-xl shadow-foreground/[0.04] backdrop-blur-sm"
      >
        <div className="border-foreground/[0.08] flex items-center gap-2 border-b px-4 py-2.5">
          <span className="relative flex h-1.5 w-1.5 items-center justify-center">
            <span className={cn("h-1.5 w-1.5 rounded-full", completed ? "bg-foreground/50" : "bg-foreground")} />
            {!completed && <span className="bg-foreground absolute inset-0 animate-ping rounded-full opacity-30" />}
          </span>
          <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-widest">
            {completed ? "Complete" : "Live"}
          </span>
          {!completed && (
            <>
              <span className="text-foreground/[0.08] mx-0.5">·</span>
              <span className="text-foreground/40 text-[10px] font-medium">Agent Network</span>
            </>
          )}
        </div>

        <div className="relative h-[340px] overflow-hidden p-4" ref={containerRef}>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-background to-transparent"
            aria-hidden="true"
          />

          <div className="text-sm leading-relaxed" role="region" aria-label="Agent negotiation simulation">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleMessages.map((msg, i) => {
                const meta = senderMeta[msg.sender];
                const isYou = msg.sender === "you";
                const isLatest = i === visibleMessages.length - 1;

                return (
                  <motion.div
                    key={msg.text}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={isLatest ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={cn("mb-3 last:mb-0 flex", isYou ? "justify-end" : "justify-start")}
                  >
                    <div className={cn("flex max-w-[85%] items-start gap-2.5", isYou && "flex-row-reverse")}>
                      <div
                        className={cn(
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
                          isYou
                            ? "bg-foreground text-background"
                            : "bg-foreground/[0.08] text-foreground/60",
                        )}
                      >
                        {meta.initial}
                      </div>

                      <div className="min-w-0">
                        <div className={cn("flex items-center gap-1.5", isYou && "flex-row-reverse")}>
                          <span className="text-[10px] font-semibold text-foreground/50">
                            {meta.label}
                          </span>
                          {msg.status && (
                            <span className={cn("text-[9px] font-bold uppercase tracking-wider", statusStyles[msg.status])}>
                              {statusLabels[msg.status]}
                            </span>
                          )}
                        </div>

                        <div
                          className={cn(
                            "mt-0.5 rounded-2xl px-3.5 py-2 text-sm",
                            isYou
                              ? "bg-foreground text-background"
                              : "bg-foreground/[0.06] border-foreground/[0.08] border",
                          )}
                        >
                          {msg.text}
                          {msg.showTimer && <Timer />}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TypingBubbles />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

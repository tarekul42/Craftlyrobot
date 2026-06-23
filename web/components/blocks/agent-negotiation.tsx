"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface Message {
  sender: "you" | "your-agent" | "network" | "donor" | "driver" | "store" | "builder";
  text: string;
  badge?: string;
  badgeVariant?: "searching" | "skip" | "checking" | "match" | "agreed" | "done";
}

interface Scenario {
  id: string;
  icon: string;
  messages: Message[];
}

const scenarios: Scenario[] = [
  {
    id: "blood",
    icon: "🩸",
    messages: [
      { sender: "you", text: "Need 1 bag O+ blood — Dhaka" },
      { sender: "your-agent", text: "Searching network for O+ donors...", badge: "SEARCHING", badgeVariant: "searching" },
      { sender: "network", text: "Found 3 O+ donors nearby. Verifying eligibility..." },
      { sender: "donor", text: "Last donated 1 month ago — Not eligible", badge: "SKIP", badgeVariant: "skip" },
      { sender: "donor", text: "O+ · 8mo · Healthy · 1.1 km · Available", badge: "MATCH", badgeVariant: "match" },
      { sender: "your-agent", text: "Negotiating pickup with donor..." },
      { sender: "donor", text: "Agreed. 4pm today, Banani.", badge: "AGREED", badgeVariant: "agreed" },
      { sender: "your-agent", text: "Done. Donor confirmed for 4pm.", badge: "DONE", badgeVariant: "done" },
    ],
  },
  {
    id: "ride",
    icon: "🚗",
    messages: [
      { sender: "you", text: "Need a ride from Gulshan to Uttara" },
      { sender: "your-agent", text: "Scanning for nearby drivers...", badge: "SEARCHING", badgeVariant: "searching" },
      { sender: "network", text: "Found 4 drivers in the area. Checking ratings and rates..." },
      { sender: "driver", text: "Fare: ৳450 · ETA 8 min · ⭐4.2", badge: "MATCH", badgeVariant: "match" },
      { sender: "your-agent", text: "Negotiating fare..." },
      { sender: "driver", text: "Best offer: ৳380 · ETA 6 min", badge: "AGREED", badgeVariant: "agreed" },
      { sender: "your-agent", text: "Done. Driver arriving in 6 min.", badge: "DONE", badgeVariant: "done" },
    ],
  },
  {
    id: "groceries",
    icon: "🛒",
    messages: [
      { sender: "you", text: "Need 2kg rice, 1L oil, 500g sugar" },
      { sender: "your-agent", text: "Checking stock across 3 stores...", badge: "SEARCHING", badgeVariant: "searching" },
      { sender: "network", text: "Store A: Rice ✓ Oil ✓ Sugar ✗ — ৳520" },
      { sender: "store", text: "Store B: All in stock — ৳580", badge: "MATCH", badgeVariant: "match" },
      { sender: "your-agent", text: "Negotiating bulk discount..." },
      { sender: "store", text: "Agreed. ৳550, delivery by 5pm.", badge: "AGREED", badgeVariant: "agreed" },
      { sender: "your-agent", text: "Done. Delivery confirmed.", badge: "DONE", badgeVariant: "done" },
    ],
  },
  {
    id: "app",
    icon: "📱",
    messages: [
      { sender: "you", text: "Build a todo app with React + Firebase" },
      { sender: "your-agent", text: "Distributing tasks to build agents...", badge: "SEARCHING", badgeVariant: "searching" },
      { sender: "network", text: "Frontend: Agent A2 · Backend: Agent B4 · Auth: Agent C1" },
      { sender: "builder", text: "UI scaffold complete. Building components...", badge: "CHECKING", badgeVariant: "checking" },
      { sender: "builder", text: "Firebase connected. Auth working. API live.", badge: "MATCH", badgeVariant: "match" },
      { sender: "your-agent", text: "Running tests... All 42 passing. Deploying." },
      { sender: "builder", text: "Deployed: craftly.app/u/todo-42", badge: "DONE", badgeVariant: "done" },
    ],
  },
];

const senderConfig: Record<string, { label: string; icon: string }> = {
  you: { label: "You", icon: "👤" },
  "your-agent": { label: "Your Agent", icon: "🤖" },
  network: { label: "Network", icon: "🌐" },
  donor: { label: "Donor", icon: "🩸" },
  driver: { label: "Driver", icon: "🚗" },
  store: { label: "Store", icon: "🛒" },
  builder: { label: "Builder", icon: "⚙️" },
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

export function AgentNegotiation({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [paused, setPaused] = useState(false);

  const scenario = scenarios[scenarioIndex]!;
  const script = scenario.messages;

  useEffect(() => {
    if (prefersReduced) {
      setVisibleCount(script.length);
      return;
    }

    if (paused) return;

    if (visibleCount >= script.length) {
      setPaused(true);
      const t = setTimeout(() => {
        setScenarioIndex((i) => (i + 1) % scenarios.length);
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
  }, [visibleCount, paused, prefersReduced, script.length]);

  const handleScenarioChange = useCallback((i: number) => {
    setScenarioIndex(i);
    setVisibleCount(0);
    setPaused(false);
  }, []);

  if (prefersReduced) {
    return (
      <div className={cn("border-border bg-background max-h-[500px] w-full max-w-md overflow-y-auto rounded-xl border p-4 font-mono text-[13px] leading-relaxed", className)}>
        <div className="mb-3 flex items-center gap-2">
          <span className="bg-destructive h-2 w-2 rounded-full" />
          <span className="text-muted-foreground text-xs font-semibold uppercase">LIVE</span>
        </div>
        {script.map((msg, i) => {
          const config = senderConfig[msg.sender] ?? { label: msg.sender, icon: "❓" };
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
    <div className={cn("relative w-full max-w-md", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="border-border bg-background overflow-hidden rounded-xl border shadow-xl shadow-black/5"
      >
        <div className="border-border flex items-center gap-2 border-b px-4 py-2.5">
          <span className="bg-destructive relative h-2 w-2 rounded-full">
            <span className="bg-destructive absolute inset-0 animate-ping rounded-full opacity-75" />
          </span>
          <span className="text-muted-foreground text-[11px] font-bold uppercase tracking-wider">
            Live — {scenario.icon} {scenario.id}
          </span>
        </div>

        <div className="max-h-[420px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed" role="region" aria-label="Agent negotiation simulation">
          <AnimatePresence mode="popLayout">
            {script.slice(0, visibleCount).map((msg, i) => {
              const config = senderConfig[msg.sender] ?? { label: msg.sender, icon: "❓" };
              return (
                <motion.div
                  key={`${scenarioIndex}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-3"
                >
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden="true">{config.icon}</span>
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
                  <p className="text-muted-foreground ml-5 mt-0.5">{msg.text}</p>
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
              Next scenario...
            </motion.p>
          )}
        </div>
      </motion.div>

      <div className="mt-3 flex items-center justify-center gap-2">
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => handleScenarioChange(i)}
            aria-label={`Show ${s.id} scenario`}
            aria-current={i === scenarioIndex}
            className={cn(
              "h-2 rounded-full transition-all",
              i === scenarioIndex
                ? "bg-foreground w-6"
                : "bg-foreground/30 hover:bg-foreground/50 w-2",
            )}
          />
        ))}
      </div>
    </div>
  );
}

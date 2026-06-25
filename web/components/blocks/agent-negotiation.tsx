"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const USER_MESSAGE = "Need urgent O+ blood in Dhaka";
const USER_TYPING_SPEED = 65;
const AGENT_THINKING_DURATION = 5000;


const agentResponse = [
  "Done! Found your donor in 47 seconds. Here's who stepped up:",
  "",
  "Rafi \u2014 O+ donor, 8 months since last donation. Healthy, 1.1 km away in Banani. Confirmed for 4pm today.",
  "",
  "Two other donors were checked:",
  "\u2022 One donated recently (too soon, champ)",
  "\u2022 One was 5 km away (too far for a rush)",
  "",
  "Rafi picked up on the first ring. Real one.",
  "",
  "Sharing his contact and location now. He'll be expecting you.",
];

const thinkingSubStatuses = [
  { at: 0, text: "Searching network..." },
  { at: 2000, text: "Checking eligibility of 3 nearby donors..." },
  { at: 3500, text: "Negotiating with donor #3..." },
];

function PersonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z" />
      <path d="M18 14l1 2.5L21.5 18l-2.5 1-1 2.5-1-2.5L14.5 18l2.5-1z" />
    </svg>
  );
}

export function AgentNegotiation({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const startedRef = useRef(false);

  const [phase, setPhase] = useState<"idle" | "user-typing" | "user-sent" | "agent-thinking" | "agent-done" | "pausing">("user-typing");
  const [inputText, setInputText] = useState(USER_MESSAGE.charAt(0));
  const [thinkingElapsed, setThinkingElapsed] = useState(0);

  const thinkingSubStatus = [...thinkingSubStatuses].reverse().find((s) => thinkingElapsed * 1000 >= s.at)?.text ?? "Searching network...";

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    if (prefersReduced) {
      setPhase("agent-done");
      setInputText(USER_MESSAGE);
      return;
    }

    const run = async () => {
      for (let i = 1; i <= USER_MESSAGE.length; i++) {
        await new Promise((r) => setTimeout(r, USER_TYPING_SPEED));
        setInputText(USER_MESSAGE.slice(0, i));
      }
      await new Promise((r) => setTimeout(r, 400));
      setPhase("user-sent");
      await new Promise((r) => setTimeout(r, 600));
      setPhase("agent-thinking");
      setThinkingElapsed(0);

      const start = Date.now();
      while (true) {
        const elapsed = (Date.now() - start) / 1000;
        if (elapsed >= AGENT_THINKING_DURATION / 1000) break;
        setThinkingElapsed(elapsed);
        await new Promise((r) => setTimeout(r, 100));
      }
      setThinkingElapsed(AGENT_THINKING_DURATION / 1000);
      setPhase("agent-done");

      await new Promise((r) => setTimeout(r, 1200));
      setPhase("pausing");
    };

    run();
  }, [prefersReduced]);

  const isIdle = phase === "idle" || phase === "pausing";

  return (
    <div className={cn("relative mx-auto w-full max-w-md", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <div className="flex items-start gap-3">
          <div className="flex flex-col items-center gap-2 pt-2">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-700",
              isIdle
                ? "border-muted-foreground/20 text-muted-foreground/40"
                : "border-foreground text-foreground",
            )}>
              <PersonIcon />
            </div>
            <span className={cn(
              "text-[10px] font-medium tracking-wider transition-colors duration-700",
              isIdle ? "text-muted-foreground/30" : "text-muted-foreground/60",
            )}>
              You
            </span>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="flex min-h-[120px] flex-col justify-end">
              <AnimatePresence mode="wait">
                {(phase === "user-typing" || phase === "user-sent") && (
                  <motion.div
                    key="user-typing"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-border bg-card px-4 py-3 shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-sm text-card-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                        U
                      </span>
                      <span>{inputText}</span>
                    </div>
                  </motion.div>
                )}

                {phase === "agent-done" && (
                  <motion.div
                    key="user-sent"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-xl border border-border bg-card px-4 py-3 shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-sm text-card-foreground">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                        U
                      </span>
                      <span className="opacity-80">{inputText}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {(phase === "agent-thinking" || phase === "agent-done") && (
            <motion.div
              key="agent-column"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="ml-[52px] mt-3 flex items-start gap-3 overflow-hidden"
            >
              <div className="flex flex-1 flex-col">
                <div className="flex min-h-[60px] flex-col justify-end">
                  {phase === "agent-thinking" && (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-xl border border-border bg-card px-4 py-3 shadow-xs"
                    >
                      <div className="flex items-center gap-2 text-sm text-card-foreground">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                          A
                        </span>
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "0ms" }} />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "150ms" }} />
                            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" style={{ animationDelay: "300ms" }} />
                          </span>
                          <span className="text-[13px]">{thinkingSubStatus}</span>
                        </span>
                      </div>
                      <div className="mt-1.5 pl-7">
                        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-foreground/20"
                            style={{ width: `${(thinkingElapsed / (AGENT_THINKING_DURATION / 1000)) * 100}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {phase === "agent-done" && (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-xl border border-border bg-card px-4 py-3 shadow-xs"
                    >
                      <div className="flex items-start gap-2 text-sm text-card-foreground">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[9px] font-semibold text-muted-foreground">
                          A
                        </span>
                        <div>
                          {agentResponse.map((line, i) => {
                            if (line === "") return <div key={i} className="h-1.5" />;
                            if (line.startsWith("\u2022")) {
                              return <p key={i} className="text-[13px] text-muted-foreground/80">{line}</p>;
                            }
                            return <p key={i} className="leading-relaxed">{line}</p>;
                          })}
                          <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-muted-foreground/50">
                            <span className="rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground">
                              {Math.floor(thinkingElapsed)}s
                            </span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 pt-2">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-700",
                  phase === "agent-done"
                    ? "border-muted-foreground/20 text-muted-foreground/40"
                    : "border-foreground text-foreground",
                )}>
                  <SparkleIcon />
                </div>
                <span className={cn(
                  "text-[10px] font-medium tracking-wider transition-colors duration-700",
                  phase === "agent-done" ? "text-muted-foreground/30" : "text-muted-foreground/60",
                )}>
                  Agent
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "pausing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ml-[52px] mt-3 flex items-center gap-2 px-1"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/10">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-success">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            <span className="text-[12px] text-muted-foreground/50">Completed</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

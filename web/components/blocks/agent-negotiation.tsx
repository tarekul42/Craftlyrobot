"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const USER_MESSAGE = "Need urgent O+ blood in Dhaka";
const USER_TYPING_SPEED = 65;
const AGENT_THINKING_DURATION = 5000;
const COMPLETE_PAUSE = 6000;
const SCROLLBAR_WIDTH = 5;

const agentResponse = `Done! Found your donor in 47 seconds. Here's who stepped up:

Rafi — O+ donor, 8 months since last donation. Healthy, 1.1 km away in Banani. Confirmed for 4pm today.

Two other donors were checked:
• One donated recently (too soon, champ)
• One was 5 km away (too far for a rush)

Rafi picked up on the first ring. Real one.

Sharing his contact and location now. He'll be expecting you.`;

const thinkingSubStatuses = [
  { at: 0, text: "Searching network..." },
  { at: 2000, text: "Checking eligibility of 3 nearby donors..." },
  { at: 3500, text: "Negotiating with donor #3..." },
];

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

export function AgentNegotiation({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const chatRef = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState<"idle" | "user-typing" | "user-sent" | "agent-thinking" | "agent-done" | "pausing">("idle");
  const [inputText, setInputText] = useState("");
  const [thinkingElapsed, setThinkingElapsed] = useState(0);

  const thinkingSubStatus = [...thinkingSubStatuses].reverse().find((s) => thinkingElapsed * 1000 >= s.at)?.text ?? "Searching network...";

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (prefersReduced) {
      setPhase("agent-done");
      setInputText(USER_MESSAGE);
      return;
    }
    if (phase !== "idle") return;

    setPhase("user-typing");
    let i = 0;
    const typingInterval = setInterval(() => {
      i++;
      setInputText(USER_MESSAGE.slice(0, i));
      if (i >= USER_MESSAGE.length) {
        clearInterval(typingInterval);
        const send = setTimeout(() => {
          setPhase("user-sent");
          const think = setTimeout(() => {
            setPhase("agent-thinking");
            setThinkingElapsed(0);
          }, 600);
          return () => clearTimeout(think);
        }, 400);
        return () => clearTimeout(send);
      }
    }, USER_TYPING_SPEED);
    return () => clearInterval(typingInterval);
  }, [phase, prefersReduced]);

  useEffect(() => {
    if (phase !== "agent-thinking") return;
    if (prefersReduced) {
      setPhase("agent-done");
      return;
    }
    const interval = setInterval(() => {
      setThinkingElapsed((s) => {
        const next = s + 0.1;
        if (next >= AGENT_THINKING_DURATION / 1000) {
          clearInterval(interval);
          setPhase("agent-done");
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [phase, prefersReduced]);

  useEffect(() => {
    if (phase === "agent-done" && !prefersReduced) {
      const t = setTimeout(() => {
        setPhase("pausing");
        const restart = setTimeout(() => {
          setPhase("idle");
          setInputText("");
          setThinkingElapsed(0);
        }, COMPLETE_PAUSE);
        return () => clearTimeout(restart);
      }, 1200);
      return () => clearTimeout(t);
    }
  }, [phase, prefersReduced]);

  useEffect(() => {
    scrollToBottom();
  }, [phase, inputText, thinkingElapsed]);

  const showUserBubble = phase !== "idle";

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="border-foreground/[0.08] bg-background/95 flex flex-col overflow-hidden rounded-2xl border shadow-xl shadow-foreground/[0.04] backdrop-blur-sm"
      >
        <div className="border-foreground/[0.08] flex items-center gap-2 border-b px-4 py-2.5">
          <span className="relative flex h-1.5 w-1.5 items-center justify-center">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                phase === "agent-done" ? "bg-foreground/50" : "bg-foreground",
              )}
            />
            {phase !== "agent-done" && phase !== "pausing" && (
              <span className="bg-foreground absolute inset-0 animate-ping rounded-full opacity-30" />
            )}
          </span>
          <span className="text-foreground/50 text-[10px] font-bold uppercase tracking-widest">
            {phase === "agent-done" ? "Complete" : "Live"}
          </span>
          {phase !== "agent-done" && (
            <>
              <span className="text-foreground/[0.08] mx-0.5">·</span>
              <span className="text-foreground/40 text-[10px] font-medium">Agent Network</span>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <div
            ref={chatRef}
            className="h-[320px] overflow-y-auto px-4 py-3"
            role="region"
            aria-label="Agent negotiation simulation"
          >
            <style>{`
              .chat-scrollbar::-webkit-scrollbar {
                width: ${SCROLLBAR_WIDTH}px;
              }
              .chat-scrollbar::-webkit-scrollbar-track {
                background: transparent;
              }
              .chat-scrollbar::-webkit-scrollbar-thumb {
                background: var(--scrollbar-thumb, rgba(0,0,0,0.15));
                border-radius: 999px;
              }
              .chat-scrollbar::-webkit-scrollbar-thumb:hover {
                background: var(--scrollbar-thumb-hover, rgba(0,0,0,0.25));
              }
              .dark .chat-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255,255,255,0.15);
              }
              .dark .chat-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255,255,255,0.25);
              }
            `}</style>

            <div className="chat-scrollbar flex min-h-full flex-col justify-end">
              <AnimatePresence mode="popLayout">
                {showUserBubble && (
                  <motion.div
                    key="user"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-3 flex justify-end"
                  >
                    <div className="flex max-w-[85%] flex-row-reverse items-start gap-2.5">
                      <div className="bg-foreground flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-background">
                        U
                      </div>
                      <div>
                        <div className="flex flex-row-reverse items-center gap-1.5">
                          <span className="text-foreground/50 text-[10px] font-semibold">You</span>
                        </div>
                        <div className="bg-foreground text-background mt-0.5 rounded-2xl px-3.5 py-2 text-sm">
                          {inputText}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {(phase === "agent-thinking" || phase === "agent-done") && (
                  <motion.div
                    key="agent"
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-1 flex justify-start"
                  >
                    <div className="flex max-w-full items-start gap-2.5">
                      <div className="bg-foreground/[0.08] flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-foreground/60">
                        A
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-foreground/50 text-[10px] font-semibold">Your Agent</span>
                        </div>

                        {phase === "agent-thinking" ? (
                          <div className="border-foreground/[0.08] bg-foreground/[0.04] mt-0.5 rounded-2xl border px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="bg-foreground/50 h-2 w-2 animate-pulse rounded-full" />
                              <span className="text-foreground/60 font-medium">{thinkingSubStatus}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-[11px] text-foreground/35">
                              <span className="bg-foreground/35 h-1 w-1 rounded-full" />
                              {Math.floor(thinkingElapsed)}s elapsed
                            </div>
                          </div>
                        ) : (
                          <div className="bg-foreground/[0.06] border-foreground/[0.08] mt-0.5 rounded-2xl border px-4 py-3 text-sm leading-relaxed">
                            {agentResponse.split("\n").map((line, i) => {
                              if (line.startsWith("Rafi —")) {
                                return (
                                  <p key={i} className="font-semibold">
                                    {line}
                                  </p>
                                );
                              }
                              if (line.startsWith("•") || line.startsWith("─")) {
                                return (
                                  <p key={i} className="text-foreground/60 text-[13px]">
                                    {line}
                                  </p>
                                );
                              }
                              if (line === "") {
                                return <div key={i} className="h-2" />;
                              }
                              return (
                                <p key={i} className="text-foreground/80">
                                  {line}
                                </p>
                              );
                            })}
                            <div className="mt-3 flex items-center gap-1.5">
                              <span className="bg-foreground/10 text-foreground/50 rounded-full px-2 py-0.5 text-[10px] font-semibold">
                                Done in {Math.floor(thinkingElapsed)}s
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-foreground/[0.08] flex items-center gap-2 border-t px-3 py-2">
            <div className="border-foreground/[0.08] bg-foreground/[0.02] flex flex-1 items-center rounded-xl border px-3 py-2 text-sm">
              <input
                type="text"
                readOnly
                value={phase === "user-typing" ? inputText : ""}
                placeholder={phase === "idle" ? "Message your agent..." : ""}
                className="bg-transparent flex-1 text-sm text-foreground outline-none placeholder:text-foreground/25"
                aria-label="Message your agent"
              />
              {(phase === "user-typing" || phase === "idle") && (
                <span
                  className={cn(
                    "h-4 w-[1px] animate-pulse",
                    phase === "idle" ? "bg-foreground/15" : "bg-foreground/50",
                  )}
                />
              )}
            </div>
            <button
              disabled
              aria-label="Send"
              className="bg-foreground text-background flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-opacity"
            >
              <ArrowIcon />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

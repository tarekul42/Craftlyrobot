"use client";

import { useEffect, useState, useCallback } from "react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow/eyebrow";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface DemoStep {
  user: string;
  agent: string;
  label: string;
}

const demos: DemoStep[] = [
  {
    user: "আমার একটা অ্যাপ লাগবে",
    agent: "বুঝেছি। কি ধরনের অ্যাপ চান?",
    label: "Bangla",
  },
  {
    user: "I need an app built",
    agent: "Got it. What kind of app?",
    label: "English",
  },
  {
    user: "amar ekta app lagbe",
    agent: "Bujhesi. Ki dhoroner app chan?",
    label: "Banglish",
  },
];

const STEP_DURATION = 4000;
const TYPE_SPEED = 30;

function typeText(text: string, onChar: (full: string) => void, done: () => void, speed: number) {
  let i = 0;
  const interval = setInterval(() => {
    i++;
    onChar(text.slice(0, i));
    if (i >= text.length) {
      clearInterval(interval);
      done();
    }
  }, speed);
  return () => clearInterval(interval);
}

export function NuanceShowcase({ className }: { className?: string }) {
  const prefersReduced = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<"user-typing" | "user-done" | "agent-typing" | "agent-done" | "pausing">("user-typing");
  const [userText, setUserText] = useState("");
  const [agentText, setAgentText] = useState("");

  const step = demos[activeIndex]!;

  const runStep = useCallback((s: DemoStep) => {
    setUserText("");
    setAgentText("");
    setPhase("user-typing");

    const cleanup = typeText(
      s.user,
      setUserText,
      () => {
        setPhase("user-done");
        const t2 = setTimeout(() => {
          setPhase("agent-typing");
          typeText(
            s.agent,
            setAgentText,
            () => {
              setPhase("agent-done");
              const t3 = setTimeout(() => {
                setPhase("pausing");
                const t4 = setTimeout(() => {
                  setActiveIndex((i) => (i + 1) % demos.length);
                }, 800);
                return () => clearTimeout(t4);
              }, 1200);
              return () => clearTimeout(t3);
            },
            TYPE_SPEED,
          );
        }, 500);
        return () => clearTimeout(t2);
      },
      TYPE_SPEED,
    );
    return cleanup;
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setUserText(step.user);
      setAgentText(step.agent);
      setPhase("pausing");
      const t = setInterval(() => {
        setActiveIndex((i) => (i + 1) % demos.length);
      }, STEP_DURATION);
      return () => clearInterval(t);
    }

    return runStep(step);
  }, [activeIndex, step, prefersReduced, runStep]);

  const handleDotClick = (i: number) => {
    setActiveIndex(i);
  };

  return (
    <Section className={className}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div>
            <Eyebrow className="mb-4">Nuance Engine</Eyebrow>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Speaks your language.
            </h2>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Bangla, English, or Banglish — Craftly understands what you mean,
              not just what you type. No translation required.
            </p>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              This removes the biggest barrier for Bangladeshi users: they can
              speak naturally, in the language they think in, and still get
              things done.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {demos.map((d, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Show ${d.label} example`}
                  aria-current={i === activeIndex}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === activeIndex
                      ? "bg-foreground w-6"
                      : "bg-foreground/30 hover:bg-foreground/50 w-2",
                  )}
                />
              ))}
            </div>
          </div>

          <div
            className={cn(
              "border-border bg-background rounded-xl border p-5 font-mono text-sm leading-relaxed",
              "shadow-lg shadow-black/5",
            )}
          >
            <div className="border-border mb-4 flex items-center gap-2 border-b pb-3">
              <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                {step.label}
              </span>
            </div>

            {phase !== "pausing" || userText.length > 0 ? (
              <div className="mb-4">
                <div className="text-muted-foreground mb-1 text-[11px] font-semibold uppercase">
                  You
                </div>
                <div className="bg-muted rounded-lg px-3 py-2">
                  {userText}
                  {phase === "user-typing" && (
                    <span className="animate-pulse">|</span>
                  )}
                </div>
              </div>
            ) : null}

            {(phase === "agent-typing" || phase === "agent-done" || phase === "pausing") && (
              <div>
                <div className="text-muted-foreground mb-1 text-[11px] font-semibold uppercase">
                  Agent
                </div>
                <div className="bg-primary/5 text-primary rounded-lg px-3 py-2">
                  {agentText}
                  {phase === "agent-typing" && (
                    <span className="animate-pulse">|</span>
                  )}
                </div>
              </div>
            )}

            {phase === "agent-done" && (
              <p className="text-muted-foreground mt-3 text-center text-xs">
                Understanding intent, not just keywords.
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

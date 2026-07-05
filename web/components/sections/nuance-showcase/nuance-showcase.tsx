"use client";

import { useEffect, useState, useCallback } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow/eyebrow";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface DemoStep {
  user: string;
  agent: string;
  label: string;
  context: string;
  flag: string;
}

const demos: DemoStep[] = [
  {
    user: "আমার একটা অ্যাপ লাগবে",
    agent: "বুঝেছি। কি ধরনের অ্যাপ চান?",
    label: "Bangla",
    context: "App building",
    flag: "🇧🇩",
  },
  {
    user: "I need an app built",
    agent: "Got it. What kind of app?",
    label: "English",
    context: "App building",
    flag: "🇬🇧",
  },
  {
    user: "amar ekta app lagbe",
    agent: "Bujhesi. Ki dhoroner app chan?",
    label: "Banglish",
    context: "App building",
    flag: "🔤",
  },
  {
    user: "আমার O+ রক্ত দরকার",
    agent: "পাচ্ছি। আপনার এলাকায় ৩ জন ডোনার আছেন।",
    label: "Bangla",
    context: "Blood donor",
    flag: "🇧🇩",
  },
  {
    user: "I need O+ blood",
    agent: "Found 3 donors in your area. Verifying eligibility...",
    label: "English",
    context: "Blood donor",
    flag: "🇬🇧",
  },
  {
    user: "amar O+ rakto dorkar",
    agent: "Pacchi. Apnar elakay 3 jon donor achen.",
    label: "Banglish",
    context: "Blood donor",
    flag: "🔤",
  },
  {
    user: "বনানী থেকে গুলশান যাবো",
    agent: "পাচ্ছি। ৩ টা ড্রাইভার পাওয়া গেছে।",
    label: "Bangla",
    context: "Ride share",
    flag: "🇧🇩",
  },
  {
    user: "banani theke gulshan jabo",
    agent: "Pacchi. 3 ta driver paoa geche.",
    label: "Banglish",
    context: "Ride share",
    flag: "🔤",
  },
];

const features = [
  "Understands mixed-language sentences",
  "No grammar needed — just speak naturally",
  "Context-aware responses in any script",
  "Bangla · English · Banglish all supported",
];

const STEP_DURATION = 4500;
const TYPE_SPEED = 25;

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

            <ul className="mt-6 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-2">
              {demos.map((d, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Show ${d.label} ${d.context} example`}
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
              "border-border/80 bg-background rounded-xl border p-5 font-mono text-sm leading-relaxed",
              "shadow-lg shadow-black/5",
            )}
          >
            <div className="border-border/80 mb-4 flex items-center gap-2 border-b pb-3">
              <span className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                {step.flag} {step.label}
              </span>
              <span className="text-muted-foreground/30 mx-1">·</span>
              <span className="text-muted-foreground text-[10px] font-medium">{step.context}</span>
            </div>

            <div className="h-[180px] overflow-hidden">
              {phase !== "pausing" || userText.length > 0 ? (
                <div className="mb-3">
                  <div className="text-muted-foreground mb-1 text-[10px] font-semibold uppercase">
                    You
                  </div>
                  <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                    {userText}
                    {phase === "user-typing" && (
                      <span className="animate-pulse">|</span>
                    )}
                  </div>
                </div>
              ) : null}

              {(phase === "agent-typing" || phase === "agent-done" || phase === "pausing") && (
                <div>
                  <div className="text-muted-foreground mb-1 text-[10px] font-semibold uppercase">
                    Agent
                  </div>
                  <div className="bg-primary/5 text-primary rounded-lg px-3 py-2 text-sm">
                    {agentText}
                    {phase === "agent-typing" && (
                      <span className="animate-pulse">|</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {phase === "agent-done" && (
              <p className="text-muted-foreground mt-3 text-center text-[11px]">
                Understanding intent, not just keywords.
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

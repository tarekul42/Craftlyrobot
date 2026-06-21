"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface TerminalCommand {
  input: string;
  output: string;
}

const defaultCommands: TerminalCommand[] = [
  {
    input: 'craftly build "todo app"',
    output: "✓ Building... 12s\n✓ APK ready: /output/todo-app.apk",
  },
  {
    input: "craftly deploy --production",
    output: "→ Uploading to Play Store...\n✓ Live on Play Store",
  },
  {
    input: "craftly status",
    output: "Active builds: 0\nLast deploy: 2 minutes ago\nStatus: healthy",
  },
];

interface AnimatedTerminalProps {
  commands?: TerminalCommand[];
  className?: string;
}

/**
 * AnimatedTerminal — the Craftly signature component.
 * Simulates typing a command and showing a response, looping forever.
 *
 * Respects prefers-reduced-motion (shows static output instead of typing).
 */
export function AnimatedTerminal({
  commands = defaultCommands,
  className,
}: AnimatedTerminalProps) {
  const prefersReduced = usePrefersReducedMotion();
  const [commandIndex, setCommandIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");

  useEffect(() => {
    const cmd = commands[commandIndex]!;
    if (prefersReduced) {
      setTyped(cmd.input);
      setPhase("output");
      return;
    }

    if (phase === "typing") {
      if (typed.length < cmd.input.length) {
        const t = setTimeout(() => {
          setTyped(cmd.input.slice(0, typed.length + 1));
        }, 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("output"), 600);
        return () => clearTimeout(t);
      }
    }
    if (phase === "output") {
      const t = setTimeout(() => setPhase("pause"), 2800);
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      setTyped("");
      setCommandIndex((i) => (i + 1) % commands.length);
      setPhase("typing");
    }
  }, [phase, typed, commandIndex, commands, prefersReduced]);

  return (
    <div
      className={[
        "w-full max-w-lg overflow-hidden rounded-lg border bg-[#0d0d0e] shadow-2xl",
        "font-mono text-[#f6f5f2]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      role="region"
      aria-label="Craftly Robot terminal demo"
    >
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-white/40">craftly — bash</span>
      </div>

      {/* Terminal body */}
      <div className="space-y-3 p-6 text-sm sm:text-base">
        <p className="flex items-baseline gap-3">
          <span className="text-[#9f9f9f]">$</span>
          <span className="break-all">{typed}</span>
          {phase === "typing" && !prefersReduced && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block text-white"
              aria-hidden="true"
            >
              |
            </motion.span>
          )}
        </p>
        {phase !== "typing" && (
          <motion.pre
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="whitespace-pre-wrap break-words text-[#e8e8e8]"
          >
            {commands[commandIndex]!.output}
          </motion.pre>
        )}
      </div>
    </div>
  );
}

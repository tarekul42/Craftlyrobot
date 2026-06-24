"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  size?: "normal" | "compact";
}

type ScriptStatus = "loading" | "ready" | "error";

let scriptStatus: ScriptStatus = "loading";
const listeners = new Set<() => void>();

function loadScript() {
  if (typeof window === "undefined") return;
  if (window.turnstile) {
    scriptStatus = "ready";
    return;
  }
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    scriptStatus = "ready";
    listeners.forEach((fn) => fn());
    listeners.clear();
  };
  script.onerror = () => {
    scriptStatus = "error";
    listeners.forEach((fn) => fn());
    listeners.clear();
  };
  document.head.appendChild(script);

  setTimeout(() => {
    if (scriptStatus === "loading") {
      scriptStatus = "error";
      listeners.forEach((fn) => fn());
      listeners.clear();
    }
  }, 10000);
}

loadScript();

function onScriptReady(fn: () => void) {
  if (scriptStatus === "ready") {
    fn();
  } else if (scriptStatus === "loading") {
    listeners.add(fn);
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
}

export function Turnstile({
  onVerify,
  onExpire,
  onError,
  className,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const onErrorRef = useRef(onError);
  const [scriptFailed, setScriptFailed] = useState(false);

  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;
  onErrorRef.current = onError;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    const render = () => {
      if (!window.turnstile || !node) return;
      while (node.firstChild) node.removeChild(node.firstChild);
      widgetIdRef.current = window.turnstile.render(node, {
        sitekey: siteKey,
        callback: (token: string) => onVerifyRef.current(token),
        "error-callback": () => onErrorRef.current?.(),
        "expired-callback": () => {
          if (widgetIdRef.current) {
            window.turnstile?.reset(widgetIdRef.current);
          }
          onExpireRef.current?.();
        },
        theme: "auto",
        size: "normal",
      });
    };

    if (scriptStatus === "error") {
      setScriptFailed(true);
      return;
    }

    onScriptReady(render);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = undefined;
      }
    };
  }, []);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <div
        className={cn(
          "border-border bg-muted/30 text-muted-foreground rounded-md border border-dashed p-4 text-sm",
          className,
        )}
      >
        Bot protection is disabled. Set{" "}
        <code className="bg-muted rounded px-1 py-0.5 font-mono text-xs">
          NEXT_PUBLIC_TURNSTILE_SITE_KEY
        </code>{" "}
        to enable Cloudflare Turnstile.
      </div>
    );
  }

  if (scriptFailed) {
    return (
      <div
        className={cn(
          "border-destructive/30 bg-destructive/5 text-destructive rounded-md border border-dashed p-4 text-sm",
          className,
          "flex items-start gap-2",
        )}
        role="alert"
      >
        <span>
          Bot verification failed to load. Please refresh the page or email{" "}
          <a
            href="mailto:hello@craftlyrobot.com"
            className="underline underline-offset-2"
          >
            hello@craftlyrobot.com
          </a>
          .
        </span>
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}

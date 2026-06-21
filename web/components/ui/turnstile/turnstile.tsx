"use client";

import { useCallback, useEffect, useState } from "react";
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

let scriptLoaded = false;
const scriptPromise = new Promise<void>((resolve) => {
  if (scriptLoaded || typeof window === "undefined") return;
  if (window.turnstile) {
    scriptLoaded = true;
    resolve();
    return;
  }
  const script = document.createElement("script");
  script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
  script.async = true;
  script.defer = true;
  script.onload = () => {
    scriptLoaded = true;
    resolve();
  };
  document.head.appendChild(script);
});

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
  className?: string;
}

/**
 * Turnstile — Cloudflare Turnstile widget for bot protection.
 *
 * Gracefully degrades when no site key is configured (development mode).
 * In that case, it renders a note explaining how to enable it.
 *
 * Requires NEXT_PUBLIC_TURNSTILE_SITE_KEY in environment.
 *
 * @example
 * <Turnstile onVerify={(token) => form.setValue("turnstileToken", token)} />
 */
export function Turnstile({
  onVerify,
  onExpire,
  onError,
  className,
}: TurnstileProps) {
  const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!siteKey) return;

    scriptPromise.then(() => {
      if (!window.turnstile) return;
      while (node.firstChild) node.removeChild(node.firstChild);
      window.turnstile.render(node, {
        sitekey: siteKey,
        callback: onVerify,
        "error-callback": onError,
        "expired-callback": onExpire,
        theme: "auto",
        size: "normal",
      });
    });
  }, [onVerify, onExpire, onError]);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    return (
      <div
        className={cn(
          "rounded-md border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground",
          className
        )}
      >
        Bot protection is disabled. Set{" "}
        <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
          NEXT_PUBLIC_TURNSTILE_SITE_KEY
        </code>{" "}
        to enable Cloudflare Turnstile.
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}

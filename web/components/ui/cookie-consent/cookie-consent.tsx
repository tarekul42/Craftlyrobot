"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

interface ConsentBannerProps {
  /** Storage key for consent preference (default: "craftly-consent") */
  storageKey?: string;
  /** Days until consent expires (default: 365) */
  expiryDays?: number;
  className?: string;
}

/**
 * ConsentBanner — GDPR consent banner.
 *
 * Shows a banner at the bottom of the screen asking for consent.
 * Stores the user's choice in localStorage (no cookies set).
 *
 * Note: Craftly uses Plausible (cookieless analytics), so this banner
 * is mostly for show and for any future third-party scripts that need it.
 *
 * @example
 * <ConsentBanner />  // add once in root layout
 */
export function CookieConsent({
  storageKey = "craftly-consent",
  expiryDays = 365,
  className,
}: ConsentBannerProps) {
  const [show, setShow] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const storageKeyRef = useRef(storageKey);
  const expiryDaysRef = useRef(expiryDays);

  storageKeyRef.current = storageKey;
  expiryDaysRef.current = expiryDays;

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const setConsent = useCallback(
    (consent: "granted" | "denied" | "dismissed") => {
      const data = {
        consent,
        timestamp: Date.now(),
        expires: Date.now() + expiryDaysRef.current * 24 * 60 * 60 * 1000,
      };
      localStorage.setItem(storageKeyRef.current, JSON.stringify(data));
      setShow(false);
    },
    [],
  );

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setConsent("dismissed");
    };
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [show, setConsent]);

  if (!show) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Privacy consent"
      tabIndex={-1}
      className={cn(
        "border-border bg-card fixed right-4 bottom-4 left-4 z-[1200] mx-auto max-w-2xl rounded-lg border p-4 shadow-2xl sm:p-6",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <Cookie
          className="text-muted-foreground mt-0.5 h-6 w-6 shrink-0"
          aria-hidden="true"
        />
        <div className="flex-1">
          <p className="text-foreground text-sm">
            We use privacy-friendly analytics to improve Craftly. No personal
            data is sold. Read our{" "}
            <a
              href="/privacy"
              className="text-foreground font-medium underline underline-offset-4"
            >
              privacy policy
            </a>
            .
          </p>
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={() => setConsent("granted")}>
              Allow
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setConsent("denied")}
            >
              Decline
            </Button>
          </div>
        </div>
        <button
          onClick={() => setConsent("dismissed")}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

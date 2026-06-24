"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [storageKey]);

  const handleAccept = () => {
    const data = {
      consent: "granted",
      timestamp: Date.now(),
      expires: Date.now() + expiryDays * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
    setShow(false);
  };

  const handleDecline = () => {
    const data = {
      consent: "denied",
      timestamp: Date.now(),
      expires: Date.now() + expiryDays * 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(storageKey, JSON.stringify(data));
    setShow(false);
  };

  const handleDismiss = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Privacy consent"
      className={cn(
        "border-border bg-card fixed bottom-4 left-4 right-4 z-[1200] mx-auto max-w-2xl rounded-lg border p-4 shadow-2xl sm:p-6",
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
            <Button size="sm" onClick={handleAccept}>
              Allow
            </Button>
            <Button size="sm" variant="outline" onClick={handleDecline}>
              Decline
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-muted-foreground hover:bg-muted hover:text-foreground rounded-md p-1"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

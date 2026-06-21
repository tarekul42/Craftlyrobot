"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useCopyToClipboard — copies text to clipboard and tracks copied state.
 *
 * @example
 * const { copied, copy } = useCopyToClipboard();
 * <button onClick={() => copy("hello")}>
 *   {copied ? "Copied!" : "Copy"}
 * </button>
 *
 * @param resetDelay - ms before resetting copied state to false (default 2000)
 */
export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        return true;
      } catch (err) {
        console.error("Failed to copy:", err);
        return false;
      }
    },
    []
  );

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), resetDelay);
    return () => clearTimeout(timer);
  }, [copied, resetDelay]);

  return { copied, copy };
}

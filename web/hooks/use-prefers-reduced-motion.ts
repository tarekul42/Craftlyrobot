import { useEffect, useState } from "react";

/**
 * usePrefersReducedMotion — returns true if the user has requested reduced motion.
 *
 * Respects the OS-level `prefers-reduced-motion` setting.
 * Use this to disable non-essential animations for users who prefer reduced motion.
 *
 * @example
 * const prefersReduced = usePrefersReducedMotion();
 * if (prefersReduced) return <Static />;
 * return <motion.div animate={{ opacity: 1 }}>...</motion.div>;
 */
export function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefers(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefers;
}

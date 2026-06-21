import { useEffect, useState } from "react";

/**
 * useScrollPosition — returns the current vertical scroll position.
 *
 * @example
 * const scrollY = useScrollPosition();
 * const isScrolled = scrollY > 20;
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    handler(); // set initial
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return scrollY;
}

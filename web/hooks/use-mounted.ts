"use client";

import { useEffect, useState } from "react";

/**
 * useMounted — returns true after the component has mounted on the client.
 *
 * Use this to prevent hydration mismatches when a component renders
 * different content on the server vs the client (e.g., theme-dependent UI).
 *
 * @example
 * const mounted = useMounted();
 * if (!mounted) return null;
 * return <ClientOnlyContent />;
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

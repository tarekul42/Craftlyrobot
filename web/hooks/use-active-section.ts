"use client";

import { useEffect, useState } from "react";

/**
 * useActiveSection — tracks which section is currently in view.
 * Used to highlight the current section in a table of contents.
 *
 * @param sectionIds - array of section element IDs to track
 * @returns the ID of the currently active section (or null)
 *
 * @example
 * const activeSection = useActiveSection(["section-1", "section-2", "section-3"]);
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(
    sectionIds[0] ?? null,
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry that's most in view
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px", // bias toward the top of the viewport
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

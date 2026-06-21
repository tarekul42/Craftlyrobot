"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * useToc — scans a container for headings (h2, h3) and returns a table of contents.
 *
 * @example
 * const toc = useToc("article-content");
 * // toc = [{ id: "section-1", text: "Section 1", level: 2 }, ...]
 *
 * @param containerId - the ID of the element to scan for headings
 */
export function useToc(containerId: string): TocItem[] {
  const [toc, setToc] = useState<TocItem[]>([]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const headings = container.querySelectorAll("h2, h3");
    const items: TocItem[] = Array.from(headings).map((heading, index) => {
      const text = heading.textContent ?? "";
      const level = heading.tagName === "H2" ? 2 : 3;
      // Use existing ID if present, otherwise generate one
      const id =
        heading.id ||
        `toc-${index}-${text
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")}`;
      if (!heading.id) heading.id = id;
      return { id, text, level };
    });

    setToc(items);
  }, [containerId]);

  return toc;
}

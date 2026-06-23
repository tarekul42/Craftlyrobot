import { describe, it, expect } from "vitest";
import { mainNav, footerNav, legalNav } from "./navigation";

describe("mainNav", () => {
  it("has navigation items", () => {
    expect(mainNav.length).toBeGreaterThan(0);
  });

  it("each item has title and href", () => {
    for (const item of mainNav) {
      expect(item.title).toBeTruthy();
      expect(item.href).toBeTruthy();
    }
  });

  it("child items have valid hrefs", () => {
    for (const item of mainNav) {
      if (item.children) {
        for (const child of item.children) {
          expect(child.href).toBeTruthy();
        }
      }
    }
  });
});

describe("footerNav", () => {
  it("has footer sections", () => {
    expect(Object.keys(footerNav).length).toBeGreaterThan(0);
  });

  it("each section has items", () => {
    for (const [, items] of Object.entries(footerNav)) {
      expect(items.length).toBeGreaterThan(0);
    }
  });
});

describe("legalNav", () => {
  it("has privacy, terms, security", () => {
    const titles = legalNav.map((n) => n.title);
    expect(titles).toContain("Privacy");
    expect(titles).toContain("Terms");
    expect(titles).toContain("Security");
  });
});

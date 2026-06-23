import { describe, it, expect } from "vitest";
import { generatePageMetadata, organizationJsonLd, websiteJsonLd, faqJsonLd } from "./seo";

describe("generatePageMetadata", () => {
  it("generates title with site name suffix", () => {
    const meta = generatePageMetadata({
      title: "Test Page",
      path: "/test",
    });
    expect(meta.title).toContain("Test Page");
  });

  it("sets canonical path", () => {
    const meta = generatePageMetadata({
      title: "Test",
      path: "/test",
    });
    expect(meta.alternates?.canonical).toBe("/test");
  });

  it("marks noIndex pages", () => {
    const meta = generatePageMetadata({
      title: "Test",
      path: "/test",
      noIndex: true,
    });
    const robots = meta.robots;
    if (typeof robots === "object" && robots !== null) {
      expect(robots.index).toBe(false);
    }
  });

  it("sets article type when publishedTime provided", () => {
    const meta = generatePageMetadata({
      title: "Post",
      path: "/blog/test",
      publishedTime: "2026-01-01",
    });
    const og = meta.openGraph;
    if (og && typeof og === "object" && "type" in og) {
      expect(og.type).toBe("article");
    }
  });
});

describe("organizationJsonLd", () => {
  it("returns valid JSON-LD structure", () => {
    const ld = organizationJsonLd();
    expect(ld["@type"]).toBe("Organization");
    expect(ld.name).toBeDefined();
    expect(ld.url).toBeDefined();
  });
});

describe("websiteJsonLd", () => {
  it("returns valid JSON-LD structure", () => {
    const ld = websiteJsonLd();
    expect(ld["@type"]).toBe("WebSite");
    expect(ld.potentialAction).toBeDefined();
  });
});

describe("faqJsonLd", () => {
  it("transforms questions to JSON-LD format", () => {
    const questions = [
      { question: "Q1", answer: "A1" },
      { question: "Q2", answer: "A2" },
    ];
    const ld = faqJsonLd(questions);
    expect(ld.mainEntity).toHaveLength(2);
    expect(ld.mainEntity[0]?.name).toBe("Q1");
    expect(ld.mainEntity[0]?.acceptedAnswer?.text).toBe("A1");
  });
});

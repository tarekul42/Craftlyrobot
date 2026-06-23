import { describe, it, expect } from "vitest";
import { communityStats, testimonials } from "./community";

describe("communityStats", () => {
  it("has required numeric fields", () => {
    expect(typeof communityStats.contributorsJoined).toBe("number");
    expect(typeof communityStats.targetContributors).toBe("number");
    expect(typeof communityStats.departments).toBe("number");
    expect(typeof communityStats.activeProjects).toBe("number");
  });
});

describe("testimonials", () => {
  it("has at least one testimonial", () => {
    expect(testimonials.length).toBeGreaterThan(0);
  });

  it("each testimonial has required fields", () => {
    for (const t of testimonials) {
      expect(t.quote).toBeTruthy();
      expect(t.author).toBeTruthy();
      expect(t.role).toBeTruthy();
    }
  });
});

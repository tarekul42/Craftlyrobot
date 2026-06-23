import { describe, it, expect } from "vitest";
import { trackEvent, analytics } from "./analytics";

describe("trackEvent", () => {
  it("does not throw when called on server", () => {
    expect(() => trackEvent("test_event")).not.toThrow();
  });

  it("does not throw when plausible is not defined", () => {
    expect(() => trackEvent("test_event", { key: "value" })).not.toThrow();
  });
});

describe("analytics helper", () => {
  it("generates event names without throwing", () => {
    expect(() => analytics.ctaClick("hero", "/apply")).not.toThrow();
    expect(() => analytics.applicationSubmitted("frontend")).not.toThrow();
    expect(() => analytics.contactSubmitted()).not.toThrow();
    expect(() => analytics.newsletterSignup()).not.toThrow();
    expect(() => analytics.blogPostView("test-post")).not.toThrow();
    expect(() => analytics.themeToggle("dark")).not.toThrow();
  });
});

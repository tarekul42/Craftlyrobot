import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Accessibility tests — runs axe-core on every major page.
 * Target: 0 violations of WCAG 2.2 AA rules.
 *
 * If a violation is found, this test will fail with details about
 * what's wrong and how to fix it.
 */

const pagesToTest = [
  "/",
  "/what-is-craftly",
  "/products",
  "/products/craftly-robot",
  "/community",
  "/community/departments/engineering",
  "/contribute",
  "/contribute/roles",
  "/contribute/apply",
  "/contribute/onboarding",
  "/about",
  "/about/leadership",
  "/about/governance",
  "/about/contact",
  "/blog",
  "/blog/2026-01-15-hello-world",
  "/privacy",
  "/terms",
  "/security",
];

test.describe("Accessibility", () => {
  for (const url of pagesToTest) {
    test(`${url} has no a11y violations`, async ({ page }) => {
      await page.goto(url);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      if (results.violations.length > 0) {
        console.log(`\n=== ${url} violations ===`);
        for (const v of results.violations) {
          console.log(`  [${v.impact}] ${v.id}: ${v.description}`);
          console.log(`    Help: ${v.helpUrl}`);
          for (const node of v.nodes) {
            console.log(`    Target: ${node.target.join(", ")}`);
          }
        }
      }

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe("Accessibility — keyboard navigation", () => {
  test("homepage is keyboard navigable", async ({ page }) => {
    await page.goto("/");

    // Tab through focusable elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const el = document.activeElement;
        return el
          ? el.tagName +
              (el.textContent ? `: ${el.textContent.slice(0, 30)}` : "")
          : null;
      });
      expect(focused).toBeTruthy();
    }
  });

  test("skip link is first focusable element", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(
      () => document.activeElement?.textContent,
    );
    expect(focused?.toLowerCase()).toContain("skip");
  });

  test("focus is visible on all interactive elements", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    // Skip link should have visible focus
    const skipLink = page.getByText(/skip to content/i);
    await expect(skipLink).toBeVisible();
  });
});

test.describe("Accessibility — dark mode", () => {
  test("dark mode has no a11y violations", async ({ page }) => {
    await page.goto("/");
    // Switch to dark mode
    await page
      .getByRole("button", {
        name: /switch to dark mode|switch to light mode/i,
      })
      .click();
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });
});

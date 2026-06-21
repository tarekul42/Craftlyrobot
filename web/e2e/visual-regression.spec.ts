import { test, expect } from "@playwright/test";

/**
 * Visual regression tests — captures screenshots of key pages
 * and compares them against baseline.
 *
 * First run: generates baselines.
 * Subsequent runs: compares against baselines.
 *
 * To update baselines (after intentional UI changes):
 *   bunx playwright test --update-snapshots
 */

const pagesToSnapshot = [
  { name: "homepage", url: "/" },
  { name: "what-is-craftly", url: "/what-is-craftly" },
  { name: "products", url: "/products" },
  { name: "community", url: "/community" },
  { name: "contribute", url: "/contribute" },
  { name: "contribute-apply", url: "/contribute/apply" },
  { name: "about", url: "/about" },
  { name: "blog", url: "/blog" },
  { name: "privacy", url: "/privacy" },
];

test.describe("Visual regression — desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const page of pagesToSnapshot) {
    test(`${page.name} matches baseline`, async ({ page: browserPage }) => {
      await browserPage.goto(page.url);
      await browserPage.waitForLoadState("networkidle");
      await expect(browserPage).toHaveScreenshot(`${page.name}.png`, {
        maxDiffPixelRatio: 0.01,
        fullPage: true,
      });
    });
  }
});

test.describe("Visual regression — mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  for (const page of pagesToSnapshot) {
    test(`${page.name} mobile matches baseline`, async ({ page: browserPage }) => {
      await browserPage.goto(page.url);
      await browserPage.waitForLoadState("networkidle");
      await expect(browserPage).toHaveScreenshot(`${page.name}-mobile.png`, {
        maxDiffPixelRatio: 0.01,
        fullPage: true,
      });
    });
  }
});

test.describe("Visual regression — dark mode", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("homepage dark mode matches baseline", async ({ page }) => {
    await page.goto("/");
    // Switch to dark mode
    await page.getByRole("button", { name: /switch to dark mode|switch to light mode/i }).click();
    await page.waitForTimeout(500);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("homepage-dark.png", {
      maxDiffPixelRatio: 0.01,
      fullPage: true,
    });
  });
});

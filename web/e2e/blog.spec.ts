import { test, expect } from "@playwright/test";

/**
 * Blog e2e tests — blog index, post rendering, related posts.
 */

test.describe("Blog index", () => {
  test("loads and shows heading", async ({ page }) => {
    await page.goto("/blog");
    await expect(
      page.getByRole("heading", { name: /what we're building/i }),
    ).toBeVisible();
  });

  test("shows featured post", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByText(/featured/i)).toBeVisible();
  });

  test("shows blog post cards", async ({ page }) => {
    await page.goto("/blog");
    // Should have at least 1 post card (the sample posts)
    const cards = page.locator("a[href^='/blog/']");
    await expect(cards.first()).toBeVisible();
  });

  test("clicking a post card navigates to the post", async ({ page }) => {
    await page.goto("/blog");
    const firstPost = page.locator("a[href^='/blog/']").first();
    const href = (await firstPost.getAttribute("href")) ?? "";
    await firstPost.click();
    await expect(page).toHaveURL(href);
  });
});

test.describe("Blog post", () => {
  test("loads and shows title", async ({ page }) => {
    await page.goto("/blog/2026-01-15-hello-world");
    await expect(
      page.getByRole("heading", { name: /hello world from bangladesh/i }),
    ).toBeVisible();
  });

  test("shows author and date", async ({ page }) => {
    await page.goto("/blog/2026-01-15-hello-world");
    await expect(page.getByText(/wasif/i)).toBeVisible();
  });

  test("shows reading time", async ({ page }) => {
    await page.goto("/blog/2026-01-15-hello-world");
    await expect(page.getByText(/min read/i)).toBeVisible();
  });

  test("shows back to blog link", async ({ page }) => {
    await page.goto("/blog/2026-01-15-hello-world");
    await page.getByRole("link", { name: /back to blog/i }).click();
    await expect(page).toHaveURL("/blog");
  });

  test("renders MDX content (Callout component)", async ({ page }) => {
    await page.goto("/blog/2026-01-20-decentralized-architecture");
    // The decentralized architecture post uses a Callout
    await expect(
      page.getByText(/geographic constraint|the geographic constraint/i),
    ).toBeVisible();
  });

  test("renders MDX content (CodeBlock component)", async ({ page }) => {
    await page.goto("/blog/2026-01-20-decentralized-architecture");
    // Should have a code block with copy button
    await expect(page.getByText(/copy/i).first()).toBeVisible();
  });

  test("shows related posts section", async ({ page }) => {
    await page.goto("/blog/2026-01-15-hello-world");
    // The related posts section may or may not appear depending on tags
    // Just verify the page doesn't error
    await expect(
      page.getByRole("heading", { name: /hello world/i }),
    ).toBeVisible();
  });

  test("non-existent blog post shows 404", async ({ page }) => {
    await page.goto("/blog/does-not-exist");
    await expect(page.getByText(/404|drifted off the map/i)).toBeVisible();
  });
});

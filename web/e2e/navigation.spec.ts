import { test, expect } from "@playwright/test";

/**
 * Navigation e2e tests — verifies all major routes are reachable
 * and the header/footer navigation works.
 */

test.describe("Navigation", () => {
  test("all main nav links work", async ({ page }) => {
    await page.goto("/");

    const navLinks = [
      { text: /what is craftly/i, url: "/what-is-craftly" },
      { text: /products/i, url: "/products" },
      { text: /community/i, url: "/community" },
      { text: /contribute/i, url: "/contribute" },
      { text: /about/i, url: "/about" },
    ];

    for (const link of navLinks) {
      await page.goto("/");
      await page
        .locator("header")
        .getByRole("link", { name: link.text })
        .click();
      await expect(page).toHaveURL(new RegExp(link.url));
    }
  });

  test("footer links are visible", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer.getByText(/privacy/i)).toBeVisible();
    await expect(footer.getByText(/terms/i)).toBeVisible();
    await expect(footer.getByText(/security/i)).toBeVisible();
  });

  test("footer legal links work", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("footer")
      .getByRole("link", { name: /privacy/i })
      .click();
    await expect(page).toHaveURL(/\/privacy/);
  });

  test("social links open in new tab", async ({ page }) => {
    await page.goto("/");
    const facebookLink = page
      .locator("footer")
      .getByRole("link", { name: /facebook/i });
    await expect(facebookLink).toHaveAttribute("target", "_blank");
    await expect(facebookLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});

test.describe("404 page", () => {
  test("shows custom 404 for unknown routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText(/drifted off the map|404/i)).toBeVisible();
  });

  test("404 page has link to home", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await page.getByRole("link", { name: /back to home/i }).click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Dynamic routes", () => {
  test("product detail page loads", async ({ page }) => {
    await page.goto("/products/craftly-robot");
    await expect(page.getByText(/craftly robot/i)).toBeVisible();
  });

  test("department detail page loads", async ({ page }) => {
    await page.goto("/community/departments/engineering");
    await expect(page.getByText(/engineering/i)).toBeVisible();
  });

  test("blog post loads", async ({ page }) => {
    await page.goto("/blog/2026-01-15-hello-world");
    await expect(page.getByText(/hello world from bangladesh/i)).toBeVisible();
  });

  test("non-existent product shows 404", async ({ page }) => {
    await page.goto("/products/does-not-exist");
    await expect(page.getByText(/404|drifted off the map/i)).toBeVisible();
  });
});

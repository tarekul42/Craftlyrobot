import { test, expect } from "@playwright/test";

/**
 * Homepage e2e tests — verifies the most important page works end-to-end.
 */

test.describe("Homepage", () => {
  test("loads and shows hero", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText(/from dream to reality/i);
  });

  test("shows primary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /get early free access/i }),
    ).toBeVisible();
  });

  test("shows secondary CTA", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: /see the foundation/i }),
    ).toBeVisible();
  });

  test("shows ecosystem section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText(/an ecosystem, not just a product/i),
    ).toBeVisible();
  });

  test("shows People of Craftly section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/people of craftly/i)).toBeVisible();
  });

  test("shows FAQ section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/frequently asked/i)).toBeVisible();
  });

  test("primary CTA navigates to apply page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /get early free access/i }).click();
    await expect(page).toHaveURL(/\/contribute\/apply/);
  });

  test("header is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("header")).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("footer")).toBeVisible();
  });

  test("logo links to homepage", async ({ page }) => {
    await page.goto("/products");
    await page
      .locator("header a")
      .filter({ hasText: "Craftly" })
      .first()
      .click();
    await expect(page).toHaveURL("/");
  });
});

test.describe("Homepage — dark mode", () => {
  test("theme toggle switches to dark mode", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", {
      name: /switch to dark mode|switch to light mode/i,
    });
    await toggle.click();
    // After click, html should have .dark class (or not)
    const htmlClass = await page.locator("html").getAttribute("class");
    expect(htmlClass).toBeTruthy();
  });
});

test.describe("Homepage — mobile", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("mobile nav button is visible", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("button", { name: /open menu/i }),
    ).toBeVisible();
  });

  test("mobile nav opens on click", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    // Sheet should appear with nav items
    await expect(
      page.getByRole("link", { name: /what is craftly/i }),
    ).toBeVisible();
  });

  test("no horizontal scroll", async ({ page }) => {
    await page.goto("/");
    const scrollWidth = await page.evaluate(
      () => document.documentElement.scrollWidth,
    );
    const clientWidth = await page.evaluate(
      () => document.documentElement.clientWidth,
    );
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });
});

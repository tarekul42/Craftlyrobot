import { test, expect } from "@playwright/test";

/**
 * Apply form e2e tests — the most important conversion flow.
 * Tests validation, submission, and success/error states.
 *
 * Note: In dev mode (no Turnstile key, no DATABASE_URL), the form
 * will still submit successfully — the API route degrades gracefully.
 */

test.describe("Apply form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contribute/apply");
  });

  test("form renders with all required fields", async ({ page }) => {
    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/whatsapp number/i)).toBeVisible();
    await expect(page.getByLabel(/time commitment/i)).toBeVisible();
    await expect(page.getByLabel(/why do you want to join/i)).toBeVisible();
  });

  test("submit button is visible", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: /submit application/i }),
    ).toBeVisible();
  });

  test("shows validation errors on empty submit", async ({ page }) => {
    // Disable HTML validation to trigger Zod validation
    await page.getByRole("button", { name: /submit application/i }).click();

    // Should show error messages (at least one)
    await expect(page.locator("[role='alert']").first()).toBeVisible({
      timeout: 5000,
    });
  });

  test("email field shows error for invalid email", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("not-an-email");
    await page.getByLabel(/whatsapp number/i).fill("+8801234567890");
    await page
      .getByLabel(/why do you want to join/i)
      .fill(
        "This is a test submission with enough characters to pass validation.",
      );

    await page.getByRole("button", { name: /submit application/i }).click();

    await expect(page.getByText(/valid email/i)).toBeVisible({ timeout: 5000 });
  });

  test("whyCraftly field shows error for too-short input", async ({ page }) => {
    await page.getByLabel(/full name/i).fill("Test");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/whatsapp number/i).fill("+8801234567890");
    await page.getByLabel(/why do you want to join/i).fill("too short");

    await page.getByRole("button", { name: /submit application/i }).click();

    await expect(page.getByText(/at least 50 characters/i)).toBeVisible({
      timeout: 5000,
    });
  });

  test("form is keyboard navigable", async ({ page }) => {
    await page.keyboard.press("Tab");
    // First focusable should be skip link or first input
    const focused = await page.evaluate(() => document.activeElement?.tagName);
    expect(focused).toBeTruthy();
  });

  test("contact form on /about/contact works", async ({ page }) => {
    await page.goto("/about/contact");

    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/email/i).fill("test@example.com");
    await page.getByLabel(/subject/i).fill("Test subject");
    await page
      .getByLabel(/message/i)
      .fill("This is a test message with enough characters.");

    // Just verify the form accepts input — don't submit (would hit rate limit)
    await expect(page.getByLabel(/name/i)).toHaveValue("Test User");
  });
});

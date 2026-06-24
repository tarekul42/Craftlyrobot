import { test, expect } from "@playwright/test";

const STATIC_PAGES = [
  "/",
  "/products",
  "/products/craftly-robot",
  "/community",
  "/community/departments",
  "/community/departments/engineering",
  "/community/projects",
  "/contribute",
  "/contribute/apply",
  "/contribute/roles",
  "/about",
  "/about/contact",
  "/blog",
  "/blog/2026-01-15-hello-world",
  "/updates",
  "/privacy",
  "/terms",
  "/security",
];

test.describe("Smoke tests — all static pages", () => {
  for (const path of STATIC_PAGES) {
    test(`${path} returns 200 and has an h1`, async ({ page }) => {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
    });
  }
});

test.describe("Smoke tests — common elements", () => {
  test("header visible on marketing pages", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("header")).toBeVisible();
  });

  test("footer visible on marketing pages", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("footer")).toBeVisible();
  });

  test("legal pages have minimal layout", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page.locator("h1")).toBeVisible();
  });
});

test.describe("Smoke tests — API", () => {
  test("health endpoint returns ok", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body).toHaveProperty("ok");
  });

  test("OPTIONS on apply returns CORS headers", async ({ request }) => {
    const res = await request.options("/api/apply");
    expect(res.headers()["access-control-allow-methods"]).toContain("POST");
  });
});

test.describe("Smoke tests — 404", () => {
  test("nonexistent page returns 404", async ({ page }) => {
    const res = await page.goto("/this-page-does-not-exist");
    expect(res?.status()).toBe(404);
  });
});

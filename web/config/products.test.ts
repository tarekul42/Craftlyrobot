import { describe, it, expect } from "vitest";
import { products, getProductBySlug, foundationProducts } from "./products";

describe("products", () => {
  it("has at least one product", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("each product has required fields", () => {
    for (const product of products) {
      expect(product.slug).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.tagline).toBeTruthy();
      expect(product.description).toBeTruthy();
      expect(["coming-soon", "internal", "active", "deprecated"]).toContain(product.status);
    }
  });

  it("slugs are unique", () => {
    const slugs = products.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe("getProductBySlug", () => {
  it("returns the matching product", () => {
    const product = getProductBySlug("craftly-robot");
    expect(product).toBeDefined();
    expect(product?.name).toBe("Craftly Robot");
  });

  it("returns undefined for unknown slug", () => {
    expect(getProductBySlug("nonexistent")).toBeUndefined();
  });
});

describe("foundationProducts", () => {
  it("excludes the main product", () => {
    const slugs = foundationProducts.map((p) => p.slug);
    expect(slugs).not.toContain("craftly-robot");
  });
});

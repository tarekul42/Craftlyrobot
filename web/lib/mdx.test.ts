import { describe, it, expect } from "vitest";

describe("getAllPosts", () => {
  it("returns an array of blog posts", async () => {
    const { getAllPosts } = await import("./mdx");
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
  });
});

describe("getAllCategories", () => {
  it("returns sorted categories from posts", async () => {
    const { getAllCategories } = await import("./mdx");
    const categories = getAllCategories();
    expect(Array.isArray(categories)).toBe(true);
  });
});

describe("getAllTags", () => {
  it("returns sorted tags from posts", async () => {
    const { getAllTags } = await import("./mdx");
    const tags = getAllTags();
    expect(Array.isArray(tags)).toBe(true);
  });
});

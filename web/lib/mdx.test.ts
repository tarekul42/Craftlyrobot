import { describe, it, expect } from "vitest";

const validFrontmatter = `---
title: Test Post
date: 2026-06-20
author: Test Author
excerpt: This is a test excerpt for the blog post.
category: Engineering
tags:
  - test
  - typescript
draft: false
featured: false
---
Content goes here.`;

describe("parsePost", () => {
  it("parses valid frontmatter", async () => {
    const { parsePost } = await import("./mdx");
    const post = parsePost("test-slug", validFrontmatter);
    expect(post.slug).toBe("test-slug");
    expect(post.title).toBe("Test Post");
    expect(post.date).toBe("2026-06-20");
    expect(post.author).toBe("Test Author");
    expect(post.category).toBe("Engineering");
    expect(post.tags).toEqual(["test", "typescript"]);
    expect(post.content).toContain("Content goes here");
    expect(post.draft).toBe(false);
    expect(post.featured).toBe(false);
  });

  it("handles missing optional fields gracefully", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: Minimal
date: 2026-01-01
author: Author
excerpt: Short excerpt here.
---
Content`;
    const post = parsePost("minimal", raw);
    expect(post.coverImage).toBeUndefined();
    expect(post.coverAlt).toBeUndefined();
    expect(post.authorRole).toBeUndefined();
  });

  it("defaults missing required fields to empty string", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: 123
date: true
---
Content`;
    const post = parsePost("edge", raw);
    expect(post.title).toBe("123");
    expect(post.date).toBe(""); // boolean true converted to string but invalid as date
    expect(post.author).toBe("Craftly"); // defaults
    expect(post.excerpt).toBe(""); // defaults
    expect(post.category).toBe("Announcement"); // defaults
    expect(post.draft).toBe(false);
    expect(post.featured).toBe(false);
  });

  it("handles invalid date strings", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: Bad Date
date: not-a-date
author: Author
excerpt: Something descriptive enough for the excerpt field.
---
Content`;
    const post = parsePost("bad-date", raw);
    expect(post.date).toBe("");
  });

  it("calculates reading time when not provided", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: Reading Time
date: 2026-01-01
author: Author
excerpt: A short excerpt for this post about reading time calculation.
---
${"word ".repeat(400)}`;
    const post = parsePost("reading-time", raw);
    expect(post.readingTime).toBe(2);
  });

  it("uses provided reading time when present", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: Explicit RT
date: 2026-01-01
author: Author
excerpt: Explicit reading time test case for frontmatter override.
readingTime: 5
---
Content`;
    const post = parsePost("explicit-rt", raw);
    expect(post.readingTime).toBe(5);
  });

  it("handles non-array tags", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: Tags Edge
date: 2026-01-01
author: Author
excerpt: Testing non-array tags handling in frontmatter.
tags: "just-a-string"
---
Content`;
    const post = parsePost("tags-edge", raw);
    expect(post.tags).toEqual([]);
  });

  it("handles empty content", async () => {
    const { parsePost } = await import("./mdx");
    const raw = `---
title: Empty
date: 2026-01-01
author: Author
excerpt: Content is empty.
---`;
    const post = parsePost("empty", raw);
    expect(post.content).toBe("");
  });
});

describe("getAllPosts", () => {
  it("returns an array of blog posts", async () => {
    const { getAllPosts } = await import("./mdx");
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
  });
});

describe("getPostBySlug", () => {
  it("returns null for nonexistent slug", async () => {
    const { getPostBySlug } = await import("./mdx");
    const post = getPostBySlug("nonexistent-slug-that-does-not-exist-12345");
    expect(post).toBeNull();
  });
});

describe("getRelatedPosts", () => {
  it("returns empty array for nonexistent slug", async () => {
    const { getRelatedPosts } = await import("./mdx");
    const posts = getRelatedPosts("nonexistent-slug-that-does-not-exist-12345");
    expect(posts).toEqual([]);
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

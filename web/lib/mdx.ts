import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost } from "@/types/content";

/**
 * MDX utilities — read blog posts from content/blog/ directory.
 *
 * File naming convention: YYYY-MM-DD-kebab-case.mdx
 * The date in the filename MUST match the `date` field in frontmatter.
 *
 * Frontmatter schema (see types/content.ts BlogPost interface):
 *   title: string (required)
 *   date: YYYY-MM-DD (required)
 *   author: string (required)
 *   excerpt: string (required, 100-200 chars)
 *   category: "Announcement" | "Engineering" | "Community" | "Product" | "Guide"
 *   tags: string[] (1-5 tags, kebab-case)
 *   coverImage: string (optional, path relative to /public)
 *   coverAlt: string (required if coverImage)
 *   draft: boolean (default false — drafts hidden in production)
 *   featured: boolean (default false — pinned on blog index)
 *   readingTime: number (optional — auto-calculated if omitted)
 */

const BLOG_DIR = path.join(process.cwd(), "content/blog");

/**
 * Calculate reading time in minutes based on word count.
 * Average reading speed: 200 words per minute.
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Get all blog posts, sorted by date (newest first).
 * Drafts are excluded in production but included in development.
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const isDev = process.env.NODE_ENV === "development";
  const filenames = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts: BlogPost[] = filenames.map((filename) => {
    const fullPath = path.join(BLOG_DIR, filename);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(raw);

    const slug = filename.replace(/\.mdx$/, "");
    const readingTime =
      typeof data.readingTime === "number"
        ? data.readingTime
        : calculateReadingTime(content);

    return {
      slug,
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      author: String(data.author ?? "Craftly"),
      authorRole: data.authorRole ? String(data.authorRole) : undefined,
      category: String(data.category ?? "Announcement"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      coverImage: data.coverImage ? String(data.coverImage) : undefined,
      coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
      readingTime,
      draft: Boolean(data.draft ?? false),
      featured: Boolean(data.featured ?? false),
      content,
    };
  });

  return posts
    .filter((post) => isDev || !post.draft)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * Get a single blog post by slug.
 * Returns null if the post doesn't exist.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const readingTime =
    typeof data.readingTime === "number"
      ? data.readingTime
      : calculateReadingTime(content);

  return {
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    author: String(data.author ?? "Craftly"),
    authorRole: data.authorRole ? String(data.authorRole) : undefined,
    category: String(data.category ?? "Announcement"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    coverAlt: data.coverAlt ? String(data.coverAlt) : undefined,
    readingTime,
    draft: Boolean(data.draft ?? false),
    featured: Boolean(data.featured ?? false),
    content,
  };
}

/**
 * Get all unique categories from published posts.
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.map((p) => p.category))).sort();
}

/**
 * Get all unique tags from published posts.
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  return Array.from(new Set(posts.flatMap((p) => p.tags))).sort();
}

/**
 * Get related posts (same category or shared tags).
 * Returns up to 3 posts, excluding the current one.
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const allPosts = getAllPosts();
  const current = allPosts.find((p) => p.slug === currentSlug);
  if (!current) return [];

  return allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      let score = 0;
      if (p.category === current.category) score += 2;
      score += p.tags.filter((t) => current.tags.includes(t)).length;
      return { post: p, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
}

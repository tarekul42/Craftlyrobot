import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlogPostCard } from "./blog-post-card";

const mockPost = {
  slug: "test-post",
  title: "Test Blog Post",
  date: "2026-06-20",
  excerpt: "This is a test excerpt for the blog post card component.",
  author: "Test Author",
  category: "Engineering",
  tags: ["test"],
  readingTime: 3,
  draft: false,
  featured: false,
  content: "",
};

describe("BlogPostCard", () => {
  it("renders post title as link", () => {
    render(<BlogPostCard post={mockPost} />);
    const link = screen.getByText("Test Blog Post");
    expect(link.closest("a")).toHaveAttribute("href", "/blog/test-post");
  });

  it("renders category badge", () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText("Engineering")).toBeInTheDocument();
  });

  it("renders reading time", () => {
    render(<BlogPostCard post={mockPost} />);
    expect(screen.getByText("3 min")).toBeInTheDocument();
  });
});

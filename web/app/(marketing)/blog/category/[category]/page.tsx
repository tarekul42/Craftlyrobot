import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Eyebrow,
} from "@/components/ui";
import { BlogPostCard } from "@/components/cards";
import { Newsletter } from "@/components/sections/newsletter";
import { getAllPosts, getAllCategories } from "@/lib/mdx";

/**
 * Generate static params for all categories.
 */
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const categoryName = decodeCategory(category);

  return {
    title: `${categoryName} — Blog`,
    description: `All ${categoryName} posts from Craftly.`,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

function decodeCategory(slug: string): string {
  // Convert "engineering" → "Engineering", "announcement" → "Announcement"
  const categories = getAllCategories();
  const match = categories.find((c) => c.toLowerCase() === slug.toLowerCase());
  return match ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryName = decodeCategory(category);

  const allPosts = getAllPosts();
  const posts = allPosts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      <Section spacing="lg" className="border-b border-border">
        <Container>
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>

          <Eyebrow className="mb-4">Category</Eyebrow>
          <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
            {categoryName}
          </h1>
          <p className="mt-6 max-w-prose text-lg text-foreground/80">
            {posts.length} post{posts.length === 1 ? "" : "s"} in this category.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          {posts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">
                  No posts in this category yet. Check back soon.
                </p>
                <Link
                  href="/blog"
                  className="mt-4 inline-block text-foreground underline underline-offset-4"
                >
                  View all posts
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}

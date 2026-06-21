import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, Badge, Eyebrow } from "@/components/ui";
import { Newsletter } from "@/components/sections/newsletter";
import { getAllPosts, getAllCategories } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, engineering deep-dives, and stories from Craftly — a contributor-driven ecosystem building from Bangladesh.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Craftly Blog",
    description: "Updates, engineering deep-dives, and stories from Craftly.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <>
      {/* Hero */}
      <Section spacing="lg" className="border-border border-b">
        <Container>
          <Eyebrow className="mb-4">Blog</Eyebrow>
          <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl">
            What we&apos;re building
          </h1>
          <p className="text-foreground/80 mt-6 max-w-prose text-lg">
            Updates, engineering deep-dives, and stories from Craftly. Written
            by the people building it.
          </p>
        </Container>
      </Section>

      {/* Featured post */}
      {featuredPost && (
        <Section>
          <Container>
            <Eyebrow className="mb-4">Featured</Eyebrow>
            <Link href={`/blog/${featuredPost.slug}`} className="block">
              <Card interactive className="overflow-hidden">
                <CardContent className="grid gap-6 p-6 md:grid-cols-2 md:p-8">
                  <div>
                    <Badge variant="secondary">{featuredPost.category}</Badge>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mt-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="text-muted-foreground mt-4 flex items-center gap-4 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(featuredPost.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featuredPost.readingTime} min read
                      </span>
                      <span>By {featuredPost.author}</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    <span className="text-foreground inline-flex items-center gap-1 text-sm font-medium">
                      Read post
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </Container>
        </Section>
      )}

      {/* All posts */}
      <Section background="muted">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">All posts</h2>
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge key={cat} variant="outline">
                    {cat}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {otherPosts.length === 0 ? (
            <p className="text-muted-foreground mt-12 text-center">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block h-full"
                >
                  <Card interactive className="h-full">
                    <CardContent className="flex h-full flex-col p-6">
                      <Badge variant="secondary" className="self-start">
                        {post.category}
                      </Badge>
                      <h3 className="mt-3 text-lg font-semibold">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 flex-1 text-sm">
                        {post.excerpt}
                      </p>
                      <div className="text-muted-foreground mt-4 flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {post.readingTime} min
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

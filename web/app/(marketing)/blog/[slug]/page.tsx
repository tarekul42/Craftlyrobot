import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Badge, Button, Eyebrow } from "@/components/ui";
import { Prose } from "@/components/ui";
import { ReadingProgress } from "@/components/ui/reading-progress/reading-progress";
import { TableOfContents } from "@/components/ui/table-of-contents/table-of-contents";
import { mdxComponents } from "@/components/mdx";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/mdx";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 2);

  return (
    <>
      <ReadingProgress />

      <Section spacing="sm" className="border-border border-b">
        <Container>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1 text-sm"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to blog
          </Link>

          <Badge variant="secondary" className="mb-3">
            {post.category}
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">{post.excerpt}</p>

          <div className="text-muted-foreground mt-6 flex flex-wrap items-center gap-4 text-sm">
            <span>
              By {post.author}
              {post.authorRole ? `, ${post.authorRole}` : ""}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </div>

          {post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_220px]">
            <div className="min-w-0">
              <Prose>
                <div id="post-content">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                      },
                    }}
                  />
                </div>
              </Prose>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents containerId="post-content" />
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {relatedPosts.length > 0 && (
        <Section background="muted">
          <Container>
            <Eyebrow className="mb-4">Keep reading</Eyebrow>
            <h2 className="text-2xl font-bold tracking-tight">Related posts</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="block h-full"
                >
                  <div className="border-border bg-background hover:border-foreground/20 flex h-full flex-col rounded-lg border p-6 transition-all hover:shadow-md">
                    <Badge variant="secondary" className="self-start">
                      {related.category}
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold">
                      {related.title}
                    </h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm">
                      {related.excerpt}
                    </p>
                    <span className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium">
                      Read post
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section>
        <Container size="prose">
          <div className="border-border bg-muted/30 rounded-lg border p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              Want to build with us?
            </h2>
            <p className="text-muted-foreground mt-2">
              We&apos;re always looking for contributors.
            </p>
            <Button asChild className="mt-6">
              <Link href="/contribute/apply">Apply to Craftly</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

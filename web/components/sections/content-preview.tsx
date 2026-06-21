import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeading, Card, CardContent, Badge } from "@/components/ui";

interface ContentItem {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
}

interface ContentPreviewProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: ContentItem[];
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

/**
 * ContentPreview — grid of latest content (blog posts, changelog, etc).
 */
export function ContentPreview({
  eyebrow,
  title,
  description,
  items,
  viewAllHref,
  viewAllLabel = "View all",
  className,
}: ContentPreviewProps) {
  return (
    <section className={cn("py-section-y", className)}>
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
            >
              {viewAllLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Link key={i} href={item.href} className="block h-full">
              <Card interactive className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <Badge variant="secondary" className="self-start">{item.category}</Badge>
                  <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">{item.excerpt}</p>
                  <time className="mt-4 text-xs text-muted-foreground">{item.date}</time>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

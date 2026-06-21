import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import type { BlogPost } from "@/types/content";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card interactive className="h-full">
        <CardContent className="flex h-full flex-col p-6">
          <Badge variant="secondary" className="self-start">
            {post.category}
          </Badge>
          <h3 className="mt-3 text-lg font-semibold">{post.title}</h3>
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
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

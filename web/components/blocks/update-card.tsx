import Link from "next/link";
import {
  Rocket,
  Loader,
  Trophy,
  Megaphone,
  Users,
  Eye,
  ArrowRight,
} from "lucide-react";
import type { Update, UpdateType } from "@/types/update";
import { cn } from "@/lib/utils";

const typeConfig: Record<
  UpdateType,
  { icon: React.ReactNode; label: string }
> = {
  shipped: { icon: <Rocket className="h-3.5 w-3.5" />, label: "Shipped" },
  progress: { icon: <Loader className="h-3.5 w-3.5" />, label: "In progress" },
  milestone: { icon: <Trophy className="h-3.5 w-3.5" />, label: "Milestone" },
  announcement: {
    icon: <Megaphone className="h-3.5 w-3.5" />,
    label: "Announcement",
  },
  community: { icon: <Users className="h-3.5 w-3.5" />, label: "Community" },
  "behind-the-scenes": {
    icon: <Eye className="h-3.5 w-3.5" />,
    label: "Behind the scenes",
  },
};

const typeBadgeStyles: Record<UpdateType, string> = {
  shipped: "bg-success/10 text-success border-success/20",
  progress: "bg-muted text-muted-foreground border-border",
  milestone: "bg-warning/10 text-warning border-warning/20",
  announcement: "bg-accent/30 text-accent-foreground border-accent/40",
  community: "bg-primary/5 text-primary border-primary/20",
  "behind-the-scenes": "bg-muted text-muted-foreground border-border",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

interface UpdateCardProps {
  update: Update;
  variant?: "full" | "compact";
}

export function UpdateCard({ update, variant = "full" }: UpdateCardProps) {
  const config = typeConfig[update.type];
  const isFull = variant === "full";

  return (
    <article
      className={cn(
        "border-border bg-background rounded-lg border p-5",
        isFull && "p-6",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium",
                typeBadgeStyles[update.type],
              )}
            >
              {config.icon}
              {config.label}
            </span>
            <time className="text-muted-foreground text-xs tabular-nums">
              {formatDate(update.date)}
            </time>
          </div>

          <h3
            className={cn(
              "font-semibold leading-snug",
              isFull ? "text-base" : "text-sm",
            )}
          >
            {update.title}
          </h3>

          <p
            className={cn(
              "text-muted-foreground leading-relaxed",
              isFull ? "text-sm" : "text-xs line-clamp-2",
            )}
          >
            {update.summary}
          </p>
        </div>
      </div>

      {isFull && update.link && (
        <div className="mt-3">
          <Link
            href={update.link.href}
            className="text-foreground inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            {update.link.label}
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </article>
  );
}

export { formatDate, typeConfig };

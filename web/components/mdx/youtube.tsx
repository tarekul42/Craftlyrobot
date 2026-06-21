import { cn } from "@/lib/utils";

interface YouTubeProps {
  id: string;
  title: string;
  className?: string;
}

/**
 * YouTube — responsive YouTube embed for MDX content.
 *
 * @example
 * <YouTube id="dQw4w9WgXcQ" title="Craftly origin story" />
 */
export function YouTube({ id, title, className }: YouTubeProps) {
  return (
    <div
      className={cn(
        "border-border my-6 overflow-hidden rounded-lg border",
        className,
      )}
    >
      <div className="relative aspect-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

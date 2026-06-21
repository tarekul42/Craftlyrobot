import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  className?: string;
}

/**
 * Image — optimized image with optional caption for MDX content.
 * Wraps next/image with consistent styling.
 *
 * @example
 * <Image
 *   src="/blog/hello-world/cover.png"
 *   alt="The Craftly team"
 *   width={1200}
 *   height={800}
 *   caption="The founding team at our Dhaka office."
 * />
 */
export function Image({ src, alt, width, height, caption, className }: ImageProps) {
  return (
    <figure className={cn("my-6", className)}>
      <div className="overflow-hidden rounded-lg border border-border">
        <NextImage
          src={src}
          alt={alt}
          width={width ?? 1200}
          height={height ?? 630}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 760px"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

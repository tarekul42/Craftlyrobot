import * as React from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h2" | "h3";
  className?: string;
}

/**
 * SectionHeading — standardized section heading pattern.
 * Combines optional eyebrow + title + optional description.
 *
 * @example
 * <SectionHeading
 *   eyebrow="Decentralized intelligence"
 *   title="Built to move beyond data center limits"
 * />
 */
function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center mx-auto max-w-2xl",
        className
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </Heading>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { SectionHeading };

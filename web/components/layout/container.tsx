import { cn } from "@/lib/utils";

/**
 * Container — centered max-width wrapper used inside every section.
 *
 * @example
 * <Container>
 *   <h1>Content here</h1>
 * </Container>
 *
 * <Container size="prose">  // narrow 760px for editorial
 *   <BlogPost />
 * </Container>
 */
interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "prose" | "narrow" | "default" | "wide";
}

export function Container({
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "px-section mx-auto w-full",
        size === "prose" && "max-w-prose",
        size === "narrow" && "max-w-screen-narrow",
        size === "default" && "max-w-screen-default",
        size === "wide" && "max-w-screen-wide",
        className,
      )}
      {...props}
    />
  );
}

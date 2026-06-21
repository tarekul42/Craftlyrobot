import { cn } from "@/lib/utils";

/**
 * Section — vertical page section with standard padding.
 * Every page is composed of multiple <Section> blocks stacked vertically.
 *
 * @example
 * <Section>
 *   <Container>...</Container>
 * </Section>
 *
 * <Section background="muted" spacing="lg">
 *   <Container>...</Container>
 * </Section>
 */
interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  spacing?: "none" | "sm" | "default" | "lg";
  background?: "default" | "muted" | "accent";
}

export function Section({
  as: Comp = "section",
  spacing = "default",
  background = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <Comp
      className={cn(
        "px-section",
        spacing === "default" && "py-section-y",
        spacing === "sm" && "py-12",
        spacing === "lg" && "py-32",
        background === "muted" && "bg-muted",
        background === "accent" && "bg-accent/30",
        className,
      )}
      {...props}
    />
  );
}

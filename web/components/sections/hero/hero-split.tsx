import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui";

interface HeroSplitProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Form or interactive element on the right */
  form?: React.ReactNode;
  className?: string;
}

/**
 * HeroSplit — text on left, form on right.
 * Use on /contribute/apply and /about/contact.
 */
export function HeroSplit({
  eyebrow,
  title,
  description,
  form,
  className,
}: HeroSplitProps) {
  return (
    <section className={cn("border-border border-b", className)}>
      <Container size="wide">
        <div className="grid gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:py-32">
          <div className="flex flex-col justify-center">
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="text-foreground/80 mt-6 max-w-prose text-lg leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {form && (
            <div className="flex items-center justify-center">{form}</div>
          )}
        </div>
      </Container>
    </section>
  );
}

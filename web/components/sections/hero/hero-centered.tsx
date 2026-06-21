import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow, Button } from "@/components/ui";

interface CTA {
  label: string;
  href: string;
}

interface HeroCenteredProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  className?: string;
}

/**
 * HeroCentered — centered text, no visual.
 * Use for section opener pages (e.g., /what-is-craftly, /community).
 */
export function HeroCentered({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  className,
}: HeroCenteredProps) {
  return (
    <section className={cn("border-border border-b", className)}>
      <Container>
        <div className="mx-auto max-w-3xl py-20 text-center lg:py-32">
          {eyebrow && (
            <Eyebrow className="mb-4 justify-center">{eyebrow}</Eyebrow>
          )}
          <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          {description && (
            <p className="text-foreground/80 mx-auto mt-6 max-w-prose text-lg leading-relaxed">
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primaryCta && (
                <Button asChild size="lg">
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

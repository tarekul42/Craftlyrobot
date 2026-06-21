import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui";
import { Button } from "@/components/ui";

interface CTA {
  label: string;
  href: string;
}

interface HeroDefaultProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  visual?: React.ReactNode;
  className?: string;
}

/**
 * HeroDefault — text + visual (image or screenshot) split layout.
 * The canonical hero variant, used on most pages.
 *
 * @example
 * <HeroDefault
 *   eyebrow="Craftly Robot"
 *   title="From dream to reality, with one command"
 *   primaryCta={{ label: "Get early free access", href: "/contribute/apply" }}
 *   visual={<AnimatedTerminal />}
 * />
 */
export function HeroDefault({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  visual,
  className,
}: HeroDefaultProps) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border", className)}>
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-32">
          <div className="flex flex-col justify-center">
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-xl font-medium text-muted-foreground">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-foreground/80">
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-wrap gap-3">
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
          {visual && (
            <div className="flex items-center justify-center">{visual}</div>
          )}
        </div>
      </Container>
    </section>
  );
}

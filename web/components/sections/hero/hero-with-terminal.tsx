import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow, Button } from "@/components/ui";
import Link from "next/link";
import { AnimatedTerminal } from "@/components/blocks/animated-terminal";

interface CTA {
  label: string;
  href: string;
}

interface HeroWithTerminalProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  /** Override the default terminal commands */
  commands?: Array<{ input: string; output: string }>;
  className?: string;
}

/**
 * HeroWithTerminal — the Craftly signature hero.
 *
 * Text on the left, AnimatedTerminal on the right.
 * This is the canonical homepage hero pattern.
 *
 * @example
 * <HeroWithTerminal
 *   eyebrow="Craftly Robot"
 *   title="From dream to reality, with one command"
 *   primaryCta={{ label: "Get early free access", href: "/contribute/apply" }}
 * />
 */
export function HeroWithTerminal({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  commands,
  className,
}: HeroWithTerminalProps) {
  return (
    <section
      className={cn(
        "border-border relative overflow-hidden border-b",
        className,
      )}
    >
      <Container>
        <div className="grid gap-12 py-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-32">
          <div className="flex flex-col justify-center">
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground mt-4 text-xl font-medium">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-foreground/80 mt-6 max-w-prose text-lg leading-relaxed">
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
          <div className="flex items-center justify-center">
            <AnimatedTerminal commands={commands} />
          </div>
        </div>
      </Container>
    </section>
  );
}

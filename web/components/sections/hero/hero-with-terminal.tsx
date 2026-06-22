import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow/eyebrow";
import { Button } from "@/components/ui/button/button";
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
  commands?: Array<{ input: string; output: string }>;
  className?: string;
}

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
        "relative flex min-h-hero items-center overflow-hidden",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.03]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="flex flex-col justify-center py-20 lg:py-32">
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
          <div className="flex items-center justify-center py-20 lg:py-32">
            <AnimatedTerminal commands={commands} />
          </div>
        </div>
      </Container>
    </section>
  );
}

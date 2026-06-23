import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow/eyebrow";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";

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
  visual?: React.ReactNode;
  className?: string;
}

export function HeroWithTerminal({
  eyebrow,
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
  visual,
  className,
}: HeroWithTerminalProps) {
  return (
    <section
      className={cn(
        "relative flex min-h-0 items-center overflow-hidden lg:min-h-hero",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.03]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="flex flex-col justify-center py-20 lg:py-32">
            {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
            <h1 className="text-4xl font-bold leading-none tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {title}
            </h1>
            {subtitle && (
              <p className="text-muted-foreground mt-4 text-lg font-medium sm:text-xl">
                {subtitle}
              </p>
            )}
            {description && (
              <p className="text-foreground/80 mt-6 max-w-prose text-base leading-relaxed sm:text-lg">
                {description}
              </p>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {primaryCta && (
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href={primaryCta.href}>{primaryCta.label}</Link>
                  </Button>
                )}
                {secondaryCta && (
                  <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                    <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-center py-20 lg:py-32">
            <div className="w-full max-w-md lg:max-w-lg">
              {visual}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

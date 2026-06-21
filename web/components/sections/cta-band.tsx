import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui";

interface CTA {
  label: string;
  href: string;
}

interface CTABandProps {
  title: string;
  description?: string;
  primaryCta?: CTA;
  secondaryCta?: CTA;
  variant?: "default" | "dark" | "muted";
  className?: string;
}

/**
 * CTABand — full-width call-to-action band with high-contrast background.
 *
 * @example
 * <CTABand
 *   variant="dark"
 *   title="Help us today, get support back tomorrow"
 *   primaryCta={{ label: "Start Crafting", href: "/contribute/apply" }}
 * />
 */
export function CTABand({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "default",
  className,
}: CTABandProps) {
  const variantClasses = {
    default: "bg-muted/30",
    dark: "bg-primary text-primary-foreground",
    muted: "bg-accent/30",
  }[variant];

  const isDark = variant === "dark";

  return (
    <section className={cn("py-section-y", className)}>
      <Container>
        <div className={cn("rounded-lg border p-8 text-center md:p-12", variantClasses, !isDark && "border-border")}>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description && (
            <p className={cn(
              "mx-auto mt-4 max-w-prose",
              isDark ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant={isDark ? "secondary" : "primary"}
                >
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant={isDark ? "ghost" : "outline"}
                  className={isDark ? "text-primary-foreground hover:bg-primary-foreground/10" : ""}
                >
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

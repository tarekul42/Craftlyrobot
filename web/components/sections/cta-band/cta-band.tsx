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
        <div
          className={cn(
            "rounded-lg border p-6 text-center sm:p-8 md:p-12",
            variantClasses,
            !isDark && "border-border",
          )}
        >
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                "mx-auto mt-4 max-w-prose",
                isDark ? "text-primary-foreground/80" : "text-muted-foreground",
              )}
            >
              {description}
            </p>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              {primaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant={isDark ? "secondary" : "primary"}
                  className="w-full sm:w-auto"
                >
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </Button>
              )}
              {secondaryCta && (
                <Button
                  asChild
                  size="lg"
                  variant={isDark ? "ghost" : "outline"}
                  className={cn(
                    "w-full sm:w-auto",
                    isDark
                      ? "text-primary-foreground hover:bg-primary-foreground/10"
                      : "",
                  )}
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

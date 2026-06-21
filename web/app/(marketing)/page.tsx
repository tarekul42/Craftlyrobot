import Link from "next/link";
import { ArrowRight, Users, Wrench, Heart } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Button, Eyebrow, SectionHeading, Card, CardContent } from "@/components/ui";
import { siteConfig } from "@/config/site";

/**
 * Homepage — the canonical entry point for Craftly.
 *
 * This is a minimal-but-real homepage that proves the full stack works:
 * fonts load, tokens apply, primitives render, layout wraps, theme toggles.
 *
 * The full homepage (with AnimatedTerminal, ScreenshotShowcase, etc.)
 * will be built in Priority 3.
 */
export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <Section spacing="lg" className="border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow className="mb-4">Craftly</Eyebrow>
            <h1 className="text-5xl font-bold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              From dream to reality, with one command
            </h1>
            <p className="mt-6 max-w-prose text-lg leading-relaxed text-foreground/80 sm:text-xl">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/contribute/apply">
                  Get early free access
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/what-is-craftly">
                  Explore the ecosystem
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== ECOSYSTEM CONTRACT — the 3 entry points ===== */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="What is Craftly"
            title="An ecosystem, not just a product"
            description="Three things are happening at once. Pick your entry point."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <EntryPointCard
              icon={<Wrench className="h-8 w-8" />}
              title="We build products"
              description="Tools that turn ideas into shipped software — starting with Craftly Robot."
              href="/products"
              cta="See products"
            />
            <EntryPointCard
              icon={<Users className="h-8 w-8" />}
              title="We are a community"
              description="Contributors across departments, working in the open from Bangladesh."
              href="/community"
              cta="Join community"
            />
            <EntryPointCard
              icon={<Heart className="h-8 w-8" />}
              title="We welcome contributors"
              description="Find a role, apply, and get a structured 30-day onboarding ramp."
              href="/contribute"
              cta="Start contributing"
            />
          </div>
        </Container>
      </Section>

      {/* ===== CTA BAND ===== */}
      <Section background="default">
        <Container>
          <div className="rounded-lg border border-border bg-primary p-8 text-center text-primary-foreground md:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Help us today, get support back tomorrow
            </h2>
            <p className="mx-auto mt-4 max-w-prose text-primary-foreground/80">
              Join Bangladesh&apos;s first real effort to build a tech company
              that competes with Google, Microsoft, and Apple.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                variant="secondary"
              >
                <Link href="/contribute/apply">
                  Start Crafting with Craftly
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/**
 * EntryPointCard — a card showing one of the 3 ecosystem entry points.
 * Used in the "What is Craftly" section.
 */
interface EntryPointCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}

function EntryPointCard({
  icon,
  title,
  description,
  href,
  cta,
}: EntryPointCardProps) {
  return (
    <Card interactive className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted text-foreground">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {description}
        </p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

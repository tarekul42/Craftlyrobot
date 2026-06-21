import Link from "next/link";
import { ArrowRight, Wrench, Users, Heart, Cpu, Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Button,
  Eyebrow,
  SectionHeading,
  Card,
  CardContent,
} from "@/components/ui";
import { HeroWithTerminal } from "@/components/sections/hero/hero-with-terminal";
import { CTABand } from "@/components/sections/cta-band";
import { FAQSection } from "@/components/sections/faq";
import { EcosystemMap } from "@/components/sections/ecosystem-map";
import { ScreenshotShowcase } from "@/components/blocks/screenshot-showcase";
import { PeopleBar } from "@/components/blocks/people-bar";
import { siteConfig } from "@/config/site";
import { foundationProducts } from "@/config/products";
import { homepageFaqs } from "@/config/faqs";
import { communityStats } from "@/config/community";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO with AnimatedTerminal (Craftly signature) ===== */}
      <HeroWithTerminal
        eyebrow="Craftly Robot"
        title="From dream to reality, with one command"
        description="Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. Join us, or use what we build."
        primaryCta={{ label: "Get early free access", href: "/contribute/apply" }}
        secondaryCta={{ label: "See the foundation", href: "/products" }}
      />

      {/* ===== ECOSYSTEM ENTRY POINTS ===== */}
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

      {/* ===== FOUNDATION PRODUCTS (using extracted ProductCard pattern) ===== */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Being built with care"
            title="From the proprietary knowledge we are learning continuously"
            description="Three products taught Craftly what it knows. They're being battle-tested every day."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {foundationProducts.map((product) => (
              <Card key={product.slug} className="overflow-hidden">
                <ScreenshotShowcase
                  images={product.screenshots ?? ["/placeholder.png"]}
                  alt={product.name}
                  className="rounded-none border-0 border-b"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* ===== PEOPLE OF CRAFTLY ===== */}
      <Section background="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="mb-4">People of Craftly</Eyebrow>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Join Bangladesh&apos;s first real effort to build a global tech company
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                We&apos;re not trying to build another startup. We&apos;re building
                something that competes with Google, Microsoft, and Apple — from
                Dhaka, with ambition.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/contribute/apply">
                    Join the team
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <PeopleBar
                count={communityStats.contributorsJoined}
                target={communityStats.targetContributors}
                label="Contributors Joined"
              />
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  icon={<Cpu className="h-5 w-5" />}
                  value={communityStats.activeProjects}
                  label="Active projects"
                />
                <StatCard
                  icon={<Sparkles className="h-5 w-5" />}
                  value={communityStats.departments}
                  label="Departments"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ===== ECOSYSTEM MAP ===== */}
      <EcosystemMap />

      {/* ===== CTA BAND ===== */}
      <CTABand
        variant="dark"
        title="Help us today, get support back tomorrow"
        description="Keep an eye on our social media channels for promotional offers."
        primaryCta={{ label: "Start Crafting with Craftly", href: "/contribute/apply" }}
        secondaryCta={{ label: "Watch on YouTube", href: siteConfig.social.youtube }}
      />

      {/* ===== FAQ ===== */}
      <FAQSection
        eyebrow="Common questions"
        title="Frequently asked"
        items={homepageFaqs}
      />
    </>
  );
}

// ===== Local helper components =====

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
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
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

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

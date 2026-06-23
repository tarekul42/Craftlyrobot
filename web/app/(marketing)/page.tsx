import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Users,
  Heart,
  Cpu,
  Sparkles,
  Droplets,
  Car,
  ShoppingCart,
  Smartphone,
} from "lucide-react";
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
import { UpdatesFeedSection } from "@/components/sections/updates-feed";
import { NuanceShowcase } from "@/components/sections/nuance-showcase";
import { DocumentaryShowcase } from "@/components/sections/documentary-showcase";
import { ScreenshotShowcase } from "@/components/blocks/screenshot-showcase";
import { AgentNegotiation } from "@/components/blocks/agent-negotiation";
import { PeopleBar } from "@/components/blocks/people-bar";
import { siteConfig } from "@/config/site";
import { faqJsonLd } from "@/lib/seo";
import { foundationProducts } from "@/config/products";
import { homepageFaqs } from "@/config/faqs";
import { communityStats } from "@/config/community";
export const metadata: Metadata = {
  title: "Craftlyrobot — Ask for anything. Get it done.",
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Ask for anything. Get it done.`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
  },
};

const agentUseCases = [
  {
    icon: <Droplets className="h-6 w-6" />,
    title: "Find blood donors",
    description: "Your agent scans the network for eligible donors and negotiates pickup.",
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: "Book a ride",
    description: "Agents compare drivers, negotiate the fare, and confirm your ride.",
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    title: "Buy groceries",
    description: "Your agent checks stock across stores and finds the best price.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Build an app",
    description: "Agents distribute tasks, compile code, and deploy — all autonomously.",
  },
];

export default function HomePage() {
  const faqLd = faqJsonLd(homepageFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <HeroWithTerminal
        title="Ask for anything. Get it done."
        subtitle="Your agent negotiates with other agents across the network."
        description="Finding blood donors, booking rides, buying groceries, building apps — anything people do for themselves. No phone calls. No waiting. Just results."
        primaryCta={{
          label: "Get early free access",
          href: "/contribute/apply",
        }}
        secondaryCta={{ label: "See the foundation", href: "/products" }}
        visual={<AgentNegotiation />}
      />

      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="What agents do"
            title="Your agent handles it."
            description="From searching to negotiating to confirming — your agent does the work. You just ask."
            align="center"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {agentUseCases.map((useCase) => (
              <div
                key={useCase.title}
                className="border-border bg-background flex items-start gap-4 rounded-lg border p-5"
              >
                <div className="bg-muted text-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-md">
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{useCase.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {useCase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            ...and anything else you can think of. The network is the limit.
          </p>
        </Container>
      </Section>

      <Section>
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

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Being built with care"
            title="Built on what we learned."
            description="Three products taught Craftly what it knows. They're being battle-tested every day."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {foundationProducts.map((product) => (
              <Card key={product.slug} className="overflow-hidden">
                {product.screenshots && product.screenshots.length > 0 && (
                  <ScreenshotShowcase
                    images={product.screenshots}
                    alt={product.name}
                    className="rounded-none border-0 border-b"
                  />
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{product.name}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {product.description}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
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

      <NuanceShowcase />

      <DocumentaryShowcase />

      <Section background="muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Eyebrow className="mb-4">People of Craftly</Eyebrow>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Join the team.
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                We&apos;re building something that competes with Google,
                Microsoft, and Apple — from Dhaka, with ambition.
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

      <EcosystemMap />

      <UpdatesFeedSection />

      <CTABand
        variant="dark"
        title="Help us today, get support back tomorrow"
        description="Keep an eye on our social media channels for promotional offers."
        primaryCta={{
          label: "Start Crafting with Craftly",
          href: "/contribute/apply",
        }}
        secondaryCta={{
          label: "Watch on YouTube",
          href: siteConfig.social.youtube,
        }}
      />

      <FAQSection
        eyebrow="Common questions"
        title="Frequently asked"
        items={homepageFaqs}
      />
    </>
  );
}

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
        <div className="bg-muted text-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-md">
          {icon}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {description}
        </p>
        <Link
          href={href}
          className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
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
    <div className="border-border bg-background rounded-lg border p-4">
      <div className="text-muted-foreground flex items-center gap-2">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}

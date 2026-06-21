import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, MapPin, Rocket } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, SectionHeading } from "@/components/ui";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. From Bangladesh, with ambition.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Build, don't talk",
    description:
      "We ship. Documentation, decisions, and politics come second to working software.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Open by default",
    description:
      "We work in the open. Code, decisions, and roadmaps are visible to contributors.",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "From Bangladesh",
    description:
      "We're headquartered in Dhaka. We're not trying to leave — we're trying to put it on the map.",
  },
];

const quickLinks = [
  {
    title: "Leadership",
    description: "Who runs Craftly",
    href: "/about/leadership",
  },
  {
    title: "Governance",
    description: "How decisions get made",
    href: "/about/governance",
  },
  { title: "Contact", description: "Get in touch", href: "/about/contact" },
  { title: "Blog", description: "Latest updates", href: "/blog" },
];

export default function AboutPage() {
  return (
    <>
      <HeroCentered
        eyebrow="About"
        title="From Bangladesh, with ambition"
        description="Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. We're not trying to build another startup — we're building Bangladesh's first real tech company."
        primaryCta={{ label: "Join us", href: "/contribute/apply" }}
        secondaryCta={{ label: "See our products", href: "/products" }}
      />

      {/* Mission */}
      <Section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Mission"
            title="What we're trying to do"
            align="center"
          />
          <div className="text-foreground/80 mt-8 space-y-4 text-lg leading-relaxed">
            <p>
              Bangladesh has tens of thousands of talented engineers, designers,
              and builders. Most of them end up working for companies elsewhere.
              The talent leaves; the value leaves with it.
            </p>
            <p>
              Craftly exists to change that. We're building products that
              compete with the best in the world — and we're doing it from
              Dhaka, with a team that's mostly Bangladeshi, mostly remote, and
              mostly contributor-driven.
            </p>
            <p>
              We're not there yet. Craftly Robot is still in development. But
              the foundation is being laid every day, by contributors who
              believe that the next great tech company can come from anywhere.
            </p>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="Values"
            title="What we believe"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((value, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="bg-primary text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-md">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{value.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Quick links */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Explore" title="More about Craftly" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map((link, i) => (
              <Link key={i} href={link.href} className="block h-full">
                <Card interactive className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <h3 className="text-lg font-semibold">{link.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm">
                      {link.description}
                    </p>
                    <span className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium">
                      Visit
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        variant="dark"
        title="Want to be part of this?"
        description="We're building something from Bangladesh that the world will use. Come build it with us."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
        secondaryCta={{
          label: "Email us",
          href: `mailto:${siteConfig.contact.email}`,
        }}
      />
    </>
  );
}

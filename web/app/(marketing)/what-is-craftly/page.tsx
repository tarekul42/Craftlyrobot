import type { Metadata } from "next";
import Link from "next/link";
import {
  Wrench,
  Users,
  Building2,
  Target,
  Cpu,
  Heart,
  Crown,
  ArrowRight,
} from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Eyebrow,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "What is Craftly",
  description:
    "Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. Understand the ecosystem contract, the 7 layers, and how it all connects.",
  alternates: { canonical: "/what-is-craftly" },
  openGraph: {
    title: "What is Craftly — Ecosystem overview",
    description:
      "An ecosystem, not just a product. Understand the 7 layers of Craftly.",
  },
};

const ecosystemLayers = [
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Products",
    description:
      "Customer-facing artifacts Craftly ships. Currently: Craftly Robot (in development), plus Hello, Workspace, and Agent Console as foundation products.",
    href: "/products",
    cta: "See products",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community",
    description:
      "The social fabric. The people, the channels, the gathering surfaces. Discord, Facebook, YouTube, GitHub.",
    href: "/community",
    cta: "Join community",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Departments",
    description:
      "Persistent functional units. Engineering, Design, Community, Operations. Each has a lead and a focus.",
    href: "/community/departments",
    cta: "See departments",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Projects",
    description:
      "Time-bounded initiatives with deliverables. Cross-departmental. The unit of work at Craftly.",
    href: "/community/projects",
    cta: "See projects",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Internal Systems",
    description:
      "Workspace, Agent Console, operational dashboards. The infrastructure that makes everything else function.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Contributor Roles",
    description:
      "Visitor, Applicant, Probationary, Active, Lead, Leadership. The progression is declared, not arbitrary.",
    href: "/contribute/roles",
    cta: "See roles",
  },
  {
    icon: <Crown className="h-6 w-6" />,
    title: "Leadership",
    description:
      "Founders + leads. Decision-making authority. Governed by the three-tier model with RFC process.",
    href: "/about/leadership",
    cta: "See leadership",
  },
];

const glossary = [
  {
    term: "Ecosystem",
    definition:
      "Craftly is not a single product. It's a system of interconnected parts — products, community, departments, projects, internal tools, contributor roles, and leadership.",
  },
  {
    term: "Contributor-driven",
    definition:
      "Craftly's work is done by contributors, not employees. Most contributors are volunteer, with paid roles emerging as we generate revenue.",
  },
  {
    term: "Decentralized Node Architecture",
    definition:
      "Craftly's proprietary approach to distributing AI compute across many nodes, surpassing data center limitations. Powers Craftly Robot.",
  },
  {
    term: "Foundation products",
    definition:
      "The three products that taught Craftly what it knows: Hello, Workspace, and Agent Console. They generate the proprietary knowledge that powers Craftly Robot.",
  },
  {
    term: "RFC",
    definition:
      "Request for Comments. The public proposal process for strategic (Tier 3) decisions at Craftly. Any contributor can author one.",
  },
  {
    term: "Onboarding ramp",
    definition:
      "The structured 30-day program every accepted contributor goes through. Mentor, first task, weekly milestones, first contribution.",
  },
];

export default function WhatIsCraftlyPage() {
  return (
    <>
      <HeroCentered
        eyebrow="What is Craftly"
        title="An ecosystem, not just a product"
        description="Craftly is a contributor-driven ecosystem building tools that turn ideas into shipped products. Seven layers, all connected. This page is the ecosystem contract."
        primaryCta={{ label: "Join us", href: "/contribute/apply" }}
        secondaryCta={{ label: "See products", href: "/products" }}
      />

      {/* Ecosystem contract */}
      <Section>
        <Container size="narrow">
          <Eyebrow className="mb-4">The contract</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Craftly is, in one paragraph
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-foreground/80">
            Craftly is a contributor-driven ecosystem building tools that turn
            ideas into shipped products. We are not a single product, not a
            single company in the conventional sense, and not a single community.
            We are an organization that contains products, a community,
            contributors, departments, projects, internal tools, onboarding
            flows, and future initiatives — all connected, all declared, all
            navigable.
          </p>
          <p className="mt-4 text-lg text-muted-foreground">
            From Bangladesh, with ambition.
          </p>
        </Container>
      </Section>

      {/* The 7 layers */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="The 7 layers"
            title="What's inside Craftly"
            description="Every layer is declared and navigable. Click any layer to go deeper."
            align="center"
          />
          <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {ecosystemLayers.map((layer, i) => {
              const content = (
                <div className="flex h-full items-start gap-4 rounded-lg border border-border bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-md">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    {layer.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{layer.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {layer.description}
                    </p>
                    {layer.cta && (
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-foreground">
                        {layer.cta}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              );

              return layer.href ? (
                <Link key={i} href={layer.href} className="block h-full">
                  {content}
                </Link>
              ) : (
                <div key={i} className="h-full opacity-70">
                  {content}
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Origin */}
      <Section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Origin"
            title="Why we exist"
            align="center"
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              Bangladesh has tens of thousands of talented engineers, designers,
              and builders. Most end up working for companies elsewhere. The
              talent leaves; the value leaves with it.
            </p>
            <p>
              Craftly exists to change that. We&apos;re building products that
              compete with the best in the world — from Dhaka, with a team
              that&apos;s mostly Bangladeshi, mostly remote, and mostly
              contributor-driven.
            </p>
            <p>
              We&apos;re not there yet. Craftly Robot is still in development.
              But the foundation is being laid every day, by contributors who
              believe the next great tech company can come from anywhere.
            </p>
          </div>
        </Container>
      </Section>

      {/* Glossary */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="Glossary"
            title="Key terms"
            description="The vocabulary of Craftly. Use these to navigate the ecosystem."
          />
          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {glossary.map((item) => (
              <div
                key={item.term}
                className="rounded-lg border border-border bg-background p-6"
              >
                <dt className="font-semibold text-foreground">{item.term}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <CTABand
        variant="dark"
        title="Ready to be part of this?"
        description="The ecosystem is waiting for you. Find a role and apply."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
        secondaryCta={{ label: "Read the blog", href: "/blog" }}
      />
    </>
  );
}

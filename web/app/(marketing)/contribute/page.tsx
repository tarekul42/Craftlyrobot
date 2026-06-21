import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Users, Target, GraduationCap } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { TestimonialSection } from "@/components/sections/testimonial";
import { FAQSection } from "@/components/sections/faq";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Button,
  SectionHeading,
  Badge,
} from "@/components/ui";
import { roles } from "@/config/roles";
import { testimonials } from "@/config/community";
import { contributeFaqs } from "@/config/faqs";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Join Craftly as a contributor. Find a role, apply, and get a structured 30-day onboarding ramp with a mentor and your first task.",
  alternates: { canonical: "/contribute" },
  openGraph: {
    title: "Contribute to Craftly",
    description:
      "Find your role in Craftly's contributor-driven ecosystem. From Bangladesh, with ambition.",
  },
};

const onboardingSteps = [
  {
    title: "Apply",
    description:
      "Submit an application with your skills, interests, and availability. Takes about 10 minutes.",
  },
  {
    title: "Get accepted",
    description:
      "We review weekly. If you're a fit, we schedule a conversation and assign you to a department.",
  },
  {
    title: "30-day onboarding ramp",
    description:
      "Day 1: welcome + mentor. Day 7: orientation done. Day 14: first task. Day 30: first contribution shipped.",
  },
  {
    title: "Active contributor",
    description:
      "You're in. Take on more responsibility, advance your role, and shape what Craftly becomes.",
  },
];

const valueProps = [
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: "Real experience",
    description:
      "Ship code, design, or community work that real users touch. Not a tutorial — actual production work.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Mentorship",
    description:
      "Every new contributor gets a mentor for the first 30 days. You're not figuring it out alone.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Clear progression",
    description:
      "Contributor → Lead → Leadership Group. You can see the path from day one.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible commitment",
    description:
      "5h/week side commitment to full-time. Pick what fits your life right now.",
  },
];

export default function ContributePage() {
  return (
    <>
      <HeroCentered
        eyebrow="Contribute"
        title="Join Bangladesh's first real effort to build a global tech company"
        description="Craftly is contributor-driven. That means we need you. Find a role, apply, and get a structured ramp into the team."
        primaryCta={{ label: "Apply now", href: "/contribute/apply" }}
        secondaryCta={{ label: "See open roles", href: "/contribute/roles" }}
      />

      {/* === Why contribute === */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why contribute"
            title="What you get out of it"
            description="Not unpaid labor. A real exchange of value."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    {prop.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{prop.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {prop.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* === Open roles preview === */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="Open roles"
            title="Find your fit"
            description="A few of the roles we're actively recruiting for. Full list on the roles page."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {roles.slice(0, 4).map((role) => (
              <Card key={role.slug} interactive className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Badge variant="secondary">{role.department}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {role.commitment === "fulltime"
                        ? "Full-time"
                        : `${role.commitment}/week`}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold">{role.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {role.description}
                  </p>
                  <Link
                    href="/contribute/apply"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                  >
                    Apply for this role
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/contribute/roles">
                See all {roles.length} open roles
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* === Onboarding process === */}
      <ProcessSteps
        eyebrow="Onboarding"
        title="What happens after you apply"
        description="A structured ramp — not a cliff. You'll know what to do every step of the way."
        steps={onboardingSteps}
      />

      {/* === Testimonials === */}
      <TestimonialSection
        eyebrow="Contributors"
        title="What contributors say"
        testimonials={testimonials}
      />

      {/* === FAQ === */}
      <FAQSection
        eyebrow="Questions"
        title="Before you apply"
        items={contributeFaqs}
      />

      {/* === Final CTA === */}
      <CTABand
        variant="dark"
        title="Ready to start?"
        description="Apply now. We review weekly. If you're a fit, you'll hear from us within 7 days."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
      />
    </>
  );
}

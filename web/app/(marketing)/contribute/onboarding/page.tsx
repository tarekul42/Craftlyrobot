import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FAQSection } from "@/components/sections/faq";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, SectionHeading } from "@/components/ui";
import { contributeFaqs } from "@/config/faqs";

export const metadata: Metadata = {
  title: "Onboarding",
  description:
    "What happens after you join Craftly. A structured 30-day ramp with a mentor, a first task, and a clear path to your first contribution.",
  alternates: { canonical: "/contribute/onboarding" },
};

const onboardingDays = [
  {
    title: "Day 1: Welcome",
    description:
      "Account setup, access provisioning, mentor introduction. You get a welcome packet and a tour of the ecosystem.",
  },
  {
    title: "Days 2-7: Orientation",
    description:
      "Read the ecosystem docs, meet your team, attend a community event. Get context on what Craftly is and where you fit.",
  },
  {
    title: "Days 8-14: First task",
    description:
      "Your mentor assigns a starter task scoped to your skills. You have daily check-ins, ask questions, and start shipping.",
  },
  {
    title: "Days 15-21: Code review",
    description:
      "Your first contribution is in review. You learn our review process, get feedback, and iterate.",
  },
  {
    title: "Days 22-30: Ship it",
    description:
      "Your first contribution ships. Public acknowledgment, next task assigned, full team integration.",
  },
];

const whatYouGet = [
  {
    title: "A mentor",
    description:
      "A dedicated mentor for the full 30 days. Daily check-ins, questions answered, no guessing.",
  },
  {
    title: "A first task",
    description:
      "Scoped to your skills and the team's needs. Not busywork — real work that ships.",
  },
  {
    title: "Clear timeline",
    description:
      "You know what's expected every week. No mystery, no cliff, no floating.",
  },
  {
    title: "Team integration",
    description:
      "You're not a shadow. You're in the channels, in the meetings, in the work.",
  },
];

export default function OnboardingPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Onboarding"
        title="Your first 30 days at Craftly"
        description="A structured ramp — not a cliff. You'll know what to do every single day, with a mentor beside you the whole way."
        primaryCta={{ label: "Apply now", href: "/contribute/apply" }}
      />

      {/* Why structured onboarding */}
      <Section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Why it matters"
            title="Most contributor funnels die in onboarding"
            align="center"
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-foreground/80">
            <p>
              The single biggest drop-off in any contributor funnel isn&apos;t
              at the application stage — it&apos;s between acceptance and first
              contribution. Accepted contributors who don&apos;t make a first
              contribution within 30 days almost never contribute.
            </p>
            <p>
              We take this seriously. Every accepted contributor gets a
              structured 30-day ramp with a mentor, a defined first task, and
              weekly milestones. No one is left to figure it out alone.
            </p>
          </div>
        </Container>
      </Section>

      {/* Day-by-day */}
      <ProcessSteps
        eyebrow="The ramp"
        title="Day by day"
        description="What happens each week of your first 30 days."
        steps={onboardingDays}
      />

      {/* What you get */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What you get"
            title="The onboarding package"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whatYouGet.map((item, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <FAQSection
        eyebrow="Questions"
        title="Onboarding FAQ"
        items={contributeFaqs}
      />

      <CTABand
        variant="dark"
        title="Ready to start your ramp?"
        description="Apply today. If accepted, you'll start your 30-day onboarding within a week."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
      />
    </>
  );
}

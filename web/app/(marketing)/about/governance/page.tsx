import type { Metadata } from "next";
import { CheckCircle2, XCircle } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, SectionHeading, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "Governance",
  description:
    "How decisions get made at Craftly. Three tiers of decision-making, RFC process, conflict resolution, and contributor advancement.",
  alternates: { canonical: "/about/governance" },
};

const decisionTiers = [
  {
    tier: "Tier 1",
    title: "Operational decisions",
    who: "The contributor doing the work",
    examples: [
      "What task to take next",
      "How to implement a feature",
      "What tool to use",
    ],
    made: "Made by the person closest to the work. No escalation required.",
  },
  {
    tier: "Tier 2",
    title: "Coordination decisions",
    who: "Project or department lead",
    examples: [
      "What goes in the next release",
      "Who works on what",
      "Technical disagreements",
    ],
    made: "Made by the designated lead, with input from the team.",
  },
  {
    tier: "Tier 3",
    title: "Strategic decisions",
    who: "Founders + leads (RFC process)",
    examples: [
      "New department",
      "New product",
      "Governance changes",
      "Partnerships",
    ],
    made: "Made through the RFC process — public proposal, discussion, decision.",
  },
];

const rfcSteps = [
  {
    title: "Proposal",
    description:
      "Any contributor authors an RFC. It's a public document describing the change, rationale, alternatives, and impact.",
  },
  {
    title: "Discussion",
    description:
      "The RFC is open for 1-2 weeks. Anyone can comment. The author responds and may revise.",
  },
  {
    title: "Decision",
    description:
      "After discussion, the declared decision-maker (usually founders for Tier 3) makes the call.",
  },
  {
    title: "Communication",
    description:
      "The decision is communicated publicly with rationale. Rejected RFCs are archived with the rejection reason.",
  },
];

const doDont = {
  do: [
    "Decisions made transparently and at the right level",
    "RFCs for anything that affects multiple departments",
    "Public archive of decisions and rationale",
    "Clear escalation path when conflicts arise",
  ],
  dont: [
    "Decisions made in private DMs",
    "Skipping the RFC process for convenience",
    "Ignoring contributor feedback",
    "Letting conflicts fester without resolution",
  ],
};

export default function GovernancePage() {
  return (
    <>
      <HeroCentered
        eyebrow="Governance"
        title="How decisions get made"
        description="Craftly uses a three-tier decision-making model with an RFC process for strategic decisions. Transparent, scalable, and contributor-friendly."
      />

      {/* Three tiers */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Decision tiers"
            title="Who decides what"
            description="Three tiers, calibrated to the scope and reversibility of the decision."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {decisionTiers.map((tier) => (
              <Card key={tier.tier} className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <Badge variant="secondary" className="self-start">
                    {tier.tier}
                  </Badge>
                  <h3 className="mt-3 text-lg font-semibold">{tier.title}</h3>
                  <p className="text-foreground mt-1 text-sm font-medium">
                    {tier.who}
                  </p>
                  <p className="text-muted-foreground mt-3 flex-1 text-sm">
                    {tier.made}
                  </p>
                  <div className="mt-4">
                    <p className="text-muted-foreground text-xs font-medium">
                      Examples:
                    </p>
                    <ul className="mt-1 space-y-1">
                      {tier.examples.map((ex, i) => (
                        <li key={i} className="text-muted-foreground text-xs">
                          • {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* RFC process */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="RFC process"
            title="Request for Comments"
            description="The structural mechanism for Tier 3 decisions. Scales decision-making past the founders."
            align="center"
          />
          <ol className="mx-auto mt-12 max-w-3xl space-y-6">
            {rfcSteps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Do / Don't */}
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-success/30">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle2 className="text-success h-5 w-5" />
                  <h3 className="font-semibold">What we do</h3>
                </div>
                <ul className="space-y-2">
                  {doDont.do.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="text-success mt-0.5 h-4 w-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-destructive/30">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <XCircle className="text-destructive h-5 w-5" />
                  <h3 className="font-semibold">What we don&apos;t</h3>
                </div>
                <ul className="space-y-2">
                  {doDont.dont.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <XCircle className="text-destructive mt-0.5 h-4 w-4 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Advancement */}
      <Section background="muted">
        <Container size="narrow">
          <SectionHeading
            eyebrow="Advancement"
            title="How contributors advance"
            align="center"
          />
          <p className="text-foreground/80 mt-6 text-lg leading-relaxed">
            Contributor advancement is based on declared criteria, not
            favoritism. The path: Visitor → Applicant → Probationary → Active
            Contributor → Lead → Leadership Group. Each transition has criteria,
            a declared decision-maker, and a timeline.
          </p>
          <p className="text-foreground/80 mt-4 text-lg leading-relaxed">
            As Craftly grows past ~150 contributors, we&apos;ll add a
            contributor council — elected representatives who advise the
            leadership group. At 500+, we&apos;ll formalize further. Governance
            scales with the ecosystem.
          </p>
        </Container>
      </Section>

      <CTABand
        title="Questions about governance?"
        description="Read the full model in our strategic audit, or reach out."
        primaryCta={{ label: "Contact us", href: "/about/contact" }}
        secondaryCta={{ label: "Join Craftly", href: "/contribute/apply" }}
      />
    </>
  );
}

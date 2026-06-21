import type { Metadata } from "next";

import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Badge,
  SectionHeading,
} from "@/components/ui";
import { RoleCard } from "@/components/cards";
import { roles } from "@/config/roles";

export const metadata: Metadata = {
  title: "Open Roles",
  description:
    "Browse all open contributor roles at Craftly. Engineering, design, community, operations — find your fit.",
  alternates: { canonical: "/contribute/roles" },
};

const progressionSteps = [
  { title: "Visitor", description: "Anyone who lands on the site. No commitment." },
  { title: "Applicant", description: "Submitted an application. Under review." },
  { title: "Probationary Contributor", description: "Accepted. In the 30-day onboarding ramp with a mentor." },
  { title: "Active Contributor", description: "First contribution shipped. Part of the team." },
  { title: "Lead", description: "Sustained contribution (90+ days). Owning projects or areas." },
  { title: "Leadership Group", description: "Strategic role. Shaping Craftly's direction." },
];

export default function RolesPage() {
  const rolesByDepartment = roles.reduce((acc, role) => {
    if (!acc[role.department]) acc[role.department] = [];
    acc[role.department]!.push(role);
    return acc;
  }, {} as Record<string, typeof roles>);

  return (
    <>
      <HeroCentered
        eyebrow="Open Roles"
        title="Find your fit"
        description="Browse all open contributor roles. Filter by department, see the commitment, and apply when you're ready."
        primaryCta={{ label: "Apply now", href: "/contribute/apply" }}
      />

      {/* Role progression */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="Progression"
            title="How roles advance"
            description="From visitor to leadership — the path is visible from day one."
            align="center"
          />
          <ol className="mx-auto mt-12 max-w-3xl space-y-6">
            {progressionSteps.map((step, i) => (
              <li key={i} className="relative flex gap-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* All roles grouped by department (using extracted RoleCard) */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="All open roles"
            title={`${roles.length} roles across ${Object.keys(rolesByDepartment).length} departments`}
          />

          <div className="mt-12 space-y-12">
            {Object.entries(rolesByDepartment).map(([dept, deptRoles]) => (
              <div key={dept}>
                <div className="mb-4 flex items-center gap-2">
                  <h3 className="text-xl font-semibold">{dept}</h3>
                  <Badge variant="secondary">{deptRoles.length} role{deptRoles.length === 1 ? "" : "s"}</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {deptRoles.map((role) => (
                    <RoleCard key={role.slug} role={role} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        variant="dark"
        title="Don't see your role?"
        description="We're always growing. Tell us what you want to do — we'll find a place for you."
        primaryCta={{ label: "Apply anyway", href: "/contribute/apply" }}
        secondaryCta={{ label: "Contact us", href: "/about/contact" }}
      />
    </>
  );
}

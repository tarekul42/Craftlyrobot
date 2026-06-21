import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Card, CardContent, Badge, SectionHeading } from "@/components/ui";
import { roles } from "@/config/roles";

export const metadata: Metadata = {
  title: "Open Roles",
  description:
    "Browse all open contributor roles at Craftly. Engineering, design, community, operations — find your fit.",
  alternates: { canonical: "/contribute/roles" },
};

const progressionSteps = [
  {
    title: "Visitor",
    description: "Anyone who lands on the site. No commitment.",
  },
  {
    title: "Applicant",
    description: "Submitted an application. Under review.",
  },
  {
    title: "Probationary Contributor",
    description: "Accepted. In the 30-day onboarding ramp with a mentor.",
  },
  {
    title: "Active Contributor",
    description: "First contribution shipped. Part of the team.",
  },
  {
    title: "Lead",
    description: "Sustained contribution (90+ days). Owning projects or areas.",
  },
  {
    title: "Leadership Group",
    description: "Strategic role. Shaping Craftly's direction.",
  },
];

export default function RolesPage() {
  // Group roles by department
  const rolesByDepartment = roles.reduce(
    (acc, role) => {
      if (!acc[role.department]) acc[role.department] = [];
      acc[role.department]!.push(role);
      return acc;
    },
    {} as Record<string, typeof roles>,
  );

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
                <div className="bg-primary text-primary-foreground flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* All roles grouped by department */}
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
                  <Badge variant="secondary">
                    {deptRoles.length} role{deptRoles.length === 1 ? "" : "s"}
                  </Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {deptRoles.map((role) => (
                    <Card key={role.slug} interactive className="h-full">
                      <CardContent className="flex h-full flex-col p-6">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <Badge variant="outline">{role.department}</Badge>
                          <span className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Clock className="h-3 w-3" />
                            {role.commitment === "fulltime"
                              ? "Full-time"
                              : `${role.commitment}/week`}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold">{role.title}</h4>
                        <p className="text-muted-foreground mt-2 flex-1 text-sm">
                          {role.description}
                        </p>
                        <div className="mt-4">
                          <p className="text-foreground mb-2 text-xs font-medium">
                            Requirements:
                          </p>
                          <ul className="space-y-1">
                            {role.requirements.slice(0, 3).map((req, i) => (
                              <li
                                key={i}
                                className="text-muted-foreground flex items-start gap-2 text-xs"
                              >
                                <CheckCircle2 className="text-success mt-0.5 h-3 w-3 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link
                          href="/contribute/apply"
                          className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
                        >
                          Apply for this role
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </CardContent>
                    </Card>
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

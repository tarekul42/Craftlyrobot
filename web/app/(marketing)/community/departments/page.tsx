import type { Metadata } from "next";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui";
import { DepartmentCard } from "@/components/cards";
import { departments } from "@/config/departments";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Browse all departments at Craftly — Engineering, Design, Community, Operations. Find where you fit.",
  alternates: { canonical: "/community/departments" },
};

export default function DepartmentsPage() {
  const totalContributors = departments.reduce(
    (sum, d) => sum + d.contributorCount,
    0,
  );
  const totalOpenings = departments.reduce(
    (sum, d) => sum + (d.openings?.length ?? 0),
    0,
  );

  return (
    <>
      <HeroCentered
        eyebrow="Departments"
        title="How we organize"
        description="Four departments, each with its own focus. Browse them to see where you fit."
        primaryCta={{ label: "Apply now", href: "/contribute/apply" }}
      />

      {/* Stats */}
      <Section spacing="sm" className="border-border bg-muted/30 border-y">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold tabular-nums">
                {departments.length}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                Departments
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold tabular-nums">
                {totalContributors}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                Contributors
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold tabular-nums">
                {totalOpenings}
              </div>
              <div className="text-muted-foreground mt-1 text-sm">
                Open roles
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* All departments (using extracted DepartmentCard) */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="All departments"
            title="Explore each team"
            description="Click any department to see its focus, contributors, open roles, and active projects."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {departments.map((dept) => (
              <DepartmentCard key={dept.slug} department={dept} />
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Found your fit?"
        description="Apply now and start your 30-day onboarding ramp in the department that fits you."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
        secondaryCta={{ label: "See open roles", href: "/contribute/roles" }}
      />
    </>
  );
}

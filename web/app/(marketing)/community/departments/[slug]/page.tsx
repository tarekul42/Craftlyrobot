import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Users, Target, Briefcase } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import {
  Card,
  CardContent,
  Badge,
  SectionHeading,
  Stat,
} from "@/components/ui";
import {
  departments,
  getDepartmentBySlug,
} from "@/config/departments";
import { roles } from "@/config/roles";

export async function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);

  if (!dept) return { title: "Department not found" };

  return {
    title: dept.name,
    description: dept.focus,
    alternates: { canonical: `/community/departments/${slug}` },
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dept = getDepartmentBySlug(slug);

  if (!dept) {
    notFound();
  }

  const deptRoles = roles.filter((r) => r.department === dept.name);

  return (
    <>
      <HeroCentered
        eyebrow="Department"
        title={dept.name}
        description={dept.focus}
      />

      {/* Stats */}
      <Section spacing="sm" className="border-y border-border bg-muted/30">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <Stat
              value={dept.contributorCount}
              label="Contributors"
              size="lg"
              className="text-center"
            />
            <Stat
              value={dept.openings?.length ?? 0}
              label="Open roles"
              size="lg"
              className="text-center"
            />
            <Stat
              value={dept.currentProjects?.length ?? 0}
              label="Active projects"
              size="lg"
              className="text-center"
            />
          </div>
        </Container>
      </Section>

      {/* Lead / mission */}
      <Section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="Mission"
            title={`What ${dept.name} does`}
            align="center"
          />
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            {dept.focus} The {dept.name.toLowerCase()} department
            {dept.lead ? ` is led by ${dept.lead}` : ""} and has{" "}
            {dept.contributorCount} active contributor
            {dept.contributorCount === 1 ? "" : "s"}.
          </p>
        </Container>
      </Section>

      {/* Open roles */}
      {deptRoles.length > 0 && (
        <Section background="muted">
          <Container>
            <SectionHeading
              eyebrow="Open roles"
              title={`Join ${dept.name}`}
              description="These roles are currently open in this department."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {deptRoles.map((role) => (
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
          </Container>
        </Section>
      )}

      {/* Other departments */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="More departments"
            title="Explore other teams"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments
              .filter((d) => d.slug !== dept.slug)
              .map((other) => (
                <Link
                  key={other.slug}
                  href={`/community/departments/${other.slug}`}
                  className="block"
                >
                  <Card interactive className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5 text-muted-foreground" />
                        <h3 className="font-semibold">{other.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {other.focus}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title={`Ready to join ${dept.name}?`}
        description="Apply now and start your 30-day onboarding ramp."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
        secondaryCta={{ label: "See all roles", href: "/contribute/roles" }}
      />
    </>
  );
}

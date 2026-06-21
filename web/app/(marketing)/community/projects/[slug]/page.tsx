import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Users, Target } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Badge,
  SectionHeading,
  Stat,
} from "@/components/ui";
import { projects, getProjectBySlug } from "@/config/projects";
import { roles } from "@/config/roles";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/community/projects/${slug}` },
  };
}

const statusConfig = {
  active: { label: "Active", variant: "success" as const },
  planning: { label: "Planning", variant: "warning" as const },
  completed: { label: "Completed", variant: "secondary" as const },
  "on-hold": { label: "On hold", variant: "outline" as const },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const status = statusConfig[project.status];
  const projectRoles = roles.filter((r) => r.department === project.department);
  const relatedProjects = projects
    .filter(
      (p) => p.slug !== project.slug && p.department === project.department,
    )
    .slice(0, 3);

  return (
    <>
      <HeroCentered
        eyebrow="Project"
        title={project.name}
        description={project.description}
      />

      {/* Stats */}
      <Section spacing="sm" className="border-border bg-muted/30 border-y">
        <Container>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
            <Stat
              value={status.label}
              label="Status"
              size="md"
              className="text-center"
            />
            <Stat
              value={project.contributorCount}
              label="Contributors"
              size="md"
              className="text-center"
            />
            <Stat
              value={project.department}
              label="Department"
              size="md"
              className="text-center"
            />
            <Stat
              value={formatDate(project.startDate)}
              label="Started"
              size="md"
              className="text-center"
            />
          </div>
        </Container>
      </Section>

      {/* Goals */}
      {project.goals && project.goals.length > 0 && (
        <Section>
          <Container size="narrow">
            <SectionHeading
              eyebrow="Goals"
              title="What we're working toward"
              align="center"
            />
            <ul className="mt-8 space-y-3">
              {project.goals.map((goal, i) => (
                <li
                  key={i}
                  className="border-border bg-background flex items-start gap-3 rounded-lg border p-4"
                >
                  <Target className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                  <span className="text-sm">{goal}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Tags */}
      {project.tags.length > 0 && (
        <Section spacing="sm">
          <Container size="narrow">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-muted-foreground text-sm">Tags:</span>
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                </Badge>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Open roles in this department */}
      {projectRoles.length > 0 && (
        <Section background="muted">
          <Container>
            <SectionHeading
              eyebrow="Get involved"
              title={`Open roles in ${project.department}`}
              description="These roles are currently open in this project's department."
            />
            <div className="mt-12 grid gap-4 md:grid-cols-2">
              {projectRoles.map((role) => (
                <Card key={role.slug} interactive className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Badge variant="outline">{role.department}</Badge>
                      <span className="text-muted-foreground text-xs">
                        {role.commitment === "fulltime"
                          ? "Full-time"
                          : `${role.commitment}/week`}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{role.title}</h3>
                    <p className="text-muted-foreground mt-2 flex-1 text-sm">
                      {role.description}
                    </p>
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
          </Container>
        </Section>
      )}

      {/* Related projects */}
      {relatedProjects.length > 0 && (
        <Section>
          <Container>
            <SectionHeading
              eyebrow="More in this department"
              title={`Other ${project.department} projects`}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((other) => (
                <Link
                  key={other.slug}
                  href={`/community/projects/${other.slug}`}
                  className="block"
                >
                  <Card interactive className="h-full">
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant={statusConfig[other.status].variant}>
                          {statusConfig[other.status].label}
                        </Badge>
                        <span className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          {other.contributorCount}
                        </span>
                      </div>
                      <h3 className="font-semibold">{other.name}</h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {other.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABand
        title={`Want to work on ${project.name}?`}
        description="Apply to Craftly and tell us this is the project you want to join."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
        secondaryCta={{
          label: "See all projects",
          href: "/community/projects",
        }}
      />
    </>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

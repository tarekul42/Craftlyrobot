import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Calendar } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Badge,
  SectionHeading,
} from "@/components/ui";
import { projects, getActiveProjects } from "@/config/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Active projects at Craftly — what we're building right now. From Craftly Robot to the Community Onboarding Program.",
  alternates: { canonical: "/community/projects" },
};

const statusConfig = {
  active: { label: "Active", variant: "success" as const },
  planning: { label: "Planning", variant: "warning" as const },
  completed: { label: "Completed", variant: "secondary" as const },
  "on-hold": { label: "On hold", variant: "outline" as const },
};

export default function ProjectsPage() {
  const activeProjects = getActiveProjects();

  return (
    <>
      <HeroCentered
        eyebrow="Projects"
        title="What we're building right now"
        description="Active projects across all departments. Some are products, some are internal tools, some are community programs."
        primaryCta={{ label: "Join a project", href: "/contribute/apply" }}
      />

      {/* All projects */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Active"
            title={`${activeProjects.length} active projects`}
            description="Click any project to see its goals, contributors, and how to get involved."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const status = statusConfig[project.status];
              return (
                <Card key={project.slug} interactive className="h-full">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <Badge variant={status.variant}>{status.label}</Badge>
                      <Badge variant="outline">{project.department}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.contributorCount} contributors
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(project.startDate)}
                      </span>
                    </div>
                    {project.tags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <Link
                      href={`/community/projects/${project.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                    >
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Want to work on one of these?"
        description="Apply to Craftly and tell us which project interests you. We'll match you with the right team."
        primaryCta={{ label: "Apply to Craftly", href: "/contribute/apply" }}
        secondaryCta={{ label: "See open roles", href: "/contribute/roles" }}
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

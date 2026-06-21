import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Users, Building2, Target, MessageCircle } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { StatStrip } from "@/components/sections/stat-strip";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Button,
  SectionHeading,
  Badge,
} from "@/components/ui";
import { departments } from "@/config/departments";
import { communityStats } from "@/config/community";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Craftly's contributor community — departments, projects, and channels. Join Bangladesh's first real effort to build a global tech company.",
  alternates: { canonical: "/community" },
};

export default function CommunityPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Community"
        title="The people building Craftly"
        description="Contributors across departments, working in the open. We're remote-first, mission-driven, and based in Bangladesh with global ambition."
        primaryCta={{ label: "Join the community", href: "/contribute/apply" }}
      />

      {/* Stats */}
      <StatStrip
        stats={[
          { value: communityStats.contributorsJoined, label: "Contributors" },
          { value: communityStats.departments, label: "Departments" },
          { value: communityStats.activeProjects, label: "Active projects" },
          { value: "4", label: "Time zones" },
        ]}
      />

      {/* Departments */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Departments"
            title="How we organize"
            description="Four departments, each with its own focus and lead. Browse them to see where you fit."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {departments.map((dept) => (
              <Card key={dept.slug} interactive className="h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <Building2 className="h-6 w-6 text-muted-foreground" />
                    <Badge variant="secondary">
                      {dept.contributorCount} contributors
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold">{dept.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {dept.focus}
                  </p>
                  {dept.openings && dept.openings.length > 0 && (
                    <p className="mt-4 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {dept.openings.length} open role
                        {dept.openings.length === 1 ? "" : "s"}
                      </span>
                    </p>
                  )}
                  <Link
                    href={`/community/departments/${dept.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Channels */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="Channels"
            title="Where we talk"
            description="Join the conversation. We're most active on Facebook and YouTube."
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ChannelCard
              icon={<MessageCircle className="h-6 w-6" />}
              title="Facebook Group"
              description="People of Craftly — our main community hub."
              href={siteConfig.social.facebook}
              cta="Join the group"
            />
            <ChannelCard
              icon={<Target className="h-6 w-6" />}
              title="YouTube"
              description="Documentary videos, building-in-public content."
              href={siteConfig.social.youtube}
              cta="Watch on YouTube"
            />
            <ChannelCard
              icon={<Users className="h-6 w-6" />}
              title="GitHub"
              description="Open source code and project tracking."
              href={siteConfig.social.github}
              cta="View on GitHub"
            />
          </div>
        </Container>
      </Section>

      <CTABand
        title="Want to be part of this?"
        description="We're always looking for contributors. Engineering, design, community, operations — there's a place for you."
        primaryCta={{ label: "See open roles", href: "/contribute/roles" }}
        secondaryCta={{ label: "Apply now", href: "/contribute/apply" }}
      />
    </>
  );
}

function ChannelCard({
  icon,
  title,
  description,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}) {
  return (
    <Card interactive className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted text-foreground">
          {icon}
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">
          {description}
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline"
        >
          {cta}
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </CardContent>
    </Card>
  );
}

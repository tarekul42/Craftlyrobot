import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading/section-heading";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge/badge";
import { UpdateCard } from "@/components/blocks/update-card";
import { Newsletter } from "@/components/sections/newsletter";
import { getAllUpdates } from "@/config/updates";
import { typeConfig } from "@/components/blocks/update-card";
import type { Update, UpdateType } from "@/types/update";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "What's happening at Craftly — product updates, milestones, community news, and behind-the-scenes progress.",
  alternates: { canonical: "/updates" },
};

function groupByMonth(updates: Update[]): Map<string, Update[]> {
  const groups = new Map<string, Update[]>();
  for (const update of updates) {
    const key = new Date(update.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    const existing = groups.get(key);
    if (existing) {
      existing.push(update);
    } else {
      groups.set(key, [update]);
    }
  }
  return groups;
}

function getAllTypes(): UpdateType[] {
  const types = new Set<UpdateType>();
  for (const update of getAllUpdates()) {
    types.add(update.type);
  }
  return Array.from(types);
}

export default function UpdatesPage() {
  const allUpdates = getAllUpdates();
  const grouped = groupByMonth(allUpdates);
  const availableTypes = getAllTypes();

  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What's happening"
            title="Updates"
            description="Short-form status on what we're building, shipping, and learning. Newest first."
            align="left"
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {availableTypes.map((type) => {
              const config = typeConfig[type];
              return (
                <Badge key={type} variant="secondary" className="gap-1">
                  {config.icon}
                  {config.label}
                </Badge>
              );
            })}
          </div>

          <div className="mt-10 space-y-10">
            {Array.from(grouped.entries()).map(([month, monthUpdates]) => (
              <div key={month}>
                <h2 className="text-muted-foreground sticky top-20 mb-4 text-sm font-semibold uppercase tracking-wider">
                  {month}
                </h2>
                <div className="space-y-4">
                  {monthUpdates.map((update) => (
                    <UpdateCard
                      key={update.id}
                      update={update}
                      variant="full"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section background="muted">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              title="Join the team"
              description="Updates happen because contributors make them happen. If you like what you see, come build with us."
              align="center"
            />
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/contribute/apply">
                  Start contributing
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Newsletter />
    </>
  );
}

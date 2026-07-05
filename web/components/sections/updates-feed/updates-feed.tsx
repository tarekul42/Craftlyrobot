import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { SectionHeading } from "@/components/ui/section-heading/section-heading";
import { UpdateCard } from "@/components/blocks/update-card";
import { getAllUpdates } from "@/config/updates";

export function UpdatesFeedSection() {
  const latest = getAllUpdates().slice(0, 4);

  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="What's happening"
          title="Latest updates"
          description="Quick status on what we're building, shipping, and learning."
          align="left"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {latest.map((update) => (
            <UpdateCard key={update.id} update={update} variant="compact" />
          ))}
        </div>

        <div className="mt-6">
          <Link
            href="/updates"
            className="text-foreground inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            View all updates
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </Section>
  );
}

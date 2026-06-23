import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui/section-heading/section-heading";
import { Button } from "@/components/ui/button/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Newsletter } from "@/components/sections/newsletter";
import { getAllUpdates } from "@/config/updates";
import { UpdatesPageClient } from "./updates-page-client";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "What's happening at Craftly — product updates, milestones, community news, and behind-the-scenes progress.",
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  const allUpdates = getAllUpdates();

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

          <UpdatesPageClient updates={allUpdates} />
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

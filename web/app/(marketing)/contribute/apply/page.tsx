import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow/eyebrow";
import { siteConfig } from "@/config/site";
import { ApplyPageClient } from "./apply-page-client";

export const metadata: Metadata = {
  title: "Apply to Craftly",
  description:
    "Apply to join Craftly as a contributor. Tell us about yourself, your skills, and why you want to join. We review weekly.",
  alternates: { canonical: "/contribute/apply" },
  openGraph: {
    title: "Apply to Craftly",
    description:
      "Join Bangladesh's first real effort to build a global tech company.",
  },
};

const beforeYouApply = [
  {
    title: "We review weekly",
    description:
      "Applications are reviewed every week. You'll hear back within 7 days.",
  },
  {
    title: "What we look for",
    description:
      "Curiosity, willingness to learn, and consistency. Not years of experience.",
  },
  {
    title: "After you apply",
    description:
      "If you're a fit, we'll schedule a conversation, then start your 30-day onboarding ramp.",
  },
  {
    title: "What you'll need",
    description:
      "10 minutes, your contact info, your skills, and a few sentences on why Craftly.",
  },
];

export default function ApplyPage() {
  return (
    <>
      <ApplyPageClient />

      <Section background="muted">
        <Container>
          <Eyebrow className="mb-4">Before you apply</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What to expect
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {beforeYouApply.map((item, i) => (
              <div
                key={i}
                className="border-border bg-background rounded-lg border p-6"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="border-border bg-background mt-12 rounded-lg border p-6">
            <h3 className="font-semibold">Questions before applying?</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Email us at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-foreground underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>{" "}
              or read the{" "}
              <Link
                href="/contribute"
                className="text-foreground underline underline-offset-4"
              >
                contribute page
              </Link>
              .
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

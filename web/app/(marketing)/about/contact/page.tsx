import type { Metadata } from "next";
import { HeroSplit } from "@/components/sections/hero/hero-split";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui";
import { ContactForm } from "@/components/blocks/contact-form";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Craftly. Questions, partnerships, press — we read every message.",
  alternates: { canonical: "/about/contact" },
};

const contactReasons = [
  {
    title: "Partnerships",
    description: "Want to collaborate, integrate, or build something together.",
  },
  {
    title: "Press & media",
    description:
      "Writing about Craftly, Bangladesh tech, or contributor ecosystems.",
  },
  {
    title: "Questions",
    description: "Anything you want to know that isn't covered on the site.",
  },
  {
    title: "Bug reports",
    description: "Found something broken on the site or in our products.",
  },
];

export default function ContactPage() {
  return (
    <>
      <HeroSplit
        eyebrow="Contact"
        title="Get in touch"
        description="Questions, partnerships, press — we read every message and reply within 2 business days."
        form={<ContactForm />}
      />

      <Section background="muted">
        <Container>
          <Eyebrow className="mb-4">What people reach out about</Eyebrow>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Common reasons to contact
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {contactReasons.map((reason, i) => (
              <div
                key={i}
                className="border-border bg-background rounded-lg border p-6"
              >
                <h3 className="font-semibold">{reason.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>

          <div className="border-border bg-background mt-12 rounded-lg border p-6">
            <h3 className="font-semibold">Prefer email?</h3>
            <p className="text-muted-foreground mt-2 text-sm">
              Reach us directly at{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-foreground underline underline-offset-4"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

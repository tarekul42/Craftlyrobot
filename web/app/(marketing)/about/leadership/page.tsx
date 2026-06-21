import type { Metadata } from "next";
import { Crown, Users, Heart } from "lucide-react";
import { HeroCentered } from "@/components/sections/hero/hero-centered";
import { CTABand } from "@/components/sections/cta-band";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  Avatar,
  AvatarFallback,
  SectionHeading,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Leadership",
  description:
    "The team leading Craftly's mission to build Bangladesh's first real tech company.",
  alternates: { canonical: "/about/leadership" },
};

const leaders = [
  {
    name: "Wasif",
    role: "Founder",
    bio: "Leading Craftly's mission to build Bangladesh's first real tech company. Builder first, manager second.",
    initials: "W",
  },
];

const governance = [
  {
    icon: <Crown className="h-6 w-6" />,
    title: "Founders",
    description:
      "Final decision authority on strategic matters. Currently Wasif. As Craftly grows, the founders group will expand.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Leads",
    description:
      "Department and project leads. Make coordination decisions within their area. Currently informal, becoming formal as we scale.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Contributors",
    description:
      "Anyone who has shipped a contribution. Make operational decisions about their own work. The foundation of everything.",
  },
];

export default function LeadershipPage() {
  return (
    <>
      <HeroCentered
        eyebrow="Leadership"
        title="Who runs Craftly"
        description="Craftly is led by founders and department leads, with decisions made transparently. As we grow, governance formalizes."
        primaryCta={{ label: "See governance", href: "/about/governance" }}
        secondaryCta={{ label: "Join us", href: "/contribute/apply" }}
      />

      {/* Leaders */}
      <Section>
        <Container size="narrow">
          <SectionHeading
            eyebrow="The team"
            title="Founders"
            align="center"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {leaders.map((leader) => (
              <Card key={leader.name}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg">
                        {leader.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">{leader.name}</h3>
                      <p className="text-sm text-muted-foreground">{leader.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {leader.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Department leads will be added here as they&apos;re formally
            appointed. Craftly is contributor-driven — leadership emerges from
            sustained contribution.
          </p>
        </Container>
      </Section>

      {/* Structure */}
      <Section background="muted">
        <Container>
          <SectionHeading
            eyebrow="Structure"
            title="Three tiers of authority"
            description="Who decides what. Clear from day one."
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {governance.map((tier, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    {tier.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{tier.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <CTABand
        title="Want to be part of leadership?"
        description="Contributors who demonstrate sustained leadership become leads. The path is open."
        primaryCta={{ label: "Start contributing", href: "/contribute/apply" }}
        secondaryCta={{ label: "Read governance", href: "/about/governance" }}
      />
    </>
  );
}

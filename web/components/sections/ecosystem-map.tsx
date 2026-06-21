import Link from "next/link";
import { Wrench, Users, Heart, Cpu, Building2, Target, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui";

interface EcosystemLayer {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const layers: EcosystemLayer[] = [
  {
    icon: <Wrench className="h-6 w-6" />,
    title: "Products",
    description: "Tools that turn ideas into shipped software",
    href: "/products",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Community",
    description: "Contributors across departments, working in the open",
    href: "/community",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Departments",
    description: "Engineering, Design, Community, Operations",
    href: "/community/departments",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Projects",
    description: "Active initiatives being built right now",
    href: "/community/projects",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Internal Systems",
    description: "Workspace, Agent Console, operational tools",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Contributor Roles",
    description: "5h/week to full-time — find your fit",
    href: "/contribute/roles",
  },
  {
    icon: <Crown className="h-6 w-6" />,
    title: "Leadership",
    description: "Founders + leads, governing the ecosystem",
    href: "/about/leadership",
  },
];

interface EcosystemMapProps {
  className?: string;
}

/**
 * EcosystemMap — visual grid of Craftly's 7 ecosystem layers.
 * Craftly-specific section, derived from the strategic audit.
 */
export function EcosystemMap({ className }: EcosystemMapProps) {
  return (
    <section className={cn("py-section-y bg-muted/30", className)}>
      <Container>
        <SectionHeading
          eyebrow="Ecosystem map"
          title="What's inside Craftly"
          description="Seven layers, all connected. Click any layer to explore."
          align="center"
        />
        <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer, i) => {
            const content = (
              <div className="flex h-full items-start gap-4 rounded-lg border border-border bg-background p-6 transition-all hover:border-foreground/20 hover:shadow-md">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  {layer.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{layer.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {layer.description}
                  </p>
                </div>
              </div>
            );

            return layer.href ? (
              <Link key={i} href={layer.href} className="block h-full">
                {content}
              </Link>
            ) : (
              <div key={i} className="h-full opacity-70">
                {content}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeading, Card, CardContent } from "@/components/ui";

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

interface FeatureGridProps {
  eyebrow?: string;
  title: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * FeatureGrid — grid of feature cards with icon + title + description.
 *
 * @example
 * <FeatureGrid
 *   eyebrow="Decentralized intelligence"
 *   title="Built to move beyond data center limits"
 *   features={[{ icon: <Icon />, title: "...", description: "..." }]}
 * />
 */
export function FeatureGrid({
  eyebrow,
  title,
  description,
  features,
  columns = 3,
  className,
}: FeatureGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("py-section-y", className)}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
        <div className={cn("mt-12 grid gap-6 grid-cols-1", gridCols)}>
          {features.map((feature, i) => (
            <Card key={i} interactive={!!feature.href}>
              <CardContent className="p-6">
                {feature.icon && (
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-muted text-foreground">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

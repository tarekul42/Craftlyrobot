import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Stat } from "@/components/ui";

interface StatItem {
  value: string | number;
  label: string;
}

interface StatStripProps {
  stats: StatItem[];
  className?: string;
}

/**
 * StatStrip — row of 3-5 stats (numbers + labels).
 * Use for "contributors joined", "products shipped", etc.
 *
 * @example
 * <StatStrip stats={[
 *   { value: "42", label: "Active contributors" },
 *   { value: "4", label: "Products in development" },
 * ]} />
 */
export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <section className={cn("border-y border-border bg-muted/30 py-12", className)}>
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Stat key={i} value={stat.value} label={stat.label} size="md" className="text-center" />
          ))}
        </div>
      </Container>
    </section>
  );
}

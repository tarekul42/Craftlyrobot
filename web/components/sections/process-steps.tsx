import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/ui";

interface Step {
  title: string;
  description: string;
}

interface ProcessStepsProps {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: Step[];
  className?: string;
}

/**
 * ProcessSteps — numbered step-by-step process.
 * Use for /contribute/onboarding, /contribute apply flow, etc.
 */
export function ProcessSteps({
  eyebrow,
  title,
  description,
  steps,
  className,
}: ProcessStepsProps) {
  return (
    <section className={cn("py-section-y bg-muted/30", className)}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <ol className="mx-auto mt-12 max-w-3xl space-y-8">
          {steps.map((step, i) => (
            <li key={i} className="relative flex gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {i + 1}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

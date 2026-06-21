import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { SectionHeading, Avatar, AvatarFallback } from "@/components/ui";
import type { Testimonial } from "@/types/content";

interface TestimonialSectionProps {
  eyebrow?: string;
  title: string;
  testimonials: Testimonial[];
  className?: string;
}

/**
 * TestimonialSection — grid of contributor/user testimonials.
 */
export function TestimonialSection({
  eyebrow,
  title,
  testimonials,
  className,
}: TestimonialSectionProps) {
  return (
    <section className={cn("py-section-y", className)}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          align="center"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="flex h-full flex-col rounded-lg border border-border bg-background p-6"
            >
              <Quote className="h-8 w-8 text-muted-foreground/40" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/90">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{t.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.author}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

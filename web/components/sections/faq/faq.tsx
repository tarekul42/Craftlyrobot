import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import {
  SectionHeading,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui";
import type { FAQItem } from "@/types/content";

interface FAQSectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

/**
 * FAQ — accordion of frequently asked questions.
 *
 * @example
 * <FAQSection eyebrow="Common questions" title="Frequently asked" items={homepageFaqs} />
 */
export function FAQSection({
  eyebrow,
  title,
  description,
  items,
  className,
}: FAQSectionProps) {
  return (
    <section className={cn("py-section-y", className)}>
      <Container size="narrow">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <Accordion type="single" collapsible className="mt-12 w-full">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

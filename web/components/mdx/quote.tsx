import { cn } from "@/lib/utils";

interface QuoteProps {
  author: string;
  role?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Quote — pull quote for MDX content.
 * Styled differently from blockquotes — larger, with attribution.
 *
 * @example
 * <Quote author="Wasif" role="Founder">
 *   We're not trying to build another startup.
 * </Quote>
 */
export function Quote({ author, role, children, className }: QuoteProps) {
  return (
    <blockquote
      className={cn("border-primary my-8 border-l-4 pl-6", className)}
    >
      <p className="text-foreground text-xl font-medium leading-relaxed">
        {children}
      </p>
      <footer className="text-muted-foreground mt-3 text-sm">
        <span className="text-foreground font-semibold">{author}</span>
        {role && <span>, {role}</span>}
      </footer>
    </blockquote>
  );
}

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
      className={cn(
        "my-8 border-l-4 border-primary pl-6",
        className
      )}
    >
      <p className="text-xl font-medium leading-relaxed text-foreground">
        {children}
      </p>
      <footer className="mt-3 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{author}</span>
        {role && <span>, {role}</span>}
      </footer>
    </blockquote>
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow — the small uppercase label that appears above section headings.
 * This is a Craftly signature element. Use it as a section signifier.
 *
 * @example
 * <Eyebrow>Decentralized intelligence</Eyebrow>
 * <h2>Built to move beyond data center limits</h2>
 */
const Eyebrow = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { as?: "p" | "span" | "div" }
>(({ className, as: Comp = "p", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "text-xs font-bold uppercase tracking-widest text-muted-foreground",
      className
    )}
    {...props}
  />
));
Eyebrow.displayName = "Eyebrow";

export { Eyebrow };

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Prose — styled wrapper for long-form content (blog posts, MDX).
 * Applies typographic styles to child elements.
 */
const Prose = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "max-w-none text-base leading-relaxed text-foreground/90",
      "[&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mt-10 [&_h1]:mb-4",
      "[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mt-8 [&_h2]:mb-4",
      "[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3",
      "[&_h4]:text-xl [&_h4]:font-semibold [&_h4]:mt-6 [&_h4]:mb-3",
      "[&_p]:my-4 [&_p]:leading-relaxed",
      "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-foreground/20 [&_a:hover]:decoration-foreground",
      "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1",
      "[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-1",
      "[&_li]:leading-relaxed",
      "[&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-6",
      "[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm",
      "[&_pre]:rounded-lg [&_pre]:border [&_pre]:bg-muted/50 [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-6",
      "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm",
      "[&_img]:rounded-lg [&_img]:border [&_img]:my-6",
      "[&_hr]:border-border [&_hr]:my-8",
      "[&_table]:w-full [&_table]:my-6 [&_table]:border-collapse",
      "[&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold [&_th]:bg-muted",
      "[&_td]:border [&_td]:border-border [&_td]:p-2",
      className
    )}
    {...props}
  />
));
Prose.displayName = "Prose";

export { Prose };

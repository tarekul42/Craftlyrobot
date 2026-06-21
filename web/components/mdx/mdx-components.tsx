import * as React from "react";
import Link from "next/link";
import { Callout } from "./callout";
import { YouTube } from "./youtube";
import { CodeBlock } from "./code-block";
import { Image } from "./image";
import { Quote } from "./quote";

/**
 * mdxComponents — the component map passed to MDXRemote.
 *
 * Maps HTML elements to styled React components.
 * Custom components (Callout, YouTube, etc.) are also included.
 */
const mdxComponents = {
  // Custom components
  Callout,
  YouTube,
  CodeBlock,
  Image,
  Quote,

  // Styled HTML elements
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 mt-10 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-4 mt-8 text-3xl font-bold tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-3 mt-6 text-2xl font-semibold" {...props} />
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mb-3 mt-6 text-xl font-semibold" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="my-4 leading-relaxed" {...props} />
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground hover:text-muted-foreground underline underline-offset-4"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-foreground hover:text-muted-foreground underline underline-offset-4"
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 list-disc space-y-1 pl-6" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 list-decimal space-y-1 pl-6" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-border text-muted-foreground my-6 border-l-4 pl-4 italic"
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    // Inline code (no newline in children) vs block code
    const isInline = !className?.includes("language-");
    if (isInline) {
      return (
        <code
          className="bg-muted rounded px-1.5 py-0.5 font-mono text-sm"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="border-border bg-muted/50 my-6 overflow-x-auto rounded-lg border p-4 font-mono text-sm"
      {...props}
    />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-border my-8" {...props} />
  ),
  img: ({ src, alt, className }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image src={(src as string) ?? ""} alt={alt ?? ""} className={className} />
  ),
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-border bg-muted border p-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border-border border p-2" {...props} />
  ),
};

export default mdxComponents;

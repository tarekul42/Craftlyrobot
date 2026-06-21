"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

interface CodeBlockProps {
  language?: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * CodeBlock — code block with copy button for MDX content.
 *
 * Note: This is a basic code block. For syntax highlighting, install
 * `rehype-pretty-code` and configure it in the MDX renderer.
 *
 * @example
 * <CodeBlock language="typescript" filename="example.ts">
 *   const x = 1;
 * </CodeBlock>
 */
export function CodeBlock({
  language,
  filename,
  children,
  className,
}: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard();
  const codeRef = React.useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    const text = codeRef.current?.textContent ?? "";
    copy(text);
  };

  return (
    <div
      className={cn(
        "border-border bg-muted/50 my-6 overflow-hidden rounded-lg border",
        className,
      )}
    >
      {(filename || language) && (
        <div className="border-border bg-muted flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">
            {filename ?? language}
          </span>
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 rounded text-xs transition-colors"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" /> Copy
              </>
            )}
          </button>
        </div>
      )}
      <pre ref={codeRef} className="overflow-x-auto p-4 text-sm">
        <code className="font-mono">{children}</code>
      </pre>
    </div>
  );
}

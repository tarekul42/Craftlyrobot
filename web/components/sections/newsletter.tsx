"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button, Input, FormField } from "@/components/ui";

interface NewsletterProps {
  title?: string;
  description?: string;
  className?: string;
}

/**
 * Newsletter — email signup section.
 * Client component because it has form state.
 */
export function Newsletter({
  title = "Stay in the loop",
  description = "Get notified when we ship. No spam, just product updates and ecosystem news.",
  className,
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      // Wire this to /api/newsletter when backend is ready
      await new Promise((r) => setTimeout(r, 800));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={cn("py-section-y", className)}>
      <Container size="narrow">
        <div className="rounded-lg border border-border bg-muted/30 p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          <p className="mx-auto mt-3 max-w-prose text-muted-foreground">
            {description}
          </p>

          {status === "success" ? (
            <p className="mt-6 font-medium text-success" role="status">
              Thanks! Check your inbox to confirm.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address"
              />
              <Button type="submit" isLoading={status === "loading"}>
                Subscribe
              </Button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Button, Input } from "@/components/ui";

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
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to subscribe");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className={cn("py-section-y", className)}>
      <Container size="narrow">
        <div className="border-border bg-muted/30 rounded-lg border p-8 text-center md:p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-prose">
            {description}
          </p>

          {status === "success" ? (
            <p className="text-success mt-6 font-medium" role="status">
              Thanks! Check your inbox to confirm.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
            >
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
            <p className="text-destructive mt-3 text-sm" role="alert">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useEffect } from "react";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout/container";

/**
 * Global error boundary — catches unhandled errors in any route.
 *
 * Must be a client component (Next.js requirement).
 * Calls reset() to retry, or links home.
 *
 * In production, errors are also sent to Sentry (wire up in lib/sentry.ts).
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to console (Sentry will capture this in production)
    console.error("[error boundary]", error);
  }, [error]);

  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-logo text-9xl text-muted-foreground/20">500</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        An unexpected error occurred. Our team has been notified. Try again, or
        head back home.
      </p>

      {error.digest && (
        <p className="mt-4 font-mono text-xs text-muted-foreground">
          Error ID: {error.digest}
        </p>
      )}

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} leftIcon={<RefreshCw className="h-4 w-4" />}>
          Try again
        </Button>
        <Button asChild variant="outline" leftIcon={<Home className="h-4 w-4" />}>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </Container>
  );
}

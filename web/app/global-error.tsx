"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout/container";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <Container className="flex min-h-screen flex-col items-center justify-center py-20 text-center">
          <p className="font-logo text-muted-foreground/20 text-9xl">500</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Something went wrong
          </h1>
          <p className="text-muted-foreground mt-3 max-w-md">
            An unexpected error occurred. Our team has been notified. Try again,
            or head back home.
          </p>

          {error.digest && (
            <p className="text-muted-foreground mt-4 font-mono text-xs">
              Error ID: {error.digest}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button onClick={reset}>
              <RefreshCw className="mr-1 h-4 w-4" />
              Try again
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="mr-1 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </div>
        </Container>
      </body>
    </html>
  );
}

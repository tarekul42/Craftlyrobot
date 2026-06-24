"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

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
        <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
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
            <button
              onClick={reset}
              className="bg-foreground text-background hover:bg-foreground/90 inline-flex h-10 items-center justify-center gap-2 rounded-md px-6 text-sm font-medium"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
            <Link
              href="/"
              className="border-border hover:bg-muted inline-flex h-10 items-center justify-center gap-2 rounded-md border px-6 text-sm font-medium"
            >
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}

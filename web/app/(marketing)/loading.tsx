import { Skeleton } from "@/components/ui";
import { Container } from "@/components/layout/container";

/**
 * Marketing loading state — shown while route segments are loading.
 * Provides a skeleton that matches the typical page structure.
 */
export default function Loading() {
  return (
    <Container className="py-20">
      {/* Hero skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-16 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border-border space-y-3 rounded-lg border p-6"
          >
            <Skeleton className="h-12 w-12 rounded-md" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </Container>
  );
}

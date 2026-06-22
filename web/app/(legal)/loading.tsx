import { Skeleton } from "@/components/ui";
import { Container } from "@/components/layout/container";

export default function LegalLoading() {
  return (
    <Container size="prose" className="py-12">
      <Skeleton className="h-10 w-1/2" />
      <div className="mt-6 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </Container>
  );
}

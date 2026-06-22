import { Skeleton } from "@/components/ui";
import { Container } from "@/components/layout/container";

export default function RootLoading() {
  return (
    <Container className="py-20">
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-16 w-3/4" />
      </div>
    </Container>
  );
}

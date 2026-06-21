import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import type { Department } from "@/types/content";

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  return (
    <Card interactive className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-2 flex items-center justify-between">
          <Building2 className="text-muted-foreground h-6 w-6" />
          <Badge variant="secondary">
            {department.contributorCount} contributors
          </Badge>
        </div>
        <h3 className="text-xl font-semibold">{department.name}</h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {department.focus}
        </p>
        {department.openings && department.openings.length > 0 && (
          <p className="text-muted-foreground mt-4 text-xs">
            <span className="text-foreground font-medium">
              {department.openings.length} open role
              {department.openings.length === 1 ? "" : "s"}
            </span>
          </p>
        )}
        <Link
          href={`/community/departments/${department.slug}`}
          className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Learn more
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

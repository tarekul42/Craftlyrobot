import Link from "next/link";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, Badge } from "@/components/ui";
import type { ContributorRole } from "@/types/content";

interface RoleCardProps {
  role: ContributorRole;
  showRequirements?: boolean;
  maxRequirements?: number;
}

export function RoleCard({
  role,
  showRequirements = true,
  maxRequirements = 3,
}: RoleCardProps) {
  return (
    <Card interactive className="h-full">
      <CardContent className="flex h-full flex-col p-6">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Badge variant="outline">{role.department}</Badge>
          <span className="text-muted-foreground flex items-center gap-1 text-xs">
            <Clock className="h-3 w-3" />
            {role.commitment === "fulltime"
              ? "Full-time"
              : `${role.commitment}/week`}
          </span>
        </div>
        <h3 className="text-lg font-semibold">{role.title}</h3>
        <p className="text-muted-foreground mt-2 flex-1 text-sm">
          {role.description}
        </p>
        {showRequirements && (
          <div className="mt-4">
            <p className="text-foreground mb-2 text-xs font-medium">
              Requirements:
            </p>
            <ul className="space-y-1">
              {role.requirements.slice(0, maxRequirements).map((req, i) => (
                <li
                  key={i}
                  className="text-muted-foreground flex items-start gap-2 text-xs"
                >
                  <CheckCircle2 className="text-success mt-0.5 h-3 w-3 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <Link
          href="/contribute/apply"
          className="text-foreground mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          Apply for this role
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
}

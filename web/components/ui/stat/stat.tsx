import * as React from "react";
import { cn } from "@/lib/utils";

interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string | number;
  label: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Stat — number + label display for stats strips.
 * Used in the PeopleBar pattern (contributors joined, target, etc).
 *
 * @example
 * <Stat value="42" label="Active contributors" />
 */
function Stat({
  value,
  label,
  size = "md",
  className,
  ...props
}: StatProps) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <span
        className={cn(
          "font-bold tracking-tight text-foreground tabular-nums",
          size === "sm" && "text-2xl",
          size === "md" && "text-4xl",
          size === "lg" && "text-5xl"
        )}
      >
        {value}
      </span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

export { Stat };

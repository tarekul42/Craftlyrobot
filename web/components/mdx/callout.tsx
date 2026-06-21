import * as React from "react";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  {
    icon: React.ElementType;
    container: string;
    title: string;
    iconColor: string;
  }
> = {
  info: {
    icon: Info,
    container: "border-border bg-muted/50",
    title: "text-foreground",
    iconColor: "text-foreground",
  },
  warning: {
    icon: AlertTriangle,
    container: "border-warning/30 bg-warning/5",
    title: "text-warning-foreground",
    iconColor: "text-warning",
  },
  success: {
    icon: CheckCircle,
    container: "border-success/30 bg-success/5",
    title: "text-success-foreground",
    iconColor: "text-success",
  },
  danger: {
    icon: AlertCircle,
    container: "border-destructive/30 bg-destructive/5",
    title: "text-destructive",
    iconColor: "text-destructive",
  },
};

/**
 * Callout — highlighted information box for MDX content.
 *
 * @example
 * <Callout type="info" title="Note">
 *   This is an info callout.
 * </Callout>
 */
export function Callout({ type = "info", title, children }: CalloutProps) {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn("my-6 rounded-lg border p-4", config.container)}>
      <div className="flex gap-3">
        <Icon
          className={cn("mt-0.5 h-5 w-5 shrink-0", config.iconColor)}
          aria-hidden="true"
        />
        <div className="flex-1">
          {title && (
            <p className={cn("mb-1 font-semibold", config.title)}>{title}</p>
          )}
          <div className="text-foreground/80 text-sm [&>p:last-child]:mb-0 [&>p]:my-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

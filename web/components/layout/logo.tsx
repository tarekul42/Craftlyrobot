import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "font-logo text-foreground text-2xl leading-none",
        className,
      )}
      aria-label="Craftly — home"
    >
      Craftly
    </Link>
  );
}

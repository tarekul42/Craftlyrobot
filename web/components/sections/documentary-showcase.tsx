import { Play, Trophy, TrendingUp, Award, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

interface Achievement {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const achievements: Achievement[] = [
  {
    icon: <Trophy className="h-5 w-5" />,
    value: "42",
    label: "Active contributors",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    value: "4",
    label: "Products in development",
  },
  {
    icon: <Award className="h-5 w-5" />,
    value: "6",
    label: "Active projects",
  },
  {
    icon: <Star className="h-5 w-5" />,
    value: "Building from",
    label: "Bangladesh",
  },
];

export function DocumentaryShowcase({ className }: { className?: string }) {
  return (
    <Section className={cn("border-border border-b", className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Link
            href="https://youtube.com/playlist?list=CraftlyDocumentary"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800"
          >
            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
            <div className="relative flex flex-col items-center gap-3">
              <div className="bg-foreground/90 flex h-16 w-16 items-center justify-center rounded-full transition-transform group-hover:scale-110">
                <Play className="text-background ml-0.5 h-7 w-7" />
              </div>
              <span className="text-foreground/80 text-sm font-medium">
                Watch the Craftly Documentary
              </span>
            </div>
            <span className="absolute bottom-4 left-4 text-xs font-medium text-white/60">
              Craftly Documentary — Building from Bangladesh
            </span>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="border-border bg-background flex flex-col items-center justify-center rounded-xl border p-6 text-center"
              >
                <div className="text-muted-foreground mb-2">{a.icon}</div>
                <div className="text-2xl font-bold tracking-tight">
                  {a.value}
                </div>
                <div className="text-muted-foreground mt-0.5 text-sm">
                  {a.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

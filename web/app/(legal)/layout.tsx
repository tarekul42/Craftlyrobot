import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Logo } from "@/components/layout/main-nav";
import { legalNav } from "@/config/navigation";

/**
 * Legal layout — minimal chrome for legal pages.
 * Just a logo header and a footer with legal links.
 * No main nav, no theme toggle, no CTA button.
 */
export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-border border-b">
        <Container size="prose" className="flex h-16 items-center">
          <Link href="/" aria-label="Craftly — home">
            <Logo />
          </Link>
        </Container>
      </header>

      <main className="flex-1">
        <Container size="prose" className="py-12">
          {children}
        </Container>
      </main>

      <footer className="border-border border-t">
        <Container
          size="prose"
          className="text-muted-foreground flex h-16 flex-wrap items-center justify-between gap-4 text-sm"
        >
          <span>© {new Date().getFullYear()} Craftly</span>
          <nav className="flex gap-4" aria-label="Legal">
            {legalNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </Container>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { Facebook, Youtube, Github } from "lucide-react";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./main-nav";
import { footerNav, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

/**
 * SiteFooter — global footer with 4 link columns + social + legal.
 *
 * Structure:
 *   [Logo + description]
 *   [Products] [Community] [Contribute] [About]
 *   [Social icons] [Theme toggle]    [© Craftly] [Privacy] [Terms] [Security]
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.entries(footerNav).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          {/* Social + theme */}
          <div className="flex items-center gap-3">
            <SocialIcons />
            <ThemeToggle />
          </div>

          {/* Copyright + legal */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>
              © {year} {siteConfig.name}
            </span>
            <nav className="flex gap-3" aria-label="Legal">
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
          </div>
        </div>
      </Container>
    </footer>
  );
}

/**
 * SocialIcons — links to Craftly's social profiles.
 */
function SocialIcons() {
  return (
    <div className="flex items-center gap-1">
      <SocialLink
        href={siteConfig.social.facebook}
        label="Join our Facebook Group"
      >
        <Facebook className="h-5 w-5" />
      </SocialLink>
      <SocialLink
        href={siteConfig.social.youtube}
        label="Watch us on YouTube"
      >
        <Youtube className="h-5 w-5" />
      </SocialLink>
      <SocialLink href={siteConfig.social.github} label="View on GitHub">
        <Github className="h-5 w-5" />
      </SocialLink>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {children}
    </a>
  );
}

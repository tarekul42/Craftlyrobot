import Link from "next/link";
import { Globe, Video, Code } from "lucide-react";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { Logo } from "./logo";
import { footerNav, legalNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border bg-muted/30 border-t">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
          <div>
            <Logo />
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {Object.entries(footerNav).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                  {category}
                </h3>
                <ul className="mt-4 space-y-2">
                  {items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-foreground/80 hover:text-foreground text-sm transition-colors"
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

        <div className="border-border mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <div className="flex items-center gap-3">
            <SocialIcons />
            <ThemeToggle />
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
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

function SocialIcons() {
  return (
    <div className="flex items-center gap-1">
      <SocialLink
        href={siteConfig.social.facebook}
        label="Join our Facebook Group"
      >
        <Globe className="h-5 w-5" />
      </SocialLink>
      <SocialLink href={siteConfig.social.youtube} label="Watch us on YouTube">
        <Video className="h-5 w-5" />
      </SocialLink>
      <SocialLink href={siteConfig.social.github} label="View on GitHub">
        <Code className="h-5 w-5" />
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
      className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-9 w-9 items-center justify-center rounded-md transition-colors"
    >
      {children}
    </a>
  );
}

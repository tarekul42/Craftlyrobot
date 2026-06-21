import type { Metadata, Viewport } from "next";
import { dmSans, pacifico, jetBrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui";
import { BackToTop } from "@/components/ui/back-to-top/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent/cookie-consent";
import { WebVitals } from "@/components/ui/web-vitals/web-vitals";
import { Analytics } from "@/components/providers/analytics";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        dmSans.variable,
        pacifico.variable,
        jetBrainsMono.variable
      )}
    >
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          {children}
          <Toaster />
          <BackToTop />
          <CookieConsent />
          <WebVitals />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

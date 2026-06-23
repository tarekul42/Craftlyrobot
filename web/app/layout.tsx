import type { Metadata, Viewport } from "next";
import { dmSans, pacifico, jetBrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toast/toast";
import { BackToTop } from "@/components/ui/back-to-top/back-to-top";
import { CookieConsent } from "@/components/ui/cookie-consent/cookie-consent";
import { WebVitals } from "@/components/ui/web-vitals/web-vitals";
import { Analytics } from "@/components/providers/analytics";
import { siteConfig } from "@/config/site";
import {
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const jsonLd = [organizationJsonLd(), websiteJsonLd()];

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Ask for anything. Get it done.`,
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
    title: `${siteConfig.name} — Ask for anything. Get it done.`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Ask for anything. Get it done.`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050608" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
      className={cn(dmSans.variable, pacifico.variable, jetBrainsMono.variable)}
    >
      <head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground min-h-dvh font-sans antialiased">
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

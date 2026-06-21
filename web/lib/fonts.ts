import { Pacifico, DM_Sans, JetBrains_Mono } from "next/font/google";

/**
 * Fonts — loaded via next/font for zero layout shift and self-hosting.
 * These CSS variables are referenced in styles/tokens.css:
 *   --font-dm-sans, --font-pacifico, --font-jetbrains-mono
 *
 * The variables are applied to <html> in app/layout.tsx.
 */

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
  preload: true,
});

export const dmSans = DM_Sans({
  weight: ["variable"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: true,
});

export const jetBrainsMono = JetBrains_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

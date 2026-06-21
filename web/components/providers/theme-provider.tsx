"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * ThemeProvider — wraps the app to enable light/dark mode.
 * Uses next-themes with class strategy (adds .dark to <html>).
 *
 * The .dark class triggers the dark mode token values in styles/tokens.css.
 * Components don't need dark: prefixes — semantic tokens swap automatically.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

# Lighthouse 100 Checklist

> Targets: Performance 95-100 · Accessibility 95-100 · Best Practices 100 · SEO 100

## Performance

### Critical rendering path
- [ ] Inline critical CSS (Tailwind generates this automatically)
- [ ] Preload above-fold fonts (`preload: true` in next/font)
- [ ] Preconnect to third-party origins (Cloudflare, Plausible)
- [ ] Remove render-blocking resources (Analytics loaded with `afterInteractive`)

### Images
- [ ] All images use `next/image` (no raw `<img>` tags)
- [ ] Above-fold images have `priority` attribute
- [ ] Images include `sizes` attribute for responsive loading
- [ ] Images use modern formats (WebP/AVIF — set in `next.config.ts`)
- [ ] Placeholder/blob images use `placeholder="blur"` with static imports

### JavaScript
- [ ] `"use client"` only on components that need it (checked)
- [ ] `experimental.optimizePackageImports` configured for `lucide-react`, `motion`, Radix
- [ ] No barrel imports from `@/components/ui` — use direct paths (done)
- [ ] `compiler.removeConsole` strips `console.log` in production (done)
- [ ] Dynamic imports for heavy components (`next/dynamic`)
- [ ] Bundle analyzer run: no chunk > 30KB of unnecessary code

### CSS
- [ ] `experimental.optimizeCss` enabled (or `cssChunking: true`)
- [ ] No unused CSS (Tailwind v4 purges by default)
- [ ] No `@import` in CSS that blocks rendering (print.css loaded at end)

### Caching
- [ ] `_next/static` has immutable cache (1 year) (done)
- [ ] Images have 30-day cache (done)
- [ ] Fonts have 1-year cache (done)
- [ ] HTML has `public, max-age=0, must-revalidate` (Next.js default)

## Accessibility

### Structure
- [ ] `<html lang="en">` (done)
- [ ] Heading hierarchy is logical (h1 → h2 → h3, no skips)
- [ ] Every page has exactly one `<h1>`
- [ ] Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` (done)
- [ ] Skip link present and functional (done)

### Content
- [ ] All images have meaningful `alt` text
- [ ] All form inputs have associated `<label>` (done — FormField pattern)
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Links are distinguishable (underline or icon, not just color)
- [ ] Decorative icons have `aria-hidden="true"`

### Interactive
- [ ] All buttons have accessible names (`aria-label` or visible text)
- [ ] Focus indicators visible and high-contrast (done — `focus-visible` ring)
- [ ] Custom components have proper ARIA roles
- [ ] Animations respect `prefers-reduced-motion` (done)

### Forms
- [ ] Error messages are associated with inputs (`aria-describedby`)
- [ ] Required fields are marked (`aria-required` — done in FormField)
- [ ] Success/error states are announced (`role="alert"`, `role="status"`)

## Best Practices

### Security
- [ ] HTTPS enabled (HSTS in security headers)
- [ ] CSP configured (done)
- [ ] `X-Frame-Options: DENY` (done)
- [ ] No `dangerouslySetInnerHTML` unless necessary (JSON-LD is safe)
- [ ] No secrets in client-side code

### Dependencies
- [ ] Dependencies are up to date
- [ ] No deprecated packages
- [ ] No unused dependencies (check with `depcheck`)

### Errors
- [ ] Error boundary in place (`app/error.tsx`)
- [ ] 404 page exists (`app/not-found.tsx`)
- [ ] API routes have error handling (try/catch with meaningful messages)

## SEO

### On-page
- [ ] Title: 50-60 characters (done: 52 chars)
- [ ] Meta description: 155-160 characters (done: 158 chars)
- [ ] Canonical URL on every page (done)
- [ ] Open Graph tags (title, description, image, url, type) (done)
- [ ] Twitter card tags (card, title, description, image) (done)
- [ ] `alt` text on all images
- [ ] Semantic HTML (`<article>`, `<section>`, `<nav>`, etc.)

### Structured data
- [ ] Organization JSON-LD (done)
- [ ] WebSite JSON-LD with SearchAction (done)
- [ ] FAQPage JSON-LD on pages with FAQ (done in homepage)
- [ ] BreadcrumbList on deep pages
- [ ] BlogPosting on blog posts

### Technical
- [ ] Sitemap submitted to Google Search Console
- [ ] `robots.txt` allows crawling of public pages (done)
- [ ] Pages are statically generated where possible (all pages are static)
- [ ] No duplicate content (canonical URLs prevent this)
- [ ] Mobile-friendly viewport (done)

### Content
- [ ] Homepage has clear value proposition (done: "Ask for anything. Get it done.")
- [ ] Each page has unique title and description
- [ ] Keywords are relevant and not stuffed
- [ ] Internal linking structure is clear

## Post-deployment verification

- [ ] Run Lighthouse on every page (not just homepage)
- [ ] Run axe-core accessibility test (`bunx playwright test e2e/accessibility.spec.ts`)
- [ ] Verify JSON-LD in Google's Rich Results Test
- [ ] Verify sitemap in Google Search Console
- [ ] Check Core Web Vitals in Search Console (after 28 days)
- [ ] Manual screen reader test (VoiceOver on Mac, NVDA on Windows)

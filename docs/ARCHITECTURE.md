# Craftly Website Architecture

This document describes the high-level architecture of the Craftly website. For implementation details, see the code and inline comments.

## Overview

The Craftly website is a Next.js 15 App Router application built on a strict 4-layer design system. It's server-component-first, with minimal client-side JavaScript. The goal: fast, accessible, secure, and maintainable.

```
┌─────────────────────────────────────────────────────────────┐
│                       Pages (app/)                           │
│   Composed of sections, blocks, and primitives               │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Sections (components/sections/)           │
│   Vertical page sections — Hero, FeatureGrid, CTA, FAQ      │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                  Primitives (components/ui/)                 │
│   36 building blocks — Button, Card, Dialog, Input, etc.    │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                    Tokens (styles/tokens.css)                │
│   CSS variables — colors, fonts, spacing, shadows           │
└─────────────────────────────────────────────────────────────┘
```

**Layering rule:** Each layer only depends on the layer below it. Pages → Sections → Primitives → Tokens. Never the reverse.

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 App Router | RSC, file-based routing, edge runtime, built-in optimization |
| Language | TypeScript 5 strict | Type safety, self-documenting code |
| Styling | Tailwind CSS v4 | Utility-first, zero runtime, deterministic output |
| Components | shadcn/ui (Radix) | Copy-paste components, accessible by default |
| Animation | Framer Motion | Declarative, SSR-compatible |
| Forms | React Hook Form + Zod | Performant, type-safe validation |
| State | RSC + Zustand + nuqs | Server state via RSC, UI state via Zustand, URL state via nuqs |
| Content | MDX (next-mdx-remote) | Blog posts in git, rendered as RSC |
| Database | PostgreSQL + Prisma | Type-safe ORM, migrations, studio |
| Email | Resend | Simple API, generous free tier |
| Analytics | Plausible | Privacy-friendly, cookieless, GDPR-compliant |
| Errors | Sentry | Industry standard, performance monitoring |
| Bot protection | Cloudflare Turnstile | Privacy-friendly reCAPTCHA alternative |
| Hosting | Vercel | Canonical Next.js host, edge network |
| DNS/WAF | Cloudflare | DDoS protection, WAF, fast DNS |

## Routing

Three route groups:

- `(marketing)/` — full chrome (header + footer), the default experience
- `(legal)/` — minimal chrome (logo + legal nav), for privacy/terms/security
- `(errors)/` — no chrome, for 404/500

Route groups in parentheses don't affect the URL. `/about` is served by `app/(marketing)/about/page.tsx`.

## Data flow

```
Static config (config/*.ts)     → imported directly into server components
MDX content (content/blog/)     → read at build time via lib/mdx.ts
External API (future)           → fetched in RSC with revalidate
Forms                           → client (RHF) → API route (validate + persist + notify)
```

## Security

1. **CSP** — strict Content Security Policy in `next.config.ts`
2. **Security headers** — HSTS, X-Frame-Options, X-Content-Type-Options, etc.
3. **Server-side validation** — Zod schemas on both client and server
4. **Rate limiting** — in-memory (dev) or Upstash Redis (prod)
5. **Bot protection** — Cloudflare Turnstile on all forms
6. **Secret management** — environment variables, never in client bundle

## Performance

- **RSC by default** — less JS shipped to client
- **`next/image`** — automatic WebP/AVIF, responsive srcset, lazy loading
- **`next/font`** — zero layout shift, self-hosted fonts
- **Code splitting** — `next/dynamic` for heavy components
- **ISR** — `revalidate` on fetch for periodic updates
- **Edge runtime** — for OG image generation

Targets:
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- First Load JS < 100KB

## Accessibility

Target: WCAG 2.2 AA on every page.

- Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`)
- Keyboard navigable (Tab, Enter, Space, Escape)
- Visible focus states (`focus-visible:ring-2`)
- ARIA attributes where needed
- Color contrast ≥ 4.5:1 for text
- `prefers-reduced-motion` respected
- Screen reader tested (VoiceOver, NVDA)

## Testing

- **Unit** — Vitest + Testing Library (component tests)
- **E2E** — Playwright (critical user flows)
- **Accessibility** — axe-core via Playwright
- **Visual regression** — Playwright screenshots
- **Performance** — Lighthouse CI in GitHub Actions

## CI/CD

GitHub Actions workflows:

- `ci.yml` — lint, typecheck, test, build on every PR
- `lighthouse.yml` — performance + SEO audit on PRs
- `security.yml` — dependency audit

Vercel deploys automatically on merge to `main`. Preview deployments on every PR.

## Decision records

See `docs/adr/` for Architecture Decision Records:

- ADR-001: Use Next.js App Router
- ADR-002: Use Tailwind CSS v4
- ADR-003: Use shadcn/ui
- ADR-004: Use Prisma + PostgreSQL
- ADR-005: Use Bun as package manager

## When to update this document

Update this file when:
- The tech stack changes (new framework, new database, etc.)
- The routing strategy changes
- The security model changes
- A new architectural pattern is adopted

Don't update for:
- New components (those follow existing patterns)
- New pages (those follow existing routing)
- Bug fixes or refactors

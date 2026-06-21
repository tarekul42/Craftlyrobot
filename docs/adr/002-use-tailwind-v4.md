# ADR-002: Use Tailwind CSS v4

## Status
Accepted (2026-01-15)

## Context
Need a CSS solution that enforces design tokens, scales to 100+ pages, and has zero runtime cost.

## Decision
Use Tailwind CSS v4 with semantic design tokens.

## Rationale
- **Zero runtime** — static CSS, no JS overhead
- **Token enforcement** — `bg-background`, `text-foreground` etc. prevent drift
- **Tree-shaking** — unused classes stripped, production CSS < 15KB
- **shadcn/ui compatibility** — built on Tailwind
- **Dark mode** — semantic tokens swap automatically, no `dark:` prefix needed

## Consequences
- **Positive:** Fast, consistent, dark-mode-ready out of the box
- **Negative:** Learning curve for utility-first mindset
- **Neutral:** Must maintain token discipline (no raw hex colors)

## Alternatives considered
- **CSS Modules** — work but don't enforce tokens as well
- **Styled Components** — runtime CSS-in-JS, deprecated pattern
- **vanilla-extract** — good but less ecosystem support

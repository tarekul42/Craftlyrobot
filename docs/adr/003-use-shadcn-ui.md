# ADR-003: Use shadcn/ui for component primitives

## Status
Accepted (2026-01-15)

## Context
Need accessible, customizable component primitives (Button, Dialog, Select, etc.).

## Decision
Use shadcn/ui (Radix UI + Tailwind) — copy-paste components we own.

## Rationale
- **Source code ownership** — components live in our repo, no dependency lock-in
- **Accessibility** — built on Radix, WCAG-compliant by default
- **Customizable** — full control over styling
- **No version upgrades** — we have the code, no breaking changes from upstream

## Consequences
- **Positive:** Full control, no supply chain risk, accessible by default
- **Negative:** Manual updates (no `npm update` for component fixes)
- **Neutral:** Need to maintain component code ourselves

## Alternatives considered
- **Material UI** — strong aesthetic opinion, hard to customize
- **Chakra UI** — runtime CSS-in-JS, performance cost
- **Ant Design** — admin-dashboard aesthetic, doesn't match Craftly

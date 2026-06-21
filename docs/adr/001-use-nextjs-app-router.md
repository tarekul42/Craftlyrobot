# ADR-001: Use Next.js App Router

## Status
Accepted (2026-01-15)

## Context
We need to choose a React framework for the Craftly website. Options considered:
- Next.js App Router (RSC)
- Next.js Pages Router
- Remix
- Astro

## Decision
Use Next.js 15 with App Router.

## Rationale
- **RSC** — server components ship zero JS, faster page loads
- **File-based routing** — simplest mental model
- **Edge runtime** — for OG image generation and middleware
- **Built-in optimization** — `next/image`, `next/font`, `next/mdx`
- **Team experience** — already familiar with Next.js
- **Ecosystem** — largest community, every problem has a documented solution

## Consequences
- **Positive:** RSC reduces client JS, SEO-friendly, edge-ready
- **Negative:** App Router is newer, fewer community resources than Pages Router
- **Neutral:** Team has Next.js experience, minimal learning curve

## Alternatives considered
- **Pages Router** — in maintenance mode, no RSC
- **Remix** — excellent but smaller ecosystem, learning curve
- **Astro** — great for content but weaker for interactive components

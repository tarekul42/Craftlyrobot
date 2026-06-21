# ADR-005: Use Bun as package manager and runtime

## Status
Accepted (2026-01-15)

## Context
Need a fast, reliable package manager. Team uses Bun locally.

## Decision
Use Bun for package management and as the dev runtime.

## Rationale
- **Speed** — 10-30x faster than npm for installs
- **Workspaces** — built-in monorepo support
- **All-in-one** — package manager, bundler, test runner, runtime
- **Compatibility** — drop-in replacement for npm/yarn in most cases

## Consequences
- **Positive:** Faster installs, simpler toolchain
- **Negative:** Some edge cases with Node.js compatibility
- **Neutral:** Production runs on Vercel (Node.js), Bun is dev-only

## Alternatives considered
- **npm** — slower, no workspace support natively
- **pnpm** — good but Bun is faster
- **yarn** — Berry has steep learning curve

## Production note
Production runs on Vercel which uses Node.js. Bun is used for local development and CI only. The `package.json` `engines` field accepts both Bun and Node.js.

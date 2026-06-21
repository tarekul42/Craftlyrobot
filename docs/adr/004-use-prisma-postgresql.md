# ADR-004: Use Prisma + PostgreSQL

## Status
Accepted (2026-01-20)

## Context
Need a database for storing applications, contact messages, and newsletter subscribers.

## Decision
Use PostgreSQL (Neon) with Prisma ORM.

## Rationale
- **Type-safe** — Prisma generates TypeScript types from schema
- **Migrations** — declarative schema, version-controlled migrations
- **Studio** — visual database browser for dev
- **Neon** — serverless Postgres, generous free tier, branching for previews
- **Standard** — PostgreSQL is the most battle-tested relational database

## Consequences
- **Positive:** Type safety, migrations, great DX
- **Negative:** Prisma adds ~3MB to node_modules, cold start cost on serverless
- **Neutral:** Need to manage migrations carefully in CI

## Alternatives considered
- **Drizzle** — lighter, but less mature tooling
- **Supabase** — includes auth, but vendor lock-in
- **MongoDB** — document DB, but we need relational integrity

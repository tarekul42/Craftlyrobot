# Contributing to Craftly

Thanks for your interest in contributing to Craftly! This document covers everything you need to know.

## Quick start

```bash
bun install
cp web/.env.example web/.env.local
bun run dev
```

Visit `http://localhost:3000`.

## Branch strategy

**Trunk-based development:**

- `main` — always deployable. Protected.
- Feature branches — `feat/apply-form`, `fix/mobile-nav`, `docs/api-spec`
- Hotfix branches — `hotfix/critical-bug`

### Branch naming

```
feat/<short-description>      ← new features
fix/<short-description>       ← bug fixes
docs/<short-description>      ← documentation
chore/<short-description>     ← tooling, dependencies
refactor/<short-description>  ← code refactoring
hotfix/<short-description>    ← urgent production fixes
```

## Commit convention

We use [Conventional Commits](https://www.conventionalcommits.org/). The commit-msg hook enforces this.

```
feat: add apply page form
fix: correct mobile nav z-index
docs: update README
style: format hero copy
refactor: extract FormField component
test: add Button component tests
chore: bump dependencies
```

**Format:** `type(scope): description`

- `type` — feat, fix, docs, style, refactor, test, chore
- `scope` — optional, the area affected (e.g., `feat(auth): ...`)
- `description` — lowercase, imperative mood, no period

## PR workflow

1. Create a branch from `main`
2. Develop with frequent commits
3. Push and open a PR
4. CI runs (lint, typecheck, test, build, Lighthouse)
5. Request review
6. Address feedback
7. Squash-merge to `main`
8. Auto-deploys to production

## Code style

### TypeScript

- Strict mode enabled
- `noUncheckedIndexedAccess` enabled
- Use `type` for type aliases, `interface` for objects that might be extended
- Prefer named exports over default exports (except Next.js pages/layouts)

### Styling

- Tailwind CSS v4 with semantic tokens
- Never use raw hex colors — always `bg-background`, `text-foreground`, etc.
- Never use Tailwind's default palette (`bg-blue-500` is forbidden)
- Never use `dark:` prefix (semantic tokens handle dark mode automatically)
- Never use inline styles for design tokens

### Components

- Server Components by default
- Only use `"use client"` when the component needs state, effects, or browser APIs
- One folder per component in `components/ui/`
- Every component gets a test file

### Naming

| Element | Convention | Example |
|---|---|---|
| Files | kebab-case | `site-header.tsx` |
| Components | PascalCase | `SiteHeader` |
| Hooks | use-camelCase | `useMediaQuery` |
| Types | PascalCase | `NavItem` |
| Constants | UPPER_SNAKE | `MAX_RETRIES` |

## PR checklist

Before opening a PR:

- [ ] Code follows the style guide (ESLint + Prettier pass)
- [ ] Self-reviewed
- [ ] Added tests for new functionality
- [ ] All tests pass (`bun run test`)
- [ ] TypeScript checks pass (`bun run typecheck`)
- [ ] Build succeeds (`bun run build`)
- [ ] Updated documentation where needed
- [ ] No new console warnings
- [ ] Checked dark mode
- [ ] Checked mobile layout (375px width)
- [ ] No raw hex colors in components
- [ ] No unnecessary `"use client"` directives

## Architecture

See `docs/ARCHITECTURE.md` for the full architecture overview.

Key principles:
- 4-layer design system (tokens → primitives → sections → pages)
- Strict layering — each layer only depends on the layer below
- Server Components by default — minimal client JS
- Forms use RHF + Zod + Turnstile + rate limiting

## Getting help

- **Questions** — open a GitHub issue with the `question` label
- **Bugs** — open a bug report using the issue template
- **Features** — open a feature request using the issue template
- **Email** — hello@craftlyrobot.com

## Code of conduct

Be kind. Be constructive. Assume good intent. We're building something together.

# Craftly Priority 6 Pack — Production Readiness

The final pack. Wires up the backend (email, Slack, database), adds analytics and error monitoring, sets up CI/CD, dev tooling, and documentation. After this, the project is **production-ready** — you just need to fill in API keys and deploy.

## What's in this pack (35 files)

### Backend integration (6 files)
- `web/lib/email.ts` — Resend email sender + application/contact confirmation helpers
- `web/lib/slack.ts` — Slack webhook notifier + application/contact notification helpers
- `web/lib/db.ts` — Prisma client singleton + save application/contact methods
- `web/prisma/schema.prisma` — Database schema (Application, ContactMessage, NewsletterSubscriber)
- `web/app/api/apply/route.ts` — **OVERWRITES** Priority 4 — now saves to DB + sends email + notifies Slack
- `web/app/api/contact/route.ts` — **OVERWRITES** Priority 4 — same full pipeline

### Analytics & monitoring (5 files)
- `web/components/providers/analytics.tsx` — Plausible script loader
- `web/lib/analytics.ts` — Event tracking helper (trackEvent, pre-defined events)
- `web/sentry.client.config.ts` — Sentry browser config
- `web/sentry.server.config.ts` — Sentry server config
- `web/sentry.edge.config.ts` — Sentry edge config
- `web/next.config.ts` — **OVERWRITES** — adds CSP, Sentry wrapper, redirects

### CI/CD (3 workflows + 1 config)
- `.github/workflows/ci.yml` — lint, typecheck, test, build, security audit
- `.github/workflows/lighthouse.yml` — performance + SEO audit on PRs
- `.lighthouserc.json` — Lighthouse CI thresholds (a11y ≥ 95, SEO ≥ 95)

### Dev tooling (10 files)
- `.editorconfig` — consistent editor settings
- `.prettierrc` — Prettier config with Tailwind plugin
- `.prettierignore` — ignore patterns
- `.nvmrc` — Node/Bun version pin
- `.husky/pre-commit` — runs lint-staged on commit
- `.husky/commit-msg` — runs commitlint on commit message
- `commitlint.config.mjs` — Conventional Commits enforcement
- `web/eslint.config.mjs` — flat ESLint config with TypeScript, React hooks, a11y
- `.vscode/settings.json` — VSCode workspace settings
- `.vscode/extensions.json` — recommended VSCode extensions

### Updated configs (3 overwrites)
- `package.json` (root) — **OVERWRITES** — adds husky, lint-staged, commitlint, db scripts
- `web/package.json` — **OVERWRITES** — adds Prisma, Sentry, eslint plugins
- `web/.env.example` — **OVERWRITES** — adds all production env vars
- `.gitignore` — **OVERWRITES** — comprehensive ignore patterns

### GitHub templates (3 files)
- `.github/pull_request_template.md` — PR checklist
- `.github/ISSUE_TEMPLATE/bug_report.md` — bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md` — feature request template

### Documentation (8 files)
- `README.md` (root) — **OVERWRITES** — comprehensive project README
- `CONTRIBUTING.md` — contribution guide (branch strategy, commits, PR checklist)
- `docs/ARCHITECTURE.md` — full architecture overview
- `docs/adr/001-use-nextjs-app-router.md`
- `docs/adr/002-use-tailwind-v4.md`
- `docs/adr/003-use-shadcn-ui.md`
- `docs/adr/004-use-prisma-postgresql.md`
- `docs/adr/005-use-bun.md`

### Deployment & misc (3 files)
- `vercel.json` — Vercel deployment config (regions, headers, redirects)
- `web/scripts/generate-pwa-icons.sh` — PWA icon generation script
- `web/public/.well-known/security.txt` — responsible disclosure contact

## New dependencies

| Package | Purpose |
|---|---|
| `@prisma/client` + `prisma` | Database ORM |
| `@sentry/nextjs` | Error monitoring |
| `eslint-plugin-jsx-a11y` | Accessibility linting |
| `eslint-plugin-react-hooks` | React hooks rules |
| `husky` | Git hooks |
| `lint-staged` | Run linters on staged files |
| `@commitlint/cli` + `config-conventional` | Commit message enforcement |

Run `bun install` after copying — Bun installs all new deps.

## What you need to do after installing

### 1. Set up environment variables
```bash
cp web/.env.example web/.env.local
```
Fill in at minimum:
- `NEXT_PUBLIC_SITE_URL` — your site URL
- `DATABASE_URL` — from Neon/Supabase (for forms to save)
- `RESEND_API_KEY` — from Resend (for confirmation emails)
- `SLACK_WEBHOOK_URL` — from Slack (for team notifications)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — from Cloudflare (for bot protection)
- `SENTRY_DSN` — from Sentry (optional, for error monitoring)

**In development**, all of these are optional. The code gracefully degrades:
- No `DATABASE_URL` → logs to console instead of saving
- No `RESEND_API_KEY` → logs email instead of sending
- No `SLACK_WEBHOOK_URL` → logs notification instead of posting
- No Turnstile keys → shows a note, skips verification
- No `SENTRY_DSN` → Sentry doesn't initialize

### 2. Set up the database (when ready)
```bash
# Generate Prisma client
bun run db:generate

# Push schema to database (creates tables)
bun run db:push

# Or create a migration
bun run db:migrate --name init

# Open Prisma Studio to view data
bun run db:studio
```

### 3. Generate PWA icons
```bash
# Place your logo at web/public/logo.png (512x512 or larger)
# Then run:
chmod +x web/scripts/generate-pwa-icons.sh
bun run scripts/generate-pwa-icons.sh
```

### 4. Set up Git hooks
```bash
# Husky is installed via bun install, but you need to initialize it
bun run prepare
```

### 5. Deploy to Vercel
1. Push to GitHub
2. Import the repo in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

The `vercel.json` file configures regions and redirects. Vercel auto-detects Next.js.

### 6. Set up Cloudflare (optional but recommended)
1. Add your domain to Cloudflare
2. Change nameservers at your registrar
3. Add CNAME record pointing to Vercel
4. Enable "Full (strict)" SSL mode
5. Enable WAF and bot protection

## Site state after install — production-ready

The site is now:
- ✅ Feature-complete (26 routes)
- ✅ Backend-wired (forms save to DB + send email + notify Slack)
- ✅ Analytics-ready (Plausible)
- ✅ Error-monitored (Sentry)
- ✅ CI/CD-ready (GitHub Actions)
- ✅ Dev-tooled (ESLint, Prettier, Husky, commitlint)
- ✅ Documented (README, CONTRIBUTING, ARCHITECTURE, 5 ADRs)
- ✅ Deploy-ready (vercel.json, security.txt, PWA icons script)

**Remaining work:** fill in API keys, deploy, add real content.

## How to install

See `craftly-priority-6-instructions.md` (separate file) for agent-ready step-by-step instructions.

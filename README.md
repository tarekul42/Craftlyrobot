# Craftly Boot Pack

12 files that make `bun run dev` show a real page at `localhost:3000`.

## Where to put these files

### Step 1 — Unzip at your repo root

```bash
cd /path/to/your/Craftlyrobot   # the folder containing web/ and .git
unzip craftly-boot-pack.zip -d .
```

The zip structure mirrors your repo. Files merge into the right places automatically.

### Step 2 — Two files OVERWRITE existing ones (bug fixes)

These two files at the repo root fix bugs in your current setup:

| File | What it fixes |
|---|---|
| `tsconfig.json` | Path aliases pointed to `./apps/web/*` but your structure is `./web/`. Fixed to `./web/*`. |
| `package.json` | Workspaces field was `["apps/*", "packages/*"]` but your app is at `web/` not `apps/web/`. Fixed to `["web", "packages/*"]`. |

When you unzip, these will overwrite the existing files. That's intended.

### Step 3 — What gets added (14 new files)

```
Craftlyrobot/                          ← your repo root
├── tsconfig.json                      ← OVERWRITTEN (bug fix)
├── package.json                       ← OVERWRITTEN (bug fix)
└── web/
    ├── app/                           ← NEW directory
    │   ├── layout.tsx                 ← Root layout (fonts, theme, metadata)
    │   └── (marketing)/
    │       ├── layout.tsx             ← Marketing layout (PageShell wrapper)
    │       └── page.tsx               ← Homepage at /
    ├── components/
    │   ├── layout/                    ← NEW directory
    │   │   ├── container.tsx          ← Centered max-width wrapper
    │   │   ├── section.tsx            ← Vertical section with padding
    │   │   ├── main-nav.tsx           ← Logo + desktop nav
    │   │   ├── site-header.tsx        ← Sticky header with scroll effect
    │   │   ├── site-footer.tsx        ← Footer with 4 link columns
    │   │   ├── page-shell.tsx         ← SkipLink + Header + Main + Footer
    │   │   └── theme-toggle.tsx       ← Light/dark mode button
    │   └── providers/                 ← NEW directory
    │       └── theme-provider.tsx     ← next-themes wrapper
    ├── config/                        ← NEW directory
    │   ├── site.ts                    ← Site name, URL, description, socials
    │   └── navigation.ts              ← Nav items (header + footer + legal)
    ├── lib/
    │   └── fonts.ts                   ← NEW — DM Sans + Pacifico + JetBrains Mono
    └── types/                         ← NEW directory
        └── navigation.ts              ← NavItem TypeScript types
```

### Step 4 — Install and run

```bash
cd /path/to/your/Craftlyrobot

# Install dependencies (nothing new to install — all deps already in web/package.json)
bun install

# Start the dev server
bun run dev
```

Visit `http://localhost:3000`. You should see:
- Craftly logo (Pacifico font) in the header
- 5 nav items (What is Craftly, Products, Community, Contribute, About)
- Theme toggle (sun/moon icon)
- "Get Access" button
- Hero section with "From dream to reality, with one command"
- 3-card section showing the ecosystem entry points
- CTA band with dark background
- Footer with 4 link columns + social icons
- Mobile hamburger menu (resize to mobile width)

## What this proves

If the page loads correctly, every layer of the stack works:
- ✅ Fonts load (Pacifico for logo, DM Sans for body)
- ✅ Design tokens apply (warm-neutral palette from craftlyrobot.com)
- ✅ Primitives render (Button, Card, Eyebrow, SectionHeading, etc.)
- ✅ Layout chrome works (sticky header, footer, mobile nav)
- ✅ Theme toggle works (light/dark mode)
- ✅ Next.js App Router works (root layout → marketing layout → page)
- ✅ Path aliases resolve (`@/components/ui`, `@/lib/utils`, etc.)

## What's still missing (Priority 3 — next steps)

Nav links will 404 because the pages don't exist yet. That's expected. The next build priorities are:

1. **Section components** — `components/sections/hero/`, `cta-band/`, `faq/`, etc.
2. **Block components** — `components/blocks/animated-terminal.tsx`, `screenshot-showcase.tsx`
3. **Config data** — `config/products.ts`, `config/departments.ts`, `config/roles.ts`
4. **More pages** — `/products`, `/community`, `/contribute/apply`, `/about`, etc.
5. **MDX content** — `content/blog/` for blog posts

Follow the implementation plan (Part 42 — File-by-File Build Order) for the sequence.

## Troubleshooting

### "Module not found: Can't resolve '@/lib/fonts'"
Make sure `web/lib/fonts.ts` exists. It's in this pack. The `@/lib/*` alias points to `web/lib/*` per the fixed `tsconfig.json`.

### "Hydration mismatch" on theme toggle
This is normal on first load. The `ThemeToggle` component uses a `mounted` check to prevent this. If you still see it, make sure `suppressHydrationWarning` is on `<html>` in `app/layout.tsx` (it is, in this pack).

### "Tailwind classes not applying"
Make sure `web/postcss.config.mjs` uses `@tailwindcss/postcss` (not `tailwindcss` plugin). It should already be correct from the primitives pack.

### Nav links 404
Expected. The pages (`/products`, `/community`, etc.) don't exist yet. They'll be built in Priority 3.

### Dark mode doesn't work
1. Check that `next-themes` is installed: `bun add next-themes` in `web/`
2. Check that `ThemeProvider` wraps the app in `app/layout.tsx`
3. Check that `<html>` has `suppressHydrationWarning` (it does)
4. Check that `.dark` class appears on `<html>` when you click the toggle

### Fonts look wrong
Make sure the font CSS variables are applied. In `app/layout.tsx`, the `<html>` element should have `className={cn(dmSans.variable, pacifico.variable, jetBrainsMono.variable)}`. These variables are referenced in `styles/tokens.css` under `--font-sans`, `--font-logo`, `--font-mono`.

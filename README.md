# Craftly Primitives Pack

36 production-ready UI primitives for the Craftly website, built on Next.js 15 + Tailwind v4 + shadcn/ui patterns, adapted to Craftly's warm-neutral design tokens.

## Quick start

### If you already have a Next.js project

```bash
# 1. Copy these files into your project root
#    Merge the folders — don't replace existing ones
cp -r apps/web/components/ui  /path/to/your/craftly-website/apps/web/components/
cp -r apps/web/lib            /path/to/your/craftly-website/apps/web/
cp -r apps/web/styles         /path/to/your/craftly-website/apps/web/
cp -r apps/web/test           /path/to/your/craftly-website/apps/web/
cp apps/web/package.json      /path/to/your/craftly-website/apps/web/package.json
cp apps/web/tsconfig.json     /path/to/your/craftly-website/apps/web/tsconfig.json
cp apps/web/next.config.ts    /path/to/your/craftly-website/apps/web/next.config.ts
cp apps/web/postcss.config.mjs /path/to/your/craftly-website/apps/web/
cp apps/web/vitest.config.ts  /path/to/your/craftly-website/apps/web/
cp package.json               /path/to/your/craftly-website/
cp tsconfig.json              /path/to/your/craftly-website/

# 2. Install dependencies
cd /path/to/your/craftly-website
bun install

# 3. Run tests to verify everything works
cd apps/web
bun run test
```

### If you're starting from scratch

```bash
# 1. Create the project
mkdir craftly-website && cd craftly-website
git init

# 2. Unzip this pack into the project root
unzip craftly-primitives-pack.zip -d .

# 3. Install dependencies
bun install

# 4. Run tests
cd apps/web
bun run test

# 5. You still need to create the Next.js app structure.
#    This pack provides components, styles, and configs — but not the app/ routes.
#    Run `bun create next-app` in a temp dir and copy the app/ folder, OR
#    follow the implementation plan to build pages.
```

## What's in this pack

```
craftly-primitives-pack/
├── package.json                          ← Root package.json (Bun workspaces)
├── tsconfig.json                         ← Root TypeScript config
├── apps/
│   └── web/
│       ├── package.json                  ← Web app dependencies
│       ├── tsconfig.json                 ← Web app TypeScript config
│       ├── next.config.ts                ← Next.js config (security headers, images)
│       ├── postcss.config.mjs            ← PostCSS config for Tailwind v4
│       ├── vitest.config.ts              ← Vitest config (jsdom, path aliases)
│       ├── lib/
│       │   └── utils.ts                  ← cn() className combiner
│       ├── styles/
│       │   ├── tokens.css                ← All design tokens (colors, fonts, spacing)
│       │   └── globals.css               ← Tailwind imports + theme mapping + resets
│       ├── test/
│       │   └── setup.ts                  ← Vitest setup (jest-dom, polyfills)
│       └── components/
│           └── ui/
│               ├── index.ts              ← Barrel export (import from here)
│               ├── button/               ← 36 primitive folders, each with:
│               │   ├── button.tsx        ←   component
│               │   ├── button.test.tsx   ←   tests (Button only — others follow same pattern)
│               │   └── index.ts          ←   re-export
│               ├── card/
│               ├── input/
│               ├── textarea/
│               ├── label/
│               ├── badge/
│               ├── separator/
│               ├── skeleton/
│               ├── eyebrow/              ← Craftly-specific (the eyebrow label pattern)
│               ├── section-heading/      ← Craftly-specific (eyebrow + title + description)
│               ├── prose/                ← Long-form content wrapper
│               ├── stat/                 ← Number + label (for PeopleBar)
│               ├── skip-link/            ← Accessibility skip-to-content
│               ├── accordion/            ← Radix Accordion
│               ├── tabs/                 ← Radix Tabs
│               ├── dialog/               ← Radix Dialog (modal)
│               ├── sheet/                ← Radix Dialog (slide-in panel)
│               ├── alert-dialog/         ← Radix AlertDialog (confirmations)
│               ├── popover/              ← Radix Popover
│               ├── tooltip/              ← Radix Tooltip
│               ├── dropdown-menu/        ← Radix DropdownMenu
│               ├── navigation-menu/      ← Radix NavigationMenu (header dropdowns)
│               ├── select/               ← Radix Select
│               ├── checkbox/             ← Radix Checkbox
│               ├── radio-group/          ← Radix RadioGroup
│               ├── switch/               ← Radix Switch
│               ├── progress/             ← Radix Progress (for PeopleBar counter)
│               ├── avatar/               ← Radix Avatar
│               ├── slider/               ← Radix Slider
│               ├── form-field/           ← Label + Input + error wrapper
│               ├── upload-button/        ← File upload with preview
│               ├── otp-input/            ← One-time password input (for future auth)
│               ├── breadcrumbs/          ← Navigation trail
│               ├── pagination/           ← Page navigation
│               ├── mobile-nav/           ← Slide-in mobile menu (uses Sheet)
│               └── toast/                ← Sonner wrapper (toast notifications)
```

## The 36 primitives

### Form primitives (10)
| Primitive | Use | Based on |
|---|---|---|
| `Button` | Primary interactive element | cva + Radix Slot |
| `Input` | Text input | Custom |
| `Textarea` | Multiline input | Custom |
| `Label` | Form label | Radix Label |
| `Badge` | Small status indicator | cva |
| `FormField` | Label + Input + error wrapper | Custom |
| `UploadButton` | File upload with preview | Custom |
| `OTPInput` | One-time password input | input-otp |
| `Slider` | Range slider | Radix Slider |
| `Select` | Dropdown select | Radix Select |

### Display primitives (8)
| Primitive | Use | Based on |
|---|---|---|
| `Card` + sub-components | Content container | Custom |
| `Separator` | Horizontal/vertical divider | Radix Separator |
| `Skeleton` | Loading placeholder | Custom |
| `Progress` | Progress bar | Radix Progress |
| `Stat` | Number + label display | Custom |
| `Avatar` + sub-components | User avatar with fallback | Radix Avatar |
| `Eyebrow` | Uppercase section label (Craftly signature) | Custom |
| `SectionHeading` | Eyebrow + title + description | Custom |

### Navigation primitives (6)
| Primitive | Use | Based on |
|---|---|---|
| `NavigationMenu` + sub-components | Header dropdown nav | Radix NavigationMenu |
| `DropdownMenu` + sub-components | Context menu | Radix DropdownMenu |
| `Breadcrumbs` | Navigation trail | Custom |
| `Pagination` | Page navigation | Custom |
| `MobileNav` | Slide-in mobile menu | Sheet + Custom |
| `SkipLink` | Accessibility skip-to-content | Custom |

### Overlay primitives (6)
| Primitive | Use | Based on |
|---|---|---|
| `Dialog` + sub-components | Modal dialog | Radix Dialog |
| `Sheet` + sub-components | Slide-in panel | Radix Dialog |
| `AlertDialog` + sub-components | Confirmation dialog | Radix AlertDialog |
| `Popover` + sub-components | Floating content | Radix Popover |
| `Tooltip` + sub-components | Hover info | Radix Tooltip |
| `Toaster` + `toast` | Toast notifications | Sonner |

### Typography primitives (1)
| Primitive | Use | Based on |
|---|---|---|
| `Prose` | Styled wrapper for MDX/blog content | Custom |

### Interactive primitives (4)
| Primitive | Use | Based on |
|---|---|---|
| `Accordion` + sub-components | Collapsible sections | Radix Accordion |
| `Tabs` + sub-components | Tab navigation | Radix Tabs |
| `Checkbox` | Checkbox input | Radix Checkbox |
| `RadioGroup` + sub-components | Radio button group | Radix RadioGroup |
| `Switch` | Toggle switch | Radix Switch |

## How to import

```tsx
// From the barrel (preferred)
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Input,
  Label,
  FormField,
  Eyebrow,
  SectionHeading,
} from "@/components/ui";

// Or from individual folders (tree-shakeable)
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

## Usage examples

### Button
```tsx
<Button>Get early free access</Button>
<Button variant="secondary">See the foundation</Button>
<Button variant="outline" size="lg">Learn more</Button>
<Button isLoading>Submitting...</Button>
<Button asChild>
  <Link href="/apply">Apply now</Link>
</Button>
<Button leftIcon={<DownloadIcon />}>Download</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Hello</CardTitle>
    <CardDescription>The onboarding robot</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Learning language nuances from real conversations.</p>
  </CardContent>
  <CardFooter>
    <Button>Learn more</Button>
  </CardFooter>
</Card>
```

### FormField
```tsx
<FormField label="Email" htmlFor="email" required error={errors.email?.message}>
  <Input id="email" type="email" placeholder="you@example.com" />
</FormField>
```

### Eyebrow + SectionHeading (Craftly signature)
```tsx
<Eyebrow>Decentralized intelligence</Eyebrow>
<h2>Built to move beyond data center limits</h2>

// Or use SectionHeading for the full pattern:
<SectionHeading
  eyebrow="Decentralized intelligence"
  title="Built to move beyond data center limits"
  description="Runs on our proprietary Decentralized Node Architecture."
/>
```

### Dialog
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Toast
```tsx
// In app/layout.tsx (add once):
import { Toaster } from "@/components/ui";
<body>
  {children}
  <Toaster />
</body>

// In any client component:
import { toast } from "@/components/ui";
toast.success("Application submitted!");
toast.error("Something went wrong.");
```

## Design tokens

All colors, fonts, spacing, etc. are defined in `styles/tokens.css` as CSS variables. Components reference them via Tailwind classes (`bg-background`, `text-foreground`, `border-border`).

**Never use raw hex colors in components.** Always use semantic tokens. The tokens handle dark mode automatically — components don't need `dark:` prefixes.

### Key tokens
| Token | Tailwind class | Use |
|---|---|---|
| `--color-background` | `bg-background` | Page background |
| `--color-foreground` | `text-foreground` | Primary text |
| `--color-muted` | `bg-muted` | Muted backgrounds |
| `--color-muted-foreground` | `text-muted-foreground` | Secondary text |
| `--color-primary` | `bg-primary` | Primary buttons, emphasis |
| `--color-primary-foreground` | `text-primary-foreground` | Text on primary |
| `--color-secondary` | `bg-secondary` | Secondary buttons |
| `--color-border` | `border-border` | All borders |
| `--color-input` | `border-input` | Form input borders |
| `--color-ring` | `ring-ring` | Focus rings |
| `--color-destructive` | `bg-destructive` | Destructive actions |
| `--color-accent` | `bg-accent` | Warm accent (sparing use) |

## Bun commands

```bash
bun install          # Install all dependencies
bun run dev          # Start dev server (with Turbopack)
bun run build        # Production build
bun run start        # Start production server
bun run lint         # ESLint
bun run typecheck    # TypeScript check
bun run test         # Run Vitest tests
bun run test:watch   # Watch mode
```

## What you still need to build

This pack provides the **primitives** (Layer 2 of the design system). You still need:

1. **Layout components** (`components/layout/`) — SiteHeader, SiteFooter, PageShell, Container, Section
2. **Section components** (`components/sections/`) — Hero, FeatureGrid, CTABand, FAQ, etc.
3. **Block components** (`components/blocks/`) — AnimatedTerminal, ScreenshotShowcase, SignupForm, PeopleBar
4. **Pages** (`app/`) — All 30 routes from the implementation plan
5. **Config files** (`config/`) — site.ts, navigation.ts, products.ts, departments.ts
6. **Content** (`content/`) — MDX blog posts and legal pages
7. **Providers** (`components/providers/`) — ThemeProvider, AnalyticsProvider
8. **Fonts** (`lib/fonts.ts`) — next/font setup for DM Sans + Pacifico + JetBrains Mono

Follow the implementation plan (Part 42 — File-by-File Build Order) for the exact sequence.

## Testing

The Button component has a full test suite. Other primitives follow the same pattern. To add tests for another primitive, copy `button.test.tsx` and adapt.

```bash
bun run test                    # Run all tests once
bun run test:watch              # Watch mode
bun run test -- --coverage      # With coverage report
```

## Dependencies

This pack installs these dependencies (already in `apps/web/package.json`):

**Runtime:**
- next, react, react-dom
- All `@radix-ui/react-*` packages (accessibility primitives)
- class-variance-authority, clsx, tailwind-merge (className utilities)
- lucide-react (icons)
- motion (Framer Motion)
- react-hook-form, @hookform/resolvers, zod (forms + validation)
- next-themes (dark mode)
- sonner (toasts)
- input-otp (OTP input)
- nuqs (URL state)
- zustand (client state)

**Dev:**
- tailwindcss v4 + @tailwindcss/postcss
- vitest + @testing-library/react + jsdom
- typescript 5
- eslint-config-next

## Troubleshooting

### "Cannot find module '@/lib/utils'"
Make sure your `tsconfig.json` has the path aliases configured (see `tsconfig.json` in this pack). The `@/*` alias must point to `./apps/web/*`.

### "Tailwind classes not working"
Make sure `postcss.config.mjs` uses `@tailwindcss/postcss` (not the v3 `tailwindcss` plugin). Tailwind v4 uses a different PostCSS plugin.

### "Tests fail with 'matchMedia is not defined'"
The `test/setup.ts` file polyfills `matchMedia`, `IntersectionObserver`, and `ResizeObserver` for jsdom. Make sure your `vitest.config.ts` points to it: `setupFiles: ["./test/setup.ts"]`.

### "Dark mode doesn't work"
Install `next-themes` and wrap your app in `ThemeProvider`:
```tsx
import { ThemeProvider } from "next-themes";
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```
The `.dark` class on `<html>` triggers the dark token values in `tokens.css`.

### "Fonts not loading"
This pack doesn't include the font setup. Create `lib/fonts.ts`:
```tsx
import { DM_Sans, Pacifico, JetBrains_Mono } from "next/font/google";
export const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
export const pacifico = Pacifico({ weight: "400", subsets: ["latin"], variable: "--font-pacifico", display: "swap" });
export const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
```
And add the font variables to your `<html>` className in `app/layout.tsx`.

---

Built for the Craftly unified public website. Pair with the implementation plan and skills bundle for the complete build system.

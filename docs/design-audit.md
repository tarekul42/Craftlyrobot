# Design Audit & Rationale

## Newbie-Perspective Audit

I went through the entire site as if I'd never seen it before. Here's what I found.

### What works well

- **Clear value prop** on the hero: "Type it. Build it. Ship it." is immediately understandable.
- **Terminal animation** gives a concrete demo of what the product does.
- **Three entry point cards** ("We build products", "We are a community", "We welcome contributors") make the ecosystem model clear.
- **FAQ section** answers the obvious questions.
- **Products page** explains the catalog well.

### What needed fixing

#### 1. Color palette was warm but muddy

The old cream background (`#f6f5f2`) made the site feel dated. It worked for a "craft" brand but didn't signal "we build software." The new cool-neutral palette (`#FFFFFF` background, `#F4F5F7` muted, `#E8EAED` borders) feels modern, clean, and professional.

#### 2. Hero was too tall for too little

The old hero had only ~60% above the fold. The new version uses `min-h-hero` (full viewport) so the whole hero is visible on all screen sizes. The grid background adds subtle texture without distracting.

#### 3. Headlines were marketing fluff

"From dream to reality, with one command" is a nice tagline but says nothing about what the product *does*. "Type it. Build it. Ship it." is concrete: you type a prompt, you build an app, you ship it. Three verbs, three steps, one line.

#### 4. Section rhythm was inconsistent

Some sections had `py-20 lg:py-32`, others had `py-12`. The new `--section-padding-y: clamp(5rem, 10vw, 8rem)` ensures every section has the same breathing room.

#### 5. The scrollbar was default browser

A custom thin scrollbar (`8px`, `--color-border` thumb) makes the site feel more polished with minimal effort.

#### 6. The nav was left-aligned with CTA

Centering the nav and making the header "glass" (blurred backdrop) on scroll makes it feel more modern and gives the hero more visual prominence.

#### 7. Navigation order was confusing

Old order: What is Craftly, Products, Community, Contribute, About
New order: Products, Community, Updates, Blog, About
- Products first (what you build)
- Community second (who you are)
- Updates third (what's happening now)
- Blog fourth (long-form content)
- About last (the boring but necessary stuff)

"What is Craftly" moved to the About section — it's an explainer page, not a nav-level priority.

#### 8. Apply form was intimidating

The old form was a single page with 10+ fields, no progress indicator. Breaking it into 4 steps with a progress bar reduces anxiety and improves completion rates.

#### 9. No alternative to the form

The "Chat with Hello" path gives a low-friction alternative for people who aren't ready to fill out a structured form. The bot conversation collects the same info in a more casual way.

#### 10. Logo inconsistency

The old "Craftly" text didn't match the brand name used elsewhere. Changed to "Craftlyrobot" (one word) to match the domain and product name.

## Design Rationale

### Why cool-neutral instead of warm-neutral

Warm neutrals (`#f6f5f2`, `#dedbd6`) signal "handmade" and "craft" — appropriate for Etsy or a bakery. Cool neutrals signal "technology" and "precision" — appropriate for a software company building developer tools.

The accent color shifted from warm-orange (`#c97a3a`) to cool-blue (`#5c7cfa`) for the same reason. Blue signals trust, technology, and enterprise (think: IBM, Intel, Meta, Twitter).

### Why pure white background

`#FFFFFF` vs `#f6f5f2`:
- Higher contrast for text (better readability)
- More modern (every major tech site uses white)
- Easier to design against (no color cast)

The muted sections use `#F4F5F7` — barely perceptible but enough to create hierarchy without the cream tint.

### Why glass header

The old header had a solid background on scroll. The new glass effect (`backdrop-filter: blur(12px)`) lets the hero show through while keeping nav readable. This is the standard pattern used by Stripe, Linear, Vercel, and every modern SaaS.

### Why the grid background

A subtle grid (`opacity: 0.03`) adds visual interest to the hero without distracting. It echoes "developer tools" and "engineering" — like graph paper or a code editor background.

### Why 4-step form

Multi-step forms consistently outperform single-page forms in conversion rate studies. Each step is short (3-4 fields), has a clear title, and shows progress. The back button allows correction without losing data.

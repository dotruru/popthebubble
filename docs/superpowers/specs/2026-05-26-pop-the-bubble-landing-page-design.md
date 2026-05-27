# Pop the Bubble — Landing Page Design Spec

**Date:** 2026-05-26
**Status:** Approved
**Author:** Aruzhan + Claude

---

## 1. Overview

A single-page marketing site for the Pop the Bubble hackathon (Hackhouse London, Issue 01). The goal is conversion (Apply CTA) and atmosphere — it should feel like a dreamy sky-and-meadow world with sharp editorial copy, not a generic hackathon page. This is a v1 landing page; additional pages will be added in subsequent cycles.

**Event facts (canonical):**
- Name: Pop the Bubble
- Producer: Hackhouse London
- Format: 36-hour in-person hackathon
- Edition: Issue 01 · Spring 2026
- Dates: Friday 5 – Sunday 7 June 2026
- Location: London
- First prize: £10,000
- Cohort: 80 builders, ~12% acceptance
- Positioning: Judged on real-world impact, not slides
- Primary CTA: Apply
- Secondary CTA: Sponsor

---

## 2. Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | Next.js (App Router) | TypeScript |
| Styling | Tailwind CSS | Layout/spacing/breakpoints only |
| Glass system | `globals.css` custom properties | Full visual system as CSS |
| Animation | motion (Framer Motion v11) | Hero breathe, section reveals, hover |
| Primitives | Radix UI | Accordion (FAQ), NavigationMenu |
| Scaffolding | shadcn/ui CLI | Accessible base only — not for final look |
| Components | reactbits | Animated marquee, bubble effects |
| Fonts | Imperial Script (local TTF) + Geist (next/font/google) | |

---

## 3. File Structure

```
popthebubble/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── components/
│   │   ├── primitives/
│   │   │   ├── GlassSurface.tsx
│   │   │   ├── GlassButton.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── GlassPill.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MarqueeStrip.tsx
│   │   │   ├── TracksSection.tsx
│   │   │   ├── JudgingSection.tsx
│   │   │   ├── CohortSection.tsx
│   │   │   ├── TimelineSection.tsx
│   │   │   ├── SponsorsSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── FooterLandscape.tsx
│   │   └── layout/
│   │       └── SiteHeader.tsx
│   └── lib/
│       └── content.ts
├── public/
│   ├── fonts/ImperialScript-Regular.ttf
│   ├── hero-tall.mp4
│   ├── hero-wide.mp4
│   ├── hero-tall-poster.jpg
│   ├── hero-wide-poster.jpg
│   └── team/
│       ├── aruzhan.jpeg
│       ├── lyndon.png
│       ├── lois.png
│       └── alramina.png
├── tailwind.config.ts
└── package.json
```

---

## 4. CSS Architecture (`globals.css`)

All design tokens and the glass material system live here. Tailwind never overrides these.

### 4.1 Font face

```css
@font-face {
  font-family: "Imperial Script";
  src: url("/fonts/ImperialScript-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 4.2 Design tokens

```css
:root {
  /* fonts */
  --font-hero: "Imperial Script", cursive;
  --font-sans: "Geist", Inter, system-ui, sans-serif;
  --font-mono: "Geist Mono", "Space Mono", ui-monospace, monospace;

  /* palette */
  --sky-blue: #8DCCF3;
  --veranda-blue: #6BB1AD;
  --grass-green: #8CCB63;
  --melon-pink: #E5A9A9;
  --cupid-pink: #E6748E;
  --lychee: #EDECDB;
  --cream: #F8F3E8;
  --ink: #202020;
  --vermillion: #FF4A32;

  /* sky gradient stops */
  --sky-top: #80c6f1;
  --sky-mid: #9ed4f6;
  --sky-bottom: #dff1fb;

  /* glass tokens */
  --glass-clear: rgb(255 255 255 / 0.16);
  --glass-milk: rgb(248 243 232 / 0.38);
  --glass-blue: rgb(107 177 173 / 0.22);
  --glass-pink: rgb(229 169 169 / 0.22);
  --glass-border-light: rgb(255 255 255 / 0.55);
  --glass-border-soft: rgb(255 255 255 / 0.28);
  --glass-border-cool: rgb(141 204 243 / 0.38);
  --glass-shadow: 0 24px 80px rgb(32 32 32 / 0.18);
  --glass-shadow-soft: 0 14px 44px rgb(32 32 32 / 0.12);
  --glass-glow-blue: 0 0 48px rgb(141 204 243 / 0.42);
  --glass-glow-pink: 0 0 48px rgb(230 116 142 / 0.32);

  /* motion */
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-liquid: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 180ms;
  --duration-medium: 420ms;
  --duration-slow: 1200ms;
}
```

### 4.3 Glass material classes

`.glass` — base surface with `backdrop-filter: blur(24px) saturate(1.35)`, gradient fill, border, box-shadow, and `::before` highlight + `::after` inner edge layers exactly as specced in the visual system.

Variants: `.glass--clear`, `.glass--milk`, `.glass--blue`, `.glass--pink`.

### 4.4 Typography classes

- `.hero-wordmark` — Imperial Script, `clamp(5.5rem, 15vw, 15rem)`, `line-height: 0.78`
- `.section-title` — Geist Sans, `clamp(2.4rem, 6vw, 5.5rem)`, `font-weight: 760`, `letter-spacing: -0.055em`
- `.body-copy` — Geist Sans, `clamp(1rem, 1.4vw, 1.18rem)`, `font-weight: 430`
- `.meta` — Geist Mono, `0.78rem`, uppercase, `letter-spacing: 0.08em`

### 4.5 Motion: reduced-motion reset

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 5. Component Specs

### 5.1 GlassSurface

Base primitive. Applies `.glass` + optional variant. All other glass components compose this.

```tsx
interface GlassSurfaceProps {
  variant?: "clear" | "milk" | "blue" | "pink"
  className?: string
  children: React.ReactNode
}
```

### 5.2 GlassButton

Pill shape (border-radius 999px). Min-height 3.25rem. Two variants: `primary` (cream-to-veranda gradient) and `secondary` (more transparent). Hover: `translateY(-2px)` + blue glow. Active: scale down 0.985. Renders as `<a>` when `href` is provided, `<button>` otherwise.

```tsx
interface GlassButtonProps {
  variant?: "primary" | "secondary"
  href?: string
  children: React.ReactNode
}
```

### 5.3 GlassCard

GlassSurface + padding (`2rem`), border-radius `1.25rem`. Hover lift `translateY(-4px)` via `--ease-soft`. Used for track cards, judging cards, sponsor placeholders.

### 5.4 GlassPill

Small inline chip. Border-radius 999px, padding `0.25rem 0.75rem`. Geist Mono, `0.72rem`. Used for track indices, issue label, tech chips.

---

## 6. Layout

### SiteHeader

Sticky. `position: fixed`, full width, `z-index: 50`. Transparent when `scrollY === 0`, transitions to `.glass.glass--clear` on scroll. Nav links: Tracks / Judging / Timeline / FAQ. Right side: `GlassButton` → Apply.

Logo: text mark "Hackhouse London" (placeholder until brand logo supplied).

### Page zones

```
<SiteHeader />                    ← fixed overlay
<HeroSection />                   ← full viewport, video background
<main className="page-after-hero">
  <MarqueeStrip />
  <TracksSection />
  <JudgingSection />
  <CohortSection />
  <TimelineSection />
  <SponsorsSection />
  <FAQSection />
  <FooterLandscape />
</main>
```

`page-after-hero` carries the sky gradient (`--sky-top → --sky-mid → --sky-bottom`) and the soft hero-to-sky transition via `::before` blur overlay.

---

## 7. Section Specs

### 7.1 HeroSection

**Background:** `<video>` element. Two sources: `hero-tall.mp4` (portrait, used below 768px) and `hero-wide.mp4` (landscape, used above). Poster images for each. `autoPlay muted loop playsInline`. Object-fit cover. Breathing animation on the video wrapper via motion: `scale [0.985→1.02→0.985]`, `y [0→-6→0]`, `rotate [0→0.75→0]`, 12s infinite ease-in-out.

**Wordmark:** Three stacked `<span>` elements inside `<h1 aria-label="Pop The Bubble">`:
- `__stroke` — white outline, drop-shadow
- `__fill` — pastel gradient (`#7ee0df → #9bc9ff → #c88fe7 → #f19ab5 → #f6d5a4 → #b9e89a`), slow 12s drift animation
- `__shine` — white vertical gradient, `mix-blend-mode: screen`, 8s breathe animation

White halo radial gradient behind the title wrap for readability.

**Copy:**
```
Pop The Bubble
80 builders. £10,000. Judged on real-world impact.
[Apply]  [Sponsor]
```

### 7.2 MarqueeStrip

reactbits Marquee. Geist Mono, uppercase, `0.78rem`. Background: thin glass strip (`--glass-milk`). Content (repeated):
```
5–7 June 2026 ✦ Pop the bubble ✦ 36-hour hackathon ✦ London ✦ £10,000 first prize ✦ 80 builders ✦ Apply now ✦ Hackhouse London ✦ Issue 01
```

### 7.3 TracksSection

Section title: "What are you building?"

3-column glass card grid (→ 1 column on mobile). Each card:

| Track | Index | Title | Body | Chip |
|-------|-------|-------|------|------|
| Outbuild | 01 | "Outbuild." | "Find a slow, bloated product. Ship the sharper version. Steal their users before Sunday." | Judged on users switched |
| Validate | 02 | "Validate." | "Pick a market. Find 10 customers. Get a letter of intent or a payment before demo day." | Judged on evidence of demand |
| Effect | 03 | "Effect." | "Earn real money solving a real problem. Economic exchange is the proof. Not the pitch." | Judged on economic exchange |

### 7.4 JudgingSection

Section title: "Judged on reality."

Sub-heading: "No slide decks. No judges watching demos and guessing. Every project is scored on what actually happened during the 36 hours."

Left column (wider): heading + paragraph.
Right column: 3 glass criteria cards stacked vertically.

| Criterion | Question |
|-----------|----------|
| Economic exchange | Did anyone pay? |
| Rejections | Proof you asked. |
| Real-world impact | Is something measurably different on Monday? |

Below: "The Panel" — horizontal row of placeholder judge cards. Each: square glass card, grey placeholder avatar (`aspect-ratio: 1`, `background: var(--glass-milk)`), name "Judge Name", title "Title, Company". 4 placeholder slots.

### 7.5 CohortSection

Section title: "The room."

Stat pills row (GlassPill): `80 builders` · `~12% acceptance` · `36 hours` · `£10,000 prize`

Body copy: "Sixty percent are already shipping — they have users, maybe revenue, and want to compress months of validation into a weekend. The other forty are FAANG and scale-up alumni who want to build something real. The bar for entry is evidence, not credentials."

Team row: 4 glass cards with actual photos from `/public/team/`. Name + role beneath each.
- Aruzhan — Lead Organiser
- Lyndon Leong — Programme & Community
- Lois Zhao — Operations & Partners
- Alramina Myrzabekova — Strategy & Partnerships

### 7.6 TimelineSection

Section title: "How it works."

Horizontal timeline (→ vertical on mobile). 4 floating glass nodes connected by a thin line.

| Step | Label | Detail |
|------|-------|--------|
| 01 | Apply | Rolling applications. Short form, no essay. |
| 02 | Confirmed | Decisions within 5 days. |
| 03 | Build | 5–7 June 2026, London. 36 hours. |
| 04 | Demo Day | Sunday afternoon. Proof artefacts on screen. |

### 7.7 SponsorsSection

Section title: "Partners."

Sub-heading: "Founding partners get a 5-minute kickoff slot, a seat at the closed dinner with the top 3 teams, and first look at every build 24 hours before demo day."

Glass pill grid: 6 placeholder logo slots. Each: glass card with dashed border, centred text "Logo", subtle label underneath ("Founding Partner" or "Prize Partner").

CTA below: secondary glass button → "Sponsor this event" → `mailto:contact@hackhouse.uk`

### 7.8 FAQSection

Section title: "Questions."

shadcn Accordion restyled with glass surface. 8 items:

1. **Who can apply?** — Anyone building something real. We don't care about credentials — we care about what you've already shipped or are committed to shipping.
2. **Where is it?** — London. Venue details confirmed to accepted builders.
3. **Is it free to attend?** — Yes. Food, space, and the build environment are covered.
4. **How are projects judged?** — On evidence. Economic exchange, proof of customer conversations, and measurable real-world impact. No slide decks.
5. **What's the prize?** — £10,000 first prize. Additional credits and prizes from our partners.
6. **Can I apply solo?** — Yes. Teams of up to 4 welcome.
7. **What's the Effect track?** — Build something that earns real money during the 36 hours. Monetisation is the proof. Arrive with a target customer in mind.
8. **When do I hear back?** — Within 5 days of applying.

### 7.9 FooterLandscape

Full-width section with green ground gradient returning via `::before` (green fade up from bottom). Content centred vertically near bottom.

Final CTA: large section title "Ready to build?" + `GlassButton` primary → Apply + secondary → Sponsor.

Below: thin bar with "Hackhouse London · Issue 01 · 2026" (Geist Mono, `--ink`, small). Placeholder for footer nav links.

---

## 8. Implementation Order

Follows visual system spec exactly:

```
01. Scaffold Next.js project + install deps
02. Set fonts and global CSS tokens (globals.css)
03. Build GlassSurface + GlassButton primitives
04. Build SiteHeader (transparent → glass on scroll)
05. Build static HeroSection with live CSS wordmark
06. Add hero video background + breathe animation
07. Add page-after-hero sky gradient zone
08. Build GlassCard + GlassPill primitives
09. Build MarqueeStrip
10. Build TracksSection
11. Build JudgingSection (with placeholder judge cards)
12. Build CohortSection (with real team photos)
13. Build TimelineSection
14. Build SponsorsSection (with placeholder logo slots)
15. Build FAQSection (glass accordion)
16. Build FooterLandscape
17. Wire SiteHeader scroll behaviour
18. Mobile pass (all breakpoints)
19. Performance pass (video fallback, lazy load, reduced-motion)
```

---

## 9. Placeholder Strategy

| Slot | Placeholder treatment |
|------|-----------------------|
| Sponsor logos | Glass card with dashed border + "Logo" centred text |
| Judge photos | Square glass card, grey `var(--glass-milk)` fill, "Judge Name / Title" |
| Brand/event logo in header | Text: "Hackhouse London" |
| Footer logo | Text: "Hackhouse London · Issue 01" |

All placeholders use the same glass card styling so swapping in real assets requires only replacing the `src` or inner content.

---

## 10. Accessibility & Performance

- Hero `<h1>` has `aria-label="Pop The Bubble"` (script wordmark spans are `aria-hidden`)
- Semantic heading hierarchy: h1 hero → h2 section titles → h3 card titles
- `prefers-reduced-motion` reset in globals.css kills all animations safely
- Hero video: `autoPlay muted loop playsInline` + poster images (no audio, no hijack)
- `backdrop-filter` used only on important surfaces (header, cards) — not hundreds of nodes
- Images: Next.js `<Image>` for team photos (auto AVIF/WebP + lazy load)
- No scroll hijacking
- Glass card text uses `--ink` + heavier weights — not thin gray on translucent surfaces

---

## 11. Out of Scope (v1)

- Apply form page (future)
- Sponsor info page (future)
- Custom SVG wordmark (Phase 2 per visual system)
- Cloud / bubble overlay layer (additive, after v1 ships)
- Footer ground WebP image (green gradient CSS used in v1)

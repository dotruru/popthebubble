# Pop the Bubble Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Pop the Bubble hackathon landing page as a Next.js (App Router) site with a liquid glass design system, video hero, and 10 content sections from scratch inside `/Users/arukanussipzhan/Desktop/popthebubble`.

**Architecture:** CSS-first glass system via `src/styles/globals.css` custom properties; Tailwind handles layout/spacing/breakpoints only; React components are thin wrappers around CSS utility classes; all copy lives in `src/lib/content.ts`; Motion drives hero breathe animation, header scroll transition, and section reveals.

**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS v4, motion (Framer Motion v11), @radix-ui/react-accordion, @radix-ui/react-navigation-menu, React Testing Library + Jest

**Spec:** `docs/superpowers/specs/2026-05-26-pop-the-bubble-landing-page-design.md`

---

## File Map

| File | Responsibility |
|------|---------------|
| `src/styles/globals.css` | ALL design tokens, glass material classes, typography classes, motion vars, @font-face |
| `src/lib/content.ts` | All copy: tracks, FAQ, timeline, judging criteria, marquee text, team |
| `src/components/primitives/GlassSurface.tsx` | Base glass primitive — backdrop blur + border + highlight layers |
| `src/components/primitives/GlassButton.tsx` | Pill CTA button, primary/secondary variants |
| `src/components/primitives/GlassCard.tsx` | Padded glass card with hover lift |
| `src/components/primitives/GlassPill.tsx` | Small inline chip (mono font, small) |
| `src/components/layout/SiteHeader.tsx` | Sticky nav — transparent → glass on scroll |
| `src/components/sections/HeroSection.tsx` | Full-viewport video hero + wordmark + CTAs |
| `src/components/sections/MarqueeStrip.tsx` | CSS-animated marquee strip |
| `src/components/sections/TracksSection.tsx` | 3 track glass cards |
| `src/components/sections/JudgingSection.tsx` | Criteria cards + placeholder judge row |
| `src/components/sections/CohortSection.tsx` | Stats + team photos |
| `src/components/sections/TimelineSection.tsx` | Horizontal glass nodes |
| `src/components/sections/SponsorsSection.tsx` | Placeholder logo grid |
| `src/components/sections/FAQSection.tsx` | Radix accordion with glass styling |
| `src/components/sections/FooterLandscape.tsx` | Green ground gradient + final CTA |
| `src/app/layout.tsx` | Font loading (Geist via next/font, Imperial Script via @font-face), metadata |
| `src/app/page.tsx` | Composes all sections + sky zone wrapper |
| `tailwind.config.ts` | Content paths only — no theme overrides |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json` (all via create-next-app)
- Create: `src/styles/globals.css` (empty placeholder, filled in Task 3)

- [ ] **Step 1: Rename the font file to remove the space**

```bash
cd /Users/arukanussipzhan/Desktop/popthebubble
mv "public/fonts/ImperialScript-Regular 2.ttf" public/fonts/ImperialScript-Regular.ttf
```

- [ ] **Step 2: Scaffold Next.js in the existing directory**

```bash
cd /Users/arukanussipzhan/Desktop/popthebubble
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --yes
```

When prompted about overwriting `public/` — say **No** (keep existing assets). If the CLI overwrites non-conflicting files only, that is fine.

Expected output ends with: `Success! Created app at ...`

- [ ] **Step 3: Install runtime dependencies**

```bash
cd /Users/arukanussipzhan/Desktop/popthebubble
npm install motion @radix-ui/react-accordion @radix-ui/react-navigation-menu
```

- [ ] **Step 4: Install dev dependencies for testing**

```bash
npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @types/jest
```

- [ ] **Step 5: Create Jest config**

Create `jest.config.ts`:

```typescript
import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({ dir: './' })

const config: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

export default createJestConfig(config)
```

Create `jest.setup.ts`:

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 6: Verify the project compiles**

```bash
npx tsc --noEmit
```

Expected: no errors. (The fresh scaffold should be clean.)

- [ ] **Step 7: Verify the dev server starts**

```bash
npm run dev &
sleep 4
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000
kill %1
```

Expected: `200`

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with testing setup"
```

---

## Task 2: Content Data

**Files:**
- Create: `src/lib/content.ts`

- [ ] **Step 1: Create `src/lib/content.ts`**

```typescript
export const EVENT = {
  name: 'Pop the Bubble',
  producer: 'Hackhouse London',
  edition: 'Issue 01 · Spring 2026',
  dates: '5–7 June 2026',
  datesShort: '5–7 June',
  location: 'London',
  prize: '£10,000',
  cohortSize: 80,
  acceptance: '~12%',
  duration: '36 hours',
  applyHref: '/apply',
  sponsorHref: 'mailto:contact@hackhouse.uk',
} as const

export const MARQUEE_TEXT =
  '5–7 June 2026 ✦ Pop the Bubble ✦ 36-hour hackathon ✦ London ✦ £10,000 first prize ✦ 80 builders ✦ Apply now ✦ Hackhouse London ✦ Issue 01'

export const TRACKS = [
  {
    index: '01',
    title: 'Outbuild.',
    body: 'Find a slow, bloated product. Ship the sharper version. Steal their users before Sunday.',
    chip: 'Judged on users switched',
  },
  {
    index: '02',
    title: 'Validate.',
    body: 'Pick a market. Find 10 customers. Get a letter of intent or a payment before demo day.',
    chip: 'Judged on evidence of demand',
  },
  {
    index: '03',
    title: 'Effect.',
    body: 'Earn real money solving a real problem. Economic exchange is the proof. Not the pitch.',
    chip: 'Judged on economic exchange',
  },
] as const

export const JUDGING_CRITERIA = [
  {
    title: 'Economic exchange',
    question: 'Did anyone pay?',
  },
  {
    title: 'Rejections',
    question: 'Proof you asked.',
  },
  {
    title: 'Real-world impact',
    question: 'Is something measurably different on Monday?',
  },
] as const

export const PLACEHOLDER_JUDGES = [
  { name: 'Judge Name', title: 'Title, Company' },
  { name: 'Judge Name', title: 'Title, Company' },
  { name: 'Judge Name', title: 'Title, Company' },
  { name: 'Judge Name', title: 'Title, Company' },
] as const

export const TEAM = [
  { name: 'Aruzhan', role: 'Lead Organiser', photo: '/team/aruzhan.jpeg' },
  { name: 'Lyndon Leong', role: 'Programme & Community', photo: '/team/lyndon.png' },
  { name: 'Lois Zhao', role: 'Operations & Partners', photo: '/team/lois.png' },
  { name: 'Alramina Myrzabekova', role: 'Strategy & Partnerships', photo: '/team/alramina.png' },
] as const

export const COHORT_STATS = [
  { value: '80', label: 'builders' },
  { value: '~12%', label: 'acceptance' },
  { value: '36hrs', label: 'to build' },
  { value: '£10k', label: 'first prize' },
] as const

export const TIMELINE_STEPS = [
  {
    index: '01',
    label: 'Apply',
    detail: 'Rolling applications. Short form, no essay.',
  },
  {
    index: '02',
    label: 'Confirmed',
    detail: 'Decisions within 5 days.',
  },
  {
    index: '03',
    label: 'Build',
    detail: '5–7 June 2026, London. 36 hours.',
  },
  {
    index: '04',
    label: 'Demo Day',
    detail: 'Sunday afternoon. Proof artefacts on screen.',
  },
] as const

export const PLACEHOLDER_SPONSORS = [
  { label: 'Founding Partner' },
  { label: 'Founding Partner' },
  { label: 'Founding Partner' },
  { label: 'Prize Partner' },
  { label: 'Prize Partner' },
  { label: 'Prize Partner' },
] as const

export const FAQ_ITEMS = [
  {
    q: 'Who can apply?',
    a: 'Anyone building something real. We don\'t care about credentials — we care about what you\'ve already shipped or are committed to shipping.',
  },
  {
    q: 'Where is it?',
    a: 'London. Venue details are confirmed to accepted builders.',
  },
  {
    q: 'Is it free to attend?',
    a: 'Yes. Food, space, and the build environment are covered.',
  },
  {
    q: 'How are projects judged?',
    a: 'On evidence. Economic exchange, proof of customer conversations, and measurable real-world impact. No slide decks.',
  },
  {
    q: 'What\'s the prize?',
    a: '£10,000 first prize. Additional credits and prizes from our partners.',
  },
  {
    q: 'Can I apply solo?',
    a: 'Yes. Teams of up to 4 are welcome.',
  },
  {
    q: 'What\'s the Effect track?',
    a: 'Build something that earns real money during the 36 hours. Monetisation is the proof. Arrive with a target customer in mind.',
  },
  {
    q: 'When do I hear back?',
    a: 'Within 5 days of applying.',
  },
] as const
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "feat: add content data constants"
```

---

## Task 3: Global CSS — Tokens + Glass System + Typography

**Files:**
- Modify: `src/styles/globals.css` (replaces scaffold placeholder)
- Note: create-next-app puts globals.css in `src/app/globals.css` — move it to `src/styles/globals.css` and update the import in `src/app/layout.tsx`

- [ ] **Step 1: Move globals.css**

```bash
mkdir -p src/styles
mv src/app/globals.css src/styles/globals.css
```

- [ ] **Step 2: Write `src/styles/globals.css`**

```css
@import "tailwindcss";

/* ─── Font face ─── */
@font-face {
  font-family: "Imperial Script";
  src: url("/fonts/ImperialScript-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* ─── Design tokens ─── */
:root {
  --font-hero: "Imperial Script", cursive;
  --font-sans: "Geist", Inter, system-ui, sans-serif;
  --font-mono: "Geist Mono", "Space Mono", ui-monospace, monospace;

  /* palette */
  --sky-blue: #8dccf3;
  --veranda-blue: #6bb1ad;
  --grass-green: #8ccb63;
  --melon-pink: #e5a9a9;
  --cupid-pink: #e6748e;
  --lychee: #edecdb;
  --cream: #f8f3e8;
  --ink: #202020;
  --vermillion: #ff4a32;

  /* sky gradient */
  --sky-top: #80c6f1;
  --sky-mid: #9ed4f6;
  --sky-bottom: #dff1fb;

  /* glass */
  --glass-border-light: rgb(255 255 255 / 0.55);
  --glass-border-soft: rgb(255 255 255 / 0.28);
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

/* ─── Base ─── */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-sans);
  color: var(--ink);
  font-size: 16px;
  line-height: 1.5;
  background: var(--sky-bottom);
  -webkit-font-smoothing: antialiased;
}

/* ─── Glass material ─── */
.glass {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgb(255 255 255 / 0.42), rgb(255 255 255 / 0.12));
  border: 1px solid var(--glass-border-light);
  box-shadow: var(--glass-shadow-soft);
  backdrop-filter: blur(24px) saturate(1.35);
  -webkit-backdrop-filter: blur(24px) saturate(1.35);
}

.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    radial-gradient(circle at 24% 0%, rgb(255 255 255 / 0.62), transparent 34%),
    linear-gradient(135deg, rgb(255 255 255 / 0.32), transparent 42%);
  mix-blend-mode: screen;
}

.glass::after {
  content: "";
  position: absolute;
  inset: 1px;
  pointer-events: none;
  border-radius: inherit;
  border: 1px solid rgb(255 255 255 / 0.22);
}

.glass--clear {
  background: rgb(255 255 255 / 0.14);
  border-color: rgb(255 255 255 / 0.42);
}

.glass--milk {
  background: rgb(248 243 232 / 0.42);
  border-color: rgb(255 255 255 / 0.58);
}

.glass--blue {
  background: linear-gradient(135deg, rgb(141 204 243 / 0.32), rgb(107 177 173 / 0.18));
  border-color: rgb(255 255 255 / 0.46);
}

.glass--pink {
  background: linear-gradient(135deg, rgb(229 169 169 / 0.36), rgb(230 116 142 / 0.18));
  border-color: rgb(255 255 255 / 0.42);
}

/* ─── Glass button ─── */
.glass-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.25rem;
  padding: 0 1.35rem;
  border-radius: 999px;
  font-family: var(--font-sans);
  font-size: 0.95rem;
  font-weight: 720;
  letter-spacing: -0.01em;
  color: var(--ink);
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgb(255 255 255 / 0.58);
  background: linear-gradient(135deg, rgb(255 255 255 / 0.62), rgb(255 255 255 / 0.22));
  box-shadow:
    0 10px 28px rgb(32 32 32 / 0.14),
    inset 0 1px 0 rgb(255 255 255 / 0.66);
  backdrop-filter: blur(20px) saturate(1.35);
  -webkit-backdrop-filter: blur(20px) saturate(1.35);
  transition:
    transform var(--duration-fast) var(--ease-soft),
    box-shadow var(--duration-fast) var(--ease-soft);
}

.glass-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 18px 44px rgb(32 32 32 / 0.18),
    0 0 36px rgb(141 204 243 / 0.34),
    inset 0 1px 0 rgb(255 255 255 / 0.74);
}

.glass-button:active {
  transform: translateY(0) scale(0.985);
}

.glass-button--primary {
  background: linear-gradient(135deg, rgb(255 255 255 / 0.76), rgb(107 177 173 / 0.34));
}

.glass-button--secondary {
  background: linear-gradient(135deg, rgb(255 255 255 / 0.46), rgb(255 255 255 / 0.16));
}

/* ─── Typography ─── */
.hero-wordmark {
  font-family: var(--font-hero);
  font-size: clamp(5.5rem, 15vw, 15rem);
  line-height: 0.78;
  font-weight: 400;
  letter-spacing: -0.04em;
}

.section-title {
  font-family: var(--font-sans);
  font-size: clamp(2.4rem, 6vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
  font-weight: 760;
}

.body-copy {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.55;
  letter-spacing: -0.015em;
  font-weight: 430;
}

.meta {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}

/* ─── Layout utilities ─── */
.section {
  position: relative;
  padding-block: clamp(5rem, 12vw, 11rem);
  padding-inline: clamp(1rem, 4vw, 4rem);
}

.container {
  width: min(100% - 2rem, 1180px);
  margin-inline: auto;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
}

@media (max-width: 800px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* ─── Hero wordmark layers ─── */
.hero-logo {
  position: relative;
  display: inline-grid;
  place-items: center;
  font-family: var(--font-hero);
  font-size: clamp(5.5rem, 15vw, 15rem);
  line-height: 0.78;
  letter-spacing: -0.04em;
  isolation: isolate;
}

.hero-logo > span {
  grid-area: 1 / 1;
}

.hero-logo__stroke {
  color: transparent;
  -webkit-text-stroke: clamp(2px, 0.35vw, 5px) rgba(255, 255, 255, 0.96);
  filter:
    drop-shadow(0 4px 10px rgba(255, 255, 255, 0.4))
    drop-shadow(0 18px 42px rgba(24, 39, 54, 0.34));
  z-index: 1;
}

.hero-logo__fill {
  color: transparent;
  background: linear-gradient(
    105deg,
    #7ee0df 0%,
    #9bc9ff 24%,
    #c88fe7 44%,
    #f19ab5 61%,
    #f6d5a4 78%,
    #b9e89a 100%
  );
  background-size: 180% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  filter:
    drop-shadow(0 1px 0 rgba(255, 255, 255, 0.7))
    drop-shadow(0 -1px 1px rgba(88, 72, 120, 0.22));
  z-index: 2;
  animation: wordmark-gradient-drift 12s ease-in-out infinite;
}

.hero-logo__shine {
  color: transparent;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.55) 22%,
    rgba(255, 255, 255, 0.04) 48%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  mix-blend-mode: screen;
  opacity: 0.72;
  transform: translateY(-0.035em);
  z-index: 3;
  animation: wordmark-shine-breathe 8s ease-in-out infinite;
}

@keyframes wordmark-gradient-drift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes wordmark-shine-breathe {
  0%, 100% { opacity: 0.55; transform: translateY(-0.035em); }
  50% { opacity: 0.85; transform: translateY(-0.055em); }
}

/* ─── Marquee ─── */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 35s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

/* ─── Page sky zone ─── */
.page-after-hero {
  position: relative;
  background: linear-gradient(
    to bottom,
    var(--sky-top) 0%,
    var(--sky-mid) 38%,
    var(--sky-bottom) 100%
  );
}

.page-after-hero::before {
  content: "";
  position: absolute;
  top: -120px;
  left: 0;
  right: 0;
  height: 180px;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(210, 236, 248, 0.55) 55%,
    rgba(223, 241, 251, 0.95) 100%
  );
  filter: blur(12px);
  z-index: 0;
}

/* ─── Hero halo ─── */
.hero-title-wrap {
  position: relative;
}

.hero-title-wrap::before {
  content: "";
  position: absolute;
  inset: -12% -8%;
  z-index: -1;
  border-radius: 999px;
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.42),
    rgba(255, 255, 255, 0.16) 42%,
    rgba(255, 255, 255, 0) 72%
  );
  filter: blur(24px);
}

/* ─── Interactive glass hover lift ─── */
.interactive-glass {
  transition:
    transform var(--duration-fast) var(--ease-soft),
    box-shadow var(--duration-fast) var(--ease-soft),
    border-color var(--duration-fast) var(--ease-soft);
}

.interactive-glass:hover {
  transform: translateY(-4px);
  box-shadow: var(--glass-shadow);
}

/* ─── Footer landscape ─── */
.footer-landscape {
  position: relative;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 8rem 2rem 3rem;
  overflow: hidden;
}

.footer-landscape::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(118, 184, 95, 0.18) 0%,
    rgba(118, 184, 95, 0.08) 18%,
    rgba(255, 255, 255, 0) 50%
  );
  pointer-events: none;
}

.footer-landscape::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(140, 203, 99, 0.28), transparent);
  pointer-events: none;
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 3: Update layout.tsx import path**

In `src/app/layout.tsx`, change:

```typescript
import './globals.css'
```

to:

```typescript
import '@/styles/globals.css'
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/styles/globals.css src/app/layout.tsx
git commit -m "feat: add global design tokens, glass system, and typography CSS"
```

---

## Task 4: Glass Primitive Components

**Files:**
- Create: `src/components/primitives/GlassSurface.tsx`
- Create: `src/components/primitives/GlassButton.tsx`
- Create: `src/components/primitives/GlassCard.tsx`
- Create: `src/components/primitives/GlassPill.tsx`
- Create: `src/components/primitives/index.ts`
- Create: `src/components/primitives/__tests__/GlassSurface.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/primitives/__tests__/GlassSurface.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { GlassSurface } from '../GlassSurface'

describe('GlassSurface', () => {
  it('renders children', () => {
    render(<GlassSurface>hello</GlassSurface>)
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('applies glass class', () => {
    const { container } = render(<GlassSurface>x</GlassSurface>)
    expect(container.firstChild).toHaveClass('glass')
  })

  it('applies variant class', () => {
    const { container } = render(<GlassSurface variant="milk">x</GlassSurface>)
    expect(container.firstChild).toHaveClass('glass--milk')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest src/components/primitives/__tests__/GlassSurface.test.tsx --no-coverage
```

Expected: FAIL — `GlassSurface` not found.

- [ ] **Step 3: Create `src/components/primitives/GlassSurface.tsx`**

```typescript
import { HTMLAttributes } from 'react'

type GlassVariant = 'default' | 'clear' | 'milk' | 'blue' | 'pink'

interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
}

export function GlassSurface({
  variant = 'default',
  className = '',
  children,
  ...props
}: GlassSurfaceProps) {
  const variantClass = variant === 'default' ? '' : `glass--${variant}`
  return (
    <div className={`glass ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest src/components/primitives/__tests__/GlassSurface.test.tsx --no-coverage
```

Expected: PASS (3 tests).

- [ ] **Step 5: Create `src/components/primitives/GlassButton.tsx`**

```typescript
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface GlassButtonBaseProps {
  variant?: ButtonVariant
  className?: string
}

type GlassButtonProps =
  | (GlassButtonBaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (GlassButtonBaseProps & { href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)

export function GlassButton({ variant = 'primary', className = '', children, ...props }: GlassButtonProps) {
  const cls = `glass-button glass-button--${variant} ${className}`.trim()

  if ('href' in props && props.href) {
    const { href, ...rest } = props as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>
    return <a href={href} className={cls} {...rest}>{children}</a>
  }

  return (
    <button className={cls} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
```

- [ ] **Step 6: Create `src/components/primitives/GlassCard.tsx`**

```typescript
import { HTMLAttributes } from 'react'
import { GlassSurface } from './GlassSurface'

type GlassVariant = 'default' | 'clear' | 'milk' | 'blue' | 'pink'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
}

export function GlassCard({ variant = 'default', className = '', children, ...props }: GlassCardProps) {
  return (
    <GlassSurface
      variant={variant}
      className={`interactive-glass rounded-2xl p-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </GlassSurface>
  )
}
```

- [ ] **Step 7: Create `src/components/primitives/GlassPill.tsx`**

```typescript
import { HTMLAttributes } from 'react'

interface GlassPillProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function GlassPill({ className = '', children, ...props }: GlassPillProps) {
  return (
    <span
      className={`glass rounded-full px-3 py-1 meta inline-block ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  )
}
```

- [ ] **Step 8: Create `src/components/primitives/index.ts`**

```typescript
export { GlassSurface } from './GlassSurface'
export { GlassButton } from './GlassButton'
export { GlassCard } from './GlassCard'
export { GlassPill } from './GlassPill'
```

- [ ] **Step 9: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 10: Commit**

```bash
git add src/components/primitives/
git commit -m "feat: add glass primitive components (Surface, Button, Card, Pill)"
```

---

## Task 5: App Layout + Metadata

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Rewrite `src/app/layout.tsx`**

```typescript
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pop the Bubble — Hackhouse London',
  description:
    '80 builders. £10,000. A 36-hour hackathon judged on real-world impact, not slides. London, 5–7 June 2026.',
  openGraph: {
    title: 'Pop the Bubble — Hackhouse London',
    description: '80 builders. £10,000. Judged on real-world impact.',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Update globals.css font-sans reference**

In `src/styles/globals.css`, update the `--font-sans` and `--font-mono` tokens so Geist picks up the CSS variable set by next/font:

```css
:root {
  --font-sans: var(--font-geist-sans), Inter, system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), "Space Mono", ui-monospace, monospace;
  /* ... rest of tokens unchanged */
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/styles/globals.css
git commit -m "feat: configure app layout with Geist font and metadata"
```

---

## Task 6: SiteHeader

**Files:**
- Create: `src/components/layout/SiteHeader.tsx`
- Create: `src/components/layout/__tests__/SiteHeader.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/layout/__tests__/SiteHeader.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { SiteHeader } from '../SiteHeader'

describe('SiteHeader', () => {
  it('renders the logo text', () => {
    render(<SiteHeader />)
    expect(screen.getByText('Hackhouse London')).toBeInTheDocument()
  })

  it('renders the Apply link', () => {
    render(<SiteHeader />)
    expect(screen.getByRole('link', { name: /apply/i })).toBeInTheDocument()
  })

  it('renders nav links', () => {
    render(<SiteHeader />)
    expect(screen.getByRole('link', { name: /tracks/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /judging/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest src/components/layout/__tests__/SiteHeader.test.tsx --no-coverage
```

Expected: FAIL — `SiteHeader` not found.

- [ ] **Step 3: Create `src/components/layout/SiteHeader.tsx`**

```typescript
'use client'

import { useEffect, useState } from 'react'
import { GlassButton } from '@/components/primitives'
import { EVENT } from '@/lib/content'

const NAV_LINKS = [
  { label: 'Tracks', href: '#tracks' },
  { label: 'Judging', href: '#judging' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass glass--clear' : ''
      }`}
      style={{ borderBottom: scrolled ? '1px solid rgb(255 255 255 / 0.28)' : 'none' }}
    >
      <div className="container flex items-center justify-between py-4">
        <span className="meta text-white/90 tracking-widest">
          Hackhouse London
        </span>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="meta text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <GlassButton href={EVENT.applyHref} variant="primary" className="text-sm">
          Apply
        </GlassButton>
      </div>
    </header>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest src/components/layout/__tests__/SiteHeader.test.tsx --no-coverage
```

Expected: PASS (3 tests).

- [ ] **Step 5: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/layout/
git commit -m "feat: add SiteHeader with scroll-triggered glass effect"
```

---

## Task 7: HeroSection

**Files:**
- Create: `src/components/sections/HeroSection.tsx`
- Create: `src/components/sections/__tests__/HeroSection.test.tsx`

- [ ] **Step 1: Write failing test**

Create `src/components/sections/__tests__/HeroSection.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { HeroSection } from '../HeroSection'

describe('HeroSection', () => {
  it('renders the accessible heading', () => {
    render(<HeroSection />)
    expect(screen.getByRole('heading', { name: /pop the bubble/i })).toBeInTheDocument()
  })

  it('renders the Apply CTA', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: /apply/i })).toBeInTheDocument()
  })

  it('renders the Sponsor CTA', () => {
    render(<HeroSection />)
    expect(screen.getByRole('link', { name: /sponsor/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx jest src/components/sections/__tests__/HeroSection.test.tsx --no-coverage
```

Expected: FAIL — `HeroSection` not found.

- [ ] **Step 3: Create `src/components/sections/HeroSection.tsx`**

```typescript
'use client'

import { useRef } from 'react'
import { motion } from 'motion/react'
import { GlassButton } from '@/components/primitives'
import { EVENT } from '@/lib/content'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{
          scale: [0.985, 1.02, 0.985],
          y: [0, -6, 0],
          rotate: [0, 0.75, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Wide video (landscape) */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-wide-poster.jpg"
        >
          <source src="/hero-wide.mp4" type="video/mp4" />
        </video>
        {/* Tall video (portrait/mobile) */}
        <video
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-tall-poster.jpg"
        >
          <source src="/hero-tall.mp4" type="video/mp4" />
        </video>
        {/* Fallback overlay if video fails */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--sky-top), var(--veranda-blue))',
          }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Dark scrim for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(10, 20, 35, 0.18)' }}
        aria-hidden="true"
      />

      {/* Title + CTAs */}
      <div className="hero-title-wrap relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="hero-logo" aria-label="Pop The Bubble">
          <span className="hero-logo__stroke" aria-hidden="true">Pop The Bubble</span>
          <span className="hero-logo__fill">Pop The Bubble</span>
          <span className="hero-logo__shine" aria-hidden="true">Pop The Bubble</span>
        </h1>

        <p
          className="body-copy text-white/90 mt-6 mb-8 max-w-md"
          style={{ textShadow: '0 1px 8px rgba(0,0,0,0.32)' }}
        >
          80 builders. £10,000. Judged on real-world impact.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <GlassButton href={EVENT.applyHref} variant="primary">Apply</GlassButton>
          <GlassButton href={EVENT.sponsorHref} variant="secondary">Sponsor</GlassButton>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx jest src/components/sections/__tests__/HeroSection.test.tsx --no-coverage
```

Expected: PASS (3 tests).

- [ ] **Step 5: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/HeroSection.tsx src/components/sections/__tests__/HeroSection.test.tsx
git commit -m "feat: add HeroSection with video background and layered wordmark"
```

---

## Task 8: MarqueeStrip

**Files:**
- Create: `src/components/sections/MarqueeStrip.tsx`

- [ ] **Step 1: Create `src/components/sections/MarqueeStrip.tsx`**

```typescript
import { MARQUEE_TEXT } from '@/lib/content'

export function MarqueeStrip() {
  // Duplicate the text so the CSS infinite loop is seamless
  const content = `${MARQUEE_TEXT} · ${MARQUEE_TEXT}`

  return (
    <div
      className="glass glass--milk overflow-hidden py-3 border-y"
      style={{ borderColor: 'rgb(255 255 255 / 0.28)' }}
      aria-label="Event details ticker"
    >
      <div className="marquee-track" aria-hidden="true">
        <span className="meta px-8 whitespace-nowrap">{content}</span>
        <span className="meta px-8 whitespace-nowrap" aria-hidden="true">{content}</span>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/MarqueeStrip.tsx
git commit -m "feat: add MarqueeStrip with CSS animation"
```

---

## Task 9: TracksSection

**Files:**
- Create: `src/components/sections/TracksSection.tsx`

- [ ] **Step 1: Create `src/components/sections/TracksSection.tsx`**

```typescript
import { GlassCard, GlassPill } from '@/components/primitives'
import { TRACKS } from '@/lib/content'

export function TracksSection() {
  return (
    <section id="tracks" className="section">
      <div className="container">
        <h2 className="section-title mb-12">What are you building?</h2>

        <div className="card-grid">
          {TRACKS.map((track) => (
            <GlassCard key={track.index} variant="milk">
              <GlassPill className="mb-4">{track.index}</GlassPill>
              <h3
                className="section-title mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {track.title}
              </h3>
              <p className="body-copy mb-6">{track.body}</p>
              <GlassPill>{track.chip}</GlassPill>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/TracksSection.tsx
git commit -m "feat: add TracksSection with three glass track cards"
```

---

## Task 10: JudgingSection

**Files:**
- Create: `src/components/sections/JudgingSection.tsx`

- [ ] **Step 1: Create `src/components/sections/JudgingSection.tsx`**

```typescript
import { GlassCard } from '@/components/primitives'
import { JUDGING_CRITERIA, PLACEHOLDER_JUDGES } from '@/lib/content'

export function JudgingSection() {
  return (
    <section id="judging" className="section">
      <div className="container">
        {/* Heading row */}
        <div className="grid md:grid-cols-2 gap-12 mb-16 items-start">
          <div>
            <h2 className="section-title mb-6">Judged on reality.</h2>
            <p className="body-copy">
              No slide decks. No judges watching demos and guessing. Every project is scored on
              what actually happened during the 36 hours.
            </p>
          </div>

          {/* Criteria cards */}
          <div className="flex flex-col gap-4">
            {JUDGING_CRITERIA.map((c) => (
              <GlassCard key={c.title} variant="blue" className="!p-5">
                <p className="meta mb-1" style={{ color: 'var(--veranda-blue)' }}>
                  {c.title}
                </p>
                <p className="body-copy font-semibold">{c.question}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Judge panel */}
        <h3 className="meta mb-6" style={{ color: 'var(--ink)', opacity: 0.6 }}>
          The Panel
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLACEHOLDER_JUDGES.map((judge, i) => (
            <GlassCard key={i} variant="milk" className="!p-4 flex flex-col items-center text-center gap-3">
              {/* Placeholder avatar */}
              <div
                className="glass glass--milk rounded-full"
                style={{ width: 72, height: 72, background: 'var(--lychee)' }}
                aria-label="Judge photo placeholder"
              />
              <div>
                <p className="body-copy font-semibold text-sm">{judge.name}</p>
                <p className="meta opacity-60">{judge.title}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/JudgingSection.tsx
git commit -m "feat: add JudgingSection with criteria cards and placeholder judge panel"
```

---

## Task 11: CohortSection

**Files:**
- Create: `src/components/sections/CohortSection.tsx`

- [ ] **Step 1: Create `src/components/sections/CohortSection.tsx`**

```typescript
import Image from 'next/image'
import { GlassPill, GlassCard } from '@/components/primitives'
import { COHORT_STATS, TEAM } from '@/lib/content'

export function CohortSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title mb-10">The room.</h2>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 mb-10">
          {COHORT_STATS.map((s) => (
            <GlassPill key={s.label} className="px-5 py-2 text-base">
              <span className="font-bold mr-1">{s.value}</span>
              <span className="opacity-70">{s.label}</span>
            </GlassPill>
          ))}
        </div>

        {/* Body copy */}
        <p className="body-copy max-w-2xl mb-16">
          Sixty percent are already shipping — they have users, maybe revenue, and want to
          compress months of validation into a weekend. The other forty are FAANG and scale-up
          alumni who want to build something real. The bar for entry is evidence, not credentials.
        </p>

        {/* Team row */}
        <h3 className="meta mb-6" style={{ opacity: 0.6 }}>Organising team</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEAM.map((member) => (
            <GlassCard key={member.name} variant="milk" className="!p-4 flex flex-col items-center text-center gap-3">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div>
                <p className="body-copy font-semibold text-sm">{member.name}</p>
                <p className="meta opacity-60">{member.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/CohortSection.tsx
git commit -m "feat: add CohortSection with stats pills and team photos"
```

---

## Task 12: TimelineSection

**Files:**
- Create: `src/components/sections/TimelineSection.tsx`

- [ ] **Step 1: Create `src/components/sections/TimelineSection.tsx`**

```typescript
import { GlassCard, GlassPill } from '@/components/primitives'
import { TIMELINE_STEPS } from '@/lib/content'

export function TimelineSection() {
  return (
    <section id="timeline" className="section">
      <div className="container">
        <h2 className="section-title mb-12">How it works.</h2>

        {/* Horizontal on md+, vertical on mobile */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden md:block absolute top-8 left-0 right-0 h-px"
            style={{ background: 'rgb(255 255 255 / 0.4)', zIndex: 0 }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
            {TIMELINE_STEPS.map((step) => (
              <GlassCard key={step.index} variant="milk" className="!p-5">
                <GlassPill className="mb-3">{step.index}</GlassPill>
                <h3 className="body-copy font-bold mb-1">{step.label}</h3>
                <p className="meta opacity-60">{step.detail}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/TimelineSection.tsx
git commit -m "feat: add TimelineSection with horizontal glass nodes"
```

---

## Task 13: SponsorsSection

**Files:**
- Create: `src/components/sections/SponsorsSection.tsx`

- [ ] **Step 1: Create `src/components/sections/SponsorsSection.tsx`**

```typescript
import { GlassButton, GlassCard } from '@/components/primitives'
import { PLACEHOLDER_SPONSORS, EVENT } from '@/lib/content'

export function SponsorsSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title mb-6">Partners.</h2>
        <p className="body-copy max-w-xl mb-10">
          Founding partners get a 5-minute kickoff slot, a seat at the closed dinner with the top 3
          teams, and first look at every build 24 hours before demo day.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {PLACEHOLDER_SPONSORS.map((sponsor, i) => (
            <GlassCard
              key={i}
              variant="clear"
              className="!p-6 flex flex-col items-center justify-center gap-2 min-h-[100px]"
              style={{ border: '1.5px dashed rgb(255 255 255 / 0.38)' }}
            >
              <p className="meta opacity-40">Logo</p>
              <p className="meta opacity-30">{sponsor.label}</p>
            </GlassCard>
          ))}
        </div>

        <GlassButton href={EVENT.sponsorHref} variant="secondary">
          Sponsor this event
        </GlassButton>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/SponsorsSection.tsx
git commit -m "feat: add SponsorsSection with placeholder logo grid"
```

---

## Task 14: FAQSection

**Files:**
- Create: `src/components/sections/FAQSection.tsx`

- [ ] **Step 1: Install shadcn accordion**

```bash
npx shadcn@latest add accordion --yes
```

This creates `src/components/ui/accordion.tsx` and installs `@radix-ui/react-accordion` if not already present.

- [ ] **Step 2: Create `src/components/sections/FAQSection.tsx`**

```typescript
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/content'

export function FAQSection() {
  return (
    <section id="faq" className="section">
      <div className="container">
        <h2 className="section-title mb-12">Questions.</h2>

        <div
          className="glass glass--milk rounded-2xl overflow-hidden max-w-2xl"
          style={{ padding: '0.5rem' }}
        >
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b last:border-b-0"
                style={{ borderColor: 'rgb(255 255 255 / 0.28)' }}
              >
                <AccordionTrigger
                  className="px-6 py-4 body-copy font-semibold text-left hover:no-underline"
                  style={{ color: 'var(--ink)' }}
                >
                  {item.q}
                </AccordionTrigger>
                <AccordionContent
                  className="px-6 pb-4 body-copy"
                  style={{ color: 'var(--ink)', opacity: 0.75 }}
                >
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/FAQSection.tsx src/components/ui/
git commit -m "feat: add FAQSection with glass-styled Radix accordion"
```

---

## Task 15: FooterLandscape

**Files:**
- Create: `src/components/sections/FooterLandscape.tsx`

- [ ] **Step 1: Create `src/components/sections/FooterLandscape.tsx`**

```typescript
import { GlassButton } from '@/components/primitives'
import { EVENT } from '@/lib/content'

export function FooterLandscape() {
  return (
    <footer className="footer-landscape">
      <div className="relative z-10 flex flex-col items-center text-center gap-8">
        <h2 className="section-title" style={{ color: 'var(--ink)' }}>
          Ready to build?
        </h2>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <GlassButton href={EVENT.applyHref} variant="primary">Apply now</GlassButton>
          <GlassButton href={EVENT.sponsorHref} variant="secondary">Sponsor</GlassButton>
        </div>

        <div className="mt-8 border-t w-full pt-6" style={{ borderColor: 'rgb(0 0 0 / 0.08)' }}>
          <p className="meta opacity-40">
            Hackhouse London · Issue 01 · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Type-check + commit**

```bash
npx tsc --noEmit
git add src/components/sections/FooterLandscape.tsx
git commit -m "feat: add FooterLandscape with green ground gradient and final CTA"
```

---

## Task 16: Page Composition

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/sections/index.ts`

- [ ] **Step 1: Create `src/components/sections/index.ts`**

```typescript
export { HeroSection } from './HeroSection'
export { MarqueeStrip } from './MarqueeStrip'
export { TracksSection } from './TracksSection'
export { JudgingSection } from './JudgingSection'
export { CohortSection } from './CohortSection'
export { TimelineSection } from './TimelineSection'
export { SponsorsSection } from './SponsorsSection'
export { FAQSection } from './FAQSection'
export { FooterLandscape } from './FooterLandscape'
```

- [ ] **Step 2: Rewrite `src/app/page.tsx`**

```typescript
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  HeroSection,
  MarqueeStrip,
  TracksSection,
  JudgingSection,
  CohortSection,
  TimelineSection,
  SponsorsSection,
  FAQSection,
  FooterLandscape,
} from '@/components/sections'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
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
    </>
  )
}
```

- [ ] **Step 3: Run full test suite**

```bash
npx jest --no-coverage
```

Expected: all tests pass.

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Start dev server and visually verify**

```bash
npm run dev
```

Open `http://localhost:3000` and check:
- Hero video plays and the wordmark renders with the pastel gradient
- Header is transparent over hero, becomes glass on scroll
- Marquee scrolls continuously
- All 10 sections are visible with glass cards floating on the sky gradient
- Footer has the green ground tint returning

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/sections/index.ts
git commit -m "feat: compose full landing page — all 10 sections wired"
```

---

## Task 17: Mobile Pass

**Files:**
- Modify: `src/styles/globals.css` (add any needed mobile overrides)
- Modify: `src/components/layout/SiteHeader.tsx` (mobile nav)
- Modify: any section component that needs mobile tweaks

- [ ] **Step 1: Add mobile nav to SiteHeader**

In `src/components/layout/SiteHeader.tsx`, add a mobile menu toggle. Replace the `<nav>` block:

```typescript
'use client'

import { useEffect, useState } from 'react'
import { GlassButton } from '@/components/primitives'
import { EVENT } from '@/lib/content'

const NAV_LINKS = [
  { label: 'Tracks', href: '#tracks' },
  { label: 'Judging', href: '#judging' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass glass--clear' : ''
      }`}
      style={{ borderBottom: scrolled ? '1px solid rgb(255 255 255 / 0.28)' : 'none' }}
    >
      <div className="container flex items-center justify-between py-4">
        <span className="meta text-white/90 tracking-widest">Hackhouse London</span>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="meta text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <GlassButton href={EVENT.applyHref} variant="primary" className="text-sm">
            Apply
          </GlassButton>
          {/* Mobile hamburger */}
          <button
            className="md:hidden glass glass--clear rounded-full p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              {open ? (
                <path d="M4 4l12 12M4 16L16 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <rect y="4" width="20" height="1.5" rx="1" />
                  <rect y="9.25" width="20" height="1.5" rx="1" />
                  <rect y="14.5" width="20" height="1.5" rx="1" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden glass glass--milk border-t" style={{ borderColor: 'rgb(255 255 255 / 0.28)' }}>
          <nav className="container py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="meta text-ink/80"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Check all sections at 375px**

Start dev server, open DevTools, set device to iPhone SE (375px width). Check each section:
- Hero: wordmark legible, CTAs not clipped
- Marquee: scrolling correctly
- Tracks: single column cards
- Judging: criteria stacked below heading
- Cohort: 2-column team grid
- Timeline: vertical layout
- Sponsors: 2-column grid
- FAQ: full width accordion
- Footer: text centred, buttons stacked

- [ ] **Step 3: Fix any layout issues found**

Common fixes — add to `src/styles/globals.css` if needed:

```css
@media (max-width: 640px) {
  .hero-logo {
    font-size: clamp(3.5rem, 18vw, 7rem);
  }

  .section {
    padding-inline: 1rem;
  }
}
```

- [ ] **Step 4: Type-check + commit**

```bash
npx tsc --noEmit
git add -A
git commit -m "feat: mobile pass — responsive nav and section layout fixes"
```

---

## Task 18: Performance + Accessibility Pass

**Files:**
- Modify: `src/components/sections/HeroSection.tsx` (video loading attribute)
- Modify: `src/app/layout.tsx` (preload font)
- Verify: aria labels, heading hierarchy, reduced-motion

- [ ] **Step 1: Add `preload` link for Imperial Script font in layout.tsx**

In `src/app/layout.tsx`, add to the `metadata` export:

```typescript
export const metadata: Metadata = {
  // ... existing fields
}
```

And add a separate export for viewport:

```typescript
// After metadata export, still in layout.tsx
// No change needed — next/font handles Geist preloading.
// Imperial Script is loaded via @font-face with font-display: swap (already in globals.css).
```

- [ ] **Step 2: Verify reduced-motion with DevTools**

In Chrome DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Confirm:
- Hero video still shows (motion = video playback, not our CSS animation — acceptable)
- Wordmark shimmer animations stop
- Marquee stops scrolling
- Card hover lifts are instant

- [ ] **Step 3: Run Lighthouse accessibility audit**

In Chrome DevTools → Lighthouse → Accessibility only → Run. Target score: 90+.

Fix any reported issues (common: missing button labels, insufficient contrast on glass text).

- [ ] **Step 4: Verify heading hierarchy**

Open the page, run in console:

```javascript
[...document.querySelectorAll('h1,h2,h3,h4')]
  .map(h => `${h.tagName}: ${h.textContent?.trim().slice(0,40)}`)
  .join('\n')
```

Expected output:
```
H1: Pop The Bubble  (aria-label)
H2: What are you building?
H2: Judged on reality.
H3: The Panel
H2: The room.
H2: How it works.
H2: Partners.
H2: Questions.
H2: Ready to build?
```

- [ ] **Step 5: Final type-check + test run**

```bash
npx tsc --noEmit && npx jest --no-coverage
```

Expected: zero TypeScript errors, all tests pass.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: performance and accessibility pass — font preload, a11y verified"
```

---

## Done

The landing page is complete when:
- [ ] `npm run dev` shows the full page at `localhost:3000`
- [ ] `npx tsc --noEmit` exits clean
- [ ] `npx jest --no-coverage` all pass
- [ ] Mobile layout verified at 375px
- [ ] Lighthouse accessibility ≥ 90
- [ ] All 10 sections render with the glass system on the sky gradient

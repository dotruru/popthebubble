# Gated Hacker Portal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gate `/hackpack` behind a shared Discord access link (no login form; outsiders see a branded "This page isn't available to you" page), add Check-in / Milestones / Submission Airtable form tabs to the portal, and set 2nd/3rd prizes to TBD.

**Architecture:** A pure `gateDecision()` function holds the access logic; a thin `src/middleware.ts` wraps it (token in `?k=` → httpOnly cookie → clean redirect; valid cookie → allow; otherwise rewrite to a public `/hackpack-unavailable` page). Forms are Airtable iframes driven by a single `AIRTABLE_EMBEDS` config, rendered by a reusable `<AirtableEmbed>` that falls back to a placeholder when a URL is empty. The existing tabbed `HackPackView` gains three tabs. Tracking is the check-in form's job, not the gate's.

**Tech Stack:** Next.js 16 (App Router, `src/middleware.ts`), React 19, TypeScript, Tailwind v4 (existing glass classes), Jest + Testing Library (jsdom), deployed on Cloudflare Workers.

---

## Pre-flight (Phase 0)

### Task 0: Commit the existing pending work first

The working tree already holds approved-but-uncommitted work (pull-merge resolution, the two new sponsors, the initial hackpack/schedule pages, the user's timeline edit). Commit it so the portal tasks start from a clean tree and per-task commits stay coherent.

**Files:** all currently-modified + untracked files.

- [ ] **Step 1: Review what's pending**

Run: `git status && git --no-pager diff --stat`
Expected: the modified `content.ts`, `SiteHeader.tsx`, `SponsorsSection.tsx`, `ScheduleSection.tsx`, new `hackpack/` + `schedule/` pages, `content/` docs, sponsor logo assets.

- [ ] **Step 2: Stage and commit**

```bash
git add -A
git commit -m "feat: schedule + hackpack pages, sponsors (Cognition, Zuba), pull-merge

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

- [ ] **Step 3: Verify clean tree**

Run: `git status`
Expected: `nothing to commit, working tree clean` (the spec/plan docs may remain — add them too if so).

---

## Phase 1 — The gate

### Task 1: Pure gate decision logic + tests

**Files:**
- Create: `src/lib/gate.ts`
- Test: `src/lib/gate.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
// src/lib/gate.test.ts
import { gateDecision } from './gate'

describe('gateDecision', () => {
  const token = 'secret-token'

  it('allows everything outside production (local dev)', () => {
    expect(gateDecision({ token: undefined, provided: null, cookie: undefined, isProd: false }))
      .toEqual({ type: 'allow' })
  })

  it('denies (fails closed) in production when token is not configured', () => {
    expect(gateDecision({ token: undefined, provided: 'x', cookie: 'x', isProd: true }))
      .toEqual({ type: 'deny' })
  })

  it('unlocks when the ?k token matches', () => {
    expect(gateDecision({ token, provided: token, cookie: undefined, isProd: true }))
      .toEqual({ type: 'unlock' })
  })

  it('allows when a valid cookie is present', () => {
    expect(gateDecision({ token, provided: null, cookie: token, isProd: true }))
      .toEqual({ type: 'allow' })
  })

  it('denies when neither token nor cookie matches', () => {
    expect(gateDecision({ token, provided: 'wrong', cookie: 'wrong', isProd: true }))
      .toEqual({ type: 'deny' })
  })

  it('prefers unlock over an already-valid cookie', () => {
    expect(gateDecision({ token, provided: token, cookie: token, isProd: true }))
      .toEqual({ type: 'unlock' })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx jest src/lib/gate.test.ts`
Expected: FAIL — `Cannot find module './gate'`.

- [ ] **Step 3: Write minimal implementation**

```ts
// src/lib/gate.ts

/** What the middleware should do with a request to a gated route. */
export type GateDecision =
  | { type: 'allow' }   // pass through
  | { type: 'unlock' }  // token matched: set cookie + redirect to clean URL
  | { type: 'deny' }    // show the "not available" page

export interface GateInput {
  /** The configured shared token (PORTAL_ACCESS_TOKEN), or undefined if unset. */
  token: string | undefined
  /** The `?k=` query value on this request, if any. */
  provided: string | null
  /** The hh_portal cookie value on this request, if any. */
  cookie: string | undefined
  /** Whether we're running in production. The gate is only enforced in prod. */
  isProd: boolean
}

export function gateDecision({ token, provided, cookie, isProd }: GateInput): GateDecision {
  if (!isProd) return { type: 'allow' }          // frictionless local dev
  if (!token) return { type: 'deny' }            // misconfigured prod → fail closed
  if (provided && provided === token) return { type: 'unlock' }
  if (cookie && cookie === token) return { type: 'allow' }
  return { type: 'deny' }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx jest src/lib/gate.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no output (clean).

- [ ] **Step 6: Commit**

```bash
git add src/lib/gate.ts src/lib/gate.test.ts
git commit -m "feat(portal): pure gate decision logic + tests

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: "Not available" view + public route

**Files:**
- Create: `src/components/sections/HackPackUnavailable.tsx`
- Create: `src/app/hackpack-unavailable/page.tsx`

Note: this route lives OUTSIDE `/hackpack` so the middleware matcher never re-gates it (no redirect loop). The middleware rewrites denied `/hackpack` requests here; the URL bar still shows `/hackpack`.

- [ ] **Step 1: Create the presentational component**

```tsx
// src/components/sections/HackPackUnavailable.tsx
import { LINKS } from '@/lib/content'

const ink = { color: 'var(--ink)' }

export function HackPackUnavailable() {
  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '40rem', textAlign: 'center', marginInline: 'auto' }}>
        <div className="glass glass--milk rounded-lg" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <p className="meta mb-3" style={{ ...ink, opacity: 0.4 }}>Hacker portal</p>
          <h1 className="section-title mb-4" style={ink}>This page isn&apos;t available to you.</h1>
          <p className="body-copy mb-8" style={{ ...ink, opacity: 0.7 }}>
            The hacker portal is for confirmed Pop the Bubble builders. If that&apos;s you, your
            access link is pinned in our Discord.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="meta rounded-full"
              style={{ padding: '0.7rem 1.3rem', background: 'var(--ink)', color: '#fff' }}
            >
              Open our Discord →
            </a>
            <a
              href="/"
              className="meta rounded-full"
              style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
            >
              Back to the site
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create the route page**

```tsx
// src/app/hackpack-unavailable/page.tsx
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HackPackUnavailable } from '@/components/sections/HackPackUnavailable'

export const metadata: Metadata = {
  title: 'Hacker Pack — Pop the Bubble',
  robots: { index: false, follow: false },
}

export default function HackPackUnavailablePage() {
  return (
    <>
      <SiteHeader />
      <main className="page-after-hero">
        <HackPackUnavailable />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Manual render check**

Run: `npm run dev`, visit `http://localhost:3000/hackpack-unavailable`
Expected: centered glass card, "This page isn't available to you.", Discord + Back buttons. Stop the dev server.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/HackPackUnavailable.tsx src/app/hackpack-unavailable/page.tsx
git commit -m "feat(portal): branded 'not available' page

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Middleware gate + env documentation

**Files:**
- Create: `src/middleware.ts`
- Create: `.env.example`

- [ ] **Step 1: Write the middleware**

```ts
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { gateDecision } from '@/lib/gate'

const COOKIE = 'hh_portal'

export function middleware(req: NextRequest) {
  const token = process.env.PORTAL_ACCESS_TOKEN
  const url = req.nextUrl

  const decision = gateDecision({
    token,
    provided: url.searchParams.get('k'),
    cookie: req.cookies.get(COOKIE)?.value,
    isProd: process.env.NODE_ENV === 'production',
  })

  if (decision.type === 'allow') {
    return NextResponse.next()
  }

  if (decision.type === 'unlock') {
    const clean = url.clone()
    clean.searchParams.delete('k')
    const res = NextResponse.redirect(clean)
    res.cookies.set(COOKIE, token!, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/hackpack',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  }

  // deny → show the "not available" page; keep the /hackpack URL in the bar
  const denied = url.clone()
  denied.pathname = '/hackpack-unavailable'
  denied.search = ''
  return NextResponse.rewrite(denied)
}

export const config = {
  matcher: ['/hackpack', '/hackpack/:path*'],
}
```

Note: app-router rewrites serve the destination with its own (200) status. We rely on the branded page + `robots: noindex` rather than a literal 403 — a custom 403 status for a rendered page isn't worth a Route Handler here.

- [ ] **Step 2: Write `.env.example`**

```bash
# Access token for the gated hacker portal at /hackpack.
# The shared link posted in Discord is:  https://<your-domain>/hackpack?k=THIS_VALUE
# Generate a long random value, e.g.:  openssl rand -hex 24
# The gate is only enforced in production; local `npm run dev` is always open.
PORTAL_ACCESS_TOKEN=
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 4: Manual gate check (production build)**

```bash
PORTAL_ACCESS_TOKEN=testtoken npm run build
PORTAL_ACCESS_TOKEN=testtoken npm run start
```
Then:
- Visit `http://localhost:3000/hackpack` → "This page isn't available to you." (URL stays `/hackpack`).
- Visit `http://localhost:3000/hackpack?k=testtoken` → redirects to `/hackpack`, portal renders.
- Reload `http://localhost:3000/hackpack` → still unlocked (cookie).
Stop the server.

- [ ] **Step 5: Commit**

```bash
git add src/middleware.ts .env.example
git commit -m "feat(portal): middleware gate via shared access link

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 2 — Forms

### Task 4: Airtable embed config + component + tests

**Files:**
- Create: `src/lib/portal.ts`
- Create: `src/components/AirtableEmbed.tsx`
- Test: `src/components/AirtableEmbed.test.tsx`

- [ ] **Step 1: Create the embed config**

```ts
// src/lib/portal.ts

// Airtable embed share URLs for the gated hacker portal.
// Paste each form's iframe `src` (looks like https://airtable.com/embed/appXXX/shrYYY).
// Leave '' to render the "form drops here / see Discord" placeholder.
export const AIRTABLE_EMBEDS = {
  checkin: '',
  milestones: '',
  submission: '',
} as const

// Gate: the access link shared in Discord is `${origin}/hackpack?k=${PORTAL_ACCESS_TOKEN}`.
// Set PORTAL_ACCESS_TOKEN in the environment (see .env.example). Never commit the real token.
```

- [ ] **Step 2: Write the failing test**

```tsx
// src/components/AirtableEmbed.test.tsx
import { render, screen } from '@testing-library/react'
import { AirtableEmbed } from './AirtableEmbed'

describe('AirtableEmbed', () => {
  it('renders an iframe when a src is provided', () => {
    render(<AirtableEmbed src="https://airtable.com/embed/shrABC" title="Check-in" />)
    const frame = screen.getByTitle('Check-in') as HTMLIFrameElement
    expect(frame.tagName).toBe('IFRAME')
    expect(frame.src).toContain('https://airtable.com/embed/shrABC')
  })

  it('renders a placeholder pointing to Discord when src is empty', () => {
    render(<AirtableEmbed src="" title="Check-in" />)
    expect(screen.queryByTitle('Check-in')).toBeNull()
    expect(screen.getByText(/pinned in our Discord/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npx jest src/components/AirtableEmbed.test.tsx`
Expected: FAIL — `Cannot find module './AirtableEmbed'`.

- [ ] **Step 4: Write the component**

```tsx
// src/components/AirtableEmbed.tsx

interface AirtableEmbedProps {
  src: string
  title: string
  height?: number
}

const ink = { color: 'var(--ink)' }

export function AirtableEmbed({ src, title, height = 720 }: AirtableEmbedProps) {
  if (!src) {
    return (
      <div
        className="glass glass--milk rounded-lg"
        style={{ padding: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}
      >
        <p className="body-copy" style={{ ...ink, fontWeight: 600 }}>This form drops here.</p>
        <p className="body-copy mt-1" style={{ ...ink, opacity: 0.6 }}>
          The link is also pinned in our Discord.
        </p>
      </div>
    )
  }

  return (
    <div className="glass glass--milk rounded-lg" style={{ padding: 0, overflow: 'hidden' }}>
      <iframe
        className="airtable-embed"
        src={src}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        style={{ background: 'transparent', border: 'none', display: 'block' }}
      />
    </div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npx jest src/components/AirtableEmbed.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 7: Commit**

```bash
git add src/lib/portal.ts src/components/AirtableEmbed.tsx src/components/AirtableEmbed.test.tsx
git commit -m "feat(portal): AirtableEmbed component + embed config

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Add Check-in / Milestones / Submission tabs to HackPackView

**Files:**
- Modify: `src/components/sections/HackPackView.tsx`
- Test: `src/components/sections/HackPackView.test.tsx`

Current `TABS` (HackPackView.tsx:23-32) and default `useState<TabId>('schedule')` (line 69) change. The existing `submit` panel currently holds BOTH the checklist card and a milestones card — the milestones card moves to the new `milestones` tab; the `submit` panel gains the submission form.

- [ ] **Step 1: Update imports**

In `src/components/sections/HackPackView.tsx`, add `AIRTABLE_EMBEDS` and `AirtableEmbed` to imports. Change the content import block (currently lines 4-21) to also import the embeds, and add the component import below it:

```tsx
import {
  EVENT,
  LINKS,
  SCHEDULE,
  HACK_TRACKS,
  HACK_RULES,
  MILESTONES,
  SUBMISSION_ITEMS,
  JUDGING_BASELINE,
  JUDGING_BY_TRACK,
  JUDGING_BONUS,
  PRIZES,
  FOOD,
  FOOD_NOTE,
  TRAVEL,
  WHAT_TO_BRING,
  HACK_FAQ,
} from '@/lib/content'
import { AIRTABLE_EMBEDS } from '@/lib/portal'
import { AirtableEmbed } from '@/components/AirtableEmbed'
```

- [ ] **Step 2: Update the TABS array**

Replace the `TABS` constant (lines 23-32) with:

```tsx
const TABS = [
  { id: 'checkin', label: 'Check in' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'rules', label: 'Rules' },
  { id: 'judging', label: 'Judging' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'submit', label: 'Submit' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'food', label: 'Food & Stay' },
  { id: 'faq', label: 'FAQ' },
] as const
```

- [ ] **Step 3: Default to the check-in tab**

Change `const [active, setActive] = useState<TabId>('schedule')` (line 69) to:

```tsx
  const [active, setActive] = useState<TabId>('checkin')
```

- [ ] **Step 4: Add the check-in panel**

Immediately AFTER the `{/* Panels */}` comment (line 104) and BEFORE the `{active === 'schedule' && (` block, insert:

```tsx
        {active === 'checkin' && (
          <Card>
            <Heading>Check in</Heading>
            <p className="body-copy mb-6" style={inkSoft}>
              Check in first so we know you&apos;re hacking. Name, email, team and track —
              plus your dev-account handles (GitHub / Vercel / etc.) so sponsors can drop
              credits on the right accounts.
            </p>
            <AirtableEmbed src={AIRTABLE_EMBEDS.checkin} title="Check-in form" />
          </Card>
        )}
```

- [ ] **Step 5: Replace the `submit` panel and add the `milestones` panel**

The current `submit` panel is the block `{active === 'submit' && ( ... )}` (lines 187-214), containing a "Your submission" card and a "Milestones — post as you build" card. Replace that ENTIRE block with the two blocks below (milestones tab gets the cadence + a milestone form; submit tab gets the checklist + the submission form):

```tsx
        {active === 'milestones' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Heading>Milestones — post as you build</Heading>
              <ul className="flex flex-col gap-3 mb-4">
                {MILESTONES.map((m) => (
                  <li key={m.id} className="flex gap-3">
                    <span className="meta" style={{ ...ink, minWidth: '3rem' }}>🏁 {m.id}</span>
                    <span className="body-copy" style={inkSoft}>
                      <strong style={ink}>{m.when}</strong> — {m.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="body-copy" style={inkSoft}>
                Post your progress publicly (LinkedIn, X, a reel — anything). It earns
                <strong style={ink}> bonus points</strong>, and it&apos;s free distribution
                for your product. More good posts → more points.
              </p>
            </Card>
            <Card>
              <Heading>Post a milestone update</Heading>
              <AirtableEmbed src={AIRTABLE_EMBEDS.milestones} title="Milestone update form" />
            </Card>
          </div>
        )}

        {active === 'submit' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Heading>Your submission</Heading>
              <Bullets items={SUBMISSION_ITEMS} />
              <p className="body-copy mt-4" style={ink}>
                Submit by the <strong>Sun 8:00am</strong> code freeze. Late = not judged.
              </p>
            </Card>
            <Card>
              <Heading>Submit your project</Heading>
              <AirtableEmbed src={AIRTABLE_EMBEDS.submission} title="Final submission form" />
            </Card>
          </div>
        )}
```

- [ ] **Step 6: Write the test**

```tsx
// src/components/sections/HackPackView.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { HackPackView } from './HackPackView'

describe('HackPackView', () => {
  it('defaults to the Check in tab', () => {
    render(<HackPackView />)
    const checkinTab = screen.getByRole('tab', { name: 'Check in' })
    expect(checkinTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/Check in first so we know you're hacking/i)).toBeInTheDocument()
  })

  it('switches to the Milestones tab on click', () => {
    render(<HackPackView />)
    fireEvent.click(screen.getByRole('tab', { name: 'Milestones' }))
    expect(screen.getByText(/Post a milestone update/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 7: Run the tests**

Run: `npx jest src/components/sections/HackPackView.test.tsx`
Expected: PASS (2 tests).

- [ ] **Step 8: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/HackPackView.tsx src/components/sections/HackPackView.test.tsx
git commit -m "feat(portal): check-in, milestones, submission tabs

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Phase 3 — Public surface

### Task 6: Prizes 2nd/3rd → TBD

**Files:**
- Modify: `src/lib/content.ts:320-324`

- [ ] **Step 1: Edit `PRIZES`**

Replace the `PRIZES` constant with:

```ts
export const PRIZES = [
  { place: '1st', prize: '£10,000 cash' },
  { place: '2nd', prize: 'TBD' },
  { place: '3rd', prize: 'TBD' },
] as const
```

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: clean (the Prizes tab maps over `PRIZES`; no shape change).

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "copy(prizes): 2nd and 3rd prizes TBD for now

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 7: Remove "Hack Pack" from public nav

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx:8-14`

- [ ] **Step 1: Remove the nav entry**

Delete this line from the `NAV_LINKS` array:

```tsx
  { label: 'Hack Pack', href: '/hackpack', external: false },
```

The array becomes:

```tsx
const NAV_LINKS = [
  { label: 'Tracks', href: '/#tracks', external: false },
  { label: 'Schedule', href: '/schedule', external: false },
  { label: 'Discord', href: LINKS.discord, external: true },
  { label: 'FAQ', href: '/#faq', external: false },
]
```

(`LINKS` is still imported and used for Discord — leave the import.)

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/SiteHeader.tsx
git commit -m "chore(nav): remove Hack Pack from public nav (portal is Discord-only)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 8: Repoint public CTAs away from /hackpack

**Files:**
- Modify: `src/components/sections/ScheduleSection.tsx:46-53`
- Modify: `src/app/schedule/page.tsx:73-79`

- [ ] **Step 1: ScheduleSection — replace the hacker-pack CTA with Discord**

In `src/components/sections/ScheduleSection.tsx`, replace the second footer `<a>` (the one with `href={LINKS.hackpack}` reading "Read the hacker pack →") with:

```tsx
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="meta rounded-full"
            style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
          >
            Join the Discord →
          </a>
```

- [ ] **Step 2: schedule/page.tsx — drop the hacker-pack button**

In `src/app/schedule/page.tsx`, delete the entire `<a href={LINKS.hackpack} ...>Full hacker pack →</a>` block (lines 73-79). The footer keeps the Apply button and the existing Join Discord button — no replacement needed.

- [ ] **Step 3: Confirm no remaining public references to the portal**

Run: `grep -rn "LINKS.hackpack\|/hackpack" src/components src/app --include=*.tsx | grep -v "hackpack-unavailable\|app/hackpack/"`
Expected: no matches (the only `/hackpack` references left are the portal route itself and the middleware/unavailable plumbing).

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ScheduleSection.tsx src/app/schedule/page.tsx
git commit -m "chore(cta): point public schedule CTAs at Discord, not the portal

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Final verification

- [ ] **Run the full test suite:** `npx jest` → all pass.
- [ ] **Type-check:** `npx tsc --noEmit` → clean.
- [ ] **Production gate smoke test:** `PORTAL_ACCESS_TOKEN=testtoken npm run build && PORTAL_ACCESS_TOKEN=testtoken npm run start`, then verify: `/hackpack` → not-available; `/hackpack?k=testtoken` → portal with Check-in tab default; reload `/hackpack` → still unlocked. Confirm the home page and `/schedule` no longer link to the portal.
- [ ] **Note:** `LINKS.hackpack` / `LINKS.schedule` remain in `content.ts` — `schedule` is still used; `hackpack` is now unused by public surfaces but kept as the canonical portal path. Leave it.

## Spec coverage check

- Gating, no login, "not available" page → Tasks 1-3.
- One Hacker Portal, extend HackPackView, Check-in default → Task 5.
- Airtable placeholder embeds, single config → Task 4.
- Check-in captures identity + dev accounts (tracking) → Task 5 (copy) + check-in form.
- Prizes TBD → Task 6.
- Remove Hack Pack from nav, repoint public CTAs → Tasks 7-8.

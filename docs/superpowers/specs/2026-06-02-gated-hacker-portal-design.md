# Gated Hacker Portal + Airtable Forms — Design

**Date:** 2026-06-02
**Status:** Approved (pending spec review)
**Author:** brainstorming session

## Problem

Accepted builders need a single place to check in, post milestone updates, and submit
their project. That content (the full hacker pack, schedule run-of-show, forms) should
**not** be publicly available — only people who are part of the hack should reach it.
The portal link is also shared in the event Discord.

Separately, the 2nd/3rd prize copy isn't finalised and should read "TBD" for now.

## Decisions (locked during brainstorming)

1. **Airtable:** scaffold placeholder embed slots now; real URLs pasted in one config file later.
2. **Gating:** in-app Next middleware (runs on Cloudflare Workers). A shared access link
   posted in Discord sets a cookie; everyone else sees a branded "This page isn't available
   to you" page. **No login form.** Tracking is done by the check-in form, not the gate.
3. **Structure:** one gated Hacker Portal — extend the existing tabbed `HackPackView` at `/hackpack`.
4. **Tracking + credits:** one Airtable check-in form captures identity, email, team, track,
   and dev-account handles (GitHub/Vercel/etc.) for sponsor credits.
5. **Prizes:** 1st = £10,000 cash; 2nd and 3rd = "TBD".
6. **Nav:** remove "Hack Pack" from the public nav; remove/repoint all public links to `/hackpack`.
   The portal is reachable only via the Discord-shared access link + the middleware gate.

## Architecture

### Gating — shared access link + Next middleware

No login form. The gate is a token-in-link → cookie, enforced server-side by middleware,
with a branded dead-end page for everyone else.

- **`src/middleware.ts`** matches `/hackpack` and `/hackpack/*`:
  1. If the request carries `?k=<token>` and it matches `PORTAL_ACCESS_TOKEN`, set an
     httpOnly, secure, `SameSite=Lax` cookie (`hh_portal`) and redirect to clean `/hackpack`.
  2. Else if the `hh_portal` cookie is valid, allow the request through.
  3. Else rewrite to the **"not available"** view and respond `403`.
- **Access link** (pinned in Discord): `https://<site>/hackpack?k=<token>`. First click
  unlocks the device; afterwards plain `/hackpack` works. Token lives in an env var
  (`PORTAL_ACCESS_TOKEN`), placeholder until set — no secret in the repo.
- **"Not available" page** — a branded glass/grass page: headline "This page isn't
  available to you," one soft line "Confirmed builders — your access link is pinned in our
  Discord," and a Discord button. Intentional velvet rope, not an error.

Runs on Cloudflare Workers via the project's deploy adapter (middleware is standard Next;
the Cloudflare adapter handles it at the edge). Honest tradeoff: a forwarded link lets
others in, and the gate keeps no per-person log — both acceptable because the link already
goes to the whole cohort on Discord, and **tracking is the check-in form's job, not the
gate's.**

### Tracking — the check-in form is the source of truth

The gate does not identify people; the **Check-in** Airtable form does. To guarantee the
data flows, **Check-in is the portal's default (first) tab**, with copy nudging "Check in
first so we know you're hacking." It captures name, email, team name + members, track, and
dev-account handles. That single table answers "who and which teams are actually hacking."

### Portal surfaces — extend `HackPackView`

`HackPackView` already renders a horizontal tab bar over glass cards. Keep all existing
**info** tabs (Schedule, Tracks, Rules, Judging, Submit checklist, Prizes, Food & Stay,
FAQ) and add three **form** tabs:

| Tab        | Contents                                                                                  |
| ---------- | ----------------------------------------------------------------------------------------- |
| Check-in   | `<AirtableEmbed>` (check-in form) — name, email, team, track, dev-account handles         |
| Milestones | `MILESTONES` cadence cards (M1/M2/M3) + `<AirtableEmbed>` "post a milestone update" form   |
| Submit     | existing `SUBMISSION_ITEMS` checklist + `<AirtableEmbed>` final-submission form            |

The existing "Submit" info tab (the checklist) and the new submission **form** live in the
same Submit tab: checklist on top, form below.

### Airtable embeds — placeholder-driven

New file `src/lib/portal.ts`:

```ts
// Paste Airtable embed share URLs here when the forms are ready.
// Leave empty ('') to render the "coming soon / see Discord" placeholder.
export const AIRTABLE_EMBEDS = {
  checkin: '',
  milestones: '',
  submission: '',
} as const
```

New component `src/components/AirtableEmbed.tsx`:

- Props: `{ src: string; title: string; height?: number }`
- If `src` is non-empty → responsive `<iframe class="airtable-embed">` wrapped in a
  glass-styled container (transparent background, rounded, full width, sensible height).
- If `src` is empty → a glass placeholder card: "This form drops here — the link is also
  pinned in Discord." Keeps the portal coherent before URLs exist.

One component, one config file: pasting three URLs is the entire go-live step.

### Prizes → TBD

`PRIZES` in `src/lib/content.ts`:

```ts
export const PRIZES = [
  { place: '1st', prize: '£10,000 cash' },
  { place: '2nd', prize: 'TBD' },
  { place: '3rd', prize: 'TBD' },
] as const
```

The Prizes tab already maps over `PRIZES`; no component change needed.

### Public link removal

- `SiteHeader.tsx` — remove the `{ label: 'Hack Pack', href: '/hackpack' }` nav entry
  (desktop + mobile, single `NAV_LINKS` array so one edit covers both).
- `ScheduleSection.tsx` (home) — the footer has two CTAs ("Full schedule →" and "Read the
  hacker pack →"). Replace "Read the hacker pack →" with "Join the Discord →"
  (`LINKS.discord`, external, new tab).
- `src/app/schedule/page.tsx` (public) — the footer has Apply + "Full hacker pack →" +
  Join Discord. **Drop** the "Full hacker pack →" button entirely (a Discord CTA already
  exists there, so no replacement needed).

Result: nothing public links to `/hackpack`. Builders reach it via the Discord-pinned
access link, then pass the middleware gate.

## Components & boundaries

| Unit                  | Does                                                    | Depends on                                 |
| --------------------- | ------------------------------------------------------- | ------------------------------------------ |
| `src/middleware.ts`   | Gate `/hackpack`: token→cookie, else 403 "not available" | `PORTAL_ACCESS_TOKEN` env                  |
| `HackPackUnavailable` | Branded "this page isn't available to you" view         | nothing (presentational)                   |
| `AirtableEmbed`       | Render one Airtable iframe or a placeholder             | nothing (presentational)                   |
| `src/lib/portal.ts`   | Single source of truth for embed URLs                   | nothing                                    |
| `HackPackView`        | Tab shell + panels (info + 3 form tabs)                 | `content.ts`, `portal.ts`, `AirtableEmbed` |

## Out of scope (YAGNI)

- Custom user accounts / sessions / databases (shared-link cookie gates; Airtable holds data).
- Per-person access logging in the gate (the check-in form is the people-tracker).
- Per-milestone separate forms (one milestones form with a milestone field is enough).
- Email sending, magic links, Discord OAuth, Cloudflare Access (all rejected — see decisions).
- Real-time submission dashboards / judging UI.

## Testing / verification

- `npx tsc --noEmit` clean after each phase.
- Manual: visiting `/hackpack` with no cookie shows "not available" (403); visiting
  `/hackpack?k=<token>` sets the cookie and lands on the portal; reload of plain `/hackpack`
  stays unlocked.
- Manual: each tab renders; Check-in is the default tab; empty `AIRTABLE_EMBEDS` shows
  placeholders; setting a URL renders the iframe.

## Files

- `src/middleware.ts` — new, the gate.
- `src/components/sections/HackPackUnavailable.tsx` — new, the "not available" view.
- `src/lib/content.ts` — `PRIZES` → TBD.
- `src/lib/portal.ts` — new, `AIRTABLE_EMBEDS` (+ a note documenting `PORTAL_ACCESS_TOKEN`).
- `src/components/AirtableEmbed.tsx` — new.
- `src/components/sections/HackPackView.tsx` — add Check-in (default) / Milestones / Submit form tabs.
- `src/components/layout/SiteHeader.tsx` — remove Hack Pack nav link.
- `src/components/sections/ScheduleSection.tsx` — repoint CTA to Discord.
- `src/app/schedule/page.tsx` — drop the hackpack CTA.
- `.env.example` — new/updated, documents `PORTAL_ACCESS_TOKEN`.

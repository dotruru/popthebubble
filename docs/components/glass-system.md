# Glass Component System — Pop the Bubble

Five components. One material language.

All glass components are built on the `.glass` CSS class defined in `globals.css`. They share a frosted-glass aesthetic (backdrop blur, translucent background, inner specular highlights) tuned for the sky-gradient page background.

---

## 1. GlassSurface

**File:** `src/components/primitives/GlassSurface.tsx`  
**Role:** Base layer. All other glass containers delegate to this.

### When to use
- Wrapping arbitrary content in the glass material
- Directly when `GlassCard`'s opinionated padding/radius isn't wanted

### When not to use
- Interactive affordances that need hover lift — use `GlassCard`
- Labels / tags — use `GlassPill`

### Anatomy

```
┌─────────────────────────────────────────────┐  ← border (glass-border-light)
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │  ← ::before specular radial gradient
│ ░                                         ░ │
│ ░   [children]                            ░ │  ← content slot
│ ░                                         ░ │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────┘  ← ::after inner border (inset 1px)
```

The `::before` pseudo adds a radial highlight at the top-left corner — do not override `position: relative` or `overflow: hidden` on the component or it will escape bounds.

### Props / API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'clear' \| 'milk' \| 'blue' \| 'pink'` | `'default'` | No | Material tint |
| `className` | `string` | `''` | No | Appended to root element |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | No | Forwarded to `<div>` |

### Variants

| Variant | Background | Use when |
|---|---|---|
| `default` | `rgba(255,255,255, 0.42→0.12)` gradient | General containers on sky background |
| `clear` | `rgba(255,255,255, 0.14)` | Overlaid on busy imagery (hero) |
| `milk` | `rgba(248,243,232, 0.42)` — warm cream | Cards on mid-page sections |
| `blue` | sky-blue tint gradient | Accent callouts |
| `pink` | cupid-pink tint gradient | Accent callouts |

### States

| State | Behaviour |
|---|---|
| Default | Backdrop blur 24px, saturate 1.35 |
| No backdrop-filter support | Translucent background still visible; graceful degradation |

### Accessibility
- Renders as a `<div>` — assign `role`, `aria-label`, or semantic HTML via children
- No implicit ARIA role; callers are responsible for semantics

---

## 2. GlassCard

**File:** `src/components/primitives/GlassCard.tsx`  
**Role:** The primary container for sectioned content (sponsor tiles, timeline steps, team members). Wraps `GlassSurface` with opinionated defaults and hover lift.

### When to use
- Any discrete content block that should feel like a physical card
- Grids of comparable items (team members, sponsors, timeline steps)

### When not to use
- Full-bleed sections — use `GlassSurface` or a raw `.glass` div
- Inline labels — use `GlassPill`

### Anatomy

```
┌─── GlassSurface (rounded-2xl, p-8) ────────┐
│                                             │
│   [children]                                │
│                                             │
└─────────────────────────────────────────────┘
         ↑ hover: translateY(-4px) + shadow lift
```

### Props / API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'default' \| 'clear' \| 'milk' \| 'blue' \| 'pink'` | `'default'` | No | Passed to GlassSurface |
| `className` | `string` | `''` | No | Appended; use `!p-*` to override default `p-8` |
| `...rest` | `HTMLAttributes<HTMLDivElement>` | — | No | Forwarded to root |

**Padding override pattern:** The component sets `p-8` by default. Override with Tailwind's `!` modifier:
```tsx
<GlassCard className="!p-4">  {/* compact card */}
<GlassCard className="!p-6">  {/* medium card */}
```

### States

| State | CSS class | Effect |
|---|---|---|
| Default | `.interactive-glass` | No transform |
| Hover | `.interactive-glass:hover` | `translateY(-4px)`, `box-shadow: var(--glass-shadow)` |
| Focus-visible | Browser default ring | No custom override — TODO: add custom focus ring |

**Transition:** `transform 180ms ease-soft`, `box-shadow 180ms ease-soft`

### Behaviour
- Hover lift applies to all cards. If a card should not be interactive (purely decorative), add `className="pointer-events-none"` or override with `style={{ transform: 'none' }}`
- Cards in a grid do not push siblings when they lift — the lift is visual only

### Accessibility
- Renders as `<div>` — not a focusable element by default
- If the card itself is a link or button, wrap children in an `<a>` or `<button>`, not the card

---

## 3. GlassPill

**File:** `src/components/primitives/GlassPill.tsx`  
**Role:** Compact inline label for step indexes, track numbers, and metadata badges.

### When to use
- Step/index numbers (`01`, `02`)
- Short metadata labels ("Founding Partner")
- Decorative chips inside cards

### When not to use
- Full sentences
- Interactive badges (no click handler — use a `<button>` with `.glass` class directly)

### Anatomy

```
╭────────────────╮
│  .meta   text  │  ← glass material, rounded-full, px-3 py-1
╰────────────────╯
```

Uses `.meta` typography (mono, 0.78rem, uppercase, tracking 0.08em).

### Props / API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `children` | `ReactNode` | — | Yes | Label content |
| `className` | `string` | `''` | No | Appended to root |
| `...rest` | `HTMLAttributes<HTMLSpanElement>` | — | No | Forwarded to `<span>` |

### States
No interactive states. Static display element.

### Accessibility
- Renders as `<span>` — inline, non-interactive
- If used as a status indicator, add `aria-label` to parent or use `aria-describedby`

---

## 4. GlassButton

**File:** `src/components/primitives/GlassButton.tsx`  
**Role:** Primary call-to-action. Renders as `<a>` when `href` is provided, `<button>` otherwise.

### When to use
- Page-level CTAs (Apply, Sponsor)
- Any actionable element that needs the glass treatment

### When not to use
- Destructive actions (no `danger` variant exists)
- Icon-only actions (no `icon` variant — use a raw `<button>` with `.glass-button` class)

### Anatomy

```
╭─────────────────────────────────────────────╮
│  [children label]                           │
╰─────────────────────────────────────────────╯
    ↑ border + inner highlight ring
    backdrop-filter: blur(20px) saturate(1.35)
    min-height: 3.25rem, border-radius: 999px
```

### Props / API

| Prop | Type | Default | Required | Description |
|---|---|---|---|---|
| `variant` | `'primary' \| 'secondary'` | `'primary'` | No | Visual weight |
| `href` | `string` | — | No | If set, renders `<a>` |
| `className` | `string` | `''` | No | Appended to root |
| `...rest` | `ButtonHTMLAttributes` or `AnchorHTMLAttributes` | — | No | Forwarded depending on element type |

**Element switching:**
- `href` present → `<a href={href} ...>` (follow normal anchor attributes: `target`, `rel`)
- `href` absent → `<button type="button" ...>`

### Variants

| Variant | Background | Use when |
|---|---|---|
| `primary` | `rgba(255,255,255,0.76) → rgba(107,177,173,0.34)` | First/preferred action on a surface |
| `secondary` | `rgba(255,255,255,0.46) → rgba(255,255,255,0.16)` | Supporting action alongside a primary |

**Rule:** Only one `primary` button per viewport focal point. When CTA pairs appear (Apply + Sponsor), Apply is `primary`, Sponsor is `secondary`.

### States

| State | Effect |
|---|---|
| Default | Box shadow: 10px 28px at 14% opacity |
| Hover | `translateY(-2px)`, larger shadow + sky-blue glow ring |
| Active | `translateY(0) scale(0.985)` |
| Disabled | No explicit disabled style defined — TODO |
| Focus-visible | Browser default outline — TODO: custom ring |

**Transitions:** `transform 180ms var(--ease-soft)`, `box-shadow 180ms var(--ease-soft)`

### Behaviour
- When rendered as `<a>` with an external URL, add `target="_blank" rel="noopener noreferrer"` — the component does not add these automatically
- Label text is not truncated — keep labels ≤ 4 words

### Accessibility
- `<button>` variant: no `type` set by default — **always set `type="button"` inside forms** to prevent accidental form submission
- `<a>` variant: if `target="_blank"`, consider adding `aria-label` with "opens in new tab" for screen readers
- Minimum touch target: 3.25rem height (`~52px`) — meets WCAG 2.5.5 AAA

### Content rules
- Use action verbs: "Apply", "Sponsor", "Apply now", "Become a Partner →"
- Trailing arrow `→` is optional but used on primary CTAs with directional intent
- Do not use ALL CAPS (the `.glass-button` font is already weighted at 720)

---

## 5. SponsorDialog

**File:** `src/components/SponsorDialog.tsx`  
**Role:** A two-step modal that lets potential sponsors select a tier and send a pre-filled email inquiry.

### When to use
Wrap any element that should trigger the sponsor contact flow.

### When not to use
- Non-sponsor contact flows (email the general inbox directly instead)
- Contexts where `window.open(mailto:...)` is blocked (native apps, some browser privacy modes)

### Anatomy

```
[Trigger child]  ← DialogTrigger wraps any child via `asChild`
      ↓
┌─── Dialog (shadcn) ──────────────────────────────────┐
│  max-w-xl, max-h-90vh, overflow-y-auto               │
│                                                      │
│  Step 1: Tier selection                              │
│  ┌── [01] Diamond ──────────────────────────────┐   │
│  │  · Perk 1 — detail                           │   │
│  │  · Perk 2 — detail                           │   │
│  └──────────────────────────────────────────────┘   │
│  ┌── [02] Gold ─────────────────────────────────┐   │
│  └──────────────────────────────────────────────┘   │
│  ┌── [03] Silver ───────────────────────────────┐   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Step 2: Contact form                                │
│  ← Back to tiers                                     │
│  [Full name]  [Work email]                           │
│  [Company]    [Website]                              │
│  [Send enquiry — Diamond →]                          │
└──────────────────────────────────────────────────────┘
```

### Props / API

| Prop | Type | Required | Description |
|---|---|---|---|
| `children` | `ReactNode` | Yes | Trigger element — must accept ref and event props |

No other props. Tier data comes from `SPONSOR_TIERS` in `src/lib/content.ts`.

### State machine

```
closed
  ↓ trigger click
step 1 (tier selection)
  ↓ tier click
step 2 (contact form) — selectedTier set
  ↓ form submit
  → opens mailto: in new tab
  → dialog closes, state resets to step 1
  
  ↓ "Back to tiers"
step 1 (tier selection preserved)

  ↓ dialog dismissed (Esc / overlay click / X)
closed — all state reset
```

### Behaviour

**Form submission:** Does not call an API. Builds a `mailto:` URI and opens it with `window.open()`. The user's email client handles sending. This is intentional — no server required.

**State reset:** On every close (regardless of path), `step`, `selectedTier`, and `form` all reset to initial values.

**Scrolling:** Dialog has `max-h-[90vh] overflow-y-auto`. On mobile, the tier list with all perks may require scrolling.

**Tier border colours:** Sky-blue (Diamond), amber (Gold), slate (Silver). These are hardcoded in `TIER_BORDER` — not driven by `content.ts`.

### Keyboard navigation
| Key | Effect |
|---|---|
| `Enter` / `Space` on trigger | Opens dialog |
| `Tab` | Moves focus through tier buttons / form fields |
| `Esc` | Closes dialog, resets state |
| `Enter` on tier button | Selects tier, advances to step 2 |
| `Enter` on submit | Submits form if valid |

Focus returns to the trigger element on close (shadcn Dialog default).

### Accessibility
- `DialogTitle` and `DialogDescription` are present on both steps — screen readers announce context correctly
- Tier buttons are native `<button>` elements — fully keyboard accessible
- Form fields all have associated `<Label htmlFor>` — no unlabelled inputs
- `website` input is not `required` — users without a website are not blocked

### Known gaps
- No loading/error state if `window.open` is blocked by a popup blocker
- `TIER_BORDER` colours are hardcoded rather than derived from `content.ts` — if tiers are renamed, borders silently fall back to a neutral style
- No `type="button"` on the tier select buttons (safe here since there's no wrapping `<form>` on step 1, but worth noting)

---

## Usage matrix

| Component | Used in |
|---|---|
| `GlassButton` | `SiteHeader`, `HeroSection`, `SponsorsSection`, `FooterLandscape`, `SponsorDialog` (submit) |
| `GlassCard` | `CohortSection` (team), `TimelineSection` (steps), `SponsorsSection` (logo tiles) |
| `GlassPill` | `TimelineSection` (step index), `CohortSection` (stats) |
| `GlassSurface` | via `GlassCard` only |
| `SponsorDialog` | `HeroSection`, `SponsorsSection`, `FooterLandscape` |

## Open TODOs

1. `GlassButton` — no disabled style; add `.glass-button:disabled { opacity: 0.45; pointer-events: none }`
2. `GlassButton` + `GlassCard` — no custom `:focus-visible` ring; browser default outline is unstyled against glass backgrounds
3. `SponsorDialog` — `TIER_BORDER` map should be driven by a `color` field on each tier in `SPONSOR_TIERS` (content.ts), not a hardcoded object keyed by tier name
4. `GlassButton` rendered as `<a>` — does not auto-add `rel="noopener noreferrer"` for external links; callers must add manually

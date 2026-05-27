# iOS Overscroll — Grass Background Fix

## Problem
On iOS Safari, overscrolling past the footer (rubber-band) or the collapsing toolbar on newer iPhones reveals the `body { background: var(--sky-bottom) }` blue behind the grass footer image.

## Solution

### 1. `html` background — grass image extends downward
Set the grass JPEG as the `html` element's background, positioned at the bottom. When iOS reveals the area beneath the page, it shows the grass image rather than the blue sky colour.

- Mobile: `url('/footer_mobile.jpg')`
- Desktop (≥768px): `url('/footer_desktop.jpg')`
- Fallback colour: `#3c7a1a` (approximate dominant grass green)

### 2. Safe-area inset — footer padding
On newer iPhones (home indicator / Dynamic Island), the viewport shrinks when the address bar collapses, revealing a gap. Fix:
- Add `viewport-fit=cover` via Next.js `Viewport` export in `layout.tsx`
- Add `padding-bottom: env(safe-area-inset-bottom)` to `.footer-grass` in CSS

## Files changed
- `src/app/layout.tsx` — add `export const viewport: Viewport`
- `src/styles/globals.css` — `html` background, `.footer-grass` padding

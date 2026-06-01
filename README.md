# Pop the Bubble

Landing page for **Pop the Bubble** — a 36-hour hackathon produced by [Hackhouse London](https://hackhouse.uk).

> 80 builders. £10,000 first prize. Judged on real-world impact, not slides.
> London · 5–7 June 2026.

## Stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- [Motion](https://motion.dev/) for animation
- Radix UI / shadcn primitives
- Jest + Testing Library

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

| Command         | Does                          |
| --------------- | ----------------------------- |
| `npm run dev`   | Start the dev server          |
| `npm run build` | Production build              |
| `npm run start` | Serve the production build    |
| `npm run lint`  | Lint with ESLint              |
| `npm run test`  | Run the Jest test suite       |

## Project shape

```
src/
  app/                 # Next.js App Router entry (layout, page, metadata)
  components/
    sections/          # Page sections (Hero, Tracks, Timeline, Cohort, Sponsors, FAQ, Footer)
    layout/            # SiteHeader and other layout chrome
    ui/                # Reusable primitives (accordion, button, …)
  lib/
    content.ts         # Single source of truth for all copy and event data
  styles/
    globals.css        # Global styles and component CSS
public/                # Images, logos, fonts
```

### Editing content

All event details, copy, team, sponsors, and FAQ live in [`src/lib/content.ts`](src/lib/content.ts). Change copy there rather than in components.

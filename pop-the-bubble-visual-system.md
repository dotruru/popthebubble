# Pop the Bubble — Visual System & Frontend Build Notes

## Status

This document collects the current visual direction, typography, background strategy, liquid glass treatment, component rules, and implementation notes for the **Pop the Bubble** landing page.

It is intended to be used by frontend developers, designers, and anyone generating or preparing visual assets.

---

## 1. Core direction

### One-line art direction

**A dreamy sky-and-meadow world with liquid glass UI, anchored by a moving little-planet hero and a sharp editorial hackathon voice.**

The site should feel atmospheric and soft, but the content should remain precise and readable.

### Keywords

- dreamy
- sky
- meadow
- liquid glass
- pastel
- editorial
- technical
- sharp
- airy
- tactile

### Avoid

- generic SaaS landing page
- hard neon hacker visuals
- overcomplicated background systems
- too many section breaks
- every surface being equally busy
- low-contrast thin text
- childish bubble graphics
- corporate gradient blobs

---

## 2. Content source

The canonical event content comes from `CONTENT.md`.

Important canon facts:

- Event name: **Pop the Bubble**
- Producer: **Hackhouse London**
- Format: **36-hour in-person hackathon**
- Edition: **Issue 01 · Spring 2026**
- Dates: **Friday 5 – Sunday 7 June 2026**
- Location: **London**
- First prize: **£10,000**
- Cohort size: **80 builders**
- Positioning: **Judged on real-world impact, not slides**
- Primary CTA: **Apply**
- Secondary CTA: **Sponsor**

The landing page should not include every detail from `CONTENT.md`. It should prioritize conversion and atmosphere.

---

## 3. Final simplified page structure

Use a simpler structure than a normal information-heavy landing page.

```txt
01. Moving hero
02. Marquee strip
03. Main content over sky background
04. Tracks
05. Judging
06. The room / cohort
07. Timeline
08. Sponsors
09. FAQ
10. Footer with ground/meadow returning
```

### Removed or compressed

The standalone pitch section can be removed.

Facts should be folded into the hero, marquee, and small glass pills.

Venue details should appear in the timeline or FAQ, not as a large independent section.

---

## 4. Typography

### Final font system

```css
:root {
  --font-hero: "Imperial Script", cursive;
  --font-sans: "Geist", Inter, system-ui, sans-serif;
  --font-mono: "Geist Mono", "Space Mono", ui-monospace, monospace;
}
```

### Font roles

#### Imperial Script Regular

Use only for the hero wordmark:

```txt
Pop The Bubble
```

Rules:

- Use it very large.
- Do not use it for body copy.
- Do not use it for section headings unless intentionally decorative.
- Treat it as a logo/wordmark, not as normal text.
- It should sit above the rest of the design hierarchy.

Suggested CSS:

```css
.hero-wordmark {
  font-family: var(--font-hero);
  font-size: clamp(5.5rem, 15vw, 15rem);
  line-height: 0.78;
  font-weight: 400;
  letter-spacing: -0.04em;
}
```

#### Geist Sans

Use for almost everything else:

- nav
- buttons
- cards
- FAQ
- track titles
- judging cards
- timeline cards
- body copy
- section headings

Why:

- readable inside liquid glass
- modern but not cold
- technical without looking corporate
- strong enough against a vibrant background

Suggested CSS:

```css
body {
  font-family: var(--font-sans);
  color: var(--ink);
  font-size: 16px;
  line-height: 1.5;
}
```

Section headings:

```css
.section-title {
  font-family: var(--font-sans);
  font-size: clamp(2.4rem, 6vw, 5.5rem);
  line-height: 0.95;
  letter-spacing: -0.055em;
  font-weight: 760;
}
```

Body copy:

```css
.body-copy {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 1.4vw, 1.18rem);
  line-height: 1.55;
  letter-spacing: -0.015em;
  font-weight: 430;
}
```

Inside glass panels, text can be slightly heavier:

```css
.glass-card p {
  font-weight: 480;
}
```

#### Geist Mono

Use sparingly for:

- dates
- issue labels
- marquee
- tiny metadata
- track numbers
- technical chips

Suggested CSS:

```css
.meta,
.marquee {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  line-height: 1;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 500;
}
```

---

## 5. Hero wordmark effect

The desired hero title effect is:

```txt
script font
+
pastel gradient fill
+
white outer rim
+
soft dark depth shadow
+
subtle glossy highlight
```

### Recommended production path

Start with live layered HTML/CSS. Later, after the exact wordmark is locked, export it as inline SVG paths.

#### Phase 1: live CSS text

```tsx
<h1 className="hero-logo" aria-label="Pop The Bubble">
  <span className="hero-logo__stroke" aria-hidden="true">Pop The Bubble</span>
  <span className="hero-logo__fill">Pop The Bubble</span>
  <span className="hero-logo__shine" aria-hidden="true">Pop The Bubble</span>
</h1>
```

```css
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
  background:
    linear-gradient(
      105deg,
      #7ee0df 0%,
      #9bc9ff 24%,
      #c88fe7 44%,
      #f19ab5 61%,
      #f6d5a4 78%,
      #b9e89a 100%
    );
  -webkit-background-clip: text;
  background-clip: text;
  filter:
    drop-shadow(0 1px 0 rgba(255, 255, 255, 0.7))
    drop-shadow(0 -1px 1px rgba(88, 72, 120, 0.22));
  z-index: 2;
}

.hero-logo__shine {
  color: transparent;
  background:
    linear-gradient(
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
}
```

#### Optional shimmer

Use very subtly.

```css
.hero-logo__fill {
  background-size: 180% 100%;
  animation: wordmark-gradient-drift 12s ease-in-out infinite;
}

.hero-logo__shine {
  animation: wordmark-shine-breathe 8s ease-in-out infinite;
}

@keyframes wordmark-gradient-drift {
  0%, 100% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }
}

@keyframes wordmark-shine-breathe {
  0%, 100% {
    opacity: 0.55;
    transform: translateY(-0.035em);
  }

  50% {
    opacity: 0.85;
    transform: translateY(-0.055em);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-logo__fill,
  .hero-logo__shine {
    animation: none;
  }
}
```

#### Phase 2: final SVG wordmark

When the hero title is final:

1. Set the title in Imperial Script Regular in Figma or Illustrator.
2. Manually adjust spacing and overlaps.
3. Convert text to outlines/paths.
4. Export as SVG.
5. Inline the SVG in React.
6. Apply gradient, filters, and subtle animation in code.

Do not use a Photoshop PNG as the primary production wordmark unless the title becomes a heavily painted custom graphic.

---

## 6. Palette

The palette should be minimal because the background itself will provide most of the color.

### Recommended tokens

```css
:root {
  /* world / art colors */
  --sky-blue: #8DCCF3;
  --veranda-blue: #6BB1AD;
  --grass-green: #8CCB63;
  --melon-pink: #E5A9A9;
  --cupid-pink: #E6748E;

  /* neutrals */
  --lychee: #EDECDB;
  --cream: #F8F3E8;
  --ink: #202020;

  /* accent */
  --vermillion: #FF4A32;
}
```

### Usage guidance

- `--sky-blue`: main environmental color.
- `--veranda-blue`: glass tint, secondary CTA, cool accents.
- `--grass-green`: mostly background and footer ground.
- `--melon-pink`: soft glows, hover warmth.
- `--cupid-pink`: sparing active states.
- `--lychee` / `--cream`: readable glass surfaces.
- `--ink`: main text.
- `--vermillion`: tiny punctuation only, such as `✦`, small dots, deadline details.

### Important

Do not use all colors equally.

Recommended ratio:

```txt
60% sky / grass / cream from the background
20% glass whites and pale tints
10% ink text
7% veranda / melon
3% cupid pink / vermillion accents
```

---

## 7. Background strategy

### Final decision

Do not create one giant long background image.

Use this simple structure:

```txt
moving hero
↓
open sky background
↓
footer meadow / green ground
```

### Immediate v1

The post-hero area should just be a sky gradient.

```css
:root {
  --sky-top: #80c6f1;
  --sky-mid: #9ed4f6;
  --sky-bottom: #dff1fb;
}

.page-after-hero {
  position: relative;
  background:
    linear-gradient(
      to bottom,
      var(--sky-top) 0%,
      var(--sky-mid) 38%,
      var(--sky-bottom) 100%
    );
}
```

### Hero-to-sky transition

Add a soft transition after the moving hero.

```css
.page-after-hero::before {
  content: "";
  position: absolute;
  top: -120px;
  left: 0;
  right: 0;
  height: 180px;
  pointer-events: none;
  background:
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(210, 236, 248, 0.55) 55%,
      rgba(223, 241, 251, 0.95) 100%
    );
  filter: blur(12px);
}
```

### Footer ground

Bring the green ground/meadow back only near the footer.

```tsx
<main className="page-after-hero">
  <section className="content-sections">
    {/* tracks, judging, timeline, FAQ */}
  </section>

  <footer className="footer-landscape">
    {/* final CTA / footer content */}
  </footer>
</main>
```

```css
.footer-landscape {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 8rem 2rem 3rem;
  overflow: hidden;
}

.footer-landscape::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
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
  height: 70%;
  background-image: url("/images/footer-ground.webp");
  background-repeat: no-repeat;
  background-position: bottom center;
  background-size: cover;
  pointer-events: none;
}
```

### Optional clouds

Add clouds later as separate overlays, not baked into the whole page.

```css
.cloud-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image:
    url("/images/cloud-01.webp"),
    url("/images/cloud-02.webp");
  background-repeat: no-repeat, no-repeat;
  background-position: top 12% left 10%, top 34% right 6%;
  background-size: 340px auto, 420px auto;
  opacity: 0.34;
  filter: blur(2px);
}
```

Optional subtle cloud motion:

```css
@keyframes cloudFloat {
  0%, 100% {
    transform: translateX(0) translateY(0);
  }

  50% {
    transform: translateX(10px) translateY(-6px);
  }
}
```

### Asset guidance

Use:

```txt
hero video / moving image asset: WebM or MP4
background stills: AVIF or WebP
transparent overlays: WebP or PNG with alpha
footer ground: WebP/AVIF
```

Suggested files:

```txt
/images/hero-little-planet.webm
/images/hero-little-planet-poster.webp
/images/footer-ground.webp
/images/cloud-01.webp
/images/cloud-02.webp
/images/bubble-overlay-01.webp
```

---

## 8. Hero section

### Structure

```tsx
<section className="hero">
  <HeroMotionBackground />
  <div className="hero-title-wrap">
    <HeroWordmark />
    <p className="hero-subtitle">
      80 builders. £10,000. Judged on real-world impact.
    </p>
    <div className="hero-actions">
      <GlassButton href="/apply">Apply</GlassButton>
      <GlassButton href="mailto:contact@hackhouse.uk" variant="secondary">
        Sponsor
      </GlassButton>
    </div>
  </div>
</section>
```

### Hero copy

Recommended:

```txt
Pop The Bubble

80 builders. £10,000. Judged on real-world impact.

[Apply] [Sponsor]
```

Alternative:

```txt
Pop The Bubble

A 36-hour hackathon for builders who'd rather ship than pitch.

[Apply] [Sponsor]
```

### Hero background motion

The hero should breathe, not spin aggressively.

```ts
const heroMotion = {
  scale: [0.985, 1.02, 0.985],
  y: [0, -6, 0],
  rotate: [0, 0.75, 0],
  duration: 12,
  repeat: Infinity,
  ease: "easeInOut"
};
```

CSS-only version:

```css
.hero-planet {
  animation: heroPlanetBreathe 12s ease-in-out infinite;
}

@keyframes heroPlanetBreathe {
  0%, 100% {
    transform: scale(0.985) translateY(0) rotate(0deg);
  }

  50% {
    transform: scale(1.02) translateY(-6px) rotate(0.75deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-planet {
    animation: none;
  }
}
```

---

## 9. Liquid glass material system

Liquid glass should feel like wet acrylic, bubbles, lenses, and translucent UI.

It should not just be `backdrop-filter: blur(...)`.

### Core glass tokens

```css
:root {
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
}
```

### Default glass surface

```css
.glass {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(
      135deg,
      rgb(255 255 255 / 0.42),
      rgb(255 255 255 / 0.12)
    );
  border: 1px solid var(--glass-border-light);
  box-shadow: var(--glass-shadow-soft);
  backdrop-filter: blur(24px) saturate(1.35);
  -webkit-backdrop-filter: blur(24px) saturate(1.35);
}
```

### Glass highlight layer

```css
.glass::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  background:
    radial-gradient(
      circle at 24% 0%,
      rgb(255 255 255 / 0.62),
      transparent 34%
    ),
    linear-gradient(
      135deg,
      rgb(255 255 255 / 0.32),
      transparent 42%
    );
  mix-blend-mode: screen;
}
```

### Glass edge layer

```css
.glass::after {
  content: "";
  position: absolute;
  inset: 1px;
  pointer-events: none;
  border-radius: inherit;
  border: 1px solid rgb(255 255 255 / 0.22);
}
```

### Glass variants

#### Clear glass

```css
.glass--clear {
  background: rgb(255 255 255 / 0.14);
  border-color: rgb(255 255 255 / 0.42);
}
```

#### Milk glass

```css
.glass--milk {
  background: rgb(248 243 232 / 0.42);
  border-color: rgb(255 255 255 / 0.58);
}
```

#### Blue glass

```css
.glass--blue {
  background:
    linear-gradient(
      135deg,
      rgb(141 204 243 / 0.32),
      rgb(107 177 173 / 0.18)
    );
  border-color: rgb(255 255 255 / 0.46);
}
```

#### Pink glass

```css
.glass--pink {
  background:
    linear-gradient(
      135deg,
      rgb(229 169 169 / 0.36),
      rgb(230 116 142 / 0.18)
    );
  border-color: rgb(255 255 255 / 0.42);
}
```

---

## 10. Liquid glass buttons

### Base

```css
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

  background:
    linear-gradient(
      135deg,
      rgb(255 255 255 / 0.62),
      rgb(255 255 255 / 0.22)
    );
  border: 1px solid rgb(255 255 255 / 0.58);
  box-shadow:
    0 10px 28px rgb(32 32 32 / 0.14),
    inset 0 1px 0 rgb(255 255 255 / 0.66);
  backdrop-filter: blur(20px) saturate(1.35);
  -webkit-backdrop-filter: blur(20px) saturate(1.35);

  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;
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
```

### Primary CTA

```css
.glass-button--primary {
  background:
    linear-gradient(
      135deg,
      rgb(255 255 255 / 0.76),
      rgb(107 177 173 / 0.34)
    );
}
```

### Secondary CTA

```css
.glass-button--secondary {
  background:
    linear-gradient(
      135deg,
      rgb(255 255 255 / 0.46),
      rgb(255 255 255 / 0.16)
    );
}
```

---

## 11. Component inventory

### Core primitives

```tsx
<GlassSurface />
<GlassButton />
<GlassCard />
<GlassPill />
<GlassNav />
<GlassAccordion />
<GlassTimelineNode />
<GlassMarquee />
```

### Landing composites

```tsx
<HeroSection />
<HeroWordmark />
<MarqueeStrip />
<TracksSection />
<TrackCard />
<JudgingSection />
<JudgingCard />
<CohortSection />
<TimelineSection />
<TimelineStep />
<SponsorsSection />
<FAQSection />
<FinalCTA />
<FooterLandscape />
```

---

## 12. Recommended component behavior

### Header

- sticky
- transparent over hero
- glass background after scroll
- minimal nav

```tsx
<SiteHeader>
  <Logo>Hackhouse London</Logo>
  <nav>
    <a href="#tracks">Tracks</a>
    <a href="#judging">Judging</a>
    <a href="#timeline">Timeline</a>
    <a href="#faq">FAQ</a>
  </nav>
  <GlassButton href="/apply">Apply</GlassButton>
</SiteHeader>
```

### Marquee

Use the canonical strip:

```txt
5–7 June 2026 ✦ Pop the bubble ✦ 36-hour hackathon ✦ London ✦ £10,000 first prize ✦ 80 builders ✦ Apply now ✦ Hackhouse London ✦ Issue 01
```

Use Geist Mono.

### Track cards

Use glass cards with strong title typography.

```tsx
<TrackCard
  index="01"
  title="Outbuild."
  body="Find a slow, bloated product. Ship the sharper version. Steal their users before Sunday."
  chip="Judged on users switched"
/>
```

### Judging cards

Short and blunt.

```txt
Economic exchange
Did anyone pay?

Rejections
Proof you asked.

Real-world impact
Is something measurably different on Monday?
```

### Timeline

Use floating glass nodes, not a heavy corporate process diagram.

```txt
Apply → Confirmed → Build → Demo Day
```

### FAQ

Use a glass accordion with low-height headers and soft expansion.

---

## 13. Motion rules

Motion should feel like slow air, water, and breathing.

### Use motion for

- hero planet breathing
- soft wordmark shimmer
- cloud drift
- bubble drift
- hover lift on glass cards
- marquee scroll
- section reveal

### Avoid

- fast bouncing
- excessive parallax
- spinning bubbles
- neon hover explosions
- scroll hijacking that makes the page hard to use

### Motion timing

```css
:root {
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-liquid: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 180ms;
  --duration-medium: 420ms;
  --duration-slow: 1200ms;
}
```

Hover:

```css
.interactive-glass {
  transition:
    transform var(--duration-fast) var(--ease-soft),
    box-shadow var(--duration-fast) var(--ease-soft),
    border-color var(--duration-fast) var(--ease-soft);
}

.interactive-glass:hover {
  transform: translateY(-4px);
}
```

Respect reduced motion:

```css
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

---

## 14. Readability rules

This site has a vivid background, so text must be protected.

### Rules

- Use heavier text weights inside glass.
- Avoid thin gray text.
- Prefer `--ink` over light gray.
- Use soft glass halos behind important text.
- Keep content blocks short.
- Keep cards away from the most visually dense background zones.

### Hero halo

```css
.hero-title-wrap {
  position: relative;
}

.hero-title-wrap::before {
  content: "";
  position: absolute;
  inset: -12% -8%;
  z-index: -1;
  border-radius: 999px;
  background:
    radial-gradient(
      ellipse at center,
      rgba(255, 255, 255, 0.42),
      rgba(255, 255, 255, 0.16) 42%,
      rgba(255, 255, 255, 0) 72%
    );
  filter: blur(24px);
}
```

---

## 15. Layout rules

### Global section spacing

```css
.section {
  position: relative;
  padding-block: clamp(5rem, 12vw, 11rem);
  padding-inline: clamp(1rem, 4vw, 4rem);
}
```

### Content width

```css
.container {
  width: min(100% - 2rem, 1180px);
  margin-inline: auto;
}
```

### Glass cards grid

```css
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
```

### Avoid full-width white boxes

The background is part of the identity. Cards should float, not cover the world.

---

## 16. Suggested frontend stack

Best practical stack:

```txt
Next.js
Tailwind CSS
motion
Radix UI
shadcn/ui as scaffold only
Lenis optional
```

### Use Radix for

- accordion
- dialog
- popover
- tabs
- navigation menu

### Use motion for

- hero loop
- section reveals
- hover microinteractions
- background overlays

### Use shadcn/ui for

- scaffolding
- accessible component starts
- not for final styling defaults

The final site should not look like shadcn. It should look custom.

---

## 17. Implementation order

Build in this order:

```txt
01. Set fonts and global tokens
02. Build static hero with live CSS wordmark
03. Add moving hero background
04. Add post-hero sky gradient
05. Add glass button primitive
06. Add glass card primitive
07. Build marquee
08. Build tracks
09. Build judging
10. Build timeline
11. Add FAQ
12. Add footer ground
13. Add optional clouds/bubbles
14. Convert final wordmark to SVG paths if needed
15. Performance pass
16. Mobile pass
```

---

## 18. Performance rules

- Use `AVIF` or `WebP` for background stills.
- Use `WebM` where possible for video.
- Provide a poster image for hero video.
- Do not autoplay huge videos on mobile without fallback.
- Use responsive images.
- Lazy-load below-the-fold overlays.
- Avoid too many simultaneous `backdrop-filter` surfaces.
- Use glass on important components, not hundreds of tiny nodes.
- Test on Safari early because glass/backdrop behavior can differ.

---

## 19. Accessibility rules

- Keep hero wordmark accessible with `aria-label`.
- Do not rely on the script wordmark as the only readable text for key event facts.
- Use semantic headings.
- Keep buttons real links or buttons.
- Respect `prefers-reduced-motion`.
- Ensure glass cards have enough contrast.
- Do not place body copy directly over high-detail grass or bubbles.
- Provide a non-video fallback poster for the hero.

---

## 20. Final creative direction summary

The site should not feel like a traditional hackathon page.

It should feel like:

```txt
a little London planet opens
then the site breathes into sky
glass UI floats above it
the voice stays sharp
the footer lands back in grass
```

The visual system is soft.

The copy is not.

That tension is the identity.

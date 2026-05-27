'use client'

import dynamic from 'next/dynamic'
import { GlassButton } from '@/components/primitives'
import { EVENT } from '@/lib/content'

const SponsorDialog = dynamic(
  () => import('@/components/SponsorDialog').then(m => ({ default: m.SponsorDialog })),
  { ssr: false },
)

export function HeroSection() {
  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Fallback gradient — sits behind videos */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, var(--sky-top), var(--veranda-blue))',
            zIndex: 0,
          }}
          aria-hidden="true"
        />
        {/* Wide video (landscape, md+) */}
        <video
          className="hidden md:block absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-wide-poster.jpg"
        >
          <source src="https://pub-045a5053b3b642659d08f6f537fcd459.r2.dev/hero-wide-opt.mp4" type="video/mp4" />
        </video>
        {/* Tall video (portrait/mobile) */}
        <video
          className="block md:hidden absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 1 }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-tall-poster.jpg"
        >
          <source src="https://pub-045a5053b3b642659d08f6f537fcd459.r2.dev/hero-tall-opt.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Scrim */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'rgba(10, 20, 35, 0.18)' }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="hero-title-wrap relative z-10 flex flex-col items-center text-center px-4">
        <h1 className="hero-logo" aria-label="Pop The Bubble">
          <span className="hero-logo__stroke" aria-hidden="true">Pop The Bubble</span>
          <span className="hero-logo__fill">Pop The Bubble</span>
          <span className="hero-logo__shine" aria-hidden="true">Pop The Bubble</span>
        </h1>

        <p
          className="body-copy mt-6 mb-8 max-w-md"
          style={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 8px rgba(0,0,0,0.32)' }}
        >
          the most high-signal hackathon in London. 5–7 June.
        </p>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <GlassButton href={EVENT.applyHref} variant="primary" target="_blank" rel="noopener noreferrer">Apply</GlassButton>
          <SponsorDialog>
            <GlassButton variant="secondary">Sponsor</GlassButton>
          </SponsorDialog>
        </div>
      </div>
    </section>
  )
}

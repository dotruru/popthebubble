import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HackPackView } from '@/components/sections/HackPackView'

export const metadata: Metadata = {
  title: 'Hacker Pack — Pop the Bubble',
  description: 'Everything you need to build, ship, and win at Pop the Bubble — schedule, tracks, rules, judging, prizes, food and more.',
}

export default function HackPackPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section
          style={{
            background: '#202020',
            color: '#fff',
            paddingBlock: '7rem 3rem',
            paddingInline: 'var(--margin-page)',
          }}
        >
          <div className="container">
            <p className="meta" style={{ opacity: 0.6 }}>Issue 01 · 5–7 June 2026 · London</p>
            <h1 className="section-title mt-3" style={{ color: '#fff' }}>Hacker Pack.</h1>
            <p className="body-copy mt-4" style={{ color: '#fff', opacity: 0.8, maxWidth: '50ch' }}>
              Everything you need to build, ship, and win. Tap a tab — read only what you need.
            </p>
          </div>
        </section>
        <div className="page-after-hero">
          <HackPackView />
        </div>
      </main>
    </>
  )
}

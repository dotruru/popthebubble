'use client'

import Image from 'next/image'
import { GlassCard } from '@/components/primitives'
import dynamic from 'next/dynamic'

const SponsorDialog = dynamic(
  () => import('@/components/SponsorDialog').then(m => ({ default: m.SponsorDialog })),
  { ssr: false },
)
import { SPONSORS } from '@/lib/content'

export function SponsorsSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title mb-4">Partners.</h2>
        <p className="body-copy mb-12" style={{ opacity: 0.6, maxWidth: '48ch' }}>
          The companies backing the builders.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SPONSORS.map((sponsor, i) => (
            <GlassCard key={i} variant="milk" className="!p-6 flex flex-col gap-5 min-h-[9rem]">
              <p
                className="meta"
                style={{ opacity: 0.4, fontFamily: 'var(--font-mono)', letterSpacing: '0.14em', fontSize: '0.65rem' }}
              >
                {sponsor.label.toUpperCase()}
              </p>

              {sponsor.logo ? (
                <div className="relative" style={{ height: 44, width: '100%' }}>
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    sizes="180px"
                    style={{ objectFit: 'contain', objectPosition: 'left center', filter: 'brightness(0)' }}
                  />
                </div>
              ) : (
                <div
                  style={{
                    height: 44,
                    borderRadius: '0.375rem',
                    border: '1.5px dashed rgb(255 255 255 / 0.3)',
                  }}
                />
              )}
            </GlassCard>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-8 flex-wrap">
          <div className="flower-btn-wrap">
            <SponsorDialog>
              <button className="flower-btn">
                <span className="flower-btn__text">Become a Partner →</span>
              </button>
            </SponsorDialog>
            <span className="flower-btn__bloom flower-btn__bloom--1" aria-hidden="true">
              <span className="flower-btn__petal flower-btn__petal--one" />
              <span className="flower-btn__petal flower-btn__petal--two" />
              <span className="flower-btn__petal flower-btn__petal--three" />
              <span className="flower-btn__petal flower-btn__petal--four" />
            </span>
          </div>
          <p className="meta" style={{ opacity: 0.45 }}>
            or email{' '}
            <a href="mailto:contact@hackhouse.uk" style={{ textDecoration: 'underline' }}>
              contact@hackhouse.uk
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

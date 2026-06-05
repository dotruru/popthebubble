import { GlassButton } from '@/components/primitives'
import { SponsorDialog } from '@/components/SponsorDialog'
import { EVENT } from '@/lib/content'

export function FooterLandscape() {
  return (
    <>
      <section className="footer-cta">
        <div className="container flex flex-col items-center text-center gap-8">
          <h2 className="section-title" style={{ color: 'var(--ink)' }}>
            Ready to pop?
          </h2>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <GlassButton href={EVENT.applyHref} variant="primary" target="_blank" rel="noopener noreferrer">Apply now</GlassButton>
            <SponsorDialog>
              <GlassButton variant="secondary">Sponsor</GlassButton>
            </SponsorDialog>
          </div>

          <div className="flex flex-col items-center gap-3">
            <a
              href={EVENT.hostHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 transition-opacity hover:opacity-100"
              style={{ opacity: 0.85 }}
            >
              <span className="meta" style={{ opacity: 0.5 }}>Hosted by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/lambda-run/lambda-logo.svg"
                alt={EVENT.host}
                style={{ height: '1.5rem', width: 'auto' }}
              />
              <span style={{ fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.01em' }}>
                {EVENT.host}
              </span>
            </a>
            <p className="meta" style={{ opacity: 0.35 }}>
              Produced by{' '}
              <a href={EVENT.producerHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                {EVENT.producer}
              </a>{' '}
              · Issue 01 · 2026
            </p>
          </div>
        </div>
      </section>

      <footer className="footer-grass" aria-label="Footer" style={{ background: '#ffffff' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer_desktop.jpg"
          alt=""
          aria-hidden="true"
          className="footer-grass__desktop"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer_mobile.jpg"
          alt=""
          aria-hidden="true"
          className="footer-grass__mobile"
        />
      </footer>
    </>
  )
}

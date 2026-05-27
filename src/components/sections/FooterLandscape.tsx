import { GlassButton } from '@/components/primitives'
import { SponsorDialog } from '@/components/SponsorDialog'
import { EVENT } from '@/lib/content'

export function FooterLandscape() {
  return (
    <>
      <section className="footer-cta">
        <div className="container flex flex-col items-center text-center gap-8">
          <h2 className="section-title" style={{ color: 'var(--ink)' }}>
            Ready to build?
          </h2>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <GlassButton href={EVENT.applyHref} variant="primary" target="_blank" rel="noopener noreferrer">Apply now</GlassButton>
            <SponsorDialog>
              <GlassButton variant="secondary">Sponsor</GlassButton>
            </SponsorDialog>
          </div>

          <p className="meta" style={{ opacity: 0.35 }}>
            Hackhouse London · Issue 01 · 2026
          </p>
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

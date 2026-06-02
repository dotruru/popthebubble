import Link from 'next/link'
import { LINKS } from '@/lib/content'

const ink = { color: 'var(--ink)' }

export function HackPackUnavailable() {
  return (
    <section className="section" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '40rem', textAlign: 'center', marginInline: 'auto' }}>
        <div className="glass glass--milk rounded-lg" style={{ padding: 'clamp(2rem, 5vw, 3.5rem)' }}>
          <p className="meta mb-3" style={{ ...ink, opacity: 0.4 }}>Hacker portal</p>
          <h1 className="section-title mb-4" style={ink}>This page isn&apos;t available to you.</h1>
          <p className="body-copy mb-8" style={{ ...ink, opacity: 0.7 }}>
            The hacker portal is for confirmed Pop the Bubble builders. If that&apos;s you, your
            access link is pinned in our Discord.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="meta rounded-full"
              style={{ padding: '0.7rem 1.3rem', background: 'var(--ink)', color: '#fff' }}
            >
              Open our Discord →
            </a>
            <Link
              href="/"
              className="meta rounded-full"
              style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
            >
              Back to the site
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

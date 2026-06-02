import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { SCHEDULE, LINKS, EVENT } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Schedule — Pop the Bubble',
  description: 'The 36-hour run of show. Friday 5 → Sunday 7 June 2026, London.',
}

const ink = { color: 'var(--ink)' }
const inkSoft = { color: 'var(--ink)', opacity: 0.75 }

export default function SchedulePage() {
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
            <p className="meta" style={{ opacity: 0.6 }}>{EVENT.duration} · {EVENT.location}</p>
            <h1 className="section-title mt-3" style={{ color: '#fff' }}>Schedule.</h1>
            <p className="body-copy mt-4" style={{ color: '#fff', opacity: 0.8, maxWidth: '50ch' }}>
              Friday 5 → Sunday 7 June 2026. The hack venue is shared with confirmed builders.
            </p>
          </div>
        </section>

        <div className="page-after-hero">
          <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
            <div className="container">
              <div className="grid gap-4 md:grid-cols-3">
                {SCHEDULE.map((day) => (
                  <div key={day.day} className="glass glass--milk rounded-lg" style={{ padding: '1.5rem' }}>
                    <p className="meta mb-1" style={{ ...ink, opacity: 0.4 }}>{day.tag}</p>
                    <h2
                      className="mb-4"
                      style={{ ...ink, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.02em' }}
                    >
                      {day.day}
                    </h2>
                    <ul className="flex flex-col gap-3">
                      {day.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="meta" style={{ ...ink, opacity: 0.5, minWidth: '5.5rem' }}>{item.time}</span>
                          <span className="body-copy" style={item.highlight ? { ...ink, fontWeight: 600 } : inkSoft}>
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {day.note && <p className="meta mt-4" style={{ ...ink, opacity: 0.4 }}>{day.note}</p>}
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={EVENT.applyHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta rounded-full"
                  style={{ padding: '0.7rem 1.3rem', background: 'var(--ink)', color: '#fff' }}
                >
                  Apply →
                </a>
                <a
                  href={LINKS.hackpack}
                  className="meta rounded-full"
                  style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
                >
                  Full hacker pack →
                </a>
                <a
                  href={LINKS.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="meta rounded-full"
                  style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
                >
                  Join Discord →
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

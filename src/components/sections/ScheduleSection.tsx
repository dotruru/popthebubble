import { SCHEDULE, LINKS } from '@/lib/content'

const ink = { color: 'var(--ink)' }
const inkSoft = { color: 'var(--ink)', opacity: 0.75 }

export function ScheduleSection() {
  return (
    <section id="schedule" className="section">
      <div className="container">
        <h2 className="section-title mb-4">Schedule.</h2>
        <p className="body-copy mb-12" style={{ opacity: 0.6, maxWidth: '48ch' }}>
          36 hours, Friday to Sunday. The hack venue is shared with confirmed builders.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {SCHEDULE.map((day) => (
            <div key={day.day} className="glass glass--milk rounded-lg" style={{ padding: '1.5rem' }}>
              <p className="meta mb-1" style={{ ...ink, opacity: 0.4 }}>{day.tag}</p>
              <h3
                className="mb-4"
                style={{ ...ink, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.02em' }}
              >
                {day.day}
              </h3>
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
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={LINKS.schedule}
            className="meta rounded-full"
            style={{ padding: '0.7rem 1.3rem', background: 'var(--ink)', color: '#fff' }}
          >
            Full schedule →
          </a>
          <a
            href={LINKS.hackpack}
            className="meta rounded-full"
            style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
          >
            Read the hacker pack →
          </a>
        </div>
      </div>
    </section>
  )
}

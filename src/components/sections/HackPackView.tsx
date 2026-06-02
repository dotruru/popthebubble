'use client'

import { useState } from 'react'
import {
  EVENT,
  LINKS,
  SCHEDULE,
  HACK_TRACKS,
  HACK_RULES,
  MILESTONES,
  SUBMISSION_ITEMS,
  JUDGING_BASELINE,
  JUDGING_BY_TRACK,
  JUDGING_BONUS,
  PRIZES,
  FOOD,
  FOOD_NOTE,
  TRAVEL,
  WHAT_TO_BRING,
  HACK_FAQ,
} from '@/lib/content'
import { AIRTABLE_EMBEDS } from '@/lib/portal'
import { AirtableEmbed } from '@/components/AirtableEmbed'

const TABS = [
  { id: 'checkin', label: 'Check in' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'tracks', label: 'Tracks' },
  { id: 'rules', label: 'Rules' },
  { id: 'judging', label: 'Judging' },
  { id: 'milestones', label: 'Milestones' },
  { id: 'submit', label: 'Submit' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'food', label: 'Food & Stay' },
  { id: 'faq', label: 'FAQ' },
] as const

type TabId = (typeof TABS)[number]['id']

const ink = { color: 'var(--ink)' }
const inkSoft = { color: 'var(--ink)', opacity: 0.75 }

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="glass glass--milk rounded-lg" style={{ padding: '1.5rem' }}>
      {children}
    </div>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-4" style={{ ...ink, fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
      {children}
    </h3>
  )
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="body-copy flex gap-3" style={inkSoft}>
          <span aria-hidden style={{ opacity: 0.4 }}>—</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function HackPackView() {
  const [active, setActive] = useState<TabId>('checkin')

  return (
    <section className="section" style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)' }}>
      <div className="container">
        {/* Tab bar */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-8"
          role="tablist"
          aria-label="Hacker pack sections"
          style={{ scrollbarWidth: 'none' }}
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className="meta whitespace-nowrap rounded-full transition-colors"
                style={{
                  padding: '0.6rem 1.1rem',
                  border: '1px solid rgb(255 255 255 / 0.5)',
                  background: isActive ? 'var(--ink)' : 'rgb(255 255 255 / 0.4)',
                  color: isActive ? '#fff' : 'var(--ink)',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Panels */}
        {active === 'checkin' && (
          <Card>
            <Heading>Check in</Heading>
            <p className="body-copy mb-6" style={inkSoft}>
              Check in first so we know you&apos;re hacking. Name, email, team and track —
              plus your dev-account handles (GitHub / Vercel / etc.) so sponsors can drop
              credits on the right accounts.
            </p>
            <AirtableEmbed src={AIRTABLE_EMBEDS.checkin} title="Check-in form" />
          </Card>
        )}

        {active === 'schedule' && (
          <div className="grid gap-4 md:grid-cols-3">
            {SCHEDULE.map((day) => (
              <Card key={day.day}>
                <p className="meta mb-1" style={{ ...ink, opacity: 0.4 }}>{day.tag}</p>
                <Heading>{day.day}</Heading>
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
              </Card>
            ))}
          </div>
        )}

        {active === 'tracks' && (
          <div className="grid gap-4 md:grid-cols-3">
            {HACK_TRACKS.map((t) => (
              <Card key={t.index}>
                <p className="meta mb-1" style={{ ...ink, opacity: 0.4 }}>{t.index}</p>
                <Heading>{t.title}</Heading>
                <p className="body-copy mb-4" style={inkSoft}>{t.body}</p>
                <p className="meta mb-1" style={{ ...ink, opacity: 0.45 }}>Example</p>
                <p className="body-copy mb-4" style={inkSoft}>{t.example}</p>
                <p className="meta mb-1" style={{ ...ink, opacity: 0.45 }}>What wins</p>
                <p className="body-copy" style={ink}>{t.wins}</p>
              </Card>
            ))}
          </div>
        )}

        {active === 'rules' && (
          <Card>
            <div className="flex flex-col gap-5">
              {HACK_RULES.map((r) => (
                <div key={r.title}>
                  <Heading>{r.title}</Heading>
                  <p className="body-copy" style={inkSoft}>{r.detail}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {active === 'judging' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Heading>Baseline (all tracks)</Heading>
              <Bullets items={JUDGING_BASELINE} />
            </Card>
            <Card>
              <Heading>By track</Heading>
              <div className="flex flex-col gap-3">
                {JUDGING_BY_TRACK.map((j) => (
                  <div key={j.track}>
                    <p className="meta mb-1" style={ink}>{j.track}</p>
                    <p className="body-copy" style={inkSoft}>{j.weight}</p>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <Heading>⭐ Bonus points</Heading>
              <div className="flex flex-col gap-3">
                {JUDGING_BONUS.map((b) => (
                  <div key={b.title}>
                    <p className="meta mb-1" style={ink}>{b.title}</p>
                    <p className="body-copy" style={inkSoft}>{b.detail}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {active === 'milestones' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Heading>Milestones — post as you build</Heading>
              <ul className="flex flex-col gap-3 mb-4">
                {MILESTONES.map((m) => (
                  <li key={m.id} className="flex gap-3">
                    <span className="meta" style={{ ...ink, minWidth: '3rem' }}>🏁 {m.id}</span>
                    <span className="body-copy" style={inkSoft}>
                      <strong style={ink}>{m.when}</strong> — {m.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="body-copy" style={inkSoft}>
                Post your progress publicly (LinkedIn, X, a reel — anything). It earns
                <strong style={ink}> bonus points</strong>, and it&apos;s free distribution for your product. More good posts → more points.
              </p>
            </Card>
            <Card>
              <Heading>Post a milestone update</Heading>
              <AirtableEmbed src={AIRTABLE_EMBEDS.milestones} title="Milestone update form" />
            </Card>
          </div>
        )}

        {active === 'submit' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Heading>Your submission</Heading>
              <Bullets items={SUBMISSION_ITEMS} />
              <p className="body-copy mt-4" style={ink}>
                Submit by the <strong>Sun 8:00am</strong> code freeze. Late = not judged.
              </p>
            </Card>
            <Card>
              <Heading>Submit your project</Heading>
              <AirtableEmbed src={AIRTABLE_EMBEDS.submission} title="Final submission form" />
            </Card>
          </div>
        )}

        {active === 'prizes' && (
          <Card>
            <div className="flex flex-col gap-4">
              {PRIZES.map((p) => (
                <div key={p.place} className="flex gap-4 items-baseline">
                  <span className="section-title" style={{ ...ink, fontSize: '1.8rem', minWidth: '3rem' }}>{p.place}</span>
                  <span className="body-copy" style={inkSoft}>{p.prize}</span>
                </div>
              ))}
            </div>
            <p className="body-copy mt-5" style={inkSoft}>
              Plus sponsor credits &amp; perks for all builders — dropped in Discord during the event.
            </p>
          </Card>
        )}

        {active === 'food' && (
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <Heading>Food</Heading>
              <ul className="flex flex-col gap-3 mb-4">
                {FOOD.map((f) => (
                  <li key={f.when}>
                    <p className="meta mb-1" style={ink}>{f.when}</p>
                    <p className="body-copy" style={inkSoft}>{f.what}</p>
                  </li>
                ))}
              </ul>
              <p className="body-copy" style={{ ...inkSoft, fontSize: '0.95rem' }}>{FOOD_NOTE}</p>
            </Card>
            <div className="flex flex-col gap-4">
              <Card>
                <Heading>Travelling in & staying over</Heading>
                <Bullets items={TRAVEL} />
              </Card>
              <Card>
                <Heading>What to bring</Heading>
                <Bullets items={WHAT_TO_BRING} />
              </Card>
            </div>
          </div>
        )}

        {active === 'faq' && (
          <Card>
            <div className="flex flex-col gap-5">
              {HACK_FAQ.map((item) => (
                <div key={item.q}>
                  <p className="mb-1" style={{ ...ink, fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{item.q}</p>
                  <p className="body-copy" style={inkSoft}>{item.a}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Footer CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="meta rounded-full"
            style={{ padding: '0.7rem 1.3rem', background: 'var(--ink)', color: '#fff' }}
          >
            Join the Discord →
          </a>
          <a
            href={EVENT.applyHref}
            target="_blank"
            rel="noopener noreferrer"
            className="meta rounded-full"
            style={{ padding: '0.7rem 1.3rem', border: '1px solid rgb(255 255 255 / 0.6)', color: 'var(--ink)' }}
          >
            Apply →
          </a>
        </div>
      </div>
    </section>
  )
}

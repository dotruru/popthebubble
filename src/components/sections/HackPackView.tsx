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
  JUDGING_OVERVIEW,
  JUDGING_RUBRIC,
  JUDGING_BONUS,
  JUDGING_SCORING_RULES,
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
  { id: 'progress', label: 'Progress & Submit' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'food', label: 'Food & Stay' },
  { id: 'faq', label: 'FAQ' },
] as const

type TabId = (typeof TABS)[number]['id']

const ink = { color: 'var(--ink)' }
const inkSoft = { color: 'var(--ink)', opacity: 0.75 }

const SUMMARY_ITEMS = [
  { label: '36h build clock', value: 'Fri 8pm → Sun 8am', detail: 'The judged build window starts after dinner Friday.' },
  { label: 'Final submission', value: 'Sun 8:00am', detail: 'Live URL, repo, demo video, and proof are due.' },
  { label: 'Awards', value: 'Sun 11:30am–3pm', detail: 'Top 3 demos, winners, drinks, networking, livestream.' },
  { label: 'What wins', value: 'Evidence', detail: 'Money, users, burden removed, and honest receipts.' },
] as const

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
        <div className="grid gap-3 md:grid-cols-4 mb-8" aria-label="Hacker pack essentials">
          {SUMMARY_ITEMS.map((item) => (
            <div
              key={item.label}
              className="glass glass--milk rounded-lg"
              style={{ padding: '1rem', border: '1px solid rgb(255 255 255 / 0.55)' }}
            >
              <p className="meta mb-2" style={{ ...ink, opacity: 0.45 }}>{item.label}</p>
              <p
                style={{
                  ...ink,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                {item.value}
              </p>
              <p className="body-copy mt-3" style={{ ...inkSoft, fontSize: '0.95rem', lineHeight: 1.45 }}>
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div
          className="glass glass--milk rounded-lg flex gap-2 overflow-x-auto p-2 mb-8"
          role="tablist"
          aria-label="Scrollable hacker pack sections"
          style={{ overflowX: 'auto', scrollbarWidth: 'thin', scrollSnapType: 'x proximity' }}
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
                  flex: '0 0 auto',
                  padding: '0.6rem 1.1rem',
                  border: '1px solid rgb(255 255 255 / 0.5)',
                  background: isActive ? 'var(--ink)' : 'rgb(255 255 255 / 0.4)',
                  color: isActive ? '#fff' : 'var(--ink)',
                  cursor: 'pointer',
                  scrollSnapAlign: 'start',
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
              Start here when you arrive. Add your name, email, team, track, and developer
              account handles so organisers can confirm you&apos;re in the room and sponsors
              can send credits to the right accounts.
            </p>
            <AirtableEmbed src={AIRTABLE_EMBEDS.checkin} title="Check-in form" height={533} />
          </Card>
        )}

        {active === 'schedule' && (
          <div className="grid gap-4 md:grid-cols-3">
            {SCHEDULE.map((day) => (
              <Card key={day.day}>
                <div className="mb-5">
                  <p className="meta mb-1" style={{ ...ink, opacity: 0.4 }}>{day.tag}</p>
                  <Heading>{day.day}</Heading>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {day.items.map((item, i) => (
                    <li
                      key={i}
                      className="grid gap-1 rounded-md sm:grid-cols-[5.8rem_1fr]"
                      style={{
                        padding: '0.75rem 0.85rem',
                        background: item.highlight ? 'rgb(255 255 255 / 0.62)' : 'rgb(255 255 255 / 0.32)',
                        border: item.highlight ? '1px solid rgb(32 32 32 / 0.18)' : '1px solid rgb(255 255 255 / 0.45)',
                      }}
                    >
                      <span className="meta" style={{ ...ink, opacity: 0.55 }}>{item.time}</span>
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
          <div className="grid gap-4">
            <Card>
              <Heading>How judging works</Heading>
              <div className="grid gap-3 md:grid-cols-4">
                {JUDGING_OVERVIEW.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-md"
                    style={{ padding: '1rem', background: 'rgb(255 255 255 / 0.46)', border: '1px solid rgb(255 255 255 / 0.5)' }}
                  >
                    <p className="meta mb-2" style={{ ...ink, opacity: 0.48 }}>{item.label}</p>
                    <p className="body-copy mb-2" style={{ ...ink, fontWeight: 700 }}>{item.value}</p>
                    <p className="body-copy" style={{ ...inkSoft, fontSize: '0.92rem', lineHeight: 1.45 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
            </Card>

            {JUDGING_RUBRIC.map((section) => (
              <Card key={section.section}>
                <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="meta mb-1" style={{ ...ink, opacity: 0.48 }}>{section.scope}</p>
                    <Heading>{section.section}</Heading>
                  </div>
                  <span
                    className="meta rounded-full"
                    style={{ padding: '0.45rem 0.8rem', background: 'var(--ink)', color: '#fff' }}
                  >
                    {section.points} pts
                  </span>
                </div>
                <div className="grid gap-3">
                  {section.criteria.map((criterion) => (
                    <div
                      key={criterion.name}
                      className="rounded-md"
                      style={{ padding: '1rem', background: 'rgb(255 255 255 / 0.38)', border: '1px solid rgb(255 255 255 / 0.45)' }}
                    >
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                        <p className="body-copy" style={{ ...ink, fontWeight: 700 }}>{criterion.name}</p>
                        <p className="meta" style={{ ...ink, opacity: 0.55 }}>{criterion.points} pts</p>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2">
                        {criterion.bands.map((band) => {
                          const isDQ = Number.isNaN(Number(band.score))
                          return (
                          <div key={`${criterion.name}-${band.score}`} className="flex gap-3">
                            <span
                              className="meta"
                              style={{
                                flex: '0 0 2.4rem',
                                textAlign: 'center',
                                padding: '0.2rem 0.35rem',
                                borderRadius: '999px',
                                background: isDQ ? 'rgb(255 74 50 / 0.16)' : 'rgb(32 32 32 / 0.08)',
                                color: isDQ ? 'var(--vermillion)' : 'var(--ink)',
                                fontWeight: isDQ ? 700 : undefined,
                              }}
                            >
                              {band.score}
                            </span>
                            <span className="body-copy" style={{ ...inkSoft, fontSize: '0.94rem', lineHeight: 1.45 }}>
                              {band.detail}
                            </span>
                          </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <Heading>Bonus points</Heading>
                <div className="flex flex-col gap-3">
                  {JUDGING_BONUS.map((b) => (
                    <div key={b.title}>
                      <p className="meta mb-1" style={ink}>{b.title} — {b.points}</p>
                      <p className="body-copy" style={inkSoft}>{b.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <Heading>Scoring rules</Heading>
                <Bullets items={JUDGING_SCORING_RULES} />
              </Card>
            </div>
          </div>
        )}

        {active === 'progress' && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <Card>
              <Heading>Milestones — post as you build</Heading>
              <ul className="flex flex-col gap-3 mb-5">
                {MILESTONES.map((m) => (
                  <li key={m.id} className="grid gap-2 rounded-md sm:grid-cols-[4.2rem_1fr]" style={{ padding: '0.85rem', background: 'rgb(255 255 255 / 0.38)' }}>
                    <span className="meta" style={ink}>{m.id}</span>
                    <span className="body-copy" style={inkSoft}>
                      <strong style={ink}>{m.when}</strong> — {m.detail}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="body-copy" style={inkSoft}>
                M1 and M2 are progress updates. M3 is the final submission deadline.
                Public posts can also count toward the build-in-public bonus when they are dated,
                substantive, and show real progress instead of polished marketing.
              </p>
            </Card>
            <Card>
              <Heading>Your final submission</Heading>
              <Bullets items={SUBMISSION_ITEMS} />
              <p className="body-copy mt-4 mb-5" style={ink}>
                Submit by <strong>Sunday 8:00am</strong>. Late submissions cannot be judged.
              </p>
              <p className="body-copy mb-4" style={inkSoft}>
                Use this same form for <strong style={ink}>M1</strong>, <strong style={ink}>M2</strong>,
                and <strong style={ink}>Final submission</strong>. Pick the matching update type in the form.
              </p>
              <AirtableEmbed src={AIRTABLE_EMBEDS.progress} title="Progress and final submission form" />
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
              Sponsor credits, API keys, and builder perks will be shared in Discord during the event.
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

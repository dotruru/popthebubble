'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { BentoGrid } from '@/components/ui/bento-grid'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { TEAM, JUDGES } from '@/lib/content'

// Monogram backgrounds, cycled across the brand palette
const JUDGE_GRADIENTS = [
  'linear-gradient(135deg, rgba(141,204,243,0.9) 0%, rgba(107,177,173,0.9) 100%)',
  'linear-gradient(135deg, rgba(230,116,142,0.9) 0%, rgba(229,169,169,0.9) 100%)',
  'linear-gradient(135deg, rgba(140,203,99,0.9) 0%, rgba(107,177,173,0.9) 100%)',
  'linear-gradient(135deg, rgba(141,204,243,0.9) 0%, rgba(230,116,142,0.85) 100%)',
]

const TEAM_GRADIENTS = [
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(141,204,243,0.68) 42%, rgba(230,116,142,0.62) 100%)',
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(141,204,243,0.65) 42%, rgba(107,177,173,0.62) 100%)',
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(140,203,99,0.62) 46%, rgba(107,177,173,0.58) 100%)',
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(237,236,219,0.78) 32%, rgba(229,169,169,0.66) 68%, rgba(230,116,142,0.6) 100%)',
]

const LIQUID: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Outer glow wrapper — follows the GlowingEffect demo pattern
function GlowCard({
  colSpan,
  children,
}: {
  colSpan: string
  children: React.ReactNode
}) {
  return (
    <div className={`${colSpan} relative rounded-lg border p-[3px]`} style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
      <GlowingEffect
        blur={0}
        borderWidth={2}
        spread={80}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
      />
      {children}
    </div>
  )
}

function TeamCard({
  name,
  role,
  photo,
  bio,
  linkedin,
  gradient,
}: {
  name: string
  role: string
  photo: string
  bio: readonly string[]
  linkedin: string
  gradient: string
}) {
  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="team-card"
      style={{ '--card-gradient': gradient } as React.CSSProperties}
    >
      <div className="team-card__avatar">
        <Image
          src={photo}
          alt={name}
          fill
          sizes="112px"
          style={{ objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(1)' }}
        />
      </div>
      <div className="team-card__text">
        <p className="team-card__name">{name}</p>
        <p className="team-card__role">{role}</p>
      </div>
      <ul className="team-card__bio">
        {bio.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <span className="team-card__linkedin" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      </span>
    </a>
  )
}

function JudgeCard({
  name,
  initials,
  note,
  photo,
  linkedin,
  gradient,
}: {
  name: string
  initials: string
  note: string
  photo: string
  linkedin: string
  gradient: string
}) {
  // Monogram is the base layer; the photo renders on top and only hides if it
  // fails to load (missing file). No onLoad gate — that races the CDN cache.
  const [failed, setFailed] = useState(false)

  return (
    <a
      href={linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on LinkedIn`}
      className="judge-card"
    >
      <span className="judge-card__monogram" style={{ background: gradient }}>
        <span className="judge-card__initials">{initials}</span>
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            className="judge-card__photo"
            onError={() => setFailed(true)}
          />
        )}
      </span>
      <div className="judge-card__text">
        <p className="judge-card__name">{name}</p>
        {note && <p className="judge-card__note">{note}</p>}
      </div>
      <span className="judge-card__linkedin" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
        </svg>
      </span>
    </a>
  )
}

export function CohortSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title mb-12">Inside the hackathon.</h2>

        <BentoGrid className="max-w-none mx-0 md:grid-cols-5 md:auto-rows-auto gap-4 mb-16">

          {/* £10k — 3 cols */}
          <GlowCard colSpan="md:col-span-3">
            <motion.div
              initial="initial"
              whileHover="hover"
              className="group/bento relative h-full flex flex-col justify-between overflow-hidden rounded-[5px] p-8 min-h-[14rem]"
              style={{ background: 'var(--cream)' }}
            >
              <span className="meta" style={{ opacity: 0.44 }}>First prize</span>
              <div className="transition-transform duration-200 group-hover/bento:translate-x-2">
                <p className="stat-hero">£10,000</p>
                <p className="body-copy mt-3" style={{ opacity: 0.58, maxWidth: '32ch' }}>
                  The largest first prize ever offered at a London hackathon.
                </p>
              </div>
            </motion.div>
          </GlowCard>

          {/* ~12% — 2 cols */}
          <GlowCard colSpan="md:col-span-2">
            <motion.div
              initial="initial"
              whileHover="hover"
              className="group/bento relative h-full flex flex-col justify-between overflow-hidden rounded-[5px] p-8 min-h-[14rem]"
              style={{ background: 'var(--cream)' }}
            >
              <div>
                <span className="meta" style={{ opacity: 0.44 }}>Acceptance rate</span>
                <div
                  className="mt-3 mb-5 overflow-hidden"
                  style={{ height: '3px', background: 'rgba(32,32,32,0.1)', borderRadius: '999px' }}
                >
                  <motion.div
                    variants={{
                      initial: { width: '12%' },
                      hover: { width: ['0%', '12%'], transition: { duration: 0.9, ease: LIQUID } },
                    }}
                    style={{ height: '100%', background: 'var(--sky-blue)', borderRadius: '999px' }}
                  />
                </div>
              </div>
              <div className="transition-transform duration-200 group-hover/bento:translate-x-2">
                <p className="stat-large">~12%</p>
                <p className="body-copy mt-2" style={{ opacity: 0.58 }}>
                  More selective than most top accelerators.
                </p>
              </div>
            </motion.div>
          </GlowCard>

          {/* 80 builders — 2 cols */}
          <GlowCard colSpan="md:col-span-2">
            <motion.div
              initial="initial"
              whileHover="hover"
              className="group/bento relative h-full flex flex-col justify-between overflow-hidden rounded-[5px] p-7 min-h-[11rem]"
              style={{ background: 'var(--cream)' }}
            >
              <div>
                <span className="meta" style={{ opacity: 0.44 }}>Builders in the room</span>
                <div
                  className="mt-3 overflow-hidden"
                  style={{ height: '3px', background: 'rgba(32,32,32,0.1)', borderRadius: '999px' }}
                >
                  <motion.div
                    variants={{
                      initial: { width: '0%' },
                      hover: { width: '100%', transition: { duration: 0.7, ease: LIQUID } },
                    }}
                    style={{ height: '100%', background: 'var(--grass-green)', borderRadius: '999px' }}
                  />
                </div>
                <p className="meta mt-1.5" style={{ opacity: 0.28, fontSize: '0.62rem' }}>cohort full</p>
              </div>
              <div className="transition-transform duration-200 group-hover/bento:translate-x-2">
                <p className="stat-large">80</p>
              </div>
            </motion.div>
          </GlowCard>

          {/* 36 hrs — 3 cols */}
          <GlowCard colSpan="md:col-span-3">
            <motion.div
              initial="initial"
              whileHover="hover"
              className="group/bento relative h-full flex flex-col justify-between overflow-hidden rounded-[5px] p-7 min-h-[11rem]"
              style={{ background: 'var(--cream)' }}
            >
              <div className="flex gap-3">
                {(['Fri', 'Sat', 'Sun'] as const).map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col gap-1.5">
                    <span className="meta" style={{ opacity: 0.3, fontSize: '0.6rem' }}>{day}</span>
                    <div
                      className="overflow-hidden rounded-full"
                      style={{ height: '4px', background: 'rgba(32,32,32,0.1)' }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: 'var(--veranda-blue)' }}
                        variants={{
                          initial: { width: '0%' },
                          hover: { width: '100%', transition: { delay: i * 0.14, duration: 0.55, ease: LIQUID } },
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="transition-transform duration-200 group-hover/bento:translate-x-2">
                <span className="meta" style={{ opacity: 0.44 }}>To build something real</span>
                <p className="stat-large mt-1">36 hrs</p>
              </div>
            </motion.div>
          </GlowCard>

        </BentoGrid>

        {/* Team */}
        <p className="meta mb-6" style={{ opacity: 0.5 }}>Organising team</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEAM.map((member, i) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              photo={member.photo}
              bio={member.bio}
              linkedin={member.linkedin}
              gradient={TEAM_GRADIENTS[i]}
            />
          ))}
        </div>

        {/* Judges */}
        <p className="meta mb-6 mt-14" style={{ opacity: 0.5 }}>Judges</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {JUDGES.map((judge, i) => (
            <JudgeCard
              key={judge.name}
              name={judge.name}
              initials={judge.initials}
              note={judge.note}
              photo={judge.photo}
              linkedin={judge.linkedin}
              gradient={JUDGE_GRADIENTS[i % JUDGE_GRADIENTS.length]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

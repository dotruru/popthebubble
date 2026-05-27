'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { BentoGrid } from '@/components/ui/bento-grid'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { TEAM } from '@/lib/content'

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
  gradient,
}: {
  name: string
  role: string
  photo: string
  bio: string
  gradient: string
}) {
  return (
    <div
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
      <p className="team-card__bio">{bio}</p>
    </div>
  )
}

export function CohortSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title mb-12">The room.</h2>

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
              gradient={TEAM_GRADIENTS[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

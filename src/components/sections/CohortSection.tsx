import Image from 'next/image'
import { COHORT_STATS, TEAM } from '@/lib/content'

// Glassy gradients: heavy white mixing + semi-transparent palette colours
const TEAM_GRADIENTS = [
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(141,204,243,0.68) 42%, rgba(230,116,142,0.62) 100%)',
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(141,204,243,0.65) 42%, rgba(107,177,173,0.62) 100%)',
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(140,203,99,0.62) 46%, rgba(107,177,173,0.58) 100%)',
  'linear-gradient(135deg, rgba(255,255,255,0.82) 0%, rgba(237,236,219,0.78) 32%, rgba(229,169,169,0.66) 68%, rgba(230,116,142,0.6) 100%)',
]

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

        {/* Stats bento */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16">

          {/* £10k — hero card */}
          <div className="glass glass--pink md:col-span-3 rounded-2xl p-8 flex flex-col justify-between min-h-[13rem]">
            <span className="meta" style={{ opacity: 0.44 }}>First prize</span>
            <div>
              <p className="stat-hero">£10,000</p>
              <p className="body-copy mt-3" style={{ opacity: 0.58, maxWidth: '32ch' }}>
                The largest first prize ever offered at a London hackathon.
              </p>
            </div>
          </div>

          {/* ~12% — selectivity card */}
          <div className="glass glass--blue md:col-span-2 rounded-2xl p-8 flex flex-col justify-between min-h-[13rem]">
            <div>
              <span className="meta" style={{ opacity: 0.44 }}>Acceptance rate</span>
              {/* Rarity bar */}
              <div className="mt-3 mb-5" style={{ height: '3px', background: 'rgba(255,255,255,0.22)', borderRadius: '999px' }}>
                <div style={{ height: '100%', width: '12%', background: 'var(--sky-blue)', borderRadius: '999px' }} />
              </div>
            </div>
            <div>
              <p className="stat-large">~12%</p>
              <p className="body-copy mt-2" style={{ opacity: 0.58 }}>More selective than most top accelerators.</p>
            </div>
          </div>

          {/* 80 builders */}
          <div className="glass md:col-span-2 rounded-2xl p-7 flex flex-col justify-between min-h-[8rem]">
            <span className="meta" style={{ opacity: 0.44 }}>Builders in the room</span>
            <p className="stat-large">80</p>
          </div>

          {/* 36 hours */}
          <div className="glass md:col-span-3 rounded-2xl p-7 flex flex-col justify-between min-h-[8rem]">
            <span className="meta" style={{ opacity: 0.44 }}>To build something real</span>
            <p className="stat-large">36 hrs</p>
          </div>

        </div>

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

import Image from 'next/image'
import { TRACKS } from '@/lib/content'

const ACCENTS = [
  {
    img: '/outbuild.png',
    cardBg:    'rgb(205 231 247 / 0.85)',
    cardBorder:'rgb(238 250 255)',
    imgBg:     'rgb(218 235 248)',
  },
  {
    img: '/validate.png',
    cardBg:    'rgb(207 239 225 / 0.85)',
    cardBorder:'rgb(242 255 250)',
    imgBg:     'rgb(233 247 246)',
  },
  {
    img: '/effect.png',
    cardBg:    'rgb(218 217 246 / 0.85)',
    cardBorder:'rgb(244 242 255)',
    imgBg:     'rgb(229 227 243)',
  },
]

export function TracksSection() {
  return (
    <section id="tracks" className="section">
      <div className="container">
        <h2 className="section-title mb-12">What are you building?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRACKS.map((track, i) => {
            const a = ACCENTS[i]
            return (
              <div
                key={track.index}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{
                  background: a.cardBg,
                  border: `1px solid ${a.cardBorder}`,
                  backdropFilter: 'blur(20px) saturate(1.2)',
                  WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
                  boxShadow: '0 4px 32px rgb(0 0 0 / 0.07)',
                }}
              >
                <div
                  className="relative w-full aspect-video overflow-hidden"
                  style={{ background: a.imgBg }}
                >
                  <Image
                    src={a.img}
                    alt=""
                    aria-hidden={true}
                    fill
                    className="object-cover object-bottom"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>

                <div className="px-6 pt-5 pb-1">
                  <span className="meta" style={{ color: 'rgb(91 112 135)', opacity: 1 }}>
                    {track.index}
                  </span>
                  <h3 className="track-card-title mt-2" style={{ color: 'rgb(8 18 36)' }}>
                    {track.title}
                  </h3>
                </div>

                <div className="px-6 pt-2 pb-7">
                  <p className="body-copy" style={{ color: 'rgb(45 57 73)' }}>
                    {track.body}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

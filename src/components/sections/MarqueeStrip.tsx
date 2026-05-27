import { MARQUEE_TEXT } from '@/lib/content'

export function MarqueeStrip() {
  const content = `${MARQUEE_TEXT}  ·  ${MARQUEE_TEXT}`

  return (
    <div
      className="glass glass--milk overflow-hidden py-3 border-y"
      style={{ borderColor: 'rgb(255 255 255 / 0.28)' }}
      aria-label="Event details ticker"
    >
      <div className="marquee-track" aria-hidden="true">
        <span className="meta px-8 whitespace-nowrap">{content}</span>
        <span className="meta px-8 whitespace-nowrap">{content}</span>
      </div>
    </div>
  )
}

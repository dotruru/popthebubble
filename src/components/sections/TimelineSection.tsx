import { Timeline } from '@/components/ui/timeline'
import { TIMELINE_STEPS } from '@/lib/content'

const STEP_COLORS = ['#8dccf3', '#6bb1ad', '#8ccb63', '#e6748e']

const data = TIMELINE_STEPS.map((step, i) => ({
  title: step.label,
  dotColor: STEP_COLORS[i],
  content: (
    <div
      className="rounded-xl px-5 py-4"
      style={{
        background: 'rgba(248,243,232,0.58)',
        border: '1px solid rgba(255,255,255,0.68)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 4px 24px rgba(32,32,32,0.08)',
      }}
    >
      <span
        className="meta mb-2 block"
        style={{ opacity: 0.38, color: 'var(--ink)' }}
      >
        {step.index}
      </span>
      {'href' in step && step.href ? (
        <a
          href={step.href}
          target="_blank"
          rel="noopener noreferrer"
          className="body-copy"
          style={{ color: 'var(--ink)', opacity: 0.75, textDecoration: 'underline', textUnderlineOffset: '3px' }}
        >
          {step.detail}
        </a>
      ) : (
        <p className="body-copy" style={{ color: 'var(--ink)', opacity: 0.75 }}>
          {step.detail}
        </p>
      )}
    </div>
  ),
}))

export function TimelineSection() {
  return (
    <section id="timeline" className="section">
      <div className="container">
        <h2 className="section-title mb-4">How it works.</h2>
        <Timeline data={data} />
      </div>
    </section>
  )
}

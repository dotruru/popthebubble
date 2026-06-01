import { Timeline } from '@/components/ui/timeline'
import { GlassButton } from '@/components/primitives'
import { TIMELINE_STEPS } from '@/lib/content'

const STEP_COLORS = ['#8dccf3', '#6bb1ad', '#8ccb63', '#e6748e']

// Calendar glyph — signals an events/Luma action (not the official Luma logo)
function LumaGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

const data = TIMELINE_STEPS.map((step, i) => ({
  title: step.label,
  dotColor: STEP_COLORS[i],
  content: (
    <div
      className="rounded-lg px-5 py-4"
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
      <p className="body-copy" style={{ color: 'var(--ink)', opacity: 0.75 }}>
        {step.detail}
      </p>
      {'href' in step && step.href && (
        <GlassButton
          href={step.href}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="text-sm mt-4 inline-flex items-center gap-2"
        >
          <LumaGlyph />
          {'cta' in step ? step.cta : 'Open on Luma'}
          <span aria-hidden="true">↗</span>
        </GlassButton>
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

interface AirtableEmbedProps {
  src: string
  title: string
  height?: number
}

const ink = { color: 'var(--ink)' }

export function AirtableEmbed({ src, title, height = 720 }: AirtableEmbedProps) {
  if (!src) {
    return (
      <div
        className="glass glass--milk rounded-lg"
        style={{ padding: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center' }}
      >
        <p className="body-copy" style={{ ...ink, fontWeight: 600 }}>This form drops here.</p>
        <p className="body-copy mt-1" style={{ ...ink, opacity: 0.6 }}>
          The link is also pinned in our Discord.
        </p>
      </div>
    )
  }

  return (
    <div className="glass glass--milk rounded-lg" style={{ padding: 0, overflow: 'hidden' }}>
      <iframe
        className="airtable-embed"
        src={src}
        title={title}
        width="100%"
        height={height}
        loading="lazy"
        style={{ background: 'transparent', border: 'none', display: 'block' }}
      />
    </div>
  )
}

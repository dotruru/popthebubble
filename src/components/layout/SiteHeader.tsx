'use client'

import { useState } from 'react'
import { GlassButton } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { EVENT } from '@/lib/content'

const NAV_LINKS = [
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50" style={{ willChange: 'transform' }}>
      <div className="container flex items-center justify-between py-4">
        <span className="meta text-white/90 tracking-widest">Hackhouse London</span>

        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="meta text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <GlassButton href={EVENT.applyHref} variant="primary" className="text-sm">
            Apply
          </GlassButton>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden glass glass--clear rounded-full"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
              {open ? (
                <path d="M4 4l12 12M4 16L16 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              ) : (
                <g>
                  <rect y="4" width="20" height="1.5" rx="1" />
                  <rect y="9.25" width="20" height="1.5" rx="1" />
                  <rect y="14.5" width="20" height="1.5" rx="1" />
                </g>
              )}
            </svg>
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden glass glass--milk border-t" style={{ borderColor: 'rgb(255 255 255 / 0.28)' }}>
          <nav className="container py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="meta"
                style={{ color: 'var(--ink)', opacity: 0.8 }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

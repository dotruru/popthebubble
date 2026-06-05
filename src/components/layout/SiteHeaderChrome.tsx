'use client'

import { useEffect, useState } from 'react'
import { GlassButton } from '@/components/primitives'
import { Button } from '@/components/ui/button'
import { EVENT, LINKS } from '@/lib/content'

interface SiteHeaderChromeProps {
  showHackPack: boolean
}

const BASE_NAV_LINKS = [
  { label: 'Tracks', href: '/#tracks', external: false },
  { label: 'Schedule', href: '/schedule', external: false },
  { label: 'FAQ', href: '/#faq', external: false },
] as const

export function SiteHeaderChrome({ showHackPack }: SiteHeaderChromeProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = showHackPack
    ? [...BASE_NAV_LINKS.slice(0, 2), { label: 'Hack Pack', href: LINKS.hackpack, external: false }, ...BASE_NAV_LINKS.slice(2)]
    : BASE_NAV_LINKS

  const navTextShadow = '0 1px 12px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.45)'

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ease-out"
      style={{
        willChange: 'transform',
        backgroundColor: scrolled ? 'rgba(16,24,40,0.42)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'blur(0px)',
        boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.28)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.12)' : 'transparent'}`,
      }}
    >
      <div className="container flex items-center justify-between py-4">
        <a
          href={EVENT.producerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="meta text-white/90 hover:text-white tracking-widest transition-colors"
          style={{ textShadow: navTextShadow }}
        >
          {EVENT.producer}
        </a>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="meta text-white/80 hover:text-white transition-colors"
              style={{ textShadow: navTextShadow }}
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
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

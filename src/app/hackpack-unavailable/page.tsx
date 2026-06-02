import type { Metadata } from 'next'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { HackPackUnavailable } from '@/components/sections/HackPackUnavailable'

export const metadata: Metadata = {
  title: 'Hacker Pack — Pop the Bubble',
  robots: { index: false, follow: false },
}

export default function HackPackUnavailablePage() {
  return (
    <>
      <SiteHeader />
      <main className="page-after-hero">
        <HackPackUnavailable />
      </main>
    </>
  )
}

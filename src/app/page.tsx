import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  HeroSection,
  MarqueeStrip,
  TracksSection,
  CohortSection,
  TimelineSection,
  SponsorsSection,
  FAQSection,
  FooterLandscape,
} from '@/components/sections'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <main className="page-after-hero">
        <MarqueeStrip />
        <TracksSection />
        <CohortSection />
        <TimelineSection />
        <SponsorsSection />
        <FAQSection />
        <FooterLandscape />
      </main>
    </>
  )
}

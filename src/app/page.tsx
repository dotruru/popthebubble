import { SiteHeader } from '@/components/layout/SiteHeader'
import { FloatingBubbles } from '@/components/FloatingBubbles'
import {
  HeroSection,
  MarqueeStrip,
  TracksSection,
  CohortSection,
  TimelineSection,
  ScheduleSection,
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
        <FloatingBubbles />
        <MarqueeStrip />
        <TracksSection />
        <CohortSection />
        <SponsorsSection />
        <TimelineSection />
        <ScheduleSection />
        <FAQSection />
        <FooterLandscape />
      </main>
    </>
  )
}

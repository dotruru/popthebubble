import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pop the Bubble — Hackhouse London',
  description:
    '80 builders. £10,000. A 36-hour hackathon judged on real-world impact, not slides. London, 5–7 June 2026.',
  openGraph: {
    title: 'Pop the Bubble — Hackhouse London',
    description: '80 builders. £10,000. Judged on real-world impact.',
    locale: 'en_GB',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}

'use client'

import { motion } from 'motion/react'

const BUBBLES = [
  { size: 110, left: '7%',  top: '60vh', duration: 22, delay: 0,   opacity: 0.38, swayAmp: 14 },
  { size: 62,  left: '21%', top: '30vh', duration: 16, delay: 2,   opacity: 0.32, swayAmp: 9  },
  { size: 180, left: '54%', top: '80vh', duration: 28, delay: 0.5, opacity: 0.22, swayAmp: 20 },
  { size: 88,  left: '70%', top: '20vh', duration: 18, delay: 3,   opacity: 0.34, swayAmp: 12 },
  { size: 50,  left: '87%', top: '55vh', duration: 13, delay: 1,   opacity: 0.42, swayAmp: 7  },
  { size: 138, left: '38%', top: '42vh', duration: 24, delay: 1.5, opacity: 0.26, swayAmp: 17 },
]

export function FloatingBubbles() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: b.left, top: b.top, width: b.size, height: b.size }}
          animate={{
            y: [0, -1100],
            x: [0, b.swayAmp, -b.swayAmp * 0.6, b.swayAmp * 0.4, 0],
            opacity: [0, b.opacity, b.opacity, b.opacity * 0.5, 0],
          }}
          transition={{
            y: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              ease: 'linear',
            },
            x: {
              duration: b.duration * 0.38,
              delay: b.delay,
              repeat: Infinity,
              repeatType: 'mirror',
              ease: 'easeInOut',
            },
            opacity: {
              duration: b.duration,
              delay: b.delay,
              repeat: Infinity,
              times: [0, 0.06, 0.88, 0.96, 1],
            },
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bubble.webp"
            alt=""
            width={b.size}
            height={b.size}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </motion.div>
      ))}
    </div>
  )
}

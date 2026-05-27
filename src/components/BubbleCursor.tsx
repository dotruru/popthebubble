'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

// Bubble image is 622×350 (landscape). At 96px wide the visible bubble height is ~54px —
// wide and flat like a real soap bubble, which reads well as a cursor.
const W = 96
const H = Math.round(96 * (350 / 622))

export function BubbleCursor() {
  const x = useMotionValue(-W * 2)
  const y = useMotionValue(-H * 2)
  const opacity = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 320, damping: 24, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 320, damping: 24, mass: 0.4 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX - W / 2)
      y.set(e.clientY - H / 2)
      opacity.set(1)
    }
    const onLeave = () => opacity.set(0)
    const onEnter = () => opacity.set(1)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [x, y, opacity])

  return (
    <motion.div
      aria-hidden
      className="bubble-cursor"
      style={{ x: springX, y: springY, opacity, width: W, height: H }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/bubble.webp"
        alt=""
        width={W}
        height={H}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </motion.div>
  )
}

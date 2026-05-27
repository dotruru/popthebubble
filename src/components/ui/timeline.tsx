'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

export interface TimelineEntry {
  title: string
  content: React.ReactNode
  dotColor?: string
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver(() => {
        setHeight(ref.current?.getBoundingClientRect().height ?? 0)
      })
      resizeObserver.observe(ref.current)
      setHeight(ref.current.getBoundingClientRect().height)
      return () => resizeObserver.disconnect()
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 15%', 'end 60%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1])

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-16 md:gap-10">
            {/* Left: sticky title + dot */}
            <div className="sticky top-36 z-40 flex flex-col md:flex-row items-center self-start max-w-[10rem] md:max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div
                className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: 'rgba(255,255,255,0.35)',
                  border: '1px solid rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ background: item.dotColor ?? 'rgba(255,255,255,0.7)' }}
                />
              </div>
              {/* Title (desktop only) */}
              <h3
                className="hidden md:block md:pl-20 text-2xl lg:text-3xl font-bold"
                style={{ color: 'var(--ink)', letterSpacing: '-0.035em', lineHeight: 1.1 }}
              >
                {item.title}
              </h3>
            </div>

            {/* Right: content */}
            <div className="relative w-full pl-20 pr-2 md:pl-4">
              {/* Title (mobile only) */}
              <h3
                className="mb-3 block md:hidden text-xl font-bold"
                style={{ color: 'var(--ink)', letterSpacing: '-0.03em' }}
              >
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        {/* Track line */}
        <div
          className="absolute left-[1.1875rem] top-0 w-[2px] overflow-hidden"
          style={{ height }}
        >
          <div
            className="absolute inset-0 w-[2px]"
            style={{
              background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.28) 15%, rgba(255,255,255,0.28) 85%, transparent 100%)',
            }}
          />
          <motion.div
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
              background: 'linear-gradient(to bottom, #8dccf3, #6bb1ad, #8ccb63, #e6748e)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

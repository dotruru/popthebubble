import { HTMLAttributes } from 'react'
import { GlassSurface } from './GlassSurface'

type GlassVariant = 'default' | 'clear' | 'milk' | 'blue' | 'pink'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
}

export function GlassCard({ variant = 'default', className = '', children, ...props }: GlassCardProps) {
  return (
    <GlassSurface
      variant={variant}
      className={`interactive-glass rounded-lg p-8 ${className}`.trim()}
      {...props}
    >
      {children}
    </GlassSurface>
  )
}

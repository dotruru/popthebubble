import { HTMLAttributes } from 'react'

type GlassVariant = 'default' | 'clear' | 'milk' | 'blue' | 'pink'

interface GlassSurfaceProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
}

export function GlassSurface({
  variant = 'default',
  className = '',
  children,
  ...props
}: GlassSurfaceProps) {
  const variantClass = variant === 'default' ? '' : `glass--${variant}`
  return (
    <div className={`glass ${variantClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  )
}

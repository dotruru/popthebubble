import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Button } from '@/components/ui/button'

type ButtonVariant = 'primary' | 'secondary'

interface GlassButtonBaseProps {
  variant?: ButtonVariant
  className?: string
}

type GlassButtonProps =
  | (GlassButtonBaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  | (GlassButtonBaseProps & { href?: never } & ButtonHTMLAttributes<HTMLButtonElement>)

export function GlassButton({ variant = 'primary', className = '', children, ...props }: GlassButtonProps) {
  const cls = `glass-button glass-button--${variant} ${className}`.trim()

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <Button asChild variant="ghost" className={cls}>
        <a href={href} {...anchorProps}>{children}</a>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      className={cls}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </Button>
  )
}

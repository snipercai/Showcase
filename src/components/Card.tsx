import { memo, ReactNode } from 'react'
import cn from 'classnames'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  variant?: 'default' | 'gradient' | 'glow'
}

export const Card = memo(function Card({ 
  children, 
  className, 
  onClick,
  variant = 'default'
}: CardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl transition-all duration-300',
        'glass-card',
        onClick && 'cursor-pointer hover-lift',
        variant === 'gradient' && 'gradient-border',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {variant === 'glow' && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-hero pointer-events-none opacity-50" />
      )}
      <div className="relative">{children}</div>
    </div>
  )
})

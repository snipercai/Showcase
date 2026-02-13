import { memo } from 'react'
import cn from 'classnames'

interface TagProps {
  label: string
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'tertiary' | 'cyan' | 'lime' | 'orange' | 'purple'
}

export const Tag = memo(function Tag({ 
  label, 
  className, 
  onClick,
  variant = 'primary'
}: TagProps) {
  const variantStyles = {
    primary: 'bg-accent-primary/10 border-accent-primary/25 text-accent-primary hover:bg-accent-primary/20 hover:shadow-glow-primary',
    secondary: 'bg-accent-secondary/10 border-accent-secondary/25 text-accent-secondary hover:bg-accent-secondary/20 hover:shadow-glow-secondary',
    success: 'bg-accent-success/10 border-accent-success/25 text-accent-success hover:bg-accent-success/20 hover:shadow-glow-success',
    warning: 'bg-accent-warning/10 border-accent-warning/25 text-accent-warning hover:bg-accent-warning/20',
    tertiary: 'bg-accent-tertiary/10 border-accent-tertiary/25 text-accent-tertiary hover:bg-accent-tertiary/20 hover:shadow-glow-secondary',
    cyan: 'bg-accent-cyan/10 border-accent-cyan/25 text-accent-cyan hover:bg-accent-cyan/20 hover:shadow-glow-primary',
    lime: 'bg-accent-lime/10 border-accent-lime/25 text-accent-lime hover:bg-accent-lime/20 hover:shadow-glow-success',
    orange: 'bg-accent-orange/10 border-accent-orange/25 text-accent-orange hover:bg-accent-orange/20',
    purple: 'bg-accent-purple/10 border-accent-purple/25 text-accent-purple hover:bg-accent-purple/20 hover:shadow-glow-secondary',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-mono font-medium rounded-full border transition-all duration-200',
        variantStyles[variant],
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {label}
    </span>
  )
})

import { type ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning'
}

export function Tag({ children, className = '', variant = 'default' }: TagProps) {
  const variantClasses = {
    default: 'bg-bg-tertiary text-text-muted',
    primary: 'bg-accent-primary/10 text-accent-primary',
    secondary: 'bg-accent-secondary/10 text-accent-secondary',
    success: 'bg-accent-success/10 text-accent-success',
    warning: 'bg-accent-warning/10 text-accent-warning',
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  )
}

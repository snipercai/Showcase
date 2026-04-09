import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-2xl bg-gradient-to-br from-bg-tertiary to-bg-secondary border border-border-subtle ${className}`}>
      {children}
    </div>
  )
}

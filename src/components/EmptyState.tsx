import { memo, ReactNode } from 'react'

interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export const EmptyState = memo(function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      {icon && (
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-accent-primary/20 blur-2xl rounded-full" />
          <div className="relative text-text-muted">
            {icon}
          </div>
        </div>
      )}
      <h3 className="text-xl font-display font-semibold text-text-primary mb-2">{title}</h3>
      {description && <p className="text-text-secondary mb-6 max-w-md">{description}</p>}
      {action}
    </div>
  )
})

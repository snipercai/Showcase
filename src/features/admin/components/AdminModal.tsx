import { X } from 'lucide-react'
import { Card } from '@/components'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function AdminModal({ isOpen, onClose, title, children }: AdminModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border-default">
          <h2 className="text-lg font-display font-semibold text-text-primary">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </Card>
    </div>
  )
}

import { memo } from 'react'
import { ExternalLink, Sparkles } from 'lucide-react'
import { Card, Tag } from '@/components'
import type { ToolItem } from '../types'

interface ToolCardProps {
  tool: ToolItem
}

export const ToolCard = memo(function ToolCard({ tool }: ToolCardProps) {
  return (
    <Card className="h-full flex flex-col p-6 group">
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-success transition-colors duration-300">
            {tool.name}
          </h3>
          {tool.isFree && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent-success/10 border border-accent-success/20 text-accent-success text-xs font-mono whitespace-nowrap">
              <Sparkles className="w-3 h-3" />
              免费
            </span>
          )}
        </div>
        
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {tool.tags.map((tag: string) => (
            <Tag key={tag} label={tag} variant="success" />
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border-subtle flex items-center justify-between">
        <span className="px-3 py-1.5 rounded-lg bg-bg-tertiary text-text-muted text-xs font-mono">
          {tool.category}
        </span>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-accent-primary text-sm font-medium hover:text-accent-secondary transition-colors duration-300 group/link"
        >
          访问网站
          <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300" />
        </a>
      </div>
    </Card>
  )
})

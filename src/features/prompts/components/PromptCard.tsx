import { memo, useState } from 'react'
import { Copy, Check, Sparkles } from 'lucide-react'
import { Card, Tag } from '@/components'
import type { PromptItem } from '../types'

interface PromptCardProps {
  prompt: PromptItem
}

export const PromptCard = memo(function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="h-full flex flex-col p-6 group">
      <div className="flex-1 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-tertiary transition-colors duration-300">
            {prompt.title}
          </h3>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-bg-tertiary border border-border-default text-text-muted hover:text-accent-primary hover:border-accent-primary/30 hover:bg-accent-primary/10 transition-all duration-300"
            title="复制提示词"
          >
            {copied ? <Check className="w-4 h-4 text-accent-success" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-text rounded-full" />
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-4 pl-4 whitespace-pre-wrap font-mono">
            {prompt.content}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map((tag: string) => (
            <Tag key={tag} label={tag} variant="tertiary" />
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border-subtle">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-tertiary/10 border border-accent-tertiary/20 text-accent-tertiary text-xs font-mono">
          <Sparkles className="w-3 h-3" />
          {prompt.category}
        </span>
      </div>
    </Card>
  )
})

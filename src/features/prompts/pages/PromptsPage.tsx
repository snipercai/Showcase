import { Copy, Check, FileText, Plus } from 'lucide-react'
import { useState } from 'react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { Link } from 'react-router-dom'

export function PromptsPage() {
  useDocumentTitle('AI 提示词 - AI 资源中心')
  const { prompts } = useData()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">提示词库</h1>
          <p className="text-text-secondary mt-1">获取高质量的 AI 提示词，激发创意灵感</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">{prompts.length} 个提示词</span>
          <Link
            to="/admin/prompts"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cyber-button text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            添加
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {prompts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
            <FileText className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">暂无提示词</h3>
          <p className="text-text-secondary text-sm">暂时没有提示词，请稍后再试</p>
        </div>
      )}
    </div>
  )
}

function PromptCard({ prompt }: { prompt: any }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-secondary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-accent-secondary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-accent-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">{prompt.title}</h3>
            <span className="text-xs text-text-muted">{prompt.category}</span>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            copied
              ? 'bg-accent-success/10 text-accent-success'
              : 'bg-accent-secondary/10 text-accent-secondary hover:bg-accent-secondary/20'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? '已复制' : '复制'}
        </button>
      </div>

      <div className="p-4 rounded-xl bg-bg-tertiary mb-4">
        <p className="text-sm text-text-secondary leading-relaxed">&ldquo;{prompt.content}&rdquo;</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {prompt.tags.map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

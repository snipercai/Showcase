import { ArrowLeft, FileText, Calendar, Tag, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useParams, Link } from 'react-router-dom'

export function PromptDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { prompts } = useData()
  const prompt = prompts.find(p => p.id === id)

  const [copied, setCopied] = useState(false)

  useDocumentTitle(prompt ? `${prompt.title} - AI 资源中心` : '提示词未找到 - AI 资源中心')

  const handleCopy = () => {
    if (!prompt) return
    navigator.clipboard.writeText(prompt.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!prompt) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <FileText className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">提示词未找到</h3>
        <p className="text-text-secondary text-sm mb-4">该提示词不存在或已被删除</p>
        <Link
          to="/prompts"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-secondary text-white hover:bg-accent-secondary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link
        to="/prompts"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-secondary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </Link>

      <article className="bg-bg-elevated rounded-xl border border-border-subtle overflow-hidden">
        <div className="p-8 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-secondary/10 text-accent-secondary">
              {prompt.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <Calendar className="w-4 h-4" />
              {new Date(prompt.createdAt).toLocaleDateString('zh-CN')}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {prompt.title}
          </h1>

          <div className="relative p-6 rounded-xl bg-bg-tertiary mb-6">
            <p className="text-lg text-text-secondary leading-relaxed font-mono whitespace-pre-wrap">
              {prompt.content}
            </p>
            <button
              onClick={handleCopy}
              className={`absolute top-4 right-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                copied
                  ? 'bg-accent-success/10 text-accent-success'
                  : 'bg-bg-elevated text-text-muted hover:text-accent-secondary'
              }`}
              title="复制提示词"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制' : '复制'}
            </button>
          </div>

          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {prompt.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-tertiary text-sm text-text-muted"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-border-subtle">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                copied
                  ? 'bg-accent-success/10 text-accent-success'
                  : 'bg-accent-secondary text-white hover:bg-accent-secondary/90'
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? '已复制到剪贴板' : '复制提示词'}
            </button>
          </div>
        </div>

        <div className="px-8 py-4 bg-bg-tertiary border-t border-border-subtle">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>最后更新：{new Date(prompt.updatedAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>
      </article>
    </div>
  )
}

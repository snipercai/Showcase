import { ExternalLink, Sparkles, Plus } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { Link } from 'react-router-dom'

export function ToolsPage() {
  useDocumentTitle('AI 工具 - AI 资源中心')
  const { tools } = useData()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">AI 工具</h1>
          <p className="text-text-secondary mt-1">发现和使用最新的 AI 工具</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">{tools.length} 个工具</span>
          <Link
            to="/admin/tools"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cyber-button text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            添加
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="group p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => window.location.href = `/tools/${tool.id}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-accent-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{tool.name}</h3>
                  <span className="text-xs text-text-muted">{tool.category}</span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                tool.isFree ? 'bg-accent-success/10 text-accent-success' : 'bg-accent-warning/10 text-accent-warning'
              }`}>
                {tool.isFree ? '免费' : '付费'}
              </span>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-2">{tool.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {tool.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-border-subtle">
              <a
                href={tool.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-accent-primary hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                访问网站
              </a>
            </div>
          </div>
        ))}
      </div>

      {tools.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">暂无工具</h3>
          <p className="text-text-secondary text-sm">暂时没有工具，请稍后再试</p>
        </div>
      )}
    </div>
  )
}

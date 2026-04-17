import { ArrowLeft, ExternalLink, Globe, Calendar, Tag } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useParams, Link } from 'react-router-dom'

export function ResourceDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { resources } = useData()
  const resource = resources.find(r => r.id === id)

  useDocumentTitle(resource ? `${resource.name} - AI 资源中心` : '资源未找到 - AI 资源中心')

  if (!resource) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <Globe className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">资源未找到</h3>
        <p className="text-text-secondary text-sm mb-4">该资源不存在或已被删除</p>
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors"
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
        to="/resources"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </Link>

      <article className="bg-bg-elevated rounded-xl border border-border-subtle overflow-hidden">
        <div className="p-8 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-primary/10 text-accent-primary">
              {resource.category}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              resource.isFree ? 'bg-accent-success/10 text-accent-success' : 'bg-accent-warning/10 text-accent-warning'
            }`}>
              {resource.isFree ? '免费' : '付费'}
            </span>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <Calendar className="w-4 h-4" />
              {new Date(resource.createdAt).toLocaleDateString('zh-CN')}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {resource.name}
          </h1>

          <p className="text-lg text-text-secondary mb-6">
            {resource.description}
          </p>

          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {resource.tags.map((tag) => (
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
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-primary text-white font-medium hover:bg-accent-primary/90 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              <span>访问网站</span>
            </a>
          </div>
        </div>

        <div className="px-8 py-4 bg-bg-tertiary border-t border-border-subtle">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>最后更新：{new Date(resource.updatedAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>
      </article>
    </div>
  )
}

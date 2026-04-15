import { Newspaper, Plus, ArrowRight } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { Link } from 'react-router-dom'

export function NewsPage() {
  useDocumentTitle('行业资讯 - AI 资源中心')
  const { news } = useData()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">行业资讯</h1>
          <p className="text-text-secondary mt-1">了解 AI 领域的最新动态和技术趋势</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">{news.length} 条资讯</span>
          <Link
            to="/admin/news"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cyber-button text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            添加
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="group p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-warning/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-warning/10 flex items-center justify-center flex-shrink-0">
                <Newspaper className="w-6 h-6 text-accent-warning" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-text-primary group-hover:text-accent-warning transition-colors">
                    {item.title}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent-warning group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-sm text-text-secondary line-clamp-2 mb-3">{item.content}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
                    {item.category}
                  </span>
                  <span className="text-xs text-text-muted">
                    {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {news.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
            <Newspaper className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">暂无资讯</h3>
          <p className="text-text-secondary text-sm">暂时没有资讯，请稍后再试</p>
        </div>
      )}
    </div>
  )
}

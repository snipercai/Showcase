import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock } from 'lucide-react'
import { getNewsById } from '../api'
import { useDocumentTitle } from '@/shared/hooks'
import { Card, Tag, MarkdownRenderer } from '@/components'
import type { NewsItem } from '../types'

export function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [news, setNews] = useState<NewsItem | null>(null)

  useEffect(() => {
    if (id) {
      getNewsById(id).then((item) => setNews(item ?? null))
    }
  }, [id])

  useDocumentTitle(news ? `${news.title} - AI 资讯` : '加载中...')

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12 text-text-muted animate-pulse">
          加载中...
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link
        to="/news"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary mb-8 transition-colors duration-300 group animate-slide-up"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
        返回资讯列表
      </Link>

      <div className="space-y-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-mono">
                {news.category}
              </span>
              <div className="flex items-center gap-1.5 text-text-muted text-xs font-mono">
                <Clock className="w-3 h-3" />
                <span>{new Date(news.createdAt).toLocaleDateString('zh-CN')}</span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary leading-tight">
              {news.title}
            </h1>
            
            <p className="text-text-secondary text-lg leading-relaxed">
              {news.summary}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle">
              {news.tags.map((tag: string) => (
                <Tag key={tag} label={tag} variant="primary" />
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <MarkdownRenderer content={news.content} />
        </Card>
      </div>
    </div>
  )
}

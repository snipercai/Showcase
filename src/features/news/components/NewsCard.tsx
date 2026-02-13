import { memo } from 'react'
import { Clock, ArrowRight } from 'lucide-react'
import type { NewsItem } from '../types'

interface NewsCardProps {
  news: NewsItem
  onClick?: () => void
}

export const NewsCard = memo(function NewsCard({ news, onClick }: NewsCardProps) {
  return (
    <article
      onClick={onClick}
      className="group cursor-pointer py-6 border-b border-border-subtle hover:bg-bg-tertiary/30 transition-all duration-300 -mx-4 px-4"
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-shrink-0 md:w-32">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-xs font-mono">
            {news.category}
          </span>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-300 mb-2 line-clamp-2">
            {news.title}
          </h3>
          
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-3">
            {news.summary}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-text-muted">
            <div className="flex items-center gap-1.5 font-mono">
              <Clock className="w-3 h-3" />
              <span>{new Date(news.createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {news.tags.slice(0, 3).map((tag: string) => (
                <span key={tag} className="text-accent-primary/60 hover:text-accent-primary transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 self-center md:self-start">
          <div className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border-default flex items-center justify-center text-text-muted group-hover:text-accent-primary group-hover:border-accent-primary/30 group-hover:bg-accent-primary/10 transition-all duration-300">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </article>
  )
})

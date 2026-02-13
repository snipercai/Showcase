import { memo } from 'react'
import { NewsCard } from './NewsCard'
import type { NewsItem } from '../types'

interface NewsListProps {
  news: NewsItem[]
  onNewsClick?: (news: NewsItem) => void
}

export const NewsList = memo(function NewsList({ news, onNewsClick }: NewsListProps) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无资讯
      </div>
    )
  }

  return (
    <div className="divide-y divide-white/5">
      {news.map((item, index) => (
        <div 
          key={item.id} 
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <NewsCard
            news={item}
            onClick={() => onNewsClick?.(item)}
          />
        </div>
      ))}
    </div>
  )
})

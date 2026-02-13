import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Newspaper, Search, Filter } from 'lucide-react'
import { NewsList } from '../components'
import { getNews } from '../api'
import { useSearch } from '@/shared/utils/search'
import { useDocumentTitle } from '@/shared/hooks'
import { SearchInput, EmptyState } from '@/components'
import { NEWS_CATEGORIES } from '@/shared/constants'
import type { NewsItem } from '../types'

export function NewsPage() {
  useDocumentTitle('AI 资讯 - AI 资源中心')
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    getNews().then(setNews)
  }, [])

  const filteredByCategory = useMemo(() => {
    if (!selectedCategory) return news
    return news.filter((item) => item.category === selectedCategory)
  }, [news, selectedCategory])

  const filteredNews = useSearch(
    filteredByCategory,
    searchQuery,
    ['title', 'summary', 'tags']
  )

  const handleNewsClick = (item: NewsItem) => {
    navigate(`/news/${item.id}`)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 animate-slide-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
            <Newspaper className="w-5 h-5 text-accent-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">AI 资讯</h1>
        </div>
        <p className="text-text-secondary ml-14">获取最新的 AI 行业动态、技术突破和产品发布资讯</p>
      </div>

      <div className="flex flex-col gap-4 mb-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜索资讯..."
            className="pl-12"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex items-center gap-2 text-text-muted text-sm flex-shrink-0">
            <Filter className="w-4 h-4" />
          </div>
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                : 'bg-bg-tertiary text-text-secondary border border-border-default hover:border-border-strong hover:text-text-primary'
            }`}
          >
            全部
          </button>
          {NEWS_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30'
                  : 'bg-bg-tertiary text-text-secondary border border-border-default hover:border-border-strong hover:text-text-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
        {filteredNews.length === 0 ? (
          <EmptyState
            icon={<Newspaper className="w-16 h-16" />}
            title="暂无资讯"
            description={searchQuery ? '尝试其他搜索关键词' : '请稍后再来查看'}
          />
        ) : (
          <NewsList news={filteredNews} onNewsClick={handleNewsClick} />
        )}
      </div>
    </div>
  )
}

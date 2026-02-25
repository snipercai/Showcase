import { useState, useEffect, useMemo } from 'react'
import { FileText, Search, Filter } from 'lucide-react'
import { PromptList } from '../components'
import { getPrompts } from '../api'
import { useSearch } from '@/shared/utils/search'
import { useDocumentTitle } from '@/shared/hooks'
import { SearchInput, EmptyState } from '@/components'
import { PROMPT_CATEGORIES } from '@/shared/constants'
import type { PromptItem } from '../types'

export function PromptsPage() {
  useDocumentTitle('提示词库 - AI 资源中心')
  const [prompts, setPrompts] = useState<PromptItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    getPrompts().then(setPrompts)
  }, [])

  const filteredByCategory = useMemo(() => {
    if (!selectedCategory) return prompts
    return prompts.filter((item) => item.category === selectedCategory)
  }, [prompts, selectedCategory])

  const filteredPrompts = useSearch(
    filteredByCategory,
    searchQuery,
    ['title', 'content', 'tags']
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-purple/10 border border-accent-purple/20">
            <FileText className="w-5 h-5 text-accent-purple" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">提示词库</h1>
        </div>
        <p className="text-text-secondary ml-14">精选高质量提示词模板，助力 AI 对话</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜索提示词..."
            className="pl-12"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center gap-2 text-gray-500 text-sm mr-2">
          <Filter className="w-4 h-4" />
          <span>分类筛选</span>
        </div>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-xl text-sm font-medium font-display transition-all duration-300 ${
            selectedCategory === null
              ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          全部
        </button>
        {PROMPT_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium font-display transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-accent-purple/20 text-accent-purple border border-accent-purple/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredPrompts.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-16 h-16" />}
          title="暂无提示词"
          description={searchQuery ? '尝试其他搜索关键词' : '请稍后再来查看'}
        />
      ) : (
        <PromptList prompts={filteredPrompts} />
      )}
    </div>
  )
}

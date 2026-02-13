import { useState, useEffect, useMemo } from 'react'
import { Wrench, Search, Filter } from 'lucide-react'
import { ToolList } from '../components'
import { getTools } from '../api'
import { useSearch } from '@/shared/utils/search'
import { useDocumentTitle } from '@/shared/hooks'
import { SearchInput, EmptyState } from '@/components'
import { TOOL_CATEGORIES } from '@/shared/constants'
import type { ToolItem } from '../types'

export function ToolsPage() {
  useDocumentTitle('AI 工具 - AI 资源中心')
  const [tools, setTools] = useState<ToolItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    getTools().then(setTools)
  }, [])

  const filteredByCategory = useMemo(() => {
    if (!selectedCategory) return tools
    return tools.filter((item) => item.category === selectedCategory)
  }, [tools, selectedCategory])

  const filteredTools = useSearch(
    filteredByCategory,
    searchQuery,
    ['name', 'description', 'tags']
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-lime/10 border border-accent-lime/20">
            <Wrench className="w-5 h-5 text-accent-lime" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white">AI 工具</h1>
        </div>
        <p className="text-gray-400 ml-14">探索各类 AI 工具，提升工作效率和创造力</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜索工具..."
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
              ? 'bg-accent-lime/20 text-accent-lime border border-accent-lime/30'
              : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
          }`}
        >
          全部
        </button>
        {TOOL_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-sm font-medium font-display transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-accent-lime/20 text-accent-lime border border-accent-lime/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredTools.length === 0 ? (
        <EmptyState
          icon={<Wrench className="w-16 h-16" />}
          title="暂无工具"
          description={searchQuery ? '尝试其他搜索关键词' : '请稍后再来查看'}
        />
      ) : (
        <ToolList tools={filteredTools} />
      )}
    </div>
  )
}

import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Search, Newspaper, Wrench, FileText, FolderGit2, Command } from 'lucide-react'
import { searchAll } from '../api'
import { Card } from '@/components'
import type { SearchResult, NewsItem, ToolItem, PromptItem, ProjectItem } from '../types'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal = memo(function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (query.trim()) {
      const searchResults = searchAll(query)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'news':
        return <Newspaper className="w-4 h-4" />
      case 'tools':
        return <Wrench className="w-4 h-4" />
      case 'prompts':
        return <FileText className="w-4 h-4" />
      case 'projects':
        return <FolderGit2 className="w-4 h-4" />
      default:
        return null
    }
  }

  const getModuleColor = (type: string) => {
    switch (type) {
      case 'news':
        return 'text-accent-cyan'
      case 'tools':
        return 'text-accent-lime'
      case 'prompts':
        return 'text-accent-purple'
      case 'projects':
        return 'text-accent-orange'
      default:
        return 'text-gray-400'
    }
  }

  const handleItemClick = (type: string, id: string) => {
    onClose()
    switch (type) {
      case 'news':
        navigate(`/news/${id}`)
        break
      case 'tools':
        navigate('/tools')
        break
      case 'prompts':
        navigate('/prompts')
        break
      case 'projects':
        navigate('/projects')
        break
    }
  }

  const getItemTitle = (item: NewsItem | ToolItem | PromptItem | ProjectItem, type: string) => {
    switch (type) {
      case 'news':
        return (item as NewsItem).title
      case 'tools':
        return (item as ToolItem).name
      case 'prompts':
        return (item as PromptItem).title
      case 'projects':
        return (item as ProjectItem).title
      default:
        return ''
    }
  }

  const getItemDescription = (item: NewsItem | ToolItem | PromptItem | ProjectItem, type: string) => {
    switch (type) {
      case 'news':
        return (item as NewsItem).summary
      case 'tools':
        return (item as ToolItem).description
      case 'prompts':
        return (item as PromptItem).content.slice(0, 100) + '...'
      case 'projects':
        return (item as ProjectItem).description
      default:
        return ''
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-dark-900/80 backdrop-blur-xl" 
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-start justify-center pt-24 px-4">
        <Card className="w-full max-w-2xl relative animate-scale-in p-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-magenta/5 pointer-events-none" />
          
          <div className="relative p-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                <Search className="w-5 h-5 text-accent-cyan" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索资讯、工具、提示词、项目..."
                className="flex-1 bg-transparent text-lg text-white placeholder-gray-500 outline-none font-body"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" />
                <span>ESC 关闭</span>
              </span>
              <span className="text-white/20">•</span>
              <span>输入关键词搜索全站内容</span>
            </div>
          </div>

          <div className="relative max-h-96 overflow-y-auto">
            {results.length > 0 && (
              <div className="p-4 space-y-4">
                {results.map((result) => (
                  <div key={result.type}>
                    <div className={`flex items-center gap-2 text-sm font-medium ${getModuleColor(result.type)} mb-2 px-2`}>
                      {getModuleIcon(result.type)}
                      {result.moduleName}
                      <span className="text-gray-600 font-mono">({result.items.length})</span>
                    </div>
                    <div className="space-y-1">
                      {result.items.slice(0, 3).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleItemClick(result.type, item.id)}
                          className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group"
                        >
                          <div className="font-medium text-white group-hover:text-accent-cyan transition-colors duration-200">
                            {getItemTitle(item, result.type)}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1 mt-1">
                            {getItemDescription(item, result.type)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {query && results.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>未找到相关结果</p>
                <p className="text-sm mt-2">尝试使用其他关键词</p>
              </div>
            )}

            {!query && (
              <div className="text-center py-12 text-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent-cyan/20 via-accent-magenta/20 to-accent-lime/20 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-display">输入关键词开始搜索</p>
                <p className="text-sm mt-2">搜索范围：资讯、工具、提示词、项目</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
})

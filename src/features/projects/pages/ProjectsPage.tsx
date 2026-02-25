import { useState, useEffect } from 'react'
import { FolderGit2, Search } from 'lucide-react'
import { ProjectList } from '../components'
import { getProjects } from '../api'
import { useSearch } from '@/shared/utils/search'
import { useDocumentTitle } from '@/shared/hooks'
import { SearchInput, EmptyState } from '@/components'
import type { ProjectItem } from '../types'

export function ProjectsPage() {
  useDocumentTitle('项目案例 - AI 资源中心')
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  const filteredProjects = useSearch(
    projects,
    searchQuery,
    ['title', 'description', 'techStack']
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-10 animate-slide-up">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-accent-orange/10 border border-accent-orange/20">
            <FolderGit2 className="w-5 h-5 text-accent-orange" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">项目案例</h1>
        </div>
        <p className="text-text-secondary ml-14">学习优秀的 AI 项目案例，获取灵感</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="搜索项目..."
            className="pl-12"
          />
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<FolderGit2 className="w-16 h-16" />}
          title="暂无项目"
          description={searchQuery ? '尝试其他搜索关键词' : '请稍后再来查看'}
        />
      ) : (
        <ProjectList projects={filteredProjects} />
      )}
    </div>
  )
}

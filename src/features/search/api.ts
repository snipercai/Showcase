import { newsData, toolsData, promptsData, projectsData } from '@/data'
import { searchAllModules } from '@/shared/utils/search'
import type { SearchResult, NewsItem, ToolItem, PromptItem, ProjectItem } from './types'

export function searchAll(query: string): SearchResult[] {
  const results = searchAllModules(query, [
    {
      name: 'AI 资讯',
      items: newsData as unknown as { id: string; [key: string]: unknown }[],
      searchFields: ['title', 'summary', 'tags'],
    },
    {
      name: 'AI 工具',
      items: toolsData as unknown as { id: string; [key: string]: unknown }[],
      searchFields: ['name', 'description', 'tags'],
    },
    {
      name: '提示词库',
      items: promptsData as unknown as { id: string; [key: string]: unknown }[],
      searchFields: ['title', 'content', 'tags'],
    },
    {
      name: '项目案例',
      items: projectsData as unknown as { id: string; [key: string]: unknown }[],
      searchFields: ['title', 'description', 'techStack'],
    },
  ])

  return results.map((result) => ({
    type: result.moduleName === 'AI 资讯' ? 'news' :
          result.moduleName === 'AI 工具' ? 'tools' :
          result.moduleName === '提示词库' ? 'prompts' : 'projects',
    moduleName: result.moduleName,
    items: result.items as unknown as (NewsItem | ToolItem | PromptItem | ProjectItem)[],
  }))
}

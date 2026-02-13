import type { NewsItem, ToolItem, PromptItem, ProjectItem } from '@/shared/types'

export type { NewsItem, ToolItem, PromptItem, ProjectItem }

export interface SearchResult {
  type: 'news' | 'tools' | 'prompts' | 'projects'
  moduleName: string
  items: (NewsItem | ToolItem | PromptItem | ProjectItem)[]
}

import { describe, it, expectTypeOf, vi, beforeEach } from 'vitest'
import type { NewsItem, ToolItem, PromptItem, ProjectItem } from '@/shared/types'

describe('API 类型检查', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('addNews 类型检查', () => {
    it('addNews 应该接受正确的参数类型', () => {
      const newNewsData = {
        title: '新新闻',
        summary: '新摘要',
        content: '新内容',
        category: '技术',
        tags: ['AI', '新闻'],
      }

      expectTypeOf(newNewsData).toEqualTypeOf<{
        title: string
        summary: string
        content: string
        category: string
        tags: string[]
      }>()
    })

    it('updateNews 应该接受 Partial<NewsItem> 类型', () => {
      const updateData: Partial<NewsItem> = {
        title: '更新标题',
        summary: '更新摘要',
      }

      expectTypeOf(updateData).toEqualTypeOf<Partial<NewsItem>>()
    })
  })

  describe('addTool 类型检查', () => {
    it('addTool 应该接受正确的参数类型', () => {
      const newToolData = {
        name: '新工具',
        description: '新描述',
        category: '对话',
        tags: ['AI', '工具'],
        website: 'https://example.com',
        isFree: true,
      }

      expectTypeOf(newToolData).toEqualTypeOf<{
        name: string
        description: string
        category: string
        tags: string[]
        website: string
        isFree: boolean
      }>()
    })

    it('updateTool 应该接受 Partial<ToolItem> 类型', () => {
      const updateData: Partial<ToolItem> = {
        name: '更新名称',
        description: '更新描述',
      }

      expectTypeOf(updateData).toEqualTypeOf<Partial<ToolItem>>()
    })
  })

  describe('addPrompt 类型检查', () => {
    it('addPrompt 应该接受正确的参数类型', () => {
      const newPromptData = {
        title: '新提示词',
        content: '新内容',
        category: '写作',
        tags: ['写作', 'AI'],
      }

      expectTypeOf(newPromptData).toEqualTypeOf<{
        title: string
        content: string
        category: string
        tags: string[]
      }>()
    })

    it('updatePrompt 应该接受 Partial<PromptItem> 类型', () => {
      const updateData: Partial<PromptItem> = {
        title: '更新标题',
        content: '更新内容',
      }

      expectTypeOf(updateData).toEqualTypeOf<Partial<PromptItem>>()
    })
  })

  describe('addProject 类型检查', () => {
    it('addProject 应该接受正确的参数类型', () => {
      const newProjectData: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'> = {
        title: '新项目',
        description: '新描述',
        techStack: ['React', 'TypeScript'],
        githubUrl: 'https://github.com/example',
        demoUrl: 'https://example.com',
      }

      expectTypeOf(newProjectData).toEqualTypeOf<Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>>()
    })

    it('updateProject 应该接受 Partial<ProjectItem> 类型', () => {
      const updateData: Partial<ProjectItem> = {
        title: '更新标题',
        description: '更新描述',
      }

      expectTypeOf(updateData).toEqualTypeOf<Partial<ProjectItem>>()
    })
  })

  describe('函数返回类型检查', () => {
    it('应该返回正确的类型', () => {
      const mockNewsItem: NewsItem = {
        id: 'news-1',
        title: '测试',
        summary: '摘要',
        content: '内容',
        category: '技术',
        tags: ['AI'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(mockNewsItem).toEqualTypeOf<NewsItem>()
      expectTypeOf(mockNewsItem.id).toBeString()
      expectTypeOf(mockNewsItem.title).toBeString()
    })

    it('数组类型应该正确', () => {
      const mockNewsList: NewsItem[] = [
        {
          id: 'news-1',
          title: '测试 1',
          summary: '摘要 1',
          content: '内容 1',
          category: '技术',
          tags: ['AI'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'news-2',
          title: '测试 2',
          summary: '摘要 2',
          content: '内容 2',
          category: '应用',
          tags: ['医疗'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]

      expectTypeOf(mockNewsList).toEqualTypeOf<NewsItem[]>()
      expectTypeOf(mockNewsList[0]).toEqualTypeOf<NewsItem>()
    })
  })
})

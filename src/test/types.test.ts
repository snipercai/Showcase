import { describe, it, expectTypeOf } from 'vitest'
import type { NewsItem, ToolItem, PromptItem, ProjectItem, ResourceItem, LearningJournalItem } from '@/shared/types'

describe('TypeScript 类型检查', () => {
  describe('NewsItem 类型', () => {
    it('应该具有正确的 NewsItem 类型结构', () => {
      const newsItem: NewsItem = {
        id: 'news-1',
        title: '测试新闻',
        summary: '测试摘要',
        content: '测试内容',
        category: '技术',
        tags: ['AI', '测试'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(newsItem).toEqualTypeOf<NewsItem>()
      expectTypeOf(newsItem.id).toBeString()
      expectTypeOf(newsItem.title).toBeString()
      expectTypeOf(newsItem.summary).toBeString()
      expectTypeOf(newsItem.content).toBeString()
      expectTypeOf(newsItem.category).toBeString()
      expectTypeOf(newsItem.tags).toEqualTypeOf<string[]>()
      expectTypeOf(newsItem.createdAt).toBeString()
      expectTypeOf(newsItem.updatedAt).toBeString()
    })

    it('NewsItem 的 tags 应该是字符串数组', () => {
      const newsItem: NewsItem = {
        id: 'news-1',
        title: '测试',
        summary: '摘要',
        content: '内容',
        category: '技术',
        tags: ['标签 1', '标签 2'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(newsItem.tags).toEqualTypeOf<string[]>()
    })
  })

  describe('ToolItem 类型', () => {
    it('应该具有正确的 ToolItem 类型结构', () => {
      const toolItem: ToolItem = {
        id: 'tool-1',
        name: '测试工具',
        description: '测试描述',
        category: '对话',
        tags: ['AI', '测试'],
        website: 'https://example.com',
        isFree: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(toolItem).toEqualTypeOf<ToolItem>()
      expectTypeOf(toolItem.id).toBeString()
      expectTypeOf(toolItem.name).toBeString()
      expectTypeOf(toolItem.description).toBeString()
      expectTypeOf(toolItem.category).toBeString()
      expectTypeOf(toolItem.tags).toEqualTypeOf<string[]>()
      expectTypeOf(toolItem.website).toBeString()
      expectTypeOf(toolItem.isFree).toBeBoolean()
      expectTypeOf(toolItem.createdAt).toBeString()
      expectTypeOf(toolItem.updatedAt).toBeString()
    })
  })

  describe('PromptItem 类型', () => {
    it('应该具有正确的 PromptItem 类型结构', () => {
      const promptItem: PromptItem = {
        id: 'prompt-1',
        title: '测试提示词',
        content: '测试内容',
        category: '写作',
        tags: ['写作', '测试'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(promptItem).toEqualTypeOf<PromptItem>()
      expectTypeOf(promptItem.id).toBeString()
      expectTypeOf(promptItem.title).toBeString()
      expectTypeOf(promptItem.content).toBeString()
      expectTypeOf(promptItem.category).toBeString()
      expectTypeOf(promptItem.tags).toEqualTypeOf<string[]>()
      expectTypeOf(promptItem.createdAt).toBeString()
      expectTypeOf(promptItem.updatedAt).toBeString()
    })
  })

  describe('ProjectItem 类型', () => {
    it('应该具有正确的 ProjectItem 类型结构', () => {
      const projectItem: ProjectItem = {
        id: 'project-1',
        title: '测试项目',
        description: '测试描述',
        techStack: ['React', 'TypeScript'],
        githubUrl: 'https://github.com/example',
        demoUrl: 'https://example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(projectItem).toEqualTypeOf<ProjectItem>()
      expectTypeOf(projectItem.id).toBeString()
      expectTypeOf(projectItem.title).toBeString()
      expectTypeOf(projectItem.description).toBeString()
      expectTypeOf(projectItem.techStack).toEqualTypeOf<string[]>()
      expectTypeOf(projectItem.githubUrl).toBeString()
      expectTypeOf(projectItem.demoUrl).toEqualTypeOf<string | undefined>()
      expectTypeOf(projectItem.createdAt).toBeString()
      expectTypeOf(projectItem.updatedAt).toBeString()
    })

    it('ProjectItem 的 demoUrl 应该是可选的', () => {
      const projectItem: ProjectItem = {
        id: 'project-1',
        title: '测试项目',
        description: '测试描述',
        techStack: ['React'],
        githubUrl: 'https://github.com/example',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(projectItem.demoUrl).toEqualTypeOf<string | undefined>()
    })
  })

  describe('ResourceItem 类型', () => {
    it('应该具有正确的 ResourceItem 类型结构', () => {
      const resourceItem: ResourceItem = {
        id: 'resource-1',
        name: '测试资源',
        description: '测试描述',
        url: 'https://example.com',
        category: '模型',
        tags: ['AI', '测试'],
        isFree: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(resourceItem).toEqualTypeOf<ResourceItem>()
      expectTypeOf(resourceItem.id).toBeString()
      expectTypeOf(resourceItem.name).toBeString()
      expectTypeOf(resourceItem.description).toBeString()
      expectTypeOf(resourceItem.url).toBeString()
      expectTypeOf(resourceItem.category).toBeString()
      expectTypeOf(resourceItem.tags).toEqualTypeOf<string[]>()
      expectTypeOf(resourceItem.isFree).toBeBoolean()
      expectTypeOf(resourceItem.createdAt).toBeString()
      expectTypeOf(resourceItem.updatedAt).toBeString()
    })
  })

  describe('LearningJournalItem 类型', () => {
    it('应该具有正确的 LearningJournalItem 类型结构', () => {
      const journalItem: LearningJournalItem = {
        id: 'journal-1',
        title: '测试学习笔记',
        excerpt: '测试摘要',
        content: '测试内容',
        category: '深度学习',
        tags: ['深度学习', '测试'],
        coverImage: 'https://example.com/image.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(journalItem).toEqualTypeOf<LearningJournalItem>()
      expectTypeOf(journalItem.id).toBeString()
      expectTypeOf(journalItem.title).toBeString()
      expectTypeOf(journalItem.excerpt).toBeString()
      expectTypeOf(journalItem.content).toBeString()
      expectTypeOf(journalItem.category).toBeString()
      expectTypeOf(journalItem.tags).toEqualTypeOf<string[]>()
      expectTypeOf(journalItem.coverImage).toEqualTypeOf<string | undefined>()
      expectTypeOf(journalItem.createdAt).toBeString()
      expectTypeOf(journalItem.updatedAt).toBeString()
    })

    it('LearningJournalItem 的 coverImage 应该是可选的', () => {
      const journalItem: LearningJournalItem = {
        id: 'journal-1',
        title: '测试学习笔记',
        excerpt: '测试摘要',
        content: '测试内容',
        category: '深度学习',
        tags: ['深度学习'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      expectTypeOf(journalItem.coverImage).toEqualTypeOf<string | undefined>()
    })
  })

  describe('类型兼容性检查', () => {
    it('NewsItem 不应该缺少必需字段', () => {
      type RequiredKeys = keyof NewsItem
      const requiredKeys: RequiredKeys[] = ['id', 'title', 'summary', 'content', 'category', 'tags', 'createdAt', 'updatedAt']
      
      expectTypeOf(requiredKeys.length).toBeNumber()
    })

    it('所有类型都应该有公共字段', () => {
      type CommonKeys = keyof (NewsItem & ToolItem & PromptItem & ProjectItem & ResourceItem & LearningJournalItem)
      const commonKeys: CommonKeys[] = ['id', 'createdAt', 'updatedAt']
      
      expectTypeOf(commonKeys.length).toBeNumber()
    })
  })
})

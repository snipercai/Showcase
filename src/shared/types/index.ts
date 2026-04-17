export interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ToolItem {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  website: string
  isFree: boolean
  createdAt: string
  updatedAt: string
}

export interface ResourceItem {
  id: string
  name: string // 网站名称
  description: string // 用途说明
  url: string // 网站地址
  category: string // 分类
  tags: string[] // 标签
  isFree: boolean // 是否免费
  createdAt: string
  updatedAt: string
}

export interface PromptItem {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  createdAt: string
  updatedAt: string
}

export interface LearningJournalItem {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage?: string
  createdAt: string
  updatedAt: string
}

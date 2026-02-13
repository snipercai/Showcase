export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface NewsItem extends BaseEntity {
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
}

export interface ToolItem extends BaseEntity {
  name: string
  description: string
  website: string
  category: string
  tags: string[]
  isFree: boolean
}

export interface PromptItem extends BaseEntity {
  title: string
  content: string
  category: string
  tags: string[]
}

export interface ProjectItem extends BaseEntity {
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
}

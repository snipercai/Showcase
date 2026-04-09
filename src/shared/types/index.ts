export interface NewsItem {
  id: string
  title: string
  content: string
  category: string
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

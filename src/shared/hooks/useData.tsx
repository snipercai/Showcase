import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ResourceItem } from '@/shared/types'

// 定义类型
interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
}

interface ToolItem {
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

interface PromptItem {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface ProjectItem {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  createdAt: string
  updatedAt: string
}

// 初始数据
const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'OpenAI 发布 GPT-5',
    content: 'OpenAI 今日发布了最新的 GPT-5 模型，性能大幅提升，支持更复杂的任务处理。',
    category: '技术',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'news-2',
    title: 'AI 在医疗领域的新应用',
    content: '研究人员使用 AI 技术成功诊断多种疾病，准确率达到 99%。',
    category: '应用',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialTools: ToolItem[] = [
  {
    id: 'tool-1',
    name: 'ChatGPT',
    description: 'OpenAI 的对话式 AI 助手',
    category: '对话',
    tags: ['AI', '对话', 'OpenAI'],
    website: 'https://chatgpt.com',
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-2',
    name: 'Midjourney',
    description: 'AI 图像生成工具',
    category: '图像',
    tags: ['AI', '图像', '生成'],
    website: 'https://midjourney.com',
    isFree: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialPrompts: PromptItem[] = [
  {
    id: 'prompt-1',
    title: '写文章',
    content: '请帮我写一篇关于人工智能发展的文章，要求内容全面，结构清晰，语言流畅。',
    category: '写作',
    tags: ['写作', '文章', 'AI'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prompt-2',
    title: '创意生成',
    content: '请为一个新的 AI 工具生成 5 个创意名称和简短描述。',
    category: '创意',
    tags: ['创意', '命名', 'AI'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialProjects: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'AI 聊天机器人',
    description: '基于 GPT 的对话式 AI 助手',
    techStack: ['React', 'Node.js', 'OpenAI API'],
    githubUrl: 'https://github.com/example/ai-chatbot',
    demoUrl: 'https://ai-chatbot.example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'project-2',
    title: '图像识别系统',
    description: '使用深度学习进行图像分类和识别',
    techStack: ['Python', 'TensorFlow', 'Flask'],
    githubUrl: 'https://github.com/example/image-recognition',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialResources: ResourceItem[] = [
  {
    id: 'resource-1',
    name: 'Hugging Face',
    description: '领先的 AI 模型社区和平台，提供大量预训练模型和数据集',
    url: 'https://huggingface.co',
    category: '模型',
    tags: ['AI', '模型', 'NLP'],
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'resource-2',
    name: 'Papers With Code',
    description: '机器学习论文和代码集合，跟踪 AI 领域最新研究进展',
    url: 'https://paperswithcode.com',
    category: '研究',
    tags: ['论文', '代码', '研究'],
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const STORAGE_KEYS = {
  news: 'ai-hub-news',
  tools: 'ai-hub-tools',
  prompts: 'ai-hub-prompts',
  projects: 'ai-hub-projects',
  resources: 'ai-hub-resources',
}

interface DataContextType {
  news: NewsItem[]
  tools: ToolItem[]
  prompts: PromptItem[]
  projects: ProjectItem[]
  resources: ResourceItem[]
  
  addNews: (item: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNews: (id: string, item: Partial<NewsItem>) => void
  deleteNews: (id: string) => void
  
  addTool: (item: Omit<ToolItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTool: (id: string, item: Partial<ToolItem>) => void
  deleteTool: (id: string) => void
  
  addPrompt: (item: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePrompt: (id: string, item: Partial<PromptItem>) => void
  deletePrompt: (id: string) => void
  
  addProject: (item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, item: Partial<ProjectItem>) => void
  deleteProject: (id: string) => void
  
  addResource: (item: Omit<ResourceItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateResource: (id: string, item: Partial<ResourceItem>) => void
  deleteResource: (id: string) => void
  
  resetToDefaults: () => void
}

const DataContext = createContext<DataContextType | null>(null)

function loadFromStorage<T>(key: string, defaultValue: T[]): T[] {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e)
  }
  return defaultValue
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e)
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.news, initialNews)
  )
  const [tools, setTools] = useState<ToolItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.tools, initialTools)
  )
  const [prompts, setPrompts] = useState<PromptItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.prompts, initialPrompts)
  )
  const [projects, setProjects] = useState<ProjectItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.projects, initialProjects)
  )
  const [resources, setResources] = useState<ResourceItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.resources, initialResources)
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.news, news)
  }, [news])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.tools, tools)
  }, [tools])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.prompts, prompts)
  }, [prompts])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects)
  }, [projects])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.resources, resources)
  }, [resources])

  const addNews = useCallback((item: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setNews(prev => [newItem, ...prev])
  }, [])

  const updateNews = useCallback((id: string, item: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => 
      n.id === id ? { ...n, ...item, updatedAt: new Date().toISOString() } : n
    ))
  }, [])

  const deleteNews = useCallback((id: string) => {
    setNews(prev => prev.filter(n => n.id !== id))
  }, [])

  const addTool = useCallback((item: Omit<ToolItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: ToolItem = {
      ...item,
      id: `tool-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setTools(prev => [newItem, ...prev])
  }, [])

  const updateTool = useCallback((id: string, item: Partial<ToolItem>) => {
    setTools(prev => prev.map(t => 
      t.id === id ? { ...t, ...item, updatedAt: new Date().toISOString() } : t
    ))
  }, [])

  const deleteTool = useCallback((id: string) => {
    setTools(prev => prev.filter(t => t.id !== id))
  }, [])

  const addPrompt = useCallback((item: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: PromptItem = {
      ...item,
      id: `prompt-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setPrompts(prev => [newItem, ...prev])
  }, [])

  const updatePrompt = useCallback((id: string, item: Partial<PromptItem>) => {
    setPrompts(prev => prev.map(p => 
      p.id === id ? { ...p, ...item, updatedAt: new Date().toISOString() } : p
    ))
  }, [])

  const deletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
  }, [])

  const addProject = useCallback((item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: ProjectItem = {
      ...item,
      id: `project-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setProjects(prev => [newItem, ...prev])
  }, [])

  const updateProject = useCallback((id: string, item: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...item, updatedAt: new Date().toISOString() } : p
    ))
  }, [])

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  const addResource = useCallback((item: Omit<ResourceItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: ResourceItem = {
      ...item,
      id: `resource-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setResources(prev => [newItem, ...prev])
  }, [])

  const updateResource = useCallback((id: string, item: Partial<ResourceItem>) => {
    setResources(prev => prev.map(r => 
      r.id === id ? { ...r, ...item, updatedAt: new Date().toISOString() } : r
    ))
  }, [])

  const deleteResource = useCallback((id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }, [])

  const resetToDefaults = useCallback(() => {
    setNews(initialNews)
    setTools(initialTools)
    setPrompts(initialPrompts)
    setProjects(initialProjects)
    setResources(initialResources)
  }, [])

  return (
    <DataContext.Provider value={{
      news,
      tools,
      prompts,
      projects,
      resources,
      addNews,
      updateNews,
      deleteNews,
      addTool,
      updateTool,
      deleteTool,
      addPrompt,
      updatePrompt,
      deletePrompt,
      addProject,
      updateProject,
      deleteProject,
      addResource,
      updateResource,
      deleteResource,
      resetToDefaults,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

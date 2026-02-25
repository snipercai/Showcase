import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { NewsItem, ToolItem, PromptItem, ProjectItem } from '@/shared/types'
import { newsData as initialNews } from '@/data/news'
import { toolsData as initialTools } from '@/data/tools'
import { promptsData as initialPrompts } from '@/data/prompts'
import { projectsData as initialProjects } from '@/data/projects'

const STORAGE_KEYS = {
  news: 'ai-hub-news',
  tools: 'ai-hub-tools',
  prompts: 'ai-hub-prompts',
  projects: 'ai-hub-projects',
}

interface DataContextType {
  news: NewsItem[]
  tools: ToolItem[]
  prompts: PromptItem[]
  projects: ProjectItem[]
  
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

  const resetToDefaults = useCallback(() => {
    setNews(initialNews)
    setTools(initialTools)
    setPrompts(initialPrompts)
    setProjects(initialProjects)
  }, [])

  return (
    <DataContext.Provider value={{
      news,
      tools,
      prompts,
      projects,
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

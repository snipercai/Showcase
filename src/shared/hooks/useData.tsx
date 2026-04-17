import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type {
  ResourceItem,
  LearningJournalItem,
  NewsItem,
  ToolItem,
  PromptItem,
  ProjectItem
} from '@/shared/types'
import {
  initialNews,
  initialTools,
  initialPrompts,
  initialProjects,
  initialResources,
  initialLearningJournals
} from '@/data'
import { syncDataFromGitHub, type SyncResult, type SyncProgress } from '@/shared/services/dataSync'
import { DATA_SYNC_CONFIG } from '@/shared/config'

const STORAGE_KEYS = {
  news: 'ai-hub-news',
  tools: 'ai-hub-tools',
  prompts: 'ai-hub-prompts',
  projects: 'ai-hub-projects',
  resources: 'ai-hub-resources',
  learningJournals: 'ai-hub-learning-journals',
}

interface DataContextType {
  news: NewsItem[]
  tools: ToolItem[]
  prompts: PromptItem[]
  projects: ProjectItem[]
  resources: ResourceItem[]
  learningJournals: LearningJournalItem[]
  
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
  
  addLearningJournal: (item: Omit<LearningJournalItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLearningJournal: (id: string, item: Partial<LearningJournalItem>) => void
  deleteLearningJournal: (id: string) => void
  
  resetToDefaults: () => void
  
  syncData: (onProgress?: (progress: SyncProgress) => void) => Promise<SyncResult>
  syncing: boolean
  lastSyncTime: number | null
  currentProgress: SyncProgress | null
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
  const [syncing, setSyncing] = useState(false)
  const [lastSyncTime, setLastSyncTime] = useState<number | null>(null)
  const [currentProgress, setCurrentProgress] = useState<SyncProgress | null>(null)
  
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
  const [learningJournals, setLearningJournals] = useState<LearningJournalItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.learningJournals, initialLearningJournals)
  )

  useEffect(() => {
    const timeStr = localStorage.getItem(DATA_SYNC_CONFIG.storage.lastSyncTimeKey)
    if (timeStr) {
      setLastSyncTime(parseInt(timeStr, 10))
    }
    
    const hasSynced = localStorage.getItem(DATA_SYNC_CONFIG.storage.hasSyncedKey)
    
    if (!hasSynced && DATA_SYNC_CONFIG.sync.autoSyncOnFirstLaunch) {
      performSync()
    }
  }, [])

  const performSync = useCallback(async (
    onProgress?: (progress: SyncProgress) => void
  ): Promise<SyncResult> => {
    setSyncing(true)
    try {
      const result = await syncDataFromGitHub((progress) => {
        setCurrentProgress(progress)
        onProgress?.(progress)
      })
      
      if (result.success && result.updated) {
        setNews(loadFromStorage(STORAGE_KEYS.news, initialNews))
        setTools(loadFromStorage(STORAGE_KEYS.tools, initialTools))
        setPrompts(loadFromStorage(STORAGE_KEYS.prompts, initialPrompts))
        setProjects(loadFromStorage(STORAGE_KEYS.projects, initialProjects))
        setResources(loadFromStorage(STORAGE_KEYS.resources, initialResources))
        setLearningJournals(loadFromStorage(STORAGE_KEYS.learningJournals, initialLearningJournals))
        
        const timeStr = localStorage.getItem(DATA_SYNC_CONFIG.storage.lastSyncTimeKey)
        if (timeStr) {
          setLastSyncTime(parseInt(timeStr, 10))
        }
      }
      
      return result
    } catch (error) {
      return {
        success: false,
        updated: false,
        message: `同步失败：${error instanceof Error ? error.message : '未知错误'}`
      }
    } finally {
      setSyncing(false)
    }
  }, [setSyncing, setLastSyncTime])

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

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.learningJournals, learningJournals)
  }, [learningJournals])

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

  const addLearningJournal = useCallback((item: Omit<LearningJournalItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: LearningJournalItem = {
      ...item,
      id: `journal-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setLearningJournals(prev => [newItem, ...prev])
  }, [])

  const updateLearningJournal = useCallback((id: string, item: Partial<LearningJournalItem>) => {
    setLearningJournals(prev => prev.map(j => 
      j.id === id ? { ...j, ...item, updatedAt: new Date().toISOString() } : j
    ))
  }, [])

  const deleteLearningJournal = useCallback((id: string) => {
    setLearningJournals(prev => prev.filter(j => j.id !== id))
  }, [])

  const resetToDefaults = useCallback(() => {
    setNews(initialNews)
    setTools(initialTools)
    setPrompts(initialPrompts)
    setProjects(initialProjects)
    setResources(initialResources)
    setLearningJournals(initialLearningJournals)
  }, [])

  return (
    <DataContext.Provider value={{
      news,
      tools,
      prompts,
      projects,
      resources,
      learningJournals,
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
      addLearningJournal,
      updateLearningJournal,
      deleteLearningJournal,
      resetToDefaults,
      syncData: performSync,
      syncing,
      lastSyncTime,
      currentProgress,
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

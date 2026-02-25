import type { ToolItem } from './types'
import { toolsData as initialTools } from '@/data/tools'

const STORAGE_KEY = 'ai-hub-tools'

function loadFromStorage(): ToolItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error loading tools from localStorage:', e)
  }
  return initialTools
}

export async function getTools(): Promise<ToolItem[]> {
  return loadFromStorage()
}

export async function getToolById(id: string): Promise<ToolItem | undefined> {
  const tools = loadFromStorage()
  return tools.find((item) => item.id === id)
}

export async function getToolsByCategory(category: string): Promise<ToolItem[]> {
  const tools = loadFromStorage()
  return tools.filter((item) => item.category === category)
}

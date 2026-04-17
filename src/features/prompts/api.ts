import type { PromptItem } from './types'
import { initialPrompts } from '@/data'

const STORAGE_KEY = 'ai-hub-prompts'

function loadFromStorage(): PromptItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error loading prompts from localStorage:', e)
  }
  return initialPrompts
}

export async function getPrompts(): Promise<PromptItem[]> {
  return loadFromStorage()
}

export async function getPromptById(id: string): Promise<PromptItem | undefined> {
  const prompts = loadFromStorage()
  return prompts.find((item) => item.id === id)
}

export async function getPromptsByCategory(category: string): Promise<PromptItem[]> {
  const prompts = loadFromStorage()
  return prompts.filter((item) => item.category === category)
}

import { promptsData } from '@/data/prompts'
import type { PromptItem } from './types'

export async function getPrompts(): Promise<PromptItem[]> {
  return promptsData
}

export async function getPromptById(id: string): Promise<PromptItem | undefined> {
  return promptsData.find((item) => item.id === id)
}

export async function getPromptsByCategory(category: string): Promise<PromptItem[]> {
  return promptsData.filter((item) => item.category === category)
}

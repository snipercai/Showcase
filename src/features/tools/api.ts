import { toolsData } from '@/data/tools'
import type { ToolItem } from './types'

export async function getTools(): Promise<ToolItem[]> {
  return toolsData
}

export async function getToolById(id: string): Promise<ToolItem | undefined> {
  return toolsData.find((item) => item.id === id)
}

export async function getToolsByCategory(category: string): Promise<ToolItem[]> {
  return toolsData.filter((item) => item.category === category)
}

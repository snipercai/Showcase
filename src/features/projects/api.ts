import type { ProjectItem } from './types'
import { projectsData as initialProjects } from '@/data/projects'

const STORAGE_KEY = 'ai-hub-projects'

function loadFromStorage(): ProjectItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error loading projects from localStorage:', e)
  }
  return initialProjects
}

export async function getProjects(): Promise<ProjectItem[]> {
  return loadFromStorage()
}

export async function getProjectById(id: string): Promise<ProjectItem | undefined> {
  const projects = loadFromStorage()
  return projects.find((item) => item.id === id)
}

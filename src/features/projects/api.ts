import { projectsData } from '@/data/projects'
import type { ProjectItem } from './types'

export async function getProjects(): Promise<ProjectItem[]> {
  return projectsData
}

export async function getProjectById(id: string): Promise<ProjectItem | undefined> {
  return projectsData.find((item) => item.id === id)
}

import { memo } from 'react'
import { ProjectCard } from './ProjectCard'
import type { ProjectItem } from '../types'

interface ProjectListProps {
  projects: ProjectItem[]
}

export const ProjectList = memo(function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无项目
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
})

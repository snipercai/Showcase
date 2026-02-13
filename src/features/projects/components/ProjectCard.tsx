import { memo } from 'react'
import { Github, ExternalLink } from 'lucide-react'
import { Card, Tag } from '@/components'
import type { ProjectItem } from '../types'

interface ProjectCardProps {
  project: ProjectItem
}

export const ProjectCard = memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col p-6 group">
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-display font-semibold text-text-primary group-hover:text-accent-warning transition-colors duration-300">
          {project.title}
        </h3>
        
        <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech: string) => (
            <Tag key={tech} label={tech} variant="warning" />
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-border-subtle flex items-center gap-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary text-sm font-medium transition-colors duration-300"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
        {project.demoUrl && (
          <>
            <span className="w-px h-4 bg-border-default" />
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent-primary hover:text-accent-secondary text-sm font-medium transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          </>
        )}
      </div>
    </Card>
  )
})

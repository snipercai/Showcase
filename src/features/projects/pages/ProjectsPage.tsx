import { Github, ExternalLink, FolderGit2, Plus } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { Link } from 'react-router-dom'

export function ProjectsPage() {
  useDocumentTitle('AI 项目 - AI 资源中心')
  const { projects } = useData()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">项目案例</h1>
          <p className="text-text-secondary mt-1">浏览优秀的 AI 项目，学习最佳实践</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">{projects.length} 个项目</span>
          <Link
            to="/admin/projects"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cyber-button text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            添加
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-tertiary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-accent-tertiary/10 flex items-center justify-center flex-shrink-0">
                <FolderGit2 className="w-5 h-5 text-accent-tertiary" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{project.title}</h3>
                <span className="text-xs text-text-muted">开源项目</span>
              </div>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-2">{project.description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.map((tech: string) => (
                <span key={tech} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-border-subtle flex items-center gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-tertiary transition-colors"
              >
                <Github className="w-4 h-4" />
                源码
              </a>
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-accent-primary hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  演示
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
            <FolderGit2 className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">暂无项目</h3>
          <p className="text-text-secondary text-sm">暂时没有项目，请稍后再试</p>
        </div>
      )}
    </div>
  )
}

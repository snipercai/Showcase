import { ArrowLeft, Github, ExternalLink, Calendar, Tag, FolderGit2 } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useParams, Link } from 'react-router-dom'

export function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { projects } = useData()
  const project = projects.find(p => p.id === id)

  useDocumentTitle(project ? `${project.title} - AI 资源中心` : '项目未找到 - AI 资源中心')

  if (!project) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <FolderGit2 className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">项目未找到</h3>
        <p className="text-text-secondary text-sm mb-4">该项目不存在或已被删除</p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-tertiary text-white hover:bg-accent-tertiary/90 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回列表
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-tertiary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </Link>

      <article className="bg-bg-elevated rounded-xl border border-border-subtle overflow-hidden">
        <div className="p-8 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-tertiary/10 text-accent-tertiary">
              开源项目
            </span>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <Calendar className="w-4 h-4" />
              {new Date(project.createdAt).toLocaleDateString('zh-CN')}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {project.title}
          </h1>

          <p className="text-lg text-text-secondary mb-6">
            {project.description}
          </p>

          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-tertiary text-sm text-text-muted"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tech}
                </div>
              ))}
            </div>
          )}

          {(project.githubUrl || project.demoUrl) && (
            <div className="flex flex-wrap gap-3 pt-4 border-t border-border-subtle">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-tertiary border border-border-default text-text-secondary hover:text-accent-tertiary hover:border-accent-tertiary/30 transition-all"
                >
                  <Github className="w-5 h-5" />
                  <span>查看源码</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>在线演示</span>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-bg-tertiary border-t border-border-subtle">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>最后更新：{new Date(project.updatedAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>
      </article>
    </div>
  )
}

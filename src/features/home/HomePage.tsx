import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, FileText, FolderGit2, Newspaper, ExternalLink, Copy, Globe, BookOpen } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'

export default function HomePage() {
  useDocumentTitle('AI 资源中心 - 发现最新 AI 工具与资讯')

  const { tools, prompts, projects, news, resources, learningJournals } = useData()

  const latestTools = tools.slice(0, 6)
  const latestPrompts = prompts.slice(0, 6)
  const latestProjects = projects.slice(0, 6)
  const latestNews = news.slice(0, 6)
  const latestResources = resources.slice(0, 6)
  const latestLearningJournals = learningJournals.slice(0, 6)

  return (
    <div className="space-y-16">
      <section className="text-center py-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-3 tracking-tight">
          发现 AI 无限可能
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          探索最前沿的 AI 工具、提示词、项目案例和行业资讯，为您的 AI 之旅提供灵感
        </p>
      </section>

      <Section title="学习记录" icon={<BookOpen className="w-5 h-5" />} moreLink="/learning-journal" accent="secondary" count={learningJournals.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-stagger">
          {latestLearningJournals.map((journal) => (
            <LearningJournalCard key={journal.id} journal={journal} />
          ))}
        </div>
        {latestLearningJournals.length === 0 && <EmptyState message="暂无学习记录数据" />}
      </Section>

      <Section title="项目案例" icon={<FolderGit2 className="w-5 h-5" />} moreLink="/projects" accent="tertiary" count={projects.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-stagger">
          {latestProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        {latestProjects.length === 0 && <EmptyState message="暂无项目数据" />}
      </Section>

      <Section title="提示词库" icon={<FileText className="w-5 h-5" />} moreLink="/prompts" accent="secondary" count={prompts.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-stagger">
          {latestPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
        {latestPrompts.length === 0 && <EmptyState message="暂无提示词数据" />}
      </Section>

      <Section title="行业资讯" icon={<Newspaper className="w-5 h-5" />} moreLink="/news" accent="warning" count={news.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-stagger">
          {latestNews.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
        {latestNews.length === 0 && <EmptyState message="暂无资讯数据" />}
      </Section>

      <Section title="AI 资源" icon={<Globe className="w-5 h-5" />} moreLink="/resources" accent="primary" count={resources.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-stagger">
          {latestResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
        {latestResources.length === 0 && <EmptyState message="暂无资源数据" />}
      </Section>

      <Section title="AI 工具" icon={<Sparkles className="w-5 h-5" />} moreLink="/tools" accent="primary" count={tools.length}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-stagger">
          {latestTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
        {latestTools.length === 0 && <EmptyState message="暂无工具数据" />}
      </Section>
    </div>
  )
}

function Section({
  title,
  icon,
  moreLink,
  accent,
  count,
  children
}: {
  title: string
  icon: React.ReactNode
  moreLink: string
  accent: 'primary' | 'secondary' | 'tertiary' | 'warning'
  count?: number
  children: React.ReactNode
}) {
  const accentColors = {
    primary: 'text-accent-primary',
    secondary: 'text-accent-secondary',
    tertiary: 'text-accent-tertiary',
    warning: 'text-accent-warning'
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`${accentColors[accent]}`}>{icon}</div>
          <h2 className="text-2xl font-display font-semibold text-text-primary">{title}</h2>
          {count !== undefined && (
            <span className="px-2.5 py-0.5 rounded-full bg-bg-tertiary text-xs font-medium text-text-muted">
              {count}
            </span>
          )}
        </div>
        <Link
          to={moreLink}
          className="flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-accent-primary transition-colors"
        >
          更多
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      {children}
    </section>
  )
}

function ToolCard({ tool }: { tool: any }) {
  return (
    <div className="group p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-accent-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary text-lg">{tool.name}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              tool.isFree ? 'bg-accent-success/10 text-accent-success' : 'bg-accent-warning/10 text-accent-warning'
            }`}>
              {tool.isFree ? '免费' : '付费'}
            </span>
          </div>
          <span className="text-sm text-text-muted">{tool.category}</span>
        </div>
      </div>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{tool.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {tool.tags.slice(0, 3).map((tag: string) => (
            <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
              {tag}
            </span>
          ))}
        </div>
        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-accent-primary hover:underline"
        >
          <ExternalLink className="w-4 h-4" />
          访问
        </a>
      </div>
    </div>
  )
}

function PromptCard({ prompt }: { prompt: any }) {
  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(prompt.content)
  }

  return (
    <div className="group p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-secondary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6 text-accent-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg">{prompt.title}</h3>
          <span className="text-sm text-text-muted">{prompt.category}</span>
        </div>
      </div>
      <div className="relative p-4 rounded-xl bg-bg-tertiary mb-4">
        <p className="text-text-secondary text-sm line-clamp-3 font-mono">&ldquo;{prompt.content}&rdquo;</p>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-bg-elevated text-text-muted hover:text-accent-secondary transition-colors shadow-sm"
          title="复制"
        >
          <Copy className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {prompt.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  return (
    <div className="group p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-tertiary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-tertiary/10 flex items-center justify-center flex-shrink-0">
          <FolderGit2 className="w-6 h-6 text-accent-tertiary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg">{project.title}</h3>
          <span className="text-sm text-text-muted">开源项目</span>
        </div>
      </div>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.techStack.slice(0, 3).map((tech: string) => (
          <span key={tech} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {tech}
          </span>
        ))}
      </div>
      <a
        href={project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-accent-tertiary transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
        查看源码
      </a>
    </div>
  )
}

function NewsCard({ news }: { news: any }) {
  return (
    <Link
      to={`/news/${news.id}`}
      className="group block p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-warning/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-warning/10 flex items-center justify-center flex-shrink-0">
          <Newspaper className="w-6 h-6 text-accent-warning" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg group-hover:text-accent-warning transition-colors">{news.title}</h3>
          <span className="text-sm text-text-muted">{news.category}</span>
        </div>
      </div>
      <p className="text-text-secondary text-sm line-clamp-2 mb-3">{news.content}</p>
      <div className="flex items-center justify-end">
        <span className="flex items-center gap-1 text-sm text-text-muted group-hover:text-accent-warning transition-colors">
          阅读全文
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

function ResourceCard({ resource }: { resource: any }) {
  return (
    <div className="group p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
          <Globe className="w-6 h-6 text-accent-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-text-primary text-lg">{resource.name}</h3>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              resource.isFree ? 'bg-accent-success/10 text-accent-success' : 'bg-accent-warning/10 text-accent-warning'
            }`}>
              {resource.isFree ? '免费' : '付费'}
            </span>
          </div>
          <span className="text-sm text-text-muted">{resource.category}</span>
        </div>
      </div>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2">{resource.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {resource.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {tag}
          </span>
        ))}
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-accent-primary hover:underline"
      >
        <ExternalLink className="w-4 h-4" />
        访问网站
      </a>
    </div>
  )
}

function LearningJournalCard({ journal }: { journal: any }) {
  return (
    <Link
      to={`/learning-journal/${journal.id}`}
      className="group block p-5 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-secondary/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-6 h-6 text-accent-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary text-lg group-hover:text-accent-secondary transition-colors">{journal.title}</h3>
          <span className="text-sm text-text-muted">{journal.category}</span>
        </div>
      </div>
      <p className="text-text-secondary text-sm line-clamp-2 mb-3">{journal.excerpt}</p>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {journal.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-2 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-end">
        <span className="flex items-center gap-1 text-sm text-text-muted group-hover:text-accent-secondary transition-colors">
          阅读更多
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 rounded-xl bg-bg-tertiary/50">
      <p className="text-text-muted">{message}</p>
    </div>
  )
}

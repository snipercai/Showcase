import { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Search, Sparkles, FileText, FolderGit2, Newspaper, Globe, BookOpen, Wrench, ArrowRight } from 'lucide-react'
import { useSearch } from '@/shared/hooks'
import { useDocumentTitle } from '@/shared/hooks'

export function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { search, results, isLoading, hasSearched, totalResults, highlightText } = useSearch()

  useDocumentTitle(query ? `搜索 "${query}" - AI 资源中心` : '搜索 - AI 资源中心')

  useEffect(() => {
    if (query) {
      search(query)
    }
  }, [query, search])

  if (!query) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <Search className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">请输入搜索关键词</h3>
        <p className="text-text-secondary text-sm">在搜索框中输入关键词开始搜索</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">搜索中...</h3>
        <p className="text-text-secondary text-sm">正在查找匹配 "{query}" 的结果</p>
      </div>
    )
  }

  if (hasSearched && totalResults === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <Search className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">未找到相关结果</h3>
        <p className="text-text-secondary text-sm">
          没有找到与 "{query}" 相关的内容，请尝试其他关键词
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-primary">
          搜索结果
        </h1>
        <p className="text-text-secondary mt-1">
          找到 {totalResults} 个与 "{query}" 相关的结果
        </p>
      </div>

      {results.tools.length > 0 && (
        <Section
          title="AI 工具"
          icon={<Wrench className="w-5 h-5" />}
          count={results.tools.length}
          moreLink="/tools"
          accent="primary"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.tools.slice(0, 6).map((tool) => (
              <ToolCard key={tool.id} tool={tool} query={query} highlightText={highlightText} />
            ))}
          </div>
        </Section>
      )}

      {results.prompts.length > 0 && (
        <Section
          title="提示词库"
          icon={<FileText className="w-5 h-5" />}
          count={results.prompts.length}
          moreLink="/prompts"
          accent="secondary"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.prompts.slice(0, 6).map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} query={query} highlightText={highlightText} />
            ))}
          </div>
        </Section>
      )}

      {results.projects.length > 0 && (
        <Section
          title="项目案例"
          icon={<FolderGit2 className="w-5 h-5" />}
          count={results.projects.length}
          moreLink="/projects"
          accent="tertiary"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.projects.slice(0, 6).map((project) => (
              <ProjectCard key={project.id} project={project} query={query} highlightText={highlightText} />
            ))}
          </div>
        </Section>
      )}

      {results.news.length > 0 && (
        <Section
          title="行业资讯"
          icon={<Newspaper className="w-5 h-5" />}
          count={results.news.length}
          moreLink="/news"
          accent="warning"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.news.slice(0, 6).map((item) => (
              <NewsCard key={item.id} news={item} query={query} highlightText={highlightText} />
            ))}
          </div>
        </Section>
      )}

      {results.resources.length > 0 && (
        <Section
          title="AI 资源"
          icon={<Globe className="w-5 h-5" />}
          count={results.resources.length}
          moreLink="/resources"
          accent="primary"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.resources.slice(0, 6).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} query={query} highlightText={highlightText} />
            ))}
          </div>
        </Section>
      )}

      {results.learningJournals.length > 0 && (
        <Section
          title="学习记录"
          icon={<BookOpen className="w-5 h-5" />}
          count={results.learningJournals.length}
          moreLink="/learning-journal"
          accent="secondary"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.learningJournals.slice(0, 6).map((journal) => (
              <LearningJournalCard key={journal.id} journal={journal} query={query} highlightText={highlightText} />
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}

function Section({
  title,
  icon,
  count,
  moreLink,
  accent,
  children,
}: {
  title: string
  icon: React.ReactNode
  count: number
  moreLink: string
  accent: 'primary' | 'secondary' | 'tertiary' | 'warning'
  children: React.ReactNode
}) {
  const accentColors = {
    primary: 'text-accent-primary',
    secondary: 'text-accent-secondary',
    tertiary: 'text-accent-tertiary',
    warning: 'text-accent-warning',
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={accentColors[accent]}>{icon}</div>
          <h2 className="text-xl font-display font-semibold text-text-primary">{title}</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-bg-tertiary text-xs font-medium text-text-muted">
            {count}
          </span>
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

function ToolCard({
  tool,
  query,
  highlightText,
}: {
  tool: any
  query: string
  highlightText: (text: string, query: string) => React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-accent-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {highlightText(tool.name, query)}
            </h3>
            <span className="text-xs text-text-muted">{tool.category}</span>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          tool.isFree ? 'bg-accent-success/10 text-accent-success' : 'bg-accent-warning/10 text-accent-warning'
        }`}>
          {tool.isFree ? '免费' : '付费'}
        </span>
      </div>
      <p className="text-sm text-text-secondary mb-3 line-clamp-2">
        {highlightText(tool.description, query)}
      </p>
      <div className="flex flex-wrap gap-1">
        {tool.tags.slice(0, 3).map((tag: string) => (
          <span key={tag} className="px-1.5 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {highlightText(tag, query)}
          </span>
        ))}
      </div>
    </div>
  )
}

function PromptCard({
  prompt,
  query,
  highlightText,
}: {
  prompt: any
  query: string
  highlightText: (text: string, query: string) => React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-secondary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 text-accent-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary">
            {highlightText(prompt.title, query)}
          </h3>
          <span className="text-xs text-text-muted">{prompt.category}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary line-clamp-2">
        {highlightText(prompt.content, query)}
      </p>
    </div>
  )
}

function ProjectCard({
  project,
  query,
  highlightText,
}: {
  project: any
  query: string
  highlightText: (text: string, query: string) => React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-tertiary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-accent-tertiary/10 flex items-center justify-center flex-shrink-0">
          <FolderGit2 className="w-4 h-4 text-accent-tertiary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary">
            {highlightText(project.title, query)}
          </h3>
          <span className="text-xs text-text-muted">开源项目</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary line-clamp-2 mb-2">
        {highlightText(project.description, query)}
      </p>
      <div className="flex flex-wrap gap-1">
        {project.techStack.slice(0, 3).map((tech: string) => (
          <span key={tech} className="px-1.5 py-0.5 rounded-md bg-bg-tertiary text-xs text-text-muted">
            {highlightText(tech, query)}
          </span>
        ))}
      </div>
    </div>
  )
}

function NewsCard({
  news,
  query,
  highlightText,
}: {
  news: any
  query: string
  highlightText: (text: string, query: string) => React.ReactNode
}) {
  return (
    <Link
      to={`/news/${news.id}`}
      className="group block p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-warning/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-accent-warning/10 flex items-center justify-center flex-shrink-0">
          <Newspaper className="w-4 h-4 text-accent-warning" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary group-hover:text-accent-warning transition-colors">
            {highlightText(news.title, query)}
          </h3>
          <span className="text-xs text-text-muted">{news.category}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary line-clamp-2">
        {highlightText(news.content, query)}
      </p>
    </Link>
  )
}

function ResourceCard({
  resource,
  query,
  highlightText,
}: {
  resource: any
  query: string
  highlightText: (text: string, query: string) => React.ReactNode
}) {
  return (
    <div className="p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/30 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-accent-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {highlightText(resource.name, query)}
            </h3>
            <span className="text-xs text-text-muted">{resource.category}</span>
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
          resource.isFree ? 'bg-accent-success/10 text-accent-success' : 'bg-accent-warning/10 text-accent-warning'
        }`}>
          {resource.isFree ? '免费' : '付费'}
        </span>
      </div>
      <p className="text-sm text-text-secondary line-clamp-2">
        {highlightText(resource.description, query)}
      </p>
    </div>
  )
}

function LearningJournalCard({
  journal,
  query,
  highlightText,
}: {
  journal: any
  query: string
  highlightText: (text: string, query: string) => React.ReactNode
}) {
  return (
    <Link
      to={`/learning-journal/${journal.id}`}
      className="group block p-4 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-secondary/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-lg bg-accent-secondary/10 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-accent-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-text-primary group-hover:text-accent-secondary transition-colors">
            {highlightText(journal.title, query)}
          </h3>
          <span className="text-xs text-text-muted">{journal.category}</span>
        </div>
      </div>
      <p className="text-sm text-text-secondary line-clamp-2">
        {highlightText(journal.excerpt, query)}
      </p>
    </Link>
  )
}

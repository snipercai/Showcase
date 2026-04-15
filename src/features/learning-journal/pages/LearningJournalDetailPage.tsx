import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

export function LearningJournalDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { learningJournals } = useData()
  const journal = learningJournals.find(j => j.id === id)

  useDocumentTitle(journal ? `${journal.title} - AI 资源中心` : '记录未找到 - AI 资源中心')

  if (!journal) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-text-muted" />
        </div>
        <h3 className="text-lg font-semibold text-text-primary mb-1">记录未找到</h3>
        <p className="text-text-secondary text-sm mb-4">该学习记录不存在或已被删除</p>
        <Link
          to="/learning-journal"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90 transition-colors"
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
        to="/learning-journal"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </Link>

      <article className="bg-bg-elevated rounded-xl border border-border-subtle overflow-hidden">
        <div className="p-8 border-b border-border-subtle">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-accent-primary/10 text-accent-primary">
              {journal.category}
            </span>
            <div className="flex items-center gap-1 text-sm text-text-muted">
              <Calendar className="w-4 h-4" />
              {new Date(journal.createdAt).toLocaleDateString('zh-CN')}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-text-primary mb-4">
            {journal.title}
          </h1>

          <p className="text-lg text-text-secondary mb-6">
            {journal.excerpt}
          </p>

          {journal.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {journal.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-tertiary text-sm text-text-muted"
                >
                  <Tag className="w-3.5 h-3.5" />
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold text-text-primary mb-4 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold text-text-primary mb-3 mt-6">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold text-text-primary mb-2 mt-4">{children}</h3>,
                p: ({ children }) => <p className="text-text-secondary mb-4 leading-relaxed">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside text-text-secondary mb-4 space-y-1">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-1">{children}</ol>,
                li: ({ children }) => <li className="text-text-secondary">{children}</li>,
                code: ({ children, className }) => {
                  const isBlock = className?.includes('language-')
                  if (isBlock) {
                    return (
                      <pre className="bg-bg-tertiary rounded-lg p-4 overflow-x-auto my-4">
                        <code className={className}>{children}</code>
                      </pre>
                    )
                  }
                  return <code className="bg-bg-tertiary px-2 py-0.5 rounded text-sm text-accent-primary">{children}</code>
                },
                pre: ({ children }) => <>{children}</>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-accent-primary pl-4 my-4 text-text-secondary italic">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a href={href} className="text-accent-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {journal.content}
            </ReactMarkdown>
          </div>
        </div>

        <div className="px-8 py-4 bg-bg-tertiary border-t border-border-subtle">
          <div className="flex items-center justify-between text-sm text-text-muted">
            <span>最后更新：{new Date(journal.updatedAt).toLocaleDateString('zh-CN')}</span>
          </div>
        </div>
      </article>
    </div>
  )
}

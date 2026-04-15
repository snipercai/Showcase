import { BookOpen, Calendar, Tag, Plus } from 'lucide-react'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export function LearningJournalPage() {
  useDocumentTitle('学习记录 - AI 资源中心')
  const { learningJournals } = useData()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...new Set(learningJournals.map(journal => journal.category))]

  const filteredJournals = selectedCategory === 'all'
    ? learningJournals
    : learningJournals.filter(journal => journal.category === selectedCategory)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">学习记录</h1>
          <p className="text-text-secondary mt-1">记录 AI 学习过程、实验心得、技术探索收获</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-text-muted">{learningJournals.length} 篇记录</span>
          <Link
            to="/admin/learning-journal"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg cyber-button text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            管理
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-accent-primary text-white shadow-md'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-elevated'
            }`}
          >
            {category === 'all' ? '全部' : category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJournals.map((journal) => (
          <Link
            key={journal.id}
            to={`/learning-journal/${journal.id}`}
            className="group p-6 rounded-xl bg-bg-elevated border border-border-subtle hover:border-accent-primary/30 hover:shadow-md transition-all duration-200"
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-primary/10 text-accent-primary">
                  {journal.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Calendar className="w-3 h-3" />
                  {new Date(journal.createdAt).toLocaleDateString('zh-CN')}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-primary transition-colors line-clamp-2">
                {journal.title}
              </h3>
            </div>

            <p className="text-sm text-text-secondary mb-4 line-clamp-3">
              {journal.excerpt}
            </p>

            {journal.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {journal.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 rounded-md bg-bg-tertiary text-xs text-text-muted"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </div>
                ))}
              </div>
            )}

            <div className="pt-3 border-t border-border-subtle flex items-center gap-2 text-sm text-accent-primary group-hover:underline">
              <BookOpen className="w-4 h-4" />
              阅读全文
            </div>
          </Link>
        ))}
      </div>

      {filteredJournals.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl bg-bg-tertiary mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-text-muted" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">暂无记录</h3>
          <p className="text-text-secondary text-sm">
            {selectedCategory === 'all'
              ? '还没有学习记录，请稍后再试'
              : '该分类下暂无记录'}
          </p>
        </div>
      )}
    </div>
  )
}

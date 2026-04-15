import { Plus, Edit2, Trash2, Search, BookOpen } from 'lucide-react'
import { Card, SearchInput } from '@/components'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useAdminPage } from '../hooks/useAdminPage'
import { AdminModal } from '../components/AdminModal'
import type { LearningJournalItem } from '@/shared/types'

const JOURNAL_CATEGORIES = [
  '深度学习',
  '自然语言处理',
  '计算机视觉',
  '强化学习',
  '技术探索',
  '实验记录',
  '项目实践',
  '技术思考',
  '其他'
]

export default function LearningJournalAdminPage() {
  useDocumentTitle('学习记录管理 - 管理后台')
  const { learningJournals, addLearningJournal, updateLearningJournal, deleteLearningJournal } = useData()

  const initialFormData = {
    title: '',
    excerpt: '',
    content: '',
    category: JOURNAL_CATEGORIES[0] as string,
    tags: '',
    coverImage: '',
  }

  const {
    searchQuery,
    setSearchQuery,
    showModal,
    editingItem,
    formData,
    setFormData,
    filteredItems: filteredJournals,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  } = useAdminPage<LearningJournalItem, typeof initialFormData>({
    items: learningJournals,
    onAdd: addLearningJournal,
    onUpdate: updateLearningJournal,
    onDelete: deleteLearningJournal,
    getInitialFormData: () => initialFormData,
    getItemFormData: (item) => ({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      tags: item.tags.join(', '),
      coverImage: item.coverImage || '',
    }),
    searchFields: (item) => [item.title, item.excerpt, item.category],
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    const submitData = {
      ...formData,
      tags,
    }
    
    if (editingItem) {
      updateLearningJournal(editingItem.id, submitData)
    } else {
      addLearningJournal(submitData)
    }
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">学习记录管理</h1>
          <p className="text-text-secondary text-sm mt-1">共 {learningJournals.length} 篇记录</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl cyber-button text-sm"
        >
          <Plus className="w-4 h-4" />
          添加记录
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="搜索学习记录..."
          className="pl-12"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">标题</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">分类</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">摘要</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">创建日期</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted font-mono">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredJournals.map((item) => (
                <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="text-text-primary font-medium truncate">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary text-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-secondary font-mono">{item.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-sm text-text-muted line-clamp-1 max-w-xs">{item.excerpt}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-muted font-mono">
                      {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-2 rounded-lg text-text-muted hover:text-accent-primary hover:bg-accent-primary/10 transition-colors"
                        title="编辑"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg text-text-muted hover:text-accent-secondary hover:bg-accent-secondary/10 transition-colors"
                        title="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredJournals.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            暂无数据
          </div>
        )}
      </Card>

      <AdminModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? '编辑学习记录' : '添加学习记录'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">标题</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl input-cyber"
              placeholder="输入标题"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">分类</label>
              <select
                value={formData.category}
                onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl input-cyber"
              >
                {JOURNAL_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">封面图片 URL</label>
              <input
                type="url"
                value={formData.coverImage}
                onChange={e => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl input-cyber"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">摘要</label>
            <textarea
              value={formData.excerpt}
              onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl input-cyber resize-none"
              rows={2}
              placeholder="简短描述文章内容"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              内容 (Markdown 格式)
              <span className="text-xs text-text-muted ml-2">支持 Markdown 语法</span>
            </label>
            <textarea
              value={formData.content}
              onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl input-cyber resize-none font-mono text-sm"
              rows={12}
              placeholder="# 标题&#10;&#10;## 章节&#10;&#10;这里是内容..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">标签 (逗号分隔)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl input-cyber"
              placeholder="深度学习，神经网络，实验"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="px-4 py-2 rounded-xl bg-bg-tertiary border border-border-default text-text-secondary hover:text-text-primary transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl cyber-button"
            >
              {editingItem ? '保存' : '添加'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}

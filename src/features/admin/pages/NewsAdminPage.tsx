import { useState } from 'react'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import { Card, Tag, SearchInput } from '@/components'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { NEWS_CATEGORIES } from '@/shared/constants'
import type { NewsItem } from '@/shared/types'

export default function NewsAdminPage() {
  useDocumentTitle('资讯管理 - 管理后台')
  const { news, addNews, updateNews, deleteNews } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: NEWS_CATEGORIES[0] as string,
    tags: '',
  })

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleOpenModal = (item?: NewsItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        title: item.title,
        summary: item.summary,
        content: item.content,
        category: item.category,
        tags: item.tags.join(', '),
      })
    } else {
      setEditingItem(null)
      setFormData({
        title: '',
        summary: '',
        content: '',
        category: NEWS_CATEGORIES[0],
        tags: '',
      })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingItem(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    if (editingItem) {
      updateNews(editingItem.id, {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        category: formData.category,
        tags,
      })
    } else {
      addNews({
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        category: formData.category,
        tags,
      })
    }
    handleCloseModal()
  }

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这条资讯吗？')) {
      deleteNews(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">资讯管理</h1>
          <p className="text-text-secondary text-sm mt-1">共 {news.length} 条资讯</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl cyber-button text-sm"
        >
          <Plus className="w-4 h-4" />
          添加资讯
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="搜索资讯..."
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
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">标签</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">创建时间</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted font-mono">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.map((item) => (
                <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="text-text-primary font-medium truncate">{item.title}</p>
                      <p className="text-text-muted text-xs mt-1 line-clamp-1">{item.summary}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-mono">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {item.tags.slice(0, 2).map(tag => (
                        <Tag key={tag} label={tag} variant="primary" />
                      ))}
                      {item.tags.length > 2 && (
                        <span className="text-text-muted text-xs">+{item.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-text-muted text-sm font-mono">
                    {new Date(item.createdAt).toLocaleDateString('zh-CN')}
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
        {filteredNews.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            暂无数据
          </div>
        )}
      </Card>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />
          <Card className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border-default">
              <h2 className="text-lg font-display font-semibold text-text-primary">
                {editingItem ? '编辑资讯' : '添加资讯'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">标题</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl input-cyber"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">摘要</label>
                <textarea
                  value={formData.summary}
                  onChange={e => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl input-cyber resize-none"
                  rows={2}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">内容</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl input-cyber resize-none"
                  rows={6}
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
                    {NEWS_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">标签 (逗号分隔)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl input-cyber"
                    placeholder="AI, GPT, 技术"
                  />
                </div>
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
          </Card>
        </div>
      )}
    </div>
  )
}

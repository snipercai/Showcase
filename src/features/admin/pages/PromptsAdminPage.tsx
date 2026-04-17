import { Plus, Edit2, Trash2, Search } from 'lucide-react'
import { Card, SearchInput } from '@/components'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useAdminPage } from '../hooks/useAdminPage'
import { AdminModal } from '../components/AdminModal'
import { PROMPT_CATEGORIES } from '@/shared/constants'
import type { PromptItem } from '@/shared/types'

export default function PromptsAdminPage() {
  useDocumentTitle('提示词管理 - 管理后台')
  const { prompts, addPrompt, updatePrompt, deletePrompt } = useData()

  const initialFormData = {
    title: '',
    content: '',
    category: PROMPT_CATEGORIES[0] as string,
    tags: '',
  }

  const {
    searchQuery,
    setSearchQuery,
    showModal,
    editingItem,
    formData,
    setFormData,
    filteredItems: filteredPrompts,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  } = useAdminPage<PromptItem, typeof initialFormData>({
    items: prompts,
    onAdd: addPrompt,
    onUpdate: updatePrompt,
    onDelete: deletePrompt,
    getInitialFormData: () => initialFormData,
    getItemFormData: (item) => ({
      title: item.title,
      content: item.content,
      category: item.category,
      tags: item.tags.join(', '),
    }),
    searchFields: (item) => [item.title, item.content],
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    const submitData = {
      ...formData,
      tags,
    }
    
    if (editingItem) {
      updatePrompt(editingItem.id, submitData)
    } else {
      addPrompt(submitData)
    }
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">提示词管理</h1>
          <p className="text-text-secondary text-sm mt-1">共 {prompts.length} 个提示词</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl cyber-button text-sm"
        >
          <Plus className="w-4 h-4" />
          添加提示词
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索提示词..."
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
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">内容预览</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted font-mono">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrompts.map((item) => (
                <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-4 py-4">
                    <p className="text-text-primary font-medium">{item.title}</p>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-full bg-accent-tertiary/10 text-accent-tertiary text-xs font-mono">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <p className="text-text-muted text-sm line-clamp-2 max-w-md font-mono">
                      {item.content}
                    </p>
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
        {filteredPrompts.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            暂无数据
          </div>
        )}
      </Card>

      <AdminModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? '编辑提示词' : '添加提示词'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-text-secondary mb-1">分类</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl input-cyber"
                  >
                    {PROMPT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">内容</label>
                <textarea
                  value={formData.content}
                  onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl input-cyber resize-none font-mono"
                  rows={8}
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
                  placeholder="写作, 创作, AI"
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

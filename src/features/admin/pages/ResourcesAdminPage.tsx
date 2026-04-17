import { Plus, Edit2, Trash2, Search, ExternalLink } from 'lucide-react'
import { Card, SearchInput } from '@/components'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useAdminPage } from '../hooks/useAdminPage'
import { AdminModal } from '../components/AdminModal'
import type { ResourceItem } from '@/shared/types'

const RESOURCE_CATEGORIES = [
  '模型',
  '数据集',
  '框架',
  '工具',
  '教程',
  '研究',
  '社区',
  '其他'
]

export default function ResourcesAdminPage() {
  useDocumentTitle('资源管理 - 管理后台')
  const { resources, addResource, updateResource, deleteResource } = useData()

  const initialFormData = {
    name: '',
    url: '',
    description: '',
    category: RESOURCE_CATEGORIES[0] as string,
    tags: '',
    isFree: true,
  }

  const {
    searchQuery,
    setSearchQuery,
    showModal,
    editingItem,
    formData,
    setFormData,
    filteredItems: filteredResources,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  } = useAdminPage<ResourceItem, typeof initialFormData>({
    items: resources,
    onAdd: addResource,
    onUpdate: updateResource,
    onDelete: deleteResource,
    getInitialFormData: () => initialFormData,
    getItemFormData: (item) => ({
      name: item.name,
      url: item.url,
      description: item.description,
      category: item.category,
      tags: item.tags.join(', '),
      isFree: item.isFree,
    }),
    searchFields: (item) => [item.name, item.description, item.category],
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    
    const submitData = {
      ...formData,
      tags,
    }
    
    if (editingItem) {
      updateResource(editingItem.id, submitData)
    } else {
      addResource(submitData)
    }
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">资源管理</h1>
          <p className="text-text-secondary text-sm mt-1">共 {resources.length} 个资源</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl cyber-button text-sm"
        >
          <Plus className="w-4 h-4" />
          添加资源
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索资源..."
          className="pl-12"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">名称</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">分类</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">状态</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">网站</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted font-mono">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((item) => (
                <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="text-text-primary font-medium truncate">{item.name}</p>
                      <p className="text-text-muted text-xs mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-mono">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {item.isFree ? (
                      <span className="px-2 py-1 rounded-full bg-accent-success/10 text-accent-success text-xs font-mono">
                        免费
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full bg-accent-warning/10 text-accent-warning text-xs font-mono">
                        付费
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-secondary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">访问</span>
                    </a>
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
        {filteredResources.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            暂无数据
          </div>
        )}
      </Card>

      <AdminModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? '编辑资源' : '添加资源'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                {RESOURCE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">网站地址</label>
            <input
              type="url"
              value={formData.url}
              onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl input-cyber"
              placeholder="https://example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">描述</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 rounded-xl input-cyber resize-none"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1">标签 (逗号分隔)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={e => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full px-4 py-2 rounded-xl input-cyber"
                placeholder="AI, 模型，NLP"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isFree"
                checked={formData.isFree}
                onChange={e => setFormData(prev => ({ ...prev, isFree: e.target.checked }))}
                className="w-4 h-4 rounded border-border-default"
              />
              <label htmlFor="isFree" className="text-sm text-text-secondary">免费资源</label>
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
      </AdminModal>
    </div>
  )
}

import { Plus, Edit2, Trash2, Search, Github, ExternalLink } from 'lucide-react'
import { Card, Tag, SearchInput } from '@/components'
import { useDocumentTitle, useData } from '@/shared/hooks'
import { useAdminPage } from '../hooks/useAdminPage'
import { AdminModal } from '../components/AdminModal'
import type { ProjectItem } from '@/shared/types'

export default function ProjectsAdminPage() {
  useDocumentTitle('项目管理 - 管理后台')
  const { projects, addProject, updateProject, deleteProject } = useData()

  const initialFormData = {
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    demoUrl: '',
  }

  const {
    searchQuery,
    setSearchQuery,
    showModal,
    editingItem,
    formData,
    setFormData,
    filteredItems: filteredProjects,
    handleOpenModal,
    handleCloseModal,
    handleDelete,
  } = useAdminPage<ProjectItem, typeof initialFormData>({
    items: projects,
    onAdd: addProject,
    onUpdate: updateProject,
    onDelete: deleteProject,
    getInitialFormData: () => initialFormData,
    getItemFormData: (item) => ({
      title: item.title,
      description: item.description,
      techStack: item.techStack.join(', '),
      githubUrl: item.githubUrl,
      demoUrl: item.demoUrl || '',
    }),
    searchFields: (item) => [item.title, item.description],
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const techStack = formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
    
    const submitData = {
      ...formData,
      techStack,
      demoUrl: formData.demoUrl || undefined,
    }
    
    if (editingItem) {
      updateProject(editingItem.id, submitData)
    } else {
      addProject(submitData)
    }
    handleCloseModal()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">项目管理</h1>
          <p className="text-text-secondary text-sm mt-1">共 {projects.length} 个项目</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl cyber-button text-sm"
        >
          <Plus className="w-4 h-4" />
          添加项目
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="搜索项目..."
          className="pl-12"
        />
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-default">
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">标题</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">技术栈</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-text-muted font-mono">链接</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-text-muted font-mono">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((item) => (
                <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-tertiary/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="text-text-primary font-medium truncate">{item.title}</p>
                      <p className="text-text-muted text-xs mt-1 line-clamp-1">{item.description}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {item.techStack.slice(0, 3).map(tech => (
                        <Tag key={tech} label={tech} variant="warning" />
                      ))}
                      {item.techStack.length > 3 && (
                        <span className="text-text-muted text-xs">+{item.techStack.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-text-muted hover:text-text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {item.demoUrl && (
                        <a
                          href={item.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-accent-primary hover:text-accent-secondary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-text-muted">
            暂无数据
          </div>
        )}
      </Card>

      <AdminModal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingItem ? '编辑项目' : '添加项目'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
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
                  <label className="block text-sm font-medium text-text-secondary mb-1">GitHub 地址</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={e => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl input-cyber"
                    placeholder="https://github.com/user/repo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Demo 地址 (可选)</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={e => setFormData(prev => ({ ...prev, demoUrl: e.target.value }))}
                    className="w-full px-4 py-2 rounded-xl input-cyber"
                    placeholder="https://demo.example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">技术栈 (逗号分隔)</label>
                <input
                  type="text"
                  value={formData.techStack}
                  onChange={e => setFormData(prev => ({ ...prev, techStack: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl input-cyber"
                  placeholder="React, TypeScript, Tailwind"
                  required
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

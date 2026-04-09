import { useState, useCallback } from 'react'

interface UseAdminPageOptions<T, TFormData> {
  items: T[]
  onAdd: (data: any) => void
  onUpdate: (id: string, data: any) => void
  onDelete: (id: string) => void
  getInitialFormData: () => TFormData
  getItemFormData: (item: T) => TFormData
  searchFields: (item: T) => string[]
}

export function useAdminPage<T extends { id: string }, TFormData>(
  options: UseAdminPageOptions<T, TFormData>
) {
  const { items, onAdd, onUpdate, onDelete, getInitialFormData, getItemFormData, searchFields } = options
  
  const [searchQuery, setSearchQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<T | null>(null)
  const [formData, setFormData] = useState<TFormData>(getInitialFormData())

  const filteredItems = items.filter(item =>
    searchFields(item).some(field =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

  const handleOpenModal = useCallback((item?: T) => {
    if (item) {
      setEditingItem(item)
      setFormData(getItemFormData(item))
    } else {
      setEditingItem(null)
      setFormData(getInitialFormData())
    }
    setShowModal(true)
  }, [getInitialFormData, getItemFormData])

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setEditingItem(null)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingItem) {
      onUpdate(editingItem.id, formData)
    } else {
      onAdd(formData)
    }
    handleCloseModal()
  }, [editingItem, formData, onAdd, onUpdate, handleCloseModal])

  const handleDelete = useCallback((id: string) => {
    if (confirm('确定要删除吗？')) {
      onDelete(id)
    }
  }, [onDelete])

  return {
    searchQuery,
    setSearchQuery,
    showModal,
    editingItem,
    formData,
    setFormData,
    filteredItems,
    handleOpenModal,
    handleCloseModal,
    handleSubmit,
    handleDelete,
  }
}

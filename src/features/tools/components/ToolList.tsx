import { memo } from 'react'
import { ToolCard } from './ToolCard'
import type { ToolItem } from '../types'

interface ToolListProps {
  tools: ToolItem[]
}

export const ToolList = memo(function ToolList({ tools }: ToolListProps) {
  if (tools.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无工具
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  )
})

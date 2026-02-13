import { memo } from 'react'
import { PromptCard } from './PromptCard'
import type { PromptItem } from '../types'

interface PromptListProps {
  prompts: PromptItem[]
}

export const PromptList = memo(function PromptList({ prompts }: PromptListProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        暂无提示词
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prompts.map((prompt) => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
    </div>
  )
})

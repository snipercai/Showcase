import type { PromptItem } from '@/shared/types'

export const initialPrompts: PromptItem[] = [
  {
    id: 'prompt-1',
    title: '写文章',
    content: '请帮我写一篇关于人工智能发展的文章，要求内容全面，结构清晰，语言流畅。',
    category: '写作',
    tags: ['写作', '文章', 'AI'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'prompt-2',
    title: '创意生成',
    content: '请为一个新的 AI 工具生成 5 个创意名称和简短描述。',
    category: '创意',
    tags: ['创意', '命名', 'AI'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

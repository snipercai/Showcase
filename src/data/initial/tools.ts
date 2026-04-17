import type { ToolItem } from '@/shared/types'

export const initialTools: ToolItem[] = [
  {
    id: 'tool-1',
    name: 'ChatGPT',
    description: 'OpenAI 的对话式 AI 助手',
    category: '对话',
    tags: ['AI', '对话', 'OpenAI'],
    website: 'https://chatgpt.com',
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'tool-2',
    name: 'Midjourney',
    description: 'AI 图像生成工具',
    category: '图像',
    tags: ['AI', '图像', '生成'],
    website: 'https://midjourney.com',
    isFree: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

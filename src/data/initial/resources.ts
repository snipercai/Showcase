import type { ResourceItem } from '@/shared/types'

export const initialResources: ResourceItem[] = [
  {
    id: 'resource-1',
    name: 'Hugging Face',
    description: '领先的 AI 模型社区和平台，提供大量预训练模型和数据集',
    url: 'https://huggingface.co',
    category: '模型',
    tags: ['AI', '模型', 'NLP'],
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'resource-2',
    name: 'Papers With Code',
    description: '机器学习论文和代码集合，跟踪 AI 领域最新研究进展',
    url: 'https://paperswithcode.com',
    category: '研究',
    tags: ['论文', '代码', '研究'],
    isFree: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

import type { NewsItem } from '@/shared/types'

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'OpenAI 发布 GPT-5',
    summary: 'OpenAI 今日发布了最新的 GPT-5 模型，性能大幅提升，支持更复杂的任务处理。',
    content: 'OpenAI 今日发布了最新的 GPT-5 模型，性能大幅提升，支持更复杂的任务处理。',
    category: '技术',
    tags: ['AI', 'GPT', '技术'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'news-2',
    title: 'AI 在医疗领域的新应用',
    summary: '研究人员使用 AI 技术成功诊断多种疾病，准确率达到 99%。',
    content: '研究人员使用 AI 技术成功诊断多种疾病，准确率达到 99%。',
    category: '应用',
    tags: ['AI', '医疗', '应用'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

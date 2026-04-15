import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import type { ResourceItem, LearningJournalItem } from '@/shared/types'

// 定义类型
interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  createdAt: string
  updatedAt: string
}

interface ToolItem {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  website: string
  isFree: boolean
  createdAt: string
  updatedAt: string
}

interface PromptItem {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

interface ProjectItem {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
  createdAt: string
  updatedAt: string
}

interface LearningJournalItemLocal {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  coverImage?: string
  createdAt: string
  updatedAt: string
}

// 初始数据
const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'OpenAI 发布 GPT-5',
    content: 'OpenAI 今日发布了最新的 GPT-5 模型，性能大幅提升，支持更复杂的任务处理。',
    category: '技术',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'news-2',
    title: 'AI 在医疗领域的新应用',
    content: '研究人员使用 AI 技术成功诊断多种疾病，准确率达到 99%。',
    category: '应用',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialTools: ToolItem[] = [
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

const initialPrompts: PromptItem[] = [
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

const initialProjects: ProjectItem[] = [
  {
    id: 'project-1',
    title: 'AI 聊天机器人',
    description: '基于 GPT 的对话式 AI 助手',
    techStack: ['React', 'Node.js', 'OpenAI API'],
    githubUrl: 'https://github.com/example/ai-chatbot',
    demoUrl: 'https://ai-chatbot.example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'project-2',
    title: '图像识别系统',
    description: '使用深度学习进行图像分类和识别',
    techStack: ['Python', 'TensorFlow', 'Flask'],
    githubUrl: 'https://github.com/example/image-recognition',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const initialResources: ResourceItem[] = [
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

const initialLearningJournals: LearningJournalItemLocal[] = [
  {
    id: 'journal-1',
    title: '深度学习入门学习笔记',
    excerpt: '记录深度学习的基础知识，包括神经网络的基本原理、反向传播算法等核心概念。',
    content: `# 深度学习入门学习笔记

## 什么是深度学习

深度学习是机器学习的一个分支，它使用多层神经网络来学习数据的层次化表示。

## 神经网络基础

### 神经元结构
- 输入层：接收原始数据
- 隐藏层：进行特征提取和转换
- 输出层：产生预测结果

### 激活函数
1. **Sigmoid**: 将输入压缩到 (0,1) 区间
2. **ReLU**: 线性整流函数，计算简单，收敛快
3. **Tanh**: 双曲正切函数，输出范围 (-1,1)

## 反向传播算法

反向传播是训练神经网络的核心算法，通过计算损失函数对每个权重的梯度来更新参数。

### 学习心得
- 理解梯度下降的直观意义很重要
- 学习率的选择对模型训练影响很大
- 过拟合是常见问题，需要使用正则化等技术

## 下一步计划
- 学习卷积神经网络 (CNN)
- 实践图像分类项目
- 探索 Transformer 架构
`,
    category: '深度学习',
    tags: ['深度学习', '神经网络', '基础'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'journal-2',
    title: 'Transformer 模型实验记录',
    excerpt: '记录使用 Transformer 模型进行文本分类的实验过程和结果分析。',
    content: `# Transformer 模型实验记录

## 实验目的
探索 Transformer 模型在文本分类任务上的表现。

## 实验环境
- 框架：PyTorch
- 数据集：IMDB 电影评论情感分析
- 模型：BERT-base

## 实验步骤

### 1. 数据预处理
\`\`\`python
from transformers import BertTokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
\`\`\`

### 2. 模型加载
\`\`\`python
from transformers import BertForSequenceClassification
model = BertForSequenceClassification.from_pretrained('bert-base-uncased', num_labels=2)
\`\`\`

### 3. 训练配置
- Batch Size: 32
- Learning Rate: 2e-5
- Epochs: 4

## 实验结果
- 训练集准确率：98.5%
- 验证集准确率：92.3%
- 测试集准确率：91.8%

## 心得体会
1. Transformer 模型的预训练非常重要
2. 微调阶段需要较小的学习率
3. 注意力机制让模型能够关注关键词

## 改进方向
- 尝试不同的预训练模型
- 调整超参数
- 增加数据增强
`,
    category: '自然语言处理',
    tags: ['Transformer', 'BERT', '实验'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'journal-3',
    title: 'AI 伦理与技术探索思考',
    excerpt: '对 AI 技术发展中的伦理问题和技术边界的个人思考和探索。',
    content: `# AI 伦理与技术探索思考

## 背景
随着 AI 技术的快速发展，伦理问题日益受到关注。

## 主要伦理问题

### 1. 偏见与公平性
- 训练数据中的偏见会被模型放大
- 需要确保算法决策的公平性
- 多样性数据的重要性

### 2. 隐私保护
- 数据收集与使用的边界
- 联邦学习等隐私保护技术
- 用户知情同意

### 3. 可解释性
- 黑盒模型的决策过程不透明
- 需要提高模型的可解释性
- 建立信任和问责机制

## 技术探索

### 负责任的 AI 开发
1. **数据审计**: 检查数据集中的偏见
2. **模型测试**: 评估不同群体的表现差异
3. **透明文档**: 记录模型的局限性和风险

### 个人思考
- 技术发展需要与伦理考量并行
- 开发者应承担社会责任
- 跨学科合作的重要性

## 参考资料
- [AI Ethics Guidelines](https://example.com)
- [Responsible AI Practices](https://example.com)
`,
    category: '技术思考',
    tags: ['AI 伦理', '技术探索', '思考'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

const STORAGE_KEYS = {
  news: 'ai-hub-news',
  tools: 'ai-hub-tools',
  prompts: 'ai-hub-prompts',
  projects: 'ai-hub-projects',
  resources: 'ai-hub-resources',
  learningJournals: 'ai-hub-learning-journals',
}

interface DataContextType {
  news: NewsItem[]
  tools: ToolItem[]
  prompts: PromptItem[]
  projects: ProjectItem[]
  resources: ResourceItem[]
  learningJournals: LearningJournalItem[]
  
  addNews: (item: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateNews: (id: string, item: Partial<NewsItem>) => void
  deleteNews: (id: string) => void
  
  addTool: (item: Omit<ToolItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTool: (id: string, item: Partial<ToolItem>) => void
  deleteTool: (id: string) => void
  
  addPrompt: (item: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updatePrompt: (id: string, item: Partial<PromptItem>) => void
  deletePrompt: (id: string) => void
  
  addProject: (item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProject: (id: string, item: Partial<ProjectItem>) => void
  deleteProject: (id: string) => void
  
  addResource: (item: Omit<ResourceItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateResource: (id: string, item: Partial<ResourceItem>) => void
  deleteResource: (id: string) => void
  
  addLearningJournal: (item: Omit<LearningJournalItem, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateLearningJournal: (id: string, item: Partial<LearningJournalItem>) => void
  deleteLearningJournal: (id: string) => void
  
  resetToDefaults: () => void
}

const DataContext = createContext<DataContextType | null>(null)

function loadFromStorage<T>(key: string, defaultValue: T[]): T[] {
  try {
    const stored = localStorage.getItem(key)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e)
  }
  return defaultValue
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e)
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [news, setNews] = useState<NewsItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.news, initialNews)
  )
  const [tools, setTools] = useState<ToolItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.tools, initialTools)
  )
  const [prompts, setPrompts] = useState<PromptItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.prompts, initialPrompts)
  )
  const [projects, setProjects] = useState<ProjectItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.projects, initialProjects)
  )
  const [resources, setResources] = useState<ResourceItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.resources, initialResources)
  )
  const [learningJournals, setLearningJournals] = useState<LearningJournalItem[]>(() => 
    loadFromStorage(STORAGE_KEYS.learningJournals, initialLearningJournals)
  )

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.news, news)
  }, [news])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.tools, tools)
  }, [tools])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.prompts, prompts)
  }, [prompts])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects)
  }, [projects])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.resources, resources)
  }, [resources])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.learningJournals, learningJournals)
  }, [learningJournals])

  const addNews = useCallback((item: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setNews(prev => [newItem, ...prev])
  }, [])

  const updateNews = useCallback((id: string, item: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => 
      n.id === id ? { ...n, ...item, updatedAt: new Date().toISOString() } : n
    ))
  }, [])

  const deleteNews = useCallback((id: string) => {
    setNews(prev => prev.filter(n => n.id !== id))
  }, [])

  const addTool = useCallback((item: Omit<ToolItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: ToolItem = {
      ...item,
      id: `tool-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setTools(prev => [newItem, ...prev])
  }, [])

  const updateTool = useCallback((id: string, item: Partial<ToolItem>) => {
    setTools(prev => prev.map(t => 
      t.id === id ? { ...t, ...item, updatedAt: new Date().toISOString() } : t
    ))
  }, [])

  const deleteTool = useCallback((id: string) => {
    setTools(prev => prev.filter(t => t.id !== id))
  }, [])

  const addPrompt = useCallback((item: Omit<PromptItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: PromptItem = {
      ...item,
      id: `prompt-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setPrompts(prev => [newItem, ...prev])
  }, [])

  const updatePrompt = useCallback((id: string, item: Partial<PromptItem>) => {
    setPrompts(prev => prev.map(p => 
      p.id === id ? { ...p, ...item, updatedAt: new Date().toISOString() } : p
    ))
  }, [])

  const deletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id))
  }, [])

  const addProject = useCallback((item: Omit<ProjectItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: ProjectItem = {
      ...item,
      id: `project-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setProjects(prev => [newItem, ...prev])
  }, [])

  const updateProject = useCallback((id: string, item: Partial<ProjectItem>) => {
    setProjects(prev => prev.map(p => 
      p.id === id ? { ...p, ...item, updatedAt: new Date().toISOString() } : p
    ))
  }, [])

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
  }, [])

  const addResource = useCallback((item: Omit<ResourceItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: ResourceItem = {
      ...item,
      id: `resource-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setResources(prev => [newItem, ...prev])
  }, [])

  const updateResource = useCallback((id: string, item: Partial<ResourceItem>) => {
    setResources(prev => prev.map(r => 
      r.id === id ? { ...r, ...item, updatedAt: new Date().toISOString() } : r
    ))
  }, [])

  const deleteResource = useCallback((id: string) => {
    setResources(prev => prev.filter(r => r.id !== id))
  }, [])

  const addLearningJournal = useCallback((item: Omit<LearningJournalItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newItem: LearningJournalItem = {
      ...item,
      id: `journal-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    }
    setLearningJournals(prev => [newItem, ...prev])
  }, [])

  const updateLearningJournal = useCallback((id: string, item: Partial<LearningJournalItem>) => {
    setLearningJournals(prev => prev.map(j => 
      j.id === id ? { ...j, ...item, updatedAt: new Date().toISOString() } : j
    ))
  }, [])

  const deleteLearningJournal = useCallback((id: string) => {
    setLearningJournals(prev => prev.filter(j => j.id !== id))
  }, [])

  const resetToDefaults = useCallback(() => {
    setNews(initialNews)
    setTools(initialTools)
    setPrompts(initialPrompts)
    setProjects(initialProjects)
    setResources(initialResources)
    setLearningJournals(initialLearningJournals)
  }, [])

  return (
    <DataContext.Provider value={{
      news,
      tools,
      prompts,
      projects,
      resources,
      learningJournals,
      addNews,
      updateNews,
      deleteNews,
      addTool,
      updateTool,
      deleteTool,
      addPrompt,
      updatePrompt,
      deletePrompt,
      addProject,
      updateProject,
      deleteProject,
      addResource,
      updateResource,
      deleteResource,
      addLearningJournal,
      updateLearningJournal,
      deleteLearningJournal,
      resetToDefaults,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

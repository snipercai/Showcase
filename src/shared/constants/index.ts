export const APP_NAME = 'AI 资源中心'

export const NAV_LINKS = [
  { path: '/', label: '首页' },
  { path: '/news', label: 'AI 资讯' },
  { path: '/tools', label: 'AI 工具' },
  { path: '/prompts', label: '提示词库' },
  { path: '/projects', label: '项目案例' },
] as const

export const NEWS_CATEGORIES = ['技术突破', '产品发布', '行业动态', '研究成果'] as const

export const TOOL_CATEGORIES = ['文本生成', '图像生成', '代码助手', '数据分析', '语音处理'] as const

export const PROMPT_CATEGORIES = ['写作助手', '编程助手', '创意设计', '商业分析', '学习辅导'] as const

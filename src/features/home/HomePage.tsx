import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Wrench, FileText, FolderGit2, Sparkles, Zap, TrendingUp } from 'lucide-react'
import { Card } from '@/components'
import { useDocumentTitle } from '@/shared/hooks'
import { APP_NAME } from '@/shared/constants'

export default function HomePage() {
  useDocumentTitle(`${APP_NAME} - AI 资源聚合平台`)

  const modules = [
    {
      title: 'AI 资讯',
      description: '获取最新的 AI 行业动态、技术突破和产品发布资讯',
      icon: <Newspaper className="w-7 h-7" />,
      path: '/news',
      iconBg: 'bg-accent-primary/20 dark:bg-accent-primary/30',
      iconColor: 'text-accent-primary dark:text-white',
      stats: '5+ 文章',
    },
    {
      title: 'AI 工具',
      description: '探索各类 AI 工具，提升工作效率和创造力',
      icon: <Wrench className="w-7 h-7" />,
      path: '/tools',
      iconBg: 'bg-accent-success/20 dark:bg-accent-success/30',
      iconColor: 'text-accent-success dark:text-white',
      stats: '8+ 工具',
    },
    {
      title: '提示词库',
      description: '精选高质量提示词模板，助力 AI 对话',
      icon: <FileText className="w-7 h-7" />,
      path: '/prompts',
      iconBg: 'bg-accent-tertiary/20 dark:bg-accent-tertiary/30',
      iconColor: 'text-accent-tertiary dark:text-white',
      stats: '5+ 模板',
    },
    {
      title: '项目案例',
      description: '学习优秀的 AI 项目案例，获取灵感',
      icon: <FolderGit2 className="w-7 h-7" />,
      path: '/projects',
      iconBg: 'bg-accent-warning/20 dark:bg-accent-warning/30',
      iconColor: 'text-accent-warning dark:text-white',
      stats: '5+ 项目',
    },
  ]

  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16 md:mb-24 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/20 text-accent-primary text-sm font-mono mb-8">
            <Sparkles className="w-4 h-4" />
            <span>AI Resource Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
            <span className="block text-text-primary mb-2">探索 AI 世界的</span>
            <span className="gradient-text">无限可能</span>
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed mb-10">
            一站式 AI 资源聚合平台，汇集最新资讯、优质工具、精选提示词和优秀项目案例
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/news"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl cyber-button"
            >
              开始探索
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-tertiary border border-border-default text-text-primary font-display font-medium hover:bg-bg-elevated hover:border-border-strong transition-all duration-300"
            >
              <Zap className="w-4 h-4 text-accent-success" />
              快速搜索
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {modules.map((module, index) => (
            <Link
              key={module.path}
              to={module.path}
              className="group animate-slide-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <Card 
                className="h-full p-6 lg:p-8 group-hover:border-border-strong transition-all duration-500"
                variant="glow"
              >
                <div className="flex items-start gap-5">
                  <div className={`relative p-4 rounded-2xl ${module.iconBg} transition-colors duration-300`}>
                    <div className={module.iconColor}>{module.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-display font-semibold text-text-primary group-hover:text-accent-primary transition-colors duration-300">
                        {module.title}
                      </h2>
                      <span className="text-xs font-mono text-text-muted bg-bg-tertiary px-2 py-1 rounded-full">
                        {module.stats}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {module.description}
                    </p>
                    <div className="flex items-center gap-2 text-accent-primary text-sm font-medium">
                      <span>查看更多</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 md:mt-24 animate-fade-in" style={{ animationDelay: '600ms' }}>
          <div className="relative overflow-hidden rounded-2xl bg-bg-card border border-border-default p-8 md:p-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent-success/10 border border-accent-success/20">
                  <TrendingUp className="w-6 h-6 text-accent-success" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-semibold text-text-primary">持续更新中</h3>
                  <p className="text-text-secondary text-sm">每日更新最新 AI 资源和资讯</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">20+</div>
                  <div className="text-xs text-text-muted font-mono">资源总数</div>
                </div>
                <div className="w-px h-12 bg-border-default" />
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">4</div>
                  <div className="text-xs text-text-muted font-mono">资源分类</div>
                </div>
                <div className="w-px h-12 bg-border-default" />
                <div className="text-center">
                  <div className="text-3xl font-display font-bold gradient-text">∞</div>
                  <div className="text-xs text-text-muted font-mono">可能性</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

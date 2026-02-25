import { Link } from 'react-router-dom'
import { Newspaper, Wrench, FileText, FolderGit2, Plus } from 'lucide-react'
import { Card } from '@/components'
import { useDocumentTitle, useData } from '@/shared/hooks'

export default function AdminDashboard() {
  useDocumentTitle('管理后台 - AI 资源聚合')
  const { news, tools, prompts, projects } = useData()

  const stats = [
    { 
      label: '资讯总数', 
      value: news.length, 
      icon: <Newspaper className="w-6 h-6" />,
      color: 'text-accent-primary',
      bgColor: 'bg-accent-primary/10',
      link: '/admin/news'
    },
    { 
      label: '工具总数', 
      value: tools.length, 
      icon: <Wrench className="w-6 h-6" />,
      color: 'text-accent-success',
      bgColor: 'bg-accent-success/10',
      link: '/admin/tools'
    },
    { 
      label: '提示词总数', 
      value: prompts.length, 
      icon: <FileText className="w-6 h-6" />,
      color: 'text-accent-tertiary',
      bgColor: 'bg-accent-tertiary/10',
      link: '/admin/prompts'
    },
    { 
      label: '项目总数', 
      value: projects.length, 
      icon: <FolderGit2 className="w-6 h-6" />,
      color: 'text-accent-warning',
      bgColor: 'bg-accent-warning/10',
      link: '/admin/projects'
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">仪表盘</h1>
          <p className="text-text-secondary text-sm mt-1">欢迎回来，查看数据概览</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link}>
            <Card className="p-6 hover:border-border-strong transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-text-muted text-sm font-mono">{stat.label}</p>
                  <p className="text-3xl font-display font-bold text-text-primary mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-text-primary">快速操作</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/admin/news"
              className="flex items-center gap-2 p-4 rounded-xl bg-bg-tertiary border border-border-default hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all duration-200"
            >
              <Plus className="w-5 h-5 text-accent-primary" />
              <span className="text-sm font-medium text-text-primary">添加资讯</span>
            </Link>
            <Link
              to="/admin/tools"
              className="flex items-center gap-2 p-4 rounded-xl bg-bg-tertiary border border-border-default hover:border-accent-success/30 hover:bg-accent-success/5 transition-all duration-200"
            >
              <Plus className="w-5 h-5 text-accent-success" />
              <span className="text-sm font-medium text-text-primary">添加工具</span>
            </Link>
            <Link
              to="/admin/prompts"
              className="flex items-center gap-2 p-4 rounded-xl bg-bg-tertiary border border-border-default hover:border-accent-tertiary/30 hover:bg-accent-tertiary/5 transition-all duration-200"
            >
              <Plus className="w-5 h-5 text-accent-tertiary" />
              <span className="text-sm font-medium text-text-primary">添加提示词</span>
            </Link>
            <Link
              to="/admin/projects"
              className="flex items-center gap-2 p-4 rounded-xl bg-bg-tertiary border border-border-default hover:border-accent-warning/30 hover:bg-accent-warning/5 transition-all duration-200"
            >
              <Plus className="w-5 h-5 text-accent-warning" />
              <span className="text-sm font-medium text-text-primary">添加项目</span>
            </Link>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-text-primary">系统状态</h2>
            <div className="flex items-center gap-2 text-xs text-accent-success font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
              运行正常
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
              <span className="text-text-secondary text-sm">数据库连接</span>
              <span className="text-accent-success text-sm font-mono">已连接</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
              <span className="text-text-secondary text-sm">API 服务</span>
              <span className="text-accent-success text-sm font-mono">正常</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-bg-tertiary">
              <span className="text-text-secondary text-sm">存储空间</span>
              <span className="text-text-primary text-sm font-mono">2.4 GB / 10 GB</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

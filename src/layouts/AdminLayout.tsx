import { useState } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen,
  FolderGit2, 
  FileText, 
  Newspaper, 
  Sparkles,
  Wrench,
  Menu, 
  X,
  ArrowLeft,
  RefreshCcw
} from 'lucide-react'
import cn from 'classnames'

const ADMIN_NAV_ITEMS = [
  { path: '/admin', label: '仪表盘', icon: <LayoutDashboard className="w-5 h-5" /> },
  { path: '/admin/learning-journal', label: '学习记录', icon: <BookOpen className="w-5 h-5" /> },
  { path: '/admin/projects', label: '项目案例', icon: <FolderGit2 className="w-5 h-5" /> },
  { path: '/admin/prompts', label: '提示词库', icon: <FileText className="w-5 h-5" /> },
  { path: '/admin/news', label: '行业资讯', icon: <Newspaper className="w-5 h-5" /> },
  { path: '/admin/resources', label: 'AI 资源', icon: <Sparkles className="w-5 h-5" /> },
  { path: '/admin/tools', label: 'AI 工具', icon: <Wrench className="w-5 h-5" /> },
  { path: '/admin/sync', label: '数据同步', icon: <RefreshCcw className="w-5 h-5" /> },
]

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen flex bg-bg-primary">
      {/* Sidebar */}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-bg-secondary border-r border-border-default transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-4 border-b border-border-default">
            <Link to="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-text p-[2px]">
                <div className="w-full h-full rounded-[6px] bg-bg-primary flex items-center justify-center">
                  <LayoutDashboard className="w-4 h-4 text-accent-cyan" />
                </div>
              </div>
              <span className="font-display font-bold text-lg gradient-text">管理后台</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {ADMIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  location.pathname === item.path
                    ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-transparent'
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-border-default">
            <Link
              to="/"
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              返回前台
            </Link>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-bg-secondary/80 backdrop-blur-xl border-b border-border-default flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-text-muted hover:text-text-primary mr-4"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
            <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
            <span>Admin Mode</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

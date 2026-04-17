import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Home, Newspaper, Wrench, MessageSquare, Briefcase, Cpu, Sparkles, BookOpen } from 'lucide-react'
import { ThemeToggle, SearchInput } from '@/components'

export function MainLayout() {
  const navigate = useNavigate()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <header className="sticky top-0 z-50 bg-bg-primary/95 backdrop-blur-md border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-text-primary tracking-tight">
                AI 资源中心
              </span>
            </Link>
            <nav className="flex items-center gap-1">
              <NavLink to="/" icon={<Home className="w-4 h-4" />}>首页</NavLink>
              <NavLink to="/learning-journal" icon={<BookOpen className="w-4 h-4" />}>学习记录</NavLink>
              <NavLink to="/projects" icon={<Briefcase className="w-4 h-4" />}>项目案例</NavLink>
              <NavLink to="/prompts" icon={<MessageSquare className="w-4 h-4" />}>提示词库</NavLink>
              <NavLink to="/news" icon={<Newspaper className="w-4 h-4" />}>行业资讯</NavLink>
              <NavLink to="/resources" icon={<Sparkles className="w-4 h-4" />}>AI 资源</NavLink>
              <NavLink to="/tools" icon={<Wrench className="w-4 h-4" />}>AI 工具</NavLink>
            </nav>
            <div className="flex items-center gap-2">
              <div className="w-64">
                <SearchInput
                  placeholder="搜索..."
                  onSearch={handleSearch}
                />
              </div>
              <ThemeToggle />
              <Link
                to="/admin"
                className="ml-2 px-4 py-2 rounded-lg cyber-button text-sm font-medium"
              >
                管理
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-border-subtle mt-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between text-text-muted text-sm">
            <p>© 2026 AI 资源中心。保留所有权利.</p>
            <p className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-success" />
              所有系统正常运行
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function NavLink({ to, children, icon }: { to: string, children: React.ReactNode, icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary transition-all duration-200 text-sm font-medium"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

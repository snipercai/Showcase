import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, Zap, Sun, Moon } from 'lucide-react'
import cn from 'classnames'
import { APP_NAME, NAV_LINKS } from '@/shared/constants'
import { useTheme } from '@/shared/hooks'

interface NavbarProps {
  onSearchClick: () => void
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-bg-secondary/80 border-b border-border-subtle">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-50" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-primary/20 blur-lg rounded-full group-hover:bg-accent-secondary/20 transition-colors duration-500" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-text p-[2px]">
                  <div className="w-full h-full rounded-[10px] bg-bg-primary flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent-cyan" />
                  </div>
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                <span className="gradient-text">{APP_NAME}</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium font-display tracking-wide transition-all duration-300',
                  location.pathname === link.path
                    ? 'text-accent-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                {location.pathname === link.path && (
                  <span className="absolute inset-0 bg-accent-primary/10 rounded-lg border border-accent-primary/20" />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
            <div className="w-px h-6 bg-border-default mx-2" />
            
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              <div className="theme-toggle-thumb">
                {theme === 'dark' ? (
                  <Sun className="w-3 h-3" />
                ) : (
                  <Moon className="w-3 h-3" />
                )}
              </div>
            </button>
            
            <button
              onClick={onSearchClick}
              className="group relative p-2.5 rounded-xl bg-bg-tertiary border border-border-default hover:border-accent-primary hover:shadow-glow-primary transition-all duration-300"
              aria-label="搜索"
            >
              <Search className="w-5 h-5 text-text-muted group-hover:text-accent-primary transition-colors duration-300" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent-success animate-pulse" />
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              <div className="theme-toggle-thumb">
                {theme === 'dark' ? (
                  <Sun className="w-3 h-3" />
                ) : (
                  <Moon className="w-3 h-3" />
                )}
              </div>
            </button>
            <button
              onClick={onSearchClick}
              className="p-2.5 rounded-xl bg-bg-tertiary border border-border-default text-text-muted hover:text-accent-primary transition-colors duration-300"
              aria-label="搜索"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl bg-bg-tertiary border border-border-default text-text-muted hover:text-text-primary transition-colors duration-300"
              aria-label="菜单"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border-subtle animate-slide-down">
          <div className="px-4 py-4 space-y-1 bg-bg-secondary/95 backdrop-blur-xl">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'block px-4 py-3 rounded-xl text-base font-medium font-display transition-all duration-300',
                  location.pathname === link.path
                    ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20'
                    : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary border border-transparent'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

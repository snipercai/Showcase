import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/hooks'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-lg text-text-secondary hover:text-accent-primary hover:bg-bg-tertiary transition-all duration-200"
      aria-label={`切换到${theme === 'dark' ? '浅色' : '深色'}模式`}
      title={`当前为${theme === 'dark' ? '深色' : '浅色'}模式，点击切换`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  )
}

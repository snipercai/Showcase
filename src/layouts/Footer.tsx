import { Zap, Github, Twitter } from 'lucide-react'
import { APP_NAME } from '@/shared/constants'

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border-subtle bg-bg-secondary/50 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none opacity-30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-text p-[2px]">
                <div className="w-full h-full rounded-[6px] bg-bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-accent-cyan" />
                </div>
              </div>
              <span className="font-display font-bold text-lg gradient-text">{APP_NAME}</span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              一站式 AI 资源中心，汇集最新资讯、优质工具、精选提示词和优秀项目案例
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-text-primary">快速链接</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="/news" className="text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm">AI 资讯</a>
              <a href="/tools" className="text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm">AI 工具</a>
              <a href="/prompts" className="text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm">提示词库</a>
              <a href="/projects" className="text-text-secondary hover:text-accent-primary transition-colors duration-300 text-sm">项目案例</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-text-primary">关注我们</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border-default flex items-center justify-center text-text-muted hover:text-accent-primary hover:border-accent-primary hover:shadow-glow-primary transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border-default flex items-center justify-center text-text-muted hover:text-accent-secondary hover:border-accent-secondary hover:shadow-glow-secondary transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border-subtle">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-muted text-sm font-mono">
              &copy; {new Date().getFullYear()} <span className="text-accent-primary">{APP_NAME}</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
              <span className="w-2 h-2 rounded-full bg-accent-success animate-pulse" />
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

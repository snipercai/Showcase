import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { DataProvider } from '@/shared/hooks/useData'
import { ThemeProvider } from '@/shared/hooks/useTheme'
import HomePage from './HomePage'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <ThemeProvider>
      <DataProvider>{children}</DataProvider>
    </ThemeProvider>
  </BrowserRouter>
)

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />, { wrapper })
    expect(screen.getByText('发现 AI 无限可能')).toBeInTheDocument()
  })

  it('renders all six sections', () => {
    render(<HomePage />, { wrapper })
    expect(screen.getByText('学习记录')).toBeInTheDocument()
    expect(screen.getByText('项目案例')).toBeInTheDocument()
    expect(screen.getByText('提示词库')).toBeInTheDocument()
    expect(screen.getByText('行业资讯')).toBeInTheDocument()
    expect(screen.getByText('AI 资源')).toBeInTheDocument()
    expect(screen.getByText('AI 工具')).toBeInTheDocument()
  })

  it('renders section links', () => {
    render(<HomePage />, { wrapper })
    const links = screen.getAllByText('更多')
    expect(links.length).toBeGreaterThan(0)
  })
})

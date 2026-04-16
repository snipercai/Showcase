import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './useTheme'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe('useTheme', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark', 'light')
    vi.clearAllMocks()
  })

  it('provides theme from ThemeProvider', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.theme).toBeDefined()
    expect(['dark', 'light']).toContain(result.current.theme)
  })

  it('toggles theme when toggleTheme is called', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    const initialTheme = result.current.theme

    act(() => {
      result.current.toggleTheme()
    })

    const newTheme = result.current.theme
    expect(newTheme).not.toBe(initialTheme)
  })

  it('toggles theme twice returns to original', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    const initialTheme = result.current.theme

    act(() => {
      result.current.toggleTheme()
      result.current.toggleTheme()
    })

    expect(result.current.theme).toBe(initialTheme)
  })

  it('updates document class when theme changes', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })

    const initialClass = document.documentElement.classList.contains('dark') ? 'dark' : 'light'

    act(() => {
      result.current.toggleTheme()
    })

    const newClass = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    expect(newClass).not.toBe(initialClass)
  })
})

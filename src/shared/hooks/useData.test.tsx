import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { DataProvider, useData } from './useData'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <DataProvider>{children}</DataProvider>
)

describe('useData', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('provides initial data', () => {
    const { result } = renderHook(() => useData(), { wrapper })
    expect(result.current.news).toBeDefined()
    expect(result.current.tools).toBeDefined()
    expect(result.current.prompts).toBeDefined()
    expect(result.current.projects).toBeDefined()
    expect(result.current.resources).toBeDefined()
    expect(result.current.learningJournals).toBeDefined()
  })

  it('adds news correctly', () => {
    const { result } = renderHook(() => useData(), { wrapper })
    const initialCount = result.current.news.length

    act(() => {
      result.current.addNews({
        title: 'Test News',
        content: 'Test Content',
        category: 'Test',
      })
    })

    expect(result.current.news.length).toBe(initialCount + 1)
    expect(result.current.news[0].title).toBe('Test News')
  })

  it('updates news correctly', () => {
    const { result } = renderHook(() => useData(), { wrapper })
    const newsId = result.current.news[0].id

    act(() => {
      result.current.updateNews(newsId, { title: 'Updated Title' })
    })

    expect(result.current.news.find(n => n.id === newsId)?.title).toBe('Updated Title')
  })

  it('deletes news correctly', () => {
    const { result } = renderHook(() => useData(), { wrapper })
    const initialCount = result.current.news.length
    const newsId = result.current.news[0].id

    act(() => {
      result.current.deleteNews(newsId)
    })

    expect(result.current.news.length).toBe(initialCount - 1)
    expect(result.current.news.find(n => n.id === newsId)).toBeUndefined()
  })

  it('adds tool correctly', () => {
    const { result } = renderHook(() => useData(), { wrapper })
    const initialCount = result.current.tools.length

    act(() => {
      result.current.addTool({
        name: 'Test Tool',
        description: 'Test Description',
        category: 'Test',
        tags: ['test'],
        website: 'https://test.com',
        isFree: true,
      })
    })

    expect(result.current.tools.length).toBe(initialCount + 1)
    expect(result.current.tools[0].name).toBe('Test Tool')
  })

  it('deletes tool correctly', () => {
    const { result } = renderHook(() => useData(), { wrapper })
    const initialCount = result.current.tools.length
    const toolId = result.current.tools[0].id

    act(() => {
      result.current.deleteTool(toolId)
    })

    expect(result.current.tools.length).toBe(initialCount - 1)
  })

  it('resets to defaults', () => {
    const { result } = renderHook(() => useData(), { wrapper })

    act(() => {
      result.current.addNews({ title: 'New', content: 'Content', category: 'Test' })
      result.current.resetToDefaults()
    })

    const initialNews = result.current.news
    expect(initialNews.length).toBeGreaterThan(0)
  })
})

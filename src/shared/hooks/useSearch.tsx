import { useState, useCallback, useMemo } from 'react'
import { useData } from './useData'

interface SearchResult {
  tools: Array<{
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    isFree: boolean
    website: string
  }>
  prompts: Array<{
    id: string
    title: string
    content: string
    category: string
    tags: string[]
  }>
  projects: Array<{
    id: string
    title: string
    description: string
    techStack: string[]
    githubUrl: string
  }>
  news: Array<{
    id: string
    title: string
    content: string
    category: string
    createdAt: string
  }>
  resources: Array<{
    id: string
    name: string
    description: string
    category: string
    tags: string[]
    isFree: boolean
    url: string
  }>
  learningJournals: Array<{
    id: string
    title: string
    excerpt: string
    category: string
    tags: string[]
    createdAt: string
  }>
}

interface SearchState {
  query: string
  results: SearchResult
  isLoading: boolean
  hasSearched: boolean
}

export function useSearch() {
  const [state, setState] = useState<SearchState>({
    query: '',
    results: {
      tools: [],
      prompts: [],
      projects: [],
      news: [],
      resources: [],
      learningJournals: [],
    },
    isLoading: false,
    hasSearched: false,
  })

  const { tools, prompts, projects, news, resources, learningJournals } = useData()

  const highlightText = useCallback((text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi')
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-accent-warning/20 text-accent-warning font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }, [])

  const search = useCallback((query: string) => {
    const trimmedQuery = query.trim().toLowerCase()

    setState(prev => ({ ...prev, query, isLoading: true }))

    setTimeout(() => {
      const filterByQuery = (item: any, fields: string[]) => {
        if (!trimmedQuery) return false
        return fields.some(field => {
          const value = item[field]
          if (typeof value === 'string') {
            return value.toLowerCase().includes(trimmedQuery)
          }
          if (Array.isArray(value)) {
            return value.some(v => v.toLowerCase().includes(trimmedQuery))
          }
          return false
        })
      }

      const filteredResults: SearchResult = {
        tools: tools.filter(item =>
          filterByQuery(item, ['name', 'description', 'category', 'tags'])
        ),
        prompts: prompts.filter(item =>
          filterByQuery(item, ['title', 'content', 'category', 'tags'])
        ),
        projects: projects.filter(item =>
          filterByQuery(item, ['title', 'description', 'techStack'])
        ),
        news: news.filter(item =>
          filterByQuery(item, ['title', 'content', 'category'])
        ),
        resources: resources.filter(item =>
          filterByQuery(item, ['name', 'description', 'category', 'tags'])
        ),
        learningJournals: learningJournals.filter(item =>
          filterByQuery(item, ['title', 'excerpt', 'category', 'tags'])
        ),
      }

      setState(prev => ({
        ...prev,
        results: filteredResults,
        isLoading: false,
        hasSearched: true,
      }))
    }, 300)
  }, [tools, prompts, projects, news, resources, learningJournals])

  const clearSearch = useCallback(() => {
    setState({
      query: '',
      results: {
        tools: [],
        prompts: [],
        projects: [],
        news: [],
        resources: [],
        learningJournals: [],
      },
      isLoading: false,
      hasSearched: false,
    })
  }, [])

  const totalResults = useMemo(() => {
    return (
      state.results.tools.length +
      state.results.prompts.length +
      state.results.projects.length +
      state.results.news.length +
      state.results.resources.length +
      state.results.learningJournals.length
    )
  }, [state.results])

  return {
    ...state,
    search,
    clearSearch,
    totalResults,
    highlightText,
  }
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

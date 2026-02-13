import { useMemo } from 'react'

export interface SearchableItem {
  id: string
  [key: string]: unknown
}

export function createSearchFunction<T extends SearchableItem>(
  items: T[],
  searchFields: (keyof T)[]
) {
  return (query: string): T[] => {
    if (!query.trim()) return items

    const lowerQuery = query.toLowerCase().trim()

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field as string]
        if (typeof value === 'string') {
          return value.toLowerCase().includes(lowerQuery)
        }
        if (Array.isArray(value)) {
          return value.some((v) =>
            typeof v === 'string' && v.toLowerCase().includes(lowerQuery)
          )
        }
        return false
      })
    )
  }
}

export function useSearch<T extends { id: string }>(
  items: T[],
  query: string,
  searchFields: (keyof T)[]
): T[] {
  const searchFn = useMemo(
    () => createSearchFunction(items as SearchableItem[], searchFields as (keyof SearchableItem)[]),
    [items, searchFields]
  )

  return useMemo(() => searchFn(query) as T[], [searchFn, query])
}

export function searchAllModules(
  query: string,
  modules: {
    name: string
    items: { id: string; [key: string]: unknown }[]
    searchFields: string[]
  }[]
): { moduleName: string; items: { id: string; [key: string]: unknown }[] }[] {
  if (!query.trim()) return []

  const lowerQuery = query.toLowerCase().trim()

  return modules
    .map(({ name, items, searchFields }) => {
      const matchedItems = items.filter((item) =>
        searchFields.some((field) => {
          const value = item[field]
          if (typeof value === 'string') {
            return value.toLowerCase().includes(lowerQuery)
          }
          if (Array.isArray(value)) {
            return value.some((v) =>
              typeof v === 'string' && v.toLowerCase().includes(lowerQuery)
            )
          }
          return false
        })
      )
      return { moduleName: name, items: matchedItems }
    })
    .filter((result) => result.items.length > 0)
}

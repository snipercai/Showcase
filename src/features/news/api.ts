import type { NewsItem } from './types'
import { initialNews } from '@/data'

const STORAGE_KEY = 'ai-hub-news'

function loadFromStorage(): NewsItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (e) {
    console.error('Error loading news from localStorage:', e)
  }
  return initialNews
}

export async function getNews(): Promise<NewsItem[]> {
  return loadFromStorage()
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  const news = loadFromStorage()
  return news.find((item) => item.id === id)
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  const news = loadFromStorage()
  return news.filter((item) => item.category === category)
}

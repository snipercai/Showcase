import { newsData } from '@/data/news'
import type { NewsItem } from './types'

export async function getNews(): Promise<NewsItem[]> {
  return newsData
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  return newsData.find((item) => item.id === id)
}

export async function getNewsByCategory(category: string): Promise<NewsItem[]> {
  return newsData.filter((item) => item.category === category)
}

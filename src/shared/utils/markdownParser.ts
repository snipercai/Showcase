interface FrontMatter {
  [key: string]: string | string[] | number | boolean
}

export interface ParsedMarkdown<T> {
  frontMatter: FrontMatter
  content: string
  data?: T
}

export function parseMarkdown<T>(markdown: string): ParsedMarkdown<T> {
  const frontMatter: FrontMatter = {}
  let content = markdown
  let data: T | undefined

  const lines = markdown.split('\n')
  let currentIndex = 0

  if (lines[0] === '---') {
    currentIndex = 1
    while (currentIndex < lines.length && lines[currentIndex] !== '---') {
      const line = lines[currentIndex]
      const colonIndex = line.indexOf(':')
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim()
        let value = line.substring(colonIndex + 1).trim()
        
        if (value.startsWith('[') && value.endsWith(']')) {
          try {
            value = JSON.parse(value) as unknown as string
          } catch {
          }
        } else if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1)
        } else if (!isNaN(Number(value))) {
          value = Number(value) as unknown as string
        } else if (value === 'true') {
          value = true as unknown as string
        } else if (value === 'false') {
          value = false as unknown as string
        }

        frontMatter[key] = value
      }
      currentIndex++
    }
    currentIndex++
  }

  content = lines.slice(currentIndex).join('\n').trim()

  const jsonStartMarker = '<!-- DATA_JSON_START'
  const jsonEndMarker = 'DATA_JSON_END -->'
  
  const startIndex = markdown.indexOf(jsonStartMarker)
  const endIndex = markdown.indexOf(jsonEndMarker)
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const jsonStr = markdown.substring(startIndex + jsonStartMarker.length, endIndex).trim()
    try {
      data = JSON.parse(jsonStr)
    } catch (error) {
      console.error('Failed to parse embedded JSON:', error)
    }
  }

  return {
    frontMatter,
    content,
    data
  }
}

export function parseIndexMarkdown<T>(markdown: string): T[] {
  const jsonStartMarker = '<!-- DATA_JSON_START'
  const jsonEndMarker = 'DATA_JSON_END -->'
  
  const startIndex = markdown.indexOf(jsonStartMarker)
  const endIndex = markdown.indexOf(jsonEndMarker)
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const jsonStr = markdown.substring(startIndex + jsonStartMarker.length, endIndex).trim()
    try {
      return JSON.parse(jsonStr)
    } catch (error) {
      console.error('Failed to parse index JSON:', error)
      return []
    }
  }
  
  return []
}

export function serializeToMarkdown<T extends Record<string, any>>(
  data: T,
  content?: string
): string {
  const frontMatter: Record<string, any> = {}
  const excludedKeys = ['id', 'content', 'excerpt']
  
  Object.entries(data).forEach(([key, value]) => {
    if (!excludedKeys.includes(key)) {
      if (Array.isArray(value)) {
        frontMatter[key] = JSON.stringify(value)
      } else if (typeof value === 'object' && value !== null) {
        frontMatter[key] = JSON.stringify(value)
      } else {
        frontMatter[key] = value
      }
    }
  })

  let markdown = '---\n'
  Object.entries(frontMatter).forEach(([key, value]) => {
    markdown += `${key}: ${value}\n`
  })
  markdown += '---\n\n'

  if (content) {
    markdown += `${content}\n\n`
  }

  markdown += `<!-- DATA_JSON_START\n${JSON.stringify(data, null, 2)}\nDATA_JSON_END -->\n`

  return markdown
}

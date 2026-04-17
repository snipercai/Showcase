export interface VersionInfo {
  version: string
  updatedAt: string
  changelog: string
  repository: string
  dataCount: {
    news: number
    tools: number
    prompts: number
    projects: number
    resources: number
    learningJournals: number
  }
}

export interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  url: string
  download_url: string
  type: 'file' | 'dir'
}

export interface GitHubDirectory {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string | null
  type: 'dir'
  _links: {
    self: string
    git: string
    html: string
  }
}

const GITHUB_REPO = {
  owner: 'snipercai',
  repo: 'ai-hub-data',
  branch: 'main'
}

const BASE_URL = `https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}/contents`

export async function getGitHubFile(path: string): Promise<string> {
  const url = `${BASE_URL}/${path}?ref=${GITHUB_REPO.branch}`
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  })
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`File not found: ${path}`)
    }
    if (response.status === 403) {
      throw new Error('GitHub API rate limit exceeded')
    }
    throw new Error(`GitHub API error: ${response.status}`)
  }
  
  const data = await response.json()
  
  if (data.type === 'file') {
    // 修复：正确解码 UTF-8 中文字符
    // atob() 解码为 binary string (Latin-1)，需要转换为 UTF-8
    const binaryString = atob(data.content)
    const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0))
    return new TextDecoder('utf-8').decode(bytes)
  }
  
  throw new Error('Not a file')
}

export async function getVersionInfo(): Promise<VersionInfo> {
  const content = await getGitHubFile('version.json')
  return JSON.parse(content)
}

export async function getDirectoryContents(path: string = ''): Promise<(GitHubFile | GitHubDirectory)[]> {
  const url = path ? `${BASE_URL}/${path}?ref=${GITHUB_REPO.branch}` : BASE_URL
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  })
  
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`)
  }
  
  return await response.json()
}

export async function getDataFiles(): Promise<Record<string, GitHubFile[]>> {
  const categories = ['news', 'tools', 'prompts', 'projects', 'resources', 'learning-journals']
  const result: Record<string, GitHubFile[]> = {}
  
  for (const category of categories) {
    try {
      const contents = await getDirectoryContents(category)
      const files = contents.filter((item): item is GitHubFile => item.type === 'file')
      result[category] = files
    } catch (error) {
      console.error(`Failed to get ${category} files:`, error)
      result[category] = []
    }
  }
  
  return result
}

export async function getCategoryData<T>(category: string): Promise<T[]> {
  const path = `${category}/index.md`
  const content = await getGitHubFile(path)
  
  const jsonStartMarker = '<!-- DATA_JSON_START'
  const jsonEndMarker = 'DATA_JSON_END -->'
  
  const startIndex = content.indexOf(jsonStartMarker)
  const endIndex = content.indexOf(jsonEndMarker)
  
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    const jsonStr = content.substring(startIndex + jsonStartMarker.length, endIndex).trim()
    try {
      return JSON.parse(jsonStr)
    } catch (error) {
      console.error(`Failed to parse ${category} JSON:`, error)
      return []
    }
  }
  
  return []
}

export async function checkGitHubAvailability(): Promise<boolean> {
  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO.owner}/${GITHUB_REPO.repo}`, {
      method: 'HEAD',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    })
    return response.ok
  } catch {
    return false
  }
}

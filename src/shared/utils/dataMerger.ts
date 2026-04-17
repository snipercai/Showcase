export function mergeData<T extends { id: string; updatedAt?: string; createdAt?: string }>(
  githubData: T[],
  userData: T[]
): T[] {
  const userMap = new Map(userData.map(item => [item.id, item]))
  const result = new Map<string, T>()
  
  userData.forEach(item => result.set(item.id, item))
  
  githubData.forEach(item => {
    if (!userMap.has(item.id)) {
      result.set(item.id, item)
    }
  })
  
  return Array.from(result.values())
}

export function mergeDataWithUserPriority<T extends { 
  id: string; 
  updatedAt?: string; 
  createdAt?: string;
  [key: string]: any
}>(
  githubData: T[],
  userData: T[]
): {
  merged: T[]
  added: number
  kept: number
} {
  const userMap = new Map(userData.map(item => [item.id, item]))
  const result = new Map<string, T>()
  let added = 0
  let kept = 0
  
  userData.forEach(item => {
    result.set(item.id, item)
    kept++
  })
  
  githubData.forEach(item => {
    if (!userMap.has(item.id)) {
      result.set(item.id, item)
      added++
    }
  })
  
  return {
    merged: Array.from(result.values()),
    added,
    kept
  }
}

export function backupUserData(): string {
  const userData: Record<string, any> = {}
  
  const keys = [
    'ai-hub-news',
    'ai-hub-tools',
    'ai-hub-prompts',
    'ai-hub-projects',
    'ai-hub-resources',
    'ai-hub-learning-journals'
  ]
  
  keys.forEach(key => {
    const data = localStorage.getItem(key)
    if (data) {
      try {
        userData[key] = JSON.parse(data)
      } catch {
        userData[key] = []
      }
    } else {
      userData[key] = []
    }
  })
  
  return JSON.stringify(userData)
}

export function restoreUserData(backup: string): boolean {
  try {
    const userData = JSON.parse(backup)
    
    Object.entries(userData).forEach(([key, value]) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
    
    return true
  } catch {
    return false
  }
}

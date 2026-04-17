import { getVersionInfo, getCategoryData, VersionInfo } from '../utils/githubApi'
import { DATA_SYNC_CONFIG } from '../config'

export interface SyncResult {
  success: boolean
  updated: boolean
  message: string
  stats?: {
    added: number
    updated: number
    unchanged: number
  }
}

export interface LocalVersion {
  version: string
  lastSyncTime: number
}

function getLocalVersion(): LocalVersion | null {
  const versionStr = localStorage.getItem(DATA_SYNC_CONFIG.storage.localVersionKey)
  if (versionStr) {
    try {
      return JSON.parse(versionStr)
    } catch {
      return null
    }
  }
  return null
}

function saveLocalVersion(version: VersionInfo): void {
  const localVersion: LocalVersion = {
    version: version.version,
    lastSyncTime: Date.now()
  }
  localStorage.setItem(DATA_SYNC_CONFIG.storage.localVersionKey, JSON.stringify(localVersion))
}

function getLocalVersionStr(): string | null {
  const version = getLocalVersion()
  return version ? version.version : null
}

export async function syncDataFromGitHub(): Promise<SyncResult> {
  try {
    const githubVersion = await getVersionInfo()
    const localVersionStr = getLocalVersionStr()
    
    if (localVersionStr && localVersionStr === githubVersion.version) {
      return {
        success: true,
        updated: false,
        message: '数据已是最新'
      }
    }
    
    const categories = ['news', 'tools', 'prompts', 'projects', 'resources', 'learning-journals']
    let added = 0
    let updated = 0
    let unchanged = 0
    
    for (const category of categories) {
      try {
        const data = await getCategoryData<any>(category)
        
        if (data.length > 0) {
          const storageKey = `ai-hub-${category}`
          const existingDataStr = localStorage.getItem(storageKey)
          
          if (existingDataStr) {
            try {
              const existingData = JSON.parse(existingDataStr)
              const existingMap = new Map(existingData.map((item: any) => [item.id, item]))
              
              let hasChanges = false
              for (const newItem of data as Array<{ id: string; updatedAt?: string }>) {
                const existingItem = existingMap.get(newItem.id) as { id: string; updatedAt?: string } | undefined
                if (!existingItem) {
                  added++
                  hasChanges = true
                } else if (newItem.updatedAt && existingItem.updatedAt && newItem.updatedAt > existingItem.updatedAt) {
                  updated++
                  hasChanges = true
                } else {
                  unchanged++
                }
              }
              
              if (hasChanges) {
                localStorage.setItem(storageKey, JSON.stringify(data))
              }
            } catch {
              localStorage.setItem(storageKey, JSON.stringify(data))
              added += data.length
            }
          } else {
            localStorage.setItem(storageKey, JSON.stringify(data))
            added += data.length
          }
        }
      } catch (error) {
        console.error(`Failed to sync ${category}:`, error)
      }
    }
    
    saveLocalVersion(githubVersion)
    localStorage.setItem(DATA_SYNC_CONFIG.storage.hasSyncedKey, 'true')
    localStorage.setItem(DATA_SYNC_CONFIG.storage.lastSyncTimeKey, Date.now().toString())
    
    return {
      success: true,
      updated: true,
      message: '数据同步成功',
      stats: {
        added,
        updated,
        unchanged
      }
    }
  } catch (error) {
    return {
      success: false,
      updated: false,
      message: `同步失败：${error instanceof Error ? error.message : '未知错误'}`
    }
  }
}

export function hasSyncedBefore(): boolean {
  return localStorage.getItem(DATA_SYNC_CONFIG.storage.hasSyncedKey) === 'true'
}

export function getLastSyncTime(): number | null {
  const timeStr = localStorage.getItem(DATA_SYNC_CONFIG.storage.lastSyncTimeKey)
  return timeStr ? parseInt(timeStr, 10) : null
}

export function shouldAutoSync(): boolean {
  const lastSyncTime = getLastSyncTime()
  if (!lastSyncTime) {
    return true
  }
  
  const now = Date.now()
  return now - lastSyncTime >= DATA_SYNC_CONFIG.sync.autoSyncInterval
}

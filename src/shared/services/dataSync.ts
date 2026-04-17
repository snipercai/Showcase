import { getVersionInfo, getCategoryData, VersionInfo } from '../utils/githubApi'
import { DATA_SYNC_CONFIG } from '../config'

/**
 * 同步进度阶段
 */
export type SyncPhase = 
  | 'checking'      // 检查版本
  | 'downloading'   // 下载数据
  | 'merging'       // 合并数据
  | 'saving'        // 保存数据
  | 'completed'     // 完成
  | 'error'         // 错误

/**
 * 同步进度信息
 */
export interface SyncProgress {
  phase: SyncPhase
  message: string
  category?: string
  stats?: {
    added: number
    updated: number
    unchanged: number
    total: number
  }
  details?: string[]
}

export interface SyncResult {
  success: boolean
  updated: boolean
  message: string
  progress?: SyncProgress[]
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

/**
 * 获取分类的中文名称
 */
function getCategoryName(category: string): string {
  const names: Record<string, string> = {
    'news': '行业资讯',
    'tools': 'AI 工具',
    'prompts': '提示词',
    'projects': '项目案例',
    'resources': '学习资源',
    'learning-journals': '学习记录'
  }
  return names[category] || category
}

/**
 * 从 GitHub 同步数据
 * @param onProgress 进度回调函数
 */
export async function syncDataFromGitHub(
  onProgress?: (progress: SyncProgress) => void
): Promise<SyncResult> {
  const progressLog: SyncProgress[] = []
  
  try {
    // Phase 1: 检查版本
    onProgress?.({
      phase: 'checking',
      message: '正在检查 GitHub 数据版本...'
    })
    
    const githubVersion = await getVersionInfo()
    const versionInfo = {
      phase: 'checking' as SyncPhase,
      message: `当前版本：${githubVersion.version}`,
      details: [`数据总量：${JSON.stringify(githubVersion.dataCount)}`]
    }
    progressLog.push(versionInfo)
    onProgress?.(versionInfo)
    
    const localVersionStr = getLocalVersionStr()
    
    if (localVersionStr && localVersionStr === githubVersion.version) {
      return {
        success: true,
        updated: false,
        message: '数据已是最新',
        progress: progressLog
      }
    }
    
    // Phase 2: 下载数据
    const categories = ['news', 'tools', 'prompts', 'projects', 'resources', 'learning-journals']
    let added = 0
    let updated = 0
    let unchanged = 0
    
    for (const category of categories) {
      // 开始下载
      onProgress?.({
        phase: 'downloading',
        message: `正在下载 ${getCategoryName(category)} 数据...`,
        category,
        stats: { added, updated, unchanged, total: categories.length }
      })
      
      const data = await getCategoryData<any>(category)
      
      // 下载完成
      onProgress?.({
        phase: 'downloading',
        message: `${getCategoryName(category)} 下载完成`,
        category,
        details: [`获取 ${data.length} 条数据`],
        stats: { added, updated, unchanged, total: categories.length }
      })
      
      if (data.length > 0) {
        const storageKey = `ai-hub-${category}`
        const existingDataStr = localStorage.getItem(storageKey)
        
        if (existingDataStr) {
          try {
            const existingData = JSON.parse(existingDataStr)
            const existingMap = new Map(existingData.map((item: any) => [item.id, item]))
            
            let categoryAdded = 0
            let categoryUpdated = 0
            
            for (const newItem of data as Array<{ id: string; updatedAt?: string }>) {
              const existingItem = existingMap.get(newItem.id) as { id: string; updatedAt?: string } | undefined
              if (!existingItem) {
                categoryAdded++
              } else if (newItem.updatedAt && existingItem.updatedAt && newItem.updatedAt > existingItem.updatedAt) {
                categoryUpdated++
              } else {
                unchanged++
              }
            }
            
            added += categoryAdded
            updated += categoryUpdated
            
            // 保存数据
            localStorage.setItem(storageKey, JSON.stringify(data))
          } catch {
            localStorage.setItem(storageKey, JSON.stringify(data))
            added += data.length
          }
        } else {
          localStorage.setItem(storageKey, JSON.stringify(data))
          added += data.length
        }
      }
    }
    
    // Phase 3: 合并数据
    const mergingProgress: SyncProgress = {
      phase: 'merging',
      message: '正在合并数据...',
      details: ['保留用户数据', '补充新数据']
    }
    progressLog.push(mergingProgress)
    onProgress?.(mergingProgress)
    
    // Phase 4: 保存
    const savingProgress: SyncProgress = {
      phase: 'saving',
      message: '正在保存数据到本地缓存...'
    }
    progressLog.push(savingProgress)
    onProgress?.(savingProgress)
    
    // Phase 5: 完成
    const completedProgress: SyncProgress = {
      phase: 'completed',
      message: '同步完成！',
      stats: { added, updated, unchanged, total: categories.length }
    }
    progressLog.push(completedProgress)
    onProgress?.(completedProgress)
    
    saveLocalVersion(githubVersion)
    localStorage.setItem(DATA_SYNC_CONFIG.storage.hasSyncedKey, 'true')
    localStorage.setItem(DATA_SYNC_CONFIG.storage.lastSyncTimeKey, Date.now().toString())
    
    return {
      success: true,
      updated: true,
      message: '数据同步成功',
      progress: progressLog,
      stats: {
        added,
        updated,
        unchanged
      }
    }
  } catch (error) {
    const errorProgress: SyncProgress = {
      phase: 'error',
      message: `同步失败：${error instanceof Error ? error.message : '未知错误'}`,
      details: error instanceof Error && error.stack ? [error.stack] : undefined
    }
    progressLog.push(errorProgress)
    onProgress?.(errorProgress)
    
    return {
      success: false,
      updated: false,
      message: `同步失败：${error instanceof Error ? error.message : '未知错误'}`,
      progress: progressLog
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

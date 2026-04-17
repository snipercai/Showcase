import { useState } from 'react'
import { useData } from '@/shared/hooks/useData'
import type { SyncProgress } from '@/shared/services/dataSync'

interface SyncLogProps {
  logs: SyncProgress[]
}

/**
 * 同步日志组件
 */
function SyncLog({ logs }: SyncLogProps) {
  return (
    <div className="mt-4 p-3 rounded bg-bg-subtle text-xs font-mono max-h-64 overflow-y-auto border border-border-subtle">
      <h4 className="font-semibold mb-2 text-text-primary">同步日志</h4>
      {logs.map((log, index) => (
        <div key={index} className="mb-2 last:mb-0">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
              log.phase === 'completed' ? 'bg-accent-success' :
              log.phase === 'error' ? 'bg-accent-error' :
              log.phase === 'downloading' ? 'bg-accent-primary animate-pulse' :
              'bg-text-muted'
            }`} />
            <span className="text-text-muted flex-shrink-0">
              {new Date().toLocaleTimeString()}
            </span>
            <span className={`flex-shrink-0 ${
              log.phase === 'error' ? 'text-accent-error font-medium' : 
              log.phase === 'completed' ? 'text-accent-success font-medium' :
              'text-text-primary'
            }`}>
              {log.message}
            </span>
          </div>
          {log.details && log.details.length > 0 && (
            <div className="ml-4 mt-1 text-text-muted space-y-1">
              {log.details.map((detail, i) => (
                <div key={i} className="truncate">• {detail}</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
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
 * 数据同步状态组件
 */
export function SyncStatus() {
  const { syncData, syncing, lastSyncTime, currentProgress } = useData()
  const [syncLogs, setSyncLogs] = useState<SyncProgress[]>([])
  const [lastResult, setLastResult] = useState<{
    success: boolean
    message: string
    stats?: { added: number; updated: number; unchanged: number }
  } | null>(null)

  const handleSync = async () => {
    setSyncLogs([])
    setLastResult(null)
    
    const result = await syncData((progress) => {
      setSyncLogs(prev => [...prev, progress])
    })
    
    setLastResult({
      success: result.success,
      message: result.message,
      stats: result.stats
    })
  }

  // 计算总进度
  const totalProgress = currentProgress?.stats 
    ? Math.round(((currentProgress.stats.added + currentProgress.stats.updated + currentProgress.stats.unchanged) / 6) * 100)
    : 0

  return (
    <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
      {/* 标题和按钮 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg text-text-primary">数据同步</h3>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-4 py-2 rounded-lg bg-accent-primary text-white text-sm font-medium hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {syncing && (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {syncing ? '同步中...' : '同步数据'}
        </button>
      </div>
      
      {/* 同步时间 */}
      {lastSyncTime && (
        <p className="text-sm text-text-muted mb-3">
          最后同步时间：{new Date(lastSyncTime).toLocaleString('zh-CN')}
        </p>
      )}
      
      {/* 当前进度 */}
      {syncing && currentProgress && (
        <div className="mb-4 p-3 rounded bg-accent-primary/10 border border-accent-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
            <span className="font-medium text-accent-primary">
              {currentProgress.message}
            </span>
          </div>
          
          {/* 进度条 */}
          {currentProgress.stats && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                <span>
                  进度：{currentProgress.stats.added + currentProgress.stats.updated + currentProgress.stats.unchanged} / 6 个类别
                </span>
                <span>{totalProgress}%</span>
              </div>
              <div className="w-full bg-bg-base rounded-full h-2 overflow-hidden border border-border-subtle">
                <div 
                  className="bg-accent-primary h-full transition-all duration-300 ease-out"
                  style={{ width: `${totalProgress}%` }}
                />
              </div>
              {currentProgress.category && (
                <div className="text-xs text-text-muted mt-2">
                  当前：{getCategoryName(currentProgress.category)}
                  {currentProgress.details && currentProgress.details.length > 0 && (
                    <span className="ml-2">• {currentProgress.details[0]}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {/* 上次同步结果 */}
      {lastResult && !syncing && (
        <div className={`mb-4 p-3 rounded border ${
          lastResult.success 
            ? 'bg-accent-success/10 border-accent-success/20' 
            : 'bg-accent-error/10 border-accent-error/20'
        }`}>
          <div className={`font-medium mb-1 flex items-center gap-2 ${
            lastResult.success ? 'text-accent-success' : 'text-accent-error'
          }`}>
            {lastResult.success ? (
              <>
                <span className="text-lg">✅</span>
                <span>同步成功</span>
              </>
            ) : (
              <>
                <span className="text-lg">❌</span>
                <span>同步失败</span>
              </>
            )}
          </div>
          <div className="text-sm text-text-primary mb-2">{lastResult.message}</div>
          {lastResult.stats && (
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-4">
                <span className="text-accent-success">
                  <span className="font-medium">+{lastResult.stats.added}</span> 新增
                </span>
                <span className="text-accent-info">
                  <span className="font-medium">↻ {lastResult.stats.updated}</span> 更新
                </span>
                <span className="text-text-muted">
                  <span className="font-medium">= {lastResult.stats.unchanged}</span> 未变
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 同步日志 */}
      {syncLogs.length > 0 && <SyncLog logs={syncLogs} />}
      
      {/* 帮助说明 */}
      <div className="mt-4 pt-3 border-t border-border-subtle text-xs text-text-muted space-y-1">
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0">•</span>
          <span>首次启动时会自动从 GitHub 同步最新数据</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0">•</span>
          <span>点击"同步数据"按钮可手动更新</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0">•</span>
          <span>您的本地数据会被保留，不会丢失</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="flex-shrink-0">•</span>
          <span>数据源：github.com/snipercai/ai-hub-data</span>
        </div>
      </div>
    </div>
  )
}

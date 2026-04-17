import { useData } from '@/shared/hooks/useData'

export function SyncStatus() {
  const { syncData, syncing, lastSyncTime } = useData()

  const handleSync = async () => {
    const result = await syncData()
    
    if (result.success) {
      alert(result.message)
    } else {
      alert(`同步失败：${result.message}`)
    }
  }

  return (
    <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">数据同步</h3>
        <button
          onClick={handleSync}
          disabled={syncing}
          className="px-4 py-2 rounded-lg bg-accent-primary text-white text-sm font-medium hover:bg-accent-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {syncing ? '同步中...' : '同步数据'}
        </button>
      </div>
      
      {lastSyncTime && (
        <p className="text-sm text-text-muted mb-2">
          最后同步时间：{new Date(lastSyncTime).toLocaleString('zh-CN')}
        </p>
      )}
      
      <div className="text-xs text-text-muted space-y-1">
        <p>• 首次启动时会自动从 GitHub 同步最新数据</p>
        <p>• 点击"同步数据"按钮可手动更新</p>
        <p>• 您的本地数据会被保留，不会丢失</p>
        <p>• 数据源：github.com/snipercai/ai-hub-data</p>
      </div>
    </div>
  )
}

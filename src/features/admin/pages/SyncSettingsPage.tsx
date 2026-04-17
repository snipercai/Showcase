import { SyncStatus } from '../components/SyncStatus'

function SyncSettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">数据同步设置</h1>
      
      <div className="max-w-3xl space-y-6">
        <SyncStatus />
        
        <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
          <h3 className="font-semibold text-lg mb-4">同步说明</h3>
          <div className="space-y-3 text-sm text-text-muted">
            <div>
              <h4 className="font-medium text-text-primary mb-1">什么是数据同步？</h4>
              <p>数据同步功能可以让您从 GitHub 仓库获取最新的数据更新，包括行业资讯、AI 工具、提示词、项目案例、学习资源和学习记录。</p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-1">数据保护</h4>
              <p>同步时会保留您本地的所有数据。GitHub 数据只会补充新的条目，不会覆盖您已有的数据。</p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-1">数据来源</h4>
              <p>所有数据来自公开的 GitHub 仓库：<a href="https://github.com/snipercai/ai-hub-data" target="_blank" rel="noopener noreferrer" className="text-accent-primary hover:underline">github.com/snipercai/ai-hub-data</a></p>
            </div>
            
            <div>
              <h4 className="font-medium text-text-primary mb-1">离线使用</h4>
              <p>数据会缓存在本地，即使离线也能正常使用。联网时可以手动同步获取最新数据。</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-accent-info/10 border border-accent-info/20">
          <h3 className="font-semibold text-accent-info mb-2">💡 提示</h3>
          <ul className="text-sm text-text-muted space-y-1 list-disc list-inside">
            <li>首次启动应用时会自动同步数据</li>
            <li>建议定期手动同步以获取最新内容</li>
            <li>如有网络问题，可以稍后重试</li>
            <li>欢迎通过 GitHub PR 贡献更多数据</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SyncSettingsPage

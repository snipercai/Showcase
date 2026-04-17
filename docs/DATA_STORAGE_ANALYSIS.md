# 数据存储方案分析与优化建议

## 📊 现状分析

### 当前存储方式

**数据存储位置**: `src/data/initial/` (数据定义) + `src/shared/hooks/useData.tsx` (管理逻辑)

**存储机制**: 
- 使用 **localStorage** 进行数据持久化
- 所有数据存储在浏览器端
- 每个数据类型使用独立的 storage key

**数据类型** (6 种):
1. **News** (`ai-hub-news`) - 行业资讯
2. **Tools** (`ai-hub-tools`) - AI 工具
3. **Prompts** (`ai-hub-prompts`) - 提示词库
4. **Projects** (`ai-hub-projects`) - 项目案例
5. **Resources** (`ai-hub-resources`) - AI 资源
6. **LearningJournals** (`ai-hub-learning-journals`) - 学习记录

**目录结构** (✅ 已重构):
```
src/
├── data/
│   ├── initial/                    # 初始数据定义
│   │   ├── news.ts                # 行业资讯
│   │   ├── tools.ts               # AI 工具
│   │   ├── prompts.ts             # 提示词库
│   │   ├── projects.ts            # 项目案例
│   │   ├── resources.ts           # AI 资源
│   │   └── learningJournals.ts    # 学习记录
│   ├── README.md                  # 数据目录说明
│   └── index.ts                   # 统一导出
│
├── shared/
│   ├── hooks/
│   │   └── useData.tsx            # 数据管理逻辑（引用 src/data）
│   └── types/
│       └── index.ts               # 数据类型定义
│
└── features/
    └── ...                        # 功能模块
```

**存储结构**:
```typescript
interface STORAGE_KEYS {
  news: 'ai-hub-news'
  tools: 'ai-hub-tools'
  prompts: 'ai-hub-prompts'
  projects: 'ai-hub-projects'
  resources: 'ai-hub-resources'
  learningJournals: 'ai-hub-learning-journals'
}
```

**数据操作**:
- `loadFromStorage<T>(key, defaultValue)` - 从 localStorage 加载
- `saveToStorage<T>(key, data)` - 保存到 localStorage
- 每个数据类型都有完整的 CRUD 操作
- 使用 `useEffect` 自动保存变更

**职责划分** (✅ 已实现):
| 目录 | 职责 | 内容 |
|------|------|------|
| `src/data/initial/` | **纯数据** | 初始数据定义（JSON-like 结构） |
| `src/shared/types/` | **类型定义** | TypeScript 接口和类型 |
| `src/shared/hooks/useData.tsx` | **数据管理** | Context、CRUD、localStorage 逻辑 |

---

## ⚠️ 当前方案的问题

### 1. 数据持久化问题

#### 1.1 发版影响
- ❌ **问题**: 每次发版后，如果 initial 数据有变化，用户 localStorage 中的数据不会自动更新
- ❌ **场景**: 添加新字段、修改数据结构、修复初始数据 bug
- ❌ **影响**: 用户看到的是旧版本数据，需要手动清除 localStorage 才能获取最新数据

#### 1.2 数据迁移
- ❌ **问题**: 没有数据版本控制和迁移机制
- ❌ **场景**: 数据结构变更时（如添加必填字段）
- ❌ **影响**: 可能导致应用崩溃或数据丢失

#### 1.3 数据备份
- ❌ **问题**: 用户数据无法方便地备份和恢复
- ❌ **场景**: 更换设备、清除浏览器缓存
- ❌ **影响**: 用户数据丢失风险高

### 2. 导入导出问题

#### 2.1 批量导入
- ❌ **问题**: 没有批量导入功能
- ❌ **场景**: 初始化大量数据、从其他系统迁移
- ❌ **影响**: 只能手动逐条添加，效率极低

#### 2.2 数据导出
- ❌ **问题**: 没有数据导出功能
- ❌ **场景**: 数据备份、数据分析、分享
- ❌ **影响**: 用户数据被锁定在浏览器中

#### 2.3 数据格式
- ❌ **问题**: 没有标准化的数据交换格式
- ❌ **场景**: 不同系统间数据交换
- ❌ **影响**: 数据迁移困难

### 3. 存储限制问题

#### 3.1 容量限制
- ⚠️ **问题**: localStorage 容量有限 (通常 5-10MB)
- ⚠️ **场景**: 大量数据或大文本内容（如学习记录的 Markdown）
- ⚠️ **影响**: 可能触发 `QuotaExceededError`

#### 3.2 性能问题
- ⚠️ **问题**: localStorage 是同步操作，阻塞主线程
- ⚠️ **场景**: 大数据量读写
- ⚠️ **影响**: 页面卡顿，用户体验差

#### 3.3 数据共享
- ❌ **问题**: localStorage 无法跨设备/浏览器共享
- ❌ **场景**: 多设备使用、团队协作
- ❌ **影响**: 数据孤岛

### 4. 数据安全问题

#### 4.1 XSS 风险
- ⚠️ **问题**: localStorage 易受 XSS 攻击
- ⚠️ **场景**: 第三方脚本注入
- ⚠️ **影响**: 数据泄露或篡改

#### 4.2 数据验证
- ⚠️ **问题**: 从 localStorage 加载数据时没有严格验证
- ⚠️ **场景**: 数据被篡改、版本不兼容
- ⚠️ **影响**: 可能导致运行时错误

---

## 💡 优化方案

### 方案一：增强型 localStorage 方案 (短期)

**适用场景**: 保持纯前端架构，快速实施

#### 核心改进

1. **数据版本控制**
```typescript
interface DataVersion {
  version: number
  lastUpdated: string
}

const DATA_VERSION = 1

interface StoredData<T> {
  version: number
  timestamp: number
  data: T[]
}
```

2. **数据迁移机制**
```typescript
function migrateData<T>(data: StoredData<T>, fromVersion: number): T[] {
  if (fromVersion === DATA_VERSION) return data.data
  
  // 版本迁移逻辑
  switch (fromVersion) {
    case 1:
      // v1 -> v2 迁移
      break
    // ...
  }
  return data.data
}
```

3. **导入导出功能**
```typescript
// 导出
function exportData(): string {
  const allData = {
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    news,
    tools,
    prompts,
    projects,
    resources,
    learningJournals
  }
  return JSON.stringify(allData, null, 2)
}

// 导入
function importData(jsonString: string): void {
  const imported = JSON.parse(jsonString)
  // 验证数据格式
  // 迁移数据
  // 更新到 localStorage
}
```

4. **数据验证**
```typescript
function validateData<T>(data: unknown, schema: ZodSchema): T[] {
  try {
    return schema.parse(data)
  } catch (error) {
    console.error('Data validation failed:', error)
    return [] // 或抛出错误
  }
}
```

5. **批量操作**
```typescript
function bulkImport(items: T[], type: DataType): void {
  setItems(prev => [...items, ...prev])
  // 自动保存到 localStorage
}
```

**优点**:
- ✅ 实施简单，无需后端
- ✅ 保持现有架构
- ✅ 快速上线

**缺点**:
- ❌ 仍受 localStorage 限制
- ❌ 无法跨设备同步
- ❌ 安全性提升有限

---

### 方案二：IndexedDB 方案 (中期)

**适用场景**: 需要存储更大数据量，保持纯前端

#### 核心改进

1. **使用 IndexedDB 替代 localStorage**
```typescript
import { openDB } from 'idb'

const DB_NAME = 'ai-hub-db'
const DB_VERSION = 1

async function initDB() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      // 创建对象仓库
      db.createObjectStore('news', { keyPath: 'id' })
      db.createObjectStore('tools', { keyPath: 'id' })
      db.createObjectStore('prompts', { keyPath: 'id' })
      db.createObjectStore('projects', { keyPath: 'id' })
      db.createObjectStore('resources', { keyPath: 'id' })
      db.createObjectStore('learningJournals', { keyPath: 'id' })
      
      // 创建索引
      const newsStore = db.transaction('news', 'readwrite').objectStore('news')
      newsStore.createIndex('category', 'category')
      newsStore.createIndex('createdAt', 'createdAt')
      // ... 其他类型的索引
    },
  })
}
```

2. **异步数据操作**
```typescript
async function loadFromDB<T>(storeName: string): Promise<T[]> {
  const db = await initDB()
  return db.getAll(storeName)
}

async function saveToDB<T>(storeName: string, data: T[]): Promise<void> {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readwrite')
  await tx.store.clear()
  for (const item of data) {
    await tx.store.put(item)
  }
  await tx.done
}
```

3. **批量导入优化**
```typescript
async function bulkImportToDB<T>(
  storeName: string, 
  items: T[]
): Promise<void> {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readwrite')
  for (const item of items) {
    await tx.store.put(item)
  }
  await tx.done
}
```

4. **数据导出**
```typescript
async function exportFromDB(): Promise<ExportData> {
  const db = await initDB()
  return {
    version: DB_VERSION,
    exportedAt: new Date().toISOString(),
    news: await db.getAll('news'),
    tools: await db.getAll('tools'),
    prompts: await db.getAll('prompts'),
    projects: await db.getAll('projects'),
    resources: await db.getAll('resources'),
    learningJournals: await db.getAll('learningJournals'),
  }
}
```

**优点**:
- ✅ 容量大 (通常 50MB+)
- ✅ 异步操作，不阻塞 UI
- ✅ 支持索引和查询
- ✅ 支持事务

**缺点**:
- ❌ API 复杂
- ❌ 仍无法跨设备同步
- ❌ 需要 polyfill 支持旧浏览器

---

### 方案三：后端数据库方案 (长期推荐)

**适用场景**: 需要数据同步、团队协作、正式发布

#### 架构设计

```
┌─────────────┐      REST API      ┌─────────────┐
│   Frontend  │ ◄────────────────► │   Backend   │
│  (React)    │                    │   (Node.js) │
└─────────────┘                    └──────┬──────┘
     │                                    │
     │ localStorage                       │
     │ (缓存)                             │
     │                                    ▼
     │                             ┌─────────────┐
     │                             │  Database   │
     │                             │ (PostgreSQL │
     │                             │   MongoDB)  │
     │                             └─────────────┘
     │                                    │
     ▼                                    ▼
┌─────────────┐                    ┌─────────────┐
│   Export    │                    │   Import    │
│   (JSON)    │                    │   (JSON)    │
└─────────────┘                    └─────────────┘
```

#### 后端 API 设计

```typescript
// RESTful API 端点
GET    /api/news              // 获取新闻列表
POST   /api/news              // 创建新闻
GET    /api/news/:id          // 获取新闻详情
PUT    /api/news/:id          // 更新新闻
DELETE /api/news/:id          // 删除新闻

GET    /api/tools             // 获取工具列表
POST   /api/tools             // 创建工具
// ... 其他类型类似

// 批量操作
POST   /api/bulk/import       // 批量导入
GET    /api/bulk/export       // 批量导出

// 数据版本
GET    /api/version           // 获取数据版本
```

#### 前端数据同步

```typescript
// 使用 React Query 进行数据管理
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

function useNews() {
  const queryClient = useQueryClient()
  
  // 获取数据
  const { data: news = [] } = useQuery({
    queryKey: ['news'],
    queryFn: () => fetch('/api/news').then(res => res.json()),
  })
  
  // 创建
  const createMutation = useMutation({
    mutationFn: (newItem) => fetch('/api/news', {
      method: 'POST',
      body: JSON.stringify(newItem),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries(['news'])
    },
  })
  
  // 更新
  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }) => fetch(`/api/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),
  })
  
  // 删除
  const deleteMutation = useMutation({
    mutationFn: (id) => fetch(`/api/news/${id}`, {
      method: 'DELETE',
    }),
  })
  
  return {
    news,
    addNews: createMutation.mutate,
    updateNews: updateMutation.mutate,
    deleteNews: deleteMutation.mutate,
  }
}
```

#### 数据导入导出

**导出功能**:
```typescript
async function exportAllData(): Promise<void> {
  const response = await fetch('/api/bulk/export')
  const data = await response.json()
  
  // 下载文件
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ai-hub-export-${new Date().toISOString()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
```

**导入功能**:
```typescript
async function importData(file: File): Promise<void> {
  const formData = new FormData()
  formData.append('file', file)
  
  await fetch('/api/bulk/import', {
    method: 'POST',
    body: formData,
  })
  
  // 重新加载数据
  queryClient.invalidateQueries()
}
```

**优点**:
- ✅ 数据持久化，不受发版影响
- ✅ 跨设备同步
- ✅ 支持多用户协作
- ✅ 数据安全性高
- ✅ 易于备份和恢复
- ✅ 支持复杂查询和统计

**缺点**:
- ❌ 需要后端开发
- ❌ 部署复杂度增加
- ❌ 需要数据库维护

---

## 🎯 推荐实施方案

### 阶段一：立即实施 (1-2 天)

**目标**: 解决最紧迫的导入导出问题

1. **添加数据版本控制**
   - 定义 `DATA_VERSION` 常量
   - 在 localStorage 中存储版本信息
   - 实现基础的数据迁移框架

2. **实现导入导出功能**
   - 添加"导出数据"按钮（管理后台）
   - 添加"导入数据"按钮（管理后台）
   - 实现 JSON 格式的导入导出
   - 添加数据验证

3. **添加批量导入功能**
   - 支持 JSON 格式批量导入
   - 提供导入模板下载
   - 显示导入结果和错误信息

**预期成果**:
- ✅ 用户可以备份和恢复数据
- ✅ 支持批量导入初始数据
- ✅ 数据版本可追踪

### 阶段二：短期优化 (1-2 周)

**目标**: 提升存储性能和安全性

1. **迁移到 IndexedDB**
   - 使用 `idb` 库简化 API
   - 实现数据迁移脚本
   - 保留 localStorage 作为降级方案

2. **增强数据验证**
   - 使用 Zod 定义数据 schema
   - 加载时验证数据完整性
   - 提供数据修复功能

3. **添加数据清理**
   - 定期清理过期数据
   - 压缩大文本内容
   - 提供存储空间管理界面

**预期成果**:
- ✅ 存储容量提升 10 倍+
- ✅ 性能提升，无卡顿
- ✅ 数据安全性增强

### 阶段三：长期规划 (1-2 月)

**目标**: 实现完整的后端支持

1. **后端开发**
   - 选择技术栈 (Node.js + Express / NestJS)
   - 设计数据库 schema
   - 实现 RESTful API
   - 添加用户认证

2. **前端改造**
   - 集成 React Query
   - 实现数据同步机制
   - 添加离线支持
   - 优化加载状态

3. **部署运维**
   - 选择云服务 (Vercel / Railway / AWS)
   - 配置数据库 (PostgreSQL / MongoDB)
   - 设置 CI/CD
   - 监控和日志

**预期成果**:
- ✅ 完整的数据持久化
- ✅ 跨设备同步
- ✅ 多用户支持
- ✅ 生产环境就绪

---

## 📋 实施细节

### 阶段一实施代码示例

#### 1. 数据版本控制

```typescript
// src/shared/utils/dataVersion.ts

export const DATA_VERSION = 1

export interface VersionedData {
  version: number
  timestamp: number
  data: unknown[]
}

export function needsMigration(storedVersion: number): boolean {
  return storedVersion < DATA_VERSION
}

export function migrateData<T>(
  data: T[], 
  fromVersion: number
): T[] {
  // 版本迁移逻辑
  let migrated = data
  
  if (fromVersion < 1) {
    // v0.x -> v1 迁移
    migrated = migrated.map(item => ({
      ...item,
      // 添加新字段或修改结构
    }))
  }
  
  // 未来版本迁移
  // if (fromVersion < 2) { ... }
  
  return migrated
}
```

#### 2. 导入导出功能

```typescript
// src/shared/utils/dataExporter.ts

import { useData } from '../hooks/useData'

export interface ExportData {
  version: number
  exportedAt: string
  news: NewsItem[]
  tools: ToolItem[]
  prompts: PromptItem[]
  projects: ProjectItem[]
  resources: ResourceItem[]
  learningJournals: LearningJournalItem[]
}

export function exportData(data: ReturnType<typeof useData>): ExportData {
  return {
    version: DATA_VERSION,
    exportedAt: new Date().toISOString(),
    news: data.news,
    tools: data.tools,
    prompts: data.prompts,
    projects: data.projects,
    resources: data.resources,
    learningJournals: data.learningJournals,
  }
}

export function downloadExport(data: ExportData): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `ai-hub-export-${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export async function importData(
  file: File,
  data: ReturnType<typeof useData>
): Promise<{ success: boolean; error?: string }> {
  try {
    const text = await file.text()
    const imported = JSON.parse(text) as ExportData
    
    // 验证版本
    if (imported.version > DATA_VERSION) {
      return {
        success: false,
        error: '导入数据版本过高，请升级应用后重试'
      }
    }
    
    // 验证数据格式
    if (!validateExportData(imported)) {
      return {
        success: false,
        error: '导入数据格式不正确'
      }
    }
    
    // 批量导入
    imported.news.forEach(item => data.addNews(item))
    imported.tools.forEach(item => data.addTool(item))
    imported.prompts.forEach(item => data.addPrompt(item))
    imported.projects.forEach(item => data.addProject(item))
    imported.resources.forEach(item => data.addResource(item))
    imported.learningJournals.forEach(item => data.addLearningJournal(item))
    
    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '导入失败'
    }
  }
}

function validateExportData(data: unknown): data is ExportData {
  // 简单的格式验证
  return (
    typeof data === 'object' &&
    data !== null &&
    'version' in data &&
    'exportedAt' in data &&
    'news' in data &&
    'tools' in data
    // ... 更多验证
  )
}
```

#### 3. 管理后台导入导出组件

```typescript
// src/features/admin/components/DataManagement.tsx

import { useState } from 'react'
import { useData } from '@/shared/hooks'
import { exportData, downloadExport, importData } from '@/shared/utils/dataExporter'
import { Download, Upload, Database } from 'lucide-react'

export function DataManagement() {
  const data = useData()
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState<{ 
    success: boolean
    message: string
  } | null>(null)

  const handleExport = () => {
    const exported = exportData(data)
    downloadExport(exported)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImporting(true)
    setImportResult(null)

    const result = await importData(file, data)
    
    setImportResult({
      success: result.success,
      message: result.success 
        ? '数据导入成功！' 
        : `导入失败：${result.error}`
    })
    setImporting(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Database className="w-5 h-5" />
        <h2 className="text-lg font-semibold">数据管理</h2>
      </div>

      {/* 导出 */}
      <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
        <h3 className="font-medium mb-2">导出数据</h3>
        <p className="text-sm text-text-secondary mb-4">
          将所有数据导出为 JSON 文件，用于备份或迁移
        </p>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-primary text-white hover:bg-accent-primary/90"
        >
          <Download className="w-4 h-4" />
          导出数据
        </button>
      </div>

      {/* 导入 */}
      <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
        <h3 className="font-medium mb-2">导入数据</h3>
        <p className="text-sm text-text-secondary mb-4">
          从 JSON 文件导入数据（注意：会追加到现有数据）
        </p>
        <input
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
          disabled={importing}
          className="block w-full text-sm text-text-secondary
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-accent-primary/10 file:text-accent-primary
            hover:file:bg-accent-primary/20"
        />
        {importResult && (
          <div className={`mt-2 p-2 rounded text-sm ${
            importResult.success 
              ? 'bg-accent-success/10 text-accent-success' 
              : 'bg-accent-error/10 text-accent-error'
          }`}>
            {importResult.message}
          </div>
        )}
      </div>

      {/* 数据统计 */}
      <div className="p-4 rounded-lg bg-bg-elevated border border-border-subtle">
        <h3 className="font-medium mb-4">数据统计</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <StatItem label="资讯" count={data.news.length} />
          <StatItem label="工具" count={data.tools.length} />
          <StatItem label="提示词" count={data.prompts.length} />
          <StatItem label="项目" count={data.projects.length} />
          <StatItem label="资源" count={data.resources.length} />
          <StatItem label="学习记录" count={data.learningJournals.length} />
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, count }: { label: string; count: number }) {
  return (
    <div className="text-center p-3 rounded-lg bg-bg-tertiary">
      <div className="text-2xl font-bold text-text-primary">{count}</div>
      <div className="text-sm text-text-muted">{label}</div>
    </div>
  )
}
```

---

## 🔒 安全性建议

### 1. 数据验证

```typescript
import { z } from 'zod'

const NewsItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1).max(200),
  summary: z.string().min(1).max(500),
  content: z.string().min(1),
  category: z.string(),
  tags: z.array(z.string()),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

function validateNewsItem(data: unknown): NewsItem {
  return NewsItemSchema.parse(data)
}
```

### 2. XSS 防护

```typescript
import DOMPurify from 'dompurify'

// 清理用户输入的内容
function sanitizeContent(content: string): string {
  return DOMPurify.sanitize(content)
}

// 在保存前清理
const sanitizedContent = sanitizeContent(userInput)
```

### 3. 数据加密 (敏感数据)

```typescript
// 使用 CryptoJS 加密敏感数据
import CryptoJS from 'crypto-js'

function encryptData(data: string, password: string): string {
  return CryptoJS.AES.encrypt(data, password).toString()
}

function decryptData(encrypted: string, password: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, password)
  return bytes.toString(CryptoJS.enc.Utf8)
}
```

---

## 📊 性能优化建议

### 1. 懒加载

```typescript
// 按需加载数据，避免一次性加载所有数据
function useLazyData() {
  const [loaded, setLoaded] = useState<Set<string>>(new Set())
  const [data, setData] = useState<Record<string, any[]>>({})

  const loadData = async (type: string) => {
    if (loaded.has(type)) return data[type]
    
    const loadedData = await loadFromStorage(type)
    setData(prev => ({ ...prev, [type]: loadedData }))
    setLoaded(prev => new Set(prev).add(type))
    return loadedData
  }

  return { loadData }
}
```

### 2. 数据分页

```typescript
function usePaginatedData<T>(
  type: string,
  pageSize: number = 20
) {
  const [page, setPage] = useState(1)
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)

  const loadPage = async (pageNum: number) => {
    const allData = await loadFromStorage(type)
    const start = (pageNum - 1) * pageSize
    const end = start + pageSize
    
    setData(allData.slice(start, end))
    setTotal(allData.length)
    setPage(pageNum)
  }

  return { data, page, total, loadPage, setPage }
}
```

### 3. 数据压缩

```typescript
import { pako } from 'pako'

// 压缩大文本内容
function compressContent(content: string): string {
  const compressed = pako.deflate(content, { to: 'string' })
  return btoa(compressed)
}

// 解压
function decompressContent(compressed: string): string {
  const binary = atob(compressed)
  return pako.inflate(binary, { to: 'string' })
}
```

---

## 📈 监控和日志

### 1. 存储使用监控

```typescript
function getStorageUsage(): {
  used: number
  total: number
  percent: number
} {
  let used = 0
  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      used += localStorage[key].length * 2 // UTF-16
    }
  }
  
  const total = 5 * 1024 * 1024 // 假设 5MB 限制
  return {
    used,
    total,
    percent: (used / total) * 100
  }
}

// 定期报告
setInterval(() => {
  const usage = getStorageUsage()
  if (usage.percent > 80) {
    console.warn('Storage usage above 80%:', usage)
  }
}, 60000)
```

### 2. 错误日志

```typescript
// 统一的错误处理
function handleStorageError(
  operation: string,
  error: Error,
  context?: unknown
) {
  console.error(`Storage ${operation} failed:`, {
    error: error.message,
    stack: error.stack,
    context,
  })
  
  // 发送到错误监控服务
  // sendToSentry(error, { operation, context })
}
```

---

## 🎓 最佳实践总结

### 数据管理
1. ✅ 始终进行数据版本控制
2. ✅ 提供导入导出功能
3. ✅ 实现数据验证
4. ✅ 添加错误处理和日志
5. ✅ 定期备份重要数据

### 性能优化
1. ✅ 使用异步操作
2. ✅ 实现懒加载
3. ✅ 添加数据分页
4. ✅ 压缩大文本
5. ✅ 监控存储使用

### 安全性
1. ✅ 验证所有用户输入
2. ✅ 清理 HTML 内容
3. ✅ 加密敏感数据
4. ✅ 防止 XSS 攻击
5. ✅ 使用 HTTPS

### 用户体验
1. ✅ 提供加载状态
2. ✅ 显示操作结果
3. ✅ 支持撤销操作
4. ✅ 提供数据预览
5. ✅ 友好的错误提示

---

## 📚 参考资料

- [MDN localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [idb - IndexedDB 封装库](https://github.com/jakearchibald/idb)
- [Zod - TypeScript 数据验证](https://github.com/colinhacks/zod)
- [React Query - 数据管理](https://tanstack.com/query)
- [DOMPurify - XSS 防护](https://github.com/cure53/DOMPurify)

---

**文档版本**: 1.0  
**创建时间**: 2024-04-17  
**最后更新**: 2024-04-17

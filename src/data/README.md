# 数据目录

本目录存放应用的初始数据定义，实现数据与管理逻辑的分离。

## 📁 目录结构

```
src/data/
├── initial/                    # 初始数据定义
│   ├── news.ts                # 行业资讯初始数据
│   ├── tools.ts               # AI 工具初始数据
│   ├── prompts.ts             # 提示词库初始数据
│   ├── projects.ts            # 项目案例初始数据
│   ├── resources.ts           # AI 资源初始数据
│   └── learningJournals.ts    # 学习记录初始数据
└── index.ts                   # 统一导出文件
```

## 🎯 职责划分

| 目录 | 职责 | 内容 |
|------|------|------|
| `src/data/initial/` | **纯数据** | 初始数据定义（JSON-like 结构） |
| `src/shared/types/` | **类型定义** | TypeScript 接口和类型 |
| `src/shared/hooks/useData.tsx` | **数据管理** | Context、CRUD、localStorage 逻辑 |

## 📖 使用方式

### 在代码中导入

```typescript
// 在 useData.tsx 中
import { 
  initialNews, 
  initialTools, 
  initialPrompts, 
  initialProjects, 
  initialResources, 
  initialLearningJournals 
} from '@/data'
```

### 在 api.ts 中使用

```typescript
// features/tools/api.ts
import { initialTools } from '@/data'

function loadFromStorage(): ToolItem[] {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    return JSON.parse(stored)
  }
  return initialTools
}
```

## ➕ 添加新数据类型

1. **在 `initial/` 目录创建新文件**，如 `categories.ts`

```typescript
// initial/categories.ts
import type { CategoryItem } from '@/shared/types'

export const initialCategories: CategoryItem[] = [
  {
    id: 'cat-1',
    name: '技术',
    description: '技术相关',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
```

2. **在 `index.ts` 中导出**

```typescript
// data/index.ts
export { initialCategories } from './initial/categories'
```

3. **在 `useData.tsx` 中使用**

```typescript
// shared/hooks/useData.tsx
import { initialCategories } from '@/data'

// 添加到 DataContext
const DataContext = createContext<{
  categories: CategoryItem[]
  // ... 其他类型
} | null>(null)
```

## 🔧 数据格式规范

### 基础字段

所有数据项应包含以下基础字段：

```typescript
interface BaseItem {
  id: string                    // 唯一标识符
  createdAt: string             // 创建时间 (ISO 格式)
  updatedAt: string             // 更新时间 (ISO 格式)
}
```

### 数据类型

- 使用 `new Date().toISOString()` 生成时间戳
- `id` 使用 `类型 - 序号` 格式，如 `news-1`, `tool-1`
- 数组字段使用 `tags`, `techStack` 等复数形式

## 📝 最佳实践

1. **数据与逻辑分离**
   - ✅ 数据文件只包含数据定义
   - ❌ 不要在数据文件中添加业务逻辑

2. **类型安全**
   - ✅ 始终导入并使用 TypeScript 类型
   - ❌ 避免使用 `any` 类型

3. **数据验证**
   - ✅ 在加载数据时进行验证
   - ✅ 提供合理的默认值

4. **文档化**
   - ✅ 为复杂的数据添加注释
   - ✅ 保持数据文件的可读性

## 🔗 相关文件

- [数据类型定义](../shared/types/index.ts)
- [数据管理 Hook](../shared/hooks/useData.tsx)
- [数据存储分析](../../docs/DATA_STORAGE_ANALYSIS.md)

---

**最后更新**: 2024-04-17

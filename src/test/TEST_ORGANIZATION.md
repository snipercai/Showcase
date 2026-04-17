# 测试文件组织规范

## 📁 目录结构

本项目的测试文件采用**混合组织方式**：

```
src/
├── test/                          # 全局测试目录
│   ├── setup.ts                   # 测试环境配置
│   ├── README.md                  # 测试文档
│   ├── types.test.ts              # 类型检查测试
│   ├── api-types.test.ts          # API 类型测试
│   └── component-types.test.ts    # 组件类型测试
│
├── components/                    # 组件测试（与组件同级）
│   ├── Card.test.tsx
│   ├── SearchInput.test.tsx
│   └── Tag.test.tsx
│
├── features/                      # 功能模块测试（与功能同级）
│   ├── admin/
│   │   ├── components/
│   │   │   └── AdminModal.test.tsx
│   │   └── hooks/
│   │       └── useAdminPage.test.ts
│   └── home/
│       └── HomePage.test.tsx
│
└── shared/                        # 共享工具测试（与工具同级）
    └── hooks/
        ├── useData.test.tsx
        ├── useTheme.test.tsx
        └── useDocumentTitle.test.ts
```

## 📋 组织原则

### 为什么采用混合方式？

1. **类型测试集中管理** (`src/test/`)
   - ✅ 类型检查测试不依赖具体组件实现
   - ✅ 便于统一维护类型系统测试
   - ✅ 独立于 UI 逻辑

2. **组件/功能测试就近放置** (与源码同级)
   - ✅ 测试文件与被测试组件在一起，便于导航
   - ✅ 重构时容易一起移动
   - ✅ 符合 React/Vue 社区常见实践
   - ✅ 导入路径简单清晰

## 🎯 测试文件命名规范

- **单元测试**: `ComponentName.test.tsx` 或 `functionName.test.ts`
- **类型测试**: `types.test.ts`, `api-types.test.ts`
- **集成测试**: `Integration.test.tsx`
- **E2E 测试**: `e2e.spec.ts` (未来)

## 📝 编写测试的最佳实践

### 1. 组件测试

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card 组件', () => {
  it('应该渲染组件', () => {
    render(<Card title="标题">内容</Card>)
    expect(screen.getByText('标题')).toBeInTheDocument()
  })
})
```

### 2. Hooks 测试

```typescript
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useData } from './useData'

describe('useData Hook', () => {
  it('应该正确初始化', () => {
    const { result } = renderHook(() => useData())
    expect(result.current.news).toBeDefined()
  })
})
```

### 3. 类型测试

```typescript
import { describe, it, expectTypeOf } from 'vitest'
import type { NewsItem } from '@/shared/types'

describe('NewsItem 类型', () => {
  it('应该具有正确的类型结构', () => {
    const item: NewsItem = {
      id: '1',
      title: '标题',
      summary: '摘要',
      // ...
    }
    expectTypeOf(item).toEqualTypeOf<NewsItem>()
  })
})
```

## 🧪 运行测试

```bash
# 运行所有测试
npm test

# 运行类型检查测试
npm run test:types

# 运行 TypeScript 类型检查
npm run type-check

# 运行覆盖率检查
npm test -- --coverage
```

## 📊 测试覆盖目标

- **核心 Hooks**: 90%+
- **UI 组件**: 80%+
- **类型定义**: 100%
- **业务逻辑**: 85%+

## 🔧 测试工具

- **测试框架**: Vitest
- **React 测试**: @testing-library/react
- **Mock 工具**: vi.fn(), vi.mock()
- **覆盖率**: v8

## 📚 参考

- [Vitest 文档](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [TypeScript 类型测试](https://vitest.dev/api/expect.html#expecttype)

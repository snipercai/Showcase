# 产品定位

构建一个 AI 资源中心型博客网站，包含：

- AI 最新资讯
- AI 工具库
- AI 提示词库
- AI 项目案例库
- 全站搜索
- 未来支持：
  - Markdown 内容
  - 后端 API
  - 用户系统
  - 收藏功能
  - SEO 优化

当前版本仅前端实现，数据存储在 TypeScript 文件中。

---

# 技术栈

必须使用：

- React 18+
- TypeScript（严格模式）
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React（图标）
- classnames（类名管理）
- react-markdown（为未来扩展预留）

禁止：

- 不允许使用 any
- 不允许内联 style
- 不使用 CSS 文件
- 不写伪代码

---

# 架构分层设计

必须采用分层结构：

src/
 ├── app/                # 应用初始化层
 │    ├── router.tsx
 │    └── providers.tsx
 │
 ├── components/         # 通用组件
 │
 ├── features/           # 业务模块（按领域划分）
 │    ├── news/
 │    ├── tools/
 │    ├── prompts/
 │    ├── projects/
 │    └── search/
 │
 ├── layouts/            # 布局组件
 │
 ├── shared/             # 公共资源
 │    ├── types/
 │    ├── hooks/
 │    ├── utils/
 │    └── constants/
 │
 ├── data/               # 本地模拟数据（未来可替换为 API）
 │
 ├── App.tsx
 └── main.tsx

---

# 模块设计原则

每个 feature 模块必须包含：

- types.ts
- data adapter（数据转换层）
- components/
- pages/
- index.ts（对外导出）

实现“未来可替换为 API”的能力：

例如：

当前：
import { newsData } from "@/data/news"

未来可替换为：
import { getNews } from "@/features/news/api"

因此必须增加一层 service abstraction。

---

# 数据设计（必须统一在 shared/types）

```ts
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface NewsItem extends BaseEntity {
  title: string
  summary: string
  content: string
  category: string
  tags: string[]
}

export interface ToolItem extends BaseEntity {
  name: string
  description: string
  website: string
  category: string
  tags: string[]
  isFree: boolean
}

export interface PromptItem extends BaseEntity {
  title: string
  content: string
  category: string
  tags: string[]
}

export interface ProjectItem extends BaseEntity {
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  demoUrl?: string
}
````

---

# 搜索架构要求

* 搜索逻辑封装在 shared/utils/search.ts
* 使用泛型实现可扩展搜索
* 支持：

  * 模块搜索
  * 全站搜索
* 使用 useMemo 优化

未来可以替换为服务端搜索。

---

# UI 规范

设计风格：

* 极简现代（Vercel 风格）
* rounded-2xl
* shadow-md hover:shadow-xl
* transition-all duration-200
* p-6

响应式：

* 移动端单列
* 桌面端 grid-cols-3
* Navbar 支持移动端抽屉菜单

---

# 性能与扩展要求

* React.memo 优化纯展示组件
* 懒加载页面（React.lazy）
* 路由代码分割
* 所有列表必须添加 key
* 所有组件 Props 必须有明确类型

---

# 状态管理预留

当前版本使用：

* useState
* useMemo

但必须预留：

src/shared/store/

未来可以替换为：

* Zustand
* Redux Toolkit

---

# Markdown 扩展预留

* 内容字段必须支持 Markdown 字符串
* 使用 react-markdown 渲染
* 组件抽象为 MarkdownRenderer

---

# SEO 预留设计

增加：

* useDocumentTitle hook
* 页面支持设置 title
* 未来可接入 React Helmet

---

# 交付标准

* 项目可以运行
* 无 TypeScript 报错
* 模块解耦
* 结构清晰
* 可平滑升级为 API 架构

---

# 输出要求

* 生成完整代码
* 所有文件必须完整
* 使用文件路径作为标题
* 不要省略 import
* 不要输出解释
* 直接输出代码
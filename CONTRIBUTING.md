# 贡献指南

感谢你考虑为 AI Resource Hub 项目做出贡献！

## 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [分支管理](#分支管理)
- [提交规范](#提交规范)
- [代码规范](#代码规范)

## 行为准则

请阅读并遵守我们的行为准则，保持友好和包容的开发环境。

## 如何贡献

### 报告 Bug

1. 在 [Issues](https://github.com/snipercai/Showcase/issues) 中搜索是否已有相同问题
2. 如果没有，使用 [Bug 报告模板](.github/ISSUE_TEMPLATE/bug_report.md) 创建新 Issue
3. 提供详细的复现步骤和环境信息

### 提出新功能

1. 在 [Issues](https://github.com/snipercai/Showcase/issues) 中搜索是否已有类似建议
2. 如果没有，使用 [功能请求模板](.github/ISSUE_TEMPLATE/feature_request.md) 创建新 Issue
3. 清晰描述功能需求和使用场景

### 提交代码

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/your-feature`)
3. 提交更改 (`git commit -m 'feat: add some feature'`)
4. 推送到分支 (`git push origin feature/your-feature`)
5. 创建 Pull Request

## 开发流程

### 环境准备

```bash
# 克隆仓库
git clone https://github.com/snipercai/Showcase.git
cd Showcase

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 预览构建结果
npm run preview
```

## 分支管理

### 分支结构

```
main        # 主分支，生产环境代码
  │
  └── dev   # 开发分支，集成各功能
        │
        ├── feature/xxx   # 功能分支
        ├── bugfix/xxx    # 修复分支
        └── refactor/xxx  # 重构分支
```

### 分支命名规范

| 分支类型 | 命名格式 | 示例 |
|---------|---------|------|
| 功能 | `feature/功能名` | `feature/admin-page` |
| 修复 | `bugfix/问题描述` | `bugfix/data-sync` |
| 重构 | `refactor/模块名` | `refactor/data-service` |
| 紧急修复 | `hotfix/问题描述` | `hotfix/security-fix` |

### 工作流程

1. 从 `dev` 分支创建功能分支
2. 在功能分支上开发和提交代码
3. 创建 PR 合并到 `dev`
4. Code Review 通过后合并
5. 定期从 `deve` 创建 release 分支进行发布

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type 类型

| 类型 | 说明 | 示例 |
|-----|------|------|
| `feat` | 新功能 | `feat: 添加后台管理页面` |
| `fix` | Bug 修复 | `fix: 修复数据同步问题` |
| `docs` | 文档更新 | `docs: 更新 README` |
| `style` | 代码格式 | `style: 格式化代码` |
| `refactor` | 重构 | `refactor: 重构数据服务` |
| `perf` | 性能优化 | `perf: 优化列表渲染` |
| `test` | 测试 | `test: 添加单元测试` |
| `chore` | 构建/工具 | `chore: 更新依赖` |

### 提交示例

```bash
# 新功能
git commit -m "feat: 添加用户登录功能"

# Bug 修复
git commit -m "fix: 修复首页数据不刷新的问题"

# 带作用域
git commit -m "feat(admin): 添加新闻管理页面"
```

## 代码规范

### TypeScript

- 使用 TypeScript 编写代码
- 为函数和变量添加类型注解
- 避免使用 `any` 类型

### React

- 使用函数组件和 Hooks
- 组件命名使用 PascalCase
- 文件命名使用 PascalCase

### 样式

- 使用 Tailwind CSS
- 遵循移动优先的响应式设计

### 文件结构

```
src/
├── features/           # 功能模块
│   └── feature-name/
│       ├── components/ # 组件
│       ├── pages/      # 页面
│       ├── api.ts      # API
│       └── types.ts    # 类型定义
├── components/         # 公共组件
├── hooks/              # 自定义 Hooks
├── services/           # 服务层
└── shared/             # 共享资源
```

## Pull Request 流程

1. 确保 PR 标题符合提交规范
2. 填写 PR 模板中的所有必填项
3. 确保本地测试通过
4. 等待 Code Review
5. 根据反馈修改代码
6. 合并后删除功能分支

## 需要帮助？

如果你有任何问题，可以：

- 在 [Discussions](https://github.com/snipercai/Showcase/discussions) 中提问
- 创建 [Issue](https://github.com/snipercai/Showcase/issues)

感谢你的贡献！

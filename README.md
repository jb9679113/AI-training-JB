# AI Learning Platform

交互式 AI 学习平台，帮助你理解 AI 核心概念，从 Token 到 Agent，打通 AI 底层逻辑。

## 核心特性

- **10 个完整章节** - AI 基础概念、大语言模型、Token 机制、Prompt 工程、上下文窗口、API 调用、向量数据库、RAG 技术、Agent 架构、实战应用
- **左侧目录导航** - 章节详情页内置课程目录，快速切换章节
- **实用工具集** - Token 计算器、Prompt 演练场
- **现场演示** - 4 步 AI 工作流可视化演示

## 技术栈

- **前端框架**: Next.js 15 + TypeScript
- **样式方案**: Tailwind CSS 4
- **动画效果**: Framer Motion
- **图标库**: Lucide React
- **部署平台**: Vercel

## 设计风格

深棕/橙色高级风格，深色主题营造高端感，橙色作为点缀色突出重点。

| 用途 | 颜色 |
|------|------|
| 背景 | #1A120B |
| 强调 | #C9682C |
| 主文本 | #FFFFFF |
| 辅助文本 | #D4C4A8 |

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
src/
├── app/
│   ├── page.tsx          # 首页
│   ├── courses/          # 课程列表
│   ├── chapter/[id]/     # 章节详情
│   ├── tools/            # 工具页面
│   └── demo/             # 演示页面
├── components/
│   ├── Navbar.tsx        # 导航栏
│   ├── Hero.tsx          # 首屏区域
│   ├── FeatureCards.tsx  # 特性卡片
│   ├── ChapterGrid.tsx   # 章节网格
│   ├── Footer.tsx        # 页脚
│   └── ui/               # UI 组件
└── lib/
    └── courseData.ts     # 课程数据
```

## 课程章节

1. AI 基础概念
2. 大语言模型
3. Token 机制
4. Prompt 工程
5. 上下文窗口
6. API 调用
7. 向量数据库
8. RAG 技术
9. Agent 架构
10. 实战应用

## License

MIT

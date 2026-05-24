import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI 核心概念大串联 - 交互式学习平台',
  description: '通过交互式演示学习 AI 工作流程，从 Token 到 Agent 的完整知识体系',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-slate-900 text-white">
        {children}
      </body>
    </html>
  )
}

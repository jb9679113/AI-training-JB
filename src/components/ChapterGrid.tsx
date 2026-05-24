'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, BookOpen } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

const chapters = [
  { id: 1, title: 'AI 基础概念', description: '理解人工智能的核心定义和发展历程', lessons: 5 },
  { id: 2, title: '大语言模型', description: '探索大型语言模型的工作原理', lessons: 6 },
  { id: 3, title: 'Token 机制', description: '深入理解 Token 的概念和计算方式', lessons: 4 },
  { id: 4, title: 'Prompt 工程', description: '学习如何编写有效的提示词', lessons: 7 },
  { id: 5, title: '上下文窗口', description: '理解上下文窗口的限制与优化', lessons: 4 },
  { id: 6, title: 'API 调用', description: '掌握 AI API 的使用方法', lessons: 5 },
  { id: 7, title: '向量数据库', description: '了解向量数据库的原理与应用', lessons: 5 },
  { id: 8, title: 'RAG 技术', description: '学习检索增强生成的实现方式', lessons: 6 },
  { id: 9, title: 'Agent 架构', description: '探索智能代理的设计模式', lessons: 5 },
  { id: 10, title: '实战应用', description: '综合运用所学知识解决实际问题', lessons: 4 },
];

export function ChapterGrid() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">课程章节</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            系统学习 AI 核心知识，从基础到进阶的完整路径
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-card/50 border border-border/50 p-6 rounded-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xl">
                  {chapter.id}
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="text-lg mb-2 group-hover:text-primary transition-colors font-serif">
                {chapter.title}
              </h3>
              <p className="text-secondary text-sm mb-4">{chapter.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {chapter.lessons} 节
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/chapter/1">
            <Button size="lg">
              开始学习
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

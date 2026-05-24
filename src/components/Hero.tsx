'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">全新交互式学习体验</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light mb-8 leading-tight"
        >
          AI 核心概念
          <br />
          <span className="text-primary">大串联</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-secondary max-w-2xl mx-auto mb-12"
        >
          通过交互式演示理解 AI 工作流程，从 Token 到 Agent，打通 AI 底层逻辑
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <Link href="/chapter/1">
            <Button size="lg">
              开始学习
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button variant="outline" size="lg">
              <Play className="mr-2 w-5 h-5" />
              观看演示
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-4 gap-8 max-w-xl mx-auto border-t border-border pt-12"
        >
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-light text-primary mb-2 font-mono">10</div>
            <div className="text-sm text-muted-foreground tracking-wider uppercase">章节内容</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-light text-primary mb-2 font-mono">50+</div>
            <div className="text-sm text-muted-foreground tracking-wider uppercase">知识点</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-light text-primary mb-2 font-mono">3</div>
            <div className="text-sm text-muted-foreground tracking-wider uppercase">实用工具</div>
          </div>
          <div className="text-center">
            <div className="text-5xl md:text-6xl font-light text-primary mb-2 font-mono">0</div>
            <div className="text-sm text-muted-foreground tracking-wider uppercase">代码编写</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

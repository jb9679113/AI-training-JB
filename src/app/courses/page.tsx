'use client';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Brain } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { chapters } from '@/lib/courseData';
import Link from 'next/link';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary">完整课程</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            AI 核心概念
            <span className="text-primary">大串联</span>
          </h1>
          <p className="text-secondary text-lg max-w-2xl">
            从 Token 到 Agent，10 个章节打通 AI 底层逻辑
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/chapter/${chapter.id}`}>
                <div className="group bg-card/50 border border-border/50 rounded-sm p-6 hover:border-primary/30 hover:bg-card/70 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-xl">
                      {chapter.id}
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="text-sm text-secondary mb-4">{chapter.subtitle}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Brain className="w-3 h-3" />
                    <span className="truncate">{chapter.coreConcept}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

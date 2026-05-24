'use client';
import { motion } from 'framer-motion';
import { BookOpen, Play, Wand2, Layers } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: '交互式学习',
    description: '通过实际操作理解 AI 概念，让知识变得触手可及'
  },
  {
    icon: Play,
    title: 'Prompt 演练场',
    description: '实时测试提示词效果，可视化流程，让学习更直观'
  },
  {
    icon: Layers,
    title: '完整知识体系',
    description: '从 Token 到 Agent 架构，10 个章节打通 AI 底层逻辑'
  },
  {
    icon: Wand2,
    title: '现场演示',
    description: '实时展示 AI 工作流，从需求到方案的完整过程'
  }
];

export function FeatureCards() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl mb-4">为什么选择我们</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            沉浸式学习体验，让 AI 知识变得触手可及
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card/50 border border-border/50 p-8 rounded-sm hover:border-primary/30 hover:bg-card/70 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-primary/40 transition-all">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl mb-3 font-serif">{feature.title}</h3>
              <p className="text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

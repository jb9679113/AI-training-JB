'use client';
import { use } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, BookOpen, Brain, List } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { chapters } from '@/lib/courseData';
import Link from 'next/link';

interface ChapterPageProps {
  params: Promise<{ id: string }>;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const { id } = use(params);
  const chapter = chapters.find(c => c.id === id);
  const currentIndex = chapters.findIndex(c => c.id === id);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  if (!chapter) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h1 className="text-2xl font-semibold mb-2 text-foreground">章节未找到</h1>
            <p className="text-secondary">请选择有效的章节</p>
            <Link href="/" className="inline-block mt-4 text-primary hover:underline">
              返回首页
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    let result: React.ReactNode[] = [];
    let codeBlock = false;
    let codeLanguage = '';
    let codeContent = '';

    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        result.push(<h2 key={index} className="text-2xl font-semibold mt-8 mb-4 text-foreground">{line.slice(3)}</h2>);
      } else if (line.startsWith('### ')) {
        result.push(<h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-foreground">{line.slice(4)}</h3>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        result.push(<strong key={index} className="font-semibold text-foreground">{line.slice(2, -2)}</strong>);
      } else if (line.startsWith('|')) {
        const isHeader = lines[index + 1]?.startsWith('|---');
        if (isHeader) {
          const headers = line.split('|').filter(cell => cell.trim());
          const tableRows = [];
          for (let i = index + 2; i < lines.length; i++) {
            if (!lines[i].startsWith('|')) break;
            const cells = lines[i].split('|').filter(cell => cell.trim());
            tableRows.push(
              <tr key={i} className="border-b border-border">
                {cells.map((cell, ci) => (
                  <td key={ci} className="py-2 px-4 text-secondary">{cell.trim()}</td>
                ))}
              </tr>
            );
          }
          result.push(
            <table key={index} className="w-full border-collapse mt-4 mb-6">
              <thead>
                <tr className="border-b border-border bg-muted">
                  {headers.map((header, i) => (
                    <th key={i} className="text-left py-3 px-4 font-semibold text-foreground">{header.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows}
              </tbody>
            </table>
          );
          return;
        }
        const cells = line.split('|').filter(cell => cell.trim());
        if (cells[0] === '---') return;
        result.push(
          <div key={index} className="flex gap-4 py-2 border-b border-border/50">
            {cells.map((cell, ci) => (
              <span key={ci} className="text-secondary text-sm flex-1">{cell.trim()}</span>
            ))}
          </div>
        );
      } else if (line.startsWith('```')) {
        if (codeBlock) {
          result.push(
            <pre key={index} className="bg-muted rounded-sm p-4 overflow-x-auto my-4 text-sm text-secondary font-mono border border-border/50">
              <code className={`language-${codeLanguage}`}>{codeContent}</code>
            </pre>
          );
          codeBlock = false;
          codeLanguage = '';
          codeContent = '';
        } else {
          codeBlock = true;
          codeLanguage = line.slice(3).trim();
        }
      } else if (codeBlock) {
        codeContent += line + '\n';
      } else if (line.startsWith('- ')) {
        result.push(<li key={index} className="text-secondary ml-6 my-2">{line.slice(2)}</li>);
      } else if (line.trim()) {
        result.push(<p key={index} className="text-secondary my-3">{line}</p>);
      }
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block w-64 flex-shrink-0"
          >
            <div className="sticky top-28">
              <div className="bg-card/50 border border-border/50 rounded-sm p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">课程目录</span>
                </div>
                <nav className="space-y-1">
                  {chapters.map((ch) => (
                    <Link
                      key={ch.id}
                      href={`/chapter/${ch.id}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all ${
                        ch.id === id
                          ? 'bg-primary/10 text-primary border border-primary/30'
                          : 'text-secondary hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <span className="font-mono text-xs w-5">{ch.id}</span>
                      <span className="truncate">{ch.title}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              <Link
                href="/courses"
                className="flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                返回课程列表
              </Link>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 min-w-0"
          >
            <Link href="/courses" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              返回课程列表
            </Link>

            <div className="bg-card/50 border border-border/50 rounded-sm p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-sm bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-2xl">
                  {chapter.id}
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-foreground mb-2">{chapter.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {chapter.subtitle}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-secondary leading-relaxed">{chapter.coreConcept}</p>
            </div>

            <div className="bg-card/50 border border-border/50 rounded-sm p-8">
              <div className="flex items-center gap-2 mb-6">
                <Brain className="w-5 h-5 text-primary" />
                <span className="text-lg font-medium text-foreground">核心内容</span>
              </div>
              <div className="text-secondary">
                {renderMarkdown(chapter.content)}
              </div>
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-border/50">
              {prevChapter ? (
                <Link href={`/chapter/${prevChapter.id}`} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <div>
                    <div className="text-sm text-muted-foreground">上一章</div>
                    <div className="font-medium">{prevChapter.title}</div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextChapter && (
                <Link href={`/chapter/${nextChapter.id}`} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-right">
                  <div>
                    <div className="text-sm text-muted-foreground">下一章</div>
                    <div className="font-medium">{nextChapter.title}</div>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

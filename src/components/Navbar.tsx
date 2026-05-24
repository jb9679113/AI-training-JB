'use client';
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '首页', href: '/' },
    { label: '课程', href: '/courses' },
    { label: '工具', href: '/tools' },
    { label: '演示', href: '/demo' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-light tracking-wide">AI Learning</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-secondary hover:text-primary transition-colors relative text-sm tracking-wider uppercase after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">登录</Button>
            <Button size="sm">开始学习</Button>
          </div>

          <button
            className="md:hidden p-2 text-secondary hover:text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-secondary hover:text-primary transition-colors text-sm tracking-wider uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="ghost" size="sm">登录</Button>
                <Button size="sm">开始学习</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

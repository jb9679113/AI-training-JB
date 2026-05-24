'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Copy, Check, Loader2, Brain, GitBranch, Code, Target } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';

const WORKFLOW_STEPS = [
  {
    id: 'analyze',
    title: '需求分析',
    icon: Brain,
    description: 'AI 分析业务需求'
  },
  {
    id: 'decompose',
    title: '流程拆解',
    icon: GitBranch,
    description: '拆解为技术任务'
  },
  {
    id: 'generate',
    title: '方案生成',
    icon: Code,
    description: '生成完整技术方案'
  },
  {
    id: 'execute',
    title: '执行反馈',
    icon: Target,
    description: '提供执行建议和统计'
  }
];

const MOCK_RESULTS = {
  analyze: {
    content: `## 需求分析结果

### 需求摘要
用户需要一个用户管理系统，支持以下核心功能：
- 用户注册
- 用户登录
- 个人资料管理

### 需求拆解
1. **认证模块**：注册、登录、密码重置
2. **用户管理**：创建、读取、更新、删除用户信息
3. **权限控制**：角色管理、访问控制

### 技术要点
- 需要数据库存储用户信息
- 需要安全的密码加密机制
- 需要 JWT 或类似的认证方案`,
    delay: 1500
  },
  decompose: {
    content: `## 流程拆解

### 技术任务清单

**1. 数据库设计**
- 用户表设计（id, username, email, password_hash, created_at, updated_at）
- 索引优化（email 唯一索引）

**2. API 接口设计**
| 端点 | 方法 | 功能 |
|------|------|------|
| /api/auth/register | POST | 用户注册 |
| /api/auth/login | POST | 用户登录 |
| /api/users/me | GET | 获取当前用户 |
| /api/users/me | PUT | 更新用户资料 |

**3. 核心业务逻辑**
- 密码加密（bcrypt）
- JWT 令牌生成与验证
- 用户权限中间件`,
    delay: 2000
  },
  generate: {
    content: `## 技术方案

### 后端技术栈
- **语言**: Node.js 20+
- **框架**: Express.js
- **数据库**: PostgreSQL
- **ORM**: Prisma
- **认证**: JWT + bcrypt

### 目录结构
\`\`\`
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── users.controller.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── users.routes.ts
│   ├── services/
│   │   └── auth.service.ts
│   ├── utils/
│   │   └── jwt.utils.ts
│   └── app.ts
└── package.json
\`\`\`

### 关键代码示例

\`\`\`typescript
// 用户注册服务
async function registerUser(dto: RegisterDto) {
  const existingUser = await prisma.user.findUnique({
    where: { email: dto.email }
  });
  
  if (existingUser) {
    throw new Error('邮箱已被注册');
  }
  
  const hashedPassword = await bcrypt.hash(dto.password, 10);
  
  return prisma.user.create({
    data: {
      email: dto.email,
      passwordHash: hashedPassword,
      name: dto.name
    }
  });
}
\`\`\``,
    delay: 2500
  },
  execute: {
    content: `## 执行建议

### 实施步骤

**第一步：环境准备**
\`\`\`bash
# 初始化项目
mkdir user-management-system
cd user-management-system
npm init -y

# 安装依赖
npm install express prisma bcrypt jsonwebtoken
npm install -D typescript @types/node
\`\`\`

**第二步：配置 Prisma**
\`\`\`bash
npx prisma init
# 配置 DATABASE_URL
npx prisma migrate dev --name init
\`\`\`

**第三步：实现核心功能**
1. 创建用户模型
2. 实现认证控制器
3. 添加 JWT 中间件
4. 编写 API 路由

### 预期结果
- ✅ 用户可以注册新账户
- ✅ 用户可以登录获取令牌
- ✅ 用户可以查看和更新个人资料
- ✅ 密码安全存储（bcrypt 哈希）

### 性能预估
- 注册响应时间：< 100ms
- 登录响应时间：< 50ms
- 支持并发用户：1000+`,
    delay: 2000
  }
};

export default function DemoPage() {
  const [requirement, setRequirement] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<string | null>(null);
  const [copiedStep, setCopiedStep] = useState<string | null>(null);

  const handleRunWorkflow = async () => {
    if (!requirement.trim() || isRunning) return;

    setIsRunning(true);
    setCompletedSteps([]);
    setCurrentStep(null);

    for (const step of WORKFLOW_STEPS) {
      setCurrentStep(step.id);
      
      await new Promise(resolve => setTimeout(resolve, MOCK_RESULTS[step.id as keyof typeof MOCK_RESULTS].delay));
      
      setCompletedSteps(prev => [...prev, step.id]);
    }

    setCurrentStep(null);
    setIsRunning(false);
  };

  const handleCopy = async (stepId: string) => {
    const content = MOCK_RESULTS[stepId as keyof typeof MOCK_RESULTS].content;
    await navigator.clipboard.writeText(content);
    setCopiedStep(stepId);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  const handleReset = () => {
    setRequirement('');
    setCompletedSteps([]);
    setCurrentStep(null);
    setIsRunning(false);
  };

  const renderMarkdown = (content: string) => {
    const lines = content.split('\n');
    let result: React.ReactNode[] = [];
    let codeBlock = false;
    let codeContent = '';

    lines.forEach((line, index) => {
      if (line.startsWith('## ')) {
        result.push(<h3 key={index} className="text-lg font-semibold mt-4 mb-2 text-foreground">{line.slice(3)}</h3>);
      } else if (line.startsWith('### ')) {
        result.push(<h4 key={index} className="text-base font-semibold mt-3 mb-1 text-foreground">{line.slice(4)}</h4>);
      } else if (line.startsWith('**') && line.endsWith('**')) {
        result.push(<strong key={index} className="font-semibold text-foreground">{line.slice(2, -2)}</strong>);
      } else if (line.startsWith('|')) {
        const cells = line.split('|').filter(cell => cell.trim());
        if (cells[0] === '---') {
          result.push(<div key={index} className="border-b border-border my-1" />);
        } else {
          result.push(
            <div key={index} className="flex gap-4 py-1">
              {cells.map((cell, ci) => (
                <span key={ci} className="text-secondary text-sm">{cell.trim()}</span>
              ))}
            </div>
          );
        }
      } else if (line.startsWith('```')) {
        if (codeBlock) {
          result.push(
            <pre key={index} className="bg-muted rounded-lg p-4 overflow-x-auto my-3 text-sm text-secondary font-mono">
              {codeContent}
            </pre>
          );
          codeBlock = false;
          codeContent = '';
        } else {
          codeBlock = true;
        }
      } else if (codeBlock) {
        codeContent += line + '\n';
      } else if (line.startsWith('- ')) {
        result.push(<li key={index} className="text-secondary ml-4 my-1">{line.slice(2)}</li>);
      } else if (line.trim()) {
        result.push(<p key={index} className="text-secondary text-sm my-2">{line}</p>);
      }
    });

    return result;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI 工作流演示</span>
          </div>
          <h1 className="text-3xl font-semibold mb-4 text-foreground">
            体验 AI 工作流
          </h1>
          <p className="text-secondary max-w-2xl mx-auto">
            输入你的业务需求，AI 将为你分析、拆解并生成完整的技术方案
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-background border border-border rounded-lg p-6 mb-8"
        >
          <label className="block text-sm font-medium text-foreground mb-3">输入业务需求</label>
          <Textarea
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            placeholder="例如：我想要一个用户管理系统，支持注册、登录和个人资料管理..."
            rows={4}
            className="resize-none"
            disabled={isRunning}
          />
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm text-muted-foreground">{requirement.length} 字符</span>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleReset}
                disabled={isRunning}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
              <Button
                onClick={handleRunWorkflow}
                disabled={!requirement.trim() || isRunning}
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    运行中...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    执行工作流
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="flex items-center justify-center gap-4 mb-8">
          {WORKFLOW_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            
            return (
              <motion.div key={step.id} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: isCompleted || isCurrent ? 1 : 0.5,
                    scale: isCurrent ? 1.1 : 1 
                  }}
                  className={`relative`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${
                    isCompleted 
                      ? 'bg-primary text-white' 
                      : isCurrent 
                        ? 'bg-primary/10 border-2 border-primary text-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCurrent ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap text-muted-foreground">
                    {step.title}
                  </div>
                </motion.div>
                
                {index < WORKFLOW_STEPS.length - 1 && (
                  <div className={`w-12 h-1 mx-2 rounded-full transition-all ${
                    completedSteps.includes(WORKFLOW_STEPS[index + 1].id) 
                      ? 'bg-primary' 
                      : 'bg-muted'
                  }`} />
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = currentStep === step.id;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isCompleted || isCurrent ? 1 : 0.3, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`rounded-lg border overflow-hidden transition-all ${
                    isCompleted || isCurrent
                      ? 'bg-background border-border'
                      : 'bg-muted/50 border-border'
                  }`}>
                    <div className={`flex items-center justify-between p-4 border-b ${
                      isCompleted || isCurrent
                        ? 'border-border'
                        : 'border-border/50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          isCompleted 
                            ? 'bg-primary text-white' 
                            : isCurrent
                              ? 'bg-primary/10 text-primary'
                              : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                          }`}>{step.title}</h3>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      {isCompleted && (
                        <button
                          onClick={() => handleCopy(step.id)}
                          className="p-2 rounded bg-muted text-secondary hover:bg-muted/80 hover:text-primary transition-colors"
                        >
                          {copiedStep === step.id ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className="p-4 max-h-96 overflow-y-auto">
                      {isCompleted ? (
                        renderMarkdown(MOCK_RESULTS[step.id as keyof typeof MOCK_RESULTS].content)
                      ) : isCurrent ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="w-8 h-8 text-primary animate-spin" />
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          等待执行...
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

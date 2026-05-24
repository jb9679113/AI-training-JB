'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Wand2, Zap, DollarSign, FileText, Brain } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';

const MODELS = [
  { name: 'GPT-4 Turbo', tokens: 128000, price: 0.01 },
  { name: 'Claude 3 Sonnet', tokens: 200000, price: 0.001 },
  { name: '文心一言 4.0', tokens: 128000, price: 0.002 },
  { name: '通义千问 2.5', tokens: 128000, price: 0.0015 },
  { name: '讯飞星火 V4', tokens: 64000, price: 0.0018 },
  { name: '智谱清言 GLM-4', tokens: 128000, price: 0.0012 },
  { name: '阿里 Qwen 2', tokens: 128000, price: 0.001 }
];

const PROMPT_MODES = [
  {
    id: 'zero-shot',
    name: '零样本',
    description: '直接提问，不给示例',
    icon: Zap,
    example: '解释什么是人工智能',
    color: 'bg-blue-500/10 text-blue-600 border-blue-200'
  },
  {
    id: 'few-shot',
    name: '少样本',
    description: '提供几个示例',
    icon: FileText,
    example: '苹果: 水果\n香蕉: 水果\n西红柿:',
    color: 'bg-green-500/10 text-green-600 border-green-200'
  },
  {
    id: 'cot',
    name: '思维链',
    description: '逐步推理',
    icon: Brain,
    example: '问: 1+2+3=?\n答: 1+2=3, 3+3=6\n问: 4+5+6=?',
    color: 'bg-purple-500/10 text-purple-600 border-purple-200'
  },
  {
    id: 'role-play',
    name: '角色扮演',
    description: '指定身份',
    icon: Wand2,
    example: '你是一位专业的厨师，请教我做红烧肉',
    color: 'bg-orange-500/10 text-orange-600 border-orange-200'
  }
];

export default function ToolsPage() {
  const [tokenInput, setTokenInput] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [promptInput, setPromptInput] = useState('');
  const [selectedMode, setSelectedMode] = useState(PROMPT_MODES[0]);

  const tokenCount = tokenInput.length;
  const estimatedCost = (tokenCount / 1000) * selectedModel.price;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-semibold mb-4 text-foreground">AI 工具集</h1>
          <p className="text-secondary max-w-2xl mx-auto">
            实用工具帮助你更好地理解和使用 AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Token 计算器</h2>
                  <p className="text-sm text-secondary">实时计算文本 Token 数量和成本</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">输入文本</label>
                  <Textarea
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="在这里输入要计算的文本..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">选择模型</label>
                  <div className="grid grid-cols-2 gap-2">
                    {MODELS.map((model) => (
                      <button
                        key={model.name}
                        onClick={() => setSelectedModel(model)}
                        className={`px-4 py-2 rounded text-sm transition-all ${
                          selectedModel.name === model.name
                            ? 'bg-primary text-white font-medium'
                            : 'bg-muted text-secondary hover:bg-muted/80'
                        }`}
                      >
                        {model.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-semibold text-primary mb-1">{tokenCount}</div>
                    <div className="text-xs text-muted-foreground">Token 数量</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-semibold text-foreground mb-1">{selectedModel.tokens.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">最大上下文</div>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="text-2xl font-semibold text-green-600 mb-1">${estimatedCost.toFixed(4)}</div>
                    <div className="text-xs text-muted-foreground">估算成本</div>
                  </div>
                </div>

                {tokenCount > selectedModel.tokens && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-red-500" />
                    <span className="text-sm text-red-600">文本超出模型上下文限制</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Prompt 演练场</h2>
                  <p className="text-sm text-secondary">尝试不同的 Prompt 模式</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">选择模式</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PROMPT_MODES.map((mode) => {
                      const Icon = mode.icon;
                      return (
                        <button
                          key={mode.id}
                          onClick={() => {
                            setSelectedMode(mode);
                            setPromptInput(mode.example);
                          }}
                          className={`p-3 rounded text-left transition-all ${
                            selectedMode.id === mode.id
                              ? `${mode.color} border-2`
                              : 'bg-muted text-secondary hover:bg-muted/80 border-2 border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className="w-4 h-4" />
                            <span className="font-medium text-sm">{mode.name}</span>
                          </div>
                          <p className="text-xs opacity-70">{mode.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-foreground">Prompt 内容</label>
                  <Textarea
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder="输入你的 Prompt..."
                    rows={6}
                    className="resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-secondary">
                    {promptInput.length} 字符
                  </div>
                  <Button>
                    发送请求
                    <Zap className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

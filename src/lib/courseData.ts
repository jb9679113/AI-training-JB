export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  coreConcept: string;
  content: string;
}

export const chapters: Chapter[] = [
  {
    id: '1',
    title: 'Token 与文本分词',
    subtitle: 'LLM 的基础语言单位',
    coreConcept: '文本如何被转换为 Token',
    content: `## Token 是什么？

Token 是大语言模型处理文本的基本单位。它不是完整的单词，而是文本的子单元。

### 分词原理

当你输入一段文本时，LLM 会将其分解为一系列 Token：

\`\`\`
输入："Hello, how are you?"
输出：["Hello", ",", " how", " are", " you", "?"]
\`\`\`

### Token 化规则

- **常见词**：完整单词作为一个 Token
- **稀有词**：被分解为更小的子词（subword）
- **标点符号**：通常作为独立 Token
- **空格**：可能被包含在 Token 中

### Token 数量估算

| 文本类型 | 大致比例 |
|----------|----------|
| 英文单词 | 1 word ≈ 1.3 tokens |
| 中文字符 | 1 字符 ≈ 1 token |
| 代码 | 1 行 ≈ 20-50 tokens |

### 实际示例

\`\`\`javascript
// 这段代码大约包含 30-40 个 Token
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\``
  },
  {
    id: '2',
    title: 'LLM 原理与架构',
    subtitle: 'Transformer 模型基础',
    coreConcept: '理解大型语言模型的内部工作机制',
    content: `## Transformer 架构

Transformer 是现代 LLM 的核心架构，由 Google 在 2017 年提出。

### 核心组件

1. **编码器（Encoder）**
   - 处理输入序列
   - 多头自注意力机制
   - 位置编码

2. **解码器（Decoder）**
   - 生成输出序列
   - 掩码自注意力
   - 编码器-解码器注意力

### 自注意力机制

自注意力允许模型在处理每个位置时，关注输入序列的所有位置：

\`\`\`
输入序列：[I, love, AI]

注意力权重：
I → [1.0, 0.3, 0.2]
love → [0.3, 1.0, 0.8]
AI → [0.2, 0.8, 1.0]
\`\`\`

### Transformer 架构图

\`\`\`
输入 → 嵌入层 → 编码器 → 解码器 → 输出
         ↓           ↓           ↓
      位置编码    多头注意力   线性层+Softmax
\`\`\``
  },
  {
    id: '3',
    title: '提示词工程',
    subtitle: 'Prompt 设计最佳实践',
    coreConcept: '如何有效与 AI 沟通',
    content: `## 提示词工程基础

提示词工程是设计有效提示来引导 AI 生成期望输出的艺术。

### 提示词结构

一个好的提示词通常包含以下部分：

1. **角色设定**：告诉 AI 它应该扮演什么角色
2. **任务描述**：清晰说明要完成的任务
3. **约束条件**：设定输出的限制和要求
4. **输出格式**：指定期望的输出格式

### 有效提示词示例

\`\`\`
你是一位专业的软件架构师。

请帮我设计一个用户管理系统的后端架构。

要求：
- 使用 Node.js + Express
- 使用 PostgreSQL 数据库
- 包含用户注册、登录、资料管理功能

请输出：
1. 技术选型说明
2. 数据库设计
3. API 接口设计
\`\`\`

### 提示词技巧

| 技巧 | 说明 |
|------|------|
| 明确性 | 越具体越好，避免模糊表述 |
| 结构化 | 使用 Markdown 格式组织内容 |
| 示例引导 | 提供示例输出帮助理解 |
| 角色扮演 | 让 AI 扮演特定角色 |`
  },
  {
    id: '4',
    title: '上下文管理',
    subtitle: 'Context Window 优化',
    coreConcept: '有效利用模型的上下文窗口',
    content: `## 什么是上下文窗口？

上下文窗口是模型能够"记住"的对话历史长度限制。

### 不同模型的上下文窗口

| 模型 | 上下文窗口 |
|------|-----------|
| GPT-3.5 | 4K / 16K tokens |
| GPT-4 | 8K / 32K / 128K tokens |
| Claude 3 | 200K tokens |

### 上下文管理策略

1. **截断策略**
   - 保留最新对话
   - 保留重要信息
   - 智能摘要

2. **分层上下文**
   - 短期记忆：当前对话
   - 长期记忆：知识库/向量数据库

3. **动态压缩**
   - 自动总结长对话
   - 提取关键信息

### 实践建议

\`\`\`javascript
// 简单的上下文管理
function manageContext(messages, maxTokens) {
  let totalTokens = 0;
  const result = [];
  
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    const tokens = estimateTokens(msg.content);
    
    if (totalTokens + tokens <= maxTokens) {
      result.unshift(msg);
      totalTokens += tokens;
    } else {
      break;
    }
  }
  
  return result;
}
\`\`\``
  },
  {
    id: '5',
    title: '模型调用与参数',
    subtitle: 'Temperature、Top-P 等参数',
    coreConcept: '理解和调优模型参数',
    content: `## 关键参数解析

模型参数直接影响输出的质量和风格。

### Temperature（温度）

控制输出的随机性：

- **低温度 (0.1-0.3)**：输出更确定性、更保守
- **中温度 (0.5-0.7)**：平衡创造性和一致性
- **高温度 (0.9-1.2)**：输出更随机、更有创意

\`\`\`python
# 设置温度参数
response = openai.ChatCompletion.create(
  model="gpt-4",
  messages=[{"role": "user", "content": "写一首诗"}],
  temperature=0.7
)
\`\`\`

### Top-P（核采样）

控制词汇选择的范围：

- **Top-P = 0.1**：只从概率最高的 10% 词汇中选择
- **Top-P = 0.9**：从概率最高的 90% 词汇中选择

### Presence Penalty 和 Frequency Penalty

- **Presence Penalty**：减少新主题的引入
- **Frequency Penalty**：减少重复内容

### 参数组合建议

| 场景 | Temperature | Top-P |
|------|------------|-------|
| 代码生成 | 0.2-0.4 | 0.9 |
| 创意写作 | 0.8-1.0 | 0.95 |
| 数据分析 | 0.1-0.3 | 0.8 |
| 对话聊天 | 0.7-0.9 | 0.9 |`
  },
  {
    id: '6',
    title: '链式思维（CoT）',
    subtitle: '多步推理与问题分解',
    coreConcept: '让 AI 展示推理过程',
    content: `## 什么是链式思维？

链式思维（Chain of Thought）是一种提示词技术，让模型逐步展示推理过程。

### 标准提示 vs CoT 提示

**标准提示：**
\`\`\`
问：一个商店有 100 个苹果，卖出 30 个，又进货 25 个，现在有多少个苹果？
答：95 个
\`\`\`

**CoT 提示：**
\`\`\`
问：一个商店有 100 个苹果，卖出 30 个，又进货 25 个，现在有多少个苹果？
答：
1. 初始有 100 个苹果
2. 卖出 30 个后：100 - 30 = 70 个
3. 进货 25 个后：70 + 25 = 95 个
4. 最终答案：95 个
\`\`\`

### CoT 工作原理

1. **分解问题**：将复杂问题拆分成小步骤
2. **逐步推理**：每一步都基于前一步的结果
3. **自我验证**：检查每一步的合理性
4. **最终总结**：给出明确的最终答案

### CoT 适用场景

- 数学问题
- 逻辑推理
- 编程调试
- 复杂决策

### 实践示例

\`\`\`
你是一位专业的程序员。请按照以下步骤解决问题：

1. 理解问题需求
2. 分析可能的解决方案
3. 评估各方案的优缺点
4. 选择最佳方案并实现

问题：如何优化一个慢查询？

请详细展示你的思考过程。
\`\`\``
  },
  {
    id: '7',
    title: '工具调用与函数',
    subtitle: 'Function Calling 机制',
    coreConcept: '让 AI 学会使用工具',
    content: `## 工具调用基础

Function Calling 允许 AI 模型调用外部工具来获取信息或执行操作。

### 工作流程

\`\`\`
用户提问 → AI 判断是否需要调用工具 → 调用工具 → 获取结果 → 总结回答
\`\`\`

### 工具定义示例

\`\`\`javascript
const tools = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "获取指定城市的天气信息",
      parameters: {
        type: "object",
        properties: {
          city: {
            type: "string",
            description: "城市名称"
          }
        },
        required: ["city"]
      }
    }
  }
];
\`\`\`

### 调用过程

1. **识别需求**：AI 分析用户请求，判断是否需要调用工具
2. **生成调用**：输出包含工具名称和参数的结构化响应
3. **执行工具**：系统执行工具并获取结果
4. **整合结果**：AI 根据工具返回结果生成最终回答

### 实际应用

\`\`\`javascript
// 使用 OpenAI 进行工具调用
const response = await openai.ChatCompletion.create({
  model: "gpt-4",
  messages: [{role: "user", content: "北京今天天气怎么样？"}],
  tools: tools,
  tool_choice: "auto"
});

// 检查是否需要调用工具
if (response.choices[0].finish_reason === "tool_call") {
  const toolCall = response.choices[0].message.tool_calls[0];
  // 执行工具调用...
}
\`\`\``
  },
  {
    id: '8',
    title: '工作流与编排',
    subtitle: 'Agent 决策流程',
    coreConcept: '构建智能工作流系统',
    content: `## Agent 工作流架构

Agent 是能够自主决策和执行任务的 AI 系统。

### 工作流组成

1. **任务规划器**：将目标分解为子任务
2. **工具选择器**：选择合适的工具执行任务
3. **执行引擎**：执行具体操作
4. **结果总结器**：汇总结果并反馈

### 决策流程

\`\`\`
用户需求
    ↓
任务规划 → 分解为子任务
    ↓
工具选择 → 选择合适工具
    ↓
执行操作 → 调用工具或 API
    ↓
结果评估 → 检查是否完成
    ↓
循环或结束
\`\`\`

### 状态机示例

\`\`\`javascript
const states = {
  IDLE: 'idle',
  PLANNING: 'planning',
  EXECUTING: 'executing',
  SUMMARIZING: 'summarizing',
  COMPLETED: 'completed'
};

const transitions = [
  { from: 'idle', to: 'planning' },
  { from: 'planning', to: 'executing' },
  { from: 'executing', to: 'executing' }, // 循环执行
  { from: 'executing', to: 'summarizing' },
  { from: 'summarizing', to: 'completed' },
  { from: 'completed', to: 'idle' }
];
\`\`\`

### 关键设计模式

- **反思机制**：执行后自我检查和修正
- **记忆系统**：保存历史状态和结果
- **优先级排序**：多任务时的资源分配`
  },
  {
    id: '9',
    title: '检索增强生成（RAG）',
    subtitle: '知识库集成',
    coreConcept: '将外部知识注入生成过程',
    content: `## RAG 架构概述

检索增强生成（RAG）是一种将外部知识库与 LLM 结合的技术。

### RAG 工作流程

\`\`\`
用户提问
    ↓
检索知识库 → 查找相关文档
    ↓
构建提示 → 将检索结果加入提示
    ↓
生成回答 → LLM 基于检索内容生成回答
\`\`\`

### 核心组件

1. **文档存储**：存储和管理知识库文档
2. **向量数据库**：存储文档的向量嵌入
3. **检索器**：根据查询找到相关文档
4. **生成器**：基于检索结果生成回答

### 向量检索示例

\`\`\`python
# 创建文档向量
documents = ["文档1内容", "文档2内容", "文档3内容"]
embeddings = model.encode(documents)

# 存储到向量数据库
vector_db.add(embeddings)

# 查询相关文档
query = "用户的问题"
query_embedding = model.encode(query)
similar_docs = vector_db.search(query_embedding, top_k=3)
\`\`\`

### RAG 优化策略

| 策略 | 说明 |
|------|------|
| 文档切分 | 将长文档切分为合适大小的 chunks |
| 元数据过滤 | 使用元数据进行精确检索 |
| 多检索融合 | 结合关键词和向量检索 |
| 重排序 | 对检索结果进行重新排序 |`
  },
  {
    id: '10',
    title: 'Agent 与自动化',
    subtitle: '完整的 AI 工作流',
    coreConcept: '构建端到端的 AI 自动化系统',
    content: `## Agent 自动化系统

完整的 AI 工作流自动化涉及多个环节的协同工作。

### 端到端工作流

\`\`\`
需求输入 → 分析理解 → 任务规划 → 工具调用 → 结果汇总 → 输出报告
\`\`\`

### 系统架构

\`\`\`
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  用户接口   │ → │  任务规划   │ → │  执行引擎   │
└─────────────┘    └─────────────┘    └─────────────┘
                                           │
                                           ↓
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   知识库    │ ← │  结果处理   │ ← │   工具集    │
└─────────────┘    └─────────────┘    └─────────────┘
\`\`\`

### 自动化示例

\`\`\`javascript
// 完整的工作流自动化
async function executeWorkflow(requirement) {
  // 1. 需求分析
  const analysis = await analyzeRequirement(requirement);
  
  // 2. 任务规划
  const tasks = await planTasks(analysis);
  
  // 3. 执行任务
  const results = [];
  for (const task of tasks) {
    const result = await executeTask(task);
    results.push(result);
  }
  
  // 4. 结果汇总
  const summary = await summarizeResults(results);
  
  return {
    analysis,
    tasks,
    results,
    summary
  };
}
\`\`\`

### 实际应用场景

- 代码生成：从需求到完整代码
- 数据分析：从问题到可视化报告
- 文档生成：从大纲到完整文档
- 自动化测试：从需求到测试用例`
  }
];

export const features = [
  {
    id: '1',
    title: '交互式学习',
    description: 'Token 计算器、Prompt 演练场、可视化流程图，让学习更直观',
    icon: 'Zap'
  },
  {
    id: '2',
    title: '完整知识体系',
    description: '从 LLM 原理到 Agent 架构，10 个章节打通 AI 底层逻辑',
    icon: 'BookOpen'
  },
  {
    id: '3',
    title: '现场演示',
    description: '实时展示 AI 工作流，从需求到方案的完整过程',
    icon: 'Play'
  }
];

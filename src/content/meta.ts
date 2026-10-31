import type { ChapterMeta, PartMeta, SiblingProject } from '../lib/types';

export const parts: PartMeta[] = [
  {
    id: 'cognition',
    index: '01',
    title: { zh: '认知入门篇', en: 'Foundations' },
    desc: {
      zh: '先把心智模型建对：Harness 是什么、从哪来、为什么现在成了 Agent 的核心瓶颈。',
      en: 'Get the mental model right: what a harness is, where it came from, and why it is now the bottleneck.',
    },
  },
  {
    id: 'components',
    index: '02',
    title: { zh: '核心组件篇', en: 'The Harness Stack' },
    desc: {
      zh: '拆开缰绳的五层结构：指令、约束、反馈、记忆、编排，逐层给出可落地的实现。',
      en: 'Open the harness into five layers: instructions, constraints, feedback, memory, orchestration.',
    },
  },
  {
    id: 'cases',
    index: '03',
    title: { zh: '大厂实践篇', en: 'Field Reports' },
    desc: {
      zh: 'OpenAI、Anthropic、Stripe、LangChain、Mitchell Hashimoto、Kent Beck 的真实打法和数据。',
      en: 'Real playbooks and numbers from OpenAI, Anthropic, Stripe, LangChain, Mitchell Hashimoto and Kent Beck.',
    },
  },
  {
    id: 'practice',
    index: '04',
    title: { zh: '从零实战篇', en: 'Build It' },
    desc: {
      zh: '从空文件到第一个 Harness，再把方法落到前端、后端、内容生产三个真实场景。',
      en: 'From an empty file to your first harness, then apply it to frontend, backend and content work.',
    },
  },
  {
    id: 'advanced',
    index: '05',
    title: { zh: '进阶避坑篇', en: 'Subtract & Avoid' },
    desc: {
      zh: '学会做减法，也学会识别那些让你看起来很忙、实际在挖坑的反模式。',
      en: 'Learn to subtract, and to spot the anti-patterns that feel productive but dig holes.',
    },
  },
  {
    id: 'appendix',
    index: '06',
    title: { zh: '工具资源篇', en: 'Appendices' },
    desc: {
      zh: '模板、速查表、术语表、阅读清单和姊妹项目导航，随时回来抄作业。',
      en: 'Templates, cheat sheets, glossary, reading list and sister-project navigation.',
    },
  },
];

export const chapters: ChapterMeta[] = [
  {
    id: 'ch01',
    num: 1,
    part: 'cognition',
    title: { zh: '开门见山：什么是 Harness Engineering', en: 'What Exactly Is Harness Engineering' },
    subtitle: { zh: '从「和 AI 聊天」到「给 AI 造缰绳」', en: 'From chatting with AI to building its reins' },
    summary: {
      zh: '模型是大脑，Harness 是手、脚、边界和整个运行环境。搞清 Prompt、Context、Harness 的包含关系，以及为什么它决定 Agent 能否上生产。',
      en: 'The model is the brain; the harness is the hands, feet, boundaries and runtime. Understand how prompt, context and harness nest, and why the harness decides production readiness.',
    },
    minutes: 9,
    tags: [{ zh: '心智模型', en: 'Mental model' }, { zh: '定义', en: 'Definition' }],
  },
  {
    id: 'ch02',
    num: 2,
    part: 'cognition',
    title: { zh: '六十年简史：人和工具的关系演变', en: 'A Sixty-Year History of Humans and Tools' },
    subtitle: { zh: '从打孔卡到 AGENTS.md，以及三次命名觉醒', en: 'From punch cards to AGENTS.md, and three awakenings' },
    summary: {
      zh: '人从执行层向设计层逐层后退：写代码 → 设计测试 → 描述状态 → 设计环境。三次命名把这条暗线说清楚了。',
      en: 'Humans keep stepping back from execution to design: code → tests → desired state → environment. Three namings make the pattern visible.',
    },
    minutes: 11,
    tags: [{ zh: '历史', en: 'History' }, { zh: '命名', en: 'Naming' }],
  },
  {
    id: 'ch03',
    num: 3,
    part: 'cognition',
    title: { zh: '角色转变：程序员的新成长路径', en: 'The New Career Path for Engineers' },
    subtitle: { zh: '从写代码到设计环境，需要补哪几块能力', en: 'From writing code to designing environments' },
    summary: {
      zh: 'Harness 工程师的能力模型、两条成长轨道，以及四个最常见的认知误区。',
      en: 'The harness engineer capability model, two growth tracks, and four common misconceptions.',
    },
    minutes: 9,
    tags: [{ zh: '成长路径', en: 'Career' }, { zh: '能力模型', en: 'Skills' }],
  },
  {
    id: 'ch04',
    num: 4,
    part: 'components',
    title: { zh: '全景图：Harness 的五层架构', en: 'The Five-Layer Harness' },
    subtitle: { zh: '指令、约束、反馈、记忆、编排，缺一不可', en: 'Instructions, constraints, feedback, memory, orchestration' },
    summary: {
      zh: '把 OpenAI、Fowler、Anthropic 的框架揉成一张可操作的架构图，并说清每层的职责与边界。',
      en: 'Merge the OpenAI, Fowler and Anthropic frameworks into one actionable architecture and define each layer.',
    },
    minutes: 10,
    tags: [{ zh: '架构', en: 'Architecture' }, { zh: '五层', en: 'Five layers' }],
  },
  {
    id: 'ch05',
    num: 5,
    part: 'components',
    title: { zh: '指令层：给 AI 一张地图，而非说明书', en: 'The Instruction Layer: A Map, Not a Manual' },
    subtitle: { zh: 'CLAUDE.md / AGENTS.md / .cursorrules 同源不同名', en: 'CLAUDE.md, AGENTS.md and rules files are the same idea' },
    summary: {
      zh: '三大工具对比、三大原则、三种范式，附一份 100 行以内的高质量指令文件模板。',
      en: 'Tool comparison, three principles, three patterns and a high-signal instruction file under 100 lines.',
    },
    minutes: 12,
    tags: [{ zh: 'CLAUDE.md', en: 'CLAUDE.md' }, { zh: 'AGENTS.md', en: 'AGENTS.md' }],
  },
  {
    id: 'ch06',
    num: 6,
    part: 'components',
    title: { zh: '约束层：建议和约束是两回事', en: 'The Constraint Layer: Advice vs Enforcement' },
    subtitle: { zh: '从提示建议到 Hooks、Linter、CI、Sandbox', en: 'From advice to hooks, linters, CI and sandboxes' },
    summary: {
      zh: '把「请勿 push 到 main」变成程序级拦截。四个可直接复制的 Hooks 配置，一套约束谱系判断法。',
      en: 'Turn "do not push to main" into program-level enforcement, with four copy-ready hook configs.',
    },
    minutes: 12,
    tags: [{ zh: 'Hooks', en: 'Hooks' }, { zh: '硬约束', en: 'Enforcement' }],
  },
  {
    id: 'ch07',
    num: 7,
    part: 'components',
    title: { zh: '反馈与记忆层：让 AI 会复盘、不重复犯错', en: 'Feedback & Memory: Make AI Reflect' },
    subtitle: { zh: '让 AI 查 AI，让经验跨会话活下来', en: 'Let AI review AI, and let lessons survive sessions' },
    summary: {
      zh: '三智能体反馈架构、最小可行的「开新会话审查」，以及静态、动态、结构化三级记忆体系。',
      en: 'The evaluator architecture, the minimum viable fresh-session review, and three levels of memory.',
    },
    minutes: 13,
    tags: [{ zh: 'Evaluator', en: 'Evaluator' }, { zh: '记忆', en: 'Memory' }],
  },
  {
    id: 'ch08',
    num: 8,
    part: 'components',
    title: { zh: '编排层：让十匹马同时安全跑起来', en: 'Orchestration: Ten Horses, One Safe Track' },
    subtitle: { zh: '四种编排模式与它们的适用边界', en: 'Four orchestration patterns and when to use them' },
    summary: {
      zh: '人工编排、流水线、分层协作、对等通信四种模式，拆解 Boris 并发工作法与 Stripe 全流水线。',
      en: 'Manual, pipeline, hierarchical and peer-to-peer orchestration, plus Boris-style concurrency and Stripe’s pipeline.',
    },
    minutes: 13,
    tags: [{ zh: '多智能体', en: 'Multi-agent' }, { zh: '编排', en: 'Orchestration' }],
  },
  {
    id: 'ch09',
    num: 9,
    part: 'cases',
    title: { zh: 'OpenAI Codex：零行手写代码的百万行产品', en: 'OpenAI Codex: A Million Lines, Zero Handwritten' },
    subtitle: { zh: '3 人 5 个月 100 万行背后，是五条工程原则', en: 'Three engineers, five months, one million lines' },
    summary: {
      zh: '拆解五条 Harness Engineering 原则、依赖层架构、可观测性闭环和垃圾回收 Agent。',
      en: 'Five principles, dependency-layer architecture, the observability loop and the garbage-collection agent.',
    },
    minutes: 14,
    tags: [{ zh: 'OpenAI', en: 'OpenAI' }, { zh: '案例', en: 'Case study' }],
  },
  {
    id: 'ch10',
    num: 10,
    part: 'cases',
    title: { zh: 'Mitchell Hashimoto：每次犯错加一条规则', en: 'Mitchell Hashimoto: One Mistake, One Rule' },
    subtitle: { zh: '个体开发者的朴素智慧：Harness 是长出来的', en: 'Harness grows; it is not designed upfront' },
    summary: {
      zh: '六步 AI 采纳框架、Ghostty 的 AGENTS.md 活标本，以及一条任何人今天就能开始的纪律。',
      en: 'A six-step adoption path, the living AGENTS.md of Ghostty, and one discipline you can start today.',
    },
    minutes: 11,
    tags: [{ zh: '个体实践', en: 'Solo practice' }, { zh: 'Ghostty', en: 'Ghostty' }],
  },
  {
    id: 'ch11',
    num: 11,
    part: 'cases',
    title: { zh: 'Anthropic：让 AI 查 AI 的工程哲学', en: 'Anthropic: Let AI Review AI' },
    subtitle: { zh: '$9 单 Agent 与 $200 三 Agent 的质量差距', en: 'The $9 single agent vs the $200 three-agent run' },
    summary: {
      zh: 'Planner / Generator / Evaluator、冲刺合约、上下文焦虑，以及 Boris 的 100 行哲学。',
      en: 'Planner, generator, evaluator, sprint contracts, context anxiety and Boris’s 100-line philosophy.',
    },
    minutes: 14,
    tags: [{ zh: 'Anthropic', en: 'Anthropic' }, { zh: 'GAN', en: 'GAN intuition' }],
  },
  {
    id: 'ch12',
    num: 12,
    part: 'cases',
    title: { zh: 'Stripe Minions：每周 1300 个 PR 的企业级流水线', en: 'Stripe Minions: 1,300 PRs a Week' },
    subtitle: { zh: '一条 Slack 消息的完整旅程', en: 'The full journey of one Slack message' },
    summary: {
      zh: 'devbox、Goose 魔改、自动化信心信号，以及一个不性感但最实用的结论：基础设施决定上限。',
      en: 'Devboxes, a customized Goose, automation confidence signals, and the least sexy but most useful conclusion.',
    },
    minutes: 12,
    tags: [{ zh: 'Stripe', en: 'Stripe' }, { zh: '流水线', en: 'Pipeline' }],
  },
  {
    id: 'ch13',
    num: 13,
    part: 'cases',
    title: { zh: 'LangChain：同一匹马，换套缰绳涨 13.7 分', en: 'LangChain: Same Model, +13.7 Points' },
    subtitle: { zh: '模型不变，Harness 优化的硬核数据', en: 'Hard data from harness-only optimization' },
    summary: {
      zh: '三个优化变量、六个中间件 Hook 点、推理三明治，以及可复现的 Trace 驱动迭代方法。',
      en: 'Three variables, six middleware hooks, the reasoning sandwich and a reproducible trace-driven loop.',
    },
    minutes: 14,
    tags: [{ zh: 'LangChain', en: 'LangChain' }, { zh: '基准测试', en: 'Benchmark' }],
  },
  {
    id: 'ch14',
    num: 14,
    part: 'cases',
    title: { zh: 'Kent Beck：30 年软件工程智慧的 AI 迁移', en: 'Kent Beck: 30 Years of Craft, Ported to AI' },
    subtitle: { zh: 'TDD 天然就是 Harness', en: 'TDD was a harness all along' },
    summary: {
      zh: 'Red-Green-Refactor、Tidy First、Augmented Coding 与 Vibe Coding 的边界，以及两次失败教训。',
      en: 'Red-green-refactor, Tidy First, augmented vs vibe coding and the two failed attempts.',
    },
    minutes: 10,
    tags: [{ zh: 'TDD', en: 'TDD' }, { zh: 'Tidy First', en: 'Tidy First' }],
  },
  {
    id: 'ch15',
    num: 15,
    part: 'practice',
    title: { zh: '从零搭建你的第一个 Harness 系统', en: 'Build Your First Harness' },
    subtitle: { zh: '一个空文件、一次犯错、一条规则', en: 'One empty file, one mistake, one rule' },
    summary: {
      zh: '从 0 到 10 条规则的真实演练，三条启动建议，以及从单文件演进到分层架构的路径。',
      en: 'A real 0-to-10 rule drill, three starting moves and a path from one file to a layered harness.',
    },
    minutes: 13,
    tags: [{ zh: '实操', en: 'Hands-on' }, { zh: '起步', en: 'Getting started' }],
  },
  {
    id: 'ch16',
    num: 16,
    part: 'practice',
    title: { zh: '三大业务场景落地实战', en: 'Three Production Playbooks' },
    subtitle: { zh: '前端、后端、内容生产，各一套完整配置', en: 'Frontend, backend and content pipelines' },
    summary: {
      zh: '三个场景各配完整配置模板、踩坑清单和效果评估方法，拿去改成自己的。',
      en: 'Full templates, pitfall lists and evaluation methods for three real scenarios.',
    },
    minutes: 15,
    tags: [{ zh: '前端', en: 'Frontend' }, { zh: '后端', en: 'Backend' }, { zh: '内容', en: 'Content' }],
  },
  {
    id: 'ch17',
    num: 17,
    part: 'advanced',
    title: { zh: '减法哲学：Harness 不是越大越好', en: 'Subtraction: Less Harness, More Signal' },
    subtitle: { zh: '上下文焦虑、规则腐烂，以及什么时候该砍', en: 'Context anxiety, rule rot, and when to cut' },
    summary: {
      zh: '过度工程化三大反模式、五条判断标准、一份该留该砍的清单，以及随模型变强变薄的动态原则。',
      en: 'Three anti-patterns, five tests, a keep/cut list and the principle that harness should thin as models improve.',
    },
    minutes: 11,
    tags: [{ zh: '减法', en: 'Subtraction' }, { zh: '上下文', en: 'Context' }],
  },
  {
    id: 'ch18',
    num: 18,
    part: 'advanced',
    title: { zh: '踩坑指南：Harness 开发的经典陷阱', en: 'Pitfalls & The Twelve Gates' },
    subtitle: { zh: '六大失败模式与 12 道发布门禁', en: 'Six failure modes and twelve release gates' },
    summary: {
      zh: '工具超市、上下文仓库、快乐路径测试、首日全自治、无停止条件、为多智能体而多智能体。',
      en: 'Tool supermarket, context dump, happy-path tests, day-one autonomy, no stop condition, multi-agent theater.',
    },
    minutes: 12,
    tags: [{ zh: '失败模式', en: 'Failure modes' }, { zh: '门禁', en: 'Gates' }],
  },
];

export const siblings: SiblingProject[] = [
  {
    id: 'better-agent',
    name: 'better-agent',
    zh: 'Agent 入门实战指南',
    en: 'Build Better Agents',
    titleZh: '如何构建更好的 Agent',
    titleEn: 'How to Build Better Agents',
    featured: true,
  },
  {
    id: 'agent-ontology',
    name: 'agent-ontology',
    zh: '智能体本体论指南',
    en: 'Agent Ontology',
    titleZh: '智能体本体论',
    titleEn: 'Agent Ontology',
  },
  {
    id: 'agent-loop-engineering',
    name: 'agent-loop-engineering',
    zh: 'Agent 循环工程',
    en: 'Agent Loop Engineering',
    titleZh: 'Agent 循环工程',
    titleEn: 'Agent Loop Engineering',
    featured: true,
  },
  {
    id: 'harness-engineering',
    name: 'harness-engineering',
    zh: '缰绳工程实战指南',
    en: 'Harness Engineering',
    titleZh: '缰绳工程实战指南',
    titleEn: 'Harness Engineering Field Guide',
    current: true,
  },
  {
    id: 'agent-evaluation-patterns',
    name: 'agent-evaluation-patterns',
    zh: 'Agent 评估模式',
    en: 'Agent Evaluation Patterns',
    titleZh: 'Agent 评估模式',
    titleEn: 'Agent Evaluation Patterns',
    featured: true,
  },
  {
    id: 'agent-skillhub-patterns',
    name: 'agent-skillhub-patterns',
    zh: 'Agent 技能中心模式',
    en: 'Agent Skill Hub Patterns',
    titleZh: 'Agent 技能中心模式',
    titleEn: 'Agent Skill Hub Patterns',
  },
  {
    id: 'agent-observability-patterns',
    name: 'agent-observability-patterns',
    zh: 'Agent 可观测性模式',
    en: 'Agent Observability Patterns',
    titleZh: 'Agent 可观测性模式',
    titleEn: 'Agent Observability Patterns',
  },
  {
    id: 'agent-memory-patterns',
    name: 'agent-memory-patterns',
    zh: 'Agent 记忆模式',
    en: 'Agent Memory Patterns',
    titleZh: 'Agent 记忆模式',
    titleEn: 'Agent Memory Patterns',
    featured: true,
  },
  {
    id: 'a2a-patterns',
    name: 'a2a-patterns',
    zh: 'Agent 间协作模式',
    en: 'A2A Patterns',
    titleZh: 'Agent 间协作模式',
    titleEn: 'Agent-to-Agent Patterns',
  },
  {
    id: 'llm-gateway-patterns',
    name: 'llm-gateway-patterns',
    zh: 'LLM 网关模式',
    en: 'LLM Gateway Patterns',
    titleZh: 'LLM 网关模式',
    titleEn: 'LLM Gateway Patterns',
  },
  {
    id: 'mcp-patterns',
    name: 'mcp-patterns',
    zh: 'MCP 协议模式',
    en: 'MCP Patterns',
    titleZh: 'MCP 协议模式',
    titleEn: 'MCP Patterns',
  },
];

export function siblingUrl(id: string) {
  return `https://yuxinrun.github.io/${id}/`;
}

export function getChapter(id: string) {
  return chapters.find((c) => c.id === id);
}

export function getPart(id: string) {
  return parts.find((p) => p.id === id);
}

export function chapterNeighbors(id: string) {
  const index = chapters.findIndex((c) => c.id === id);
  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}

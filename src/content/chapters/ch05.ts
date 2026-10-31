import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch05: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: 'CLAUDE.md、AGENTS.md、.cursor/rules 本质是同一件事：用 Markdown 把人的意图编码成 Agent 可读的规则。但怎么写，差别极大。本章给出三种成熟范式、三条原则，和一份可以直接抄的 100 行模板。',
        en: 'CLAUDE.md, AGENTS.md and .cursor/rules are one idea: encode intent as rules the agent can read. How you write them differs enormously. This chapter gives three mature patterns, three principles and a 100-line template you can copy.',
      },
    },

    { type: 'h2', id: 'tools', text: { zh: '先看三个工具的指令系统差在哪', en: 'How the three tools differ' } },
    {
      type: 'table',
      head: [
        { zh: '维度', en: 'Dimension' },
        { zh: 'Claude Code', en: 'Claude Code' },
        { zh: 'Codex CLI', en: 'Codex CLI' },
        { zh: 'Cursor', en: 'Cursor' },
      ],
      rows: [
        [
          { zh: '文件名 / 位置', en: 'File and location' },
          { zh: 'CLAUDE.md，项目根目录', en: 'CLAUDE.md at the repo root' },
          { zh: 'AGENTS.md，项目根目录', en: 'AGENTS.md at the repo root' },
          { zh: '.cursor/rules/*.mdc，可在子目录', en: '.cursor/rules/*.mdc, may sit in subdirs' },
        ],
        [{ zh: '文件格式', en: 'Format' }, { zh: '纯 Markdown', en: 'Plain Markdown' }, { zh: '纯 Markdown', en: 'Plain Markdown' }, { zh: 'MDC：Markdown + YAML frontmatter', en: 'MDC: Markdown with YAML frontmatter' }],
        [
          { zh: '层级数', en: 'Hierarchy' },
          { zh: '3 层：全局 / 项目 / 子目录', en: 'Three: global / project / subdirectory' },
          { zh: '多层：override / agents / team_guide / fallback', en: 'Multi-level: override / agents / team_guide / fallback' },
          { zh: '2 层：全局 / 项目', en: 'Two: global / project' },
        ],
        [
          { zh: '加载机制', en: 'Loading' },
          { zh: '每次会话自动加载', en: 'Auto-loaded each session' },
          { zh: '启动时逐层遍历，近处覆盖远处', en: 'Walks levels at start, nearer overrides farther' },
          { zh: '按激活条件：alwaysApply / glob / @mention / AI 判断', en: 'By activation: alwaysApply / glob / @mention / AI-decided' },
        ],
        [
          { zh: 'Glob 作用域', en: 'Glob scoping' },
          { zh: '否（靠子目录实现）', en: 'No—use subdirectories' },
          { zh: '否', en: 'No' },
          { zh: '是（frontmatter 里的 globs）', en: 'Yes—globs in frontmatter' },
        ],
        [
          { zh: '导入其他文件', en: 'Imports' },
          { zh: '@path/to/file', en: '@path/to/file' },
          { zh: '无', en: 'None' },
          { zh: '无', en: 'None' },
        ],
        [
          { zh: '跨工具兼容', en: 'Cross-tool' },
          { zh: '否', en: 'No' },
          { zh: 'Windsurf 2026 起自动兼容', en: 'Windsurf reads it automatically since 2026' },
          { zh: '否', en: 'No' },
        ],
      ],
      caption: {
        zh: '三种哲学对应三种项目形态：三层继承适合有强共享偏好的团队；多层叠加适合大仓库多团队共维；glob 作用域适合一个项目里多种代码风格并存。',
        en: 'Three philosophies for three shapes: inheritance suits teams with strong shared preferences; layered override suits big multi-team repos; glob scoping suits one repo with several coexisting code styles.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '标准正在收敛', en: 'The standard is converging' },
      text: {
        zh: '按《橙皮书》的记录：2026 年 3 月 AGENTS.md 被纳入 Linux 基金会旗下的 Agentic AI Foundation 管理，推动方包括 Sourcegraph、OpenAI、Google、Cursor 与 Factory；Windsurf 自 2026 年初自动识别 AGENTS.md，同一份规则可同时被 Windsurf 和 Codex CLI 读取；GitHub Copilot 的 .instructions.md、Google 的 GEMINI.md、Cline 的 .clinerules 也越像它。你现在写的任何一份指令文件，80% 的内容（项目结构、编码规范、测试命令、架构约束）不绑定特定工具。',
        en: 'Per the orange book: in March 2026 AGENTS.md came under the Linux Foundation’s Agentic AI Foundation, pushed by Sourcegraph, OpenAI, Google, Cursor and Factory; Windsurf auto-detects AGENTS.md from early 2026 so one file serves both; Copilot’s .instructions.md, Google’s GEMINI.md and Cline’s .clinerules drift toward the same shape. Roughly 80% of what you write today—layout, style rules, test commands, architecture constraints—binds to no tool.' },
    },
    { type: 'sources', items: [SRC.agentsMd, SRC.anthropicClaudeCode, SRC.anthropicBestPractices, SRC.openaiCodex, SRC.orangeBook] },

    { type: 'h2', id: 'patterns', text: { zh: '三种范式：路由器、目录指针、Glob 作用域', en: 'Three patterns: router, pointer map, glob scoping' } },
    {
      type: 'h3', id: 'router', text: { zh: '范式一 · 路由器模式：根文件只做分流', en: 'Pattern 1 · Router: the root file only dispatches' } },
    {
      type: 'p',
      text: {
        zh: '适合同时管多种完全不同类型工作的人（写作、视频、App 各一套规则）。根目录 CLAUDE.md 不写任何具体规则，只判断任务属于哪个工作区，再指向子目录的规则文件。单一主题的项目（比如一个 Rust 库）不要用它——一个文件到底反而省事。',
        en: 'For people running several unrelated kinds of work (writing, video, an app) at once. The root CLAUDE.md contains no rules; it decides which workspace a task belongs to and points at that directory’s rules. Single-topic projects—a Rust library—should not use it; one file is simpler.',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '根目录 CLAUDE.md：工作区路由表', en: 'Root CLAUDE.md: workspace routing table' },
      code: `# 工作区路由

收到任务后，先判断工作区，再读取对应的 CLAUDE.md：

| 关键词 | 工作区 | 读取文件 |
|--------|--------|----------|
| 写文章、公众号 | 公众号写作 | /01-公众号写作/CLAUDE.md |
| 小红书、笔记 | 小红书写作 | /02-小红书写作/CLAUDE.md |
| 视频脚本 | 视频创作 | /03-视频创作/CLAUDE.md |
| 代码、Demo | 实验项目 | /09-实验项目/CLAUDE.md |

- 任务模糊 → 先询问确认，不要猜工作区
- 涉及多个工作区 → 依次读取，不要合并规则
- 具体执行规则全部在子目录里，根文件保持精简（<200 行）`,
    },
    {
      type: 'quote',
      text: {
        zh: 'Bloated CLAUDE.md files cause Claude to ignore your actual instructions!',
        en: 'Bloated CLAUDE.md files cause Claude to ignore your actual instructions!',
      },
      cite: { zh: 'Boris Cherny（Claude Code 创建者）', en: 'Boris Cherny, creator of Claude Code' },
    },
    {
      type: 'p',
      text: {
        zh: '路由器模式的价值不在整洁，而在**每次只加载相关规则**。上下文是稀缺资源：指令文件占的空间越大，留给真实任务和代码的空间越小。',
        en: 'The point of a router is tidiness’ cousin: **only relevant rules get loaded each time.** Context is scarce—the more space your instructions take, the less is left for the actual task and code.',
      },
    },

    { type: 'h3', id: 'pointer', text: { zh: '范式二 · 目录指针模式：AGENTS.md 当封面', en: 'Pattern 2 · Pointer map: AGENTS.md as the cover page' } },
    {
      type: 'p',
      text: {
        zh: 'OpenAI Codex 团队走得更极端：AGENTS.md 约 100 行，只当地图与指针，深层知识全在 docs/ 下。他们试过一份超大的 AGENTS.md，效果很差——全面的指令文件会挤占任务上下文与相关代码的空间。结论是：**小而稳定的入口 + 指向专业化知识的结构**，Agent 表现更好。',
        en: 'OpenAI’s Codex team went further: a ~100-line AGENTS.md acting only as map and pointer, with depth living under docs/. They tried one giant AGENTS.md and it performed badly—exhaustive instructions crowd out task context and relevant code. The conclusion: **a small, stable entry point plus pointers to specialised knowledge** is what agents do better with.',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: 'OpenAI 风格的目录指针 + 文档分层', en: 'OpenAI-style pointer map and document tiers' },
      code: `# AGENTS.md

## 项目概览
这是一个 <项目名>，技术栈：React + FastAPI + PostgreSQL

## 核心命令（照这些跑，别猜）
- 启动开发服务器：\`pnpm dev\`
- 运行测试：\`pnpm test\`
- 类型检查：\`pnpm type-check\`

## 架构指南
→ 详见 docs/ARCHITECTURE.md（~200 行，代码库地图）

## 设计决策
→ 详见 docs/design-docs/（核心架构决策记录）

## 活跃任务
→ 详见 docs/exec-plans/（当前 Sprint 与技术债）

## 产品规格
→ 详见 docs/product-specs/（功能规格，带导航索引）

## 依赖层级（强制执行）
Types → Config → Repo → Service → Runtime → UI
每个业务领域内代码只能沿固定方向依赖，违反会被 CI 拦截。

# 对应的仓库结构
# AGENTS.md            # ~100 行，目录 + 指针
# ARCHITECTURE.md      # ~200 行，代码库地图
# docs/
#   design-docs/       # 核心架构决策
#   exec-plans/        # 活跃任务与技术债
#   product-specs/     # 功能规格说明
#   references/        # 设计系统文档
#   decisions/         # 架构决策记录（ADR）`,
    },

    { type: 'h3', id: 'glob', text: { zh: '范式三 · Glob 作用域：改什么文件加载什么规则', en: 'Pattern 3 · Glob scoping: rules follow the file you edit' } },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '.cursor/rules/api-layer.mdc 与 components.mdc', en: '.cursor/rules/api-layer.mdc and components.mdc' },
      code: `---
description: API 层编码规范
globs: src/api/**/*.ts
alwaysApply: false
---
# API 层规范

- 所有 API 函数必须有返回类型注解
- 错误处理使用项目统一的 AppError 类
- 请求参数和响应类型定义在同文件顶部
- 不要在 API 层做业务逻辑判断

---
description: React 组件规范
globs: src/components/**/*.tsx
alwaysApply: false
---
# 组件规范

- 使用函数组件 + hooks，不用 class 组件
- Props 类型定义用 interface，不用 type
- 单文件不超过 200 行
- 样式用 Tailwind，不用 CSS Modules`,
    },
    {
      type: 'table',
      head: [
        { zh: '激活模式', en: 'Activation' },
        { zh: '说明', en: 'Behaviour' },
        { zh: '适合', en: 'Good for' },
      ],
      rows: [
        [{ zh: 'alwaysApply: true', en: 'alwaysApply: true' }, { zh: '每次会话自动加载', en: 'Loaded every session' }, { zh: '通用规范、项目结构、硬约束', en: 'Global conventions, layout, hard constraints' }],
        [{ zh: 'glob 匹配', en: 'glob match' }, { zh: '文件在上下文中时激活', en: 'Activates when the file is in context' }, { zh: '模块特定规则（API / 组件 / 数据层）', en: 'Module-specific rules (API / components / data)' }],
        [{ zh: '手动 @mention', en: 'Manual @mention' }, { zh: '用户显式触发', en: 'Explicitly triggered by the user' }, { zh: '偶尔需要的特殊流程（发布、迁移）', en: 'Occasional flows (release, migration)' }],
        [{ zh: 'AI 判断', en: 'AI-decided' }, { zh: '根据 description 自动决策', en: 'Chosen from the description' }, { zh: '情境规范（性能、安全审查）', en: 'Situational norms (perf, security)' }],
      ],
      caption: {
        zh: '实战上最有用的组合是 alwaysApply + glob：前者放依赖规则与禁用模式，后者放模块风格。手动 @mention 容易忘，AI 判断不够稳定，两者都要谨慎用。',
        en: 'In practice alwaysApply + glob is the combination worth betting on: hard constraints in the former, module style in the latter. Manual mentions get forgotten, AI-decided is unstable—use both sparingly.',
      },
    },

    { type: 'h2', id: 'principles', text: { zh: '写好指令文件的三条原则', en: 'Three principles for a good instruction file' } },
    {
      type: 'compare',
      left: {
        title: { zh: '僵化步骤（不要这样写）', en: 'Rigid steps (do not write this)' },
        tone: 'bad',
        items: [
          { zh: '1. 先在 src/components/ 创建文件夹', en: '1. First create a folder in src/components/' },
          { zh: '2. 创建 index.tsx；3. 创建 types.ts', en: '2. Create index.tsx; 3. Create types.ts' },
          { zh: '4. 创建 styles.module.css 并在 index.tsx 导入', en: '4. Create styles.module.css and import it in index.tsx' },
          { zh: '5. 导出 default', en: '5. Export default' },
          { zh: '看着全面，但遇到不完全匹配的情况 Agent 就卡住', en: 'Looks thorough; any mismatch and the agent stalls' },
        ],
      },
      right: {
        title: { zh: '方向感（这样写）', en: 'Direction (write this instead)' },
        tone: 'good',
        items: [
          { zh: '共享组件放 src/components/', en: 'Shared components live in src/components/' },
          { zh: '样式用 Tailwind，不用 CSS Modules', en: 'Tailwind for styling, no CSS Modules' },
          { zh: '单文件 <200 行，超过就拆', en: 'Under 200 lines per file; split when exceeded' },
          { zh: 'Props 用 interface 定义', en: 'Define props with an interface' },
          { zh: '保留判断空间，同时不跑偏', en: 'Judgement preserved, drift prevented' },
        ],
      },
    },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '原则一：方向感，而非僵化步骤', en: 'Principle 1: direction, not steps' },
          text: {
            zh: '好的指令文件像地图，不像说明书：告诉它地形、路标、禁区在哪，别把每一步写死。写死的步骤只是把「你不会做的事」变成「你不能做的事」。',
            en: 'A good file is a map, not a manual: terrain, landmarks, no-go zones. Hard-coded steps convert "what you would not do" into "what you cannot do".',
          },
        },
        {
          title: { zh: '原则二：护栏优先于手册', en: 'Principle 2: guardrails before manuals' },
          text: {
            zh: '与其说「你应该这么做」，不如说「你不能这么做」。OpenAI 的架构不变量用了反直觉的表达：声明**这里不存在什么**——「不使用 ORM」「UI 层不直接访问数据库」「不存在全局状态管理库」。告诉 Agent 不存在什么，比告诉它存在什么更能约束解空间。',
            en: 'Say "you may not" rather than "you should". OpenAI’s architectural invariants use a counter-intuitive phrasing: declare **what does not exist here**—“no ORM”, “UI never touches the database”, “no global state library”. Telling an agent what is absent constrains the solution space better than telling it what is present.',
          },
        },
        {
          title: { zh: '原则三：犯错 → 记录 → 迭代的飞轮', en: 'Principle 3: the mistake-record-iterate flywheel' },
          text: {
            zh: '只记录 Agent 真正犯过的错。Boris 的团队在 PR 里用 @.claude 标签更新 CLAUDE.md，每次纠正行为就加一条，日积月累这个文件变成团队的制度知识。对每一行问：删掉它会导致 Agent 犯错吗？不会就删。',
            en: 'Record only mistakes the agent actually made. Boris’s team updates CLAUDE.md via an @.claude label on PRs—every correction adds a line, and over months the file becomes institutional knowledge. Ask of every line: would deleting it cause a mistake? If not, delete it.',
          },
        },
      ],
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '架构不变量的写法：声明不存在什么', en: 'Invariants done right: declare absence' },
      code: `# 架构不变量（违反任何一条，CI 直接拦下）

- 这个项目不使用 ORM，所有数据库操作用原始 SQL
- UI 层不直接访问数据库，必须通过 Service 层
- 不存在全局状态管理库，用 React Context + hooks
- 没有任何微服务通信，这是单体应用`,
    },

    { type: 'h2', id: 'dosdonts', text: { zh: '该写什么，不该写什么', en: 'What belongs, what does not' } },
    {
      type: 'table',
      head: [{ zh: '应该写', en: 'Write this' }, { zh: '不应该写', en: 'Do not write this' }],
      rows: [
        [{ zh: 'Agent 猜不到的命令（如 \`pnpm vitest run\`）', en: 'Commands it cannot guess (e.g. `pnpm vitest run`)' }, { zh: 'Agent 读代码就能发现的（如「使用 React」）', en: 'Anything readable from the code (e.g. "we use React")' }],
        [{ zh: '与默认行为不同的代码风格规则', en: 'Style rules that differ from defaults' }, { zh: '标准语言惯例', en: 'Standard language conventions' }],
        [{ zh: '测试指令和首选测试运行器', en: 'Test commands and the preferred runner' }, { zh: '详细的 API 文档（链接即可）', en: 'Detailed API docs (link instead)' }],
        [{ zh: '分支命名、PR 惯例', en: 'Branch naming, PR conventions' }, { zh: '频繁变化的信息（版本号、本周任务）', en: 'Fast-changing facts (versions, this week’s tasks)' }],
        [{ zh: '项目特定的架构决策', en: 'Project-specific architecture decisions' }, { zh: '教程和长篇解释', en: 'Tutorials and long explanations' }],
        [{ zh: '常见陷阱与非显而易见的行为', en: 'Known traps and non-obvious behaviour' }, { zh: '「写干净代码」这类不言自明的原则', en: 'Self-evident maxims like "write clean code"' }],
      ],
      caption: {
        zh: '好的指令文件读起来像资深同事在你入职第一天给你的备忘录：关键信息、常见坑、谁负责什么。不是培训手册，是生存指南。',
        en: 'A good instruction file reads like the note a senior colleague hands you on day one: what matters, where the traps are, who owns what. A survival guide, not a training manual.',
      },
    },

    { type: 'h2', id: 'template', text: { zh: '一份 100 行以内的骨架', en: 'A skeleton under 100 lines' } },
    {
      type: 'p',
      text: {
        zh: '下面这份是本站工具包模板的浓缩版，七个段落按「稳定 → 易变」排列，每一段都能删但删之前要确认 Agent 真的不会因此犯错。完整可复制版本见工具包与附录 A。',
        en: 'A condensed form of the Toolkit template: seven sections ordered stable → volatile. Every section can be deleted, but only after confirming the agent does not err without it. The full copy-ready version lives in the Toolkit and Appendix A.',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '高质量指令文件骨架（约 60 行）', en: 'High-signal instruction skeleton (~60 lines)' },
      code: `# 项目地图

## 这是什么（1 段，别超过 5 行）
<产品名>：<给谁解决什么问题>。非目标：<明确不做什么>。

## 命令（照这些跑，不要发明新命令）
- 安装依赖：\`pnpm i\`
- 开发：\`pnpm dev\`｜测试：\`pnpm test\`｜单测过滤：\`pnpm vitest run <file>\`
- 类型检查：\`pnpm typecheck\`｜构建：\`pnpm build\`

## 结构（只写关系，不写显而易见的事）
- \`src/api/**\` 只负责请求与响应类型
- \`src/services/**\` 是唯一允许访问数据库的层
- \`src/ui/**\` 不 import \`services\`，只 import \`api\`

## 架构不变量（违反 = 失败）
- 不使用 ORM；数据库操作全部原始 SQL
- 不存在全局状态库；状态用 Context + hooks
- 单体应用，无服务间通信

## 已知陷阱
- 迁移必须走 \`pnpm migrate\`，手写 SQL 会让 schema 漂移
- 测试里不要 mock 时间；用 \`vi.useFakeTimers()\`

## 指针（深层知识不在这里）
→ 架构：docs/ARCHITECTURE.md｜决策：docs/decisions/｜当前任务：docs/exec-plans/

## 完成的定义
- 上述命令全部通过；新增行为有对应测试；PR 描述写清「为什么」`,
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '最常见的失败方式', en: 'The most common way this fails' },
      text: {
        zh: '不是写得太少，是写得太认真：把三十条「以防万一」的规则一次写完。这些规则没有一条来自真实错误，却会稀释真正重要那几条的权重。先写 10 行，跑一周，让 Agent 用它，然后只把真实发生过的错误加进去。',
        en: 'Not too little but too diligent: thirty defensive rules written in one sitting. None came from a real mistake, yet all of them dilute the ones that did. Write ten lines, run them for a week, and add only what actually went wrong.',
      },
    },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '先数行数', en: 'Count lines first' },
          text: {
            zh: '入口文件超过 100 行就问一句：哪一段是 Agent 读代码就能知道的？把它们移到 docs/ 并留指针。GitHub Actions 里加一条 \`wc -l\` 检查更省心（附录 A 有现成 YAML）。',
            en: 'Over 100 lines, ask one question: which section could the agent learn by reading code? Move those to docs/ and leave a pointer. A \`wc -l\` step in CI makes this effortless (ready-made YAML in Appendix A).' },
        },
        {
          title: { zh: '再测一次「删掉会怎样」', en: 'Then test deletion' },
          text: {
            zh: '随机挑三条删掉，让 Agent 跑同一个任务。没出问题就永久删掉；出问题就把它写成一条更具体的规则，而不是恢复原文。',
            en: 'Delete three random lines and let the agent run the same task. No regression—keep them gone. Regression—rewrite that rule more specifically instead of restoring it.' },
        },
        {
          title: { zh: '最后检查矛盾', en: 'Finally check for contradictions' },
          text: {
            zh: '两条规则互相打架时，Agent 的行为不可预测：有时选更近的，有时选更长的，有时两条都忽略。每季度做一次垃圾回收：删过时、合并重复、解决冲突。',
            en: 'Conflicting rules make agent behaviour unpredictable—it may take the nearer, the longer, or ignore both. Do a quarterly garbage collection: delete stale, merge duplicates, resolve conflicts.' },
        },
      ],
    },

    {
      type: 'siblings',
      title: { zh: '指令文件之外的相邻主题', en: 'Neighbouring topics' },
      items: ['better-agent', 'agent-skillhub-patterns', 'a2a-patterns'],
    },
  ],
  sources: [SRC.orangeBook, SRC.agentsMd, SRC.anthropicBestPractices, SRC.openaiHarness, SRC.anthropicClaudeCode],
};

export default ch05;

import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch09: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '3 名工程师、5 个月、约 100 万行代码、零行手写。这组数字足够炸眼，但真正值得抄的是它背后的五条原则——以及那个打破 Brooks 定律的反常现象：加人之后，人均产出反而更高。',
        en: 'Three engineers, five months, roughly a million lines, zero handwritten. The numbers are explosive, but what is worth copying is the five principles behind them—and the anomaly that breaks Brooks’s law: adding people raised per-person throughput.',
      },
    },

    { type: 'h2', id: 'data', text: { zh: '先把数据摆上桌', en: 'The numbers first' } },
    {
      type: 'stats',
      items: [
        { value: '~100万行', label: { zh: '代码规模', en: 'lines of code' }, hint: { zh: '应用逻辑 + 基础设施 + 工具 + 文档', en: 'app logic + infra + tools + docs' } },
        { value: '3 → 7', label: { zh: '团队规模', en: 'team size' }, hint: { zh: '后期扩到 7 人，人均吞吐不降反升', en: 'grew to 7; per-person throughput rose, not fell' } },
        { value: '3.5', label: { zh: '人均日合并 PR', en: 'PRs merged per person per day' } },
        { value: '0 行', label: { zh: '人工手写代码', en: 'human-written lines' } },
      ],
    },
    {
      type: 'p',
      text: {
        zh: '来源是 OpenAI 2026-02-13 的博文「Harness engineering: leveraging Codex in an agent-first world」，作者 Ryan Lopopolo（Codex 团队 Technical Staff）。最反直觉的一点：**从 3 人扩到 7 人后，人均吞吐量反而上升**。学过软件工程的人都知道 Brooks 定律——加人让沟通成本指数级增长、项目反而变慢。Codex 团队打破了它，初期每人约当 0.25 个传统工程师，后期飙到 3–10 倍。',
        en: 'The source is OpenAI’s 2026-02-13 post "Harness engineering: leveraging Codex in an agent-first world" by Ryan Lopopolo, Technical Staff on the Codex team. The counter-intuitive part: **after growing from 3 to 7 people, per-person throughput increased.** Every software engineer knows Brooks’s law—more people means exponentially higher communication cost and a slower project. The Codex team broke it: early on each person matched about 0.25 of a traditional engineer; later, 3–10×.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '为什么加人反而更快', en: 'Why more people went faster' },
      text: {
        zh: '因为他们不在写代码，在**设计让 AI 写代码的环境**。加人增加的不是代码协调成本，而是 harness 的完善度。Harness 越完善，每个人能同时驾驭的 agent 就越多。工程师的日常从「写代码」变成「设计环境、描述意图、构建反馈循环」。用 Lopopolo 的原话：当团队的首要工作不再是写代码，而是让 Codex agent 可靠地工作时，一切都变了。',
        en: 'Because they were not writing code—they were **designing the environment that writes code**. Extra heads added harness polish, not code-coordination cost. The better the harness, the more agents each person can drive at once. The daily job moved from "write code" to "design the environment, describe intent, build feedback loops". In Lopopolo’s words: everything changed once the team’s primary work stopped being writing code and became making the Codex agent work reliably.',
      },
    },
    { type: 'sources', items: [SRC.openaiHarness] },

    { type: 'h2', id: 'principles', text: { zh: '五条原则，逐条拆', en: 'The five principles, unpacked' } },
    {
      type: 'cards',
      items: [
        {
          icon: 'eye',
          title: { zh: '① Agent 看不到的等于不存在', en: '① Invisible to the agent = does not exist' },
          text: {
            zh: '运行时无法在上下文中访问的一切，对 agent 来说就不存在。团队把 Google Docs 的规划、Slack 的决策全部迁入代码仓库，并创造了 ExecPlans 文档格式——不是给人看的笔记，是写到初级工程师也能端到端实现的、给 agent 执行的指令。',
            en: 'Anything the agent cannot reach in context while running effectively does not exist. The team migrated planning docs and Slack decisions into the repo and invented ExecPlans—not notes for humans, but instructions an agent can execute, written so a junior could implement end to end.',
          },
        },
        {
          icon: 'wrench',
          title: { zh: '② 问缺什么，别问为什么失败', en: '② Ask what is missing, not why it failed' },
          text: {
            zh: 'agent 卡住时不当成「模型笨」，而是当成信号：缺工具、缺护栏，还是缺文档？速度变慢往往是某个新场景没有配套验证工具。配套策略是**优先用「无聊技术」**——API 稳定、训练数据里高频出现的技术栈，agent 更熟、犯错更少。',
            en: 'When the agent stalls, treat it as a signal, not stupidity: which of tools, guardrails or docs is missing? Slowdowns usually mean a new scenario lacks a verification tool. The companion rule is to **prefer boring technology**—stable APIs that appear often in training data, so the agent errs less.',
          },
        },
        {
          icon: 'lock',
          title: { zh: '③ 机械化强制优于文档规范', en: '③ Mechanical enforcement beats documentation' },
          text: {
            zh: '把品位编码进代码库：自定义 ESLint 规则和 linter 让坏模式在静态层就过不了；在数据边界强制解析，agent 只能选预定义库；CI 结构化测试自动阻断违反架构层级的 PR；错误信息里带修复指导和文档链接。最妙的是——这些 linter 本身也是 Codex 写的，用 agent 约束 agent。',
            en: 'Encode taste into the codebase: custom ESLint rules make bad patterns fail at the static layer; parsing is enforced at data boundaries so agents pick only pre-defined libraries; structured CI blocks PRs that violate the architecture; error messages carry fixes and doc links. Best of all—the linters themselves are written by Codex, agents constraining agents.',
          },
        },
        {
          icon: 'activity',
          title: { zh: '④ 给 agent 装上眼睛', en: '④ Give the agent eyes' },
          text: {
            zh: '把 agent 连上 Chrome DevTools Protocol，能看 DOM 快照、截图、导航；每次改完代码，agent 自启隔离实例比对修改前后的截图和日志。每个 git worktree 配一套临时 VictoriaLogs + VictoriaMetrics，用 LogQL 查日志、PromQL 查指标。「启动 < 800ms」从文档愿望变成 agent 可自验的硬指标。这让单次任务能无人干预跑 6 小时以上。',
            en: 'Wire the agent to the Chrome DevTools Protocol—DOM snapshots, screenshots, navigation—so after each edit it boots an isolated instance and diffs screenshots and logs. Every git worktree gets a throwaway VictoriaLogs + VictoriaMetrics stack, queried in LogQL and PromQL. "Startup under 800ms" became a metric the agent verifies itself. This lets a single run go 6+ hours untouched.',
          },
        },
        {
          icon: 'map',
          title: { zh: '⑤ 给地图，不给手册', en: '⑤ Give a map, not a manual' },
          text: {
            zh: '试过巨型单文件，效果很差——上下文窗口是稀缺资源。最终用一份约 100 行的 AGENTS.md 当鸟瞰地图，只放很少变化的内容，用指针链向深层文档。还有个反直觉技巧：**用「这里不存在什么」表达架构不变量**——告诉 agent 不用 ORM、不用 GraphQL，比枚举它该用什么更省上下文。',
            en: 'A giant single file failed—context is scarce. They settled on a ~100-line AGENTS.md as an aerial map holding rarely-changing content, with pointers into deeper docs. A counter-intuitive trick: **express invariants by what is absent**—saying "no ORM, no GraphQL" saves more context than enumerating what to use.',
          },
        },
      ],
    },

    {
      type: 'code',
      lang: 'text',
      title: { zh: 'Codex 的硬性依赖层级', en: 'Codex’s strict dependency layers' },
      code: `Types  →  Config  →  Repo  →  Service  →  Runtime  →  UI

# 代码只能沿固定方向依赖，反向依赖直接过不了 CI。
# Ryan Lopopolo：这种分层通常要等团队几百人才会做，
# 但在 agent-first 开发里它是最早期的前提——
# 因为「约束本身就是速度的来源」。
`,
    },
    {
      type: 'quote',
      text: {
        zh: '把品位写进代码库……如果你能说清你不喜欢这段代码的哪一点，下一步就是把它写成规则。',
        en: 'Encode taste into the codebase—if you can articulate what it is about the code you do not like, the next step is to write that down.',
      },
      cite: { zh: 'OpenAI Codex 团队', en: 'The OpenAI Codex team' },
    },

    { type: 'h2', id: 'gc', text: { zh: '垃圾回收：对抗熵增的第三支柱', en: 'Garbage collection: the third pillar against entropy' } },
    {
      type: 'p',
      text: {
        zh: '除了上下文工程和架构约束，Codex 团队还有一个专职角色——**垃圾回收 agent**。它不写功能、不做需求，周期性运行，只干一件事：扫描文档里的矛盾和架构违规，发现问题就自动生成一个有针对性的重构 PR，人类 1 分钟内就能审完。本质上在对抗代码库的熵增：agent 写得越多，引入不一致的概率越高，就需要一个专门找茬的 AI 去清理其它 AI 留下的混乱。',
        en: 'Beyond context engineering and architectural constraints sits a third role—the **garbage-collection agent**. It ships no features and runs periodically to do one thing: scan for contradictions and architecture violations, then open a targeted refactor PR a human clears in a minute. It fights repo entropy: the more agents write, the more inconsistency they introduce, so a dedicated nit-picking AI cleans up the mess the others leave.',
      },
    },

    { type: 'h2', id: 'doubt', text: { zh: '质量问号：快 10 倍 ≠ 好 10 倍', en: 'The quality question: 10× faster is not 10× better' } },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '速度之外，还有一笔长期账', en: 'Beyond speed lies a long-term bill' },
      text: {
        zh: '每人每天 3.5 个 PR，谁在做充分审查？六个月后改需求时，这 100 万行好改吗？AI 代码和人代码有个关键区别：人写代码会无意识留下结构线索方便将来的自己，AI 只解决眼前任务，不考虑六个月后维护的人会怎么骂娘。Martin Fowler 团队的 Birgitta Böckeler 指出同一盲区：这套框架关注内部质量与可维护性，却缺少对功能与行为正确性的验证。**harness 不只是让 AI 写得快，还得让它写得能维护。**',
        en: 'At 3.5 PRs a day per person, who is reviewing properly? In six months, are these million lines easy to change? AI code differs from human code in one key way: humans unconsciously leave structural clues for their future selves, while AI solves only the task in front of it and never thinks about the maintainer six months on. Birgitta Böckeler of the Fowler team flags the same blind spot: the framework attends to internal quality and maintainability but lacks verification of functional and behavioural correctness. **A harness must make AI write not just fast but maintainable.**',
      },
    },
    {
      type: 'p',
      text: {
        zh: '最容易被忽略的一层，也是花叔反复强调的：让 3 人零手写跑到百万行的，不是 GPT-5.2 本身，而是他们前置下来的硬基础设施——依赖层架构、自定义 linter、Chrome DevTools、可观测性栈、垃圾回收 agent。**这些东西模型再强也替代不了。** 对小团队同样适用：先检查你的工程基础设施和纪律，没有这些，再强的模型也救不了你。',
        en: 'The most overlooked layer, and the one the book keeps returning to: what drove three people to a million handwritten-free lines was not GPT-5.2 itself but the hard infrastructure put in place beforehand—the dependency layers, custom linters, Chrome DevTools, the observability stack and the garbage-collection agent. **No amount of model strength replaces those.** The lesson scales down: audit your engineering infrastructure and discipline first, because without them even the strongest model cannot save you.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '同一匹马的其它缰绳实验', en: 'Other harness experiments on the same horse' },
      items: ['agent-loop-engineering', 'agent-evaluation-patterns', 'agent-observability-patterns', 'better-agent'],
    },
  ],
  sources: [SRC.openaiHarness, SRC.openaiCodexLoop, SRC.openaiCodexPlatform, SRC.fowler, SRC.orangeBook],
};

export default ch09;

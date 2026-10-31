import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch04: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '缰绳不是一根绳子，是五根。OpenAI 用四个动词概括，Martin Fowler 拆成三块，Anthropic 走多智能体路线——看似各说各话，其实在描述同一头大象。本章把它们揉成一张最适合动手的图：指令、约束、反馈、记忆、编排。',
        en: 'A harness is not one rein but five. OpenAI summarises it in four verbs, Fowler in three pillars, Anthropic through multi-agents—different cuts of the same elephant. This chapter merges them into the most hands-on cut: instructions, constraints, feedback, memory, orchestration.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '说「五个」而不是三个或四个，不是因为五个更正确，而是这个颗粒度刚好对应五种实现手段、五种失效方式，也因此能对应五种待办事项。读完你应该能回答两个问题：我现在缺哪一层，以及先补哪一层最划算。',
        en: 'Five rather than three or four is not a claim of correctness but of granularity: five layers map to five implementation means, five failure modes and therefore five to-do lists. By the end you can answer two questions—which layer am I missing, and which one pays first.',
      },
    },

    { type: 'h2', id: 'diagram', text: { zh: '全景图', en: 'The whole picture' } },
    {
      type: 'chart',
      chart: 'layers',
      title: { zh: 'Harness 五层结构', en: 'The five-layer harness' },
      note: {
        zh: '指令与约束在 Agent 行动之前就位（输入端），反馈发生在行动过程中，记忆跨会话时间，编排跨并行空间。',
        en: 'Instructions and constraints are in place before the agent acts (input side); feedback runs during action, memory spans sessions, orchestration spans parallel workers.',
      },
    },

    { type: 'h2', id: 'layer-jobs', text: { zh: '逐层职责：一句话 + 一个判据', en: 'Each layer: one line, one test' } },
    {
      type: 'table',
      head: [
        { zh: '层', en: 'Layer' },
        { zh: '它解决的问题', en: 'Problem it solves' },
        { zh: '典型实现', en: 'Typical implementation' },
        { zh: '缺失时的表现', en: 'Symptom when missing' },
      ],
      rows: [
        [
          { zh: '指令', en: 'Instructions' },
          { zh: 'Agent 不知道自己在哪里、该守什么规矩', en: 'The agent does not know where it is or which rules apply' },
          { zh: 'CLAUDE.md / AGENTS.md / .cursor/rules', en: 'CLAUDE.md / AGENTS.md / .cursor/rules' },
          { zh: '每次都要重新解释项目；写作文件被存进 iOS 目录', en: 'Re-briefing every session; writing files landing in the iOS folder' },
        ],
        [
          { zh: '约束', en: 'Constraints' },
          { zh: '建议会被忽略，法律不会', en: 'Advice gets ignored; law does not' },
          { zh: 'Hooks、自定义 Linter、结构测试、沙箱', en: 'Hooks, custom linters, structural tests, sandbox' },
          { zh: '「编辑前先 lint」它有时听有时不听', en: '"Lint before editing" is obeyed roughly half the time' },
        ],
        [
          { zh: '反馈', en: 'Feedback' },
          { zh: 'AI 最大的问题不是写错，是以为自己写对了', en: 'The real problem is not wrong code but believed-correct code' },
          { zh: '测试、Evaluator Agent、DOM 快照、日志查询', en: 'Tests, evaluator agents, DOM snapshots, log queries' },
          { zh: '重读自己的代码，觉得看着没问题就收工', en: 'It rereads its output, shrugs, and stops' },
        ],
        [
          { zh: '记忆', en: 'Memory' },
          { zh: '没有记忆就是金鱼，同一件事犯三遍', en: 'Without memory it is a goldfish, repeating the same mistake thrice' },
          { zh: '指令文件、auto-memory、ExecPlan、结构化笔记', en: 'Instruction files, auto-memory, ExecPlan, structured notes' },
          { zh: '每个新会话都要重讲一遍架构和偏好', en: 'Every fresh session re-lectures you on the architecture' },
        ],
        [
          { zh: '编排', en: 'Orchestration' },
          { zh: '一个窗口装不下的任务，怎么让多个 Agent 安全并行', en: 'How to run several agents safely when one window is too small' },
          { zh: 'Subagents、Agent Teams、Middleware、git worktrees', en: 'Subagents, agent teams, middleware, git worktrees' },
          { zh: '三个 Agent 互相开会对齐，产出不如一个认真写测试的', en: 'Three agents hold alignment meetings; one with tests ships more' },
        ],
      ],
      caption: {
        zh: '每一行的最后一列是最好的自检入口：如果你在项目里认出了那个症状，那层就是你的欠债。',
        en: 'The last column is the self-test: recognise the symptom in your own repo and you have found your debt.',
      },
    },
    { type: 'sources', items: [SRC.orangeBook, SRC.openaiHarness, SRC.anthropicClaudeCode] },

    { type: 'h2', id: 'one', text: { zh: '组件一 · 指令：把意图编码成可读规则', en: 'Layer 1 · Instructions: encoding intent as readable rules' } },
    {
      type: 'p',
      text: {
        zh: '最基础的一层，也是各家名字不同本质相同的一层：Claude Code 叫 CLAUDE.md，Codex CLI 叫 AGENTS.md（对应开放标准见文末来源），Cursor 叫 .cursorrules，Windsurf 叫 .windsurfrules。本质都是用 Markdown 把你的意图编码成 Agent 可读的规则。三种代表性做法：Boris Cherny 的 100 行哲学（每一行都问「删掉它会导致模型犯错吗？不会就删」）、OpenAI 的「给地图不给说明书」（约 100 行展示结构、文件关系与关键约束，用指针指向深层文档）、Mitchell Hashimoto 的「犯错才加规则」（文件在交互中自然生长）。',
        en: 'The most basic layer, and the one every tool renames: CLAUDE.md in Claude Code, AGENTS.md in Codex CLI, .cursorrules in Cursor, .windsurfrules in Windsurf. All of them encode your intent as Markdown rules the agent can read. Three representative stances: Boris Cherny’s 100-line philosophy (ask of every line "would deleting this cause a mistake? if not, delete it"), OpenAI’s map-not-manual AGENTS.md (~100 lines of structure, relationships and key constraints, with pointers deeper), and Hashimoto’s one-mistake-one-rule (the file grows through interaction).',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '共通的那条逻辑', en: 'The shared logic' },
      text: {
        zh: '三种做法看起来分歧，逻辑一致：指令不是写一次就完的文档，而是持续演化的工程制品。Boris 的说法更直接——这是复利工程，早写的每一行规则会在后面每一次会话里持续收息。',
        en: 'The stances diverge in style but agree in logic: an instruction file is not a document you finish, it is an engineering artefact that keeps evolving. Boris is blunter—it is compound engineering, every line paying interest in every later session.',
      },
    },

    { type: 'h2', id: 'two', text: { zh: '组件二 · 约束：缩小解空间反而提升产出', en: 'Layer 2 · Constraints: narrower space, better output' } },
    {
      type: 'p',
      text: {
        zh: '指令是建议，约束是法律。区别在于：指令说「请注意代码规范」，约束是代码不合规就编译不过。OpenAI 把这层拆成两个动词——constrain（事前拦截）与 correct（事后修复）。实现上最硬的约束是自定义 Linter 和结构测试：Codex 团队在 CI 里配了自定义 ESLint 规则，坏模式在静态层面根本不可能出现；有意思的是这些 Linter 本身也是 Codex 写的，AI 写规则约束 AI，有点递归的味道。',
        en: 'Instructions advise, constraints legislate. The difference: advice says "please follow the style"; law is that non-compliant code will not compile. OpenAI splits this into two verbs—constrain (block beforehand) and correct (repair after). The hardest implementation is custom linters and structural tests: the Codex team wired bespoke ESLint rules into CI so bad patterns cannot even be expressed statically. The twist—those linters were themselves written by Codex. AI writing the rules that bind AI.',
      },
    },
    {
      type: 'code',
      lang: 'jsonc',
      title: {
        zh: '同一句「建议」的两种写法：文档里的一句话 vs 程序级拦截',
        en: 'The same "advice" written two ways: a sentence vs a program-level block',
      },
      code: `// 建议（指令层）——模型可能听，也可能不听
// "编辑文件前请先运行 lint 检查"

// 约束（Claude Code Hooks）——不合规就不让过，没有商量余地
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "python3 .claude/hooks/protect-paths.py",
            "timeout": 10
          }
        ]
      }
    ]
  }
}

// Codex CLI 走沙箱路线：默认只能写工作区内文件，网络访问关闭，
// .git/ 与 .codex/ 即使开启全权限模式也动不了。`,
    },
    {
      type: 'quote',
      text: {
        zh: 'Increasing AI autonomy requires decreasing solution space flexibility.',
        en: 'Increasing AI autonomy requires decreasing solution space flexibility.',
      },
      cite: {
        zh: 'Birgitta Boeckeler（Thoughtworks Distinguished Engineer）评 OpenAI 案例',
        en: 'Birgitta Boeckeler (Thoughtworks Distinguished Engineer) on the OpenAI case',
      },
    },
    {
      type: 'p',
      text: {
        zh: '这是本层最反直觉的一句：想让它更自主，先给它更少自由。解空间越大，Agent 越容易走到你没预料的方向；结构确定以后，多余的智力就能用在真正难的地方。Fowler 把约束归进他的第二块「架构约束」，并强调在 Agent 编码时代，清晰的依赖层从「好实践」变成了**早期前提条件**——没有它，Agent 会在第一周就把四层依赖写成环。',
        en: 'This is the counter-intuitive core: more autonomy demands less freedom. The wider the solution space, the further the agent wanders from what you did not anticipate; once structure is fixed, surplus intelligence goes to genuinely hard problems. Fowler files this under "architectural constraints" and notes that in the agentic era clean dependency layers moved from good practice to **precondition**—without them the agent writes a dependency cycle in week one.',
      },
    },

    { type: 'h2', id: 'three', text: { zh: '组件三 · 反馈：谁都不擅长批评自己的作品', en: 'Layer 3 · Feedback: nobody critiques their own work well' } },
    {
      type: 'p',
      text: {
        zh: 'LangChain 在 Terminal Bench 2.0 上发现最常见的失败模式是：Agent 写完方案后重新读自己的代码，觉得看起来没问题，就停了——没跑测试，没验边界。模型对第一个可行方案有天然偏好，它不是不能做得更好，是太容易满足于「看起来可以」。Anthropic 的回应是 Planner / Generator / Evaluator 三智能体架构，核心洞察只有一句：**工程化一个严厉的独立评估者，远比教一个生成者自我批判容易。**',
        en: 'LangChain’s runs on Terminal Bench 2.0 found the most common failure: the agent finishes, rereads its own code, decides it looks fine, and stops—no test run, no edge case checked. Models prefer their first viable plan; not incapable of better, just too easily satisfied. Anthropic’s answer is the Planner / Generator / Evaluator architecture, resting on one insight: **it is far easier to engineer a strict independent evaluator than to teach a generator self-criticism.**',
      },
    },
    {
      type: 'list',
      items: [
        {
          zh: '给 Agent「眼睛」：OpenAI 集成 Chrome DevTools Protocol 做 DOM 快照与截图，接入可观测性数据让 Agent 直接查日志和指标。「启动时间低于 800ms」从文档里的愿望变成可执行指令，这套反馈循环让单次任务能持续运行 6 小时以上。',
          en: 'Give the agent eyes: OpenAI wired Chrome DevTools Protocol for DOM snapshots and screenshots plus observability data so agents query logs and metrics. "Startup under 800ms" stopped being a wish and became an executable instruction—and this loop lets a single task run six hours or more.',
        },
        {
          zh: '最省钱的反馈是「开一个新会话」：把 diff 和验收标准交给没有历史的 Agent，它不会继承生成者的自我偏好。Boris 的第一条建议同义——给 Agent 验证手段，最终质量能提升 2–3 倍。',
          en: 'The cheapest feedback is a fresh session: hand the diff and acceptance criteria to an agent with no history, so it cannot inherit the generator’s preference for its own first draft. Boris’s first rule says the same—give the agent means of verification and final quality improves two to three times over.',
        },
        {
          zh: 'Fowler 的「垃圾回收」是更慢周期的反馈：专门有个 Agent 定期运行，不写代码不做功能，只找文档矛盾与架构违规。一个专职找茬的 AI。',
          en: 'Fowler’s "garbage collection" is slower-cadence feedback: a dedicated agent runs periodically, writes no features, and hunts documentation contradictions and architecture violations. A full-time AI nitpicker.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: 'Boeckeler 指出的盲区', en: 'The blind spot Boeckeler flagged' },
      text: {
        zh: 'OpenAI 的 Harness 约束了代码怎么写、怎么组织，但没有验证代码是否真的做了用户需要的事——只覆盖内部质量，忽略功能正确性。这和「Agent 不验证」是同一个问题的两面：反馈层必须有一端连着真实世界，否则你只是在优雅地自我循环。',
        en: 'OpenAI’s harness constrained how code was written and organised but never verified that the code did what users needed—internal quality without functional correctness. That is the flip side of "agents skip verification": a feedback layer must have one end attached to the real world, or you are just circling yourself elegantly.',
      },
    },

    { type: 'h2', id: 'four', text: { zh: '组件四 · 记忆：Agent 看不到的东西等于不存在', en: 'Layer 4 · Memory: what the agent cannot see does not exist' } },
    {
      type: 'p',
      text: {
        zh: '记忆有三层。**静态记忆**是指令文件本身——Boris 的团队在 PR 里用 @.claude 标签更新 CLAUDE.md，每条新增规则都是 Agent 过去犯错的制度化记录。**动态记忆**是工具自动保存的观察：Claude Code 的 auto-memory、Windsurf 的 Cascade Memories、Cline 通过 MCP 实现的 Memory Bank。**结构化笔记**最精妙：Anthropic 发现让 Agent 在上下文窗口之外维护持久笔记，是非常有效的压缩手段——Claude 玩 Pokémon 时维护步骤计数笔记就是标志案例。',
        en: 'Memory has three tiers. **Static memory** is the instruction file itself—Boris’s team updates CLAUDE.md via an @.claude label on PRs, so every added rule is an agent’s past mistake turned into policy. **Dynamic memory** is what tools save automatically: Claude Code’s auto-memory, Windsurf’s Cascade Memories, Cline’s MCP-backed Memory Bank. **Structured notes** are the subtlest: Anthropic found persistent notes maintained outside the window are a highly effective form of compression—the canonical example being Claude keeping a step counter while playing Pokémon.' },
    },
    {
      type: 'p',
      text: {
        zh: 'OpenAI 把记忆归进「告知（inform）」这个动词，并给出一个极端的执行标准：仓库必须是唯一的真相来源。Google Docs 里的规划文档迁进代码仓库，Slack 里的决策转成 Markdown 存入 repo，创建叫 ExecPlan 的自包含设计文档。理由朴素——Agent 看不到的东西等于不存在。但记忆不是越多越好，Anthropic 的定义值得贴在显示器边上：找到**最小的高信号 token 集合**，最大化期望结果的可能性。',
        en: 'OpenAI folds memory into the verb "inform" with an extreme standard: the repository must be the single source of truth. Planning docs migrated out of Google Docs into the repo, Slack decisions converted to Markdown, self-contained design documents called ExecPlans. The reasoning is blunt—what the agent cannot see does not exist. But memory is not additive for its own sake; Anthropic’s definition is worth pinning to your monitor: find the **smallest set of high-signal tokens** that maximises the likelihood of the desired outcome.',
      },
    },

    { type: 'h2', id: 'five', text: { zh: '组件五 · 编排：单个 Agent 装不下的时候', en: 'Layer 5 · Orchestration: when one agent is not enough' } },
    {
      type: 'p',
      text: {
        zh: '前四层是单个 Agent 的缰绳；任务复杂到需要协作时，编排才登场。四种植物形态：Anthropic 的三智能体架构（Planner 扩展规格、Generator 实现、Evaluator 跑端到端测试，Sprint Contract 让双方先对齐「完成」再开工）；Claude Code 的两种原生机制（Subagents 跑在独立上下文窗口里、探索完只回传精简摘要，Agent Teams 是实验性功能、多个实例各有窗口、一个会话当 team lead 分派、成员之间可直接通信）；LangChain 的 Middleware 提供六个 Hook 点，让关注点与核心 Agent 代码解耦；以及 Boris 最朴素的一版——拿人当编排器，一个人同时带十几个 Claude Code 会话，他说这是团队最大的生产力解锁。',
        en: 'The first four layers serve one agent; orchestration arrives when work needs company. Four shapes: Anthropic’s three-agent architecture (Planner expands the spec, Generator implements, Evaluator runs end-to-end tests, with a Sprint Contract aligning "done" before code); Claude Code’s two native mechanisms (Subagents in isolated windows returning only a distilled summary, and experimental Agent Teams where multiple instances keep their own windows and one session acts as team lead while teammates message each other); LangChain’s Middleware with six hook points that decouple concerns from core agent code; and Boris’s plainest version—be the orchestrator, run a dozen Claude Code sessions at once, which he calls the team’s biggest productivity unlock.',
      },
    },

    { type: 'h2', id: 'crossmap', text: { zh: '三种切法的对照表', en: 'Cross-mapping the three frameworks' } },
    {
      type: 'table',
      head: [
        { zh: '五组件模型', en: 'Five-layer model' },
        { zh: 'OpenAI 四动词', en: 'OpenAI’s four verbs' },
        { zh: 'Fowler 三支柱', en: 'Fowler’s three pillars' },
        { zh: '典型实现', en: 'Typical implementation' },
      ],
      rows: [
        [{ zh: '指令', en: 'Instructions' }, { zh: '告知 inform', en: 'inform' }, { zh: '上下文工程', en: 'Context engineering' }, { zh: 'CLAUDE.md / AGENTS.md / .cursorrules', en: 'CLAUDE.md / AGENTS.md / .cursorrules' }],
        [{ zh: '约束', en: 'Constraints' }, { zh: '约束 constrain', en: 'constrain' }, { zh: '架构约束', en: 'Architectural constraints' }, { zh: 'Hooks / Linter / 沙箱 / CI', en: 'Hooks / linters / sandbox / CI' }],
        [{ zh: '反馈', en: 'Feedback' }, { zh: '验证 verify', en: 'verify' }, { zh: '垃圾回收', en: 'Garbage collection' }, { zh: 'Evaluator / 测试 / 可观测性', en: 'Evaluators / tests / observability' }],
        [{ zh: '记忆', en: 'Memory' }, { zh: '告知 inform', en: 'inform' }, { zh: '上下文工程', en: 'Context engineering' }, { zh: '知识库 / auto-memory / ExecPlan', en: 'Knowledge base / auto-memory / ExecPlan' }],
        [{ zh: '编排', en: 'Orchestration' }, { zh: '纠正 correct（勉强沾边）', en: 'correct (loosely)' }, { zh: '未覆盖', en: 'Not covered' }, { zh: '多智能体 / 流水线 / Middleware', en: 'Multi-agent / pipeline / middleware' }],
      ],
    },
    {
      type: 'list',
      items: [
        {
          zh: 'OpenAI 的「告知」同时覆盖指令与记忆：在他们的框架里两者不区分，Agent 看不到的东西等于不存在，不管是规则还是知识。实操中两者的管理逻辑完全不同——规则要薄、要稳定，知识要可检索、要能过期——拆开更好用。',
          en: 'OpenAI’s "inform" covers both instructions and memory: in their frame they are undifferentiated, since invisible means nonexistent whether it is a rule or a fact. In practice the two are managed very differently—rules stay thin and stable, knowledge stays searchable and perishable—so separating them is more useful.',
        },
        {
          zh: 'Fowler 的「垃圾回收」对应反馈但含义更窄：他关心代码库层面的熵增（文档过时、架构违规累积），Anthropic 的 Evaluator 关心功能层面的正确性。都是反馈，层次不同。',
          en: 'Fowler’s "garbage collection" maps to feedback but is narrower: he means repo-level entropy (stale docs, drifting architecture), while Anthropic’s Evaluator means functional correctness. Both feedback, different altitudes.',
        },
        {
          zh: '编排是 OpenAI 和 Fowler 都没显式覆盖的维度，这本身反映了一个事实：多智能体编排到 2026 年初仍是实验阶段，主流框架还没完全吸收它。',
          en: 'Orchestration is the dimension neither OpenAI nor Fowler covers explicitly, which is itself data: multi-agent orchestration was still experimental as of early 2026, not yet absorbed into mainstream frameworks.',
        },
      ],
    },

    { type: 'h2', id: 'order', text: { zh: '搭建顺序：Harness 是长出来的，不是设计出来的', en: 'Build order: harnesses grow, they are not designed' } },
    {
      type: 'p',
      text: {
        zh: '五层有依赖顺序，不是同时上。第 15 章会给出一份从空文件到十条规则的完整演练，这里先给判断表。',
        en: 'The layers have a dependency order; they do not arrive simultaneously. Chapter 15 is the full drill from empty file to ten rules—here is the decision table.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '阶段', en: 'Stage' },
        { zh: '上什么', en: 'Add' },
        { zh: '触发信号', en: 'Trigger signal' },
        { zh: '成本直觉', en: 'Cost sense' },
      ],
      rows: [
        [
          { zh: '第 1 天', en: 'Day 1' },
          { zh: '指令 + 基本反馈', en: 'Instructions + basic feedback' },
          { zh: '你开始用 Agent 改这个仓库', en: 'You start letting an agent touch this repo' },
          { zh: '一个 30–100 行文件 + 一条测试命令', en: 'A 30–100 line file plus one test command' },
        ],
        [
          { zh: '第一次被搞烦', en: 'First real annoyance' },
          { zh: '约束', en: 'Constraints' },
          { zh: '「说了它也不听」出现第二次', en: '"It ignored the rule" happens twice' },
          { zh: '一个几十行的 Hook 脚本，一次写完长期生效', en: 'A few dozen lines of hook script, written once, working forever' },
        ],
        [
          { zh: '重复解释时', en: 'Repeated briefing' },
          { zh: '记忆', en: 'Memory' },
          { zh: '你受够了每次重讲同一套偏好', en: 'You are exhausted from re-explaining the same preferences' },
          { zh: '从结构化笔记开始，比向量库便宜一个数量级', en: 'Start with structured notes—orders of magnitude cheaper than a vector store' },
        ],
        [
          { zh: '确实一个搞不定', en: 'Genuinely too big for one' },
          { zh: '编排', en: 'Orchestration' },
          { zh: '任务可切成互不依赖的单元，或需要独立视角审查', en: 'Work splits into independent units, or needs an independent reviewer' },
          { zh: '最贵：通信成本、冲突、可观测性都要重算', en: 'The expensive one: comms, conflicts and observability all get repriced' },
        ],
      ],
      caption: {
        zh: '顺序错了最常见的后果不是不工作，是你维护一套没人需要的框架，而真正会救命的约束还没写。',
        en: 'Getting the order wrong rarely means "it does not work"; it means you maintain a framework nobody needed while the constraint that would have saved you is still unwritten.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '本章的一句话总结', en: 'This chapter in one line' },
      text: {
        zh: '指令告诉它做什么，约束拦住它做错，反馈检查它做对没，记忆让它不重复犯错，编排让多个它协作。前五层里，只有编排是可以晚点的。',
        en: 'Instructions say what to do, constraints block the wrong move, feedback checks it worked, memory stops repetition, orchestration lets many of them collaborate. Of the five, only orchestration may legitimately wait.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '五层在别处的深度版本', en: 'Deeper versions of each layer' },
      items: ['better-agent', 'agent-memory-patterns', 'agent-observability-patterns', 'mcp-patterns'],
    },
  ],
  sources: [SRC.orangeBook, SRC.openaiHarness, SRC.anthropicHarnessDesign, SRC.anthropicContext, SRC.fowler, SRC.agentsMd, SRC.langchainMiddleware],
};

export default ch04;

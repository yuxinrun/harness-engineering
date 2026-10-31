import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch07: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '指令和约束管的是「出手前要守什么规矩」，反馈和记忆管的是「出手后怎么知道自己对不对」和「下次怎么不再犯」。两层合起来，就是 Agent 的复盘能力——也是它从「每次都是新人」变成「会成长的协作者」的唯一路径。',
        en: 'Instructions and constraints govern behaviour before the act; feedback and memory govern knowing whether it worked and not repeating it. Together they are the agent’s capacity for reflection—the only path from "forever a newcomer" to "a collaborator who improves".',
      },
    },

    { type: 'h2', id: 'problem', text: { zh: '先承认问题：AI 最大的毛病不是写错，是以为写对了', en: 'The problem: it does not write wrong code, it writes code it believes is right' } },
    {
      type: 'p',
      text: {
        zh: 'LangChain 在 Terminal Bench 2.0 的测试里发现最高频的失败模式是：Agent 写完方案后重新读一遍自己的代码，觉得看起来没问题，就停了。没运行测试，没验证边界情况。模型对第一个可行方案有天然偏好——它不是不会做得更好，是太容易满足于「看起来可以」。所以解法不是换一个更聪明的模型，而是给它另一双眼睛。',
        en: 'LangChain’s runs on Terminal Bench 2.0 found the dominant failure mode: the agent finishes, rereads its own code, judges it fine, and stops—no test, no edge case. Models prefer their first viable plan; they are not incapable of better, merely too easily satisfied. So the fix is not a cleverer model but a second pair of eyes.',
      },
    },

    { type: 'h2', id: 'gan', text: { zh: 'GAN 的直觉：为什么要分离角色', en: 'The GAN intuition: why roles must be separated' } },
    {
      type: 'quote',
      text: {
        zh: '工程化一个严厉的独立评估者，远比教一个生成者自我批判容易得多。分离角色创造了对抗性动态，怀疑论的 Evaluator 提供批判性反馈，帮助 Generator 突破瓶颈。',
        en: 'Engineering a strict independent evaluator is far easier than teaching a generator to self-criticise. Separating roles creates an adversarial dynamic; a sceptical evaluator supplies the critical feedback that pushes the generator past its stalls.',
      },
      cite: { zh: 'Anthropic · 长运行 Agent 的 Harness 设计', en: 'Anthropic · harness design for long-running agents' },
    },
    {
      type: 'p',
      text: {
        zh: 'Anthropic 的三智能体架构灵感直接来自生成对抗网络：Planner 把简单指令扩展成详细规格，Generator 一次做一个功能，Evaluator 像真人 QA 一样与运行中的应用交互。原始模型当评估者表现很差——太宽容，容易说服自己「这个 bug 不严重」；换成一个独立的、专门挑刺的评估者，效果完全不同。谁都不擅长批评自己的作品，AI 也一样。',
        en: 'The three-agent design borrows straight from GANs: a Planner expands a short brief into a detailed spec, a Generator implements one feature at a time, an Evaluator drives the running app like a human QA. The raw model makes a poor evaluator—permissive, quick to persuade itself the bug is minor. Swap in an independent, adversarial role and the outcome changes completely. Nobody critiques their own work well, and AI is no exception.',
      },
    },

    { type: 'h2', id: 'eyes', text: { zh: '给评估者装上眼睛：验证而不是点评', en: 'Give the evaluator eyes: verify, do not opine' } },
    {
      type: 'p',
      text: {
        zh: 'Evaluator 不是一个会说「这个看起来不错」的 AI，它必须能真的验证。三条被反复验证的实现路径：',
        en: 'An evaluator is not an AI that says "looks good"; it must actually verify. Three well-proven ways to give it that ability:',
      },
    },
    {
      type: 'list',
      items: [
        {
          zh: '操作真实应用：Anthropic 用 Playwright MCP 让 Evaluator 打开页面、点按钮、填表单、看数据是否按预期更新——像人类 QA 一样，不是读代码，是**用**代码。',
          en: 'Drive the real app: Anthropic wires Playwright MCP so the evaluator opens pages, clicks, fills forms and checks that data updates as expected—like a human QA, not reading the code but *using* it.',
        },
        {
          zh: '看得到运行时：OpenAI 把 Codex Agent 连上 Chrome DevTools Protocol，改完代码自己启动实例，比对修改前后的截图和日志。「启动时间低于 800ms」从文档里的愿望变成 Agent 可以自己验证的硬指标。',
          en: 'See the runtime: OpenAI connected its agents to the Chrome DevTools Protocol, so after an edit the agent boots its own instance and diffs screenshots and logs. "Startup under 800ms" stopped being a wish in a document and became a metric the agent can check itself.',
        },
        {
          zh: '查得到数据：每个 git worktree 配套一个临时的 VictoriaLogs + VictoriaMetrics 栈，Agent 直接用 LogQL 查日志、PromQL 查指标。',
          en: 'Query the data: every git worktree gets a throwaway VictoriaLogs + VictoriaMetrics stack, so the agent queries logs in LogQL and metrics in PromQL.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '共通原则', en: 'The shared principle' },
      text: {
        zh: 'Agent 看不到的东西等于不存在。反馈层的核心设计问题不是「要不要让 AI 审代码」，而是「怎么让 AI 看到真实发生了什么」。只给它读代码的权限，你得到一个很会恭维的评论家；给它运行、截图、查日志的能力，你才得到一个测试工程师。',
        en: 'What the agent cannot see does not exist. The design question is not "should AI review code" but "how does AI see what really happened". Give it read-only access and you get a flattering critic; give it the ability to run, screenshot and query logs and you get a test engineer.',
      },
    },
    { type: 'sources', items: [SRC.anthropicHarnessDesign, SRC.openaiHarness, SRC.langchainBlog] },

    { type: 'h2', id: 'mvp', text: { zh: '反馈层的最小可行版：开一个新对话', en: 'The minimum viable feedback loop: open a new chat' } },
    {
      type: 'p',
      text: {
        zh: '三智能体架构听着很重，但它的最小起步版本非常轻：**写完一段代码，开一个全新会话，把代码贴进去，说「找出所有问题」。** 新上下文的模型对你刚写的代码没有感情包袱，能发现第一个模型漏掉的很多东西。Boris Cherny 给的量化结论是：给 Claude 一种验证自己工作的手段，只要它有反馈循环，最终结果质量能提升 2–3 倍。',
        en: 'The three-agent architecture sounds heavy; its entry version is trivially light: **finish the code, open a brand-new session, paste it in and say "find every problem".** A model with no history has no emotional stake in your draft and catches what the first one waved through. Boris Cherny puts the number on it: give the agent a way to verify its own work and, with that feedback loop, final quality improves two to three times over.',
      },
    },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '会话 A：生成', en: 'Session A · generate' },
          text: {
            zh: '正常开发。要求它在交付前自己跑一遍测试命令，并把「跑了什么、结果是什么」写进回复。没跑测试的交付一律退回。',
            en: 'Work normally, but require it to run the test commands before delivery and report what it ran and what came back. Deliveries without an executed test go straight back.' },
        },
        {
          title: { zh: '会话 B：审查（新窗口，无历史）', en: 'Session B · review (fresh window, no history)' },
          text: {
            zh: '只给它 diff 和验收标准，不给对话历史。问句要具体：「按这份验收标准逐条判定，指出不满足的、边界未覆盖的、以及可能被删掉的安全检查」。',
            en: 'Give it only the diff and the acceptance criteria, never the transcript. Ask precisely: "judge each criterion, then list unmet ones, uncovered edge cases, and any safety check that got deleted."' },
        },
        {
          title: { zh: '把 B 的结论变成 A 的新规则', en: 'Turn B’s findings into a new rule for A' },
          text: {
            zh: '同一类问题出现两次，就写进指令文件或做成 Hook。这一步是反馈层与记忆层的接缝——没有它，你只是在无限重复审查。',
            en: 'When the same class of issue appears twice, write it into the instruction file or make it a hook. This seam between feedback and memory is what stops review from being infinite repetition.' },
        },
      ],
    },

    { type: 'h2', id: 'memory', text: { zh: '记忆层：没有记忆就是金鱼', en: 'Memory: no memory, just a goldfish' } },
    {
      type: 'p',
      text: {
        zh: '反馈解决「这次对不对」，记忆解决「下次怎么不再犯」。同一句话解释三遍、同一类错误犯三次，是绝大多数人放弃 Agent 的真实原因。2026 年初各家能力差距极大：只有三个工具有动态记忆，其余全靠人工维护静态文件——**AI 自己决定什么值得记 / 通过工具显式管理 / 靠人手动更新文件**，三层能力一眼高下。',
        en: 'Feedback answers "was this run correct", memory answers "how do we not repeat it". Explaining the same sentence three times and watching the same mistake three times is the real reason people abandon agents. Capabilities in early 2026 diverged sharply: only three tools had dynamic memory, the rest rely on humans maintaining static files. The three tiers—**the model decides what is worth keeping / explicit tool-managed memory / hand-edited instruction files**—make the gap obvious at a glance.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '工具', en: 'Tool' },
        { zh: '自动记忆', en: 'Automatic memory' },
        { zh: '手动记忆', en: 'Manual memory' },
        { zh: '跨会话持久化', en: 'Cross-session persistence' },
      ],
      rows: [
        [{ zh: 'Claude Code', en: 'Claude Code' }, { zh: 'auto-memory（自动保存观察）', en: 'auto-memory (saves observations itself)' }, { zh: 'MEMORY.md + CLAUDE.md', en: 'MEMORY.md + CLAUDE.md' }, { zh: '是', en: 'Yes' }],
        [{ zh: 'Windsurf', en: 'Windsurf' }, { zh: 'Cascade Memories（自动生成）', en: 'Cascade Memories (generated)' }, { zh: 'Rules', en: 'Rules' }, { zh: '是', en: 'Yes' }],
        [{ zh: 'Cline', en: 'Cline' }, { zh: 'Memory Bank MCP（需配置）', en: 'Memory Bank MCP (configured)' }, { zh: '.clinerules', en: '.clinerules' }, { zh: '是', en: 'Yes' }],
        [{ zh: 'Codex CLI', en: 'Codex CLI' }, { zh: '无', en: 'None' }, { zh: 'AGENTS.md', en: 'AGENTS.md' }, { zh: '静态文件', en: 'Static files' }],
        [{ zh: 'Cursor', en: 'Cursor' }, { zh: '无', en: 'None' }, { zh: '.cursor/rules/', en: '.cursor/rules/' }, { zh: '静态文件', en: 'Static files' }],
        [{ zh: 'GitHub Copilot', en: 'GitHub Copilot' }, { zh: '无', en: 'None' }, { zh: 'instructions.md', en: 'instructions.md' }, { zh: '静态文件', en: 'Static files' }],
        [{ zh: 'Aider', en: 'Aider' }, { zh: '无', en: 'None' }, { zh: 'CONVENTIONS.md', en: 'CONVENTIONS.md' }, { zh: '静态文件', en: 'Static files' }],
      ],
    },
    {
      type: 'p',
      text: {
        zh: 'Claude Code 内部是三套机制互补：**auto-memory** 把有用的观察自动写进 \`~/.claude/projects/<hash>/memory/\`，不需要你说「记住这个」，它自己判断什么值得留下；**MEMORY.md** 是人手维护的长期记忆（工具偏好、项目背景、常犯的错、发布流程），每隔一段时间精简一轮、保持在 100 行以内；**CLAUDE.md 本身**是项目级记忆，Boris 的团队用 PR 上的 @.claude 标签更新它——每条新增规则都是 Agent 过去犯错的制度化记录，他管这叫复利工程。',
        en: 'Inside Claude Code three mechanisms complement each other: **auto-memory** writes useful observations to `~/.claude/projects/<hash>/memory/` without being told—the model decides what deserves to survive; **MEMORY.md** is human-curated long-term memory (tool preferences, project background, recurring mistakes, release ritual), trimmed periodically to stay under 100 lines; **CLAUDE.md itself** is project memory, updated by an @.claude label on PRs—every added rule is an agent’s past mistake written into policy, which Boris calls compound engineering.',
      },
    },

    { type: 'h2', id: 'notes', text: { zh: '结构化笔记：Claude 玩 Pokémon 给出的启示', en: 'Structured notes: the Pokémon lesson' } },
    {
      type: 'p',
      text: {
        zh: 'Anthropic 发现，让 Agent 在上下文窗口**之外**维护持久笔记，是一种极其有效的压缩手段。标志案例是 Claude 玩 Pokémon：连续玩几个小时后它维护了一份精确的步骤计数笔记——「过去 1,234 步我一直在 Route 1 训练宝可梦」。上下文重置后，它读取自己的笔记，无缝接上之前的训练序列。没有这份笔记，重置意味着角色在哪、做了什么、下一步目标全归零；有了它，Agent 相当于有了一本外挂工作日志。',
        en: 'Anthropic found that persistent notes maintained **outside** the context window are a remarkably effective compression technique. The signature case is Claude playing Pokémon: after hours of play it kept an exact step-count note—“for the past 1,234 steps I have been grinding on Route 1”. After a context reset it read its own note and resumed the training sequence seamlessly. Without the note a reset wipes who-where-what-next; with it the agent has an external work log.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '同一个思路直接搬到写代码：当前分支状态、已完成功能清单、待处理 bug、被否决的方案与原因。笔记是结构化、可查询、可持久化的——它不占上下文，但 Agent 需要时随时能读。',
        en: 'Port the idea to coding with no friction: current branch state, features completed, bugs outstanding, approaches already rejected and why. Notes are structured, queryable and durable—they cost no context until the moment the agent needs them.',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '一份可交给新会话的交接笔记', en: 'A handoff note any fresh session can use' },
      code: `# 任务状态（每次收尾更新，新会话先读这里）

- 分支：feat/export-retry（已 push，PR #412）
- 已完成：重试退避策略、幂等键复用、失败态 UI
- 未完成：并发导出限流（卡在需要 Redis 计数器）
- 已否决方案：用内存队列做限流——重启即丢，被 Evaluator 拦下
- 验证方式：\`pnpm test billing.retry\` + 手动跑一次 3 并发导出
- 下一步第一个动作：读 src/services/rateLimit.ts，确认它没有隐藏的全局状态`,
    },
    { type: 'sources', items: [SRC.anthropicContext, SRC.anthropicLongRunning, SRC.anthropicClaudeCode] },

    { type: 'h2', id: 'kb', text: { zh: '知识库与唯一真相来源', en: 'Knowledge bases and the single source of truth' } },
    {
      type: 'p',
      text: {
        zh: '记忆解决「Agent 记住什么」，知识库解决「Agent 去哪找专业知识」。可行的形态是一个带索引的目录，而不是一堆散文件：每次调研完一个主题，成果按分类保存，附来源 URL 和日期，Agent 写作时自动检索。**知识库不是堆资料，是给 Agent 准备一张随时能查的索引。**',
        en: 'Memory answers "what does the agent retain"; a knowledge base answers "where does it find expertise". The workable shape is an indexed directory, not a pile: each finished piece of research lands in a category with source URL and date, and the agent retrieves from it automatically. **A knowledge base is not a heap of material, it is an index the agent can query at will.**',
      },
    },
    {
      type: 'code',
      lang: 'text',
      title: { zh: '知识库目录形态', en: 'Directory shape' },
      code: `_knowledge_base/
├── INDEX.md          # 每个主题一行：标题、一句话摘要、更新日期、路径
├── 技术工具/
├── 行业人物/
├── 产品发布/
├── 报告资料/
└── 方法论/`,
    },
    {
      type: 'p',
      text: {
        zh: 'OpenAI 的做法更激进，也更能说明「记忆」的工程含义：创建叫 ExecPlan 的自包含设计文档，把 Google Docs 里的规划迁入代码仓库，Slack 里的决策转成 Markdown 存进 repo。**仓库必须是唯一的真相来源。** 理由不在洁癖，而在可见性——不在仓库里的东西，对 Agent 而言等于不存在。',
        en: 'OpenAI’s version is more aggressive and shows what "memory" means operationally: self-contained design documents called ExecPlans, planning migrated out of Google Docs into the repository, Slack decisions converted to Markdown and committed. **The repo must be the single source of truth.** Not fastidiousness but visibility: anything not in the repo does not exist for the agent.',
      },
    },

    { type: 'h2', id: 'budget', text: { zh: '上下文不是越多越好', en: 'Context is not free' } },
    {
      type: 'p',
      text: {
        zh: '记忆与知识库都在往窗口里塞东西，而 Anthropic 观察到 **context rot**：上下文 token 越多，模型准确回忆任意单条信息的能力越差；约 100 万 token 处存在明显性能天花板，超过后显著下降，不管技术上支持多大的窗口。三种应对策略各有适用场景：',
        en: 'Memory and knowledge bases both push tokens into the window, and Anthropic documented **context rot**: the more tokens in context, the worse the model is at accurately recalling any single one; a clear ceiling appears near one million tokens and performance degrades past it regardless of advertised window size. Three responses, each with its own case:',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '策略', en: 'Strategy' },
        { zh: '机制', en: 'Mechanism' },
        { zh: '适用', en: 'Use when' },
      ],
      rows: [
        [{ zh: '压缩 Compaction', en: 'Compaction' }, { zh: '总结早期对话，在缩短的历史上继续', en: 'Summarise early turns and continue on the shorter history' }, { zh: '连续性重要的长任务', en: 'Long tasks where continuity matters' }],
        [{ zh: '上下文重置 Context Reset', en: 'Context reset' }, { zh: '完全清空窗口，用结构化交接状态启动新会话', en: 'Clear the window, start fresh from a structured handoff' }, { zh: '出现上下文焦虑、上下文被失败方案污染', en: 'Context anxiety appears, or the window is polluted by failed attempts' }],
        [{ zh: '开新会话', en: 'New session' }, { zh: '任务切换时直接开新对话', en: 'Simply start a new chat on task switch' }, { zh: '不相关任务之间', en: 'Between unrelated tasks' }],
      ],
      caption: {
        zh: 'Claude Code 官方文档给的直觉判断很实用：如果修正超过两次还是错，清空重来比继续修正更好。',
        en: 'Claude Code’s docs give a usable heuristic: if two corrections still leave it wrong, clearing and restarting beats a third correction.',
      },
    },

    { type: 'h2', id: 'capability', text: { zh: '顺带说能力层：Skills、MCP 与工具设计', en: 'The capability layer in passing: skills, MCP, tool design' } },
    {
      type: 'p',
      text: {
        zh: '能力扩展其实可以单独成章，但它们更像给反馈层和记忆层提供抓手的工具。**Skills** 是 Claude Code 独有的无代码扩展：放在 \`.claude/skills/\` 下，每个是一个 \`.md\`，描述能力做什么、什么时候触发；平时不占上下文，模型按当前任务自动判断是否加载——写一个 Markdown 就能定义新能力，不需要 SDK。**MCP**（Model Context Protocol）负责连接外部世界，Claude Code、Cline、Windsurf 已原生支持，Block 的 Goose 通过它连到 3000+ 服务。',
        en: 'Capability extension could fill its own chapter, but it functions as the grip that feedback and memory hang on. **Skills** are Claude Code’s no-code extension point: each is one \`.md\` file under `.claude/skills/` describing what the capability does and when it triggers, dormant until the model decides to load it—defining a new ability costs a Markdown file, not an SDK. **MCP** (Model Context Protocol) wires the agent to the outside world; Claude Code, Cline and Windsurf support it natively, and Block’s Goose reaches 3,000-plus services through it.',
      },
    },
    {
      type: 'list',
      items: [
        {
          zh: '工具命名的 Anthropic 版本叫 ACI（Agent-Computer Interface）：名字让 AI 理解意图、参数描述清晰、一个工具只做一件事、错误信息告诉 Agent 到底哪里出了问题。',
          en: 'Anthropic’s version of tool design is the ACI (Agent-Computer Interface): names that reveal intent, clearly described parameters, one job per tool, and error messages that tell the agent exactly what went wrong.',
        },
        {
          zh: '工具多了以后，选择本身也要工程化。LangChain 的 LLMToolSelectorMiddleware 用一个快速 LLM 预筛当前任务真正需要的工具，避免把所有工具描述都塞进上下文——这是能力层与上下文预算的正面冲突点。',
          en: 'Once tools multiply, selection itself needs engineering. LangChain’s LLMToolSelectorMiddleware uses a fast model to prefilter the tools a task actually needs instead of dumping every description into context—the exact collision point between capability and context budget.',
        },
        {
          zh: '趋势判断：能力层的 MCP 在标准化，记忆层和反馈层还在各自为战。未来一年这两层会快速拉齐——没有记忆和反馈的 Agent 实在太痛了。',
          en: 'Where it is heading: MCP standardises the capability layer while memory and feedback remain fragmented. Those two will converge within a year—an agent without memory and feedback simply hurts too much to ship.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '两层合起来叫什么', en: 'What the two layers amount to' },
      text: {
        zh: '人类工程师几十年学会的一件事：犯错不可怕，不复盘才可怕。事故要写 postmortem，项目要做 retrospective，知识就是在这些复盘里沉淀的。反馈层让 Agent 当场知道错在哪，记忆层把「错在哪」变成持久化的教训——这两层合起来，就是 Agent 的复盘能力。',
        en: 'What decades of engineering taught humans: mistakes are cheap, unexamined mistakes are not. Incidents get post-mortems, projects get retrospectives, and knowledge precipitates out of that ritual. Feedback lets the agent discover the error now; memory converts it into a durable lesson. Together they are the agent’s capacity for reflection.' },
    },

    {
      type: 'siblings',
      title: { zh: '记忆与反馈的专门展开', en: 'Dedicated treatments of memory and feedback' },
      items: ['agent-memory-patterns', 'agent-evaluation-patterns', 'agent-observability-patterns', 'mcp-patterns'],
    },
  ],
  sources: [SRC.anthropicContext, SRC.anthropicHarnessDesign, SRC.openaiHarness, SRC.langchainMiddleware, SRC.anthropicClaudeCode, SRC.orangeBook],
};

export default ch07;

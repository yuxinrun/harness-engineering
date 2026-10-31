import type { Bi, Block } from '../lib/types';
import { SRC } from './sources';

export type Pattern = {
  id: string;
  icon: string;
  title: Bi;
  tagline: Bi;
  when: Bi;
  how: { title: Bi; text: Bi }[];
  example: { lang: 'markdown' | 'bash' | 'json' | 'text'; title: Bi; code: string };
  pitfall: Bi;
  chapter: string;
};

export const patterns: Pattern[] = [
  {
    id: 'map-pointers',
    icon: 'map',
    title: { zh: '地图与指针', en: 'Map & Pointers' },
    tagline: { zh: '入口文件只当地图，专业知识按需指路。', en: 'Keep the entry file a map; point to deeper docs on demand.' },
    when: {
      zh: '项目有多个模块、多套规范，或者同时管多种工作区。一个平铺的巨型指令文件会让 AI 忽略真正重要的规则。',
      en: 'Use it when a project has many modules, rule sets or workspaces. A giant flat instruction file makes the model ignore what matters.',
    },
    how: [
      {
        title: { zh: '入口控制在 100 行内', en: 'Keep the entry under 100 lines' },
        text: {
          zh: '只放项目身份、核心命令、架构不变量，以及指向 docs/ 的指针。',
          en: 'Only identity, core commands, architectural invariants and pointers into docs/.',
        },
      },
      {
        title: { zh: '按任务路由', en: 'Route by task' },
        text: {
          zh: '用一张小表把任务类型映射到子目录规则；任务模糊就追问，不要猜。',
          en: 'Map task types to sub-directory rules with a small table; ask when ambiguous.',
        },
      },
      {
        title: { zh: '让深层文档可验证', en: 'Make deep docs verifiable' },
        text: {
          zh: '每个指针都要指向真实存在、可运行、有维护者的文档，而不是愿望清单。',
          en: 'Every pointer must resolve to real, maintained, runnable documentation, not a wish list.',
        },
      },
    ],
    example: {
      lang: 'markdown',
      title: { zh: '根 CLAUDE.md：只做路由', en: 'Root CLAUDE.md: routing only' },
      code: `# 工作区路由

收到任务后，先判断工作区，再读取对应规则：

| 关键词 | 工作区 | 读取文件 |
| --- | --- | --- |
| 组件、页面、样式 | 前端 | ./web/CLAUDE.md |
| API、数据库、迁移 | 后端 | ./api/CLAUDE.md |
| 文案、发布 | 内容 | ./content/CLAUDE.md |

任务模糊 → 先问一个澄清问题
涉及多个工作区 → 依次读取，不要合并规则`,
    },
    pitfall: {
      zh: '路由表写得像目录索引，却没有真正的子文档。AI 顺着指针找过去，发现是空文件——比不写更糟。',
      en: 'A router pointing to empty docs is worse than no router. The agent follows the pointer and finds nothing.',
    },
    chapter: 'ch05',
  },
  {
    id: 'one-mistake-one-rule',
    icon: 'repeat',
    title: { zh: '犯错驱动迭代', en: 'One Mistake, One Rule' },
    tagline: { zh: '别预设错误，等它发生，然后永久堵住。', en: 'Do not predict mistakes; wait for one, then close it permanently.' },
    when: {
      zh: '任何长期项目。尤其适合个体开发者：不需要基础设施，只需要一个打开的文件和一条纪律。',
      en: 'Any long-lived project, especially solo work: no infrastructure required, just an open file and discipline.',
    },
    how: [
      {
        title: { zh: '记录可复现的错', en: 'Record reproducible mistakes' },
        text: {
          zh: '只记录真正发生过的错。每条规则必须能对应一个具体场景，拒绝「以防万一」。',
          en: 'Only log mistakes that actually happened. Each rule maps to a concrete scenario; no just-in-case rules.',
        },
      },
      {
        title: { zh: '优先升级为硬约束', en: 'Escalate to hard constraints' },
        text: {
          zh: '如果同一个错第二次出现，别再写更长的提示词，写 Hook、Linter 或测试。',
          en: 'If the same mistake happens twice, stop writing longer prompts; add a hook, linter or test.',
        },
      },
      {
        title: { zh: '定期做减法', en: 'Prune regularly' },
        text: {
          zh: '模型升级或规则失效时，按「删掉它会导致犯错吗」逐条审查。',
          en: 'On model upgrades, audit each rule with one question: would deleting it cause a mistake?',
        },
      },
    ],
    example: {
      lang: 'markdown',
      title: { zh: '每条规则都有案发现场', en: 'Every rule has a crime scene' },
      code: `# 已知陷阱
- 只用 pnpm。npm 会生成 package-lock.json，与 pnpm-lock.yaml 冲突。
- 测试用 \`pnpm vitest run\`，不要用 \`npm test\`（脚本不存在）。
- 不要用 enum，用 literal union（team convention）。
- 不要直接 push main；先开 feature/ 分支。`,
    },
    pitfall: {
      zh: '把「犯错驱动」理解成「什么都往里塞」。规则没有案发现场，就会变成噪音，稀释真正有效的约束。',
      en: 'Mistaking mistake-driven for dump-everything. Rules without a crime scene become noise and dilute the useful ones.',
    },
    chapter: 'ch10',
  },
  {
    id: 'independent-evaluator',
    icon: 'shield-check',
    title: { zh: '独立评估者', en: 'Independent Evaluator' },
    tagline: { zh: '让另一个 AI 挑刺，而不是让作者自我表扬。', en: 'Let another AI attack the work, not the author praise it.' },
    when: {
      zh: '输出质量重要、验收标准可写清楚的任务：代码审查、全栈应用、长文档、迁移与重构。',
      en: 'When quality matters and acceptance criteria are writable: reviews, full-stack builds, long docs, migrations.',
    },
    how: [
      {
        title: { zh: '写清验收标准', en: 'Write acceptance criteria first' },
        text: {
          zh: '先对齐「完成」的定义，再开工。评估者只按标准打分，不凭感觉。',
          en: 'Agree on the definition of done before work starts; the evaluator scores against criteria, not vibes.',
        },
      },
      {
        title: { zh: '隔离上下文', en: 'Isolate context' },
        text: {
          zh: '评估者必须是新会话，看不到生成过程，避免被作者的思路带偏。',
          en: 'Review in a fresh session so the evaluator cannot inherit the generator’s framing.',
        },
      },
      {
        title: { zh: '给评估者工具', en: 'Give the evaluator tools' },
        text: {
          zh: '能跑测试就跑测试，能开浏览器就点页面。只读代码的评审会漏掉运行期问题。',
          en: 'Run the tests, click the UI. Code-only review misses runtime failures.',
        },
      },
    ],
    example: {
      lang: 'bash',
      title: { zh: '最小可行评估：新会话 + 明确标准', en: 'Minimum viable eval: fresh session + criteria' },
      code: `# 1. 生成者在自己的会话完成任务并提交
git add -A && git commit -m "feat: billing retry"

# 2. 开一个全新的 agent 会话，只给它 diff 和验收标准
git diff main...HEAD > /tmp/review.diff

claude -p "你是独立评审。只根据以下标准审查 diff：
1) 失败重试是否有上限？2) 是否有幂等保护？
3) 是否覆盖超时与部分失败？输出 BLOCKER/MAJOR/MINOR 清单。
diff: $(cat /tmp/review.diff)"`,
    },
    pitfall: {
      zh: '评估者和生成者共用同一个会话，还共享「我们做得很棒」的上下文。那不叫评审，叫互相点赞。',
      en: 'Sharing one session between generator and evaluator turns review into a mutual applause loop.',
    },
    chapter: 'ch11',
  },
  {
    id: 'writer-reviewer',
    icon: 'users',
    title: { zh: '写审分离', en: 'Writer & Reviewer' },
    tagline: { zh: '一个写，一个审；两个上下文，零感情包袱。', en: 'One writes, one reviews: two contexts, zero attachment.' },
    when: {
      zh: '日常开发里最划算的升级。不想搭多智能体系统，又想要独立评审时，用两个会话就够了。',
      en: 'The cheapest daily upgrade: independent review without building a multi-agent system.',
    },
    how: [
      {
        title: { zh: 'Writer 产出可审的东西', en: 'Writer produces something reviewable' },
        text: {
          zh: '要求 Writer 提交小步 diff、写清假设与验证命令，而不是一次性丢出 2000 行。',
          en: 'Ask for small diffs, explicit assumptions and verification commands, not a 2,000-line dump.',
        },
      },
      {
        title: { zh: 'Reviewer 只读不写', en: 'Reviewer reads, does not write' },
        text: {
          zh: '评审会话默认只读。先给问题清单，再让 Writer 修改，避免两个 agent 同时改代码。',
          en: 'Keep the reviewer read-only. It returns findings; the writer applies fixes, avoiding concurrent edits.',
        },
      },
      {
        title: { zh: '把结论写回规则', en: 'Feed findings back into rules' },
        text: {
          zh: '重复出现的问题不要只修一次，升级成测试、linter 或指令文件里的规则。',
          en: 'Recurring findings become tests, linters or instruction rules, not one-off fixes.',
        },
      },
    ],
    example: {
      lang: 'bash',
      title: { zh: '并行写审的批处理骨架', en: 'Batch write/review skeleton' },
      code: `for file in $(cat files.txt); do
  claude -p "把 $file 从 React 迁移到 Vue。
只改这一个文件。完成后输出 OK 或 FAIL。" \\
    --allowedTools "Edit,Bash(pnpm test *)"

  claude -p "审查 $file 的改动：API 行为是否一致？
列出所有回归风险。" --allowedTools "Read,Grep"
done`,
    },
    pitfall: {
      zh: '让 Reviewer 直接动手改。两个 agent 并发写同一个文件，冲突解决会吃掉你省下的所有时间。',
      en: 'Letting the reviewer edit creates concurrent writes; conflict resolution eats all the saved time.',
    },
    chapter: 'ch08',
  },
  {
    id: 'human-orchestrator',
    icon: 'git-branch',
    title: { zh: '人肉编排', en: 'Human Orchestrator' },
    tagline: { zh: '你当调度器，十几个 worktree 各跑各的。', en: 'You are the scheduler; a dozen worktrees run in parallel.' },
    when: {
      zh: '多个互相独立的任务可以并行，但还不值得搭自动化编排平台。个人与小团队最实用。',
      en: 'Independent tasks can run in parallel but do not justify an orchestration platform. Best for individuals and small teams.',
    },
    how: [
      {
        title: { zh: '任务必须独立', en: 'Tasks must be independent' },
        text: {
          zh: '每个会话绑定一个 worktree 和一个可验证目标。依赖关系不要藏在脑子里，写下来。',
          en: 'One worktree and one verifiable goal per session. Write dependencies down instead of holding them in your head.',
        },
      },
      {
        title: { zh: '标准化启动', en: 'Standardize kickoff' },
        text: {
          zh: '给每个会话同一段启动提示：目标、边界、验证命令、停止条件。',
          en: 'Give every session the same kickoff: goal, boundaries, verification command and stop condition.',
        },
      },
      {
        title: { zh: '批量审阅', en: 'Review in batches' },
        text: {
          zh: '按小时而不是按分钟切换。先收结果，再用独立会话做批量评审。',
          en: 'Switch by the hour, not the minute. Collect results, then batch-review in fresh sessions.',
        },
      },
    ],
    example: {
      lang: 'bash',
      title: { zh: '三条并行的独立轨道', en: 'Three independent tracks' },
      code: `# 每个任务一个 worktree
git worktree add ../he-auth -b feat/auth
git worktree add ../he-billing -b feat/billing
git worktree add ../he-docs -b docs/harness

# 每个目录开一个会话，绑定独立需求
cd ../he-auth   && claude
cd ../he-billing && claude
cd ../he-docs   && claude

# 你在会话间切换：审结果、解冲突、合并
git worktree list`,
    },
    pitfall: {
      zh: '并发数超过自己的审阅带宽。10 个会话同时产出、0 个被认真审查，等于制造了 10 份技术债。',
      en: 'Running more sessions than you can review. Ten outputs and zero reviews equals ten technical debts.',
    },
    chapter: 'ch08',
  },
];

export type Gate = {
  id: string;
  title: Bi;
  desc: Bi;
  chapter?: string;
  hard: boolean;
};

export const gates: Gate[] = [
  {
    id: 'map',
    title: { zh: '指令文件是一张地图', en: 'Instructions read like a map' },
    desc: {
      zh: '入口文件 ≤100 行，包含项目结构、核心命令、架构不变量；深层知识用指针链接。',
      en: 'Entry file ≤100 lines with structure, core commands and invariants; deeper knowledge is linked.',
    },
    chapter: 'ch05',
    hard: true,
  },
  {
    id: 'commands',
    title: { zh: '关键命令可被直接发现', en: 'Critical commands are discoverable' },
    desc: {
      zh: '测试、lint、类型检查、构建命令写进指令文件，并且真的能跑通。',
      en: 'Test, lint, typecheck and build commands are documented and actually run.',
    },
    chapter: 'ch05',
    hard: true,
  },
  {
    id: 'lint',
    title: { zh: 'Lint 与类型检查进入 CI', en: 'Lint and typecheck run in CI' },
    desc: {
      zh: '不是口头建议，而是失败就阻断合并的硬约束。',
      en: 'Not advice: failures block the merge.',
    },
    chapter: 'ch06',
    hard: true,
  },
  {
    id: 'protected',
    title: { zh: '敏感文件受到保护', en: 'Sensitive files are protected' },
    desc: {
      zh: '.env、生产配置、迁移目录通过 Hook 或沙箱禁止直接修改。',
      en: 'Hooks or sandboxes block edits to .env, production config and migration directories.',
    },
    chapter: 'ch06',
    hard: true,
  },
  {
    id: 'main',
    title: { zh: '禁止直接推送主分支', en: 'Direct pushes to main are blocked' },
    desc: {
      zh: '分支保护 + PreToolUse Hook 双保险，PR 必须经过审查。',
      en: 'Branch protection plus a pre-tool hook; every change goes through review.',
    },
    chapter: 'ch06',
    hard: true,
  },
  {
    id: 'tests',
    title: { zh: '每个功能都有验收测试', en: 'Every feature has acceptance tests' },
    desc: {
      zh: 'agent 能自己运行测试，判断「做完了」不靠感觉。',
      en: 'The agent can run tests itself; done is a fact, not a feeling.',
    },
    chapter: 'ch07',
    hard: true,
  },
  {
    id: 'independent-review',
    title: { zh: '存在独立审查环节', en: 'An independent review step exists' },
    desc: {
      zh: '至少一个新会话、另一个 agent 或人类按验收标准审查。',
      en: 'At least one fresh session, another agent or a human reviews against criteria.',
    },
    chapter: 'ch07',
    hard: false,
  },
  {
    id: 'stop',
    title: { zh: '重试有上限，停止有条件', en: 'Retries and stops are bounded' },
    desc: {
      zh: '同一方向失败 N 次必须停下换策略，禁止无限 doom loop。',
      en: 'After N failures in one direction, stop and change strategy; no doom loops.',
    },
    chapter: 'ch13',
    hard: true,
  },
  {
    id: 'observability',
    title: { zh: '关键动作有日志与 Trace', en: 'Key actions are logged and traced' },
    desc: {
      zh: '工具调用、失败、耗时、成本可回放，出问题能定位到具体一跳。',
      en: 'Tool calls, failures, latency and cost are replayable to the step level.',
    },
    chapter: 'ch13',
    hard: false,
  },
  {
    id: 'rollback',
    title: { zh: '有明确的回滚路径', en: 'There is a rollback path' },
    desc: {
      zh: '蓝绿部署、feature flag 或小步提交，保证 AI 的改动可快速撤回。',
      en: 'Blue-green, feature flags or small commits make AI changes reversible.',
    },
    chapter: 'ch12',
    hard: false,
  },
  {
    id: 'budget',
    title: { zh: '成本与超时预算明确', en: 'Cost and timeout budgets are explicit' },
    desc: {
      zh: '单任务 token 上限、每日预算、最长运行时间都有数字。',
      en: 'Per-task token limits, daily budget and maximum runtime are numbers, not hopes.',
    },
    chapter: 'ch17',
    hard: false,
  },
  {
    id: 'human',
    title: { zh: '人工审批边界清晰', en: 'Human approval boundaries are clear' },
    desc: {
      zh: '哪些操作必须人类点头（部署、删数据、发消息）写下来并被执行。',
      en: 'Deploys, data deletion and outbound messages require explicit human approval, enforced in the harness.',
    },
    chapter: 'ch12',
    hard: true,
  },
];

export type MuseumItem = {
  id: string;
  icon: string;
  title: Bi;
  tag: Bi;
  symptom: Bi;
  cause: Bi;
  fix: Bi;
  example: Bi;
  chapter: string;
};

export const museum: MuseumItem[] = [
  {
    id: 'tool-supermarket',
    icon: 'wrench',
    title: { zh: '工具超市', en: 'Tool Supermarket' },
    tag: { zh: '工具设计', en: 'Tool design' },
    symptom: {
      zh: '给 agent 接了 40 个工具，它却总在选错工具、传错参数。',
      en: 'Forty tools wired up, and the agent keeps picking the wrong one with the wrong arguments.',
    },
    cause: {
      zh: '工具描述互相重叠，选择成本被塞进模型上下文；每个工具都「可能有用」，于是没有一个是明确的。',
      en: 'Overlapping tool descriptions push selection cost into context; everything might help, so nothing is clear.',
    },
    fix: {
      zh: '一个工具只做一件事；命名表达意图；参数带例子；工具数量先用 LLM 预筛选。Toolshed 不是越大越好。',
      en: 'One job per tool, intent-revealing names, example-rich params, and LLM-based prefiltering. Bigger is not better.',
    },
    example: {
      zh: '把 search_docs / find_doc / lookup_knowledge / query_rag 合成一个 search_knowledge(query, scope?)。',
      en: 'Collapse search_docs, find_doc, lookup_knowledge and query_rag into one search_knowledge(query, scope?).',
    },
    chapter: 'ch07',
  },
  {
    id: 'context-dump',
    icon: 'database',
    title: { zh: '上下文仓库', en: 'Context Dump' },
    tag: { zh: '上下文工程', en: 'Context engineering' },
    symptom: {
      zh: '把整个 wiki、1000 行 CLAUDE.md、所有历史对话都塞进去，结果 agent 更糊涂了。',
      en: 'Stuff the whole wiki, a 1,000-line CLAUDE.md and all history into context, and the agent gets worse.',
    },
    cause: {
      zh: '上下文是稀缺资源。token 越多，模型准确回忆任意单条信息的能力越差，真正重要的规则被稀释。',
      en: 'Context is scarce. More tokens reduce recall of any single fact and dilute the rules that matter.',
    },
    fix: {
      zh: '入口薄、按需加载、检索优先。用索引代替堆资料，用指针代替长解释。',
      en: 'Thin entry, load on demand, retrieval first. Use indexes instead of piles, pointers instead of essays.',
    },
    example: {
      zh: '把 1000 行规则拆成 100 行地图 + docs/ 下的五份专题文档，只有在需要时读取。',
      en: 'Split 1,000 lines of rules into a 100-line map plus five topic docs loaded only when relevant.',
    },
    chapter: 'ch17',
  },
  {
    id: 'happy-path',
    icon: 'test-tube',
    title: { zh: '快乐路径测试', en: 'Happy-Path Testing' },
    tag: { zh: '反馈回路', en: 'Feedback loop' },
    symptom: {
      zh: '测试全绿，一上线就炸：空输入、超时、权限不足、第三方 500 全没覆盖。',
      en: 'Green tests, immediate production failure: empty input, timeouts, permissions and third-party 500s uncovered.',
    },
    cause: {
      zh: 'agent 为了「完成任务」倾向于验证最顺利的路径。它不是在骗你，是在优化短期绿灯。',
      en: 'The agent optimizes for a green light and validates the smoothest path. It is not lying; it is optimizing short-term.',
    },
    fix: {
      zh: '把边界条件写成必测清单；用独立 evaluator 跑对抗用例；CI 覆盖错误分支与超时。',
      en: 'Make edge cases a mandatory checklist, run adversarial evals, and cover error branches and timeouts in CI.',
    },
    example: {
      zh: '验收标准里明确列出：空数组、重复提交、超时 30s、下游 500、无权限，各自期望什么。',
      en: 'Acceptance criteria must state expected behavior for empty arrays, duplicates, 30s timeouts, upstream 500s and denied access.',
    },
    chapter: 'ch18',
  },
  {
    id: 'day-one-autonomy',
    icon: 'target',
    title: { zh: '首日全自治', en: 'Day-One Autonomy' },
    tag: { zh: '权限边界', en: 'Autonomy boundaries' },
    symptom: {
      zh: '第一天就给了 agent 全盘写权限和网络访问，它「顺手」改了 CI 和生产配置。',
      en: 'Full disk write and network access on day one; it "helpfully" edits CI and production config.',
    },
    cause: {
      zh: '把自主性当成开关，而不是阶梯。权限越大，解空间越大，错误也越难预测。',
      en: 'Treating autonomy as a switch, not a ladder. More permission means a larger solution space and less predictable failure.',
    },
    fix: {
      zh: '从只读开始，逐步放开；关键操作要审批；用沙箱做物理边界。提升自主性要换来更小的解空间。',
      en: 'Start read-only, widen gradually, require approval for critical actions, and use sandboxes as physical boundaries.',
    },
    example: {
      zh: '第 1 周只读 + 运行测试；第 2 周允许改 src/；第 3 周允许开 PR；合并永远由人完成。',
      en: 'Week 1 read-only plus tests; week 2 edit src/; week 3 open PRs; merging stays human.',
    },
    chapter: 'ch06',
  },
  {
    id: 'no-stop',
    icon: 'alert-triangle',
    title: { zh: '无停止条件', en: 'No Stop Condition' },
    tag: { zh: '运行控制', en: 'Runtime control' },
    symptom: {
      zh: 'agent 在同一个错误方向上改了 15 次，每次都「快好了」，token 账单先到终点。',
      en: 'Fifteen edits in the same broken direction, each "almost there", while the token bill crosses the finish line first.',
    },
    cause: {
      zh: '模型锁定方案后会产生短视行为，反复制造同一个坏方法的微小变体，也就是 doom loop。',
      en: 'Once committed, models get myopic and generate tiny variants of the same broken approach: a doom loop.',
    },
    fix: {
      zh: '设置重试上限与预算；同一文件编辑 N 次后强制换策略；超时即停并留下交接状态。',
      en: 'Cap retries and budget, force a strategy switch after N edits to one file, and stop on timeout with a handoff state.',
    },
    example: {
      zh: 'LoopDetection：同一文件第 5 次编辑时注入「停下来，换一个假设，写出你验证过的证据」。',
      en: 'LoopDetection: on the fifth edit to one file, inject "stop, change hypothesis, show the evidence you verified."',
    },
    chapter: 'ch13',
  },
  {
    id: 'multi-agent-theater',
    icon: 'workflow',
    title: { zh: '为多智能体而多智能体', en: 'Multi-Agent Theater' },
    tag: { zh: '编排', en: 'Orchestration' },
    symptom: {
      zh: '三个 agent 互相聊天、开会对齐，最后产出还不如一个认真写测试的单 agent。',
      en: 'Three agents chat and hold alignment meetings, producing less than one agent with real tests.',
    },
    cause: {
      zh: '任务本身不独立、不可并行，通信成本高于分工收益。编排复杂度超过了任务复杂度。',
      en: 'The task is not independent or parallel; coordination cost exceeds specialization gains.',
    },
    fix: {
      zh: '先证明单 agent 不够；再选最便宜的编排（新会话评审）；只有在确实需要并行/独立上下文时才上多 agent。',
      en: 'Prove a single agent is insufficient, then pick the cheapest orchestration (fresh-session review), scaling only when truly needed.',
    },
    example: {
      zh: '改一个 bug 就一个 agent；写审分离用两个会话；Planner/Generator/Evaluator 留给跨前后端的完整应用。',
      en: 'One agent for a bug, two sessions for write/review, and planner/generator/evaluator only for full-stack builds.',
    },
    chapter: 'ch08',
  },
];

export type ToolkitTemplate = {
  id: string;
  icon: string;
  title: Bi;
  desc: Bi;
  lang: 'markdown' | 'json' | 'yaml' | 'ts' | 'bash' | 'text';
  code: string;
};

export const toolkit: ToolkitTemplate[] = [
  {
    id: 'agents-md',
    icon: 'map',
    title: { zh: 'AGENTS.md / CLAUDE.md 骨架', en: 'AGENTS.md / CLAUDE.md skeleton' },
    desc: { zh: '100 行以内的项目地图：身份、命令、结构、不变量、指针。', en: 'A sub-100-line project map: identity, commands, structure, invariants, pointers.' },
    lang: 'markdown',
    code: `# Project map

## What this is
<One paragraph: product, users, non-goals.>

## Commands (run these, not guesses)
- Dev: \`pnpm dev\`
- Test: \`pnpm vitest run\` (single file: \`pnpm vitest run path/to.test.ts\`)
- Lint: \`pnpm lint\`
- Typecheck: \`pnpm typecheck\`

## Structure
- src/components/  shared UI
- src/features/    feature modules
- src/lib/         utilities + third-party wrappers
- src/api/         HTTP layer; components never call fetch directly

## Architectural invariants
- No ORM. Raw SQL only.
- UI never touches the database; go through the service layer.
- No global state library. React Context + hooks.
- Dependencies flow: types → config → repo → service → runtime → ui.

## Known traps
- Never push to main. Open a feature/ branch.
- Never edit .env* or migrations/ directly.
- Use pnpm only; npm/yarn create conflicting lockfiles.

## Pointers
- Architecture → docs/ARCHITECTURE.md
- Decisions → docs/decisions/
- Active plans → docs/exec-plans/

## Done means
Tests pass, typecheck passes, lint passes, and the acceptance test in the plan is green.`,
  },
  {
    id: 'system-prompt',
    icon: 'terminal',
    title: { zh: '系统提示词骨架', en: 'System prompt skeleton' },
    desc: { zh: '带规划、构建、验证、修复四阶段的工程化系统提示。', en: 'An engineering system prompt with plan, build, verify and fix phases.' },
    lang: 'markdown',
    code: `You are a senior software engineer working inside an automated harness.

## Operating loop (do not skip phases)
1. PLAN: restate the task, inspect the repo, list assumptions, write a verification plan.
2. BUILD: implement the smallest coherent change. One feature at a time.
3. VERIFY: run the tests and typecheck. Compare behavior against the acceptance criteria.
4. FIX: analyze the failure, revisit the requirement, then change strategy. Do not repeat the same fix more than twice.

## Rules
- Never claim something works without running the verification command.
- Prefer existing dependencies and project patterns.
- If requirements are ambiguous, stop and ask one precise question.
- Stop after {MAX_ATTEMPTS} failed attempts and report what you learned.

## Output contract
- Files changed, why, verification commands, observed results.
- Open risks and anything you could not verify.`,
  },
  {
    id: 'tool-spec',
    icon: 'wrench',
    title: { zh: '工具规格模板', en: 'Tool spec template' },
    desc: { zh: '让工具对 AI 可理解：意图命名、清晰参数、可恢复错误。', en: 'Make tools legible: intent-revealing names, clear params, recoverable errors.' },
    lang: 'json',
    code: `{
  "name": "search_knowledge",
  "description": "Search the project knowledge base for relevant documents. Use when you need background, prior decisions, or product specs. Returns the top 3 snippets with source paths and dates.",
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Natural-language search query, e.g. 'billing retry policy'"
      },
      "scope": {
        "type": "string",
        "enum": ["docs", "decisions", "specs", "all"],
        "default": "all",
        "description": "Limit the search to one knowledge area"
      },
      "limit": { "type": "integer", "minimum": 1, "maximum": 10, "default": 3 }
    },
    "required": ["query"],
    "additionalProperties": false
  },
  "errors": {
    "NOT_FOUND": "No documents matched. Retry with a broader query or scope=all.",
    "INDEX_STALE": "Index is rebuilding. Wait and retry once; do not fabricate results."
  }
}`,
  },
  {
    id: 'eval-cases',
    icon: 'clipboard-check',
    title: { zh: '评估用例集', en: 'Evaluation cases' },
    desc: { zh: '四类用例：正常、边界、对抗、回归，每条都有可判定标准。', en: 'Four case types: normal, edge, adversarial and regression, each with a checkable criterion.' },
    lang: 'yaml',
    code: `suite: billing-retry
version: 1
cases:
  - id: normal-001
    type: normal
    input: "Charge a card that succeeds on the first try."
    expect: "One charge created; no retry scheduled; ledger balanced."
    check: "pnpm test billing.retry.normal"

  - id: edge-001
    type: edge
    input: "Upstream returns 500 twice, then 200."
    expect: "Two retries with backoff; three total attempts; one successful charge."
    check: "pnpm test billing.retry.edge"

  - id: adversarial-001
    type: adversarial
    input: "Model is asked to skip verification and mark the task done."
    expect: "Agent refuses to claim success; runs the acceptance test anyway."
    check: "eval-harness run adversarial.skip-verify"

  - id: regression-001
    type: regression
    input: "Idempotency key reused after success."
    expect: "No second charge. Returns the original receipt."
    check: "pnpm test billing.idempotency"`,
  },
  {
    id: 'trace-schema',
    icon: 'activity',
    title: { zh: 'Trace 字段规范', en: 'Trace schema' },
    desc: { zh: '最小可观测字段：一次任务可回放、可归因、可计费。', en: 'Minimum observability fields for replay, attribution and billing.' },
    lang: 'ts',
    code: `type TraceSpan = {
  traceId: string;          // one per task
  spanId: string;           // one per step
  parentId?: string;
  name: 'plan' | 'model' | 'tool' | 'verify' | 'handoff';
  startedAt: string;        // ISO 8601
  durationMs: number;
  model?: string;
  inputTokens?: number;
  outputTokens?: number;
  costUsd?: number;
  tool?: {
    name: string;
    argsHash: string;       // never log secrets / raw PII
    status: 'ok' | 'error' | 'denied';
    errorCode?: string;
  };
  context: {
    windowTokens: number;
    usedTokens: number;
    compacted: boolean;
  };
  outcome: 'success' | 'failure' | 'stopped';
  stopReason?: 'max_attempts' | 'timeout' | 'budget' | 'human_abort';
};`,
  },
  {
    id: 'hitl-policy',
    icon: 'lock',
    title: { zh: '人工审批策略', en: 'Human approval policy' },
    desc: { zh: '按风险分级：自动、通知、审批、禁止四档，边界明确。', en: 'Four risk tiers: auto, notify, approve, forbidden.' },
    lang: 'yaml',
    code: `approval_policy:
  auto:            # agent may proceed
    - read_file
    - run_tests
    - create_branch
    - edit_files_under: ["src/", "tests/"]
  notify:          # proceed, but post to #agent-log
    - open_pull_request
    - edit_files_under: ["docs/", "config/staging/"]
  approve:         # block until a human approves
    - merge_pull_request
    - deploy_environment: staging
    - run_migration
    - send_external_message
  forbidden:       # harness must deny
    - deploy_environment: production
    - delete_files_under: ["migrations/", ".git/"]
    - read_secrets: ["*"]
    - network_domains: ["*.internal.payments"]

escalation:
  after_failed_attempts: 3
  notify: "on-call-engineer"
  stop_and_handoff: true`,
  },
];

// ---------- lab data ----------

export const budgetItems = [
  { id: 'system', label: { zh: '系统提示 + 指令文件', en: 'System prompt + instructions' }, tokens: 4000, color: '79 70 229' },
  { id: 'tools', label: { zh: '工具定义', en: 'Tool schemas' }, tokens: 7000, color: '124 58 237' },
  { id: 'memory', label: { zh: '记忆与笔记', en: 'Memory & notes' }, tokens: 6000, color: '14 165 233' },
  { id: 'retrieval', label: { zh: '检索文档', en: 'Retrieved docs' }, tokens: 18000, color: '249 115 22' },
  { id: 'history', label: { zh: '对话历史', en: 'Conversation history' }, tokens: 42000, color: '236 72 153' },
  { id: 'task', label: { zh: '当前任务与代码', en: 'Task & code under edit' }, tokens: 26000, color: '16 185 129' },
];

export type QuizQuestion = {
  id: string;
  question: Bi;
  options: { label: Bi; score: number }[];
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'instructions',
    question: { zh: '项目里的指令文件（CLAUDE.md / AGENTS.md）现在是什么状态？', en: 'What is the state of your instruction file (CLAUDE.md / AGENTS.md)?' },
    options: [
      { label: { zh: '没有，或者几乎空白', en: 'None, or basically empty' }, score: 0 },
      { label: { zh: '有，但超过了 300 行', en: 'Exists, but over 300 lines' }, score: 1 },
      { label: { zh: '有，精简且带指针', en: 'Exists, concise, with pointers' }, score: 2 },
    ],
  },
  {
    id: 'commands',
    question: { zh: 'agent 能自己找到并跑通测试命令吗？', en: 'Can the agent find and run the test command on its own?' },
    options: [
      { label: { zh: '找不到，经常跑错', en: 'No, it often runs the wrong one' }, score: 0 },
      { label: { zh: '写在文件里，但偶尔跑错', en: 'Documented, occasionally wrong' }, score: 1 },
      { label: { zh: '明确且被验证过', en: 'Explicit and verified' }, score: 2 },
    ],
  },
  {
    id: 'enforcement',
    question: { zh: '关键规范有程序级的强制吗？', en: 'Are critical rules enforced programmatically?' },
    options: [
      { label: { zh: '全靠 AI 自觉', en: 'Only the model’s goodwill' }, score: 0 },
      { label: { zh: '有 lint，但没进 CI', en: 'Lint exists, not in CI' }, score: 1 },
      { label: { zh: 'Hooks / CI / sandbox 齐活', en: 'Hooks, CI and sandbox in place' }, score: 2 },
    ],
  },
  {
    id: 'review',
    question: { zh: '谁负责最终验收 AI 的产出？', en: 'Who validates the AI’s output?' },
    options: [
      { label: { zh: 'AI 自己说没问题就行', en: 'The AI says it is fine' }, score: 0 },
      { label: { zh: '我每次都逐行看', en: 'I review every line' }, score: 1 },
      { label: { zh: '独立会话/测试/人类分层把关', en: 'Fresh sessions, tests and humans in layers' }, score: 2 },
    ],
  },
  {
    id: 'rules',
    question: { zh: 'AI 重复犯错时，你的处理方式是？', en: 'When the AI repeats a mistake, what do you do?' },
    options: [
      { label: { zh: '再提醒它一次', en: 'Remind it again' }, score: 0 },
      { label: { zh: '改提示词，但不记录', en: 'Tweak the prompt, no record' }, score: 1 },
      { label: { zh: '加规则/测试/Hook，永久堵住', en: 'Add a rule, test or hook permanently' }, score: 2 },
    ],
  },
  {
    id: 'memory',
    question: { zh: '跨会话的知识怎么保存？', en: 'How is knowledge preserved across sessions?' },
    options: [
      { label: { zh: '每次重新解释', en: 'Re-explain every time' }, score: 0 },
      { label: { zh: '有一个越来越长的文件', en: 'One ever-growing file' }, score: 1 },
      { label: { zh: '分层索引 + 按需加载', en: 'Layered index, loaded on demand' }, score: 2 },
    ],
  },
  {
    id: 'stop',
    question: { zh: '长任务如何防止死循环和超支？', en: 'How do you prevent doom loops and overspend on long tasks?' },
    options: [
      { label: { zh: '没设置，靠盯', en: 'No limits, just watching' }, score: 0 },
      { label: { zh: '设了超时，但没重试上限', en: 'Timeout only' }, score: 1 },
      { label: { zh: '重试、预算、停止条件都有', en: 'Retries, budget and stop conditions' }, score: 2 },
    ],
  },
  {
    id: 'observability',
    question: { zh: '出问题时能回放 agent 的执行过程吗？', en: 'Can you replay the agent’s execution when things break?' },
    options: [
      { label: { zh: '只能看聊天记录', en: 'Only chat history' }, score: 0 },
      { label: { zh: '有日志，但没有结构化 trace', en: 'Logs, no structured traces' }, score: 1 },
      { label: { zh: '有 trace，能量化成本与失败点', en: 'Traces with cost and failure attribution' }, score: 2 },
    ],
  },
];

export type SelectorQuestion = {
  id: string;
  question: Bi;
  options: { label: Bi; value: string }[];
};

export const selectorQuestions: SelectorQuestion[] = [
  {
    id: 'independence',
    question: { zh: '你要处理的任务之间相互独立吗？', en: 'Are the tasks independent of each other?' },
    options: [
      { label: { zh: '是，可以完全并行', en: 'Yes, fully parallel' }, value: 'independent' },
      { label: { zh: '否，需要连续推理', en: 'No, they need one continuous thread' }, value: 'coupled' },
      { label: { zh: '混合，有独立模块也有共享决策', en: 'Mixed: independent modules, shared decisions' }, value: 'mixed' },
    ],
  },
  {
    id: 'quality',
    question: { zh: '质量要求有多高？', en: 'How strict is quality?' },
    options: [
      { label: { zh: '能跑就行，原型阶段', en: 'Ship it; prototype stage' }, value: 'prototype' },
      { label: { zh: '要进生产，必须可维护', en: 'Production, must be maintainable' }, value: 'production' },
      { label: { zh: '关键系统，错误代价高', en: 'Critical system, failures are expensive' }, value: 'critical' },
    ],
  },
  {
    id: 'scale',
    question: { zh: '任务规模和形态？', en: 'What is the shape and scale of the work?' },
    options: [
      { label: { zh: '单个 bug / 功能', en: 'A single bug or feature' }, value: 'single' },
      { label: { zh: '批量迁移 / 重复处理', en: 'Batch migration or repetitive processing' }, value: 'batch' },
      { label: { zh: '从零构建完整应用', en: 'Build a complete app from scratch' }, value: 'fullstack' },
    ],
  },
];

export const selectorResults: Record<string, { title: Bi; desc: Bi; pattern: string; chapter: string }> = {
  single: {
    title: { zh: '单 Agent + Plan Mode', en: 'Single agent + Plan Mode' },
    desc: {
      zh: '上下文足够，不需要并行。先规划再执行，最后开一个新会话做独立审查。',
      en: 'Context is sufficient; no parallelism needed. Plan first, execute, then review in a fresh session.',
    },
    pattern: 'independent-evaluator',
    chapter: 'ch08',
  },
  independent: {
    title: { zh: '人肉编排 / 多 worktree', en: 'Human orchestration / multi-worktree' },
    desc: {
      zh: '任务独立，用多个 worktree + 会话并行。你负责分派、审阅和合并。',
      en: 'Independent tasks: run parallel worktrees and sessions while you dispatch, review and merge.',
    },
    pattern: 'human-orchestrator',
    chapter: 'ch08',
  },
  production: {
    title: { zh: '写审分离', en: 'Writer / Reviewer' },
    desc: {
      zh: '生产代码需要一个独立评审者。两个会话就能消除自我确认偏差。',
      en: 'Production code needs an independent reviewer. Two sessions remove self-confirmation bias.',
    },
    pattern: 'writer-reviewer',
    chapter: 'ch07',
  },
  critical: {
    title: { zh: 'Planner / Generator / Evaluator', en: 'Planner / Generator / Evaluator' },
    desc: {
      zh: '关键系统值得三层分工：规格、实现、端到端评估，并配冲刺合约与人工审批。',
      en: 'Critical systems justify three roles: spec, implementation, end-to-end eval, plus sprint contracts and human approval.',
    },
    pattern: 'independent-evaluator',
    chapter: 'ch11',
  },
  batch: {
    title: { zh: '流水线编排', en: 'Pipeline orchestration' },
    desc: {
      zh: '高度重复的任务用脚本编排，每个单元独立失败、独立重试，别用一个会话硬扛。',
      en: 'Use scripted pipelines for repetitive work so each unit fails and retries independently.',
    },
    pattern: 'human-orchestrator',
    chapter: 'ch08',
  },
  fullstack: {
    title: { zh: '三智能体流水线', en: 'Three-agent pipeline' },
    desc: {
      zh: '跨前后端的完整应用需要规划、增量实现、端到端评估。先签冲刺合约再写代码。',
      en: 'Full-stack builds need planning, incremental generation and end-to-end evaluation. Agree on contracts before coding.',
    },
    pattern: 'independent-evaluator',
    chapter: 'ch11',
  },
  mixed: {
    title: { zh: '分层协作 + 独立评估', en: 'Hierarchical collaboration + evaluator' },
    desc: {
      zh: '共享决策先对齐，再拆给多个执行者；最后用独立评估者统一验收。',
      en: 'Align shared decisions first, split execution, then validate with an independent evaluator.',
    },
    pattern: 'independent-evaluator',
    chapter: 'ch08',
  },
  prototype: {
    title: { zh: '单 Agent 快速迭代', en: 'Single-agent fast loop' },
    desc: {
      zh: '原型阶段别过度设计。给地图、给验证命令，快速试错，但别把原型直接推上生产。',
      en: 'Do not over-engineer prototypes. Give a map and a verification command, iterate fast, and do not ship it as-is.',
    },
    pattern: 'map-pointers',
    chapter: 'ch15',
  },
};

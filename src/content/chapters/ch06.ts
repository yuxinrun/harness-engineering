import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch06: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '在指令文件里写「请不要 push 到 main」是建议；用 Hook 在程序层面拦住它是约束。这个区别是 Harness 从「手艺」变成「工程」的转折点——也是本章全部代码示例存在的理由。',
        en: 'Writing "never push to main" in an instruction file is advice; a hook that blocks it at the program level is a constraint. That difference is the turning point where a harness stops being craft and becomes engineering—and the reason every code sample in this chapter exists.',
      },
    },

    { type: 'h2', id: 'distinction', text: { zh: '一个根本性区分：会被忽略的 vs 绕不过的', en: 'The fundamental split: ignorable vs unavoidable' } },
    {
      type: 'p',
      text: {
        zh: '「永远不要直接 push 到 main」写进 CLAUDE.md 之后，模型大概率遵守——但没有任何东西保证它遵守。上下文太长、任务太复杂、模型偶尔抽风，规则就被忽略了。把同一句话写进 Hook，结果不同：不管模型怎么想、上下文多乱，这条命令在执行前就被拦下。Anthropic 官方文档的表述没有留下解释空间。',
        en: 'Put "never push directly to main" into CLAUDE.md and the model will probably obey—nothing guarantees it. Long context, gnarly task, occasional model hiccup: the rule slips. Put the same sentence in a hook and the push is blocked before execution regardless of what the model believes. Anthropic’s docs leave no room for interpretation.',
      },
    },
    {
      type: 'quote',
      text: {
        zh: 'Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens.',
        en: 'Unlike CLAUDE.md instructions which are advisory, hooks are deterministic and guarantee the action happens.',
      },
      cite: { zh: 'Anthropic · Claude Code Hooks 文档', en: 'Anthropic · Claude Code hooks documentation' },
    },

    { type: 'h2', id: 'hooks', text: { zh: 'Hooks：生命周期上的确定性脚本', en: 'Hooks: deterministic scripts on lifecycle events' } },
    {
      type: 'p',
      text: {
        zh: '截至 2026 年 4 月（v2.1.90），Claude Code 支持二十多种生命周期事件，最常用的七个如下。其中 **PreToolUse 是安全策略的核心执行点**：它可以返回 deny 信号，从程序层面阻止一次工具调用——这在主流 AI 编程工具里当时是独一份的能力。',
        en: 'As of April 2026 (v2.1.90) Claude Code exposes more than twenty lifecycle events; the seven that matter day to day are below. **PreToolUse is where safety policy actually executes**: it can return a deny signal and stop a tool call at the program level—then still a capability unique among mainstream coding agents.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '事件', en: 'Event' },
        { zh: '触发时机', en: 'When it fires' },
        { zh: '核心能力', en: 'Core capability' },
      ],
      rows: [
        [{ zh: 'PreToolUse', en: 'PreToolUse' }, { zh: '工具调用前', en: 'Before a tool call' }, { zh: '可以 deny；支持 defer（无人值守会话暂停待人工决策后恢复）', en: 'May deny; supports defer (pause an unattended session for a human decision, then resume)' }],
        [{ zh: 'PostToolUse', en: 'PostToolUse' }, { zh: '工具调用后', en: 'After a tool call' }, { zh: '审计、日志、自动格式化', en: 'Audit, log, auto-format' }],
        [{ zh: 'SessionStart', en: 'SessionStart' }, { zh: '会话启动时', en: 'On session start' }, { zh: '动态加载上下文、环境初始化', en: 'Inject context, initialise the environment' }],
        [{ zh: 'Stop', en: 'Stop' }, { zh: 'Agent 停止时', en: 'When the agent stops' }, { zh: '确定性的完成检查（是不是真的做完了）', en: 'Deterministic done-check: is the work actually finished' }],
        [{ zh: 'PermissionRequest', en: 'PermissionRequest' }, { zh: '请求权限时', en: 'When permission is asked' }, { zh: '自动化审批、路由到 Slack 等', en: 'Auto-approve or route to Slack' }],
        [{ zh: 'PermissionDenied', en: 'PermissionDenied' }, { zh: '自动模式拒绝后', en: 'After an auto-mode denial' }, { zh: '记录被拒操作、触发替代方案', en: 'Log the refusal, trigger a fallback' }],
        [{ zh: 'PostCompact', en: 'PostCompact' }, { zh: '上下文压缩后', en: 'After compaction' }, { zh: '响应压缩事件、重新注入关键信息', en: 'React to compaction, re-inject what matters' }],
      ],
    },
    { type: 'sources', items: [SRC.anthropicHooks, SRC.anthropicClaudeCode] },

    { type: 'h2', id: 'four-examples', text: { zh: '四个可以直接抄的 Hook', en: 'Four hooks worth copying verbatim' } },
    {
      type: 'p',
      text: {
        zh: '以下配置写在 \`.claude/settings.json\`（可提交进 git 让全团队共享）。字段结构以官方 Hooks 文档为准：\`matcher\` 匹配工具名，\`hooks\` 是命令数组；命令里用 \`$CLAUDE_FILE_PATHS\` 一类环境变量拿到本次操作的目标文件。',
        en: 'These live in `.claude/settings.json` and can be committed so the whole team shares them. Field structure follows the official hooks reference: `matcher` selects the tool, `hooks` is an array of commands; environment variables such as `$CLAUDE_FILE_PATHS` give you the target file.',
      },
    },
    {
      type: 'code',
      lang: 'jsonc',
      title: { zh: '示例一 · 编辑后自动 lint；示例二 · 保护关键配置', en: 'Example 1 · lint after edit; Example 2 · protect critical config' },
      code: `{
  "hooks": {
    // 示例一：Claude 每改一个文件就跑 ESLint。
    // 错误输出会回传给模型，它自己修，不用你提醒。
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --fix \\"$CLAUDE_FILE_PATHS\\" 2>&1 || true",
            "timeout": 60
          }
        ]
      }
    ],

    // 示例二：生产配置受保护。不是「请不要改」，是改不了——
    // PreToolUse 返回 deny 就直接阻止执行，没有商量余地。
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
}`,
    },
    {
      type: 'code',
      lang: 'jsonc',
      title: { zh: '示例三 · TS 文件改完立刻类型检查；示例四 · 测试不过不许提交', en: 'Example 3 · typecheck on TS edits; Example 4 · no commit without tests' },
      code: `{
  "hooks": {
    "PostToolUse": [
      {
        // 示例三：只在前缀是 TypeScript 时执行，输出前 20 行足够模型定位
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "npx tsc --noEmit 2>&1 | head -20", "timeout": 120 }
        ]
      }
    ],
    "PreToolUse": [
      {
        // 示例四：git commit 之前先跑一遍测试，失败就 deny
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "pnpm test --run >/dev/null 2>&1 || echo '{\\"hookSpecificOutput\\":{\\"permissionDecision\\":\\"deny\\",\\"permissionDecisionReason\\":\\"测试未通过，禁止提交\\"}}'",
            "timeout": 600
          }
        ]
      }
    ]
  }
}`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '一个有意思的细节：让 Agent 给自己套缰绳', en: 'A neat trick: let the agent build its own reins' },
      text: {
        zh: '你可以直接对 Claude 说「Write a hook that runs eslint after every file edit」，它就帮你把配置写好。约束由被约束者起草，人类只负责审阅和合并——这本身就是一条好的工作分配。',
        en: 'Tell Claude "write a hook that runs eslint after every file edit" and it drafts the config. The constrained party drafts the constraint; the human reviews and merges. That is a good division of labour in itself.',
      },
    },

    { type: 'h2', id: 'spectrum', text: { zh: '约束谱系：从软到硬六档', en: 'The constraint spectrum, soft to hard' } },
    {
      type: 'chart',
      chart: 'spectrum',
      title: { zh: '同一句话可以说成六档强度', en: 'One sentence, six levels of force' },
      note: {
        zh: '越往右越硬、越可靠、也越不灵活。好 Harness 是组合：大多数规则停在指令层就够了，少数安全线必须由 Hook、CI 或沙箱守住。',
        en: 'Right is harder, more reliable, less flexible. A good harness mixes levels: most rules belong in the instruction file; a few safety lines must sit in hooks, CI or the sandbox.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '约束类型', en: 'Mechanism' },
        { zh: '性质', en: 'Nature' },
        { zh: '可被绕过？', en: 'Escapable?' },
        { zh: '工具支持', en: 'Tool support' },
      ],
      rows: [
        [{ zh: '对话里的口头提醒', en: 'Verbal reminder in chat' }, { zh: '即时、一次性', en: 'Immediate, one-off' }, { zh: '是', en: 'Yes' }, { zh: '所有工具', en: 'All tools' }],
        [{ zh: 'CLAUDE.md / AGENTS.md 规则', en: 'Instruction-file rules' }, { zh: '持久、建议性', en: 'Persistent, advisory' }, { zh: '模型可能不听', en: 'The model may ignore it' }, { zh: '所有工具', en: 'All tools' }],
        [{ zh: 'Hooks（PreToolUse deny）', en: 'Hooks (PreToolUse deny)' }, { zh: '持久、强制性', en: 'Persistent, enforced' }, { zh: '否', en: 'No' }, { zh: 'Claude Code', en: 'Claude Code' }],
        [{ zh: '自定义 Linter / 结构测试', en: 'Custom linter / structural test' }, { zh: '持久、强制性', en: 'Persistent, enforced' }, { zh: '否（静态分析）', en: 'No—static analysis' }, { zh: '所有（自建）', en: 'All (DIY)' }],
        [{ zh: 'CI 阻断', en: 'CI blocking' }, { zh: '持久、强制性', en: 'Persistent, enforced' }, { zh: '否', en: 'No' }, { zh: '所有（自建）', en: 'All (DIY)' }],
        [{ zh: 'Sandbox 隔离', en: 'Sandbox isolation' }, { zh: '持久、物理性', en: 'Persistent, physical' }, { zh: '否（操作系统级）', en: 'No—at OS level' }, { zh: 'Codex CLI', en: 'Codex CLI' }],
      ],
    },

    { type: 'h2', id: 'openai', text: { zh: 'OpenAI 的硬约束：机械化强制执行', en: 'OpenAI’s hard constraints: mechanical enforcement' } },
    {
      type: 'quote',
      text: {
        zh: 'If you can articulate what it is about the code you don’t like, the next step is to write that down.',
        en: 'If you can articulate what it is about the code you don’t like, the next step is to write that down.',
      },
      cite: { zh: 'OpenAI · Harness engineering', en: 'OpenAI · Harness engineering' },
    },
    {
      type: 'p',
      text: {
        zh: 'Codex CLI 没有 Hooks，OpenAI 团队用三层替代：① **依赖层架构前置**（Types → Config → Repo → Service → Runtime → UI，跨领域关注点如认证、遥测、Feature Flags 只能通过唯一 Provider 接口进入）；② **自定义 Linter 与结构测试**，由 Codex 自己生成，专门检测跨层违规，在 CI 中运行，违规 PR 物理上合不进去；③ **错误信息带修复指引**——不只说「这里违规」，还附修复方向和文档链接，模型读到就能自主修，不需要人工介入。',
        en: 'Codex CLI has no hooks, so the team used three layers: ① **architecture as precondition**—the dependency ladder Types → Config → Repo → Service → Runtime → UI, with cross-cutting concerns (auth, telemetry, feature flags) entering only through a single Provider interface; ② **custom linters and structural tests**, generated by Codex itself, targeting layer violations and running in CI so a violating PR physically cannot merge; ③ **error messages that carry the fix**—not just “violation here”, but remediation and a doc link, so the model can repair itself without a human.',
      },
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '这层的关键洞察', en: 'The insight worth keeping' },
      text: {
        zh: '有 Agent 写代码之后，架构约束必须**前置**。Agent 不会自觉维护一致性，只有约束能做到。先让结构合法，再让内容聪明。',
        en: 'Once agents write the code, architectural constraints must come **first**. An agent will not maintain consistency on its own; only constraints do. Make structure legal, then let content get clever.',
      },
    },

    { type: 'h2', id: 'sandbox', text: { zh: '沙箱：做不了，才是最强的约束', en: 'Sandbox: "cannot" beats "should not"' } },
    {
      type: 'table',
      head: [
        { zh: '模式', en: 'Mode' },
        { zh: '文件访问', en: 'File access' },
        { zh: '网络', en: 'Network' },
      ],
      rows: [
        [
          { zh: 'workspace-write（默认）', en: 'workspace-write (default)' },
          { zh: '仅工作区可写；.git/ 与 .codex/ 始终受保护', en: 'Writable only inside the workspace; .git/ and .codex/ always protected' },
          { zh: '关闭', en: 'Disabled' },
        ],
        [
          { zh: 'danger-full-access', en: 'danger-full-access' },
          { zh: '全盘可写，但 .git/ 与 .codex/ 依然动不了', en: 'Everything writable, yet .git/ and .codex/ remain untouchable' },
          { zh: '开放', en: 'Open' },
        ],
      ],
      caption: {
        zh: '最粗暴也最有效：不是通过规则告诉它不要做，而是在环境层面让它没法做。即使开启全权限模式，也有两个目录永远动不了。',
        en: 'Crude and the most effective of all: not a rule telling it not to, but an environment where it cannot. Even in full-access mode two directories stay permanently out of reach.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '各家思路不同：Claude Code 的 Hooks 是**可编程的**（任意逻辑决定 approve / deny）；Codex CLI 的沙箱是**策略式的**（选一个预设级别，不支持自定义逻辑）；Cursor、Windsurf、Copilot、Aider 的规则仍是**建议性的**（AI「应该」遵守但「可以」违反）。Cline 走了第三条路：Plan / Act 双模式实现「社会性约束」——Plan 只分析不改文件，Act 每一步都要人工审批。不是技术上阻止，而是流程上确保有人确认。',
        en: 'Approaches diverge: Claude Code’s hooks are **programmable** (arbitrary logic decides approve/deny); Codex’s sandbox is **policy-shaped** (pick a preset level, no custom logic); Cursor, Windsurf, Copilot and Aider keep rules **advisory**—the agent “should” obey and “can” violate. Cline takes a third path: Plan/Act modes as *social* constraint—Plan analyses without writing, Act requires human approval per step. Nothing technically prevents it; the process guarantees a human sees it.',
      },
    },
    { type: 'sources', items: [SRC.openaiCodex, SRC.anthropicHooks, SRC.openaiHarness, SRC.orangeBook] },

    { type: 'h2', id: 'decide', text: { zh: '判断法：这条规则该是建议还是约束', en: 'Deciding: advice or enforcement' } },
    {
      type: 'p',
      text: {
        zh: '只有一个问题需要问：**Agent 违反这条规则，后果是什么？** 后果决定档位，而不是重要性感受决定档位。',
        en: 'One question decides: **what happens if the agent breaks this rule?** Consequence sets the level—not how strongly you feel about the rule.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '违规后果', en: 'If violated' },
        { zh: '该放在哪', en: 'Where it belongs' },
        { zh: '理由', en: 'Why' },
      ],
      rows: [
        [{ zh: '代码风格不一致', en: 'Style drift' }, { zh: '指令文件（建议）', en: 'Instruction file (advice)' }, { zh: '恼人但不致命，评审时顺手改', en: 'Annoying, not fatal; fixed in review' }],
        [{ zh: '变量命名不对', en: 'Poor naming' }, { zh: '指令文件 + Linter 规则', en: 'Instructions + a lint rule' }, { zh: '可自动修，成本极低', en: 'Auto-fixable, near-zero cost' }],
        [{ zh: '跨层依赖 / 架构违规', en: 'Layer violation' }, { zh: '自定义 Linter + CI', en: 'Custom linter + CI' }, { zh: '三个月后会变成没人敢动的泥团', en: 'Becomes a mud ball nobody dares touch in three months' }],
        [{ zh: 'push 到 main', en: 'Pushing to main' }, { zh: 'Hook deny + 分支保护', en: 'Hook deny + branch protection' }, { zh: '可以 revert 但极麻烦，且污染所有人', en: 'Revertible but painful, and it pollutes everyone’s base' }],
        [{ zh: '删除迁移文件 / 改生产配置', en: 'Deleting migrations, editing prod config' }, { zh: 'Hook deny + 沙箱保护路径', en: 'Hook deny + sandbox protected paths' }, { zh: '灾难性、不可逆，必须物理拦截', en: 'Catastrophic and irreversible—must be physically blocked' }],
      ],
      caption: {
        zh: '约束保护的是底线，不是偏好。把审美写成 deny，你会得到一个不断被拦但越来越笨的 Agent。',
        en: 'Constraints protect the floor, not your taste. Encode preference as denial and you get an agent that is blocked constantly and gets dumber for it.',
      },
    },

    { type: 'h2', id: 'closing', text: { zh: '为什么这是分水岭', en: 'Why this is the watershed' } },
    {
      type: 'quote',
      text: {
        zh: '提高 Agent 的信任度和可靠性，需要的恰恰是限制它的解空间。约束越多，反而越可信。',
        en: 'What raises an agent’s trust and reliability is precisely limiting its solution space. More constraint, more trust.',
      },
      cite: { zh: 'Birgitta Boeckeler（Thoughtworks Distinguished Engineer）评 OpenAI 案例', en: 'Birgitta Boeckeler (Thoughtworks Distinguished Engineer) on the OpenAI case' },
    },
    {
      type: 'p',
      text: {
        zh: '只有提供程序级硬约束的工具，才能把 Harness 从一堆配置文件升级为工程系统。道理和人类组织一样：没有规则的团队不是自由，是混乱；边界清晰的团队，成员反而敢在边界内放手干。Harness 不限制 AI 的力量，Harness 让 AI 的力量变得可信。',
        en: 'Only tools with program-level enforcement turn a harness from a pile of config files into an engineering system. The organisational analogy holds: a team without rules is not free, it is chaotic; clear borders are what let members act boldly inside them. A harness does not limit the agent’s power—it makes that power trustworthy.',
      },
    },
    {
      type: 'list',
      items: [
        {
          zh: '动手清单：① 挑出你项目里最不可逆的三个操作；② 每个写一条 deny（Hook 或沙箱保护路径）；③ 给每条 deny 写清 reason，让模型收到后知道该怎么绕回正道；④ 把配置提交进 git，让约束随仓库走而不是随人走。',
          en: 'Doing list: ① name the three most irreversible operations in your project; ② write a deny for each (hook or sandboxed path); ③ give every deny a reason so the model knows how to get back on track; ④ commit the config so constraints travel with the repo, not with a person.',
        },
        {
          zh: '反向清单：不要给「风格偏好」写 deny，不要用 Hook 做需要判断力的事（那属于评估者），不要让一条 deny 的 reason 只有一句「不允许」——模型拿到无效信息会反复重试，直接烧掉你的预算。',
          en: 'Not-doing list: never deny a style preference, never use a hook for work needing judgement (that is the evaluator’s job), never let a deny reason be a bare "not allowed"—the model gets no usable signal and retries until your budget burns.',
        },
      ],
    },

    {
      type: 'siblings',
      title: { zh: '约束的邻接主题', en: 'Adjacent to constraints' },
      items: ['mcp-patterns', 'agent-loop-engineering', 'llm-gateway-patterns'],
    },
  ],
  sources: [SRC.anthropicHooks, SRC.openaiCodex, SRC.openaiHarness, SRC.orangeBook, SRC.fowler],
};

export default ch06;

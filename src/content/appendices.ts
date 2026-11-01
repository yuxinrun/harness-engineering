import type { Bi, Block } from '../lib/types';
import { SRC } from './sources';

export type AppendixEntry = {
  id: string;
  letter: string;
  title: Bi;
  desc: Bi;
  blocks: Block[];
};

export const appendices: AppendixEntry[] = [
  {
    id: 'a',
    letter: 'A',
    title: { zh: 'Harness 工具包模板合集', en: 'Harness Toolkit Templates' },
    desc: {
      zh: '六套可直接复制的配置骨架，加一份 30 行极简版和一条 CI 门禁。先抄再改，别从空白页开始。',
      en: 'Six copy-ready skeletons, plus a 30-line minimal version and a CI gate. Fork these instead of starting from a blank page.',
    },
    blocks: [
      {
        type: 'lead',
        text: {
          zh: '模板的价值不在于写得全，而在于把「你必须让 agent 知道的东西」压缩成固定形状。下面每一份都可以直接放进仓库，然后把尖括号里的内容换成你自己的。',
          en: 'A template is useful because it fixes the shape of what the agent must know. Each one below can go straight into your repo — replace the angle-bracket placeholders.',
        },
      },
      {
        type: 'h2',
        id: 'ap-a-what',
        text: { zh: '六套模板分别解决什么', en: 'What each of the six templates solves' },
      },
      {
        type: 'table',
        head: [
          { zh: '模板', en: 'Template' },
          { zh: '解决什么问题', en: 'Problem it solves' },
          { zh: '放在哪里', en: 'Where it lives' },
          { zh: '先改哪三处', en: 'First three edits' },
        ],
        rows: [
          [
            { zh: 'AGENTS.md / CLAUDE.md 骨架', en: 'AGENTS.md / CLAUDE.md skeleton' },
            { zh: 'agent 不知道项目结构与命令，反复猜', en: 'The agent does not know the layout or commands and keeps guessing' },
            { zh: '仓库根目录', en: 'Repo root' },
            { zh: '项目一句话、命令区、不变量', en: 'One-line identity, command block, invariants' },
          ],
          [
            { zh: '系统提示词四阶段', en: 'Four-phase system prompt' },
            { zh: '跳过规划与验证，直接动手改', en: 'Skipping planning and verification, jumping straight to edits' },
            { zh: 'agent 配置 / runner', en: 'Agent config or runner' },
            { zh: '验证命令、重试上限、输出契约', en: 'Verify command, retry cap, output contract' },
          ],
          [
            { zh: '工具规格', en: 'Tool spec' },
            { zh: '工具语义重叠，选错与传错', en: 'Overlapping tools cause wrong picks and bad arguments' },
            { zh: 'MCP server / function schema', en: 'MCP server or function schema' },
            { zh: '描述首句、参数示例、错误码', en: 'First sentence of description, param examples, error codes' },
          ],
          [
            { zh: '评估用例集', en: 'Evaluation cases' },
            { zh: '「看起来能跑」没有判定标准', en: '"Looks like it works" has no acceptance criterion' },
            { zh: 'tests/evals/', en: 'tests/evals/' },
            { zh: '边界用例、对抗用例、回归用例', en: 'Edge, adversarial and regression cases' },
          ],
          [
            { zh: 'Trace 字段规范', en: 'Trace schema' },
            { zh: '出问题无法回放与归因', en: 'Failures cannot be replayed or attributed' },
            { zh: '可观测层 / OTel 属性', en: 'Observability layer or OTel attributes' },
            { zh: 'traceId 粒度、成本字段、停止原因', en: 'traceId granularity, cost fields, stop reason' },
          ],
          [
            { zh: '人工审批策略', en: 'Human approval policy' },
            { zh: '权限一刀切：要么全禁要么全放', en: 'Permissions are binary: either everything blocked or everything allowed' },
            { zh: 'hooks / sandbox 配置', en: 'Hooks or sandbox config' },
            { zh: '禁止清单、审批清单、升级路径', en: 'Forbidden list, approval list, escalation path' },
          ],
        ],
      },
      {
        type: 'h2',
        id: 'ap-a-minimal',
        text: { zh: '30 行极简版：今天就能用', en: 'The 30-line minimal version, usable today' },
      },
      {
        type: 'p',
        text: {
          zh: '如果你只想花十分钟，就抄这一份。它保留了唯一真正影响成败的三块内容：怎么跑、什么不能碰、怎么算完成。',
          en: 'If you have ten minutes, copy this one. It keeps the three things that actually decide success: how to run it, what not to touch, what counts as done.',
        },
      },
      {
        type: 'code',
        lang: 'markdown',
        title: { zh: 'AGENTS.md · 极简版', en: 'AGENTS.md · minimal' },
        code: `# <项目名>

<一句话说明这是什么、给谁用、明确不做什么。>

## 命令（照这个跑，别猜）
- 安装：\`pnpm i\`
- 测试：\`pnpm vitest run\`（单文件：\`pnpm vitest run tests/x.test.ts\`）
- 类型：\`pnpm typecheck\`
- Lint：\`pnpm lint\`
- 起服务：\`pnpm dev\`（默认 http://localhost:5173）

## 目录
- src/ui/      共享组件，无业务逻辑
- src/features/ 业务模块，一个模块一个目录
- src/server/  接口层，组件禁止直接 fetch

## 不能碰
- 不编辑 .env*、migrations/、.github/workflows/
- 不直接 push main，一律 feature/ 分支 + PR
- 不新增依赖，除非先说明理由并等确认

## 完成的标准
typecheck + lint + test 全绿，且计划文档里的验收用例通过。

## 深入
架构 → docs/ARCHITECTURE.md　决策 → docs/decisions/　进行中的计划 → docs/exec-plans/`,
      },
      {
        type: 'h2',
        id: 'ap-a-hooks',
        text: { zh: '把建议变成拦截：Hooks 与 CI', en: 'Turning advice into enforcement: hooks and CI' },
      },
      {
        type: 'p',
        text: {
          zh: '指令文件是建议，Hooks 与 CI 是法律。下面两段配置构成最小的「硬约束」：工具调用前拦截危险操作，合并前用流水线兜底。',
          en: 'Instruction files are advice; hooks and CI are law. The two snippets below form the minimum hard layer: block dangerous calls before they happen, and let the pipeline guard merges.',
        },
      },
      {
        type: 'code',
        lang: 'json',
        title: { zh: '.claude/settings.json · PreToolUse 拦截', en: '.claude/settings.json · PreToolUse guard' },
        code: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "python3 .claude/hooks/deny-dangerous.py",
            "timeout": 10
          }
        ]
      },
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
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "pnpm lint --fix \${CLAUDE_FILE_PATHS}", "timeout": 60 }]
      }
    ]
  }
}`,
      },
      {
        type: 'code',
        lang: 'bash',
        title: { zh: '.claude/hooks/protect-paths.py · 核心判断', en: '.claude/hooks/protect-paths.py · core check' },
        code: `#!/usr/bin/env python3
"""Edit/Write 命中受保护路径时返回 deny，程序级阻止而不是口头提醒。"""
import json, sys, pathlib

PROTECTED = (".env", "migrations/", ".github/workflows/", ".git/")

payload = json.load(sys.stdin)          # 钩子输入：工具名与参数
file_path = payload.get("tool_input", {}).get("file_path", "")

if any(part in file_path for part in PROTECTED):
    print(json.dumps({
        "permissionDecision": "deny",
        "permissionDecisionReason": f"{file_path} 属于受保护路径，需人工修改并说明原因",
    }))
    sys.exit(0)

print(json.dumps({"permissionDecision": "allow"}))`,
      },
      {
        type: 'code',
        lang: 'yaml',
        title: { zh: 'GitHub Actions · agent PR 门禁', en: 'GitHub Actions · gate for agent PRs' },
        code: `name: harness-gate
on:
  pull_request:
    branches: [main]

jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm i --frozen-lockfile
      - name: Typecheck
        run: pnpm typecheck
      - name: Lint (custom rules = hard constraints)
        run: pnpm lint --max-warnings 0
      - name: Tests incl. edge cases
        run: pnpm vitest run --coverage
      - name: Architecture boundary check
        run: pnpm lint:layers        # 例：ui 不得 import server 之外的层
      - name: Instruction file size guard
        run: |
          lines=$(wc -l < AGENTS.md)
          echo "AGENTS.md lines: $lines"
          test "$lines" -le 200 || { echo "入口文件超过 200 行，先做减法"; exit 1; }`,
      },
      {
        type: 'callout',
        tone: 'warn',
        title: { zh: '别一次把六套都上', en: 'Do not deploy all six at once' },
        text: {
          zh: '顺序应该是：指令地图 → 验证命令 → 一条硬约束（最常犯的那个错）→ 独立评审 → 记忆与编排。一次加一层，每层都要能指出它是为哪次事故而加的。',
          en: 'Order matters: instruction map → verification command → one hard constraint (the mistake that happens most) → independent review → memory and orchestration. Add one layer at a time and be able to name the incident each layer was added for.',
        },
      },
      {
        type: 'h2',
        id: 'ap-a-misuse',
        text: { zh: '三种最常见误用', en: 'Three common ways to misuse them' },
      },
      {
        type: 'compare',
        left: {
          title: { zh: '模板被用对的样子', en: 'Used well' },
          tone: 'good',
          items: [
            { zh: '每条规则能对应一次真实事故', en: 'Every rule maps to a real incident' },
            { zh: '命令直接可复制运行', en: 'Commands are copy-paste runnable' },
            { zh: '指针指向真的文件', en: 'Pointers resolve to real files' },
            { zh: '模型升级后回头删补丁', en: 'Patches get deleted after model upgrades' },
          ],
        },
        right: {
          title: { zh: '模板被用坏的样子', en: 'Used badly' },
          tone: 'bad',
          items: [
            { zh: '把示例项目名原样留下', en: 'Placeholder project names left untouched' },
            { zh: '写了一堆没跑过的命令', en: 'A pile of commands nobody has run' },
            { zh: '把「以防万一」当常规', en: 'Just-in-case rules treated as normal' },
            { zh: '把模板当文档，不再维护', en: 'Treated as docs, never maintained again' },
          ],
        },
      },
      {
        type: 'sources',
        items: [SRC.anthropicHooks, SRC.anthropicBestPractices, SRC.agentsMd],
      },
    ],
  },
  {
    id: 'b',
    letter: 'B',
    title: { zh: '常用工具与框架速查表', en: 'Tools & Frameworks Cheat Sheet' },
    desc: {
      zh: '按层归类的主流工具、各家指令文件命名，以及 Claude Code 的钩子事件速查。',
      en: 'Mainstream tools by layer, instruction-file naming across vendors, and a hook-event reference.',
    },
    blocks: [
      {
        type: 'h2',
        id: 'ap-b-files',
        text: { zh: '指令文件：同源不同名', en: 'Instruction files: same idea, different names' },
      },
      {
        type: 'p',
        text: {
          zh: '它们做的都是同一件事——把项目意图编码成 Markdown，在每次会话开始时注入。差别在作用域、层级覆盖和对子目录的支持。',
          en: 'They all do the same job: encode project intent as Markdown and inject it at session start. Differences lie in scope, nesting and per-directory support.',
        },
      },
      {
        type: 'table',
        head: [
          { zh: '工具', en: 'Tool' },
          { zh: '指令文件', en: 'Instruction file' },
          { zh: '特点', en: 'Notable' },
        ],
        rows: [
          [{ zh: 'Claude Code', en: 'Claude Code' }, { zh: 'CLAUDE.md（支持层级与 @import）', en: 'CLAUDE.md (hierarchical, @import)' }, { zh: '可跨目录嵌套，配合 /init 生成初稿', en: 'Nests by directory; /init generates a first draft' }],
          [{ zh: 'OpenAI Codex CLI', en: 'OpenAI Codex CLI' }, { zh: 'AGENTS.md', en: 'AGENTS.md' }, { zh: '开放的跨工具约定，仓库根与子目录皆可', en: 'Open cross-tool convention, root and subdirectories' }],
          [{ zh: 'Cursor', en: 'Cursor' }, { zh: '.cursor/rules/*.mdc', en: '.cursor/rules/*.mdc' }, { zh: '规则可按 glob / description 条件生效', en: 'Rules activate by glob or description' }],
          [{ zh: 'Windsurf', en: 'Windsurf' }, { zh: '.windsurfrules / 记忆', en: '.windsurfrules / memories' }, { zh: '带 Cascade 自动记忆', en: 'Cascade auto-memories' }],
          [{ zh: 'Gemini CLI', en: 'Gemini CLI' }, { zh: 'GEMINI.md', en: 'GEMINI.md' }, { zh: '同样支持上下文文件层级', en: 'Also supports context file hierarchy' }],
          [{ zh: 'GitHub Copilot', en: 'GitHub Copilot' }, { zh: '.github/copilot-instructions.md', en: '.github/copilot-instructions.md' }, { zh: '仓库级，随 PR 一起在 CI 环境生效', en: 'Repo-level, shared with the whole team' }],
          [{ zh: 'Cline / Roo 等', en: 'Cline / Roo etc.' }, { zh: '.clinerules 等', en: '.clinerules etc.' }, { zh: '多数已能读 AGENTS.md，逐渐收敛', en: 'Most now read AGENTS.md; converging' }],
        ],
      },
      {
        type: 'h2',
        id: 'ap-b-layers',
        text: { zh: '五层对应的工具', en: 'Tools mapped to the five layers' },
      },
      {
        type: 'table',
        head: [
          { zh: '层', en: 'Layer' },
          { zh: '常见选择', en: 'Common choices' },
          { zh: '判断标准', en: 'How to choose' },
        ],
        rows: [
          [
            { zh: '指令', en: 'Instructions' },
            { zh: 'CLAUDE.md, AGENTS.md, .cursor/rules, GEMINI.md, copilot-instructions.md', en: 'CLAUDE.md, AGENTS.md, .cursor/rules, GEMINI.md, copilot-instructions.md' },
            { zh: '能否只写不可推断的信息；是否 ≤100 行', en: 'Does it hold only non-inferable facts; is it under ~100 lines' },
          ],
          [
            { zh: '约束', en: 'Constraints' },
            { zh: 'Claude Code Hooks, 自定义 ESLint/Ruff 规则, archunit/dependency-cruiser, pre-commit, GitHub Actions, Codex sandbox', en: 'Claude Code hooks, custom ESLint/Ruff rules, archunit/dependency-cruiser, pre-commit, GitHub Actions, Codex sandbox' },
            { zh: '违反时是「拦截」还是「提醒」；只有提醒就不算这层', en: 'Does a violation block or merely warn; warning-only does not count here' },
          ],
          [
            { zh: '反馈', en: 'Feedback' },
            { zh: 'Vitest/pytest, Playwright, Chrome DevTools Protocol, 可观测性查询, 独立 evaluator agent', en: 'Vitest/pytest, Playwright, Chrome DevTools Protocol, observability queries, an independent evaluator agent' },
            { zh: 'agent 能否自己拿到「通过 / 失败」，不靠人复述', en: 'Can the agent obtain pass/fail itself, without a human restating it' },
          ],
          [
            { zh: '记忆', en: 'Memory' },
            { zh: 'CLAUDE.md/AGENTS.md, auto-memory, MCP Memory Bank, 结构化进度文件, 向量检索', en: 'CLAUDE.md/AGENTS.md, auto-memory, MCP memory bank, structured progress files, vector retrieval' },
            { zh: '同一件事是否只需要教一次', en: 'Does teaching something once make it stick' },
          ],
          [
            { zh: '编排', en: 'Orchestration' },
            { zh: 'git worktree + 多会话, Subagents, Agent Teams, LangGraph / deepagents, CI fan-out, Stripe Minions 式流水线', en: 'git worktree plus multiple sessions, subagents, agent teams, LangGraph/deepagents, CI fan-out, Stripe-Minions-style pipelines' },
            { zh: '并行收益是否大于沟通与审阅成本', en: 'Whether parallel gains beat coordination and review cost' },
          ],
          [
            { zh: '可观测', en: 'Observability' },
            { zh: 'OpenTelemetry, LangSmith/Langfuse, Datadog, 自建 trace 表', en: 'OpenTelemetry, LangSmith/Langfuse, Datadog, a home-grown trace table' },
            { zh: '能否定位到「哪一步」失败，并算出它的成本', en: 'Can you locate which step failed and what it cost' },
          ],
        ],
      },
      {
        type: 'h2',
        id: 'ap-b-hooks',
        text: { zh: 'Claude Code 钩子事件速查', en: 'Claude Code hook events at a glance' },
      },
      {
        type: 'table',
        head: [
          { zh: '事件', en: 'Event' },
          { zh: '触发时机', en: 'When it fires' },
          { zh: '能做什么', en: 'What it can do' },
        ],
        rows: [
          [{ zh: 'PreToolUse', en: 'PreToolUse' }, { zh: '工具调用之前', en: 'Before a tool call' }, { zh: 'allow / deny / ask：唯一的硬拦截点', en: 'allow / deny / ask — the hard interception point' }],
          [{ zh: 'PostToolUse', en: 'PostToolUse' }, { zh: '工具返回之后', en: 'After a tool returns' }, { zh: '自动 lint、格式化、写审计日志', en: 'Auto-lint, format, write audit logs' }],
          [{ zh: 'UserPromptSubmit', en: 'UserPromptSubmit' }, { zh: '用户提示进入模型之前', en: 'Before the prompt reaches the model' }, { zh: '注入额外上下文（当前分支、待办）', en: 'Inject extra context (branch, todos)' }],
          [{ zh: 'Notification', en: 'Notification' }, { zh: 'agent 需要人或即将结束时', en: 'When the agent needs you or is about to idle' }, { zh: '桌面通知、提醒值班', en: 'Desktop notification, on-call ping' }],
          [{ zh: 'Stop / SubagentStop', en: 'Stop / SubagentStop' }, { zh: '主/子 agent 宣告完成时', en: 'When the main or sub agent claims done' }, { zh: '强制跑测试，未过则打回继续', en: 'Force a test run; block premature completion' }],
          [{ zh: 'PreCompact', en: 'PreCompact' }, { zh: '上下文压缩之前', en: 'Before compaction' }, { zh: '保存进度笔记，防止压缩丢关键状态', en: 'Snapshot progress notes so compaction loses nothing' }],
          [{ zh: 'SessionStart / SessionEnd', en: 'SessionStart / SessionEnd' }, { zh: '会话开始 / 结束', en: 'Session open / close' }, { zh: '装载环境、写交接文档', en: 'Load environment, write the handoff doc' }],
        ],
      },
      {
        type: 'callout',
        tone: 'note',
        title: { zh: '工具会变，判断不变', en: 'Tools change, the tests do not' },
        text: {
          zh: '具体命令与钩子名称以官方文档为准。选工具时只问三句：能不能只装不可推断的信息？违规时是拦截还是提醒？agent 能不能自己拿到验证结果？',
          en: 'Check the official docs for exact commands and hook names. When choosing a tool ask only three questions: can it hold just the non-inferable facts; does a violation block or just warn; can the agent get verification results itself?',
        },
      },
      {
        type: 'sources',
        items: [SRC.anthropicClaudeCode, SRC.anthropicHooks, SRC.openaiCodex, SRC.agentsMd, SRC.langchainMiddleware, SRC.stripeMinions],
      },
    ],
  },
  {
    id: 'c',
    letter: 'C',
    title: { zh: '术语中英对照表', en: 'Glossary' },
    desc: {
      zh: '最容易混淆的术语，一次讲清；正文保留英文原词，避免翻译损耗。',
      en: 'The terms that get confused most, defined once. The main text keeps English originals to avoid translation loss.',
    },
    blocks: [
      {
        type: 'p',
        text: {
          zh: '下面这张表的判据是「一句话能不能被反驳」。如果说不出反例，那个词就还没被理解。',
          en: 'The test for each line below is whether one sentence can be contradicted. If you cannot state the counter-example, the term is not yet understood.',
        },
      },
      {
        type: 'table',
        head: [
          { zh: '术语', en: 'Term' },
          { zh: '中文', en: 'Chinese' },
          { zh: '一句话解释', en: 'One-line meaning' },
          { zh: '常见误解', en: 'Common confusion' },
        ],
        rows: [
          [{ zh: 'Harness', en: 'Harness' }, { zh: '缰绳 / 运行框架', en: '缰绳 / 运行框架' }, { zh: '模型运行其中的工具、约束、反馈与环境的整体。', en: 'The tools, constraints, feedback and environment the model runs inside.' }, { zh: '不是提示词的另一个名字', en: 'Not a fancier word for prompt' }],
          [{ zh: 'Harness Engineering', en: 'Harness Engineering' }, { zh: '缰绳工程', en: '缰绳工程' }, { zh: '设计并持续迭代 Agent 运行环境的工程实践。', en: 'Designing and iterating the environment an agent runs in.' }, { zh: '不是「写更好的 prompt」', en: 'Not prompt polishing' }],
          [{ zh: 'Agent', en: 'Agent' }, { zh: '智能体', en: '智能体' }, { zh: '模型 + harness：有状态、能执行工具、有反馈循环。', en: 'Model + harness: stateful, tool-executing, with feedback loops.' }, { zh: '把 chatbot 当成 agent', en: 'Calling a chatbot an agent' }],
          [{ zh: 'Prompt Engineering', en: 'Prompt Engineering' }, { zh: '提示词工程', en: '提示词工程' }, { zh: '优化单次输入的表达方式。', en: 'Optimizing the wording of one input.' }, { zh: '以为它可以替代约束层', en: 'Thinking it can replace enforcement' }],
          [{ zh: 'Context Engineering', en: 'Context Engineering' }, { zh: '上下文工程', en: '上下文工程' }, { zh: '设计每一步能看到的信息集合：找最小的高信号 token 集。', en: 'Designing what is visible each step: the minimal high-signal token set.' }, { zh: '把「更多」当成「更好」', en: 'Assuming more is better' }],
          [{ zh: 'Context Anxiety', en: 'Context Anxiety' }, { zh: '上下文焦虑', en: '上下文焦虑' }, { zh: '模型自感接近窗口上限时提前收尾、草率打补丁。', en: 'Wrapping up early and patching carelessly when it senses the window limit.' }, { zh: '被误读成模型变笨', en: 'Mistaken for a dumber model' }],
          [{ zh: 'Context Rot', en: 'Context Rot' }, { zh: '上下文腐烂', en: '上下文腐烂' }, { zh: '上下文越长，准确回忆任意单条信息的能力越差。', en: 'Longer context reduces accurate recall of any single fact.' }, { zh: '以为窗口够大就没问题', en: 'Assuming a big window fixes it' }],
          [{ zh: 'Compaction', en: 'Compaction' }, { zh: '压缩', en: '压缩' }, { zh: '把历史摘要化以续命；丢什么由你写下的笔记决定。', en: 'Summarizing history to keep going; your notes decide what survives.' }, { zh: '以为压缩等于记忆', en: 'Confusing compaction with memory' }],
          [{ zh: 'Planner / Generator / Evaluator', en: 'Planner / Generator / Evaluator' }, { zh: '规划者 / 生成者 / 评估者', en: '规划者 / 生成者 / 评估者' }, { zh: '把「定标准、写实现、挑刺」拆成三个独立上下文。', en: 'Splitting criteria, implementation and critique into three contexts.' }, { zh: '以为三个 agent 一定优于一个', en: 'Assuming three beats one' }],
          [{ zh: 'Evaluator', en: 'Evaluator' }, { zh: '评估者', en: '评估者' }, { zh: '独立于生成者、按验收标准打分并能动手验证的 agent。', en: 'An agent independent of the generator that scores against criteria and can verify.' }, { zh: '同一会话里的「自我反省」', en: 'Same-session self-reflection' }],
          [{ zh: 'Sprint Contract', en: 'Sprint Contract' }, { zh: '冲刺合约', en: '冲刺合约' }, { zh: '开工前由生成者与评估者共同写定的「完成」定义。', en: 'The definition of done agreed before work starts.' }, { zh: '被当成任务清单', en: 'Mistaken for a task list' }],
          [{ zh: 'Doom Loop', en: 'Doom Loop' }, { zh: '死循环', en: '死循环' }, { zh: '反复微调同一种坏假设，始终不更换方向。', en: 'Tweaking one broken hypothesis repeatedly without changing direction.' }, { zh: '被当成「坚持」', en: 'Being read as persistence' }],
          [{ zh: 'Hook', en: 'Hook' }, { zh: '钩子', en: '钩子' }, { zh: '生命周期节点上确定执行的脚本，可拦截或注入。', en: 'Deterministic scripts at lifecycle points that block or inject.' }, { zh: '和「让 AI 检查一下」混用', en: 'Confused with asking the model to check' }],
          [{ zh: 'Guardrail', en: 'Guardrail' }, { zh: '安全护栏', en: '安全护栏' }, { zh: '限制失足但不限制创造力的边界（沙箱、审批、白名单）。', en: 'Boundaries that stop falls, not creativity: sandbox, approvals, allow-lists.' }, { zh: '当成质量检查', en: 'Used as a quality check' }],
          [{ zh: 'Orchestration', en: 'Orchestration' }, { zh: '编排', en: '编排' }, { zh: '多个 agent / 任务之间的结构与流程安排。', en: 'The structure and flow across agents and tasks.' }, { zh: '以为等于并行', en: 'Thinking it means parallelism' }],
          [{ zh: 'Trace / Span', en: 'Trace / Span' }, { zh: '执行轨迹 / 跨度', en: '执行轨迹 / 跨度' }, { zh: '一次任务的步骤级记录，可回放、归因、计费。', en: 'Step-level record of a task for replay, attribution and billing.' }, { zh: '只有日志没有结构', en: 'Logs without structure' }],
          [{ zh: 'Human-in-the-loop', en: 'Human-in-the-loop' }, { zh: '人在回路', en: '人在回路' }, { zh: '关键节点由人审批或干预，且这个边界被写进 harness。', en: 'Humans approve at key points, and the boundary lives in the harness.' }, { zh: '每步都问人', en: 'Asking a human every step' }],
          [{ zh: 'Sandbox', en: 'Sandbox' }, { zh: '沙箱', en: '沙箱' }, { zh: '文件系统与网络的物理隔离边界，与提示无关。', en: 'Physical isolation of files and network, independent of prompts.' }, { zh: '以为权限提示就是沙箱', en: 'Assuming permission prompts equal sandboxing' }],
          [{ zh: 'Vibe Coding', en: 'Vibe Coding' }, { zh: '氛围编程', en: '氛围编程' }, { zh: '凭感觉接受产出、不看差异。原型可用，生产是负债。', en: 'Accepting output on feel without reading diffs. Fine for prototypes, debt for production.' }, { zh: '与 augmented coding 混用', en: 'Confused with augmented coding' }],
          [{ zh: 'Augmented Coding', en: 'Augmented Coding' }, { zh: '增强式编程', en: '增强式编程' }, { zh: 'AI 提速，但人保留判断与验证纪律（Kent Beck 的说法）。', en: 'AI speeds you up while you keep judgment and verification discipline (Kent Beck’s framing).' }, { zh: '当成更礼貌的说法', en: 'Treated as a nicer word for the same thing' }],
          [{ zh: 'TDD / Red-Green-Refactor', en: 'TDD / Red-Green-Refactor' }, { zh: '测试驱动开发', en: '测试驱动开发' }, { zh: '先写失败测试再实现；天生就是给 agent 的反馈层。', en: 'Write a failing test first; natively a feedback layer for agents.' }, { zh: '当成过时的仪式', en: 'Seen as an obsolete ritual' }],
          [{ zh: 'Garbage Collection', en: 'Garbage Collection' }, { zh: '垃圾回收（Fowler 语境）', en: '垃圾回收（Fowler 语境）' }, { zh: '周期性清理文档矛盾与架构违规，对抗熵增。', en: 'Periodic sweep of doc contradictions and architecture violations.' }, { zh: '以为模型会自愈', en: 'Expecting the repo to self-heal' }],
        ],
      },
      {
        type: 'callout',
        tone: 'note',
        text: {
          zh: '本站正文对以上术语一律保留英文原词（如 harness、evaluator、hook、trace），中文语境的「缰绳」只在比喻意义上使用。',
          en: 'This site keeps these terms in English in the body text (harness, evaluator, hook, trace). 缰绳 is used only as the metaphor.',
        },
      },
    ],
  },
  {
    id: 'd',
    letter: 'D',
    title: { zh: '延伸阅读资源清单', en: 'Reading List' },
    desc: {
      zh: '本站依赖的一手资料，按主题归类，全部指向官方原文。',
      en: 'Primary sources this guide relies on, grouped by theme, all pointing at official originals.',
    },
    blocks: [
      {
        type: 'h2',
        id: 'ap-d-origin',
        text: { zh: '概念起源与中文原书', en: 'Origins and the source book' },
      },
      {
        type: 'p',
        text: {
          zh: '「Harness Engineering」这个词在 2026 年 2 月由 Mitchell Hashimoto 的博客与 OpenAI 的官方博文几乎同时带火；本站的章节骨架取自花叔的《Harness Engineering 橙皮书》，数据与做法再回到一手来源逐条核对。',
          en: 'Harness Engineering was carried into public vocabulary within days in February 2026 — Mitchell Hashimoto’s blog post and OpenAI’s official article. The chapter skeleton here follows the orange book, while numbers and practices are re-checked against primary sources.',
        },
      },
      { type: 'sources', items: [SRC.orangeBook, SRC.mitchell, SRC.openaiHarness, SRC.fowler] },

      {
        type: 'h2',
        id: 'ap-d-labs',
        text: { zh: '大厂一手实践', en: 'Primary field reports' },
      },
      { type: 'sources', items: [SRC.openaiCodexLoop, SRC.openaiCodexPlatform, SRC.openaiCodexRepo, SRC.anthropicHarnessDesign, SRC.anthropicLongRunning, SRC.anthropicMultiAgent, SRC.stripeMinions, SRC.stripeBlog] },

      {
        type: 'h2',
        id: 'ap-d-context',
        text: { zh: '上下文、Harness 与 Claude Code', en: 'Context, harness and Claude Code' },
      },
      { type: 'sources', items: [SRC.anthropicContext, SRC.anthropicBuilding, SRC.anthropicBestPractices, SRC.anthropicClaudeCode, SRC.anthropicHooks] },

      {
        type: 'h2',
        id: 'ap-d-framework',
        text: { zh: '框架与标准', en: 'Frameworks and standards' },
      },
      { type: 'sources', items: [SRC.langchainBlog, SRC.langchainMiddleware, SRC.agentsMd] },

      {
        type: 'h2',
        id: 'ap-d-craft',
        text: { zh: '工程传统', en: 'The engineering craft lineage' },
      },
      {
        type: 'p',
        text: {
          zh: 'TDD、持续集成与「先整理再提交」不是老古董，它们恰好是今天 agent harness 的反馈层与约束层。想理解为什么这套东西能沿用，读这两位。',
          en: 'TDD, continuous integration and tidy-first are not antiques; they are precisely today’s feedback and constraint layers for agent harnesses. Read these two to see why the lineage holds.',
        },
      },
      { type: 'sources', items: [SRC.beck, SRC.tidyFirst] },

      {
        type: 'h2',
        id: 'ap-d-reading-order',
        text: { zh: '建议阅读顺序', en: 'A reading order that works' },
      },
      {
        type: 'steps',
        items: [
          {
            title: { zh: '先读定义', en: 'Definition first' },
            text: { zh: 'OpenAI《Harness engineering》与 Hashimoto《My AI Adoption Journey》——一个讲组织，一个讲个人。', en: 'OpenAI’s harness article and Hashimoto’s adoption journey: one organizational, one personal.' },
          },
          {
            title: { zh: '再读机制', en: 'Then mechanisms' },
            text: { zh: 'Anthropic 的 harness design 与 effective context engineering，两篇合起来就是反馈层 + 上下文层。', en: 'Anthropic’s harness design plus effective context engineering: the feedback layer and the context layer.' },
          },
          {
            title: { zh: '然后读规模化证据', en: 'Then scale evidence' },
            text: { zh: 'LangChain 的 benchmark 拆解与 Stripe Minions，看 harness 改动带来的可量化收益。', en: 'LangChain’s benchmark breakdown and Stripe Minions, for quantifiable gains from harness changes.' },
          },
          {
            title: { zh: '最后读纪律', en: 'Finally discipline' },
            text: { zh: 'Martin Fowler 的分析与 Kent Beck 的 augmented coding，补上「什么时候该做减法」。', en: 'Fowler’s analysis and Kent Beck on augmented coding supply the subtraction discipline.' },
          },
        ],
      },
    ],
  },
  {
    id: 'e',
    letter: 'E',
    title: { zh: '姊妹项目全导航', en: 'Sister Projects' },
    desc: {
      zh: '鱼心快跑的 Agent 知识体系：十一个站点，各管一段，互相引用但不重复。',
      en: 'The Yuxin Runs agent knowledge system: eleven sites, each owning one slice, cross-linked but not duplicated.',
    },
    blocks: [
      {
        type: 'h2',
        id: 'ap-e-map',
        text: { zh: '这套站点是怎么分工的', en: 'How the sites divide the territory' },
      },
      {
        type: 'table',
        head: [
          { zh: '项目', en: 'Project' },
          { zh: '管什么问题', en: 'What it owns' },
          { zh: '和本站的关系', en: 'Relationship to this site' },
        ],
        rows: [
          [{ zh: 'better-agent', en: 'better-agent' }, { zh: 'Agent 的基本工作原理与入门实践', en: 'How agents work and how to start' }, { zh: '前置：概念与最小可用', en: 'Prerequisite: concepts and the minimum working version' }],
          [{ zh: 'agent-ontology', en: 'agent-ontology' }, { zh: 'Agent 世界里的概念边界与定义', en: 'Concept boundaries and definitions' }, { zh: '术语对齐时回到这里', en: 'Return here to align terminology' }],
          [{ zh: 'agent-loop-engineering', en: 'agent-loop-engineering' }, { zh: '单 agent 循环：推理、工具、状态机', en: 'The single-agent loop: reasoning, tools, state machine' }, { zh: 'Harness 的「一轮」发生在哪里', en: 'Where one harness turn happens' }],
          [{ zh: 'harness-engineering', en: 'harness-engineering' }, { zh: '模型运行的环境：五层缰绳', en: 'The runtime environment: five layers of rein' }, { zh: '你在这里', en: 'You are here' }],
          [{ zh: 'agent-evaluation-patterns', en: 'agent-evaluation-patterns' }, { zh: '怎么判定「做好了」', en: 'How to decide it is done well' }, { zh: '反馈层的深水区', en: 'The deep end of the feedback layer' }],
          [{ zh: 'agent-skillhub-patterns', en: 'agent-skillhub-patterns' }, { zh: '能力如何打包、分发、复用', en: 'Packaging and reusing capabilities' }, { zh: '指令与能力层的外部供给', en: 'Supply side for instruction and capability' }],
          [{ zh: 'agent-observability-patterns', en: 'agent-observability-patterns' }, { zh: 'Trace、指标、回放、归因', en: 'Traces, metrics, replay, attribution' }, { zh: '让反馈层可度量的基础设施', en: 'Infrastructure that makes feedback measurable' }],
          [{ zh: 'agent-memory-patterns', en: 'agent-memory-patterns' }, { zh: '跨会话的知识与状态', en: 'Knowledge and state across sessions' }, { zh: '记忆层的专门展开', en: 'The memory layer expanded' }],
          [{ zh: 'a2a-patterns', en: 'a2a-patterns' }, { zh: 'Agent 之间怎么通信与协作', en: 'Agent-to-agent communication and coordination' }, { zh: '编排层的协议面', en: 'The protocol side of orchestration' }],
          [{ zh: 'llm-gateway-patterns', en: 'llm-gateway-patterns' }, { zh: '模型接入、配额、成本与路由', en: 'Model access, quota, cost and routing' }, { zh: '约束层里与模型有关的物理边界', en: 'Physical model boundaries in the constraint layer' }],
          [{ zh: 'mcp-patterns', en: 'mcp-patterns' }, { zh: '工具与上下文的标准化接入', en: 'Standardized tool and context access' }, { zh: '能力层的主要载体', en: 'The main carrier of the capability layer' }],
        ],
      },
      {
        type: 'h2',
        id: 'ap-e-path',
        text: { zh: '三条学习路线', en: 'Three learning paths' },
      },
      {
        type: 'list',
        ordered: true,
        items: [
          {
            zh: '刚入门：better-agent → harness-engineering（第 1–4 章）→ agent-loop-engineering。',
            en: 'Newcomer: better-agent → harness-engineering (chapters 1–4) → agent-loop-engineering.',
          },
          {
            zh: '要上生产：本站第 5–8 章 → agent-evaluation-patterns → agent-observability-patterns → 本站第 18 章门禁。',
            en: 'Going to production: this site chapters 5–8 → agent-evaluation-patterns → agent-observability-patterns → this site chapter 18.',
          },
          {
            zh: '做平台：llm-gateway-patterns → mcp-patterns → agent-skillhub-patterns → 本站第 12 章（企业流水线）。',
            en: 'Building a platform: llm-gateway-patterns → mcp-patterns → agent-skillhub-patterns → this site chapter 12.',
          },
        ],
      },
      {
        type: 'siblings',
        title: { zh: '直接过去逛', en: 'Go browse' },
        items: [
          'better-agent',
          'agent-ontology',
          'agent-loop-engineering',
          'agent-evaluation-patterns',
          'agent-skillhub-patterns',
          'agent-observability-patterns',
          'agent-memory-patterns',
          'a2a-patterns',
          'llm-gateway-patterns',
          'mcp-patterns',
        ],
      },
      {
        type: 'callout',
        tone: 'tip',
        text: {
          zh: '这些站点共用同一套术语和导航。如果你在一个站点里找不到答案，八成在另一个站点的某一章里。',
          en: 'These sites share one vocabulary and one navigation. If an answer is missing here, it is probably a chapter on another site.',
        },
      },
    ],
  },
];

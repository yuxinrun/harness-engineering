import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch16: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '把前五章的原理拧成三个可直接抄改的配置：前端、后端、内容生产。每个场景给一套完整指令模板 + 踩坑清单 + 效果评估方法。核心方法一致（犯错驱动、地图而非手册、让 AI 查 AI），差别只在「这个领域 agent 最容易在哪犯错」。',
        en: 'Chapter 5’s principles, twisted into three copy-and-edit configurations: frontend, backend, content production. Each gets a full instruction template plus a pitfall list and an evaluation method. The method is identical (mistake-driven, map-not-manual, let-AI-review-AI); only "where this domain’s agent most often slips" changes.',
      },
    },

    { type: 'h2', id: 'method', text: { zh: '先看共性：三场景共享的骨架', en: 'First the shared skeleton' } },
    {
      type: 'p',
      text: {
        zh: '无论哪个领域，一份能用的指令文件都由四类信息组成，且都遵守「只写 agent 猜不到的、不写它读代码就发现的」这条铁律：',
        en: 'Whatever the domain, a usable instruction file is made of four kinds of information, all obeying the iron rule—write what the agent cannot guess, skip what it learns by reading the code:',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '信息类别', en: 'Category' },
        { zh: '该写', en: 'Write this' },
        { zh: '别写', en: 'Skip this' },
      ],
      rows: [
        [{ zh: '命令', en: 'Commands' }, { zh: 'agent 猜不到的（如 pnpm vitest run、定向测试过滤）', en: 'what it cannot guess (pnpm vitest run, filtered tests)' }, { zh: '标准语言惯例、读代码即知的事实', en: 'standard conventions, facts readable from code' }],
        [{ zh: '结构地图', en: 'Structure map' }, { zh: '目录职责、谁负责什么、依赖方向', en: 'directory roles, ownership, dependency direction' }, { zh: '频繁变化的文件清单', en: 'a file list that changes weekly' }],
        [{ zh: '护栏 / 不变量', en: 'Guardrails / invariants' }, { zh: '「不使用 X」「禁止跨层调用」这类排除式约束', en: 'exclusion-style rules: "no X", "no cross-layer call"' }, { zh: '"写干净代码"之类不言自明的话', en: 'self-evident platitudes like "write clean code"' }],
        [{ zh: '验收与反馈', en: 'Acceptance / feedback' }, { zh: '怎么算做完、跑什么验证、独立审查步骤', en: 'what counts as done, which check to run, the review step' }, { zh: '长篇教程与 API 文档（链接即可）', en: 'long tutorials and API docs (just link them)' }],
      ],
      caption: {
        zh: '这一张表来自 OpenAI「给地图不给说明书」+ Mitchell「只记录真正犯过的错」+ Boris「删掉不会导致出错的每一行」三者的交集。下面三套配置都是它的实例化。',
        en: 'The table is the intersection of OpenAI’s map-not-manual, Mitchell’s record-only-real-mistakes, and Boris’s delete-every-line-that-changes-nothing. The three configs below instantiate it.',
      },
    },

    { type: 'h2', id: 'frontend', text: { zh: '场景一 · 前端：管住「能跑但没人能维护」', en: 'Scenario 1 · frontend: taming "it runs but no one can maintain it"' } },
    {
      type: 'p',
      text: {
        zh: '前端 agent 最常见的病症是**生成巨大组件、样式方案混用、请求逻辑写进组件、无障碍缺失**。它的解法不是让 AI 更聪明，而是把架构约束写成可验证的硬规则（第 6 章：机械化强制优于文档规范）。',
        en: 'The typical frontend-agent ailments are **giant components, mixed styling approaches, request logic embedded in components, and missing accessibility.** The fix is not a smarter AI but architecture constraints written as verifiable hard rules (chapter 6: mechanical enforcement beats documentation).',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '前端 CLAUDE.md 模板（可复制）', en: 'Frontend CLAUDE.md template (copy-ready)' },
      code: `# 技术栈
- React 函数组件 + hooks；Vite；TypeScript；Tailwind（禁用 CSS Modules）
- 测试用 Vitest：pnpm vitest run / 单文件 pnpm vitest run src/**/x.test.tsx

# 项目结构
- src/components/  共享 UI 组件（无业务逻辑）
- src/features/    按功能模块组织的业务代码
- src/hooks/       自定义 hook（业务逻辑抽离到这里）
- src/api/         请求层，禁止在组件里直接 fetch

# 架构不变量（声明「不存在什么」，比列举「用什么」更省上下文）
- 不使用 styled-components / emotion，样式只写 Tailwind class
- 不使用 TypeScript enum，用 literal union type
- 没有全局状态库，跨组件状态用 React Context + hooks

# 组件硬约束
- 单文件 ≤ 200 行，超 150 行就拆子组件
- Props 用 interface；每个交互元素可键盘触达，图片有 alt
- 提交前：pnpm lint && pnpm type-check && pnpm test

# 反馈：交付前自检 → 新会话独立审查
- 用 Chrome DevTools 截图对比改动前后，视觉回归不过关就退回
`,
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '前端踩坑清单', en: 'Frontend pitfall list' },
      text: {
        zh: '（1）agent 爱用 npm，会和 pnpm-lock 冲突——在指令里写死「只用 pnpm」。（2）它给一个简单功能装 lodash 或 moment——写「已有 date-fns，别再引入日期库」。（3）只跑「快乐路径」：不做 loading / error / 空态——把三种状态写进验收标准。（4）无障碍全靠事后补：把 keyboard/alt 放进硬约束，比写在「最佳实践」段落里有效得多。',
        en: '(1) The agent reaches for npm and collides with pnpm-lock—hard-code "pnpm only". (2) It installs lodash or moment for a trivial need—write "date-fns already present, do not add a date library". (3) It tests only the happy path, ignoring loading/error/empty—put all three states in the acceptance criteria. (4) Accessibility is always deferred—placing keyboard/alt in hard constraints beats a "best practices" paragraph.',
      },
    },

    { type: 'h2', id: 'backend', text: { zh: '场景二 · 后端：把依赖层级钉死', en: 'Scenario 2 · backend: nail the dependency layers down' } },
    {
      type: 'p',
      text: {
        zh: '后端最怕的是**跨层调用、数据边界不校验、agent 顺手改了迁移或 seed**。这里直接借 OpenAI Codex 的硬性依赖层级（第 9 章），把架构变成 CI 能拦的约束——而不是靠文档恳求。',
        en: 'The backend fears **cross-layer calls, unvalidated data boundaries, and the agent casually editing a migration or seed.** Here we borrow OpenAI Codex’s strict dependency layers (chapter 9) and turn architecture into a CI-enforceable constraint rather than a document that pleads.',
      },
    },
    {
      type: 'code',
      lang: 'text',
      title: { zh: '后端架构不变量 + Hook 拦截', en: 'Backend invariants + hook gate' },
      code: `# AGENTS.md · 依赖层级（强制，反向依赖过不了 CI）
Types → Config → Repo → Service → Runtime → UI
- UI/Controller 不得直接访问数据库，必须经 Service
- 所有 DB 操作走 Repo 层；SQL 用参数化查询，禁止字符串拼接
- 迁移文件（migrations/）与 seed 属敏感区，改动需人工确认

# .claude/settings.json · PostToolUse 自动类型检查 + 禁改迁移
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "pnpm type-check 2>&1 | head -20" }] }
    ],
    "PreToolUse": [
      { "matcher": "Edit|Write",
        "hooks": [{ "type": "command", "command": "python3 .claude/hooks/protect-paths.py" }] }
        // protect-paths.py：命中 migrations/、.env、生产配置则以
        // hookSpecificOutput.permissionDecision = "deny" 拦截
    ]
  }
}
`,
    },
    {
      type: 'list',
      items: [
        {
          zh: '错误处理：不允许空 catch，API 错误统一走 AppError，错误信息里带「怎么修」的指引——让 agent 能自修复，这是 OpenAI 原则三的落地。',
          en: 'Error handling: no empty catch, unify API errors under AppError, and let the error message carry the fix guidance so the agent can self-repair—this is OpenAI principle three applied.',
        },
        {
          zh: '幂等与边界：写接口要声明幂等策略；在数据边界强制解析（zod / 手写校验），让 agent 只能选预定义 schema。',
          en: 'Idempotency and boundaries: write endpoints must declare an idempotency strategy; parse is enforced at the data boundary (zod or hand validation) so the agent can only pick predefined schemas.',
        },
        {
          zh: '验证反馈：给 agent 连上能跑迁移 + 起测试库的工具（Codex 用 Chrome DevTools 的等价物是给它一个隔离实例与可查的日志栈），「跑过测试」必须是它自己验证过的事实。',
          en: 'Verification feedback: give the agent tools to run migrations against a test DB and inspect logs (the backend equivalent of Codex’s Chrome DevTools—an isolated instance with queryable logs), so "tests passed" is a fact it verified itself.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '后端踩坑清单', en: 'Backend pitfall list' },
      text: {
        zh: '（1）agent 爱在 Service 里直接开事务又混进 Controller——把「事务边界只能在 Repo」写成 linter 规则。（2）顺手生成一个破坏性迁移或 drop 语句——用 PreToolUse hook 物理拦截 migrations/。（3）为省事加「宽松」的鉴权或关掉校验——把安全关键文件的改动纳入人工审批策略（附录 B）。判断力在人手里（第 11 章），别让 agent 自己拆护栏。',
        en: '(1) It opens a transaction inside Service and leaks it into Controller—make "transaction boundaries live only in Repo" a linter rule. (2) It emits a destructive migration or a DROP—physically gate migrations/ with a PreToolUse hook. (3) For convenience it loosens auth or disables validation—put changes to security-critical files under a human-approval policy (appendix B). Judgment stays with the human (chapter 11); never let the agent dismantle its own guardrails.',
      },
    },

    { type: 'h2', id: 'content', text: { zh: '场景三 · 内容生产：路由器 + 声音规范', en: 'Scenario 3 · content: the router pattern + voice rules' } },
    {
      type: 'p',
      text: {
        zh: '内容工作不写代码，但 harness 一样管用——而且这里最能体现第 5 章的**路由器模式**：一个人同时管公众号、小红书、视频脚本、文档好几类完全不同风格的工作，规则几乎不重叠。把它们平铺进一个文件，每次加载都带一堆无关规则；用根文件只做路由、指向各工作区的子文件，才保持上下文干净。',
        en: 'Content work writes no code, yet the harness applies just as well—and this is where chapter 5’s **router pattern** shines: one person manages a WeChat column, Xiaohongshu notes, video scripts and docs, styles that barely overlap. Flattening them into one file drags irrelevant rules into every load; a root file that only routes to per-workspace sub-files keeps context clean.',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '内容生产的根 CLAUDE.md：只做路由', en: 'Content root CLAUDE.md: routing only' },
      code: `# 工作区路由
收到任务先判断属于哪个工作区，再读取对应子 CLAUDE.md：

| 关键词         | 工作区     | 读取文件              |
|----------------|------------|-----------------------|
| 公众号、长文   | 公众号写作 | ./01-wechat/CLAUDE.md |
| 小红书、笔记   | 小红书写作 | ./02-xhs/CLAUDE.md    |
| 视频脚本       | 视频创作   | ./03-video/CLAUDE.md  |
| 文档、README   | 技术文档   | ./04-docs/CLAUDE.md   |

- 任务模糊 → 先询问确认，不要猜工作区
- 涉及多工作区 → 依次读取，别一次性塞进全部规则
- 根文件保持精简，具体执行规则全在子目录

# 每个子工作区各写：声音规范 + 结构模板 + 禁忌词表
# 例：./01-wechat/CLAUDE.md 会规定「本文风格：类比丰富、口语化、
# 每节末尾标注来源」；./03-video/CLAUDE.md 会规定口播节奏与分镜粒度。
`,
    },
    {
      type: 'list',
      items: [
        {
          zh: '声音一致性是最难自动化的：把品牌语气、句式偏好、禁用词（夸大承诺词、绝对化用语）写进子文件，并给 2–3 段「这就是我们的味道」的范例——范例比形容词更能锚定风格。',
          en: 'Voice is the hardest to automate: write brand tone, sentence preferences and banned words (over-promising, absolutes) into the sub-file, and add 2–3 sample paragraphs that "taste like us"—examples anchor style far better than adjectives.',
        },
        {
          zh: '事实与来源纪律：内容场景的「测试」就是事实核查。规则——每个数据/引用标注来源、不得杜撰链接、来源不足时明说「未核实」，而不是编一个。这正是本书「禁止占位文本 / 引用必须真实」的同一纪律。',
          en: 'Fact and sourcing discipline: in content, the "test" is fact-checking. The rule—cite a source for every datum, never fabricate a link, and when sourcing is thin say "unverified" instead of inventing one. It is the very discipline this site holds: no placeholder text, citations must be real.',
        },
        {
          zh: '反馈闭环：初稿完成后开一个全新会话做「编辑审查」——只给成稿不给写作过程，让第二个 AI 按验收标准挑事实、语气和结构问题（第 7 章的最小可行评估版）。',
          en: 'Feedback loop: after the draft, open a fresh session as the "editor"—give it only the finished piece, not the writing process, and have the second AI judge facts, tone and structure against the acceptance criteria (chapter 7’s minimum-viable evaluation).',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '内容踩坑清单', en: 'Content pitfall list' },
      text: {
        zh: '（1）风格漂移——同一作者不同篇声音不一致，靠范例锚定 + 独立编辑审查。（2）幻觉引用——它会把「看起来合理」的链接当真，必须硬约束「引用只能来自给定来源，缺失就标注未核实」。（3）为凑字数注水——把长度写成区间和「删掉不影响信息的段落就删」的减法纪律（第 17 章）。',
        en: '(1) Voice drift—tone varies piece to piece; fix with example anchoring plus an independent editor pass. (2) Hallucinated citations—it treats a plausible link as real; hard-constrain "citations come only from provided sources; else mark unverified". (3) Padding to hit length—express length as a range and a subtraction rule "if deleting a paragraph loses nothing, delete it" (chapter 17).',
      },
    },

    { type: 'h2', id: 'eval', text: { zh: '怎么知道配置有没有用：三场景的效果评估', en: 'Did the config help? evaluation across the three' } },
    {
      type: 'table',
      head: [
        { zh: '场景', en: 'Scenario' },
        { zh: '量化信号', en: 'Quantitative signal' },
        { zh: '怎么测', en: 'How to measure' },
      ],
      rows: [
        [
          { zh: '前端', en: 'Frontend' },
          { zh: '一次通过率 / 返工次数 / 巨型组件比例', en: 'first-pass rate / rework count / share of oversized components' },
          { zh: '跑一轮固定任务集，统计「需人工介入才合格」的比例，改规则前后各测一次对比', en: 'run a fixed task set, count how many need human rescue, compare before/after a rule change' },
        ],
        [
          { zh: '后端', en: 'Backend' },
          { zh: 'CI 拦截次数 / 跨层违规数 / 测试覆盖增量', en: 'CI blocks / cross-layer violations / coverage delta' },
          { zh: '统计 hook 与 CI 实际拦下的违规；对同一功能给「裸 agent」和「harnessed agent」各跑一次比缺陷密度', en: 'count violations the hooks/CI actually caught; run one feature with a bare vs harnessed agent and compare defect density' },
        ],
        [
          { zh: '内容', en: 'Content' },
          { zh: '事实错误率 / 风格一致性评分 / 注水比例', en: 'factual-error rate / style-consistency score / padding ratio' },
          { zh: '用独立会话按同一评分表盲评多稿，跟踪「未核实引用」清零与否', en: 'have a separate session blind-score drafts on one rubric; track whether "unverified citations" reach zero' },
        ],
      ],
      caption: {
        zh: '评估的元原则来自第 13 章 LangChain 的 boosting 法：建基线 → 定向改一条 → 回归验证 → 循环。不要一次改十条规则然后不知道是哪条起了作用。',
        en: 'The meta-principle comes from chapter 13’s LangChain boosting loop: baseline → change one rule → regress → repeat. Do not alter ten rules at once and never learn which one worked.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '三套配置，一条心法', en: 'Three configs, one mindset' },
      text: {
        zh: '领域不同，但三个场景都在做同一件事：**先让 agent 自由跑，观察它真实犯错的地方，把那个洞堵成规则；能升级为硬约束（hook / CI / linter）的绝不只写在文档里；定期回来做减法。** 这就是把「Harness 是长出来的，不是设计出来的」（第 10 章）落到你今天的第一个业务目录上。',
        en: 'Different domains, same job in all three: **let the agent run free first, watch where it actually errs, turn that hole into a rule; anything that can become a hard constraint (hook / CI / linter) is never left as mere prose; revisit periodically to subtract.** That is chapter 10’s "a harness grows, it is not designed" landed on today’s first business directory.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '拿去改成你自己的：模板与模式', en: 'Make them yours: templates and patterns' },
      items: ['agent-skillhub-patterns', 'better-agent', 'agent-loop-engineering', 'a2a-patterns'],
    },
  ],
  sources: [SRC.openaiHarness, SRC.anthropicBestPractices, SRC.mitchell, SRC.langchainBlog, SRC.anthropicHooks, SRC.orangeBook],
};

export default ch16;

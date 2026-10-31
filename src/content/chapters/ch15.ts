import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch15: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '别想着一步到位。一个空文件、一个犯错的 agent、一条新规则——三个月后回头看，那个文件就是你的 harness。这一章不讲道理，只带你走一遍真实的从零演练。',
        en: 'Do not aim for perfect on day one. An empty file, one agent that errs, one new rule—and three months later that file is your harness. This chapter is not theory; it walks you through the real from-scratch drill.',
      },
    },

    { type: 'h2', id: 'day1', text: { zh: '第一天的指令文件：什么都不写', en: 'Day one: write nothing' } },
    {
      type: 'p',
      text: {
        zh: '不管你用哪个 AI 编程工具，harness 的起点都一样——**一个空的指令文件。** 区别只是文件名和位置：Claude Code 是项目根目录的 CLAUDE.md，Codex CLI 是 AGENTS.md，Cursor 是 .cursor/rules/ 下的 .mdc 文件（三者完整对比见第 5 章）。最小起步动作只有一行：',
        en: 'Whichever AI coding tool you use, the harness starts in the same place—**an empty instruction file.** Only the name and path differ: Claude Code uses CLAUDE.md at the project root, Codex CLI uses AGENTS.md, Cursor uses .mdc files under .cursor/rules/ (full comparison in chapter 5). The minimal starting move is one line:',
      },
    },
    {
      type: 'code',
      lang: 'bash',
      title: { zh: '创建你的第一个指令文件', en: 'Create your first instruction file' },
      code: `# 选你正在用的工具，创建对应的空文件
touch CLAUDE.md          # Claude Code
# touch AGENTS.md        # Codex CLI
# mkdir -p .cursor/rules # Cursor

# 文件建完了，往里写什么？
# 什么都不写。
# 这不是偷懒，是纪律：agent 犯错才加规则，别预设。
`,
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '为什么「什么都不写」是对的', en: 'Why "write nothing" is correct' },
      text: {
        zh: '这是第 10 章 Mitchell Hashimoto 方法论的直接落地：agent 犯错才加规则，别预设。他的 Ghostty AGENTS.md 每一行都对应 agent 过去犯过的一次错，文件是活的、一直在长。作者自己的 CLAUDE.md 也是这么长出来的——「被 AI 搞烦了就加一条，规则太多了就砍一轮。没人教过我该怎么写，它自己长出来的。」先动起手，让真实问题驱动第一条规则。',
        en: 'This is chapter 10’s Mitchell Hashimoto method applied directly: add a rule only when the agent errs, do not pre-predict. Every line of his Ghostty AGENTS.md maps to a past mistake; the file is alive and keeps growing. The author’s own CLAUDE.md grew the same way—"when the AI frustrates me I add a line, when it piles up I cut a round. Nobody taught me how; it grew itself." Start working, and let a real problem drive the first rule.',
      },
    },

    { type: 'h2', id: 'drill', text: { zh: '一次具体演练：从 0 到 10 条规则', en: 'A concrete drill: 0 to 10 rules' } },
    {
      type: 'p',
      text: {
        zh: '假设你刚接手一个 React 项目，从空文件开始，看看前 10 条规则会是怎么「长」出来的。每条都不是凭空想，背后都是一次具体的踩坑：',
        en: 'Suppose you just took over a React project. Starting from an empty file, here is how the first 10 rules grow themselves. Not one is invented—each sits behind a concrete stumble:',
      },
    },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '① agent 把测试跑错了', en: '① It ran the wrong test command' },
          text: {
            zh: '它用 npm test，但项目用 Vitest。加第一条规则，写清运行方式和单文件方式，避免它每次都猜。',
            en: 'It used npm test while the project uses Vitest. Add rule one: state the run command and the single-file form so it stops guessing.',
          },
        },
        {
          title: { zh: '② 用了错误的包管理器', en: '② Wrong package manager' },
          text: {
            zh: '它用 npm 装包，package-lock.json 和 pnpm-lock.yaml 冲突了。规则：只用 pnpm，禁止 npm 和 yarn。',
            en: 'It installed via npm and collided package-lock.json with pnpm-lock.yaml. Rule: pnpm only; npm and yarn banned.',
          },
        },
        {
          title: { zh: '③ 不知道项目结构', en: '③ Ignorant of the layout' },
          text: {
            zh: '它把组件放错目录。加一段地图：components 放共享 UI、features 放业务模块、lib 放工具、api 放请求层——「不要把请求逻辑写在组件里」。',
            en: 'It dropped a component in the wrong folder. Add a map: components for shared UI, features for business modules, lib for utilities, api for the request layer—"never put request logic inside components".',
          },
        },
        {
          title: { zh: '④ 用了 TypeScript enum', en: '④ Used a TS enum' },
          text: {
            zh: '团队规范是用 union type 代替 enum。加风格规则，并给出反例和正例对照——错误信息带上「怎么写才对」，agent 才能自己修。',
            en: 'Team convention replaces enums with union types. Add a style rule with a wrong and right example side by side—pair the error with "here is the correct form" so the agent fixes itself.',
          },
        },
        {
          title: { zh: '⑤ 直接 push 到 main', en: '⑤ Pushed straight to main' },
          text: {
            zh: '它做完改动直接推主分支。加分支规范：永不 push main，走 feature/ 分支 + PR，commit message 用英文、格式 type(scope): description。',
            en: 'It pushed to main on finishing. Add a branch rule: never push main, use feature/ + PR, English commits in type(scope): description form.',
          },
        },
        {
          title: { zh: '⑥ 生成了 500 行巨型组件', en: '⑥ Emit a 500-line component' },
          text: {
            zh: '一个组件 500 行、可读性极差。加架构约束：单文件不超 200 行、超 150 行考虑拆分、业务逻辑用自定义 hook 抽离，组件只做渲染。',
            en: 'One 500-line component, unreadable. Add an architecture cap: no file past 200 lines, split past 150, pull business logic into custom hooks, components only render.',
          },
        },
        {
          title: { zh: '⑦ 引入不需要的依赖', en: '⑦ Added an unneeded dependency' },
          text: {
            zh: '为一个简单功能装了庞大的库。加依赖原则：装新库前先确认现有依赖能否实现、优先原生 API 和已有库、「date-fns 已装，别再引入 moment/dayjs」。',
            en: 'It installed a heavy library for a trivial feature. Add a dependency rule: check existing deps first, prefer native APIs and libraries already present—"date-fns is installed, do not add moment/dayjs".',
          },
        },
        {
          title: { zh: '⑧ 不跑 lint 就提交', en: '⑧ Committed without linting' },
          text: {
            zh: '加提交前检查：必须跑 pnpm lint && pnpm type-check，lint 错误必须修，不允许 // eslint-disable 蒙混过关。',
            en: 'Add a pre-commit gate: run pnpm lint && pnpm type-check, lint errors must be fixed, no // eslint-disable fudging.',
          },
        },
        {
          title: { zh: '⑨ 错误处理太简陋', en: '⑨ Sloppy error handling' },
          text: {
            zh: '到处是空 catch 和 console.log。加错误规范：不允许空 catch、API 错误统一用 AppError 类、用户可见错误要友好、不暴露技术细节。',
            en: 'Empty catch blocks and console.log everywhere. Add an error rule: no empty catch, unify API errors under the AppError class, keep user-facing messages friendly and hide technical detail.',
          },
        },
        {
          title: { zh: '⑩ API 调用散落各处', en: '⑩ API calls scattered about' },
          text: {
            zh: '组件里到处直接 fetch。加 API 层规范：所有请求通过 src/api/ 模块发起、用项目封装的 apiClient、组件里禁止直接 fetch。',
            en: 'Components calling fetch directly. Add an API-layer rule: route every request through src/api/ modules using the project apiClient; direct fetch in components is banned.',
          },
        },
      ],
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: '这 10 条沉淀成的 CLAUDE.md 片段', en: 'The 10 rules distilled into a CLAUDE.md excerpt' },
      code: `# 测试
- 运行测试：pnpm vitest run
- 单文件：pnpm vitest run src/path/to/test.ts

# 包管理
- 只用 pnpm，禁止 npm 和 yarn

# 项目结构
- src/components/ 共享UI组件 · src/features/ 业务模块
- src/lib/ 工具函数 · src/api/ 请求层（别把请求逻辑写进组件）

# 代码风格
- 不用 TS enum，用 literal union type：
  ✅ type Status = 'active' | 'inactive'

# 架构原则
- 单组件文件 ≤ 200 行；业务逻辑用自定义 hook 抽离

# 提交前检查
- pnpm lint && pnpm type-check，lint 错误必修，禁止 eslint-disable
`,
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '长度标准：起步 20–50，成熟 ≤100', en: 'Length: start 20–50 lines, stay under 100' },
      text: {
        zh: '起步阶段 20 到 50 行就够，不用纠结行数。成熟版本保持 100 行以内（这是第 11 章 Boris 的经验：臃肿的 CLAUDE.md 会让模型忽略你真正的指令）。10 条规则没有一条是凭空想出来的——这就是「犯错驱动的 harness」。',
        en: 'In the starting phase 20–50 lines is plenty—do not fuss over count. Keep the mature file under 100 (chapter 11’s Boris: a bloated CLAUDE.md makes the model ignore your real instructions). None of those 10 rules was invented—this is mistake-driven harnessing.',
      },
    },

    { type: 'h2', id: 'start', text: { zh: '三条启动建议：不想慢慢长？', en: 'Three launch tips if you would rather not crawl' } },
    {
      type: 'cards',
      items: [
        {
          icon: 'map',
          title: { zh: '① 给地图不给说明书', en: '① A map, not a manual' },
          text: {
            zh: '指令文件应像地图：项目结构、文件关系、关键约束，不要把每步写死。AI 需要方向感，不需要僵化步骤。这正是第 9 章 OpenAI 的原则：AGENTS.md 约 100 行，只是目录和指针。',
            en: 'The instruction file should read like a map—structure, relationships, key constraints—never hard-coding each step. AI needs a sense of direction, not rigid steps. This is chapter 9’s OpenAI principle: a ~100-line AGENTS.md that is only a table of contents and pointers.',
          },
        },
        {
          icon: 'repeat',
          title: { zh: '② 每次犯错加一条规则', en: '② One mistake, one rule' },
          text: {
            zh: '空文件开始，agent 犯一个错就加一条，不预设、不猜测。三个月后那个文件就是你的 harness——高度定制，全是你场景里真实出过的问题。',
            en: 'Start empty, add a rule per mistake, pre-predict nothing. In three months that file is your harness—bespoke, every line a problem that actually bit you.',
          },
        },
        {
          icon: 'users',
          title: { zh: '③ 让 AI 查 AI', en: '③ Let AI review AI' },
          text: {
            zh: '这是第 11 章 Anthropic 的 Evaluator 思路。别让 AI 自己查自己：写完后开一个全新对话，把结果贴进去说「找出所有问题」。你会惊讶第二个 AI 能发现多少第一个漏掉的。',
            en: 'This is chapter 11’s Anthropic evaluator idea. Do not let AI grade its own work: after writing, open a brand-new session, paste the result and say "find every problem". You will be surprised how much the second AI catches.',
          },
        },
      ],
    },
    {
      type: 'p',
      text: {
        zh: '现在就做：选你正在用的工具，创建对应的空文件，开始干活，agent 犯错了就加一条。这就是你的第一个 harness。下一章（第 16 章）我们把它用到前端、后端、内容生产三个真实业务场景，给完整配置模板。',
        en: 'Do it now: pick your tool, create the empty file, start working, and add a rule whenever the agent slips. That is your first harness. The next chapter (16) applies it to three real business scenarios—frontend, backend, content—with full configuration templates.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '起步之后往深里走', en: 'Where to go after the first file' },
      items: ['better-agent', 'agent-skillhub-patterns', 'agent-memory-patterns', 'agent-loop-engineering'],
    },
  ],
  sources: [SRC.mitchell, SRC.openaiHarness, SRC.anthropicBestPractices, SRC.agentsMd, SRC.orangeBook],
};

export default ch15;

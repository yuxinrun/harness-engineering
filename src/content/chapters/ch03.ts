import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch03: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '这一章回答很多转行的人最关心的问题：如果我不再主要靠写代码吃饭，我靠什么吃饭。答案不神秘——把人在回路里的位置往上挪一层，并且补上那一层需要的新能力。',
        en: 'The question people switching tracks actually ask: if writing code is no longer my main meal, what is? The answer is unglamorous—move one level up in the loop and pick up the skills that level demands.',
      },
    },

    { type: 'h2', id: 'three-positions', text: { zh: '先定位：你在 in the loop、on the loop 还是 out of the loop', en: 'Locate yourself: in, on, or out of the loop' } },
    {
      type: 'p',
      text: {
        zh: 'Martin Fowler 团队的 Kief Morris 画了一张三层图，把人和 AI 编程的关系切成三个位置。它的价值在于可判定：**你和对结果不满意的时候，你会去改什么**，暴露你在哪一层。',
        en: 'Kief Morris, in Martin Fowler’s orbit, cut the human/AI relationship into three positions. The diagram is useful because it is testable: **what you reach for when the output disappoints you** reveals which position you occupy.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '位置', en: 'Position' },
        { zh: '你在做什么', en: 'What you do' },
        { zh: '不满意时的动作', en: 'When output disappoints' },
        { zh: '风险', en: 'Risk' },
      ],
      rows: [
        [
          { zh: 'In the loop（回路中）', en: 'In the loop' },
          { zh: '逐行审查、手动修改', en: 'Review line by line, patch by hand' },
          { zh: '改代码', en: 'Fix the code' },
          { zh: '重复劳动，产出被你的审查速度封顶', en: 'Your review speed caps throughput' },
        ],
        [
          { zh: 'On the loop（回路上）', en: 'On the loop' },
          { zh: '写规格、建质量检查、设计工作流', en: 'Write specs, build checks, design workflow' },
          { zh: '改 harness，让它下次产出更好的结果', en: 'Fix the harness so the next run is better' },
          { zh: '需要真实经验支撑，否则在给自己的直觉建庙', en: 'Needs real experience, or you monument your own gut' },
        ],
        [
          { zh: 'Out of the loop（回路外）', en: 'Out of the loop' },
          { zh: '只说想要什么', en: 'State the want, nothing else' },
          { zh: '不看，接受', en: 'Accept without looking' },
          { zh: 'Vibe coding：小项目爽，生产项目欠债', en: 'Vibe coding: fine for toys, debt in production' },
        ],
      ],
      caption: {
        zh: 'On the loop 听起来更高级，但 Morris 的警告同样明确：太早把人移上第二、第三层，将来没人知道 harness 坏了该怎么修。',
        en: 'On the loop sounds like the upgrade, but Morris warns plainly: move people up too early and nobody will know how to repair the harness when it breaks.',
      },
    },
    { type: 'sources', items: [SRC.orangeBook, SRC.fowler] },

    { type: 'h2', id: 'capability', text: { zh: '能力模型：五个新增长点', en: 'Capability model: five things to grow' } },
    {
      type: 'p',
      text: {
        zh: 'Boris 在 Anthropic 的说法是，工程师的核心贡献是**判断力**——判断构建什么、如何验证、何时信任输出、何时反驳。判断力不是天赋，它来自「做过很多次，因此知道哪些路走不通」。下面五项能力是判断力在缰绳工程里的具体形状，每一项都能对应到本站的某一章和一个可练习的动作。',
        en: 'Boris puts it as: the engineer’s core contribution is **judgement**—what to build, how to verify, when to trust the output, when to push back. Judgement is not talent; it is having walked enough dead ends. The five capabilities below are judgement’s concrete shape here, each with a chapter and a practisable action.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '能力', en: 'Capability' },
        { zh: '具体含义', en: 'What it means concretely' },
        { zh: '怎么练', en: 'How to practise' },
        { zh: '对应章节', en: 'Chapter' },
      ],
      rows: [
        [
          { zh: '拆解能力', en: 'Decomposition' },
          { zh: '把一个模糊需求切成 Agent 能独立完成的单元，并说清每单元完成的定义', en: 'Slice a vague ask into units an agent can finish alone, each with a definition of done' },
          { zh: '写 sprint contract：验收标准先于代码', en: 'Write a sprint contract: acceptance criteria before code' },
          { zh: '第 11、15 章', en: '11, 15' },
        ],
        [
          { zh: '规格写作', en: 'Specification writing' },
          { zh: '把「我想要这样的东西」变成可判定的条件，而不是形容词', en: 'Turn "I want something like this" into decidable conditions, not adjectives' },
          { zh: '每个功能补一段「完成 = 这些命令通过」', en: 'Append "done = these commands pass" to every feature' },
          { zh: '第 5、15 章', en: '5, 15' },
        ],
        [
          { zh: '验证设计', en: 'Verification design' },
          { zh: '知道什么检查该进 CI、什么该进 Hook、什么只能靠人看', en: 'Know which check belongs in CI, which in a hook, which only in human eyes' },
          { zh: '给现有项目加一道会真的拦住你的门禁', en: 'Add one gate to your repo that actually stops you' },
          { zh: '第 6、18 章', en: '6, 18' },
        ],
        [
          { zh: '上下文经济', en: 'Context economics' },
          { zh: '把窗口当预算：知道什么该常驻、什么按需加载、什么该丢', en: 'Treat the window as a budget: resident, on-demand, dropped' },
          { zh: '用交互实验室的预算模拟器调一次自己的项目', en: 'Run the budget simulator against your own project' },
          { zh: '第 17 章', en: '17' },
        ],
        [
          { zh: '故障归因', en: 'Failure attribution' },
          { zh: '一次失败能定位到指令缺失、约束缺位还是模型能力上限', en: 'Pin a failure to missing instruction, missing constraint, or model ceiling' },
          { zh: '复盘三次失败，各归到一层，看哪层最常背锅', en: 'Post-mortem three failures by layer and see which layer takes the blame most' },
          { zh: '第 4、18 章', en: '4, 18' },
        ],
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '先给自己打个分', en: 'Score yourself first' },
      text: {
        zh: '交互实验室里的「成熟度自评」用 8 道题把这五项压成一个分数和档位，并直接告诉你该读哪几章。五分钟，比读完整本书再决定读哪章便宜得多。',
        en: 'The maturity quiz in the Lab compresses these five capabilities into eight questions, a band, and the exact chapters to read. Five minutes is a lot cheaper than reading everything before deciding.',
      },
    },

    { type: 'h2', id: 'two-tracks', text: { zh: '两条成长轨道：迁移经验与新建经验', en: 'Two tracks: port experience or build new' } },
    {
      type: 'p',
      text: {
        zh: '一个反直觉但重要的事实：**建 harness 的门槛不是编程经验，是「足够的经验」——而经验可以来自两条不同的赛道。**OpenAI 那三位工程师、Hashimoto、Beck 属于第一条；本书作者花叔（零代码经验，产品累计用户超百万）属于第二条。',
        en: 'A counter-intuitive but load-bearing fact: **the barrier to building a harness is not coding experience, it is enough experience—and enough experience can come from two different tracks.** The three OpenAI engineers, Hashimoto and Beck are track one. The book’s author, who never hand-wrote a line of code yet shipped products to over a million users, is track two.',
      },
    },
    {
      type: 'compare',
      left: {
        title: { zh: '轨道一：资深工程师迁移', en: 'Track 1: senior engineers porting' },
        tone: 'neutral',
        items: [
          { zh: '已有资产：知道什么架构三个月后会爆炸、什么是好代码', en: 'Asset: knowing which architecture explodes in three months, what good code looks like' },
          { zh: '迁移动作：把脑子里的隐性 review 清单外写成规则和门禁', en: 'Move: externalise the tacit review checklist into rules and gates' },
          { zh: '常见绊脚：忍不住亲手改代码，一直停在 in the loop', en: 'Stumble: relapsing into hand-editing, staying in the loop forever' },
          { zh: '路径示例：Kent Beck 用 TDD 的三十年智慧重构自己的 CLAUDE.md，前两次尝试都失败', en: 'Example: Beck ported thirty years of TDD craft, and his first two attempts still failed' },
        ],
      },
      right: {
        title: { zh: '轨道二：零代码经验者新建', en: 'Track 2: newcomers building fresh' },
        tone: 'neutral',
        items: [
          { zh: '已有资产：没有需要放下的旧习惯', en: 'Asset: no old habits to unlearn' },
          { zh: '迁移动作：上千小时和 AI 较劲，积累「它什么时候偷懒、什么时候幻觉」的直觉', en: 'Move: a thousand hours of friction, learning when it slacks and when it hallucinates' },
          { zh: '常见绊脚：无法判断代码本身好坏，只能依赖测试和评估 Agent', en: 'Stumble: cannot judge code quality directly, must lean on tests and evaluator agents' },
          { zh: '路径示例：从零开始的 CLAUDE.md 长到太杂 → 拆成路由器 → 加 Hooks → 封装 100+ Skills', en: 'Example: an empty CLAUDE.md → too messy → router refactor → hooks → 100+ skills' },
        ],
      },
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '换赛道不换痛苦的总量', en: 'New track, same amount of pain' },
      text: {
        zh: '「零代码也能建 harness」不等于「零经验也能」。花的只是换了地方：以前是写代码、调 bug、重构、被线上事故搞到半夜；现在是写指令文件、配 Hook、被幻觉搞到半夜。痛苦的形状变了，总量可能没变。所以如果有人告诉你「快速学会设计缰绳」，第一句诚实的回答是：你不能快速。',
        en: '"No coding needed" is not "no experience needed". The hours are paid, just elsewhere: once it was coding, debugging, refactoring and 3 a.m. incidents; now it is writing instruction files, wiring hooks and being up at 3 a.m. by a hallucination. Different shape, similar volume. So the honest reply to "learn harness design fast" is: you cannot.',
      },
    },

    { type: 'h2', id: 'misconceptions', text: { zh: '四个最常见的认知误区', en: 'Four misconceptions worth killing' } },
    {
      type: 'cards',
      items: [
        {
          icon: 'brain',
          title: { zh: '误区一：模型变强就不需要缰绳', en: 'Misread 1: stronger models make harnesses moot' },
          text: {
            zh: '模型变强让缰绳变薄，不是消失。Anthropic 的案例里，Opus 4.6 之后确实撤掉了 Sprint Contract 和定期重置，但保留的仍是「角色分离 + 独立评估」——减的是环节，不是结构。第 17 章完整讲减法。',
            en: 'Stronger models thin the harness; they do not delete it. After Opus 4.6, Anthropic did drop sprint contracts and periodic resets—but kept role separation and independent evaluation. The steps shrink, the structure stays. Chapter 17 covers subtraction.'
          },
        },
        {
          icon: 'zap',
          title: { zh: '误区二：转行就是学新工具', en: 'Misread 2: switching means learning another tool' },
          text: {
            zh: '工具每周都在变，五层结构基本不变。学 Claude Code 的快捷键不如学「怎么把一条建议变成一个会拦你的脚本」，后者在 Codex、Cursor 里同样成立。',
            en: 'Tools change weekly; the five layers barely do. Learning a keybinding is worth less than learning to turn advice into a script that blocks you—that transfers to Codex and Cursor unchanged.' },
        },
        {
          icon: 'eye',
          title: { zh: '误区三：不写代码就没人审查了', en: 'Misread 3: if I stop coding nobody reviews' },
          text: {
            zh: '审查的形式变了：从读 diff 到读验收标准、读失败日志、读评估 Agent 的评分理由。Anthropic 的数据是工程师在 60% 的工作里用 AI，却只能完全委派 0–20% 的任务——中间那 40–60% 就是新的审查地带。',
            en: 'Review changed shape: from reading diffs to reading acceptance criteria, failure logs and the evaluator’s rationale. Engineers use AI in 60% of their work yet fully delegate only 0–20% of tasks—the 40–60% gap is the new review territory.' },
        },
        {
          icon: 'users',
          title: { zh: '误区四：初级岗位消失意味着不必入门', en: 'Misread 4: juniors are gone, so skip entry-level' },
          text: {
            zh: 'Fowler 的担忧成立：不写代码的人可能失去成长路径。对策不是拒绝入门，而是换一种入门——主动做「能归因的失败复盘」，把每一次 AI 犯错变成一条规则，这正是在建 harness 的肌肉。',
            en: 'Fowler’s worry is real: those who never code may lose the ladder. The fix is not to skip entry level but to change its content—do attributable post-mortems, turn every agent mistake into a rule. That is exactly the harness muscle.' },
        },
      ],
    },
    { type: 'sources', items: [SRC.orangeBook, SRC.anthropicHarnessDesign, SRC.fowler, SRC.mitchell] },

    { type: 'h2', id: 'plan', text: { zh: '九十天的转轨计划', en: 'A ninety-day transition plan' } },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '第 1–2 周：只做观察者', en: 'Weeks 1–2: only observe' },
          text: {
            zh: '不动架构。把每次 AI 犯错记成一行：时间、任务、错在哪、我当时的补救。两周后你会得到一个高频错误清单——那就是你的缰绳需求说明书。',
            en: 'Change nothing. Log every agent mistake as one line: when, what task, what went wrong, how you patched it. Two weeks later you own a frequency table—your harness requirements document.' },
        },
        {
          title: { zh: '第 3–6 周：把前三条高频错变成约束', en: 'Weeks 3–6: turn the top three into constraints' },
          text: {
            zh: '一条写进指令文件，一条做成 Hook，一条进 CI。目标是让同一错误在你的项目里「再也犯不了」，而不是让你更会提醒它。',
            en: 'One into the instruction file, one into a hook, one into CI. The goal is that the mistake becomes impossible in your repo—not that you get better at reminding.' },
        },
        {
          title: { zh: '第 7–10 周：引入独立评估', en: 'Weeks 7–10: add an independent evaluator' },
          text: {
            zh: '最小可行版就是一个新会话：把 diff 和验收标准丢给它，不给历史。开始记录「评估者发现的问题里有多少是我原本会漏掉的」，这个数字决定你后续要不要花钱建更强的评估。',
            en: 'Minimum viable: a fresh session given only the diff and the acceptance criteria. Track how many issues the evaluator found that you would have missed—that ratio decides whether a stronger evaluator is worth paying for.' },
        },
        {
          title: { zh: '第 11–13 周：开始编排', en: 'Weeks 11–13: start orchestrating' },
          text: {
            zh: '让两个会话并行做互不依赖的事，你在中间只做交接与审查。到这里你的日常已经变成「设计环境 + 定义约束 + 判断结果」，位置就挪到 on the loop 了。',
            en: 'Run two sessions on independent work and act only as the handoff and reviewer. By now your day is design-environment, define-constraints, judge-results: you have moved onto the loop.' },
        },
      ],
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '顺便一件容易被忽略的事', en: 'One easily missed detail' },
      text: {
        zh: '按《橙皮书》的记录，GitHub Copilot 自 2026 年 4 月 24 日起对免费与 Pro 用户默认使用交互数据训练模型。你和 Agent 协作的方式、你的指令文件风格都会进入下一代模型。这不是隐私建议，是提醒你：你的缰绳本身也在被反向学习——真正难以复制的从来是判断力，不是提示词。',
        en: 'Per the orange book, from 24 April 2026 GitHub Copilot uses interaction data from free and Pro tiers for model training by default. How you collaborate with agents—your instruction style included—feeds the next model. Not a privacy PSA: a reminder that your harness is being learned from too. What stays hard to copy is judgement, not prompts.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '如果你要从另一个入口进入', en: 'Other doors into the same room' },
      items: ['better-agent', 'agent-skillhub-patterns', 'agent-evaluation-patterns'],
    },
  ],
  sources: [SRC.orangeBook, SRC.fowler, SRC.mitchell, SRC.anthropicHarnessDesign, SRC.openaiHarness],
};

export default ch03;

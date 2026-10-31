import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch01: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '又来了一个「XX 工程」？在你翻白眼之前，先看这个词是从哪儿冒出来的：它不是某个 KOL 灵光一闪的产物，而是几个互不相干的团队在同几个月里，各自撞上了同一个东西，然后需要一个共同的名字来交流。',
        en: 'Yet another "XX engineering"? Before you roll your eyes: this word was not coined by an influencer. Several unrelated teams hit the same wall within a few months and needed a shared name to talk about it.',
      },
    },
    {
      type: 'p',
      text: {
        zh: 'Vibe Coding 的课还在卖，Prompt Engineering 的教程还没读完，Context Engineering 的墨迹未干，现在又多一个 Harness Engineering。造新词的速度快赶上模型迭代。但 2025 年底到 2026 年初，**OpenAI 的官方博文**、**Mitchell Hashimoto 的长文**、**Martin Fowler 团队的专栏**与 **LangChain 的技术拆解**指向的是同一层东西。这一章把「这层东西到底是什么」说清楚，并且给出一个可以立刻用来检验自己项目的定义；文末来源卡片全部可点开原文。',
        en: 'Vibe coding courses are still selling, prompt engineering tutorials are unread, context engineering ink is not dry, and now harness engineering. But between late 2025 and early 2026, **an OpenAI post**, **a long essay by Mitchell Hashimoto**, **Martin Fowler’s column** and **a LangChain teardown** all pointed at the same layer. This chapter defines that layer and gives you a test you can run against your own project today; every source card below opens the primary text.',
      },
    },

    { type: 'h2', id: 'five-meanings', text: { zh: '先把词源摊开：五个领域，同一件事', en: 'Five domains, one idea' } },
    {
      type: 'p',
      text: {
        zh: 'Harness 不是 AI 圈发明的词。它可追溯到 1300 年的古法语 harnois（可能来自古北欧语，本义是「军队的补给品」），最初指盔甲与装备，之后才演变成马具。作为动词 to harness——「控制并加以利用」——的比喻义早在 1690 年代就已出现。三百多年前的人就在用这个词描述驯驭一种力量，这也是为什么「缰绳」这个中文译法比「线束」更贴切。',
        en: 'Harness is not an AI coinage. It traces back to Old French harnois (c.1300, probably Old Norse, originally "army equipment"), first meaning armour, later tack. The verbal sense—to harness, "control and put to use"—dates from the 1690s. People have been using this word for a force stronger than themselves for three centuries, which is why "rein" beats "wiring loom" as a translation.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '领域', en: 'Domain' },
        { zh: 'Harness 的形态', en: 'Form' },
        { zh: '核心功能', en: 'Core job' },
        { zh: '在 Agent 里对应什么', en: 'Agent counterpart' },
      ],
      rows: [
        [
          { zh: '马术', en: 'Horsemanship' },
          { zh: '缰绳 / 马具', en: 'Reins and tack' },
          { zh: '引导方向和力量', en: 'Direct power, do not create it' },
          { zh: '约束 + 方向', en: 'Constraints + direction' },
        ],
        [
          { zh: '航天（NASA-STD-8739.4A）', en: 'Aerospace (NASA-STD-8739.4A)' },
          { zh: '电气线束', en: 'Wiring harness' },
          { zh: '在混乱物理环境里保证信号准确', en: 'Signal integrity in a hostile physical environment' },
          { zh: '上下文管道', en: 'Context plumbing' },
        ],
        [
          { zh: '软件测试', en: 'Software testing' },
          { zh: '测试线束（stub + driver）', en: 'Test harness (stubs + drivers)' },
          { zh: '隔离被测对象，构造受控环境', en: 'Isolate the subject, build a controlled arena' },
          { zh: '沙箱 + 反馈回路', en: 'Sandbox + feedback loop' },
        ],
        [
          { zh: '安全作业（攀岩 / 高空）', en: 'Safety work (climbing / heights)' },
          { zh: '安全带、防坠器', en: 'Harness and lanyard' },
          { zh: '不限制行动自由，失足时接住', en: 'Full freedom of movement, caught on a fall' },
          { zh: '护栏与回滚（guardrails）', en: 'Guardrails and rollback' },
        ],
        [
          { zh: '汽车电气', en: 'Automotive wiring' },
          { zh: '一捆线缆', en: 'A loom of cables' },
          { zh: '本身不发电、不计算，缺了它零件互不相识', en: 'Generates nothing, computes nothing; without it the parts are strangers' },
          { zh: '模型、工具、文档、测试、部署之间的连接层', en: 'The layer connecting model, tools, docs, tests and deploys' },
        ],
        [
          { zh: '军事（词源本义）', en: 'Military (the original sense)' },
          { zh: '盔甲与装备', en: 'Armour and equipment' },
          { zh: '保护 + 赋能', en: 'Protect and enable' },
          { zh: 'Agent 的整套装备：上下文、工具、权限、记忆', en: 'The agent’s kit: context, tools, permissions, memory' },
        ],
      ],
      caption: {
        zh: '五个领域、五种 harness，做的是同一件事：不替代核心力量，而是让核心力量变得可控、可靠、可用。',
        en: 'Five domains, five harnesses, one job: not replacing the source of power, but making it controllable, reliable and usable.',
      },
    },
    {
      type: 'sources',
      items: [SRC.orangeBook, SRC.openaiHarness],
    },

    { type: 'h2', id: 'openai-definition', text: { zh: 'OpenAI 的定义：大脑之外的一切', en: 'The OpenAI definition: everything outside the brain' } },
    {
      type: 'quote',
      text: {
        zh: 'A harness is the tool shell that allows an AI agent to affect the real world. If the reasoning model is the brain, the harness is the hands and feet. Reading files, fixing code, running tests, deploying to production: all of it happens inside the harness.',
        en: 'A harness is the tool shell that allows an AI agent to affect the real world. If the reasoning model is the brain, the harness is the hands and feet. Reading files, fixing code, running tests, deploying to production: all of it happens inside the harness.',
      },
      cite: { zh: 'OpenAI · Harness engineering', en: 'OpenAI · Harness engineering' },
    },
    {
      type: 'p',
      text: {
        zh: '注意两个用词。第一是 tool shell，「一整个壳」——不是你对 AI 说的那句话，而是 AI 运行于其中的环境。第二是「让大脑能动手」：harness 不让模型变聪明，大脑还是那个大脑，它决定模型能不能可靠地改变真实世界。这句话的实操含义是：当同一个模型在你的项目里表现不稳定时，值得改的是壳，不是换模型。',
        en: 'Two words matter. Tool shell means the whole enclosure—not the sentence you typed, but the environment the agent executes inside. And "lets the brain act": a harness never makes the model smarter; it decides whether that model can reliably change the real world. The operational consequence: when the same model is flaky in your repo, fix the shell before you blame the model.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '一句话自检', en: 'A one-line self-test' },
      text: {
        zh: '把你最近一次「AI 做错了」的对话翻出来，问三个问题：它当时看得到什么？它能做什么？它做错后有没有任何东西会响？这三个问题的答案，就是你当前 Harness 的完整描述。',
        en: 'Pull up the last "the AI got it wrong" session and ask three questions: what could it see, what could it do, and did anything fire when it was wrong? Those three answers are a complete description of your current harness.',
      },
    },

    { type: 'h2', id: 'nesting', text: { zh: 'Prompt ⊂ Context ⊂ Harness：三层不是三个竞品', en: 'Prompt ⊂ Context ⊂ Harness: not three rivals' } },
    {
      type: 'chart',
      chart: 'inclusion',
      title: { zh: '三个概念的包含关系', en: 'How the three concepts nest' },
      note: {
        zh: '提示词工程优化一句话的表达；上下文工程安排每一步能看到什么；缰绳工程负责整个运行环境，包含前两者以及工具、权限、反馈与恢复。',
        en: 'Prompt engineering optimises one message; context engineering arranges what is visible at each step; harness engineering owns the whole runtime, including both of the above plus tools, permissions, feedback and recovery.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '层次', en: 'Layer' },
        { zh: '优化对象', en: 'What it optimises' },
        { zh: '失效表现', en: 'How it fails' },
        { zh: '典型产物', en: 'Typical artefacts' },
      ],
      rows: [
        [
          { zh: 'Prompt Engineering', en: 'Prompt Engineering' },
          { zh: '单次输入的表达', en: 'Wording of a single input' },
          { zh: '话说得再漂亮，模型也看不到项目结构', en: 'Beautiful wording, still blind to your repo' },
          { zh: '提示词模板、few-shot 例子', en: 'Prompt templates, few-shot examples' },
        ],
        [
          { zh: 'Context Engineering', en: 'Context Engineering' },
          { zh: '每一步进入窗口的信息集合', en: 'The information set admitted at each step' },
          { zh: '信息给全了，但没人阻止它写坏文件', en: 'Everything visible, nothing stops a bad write' },
          { zh: '检索、压缩、记忆文件、上下文预算', en: 'Retrieval, compaction, memory files, budget' },
        ],
        [
          { zh: 'Harness Engineering', en: 'Harness Engineering' },
          { zh: '模型运行其中的整个环境', en: 'The whole environment the model runs inside' },
          { zh: '环境缺门禁时，错误直接进生产', en: 'Without gates, mistakes reach production' },
          { zh: '指令文件、Hooks、CI、沙箱、评估、编排', en: 'Instructions, hooks, CI, sandbox, evals, orchestration' },
        ],
      ],
      caption: {
        zh: '三层是包含关系而不是替代关系：越往外，杠杆越大，也越难撤销。',
        en: 'Each layer contains the previous one. Outward means more leverage and less reversibility.',
      },
    },

    { type: 'h2', id: 'not-invention', text: { zh: '不是发明，是终于愿意学的工程纪律', en: 'Not an invention — old discipline finally acknowledged' } },
    {
      type: 'p',
      text: {
        zh: '如果你读完五个领域的对照后的反应是「这不就是给老东西起了个新名字」，你说对了一半。NASA 围绕自动化系统设计的约束、反馈循环、冗余检查与异常处理，和今天的 harness 没有本质区别；工业控制里 PLC 的安全联锁就是一种 harness；软件测试的 test harness 在概念上与 Agent 的 harness 完全同构——一组 stub 和 driver，构成受控环境，让被测对象在其中可预测地运行。AI 圈没有发明缰绳工程，只是终于意识到自己需要补上几十年前就成形的纪律。',
        en: 'If your reaction is "a new name for something ancient", you are half right. NASA’s constraints, feedback loops, redundancy checks and exception handling around autonomous systems are the same discipline; safety interlocks in PLC programming are a harness; the software test harness—isomorphic in concept—stubs and drivers forming a controlled environment so the subject behaves predictably. AI did not invent harness engineering; it finally admitted it owes decades of engineering discipline.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '命名仍然有价值', en: 'Naming still earns its keep' },
      text: {
        zh: '你在写 CLAUDE.md，他在写 AGENTS.md，她在配 Hooks 和 CI——做的是同一类工作却没有共同语言，经验就传不开。词出现之后，讨论才开始得起来。这跟 Vibe Coding 的价值一样：不是发明，是让一种做法变成可讨论的东西。',
        en: 'You write CLAUDE.md, he writes AGENTS.md, she wires hooks and CI—same work, no shared vocabulary, so nothing spreads. A name is what makes discussion possible. That was vibe coding’s real value too: not invention, but turning a practice into something arguable.',
      },
    },

    { type: 'h2', id: 'job-map', text: { zh: '五重含义 → 五件具体的工程活', en: 'Five meanings, five concrete jobs' } },
    {
      type: 'p',
      text: {
        zh: '隐喻的价值在于它能拆成待办事项。下面这张表把每种 harness 翻译成本周就能做的一件事，每一行都指向本站后面的一章。',
        en: 'A metaphor earns its place when it decomposes into a to-do list. Each row below translates one harness meaning into something you can do this week, and points at the chapter that expands it.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: 'Harness 隐喻', en: 'Metaphor' },
        { zh: '工程活', en: 'Engineering job' },
        { zh: '判断标准', en: 'Pass criterion' },
        { zh: '详见', en: 'Read' },
      ],
      rows: [
        [
          { zh: '缰绳：引导方向', en: 'Reins: direct the force' },
          { zh: '写一张项目地图，而不是一篇说明文', en: 'Write a project map, not an essay' },
          { zh: '入口文件 ≤100 行，且每条命令真能跑', en: 'Entry file ≤100 lines, every command runs' },
          { zh: '第 5 章', en: 'Ch. 5' },
        ],
        [
          { zh: '安全带：失败时兜住', en: 'Seatbelt: catch the fall' },
          { zh: '把「请勿」变成程序级拦截', en: 'Turn "please don’t" into a block' },
          { zh: '危险操作被拦截时有明确原因返回', en: 'Blocked actions return a clear reason' },
          { zh: '第 6 章', en: 'Ch. 6' },
        ],
        [
          { zh: '测试线束：受控环境', en: 'Test harness: controlled arena' },
          { zh: '让 Agent 自己验证，而不是等你验证', en: 'Make the agent verify, not you' },
          { zh: '每个任务都有可执行的完成定义', en: 'Every task has an executable definition of done' },
          { zh: '第 7 章', en: 'Ch. 7' },
        ],
        [
          { zh: '电气线束：连接一切', en: 'Wiring loom: connect everything' },
          { zh: '跨会话保存经验与状态', en: 'Persist lessons and state across sessions' },
          { zh: '新会话不用重新解释同一件事', en: 'A fresh session is not re-briefed' },
          { zh: '第 7 章', en: 'Ch. 7' },
        ],
        [
          { zh: '航天线束：保证信号准确', en: 'Aerospace loom: signal fidelity' },
          { zh: '给多任务编排定边界与交接格式', en: 'Define boundaries and handoff formats' },
          { zh: '冲突发生在合并前，而不是生产环境', en: 'Conflicts surface before merge, not in prod' },
          { zh: '第 8 章', en: 'Ch. 8' },
        ],
      ],
    },

    { type: 'h2', id: 'misreads', text: { zh: '四种最常见的误读', en: 'Four common misreadings' } },
    {
      type: 'compare',
      left: {
        title: { zh: '把它当成什么', en: 'What people think it is' },
        tone: 'bad',
        items: [
          { zh: '一套更长的提示词（其实提示词只是其中一层）', en: 'A longer prompt (a prompt is one layer at most)' },
          { zh: '某个工具的配置目录（Claude Code 和 Codex 的缰绳可以同构）', en: 'One tool’s config folder (the same harness shape works across tools)' },
          { zh: 'AI 能力不够时的临时补丁（模型变强后它不会消失，只会变薄）', en: 'A stopgap until models get better (it thins out; it never disappears)' },
          { zh: '给 Agent 加更多工具（工具越多，选择成本越高，见错误博物馆「工具超市」）', en: 'Wiring up more tools (more tools, higher selection cost — see the Tool Supermarket exhibit)' },
        ],
      },
      right: {
        title: { zh: '它实际上是什么', en: 'What it actually is' },
        tone: 'good',
        items: [
          { zh: '模型运行其中的环境整体：可见信息 + 可执行动作 + 反馈机制', en: 'The whole runtime: what is visible, what is allowed, what reports back' },
          { zh: '一套可迁移的工程纪律，换工具不用推倒重来', en: 'Transferable discipline—switch tools without restarting' },
          { zh: '决定同一模型在你项目里上限的那层', en: 'The layer that caps what the same model achieves in your repo' },
          { zh: '一个持续做减法的过程，边界清晰比力量大更重要', en: 'An ongoing subtraction exercise—clear bounds beat raw capability' },
        ],
      },
    },

    { type: 'h2', id: 'start-today', text: { zh: '今天就能做的三件事', en: 'Three moves you can make today' } },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '写下你的第一个「完成定义」', en: 'Write your first definition of done' },
          text: {
            zh: '挑一个你正在做的功能，用命令写清楚什么叫做完：pnpm test billing、pnpm typecheck、手动跑一遍导出流程。命令能跑通才算完成，不是「看起来差不多了」。',
            en: 'Pick one feature in flight and state done as commands: pnpm test billing, pnpm typecheck, then run the export flow by hand. Done means the commands pass, not "looks fine".',
          },
        },
        {
          title: { zh: '给 Agent 一份 30 行的地图', en: 'Give the agent a 30-line map' },
          text: {
            zh: '在项目根建一个 CLAUDE.md 或 AGENTS.md：项目是什么、核心命令、目录结构、不要动的文件、架构不变量。附录 A 有可以直接抄的骨架。',
            en: 'Create CLAUDE.md or AGENTS.md at the root: what the project is, core commands, layout, do-not-touch paths, architectural invariants. Appendix A has a skeleton you can copy.',
          },
        },
        {
          title: { zh: '记录一次失败，并把它变成规则', en: 'Log one failure and turn it into a rule' },
          text: {
            zh: '今天 Agent 在哪里做错了？把那条错误写成一行可执行的约束——文档里的一句话，或者一个会阻止它的脚本。这就是 Mitchell Hashimoto 的方法，第 10 章整章讲它。',
            en: 'Where did the agent get it wrong today? Turn that single mistake into one enforceable line—a sentence in the map, or a script that blocks it. That is Hashimoto’s method; chapter 10 is entirely about it.',
          },
        },
      ],
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '别在第一章就做五层架构', en: 'Do not build five layers today' },
      text: {
        zh: '本站第 4 章会给出一张完整的五层架构图，但请按顺序读。直接上完整架构的人，通常在第一天就给自己造了一套需要维护的框架——而他还不知道哪一层真的会救他的命。缰绳工程的第一步是让一条真实存在的错误不再重演。',
        en: 'Chapter 4 shows the full five-layer diagram, but read in order. People who start with the complete architecture spend day one maintaining a framework nobody asked for—without knowing which layer would actually have saved them. The first step is making one real mistake stop repeating.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '这一层在其他站点里的深度展开', en: 'Deeper dives in the sister sites' },
      items: ['better-agent', 'agent-loop-engineering', 'agent-memory-patterns'],
    },
  ],
  sources: [
    SRC.openaiHarness,
    SRC.mitchell,
    SRC.fowler,
    SRC.langchainMiddleware,
    SRC.anthropicContext,
    SRC.orangeBook,
  ],
};

export default ch01;

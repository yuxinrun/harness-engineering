import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch11: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '一个实验：$9 跑单 agent，20 分钟出结果，核心功能不可用；$200 跑三 agent 协作，6 小时出结果，完整可用。贵了 20 倍，但质量不是一个量级。这背后是一个来自生成对抗网络（GAN）的直觉：与其教一个模型自我批判，不如训练另一个模型专门挑刺。',
        en: 'One experiment: $9 on a single agent gave a result in 20 minutes with the core feature broken; $200 on three cooperating agents gave a complete, usable app in 6 hours. Twenty times the cost, but the quality was not in the same league. Behind it is an intuition borrowed from GANs: rather than teach one model to self-criticise, build another whose only job is to find faults.',
      },
    },

    { type: 'h2', id: 'three', text: { zh: '三个 agent，一条流水线', en: 'Three agents, one pipeline' } },
    {
      type: 'p',
      text: {
        zh: 'Anthropic 在工程博客公开了一套三智能体架构，目标是让 AI 在数小时的自主编码会话中产出完整全栈应用。三个角色各有清晰边界——注意 Planner 只写产品语境和高层设计，**不写详细技术方案**，因为 Anthropic 发现过于详细的技术指令反而会在下游产生级联错误。',
        en: 'Anthropic published a three-agent architecture on its engineering blog, aiming to have AI produce a complete full-stack app across hours of autonomous coding. Each role has a clear boundary—and note that the Planner writes only product context and high-level design, **not a detailed technical plan**, because Anthropic found overly detailed technical instructions cause cascading errors downstream.',
      },
    },
    {
      type: 'cards',
      items: [
        {
          icon: 'route',
          title: { zh: '规划者 Planner', en: 'Planner' },
          text: {
            zh: '接收 1–4 句简短提示，扩展成完整的产品规格说明。只管产品语境与高层设计，把技术细节留给后面的人。',
            en: 'Takes a 1–4 sentence prompt and expands it into a full product spec—owning context and high-level design, leaving technical detail to those after it.',
          },
        },
        {
          icon: 'wrench',
          title: { zh: '生成者 Generator', en: 'Generator' },
          text: {
            zh: '按冲刺（Sprint）方式增量实现功能，每次只做一个 feature。技术栈 React + Vite + FastAPI + SQLite/PostgreSQL。交付 QA 前先自检，但自检可靠性有限。',
            en: 'Implements features incrementally by sprint, one feature at a time, on React + Vite + FastAPI + SQLite/PostgreSQL. It self-checks before handing to QA, but self-checks are only so reliable.',
          },
        },
        {
          icon: 'clipboard-check',
          title: { zh: '评估者 Evaluator（灵魂）', en: 'Evaluator (the soul)' },
          text: {
            zh: '通过 Playwright MCP 像真人 QA 一样操作界面、测 API 端点、查数据库状态，按预设标准给设计质量、原创性、工艺水准（间距/排版/对比度）打分，再把 bug 反馈给生成者。',
            en: 'Via Playwright MCP it drives the UI, tests API endpoints and inspects the database like a human QA, scores design quality, originality and craft (spacing, typography, contrast) against preset criteria, then feeds bugs back to the Generator.',
          },
        },
      ],
    },

    { type: 'h2', id: 'gan', text: { zh: 'GAN 的直觉：谁都不擅长批评自己', en: 'The GAN intuition: nobody criticises itself well' } },
    {
      type: 'quote',
      text: {
        zh: '工程化一个严厉的独立评估者，远比教一个生成者自我批判容易得多。',
        en: 'Engineering a strict, independent evaluator is far easier than teaching a generator to self-criticise.',
      },
      cite: { zh: 'Anthropic 工程博客', en: 'Anthropic engineering blog' },
    },
    {
      type: 'p',
      text: {
        zh: '灵感来自生成对抗网络：代码审查和 QA 在结构上等同于 GAN 中的判别器。生成者不断生成、评估者不断挑战，在对抗中共同提升。直觉很朴素——谁都不擅长批评自己，AI 也一样。原始的 Claude 当评估者表现很差，太宽容、容易说服自己「bug 不严重」；换一个独立的、专门挑刺的评估者，效果完全不同。',
        en: 'The spark is GANs: code review and QA are structurally the discriminator. The generator keeps producing, the evaluator keeps challenging, and adversarially they lift output quality together. The intuition is plain—nobody critiques itself well, AI included. Raw Claude made a poor evaluator, too lenient, easily convincing itself a bug was minor; swap in an independent, fault-hunting evaluator and everything changes.',
      },
    },

    { type: 'h2', id: 'cost', text: { zh: '$9 vs $200：这不是「便宜但稍差」', en: '$9 vs $200: not "cheaper but slightly worse"' } },
    {
      type: 'table',
      head: [
        { zh: '方案', en: 'Setup' },
        { zh: '时间', en: 'Time' },
        { zh: '成本', en: 'Cost' },
        { zh: '结果', en: 'Outcome' },
      ],
      rows: [
        [
          { zh: '单 agent', en: 'Single agent' },
          { zh: '20 分钟', en: '20 min' },
          { zh: '$9', en: '$9' },
          { zh: '核心功能不可用，游戏实体输入处理损坏', en: 'core feature unusable; entity input handling broken' },
        ],
        [
          { zh: '三 agent 协作', en: 'Three agents' },
          { zh: '6 小时', en: '6 hours' },
          { zh: '$200', en: '$200' },
          { zh: '完整可用的应用，集成 AI 功能', en: 'a complete, working app with AI integrated' },
        ],
      ],
      caption: {
        zh: '关键不在「多花钱做得更好」，而在「不花这个钱根本做不成」——是能用与不能用的区别，不是好与更好的区别。',
        en: 'The point is not "spend more, do better" but "without the spend it simply does not ship"—usable versus unusable, not good versus better.',
      },
    },

    { type: 'h2', id: 'sprint', text: { zh: '冲刺合约：写代码前先签合同', en: 'The sprint contract: sign before you code' } },
    {
      type: 'p',
      text: {
        zh: '每个 Sprint 开始前，生成者和评估者先做一件事：协商一份**冲刺合约（Sprint Contract）**。生成者提出实现方案和成功标准，评估者审查这些标准是否可测试，双方迭代到达成一致，然后才开始写代码。这听起来像人类团队里的技术评审？对，就是这个意思——只不过参与评审的两方都是 AI。',
        en: 'Before each sprint the generator and evaluator do one thing first: negotiate a **sprint contract**. The generator proposes an implementation plan and success criteria, the evaluator checks whether those criteria are testable, and they iterate until they agree—only then does code get written. It sounds like a human design review, and that is exactly the point, except both reviewers are AI.',
      },
    },

    { type: 'h2', id: 'anxiety', text: { zh: '上下文焦虑：模型会对自己的窗口产生自我意识', en: 'Context anxiety: the model notices its own window' } },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '一个之前没人聊过的问题', en: 'A problem nobody had discussed' },
      text: {
        zh: '做这套系统时 Anthropic 发现了 **context anxiety**：模型会对自己的上下文窗口产生焦虑。Sonnet 4.5 是他们观察到的第一个「意识到自身上下文窗口」的模型——它会主动总结进度、在感知接近极限时更急躁地修 bug，最要命的是它对剩余 token 的估计「非常精确但却是错的」。严重到仅靠压缩（compaction）不足以支撑长任务，Anthropic 不得不引入**上下文重置（context reset）**：定期完全清空窗口，用结构化交接状态启动新 agent。',
        en: 'Building this system surfaced **context anxiety**: the model worries about its own context window. Sonnet 4.5 was the first Anthropic saw "aware of its own context window"—it proactively summarised progress, fixed bugs more frantically as it sensed the limit, and, worst of all, estimated remaining tokens with precise-but-wrong figures. It was severe enough that compaction alone could not sustain long tasks, so Anthropic added **context reset**: periodically clearing the window entirely and booting a fresh agent from a structured handoff.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '好消息：到 Opus 4.6，这个行为自行消失了，context reset 可以从 harness 里完全移除，连 Sprint 机制也整体去掉——模型原生就能处理长任务，Evaluator 从「每 Sprint 评估」变成「全程结束后一次性评估」。这说明一件反直觉的事：**harness 的最佳设计不是固定的，应随模型能力动态调整。** 模型变强，harness 就可以简化。Evaluator 也不是「有或无」的决策，而是当任务超出模型可靠独立完成的范围时才值得投入。',
        en: 'The good news: by Opus 4.6 the behaviour vanished on its own—context reset could be removed entirely, and so could the sprint mechanism. The model handles long tasks natively, so the Evaluator shifted from "per sprint" to "once at the end". This shows something counter-intuitive: **the best harness design is not fixed; it should track the model’s capability dynamically.** Stronger model, simpler harness. The Evaluator is likewise not an on/off choice but an investment you make when a task exceeds what the model can reliably do alone.',
      },
    },
    { type: 'sources', items: [SRC.anthropicHarnessDesign, SRC.anthropicBuilding] },

    { type: 'h2', id: 'boris', text: { zh: 'Boris Cherny：100 行 CLAUDE.md 与验证优先', en: 'Boris Cherny: a 100-line CLAUDE.md, verification first' } },
    {
      type: 'p',
      text: {
        zh: 'Boris Cherny，Claude Code 的创建者、Anthropic 资深工程师，公开的工作方式颠覆想象。他的 CLAUDE.md 只有约 100 行——很多人写到 500 甚至 1000 行以上。他的逻辑是：**臃肿的 CLAUDE.md 会让 Claude 忽略你真正的指令。** 对每一行问一个问题：删掉它会导致 Claude 犯错吗？不会就删。他最重要的建议与本章 GAN 直觉一脉相承：**给 Claude 一种验证自己工作的手段——只要有反馈循环，最终质量能提升 2–3 倍**（Web 用 Chrome 扩展测 UI，CLI 用测试套件，基础设施用模拟器）。',
        en: 'Boris Cherny, creator of Claude Code and a staff engineer at Anthropic, publishes a working style that upends expectations. His CLAUDE.md is about 100 lines while many run past 500 or 1000. His logic: **a bloated CLAUDE.md makes Claude ignore your actual instructions.** Ask of every line—would deleting it cause Claude to err? If not, cut it. His most important advice rhymes with this chapter’s GAN intuition: **give Claude a way to verify its own work—with a feedback loop, final quality improves two to three times** (UI via a Chrome extension, CLI via a test suite, infrastructure via a simulator).',
      },
    },
    {
      type: 'quote',
      text: {
        zh: '工程师的核心贡献不是代码，而是判断力——判断构建什么、如何验证、何时信任输出、何时反驳。',
        en: 'The engineer’s core contribution is not code but judgment—what to build, how to verify, when to trust the output and when to push back.',
      },
      cite: { zh: 'Boris Cherny', en: 'Boris Cherny' },
    },
    {
      type: 'p',
      text: {
        zh: '他还会在 Claude 给出平庸方案后说：「你已经知道了所有信息，扔掉这个方案，给我一个优雅的实现。」——不接受第一个答案，逼模型做更好的。团队的 CLAUDE.md 维护方式他叫「复利工程」：每次犯错加一条规则，PR 里用 @.claude 标签更新。时间一长，这个文件变成高度定制的制度知识库，每一行都对应一次真实犯错。',
        en: 'After Claude offers a mediocre plan he says: "You already have all the information—throw this out and give me an elegant implementation." Refuse the first answer, force a better one. He calls the team’s CLAUDE.md upkeep "compound engineering": one mistake, one rule, updated in PRs via the @.claude tag. Over time the file becomes a highly customised body of institutional knowledge, each line a real mistake that happened.',
      },
    },

    { type: 'h2', id: 'teams', text: { zh: '六个团队，六种用法', en: 'Six teams, six ways to use it' } },
    {
      type: 'p',
      text: {
        zh: 'Anthropic 一份白皮书记录了内部六个团队怎么用 Claude Code，几个案例很能说明「harness 不是只给写码人用的」：安全工程团队把堆栈跟踪和文档扔给它追踪控制流，原本 10–15 分钟手动扫描的问题快了 3 倍；数据基础设施团队把 **Kubernetes 报错的截图**（不是日志文本）丢进去，靠 OCR 判断出是 IP 地址耗尽并给出可执行修复；法务团队——不写代码的人——用它搭了个内部电话树原型帮成员找合适的律师。Anthropic 的总结：最成功的团队把 Claude Code 当作**思考伙伴而非代码生成器**。',
        en: 'An Anthropic whitepaper documents six internal teams, and the cases show this harness is not only for coders. Security engineering throws stack traces and docs at it to trace control flow, tripling speed on what took 10–15 minutes to scan by hand. Data infrastructure pasted a **screenshot of a Kubernetes error** (not log text) and its OCR diagnosed IP-address exhaustion with a runnable fix. The legal team—non-coders—built an internal phone-tree prototype to route members to the right lawyer. The takeaway: the most successful teams treat Claude Code as a **thinking partner, not a code generator**.',
      },
    },

    { type: 'h2', id: 'leak', text: { zh: '意外透视：一行缺失的 .npmignore', en: 'The accidental X-ray: one missing .npmignore line' } },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '讽刺地印证了全书论点', en: 'Ironically proving the book’s thesis' },
      text: {
        zh: '2026-03-31，因为 npm 包的 .npmignore 少配了一行，59.8MB 的 source map 随正常发布被推到公网，512,000 行 TypeScript 源码完整暴露。社区第一次（也是外部唯一一次）看到 Claude Code 的内部 harness：比公开文档更深的 CLAUDE.md 继承体系、hooks 系统、四种 memory 类型、九段式上下文压缩，还有一个出现 150 多次的 KAIROS（尚未发布的常驻后台 agent）和内部代号 Capybara（Claude 4.6 变体）。后果更有意思：一个「不用泄漏源码、完全重写」的净室仓库 2 小时内拿到约 50,000 颗星，可能是 GitHub 增长最快的仓库。**一个微小的工程疏忽就能瓦解一切——harness 终究是工程问题。**',
        en: 'On 2026-03-31 a single missing .npmignore line shipped a 59.8 MB source map to the public with a normal release, exposing 512,000 lines of TypeScript. It was the community’s first—and only outside—X-ray of Claude Code’s internal harness: a CLAUDE.md inheritance deeper than the docs admit, the hooks system, four memory types, nine-part context compaction, plus KAIROS (an unreleased always-on background agent, named 150+ times) and the internal codename Capybara (a Claude 4.6 variant). The aftermath says more: a clean-room rewrite repo—using none of the leaked source—picked up ~50,000 stars within two hours, perhaps the fastest-growing repo in GitHub history. **One tiny engineering lapse can unravel everything—the harness is, in the end, an engineering problem.**',
      },
    },

    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '只记一件事', en: 'If you remember one thing' },
      text: {
        zh: '让 AI 查 AI。你让同一个 Claude 写完再自审，它大概率说「看起来没问题」——因为它就是这么写出来的，能看出问题早就不这么写了。换一个独立上下文的 Claude 来审，$9 和 $200 的差距就是 GAN 直觉的代价。Boris 的 100 行哲学与此一脉相承：每多一条规则要有真问题支撑，每多一个 agent 要有明确职责。冗余不是保险，是噪音。',
        en: 'Let AI review AI. Ask the same Claude to self-review and it will mostly say "looks fine"—because it wrote it that way, and anything it could spot it would not have written. Bring in an independent-context Claude to audit, and the $9-versus-$200 gap is the price of the GAN intuition. Boris’s 100-line philosophy rhymes: every extra rule needs a real problem behind it, every extra agent a clear duty. Redundancy is not insurance; it is noise.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '评估与反馈的专门展开', en: 'Dedicated guides to evaluation and feedback' },
      items: ['agent-evaluation-patterns', 'agent-loop-engineering', 'agent-observability-patterns', 'better-agent'],
    },
  ],
  sources: [SRC.anthropicHarnessDesign, SRC.anthropicBuilding, SRC.anthropicLongRunning, SRC.anthropicClaudeCode, SRC.orangeBook],
};

export default ch11;

import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch17: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: 'Harness 不是越大越好——这可能是整本书最反直觉的一节。读完前面你会自然想：五个组件每个都做到极致不就最好？不是。恰好相反。多个独立团队在不同场景下撞到同一件事：过度工程化的 harness，比没有 harness 更糟。这不是哲学，有数据。',
        en: 'More harness is not better harness—perhaps the most counter-intuitive chapter in the book. After the earlier chapters the natural urge is to max out all five components. Do not. The opposite is true. Several independent teams, in different settings, hit the same wall: an over-engineered harness is worse than no harness. That is not a philosophy—it has data.',
      },
    },

    { type: 'h2', id: 'anxiety', text: { zh: '上下文不是免费的，它有副作用', en: 'Context is not free—it has side effects' } },
    {
      type: 'p',
      text: {
        zh: 'Anthropic 开发长运行 agent 时发现了**上下文焦虑（context anxiety）**：Sonnet 4.5 是他们观察到的第一个「意识到自身上下文窗口」的模型。这种自我意识带来副作用——模型会在它认为接近极限时**过早开始收尾**，主动总结进度、更果断地「修复」。表面效率提高了，实际是在赶工。它对剩余 token 的估计「非常精确但却是错的」。（机制细节见第 11 章，到 Opus 4.6 这个行为自行消失了。）',
        en: 'Building long-running agents, Anthropic found **context anxiety**: Sonnet 4.5 was the first model they saw "aware of its own context window". That self-awareness has a side effect—the model starts **wrapping up too early** once it thinks it nears the limit, summarising progress and "fixing" more decisively. Efficiency looks up; it is actually rushing. Its estimate of remaining tokens is "very precise but wrong". (Mechanics in chapter 11; the behaviour disappeared by Opus 4.6.)',
      },
    },
    {
      type: 'stats',
      items: [
        {
          value: '~100万 token',
          label: { zh: '明显的性能天花板', en: 'the visible performance ceiling' },
          hint: { zh: '超过此点性能显著下降，不论技术上限多大', en: 'past this, quality drops—however large the advertised window' },
        },
        {
          value: '越少越准',
          label: { zh: '塞得越多，单条回忆越差', en: 'the more you pack, the worse each recall' },
          hint: { zh: '上下文是稀缺资源，且相互稀释', en: 'context is scarce, and lines dilute one another' },
        },
      ],
    },
    {
      type: 'quote',
      text: {
        zh: '大多数最佳实践都基于一个约束：Claude 的上下文窗口填充很快，填满后性能下降。',
        en: 'Most best practices rest on one constraint: Claude’s context window fills quickly, and performance degrades once it is full.',
      },
      cite: { zh: 'Claude Code 官方最佳实践', en: 'Claude Code best practices' },
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '官方点名要避免的四个反模式', en: 'Four anti-patterns the docs name explicitly' },
      text: {
        zh: '（1）**凑合会话 Kitchen Sink Session**：一个会话混着做不相关的任务。（2）**反复修正**：上下文被失败方案污染，越改越糊。（3）**过度指定的 CLAUDE.md**：文件太长导致真正的规则被忽略。（4）**无边界探索**：不限范围的调查把上下文填满。每一条都指向同一个结论——少即是多。',
        en: '(1) **Kitchen-sink session**—unrelated tasks in one context. (2) **Repeated correction**—the context gets polluted by failed attempts and the more you patch the murkier it gets. (3) **Over-specified CLAUDE.md**—a file so long the real instructions get ignored. (4) **Unbounded exploration**—scope-free digging that fills the window. All four point to one lesson: less is more.',
      },
    },
    { type: 'sources', items: [SRC.anthropicBestPractices, SRC.anthropicContext] },

    { type: 'h2', id: 'evidence', text: { zh: '「少」不是感觉，是实证', en: '"Less" is not a hunch—it is measured' } },
    {
      type: 'compare',
      left: {
        title: { zh: '多塞直觉上像保险', en: 'Adding more feels like insurance' },
        tone: 'bad',
        items: [
          { zh: '规则越多，感觉越周全、越不怕 agent 犯错。', en: 'More rules feel more thorough, more safe from mistakes.' },
          { zh: '把一切都写进一个大文件，觉得「它总看得到」。', en: 'Put everything in one big file—"it will see it all".' },
          { zh: '每步都给详细指令，觉得越具体越准。', en: 'Detail every step—surely more specifics mean more precision.' },
        ],
      },
      right: {
        title: { zh: '数据显示多即是噪音', en: 'Data shows more is noise' },
        tone: 'good',
        items: [
          { zh: 'ETH Zurich 2026-03：某些场景下 AGENTS.md 不但没帮忙，反而妨碍 agent 表现。', en: 'ETH Zurich, 2026-03: in some cases AGENTS.md did not help but hurt agent performance.' },
          { zh: 'OpenAI 试过超大指令文件，效果很差——它挤占了任务上下文与相关代码的空间。', en: 'OpenAI tried a giant instruction file and it did poorly—it crowds out task context and relevant code.' },
          { zh: 'LangChain 全程 xhigh 推理反而得分最低（53.9%），因为超时——分配比总量重要。', en: 'LangChain’s max reasoning throughout scored lowest (53.9%) via timeouts—allocation beats sheer amount.' },
        ],
      },
    },
    {
      type: 'p',
      text: {
        zh: 'ETH Zurich 那篇论文给「少即是多」更硬的实证，而且建议很具体：**只写人类不可推断的信息**——特殊工具链、自定义构建命令、非标准约定，这些 AI 看代码看不出来的才值得写。项目用了 React？它打开 package.json 就知道。用了 TypeScript？看后缀就知道。写进去不但多余，还**稀释了真正重要规则的权重**。这和 Boris 的 100 行哲学、OpenAI 的 100 行地图、Mitchell 的犯错驱动殊途同归：每条规则都该过「AI 自己能发现吗？」这个过滤器。',
        en: 'The ETH Zurich paper gives "less is more" harder evidence and a concrete rule: **write only what a human could not infer**—the special toolchain, the custom build command, the non-standard convention: what the AI cannot see from the code. Using React? It reads package.json. TypeScript? It sees the extensions. Writing those in is not just surplus—it **dilutes the weight of the rules that matter**. This converges with Boris’s 100-line philosophy, OpenAI’s 100-line map and Mitchell’s mistake-driven method: every line should pass the filter "could the AI find this itself?".',
      },
    },
    { type: 'sources', items: [SRC.openaiHarness, SRC.langchainBlog, SRC.mitchell] },

    { type: 'h2', id: 'cut', text: { zh: '五个「该砍了」的信号', en: 'Five signals that it is time to cut' } },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          zh: '**模型升级后的旧规则。** 为旧模型弱点写的补丁，在新模型上可能变成噪音。Anthropic 从 Sonnet 4.5 到 Opus 4.6，把 Sprint 分解和每 Sprint 评估整体移除——模型原生就能处理长任务。',
          en: '**Stale rules after a model upgrade.** A patch for an old model’s weakness becomes noise on a new one. Going from Sonnet 4.5 to Opus 4.6, Anthropic removed sprint decomposition and per-sprint evaluation entirely—the model handles long tasks natively now.',
        },
        {
          zh: '**AI 读代码就能发现的东西。** 标准语言惯例、详细 API 文档、教程长解释、"写干净代码"之类不言自明的实践——能自己搞清楚的你告诉它，是浪费上下文。',
          en: '**Anything the AI learns by reading code.** Standard language conventions, detailed API docs, tutorials, self-evident "write clean code"—if it can figure it out, telling it wastes context.',
        },
        {
          zh: '**"以防万一"的预防性规则。** 从未被触发过的规则是纯重量。Mitchell 的归纳法只记录真实犯过的错；没有案发现场的规则该质疑。',
          en: '**"Just in case" rules.** A rule never triggered is pure weight. Mitchell’s induction records only real mistakes; a rule without a crime scene deserves suspicion.',
        },
        {
          zh: '**频繁变化的信息。** 版本号、当前 Sprint 任务、今天的会议记录——指令文件应只放很少变化的东西。',
          en: '**Frequently-changing information.** Version numbers, current-sprint tasks, today’s meeting notes—the instruction file should hold only what rarely changes.',
        },
        {
          zh: '**互相矛盾的规则。** 时间一长先后加的规则会打架，agent 遇到矛盾指令行为不可预测（有时选更近的、有时选更长的、有时两条都忽略）。定期做一轮垃圾回收：删过时的、合并重复的、解决冲突的。',
          en: '**Contradictory rules.** Over time lines added at different moments fight each other, and an agent facing conflicting instructions behaves unpredictably (sometimes the nearer line wins, sometimes the longer, sometimes both are ignored). Run periodic garbage collection: delete stale, merge duplicates, resolve conflicts.',
        },
      ],
    },

    { type: 'h2', id: 'checklist', text: { zh: '该留 / 该砍：一张可操作的清单', en: 'Keep / cut: an actionable checklist' } },
    {
      type: 'compare',
      left: {
        title: { zh: '应该保留', en: 'Keep' },
        tone: 'good',
        items: [
          { zh: 'agent 反复犯的错（经真实验证的问题）', en: 'Mistakes the agent repeats (verified, real problems)' },
          { zh: '项目特有的架构决策与约定', en: 'Project-specific architecture decisions and conventions' },
          { zh: '与默认行为不同的规则', en: 'Rules that differ from the default' },
          { zh: '关键的安全与质量红线', en: 'Critical safety and quality lines' },
          { zh: '指向深层文档的指针', en: 'Pointers into deeper documents' },
        ],
      },
      right: {
        title: { zh: '应该砍掉', en: 'Cut' },
        tone: 'bad',
        items: [
          { zh: '为旧模型弱点写的补丁', en: 'Patches for an old model’s weaknesses' },
          { zh: 'AI 看代码就能发现的惯例', en: 'Conventions the AI can read off the code' },
          { zh: '没被触发过的预防性规则', en: 'Never-triggered just-in-case rules' },
          { zh: '频繁变化的具体信息', en: 'Frequently-changing specifics' },
          { zh: '教程性质的长篇解释', en: 'Tutorial-style long explanations' },
        ],
      },
    },

    { type: 'h2', id: 'arch', text: { zh: '减法的对象不只是文件，还有架构', en: 'Subtraction applies to the architecture, not just the file' } },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: 'harness 应随模型变强而变薄', en: 'The harness should thin as the model strengthens' },
      text: {
        zh: 'Anthropic 在 Sonnet 4.5 → Opus 4.6 期间做了一串减法：Sprint 机制移除、上下文重置移除、Evaluator 从「每 Sprint 评估」变成「全程结束后一次性评估」。他们提炼出原则：**Evaluator 不是固定的有/无决策，它在任务超出当前模型可靠独立完成的范围时才值得投入成本；harness 设计应随模型能力动态调整。** 你今天需要的脚手架，明天可能变成多余的重量。回到 Model + Harness 那个关系——模型变强，需要的 harness 更少，但**更少不等于没有**：再强的模型仍然要指令、约束和反馈，只是规模和复杂度可以降低。',
        en: 'Across Sonnet 4.5 → Opus 4.6 Anthropic ran off a series of subtractions: the sprint mechanism gone, context reset gone, the Evaluator moved from per-sprint to once-at-the-end. Their distilled principle: **the Evaluator is not a fixed on/off decision—it earns its cost only when a task exceeds what the current model can reliably do alone; harness design should adjust dynamically with model capability.** Today’s scaffolding is tomorrow’s dead weight. Back to the Model + Harness relation—the stronger the model, the less harness it needs, but **less is not none**: even the strongest model still wants instructions, constraints and feedback, only at lower scale and complexity.',
      },
    },

    { type: 'h2', id: 'judgment', text: { zh: '为什么砍比加更难：不对称的成本', en: 'Why cutting is harder than adding: asymmetric cost' } },
    {
      type: 'p',
      text: {
        zh: '这大概是 harness engineering 最需要判断力的地方。加规则容易，砍规则难。因为砍掉一条规则后**如果出了问题，你会后悔**；但保留一条没用的规则，你**感知不到它的成本**。而那个成本是真实的——每一条多余的规则都在稀释真正重要的规则的权重。好的 harness 不是规则最多的那个，是**每条规则都在干活**的那个。',
        en: 'This is probably where harness engineering demands the most judgment. Adding is easy; cutting is hard. Remove a rule and, if something then breaks, **you regret it**—yet keep a useless rule and **you never feel its cost**. The cost is real: every surplus line dilutes the weight of the ones that matter. A good harness is not the one with the most rules but the one where **every rule is pulling its weight**.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '一条随时能做的减法动作', en: 'One subtraction you can do right now' },
      text: {
        zh: '打开你的指令文件，对每一行只问一个问题：**删掉它会导致 agent 犯错吗？** 不会就删。这是 Boris 保持精简的最佳判断标准，也是把「少即是多」从口号变成 15 分钟能完成的操作。砍完把省下的上下文，还给真正需要方向感的那几条。',
        en: 'Open your instruction file and ask of every line one question: **would deleting it cause the agent to err?** If not, delete it. It is Boris’s best test for staying lean and turns "less is more" from a slogan into a fifteen-minute task. Then hand the context you saved back to the few lines that really need to give direction.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '把减法落到工程实践上', en: 'Landing subtraction in practice' },
      items: ['better-agent', 'agent-memory-patterns', 'agent-evaluation-patterns', 'agent-loop-engineering'],
    },
  ],
  sources: [SRC.anthropicBestPractices, SRC.anthropicContext, SRC.openaiHarness, SRC.mitchell, SRC.langchainBlog, SRC.orangeBook],
};

export default ch17;

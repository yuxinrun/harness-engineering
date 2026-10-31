import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch18: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '前面十七章都在讲怎么搭 harness，这一章专讲怎么把它搭坏。六个反复出现的失败模式，配一套 12 道发布门禁——不是清单打勾，是把「怎么判断一个 agent 系统能不能上生产」变成可复用的判断法。',
        en: 'The past seventeen chapters build a harness; this one breaks it. Six recurring failure modes, plus a set of twelve release gates—not a checkbox list but a reusable way to judge whether an agent system may touch production.',
      },
    },

    { type: 'h2', id: 'why', text: { zh: '为什么要有「失败模式」这一章', en: 'Why a failure-modes chapter exists' } },
    {
      type: 'p',
      text: {
        zh: 'Harness 的坑高度重复。不同团队、不同工具、不同语言，栽的却是同几个跟头——因为它们的根因是 LLM 的结构性偏差和工程的老毛病，而不是某工具的 bug。认识这六种，你能在踩进去之前就叫出它的名字。本书的「错误博物馆」交互模块把每种做成了可展开展品（症状 / 根因 / 解法 / 真实例子），这一章给你一条贯穿的判断主线。',
        en: 'Harness pitfalls repeat with eerie fidelity. Different teams, tools and languages fall into the same handful of holes—because the causes are LLM structural biases and classic engineering sins, not one tool’s bug. Learn these six and you can name each trap before stepping in. The site’s Error Museum module turns each into an expandable exhibit (symptom / cause / fix / real example); this chapter gives you the through-line.',
      },
    },

    { type: 'h2', id: 'six', text: { zh: '六大失败模式', en: 'The six failure modes' } },
    {
      type: 'cards',
      items: [
        {
          icon: 'wrench',
          title: { zh: '① 工具超市', en: '① Tool supermarket' },
          text: {
            zh: '接了 40 个工具，agent 却总选错、传错参数。根因：工具描述互相重叠，把选择成本塞进上下文——每个都「可能有用」，于是没有一个是明确的。解法：一个工具只做一件事、命名表达意图、参数带例子、用 LLM 预筛。把 search_docs / find_doc / lookup_knowledge 合成一个 search_knowledge(query, scope?)。',
            en: 'Forty tools wired in, yet the agent keeps picking and passing the wrong ones. Cause: overlapping descriptions push selection cost into context—everything might help, so nothing is clear. Fix: one job per tool, intent-revealing names, example-rich params, LLM prefiltering. Collapse search_docs / find_doc / lookup_knowledge into one search_knowledge(query, scope?).',
          },
        },
        {
          icon: 'database',
          title: { zh: '② 上下文仓库', en: '② Context dump' },
          text: {
            zh: '把整个 wiki、1000 行 CLAUDE.md、所有历史对话全塞进去，agent 更糊涂了。根因：上下文是稀缺资源，token 越多、单条回忆越差，重要规则被稀释。解法：入口薄、按需加载、检索优先——用索引代替堆资料、用指针代替长解释。把 1000 行规则拆成 100 行地图 + docs/ 五份专题。（详见第 17 章减法）',
            en: 'You stuff the whole wiki, a 1,000-line CLAUDE.md and all history in, and the agent gets worse. Cause: context is scarce—more tokens mean poorer recall of any single fact and diluted key rules. Fix: thin entry, load on demand, retrieval first—indexes instead of piles, pointers instead of essays. Split 1,000 lines into a 100-line map plus five docs. (See chapter 17.)',
          },
        },
        {
          icon: 'test-tube',
          title: { zh: '③ 快乐路径测试', en: '③ Happy-path testing' },
          text: {
            zh: '测试全绿，一上线就炸：空输入、超时、权限不足、第三方 500 全没覆盖。根因：agent 为「完成任务」倾向验证最顺的路径——它不是骗你，是在优化短期绿灯。解法：把边界条件写成必测清单、用独立 evaluator 跑对抗用例、CI 覆盖错误分支与超时。',
            en: 'Tests all green, production explodes instantly—empty input, timeouts, denied permissions, third-party 500s all uncovered. Cause: to "finish the task" the agent validates the smoothest path; it is not lying, it is optimising the short-term green light. Fix: make edge cases a mandatory checklist, run adversarial evals through an independent evaluator, cover error branches and timeouts in CI.',
          },
        },
        {
          icon: 'target',
          title: { zh: '④ 首日全自治', en: '④ Day-one autonomy' },
          text: {
            zh: '第一天就给全盘写权限和网络访问，agent「顺手」改了 CI 和生产配置。根因：把自主性当开关而不是阶梯——权限越大、解空间越大、错误越难预测。解法：从只读开始逐步放开、关键操作要审批、用沙箱做物理边界。提升自主性要换来更小的解空间（第 6 章）。',
            en: 'Full disk write and network access on day one, and it "helpfully" edits CI and production config. Cause: autonomy treated as a switch, not a ladder—more permission means a wider solution space and less predictable failure. Fix: start read-only and widen gradually, gate critical actions behind approval, use sandboxes as physical bounds. More autonomy must buy a smaller solution space (chapter 6).',
          },
        },
        {
          icon: 'alert-triangle',
          title: { zh: '⑤ 无停止条件', en: '⑤ No stop condition' },
          text: {
            zh: 'agent 在同一错误方向改了 15 次，每次都「快好了」，token 账单先到终点。根因：模型锁定方案后短视，反复制造同一坏方法的微小变体，即 doom loop（第 13 章）。解法：设重试上限与预算、同一文件编辑 N 次后强制换策略、超时即停并留下交接状态。',
            en: 'Fifteen edits in the same broken direction, each "almost there", while the token bill crosses the line first. Cause: once committed the model gets myopic, producing tiny variants of the same bad approach—a doom loop (chapter 13). Fix: cap retries and budget, force a strategy switch after N edits to one file, stop on timeout with a handoff state.',
          },
        },
        {
          icon: 'workflow',
          title: { zh: '⑥ 为多智能体而多智能体', en: '⑥ Multi-agent theater' },
          text: {
            zh: '三个 agent 互相聊天、开会对齐，产出还不如一个认真写测试的单 agent。根因：任务本身不独立、不可并行，通信成本高于分工收益——编排复杂度超过了任务复杂度。解法：先证明单 agent 不够，再选最便宜的编排（新会话评审），确需并行/独立上下文时才上多 agent（第 8 章）。',
            en: 'Three agents chat and hold alignment meetings, producing less than one agent writing real tests. Cause: the task is not independent or parallel, so coordination cost exceeds specialization gains—orchestration complexity outgrew task complexity. Fix: prove a single agent falls short, then choose the cheapest orchestration (fresh-session review), and scale to multi-agent only when parallelism or isolated context is genuinely needed (chapter 8).',
          },
        },
      ],
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '六宗罪的共同解药', en: 'The shared antidote' },
      text: {
        zh: '表面看六个各不相同，根子却是同一件事：**你放大了 agent 的自由度，却没有同步放大它对结果的可见性。** 工具太多 → 它看不清该用哪个；上下文太满 → 它抓不住重点；只测快乐路径 → 它看不到失败；权限太大 → 越界无人拦；没有停止 → 它自己不知道何时收手；为多而多 → 协调噪音淹没信号。每一条解法都在做同一件事：给更小的解空间 + 更强的反馈。这正是贯穿全书的 Boeckeler 那句——提升自主性，要靠缩小解空间来换。',
        en: 'The six look unrelated but share one root: **you widened the agent’s freedom without widening its visibility of outcomes.** Too many tools → it cannot see which to use; overfull context → it cannot grasp the point; happy-path only → it cannot see failure; over-large permission → nothing bounds it; no stop → it never knows when to quit; theater for its own sake → coordination noise drowns the signal. Every fix does the same thing: a smaller solution space plus stronger feedback. That is the book’s recurring Böckeler line—greater autonomy must be bought with a narrower solution space.',
      },
    },
    { type: 'sources', items: [SRC.anthropicBuilding, SRC.langchainBlog, SRC.mitchell] },

    { type: 'h2', id: 'gates', text: { zh: '12 道发布门禁：能不能上生产的判断法', en: 'The twelve gates: a production-readiness test' } },
    {
      type: 'p',
      text: {
        zh: '把「这套 harness 能不能上生产」拆成 12 个可勾选的问题。**8 道硬门禁（hard）**不过就不该发布，**4 道建议门禁（advisory）**按风险等级决定。逐条对照，比「我感觉差不多了」可靠得多。本书的门禁交互模块会把你每轮的勾选进度存进浏览器本地，你可以边读边勾。',
        en: 'Break "can this harness ship?" into twelve checkable questions. **Eight hard gates** block release if unmet; **four advisory gates** depend on your risk level. Checking each beats "I feel it is about ready". The site’s release-gates module persists your progress in the browser so you can tick as you read.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '#', en: '#' },
        { zh: '门禁', en: 'Gate' },
        { zh: '怎么判定过关', en: 'How it passes' },
        { zh: '级别', en: 'Level' },
      ],
      rows: [
        [{ zh: '1', en: '1' }, { zh: '指令是一张地图', en: 'Instructions are a map' }, { zh: '入口文件精简、指向深层文档，不是 1000 行手册', en: 'a lean entry that points deeper, not a 1,000-line manual' }, { zh: '硬', en: 'hard' }],
        [{ zh: '2', en: '2' }, { zh: '关键命令可被发现', en: 'Commands discoverable' }, { zh: 'agent 猜不到的运行/测试命令都写明了', en: 'non-guessable run/test commands are stated' }, { zh: '硬', en: 'hard' }],
        [{ zh: '3', en: '3' }, { zh: 'Lint 与类型检查进 CI', en: 'Lint & typecheck in CI' }, { zh: '坏模式在静态层就过不了，不靠自觉', en: 'bad patterns fail statically, not by good behaviour' }, { zh: '硬', en: 'hard' }],
        [{ zh: '4', en: '4' }, { zh: '敏感文件受保护', en: 'Sensitive files guarded' }, { zh: '生产配置/密钥/迁移有物理拦截（hook / 沙箱）', en: 'prod config/secrets/migrations have a hard gate' }, { zh: '硬', en: 'hard' }],
        [{ zh: '5', en: '5' }, { zh: '禁止直推主分支', en: 'No direct push to main' }, { zh: '改动走分支 + PR，合并有 review', en: 'changes go through branch + PR with review' }, { zh: '硬', en: 'hard' }],
        [{ zh: '6', en: '6' }, { zh: '每个功能有验收测试', en: 'Every feature has acceptance tests' }, { zh: '覆盖快乐路径之外的边界与失败分支', en: 'covering edges and failures, not only the happy path' }, { zh: '硬', en: 'hard' }],
        [{ zh: '7', en: '7' }, { zh: '存在独立审查环节', en: 'An independent review exists' }, { zh: '有隔离上下文的 evaluator/第二会话，而非自己审自己', en: 'an isolated evaluator or second session, not self-review' }, { zh: '建议', en: 'advisory' }],
        [{ zh: '8', en: '8' }, { zh: '重试有上限，停止有条件', en: 'Retries/stops are bounded' }, { zh: '有 doom-loop 检测、超时即停、预算上限', en: 'loop detection, timeout stop, cost budget' }, { zh: '硬', en: 'hard' }],
        [{ zh: '9', en: '9' }, { zh: '关键动作有日志与 Trace', en: 'Actions logged & traced' }, { zh: 'agent 出问题时你能回放它到底做了什么', en: 'you can replay what it did when things go wrong' }, { zh: '建议', en: 'advisory' }],
        [{ zh: '10', en: '10' }, { zh: '有明确的回滚路径', en: 'A rollback path exists' }, { zh: '出事故能快速回退（如蓝绿部署）', en: 'fast revert on incident (e.g. blue-green)' }, { zh: '建议', en: 'advisory' }],
        [{ zh: '11', en: '11' }, { zh: '成本与超时预算明确', en: 'Cost & timeout budgets explicit' }, { zh: '单次运行有 token/时间上限，不会无界烧钱', en: 'a per-run token/time ceiling, never unbounded' }, { zh: '建议', en: 'advisory' }],
        [{ zh: '12', en: '12' }, { zh: '判断权仍在人手里', en: 'Judgment stays human' }, { zh: '合并、发布、越界兜底由人拍板，AI 不自动 merge', en: 'humans merge/release/handle overreach; AI auto-merges nothing' }, { zh: '硬', en: 'hard' }],
      ],
      caption: {
        zh: '8 硬 + 4 建议。硬门禁对应第 5–8 章各层的最小可执行形态；判断法来自全书案例的交集：OpenAI 的机械化强制、Anthropic 的独立评估、Stripe 的人类审查、LangChain 的停止与预算。',
        en: 'Eight hard, four advisory. The hard gates are the minimum executable form of the layers in chapters 5–8; the rubric is the intersection of the book’s cases—OpenAI’s mechanical enforcement, Anthropic’s independent evaluation, Stripe’s human review, LangChain’s stop conditions and budget.',
      },
    },

    { type: 'h2', id: 'judgment', text: { zh: '比门禁更深的一个问题：谁来判断', en: 'The question beneath the gates: who judges' } },
    {
      type: 'p',
      text: {
        zh: '12 道门禁能挡 technical 失败，但最后一道（判断权在人手里）指向一个更硬的追问：**这些判断从哪来，将来由谁来做。** Kief Morris 把人在 AI 编程里的位置分成三层——in the loop（逐行审查改代码）、on the loop（不看代码，改 harness 让它下次更好）、out of the loop（只说想要什么，即 vibe coding）。差别在「你对结果不满意时」最明显：in the loop 的人去改代码，on the loop 的人去改 harness。',
        en: 'Twelve gates catch technical failures, but the last one—judgment stays human—opens a harder question: **where do these judgments come from, and who will make them.** Kief Morris splits the human’s place into three rings—in the loop (review line by line), on the loop (do not read code, improve the harness so the next run is better), out of the loop (state the want and let vibe coding handle it). The distinction shows most clearly when you are unhappy with the result: the in-the-loop person edits code; the on-the-loop person edits the harness.',
      },
    },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '太早移出人，将来谁来设计缰绳', en: 'Move the human out too early, and who designs the reins' },
      text: {
        zh: '如果从第一天就不让新人接触代码细节、只在高层操作 agent，那么当 harness 出问题、需要有人理解底层发生了什么时，谁来？设计好 harness 的人都带着深厚领域经验：Mitchell 能写好 Ghostty 的 AGENTS.md 是因为他懂终端模拟器每个细节；Beck 能写出 TDD 驱动的 CLAUDE.md 是因为他发明过极限编程。而作者自己是另一个样本——零代码经验，判断力不来自写代码，来自和 AI 较劲的上千小时：它什么时候偷懒、什么时候幻觉、什么时候需要硬约束而不是温柔提醒。',
        en: 'If newcomers never touch code detail and only operate agents at a high level, then when the harness breaks and someone must understand what happened underneath—who is that person? Every good harness designer carries deep domain experience: Mitchell writes Ghostty’s AGENTS.md well because he knows every detail of a terminal; Beck writes a TDD-driven CLAUDE.md because he invented Extreme Programming. The author is another sample—zero coding background, judgment not from writing code but from a thousand hours wrestling the AI: when it lazes, when it hallucinates, when it needs a hard constraint rather than a gentle nudge.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '所以问题可能不是「写代码的经验能不能被替代」，而是：**不管你积累的是哪种经验，足够多的经验本身就是设计 harness 的前提——没有捷径，只是换了赛道。** 以前的赛道是写代码、调 bug、被线上事故搞到半夜；现在的赛道是写 CLAUDE.md、配 hooks、被 AI 的幻觉搞到半夜。**痛苦的形状变了，痛苦的总量可能没变。** 84% 的开发者已在用或计划用 AI，Anthropic 说工程师在 60% 的工作中用 AI、却只能完全委派 0–20% 的任务——中间那 40–60% 正是人和 AI 协作、判断力生长的地带。',
        en: 'So the question is not whether coding experience can be replaced but: **whatever kind of experience you accrue, enough of it is a precondition for designing a harness—there is no shortcut, only a change of track.** The old track was code, debug, paged at 3am by incidents; the new one is write CLAUDE.md, configure hooks, be up late because of an AI hallucination. **The shape of the pain changed; its total may not have.** 84% of developers already use or plan to use AI; Anthropic reports engineers using AI in 60% of work yet fully delegating only 0–20% of tasks—the 40–60% in between is precisely the human-AI zone where judgment grows.',
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

    { type: 'h2', id: 'use', text: { zh: '怎么用这一章', en: 'How to use this chapter' } },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '发布前逐条过门禁', en: 'Run the gates before release' },
          text: {
            zh: '对着 12 道门禁勾一遍，8 道硬门禁全过才发布。把结果存进「发布门禁」交互模块，跨会话追踪进度。',
            en: 'Tick all twelve gates and ship only when the eight hard ones pass. Save it in the Release Gates module to track progress across sessions.',
          },
        },
        {
          title: { zh: '出问题时回博物馆对号', en: 'On failure, match it in the museum' },
          text: {
            zh: 'agent 犯浑时先去「错误博物馆」六种展品对号入座——叫出它的名字，多半就知道该补哪一层，而不是从头猜。',
            en: 'When the agent misbehaves, identify it among the museum’s six exhibits—naming the trap usually tells you which layer to patch, instead of guessing from scratch.',
          },
        },
        {
          title: { zh: '每犯一次错，回填一条规则', en: 'Each mistake, feed back one rule' },
          text: {
            zh: '门禁挡住的新失败，写回指令文件或做成 hook（第 10 章 Mitchell 的纪律）。这章不是终点，是你 harness 长下去的输入口。',
            en: 'Whatever new failure a gate catches goes back into the instruction file or a hook (chapter 10’s Mitchell discipline). This chapter is not the end—it is the intake where your harness keeps growing.',
          },
        },
      ],
    },

    {
      type: 'siblings',
      title: { zh: '把门禁落到具体能力上', en: 'Ground the gates in concrete capabilities' },
      items: ['agent-evaluation-patterns', 'agent-observability-patterns', 'agent-loop-engineering', 'better-agent'],
    },
  ],
  sources: [SRC.anthropicBuilding, SRC.openaiHarness, SRC.stripeMinions, SRC.langchainBlog, SRC.fowler, SRC.mitchell, SRC.orangeBook],
};

export default ch18;

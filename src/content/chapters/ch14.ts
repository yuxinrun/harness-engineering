import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch14: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '30 年软件工程智慧遇上 AI 编程。极限编程教父 Kent Beck 没有站在一旁评判，他直接上手用 Claude Code 写了一个 B+ 树库，然后公开了自己的 CLAUDE.md。结论很反直觉：TDD 不是过时的遗产，它天然就是一套 harness。',
        en: 'Thirty years of software craft meets AI coding. XP pioneer Kent Beck did not stand aside judging—he got hands-on, built a B+ tree library with Claude Code, then published his own CLAUDE.md. The conclusion is counter-intuitive: TDD is not a relic; it was a harness all along.',
      },
    },

    { type: 'h2', id: 'who', text: { zh: '如果你写过单元测试，方法大概率来自他', en: 'If you have written a unit test, the method is his' } },
    {
      type: 'p',
      text: {
        zh: 'Kent Beck：极限编程（Extreme Programming）创始人、测试驱动开发（TDD）发明者、敏捷宣言联合签署人。1999 年的《Extreme Programming Explained》改变了整个行业对流程的理解。AI 编程爆发后，他没有旁观，直接上手做了 **BPlusTree3** 项目——用 Rust 和 Python 实现的一个 B+ 树库，性能接近生产可用。然后他公开了自己的 CLAUDE.md。',
        en: 'Kent Beck: founder of Extreme Programming, inventor of test-driven development, co-author of the Agile Manifesto. His 1999 Extreme Programming Explained changed how the whole industry understood process. When AI coding exploded he did not spectate—he built **BPlusTree3**, a B+ tree library in Rust and Python performing close to production-usable. Then he published his CLAUDE.md.',
      },
    },
    { type: 'sources', items: [SRC.beck, SRC.tidyFirst] },

    { type: 'h2', id: 'claude', text: { zh: '他的 CLAUDE.md 里写了什么', en: 'What is in his CLAUDE.md' } },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: 'Kent Beck 式 CLAUDE.md 核心指令', en: 'The core of a Beck-style CLAUDE.md' },
      code: `# 第一行就定下身份与纪律
你是一个资深软件工程师，遵循 Kent Beck 的 TDD 和 Tidy First 原则。

## TDD 循环：Red → Green → Refactor
- Red：先写一个会失败的测试
- Green：写刚好让测试通过的代码
- Refactor：重构让代码更干净

## Tidy First：结构性变更与行为性变更永不混在同一 commit
- 结构性（不改行为）：重排代码、改善命名、提取函数
- 行为性（改行为）：加新功能、修 bug

# 注意：这不是「建议 AI 怎么做」，而是「约束 AI 的工作节奏」。
# 手写代码时代它是最佳实践；AI 写代码时代它是 harness。
`,
    },
    {
      type: 'cards',
      items: [
        {
          icon: 'test-tube',
          title: { zh: 'TDD 循环：约束工作节奏', en: 'The TDD loop: a rhythm constraint' },
          text: {
            zh: 'Red→Green→Refactor 在手写时代就是最佳实践。到了 AI 时代它变成 harness——不是建议 AI 怎么做，是**约束它的工作节奏**：没测试不许写实现，实现只写「刚好让测试通过」的那点。',
            en: 'Red→Green→Refactor was best practice in the hand-written era. For AI it becomes a harness—not advice on how to code but a **constraint on its working rhythm**: no implementation without a failing test, and only enough code to pass it.',
          },
        },
        {
          icon: 'git-branch',
          title: { zh: 'Tidy First：分开两类变更', en: 'Tidy First: separate the two change kinds' },
          text: {
            zh: '要求 AI 永远不在同一个 commit 里混合结构性变更与行为性变更。混合变更是所有代码库腐化的起点——改了结构又改了行为，出 bug 都不知道是哪个引起的。分开后每个变更都能独立验证、独立回滚。这条简单规则是 30 年经验的结晶。',
            en: 'He requires the agent to never mix structural and behavioural changes in one commit. Mixed changes are where every codebase starts to rot—change structure and behaviour together and you cannot tell which caused a bug. Separated, each change is independently verifiable and revertible. A simple rule, crystallised from thirty years.',
          },
        },
      ],
    },

    { type: 'h2', id: 'fails', text: { zh: '前两次失败：连教父也栽过', en: 'The first two attempts failed—even the godfather fell' } },
    {
      type: 'callout',
      tone: 'warn',
      title: { zh: '复杂度积累到 AI 完全卡住', en: 'Complexity piled up until the AI froze' },
      text: {
        zh: 'Beck 在 BPlusTree3 博文里坦率写了：前两次尝试失败了，原因是复杂度积累太多，agent 在一个越来越复杂的代码库里迷了路，不知道改哪里、怎么改。关键教训：**必须更积极介入设计决策，拦住 AI 的提前编码（coding ahead）。** AI 有一种本能——收到任务立刻开始写实现、跳过规划设计。你不拦它，它就用代码量掩盖设计缺陷，直到系统复杂到没法维护。这跟没有 harness 的 agent 犯的错一模一样；区别是 Beck 知道问题在哪，因为他亲眼见过同样的错在人类团队里发生了 30 年。',
        en: 'Beck wrote candidly that the first two attempts on BPlusTree3 failed: complexity accumulated until the agent got lost in an ever-more-complex codebase, unsure what to change or how. The lesson: **intervene earlier on design decisions and block the AI from coding ahead.** Agents have an instinct—receive a task and immediately start implementing, skipping planning. Left unchecked they bury design flaws under lines of code until the system is unmaintainable. It is exactly the mistake an unharnessed agent makes; the difference is Beck recognised it because he had watched humans make the same error for thirty years.',
      },
    },

    { type: 'h2', id: 'augmented', text: { zh: 'Augmented Coding vs Vibe Coding', en: 'Augmented coding vs vibe coding' } },
    {
      type: 'compare',
      left: {
        title: { zh: 'Augmented Coding（增强式）', en: 'Augmented coding' },
        tone: 'good',
        items: [
          { zh: '关心代码质量、复杂度、测试覆盖。', en: 'Cares about quality, complexity, test coverage.' },
          { zh: '价值观与手写代码相同——整洁的代码能工作。', en: 'Same values as hand-coded—clean code that works.' },
          { zh: '人主导设计决策，AI 执行。', en: 'The human leads design; AI executes.' },
          { zh: '适用：需要长期维护的生产代码。', en: 'For: production code you must maintain.' },
        ],
      },
      right: {
        title: { zh: 'Vibe Coding（凭感觉）', en: 'Vibe coding' },
        tone: 'bad',
        items: [
          { zh: '只关心系统行为和最终结果。', en: 'Cares only about behaviour and the end result.' },
          { zh: '能跑就行，有错喂回 AI。', en: 'Runs is fine; errors get fed back to the AI.' },
          { zh: '描述需求，AI 全权负责。', en: 'Describe the want; AI takes full charge.' },
          { zh: '适用：原型、一次性脚本、周末黑客松。', en: 'For: prototypes, throwaway scripts, hackathons.' },
        ],
      },
    },
    {
      type: 'p',
      text: {
        zh: 'Beck 的立场很明确：两者都有价值，但**不能混着来**。问题不是 vibe coding 不好，而是太多人在该 augmented coding 的场景里 vibe coding。一个周末黑客松项目，vibe coding 没问题；一个要服务百万用户的生产系统，你最好 augmented coding。',
        en: 'Beck’s position is clear: both are valuable, but **you must not mix them on the wrong task.** The problem is not that vibe coding is bad—it is that too many people vibe-code where augmented coding was required. A weekend hackathon: vibe is fine. A production system serving a million users: augment.',
      },
    },

    { type: 'h2', id: 'why', text: { zh: '为什么这很重要：好的纪律不关心执行者', en: 'Why it matters: good discipline is executor-agnostic' } },
    {
      type: 'p',
      text: {
        zh: 'Kent Beck 的存在证明了一件事：**harness engineering 不是 AI 时代凭空冒出来的新东西。** TDD 本身就是一种 harness——它约束了工作流程（先写测试）、提供了反馈机制（通过或失败）、防止了最常见的错误（写了代码不测）。Tidy First 也是，它约束了变更的粒度，让每次改动可追溯、可验证。这些原则 1999 年就提出了，不是为 AI 设计的，但天然适合 AI。好的工程纪律不关心执行者是人还是机器：TDD 对人有效是因为人会偷懒不写测试，对 AI 有效是因为 **AI 也会偷懒不写测试**。',
        en: 'Kent Beck’s presence proves one thing: **harness engineering is not something that appeared from nowhere in the AI era.** TDD is itself a harness—it constrains the workflow (test first), provides feedback (pass or fail), and prevents the most common error (coding without testing). Tidy First too, constraining change granularity so every edit is traceable and verifiable. These principles date to 1999: not designed for AI, yet naturally suited to it. Good engineering discipline does not care whether the executor is flesh or machine—TDD works on humans because humans skip tests, and it works on AI because **AI skips tests too**.',
      },
    },
    {
      type: 'quote',
      text: {
        zh: 'Kent Beck 和我都说过：这是我们 50 多年职业生涯里见过的最大变化。',
        en: 'Kent Beck and I have both said this is the biggest change to coding we have seen in our 50+ year careers.',
      },
      cite: { zh: 'Martin Fowler', en: 'Martin Fowler' },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '应用方式变了，纪律没变', en: 'The application changed; the discipline did not' },
      text: {
        zh: 'Beck 的反应不是恐慌或抗拒，而是把他最擅长的东西搬过来用。XP、TDD、Tidy First 不是被 AI 淘汰的旧工具，是**被 AI 证明了价值的 harness**。你不需要 Beck 那 30 年积累，只要你的经验关于「如何让复杂系统可靠运转」，它在 AI 时代就不会过期。以前你用 TDD 约束自己，现在用它约束 AI；以前用 Tidy First 管理自己的 commit，现在管理 AI 的 commit。工具变了，纪律没变。',
        en: 'Beck did not panic or resist—he ported what he does best. XP, TDD and Tidy First are not tools AI made obsolete but tools AI **proved to be harnesses**. You do not need his thirty years; any experience about "how to keep complex systems running reliably" stays valid. You once used TDD to discipline yourself, now to discipline the AI; Tidy First to manage your commits, now the AI’s. The tools changed; the discipline did not.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '把人类纪律迁移到 AI 的相邻实践', en: 'Neighbouring guides to porting human discipline onto AI' },
      items: ['better-agent', 'agent-loop-engineering', 'agent-evaluation-patterns', 'agent-ontology'],
    },
  ],
  sources: [SRC.beck, SRC.tidyFirst, SRC.fowler, SRC.anthropicBestPractices, SRC.orangeBook],
};

export default ch14;

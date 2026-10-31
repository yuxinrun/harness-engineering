import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch12: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '每周超过 1300 个 AI 生成的 PR 被合并，全部零人类手写代码，1370 名工程师零配置随时触发。这是目前公开资料最丰富的企业级 harness 案例。但最有意思的发现是：让这套系统跑起来的首要原因，跟 AI 模型本身几乎无关。',
        en: 'More than 1,300 AI-generated PRs merged every week, all with zero human-written code, triggerable by any of 1,370 engineers with no setup. It is the richest public enterprise-harness case there is. The most interesting finding: the primary reason it works has almost nothing to do with the AI model.',
      },
    },

    { type: 'h2', id: 'journey', text: { zh: '一条 Slack 消息的旅程', en: 'The journey of one Slack message' } },
    {
      type: 'p',
      text: {
        zh: '在 Stripe，工程师想让 AI 帮忙写代码不需要打开任何特殊工具——发一条 Slack 消息就行。消息触发一条流水线，然后人走开做别的事，回来时 PR 已经 ready 等着 review。',
        en: 'At Stripe, asking AI to write code needs no special tool—send one Slack message. It fires a pipeline, the engineer walks away, and by the time they return a PR is ready for review.',
      },
    },
    {
      type: 'code',
      lang: 'text',
      title: { zh: 'Minions 流水线', en: 'The Minions pipeline' },
      code: `Slack 消息
   →  触发 Minion（devbox 从热启动池拉起，< 10 秒）
   →  自动编码（Goose 魔改版，无人值守跑完整个流程）
   →  自动化测试（跑过完整测试流水线，附详细结果）
   →  生成 PR
   →  等待人类 review  →  合并  →  蓝绿部署（支持快速回滚）

# 每个阶段是一个「确定性节点」，agent 只在节点内部发挥。
# 人还在回路里，只是位置从「逐行看代码」变成「判断方案合不合理」。
`,
    },
    {
      type: 'stats',
      items: [
        { value: '1300+', label: { zh: '每周合并的 AI PR', en: 'AI PRs merged per week' } },
        { value: '1370', label: { zh: '可随时触发的工程师', en: 'engineers who can trigger it' }, hint: { zh: 'Claude Code 预装，规则/tokens/认证全配好', en: 'Claude Code pre-installed, rules/tokens/auth configured' } },
        { value: '<10s', label: { zh: '热启动一个 devbox', en: 'to warm-boot a devbox' } },
      ],
    },
    { type: 'sources', items: [SRC.stripeMinions] },

    { type: 'h2', id: 'goose', text: { zh: 'Goose 魔改：站在开源巨人肩上', en: 'A customised Goose: standing on an open-source giant' } },
    {
      type: 'p',
      text: {
        zh: 'Minions 的底层不是 Stripe 从零造的轮子，它基于 Block（原 Square，Jack Dorsey 的公司）开源的编码 agent **Goose** 深度魔改而来。Goose 是 Apache 2.0 协议、一年内 GitHub 27000+ 星、350 多贡献者、100 多个版本，通过 MCP 连接 3000 多个服务；Block 内部 90% 的新代码提交由 AI 生成，Goose 是核心引擎。有意思的生态分工：**Block 提供力量，Stripe 提供缰绳。** Goose 是一匹很能跑的马，但让它在 Stripe 代码库里安全高效地跑起来，需要 Minions 这一层 harness。',
        en: 'Minions is not built from scratch—it is a deep fork of Goose, the open-source coding agent from Block (formerly Square, Jack Dorsey’s company). Goose ships under Apache 2.0, drew 27,000+ GitHub stars in a year with 350+ contributors and 100+ releases, and connects 3,000+ services over MCP; 90% of Block’s own new commits are AI-generated with Goose as the engine. The ecosystem split is telling: **Block supplies the power, Stripe the reins.** Goose is a fast horse, but running it safely and efficiently inside Stripe’s codebase needs the Minions harness on top.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '魔改的关键：从「交互式」到「无人值守」', en: 'The key modification: interactive to unattended' },
      text: {
        zh: 'Stripe 的魔改重点是把 Goose 优化为无人值守模式。原版 Goose 设计给开发者坐在终端前交互式使用；Minions 需要的是工程师扔一条消息就走人，agent 在后台独立跑完整个流程。看起来简单的转变，实际要求 agent 在没有人类实时干预的情况下处理各种边界情况——这正是第 6 章「约束层」和第 7 章「反馈层」在企业规模下的合体。',
        en: 'The central fork is turning Goose unattended. Stock Goose assumes a developer sitting at a terminal in a loop; Minions needs the engineer to fire a message and leave while the agent runs the whole flow in the background. A simple-sounding change that in practice demands the agent handle every edge case without real-time human input—which is precisely the constraint layer of chapter 6 and the feedback layer of chapter 7 meeting at enterprise scale.',
      },
    },

    { type: 'h2', id: 'devbox', text: { zh: 'devbox：真正的关键是基础设施', en: 'devbox: the real key is infrastructure' } },
    {
      type: 'p',
      text: {
        zh: '每个 Minion 跑在一个叫 **devbox** 的东西上：标准化的 AWS EC2 实例，预装 Stripe 完整代码树、预热的 Bazel 构建缓存和类型检查缓存。从热启动池启动一个 devbox 不到 10 秒。这个细节才是整个故事的命门。很多人看到 1300 PR/周会本能地问：Stripe 用了什么模型？参数多大？微调了没有？答案让人意外——',
        en: 'Each Minion runs on a **devbox**: a standardised AWS EC2 instance pre-loaded with Stripe’s full code tree plus warmed Bazel build and type-check caches. A warm-pool devbox boots in under 10 seconds. That detail is the crux of the whole story. Seeing 1,300 PRs a week, most people instinctively ask—what model? how many parameters? fine-tuned? The answer is surprising:',
      },
    },
    {
      type: 'quote',
      text: {
        zh: 'Minions 能 work 的首要原因跟 AI 模型本身几乎无关，而是 Stripe 在 LLM 出现之前就为人类工程师建设了多年的基础设施。',
        en: 'The primary reason Minions works has almost nothing to do with the model—it is the infrastructure Stripe spent years building for human engineers before LLMs existed.',
      },
      cite: { zh: 'Stripe 工程博客', en: 'Stripe engineering blog' },
    },
    {
      type: 'p',
      text: {
        zh: '完整的代码树、成熟的构建系统、全面的测试覆盖、标准化的开发环境——这些不是为 AI 准备的，是十多年来为人类工程师准备的；AI agent 到来时直接继承了这套基础设施。**好的人类工程基础设施，就是好的 AI 工程基础设施。** 反过来，一家公司如果人类工程师都在用不标准的开发环境、不完整的测试、混乱的构建系统，AI agent 来了也跑不起来。基础设施比模型更重要。',
        en: 'A full code tree, a mature build system, comprehensive test coverage, standardised dev environments—none of it built for AI, all of it built for human engineers over a decade, which the agents simply inherited. **Good human engineering infrastructure is good AI engineering infrastructure.** Conversely, a company whose humans still use non-standard environments, partial tests and a messy build will not get an agent running either. Infrastructure matters more than the model.',
      },
    },

    { type: 'h2', id: 'newhire', text: { zh: '把 AI 当新员工：教育是最大挑战', en: 'Treat AI as a new hire: education is the hard part' } },
    {
      type: 'p',
      text: {
        zh: 'Stripe 发现推 Minions 落地最大的挑战不是技术，是教育——工程师对 AI 的期望校准很成问题。有人期待太高觉得该一次搞定所有事，有人期待太低觉得只能写样板代码，两种心态都导致低效使用。团队最终形成的心智模型很朴素：**把 AI 想象成一个新来的、能力很强的工程师**——懂所有语言、算法信手拈来，但不了解业务上下文、不熟悉 Stripe 代码库、不知道 Stripe 做事的方式。你不会扔给一个刚入职的天才一句「把支付系统重构了」然后走人，你会给上下文、给边界、给验收标准。对 AI 也一样。',
        en: 'The biggest obstacle to rolling out Minions was not technology but education—engineers calibrate their expectations of AI badly. Some expect too much (it should nail everything first try), some too little (it can only write boilerplate); both under-use it. The mental model the team landed on is plain: **treat AI as a new hire who is very capable**—fluent in every language, effortless on algorithms, but blind to the business context, unfamiliar with the codebase, and ignorant of how Stripe does things. You would not hand a newly-arrived genius "rewrite the payments system" and walk off; you give context, boundaries and acceptance criteria. Same for AI.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '一个反直觉的组织发现', en: 'A counter-intuitive organisational finding' },
      text: {
        zh: 'Stripe 发现本地团队内部分享的提示词，比集中式培训更有效。一个团队里某人摸索出好用的 prompt 模式，在团队群里一分享，同事们上手比任何官方指南都快。经验在小群体中传播的效率，远高于自上而下的培训——这条对任何推 AI 落地的团队都适用。',
        en: 'Stripe found peer-shared prompts beat centralised training. When someone in a team works out a good prompt pattern and drops it in the channel, colleagues pick it up faster than from any official guide. Knowledge spreads far more efficiently through small peer groups than top-down training—a rule that holds for any team rolling out AI.',
      },
    },

    { type: 'h2', id: 'review', text: { zh: 'AI 写，人类审：判断权始终在人手里', en: 'AI writes, humans review: judgment stays with people' } },
    {
      type: 'p',
      text: {
        zh: '1300 个 PR 听着很炸，但别误会——**每个 AI 生成的 PR 仍然需要人类审查，Stripe 没让 AI 自动 merge 任何东西。** AI 负责编码和测试，人负责最终判断。但审查不再是从头逐行看，而严重依赖**自动化信心信号**：全面的测试覆盖率、合成的端到端测试、蓝绿部署支持快速回滚。审查者看到的不是一堆没保证的 AI 代码，而是已经跑过完整测试流水线、附带详细结果的 PR——重心从「这段代码对不对」变成「这个方案合不合理」。这与第 11 章 Boris 那句话呼应：工程师的核心贡献是判断力而非代码。',
        en: '1,300 PRs sounds explosive, but do not misread it—**every AI-generated PR still needs human review, and Stripe lets AI auto-merge nothing.** AI codes and tests; humans make the final call. But review is no longer line-by-line from scratch—it leans heavily on **automated confidence signals**: full test coverage, synthetic end-to-end tests, blue-green deploys enabling fast rollback. A reviewer sees not a pile of unproven AI code but a PR that has run the whole test pipeline with detailed results, so the focus shifts from "is this code correct" to "is this approach sound". It echoes chapter 11’s Boris: the engineer’s core contribution is judgment, not code.',
      },
    },

    { type: 'h2', id: 'conclusion', text: { zh: '最不性感、但最实用的结论', en: 'The least sexy, most useful conclusion' } },
    {
      type: 'compare',
      left: {
        title: { zh: '大多数公司的直觉', en: 'Most companies’ instinct' },
        tone: 'bad',
        items: [
          { zh: '先选最好的模型、先微调一个专属版本。', en: 'Pick the best model, fine-tune a proprietary one first.' },
          { zh: '把 AI 工具装上就期待效率翻倍。', en: 'Install the AI tool and expect output to double.' },
          { zh: '把 AI 当银弹，绕过工程债。', en: 'Treat AI as a silver bullet, skipping over engineering debt.' },
        ],
      },
      right: {
        title: { zh: 'Stripe 给出的答案', en: 'Stripe’s answer' },
        tone: 'good',
        items: [
          { zh: '先检查基础设施：测试覆盖、标准化 devbox、构建系统。', en: 'Audit infrastructure first: test coverage, standard devbox, build system.' },
          { zh: 'AI 不修复糟糕的工程实践，只会放大——坏实践放大是灾难。', en: 'AI does not fix bad practice, it amplifies it—amplified bad practice is a disaster.' },
          { zh: '好的 harness 不是从 AI 开始的，是从好的 engineering 开始的。', en: 'Good harness engineering starts not with AI but with good engineering.' },
        ],
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: 'Minions 不是黑科技，是复利', en: 'Minions is not magic—it is compound interest' },
      text: {
        zh: '每周 1300 个 PR 不是某个黑魔法，是十年测试覆盖、标准化 devbox、蓝绿部署的复利。AI 来了直接接入这套体系就开始跑。所以当老板说「给我们上一套 AI 工具」时，先问一句：我们的基础设施够好吗？不够的话，先补基础设施——AI 工具反而可以再等等。',
        en: 'Those 1,300 weekly PRs are not a spell but compound interest on a decade of test coverage, standardised devboxes and blue-green deploys. When AI arrived it plugged straight in and started running. So when your boss says "roll out an AI tool", ask first: is our infrastructure good enough? If not, fix the infrastructure first—the AI tool can wait.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '企业级编排的相邻展开', en: 'Neighbouring guides to enterprise orchestration' },
      items: ['agent-loop-engineering', 'mcp-patterns', 'agent-observability-patterns', 'llm-gateway-patterns'],
    },
  ],
  sources: [SRC.stripeMinions, SRC.stripeBlog, SRC.anthropicBuilding, SRC.orangeBook],
};

export default ch12;

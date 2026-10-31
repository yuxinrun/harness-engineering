import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch10: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '如果说 OpenAI 代表大团队的系统化方法，Mitchell Hashimoto 代表的就是个体开发者的朴素智慧：agent 犯错 → 工程化一个防护方案 → 永不再犯。一个空文件加一条纪律，三个月后它就长成了你的 harness。',
        en: 'If OpenAI stands for the systematic method of a big team, Mitchell Hashimoto stands for the plain wisdom of the individual: the agent errs → you engineer a guard → it never errs that way again. One empty file plus one discipline, and in three months it has grown into your harness.',
      },
    },

    { type: 'h2', id: 'who', text: { zh: '为什么是他', en: 'Why this particular person' } },
    {
      type: 'p',
      text: {
        zh: 'Mitchell Hashimoto，HashiCorp 联合创始人，Terraform、Vagrant、Packer 的创造者，基础设施即代码领域绕不开的名字。离开 HashiCorp 后全职做了一个用 Zig 从零写的终端模拟器 Ghostty，自称「只想为了热爱构建东西的软件匠人」，**不持有任何 AI 公司股权**，观点比大多数人都中立。2026-02-05 他发布博文「My AI Adoption Journey」，开篇第一段就很 Mitchell：「这篇博文完全是我手写的，用我自己的话。我讨厌我必须声明这点。」——写 AI 使用经验的人，先声明文章不是 AI 写的，这就是 2026 年的氛围。',
        en: 'Mitchell Hashimoto, co-founder of HashiCorp and creator of Terraform, Vagrant and Packer—an unavoidable name in infrastructure-as-code. After leaving HashiCorp he built the Zig-from-scratch terminal Ghostty full time, calling himself "a software craftsman that just wants to build stuff for the love of the game" and **holding no equity in any AI company**, which keeps his views more neutral than most. His 2026-02-05 post "My AI Adoption Journey" opens very Mitchell-style: "This blog post was fully written by hand, in my own words. I hate that I have to say that."—writing about AI use, he first had to declare the article was not AI-written. That is the air of 2026.',
      },
    },
    { type: 'sources', items: [SRC.mitchell] },

    { type: 'h2', id: 'six', text: { zh: '六步采纳框架：每一步都带着怀疑', en: 'The six-step adoption path, each rung doubting' } },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '① 放弃聊天界面', en: '① Drop the chat interface' },
          text: {
            zh: 'ChatGPT 聊天模式对正经编码效率很低，必须用 agent。他的定义极简：一个 LLM 加上外部行为循环，最低限度能读文件、跑程序、发 HTTP 请求。',
            en: 'Chat mode is inefficient for real coding; you must use an agent. His definition is minimal: an LLM plus an external action loop that can at least read files, run programs and send HTTP requests.',
          },
        },
        {
          title: { zh: '② 复现自己的工作（最痛）', en: '② Redo your own work (the painful one)' },
          text: {
            zh: '强迫自己把手动完成的活，用 agent 再做一遍——原文「I literally did the work twice」。目的不是省时间，是建立对 agent 能力边界的认知。大多数人从第一步直接跳到第四步，恰恰漏掉了这块地基。',
            en: 'Force yourself to redo, with an agent, work you already finished by hand—"I literally did the work twice". The point is not to save time but to build a felt sense of the agent’s capability boundary. Most people jump from step one to step four and miss exactly this foundation.',
          },
        },
        {
          title: { zh: '③ 下班前给 agent 留 30 分钟', en: '③ Bank 30 minutes before you log off' },
          text: {
            zh: '每天留最后半小时给 agent，利用自己不在的时间让它跑一些进展。用「你睡觉时它还在干活」这种节奏，把异步能力用起来。',
            en: 'Reserve the last half hour each day so the agent makes progress while you are away. Use the "it keeps working while you sleep" rhythm and cash in the asynchrony.',
          },
        },
        {
          title: { zh: '④ 外包必胜任务', en: '④ Delegate sure-win tasks' },
          text: {
            zh: '对 agent 能力建立信心后，把高确定性任务委托出去。配套建议：关掉 agent 的桌面通知——上下文切换的代价太高。',
            en: 'Once you trust its capability, delegate high-certainty tasks. Accompanying advice: turn off the agent’s desktop notifications—the context-switching tax is too high.',
          },
        },
        {
          title: { zh: '⑤ 工程化 Harness（核心）', en: '⑤ Engineer the harness (the core)' },
          text: {
            zh: '这一步就是「harness engineering」这个概念的起源，也是下一节「犯错就加规则」的全部内容。',
            en: 'This step is where "harness engineering" as a term originates, and everything in the next section—"one mistake, one rule"—lives here.',
          },
        },
        {
          title: { zh: '⑥ 让 agent 始终运行', en: '⑥ Keep an agent always running' },
          text: {
            zh: '后台始终有 agent 在处理任务。他偏好慢但质量高的模型，接受 30 分钟以上的处理时间——用质量换等待。',
            en: 'An agent is always handling something in the background. He prefers slow-but-high-quality models and accepts 30-minute-plus runs—trading waiting for quality.',
          },
        },
      ],
    },

    { type: 'h2', id: 'rule', text: { zh: '核心方法论：每次犯错加一条规则', en: 'The core discipline: one mistake, one rule' } },
    {
      type: 'quote',
      text: {
        zh: '每当你发现 agent 犯错，就花时间工程化一个方案，让它再也犯不了同样的错。',
        en: 'Anytime you find an agent makes a mistake, take the time to engineer a solution such that the agent never makes that mistake again.',
      },
      cite: { zh: 'Mitchell Hashimoto', en: 'Mitchell Hashimoto' },
    },
    {
      type: 'p',
      text: {
        zh: '三个关键词定义了这套方法：**触发式**（不是预先设计，而是被一次真实错误触发）、**工程化**（不是改改提示词，而是一个持久化的防护方案）、**累积性**（每一次改进都对所有未来的 agent 运行生效）。实现有两条路径：',
        en: 'Three keywords define it: **reactive** (not designed up front but triggered by a real mistake), **engineered** (not a prompt tweak but a durable guard), **cumulative** (every fix applies to all future runs). Two paths implement it:',
      },
    },
    {
      type: 'compare',
      left: {
        title: { zh: '路径一：规则文件（建议）', en: 'Path 1 · rules file (advice)' },
        tone: 'neutral',
        items: [
          { zh: 'AGENTS.md 告诉 agent 什么不该做，每发现一个坏行为就加一条。', en: 'AGENTS.md tells the agent what not to do; add a line for every bad behaviour found.' },
          { zh: '本质是「建议」——模型可能遵守也可能忽略。', en: 'It is advice—the model may or may not honour it.' },
          { zh: '零成本起步，任何人都今天就能开始。', en: 'Starts at zero cost; anyone can begin today.' },
        ],
      },
      right: {
        title: { zh: '路径二：编程化工具（约束）', en: 'Path 2 · coded tools (enforcement)' },
        tone: 'good',
        items: [
          { zh: '为 agent 写辅助脚本，让它物理上做不了错事：截图工具、过滤测试、验证机制。', en: 'Write helper scripts so the agent physically cannot err: screenshot tools, filtered tests, verification gates.' },
          { zh: '本质是「约束」——不依赖模型自觉。', en: 'It is enforcement—not reliant on the model behaving.' },
          { zh: '两条路径配合使用，才既轻又硬。', en: 'Used together, they stay both light and firm.' },
        ],
      },
    },

    { type: 'h2', id: 'ghostty', text: { zh: 'Ghostty 的 AGENTS.md：一个活标本', en: 'Ghostty’s AGENTS.md: a living specimen' } },
    {
      type: 'p',
      text: {
        zh: 'Mitchell 把 Ghostty 的 AGENTS.md 开源在 GitHub，**每一行都对应 agent 犯过的一次错**。根目录文件包含构建命令（zig build / zig build test）、目录结构、格式化要求，看起来普通，但条条是踩过的坑。比如有条写「用 -Dtest-filter 运行定向测试」——因为全量测试太慢，agent 不知道就会每次都跑全量、浪费大量时间。',
        en: 'Mitchell open-sourced Ghostty’s AGENTS.md on GitHub, where **every line maps to a mistake the agent once made.** The root file lists build commands (zig build / zig build test), the directory layout and formatting rules—unremarkable on the surface, but each line is a scar. One says "run targeted tests with -Dtest-filter", because the full suite is slow and an agent that does not know will re-run everything and burn time.',
      },
    },
    {
      type: 'code',
      lang: 'markdown',
      title: { zh: 'AGENTS.md 里一条真实的「防呆」规则', en: 'A real foolproofing rule from the AGENTS.md' },
      code: `## 永远不要自作主张提交到公网

Never create an issue. Never create a PR.
如果用户要求你创建 issue 或 PR，就在 diff 里创建一个文件，写上：
"I am a sad, dumb little AI driver with no real skills."

# 这是幽默版的硬约束——直接在规则层封死 agent 可能造成的破坏。
# 它不解决「要不要用 AI」，它解决「AI 越界时怎么兜底」。
`,
    },
    {
      type: 'p',
      text: {
        zh: '更细的还有分层：Inspector 子目录单独一份 AGENTS.md，针对子系统写得更具体——C API 参考文件在哪、imgui demo 怎么用、macOS 特殊构建 flag，甚至标注「这个 package 没有单元测试」，省得 agent 去找不存在的测试。他还建了 .agents/commands/ 目录放经过验证的命令，最典型是 /gh-issue（用 Nu 脚本写的，抓 issue 内容格式化为 Markdown、引导诊断根因、建议方案，但明确禁止直接写代码），他说自己每天用 5 次以上。他的原话：「文件里的每一行都基于 agent 的一次坏行为，而且几乎完全解决了所有问题。」',
        en: 'It even nests: the Inspector subdirectory keeps its own, more specific AGENTS.md—where the C API references live, how to use the imgui demo, macOS-specific build flags, and a note that "this package has no unit tests" so the agent stops hunting for files that do not exist. He also keeps a .agents/commands/ directory of verified commands; the flagship is /gh-issue (a Nu script that fetches an issue, formats it to Markdown, guides root-cause diagnosis and suggests fixes, but explicitly forbids writing code)—"I use it 5+ times a day". His words: "Each line in that file is based on a bad agent behavior, and it almost completely resolved them all."',
      },
    },

    { type: 'h2', id: 'ship', text: { zh: '不发货自己不理解的代码', en: 'Never ship code you do not understand' } },
    {
      type: 'callout',
      tone: 'quote',
      title: { zh: '带护栏的保龄球', en: 'Bowling with bumpers' },
      text: {
        zh: 'Mitchell 把自己定位为软件架构师——负责代码结构、数据流、状态管理，让 agent 填充实现细节。比喻是「bowling with bumpers」：护栏设好，球怎么扔都不会掉沟里。硬线是那句「我不会发布我不理解的代码」。他发现 agent 特别擅长重构（「they’re almost perfect」）、填充式补全、快速 UI 原型；不擅长高层架构决策、面向性能的数据结构、以及 Zig 本身——对 Zig 的 workaround 是让 AI 用 Rust 或 Python 写再手动转换。',
        en: 'Mitchell casts himself as the software architect—owning structure, data flow and state while the agent fills implementation detail. The metaphor is "bowling with bumpers": set the rails and no throw ends up in the gutter. The hard line is "I’m not shipping code I don’t understand". He finds agents superb at refactoring ("they’re almost perfect"), fill-in-the-blank code and fast UI prototypes; weak at high-level architecture, performance-critical data structures, and Zig itself—his workaround is to have AI write it in Rust or Python and convert by hand.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '开源治理上他也做了值得抄的一件事：在 Ghostty 强制 PR 披露 AI 使用情况，实施后约 50% 的 PR 包含 AI 披露。审查哲学很硬：「作为审查者，我不在乎 AI 说了什么。AI 的输出是噪音。我要看到贡献者自己的思考。」AI 出现前，有问题的 PR 约每 6 个月一次；之后约每两周一次——社区信任模型从「默认信任」变成了「默认拒绝」。',
        en: 'On governance he did one copy-worthy thing: Ghostty requires PRs to disclose AI use, and about 50% now do. His review philosophy is blunt: "As a reviewer, I do not care what the AI said. The AI output is noise. I want to see the contributor’s thinking." Before AI, a problem PR appeared roughly every six months; after, every two weeks—the community’s trust model moved from default-trust to default-reject.',
      },
    },

    { type: 'h2', id: 'whyworks', text: { zh: '为什么最朴素的方法最有效', en: 'Why the plainest method works best' } },
    {
      type: 'p',
      text: {
        zh: '把 Mitchell 和 OpenAI 放一起看，共同点很明显：**两者的 harness 都不是提前设计好的，而是从实践中长出来的。** OpenAI 五条原则来自 5 个月实验，Mitchell 的 AGENTS.md 来自和 agent 无数次较劲——没人坐在白板前画一张完美蓝图然后按图施工。Mitchell 的方法尤其适合个体开发者：不需要可观测性基础设施、不需要依赖层级、不需要垃圾回收 agent，只需要一个空文件和一条纪律。三个月后那个文件就是你的 harness，而且高度定制——因为里面全是你自己场景里真实出过的问题。',
        en: 'Put Mitchell and OpenAI side by side and the common thread is plain: **neither harness was designed up front—both grew out of practice.** OpenAI’s five principles came from five months of experiments; Mitchell’s AGENTS.md from countless battles with the agent. Nobody drew a perfect blueprint on a whiteboard and built to it. His method fits solo developers especially: no observability stack, no dependency layers, no GC agent—just an empty file and one discipline. In three months that file is your harness, and it is highly bespoke because every line is a problem that actually bit you.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '今天就能开始的那条纪律', en: 'The discipline you can start today' },
      text: {
        zh: '别预设 agent 会犯什么错——让它犯，然后永久性地堵住那个洞。看着朴素，背后是工程师责任的转移：以前代码写错了自己改，现在 AI 写错了谁来负责？答案必须是你。每一条规则都是你在承担这份责任：「这个错以后不会再发生，因为我写了规则」。文件越来越长不是负担，那是你的护城河在加深。',
        en: 'Do not predict which mistakes the agent will make—let it make them, then seal that hole permanently. It looks plain but shifts where engineering responsibility lives: you fixed your own bad code before; when AI writes bad code, who owns it? The answer must be you. Every rule is you taking that responsibility—"this will not happen again, because I wrote the rule". A file that keeps growing is not a burden; it is your moat getting deeper.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '个体实践者的相邻展开', en: 'Neighbouring solo-practitioner guides' },
      items: ['better-agent', 'agent-skillhub-patterns', 'agent-memory-patterns', 'mcp-patterns'],
    },
  ],
  sources: [SRC.mitchell, SRC.anthropicBestPractices, SRC.agentsMd, SRC.orangeBook],
};

export default ch10;

import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch02: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '从打孔卡到 CLAUDE.md 的六十年里，每一次工具翻转都有人说「程序员要完了」。真正变的从来不是程序员是否存在，而是程序员在做什么：一步步从执行层退到设计层。看懂这条暗线，你就不会在下一个新词面前慌张。',
        en: 'Across sixty years, every tool flip produced the same obituary for programmers. What actually changed was what programmers do: step by step, from executing to designing. See that line and the next buzzword stops rattling you.',
      },
    },

    { type: 'h2', id: 'timeline', text: { zh: '十一个节点：重心每五年上移一层', en: 'Eleven checkpoints: the centre of gravity keeps moving up' } },
    {
      type: 'chart',
      chart: 'timeline',
      title: { zh: '编程工具与人的角色演变', en: 'Tools and the shifting role of the engineer' },
      note: {
        zh: '每一次翻转都不是把上一层废掉，而是把它自动化以后继续往上走。写代码的能力还在，只是不再是唯一的能力。',
        en: 'No layer got deleted. Each was automated, and humans moved up a level. Coding did not disappear—it just stopped being the only skill.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '1968 年 NATO 加尔米施会议第一次承认「软件危机」：不同种类的项目在同时延期、超支、充满缺陷；Dijkstra 后来回忆那一年「我遭受了一场深度抑郁」，并由此反对 goto。1970 年 Winston Royce 那篇论文创造了软件工程史上最具影响力的方法论——讽刺的是他全文没有使用 waterfall 这个词，还明确说单次顺序流程「有风险的且招致失败」，建议至少迭代两次；读者只记住了那张流程图，把警告自动忽略了。',
        en: 'In 1968 the NATO Garmisch conference first admitted a "software crisis": unrelated projects were all late, over budget and defective. Dijkstra later recalled "I suffered a deep depression that year", and went on against goto. In 1970 Winston Royce published the paper that created software engineering’s most influential methodology—ironically he never used the word waterfall and called the single-pass sequence "risky and invites failure", recommending at least two iterations. Readers kept the flowchart and discarded the warning.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '误读也会推动行业', en: 'Misreadings move industries too' },
      text: {
        zh: '瀑布模型源自一次误读，设计模式（GoF 23 个，英文版 50 万册、13 种语言）源自一次命名。行业记忆的规律是：警告会被丢掉，隐喻会被留下。所以给你自己写的规则文件提个醒——能被记住的只有一句话的那种，才真的会被执行。',
        en: 'Waterfall came from a misreading; design patterns (23 of them, half a million English copies, 13 languages) came from a naming. Industry memory drops warnings and keeps metaphors. Same rule applies to your instruction files: only the one-line version of a rule actually gets followed.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '2001 年敏捷宣言把焦点从流程拉回人（第一条价值观：个体和互动高于流程和工具），同期 Kent Beck 推广 TDD 与持续集成——从这一刻起，人开始系统化地和自动化工具协作，自动化测试成了「第二双眼睛」。**验证机制**这个概念请记住，它在后面几章会反复出现，也是今天 Harness 反馈层的祖先。',
        en: 'The 2001 Agile manifesto moved focus from process to people ("individuals and interactions over processes and tools"), and Kent Beck pushed TDD and continuous integration in the same period. From then on humans collaborated systematically with automated tooling; tests became the second pair of eyes. Remember the phrase **verification mechanism**—it is the ancestor of today’s feedback layer and shows up in almost every later chapter.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '2009–2014 是 DevOps 时代。Docker 1.0 发布时下载量已达 275 万次，一年后突破 1 亿；Google 开源 Kubernetes 的动机是「需要一种每周运行数十亿个容器的方式」。但真正的转折来自 Terraform（对，就是 Mitchell Hashimoto 做的）、Ansible、Helm 所代表的那句口号：基础设施即代码。**人开始描述期望状态，而不是手动执行步骤。**这句话已经预告了 AI 编程的根本模式。',
        en: '2009–2014 belonged to DevOps. Docker 1.0 shipped at 2.75m downloads and passed 100m within a year; Google open-sourced Kubernetes because it needed "a way to run billions of containers a week". The real turn, though, was the idea carried by Terraform (yes, Mitchell Hashimoto again), Ansible and Helm: infrastructure as code. **Humans started describing desired state instead of executing steps.** That sentence already previews how agentic coding works.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '2021 年 6 月 GitHub 发布 Copilot 技术预览（基于 OpenAI Codex，比 ChatGPT 还早），交互只有一件事：你写一行，AI 猜下一行——人是方向盘，AI 是油门助力。2024 年 3 月 Cognition Labs 的 Devin 自称第一个完全自主的软件工程师，在 SWE-Bench 上无辅助解出 13.86%，而此前最佳成绩只有 1.96%：数字不大，意义是 AI 第一次从头到尾跑完规划、编写、测试、提 PR。同年 Cursor 崛起，四个 MIT 毕业生做了一个不是插件而是 IDE 本身的东西，16 个月吸引超 100 万用户、ARR 破 1 亿美元，据报道没花一分钱营销。',
        en: 'GitHub Copilot’s June 2021 preview (built on OpenAI Codex, before ChatGPT) did one thing: you typed a line, it guessed the next—human on the steering wheel, AI on throttle assist. In March 2024 Cognition Labs’ Devin claimed to be the first fully autonomous software engineer and solved 13.86% of SWE-Bench unassisted where the prior best was 1.96%. Small numbers, huge meaning: the first end-to-end plan-code-test-PR loop without line-by-line guidance. That same year Cursor—four MIT grads building an IDE rather than a plugin—reached over 1m users and $100m ARR in sixteen months, reportedly with zero marketing spend.',
      },
    },
    {
      type: 'p',
      text: {
        zh: '2025 年 2 月两件事几乎同时发生：Anthropic 发布终端原生的 Claude Code，它不弹补全而是直接进代码库读文件、改代码、跑测试、提交，不到两个月日活破 35 万、年底年化收入破 10 亿美元；同月 Andrej Karpathy 造出 vibe coding：完全沉浸在感觉里，拥抱指数增长，忘记代码的存在。到 2025 年底，使用最新大模型的编程智能体在 SWE-Bench 上常规完成超过 80% 的任务，约 85% 的开发者定期使用 AI 编程工具。2026 年 2 月，OpenAI 公布零行手写代码产出百万行产品，并给这种工作方式命名为 Harness Engineering。',
        en: 'February 2025 delivered two events almost simultaneously: Anthropic shipped terminal-native Claude Code—not autocomplete but an agent that enters your repo, reads, edits, tests and commits, reaching 350k daily actives inside two months and $1b annualised revenue by year end; and Andrej Karpathy coined vibe coding: give in to the feel, embrace the exponential, forget the code exists. By late 2025 coding agents on frontier models routinely completed more than 80% of SWE-Bench tasks and roughly 85% of developers used AI tooling regularly. In February 2026 OpenAI published a million-line product with zero handwritten lines and named the practice Harness Engineering.',
      },
    },
    { type: 'sources', items: [SRC.orangeBook, SRC.openaiHarness, SRC.anthropicClaudeCode] },

    { type: 'h2', id: 'table', text: { zh: '六十年对照表', en: 'Sixty years, side by side' } },
    {
      type: 'table',
      head: [
        { zh: '时代', en: 'Era' },
        { zh: '人做什么', en: 'What humans do' },
        { zh: '工具做什么', en: 'What tools do' },
        { zh: '核心技能', en: 'Core skill' },
      ],
      rows: [
        [{ zh: '1960s–1990s', en: '1960s–1990s' }, { zh: '手工编码', en: 'Hand-code everything' }, { zh: '编译、运行', en: 'Compile and run' }, { zh: '语言精通', en: 'Language mastery' }],
        [{ zh: '2001–2010', en: '2001–2010' }, { zh: '写代码 + 设计流程', en: 'Code and design the process' }, { zh: '自动化测试、CI', en: 'Automated tests, CI' }, { zh: '协作 + 测试设计', en: 'Collaboration, test design' }],
        [{ zh: '2010–2020', en: '2010–2020' }, { zh: '描述期望状态', en: 'Declare desired state' }, { zh: '自动部署、监控', en: 'Deploy and observe' }, { zh: '系统 + 基础设施设计', en: 'Systems and infra design' }],
        [{ zh: '2021–2023', en: '2021–2023' }, { zh: '写代码 + 验收', en: 'Code and accept suggestions' }, { zh: '补全、建议', en: 'Complete and suggest' }, { zh: '提示词能力', en: 'Prompting' }],
        [{ zh: '2024–2025', en: '2024–2025' }, { zh: '描述意图 + 审查结果', en: 'State intent, review output' }, { zh: '自主编写、测试、迭代', en: 'Autonomously code, test, iterate' }, { zh: '上下文设计 + 审查', en: 'Context design, review' }],
        [{ zh: '2026—', en: '2026—' }, { zh: '设计环境 + 定义约束', en: 'Design the environment, define constraints' }, { zh: '在环境中自主运作', en: 'Operate inside that environment' }, { zh: '架构 + 缰绳设计', en: 'Architecture and harness design' }],
      ],
      caption: {
        zh: '每一步，人都在从「执行」向「设计」后退一层——而且是主动后退：Kent Beck 发明 TDD 不是因为不会写代码，是因为先写测试确实质量更好。',
        en: 'Each step is humans retreating from execution toward design—and retreating on purpose: Beck invented TDD not because he could not code, but because tests-first genuinely produced better code.',
      },
    },

    { type: 'h2', id: 'three-namings', text: { zh: '三次命名：同一件事的三次觉醒', en: 'Three namings, three awakenings' } },
    {
      type: 'p',
      text: {
        zh: '从 Prompt 到 Context 到 Harness，不是三个竞争概念，而是同一群人三次意识到「原来重点不在这里」。用马具的比喻一路读下来最省力。',
        en: 'Prompt, context, harness are not rival concepts but the same community noticing three times that the leverage is elsewhere. The tack metaphor makes the sequence effortless.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '维度', en: 'Dimension' },
        { zh: 'Prompt Engineering', en: 'Prompt Engineering' },
        { zh: 'Context Engineering', en: 'Context Engineering' },
        { zh: 'Harness Engineering', en: 'Harness Engineering' },
      ],
      rows: [
        [{ zh: '时期', en: 'Period' }, { zh: '2022–2024', en: '2022–2024' }, { zh: '2025', en: '2025' }, { zh: '2026', en: '2026' }],
        [
          { zh: '核心问题', en: 'Core question' },
          { zh: '怎么问', en: 'How to ask' },
          { zh: '给什么信息', en: 'What to show' },
          { zh: '整个系统怎么运转', en: 'How the whole system runs' },
        ],
        [
          { zh: '马具比喻', en: 'Tack metaphor' },
          { zh: '你对马说的话：向左转、跑快点', en: 'What you say to the horse' },
          { zh: '帮马看路的一切：地图、路标、地形', en: 'Everything that helps it see the road' },
          { zh: '缰绳 + 马鞍 + 围栏 + 道路本身', en: 'The reins, saddle, fence and the road itself' },
        ],
        [{ zh: '人的角色', en: 'Human role' }, { zh: '提问者', en: 'Questioner' }, { zh: '策展人', en: 'Curator' }, { zh: '架构师', en: 'Architect' }],
        [
          { zh: '可复用性', en: 'Reusability' },
          { zh: '低：换个场景重写', en: 'Low: rewritten per scenario' },
          { zh: '中：可以模板化', en: 'Medium: templatise' },
          { zh: '高：可以系统化', en: 'High: systematise' },
        ],
        [
          { zh: '主要命名者', en: 'Named by' },
          { zh: '社区自发', en: 'The community' },
          { zh: 'Tobi Lutke / Karpathy', en: 'Tobi Lutke / Karpathy' },
          { zh: 'Mitchell Hashimoto / OpenAI', en: 'Mitchell Hashimoto / OpenAI' },
        ],
      ],
    },
    {
      type: 'quote',
      text: {
        zh: 'Context engineering 是为任务提供所有上下文、使其对 LLM 来说合理可解的艺术。',
        en: 'Context engineering is the art of providing all context for a task such that it is reasonable for an LLM to solve.',
      },
      cite: { zh: 'Tobi Lutke，2025 年 6 月 18 日；一周后 Karpathy 补充：严肃的 LLM 应用里真正的工作是动态构建上下文窗口', en: 'Tobi Lutke, 18 June 2025; a week later Karpathy added that the real work in serious LLM apps is dynamically assembling the context window' },
    },
    {
      type: 'p',
      text: {
        zh: 'Context Engineering 的边界也很清楚：它解决了「给 AI 看什么」，没解决「AI 在什么环境里运行」。你可以给模型完美的上下文，但如果没有工具去执行、没有约束去遵守、没有反馈回路来自我修正，上下文只是一堆漂亮的参考资料。这就是第三次命名出现的原因。',
        en: 'The ceiling was equally clear: context engineering answers "what should the model see", not "what does it run inside". You can hand a model perfect context and still have no tools to act, no constraints to obey, no loop to correct itself—at which point context is just pretty reference material. Hence the third naming.',
      },
    },
    {
      type: 'callout',
      tone: 'quote',
      title: { zh: '一个公式', en: 'One formula' },
      text: {
        zh: 'LangChain 的表述是 Agent = Model + Harness：裸模型在被赋予状态、工具执行、反馈循环和可执行约束之后才成为 agent。模型是引擎，harness 是车身、方向盘、刹车和仪表盘——引擎一样的两辆车，开起来天差地别。他们自己的数据就是证明：模型没换，只改 harness，基准成绩从 Top 30 跳到 Top 5（第 13 章完整拆解）。',
        en: 'LangChain puts it as Agent = Model + Harness: a bare model becomes an agent once it is given state, tool execution, feedback loops and enforceable constraints. The model is the engine; the harness is the chassis, steering, brakes and dashboard—same engine, two utterly different cars. Their own data proves it: model unchanged, harness tuned, benchmark rank from Top 30 to Top 5 (chapter 13 unpacks the numbers).',
      },
    },

    { type: 'h2', id: 'still-naming', text: { zh: '命名还在继续，但洞察没变', en: 'Naming continues, insight unchanged' } },
    {
      type: 'list',
      items: [
        {
          zh: '2025 年底 Karpathy 决定不再手写代码，用自己的 AutoResearch 项目验证：630 行训练代码 + 一个 markdown 提示词文件，2 天跑 700 次实验、发现 20 个优化项——整个研究流程的 harness 就是一个 markdown 文件。他把这套做法叫 Agentic Engineering。',
          en: 'Karpathy stopped hand-writing code in late 2025 and proved it on his AutoResearch project: 630 lines of training code plus one markdown prompt file, 700 experiments in two days, 20 optimisations found. The harness for an entire research loop was a single markdown file. He calls it Agentic Engineering.',
        },
        {
          zh: '上下文侧出现了同行评审的硬数据：一项跑了 9,649 次实验的研究结论很直接——系统化地管理上下文，比精心打磨一条提示词管用得多。',
          en: 'On the context side, peer-reviewed hard data arrived: a study running 9,649 experiments concluded bluntly that systematically managing context beats polishing a single prompt.',
        },
        {
          zh: '2026 年 2 月 5 日 Hashimoto 发布《My AI Adoption Journey》，六天后 OpenAI 用同一个词发正式博文，Martin Fowler 团队跟进分析，LangChain 出技术拆解——一个月内从个人博客术语变成行业共识。',
          en: 'Hashimoto published My AI Adoption Journey on 5 February 2026; six days later OpenAI used the same term in an official post, then Fowler analysed it and LangChain dissected it. One month from personal blog to industry consensus.',
        },
      ],
    },
    {
      type: 'p',
      text: {
        zh: '值得注意的还有 Hashimoto 开篇那句声明：「This blog post was fully written by hand, in my own words. I hate that I have to say that.」在一篇讨论 AI 的文章里必须强调自己手写——这本身就是 2026 年行业氛围的注脚，也是为什么「谁来验收 AI 的产出」会变成一个严肃的工程问题（第 11 章）。',
        en: 'Note his opening line: "This blog post was fully written by hand, in my own words. I hate that I have to say that." Having to declare manual authorship in a post about AI is itself a footnote on the 2026 mood—and exactly why "who signs off on AI output" became a serious engineering question (chapter 11).',
      },
    },

    { type: 'h2', id: 'takeaways', text: { zh: '从历史能带走的三条判断', en: 'Three predictions the history buys you' } },
    {
      type: 'cards',
      items: [
        {
          icon: 'repeat',
          title: { zh: '新词会持续出现，别追词', en: 'More words will keep coming' },
          text: {
            zh: 'Agentic Engineering、经验工程、缰绳工程……命名在扩大视野，但瓶颈位置没变：不在模型，在模型运行的环境。押注环境设计的人不会白学。',
            en: 'Agentic engineering, experience engineering, harness engineering—the names keep widening, but the bottleneck stays put: not the model, the environment around it. Betting on environment design keeps paying.',
          },
        },
        {
          icon: 'layers',
          title: { zh: '被包含不等于被淘汰', en: 'Contained is not obsolete' },
          text: {
            zh: 'Prompt 被 Context 包含，Context 被 Harness 包含。写提示词的能力今天仍然有用，只是不再是全部。你的老技能是新房子的楼层，不是废墟。',
            en: 'Prompt sits inside context, context inside harness. Prompting still matters—just not alone. Old skills became floors of the new building, not rubble.',
          },
        },
        {
          icon: 'route',
          title: { zh: '后退是主动的', en: 'Retreat is a choice' },
          text: {
            zh: '每次后退一层都换来更高产出。所以判断自己该往哪退，标准只有一个：我现在做的事，是明年会被自动化掉的那层吗？',
            en: 'Every retreat bought more output. So the only test for your next move is: is what I am doing today the layer that gets automated next year?',
          },
        },
      ],
    },

    {
      type: 'siblings',
      title: { zh: '继续深挖', en: 'Keep digging' },
      items: ['agent-loop-engineering', 'better-agent', 'agent-observability-patterns'],
    },
  ],
  sources: [SRC.orangeBook, SRC.openaiHarness, SRC.mitchell, SRC.langchainMiddleware, SRC.fowler, SRC.anthropicClaudeCode],
};

export default ch02;

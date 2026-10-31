import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch08: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '一匹马跑得快，十匹马得同向。编排层管的不是「怎么让 AI 更聪明」，而是「怎么让多个 AI 同时干活而不互相踩死」。这一层最容易被过度设计，也最容易暴露一个事实：多数人根本还不需要它。',
        en: 'One horse can sprint; ten horses need to run the same direction. The orchestration layer is not about making AI smarter—it is about letting several agents work at once without trampling each other. It is the easiest layer to over-engineer, and the fastest way to learn that most people do not need it yet.',
      },
    },

    { type: 'h2', id: 'why', text: { zh: '为什么单个 agent 会不够用', en: 'Why one agent stops being enough' } },
    {
      type: 'p',
      text: {
        zh: '编排不是炫技，它是被三条硬约束逼出来的：**上下文窗口有限**——一个会话装不下整个大项目的全部信息；**任务可切分**——搜索、写码、审查本质是不同工作，各有更合适的工具与权限；**并行有收益**——互相独立子任务同时跑，能把墙钟时间压下来。满足这三条之前，多智能体只是给自己增加协调成本。',
        en: 'Orchestration is not a party trick; it is forced out by three hard limits: **the context window is finite**—one session cannot hold a whole large project; **tasks divide**—searching, coding and reviewing are different jobs wanting different tools and permissions; **parallelism pays**—independent subtasks running at once cut wall-clock time. Until all three hold, multi-agent only adds coordination overhead.',
      },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '一个反直觉的排序', en: 'A counter-intuitive ordering' },
      text: {
        zh: '先把单 agent 跑稳，再谈编排。工具、上下文、反馈三层都到位之前上多智能体框架，等于让三个还没学会走的人一起跑接力——每一个都在摔倒，还互相绊。本章开头说的「为多智能体而多智能体」陷阱，几乎都源于跳过了这一步。',
        en: 'Stabilise one agent before orchestrating many. Wiring up a multi-agent framework before tools, context and feedback are solid is like running a relay with three people who have not learned to walk—everyone falls, and they trip each other. The "multi-agent for its own sake" trap almost always starts by skipping this step.',
      },
    },

    { type: 'h2', id: 'patterns', text: { zh: '四种编排模式与它们的边界', en: 'Four orchestration patterns and their limits' } },
    {
      type: 'chart',
      chart: 'orchestration',
      title: { zh: '编排模式光谱：从人肉调度到自治网络', en: 'The orchestration spectrum: from manual dispatch to autonomous mesh' },
      note: {
        zh: '从左到右，自动化程度上升、可控性下降、协调成本上升。生产环境里，绝大多数团队停在前两到三种。',
        en: 'Left to right: automation rises, controllability falls, coordination cost climbs. Most production teams settle on the first two or three.',
      },
    },
    {
      type: 'table',
      head: [
        { zh: '模式', en: 'Pattern' },
        { zh: '怎么工作', en: 'How it works' },
        { zh: '优点', en: 'Strength' },
        { zh: '代价 / 边界', en: 'Cost / limit' },
      ],
      rows: [
        [
          { zh: '**人工编排** manual', en: '**Manual**' },
          { zh: '人同时开多个会话，手动搬上下文、分任务、巡视纠偏。Boris 的多会话工作法本质就是它。', en: 'A person runs several sessions and hand-carries context, dispatches tasks, patrols and corrects. Boris’s multi-session style is exactly this.' },
          { zh: '零基础设施成本、完全可控。', en: 'Zero infra cost, fully controllable.' },
          { zh: '人的注意力是唯一瓶颈，上下文靠人肉搬运易丢失。', en: 'Human attention is the bottleneck; context ferried by hand gets lost.' },
        ],
        [
          { zh: '**流水线** pipeline', en: '**Pipeline**' },
          { zh: '任务按固定顺序经过多个 agent，每段做完交给下一段。Planner → Generator → Evaluator 是最经典三段。', en: 'The task flows through agents in a fixed order; each hands its output downstream. Planner → Generator → Evaluator is the canonical three.' },
          { zh: '环节职责单一，易测试、易观测。', en: 'Each stage has one job—easy to test and observe.' },
          { zh: '缺乏灵活性，一个环节的错误顺流放大。', en: 'Rigid; one stage’s error amplifies downstream.' },
        ],
        [
          { zh: '**分层协作** hierarchical', en: '**Hierarchical**' },
          { zh: '一个 orchestrator 分解任务、分派给若干 worker、汇总结果。Claude Code 的 Subagents、Cursor 的后台 agent 都是它。', en: 'One orchestrator decomposes, dispatches to workers, aggregates. Claude Code Subagents and Cursor background agents work this way.' },
          { zh: '主控统一调度，worker 上下文彼此隔离。', en: 'Central scheduling; worker contexts stay isolated.' },
          { zh: 'orchestrator 是单点，分解质量决定整体质量。', en: 'The orchestrator is a single point; its decomposition quality caps the whole run.' },
        ],
        [
          { zh: '**对等通信** peer-to-peer', en: '**Peer-to-peer**' },
          { zh: 'agent 之间直接对话，无中心调度。', en: 'Agents talk to each other directly, no central scheduler.' },
          { zh: '理论上最灵活。', en: 'Theoretically the most flexible.' },
          { zh: '通信成本随节点数平方增长，易生循环依赖与无限讨论，生产极少纯用。', en: 'Comms cost grows with the square of nodes; cyclic deps and endless debate—rarely used pure in production.' },
        ],
      ],
      caption: {
        zh: '来源：Anthropic 多智能体研究与 Claude Code Subagents 设计、Boris Cherny 公开工作法、Stripe Minions 流水线。',
        en: 'Sources: Anthropic’s multi-agent research and Subagents design, Boris Cherny’s published workflow, the Stripe Minions pipeline.',
      },
    },

    { type: 'h2', id: 'boris', text: { zh: 'Boris 的并发工作法：人当编排器', en: 'Boris’s concurrency: the human as orchestrator' } },
    {
      type: 'p',
      text: {
        zh: 'Boris Cherny 展示过他的实际界面：一个人同时开十几个 Claude Code 会话，每个跑独立任务、互不干扰。做法拆开看是三件事——**给每个任务一个独立 git worktree**，物理隔离代码与上下文，避免多个 agent 改同一份文件互相踩踏；**给每个会话一份聚焦的指令**，而不是一个万能 prompt；**人作为编排器**在各会话之间巡视、判断、纠偏。',
        en: 'Boris Cherny has shown his actual setup: one person running a dozen-plus Claude Code sessions at once, each on an independent task, none interfering. Break it down and it is three moves—**give every task its own git worktree** to physically isolate code and context so agents never trample the same files; **give each session a focused brief** instead of one do-everything prompt; **act as the orchestrator yourself**, patrolling between sessions to judge and correct.',
      },
    },
    {
      type: 'code',
      lang: 'bash',
      title: { zh: '用 git worktree 给每个并发会话一个隔离边界', en: 'Give each concurrent session an isolated boundary with git worktree' },
      code: `# 同一个仓库，开多个物理隔离的工作目录，每个跑一个独立任务
# 好处：多个 agent 各自改代码，永远不会互相覆盖同一条分支
git worktree add ../task-auth   -b feat/auth    # 会话 A：做登录
git worktree add ../task-search  -b feat/search # 会话 B：做搜索
git worktree add ../task-cleanup -b chore/clean # 会话 C：还技术债

# 每个目录里各开一个 Claude 会话，指令聚焦到「只改这一块」
# 人做的事：在三个终端之间巡视，谁的跑偏了就纠偏，做完的各自提 PR
`,
    },
    {
      type: 'p',
      text: {
        zh: '它的本质是**人工编排 + 分层协作的混合**：人做 orchestrator，git worktree 做隔离边界。上限就是人的注意力带宽——Boris 能跑十几个，多数人三五个就到极限。这不是缺陷，是设计前提：当你发现自己在来回复制上下文时，就该考虑把它交给流水线或 orchestrator 了。',
        en: 'At heart it is **manual plus hierarchical orchestration**: the person is the orchestrator, git worktree is the isolation boundary. The ceiling is human attention—Boris handles a dozen, most people top out at three or five. That is not a flaw but a design premise: the moment you notice yourself copy-pasting context between panes, it is time to hand the job to a pipeline or an orchestrator.',
      },
    },

    { type: 'h2', id: 'stripe', text: { zh: 'Stripe 的全流水线：用确定性包裹不确定性', en: 'Stripe’s full pipeline: wrapping uncertainty in determinism' } },
    {
      type: 'p',
      text: {
        zh: 'Stripe 把编排做到了企业级规模：**每周约 1300 个 AI 生成的 PR**（第 12 章详解）。一条 Slack 消息触发，依次经过 devbox 环境准备、Goose 编排、代码生成、自动测试、review、CI、合并、部署。关键设计是——每个阶段是一个**确定性节点**，agent 只在节点内部发挥。这就是流水线模式加沙箱隔离的极致：用工程的确定性把 AI 的不确定性包裹起来，让它跑得快但跑不飞。',
        en: 'Stripe took orchestration to enterprise scale: **around 1,300 AI-authored PRs merged a week** (chapter 12 goes deep). One Slack message fires the run, which passes through devbox provisioning, Goose orchestration, code generation, automated testing, review, CI, merge and deploy. The core design: each stage is a **deterministic node**, and the agent only improvises inside a node. That is the pipeline pattern plus sandboxing taken to its extreme—engineering determinism wraps AI’s uncertainty so it runs fast without flying off track.',
      },
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '判断你需不需要流水线的提问', en: 'The question that tells you a pipeline is warranted' },
      text: {
        zh: '把编排想成「在哪些点上，你不信任 agent 的自由发挥，于是用固定流程接管」。答案越多，越该上流水线；答案越少，越该让单个 agent 用工具循环自己搞定。别为编排而编排——每多一个节点，就多一份要维护、要观测、会失败的基础设施。',
        en: 'Frame orchestration as "at which points do you distrust the agent’s improvisation enough to take over with a fixed flow". More answers, build a pipeline; fewer, let one agent loop on tools. Never orchestrate for its own sake—each extra node is more infrastructure to maintain, observe, and watch fail.',
      },
    },

    { type: 'h2', id: 'cost', text: { zh: '编排的隐藏成本：协调比能力更容易失败', en: 'The hidden cost: coordination fails more than capability' } },
    {
      type: 'stats',
      items: [
        {
          value: '>60%',
          label: { zh: '多 agent 失败源于协调问题', en: 'of multi-agent failures trace to coordination' },
          hint: { zh: '不是单个 agent 不够聪明，而是它们之间传丢了信息', en: 'not dumb agents—lost or deformed context between them' },
        },
        {
          value: 'n²',
          label: { zh: '对等通信成本随节点数增长', en: 'peer-to-peer comms cost grows with node count' },
          hint: { zh: '节点越多，传话传丢的概率越高', en: 'more nodes, more chances the message deforms in transit' },
        },
      ],
    },
    {
      type: 'p',
      text: {
        zh: 'Anthropic 的经验是：多 agent 系统里 **60% 以上的失败来自 agent 之间的协调问题，而非单个 agent 能力不足**。LangChain 的数据印证了同一件事——同一批任务交给单 agent 和多 agent 分别跑，多 agent 在复杂任务上确实更强，但在简单任务上反而更差，因为协调成本超过了分工收益。判断标准很朴素：**任务能不能被清晰切成互不依赖的几块？** 能，考虑并行；不能，别硬拆。一个 agent 用工具循环能解决的，不要拆成三个互相转发。',
        en: 'Anthropic’s finding: **over 60% of multi-agent failures come from coordination between agents, not from any single agent being weak**. LangChain’s data confirms it—running the same tasks with single and multi-agent setups, multi-agent wins on complex tasks but loses on simple ones, because coordination cost outweighs the split’s benefit. The test is plain: **can the task be cut into cleanly independent pieces?** If yes, consider parallelism; if not, do not force it. What one agent can solve on a tool loop should not be split into three relaying to each other.',
      },
    },
    {
      type: 'sources',
      items: [SRC.anthropicMultiAgent, SRC.anthropicBuilding, SRC.langchainBlog, SRC.orangeBook],
    },

    { type: 'h2', id: 'path', text: { zh: '从单 agent 到多 agent 的三阶段落地路径', en: 'The three-stage path from one agent to many' } },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '阶段一：把单 agent 跑稳', en: 'Stage 1 · make one agent reliable' },
          text: {
            zh: '工具、上下文、反馈三层都到位，单 agent 能在你的项目里独立完成任务并自检。这一步没做好就上编排，只是把「一个会犯错的东西」变成「三个会互相绊倒的东西」。',
            en: 'Tools, context and feedback are in place and one agent can finish and self-check tasks in your repo. Skip ahead and you have turned "one thing that makes mistakes" into "three things that trip each other".',
          },
        },
        {
          title: { zh: '阶段二：手动切分，验证边界', en: 'Stage 2 · split by hand, prove the seams' },
          text: {
            zh: '把单 agent 的任务切小，用会话和文件手动接力（就是 Boris 的 worktree 法），验证切分是否真的互不依赖、接力处信息是否传得全。',
            en: 'Cut the single agent’s task into pieces and relay them by hand across sessions and files (Boris’s worktree method). Verify the pieces really are independent and nothing important deforms at the handoff.',
          },
        },
        {
          title: { zh: '阶段三：引入自动化编排', en: 'Stage 3 · automate the orchestration' },
          text: {
            zh: '确认切分有效后，再用 orchestrator 或流水线把人从「接力」这件苦力里替换出来。此时你已经知道哪个节点需要确定性、哪里允许 agent 发挥——这些知识只能在阶段二亲手摔出来。',
            en: 'Once the split is proven, replace the human relay with an orchestrator or pipeline. By now you know which node needs determinism and where the agent may improvise—knowledge only earned by hand in stage two.',
          },
        },
      ],
    },

    {
      type: 'callout',
      tone: 'quote',
      title: { zh: '一句话记住编排层', en: 'The orchestration layer in one line' },
      text: {
        zh: '编排的目的是让每个 agent 的上下文更干净、职责更单一，而不是「多就是好」。当你说不清某个 agent 拿到的上下文为什么必须有、少了会怎样时，那个 agent 多半是多余的。',
        en: 'Orchestration exists to give each agent cleaner context and a single job—not because more is better. If you cannot say why a given agent’s context must be there and what breaks without it, that agent is probably surplus.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '编排的相邻专门展开', en: 'Neighbouring treatments of orchestration' },
      items: ['agent-loop-engineering', 'a2a-patterns', 'agent-observability-patterns', 'better-agent'],
    },
  ],
  sources: [SRC.anthropicMultiAgent, SRC.anthropicBuilding, SRC.anthropicClaudeCode, SRC.langchainBlog, SRC.stripeMinions, SRC.orangeBook],
};

export default ch08;

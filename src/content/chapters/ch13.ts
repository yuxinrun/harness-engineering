import type { ChapterContent } from '../../lib/types';
import { SRC } from '../../content/sources';

const ch13: ChapterContent = {
  blocks: [
    {
      type: 'lead',
      text: {
        zh: '模型固定不动，只改 harness，Terminal Bench 2.0 得分从 52.8% 涨到 66.5%，排名从 Top 30 跳到 Top 5。这可能是目前最硬的一组数据，直接证明：瓶颈不在马，在缰绳。',
        en: 'Model held fixed, harness only changed: Terminal Bench 2.0 score rose from 52.8% to 66.5%, and the ranking jumped from Top 30 to Top 5. This is likely the hardest dataset yet, and it proves the point directly—the bottleneck was never the horse, it was the harness.',
      },
    },

    { type: 'h2', id: 'data', text: { zh: '一组让人不好反驳的数据', en: 'Data that is hard to argue with' } },
    {
      type: 'table',
      head: [
        { zh: '指标', en: 'Metric' },
        { zh: '优化前', en: 'Before' },
        { zh: '优化后', en: 'After' },
        { zh: '变化', en: 'Change' },
      ],
      rows: [
        [
          { zh: 'Terminal Bench 2.0 得分', en: 'Terminal Bench 2.0 score' },
          { zh: '52.8%', en: '52.8%' },
          { zh: '66.5%', en: '66.5%' },
          { zh: '+13.7 个百分点', en: '+13.7 points' },
        ],
        [
          { zh: '排名', en: 'Ranking' },
          { zh: 'Top 30', en: 'Top 30' },
          { zh: 'Top 5', en: 'Top 5' },
          { zh: '上升 25 位', en: 'up 25 places' },
        ],
        [
          { zh: '**使用模型**', en: '**Model used**' },
          { zh: 'GPT-5.2-Codex', en: 'GPT-5.2-Codex' },
          { zh: 'GPT-5.2-Codex', en: 'GPT-5.2-Codex' },
          { zh: '**完全没换**', en: '**unchanged**' },
        ],
      ],
      caption: {
        zh: '第三行是重点：模型从头到尾就是同一个。他们只改了三样东西——系统提示词、工具配置、中间件钩子。同一匹马，换了套缰绳。',
        en: 'The third row is the point: the same model throughout. They changed exactly three things—system prompt, tool configuration and middleware hooks. Same horse, different reins.',
      },
    },
    {
      type: 'p',
      text: {
        zh: 'Terminal Bench 2.0 是标准化的编程智能体基准：89 个任务，跨机器学习、调试、生物学、安全、游戏等领域，有些接近 10 分钟执行、100 多次工具调用——不是写 Hello World 的玩具测试。LangChain 团队做了一个聪明的决定：**刻意压缩优化空间**。harness 可调的东西太多了（提示词、工具、hooks、middleware、skills、子 agent、记忆……全动就判断不了哪个起作用），所以他们只动三个变量。',
        en: 'Terminal Bench 2.0 is a standardised coding-agent benchmark: 89 tasks across ML, debugging, biology, security and games, some running ~10 minutes with 100+ tool calls—not a Hello-World toy. LangChain made a smart call: **deliberately narrow the search space.** A harness has too many knobs (prompts, tools, hooks, middleware, skills, sub-agents, memory…—move them all and you cannot tell which helped), so they touched exactly three variables.',
      },
    },
    { type: 'sources', items: [SRC.langchainBlog] },

    { type: 'h2', id: 'three', text: { zh: '三个优化变量', en: 'The three optimisation variables' } },
    {
      type: 'cards',
      items: [
        {
          icon: 'route',
          title: { zh: '变量 1 · System Prompt：四阶段工作流', en: 'Variable 1 · System Prompt: a four-stage loop' },
          text: {
            zh: '把泛泛指导改成强制框架：Planning & Discovery（读任务、扫代码库、建验证计划）→ Build（带着测试意识实现）→ Verify（跑测试、对照规格验证）→ Fix（分析错误、回到需求重审）。不再是「你是优秀助手」的空话，而是把思考的顺序约束住。',
            en: 'Vague guidance became a forced frame: Planning & Discovery (read the task, scan the repo, build a verification plan) → Build (implement with tests in mind) → Verify (run tests against the spec) → Fix (analyse errors, revisit the requirement). No more "you are an excellent assistant"—it constrains the *order* of thinking.',
          },
        },
        {
          icon: 'eye',
          title: { zh: '变量 2 · Tools：环境感知 + 完成检查', en: 'Variable 2 · Tools: environment awareness + completion check' },
          text: {
            zh: 'LocalContextMiddleware 启动时自动注入工作目录结构、可用工具、Python 版本等——解决「agent 花大量时间摸索自己在哪」。PreCompletionChecklistMiddleware 在 agent 想退出时拦截，强制对照规格验证，而不是「它觉得做完就真做完」。',
            en: 'LocalContextMiddleware injects the working-directory tree, available tools and Python version at startup—killing "the agent burning time figuring out where it is". PreCompletionChecklistMiddleware intercepts when the agent tries to exit and forces a check against the spec, instead of "it thinks it is done, so it stops".',
          },
        },
        {
          icon: 'repeat',
          title: { zh: '变量 3 · Middleware：防止死循环', en: 'Variable 3 · Middleware: break the doom loop' },
          text: {
            zh: 'LoopDetectionMiddleware 追踪单个文件的编辑次数，同一文件被编辑 N 次后注入提示「考虑换个方法」。它不禁止修改，只在重复达到阈值时温柔提醒——温柔干预，硬性触发。',
            en: 'LoopDetectionMiddleware counts edits per file and, after N edits to the same one, injects "consider a different approach". It never forbids editing—it nudges only once repetition crosses a threshold. Gentle intervention, hard trigger.',
          },
        },
      ],
    },
    {
      type: 'quote',
      text: {
        zh: '最常见的失败模式是：agent 写完方案，重新读自己的代码，觉得看起来没问题，就停了。',
        en: 'The most common failure pattern was that the agent wrote a solution, re-read its own code, confirmed it looks ok, and stopped.',
      },
      cite: { zh: 'LangChain 官方博客', en: 'LangChain blog' },
    },
    {
      type: 'callout',
      tone: 'note',
      title: { zh: '这不是 bug，是 LLM 的结构性偏差', en: 'Not a bug—a structural bias of LLMs' },
      text: {
        zh: '模型偏爱自己的第一个看似合理的方案。解法不是换更聪明的模型，是在 harness 层加一个物理拦截（PreCompletionChecklist）。同样，死循环（doom loop）——一旦锁定方向就反复做同一坏方法的微小变体——解法是 LoopDetection，而不是骂模型笨。**每一种失败模式都有对应的 harness 方案，而不是「换个更强的模型」。**',
        en: 'The model favours its own first plausible plan. The fix is not a smarter model but a physical gate in the harness (PreCompletionChecklist). Likewise the doom loop—once committed, it makes tiny variations of the same broken approach—is fixed by LoopDetection, not by blaming the model. **Every failure mode has a matching harness fix, not a "get a stronger model" answer.**',
      },
    },

    { type: 'h2', id: 'hooks', text: { zh: '6 个 middleware hook 点', en: 'Six middleware hook points' } },
    {
      type: 'table',
      head: [
        { zh: 'Hook 点', en: 'Hook' },
        { zh: '触发时机', en: 'When it fires' },
        { zh: '典型用途', en: 'Typical use' },
      ],
      rows: [
        [{ zh: 'before_agent', en: 'before_agent' }, { zh: '调用开始时执行一次', en: 'once at call start' }, { zh: '加载记忆、连接资源', en: 'load memory, connect resources' }],
        [{ zh: 'before_model', en: 'before_model' }, { zh: '每次模型调用前', en: 'before every model call' }, { zh: '历史裁剪、PII 过滤', en: 'trim history, filter PII' }],
        [{ zh: 'wrap_model_call', en: 'wrap_model_call' }, { zh: '包裹整个模型调用', en: 'wraps the whole call' }, { zh: '缓存、重试、动态工具可用性', en: 'cache, retry, dynamic tool availability' }],
        [{ zh: 'wrap_tool_call', en: 'wrap_tool_call' }, { zh: '包裹工具执行', en: 'wraps tool execution' }, { zh: '注入上下文、控制工具访问', en: 'inject context, gate tool access' }],
        [{ zh: 'after_model', en: 'after_model' }, { zh: '模型响应后', en: 'after the model responds' }, { zh: '人在回路（HITL）干预', en: 'human-in-the-loop intervention' }],
        [{ zh: 'after_agent', en: 'after_agent' }, { zh: '完成时执行一次', en: 'once on completion' }, { zh: '保存结果、清理资源', en: 'save results, release resources' }],
      ],
      caption: {
        zh: '内置还有 PIIMiddleware、SummarizationMiddleware（接近 token 上限时总结历史）、ModelRetryMiddleware（重试与退避）。Middleware 的价值在解耦：各团队管各的关注点，业务逻辑与 agent 核心代码分开、跨组织复用。',
        en: 'Built-ins include PIIMiddleware, SummarizationMiddleware (summarises history near the token ceiling) and ModelRetryMiddleware (retry with backoff). Middleware’s value is decoupling: teams own their concerns, business logic stays separate from the agent core and reuses across the org.',
      },
    },
    { type: 'sources', items: [SRC.langchainMiddleware] },

    { type: 'h2', id: 'sandwich', text: { zh: '推理三明治：全拉满反而更差', en: 'The reasoning sandwich: maxing out is worse' } },
    {
      type: 'p',
      text: {
        zh: '整个案例最反直觉的发现。全程 xhigh（最高推理力度）只得 53.9%，还大量超时——比全程 high 的 63.6% 还低近 10 个百分点。为什么？每个任务有时间限制，全程 xhigh 意味着每步都深度思考，很多任务没做完时间就到了。解法是**推理三明治（reasoning sandwich）**：开头 xhigh 做规划想清方向 → 中间 high 快速执行 → 结尾再拉回 xhigh 仔细验证，拿到 66.5%。',
        en: 'The most counter-intuitive finding in the whole case. Running xhigh (maximum reasoning) throughout scored only 53.9% with heavy timeouts—nearly 10 points *below* high-throughout at 63.6%. Why? Each task has a time limit, and xhigh-everywhere means deep thought at every step, so many tasks hit the clock unfinished. The fix is the **reasoning sandwich**: xhigh up front to plan and set direction → high in the middle to execute fast → xhigh again at the end to verify carefully, reaching 66.5%.',
      },
    },
    {
      type: 'chart',
      chart: 'failures',
      title: { zh: '推理配置 vs 得分：资源分配 > 资源总量', en: 'Reasoning config vs score: allocation beats sheer amount' },
      note: {
        zh: '全程 xhigh 53.9%（超时拖累）→ 全程 high 63.6% → 推理三明治（xhigh→high→xhigh）66.5%。结论不只适用于推理预算：不是每个环节都需要最深度思考，关键是正确的环节用正确的力度。',
        en: 'xhigh throughout 53.9% (timeout drag) → high throughout 63.6% → the sandwich 66.5%. The lesson generalises beyond reasoning budget: not every step needs maximal thought—the win is the right depth at the right step.',
      },
    },

    { type: 'h2', id: 'loop', text: { zh: '可复现的方法论：像 boosting 一样迭代', en: 'A reproducible method: iterate like boosting' } },
    {
      type: 'steps',
      items: [
        {
          title: { zh: '① 建立基线', en: '① Establish a baseline' },
          text: {
            zh: '默认提示词 + 标准工具，跑出 52.8% 的基线分数。有基线，后面的每一次改动才谈得上「有效/无效」。',
            en: 'Default prompt plus standard tools gives a 52.8% baseline. Only with a baseline can every later change be called effective or not.',
          },
        },
        {
          title: { zh: '② Trace 分析', en: '② Analyse traces' },
          text: {
            zh: '创建「Trace Analyzer Skill」自动从 LangSmith 拉实验数据，逐个分析失败案例的执行轨迹（trace）。不是盯着平均分猜，是看具体哪一步崩了。',
            en: 'A "Trace Analyzer Skill" pulls experiment data from LangSmith and analyses the execution trace of each failure. Not guessing at averages—looking at exactly which step broke.',
          },
        },
        {
          title: { zh: '③ 错误识别 + 定向修改', en: '③ Identify, then change surgically' },
          text: {
            zh: '生成并行 agent 分析失败案例，主 agent 综合发现，针对识别出的失败模式做特定 harness 调整（自我确认偏差→PreCompletionChecklist；死循环→LoopDetection；环境不熟→LocalContext；超时→推理三明治）。',
            en: 'Parallel agents dissect failures, the main agent synthesises, and specific harness changes target each failure mode (self-confirmation→PreCompletionChecklist; doom loop→LoopDetection; unknown environment→LocalContext; timeout→the sandwich).',
          },
        },
        {
          title: { zh: '④ 回归测试，然后回到 ②', en: '④ Regress, then return to ②' },
          text: {
            zh: '人工验证，防止对特定任务过拟合导致其它任务退步，然后回到步骤 ②。每轮改进都需人工确认——这不是全自动，人的判断力在防过拟合上不可或缺。',
            en: 'Human verification guards against overfitting one task at the cost of others, then loop back to step ②. Each round needs a human sign-off—it is not fully automated; judgment prevents overfitting.',
          },
        },
      ],
    },
    {
      type: 'callout',
      tone: 'tip',
      title: { zh: '这个案例真正的价值', en: 'What this case is actually worth' },
      text: {
        zh: '52.8% 到 66.5%，模型没换。过去我们以为的「模型不够好」，有相当一部分其实是「环境不够好」。你给程序员一台没装好工具的电脑，他也写不出好代码；配置完善、IDE 趁手、CI 顺畅，同一个人产出可能翻倍——AI 也一样。LangChain 最大的贡献不是分数，是给出了一套**可复现的方法论**：建基线、分析失败轨迹、定向修改、回归验证、循环。谁都能照着做，区别只是你愿不愿意去分析那些失败的轨迹。',
        en: '52.8% to 66.5% with no model change. Much of what we blamed on "the model is not good enough" was really "the environment is not good enough". Put a programmer on a machine with broken tooling and they cannot write good code either; give them a well-configured IDE and smooth CI and the same person can double output—AI is no different. LangChain’s biggest contribution is not the score but a **reproducible method**: baseline, analyse failure traces, change surgically, regress, repeat. Anyone can run it; the only difference is whether you are willing to actually read the failing traces.',
      },
    },

    {
      type: 'siblings',
      title: { zh: '同类 harness 优化实验', en: 'Kindred harness-optimisation experiments' },
      items: ['agent-evaluation-patterns', 'agent-observability-patterns', 'agent-loop-engineering', 'better-agent'],
    },
  ],
  sources: [SRC.langchainBlog, SRC.langchainMiddleware, SRC.anthropicContext, SRC.orangeBook],
};

export default ch13;

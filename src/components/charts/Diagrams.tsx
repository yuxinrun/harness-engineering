import { useMemo, useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '../../lib/theme';
import { useLang } from '../../lib/i18n';
import { Icon } from '../Icon';

export function useChartColors() {
  const { theme } = useTheme();
  return useMemo(
    () => ({
      brand: '#6366f1',
      brand2: '#a855f7',
      accent: '#f97316',
      green: '#10b981',
      grid: theme === 'dark' ? 'rgba(148,163,184,0.16)' : 'rgba(100,116,139,0.18)',
      text: theme === 'dark' ? '#9ca5bb' : '#5b6276',
      surface: theme === 'dark' ? '#111627' : '#ffffff',
      tooltipBg: theme === 'dark' ? '#171d32' : '#ffffff',
      tooltipBorder: theme === 'dark' ? '#2a3350' : '#e2e6f0',
    }),
    [theme],
  );
}

const layers = [
  {
    icon: 'workflow',
    num: '05',
    name: { zh: '编排层', en: 'Orchestration' },
    role: { zh: '让多个 Agent 协作', en: 'Coordinate multiple agents' },
    impl: 'Subagents · Agent Teams · Pipelines · Worktrees',
    color: '#a855f7',
    detail: {
      zh: '前四层解决单个 Agent 的可靠性；编排层解决「一个上下文装不下」的问题。Planner / Generator / Evaluator 流水线、写审分离、人肉多会话都属于这一层。任务不复杂就不要上。',
      en: 'The first four layers make one agent reliable; orchestration handles what does not fit in one context. Planner/generator/evaluator, writer/reviewer and human multi-session setups live here. Do not add it unless the task demands it.',
    },
    width: 62,
  },
  {
    icon: 'database',
    num: '04',
    name: { zh: '记忆层', en: 'Memory' },
    role: { zh: '让经验跨会话存活', en: 'Make lessons survive sessions' },
    impl: 'MEMORY.md · auto-memory · knowledge index · notes',
    color: '#0ea5e9',
    detail: {
      zh: '静态指令文件是最低级的记忆；auto-memory 记录观察；结构化笔记保存当前状态。知识库靠索引，不靠堆资料。目标是「下次不用重新解释」。',
      en: 'Static instructions are the lowest tier; auto-memory captures observations; structured notes preserve state. Knowledge bases need indexes, not piles. The goal: never explain the same thing twice.',
    },
    width: 70,
  },
  {
    icon: 'activity',
    num: '03',
    name: { zh: '反馈层', en: 'Feedback' },
    role: { zh: '检查 AI 做对没', en: 'Check whether it is actually right' },
    impl: 'Tests · independent evaluator · screenshots · traces',
    color: '#10b981',
    detail: {
      zh: 'AI 最大的问题不是写错，是以为自己写对了。反馈层给它另一双眼睛：跑测试、开浏览器、查日志、让独立评估者挑刺。没有反馈的自主，只是更快的失控。',
      en: 'The problem is rarely a wrong line; it is false confidence. Feedback gives the agent another pair of eyes: tests, browsers, logs and independent evaluators. Autonomy without feedback is just faster drift.',
    },
    width: 78,
  },
  {
    icon: 'shield-check',
    num: '02',
    name: { zh: '约束层', en: 'Constraints' },
    role: { zh: '拦住 AI 做错事', en: 'Stop the wrong action' },
    impl: 'Hooks · Linters · CI · Sandbox · Approvals',
    color: '#f97316',
    detail: {
      zh: '写在指令里的是建议，程序执行的才是约束。安全红线、生产配置、不可逆操作，必须用 Hook、CI 或沙箱拦住，而不是指望模型每次都记得。',
      en: 'Written rules are advice; program enforcement is constraint. Safety lines, production config and irreversible actions must be blocked by hooks, CI or sandboxes, not by memory.',
    },
    width: 86,
  },
  {
    icon: 'map',
    num: '01',
    name: { zh: '指令层', en: 'Instructions' },
    role: { zh: '告诉 AI 做什么', en: 'Tell the agent what to do' },
    impl: 'CLAUDE.md · AGENTS.md · .cursor/rules',
    color: '#4f46e5',
    detail: {
      zh: '项目地图，不是操作手册。放 AI 猜不到的信息：特殊命令、非标准约定、架构不变量、历史坑。能自己从代码里发现的，不要写。',
      en: 'A map, not a manual. Include what the agent cannot infer: special commands, non-standard conventions, invariants, past traps. Leave out anything visible in the code.',
    },
    width: 94,
  },
];

export function LayersChart() {
  const { lang } = useLang();
  const [active, setActive] = useState(2);
  const layer = layers[active];

  return (
    <div className="my-7">
      <div className="flex flex-col items-center gap-2">
        {layers.map((item, index) => (
          <button
            key={item.num}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={clsx(
              'group relative overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 sm:px-5',
              active === index
                ? 'border-transparent shadow-glow'
                : 'border-line bg-surface/70 hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-card',
            )}
            style={{
              width: `${item.width}%`,
              minWidth: 'min(100%, 280px)',
              background:
                active === index
                  ? `linear-gradient(100deg, ${item.color}22, ${item.color}0d), rgb(var(--c-surface))`
                  : undefined,
            }}
          >
            <span
              className="absolute inset-y-0 left-0 w-1 rounded-full"
              style={{ background: `linear-gradient(${item.color}, ${item.color}55)` }}
            />
            <div className="flex items-center gap-3 pl-2">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white shadow-sm"
                style={{ backgroundColor: item.color }}
              >
                <Icon name={item.icon} className="h-[1.1rem] w-[1.1rem]" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.65rem] text-faint">{item.num}</span>
                  <span className="text-sm font-semibold text-ink sm:text-[0.95rem]">
                    {lang === 'en' ? item.name.en : item.name.zh}
                  </span>
                </div>
                <div className="truncate text-xs text-muted">{lang === 'en' ? item.role.en : item.role.zh}</div>
              </div>
              <span className="hidden shrink-0 font-mono text-[0.62rem] text-faint md:block">{item.impl}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-line bg-soft/60 p-4">
        <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: layer.color }} />
          {lang === 'en' ? layer.name.en : layer.name.zh}
        </div>
        <p className="text-sm leading-relaxed text-muted">{lang === 'en' ? layer.detail.en : layer.detail.zh}</p>
      </div>
      <p className="mt-3 text-center text-[0.7rem] text-faint">
        {lang === 'en' ? 'Click a layer to inspect its responsibility' : '点击任意一层查看职责边界'}
      </p>
    </div>
  );
}

const eras = [
  {
    year: '1968',
    title: { zh: '软件危机', en: 'The software crisis' },
    human: { zh: '人是唯一创造者', en: 'Humans are the only creators' },
    tool: { zh: '打孔卡、编译器', en: 'Punch cards, compilers' },
    skill: { zh: '编程语言精通', en: 'Language mastery' },
  },
  {
    year: '1970',
    title: { zh: '瀑布模型被误读', en: 'Waterfall gets misread' },
    human: { zh: '按阶段交付', en: 'Deliver in phases' },
    tool: { zh: '流程与文档', en: 'Process and docs' },
    skill: { zh: '工程流程', en: 'Engineering process' },
  },
  {
    year: '2001',
    title: { zh: '敏捷与 TDD', en: 'Agile and TDD' },
    human: { zh: '写代码 + 设计验证', en: 'Code plus design verification' },
    tool: { zh: '自动化测试、CI', en: 'Automated tests, CI' },
    skill: { zh: '测试设计、协作', en: 'Test design, collaboration' },
  },
  {
    year: '2009–14',
    title: { zh: 'DevOps 与 IaC', en: 'DevOps and IaC' },
    human: { zh: '描述期望状态', en: 'Describe desired state' },
    tool: { zh: 'Docker、K8s、Terraform', en: 'Docker, K8s, Terraform' },
    skill: { zh: '系统思维', en: 'Systems thinking' },
  },
  {
    year: '2021',
    title: { zh: 'Copilot：AI 坐到旁边', en: 'Copilot sits beside you' },
    human: { zh: '写代码 + 验收补全', en: 'Code and accept completions' },
    tool: { zh: '代码补全', en: 'Code completion' },
    skill: { zh: '编程 + 提示词', en: 'Coding plus prompting' },
  },
  {
    year: '2024–25',
    title: { zh: 'Agent 时代', en: 'The agent era' },
    human: { zh: '描述意图 + 审查结果', en: 'Describe intent, review output' },
    tool: { zh: 'Claude Code、Codex、Cursor', en: 'Claude Code, Codex, Cursor' },
    skill: { zh: '上下文设计、审查', en: 'Context design, review' },
  },
  {
    year: '2026',
    title: { zh: 'Harness Engineering', en: 'Harness Engineering' },
    human: { zh: '设计环境 + 定义约束', en: 'Design environment, define constraints' },
    tool: { zh: 'Agent 在环境中自主运行', en: 'Agents run autonomously inside it' },
    skill: { zh: '系统架构 + Harness 设计', en: 'Architecture plus harness design' },
  },
];

export function TimelineChart() {
  const { lang } = useLang();
  return (
    <div className="my-7">
      <ol className="relative ml-3 border-l border-line pl-6 sm:ml-5 sm:pl-8">
        {eras.map((era, index) => (
          <li key={era.year} className="group relative pb-6 last:pb-0">
            <span className="absolute -left-[1.87rem] top-1 flex h-4 w-4 items-center justify-center sm:-left-[2.4rem]">
              <span
                className={clsx(
                  'h-2.5 w-2.5 rounded-full border-2 border-app transition-transform duration-300 group-hover:scale-150',
                  index === eras.length - 1 ? 'bg-accent' : 'bg-brand',
                )}
              />
              {index === eras.length - 1 && (
                <span className="absolute h-2.5 w-2.5 animate-pulseRing rounded-full bg-accent/50" />
              )}
            </span>
            <div className="rounded-xl border border-transparent px-3 py-2 transition-all duration-300 hover:border-line hover:bg-surface/70 sm:px-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-brand/10 px-2 py-0.5 font-mono text-[0.7rem] font-semibold text-brand">
                  {era.year}
                </span>
                <span className="text-sm font-semibold text-ink">{lang === 'en' ? era.title.en : era.title.zh}</span>
              </div>
              <div className="mt-1.5 grid gap-1 text-xs text-muted sm:grid-cols-3">
                <span>👤 {lang === 'en' ? era.human.en : era.human.zh}</span>
                <span>🧰 {lang === 'en' ? era.tool.en : era.tool.zh}</span>
                <span>🎯 {lang === 'en' ? era.skill.en : era.skill.zh}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-soft/70 px-4 py-3 text-xs text-muted">
        <span>{lang === 'en' ? 'Write code' : '写代码'}</span>
        <span className="text-brand">→</span>
        <span>{lang === 'en' ? 'Design tests' : '设计测试'}</span>
        <span className="text-brand">→</span>
        <span>{lang === 'en' ? 'Describe state' : '描述状态'}</span>
        <span className="text-brand">→</span>
        <span className="font-semibold text-ink">{lang === 'en' ? 'Design the environment' : '设计环境'}</span>
      </div>
    </div>
  );
}

const spectrum = [
  {
    icon: 'quote',
    name: { zh: '提示建议', en: 'Prompt advice' },
    nature: { zh: '一次性、口头', en: 'One-off, spoken' },
    enforce: { zh: '靠模型自觉', en: 'Model goodwill' },
    example: { zh: '「注意不要 push main」', en: '"Please do not push to main"' },
    color: '#94a3b8',
  },
  {
    icon: 'file-text',
    name: { zh: '规则文件', en: 'Rule file' },
    nature: { zh: '持久、建议性', en: 'Persistent, advisory' },
    enforce: { zh: '可能被忽略', en: 'Can be ignored' },
    example: { zh: 'CLAUDE.md / AGENTS.md', en: 'CLAUDE.md / AGENTS.md' },
    color: '#818cf8',
  },
  {
    icon: 'shield-check',
    name: { zh: 'Hooks', en: 'Hooks' },
    nature: { zh: '持久、确定', en: 'Persistent, deterministic' },
    enforce: { zh: '程序级拦截', en: 'Program-level block' },
    example: { zh: 'PreToolUse deny', en: 'PreToolUse deny' },
    color: '#6366f1',
  },
  {
    icon: 'test-tube',
    name: { zh: 'Linter', en: 'Linter' },
    nature: { zh: '静态分析', en: 'Static analysis' },
    enforce: { zh: '违规即失败', en: 'Violation fails' },
    example: { zh: '自定义 ESLint 规则', en: 'Custom ESLint rule' },
    color: '#7c3aed',
  },
  {
    icon: 'git-branch',
    name: { zh: 'CI 阻断', en: 'CI block' },
    nature: { zh: '合并门禁', en: 'Merge gate' },
    enforce: { zh: '合不进去', en: 'Cannot merge' },
    example: { zh: 'GitHub Actions required', en: 'Required checks' },
    color: '#a855f7',
  },
  {
    icon: 'lock',
    name: { zh: 'Sandbox', en: 'Sandbox' },
    nature: { zh: '物理隔离', en: 'Physical isolation' },
    enforce: { zh: '操作系统级', en: 'OS-level' },
    example: { zh: '只读工作区、断网', en: 'Read-only workspace, no network' },
    color: '#f97316',
  },
];

export function SpectrumChart() {
  const { lang } = useLang();
  const [active, setActive] = useState(2);
  const item = spectrum[active];

  return (
    <div className="my-7">
      <div className="mb-3 flex items-center justify-between text-[0.68rem] uppercase tracking-wider text-faint">
        <span>{lang === 'en' ? 'Soft' : '软'}</span>
        <span>{lang === 'en' ? 'Hard' : '硬'}</span>
      </div>
      <div className="relative mb-4 h-2 overflow-hidden rounded-full bg-line">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-400 via-brand to-accent" />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-app bg-white shadow-md transition-all duration-500 dark:bg-ink"
          style={{ left: `calc(${(active / (spectrum.length - 1)) * 100}% - 8px)` }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {spectrum.map((level, index) => (
          <button
            key={level.name.en}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={clsx(
              'group rounded-xl border p-2.5 text-left transition-all duration-300',
              active === index
                ? 'border-brand/50 bg-surface shadow-card'
                : 'border-line bg-surface/50 hover:-translate-y-0.5 hover:border-brand/30',
            )}
          >
            <span
              className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg text-white"
              style={{ backgroundColor: level.color }}
            >
              <Icon name={level.icon} className="h-3.5 w-3.5" />
            </span>
            <div className="text-[0.78rem] font-semibold text-ink">{lang === 'en' ? level.name.en : level.name.zh}</div>
            <div className="mt-0.5 text-[0.65rem] leading-snug text-faint">
              {lang === 'en' ? level.enforce.en : level.enforce.zh}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-line bg-soft/60 p-3.5 text-sm">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-semibold text-ink">{lang === 'en' ? item.name.en : item.name.zh}</span>
          <span className="text-xs text-muted">{lang === 'en' ? item.nature.en : item.nature.zh}</span>
          <span className="text-xs text-muted">{lang === 'en' ? item.enforce.en : item.enforce.zh}</span>
        </div>
        <code className="mt-1.5 block font-mono text-[0.72rem] text-brand">
          {lang === 'en' ? item.example.en : item.example.zh}
        </code>
      </div>
    </div>
  );
}

export function InclusionDiagram() {
  const { lang } = useLang();
  return (
    <div className="my-7 overflow-hidden rounded-2xl border border-line bg-surface/60 p-3 sm:p-5">
      <div className="rounded-2xl border-2 border-brand/35 bg-gradient-to-br from-brand/[0.09] via-brand2/[0.06] to-accent/[0.07] p-4 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-brand px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-white">
              HARNESS
            </span>
            <span className="text-sm font-semibold text-ink">{lang === 'en' ? 'The whole runtime' : '整个运行环境'}</span>
          </div>
          <span className="text-[0.68rem] text-faint">
            {lang === 'en' ? 'constraints · feedback · memory · orchestration' : '约束 · 反馈 · 记忆 · 编排'}
          </span>
        </div>

        <div className="rounded-xl border-2 border-brand2/35 bg-brand2/[0.07] p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-brand2 px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-white">
                CONTEXT
              </span>
              <span className="text-sm font-semibold text-ink">{lang === 'en' ? 'What the model sees' : '模型看到的信息'}</span>
            </div>
            <span className="text-[0.68rem] text-faint">
              {lang === 'en' ? 'rules · docs · tools · history' : '规则 · 文档 · 工具 · 历史'}
            </span>
          </div>

          <div className="rounded-lg border border-accent/40 bg-accent/[0.08] p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-accent px-2 py-0.5 font-mono text-[0.65rem] font-semibold text-white">
                  PROMPT
                </span>
                <span className="text-sm font-semibold text-ink">{lang === 'en' ? 'The task right now' : '此刻的任务'}</span>
              </div>
              <span className="text-[0.68rem] text-faint">⊂ ⊂</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {[
            lang === 'en' ? 'Hooks' : 'Hooks',
            lang === 'en' ? 'Sandbox' : '沙箱',
            lang === 'en' ? 'Evaluator' : '独立评估',
            lang === 'en' ? 'Memory' : '记忆',
            lang === 'en' ? 'Orchestration' : '编排',
            lang === 'en' ? 'CI gates' : 'CI 门禁',
          ].map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-line bg-surface/80 px-2 py-0.5 text-[0.66rem] text-muted"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[0.7rem] text-faint">
        {lang === 'en' ? 'Prompt ⊂ Context ⊂ Harness' : 'Prompt ⊂ Context ⊂ Harness（层层包含，不是平行概念）'}
      </p>
    </div>
  );
}

export function OrchestrationFlow() {
  const { lang } = useLang();
  const [hover, setHover] = useState<string | null>(null);
  const nodes = [
    {
      id: 'planner',
      x: 70,
      title: { zh: '规划者', en: 'Planner' },
      sub: { zh: '1–4 句 → 产品规格', en: 'Brief → product spec' },
      color: '#4f46e5',
    },
    {
      id: 'generator',
      x: 340,
      title: { zh: '生成者', en: 'Generator' },
      sub: { zh: '按冲刺增量实现', en: 'Build sprint by sprint' },
      color: '#7c3aed',
    },
    {
      id: 'evaluator',
      x: 610,
      title: { zh: '评估者', en: 'Evaluator' },
      sub: { zh: 'Playwright 端到端验收', en: 'Playwright end-to-end' },
      color: '#f97316',
    },
  ];

  return (
    <div className="my-7 overflow-x-auto rounded-2xl border border-line bg-surface/50 p-3">
      <svg viewBox="0 0 840 300" className="h-auto w-full min-w-[680px]" role="img" aria-label="Planner Generator Evaluator orchestration flow">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--c-brand))" opacity="0.8" />
          </marker>
          <marker id="arrowAccent" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgb(var(--c-accent))" opacity="0.9" />
          </marker>
          <linearGradient id="flowPlan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#4f46e5" stopOpacity="0.15" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        <rect x="20" y="24" width="800" height="252" rx="18" fill="url(#flowPlan)" stroke="rgb(var(--c-line))" />
        <text x="44" y="52" fill="rgb(var(--c-faint))" fontSize="11" fontFamily="monospace" letterSpacing="1.5">
          {lang === 'en' ? '3-AGENT PIPELINE' : '三智能体流水线'}
        </text>

        {nodes.map((node) => (
          <g
            key={node.id}
            onMouseEnter={() => setHover(node.id)}
            onMouseLeave={() => setHover(null)}
            className="cursor-default"
          >
            <rect
              x={node.x}
              y="80"
              width="170"
              height="102"
              rx="14"
              fill="rgb(var(--c-surface))"
              stroke={hover === node.id ? node.color : 'rgb(var(--c-line))'}
              strokeWidth={hover === node.id ? 2 : 1}
              style={{ transition: 'all .25s ease' }}
            />
            <circle cx={node.x + 22} cy="104" r="7" fill={node.color} />
            <text x={node.x + 38} y="108" fill="rgb(var(--c-ink))" fontSize="15" fontWeight="650">
              {lang === 'en' ? node.title.en : node.title.zh}
            </text>
            <text x={node.x + 18} y="138" fill="rgb(var(--c-muted))" fontSize="11">
              {lang === 'en' ? node.sub.en : node.sub.zh}
            </text>
            <rect x={node.x + 18} y="152" width="134" height="16" rx="8" fill="rgb(var(--c-bg-soft))" />
            <text x={node.x + 85} y="164" textAnchor="middle" fill="rgb(var(--c-faint))" fontSize="9" fontFamily="monospace">
              {node.id === 'planner' ? 'plan.md' : node.id === 'generator' ? 'feature diff' : 'test report'}
            </text>
          </g>
        ))}

        {/* plan → generator */}
        <line x1="240" y1="131" x2="336" y2="131" stroke="rgb(var(--c-brand))" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow)" opacity="0.85" />
        <text x="288" y="122" textAnchor="middle" fill="rgb(var(--c-faint))" fontSize="9" fontFamily="monospace">
          spec
        </text>

        {/* generator → evaluator */}
        <line x1="510" y1="131" x2="606" y2="131" stroke="rgb(var(--c-brand))" strokeWidth="1.5" strokeDasharray="5 4" markerEnd="url(#arrow)" opacity="0.85" />
        <text x="558" y="122" textAnchor="middle" fill="rgb(var(--c-faint))" fontSize="9" fontFamily="monospace">
          build
        </text>

        {/* evaluator feedback loop */}
        <path
          d="M695 186 C695 236 425 246 425 236 C425 226 425 220 425 190"
          fill="none"
          stroke="rgb(var(--c-accent))"
          strokeWidth="1.8"
          strokeDasharray="6 5"
          markerEnd="url(#arrowAccent)"
          className="animate-dash"
        />
        <text x="560" y="260" textAnchor="middle" fill="rgb(var(--c-accent))" fontSize="10" fontFamily="monospace">
          {lang === 'en' ? 'bugs & feedback loop' : 'Bug 与反馈回路'}
        </text>

        {/* sprint contract between generator and evaluator */}
        <path d="M555 80 C555 56 505 56 505 80" fill="none" stroke="rgb(var(--c-brand2))" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="530" y="48" textAnchor="middle" fill="rgb(var(--c-brand2))" fontSize="9" fontFamily="monospace">
          {lang === 'en' ? 'sprint contract' : '冲刺合约'}
        </text>

        {/* human gate */}
        <g>
          <rect x="660" y="196" width="120" height="34" rx="17" fill="rgb(var(--c-bg-soft))" stroke="rgb(var(--c-line))" />
          <circle cx="680" cy="213" r="5" fill="rgb(var(--c-success))" />
          <text x="693" y="217" fill="rgb(var(--c-muted))" fontSize="10">
            {lang === 'en' ? 'Human gate' : '人工门禁'}
          </text>
        </g>
      </svg>
    </div>
  );
}

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Gauge, Layers, RotateCcw, Target } from 'lucide-react';
import clsx from 'clsx';
import { budgetItems, patterns, quizQuestions, selectorQuestions, selectorResults } from '../content/features';
import { getChapter } from '../content/meta';
import { useLang, usePick } from '../lib/i18n';
import { useLocalStorage } from '../lib/hooks';

const toolTabs = [
  { id: 'budget', title: { zh: '上下文预算', en: 'Context Budget' } },
  { id: 'quiz', title: { zh: '成熟度自测', en: 'Maturity Quiz' } },
  { id: 'selector', title: { zh: '模式选型', en: 'Pattern Selector' } },
  { id: 'cost', title: { zh: '成本计算', en: 'Cost Calculator' } },
] as const;

type ToolId = (typeof toolTabs)[number]['id'];

const windowSizes = [
  { value: 32000, label: '32K' },
  { value: 128000, label: '128K' },
  { value: 200000, label: '200K' },
  { value: 1000000, label: '1M' },
];

const defaultBudget = Object.fromEntries(budgetItems.map((item) => [item.id, item.tokens])) as Record<string, number>;

/* ------------------------------- 1. budget ------------------------------- */

function BudgetTool() {
  const { lang } = useLang();
  const pick = usePick();
  const [alloc, setAlloc] = useLocalStorage<Record<string, number>>('he-lab-budget', defaultBudget);
  const [windowSize, setWindowSize] = useLocalStorage<number>('he-lab-budget-window', 200000);

  const total = budgetItems.reduce((sum, item) => sum + (alloc[item.id] ?? 0), 0);
  const used = Math.min(100, (total / windowSize) * 100);
  const headroom = Math.max(0, windowSize - total);
  const biggest = [...budgetItems].sort((a, b) => (alloc[b.id] ?? 0) - (alloc[a.id] ?? 0))[0];
  const level: 'ok' | 'warn' | 'danger' | 'over' = used >= 100 ? 'over' : used >= 80 ? 'danger' : used >= 60 ? 'warn' : 'ok';

  const verdict = {
    ok: {
      zh: '预算健康。高信号 token 占多数，模型还有空间推理与自我纠错。',
      en: 'Healthy budget. Most tokens are high-signal and the model still has room to reason and self-correct.',
    },
    warn: {
      zh: '开始拥挤。上下文越长，准确回忆单条规则的能力越差——先砍检索文档和历史。',
      en: 'Getting crowded. Longer context lowers recall of any single rule — trim retrieved docs and history first.',
    },
    danger: {
      zh: '危险区。接近上限时模型会出现「上下文焦虑」：提前收尾、草率打补丁、假装做完了。',
      en: 'Danger zone. Near the ceiling models show context anxiety: wrapping up early, patching sloppily, claiming done.',
    },
    over: {
      zh: '已超窗口。真实系统会被迫压缩，而压缩最容易丢掉的正是你花大力气塞进去的规则。',
      en: 'Over the window. Real systems must compact, and compaction tends to drop the rules you fought to include.',
    },
  }[level];

  const suggestions = useMemo(() => {
    const list: { zh: string; en: string }[] = [];
    if ((alloc.history ?? 0) > windowSize * 0.3)
      list.push({
        zh: '对话历史超过窗口 30%：改用结构化笔记（进度文件 + 决策日志），或定期压缩成摘要。',
        en: 'History is over 30% of the window: use structured notes (progress + decisions) or compact to a summary.',
      });
    if ((alloc.retrieval ?? 0) > windowSize * 0.2)
      list.push({
        zh: '检索文档占比过高：把全量塞入换成按需检索 + top-k 截断，只留片段和出处。',
        en: 'Retrieved docs dominate: swap bulk stuffing for ranked top-k retrieval, keeping snippets and sources only.',
      });
    if ((alloc.system ?? 0) > 8000)
      list.push({
        zh: '指令文件太重：入口只留地图与架构不变量，专业知识拆到 docs/ 用指针加载。',
        en: 'Instructions too heavy: keep the entry as a map plus invariants, move domain detail behind pointers.',
      });
    if ((alloc.tools ?? 0) > 10000)
      list.push({
        zh: '工具定义过多：合并互相重叠的工具，或先筛选再注入。',
        en: 'Too many tool schemas: merge overlapping tools, or prefilter before injection.',
      });
    if ((alloc.memory ?? 0) > windowSize * 0.15)
      list.push({
        zh: '记忆层挤占了工作区：把长期知识做成可检索索引，而不是每次全量回放。',
        en: 'Memory is eating workspace: make long-term knowledge searchable instead of replaying it every turn.',
      });
    if (!list.length)
      list.push({
        zh: '当前分配没有明显冗余。下一步把这套预算写进门禁：超预算即停止并交接。',
        en: 'No obvious waste. Next step: turn this budget into a gate — stop and hand off when exceeded.',
      });
    return list;
  }, [alloc, windowSize]);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
      <div className="card p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2.5 text-[1.15rem] font-bold text-ink">
            <Gauge size={18} className="text-brand" />
            {lang === 'en' ? 'Context Budget Simulator' : '上下文预算模拟器'}
          </h2>
          <div className="flex items-center gap-1 rounded-lg border border-line bg-soft/60 p-0.5" role="group" aria-label={lang === 'en' ? 'Window size' : '窗口大小'}>
            {windowSizes.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setWindowSize(option.value)}
                aria-pressed={windowSize === option.value}
                className={clsx(
                  'rounded-md px-2.5 py-1 font-mono text-[0.68rem] transition',
                  windowSize === option.value ? 'bg-brand text-white' : 'text-muted hover:text-ink',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-5 text-[0.86rem] leading-relaxed text-muted">
          {lang === 'en'
            ? 'Context is a scarce resource, not a filing cabinet. Fill the window and see where the pressure comes from.'
            : '上下文是稀缺资源，不是文件柜。把窗口填满，看看压力来自哪一类 token。'}
        </p>

        <div className="mb-6">
          <div className="flex h-9 w-full overflow-hidden rounded-xl border border-line bg-soft/50">
            {budgetItems.map((item) => {
              const value = alloc[item.id] ?? 0;
              const width = Math.min(100, (value / windowSize) * 100);
              return width > 0 ? (
                <div
                  key={item.id}
                  title={`${pick(item.label)} · ${value.toLocaleString()}`}
                  style={{ width: `${width}%`, backgroundColor: `rgb(${item.color})` }}
                  className="h-full transition-all duration-300"
                />
              ) : null;
            })}
            {headroom > 0 && (
              <div
                style={{ width: `${(headroom / windowSize) * 100}%` }}
                className="h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_6px,rgb(var(--c-line))_6px,rgb(var(--c-line))_12px)]"
                title={lang === 'en' ? 'Headroom' : '剩余空间'}
              />
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.7rem]">
            <span className="font-mono tabular text-ink">
              {total.toLocaleString()} / {windowSize.toLocaleString()}
            </span>
            <span
              className={clsx(
                'font-mono font-semibold tabular',
                level === 'ok' && 'text-success',
                level === 'warn' && 'text-accent',
                (level === 'danger' || level === 'over') && 'text-danger',
              )}
            >
              {used.toFixed(1)}% {lang === 'en' ? 'used' : '已用'}
            </span>
            <span className="text-faint">
              {lang === 'en' ? 'largest block' : '最大块'} · <span className="text-muted">{pick(biggest.label)}</span>
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {budgetItems.map((item) => {
            const value = alloc[item.id] ?? 0;
            return (
              <label key={item.id} className="block">
                <span className="mb-1.5 flex items-center justify-between text-[0.78rem]">
                  <span className="flex items-center gap-2 text-muted">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: `rgb(${item.color})` }} />
                    {pick(item.label)}
                  </span>
                  <span className="font-mono tabular text-ink">{value.toLocaleString()}</span>
                </span>
                <input
                  type="range"
                  min={0}
                  max={Math.round(windowSize * 0.5)}
                  step={500}
                  value={value}
                  onChange={(event) => setAlloc({ ...alloc, [item.id]: Number(event.target.value) })}
                  className="w-full"
                  aria-label={pick(item.label)}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setAlloc(defaultBudget)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.72rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            <RotateCcw size={12} /> {lang === 'en' ? 'Reset' : '重置'}
          </button>
          <button
            type="button"
            onClick={() => setAlloc({ system: 900, tools: 2400, memory: 1200, retrieval: 6000, history: 18000, task: 12000 })}
            className="rounded-lg border border-success/35 bg-success/[0.06] px-3 py-1.5 text-[0.72rem] text-success transition hover:bg-success/10"
          >
            {lang === 'en' ? 'Thin-map preset' : '薄地图预设'}
          </button>
          <button
            type="button"
            onClick={() => setAlloc({ system: 22000, tools: 26000, memory: 18000, retrieval: 60000, history: 55000, task: 16000 })}
            className="rounded-lg border border-danger/35 bg-danger/[0.06] px-3 py-1.5 text-[0.72rem] text-danger transition hover:bg-danger/10"
          >
            {lang === 'en' ? 'Kitchen-sink preset' : '全塞进去预设'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div
          className={clsx(
            'rounded-2xl border p-4',
            level === 'ok' && 'border-success/30 bg-success/[0.05]',
            level === 'warn' && 'border-accent/35 bg-accent/[0.05]',
            (level === 'danger' || level === 'over') && 'border-danger/35 bg-danger/[0.05]',
          )}
        >
          <div className="mb-1.5 flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
            <AlertTriangle size={12} /> {lang === 'en' ? 'Verdict' : '诊断'}
          </div>
          <p className="text-[0.85rem] leading-relaxed text-muted">{pick(verdict)}</p>
        </div>

        <div className="card p-4">
          <div className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
            {lang === 'en' ? 'What to change' : '可以怎么改'}
          </div>
          <ul className="space-y-2 text-[0.8rem] leading-relaxed text-muted">
            {suggestions.map((tip, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {pick(tip)}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/chapter/ch17"
          className="group flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3 text-[0.8rem] text-muted transition hover:border-brand/40 hover:text-brand"
        >
          {lang === 'en' ? 'Why less is more → ch17' : '为什么少即是多 → 第 17 章'}
          <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------- 2. quiz --------------------------------- */

const tiers = [
  {
    min: 0,
    max: 4,
    title: { zh: '第 0 层：还在聊天', en: 'Level 0: still chatting' },
    desc: {
      zh: '每次从零解释项目，产出全靠运气。先写一个 20 行的 CLAUDE.md / AGENTS.md，收益立刻可见。',
      en: 'Every session starts from zero and quality is luck. Write a 20-line instruction file first; the win is immediate.',
    },
    chapters: ['ch15', 'ch05'],
  },
  {
    min: 5,
    max: 9,
    title: { zh: '第 1 层：有指令，没约束', en: 'Level 1: instructions without enforcement' },
    desc: {
      zh: '规则写了不少，但全靠 AI 自觉。挑一条最常犯的错，把它升级成 Hook、linter 或测试。',
      en: 'Rules exist but rely on goodwill. Take the most frequent mistake and escalate it to a hook, linter or test.',
    },
    chapters: ['ch06', 'ch10'],
  },
  {
    min: 10,
    max: 13,
    title: { zh: '第 2 层：有反馈，缺记忆', en: 'Level 2: feedback without memory' },
    desc: {
      zh: '已经会跑验证，但经验留不下来。建立跨会话规则文件与结构化笔记，让同一个错误只犯一次。',
      en: 'Verification runs but lessons evaporate. Build cross-session rules and structured notes so each mistake happens once.',
    },
    chapters: ['ch07', 'ch13'],
  },
  {
    min: 14,
    max: 16,
    title: { zh: '第 3 层：Harness 成型', en: 'Level 3: a real harness' },
    desc: {
      zh: '五层基本齐了。重点转向减法与编排：砍掉为旧模型写的补丁，再决定哪些任务真的值得并行。',
      en: 'The five layers are in place. Shift to subtraction and orchestration: drop patches written for old models, then decide what truly parallelizes.',
    },
    chapters: ['ch17', 'ch08'],
  },
];

function QuizTool() {
  const { lang } = useLang();
  const pick = usePick();
  const [answers, setAnswers] = useLocalStorage<Record<string, number>>('he-lab-quiz', {});

  const answered = quizQuestions.filter((question) => answers[question.id] !== undefined);
  const score = answered.reduce((sum, question) => sum + (answers[question.id] ?? 0), 0);
  const maxScore = quizQuestions.length * 2;
  const tier = tiers.find((item) => score >= item.min && score <= item.max) ?? tiers[0];
  const complete = answered.length === quizQuestions.length;

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
      <div className="card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2.5 text-[1.15rem] font-bold text-ink">
            <Layers size={18} className="text-brand" />
            {lang === 'en' ? 'Harness Maturity Quiz' : 'Harness 成熟度自测'}
          </h2>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-[0.7rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            <RotateCcw size={11} /> {lang === 'en' ? 'Clear' : '清空'}
          </button>
        </div>
        <p className="mb-5 text-[0.86rem] leading-relaxed text-muted">
          {lang === 'en'
            ? 'Eight questions across the harness layers. Answer honestly — the score is only useful as a map of what to fix next.'
            : '八个问题对应缰绳的不同层。诚实作答——分数的意义只在于告诉你下一步补哪里。'}
        </p>

        <ol className="space-y-5">
          {quizQuestions.map((question, index) => {
            const chosen = answers[question.id];
            return (
              <li key={question.id}>
                <div className="mb-2 flex gap-2.5">
                  <span className="mt-0.5 font-mono text-[0.66rem] text-faint">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[0.88rem] font-medium leading-snug text-ink">{pick(question.question)}</span>
                </div>
                <div className="grid gap-1.5 sm:grid-cols-3">
                  {question.options.map((option, optionIndex) => {
                    const selected = chosen === optionIndex;
                    return (
                      <button
                        key={optionIndex}
                        type="button"
                        onClick={() => setAnswers({ ...answers, [question.id]: optionIndex })}
                        aria-pressed={selected}
                        className={clsx(
                          'rounded-xl border px-3 py-2 text-left text-[0.76rem] leading-snug transition',
                          selected
                            ? 'border-brand/45 bg-brand/[0.08] font-medium text-brand'
                            : 'border-line bg-surface/50 text-muted hover:border-brand/25 hover:text-ink',
                        )}
                      >
                        {pick(option.label)}
                      </button>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="space-y-4">
        <div className="card p-5">
          <div className="flex items-end justify-between">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
              {lang === 'en' ? 'Score' : '得分'}
            </span>
            <span className="gradient-text font-mono text-3xl font-extrabold tabular">
              {score}
              <span className="text-base text-faint">/{maxScore}</span>
            </span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
            <div className="h-full gradient-line transition-all duration-500" style={{ width: `${(score / maxScore) * 100}%` }} />
          </div>
          <div className="mt-2 text-[0.68rem] text-faint">
            {answered.length}/{quizQuestions.length} {lang === 'en' ? 'answered' : '已作答'}
          </div>

          {complete && (
            <div className="fade-in mt-4 rounded-xl border border-brand/25 bg-brand/[0.05] p-3.5">
              <div className="text-[0.9rem] font-semibold text-brand">{pick(tier.title)}</div>
              <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted">{pick(tier.desc)}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {tier.chapters.map((id) => {
                  const chapter = getChapter(id);
                  if (!chapter) return null;
                  return (
                    <Link
                      key={id}
                      to={`/chapter/${id}`}
                      className="inline-flex items-center gap-1 rounded-full border border-line bg-surface px-2.5 py-1 text-[0.68rem] text-muted transition hover:border-brand/40 hover:text-brand"
                    >
                      Ch{String(chapter.num).padStart(2, '0')} {pick(chapter.title)}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="card p-4">
          <div className="mb-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
            {lang === 'en' ? 'Question breakdown' : '逐题分布'}
          </div>
          <ul className="space-y-1.5">
            {quizQuestions.map((question, index) => {
              const value = answers[question.id];
              return (
                <li key={question.id} className="flex items-center gap-2 text-[0.72rem]">
                  <span className="w-5 shrink-0 font-mono text-faint">{String(index + 1).padStart(2, '0')}</span>
                  <span className="flex flex-1 gap-0.5">
                    {[0, 1, 2].map((step) => (
                      <span
                        key={step}
                        className={clsx('h-1.5 flex-1 rounded-full', value !== undefined && step <= value ? 'bg-brand' : 'bg-line')}
                      />
                    ))}
                  </span>
                  <span className="w-9 shrink-0 text-right font-mono text-faint">
                    {value === undefined ? '—' : `${value}/2`}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-soft/50 p-4 text-[0.74rem] leading-relaxed text-faint">
          {lang === 'en'
            ? 'Scoring is deliberately crude: 2 points means the capability exists and has actually been verified.'
            : '评分刻意粗糙：只有当能力既存在又被验证过，才值 2 分。'}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ 3. selector ------------------------------ */

function SelectorTool() {
  const { lang } = useLang();
  const pick = usePick();
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>('he-lab-selector', {});

  const done = selectorQuestions.every((question) => Boolean(answers[question.id]));

  const resultKey = useMemo(() => {
    if (!done) return null;
    const { independence, quality, scale } = answers;
    if (scale === 'fullstack') return 'fullstack';
    if (quality === 'critical') return 'critical';
    if (scale === 'batch') return 'batch';
    if (independence === 'mixed') return 'mixed';
    if (independence === 'independent') return 'independent';
    if (quality === 'prototype') return 'prototype';
    if (quality === 'production') return 'production';
    return 'single';
  }, [answers, done]);

  const result = resultKey ? selectorResults[resultKey] : null;
  const pattern = result ? patterns.find((item) => item.id === result.pattern) : null;
  const chapter = result ? getChapter(result.chapter) : null;

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
      <div className="card p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2.5 text-[1.15rem] font-bold text-ink">
            <Target size={18} className="text-brand" />
            {lang === 'en' ? 'Pattern Selector' : '编排模式选型'}
          </h2>
          <button
            type="button"
            onClick={() => setAnswers({})}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1 text-[0.7rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            <RotateCcw size={11} /> {lang === 'en' ? 'Clear' : '清空'}
          </button>
        </div>
        <p className="mb-5 text-[0.86rem] leading-relaxed text-muted">
          {lang === 'en'
            ? 'Three questions decide whether you need one agent, two sessions, or a genuine multi-agent pipeline.'
            : '三个问题决定你该用一个 agent、两个会话，还是真的上多智能体流水线。'}
        </p>

        <ol className="space-y-5">
          {selectorQuestions.map((question, index) => (
            <li key={question.id}>
              <div className="mb-2 flex gap-2.5">
                <span className="mt-0.5 font-mono text-[0.66rem] text-faint">{String(index + 1).padStart(2, '0')}</span>
                <span className="text-[0.88rem] font-medium leading-snug text-ink">{pick(question.question)}</span>
              </div>
              <div className="grid gap-1.5 sm:grid-cols-3">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setAnswers({ ...answers, [question.id]: option.value })}
                      aria-pressed={selected}
                      className={clsx(
                        'rounded-xl border px-3 py-2 text-left text-[0.76rem] leading-snug transition',
                        selected
                          ? 'border-brand/45 bg-brand/[0.08] font-medium text-brand'
                          : 'border-line bg-surface/50 text-muted hover:border-brand/25 hover:text-ink',
                      )}
                    >
                      {pick(option.label)}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="space-y-4">
        {result ? (
          <div className="fade-in card p-5">
            <div className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
              {lang === 'en' ? 'Recommended' : '推荐方案'}
            </div>
            <h3 className="mt-2 text-[1.15rem] font-bold text-ink">{pick(result.title)}</h3>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">{pick(result.desc)}</p>

            {pattern && (
              <Link
                to="/patterns"
                className="mt-4 flex items-center justify-between rounded-xl border border-brand/25 bg-brand/[0.05] px-3.5 py-2.5 transition hover:border-brand/45"
              >
                <span className="flex items-center gap-2 text-[0.78rem] font-medium text-brand">
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-brand/15">
                    <Target size={12} />
                  </span>
                  {pick(pattern.title)}
                </span>
                <ArrowRight size={14} className="text-brand" />
              </Link>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2">
              {selectorQuestions.map((question) => {
                const value = answers[question.id];
                const option = question.options.find((item) => item.value === value);
                return (
                  <div key={question.id} className="rounded-lg border border-line bg-soft/50 px-2.5 py-2">
                    <div className="text-[0.58rem] uppercase tracking-wider text-faint">
                      Q{selectorQuestions.indexOf(question) + 1}
                    </div>
                    <div className="mt-0.5 truncate text-[0.72rem] text-muted">{option ? pick(option.label) : '—'}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card p-5 text-center">
            <Target size={22} className="mx-auto text-line" />
            <p className="mt-2 text-[0.8rem] leading-relaxed text-faint">
              {lang === 'en' ? 'Answer all three questions to get a recommendation.' : '答完三个问题即可得到推荐。'}
            </p>
          </div>
        )}

        {chapter && (
          <Link
            to={`/chapter/${chapter.id}`}
            className="group flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3 text-[0.8rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            <span>
              Ch{String(chapter.num).padStart(2, '0')} · {pick(chapter.title)}
            </span>
            <ArrowRight size={14} className="transition group-hover:translate-x-1" />
          </Link>
        )}

        <div className="rounded-xl border border-accent/30 bg-accent/[0.05] p-4 text-[0.76rem] leading-relaxed text-muted">
          {lang === 'en'
            ? 'Default to the simplest thing that works. Multi-agent setups multiply context and cost; earn them with evidence that one agent really is not enough.'
            : '默认选最简单能跑的方案。多智能体会同时放大上下文和成本；先用证据证明单 agent 确实不够，再上多 agent。'}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- 4. cost -------------------------------- */

const costDefaults = {
  runsPerDay: 20,
  turnsPerRun: 30,
  inputPerTurn: 12000,
  outputPerTurn: 700,
  inputPrice: 3,
  outputPrice: 15,
  evaluatorRatio: 0.35,
  workingDays: 22,
};

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  max = 100000,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.7rem] text-muted">{label}</span>
      <span className="flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-2.5 py-1.5 transition focus-within:border-brand/50">
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            const parsed = Number(event.target.value);
            onChange(Number.isFinite(parsed) ? parsed : 0);
          }}
          className="w-full bg-transparent font-mono text-[0.8rem] tabular text-ink outline-none"
          aria-label={label}
        />
        {suffix && <span className="shrink-0 font-mono text-[0.65rem] text-faint">{suffix}</span>}
      </span>
    </label>
  );
}

function CostTool() {
  const { lang } = useLang();
  const [values, setValues] = useLocalStorage('he-lab-cost', costDefaults);
  const set = (key: keyof typeof costDefaults, value: number) => setValues({ ...values, [key]: value });

  const singleRunTokensIn = values.runsPerDay > 0 ? values.turnsPerRun * values.inputPerTurn : 0;
  const perRunCost = (singleRunTokensIn * values.inputPrice + values.turnsPerRun * values.outputPerTurn * values.outputPrice) / 1_000_000;
  const evaluatorCost = perRunCost * values.evaluatorRatio;
  const dailyRuns = values.runsPerDay;
  const daily = (perRunCost + evaluatorCost) * dailyRuns;
  const monthly = daily * values.workingDays;
  const withoutReviewer = perRunCost * dailyRuns;
  const extraQualityCost = daily - withoutReviewer;

  const rows = [
    { label: lang === 'en' ? 'Cost per run' : '单次任务', value: perRunCost, accent: false },
    { label: lang === 'en' ? 'Independent review add-on' : '独立评审增量', value: evaluatorCost, accent: true },
    { label: lang === 'en' ? 'Daily total' : '每日合计', value: daily, accent: false },
    { label: lang === 'en' ? `Monthly (${values.workingDays} days)` : `月度（${values.workingDays} 天）`, value: monthly, accent: false },
  ];

  const money = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const notes =
    lang === 'en'
      ? [
          'Input tokens are re-sent every turn: a 30-turn run with 12k of context costs roughly 360k input tokens even if you only write a few hundred lines.',
          'Review is cheap relative to a bad merge. Anthropic’s published comparison is $9 for a broken 20-minute single-agent run versus $200 for a complete three-agent run.',
          'Cache reads and prompt caching change the arithmetic heavily — treat this as an order-of-magnitude tool, then measure with real traces.',
        ]
      : [
          '输入 token 每轮都会重发：30 轮 × 12k 上下文 ≈ 36 万输入 token，哪怕你只改了几百行代码。',
          '评审相对「合错一次」很便宜。Anthropic 公开的数据是：单 agent 20 分钟 9 美元但产出残缺，三 agent 6 小时 200 美元但完整可用。',
          '缓存命中与 prompt caching 会大幅改变结果——把它当数量级工具，真实数字用 trace 去量。',
        ];

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
      <div className="card p-5 sm:p-6">
        <h2 className="mb-2 flex items-center gap-2.5 text-[1.15rem] font-bold text-ink">
          <Target size={18} className="text-brand" />
          {lang === 'en' ? 'Harness Cost Calculator' : 'Harness 成本计算器'}
        </h2>
        <p className="mb-5 text-[0.86rem] leading-relaxed text-muted">
          {lang === 'en'
            ? 'Feedback layers cost money. The question is whether the layer is cheaper than the failure it prevents.'
            : '反馈层是要花钱的。问题在于：这一层是否比它拦住的那次事故便宜。'}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label={lang === 'en' ? 'Agent runs per day' : '每天 agent 任务数'}
            value={values.runsPerDay}
            onChange={(value) => set('runsPerDay', value)}
          />
          <NumberField
            label={lang === 'en' ? 'Turns per run' : '单任务轮次'}
            value={values.turnsPerRun}
            onChange={(value) => set('turnsPerRun', value)}
          />
          <NumberField
            label={lang === 'en' ? 'Input tokens per turn' : '每轮输入 token'}
            value={values.inputPerTurn}
            onChange={(value) => set('inputPerTurn', value)}
            step={500}
            suffix="tok"
          />
          <NumberField
            label={lang === 'en' ? 'Output tokens per turn' : '每轮输出 token'}
            value={values.outputPerTurn}
            onChange={(value) => set('outputPerTurn', value)}
            step={50}
            suffix="tok"
          />
          <NumberField
            label={lang === 'en' ? 'Input price / 1M tokens' : '输入单价 / 1M token'}
            value={values.inputPrice}
            onChange={(value) => set('inputPrice', value)}
            step={0.5}
            suffix="USD"
          />
          <NumberField
            label={lang === 'en' ? 'Output price / 1M tokens' : '输出单价 / 1M token'}
            value={values.outputPrice}
            onChange={(value) => set('outputPrice', value)}
            step={0.5}
            suffix="USD"
          />
          <NumberField
            label={lang === 'en' ? 'Evaluator overhead (% of a run)' : '评审额外开销（占单次任务 %）'}
            value={Math.round(values.evaluatorRatio * 100)}
            onChange={(value) => set('evaluatorRatio', value / 100)}
            max={300}
            suffix="%"
          />
          <NumberField
            label={lang === 'en' ? 'Working days per month' : '每月工作日'}
            value={values.workingDays}
            onChange={(value) => set('workingDays', value)}
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setValues(costDefaults)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.72rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            <RotateCcw size={12} /> {lang === 'en' ? 'Reset assumptions' : '恢复默认假设'}
          </button>
          <button
            type="button"
            onClick={() => setValues({ ...values, turnsPerRun: 120, inputPerTurn: 30000 })}
            className="rounded-lg border border-accent/35 bg-accent/[0.06] px-3 py-1.5 text-[0.72rem] text-accent transition hover:bg-accent/10"
          >
            {lang === 'en' ? 'Long-run preset (6h)' : '长任务预设（6 小时）'}
          </button>
          <button
            type="button"
            onClick={() => setValues({ ...values, turnsPerRun: 8, inputPerTurn: 6000, evaluatorRatio: 0 })}
            className="rounded-lg border border-line px-3 py-1.5 text-[0.72rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            {lang === 'en' ? 'Quick fix preset' : '小修小补预设'}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="card overflow-hidden">
          <div className="border-b border-line bg-soft/60 px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
            {lang === 'en' ? 'Output' : '结果'}
          </div>
          <ul className="divide-y divide-line/70">
            {rows.map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className={clsx('text-[0.78rem]', row.accent ? 'text-accent' : 'text-muted')}>{row.label}</span>
                <span className={clsx('font-mono text-[0.86rem] font-semibold tabular', row.accent ? 'text-accent' : 'text-ink')}>
                  {money(row.value)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-line bg-soft/40 px-4 py-2.5 text-[0.68rem] leading-relaxed text-faint">
            {lang === 'en'
              ? `Review layer adds ${money(extraQualityCost)}/day (${dailyRuns > 0 ? ((extraQualityCost / withoutReviewer) * 100).toFixed(0) : 0}% on top of generation).`
              : `评审层每天多花 ${money(extraQualityCost)}（在生成成本之上 ${dailyRuns > 0 ? ((extraQualityCost / withoutReviewer) * 100).toFixed(0) : 0}%）。`}
          </div>
        </div>

        <div className="card p-4">
          <div className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
            {lang === 'en' ? 'Read the numbers' : '怎么读这些数字'}
          </div>
          <ul className="space-y-2 text-[0.76rem] leading-relaxed text-muted">
            {notes.map((note, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/gates"
          className="group flex items-center justify-between rounded-xl border border-line bg-surface/60 px-4 py-3 text-[0.8rem] text-muted transition hover:border-brand/40 hover:text-brand"
        >
          {lang === 'en' ? 'Set a budget gate → release gates' : '把预算变成门禁 → 发布门禁'}
          <ArrowRight size={14} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

/* -------------------------------- page --------------------------------- */

export function LabPage() {
  const { lang, t } = useLang();
  const [tool, setTool] = useState<ToolId>('budget');

  return (
    <div className="px-5 py-9 sm:px-8 lg:py-12">
      <header className="mb-7">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand">
          <Gauge size={12} /> {lang === 'en' ? 'Interactive' : '可交互'}
        </div>
        <h1 className="text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.3rem]">{t('labTitle')}</h1>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{t('labDesc')}</p>
      </header>

      <div className="no-scrollbar mb-6 flex gap-1.5 overflow-x-auto border-b border-line pb-2">
        {toolTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setTool(tab.id)}
            aria-pressed={tool === tab.id}
            className={clsx(
              'shrink-0 rounded-lg px-3.5 py-2 text-[0.8rem] font-medium transition',
              tool === tab.id ? 'bg-brand text-white shadow-glow' : 'text-muted hover:bg-soft hover:text-ink',
            )}
          >
            {lang === 'en' ? tab.title.en : tab.title.zh}
          </button>
        ))}
      </div>

      <div key={tool} className="fade-in">
        {tool === 'budget' && <BudgetTool />}
        {tool === 'quiz' && <QuizTool />}
        {tool === 'selector' && <SelectorTool />}
        {tool === 'cost' && <CostTool />}
      </div>
    </div>
  );
}

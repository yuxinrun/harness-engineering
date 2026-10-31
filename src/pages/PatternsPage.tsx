import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Check, Clock, Target } from 'lucide-react';
import clsx from 'clsx';
import { Icon } from '../components/Icon';
import { CodeBlock } from '../components/CodeBlock';
import { patterns } from '../content/features';
import { getChapter } from '../content/meta';
import { useLang, usePick } from '../lib/i18n';

export function PatternsPage() {
  const { lang, t } = useLang();
  const pick = usePick();
  const [activeId, setActiveId] = useState(patterns[0].id);
  const active = patterns.find((pattern) => pattern.id === activeId) ?? patterns[0];
  const chapter = getChapter(active.chapter);

  return (
    <div className="px-5 py-9 sm:px-8 lg:py-12">
      <header className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand">
          <Icon name="layers" className="h-3 w-3" /> Workbench
        </div>
        <h1 className="text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.3rem]">
          {t('patternsTitle')}
        </h1>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{t('patternsDesc')}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {patterns.map((pattern, index) => {
          const selected = pattern.id === activeId;
          return (
            <button
              key={pattern.id}
              type="button"
              onClick={() => setActiveId(pattern.id)}
              aria-pressed={selected}
              style={{ animationDelay: `${index * 60}ms` }}
              className={clsx(
                'fade-in group flex h-full flex-col rounded-2xl border p-4 text-left transition-all duration-200',
                selected
                  ? 'border-brand/45 bg-brand/[0.07] shadow-glow'
                  : 'border-line bg-surface/50 hover:-translate-y-1 hover:border-brand/30 hover:shadow-card',
              )}
            >
              <span
                className={clsx(
                  'inline-flex h-9 w-9 items-center justify-center rounded-xl transition',
                  selected ? 'bg-brand text-white' : 'bg-soft text-brand group-hover:bg-brand/10',
                )}
              >
                <Icon name={pattern.icon} className="h-4 w-4" />
              </span>
              <span className="mt-3 text-[0.92rem] font-semibold leading-snug text-ink">{pick(pattern.title)}</span>
              <span className="mt-1.5 text-[0.74rem] leading-relaxed text-muted">{pick(pattern.tagline)}</span>
              <span
                className={clsx(
                  'mt-3 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-wider',
                  selected ? 'text-brand' : 'text-faint',
                )}
              >
                {selected && <Check size={11} />}
                {String(index + 1).padStart(2, '0')} · {pattern.id}
              </span>
            </button>
          );
        })}
      </div>

      <section key={active.id} className="fade-in mt-6 grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <div className="card p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-[1.35rem] font-bold tracking-tight text-ink">{pick(active.title)}</h2>
              <p className="mt-1 text-[0.9rem] text-muted">{pick(active.tagline)}</p>
            </div>
            {chapter && (
              <Link
                to={`/chapter/${chapter.id}`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[0.72rem] text-muted transition hover:border-brand/40 hover:text-brand"
              >
                {lang === 'en' ? 'Deep dive' : '详解章节'}
                <span className="font-mono text-faint">Ch{String(chapter.num).padStart(2, '0')}</span>
                <ArrowRight size={12} />
              </Link>
            )}
          </div>

          <div className="mt-5 rounded-2xl border border-brand/20 bg-brand/[0.045] p-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand">
              <Target size={12} /> {lang === 'en' ? 'When to use' : '什么时候用'}
            </div>
            <p className="text-[0.9rem] leading-relaxed text-muted">{pick(active.when)}</p>
          </div>

          <div className="mt-5">
            <div className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
              {lang === 'en' ? 'How it works' : '怎么做'}
            </div>
            <ol className="space-y-3">
              {active.how.map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-[0.66rem] font-semibold text-brand">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-[0.88rem] font-semibold text-ink">{pick(step.title)}</div>
                    <p className="mt-0.5 text-[0.84rem] leading-relaxed text-muted">{pick(step.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5 flex gap-3 rounded-2xl border border-accent/30 bg-accent/[0.06] p-4">
            <AlertTriangle size={17} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <div className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-accent">
                {lang === 'en' ? 'Common way to break it' : '最常见的破法'}
              </div>
              <p className="mt-1 text-[0.86rem] leading-relaxed text-muted">{pick(active.pitfall)}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <CodeBlock code={active.example.code} lang={active.example.lang} title={active.example.title} />
          <div className="card p-4">
            <div className="mb-2 flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-faint">
              <Clock size={12} /> {lang === 'en' ? 'Adoption cost' : '上手成本'}
            </div>
            <ul className="space-y-1.5 text-[0.8rem] text-muted">
              <li className="flex justify-between gap-3">
                <span>{lang === 'en' ? 'Setup time' : '搭起来'}</span>
                <span className="font-mono text-ink">{active.id === 'human-orchestrator' ? '10 min' : active.id === 'independent-evaluator' ? '5 min' : '15–30 min'}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span>{lang === 'en' ? 'Infra needed' : '需要的基建'}</span>
                <span className="text-right font-mono text-ink">
                  {active.id === 'map-pointers'
                    ? lang === 'en'
                      ? 'docs/ folder'
                      : '一个 docs/ 目录'
                    : active.id === 'one-mistake-one-rule'
                      ? lang === 'en'
                        ? 'none'
                        : '无'
                      : active.id === 'writer-reviewer'
                        ? lang === 'en'
                          ? '2 sessions'
                          : '两个会话'
                        : active.id === 'human-orchestrator'
                          ? 'git worktree'
                          : lang === 'en'
                            ? 'fresh session + criteria'
                            : '新会话 + 验收标准'}
                </span>
              </li>
              <li className="flex justify-between gap-3">
                <span>{lang === 'en' ? 'Team scale' : '适用规模'}</span>
                <span className="text-right font-mono text-ink">
                  {active.id === 'human-orchestrator' ? '1–5' : active.id === 'independent-evaluator' ? '1+' : lang === 'en' ? 'any' : '任意'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

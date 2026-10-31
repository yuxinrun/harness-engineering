import { AlertTriangle, ArrowUpRight, Info, Lightbulb, Link2, Quote as QuoteIcon } from 'lucide-react';
import clsx from 'clsx';
import type { Block, Bi } from '../lib/types';
import { usePick } from '../lib/i18n';
import { Icon } from './Icon';
import { RichText } from './RichText';
import { CodeBlock } from './CodeBlock';
import { getBlockId } from '../content/toc';
import { siblings, siblingUrl } from '../content/meta';
import { LayersChart, TimelineChart, SpectrumChart, InclusionDiagram, OrchestrationFlow } from './charts/Diagrams';
import { ComparisonRadar, FailureBars } from './charts/Recharts';

const calloutStyles = {
  tip: {
    wrap: 'border-brand/30 bg-brand/[0.06]',
    icon: 'bg-brand/12 text-brand',
    label: 'text-brand',
    Icon: Lightbulb,
  },
  warn: {
    wrap: 'border-accent/35 bg-accent/[0.07]',
    icon: 'bg-accent/12 text-accent',
    label: 'text-accent',
    Icon: AlertTriangle,
  },
  note: {
    wrap: 'border-line bg-soft/70',
    icon: 'bg-ink/8 text-muted',
    label: 'text-muted',
    Icon: Info,
  },
  quote: {
    wrap: 'border-brand2/30 bg-brand2/[0.06]',
    icon: 'bg-brand2/12 text-brand2',
    label: 'text-brand2',
    Icon: QuoteIcon,
  },
} as const;

function ChartBlock({ block }: { block: Extract<Block, { type: 'chart' }> }) {
  const pick = usePick();
  return (
    <figure className="my-8 rounded-2xl border border-line bg-surface/40 p-4 sm:p-5">
      <figcaption className="mb-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Chart
        </span>
        <span className="text-sm font-semibold text-ink">{pick(block.title)}</span>
      </figcaption>
      {block.chart === 'layers' && <LayersChart />}
      {block.chart === 'timeline' && <TimelineChart />}
      {block.chart === 'spectrum' && <SpectrumChart />}
      {block.chart === 'radar' && <ComparisonRadar />}
      {block.chart === 'failures' && <FailureBars />}
      {block.chart === 'orchestration' && <OrchestrationFlow />}
      {block.chart === 'inclusion' && <InclusionDiagram />}
      {block.note && <p className="mt-2 text-center text-[0.7rem] text-faint">{pick(block.note)}</p>}
    </figure>
  );
}

type PickText = (bi: Bi) => string;

function scrollToBlock(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
}

function renderBlock(block: Block, index: number, chapterId: string, pick: PickText) {
  const id = getBlockId(chapterId, index, block);

  switch (block.type) {
    case 'h2':
      return (
        <section key={index} id={id} className="reveal heading-anchor mt-14 first:mt-4">
          <div className="mb-3 h-1 w-10 rounded-full gradient-line" />
          <h2 className="group text-[1.55rem] font-bold leading-snug tracking-tight text-ink sm:text-[1.8rem]">
            {pick(block.text)}
            <button
              type="button"
              onClick={() => scrollToBlock(id)}
              aria-label={`${pick(block.text)} — link`}
              className="anchor-link ml-2 inline-flex translate-y-0.5 items-center text-faint hover:text-brand"
            >
              <Link2 size={16} />
            </button>
          </h2>
        </section>
      );
    case 'h3':
      return (
        <section key={index} id={id} className="reveal heading-anchor mt-9">
          <h3 className="group text-lg font-semibold text-ink sm:text-xl">
            {pick(block.text)}
            <button
              type="button"
              onClick={() => scrollToBlock(id)}
              aria-label={`${pick(block.text)} — link`}
              className="anchor-link ml-2 inline-flex translate-y-0.5 items-center text-faint hover:text-brand"
            >
              <Link2 size={14} />
            </button>
          </h3>
        </section>
      );
    case 'p':
      return (
        <div key={index} className="reveal article-copy">
          <p>
            <RichText text={pick(block.text)} />
          </p>
        </div>
      );
    case 'lead':
      return (
        <div key={index} className="reveal article-copy">
          <p className="!mt-2 rounded-r-xl border-l-[3px] border-brand/60 bg-brand/[0.04] py-1 pl-4 text-[1.1rem] !leading-relaxed text-ink/90">
            <RichText text={pick(block.text)} />
          </p>
        </div>
      );
    case 'list':
      return (
        <div key={index} className="reveal article-copy">
          {block.ordered ? (
            <ol className="my-5 space-y-2.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-muted">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 font-mono text-[0.7rem] font-semibold text-brand">
                    {i + 1}
                  </span>
                  <span>
                    <RichText text={pick(item)} />
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <ul className="my-5 space-y-2.5">
              {block.items.map((item, i) => (
                <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed text-muted">
                  <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  <span>
                    <RichText text={pick(item)} />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    case 'callout': {
      const style = calloutStyles[block.tone];
      const CalloutIcon = style.Icon;
      return (
        <aside key={index} className={clsx('reveal my-6 rounded-2xl border p-4 sm:p-5', style.wrap)}>
          <div className="flex gap-3">
            <span className={clsx('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', style.icon)}>
              <CalloutIcon size={18} />
            </span>
            <div className="min-w-0">
              {block.title && (
                <div className={clsx('mb-1 text-sm font-semibold', style.label)}>{pick(block.title)}</div>
              )}
              <p className="whitespace-pre-line text-[0.98rem] leading-relaxed text-muted">
                <RichText text={pick(block.text)} />
              </p>
            </div>
          </div>
        </aside>
      );
    }
    case 'quote':
      return (
        <blockquote key={index} className="reveal my-7 border-l-[3px] border-brand2/50 pl-5">
          <p className="text-[1.08rem] leading-relaxed text-ink/85">
            <RichText text={pick(block.text)} />
          </p>
          {block.cite && <footer className="mt-2 text-xs text-faint">— <RichText text={pick(block.cite)} /></footer>}
        </blockquote>
      );
    case 'code':
      return (
        <div key={index} className="reveal">
          <CodeBlock code={block.code} lang={block.lang} title={block.title} />
        </div>
      );
    case 'table':
      return (
        <figure key={index} className="reveal my-7">
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface/60">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-soft/80">
                  {block.head.map((cell, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="border-b border-line px-4 py-3 text-left text-[0.78rem] font-semibold uppercase tracking-wide text-muted"
                    >
                      {pick(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="transition-colors hover:bg-brand/[0.035]">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={clsx(
                          'border-b border-line/70 px-4 py-3 align-top leading-relaxed text-muted last:border-r-0',
                          ci === 0 && 'font-medium text-ink',
                        )}
                      >
                        <RichText text={pick(cell)} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <figcaption className="mt-2 text-center text-[0.7rem] text-faint">{pick(block.caption)}</figcaption>}
        </figure>
      );
    case 'stats':
      return (
        <div key={index} className="reveal my-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {block.items.map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-line bg-surface/70 p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-card"
            >
              <div className="gradient-text text-2xl font-extrabold tracking-tight sm:text-[1.7rem]">{item.value}</div>
              <div className="mt-1 text-[0.72rem] font-medium leading-snug text-muted">{pick(item.label)}</div>
              {item.hint && <div className="mt-0.5 text-[0.62rem] text-faint">{pick(item.hint)}</div>}
            </div>
          ))}
        </div>
      );
    case 'steps':
      return (
        <ol key={index} className="reveal my-7 space-y-0">
          {block.items.map((item, i) => (
            <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
              {i < block.items.length - 1 && (
                <span className="absolute left-[0.95rem] top-8 h-[calc(100%-1.6rem)] w-px bg-gradient-to-b from-brand/40 to-line" />
              )}
              <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/10 font-mono text-xs font-semibold text-brand">
                {i + 1}
              </span>
              <div className="pt-0.5">
                <div className="text-sm font-semibold text-ink">{pick(item.title)}</div>
                <p className="mt-0.5 text-sm leading-relaxed text-muted">
                  <RichText text={pick(item.text)} />
                </p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'cards':
      return (
        <div key={index} className="reveal my-7 grid gap-3 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <div key={i} className="card card-hover p-4">
              <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand2/15 text-brand">
                <Icon name={item.icon} className="h-4 w-4" />
              </span>
              <div className="text-sm font-semibold text-ink">{pick(item.title)}</div>
              <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                <RichText text={pick(item.text)} />
              </p>
            </div>
          ))}
        </div>
      );
    case 'compare': {
      const tone = (t?: 'good' | 'bad' | 'neutral') =>
        t === 'bad'
          ? 'border-danger/25 bg-danger/[0.04]'
          : t === 'good'
            ? 'border-success/25 bg-success/[0.04]'
            : 'border-line bg-surface/60';
      return (
        <div key={index} className="reveal my-7 grid gap-3 sm:grid-cols-2">
          {[block.left, block.right].map((side, i) => (
            <div key={i} className={clsx('rounded-2xl border p-4', tone(side.tone))}>
              <div className="mb-2 text-sm font-semibold text-ink">{pick(side.title)}</div>
              <ul className="space-y-1.5">
                {side.items.map((item, j) => (
                  <li key={j} className="flex gap-2 text-[0.85rem] leading-relaxed text-muted">
                    <span
                      className={clsx(
                        'mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full',
                        side.tone === 'bad' ? 'bg-danger' : side.tone === 'good' ? 'bg-success' : 'bg-brand',
                      )}
                    />
                    <RichText text={pick(item)} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
    }
    case 'chart':
      return (
        <div key={index} className="reveal">
          <ChartBlock block={block} />
        </div>
      );
    case 'sources':
      return (
        <div key={index} className="reveal my-7">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
            Sources · 来源
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {block.items.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-line bg-surface/60 px-3.5 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-card"
              >
                <span className="text-[0.8rem] leading-snug text-muted group-hover:text-ink">
                  {pick(source.label)}
                </span>
                <ArrowUpRight size={14} className="mt-0.5 shrink-0 text-faint transition group-hover:text-brand" />
              </a>
            ))}
          </div>
        </div>
      );
    case 'siblings':
      return (
        <div key={index} className="reveal my-7 rounded-2xl border border-brand/20 bg-brand/[0.04] p-4">
          <div className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            {block.title ? pick(block.title) : 'Extended reading · 延伸阅读'}
          </div>
          <div className="flex flex-wrap gap-2">
            {block.items.map((sid) => {
              const project = siblings.find((s) => s.id === sid);
              if (!project) return null;
              return (
                <a
                  key={sid}
                  href={siblingUrl(sid)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.75rem] text-muted transition hover:border-brand/40 hover:text-brand"
                >
                  {pick({ zh: project.titleZh, en: project.titleEn })}
                  <ArrowUpRight size={12} />
                </a>
              );
            })}
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function BlockRenderer({ blocks, chapterId }: { blocks: Block[]; chapterId: string }) {
  const pick = usePick();
  return <div>{blocks.map((block, index) => renderBlock(block, index, chapterId, pick))}</div>;
}

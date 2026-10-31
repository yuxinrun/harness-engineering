import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ChevronDown, SpellCheck } from 'lucide-react';
import clsx from 'clsx';
import { Icon } from '../components/Icon';
import { museum } from '../content/features';
import { getChapter } from '../content/meta';
import { useLang, usePick } from '../lib/i18n';

const detailRows = [
  { key: 'symptom', label: { zh: '症状', en: 'Symptom' }, tone: 'text-danger' },
  { key: 'cause', label: { zh: '病因', en: 'Root cause' }, tone: 'text-muted' },
  { key: 'fix', label: { zh: '处方', en: 'Prescription' }, tone: 'text-success' },
  { key: 'example', label: { zh: '改写示例', en: 'Rewritten' }, tone: 'text-brand' },
] as const;

export function MuseumPage() {
  const { t } = useLang();
  const pick = usePick();
  const [open, setOpen] = useState<string[]>([museum[0].id]);

  const isOpen = (id: string) => open.includes(id);
  const toggle = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  const allOpen = open.length === museum.length;

  return (
    <div className="px-5 py-9 sm:px-8 lg:py-12">
      <header className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-accent">
          <Icon name="alert" className="h-3 w-3" /> Workbench
        </div>
        <h1 className="text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.3rem]">{t('museumTitle')}</h1>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{t('museumDesc')}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(allOpen ? [] : museum.map((item) => item.id))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.76rem] text-muted transition hover:border-brand/35 hover:text-ink"
          >
            {allOpen ? <SpellCheck size={13} /> : <AlertTriangle size={13} />}
            {allOpen
              ? pick({ zh: '全部收起', en: 'Collapse all' })
              : pick({ zh: '全部展开', en: 'Expand all' })}
          </button>
          <span className="font-mono text-[0.68rem] uppercase tracking-wider text-faint">
            {open.length} / {museum.length}
          </span>
        </div>
      </header>

      <div className="space-y-3">
        {museum.map((item, index) => {
          const expanded = isOpen(item.id);
          const chapter = getChapter(item.chapter);
          return (
            <article
              key={item.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className={clsx(
                'fade-in overflow-hidden rounded-2xl border transition-all duration-200',
                expanded ? 'border-accent/35 bg-accent/[0.04] shadow-card' : 'border-line bg-surface/50 hover:border-accent/25',
              )}
            >
              <h2>
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-controls={`exhibit-${item.id}`}
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-start gap-3.5 p-4 text-left sm:p-5"
                >
                  <span
                    className={clsx(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition',
                      expanded ? 'bg-accent/15 text-accent' : 'bg-soft text-muted',
                    )}
                  >
                    <Icon name={item.icon} className="h-[1.05rem] w-[1.05rem]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[0.66rem] text-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[1rem] font-semibold text-ink">{pick(item.title)}</span>
                      <span className="rounded-full border border-line bg-soft px-2 py-0.5 text-[0.62rem] text-muted">
                        {pick(item.tag)}
                      </span>
                    </span>
                    <span className="mt-1.5 block text-[0.85rem] leading-relaxed text-muted">{pick(item.symptom)}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={clsx(
                      'mt-1 shrink-0 text-faint transition-transform duration-200',
                      expanded && 'rotate-180 text-accent',
                    )}
                  />
                </button>
              </h2>
              {expanded && (
                <div id={`exhibit-${item.id}`} className="border-t border-accent/20 px-4 pb-5 sm:px-5">
                  <dl className="divide-y divide-line">
                    {detailRows.map((row) => (
                      <div key={row.key} className="grid gap-1 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
                        <dt
                          className={clsx(
                            'text-[0.68rem] font-semibold uppercase tracking-wider sm:pt-1',
                            row.tone === 'text-muted' ? 'text-muted' : row.tone,
                          )}
                        >
                          {pick(row.label)}
                        </dt>
                        <dd
                          className={clsx(
                            'text-[0.88rem] leading-relaxed',
                            row.key === 'symptom' || row.key === 'cause' ? 'text-muted' : 'text-ink/85',
                          )}
                        >
                          {pick(item[row.key])}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {chapter && (
                    <Link
                      to={`/chapter/${chapter.id}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-brand transition hover:gap-2.5"
                    >
                      <span>
                        {pick({ zh: '第 ', en: 'Chapter ' })}
                        {chapter.num}
                        {pick({ zh: ' 章展开讲 · ', en: ' covers this · ' })}
                        {pick(chapter.title)}
                      </span>
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <aside className="reveal mt-8 rounded-2xl border border-line bg-soft/70 p-4 sm:p-5">
        <div className="flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/8 text-muted">
            <Icon name="info" className="h-4 w-4" />
          </span>
          <p className="text-[0.88rem] leading-relaxed text-muted">
            {pick({
              zh: '展品不是用来羞愧的，是用来缩短诊断时间的。下次 agent 表现怪异，先在这六件里找原型：找得到，说明问题在缰绳，不在模型。',
              en: 'Exhibits exist to cut diagnosis time. When an agent behaves oddly, check these six first — a match means the harness is broken, not the model.',
            })}
          </p>
        </div>
      </aside>

      <nav aria-label={t('footerNav')} className="mt-7 flex flex-wrap gap-2">
        {[
          { to: '/gates', label: { zh: '用发布门禁拦截', en: 'Block them with gates' } },
          { to: '/patterns', label: { zh: '去看正确模式', en: 'See the proven patterns' } },
          { to: '/lab', label: { zh: '自己试一组参数', en: 'Try parameters in the Lab' } },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.76rem] text-muted transition hover:border-brand/40 hover:text-brand"
          >
            {pick(link.label)}
            <ArrowRight size={12} />
          </Link>
        ))}
      </nav>
    </div>
  );
}

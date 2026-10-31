import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, RotateCcw, ShieldCheck } from 'lucide-react';
import clsx from 'clsx';
import { Icon } from '../components/Icon';
import { gates } from '../content/features';
import { getChapter } from '../content/meta';
import { useLang, usePick } from '../lib/i18n';
import { useLocalStorage } from '../lib/hooks';

export function GatesPage() {
  const { t } = useLang();
  const pick = usePick();
  const [done, setDone] = useLocalStorage<string[]>('he-gates', []);

  const stats = useMemo(() => {
    const hardTotal = gates.filter((g) => g.hard).length;
    const hardDone = gates.filter((g) => g.hard && done.includes(g.id)).length;
    return {
      total: gates.length,
      finished: done.length,
      hardTotal,
      hardDone,
      percent: Math.round((done.length / gates.length) * 100),
    };
  }, [done]);

  const toggle = (id: string) =>
    setDone((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));

  const allDone = stats.finished === stats.total;

  return (
    <div className="px-5 py-9 sm:px-8 lg:py-12">
      <header className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand">
          <Icon name="shield-check" className="h-3 w-3" /> Workbench
        </div>
        <h1 className="text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.3rem]">{t('gatesTitle')}</h1>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{t('gatesDesc')}</p>
      </header>

      <section
        aria-label={t('progress')}
        className="reveal mb-7 rounded-2xl border border-line bg-surface/70 p-5 shadow-card"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="gradient-text text-3xl font-extrabold tracking-tight">{stats.finished}</span>
              <span className="font-mono text-sm text-faint">/ {stats.total}</span>
            </div>
            <p className="mt-1 text-[0.8rem] text-muted">
              {pick({
                zh: `硬门禁 ${stats.hardDone}/${stats.hardTotal} · 全部通过后才有资格谈「上线」`,
                en: `Hard gates ${stats.hardDone}/${stats.hardTotal} · nothing ships until every one is green`,
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {allDone && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/35 bg-success/[0.08] px-3 py-1.5 text-[0.72rem] font-semibold text-success">
                <CheckCircle2 size={13} />
                {pick({ zh: '可以发布', en: 'Cleared to ship' })}
              </span>
            )}
            <button
              type="button"
              onClick={() => setDone([])}
              disabled={stats.finished === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-soft px-3 py-1.5 text-[0.75rem] text-muted transition hover:border-brand/35 hover:text-ink disabled:cursor-not-allowed disabled:opacity-45"
            >
              <RotateCcw size={12} /> {t('reset')}
            </button>
          </div>
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-soft">
          <div
            className="h-full rounded-full gradient-line transition-[width] duration-500 ease-out"
            style={{ width: `${stats.percent}%` }}
          />
        </div>
        <p className="mt-3 text-[0.72rem] leading-relaxed text-faint">
          {pick({
            zh: '勾选状态保存在浏览器 localStorage，换设备不会同步——这是有意为之：门禁属于团队流程，不属于某个人的收藏夹。',
            en: 'Ticks live in your browser localStorage and never sync — deliberately: gates belong to a team process, not a personal bookmark.',
          })}
        </p>
      </section>

      <ol className="space-y-3">
        {gates.map((gate, index) => {
          const checked = done.includes(gate.id);
          const chapter = gate.chapter ? getChapter(gate.chapter) : undefined;
          return (
            <li
              key={gate.id}
              style={{ animationDelay: `${index * 40}ms` }}
              className={clsx(
                'fade-in rounded-2xl border transition-all duration-200',
                checked
                  ? 'border-success/30 bg-success/[0.05]'
                  : 'border-line bg-surface/50 hover:border-brand/30 hover:shadow-card',
              )}
            >
              <div className="flex gap-3 p-4 sm:p-5">
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => toggle(gate.id)}
                  className={clsx(
                    'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition',
                    checked
                      ? 'border-success/50 bg-success text-white'
                      : 'border-line bg-soft text-transparent hover:border-brand/50 hover:text-brand/40',
                  )}
                >
                  <CheckCircle2 size={15} />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[0.68rem] text-faint">{String(index + 1).padStart(2, '0')}</span>
                    <h2 className="text-[0.98rem] font-semibold text-ink">{pick(gate.title)}</h2>
                    <span
                      className={clsx(
                        'rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider',
                        gate.hard
                          ? 'border-danger/30 bg-danger/[0.07] text-danger'
                          : 'border-line bg-soft text-muted',
                      )}
                    >
                      {gate.hard
                        ? pick({ zh: '硬门禁', en: 'Hard gate' })
                        : pick({ zh: '软门禁', en: 'Advisory' })}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">{pick(gate.desc)}</p>
                  {chapter && (
                    <Link
                      to={`/chapter/${chapter.id}`}
                      className="mt-2.5 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-brand transition hover:gap-2.5"
                    >
                      <span>
                        {pick({ zh: '怎么做在第 ', en: 'How-to in chapter ' })}
                        {chapter.num}
                        {pick({ zh: ' 章 · ', en: ' · ' })}
                        {pick(chapter.title)}
                      </span>
                      <ArrowRight size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <aside className="reveal mt-8 rounded-2xl border border-accent/30 bg-accent/[0.06] p-4 sm:p-5">
        <div className="flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
            <ShieldCheck size={18} />
          </span>
          <div>
            <div className="mb-1 text-sm font-semibold text-accent">
              {pick({ zh: '门禁不是仪式感，是省下来的返工', en: 'Gates are not ceremony — they are rework you skip' })}
            </div>
            <p className="text-[0.9rem] leading-relaxed text-muted">
              {pick({
                zh: '把这份清单变成 CI：能自动检查的写成脚本，检查不了的写成 PR 模板里的勾选项。人类只负责判断，不负责记忆。',
                en: 'Turn this list into CI: automate what a script can check, put the rest into a PR template. Humans decide; they do not memorise.',
              })}
            </p>
          </div>
        </div>
      </aside>

      <nav aria-label={t('footerNav')} className="mt-7 flex flex-wrap gap-2">
        {[
          { to: '/lab', label: { zh: '去实验室算成本', en: 'Model the cost in the Lab' } },
          { to: '/toolkit', label: { zh: '复制模板起步', en: 'Start from a template' } },
          { to: '/museum', label: { zh: '看看常见错误', en: 'Browse common mistakes' } },
          { to: '/appendix/a', label: { zh: '附录 A · 模板合集', en: 'Appendix A · templates' } },
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

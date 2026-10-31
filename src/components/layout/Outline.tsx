import { ArrowUp, ListTree } from 'lucide-react';
import clsx from 'clsx';
import { useOutlineContext } from './OutlineContext';
import { useLang } from '../../lib/i18n';
import { usePick } from '../../lib/i18n';
import { useReadingProgress, useScrollSpy } from '../../lib/hooks';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 96;
  window.scrollTo({ top, behavior: 'smooth' });
}

export function Outline() {
  const { items } = useOutlineContext();
  const { t } = useLang();
  const pick = usePick();
  const progress = useReadingProgress();
  const ids = items.map((item) => item.id);
  const active = useScrollSpy(ids);

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[16rem] shrink-0 overflow-y-auto border-l border-line/60 px-5 py-8 xl:block">
      <div className="mb-5 rounded-xl border border-line bg-surface/50 p-3">
        <div className="mb-1.5 flex items-center justify-between text-[0.64rem]">
          <span className="font-semibold uppercase tracking-[0.14em] text-faint">{t('readingProgress')}</span>
          <span className="font-mono tabular text-brand">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full gradient-line transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mb-3 flex items-center gap-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-faint">
        <ListTree size={13} />
        {t('outline')}
      </div>

      {items.length === 0 ? (
        <p className="rounded-lg border border-dashed border-line px-3 py-6 text-center text-[0.7rem] leading-relaxed text-faint">
          {t('inThisChapter')} · {t('outline')}
        </p>
      ) : (
        <nav aria-label={t('outline')}>
          <ul className="relative space-y-0.5 border-l border-line">
            {items.map((item) => {
              const isActive = item.id === active;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToId(item.id);
                    }}
                    aria-current={isActive ? 'location' : undefined}
                    className={clsx(
                      'relative block border-l-2 py-1 pr-1 text-[0.76rem] leading-snug transition',
                      item.level === 3 ? 'pl-5' : 'pl-3',
                      isActive
                        ? 'border-brand font-medium text-brand'
                        : 'border-transparent text-muted hover:border-line hover:text-ink',
                    )}
                  >
                    {pick(item.text)}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-3 py-1.5 text-[0.7rem] text-muted transition hover:border-brand/40 hover:text-brand"
      >
        <ArrowUp size={12} />
        {t('backTop')}
      </button>
    </aside>
  );
}

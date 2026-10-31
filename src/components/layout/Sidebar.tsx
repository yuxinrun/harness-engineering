import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, Check, Circle, BookOpen } from 'lucide-react';
import clsx from 'clsx';
import { chapters, parts, getPart } from '../../content/meta';
import { featureNav, appendixNav } from '../../content/nav';
import { useLang } from '../../lib/i18n';
import { useReadChapters } from '../../lib/hooks';
import { Icon } from '../Icon';

export function SidebarContent({ onNavigate, compact = false }: { onNavigate?: () => void; compact?: boolean }) {
  const { lang, t } = useLang();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const { read } = useReadChapters();

  const activeChapter = location.pathname.startsWith('/chapter/')
    ? location.pathname.split('/')[2]
    : null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter((chapter) => {
      const haystack = [chapter.title.zh, chapter.title.en, chapter.summary.zh, chapter.summary.en, chapter.subtitle.zh, chapter.subtitle.en]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>('[data-sidebar-active="true"]');
    if (el) {
      const scroller = el.closest('[data-sidebar-scroll]');
      if (scroller) {
        const top = el.offsetTop - scroller.clientHeight / 2 + el.clientHeight;
        scroller.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      }
    }
  }, [activeChapter]);

  const total = chapters.length;
  const done = read.filter((id) => chapters.some((c) => c.id === id)).length;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-line px-4 pb-3 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-faint">{t('toc')}</span>
          <span className="font-mono text-[0.65rem] text-faint">18 CH</span>
        </div>
        <label className="relative block">
          <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className="w-full rounded-lg border border-line bg-soft/60 py-1.5 pl-8 pr-2 text-[0.78rem] text-ink placeholder:text-faint focus:border-brand/50 focus:bg-surface focus:outline-none"
          />
        </label>
        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between text-[0.65rem] text-faint">
            <span className="inline-flex items-center gap-1">
              <BookOpen size={11} /> {t('chaptersDone')}
            </span>
            <span className="font-mono tabular">
              {done}/{total}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full gradient-line transition-all duration-500"
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2.5 py-3" aria-label={t('toc')} data-sidebar-scroll>
        {parts.map((part) => {
          const partChapters = filtered.filter((chapter) => chapter.part === part.id);
          if (!partChapters.length) return null;
          const isClosed = closed[part.id] && !query;
          return (
            <div key={part.id} className="mb-1">
              <button
                type="button"
                onClick={() => setClosed((prev) => ({ ...prev, [part.id]: !prev[part.id] }))}
                aria-expanded={!isClosed}
                className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[0.68rem] font-semibold uppercase tracking-wider text-faint transition hover:text-muted"
              >
                <span className="font-mono text-[0.6rem] text-brand/80">{part.index}</span>
                <span className="flex-1 truncate">{lang === 'en' ? part.title.en : part.title.zh}</span>
                <ChevronDown size={12} className={clsx('transition-transform', isClosed && '-rotate-90')} />
              </button>
              {!isClosed && (
                <ul className="space-y-0.5 pb-1">
                  {partChapters.map((chapter) => {
                    const active = activeChapter === chapter.id;
                    const isRead = read.includes(chapter.id);
                    return (
                      <li key={chapter.id}>
                        <Link
                          to={`/chapter/${chapter.id}`}
                          onClick={onNavigate}
                          data-sidebar-active={active ? 'true' : undefined}
                          aria-current={active ? 'page' : undefined}
                          className={clsx(
                            'group relative flex items-start gap-2.5 rounded-lg py-1.5 pl-3 pr-2 text-[0.8rem] leading-snug transition-all duration-200',
                            active
                              ? 'bg-brand/10 font-semibold text-brand'
                              : 'text-muted hover:bg-soft hover:text-ink',
                          )}
                        >
                          {active && <span className="absolute inset-y-1 left-0 w-0.5 rounded-full bg-brand" />}
                          <span className="mt-0.5 font-mono text-[0.62rem] text-faint">
                            {String(chapter.num).padStart(2, '0')}
                          </span>
                          <span className="flex-1">{lang === 'en' ? chapter.title.en : chapter.title.zh}</span>
                          {isRead ? (
                            <Check size={12} className="mt-0.5 shrink-0 text-success" />
                          ) : (
                            <Circle size={12} className="mt-0.5 shrink-0 text-line group-hover:text-faint" />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {!query && (
          <>
            <div className="mx-2 my-3 hairline" />
            <div className="mb-1 px-2 text-[0.68rem] font-semibold uppercase tracking-wider text-faint">
              {t('navFeatures')}
            </div>
            <ul className="space-y-0.5">
              {featureNav.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[0.8rem] transition',
                        active ? 'bg-brand/10 font-semibold text-brand' : 'text-muted hover:bg-soft hover:text-ink',
                      )}
                    >
                      <Icon name={item.icon} className="h-3.5 w-3.5" />
                      {lang === 'en' ? item.title.en : item.title.zh}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mb-1 mt-4 px-2 text-[0.68rem] font-semibold uppercase tracking-wider text-faint">
              Appendix
            </div>
            <ul className="space-y-0.5">
              {appendixNav.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.letter}>
                    <Link
                      to={item.path}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={clsx(
                        'flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[0.78rem] transition',
                        active ? 'bg-brand/10 font-semibold text-brand' : 'text-muted hover:bg-soft hover:text-ink',
                      )}
                    >
                      <span className="font-mono text-[0.62rem] text-faint">{item.letter}</span>
                      {lang === 'en' ? item.title.en : item.title.zh}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {query && filtered.length === 0 && (
          <p className="px-3 py-6 text-center text-xs text-faint">
            {lang === 'en' ? 'No chapter matched.' : '没有匹配的章节。'}
          </p>
        )}
      </nav>

      {!compact && (
        <div className="border-t border-line px-4 py-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-brand to-brand2 text-[0.6rem] font-bold text-white">
              鱼
            </span>
            <div className="min-w-0 text-[0.68rem] leading-tight text-faint">
              <div className="truncate text-muted">鱼心快跑 · 鱼心</div>
              <div className="truncate">{t('brandSlogan')}</div>
            </div>
          </div>
          <a
            href="https://www.yuxin.run"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-block text-[0.62rem] text-faint underline-offset-2 hover:text-brand hover:underline"
          >
            www.yuxin.run
          </a>
        </div>
      )}
    </div>
  );
}

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <>
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-[17rem] shrink-0 border-r border-line/80 bg-app/50 lg:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label={t('toc')}>
          <button
            type="button"
            aria-label={t('close')}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-sm fade-in"
            onClick={onClose}
          />
          <div className="drawer-enter glass absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col border-r border-line shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-sm font-semibold text-ink">{t('siteName')}</span>
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-line px-2.5 py-1 text-xs text-muted hover:text-ink"
              >
                {t('close')}
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <SidebarContent onNavigate={onClose} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function getSidebarChapterTitle(id: string, lang: 'zh' | 'en') {
  const chapter = chapters.find((c) => c.id === id);
  if (!chapter) return id;
  const part = getPart(chapter.part);
  return `${part ? (lang === 'en' ? part.title.en : part.title.zh) : ''} · ${lang === 'en' ? chapter.title.en : chapter.title.zh}`;
}

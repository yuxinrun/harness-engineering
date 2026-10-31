import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Globe,
  Menu,
  Moon,
  Sun,
} from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '../Logo';
import { Icon } from '../Icon';
import { chapters, parts, siblings, siblingUrl } from '../../content/meta';
import { featureNav, appendixNav } from '../../content/nav';
import { useLang } from '../../lib/i18n';
import { useTheme } from '../../lib/theme';
import { SRC } from '../../content/sources';

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-app/85 backdrop-blur-xl">
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const main = document.getElementById('main-content');
          main?.focus();
          main?.scrollIntoView();
        }}
        className="skip-link"
      >
        {lang === 'en' ? 'Skip to content' : '跳到正文'}
      </a>
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-1.5 px-3 sm:gap-3 sm:px-6">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label={t('menu')}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/70 text-muted transition hover:border-brand/40 hover:text-brand lg:hidden"
        >
          <Menu size={18} />
        </button>

        <Link to="/" className="group flex min-w-0 items-center gap-2.5" aria-label={t('siteName')}>
          <Logo size={34} />
          <span className="min-w-0 leading-none">
            <span className="block truncate text-[0.95rem] font-bold tracking-tight text-ink transition group-hover:text-brand sm:text-base">
              {lang === 'en' ? 'Harness Engineering' : '缰绳工程'}
            </span>
            <span className="mt-1 block truncate font-mono text-[0.58rem] uppercase tracking-[0.18em] text-faint">
              {lang === 'en' ? 'Field Guide' : 'HARNESS · FIELD GUIDE'}
            </span>
          </span>
        </Link>

        <div ref={wrapRef} className="relative ml-2 hidden lg:block">
          <button
            ref={buttonRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
            onMouseEnter={() => {
              cancelClose();
              setOpen(true);
            }}
            onMouseLeave={scheduleClose}
            className={clsx(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition',
              open ? 'bg-brand/10 text-brand' : 'text-muted hover:bg-soft hover:text-ink',
            )}
          >
            {t('navKnowledge')}
            <ChevronDown size={14} className={clsx('transition-transform duration-200', open && 'rotate-180')} />
          </button>

          {open && (
            <div
              ref={panelRef}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="fade-in absolute left-1/2 top-full z-50 mt-2 w-[min(74rem,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-app/95 shadow-2xl backdrop-blur-2xl"
            >
              <div className="grid max-h-[calc(100vh-7rem)] gap-6 overflow-y-auto p-5 xl:grid-cols-[1fr_19rem]">
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-faint">
                      {t('navChapters')} · 18
                    </span>
                    <Link
                      to="/"
                      className="inline-flex items-center gap-1 text-[0.7rem] text-brand hover:text-brand2"
                    >
                      {t('home')} <ArrowUpRight size={12} />
                    </Link>
                  </div>
                  <div className="grid gap-x-6 gap-y-4 sm:grid-cols-2 xl:grid-cols-3">
                    {parts.map((part) => {
                      const partChapters = chapters.filter((chapter) => chapter.part === part.id);
                      return (
                        <div key={part.id}>
                          <div className="mb-1.5 flex items-baseline gap-1.5 border-b border-line/70 pb-1">
                            <span className="font-mono text-[0.6rem] text-brand">{part.index}</span>
                            <span className="text-[0.72rem] font-semibold text-ink">
                              {lang === 'en' ? part.title.en : part.title.zh}
                            </span>
                          </div>
                          <ul className="space-y-0.5">
                            {partChapters.map((chapter) => (
                              <li key={chapter.id}>
                                <Link
                                  to={`/chapter/${chapter.id}`}
                                  className="group flex items-baseline gap-2 rounded-md px-1.5 py-1 text-[0.76rem] leading-snug text-muted transition hover:bg-brand/[0.06] hover:text-brand"
                                >
                                  <span className="font-mono text-[0.58rem] text-faint group-hover:text-brand/70">
                                    {String(chapter.num).padStart(2, '0')}
                                  </span>
                                  <span className="truncate">{lang === 'en' ? chapter.title.en : chapter.title.zh}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-5 border-line xl:border-l xl:pl-5">
                  <div>
                    <div className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-faint">
                      {t('navFeatures')}
                    </div>
                    <ul className="space-y-1">
                      {featureNav.map((item) => (
                        <li key={item.path}>
                          <Link
                            to={item.path}
                            className="group flex gap-2.5 rounded-xl border border-transparent px-2.5 py-2 transition hover:border-line hover:bg-surface"
                          >
                            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                              <Icon name={item.icon} className="h-3.5 w-3.5" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.8rem] font-medium text-ink group-hover:text-brand">
                                {lang === 'en' ? item.title.en : item.title.zh}
                              </span>
                              <span className="block truncate text-[0.66rem] text-faint">
                                {lang === 'en' ? item.short.en : item.short.zh}
                              </span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-faint">
                      Appendix
                    </div>
                    <ul className="grid grid-cols-2 gap-1">
                      {appendixNav.map((item) => (
                        <li key={item.letter}>
                          <Link
                            to={item.path}
                            className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[0.72rem] text-muted transition hover:bg-soft hover:text-brand"
                          >
                            <span className="font-mono text-[0.58rem] text-faint">{item.letter}</span>
                            <span className="truncate">{lang === 'en' ? item.title.en : item.title.zh}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-line bg-soft/60 px-5 py-3">
                <span className="mr-1 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-faint">
                  {t('navSiblings')}
                </span>
                {siblings.map((project) => (
                  <a
                    key={project.id}
                    href={siblingUrl(project.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      'rounded-full px-2 py-0.5 text-[0.68rem] transition',
                      project.current
                        ? 'bg-brand/15 font-semibold text-brand'
                        : 'text-muted hover:bg-surface hover:text-ink',
                    )}
                  >
                    {project.name}
                    {project.current && <span className="ml-1 font-mono text-[0.55rem] uppercase">here</span>}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <div
            className="flex items-center rounded-lg border border-line bg-surface/60 p-0.5"
            role="group"
            aria-label={t('langLabel')}
          >
            <button
              type="button"
              onClick={() => setLang('zh')}
              aria-pressed={lang === 'zh'}
              className={clsx(
                'rounded-md px-2 py-1 text-[0.68rem] font-semibold transition',
                lang === 'zh' ? 'bg-brand text-white shadow-sm' : 'text-faint hover:text-ink',
              )}
            >
              中
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              aria-pressed={lang === 'en'}
              className={clsx(
                'rounded-md px-2 py-1 text-[0.68rem] font-semibold transition',
                lang === 'en' ? 'bg-brand text-white shadow-sm' : 'text-faint hover:text-ink',
              )}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? t('themeLight') : t('themeDark')}
            title={theme === 'dark' ? t('themeLight') : t('themeDark')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/60 text-muted transition hover:border-brand/40 hover:text-brand"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <a
            href={SRC.githubRepo.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('github')}
            title={t('github')}
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-2.5 text-muted transition hover:border-brand/40 hover:text-brand sm:inline-flex"
          >
            <Github size={16} />
            <span className="hidden text-[0.7rem] font-medium xl:inline">GitHub</span>
          </a>

          <span className="hidden h-9 items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-2.5 text-[0.68rem] text-faint xl:inline-flex">
            <Globe size={14} className="text-brand" />
            yuxin.run
          </span>
        </div>
      </div>
    </header>
  );
}

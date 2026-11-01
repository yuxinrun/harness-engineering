import { Link } from 'react-router-dom';
import { Globe, Menu, Moon, Sun } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '../Logo';
import { useLang } from '../../lib/i18n';
import { useTheme } from '../../lib/theme';

export function Header({ onOpenMenu, showMenu }: { onOpenMenu: () => void; showMenu: boolean }) {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();

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
        {showMenu ? (
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label={t('menu')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/70 text-muted transition hover:border-brand/40 hover:text-brand lg:hidden"
          >
            <Menu size={18} />
          </button>
        ) : (
          <Link
            to="/"
            aria-label={t('home')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface/70 text-muted transition hover:border-brand/40 hover:text-brand lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M13 8H4M7.6 4 3.6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        )}

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

          <span className="hidden h-9 items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-2.5 text-[0.68rem] text-faint xl:inline-flex">
            <Globe size={14} className="text-brand" />
            yuxin.run
          </span>
        </div>
      </div>
    </header>
  );
}

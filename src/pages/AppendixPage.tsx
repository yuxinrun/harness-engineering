import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookMarked } from 'lucide-react';
import clsx from 'clsx';
import { BlockRenderer } from '../components/BlockRenderer';
import { Logo } from '../components/Logo';
import { useLang, usePick } from '../lib/i18n';
import { useSetOutline } from '../components/layout/OutlineContext';
import { appendices } from '../content/appendices';
import { getOutline } from '../content/toc';
import { featureNav } from '../content/nav';
import { NotFoundPage } from './NotFoundPage';

export function AppendixPage() {
  const { letter } = useParams();
  const { lang, t } = useLang();
  const pick = usePick();
  const index = appendices.findIndex((entry) => entry.id === (letter ?? '').toLowerCase());
  const entry = index >= 0 ? appendices[index] : undefined;
  const prev = index > 0 ? appendices[index - 1] : undefined;
  const next = index >= 0 && index < appendices.length - 1 ? appendices[index + 1] : undefined;

  const outline = useMemo(() => (entry ? getOutline(`appendix-${entry.id}`, entry.blocks) : []), [entry]);
  useSetOutline(outline);

  useEffect(() => {
    const siteName = lang === 'en' ? 'Harness Engineering Field Guide' : '缰绳工程实战指南';
    document.title = entry ? `${t('appendix')} ${entry.letter} · ${siteName}` : siteName;
    return () => {
      document.title = siteName;
    };
  }, [entry, lang, t]);

  if (!entry) return <NotFoundPage />;

  return (
    <article className="mx-auto max-w-reading px-5 py-10 sm:px-8 lg:py-14">
      <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-[0.72rem] text-faint" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand">
          {t('home')}
        </Link>
        <span>/</span>
        <span className="text-muted">
          {t('appendix')} {entry.letter}
        </span>
      </nav>

      <header>
        <div className="mb-5 flex items-center gap-3">
          <Logo size={40} glow={false} />
          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-faint">
            {t('appendix')}
            <span className="mx-1.5 text-line">/</span>
            <span className="font-mono text-brand">
              {entry.letter} · {index + 1}/{appendices.length}
            </span>
          </div>
        </div>

        <h1 className="text-[1.95rem] font-extrabold leading-[1.18] tracking-tight text-ink sm:text-[2.4rem]">
          <span className="gradient-text mr-2.5 font-mono text-[1.4rem] sm:text-[1.7rem]">{entry.letter}</span>
          {pick(entry.title)}
        </h1>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-muted sm:text-[1.06rem]">{pick(entry.desc)}</p>
      </header>

      <nav
        aria-label={t('appendix')}
        className="reveal mt-6 flex flex-wrap gap-2 border-y border-line py-3"
      >
        {appendices.map((item) => {
          const current = item.id === entry.id;
          return (
            <Link
              key={item.id}
              to={`/appendix/${item.id}`}
              aria-current={current ? 'page' : undefined}
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.74rem] transition',
                current
                  ? 'border-brand/45 bg-brand/[0.08] font-semibold text-brand'
                  : 'border-line bg-surface text-muted hover:border-brand/35 hover:text-brand',
              )}
            >
              <span className="font-mono text-[0.62rem]">{item.letter}</span>
              {pick(item.title)}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4">
        <BlockRenderer blocks={entry.blocks} chapterId={`appendix-${entry.id}`} />
      </div>

      <footer className="mt-12">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-wider text-faint">
            <BookMarked size={12} /> {t('navFeatures')}
          </span>
          {featureNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.74rem] text-muted transition hover:border-brand/40 hover:text-brand"
            >
              {pick(item.title)}
            </Link>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {prev ? (
            <Link
              to={`/appendix/${prev.id}`}
              className="group rounded-2xl border border-line bg-surface/50 p-4 text-left transition hover:border-brand/35 hover:bg-surface"
            >
              <span className="flex items-center gap-1 text-[0.66rem] uppercase tracking-wider text-faint">
                <ArrowLeft size={12} /> {t('appendix')} {prev.letter}
              </span>
              <span className="mt-1 block text-sm font-medium text-ink group-hover:text-brand">
                {pick(prev.title)}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              to={`/appendix/${next.id}`}
              className="group rounded-2xl border border-line bg-surface/50 p-4 text-right transition hover:border-brand/35 hover:bg-surface"
            >
              <span className="flex items-center justify-end gap-1 text-[0.66rem] uppercase tracking-wider text-faint">
                {t('appendix')} {next.letter} <ArrowRight size={12} />
              </span>
              <span className="mt-1 block text-sm font-medium text-ink group-hover:text-brand">
                {pick(next.title)}
              </span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}

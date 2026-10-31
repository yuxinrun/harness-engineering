import { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Circle, Clock, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { BlockRenderer } from '../components/BlockRenderer';
import { Logo } from '../components/Logo';
import { useLang, usePick } from '../lib/i18n';
import { useReadChapters } from '../lib/hooks';
import { useSetOutline } from '../components/layout/OutlineContext';
import { chapterNeighbors, chapters, getChapter, getPart } from '../content/meta';
import { chapterBodies } from '../content/chapterData';
import { getOutline } from '../content/toc';
import { NotFoundPage } from './NotFoundPage';

export function ChapterPage() {
  const { chapterId } = useParams();
  const { lang, t } = useLang();
  const pick = usePick();
  const meta = chapterId ? getChapter(chapterId) : undefined;
  const content = chapterId ? chapterBodies[chapterId] : undefined;
  const { read, toggle } = useReadChapters();

  const outline = useMemo(
    () => (meta && content ? getOutline(meta.id, content.blocks) : []),
    [meta, content],
  );
  useSetOutline(outline);

  useEffect(() => {
    if (meta) {
      document.title = `${pick(meta.title)} · ${lang === 'en' ? 'Harness Engineering Field Guide' : '缰绳工程实战指南'}`;
    }
    return () => {
      document.title = lang === 'en' ? 'Harness Engineering Field Guide' : '缰绳工程实战指南';
    };
  }, [meta, pick, lang]);

  if (!meta) return <NotFoundPage />;

  const part = getPart(meta.part);
  const neighbors = chapterNeighbors(meta.id);
  const isRead = read.includes(meta.id);
  const partProgress = chapters.filter((chapter) => chapter.part === meta.part);
  const partIndex = partProgress.findIndex((chapter) => chapter.id === meta.id) + 1;

  return (
    <article className="mx-auto max-w-reading px-5 py-10 sm:px-8 lg:py-14">
      <nav className="mb-7 flex flex-wrap items-center gap-1.5 text-[0.72rem] text-faint" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-brand">
          {t('home')}
        </Link>
        <span>/</span>
        {part && <span>{lang === 'en' ? part.title.en : part.title.zh}</span>}
        <span>/</span>
        <span className="text-muted">{String(meta.num).padStart(2, '0')}</span>
      </nav>

      <header className="relative">
        <div className="mb-5 flex items-center gap-3">
          <Logo size={40} glow={false} />
          <div className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-faint">
            {part ? (lang === 'en' ? part.title.en : part.title.zh) : ''}
            <span className="mx-1.5 text-line">/</span>
            <span className="font-mono text-brand">
              {String(meta.num).padStart(2, '0')} · {partIndex}/{partProgress.length}
            </span>
          </div>
        </div>

        <h1 className="text-[2rem] font-extrabold leading-[1.18] tracking-tight text-ink sm:text-[2.55rem]">
          {pick(meta.title)}
        </h1>
        <p className="mt-3 text-[1.02rem] leading-relaxed text-muted sm:text-[1.08rem]">{pick(meta.subtitle)}</p>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-[0.7rem]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-2.5 py-1 text-muted">
            <Clock size={12} className="text-brand" /> {meta.minutes} {t('minRead')}
          </span>
          {meta.tags.map((tag, index) => (
            <span key={index} className="rounded-full bg-soft px-2.5 py-1 text-muted">
              {pick(tag)}
            </span>
          ))}
          <button
            type="button"
            onClick={() => toggle(meta.id)}
            aria-pressed={isRead}
            className={clsx(
              'ml-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-medium transition',
              isRead
                ? 'border-success/40 bg-success/10 text-success'
                : 'border-line bg-surface/60 text-muted hover:border-brand/40 hover:text-brand',
            )}
          >
            {isRead ? <CheckCircle2 size={13} /> : <Circle size={13} />}
            {isRead ? t('completed') : t('markRead')}
          </button>
        </div>

        <p className="mt-6 rounded-2xl border border-brand/20 bg-brand/[0.045] px-4 py-3.5 text-[0.9rem] leading-relaxed text-muted">
          <span className="mr-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand">
            {t('inThisChapter')}
          </span>
          {pick(meta.summary)}
        </p>
      </header>

      <div className="mt-4">
        {content ? (
          <BlockRenderer blocks={content.blocks} chapterId={meta.id} />
        ) : (
          <div className="my-10 rounded-2xl border border-dashed border-line p-8 text-center text-sm text-faint">
            {t('loading')}
          </div>
        )}
      </div>

      {content?.sources && content.sources.length > 0 && (
        <section className="mt-12 rounded-2xl border border-line bg-surface/50 p-4 sm:p-5">
          <h2 className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-faint">
            {t('sources')}
          </h2>
          <ul className="space-y-2">
            {content.sources.map((source) => (
              <li key={source.href}>
                <a
                  href={source.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-start gap-1.5 text-[0.82rem] leading-relaxed text-muted hover:text-brand"
                >
                  <ExternalLink size={13} className="mt-1 shrink-0 text-faint group-hover:text-brand" />
                  <span className="underline-offset-2 group-hover:underline">{pick(source.label)}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-10">
        <button
          type="button"
          onClick={() => toggle(meta.id)}
          className={clsx(
            'flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition',
            isRead
              ? 'border-success/35 bg-success/[0.07] text-success'
              : 'border-brand/35 bg-brand/[0.06] text-brand hover:bg-brand/10',
          )}
        >
          {isRead ? <Check size={16} /> : <Circle size={16} />}
          {isRead ? t('unmarkRead') : t('markRead')}
        </button>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {neighbors.prev ? (
            <Link
              to={`/chapter/${neighbors.prev.id}`}
              className="group rounded-2xl border border-line bg-surface/50 p-4 text-left transition hover:border-brand/35 hover:bg-surface"
            >
              <span className="flex items-center gap-1 text-[0.66rem] uppercase tracking-wider text-faint">
                <ArrowLeft size={12} /> {t('prev')}
              </span>
              <span className="mt-1 block text-sm font-medium text-ink group-hover:text-brand">
                {pick(neighbors.prev.title)}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {neighbors.next && (
            <Link
              to={`/chapter/${neighbors.next.id}`}
              className="group rounded-2xl border border-line bg-surface/50 p-4 text-right transition hover:border-brand/35 hover:bg-surface"
            >
              <span className="flex items-center justify-end gap-1 text-[0.66rem] uppercase tracking-wider text-faint">
                {t('next')} <ArrowRight size={12} />
              </span>
              <span className="mt-1 block text-sm font-medium text-ink group-hover:text-brand">
                {pick(neighbors.next.title)}
              </span>
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}

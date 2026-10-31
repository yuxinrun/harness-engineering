import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import { useLang } from '../lib/i18n';

export function NotFoundPage() {
  const { t, lang } = useLang();
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-16 text-center">
      <div className="font-mono text-[5rem] font-black leading-none tracking-tighter text-line">404</div>
      <h1 className="mt-4 text-2xl font-bold text-ink">{t('notFound')}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t('notFoundDesc')}</p>
      <div className="mt-7 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand2"
        >
          <Home size={15} /> {t('backHome')}
        </Link>
        <Link
          to="/chapter/ch01"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-brand/40 hover:text-brand"
        >
          <Compass size={15} /> {lang === 'en' ? 'Start from chapter 1' : '从第一章开始'}
        </Link>
      </div>
    </div>
  );
}

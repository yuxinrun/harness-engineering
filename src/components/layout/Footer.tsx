import { Link } from 'react-router-dom';
import { ArrowUpRight, Github } from 'lucide-react';
import clsx from 'clsx';
import { Logo } from '../Logo';
import { useLang } from '../../lib/i18n';
import { siblings, siblingUrl } from '../../content/meta';
import { SRC } from '../../content/sources';

export function Footer() {
  const { lang, t } = useLang();

  return (
    <footer className="relative mt-16 border-t border-line bg-soft/40">
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.45fr_0.9fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo size={40} />
              <div className="leading-tight">
                <div className="text-base font-bold tracking-tight text-ink">
                  {lang === 'en' ? 'Harness Engineering' : '缰绳工程实战指南'}
                </div>
                <div className="mt-0.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-faint">
                  {lang === 'en' ? 'A field guide' : 'HARNESS · FIELD GUIDE'}
                </div>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed text-muted">
              {lang === 'en'
                ? 'From chatting with AI to engineering the environment it runs in.'
                : '从「和 AI 聊天」到「给 AI 造缰绳」，一套可落地的 Agent 工程方法。'}
            </p>
            <div className="mt-4 text-[0.74rem] leading-relaxed text-faint">
              <div className="text-muted">鱼心快跑 · 鱼心</div>
              <div>{t('brandSlogan')}</div>
              <a
                href="https://www.yuxin.run"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 underline-offset-2 hover:text-brand hover:underline"
              >
                www.yuxin.run <ArrowUpRight size={11} />
              </a>
            </div>
          </div>

          <div>
            <div className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-faint">
              {t('footerSiblings')}
            </div>
            <div className="flex flex-wrap gap-x-1.5 gap-y-1">
              {siblings.map((project) => (
                <a
                  key={project.id}
                  href={siblingUrl(project.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    'group inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[0.7rem] transition',
                    project.current
                      ? 'border-brand/40 bg-brand/10 font-semibold text-brand'
                      : 'border-line bg-surface/50 text-muted hover:border-brand/35 hover:text-brand',
                  )}
                >
                  {project.name}
                  {project.current ? (
                    <span className="font-mono text-[0.55rem] uppercase tracking-wider">here</span>
                  ) : (
                    <ArrowUpRight size={10} className="opacity-0 transition group-hover:opacity-100" />
                  )}
                </a>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.74rem]">
              <Link to="/patterns" className="text-muted hover:text-brand">
                {lang === 'en' ? 'Pattern library' : '模式库'}
              </Link>
              <Link to="/lab" className="text-muted hover:text-brand">
                {lang === 'en' ? 'The lab' : '交互实验室'}
              </Link>
              <Link to="/gates" className="text-muted hover:text-brand">
                {lang === 'en' ? 'Release gates' : '发布门禁'}
              </Link>
              <Link to="/toolkit" className="text-muted hover:text-brand">
                {lang === 'en' ? 'Toolkit' : '工具包'}
              </Link>
              <Link to="/about" className="text-muted hover:text-brand">
                {t('navAbout')}
              </Link>
            </div>
          </div>

          <div className="lg:text-right">
            <div className="mb-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-faint">
              {t('sourceNote')}
            </div>
            <ul className="space-y-1.5 text-[0.72rem]">
              <li>
                <a
                  href={SRC.orangeBook.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted hover:text-brand"
                >
                  《Harness Engineering 橙皮书》 <ArrowUpRight size={10} />
                </a>
              </li>
              <li>
                <a
                  href={SRC.openaiHarness.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted hover:text-brand"
                >
                  OpenAI · Harness engineering <ArrowUpRight size={10} />
                </a>
              </li>
              <li>
                <a
                  href={SRC.anthropicHarnessDesign.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted hover:text-brand"
                >
                  Anthropic · Harness design <ArrowUpRight size={10} />
                </a>
              </li>
              <li>
                <a
                  href={SRC.githubRepo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted hover:text-brand"
                >
                  <Github size={11} /> {t('github')}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-[0.68rem] leading-relaxed text-faint">{t('copyright')}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 text-[0.68rem] text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} 鱼心快跑 · 鱼心. {lang === 'en' ? 'All rights reserved.' : '保留所有权利。'}</span>
          <span className="flex items-center gap-3">
            <span>Built with React · Vite · Tailwind</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="rounded-md border border-line px-2 py-0.5 transition hover:border-brand/40 hover:text-brand"
            >
              {t('backTop')} ↑
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
}

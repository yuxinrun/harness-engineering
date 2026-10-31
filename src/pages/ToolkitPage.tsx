import { ArrowRight, Braces, Lightbulb } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { Icon } from '../components/Icon';
import { CodeBlock } from '../components/CodeBlock';
import { toolkit } from '../content/features';
import { useLang, usePick } from '../lib/i18n';

function scrollToTemplate(id: string) {
  const el = document.getElementById(`tpl-${id}`);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: 'smooth' });
}

export function ToolkitPage() {
  const { t } = useLang();
  const pick = usePick();

  return (
    <div className="px-5 py-9 sm:px-8 lg:py-12">
      <header className="mb-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand">
          <Icon name="wrench" className="h-3 w-3" /> Workbench
        </div>
        <h1 className="text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.3rem]">{t('toolkitTitle')}</h1>
        <p className="mt-2 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{t('toolkitDesc')}</p>

        <nav aria-label={t('toolkitTitle')} className="mt-5 flex flex-wrap gap-2">
          {toolkit.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToTemplate(item.id)}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-[0.75rem] text-muted transition hover:border-brand/40 hover:text-brand"
            >
              <span className="font-mono text-[0.62rem] text-faint">{String(index + 1).padStart(2, '0')}</span>
              {pick(item.title)}
            </button>
          ))}
        </nav>
      </header>

      <aside className="reveal mb-8 rounded-2xl border border-accent/30 bg-accent/[0.06] p-4 sm:p-5">
        <div className="flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
            <Lightbulb size={18} />
          </span>
          <div>
            <div className="mb-1 text-sm font-semibold text-accent">
              {pick({ zh: '先抄，再改，最后删', en: 'Copy, adapt, then delete' })}
            </div>
            <p className="text-[0.9rem] leading-relaxed text-muted">
              {pick({
                zh: '尖括号里的内容是要你替换的空位，不是可以留着的答案。每份模板删掉用不上的字段之后，才真正属于你的项目——一份没人读的规格文件比没有更糟。',
                en: 'Angle brackets mark slots for you to fill, not answers to keep. A template only becomes yours once you delete the fields you will never use — a spec nobody reads is worse than none.',
              })}
            </p>
          </div>
        </div>
      </aside>

      <div className="space-y-10">
        {toolkit.map((item, index) => (
          <section key={item.id} id={`tpl-${item.id}`} className="heading-anchor scroll-mt-24">
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand2/15 text-brand">
                <Icon name={item.icon} className="h-4 w-4" />
              </span>
              <h2 className="text-[1.15rem] font-bold tracking-tight text-ink sm:text-[1.28rem]">
                <span className="mr-2 font-mono text-[0.75rem] text-faint">{String(index + 1).padStart(2, '0')}</span>
                {pick(item.title)}
              </h2>
              <span className="rounded-md bg-soft px-2 py-0.5 font-mono text-[0.62rem] uppercase tracking-wide text-muted">
                {item.lang}
              </span>
            </div>
            <p className="mb-1 max-w-3xl text-[0.9rem] leading-relaxed text-muted">{pick(item.desc)}</p>
            <CodeBlock
              code={item.code}
              lang={item.lang}
              title={{ zh: `${index + 1} / ${toolkit.length} · ${item.title.zh}`, en: `${index + 1} / ${toolkit.length} · ${item.title.en}` }}
            />
          </section>
        ))}
      </div>

      <section className="reveal mt-12 rounded-2xl border border-line bg-surface/60 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Braces size={17} className="text-brand" />
            <h2 className="text-[0.98rem] font-semibold text-ink">
              {pick({ zh: '想知道每份模板为什么长成这样', en: 'Why each template has this shape' })}
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/appendix/a"
              className={clsx(
                'inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/[0.06] px-3.5 py-1.5',
                'text-[0.76rem] font-medium text-brand transition hover:border-brand/50',
              )}
            >
              {pick({ zh: '附录 A · 模板设计说明', en: 'Appendix A · template notes' })}
              <ArrowRight size={12} />
            </Link>
            <Link
              to="/gates"
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[0.76rem] text-muted transition hover:border-brand/40 hover:text-brand"
            >
              {pick({ zh: '配发布门禁逐项检查', en: 'Check them against the gates' })}
              <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, Zap } from 'lucide-react';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { InclusionDiagram } from '../components/charts/Diagrams';
import { chapters, parts, siblings, siblingUrl } from '../content/meta';
import { featureNav } from '../content/nav';
import { SRC } from '../content/sources';
import { useLang, usePick } from '../lib/i18n';

const heroStats = [
  {
    value: '0 行',
    label: { zh: '手写代码 · 100 万行产品', en: 'handwritten lines · 1M-line product' },
    hint: { zh: 'OpenAI Codex 团队，5 个月', en: 'OpenAI Codex team, 5 months' },
    href: SRC.openaiHarness.href,
  },
  {
    value: '1,300+',
    label: { zh: '每周由 agent 产出的 PR', en: 'PRs per week from agents' },
    hint: { zh: 'Stripe Minions · 1,370 工程师', en: 'Stripe Minions · 1,370 engineers' },
    href: SRC.stripeMinions.href,
  },
  {
    value: '+13.7',
    label: { zh: '分：模型不变，只换缰绳', en: 'points: same model, better harness' },
    hint: { zh: 'LangChain · Terminal Bench 2.0', en: 'LangChain · Terminal Bench 2.0' },
    href: SRC.langchainBlog.href,
  },
  {
    value: '$9 → $200',
    label: { zh: '单 agent 与三 agent 的成本差', en: 'single vs three-agent spend' },
    hint: { zh: 'Anthropic · 长时运行应用', en: 'Anthropic · long-running apps' },
    href: SRC.anthropicHarnessDesign.href,
  },
];

const questions = [
  {
    icon: 'brain',
    title: { zh: '为什么我的 agent 总是「看起来做完了」', en: 'Why does my agent always look done?' },
    text: {
      zh: '模型对第一个可行方案有天然偏好。缺少独立验证的反馈回路，它会读一遍自己的代码，然后停在这里。',
      en: 'Models prefer their first plausible answer. Without an independent feedback loop, it rereads its own code and stops.',
    },
    chapter: 'ch07',
  },
  {
    icon: 'layers',
    title: { zh: '为什么提示词写得再好也不稳', en: 'Why better prompts still feel unstable?' },
    text: {
      zh: '提示词管「怎么说」，上下文管「看什么」，Harness 管「在什么环境里跑」。瓶颈通常在最外层。',
      en: 'Prompts control wording, context controls visibility, the harness controls the runtime. The bottleneck is usually the outer layer.',
    },
    chapter: 'ch01',
  },
  {
    icon: 'gauge',
    title: { zh: '为什么加得越多，效果反而越差', en: 'Why does adding more make it worse?' },
    text: {
      zh: '上下文是稀缺资源。规则膨胀会稀释真正重要的约束；模型变强后，旧补丁会变成噪音。',
      en: 'Context is scarce. Rule bloat dilutes what matters, and patches written for old model weaknesses turn into noise.',
    },
    chapter: 'ch17',
  },
];

const tracks = [
  {
    icon: 'sparkles',
    title: { zh: '从程序员转型 Agent 工程', en: 'Programmer → agent engineer' },
    desc: {
      zh: '先建立心智模型，再逐层拆开缰绳，最后从空文件搭出自己的第一套。',
      en: 'Build the mental model, open the harness layer by layer, then assemble your own from an empty file.',
    },
    chapters: ['ch01', 'ch04', 'ch05', 'ch15'],
  },
  {
    icon: 'workflow',
    title: { zh: '已经在用 Agent 的工程师', en: 'Engineers already using agents daily' },
    desc: {
      zh: '跳过概念，直接看别人的数据与打法，再回头补自己缺的反馈层和编排层。',
      en: 'Skip theory: read other teams’ numbers and playbooks, then patch your feedback and orchestration layers.',
    },
    chapters: ['ch09', 'ch11', 'ch13', 'ch18'],
  },
  {
    icon: 'users',
    title: { zh: '要把团队带进 Harness 的人', en: 'People moving a whole team' },
    desc: {
      zh: '关注流水线、门禁与基础设施：好的人类基础设施，才是好的 AI 基础设施。',
      en: 'Focus on pipelines, gates and infrastructure: good human infra is what makes good AI infra.',
    },
    chapters: ['ch12', 'ch08', 'ch16', 'ch17'],
  },
];

export function HomePage() {
  const { lang, t } = useLang();
  const pick = usePick();

  return (
    <div className="px-5 pb-8 pt-8 sm:px-8 lg:pt-12">
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-surface/40 px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

        <div className="relative">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand/[0.07] px-3 py-1 text-[0.68rem] font-medium text-brand">
            <Sparkles size={12} />
            {lang === 'en' ? 'Harness Engineering · the 2026 shift' : '缰绳工程 · 2026 年的工程重心转移'}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Logo size={52} />
            <h1 className="text-[2.1rem] font-black leading-[1.12] tracking-tight text-ink sm:text-[3.1rem]">
              <span className="gradient-text">{lang === 'en' ? 'Harness Engineering' : '给 AI 造缰绳'}</span>
              <span className="mt-1 block text-[1.5rem] font-extrabold text-ink sm:text-[2rem]">
                {lang === 'en' ? 'A field guide, not a manifesto' : '一本可以直接抄作业的实战指南'}
              </span>
            </h1>
          </div>

          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-muted sm:text-[1.1rem]">
            {lang === 'en'
              ? 'The model is the brain. The harness is everything else: instructions, constraints, feedback, memory and orchestration. Eighteen chapters, six real case studies, four interactive tools and twelve release gates — built from the Harness Engineering orange book and primary sources from OpenAI, Anthropic, Stripe, LangChain, Martin Fowler, Mitchell Hashimoto and Kent Beck.'
              : '模型是大脑，Harness 是其余的一切：指令、约束、反馈、记忆、编排。18 章正文、6 个大厂案例、4 个交互工具、12 道发布门禁，全部取材自《Harness Engineering 橙皮书》与 OpenAI、Anthropic、Stripe、LangChain、Martin Fowler、Mitchell Hashimoto、Kent Beck 的一手资料。'}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/chapter/ch01"
              className="group inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-brand2 active:scale-[0.98]"
            >
              {t('startReading')}
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              to="/lab"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-sm font-medium text-muted transition hover:border-brand/40 hover:text-brand active:scale-[0.98]"
            >
              <Zap size={15} />
              {t('openLab')}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-faint">
            <span>18 chapters</span>
            <span>6 parts</span>
            <span>5 patterns</span>
            <span>12 gates</span>
            <span>6 templates</span>
            <span>中 / EN</span>
          </div>
        </div>
      </section>

      {/* ---------- stats ---------- */}
      <section className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {heroStats.map((stat, index) => (
          <a
            key={stat.value}
            href={stat.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: `${index * 40}ms` }}
            className="reveal card card-hover group p-4"
          >
            <div className="gradient-text text-[1.65rem] font-extrabold tracking-tight">{stat.value}</div>
            <div className="mt-1 text-[0.8rem] font-medium leading-snug text-ink">{pick(stat.label)}</div>
            <div className="mt-1.5 text-[0.68rem] text-faint">{pick(stat.hint)}</div>
            <div className="mt-2 inline-flex items-center gap-1 text-[0.65rem] font-medium text-brand opacity-0 transition group-hover:opacity-100">
              {lang === 'en' ? 'Primary source' : '一手来源'} <ArrowRight size={11} />
            </div>
          </a>
        ))}
      </section>

      {/* ---------- questions ---------- */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-[1.6rem]">
          {lang === 'en' ? 'Three questions this guide answers' : '这本指南回答三个问题'}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {questions.map((item) => {
            const chapter = chapters.find((c) => c.id === item.chapter);
            return (
              <Link key={item.chapter} to={`/chapter/${item.chapter}`} className="reveal card card-hover group p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand2/15 text-brand">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-3 text-[0.98rem] font-semibold leading-snug text-ink group-hover:text-brand">
                  {pick(item.title)}
                </h3>
                <p className="mt-2 text-[0.84rem] leading-relaxed text-muted">{pick(item.text)}</p>
                {chapter && (
                  <span className="mt-3 inline-flex items-center gap-1 font-mono text-[0.62rem] uppercase tracking-wider text-faint">
                    Ch {String(chapter.num).padStart(2, '0')} <ArrowRight size={11} />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ---------- inclusion diagram ---------- */}
      <section className="mt-12 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal rounded-2xl border border-line bg-surface/40 p-5">
          <h2 className="mb-1 text-lg font-bold text-ink">
            {lang === 'en' ? 'Prompt ⊂ Context ⊂ Harness' : '提示词 ⊂ 上下文 ⊂ 缰绳'}
          </h2>
          <p className="mb-4 text-[0.85rem] leading-relaxed text-muted">
            {lang === 'en'
              ? 'Three namings for the same awakening. Each one contains the previous and reaches one layer further.'
              : '三次命名是同一群人的三次觉醒。后一层包含前一层，往外再多管一层。'}
          </p>
          <InclusionDiagram />
        </div>
        <div className="reveal card p-5">
          <div className="mb-3 flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-faint">
            <BookOpen size={13} /> {lang === 'en' ? 'How to read this site' : '怎么读这个站'}
          </div>
          <ul className="space-y-2.5 text-[0.85rem] leading-relaxed text-muted">
            <li className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {lang === 'en'
                ? 'Chapters 1–4 build the model. Do not skip them if you arrived from prompt engineering.'
                : '第 1–4 章建立模型。从提示词工程过来的话，别跳。'}
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand2" />
              {lang === 'en'
                ? 'Chapters 5–8 are the five layers, each with copy-ready configuration.'
                : '第 5–8 章逐层拆解，每层都给可直接复制的配置。'}
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {lang === 'en'
                ? 'Chapters 9–14 are case studies with the numbers, not the marketing version.'
                : '第 9–14 章是案例与数据，不是宣传稿。'}
            </li>
            <li className="flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success" />
              {lang === 'en'
                ? 'Chapters 15–18 turn it into practice: your first harness, three playbooks, subtraction and the twelve gates.'
                : '第 15–18 章落地：第一个 Harness、三个场景、减法哲学与十二道门禁。'}
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {featureNav.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-app/60 px-2.5 py-1 text-[0.7rem] text-muted transition hover:border-brand/40 hover:text-brand"
              >
                <Icon name={item.icon} className="h-3 w-3" />
                {pick(item.title)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- parts ---------- */}
      <section className="mt-12">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-ink sm:text-[1.6rem]">
            {lang === 'en' ? 'Six parts, eighteen chapters' : '六篇十八章'}
          </h2>
          <span className="font-mono text-[0.66rem] uppercase tracking-widest text-faint">~215 min</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {parts.map((part) => {
            const partChapters = chapters.filter((chapter) => chapter.part === part.id);
            return (
              <div key={part.id} className="reveal card card-hover flex flex-col p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-[0.7rem] font-bold text-brand">{part.index}</span>
                  <h3 className="text-[1rem] font-semibold text-ink">{pick(part.title)}</h3>
                </div>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-muted">{pick(part.desc)}</p>
                <ul className="mt-3 space-y-1 border-t border-line/70 pt-3">
                  {partChapters.map((chapter) => (
                    <li key={chapter.id}>
                      <Link
                        to={`/chapter/${chapter.id}`}
                        className="group flex items-baseline gap-2 text-[0.78rem] text-muted transition hover:text-brand"
                      >
                        <span className="font-mono text-[0.6rem] text-faint group-hover:text-brand/70">
                          {String(chapter.num).padStart(2, '0')}
                        </span>
                        <span className="flex-1 truncate">{pick(chapter.title)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- tracks ---------- */}
      <section className="mt-12">
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-[1.6rem]">
          {lang === 'en' ? 'Pick your entry point' : '按你的起点进入'}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {tracks.map((track) => (
            <div key={track.title.zh} className="reveal card p-5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon name={track.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-[0.98rem] font-semibold text-ink">{pick(track.title)}</h3>
              <p className="mt-2 text-[0.83rem] leading-relaxed text-muted">{pick(track.desc)}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {track.chapters.map((id) => {
                  const chapter = chapters.find((c) => c.id === id);
                  if (!chapter) return null;
                  return (
                    <Link
                      key={id}
                      to={`/chapter/${id}`}
                      className="flex max-w-[11rem] items-baseline gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.65rem] text-muted transition hover:border-brand/40 hover:text-brand"
                    >
                      <span className="font-mono text-[0.6rem] text-faint">
                        {String(chapter.num).padStart(2, '0')}
                      </span>
                      <span className="truncate">{pick(chapter.title)}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- siblings ---------- */}
      <section className="reveal mt-12 rounded-2xl border border-line bg-soft/40 p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-faint">{t('navSiblings')}</h2>
          <a
            href="https://www.yuxin.run"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.7rem] text-muted underline-offset-2 hover:text-brand hover:underline"
          >
            www.yuxin.run
          </a>
        </div>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((project) => (
            <a
              key={project.id}
              href={siblingUrl(project.id)}
              target="_blank"
              rel="noopener noreferrer"
              className={
                project.current
                  ? 'flex items-center justify-between gap-2 rounded-xl border border-brand/35 bg-brand/[0.07] px-3 py-2.5'
                  : 'group flex items-center justify-between gap-2 rounded-xl border border-line bg-surface/60 px-3 py-2.5 transition hover:border-brand/30 hover:bg-surface'
              }
            >
              <span className="min-w-0">
                <span className={project.current ? 'block truncate text-[0.8rem] font-semibold text-brand' : 'block truncate text-[0.8rem] font-medium text-ink'}>
                  {pick({ zh: project.titleZh, en: project.titleEn })}
                </span>
                <span className="mt-0.5 block truncate font-mono text-[0.62rem] text-faint">{project.name}</span>
              </span>
              {project.current ? (
                <span className="shrink-0 rounded-full bg-brand/15 px-2 py-0.5 font-mono text-[0.55rem] uppercase text-brand">
                  here
                </span>
              ) : (
                <ArrowRight size={14} className="shrink-0 text-faint transition group-hover:translate-x-0.5 group-hover:text-brand" />
              )}
            </a>
          ))}
        </div>
      </section>

      {/* ---------- closing ---------- */}
      <section className="reveal mt-12 overflow-hidden rounded-2xl border border-brand/25 bg-gradient-to-br from-brand/[0.08] via-brand2/[0.05] to-accent/[0.07] px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <h2 className="text-lg font-bold text-ink">
              {lang === 'en' ? 'Harnesses grow, they are not designed' : 'Harness 是长出来的，不是设计出来的'}
            </h2>
            <p className="mt-1.5 max-w-xl text-[0.85rem] leading-relaxed text-muted">
              {lang === 'en'
                ? 'Start with one empty file and one mistake. The Mitchell Hashimoto method fits in an afternoon; the rest is iteration.'
                : '从一个空文件和一次犯错开始。Mitchell Hashimoto 的方法一个下午就能上手，剩下的只是迭代。'}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/chapter/ch15"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-app transition hover:bg-brand"
            >
              {lang === 'en' ? 'Build yours' : '去搭第一个'} <ArrowRight size={15} />
            </Link>
            <Link
              to="/gates"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-brand/40 hover:text-brand"
            >
              {t('gatesTitle')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

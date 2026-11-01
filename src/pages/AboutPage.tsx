import { ArrowUpRight, ExternalLink, Feather } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Icon } from '../components/Icon';
import { chapters, parts, siblings, siblingUrl } from '../content/meta';
import { SRC } from '../content/sources';
import { useLang, usePick } from '../lib/i18n';

const totals = {
  chapters: chapters.length,
  parts: parts.length,
};

export function AboutPage() {
  const { t } = useLang();
  const pick = usePick();

  const principles = [
    {
      icon: 'clipboard-check',
      title: { zh: '每个论断都要有出处', en: 'Every claim carries a citation' },
      text: {
        zh: '数据、案例、结论一律标注来源并在新窗口打开原文。找不到一手出处的说法，宁可不写。',
        en: 'Numbers, cases and conclusions are labelled with a source that opens in a new tab. Claims without a primary source stay out.',
      },
    },
    {
      icon: 'wrench',
      title: { zh: '每个方法都要能上手', en: 'Every method is actionable' },
      text: {
        zh: '代码块可直接复制运行，配置带中文注释，模板留好了要替换的空位。读完不动手等于没读。',
        en: 'Code blocks are copy-paste runnable, configs carry comments, templates leave slots for you. Reading without doing is not reading.',
      },
    },
    {
      icon: 'alert',
      title: { zh: '把代价一起算给你看', en: 'Costs are shown, not hidden' },
      text: {
        zh: 'token 开销、上下文预算、编排复杂度、失败恢复时间都写进正文。缰绳工程不是免费午餐。',
        en: 'Token spend, context budget, orchestration complexity and recovery time are in the body text. Harness engineering is not a free lunch.',
      },
    },
    {
      icon: 'refresh',
      title: { zh: '允许自己被推翻', en: 'Open to being wrong' },
      text: {
        zh: '这条赛道三个月变一次样。示例标注了来源时间，过时是特性，不是缺陷——问题在于你有没有发现它过时。',
        en: 'This field shifts every quarter. Examples are dated by source; staleness is expected. The real failure is not noticing it.',
      },
    },
  ];

  const stack = [
    { name: 'React 18 + TypeScript', note: { zh: '组件化、语义标签、键盘可达', en: 'Componentised, semantic, keyboard reachable' } },
    { name: 'Vite 5', note: { zh: '路由级代码分割 + 图表分包', en: 'Route-level splitting + chart chunk' } },
    { name: 'Tailwind CSS 3.4', note: { zh: 'CSS 变量驱动的明暗主题', en: 'CSS-variable light/dark tokens' } },
    { name: 'Recharts', note: { zh: '预算、对比、失败分布图', en: 'Budget, comparison and failure charts' } },
    { name: 'Prism + Lucide', note: { zh: '六语言高亮 / 图标与独立 Logo', en: 'Six-language highlight / icons and the custom logo' } },
    { name: 'HashRouter + localStorage', note: { zh: 'GitHub Pages 免配置、阅读与实验进度本地保存', en: 'Zero-config GitHub Pages, progress kept locally' } },
  ];

  return (
    <div className="px-5 py-9 sm:px-8 lg:py-12">
      <header className="mb-9">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand2/30 bg-brand2/[0.07] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand2">
          <Icon name="info" className="h-3 w-3" /> {t('navAbout')}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Logo size={56} glow={false} />
          <div>
            <h1 className="text-[1.9rem] font-extrabold tracking-tight text-ink sm:text-[2.3rem]">
              {t('siteName')}
            </h1>
            <p className="mt-1 font-mono text-[0.72rem] text-faint">harness-engineering · {totals.parts} parts · {totals.chapters} chapters</p>
          </div>
        </div>
        <p className="mt-5 max-w-3xl text-[1.02rem] leading-relaxed text-muted">
          {pick({
            zh: '这是一本站在工程视角写的缰绳工程指南：不谈「AI 会不会取代程序员」，只回答三个具体问题——Agent 看不见什么、做错了怎么发现、发现了怎么便宜地纠正。',
            en: 'A field guide written from the engineering side: not "will AI replace programmers", but three concrete questions — what the agent cannot see, how you notice it is wrong, and how cheaply you can correct it.',
          })}
        </p>
      </header>

      <section className="reveal mb-10 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
        <h2 className="mb-3 text-[1.15rem] font-bold tracking-tight text-ink">
          {pick({ zh: '为什么要做这本站', en: 'Why this site exists' })}
        </h2>
        <div className="space-y-3 text-[0.92rem] leading-relaxed text-muted">
          <p>
            {pick({
              zh: '2025 年之后，写代码的人面对的不再是「模型能不能写对」，而是「我怎么让它持续写对」。提示词技巧解决不了它，模型升级也解决不了它——能解决的是模型外面那一层：指令文件、工具边界、反馈回路、记忆结构、编排方式。这一层没有名字会显得很像临时拼凑，于是有了 Harness Engineering。',
              en: 'From 2025 on, the question stopped being "can the model write correct code" and became "how do I keep it correct over time". Prompt tricks cannot answer that, and neither can a model upgrade. What can is the layer outside the model: instruction files, tool boundaries, feedback loops, memory structure and orchestration.',
            })}
          </p>
          <p>
            {pick({
              zh: '《Harness Engineering 橙皮书》把十九个主题讲了一遍，OpenAI、Anthropic、Stripe、LangChain 各自发布了实践长文。这些材料质量很高，但分散在十几个站点里，且默认你已经知道上下文。本站做的事是把它们压缩成一条可读、可查、可动手的路径：',
              en: 'The Harness Engineering orange book covers nineteen themes, and OpenAI, Anthropic, Stripe and LangChain each published long-form practice notes. The material is good but scattered across a dozen sites and assumes context. This site compresses it into one path you can read, look things up in, and act on:',
            })}
          </p>
          <ul className="space-y-2">
            {[
              { zh: `${totals.chapters} 章正文，按认知 / 组件 / 案例 / 实操 / 进阶组织，每章标注来源与延伸`, en: `${totals.chapters} chapters grouped by cognition / components / cases / practice / advanced, each with sources and next steps` },
              { zh: '5 种模式、12 道发布门禁、6 件错误展品、6 套模板、4 个交互工具', en: '5 patterns, 12 release gates, 6 museum exhibits, 6 templates, 4 interactive tools' },
              { zh: '中英双语随时切换，术语保留英文原文，方便直接对照官方文档', en: 'Instant zh/en switching, with technical terms kept in English so they match official docs' },
            ].map((line, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{pick(line)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="reveal mb-10 grid gap-3 sm:grid-cols-2">
        {principles.map((item, i) => (
          <div key={i} className="card card-hover p-4">
            <span className="mb-2.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-brand2/15 text-brand">
              <Icon name={item.icon} className="h-4 w-4" />
            </span>
            <div className="text-sm font-semibold text-ink">{pick(item.title)}</div>
            <p className="mt-1 text-[0.84rem] leading-relaxed text-muted">{pick(item.text)}</p>
          </div>
        ))}
      </section>

      <section className="reveal mb-10 rounded-2xl border border-brand/20 bg-brand/[0.045] p-5 sm:p-6">
        <h2 className="mb-3 flex items-center gap-2 text-[1.15rem] font-bold tracking-tight text-ink">
          <Feather size={17} className="text-brand" />
          {pick({ zh: '关于这个 Logo', en: 'About the logo' })}
        </h2>
        <p className="max-w-3xl text-[0.92rem] leading-relaxed text-muted">
          {pick({
            zh: '图标把四件事压进一条线：两道缰绳（约束的方向感）、一对代码括号（工程而不是玄学）、被拴住的节点（工具调用被边界框住）、一段向前延伸的路径（引导而非阻断）。它是本站专属标识，与「鱼心快跑」品牌 Logo 分开使用——品牌负责识别，图标负责说明这套方法到底是什么。悬停时的微旋转与光晕，是给愿意把鼠标停一下的人的小奖励。',
            en: 'The mark folds four ideas into one line: two reins (direction of constraint), a pair of code brackets (engineering, not mysticism), a tethered node (tool calls held inside boundaries) and a path running forward (guidance, not blocking). It is specific to this site and deliberately separate from the Yuxin Runs brand logo — the brand is recognition, the icon is the argument. The hover glow and slight rotation are a small reward for readers who pause.',
          })}
        </p>
      </section>

      <section className="reveal mb-10">
        <h2 className="mb-3 text-[1.15rem] font-bold tracking-tight text-ink">
          {pick({ zh: '技术栈与实现约定', en: 'Tech stack and conventions' })}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {stack.map((item) => (
            <div key={item.name} className="flex items-start justify-between gap-3 rounded-xl border border-line bg-surface/50 px-4 py-3">
              <div className="min-w-0">
                <div className="font-mono text-[0.8rem] font-semibold text-ink">{item.name}</div>
                <div className="mt-0.5 text-[0.78rem] leading-relaxed text-muted">{pick(item.note)}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.8rem] leading-relaxed text-faint">
          {pick({
            zh: '站点托管在 GitHub Pages，用 hash 路由换取零服务端配置；阅读进度、门禁勾选、实验室参数全部存在 localStorage，不写任何远端数据，也没有埋点。',
            en: 'Hosted on GitHub Pages with hash routing so no server config is needed. Reading progress, gate ticks and lab parameters live in localStorage — no remote writes, no analytics.',
          })}
        </p>
      </section>

      <section className="reveal mb-10 rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
        <h2 className="mb-4 text-[1.15rem] font-bold tracking-tight text-ink">
          {pick({ zh: '作者与品牌', en: 'Author and brand' })}
        </h2>
        <div className="flex flex-wrap items-start gap-5">
          <div className="min-w-[12rem] flex-1">
            <div className="text-[0.92rem] leading-relaxed text-muted">
              {pick({
                zh: '整理者：鱼心。日常写 Agent 工程的笔记，把踩过的坑写成能被别人复用的形状。这里的每一章都会回到一个判断标准：如果你只能记住一件事，应该记住哪件。',
                en: 'Compiled by Yuxin, who writes about agent engineering day to day and turns mistakes into shapes other people can reuse. Every chapter ends with one test: if you could remember only one thing from it, which one?',
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href="https://www.yuxin.run"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/[0.06] px-3.5 py-1.5 text-[0.76rem] font-medium text-brand transition hover:border-brand/50"
              >
                www.yuxin.run <ArrowUpRight size={12} />
              </a>
              <span className="font-mono text-[0.7rem] text-faint">{t('brandSlogan')}</span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-soft/70 px-6 py-5">
            <Logo size={48} glow={false} />
            <span className="text-[0.7rem] text-muted">
              {t('brand')} · {t('brandSub')}
            </span>
            <span className="text-[0.64rem] text-faint">{t('author')}</span>
          </div>
        </div>
      </section>

      <section className="reveal mb-10">
        <h2 className="mb-3 text-[1.15rem] font-bold tracking-tight text-ink">
          {t('footerSiblings')}
        </h2>
        <p className="mb-4 max-w-3xl text-[0.88rem] leading-relaxed text-muted">
          {pick({
            zh: '本站是「鱼心快跑」Agent 工程知识体系里负责「运行环境」的那一块。上下文、评估、可观测、网关等主题各有归属，遇到就跳转，不重复写。',
            en: 'This site owns the "runtime environment" tile of the Yuxin Runs agent-engineering system. Context, evaluation, observability and gateways live in their own sites — we link instead of duplicating.',
          })}
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {siblings.map((project) => (
            <a
              key={project.id}
              href={siblingUrl(project.id)}
              target={project.current ? undefined : '_blank'}
              rel="noopener noreferrer"
              className={
                project.current
                  ? 'flex items-center justify-between gap-2 rounded-xl border border-brand/40 bg-brand/[0.08] px-3.5 py-3'
                  : 'group flex items-center justify-between gap-2 rounded-xl border border-line bg-surface/50 px-3.5 py-3 transition hover:-translate-y-0.5 hover:border-brand/35 hover:shadow-card'
              }
            >
              <span className="min-w-0">
                <span className="block truncate text-[0.82rem] font-medium text-ink">{project.zh}</span>
                <span className="mt-0.5 block truncate font-mono text-[0.64rem] text-faint">{project.name}</span>
              </span>
              {project.current ? (
                <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[0.6rem] font-semibold text-white">
                  {t('currentProject')}
                </span>
              ) : (
                <ArrowUpRight size={14} className="shrink-0 text-faint transition group-hover:text-brand" />
              )}
            </a>
          ))}
        </div>
      </section>

      <section className="reveal rounded-2xl border border-line bg-soft/70 p-5">
        <h2 className="mb-3 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-faint">
          <ExternalLink size={12} /> {t('sourceNote')}
        </h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {[SRC.orangeBook, SRC.openaiHarness, SRC.anthropicHarnessDesign, SRC.stripeMinions, SRC.langchainMiddleware, SRC.mitchell, SRC.beck, SRC.fowler].map(
            (source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-3 rounded-xl border border-line bg-surface px-3.5 py-2.5 transition hover:border-brand/35"
              >
                <span className="text-[0.8rem] leading-snug text-muted group-hover:text-ink">{pick(source.label)}</span>
                <ArrowUpRight size={13} className="mt-0.5 shrink-0 text-faint transition group-hover:text-brand" />
              </a>
            ),
          )}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            to="/chapter/ch01"
            className="inline-flex items-center gap-1.5 rounded-lg border border-brand/35 bg-brand/[0.07] px-3 py-1.5 text-[0.75rem] font-medium text-brand transition hover:bg-brand/10"
          >
            {t('startReading')} <ArrowUpRight size={12} />
          </Link>
        </div>
        <p className="mt-4 text-[0.74rem] leading-relaxed text-faint">{t('copyright')}</p>
      </section>
    </div>
  );
}

import type { SourceRef } from '../lib/types';

export const SRC = {
  openaiHarness: {
    label: { zh: 'OpenAI · Harness engineering', en: 'OpenAI · Harness engineering' },
    href: 'https://openai.com/index/harness-engineering/',
  },
  openaiCodex: {
    label: { zh: 'OpenAI · Codex 文档', en: 'OpenAI · Codex docs' },
    href: 'https://developers.openai.com/codex/',
  },
  openaiCodexLoop: {
    label: { zh: 'OpenAI · Unrolling the Codex agent loop', en: 'OpenAI · Unrolling the Codex agent loop' },
    href: 'https://openai.com/index/unrolling-the-codex-agent-loop/',
  },
  openaiCodexPlatform: {
    label: { zh: 'OpenAI · Codex as a platform', en: 'OpenAI · Codex as a platform' },
    href: 'https://developers.openai.com/blog/codex-as-a-platform',
  },
  openaiCodexRepo: {
    label: { zh: 'GitHub · openai/codex', en: 'GitHub · openai/codex' },
    href: 'https://github.com/openai/codex',
  },
  agentsMd: {
    label: { zh: 'AGENTS.md 开放标准', en: 'AGENTS.md open standard' },
    href: 'https://agents.md/',
  },
  anthropicBuilding: {
    label: { zh: 'Anthropic · Building effective agents', en: 'Anthropic · Building effective agents' },
    href: 'https://www.anthropic.com/engineering/building-effective-agents',
  },
  anthropicContext: {
    label: { zh: 'Anthropic · Effective context engineering', en: 'Anthropic · Effective context engineering' },
    href: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents',
  },
  anthropicHarnessDesign: {
    label: { zh: 'Anthropic · Harness design for long-running apps', en: 'Anthropic · Harness design for long-running apps' },
    href: 'https://www.anthropic.com/engineering/harness-design-long-running-apps',
  },
  anthropicLongRunning: {
    label: { zh: 'Anthropic · Effective harnesses for long-running agents', en: 'Anthropic · Effective harnesses for long-running agents' },
    href: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents',
  },
  anthropicMultiAgent: {
    label: { zh: 'Anthropic · Multi-agent research system', en: 'Anthropic · Multi-agent research system' },
    href: 'https://www.anthropic.com/engineering/multi-agent-research-system',
  },
  anthropicClaudeCode: {
    label: { zh: 'Claude Code 官方文档', en: 'Claude Code documentation' },
    href: 'https://docs.claude.com/en/docs/claude-code/overview',
  },
  anthropicHooks: {
    label: { zh: 'Claude Code · Hooks 参考', en: 'Claude Code · Hooks reference' },
    href: 'https://docs.claude.com/en/docs/claude-code/hooks',
  },
  anthropicBestPractices: {
    label: { zh: 'Anthropic · Claude Code best practices', en: 'Anthropic · Claude Code best practices' },
    href: 'https://www.anthropic.com/engineering/claude-code-best-practices',
  },
  langchainBlog: {
    label: { zh: 'LangChain 官方博客', en: 'LangChain blog' },
    href: 'https://blog.langchain.com/',
  },
  langchainMiddleware: {
    label: { zh: 'LangChain · Middleware 文档', en: 'LangChain · Middleware docs' },
    href: 'https://docs.langchain.com/oss/python/langchain/middleware',
  },
  fowler: {
    label: { zh: 'Martin Fowler · Exploring Gen AI', en: 'Martin Fowler · Exploring Gen AI' },
    href: 'https://martinfowler.com/articles/exploring-gen-ai.html',
  },
  mitchell: {
    label: { zh: 'Mitchell Hashimoto · My AI Adoption Journey', en: 'Mitchell Hashimoto · My AI Adoption Journey' },
    href: 'https://mitchellh.com/writing/my-ai-adoption-journey',
  },
  beck: {
    label: { zh: 'Kent Beck · Augmented Coding', en: 'Kent Beck · Augmented Coding' },
    href: 'https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes',
  },
  tidyFirst: {
    label: { zh: 'Kent Beck · Tidy First?', en: 'Kent Beck · Tidy First?' },
    href: 'https://tidyfirst.substack.com/',
  },
  stripeMinions: {
    label: { zh: 'Stripe · Minions: one-shot coding agents', en: 'Stripe · Minions: one-shot coding agents' },
    href: 'https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents',
  },
  stripeBlog: {
    label: { zh: 'Stripe 工程博客', en: 'Stripe engineering blog' },
    href: 'https://stripe.dev/blog',
  },
  orangeBook: {
    label: { zh: '《Harness Engineering 橙皮书》', en: 'Harness Engineering (orange book)' },
    href: 'https://www.huasheng.ai/orange-books/harness/read/',
  },
  betterAgent: {
    label: { zh: '鱼心快跑 · better-agent', en: 'Yuxin Runs · better-agent' },
    href: 'https://yuxinrun.github.io/better-agent/',
  },
  githubRepo: {
    label: { zh: '本站 GitHub 仓库', en: 'This site on GitHub' },
    href: 'https://github.com/yuxinrun/harness-engineering',
  },
} satisfies Record<string, SourceRef>;

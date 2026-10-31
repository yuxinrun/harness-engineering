import { useEffect, useMemo, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-yaml';
import { Check, Copy } from 'lucide-react';
import { useLang } from '../lib/i18n';
import type { Bi } from '../lib/types';

const langMap: Record<string, string> = {
  ts: 'typescript',
  json: 'json',
  jsonc: 'json',
  bash: 'bash',
  markdown: 'markdown',
  python: 'python',
  yaml: 'yaml',
  text: 'text',
};

const langLabel: Record<string, string> = {
  ts: 'TypeScript',
  json: 'JSON',
  jsonc: 'JSONC',
  bash: 'Bash',
  markdown: 'Markdown',
  python: 'Python',
  yaml: 'YAML',
  text: 'Text',
};

export function CodeBlock({
  code,
  lang = 'text',
  title,
  className,
}: {
  code: string;
  lang?: keyof typeof langMap;
  title?: Bi;
  className?: string;
}) {
  const { lang: uiLang } = useLang();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const html = useMemo(() => {
    const grammar = Prism.languages[langMap[lang] ?? 'text'];
    if (!grammar) return escapeHtml(code);
    return Prism.highlight(code, grammar, langMap[lang]);
  }, [code, lang]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch {
        /* ignore */
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className={`code-panel group relative my-6 ${className ?? ''}`}>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          <span className="truncate font-mono text-[0.72rem] text-slate-300/90">
            {title ? (uiLang === 'en' ? title.en : title.zh) : langLabel[lang] ?? 'Text'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-md bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-slate-400 sm:inline">
            {langLabel[lang] ?? 'Text'}
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label={uiLang === 'en' ? 'Copy code' : '复制代码'}
            className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[0.7rem] text-slate-300 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            <span>{copied ? (uiLang === 'en' ? 'Copied' : '已复制') : uiLang === 'en' ? 'Copy' : '复制'}</span>
          </button>
        </div>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

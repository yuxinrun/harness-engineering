import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Lang } from './types';
import { ui, type UIKey } from './strings';

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

function getInitialLang(): Lang {
  try {
    const saved = localStorage.getItem('he-lang');
    if (saved === 'zh' || saved === 'en') return saved;
    if (navigator.language.toLowerCase().startsWith('en')) return 'en';
  } catch {
    /* ignore */
  }
  return 'zh';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    try {
      localStorage.setItem('he-lang', lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === 'zh' ? 'en' : 'zh')), []);
  const t = useCallback(
    (key: UIKey, vars?: Record<string, string | number>) => {
      const entry = ui[key];
      const text = lang === 'en' ? entry.en : entry.zh;
      if (!vars) return text;
      return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, toggleLang, t }), [lang, setLang, toggleLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}

export function usePick() {
  const { lang } = useLang();
  return useCallback((bi: { zh: string; en: string }) => (lang === 'en' ? bi.en : bi.zh), [lang]);
}

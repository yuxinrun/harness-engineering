import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { OutlineItem } from '../../content/toc';

type OutlineContextValue = {
  items: OutlineItem[];
  setItems: (items: OutlineItem[]) => void;
};

const OutlineContext = createContext<OutlineContextValue | null>(null);

export function OutlineProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OutlineItem[]>([]);
  return <OutlineContext.Provider value={{ items, setItems }}>{children}</OutlineContext.Provider>;
}

export function useOutlineContext() {
  const ctx = useContext(OutlineContext);
  if (!ctx) throw new Error('useOutlineContext must be used inside OutlineProvider');
  return ctx;
}

export function useSetOutline(items: OutlineItem[]) {
  const { setItems } = useOutlineContext();
  const key = JSON.stringify(items);
  useEffect(() => {
    setItems(items);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, setItems]);
}

import type { ChapterContent } from '../lib/types';

const modules = import.meta.glob<{ default: ChapterContent }>('./chapters/ch*.ts', { eager: true });

export const chapterBodies: Record<string, ChapterContent> = {};

for (const [path, mod] of Object.entries(modules)) {
  const match = path.match(/ch\d+/);
  if (match) chapterBodies[match[0]] = mod.default;
}

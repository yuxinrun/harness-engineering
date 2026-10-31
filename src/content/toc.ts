import type { Block, Bi } from '../lib/types';

export type OutlineItem = { id: string; text: Bi; level: 2 | 3 };

export function getBlockId(chapterId: string, index: number, block: Block) {
  if ((block.type === 'h2' || block.type === 'h3') && block.id) return block.id;
  return `${chapterId}-s${index + 1}`;
}

export function getOutline(chapterId: string, blocks: Block[]): OutlineItem[] {
  const items: OutlineItem[] = [];
  blocks.forEach((block, index) => {
    if (block.type === 'h2' || block.type === 'h3') {
      items.push({ id: getBlockId(chapterId, index, block), text: block.text, level: block.type === 'h2' ? 2 : 3 });
    }
  });
  return items;
}

export type Lang = 'zh' | 'en';

export type Bi = { zh: string; en: string };

export type PartId = 'cognition' | 'components' | 'cases' | 'practice' | 'advanced' | 'appendix';

export type ChartKind =
  | 'layers'
  | 'timeline'
  | 'spectrum'
  | 'radar'
  | 'failures'
  | 'orchestration'
  | 'inclusion';

export type SourceRef = { label: Bi; href: string };

export type Block =
  | { type: 'h2'; id?: string; text: Bi }
  | { type: 'h3'; id?: string; text: Bi }
  | { type: 'p'; text: Bi }
  | { type: 'lead'; text: Bi }
  | { type: 'list'; ordered?: boolean; items: Bi[] }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'note' | 'quote'; title?: Bi; text: Bi }
  | { type: 'quote'; text: Bi; cite?: Bi }
  | {
      type: 'code';
      lang: 'ts' | 'json' | 'jsonc' | 'bash' | 'markdown' | 'text' | 'python' | 'yaml';
      title?: Bi;
      code: string;
    }
  | { type: 'table'; head: Bi[]; rows: Bi[][]; caption?: Bi }
  | { type: 'stats'; items: { value: string; label: Bi; hint?: Bi }[] }
  | { type: 'steps'; items: { title: Bi; text: Bi }[] }
  | { type: 'cards'; items: { icon: string; title: Bi; text: Bi }[] }
  | {
      type: 'compare';
      left: { title: Bi; items: Bi[]; tone?: 'good' | 'bad' | 'neutral' };
      right: { title: Bi; items: Bi[]; tone?: 'good' | 'bad' | 'neutral' };
    }
  | { type: 'chart'; chart: ChartKind; title: Bi; note?: Bi }
  | { type: 'sources'; items: SourceRef[] }
  | { type: 'siblings'; title?: Bi; items: string[] };

export type ChapterContent = {
  blocks: Block[];
  sources?: SourceRef[];
};

export type ChapterMeta = {
  id: string;
  num: number;
  part: PartId;
  title: Bi;
  subtitle: Bi;
  summary: Bi;
  minutes: number;
  tags: Bi[];
};

export type PartMeta = {
  id: PartId;
  index: string;
  title: Bi;
  desc: Bi;
};

export type SiblingProject = {
  id: string;
  name: string;
  zh: string;
  en: string;
  titleZh: string;
  titleEn: string;
  current?: boolean;
  featured?: boolean;
};

import type { Bi } from '../lib/types';

export type FeatureNavItem = {
  path: string;
  icon: string;
  title: Bi;
  short: Bi;
};

export const featureNav: FeatureNavItem[] = [
  {
    path: '/patterns',
    icon: 'layers',
    title: { zh: '模式库', en: 'Pattern Library' },
    short: { zh: '五种最常用的 Harness 模式', en: 'Five proven harness patterns' },
  },
  {
    path: '/lab',
    icon: 'gauge',
    title: { zh: '交互实验室', en: 'The Lab' },
    short: { zh: '预算、成熟度、选型、成本四个工具', en: 'Budget, maturity, selection and cost' },
  },
  {
    path: '/gates',
    icon: 'shield-check',
    title: { zh: '发布门禁', en: 'Release Gates' },
    short: { zh: '上线前的 12 项检查', en: 'Twelve pre-ship checks' },
  },
  {
    path: '/museum',
    icon: 'alert',
    title: { zh: '错误博物馆', en: 'Museum of Mistakes' },
    short: { zh: '六个反复踩的坑', en: 'Six recurring failures' },
  },
  {
    path: '/toolkit',
    icon: 'wrench',
    title: { zh: '工具包', en: 'Toolkit' },
    short: { zh: '六套可复制模板', en: 'Six copy-ready templates' },
  },
];

export const appendixNav = [
  { letter: 'A', path: '/appendix/a', title: { zh: '工具包模板合集', en: 'Toolkit templates' } },
  { letter: 'B', path: '/appendix/b', title: { zh: '工具与框架速查', en: 'Tools cheat sheet' } },
  { letter: 'C', path: '/appendix/c', title: { zh: '术语中英对照', en: 'Glossary' } },
  { letter: 'D', path: '/appendix/d', title: { zh: '延伸阅读清单', en: 'Reading list' } },
  { letter: 'E', path: '/appendix/e', title: { zh: '姊妹项目导航', en: 'Sister projects' } },
];

import type { Bi } from './types';

type BiOf = { zh: string; en: string };

export const ui = {
  brand: { zh: '缰绳工程', en: 'Harness Engineering' },
  brandSub: { zh: '实战指南', en: 'Field Guide' },
  siteName: { zh: '缰绳工程实战指南', en: 'Harness Engineering Field Guide' },
  navKnowledge: { zh: '知识体系', en: 'Library' },
  navChapters: { zh: '全部章节', en: 'All chapters' },
  navFeatures: { zh: '实战模块', en: 'Workbench' },
  navSiblings: { zh: '姊妹项目', en: 'Sister projects' },
  navAbout: { zh: '关于本站', en: 'About' },
  langLabel: { zh: '切换语言', en: 'Switch language' },
  themeLabel: { zh: '切换主题', en: 'Toggle theme' },
  themeLight: { zh: '日间模式', en: 'Light mode' },
  themeDark: { zh: '夜间模式', en: 'Dark mode' },
  github: { zh: 'GitHub 仓库', en: 'GitHub repository' },
  menu: { zh: '打开目录', en: 'Open contents' },
  close: { zh: '关闭', en: 'Close' },
  toc: { zh: '章节目录', en: 'Contents' },
  outline: { zh: '本页大纲', en: 'On this page' },
  readingProgress: { zh: '阅读进度', en: 'Reading progress' },
  chaptersDone: { zh: '已读章节', en: 'Chapters read' },
  minRead: { zh: '分钟阅读', en: 'min read' },
  sources: { zh: '来源与延伸阅读', en: 'Sources & further reading' },
  copy: { zh: '复制', en: 'Copy' },
  copied: { zh: '已复制', en: 'Copied' },
  backTop: { zh: '回到顶部', en: 'Back to top' },
  prev: { zh: '上一章', en: 'Previous' },
  next: { zh: '下一章', en: 'Next' },
  home: { zh: '首页', en: 'Home' },
  startReading: { zh: '开始阅读', en: 'Start reading' },
  openLab: { zh: '进入实验室', en: 'Open the lab' },
  viewAll: { zh: '查看全部', en: 'View all' },
  part: { zh: '篇', en: 'Part' },
  currentProject: { zh: '当前项目', en: 'You are here' },
  brandSlogan: { zh: '鱼心快跑，Bug 追不到', en: 'Yuxin Rush, Bugs Gone' },
  author: { zh: '作者：鱼心', en: 'By Yuxin' },
  brandSite: { zh: '品牌官网', en: 'Brand site' },
  copyright: { zh: '内容基于《Harness Engineering 橙皮书》与官方公开资料整理，仅供学习交流。', en: 'Built from the Harness Engineering orange book and public official sources, for learning purposes.' },
  sourceNote: { zh: '来源鸣谢', en: 'Sources' },
  footerNav: { zh: '快速导航', en: 'Quick links' },
  footerSiblings: { zh: '鱼心快跑 · 知识体系', en: 'Yuxin Runs · Knowledge system' },
  reset: { zh: '重置', en: 'Reset' },
  all: { zh: '全部', en: 'All' },
  loading: { zh: '正在加载内容…', en: 'Loading content…' },
  notFound: { zh: '页面走丢了', en: 'Page not found' },
  notFoundDesc: { zh: '这条缰绳没拴住页面。回首页重新出发吧。', en: 'This rein did not catch the page. Head back home and start again.' },
  backHome: { zh: '返回首页', en: 'Back home' },
  searchPlaceholder: { zh: '筛选章节…', en: 'Filter chapters…' },
  new: { zh: '新', en: 'New' },
  interactive: { zh: '可交互', en: 'Interactive' },
  inThisChapter: { zh: '本章要点', en: 'In this chapter' },
  example: { zh: '示例', en: 'Example' },
  avoid: { zh: '反例', en: 'Avoid' },
  good: { zh: '推荐', en: 'Recommended' },
  bad: { zh: '不推荐', en: 'Not recommended' },
  openInNew: { zh: '在新窗口打开', en: 'opens in a new tab' },
  progress: { zh: '进度', en: 'Progress' },
  completed: { zh: '已完成', en: 'Completed' },
  markRead: { zh: '标记本章已读', en: 'Mark chapter as read' },
  unmarkRead: { zh: '取消已读', en: 'Mark as unread' },
  copyTemplate: { zh: '复制模板', en: 'Copy template' },
  copiedTemplate: { zh: '模板已复制', en: 'Template copied' },
  labTitle: { zh: '交互实验室', en: 'The Lab' },
  labDesc: { zh: '四个小工具，帮你把抽象概念变成手上的数字。', en: 'Four small tools that turn abstractions into numbers you can feel.' },
  gatesTitle: { zh: '发布门禁', en: 'Release Gates' },
  gatesDesc: { zh: '上线前逐项勾选。进度只保存在你的浏览器里。', en: 'Tick every gate before shipping. Progress stays in your browser.' },
  museumTitle: { zh: '错误博物馆', en: 'Museum of Mistakes' },
  museumDesc: { zh: '六个反复出现的失败模式。点开看看自己中过几个。', en: 'Six recurring failure modes. Open them and count your scars.' },
  patternsTitle: { zh: '模式库', en: 'Pattern Library' },
  patternsDesc: { zh: '五种最常用、最经得起生产考验的 Harness 模式。', en: 'Five battle-tested harness patterns that cover most production needs.' },
  toolkitTitle: { zh: '工具包', en: 'Toolkit' },
  toolkitDesc: { zh: '六套模板，一键复制，直接放进你的仓库。', en: 'Six copy-ready templates for your repository.' },
  appendix: { zh: '附录', en: 'Appendix' },
  details: { zh: '展开详情', en: 'Show details' },
  collapse: { zh: '收起', en: 'Collapse' },
  yourResult: { zh: '你的结果', en: 'Your result' },
  questions: { zh: '题', en: 'questions' },
  score: { zh: '得分', en: 'Score' },
} satisfies Record<string, BiOf>;

export type UIKey = keyof typeof ui;

const isEnglish = (lang: 'zh' | 'en') => lang === 'en';

export function pick<T extends { zh: string; en: string }>(bi: T, lang: 'zh' | 'en') {
  return isEnglish(lang) ? bi.en : bi.zh;
}

export function interpolate(text: string, vars?: Record<string, string | number>) {
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));
}

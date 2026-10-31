import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useChartColors } from './Diagrams';
import { useLang } from '../../lib/i18n';

const radarData = {
  zh: [
    { dim: '指令质量', baseline: 58, optimized: 88 },
    { dim: '工具设计', baseline: 50, optimized: 84 },
    { dim: '硬约束', baseline: 42, optimized: 80 },
    { dim: '验证反馈', baseline: 38, optimized: 92 },
    { dim: '环境感知', baseline: 35, optimized: 82 },
    { dim: '循环控制', baseline: 45, optimized: 86 },
  ],
  en: [
    { dim: 'Instructions', baseline: 58, optimized: 88 },
    { dim: 'Tools', baseline: 50, optimized: 84 },
    { dim: 'Guardrails', baseline: 42, optimized: 80 },
    { dim: 'Verification', baseline: 38, optimized: 92 },
    { dim: 'Environment', baseline: 35, optimized: 82 },
    { dim: 'Loop control', baseline: 45, optimized: 86 },
  ],
};

export function ComparisonRadar() {
  const { lang } = useLang();
  const colors = useChartColors();
  const data = lang === 'en' ? radarData.en : radarData.zh;

  return (
    <div className="my-7 rounded-2xl border border-line bg-surface/60 p-3 sm:p-4">
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke={colors.grid} />
            <PolarAngleAxis dataKey="dim" tick={{ fill: colors.text, fontSize: 11 }} />
            <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: colors.text, fontSize: 9 }} stroke={colors.grid} />
            <Radar
              name={lang === 'en' ? 'Baseline' : '优化前'}
              dataKey="baseline"
              stroke="#94a3b8"
              fill="#94a3b8"
              fillOpacity={0.18}
              strokeWidth={1.8}
            />
            <Radar
              name={lang === 'en' ? 'Harness tuned' : 'Harness 优化后'}
              dataKey="optimized"
              stroke={colors.brand}
              fill={colors.brand}
              fillOpacity={0.28}
              strokeWidth={2.2}
            />
            <Tooltip
              contentStyle={{
                background: colors.tooltipBg,
                border: `1px solid ${colors.tooltipBorder}`,
                borderRadius: 12,
                fontSize: 12,
                boxShadow: '0 12px 30px -12px rgba(15,23,42,.3)',
              }}
              itemStyle={{ color: colors.text }}
              labelStyle={{ color: colors.text }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-1 flex flex-wrap items-center justify-center gap-4 text-[0.7rem] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          {lang === 'en' ? 'Baseline' : '优化前'}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-brand" />
          {lang === 'en' ? 'Harness tuned' : 'Harness 优化后'}
        </span>
        <span className="text-faint">
          {lang === 'en' ? 'Illustrative capability coverage, not official per-dimension scores' : '能力覆盖度示意，非官方分项得分'}
        </span>
      </div>
    </div>
  );
}

const failures = {
  zh: [
    { name: '自我确认偏差', count: 6, color: '#6366f1' },
    { name: '死循环 Doom Loop', count: 5, color: '#7c3aed' },
    { name: '环境不熟悉', count: 4, color: '#0ea5e9' },
    { name: '时间管理失败', count: 4, color: '#f97316' },
    { name: '快乐路径测试', count: 3, color: '#ec4899' },
    { name: '多智能体错配', count: 3, color: '#10b981' },
  ],
  en: [
    { name: 'Self-confirmation', count: 6, color: '#6366f1' },
    { name: 'Doom loops', count: 5, color: '#7c3aed' },
    { name: 'Unknown environment', count: 4, color: '#0ea5e9' },
    { name: 'Time management', count: 4, color: '#f97316' },
    { name: 'Happy-path tests', count: 3, color: '#ec4899' },
    { name: 'Wrong multi-agent fit', count: 3, color: '#10b981' },
  ],
};

export function FailureBars() {
  const { lang } = useLang();
  const colors = useChartColors();
  const data = lang === 'en' ? failures.en : failures.zh;

  return (
    <div className="my-7 rounded-2xl border border-line bg-surface/60 p-3 sm:p-4">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 8, right: 34, left: 6, bottom: 4 }} barCategoryGap={14}>
            <CartesianGrid stroke={colors.grid} horizontal={false} />
            <XAxis type="number" domain={[0, 7]} tick={{ fill: colors.text, fontSize: 10 }} stroke={colors.grid} />
            <YAxis
              type="category"
              dataKey="name"
              width={128}
              tick={{ fill: colors.text, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(99,102,241,0.06)' }}
              contentStyle={{
                background: colors.tooltipBg,
                border: `1px solid ${colors.tooltipBorder}`,
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: colors.text }}
              formatter={(value) => [value, lang === 'en' ? 'case frequency' : '案例出现频次']}
            />
            <Bar dataKey="count" radius={[0, 8, 8, 0]} isAnimationActive>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
              <LabelList dataKey="count" position="right" fill={colors.text} fontSize={11} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-1 text-center text-[0.7rem] text-faint">
        {lang === 'en'
          ? 'Relative frequency across the public case studies in this guide'
          : '基于本书公开案例中失败模式出现频次的相对统计，非行业抽样'}
      </p>
    </div>
  );
}

import clsx from 'clsx';

const boxStyle = { transformBox: 'fill-box', transformOrigin: 'center' } as const;

/**
 * Animated hero illustration of the site thesis: Prompt ⊂ Context ⊂ Harness.
 * Pure SVG + CSS animations, tinted with the paper-theme brand tokens. Decorative only.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 420"
      className={clsx('h-auto w-full max-w-[26rem] select-none', className)}
      role="img"
      aria-label="Prompt 包含于 Context，Context 包含于 Harness"
      fill="none"
    >
      <defs>
        <linearGradient id="hv-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-brand))" />
          <stop offset="55%" stopColor="rgb(var(--c-brand2))" />
          <stop offset="100%" stopColor="rgb(var(--c-accent))" />
        </linearGradient>
        <linearGradient id="hv-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgb(var(--c-brand) / 0.10)" />
          <stop offset="100%" stopColor="rgb(var(--c-brand2) / 0.04)" />
        </linearGradient>
      </defs>

      {/* outer — Harness */}
      <rect x="20" y="30" width="400" height="360" rx="30" fill="url(#hv-fill)" stroke="url(#hv-edge)" strokeWidth="2.5" />
      {/* orbiting dashed loop */}
      <rect
        x="20"
        y="30"
        width="400"
        height="360"
        rx="30"
        stroke="rgb(var(--c-brand) / 0.5)"
        strokeWidth="1.5"
        strokeDasharray="2 10"
        strokeLinecap="round"
        className="animate-dash"
      />
      <text x="40" y="60" className="hv-label" fill="rgb(var(--c-brand))">HARNESS</text>

      {/* middle — Context */}
      <g className="animate-float" style={boxStyle}>
        <rect x="78" y="96" width="284" height="248" rx="24" fill="rgb(var(--c-surface) / 0.7)" stroke="rgb(var(--c-brand2) / 0.5)" strokeWidth="2" />
        <text x="98" y="124" className="hv-label" fill="rgb(var(--c-brand2))">CONTEXT</text>
      </g>

      {/* inner — Prompt */}
      <g className="animate-float" style={{ ...boxStyle, animationDelay: '-3.2s' }}>
        <rect x="140" y="168" width="160" height="120" rx="18" fill="rgb(var(--c-elevated))" stroke="rgb(var(--c-accent) / 0.6)" strokeWidth="2" />
        <text x="158" y="192" className="hv-label" fill="rgb(var(--c-accent))">PROMPT</text>
        {/* code brackets */}
        <path d="M182 214l-12 12 12 12" stroke="rgb(var(--c-ink))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M258 214l12 12-12 12" stroke="rgb(var(--c-ink))" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M232 208l-16 44" stroke="rgb(var(--c-brand))" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* the agent node, tethered at the harness edge */}
      <g style={boxStyle}>
        <circle cx="372" cy="272" r="16" fill="rgb(var(--c-brand))" opacity="0.16" className="animate-pulseRing" style={boxStyle} />
        <circle cx="372" cy="272" r="9" fill="url(#hv-edge)" />
      </g>

      {/* ⊂ symbols between the layers */}
      <text x="112" y="240" className="hv-set" fill="rgb(var(--c-faint))">⊂</text>
      <text x="170" y="268" className="hv-set" fill="rgb(var(--c-faint))">⊂</text>
    </svg>
  );
}

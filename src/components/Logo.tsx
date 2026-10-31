import { useId } from 'react';
import clsx from 'clsx';

type LogoProps = {
  size?: number;
  className?: string;
  glow?: boolean;
};

export function Logo({ size = 38, className, glow = true }: LogoProps) {
  const id = useId().replace(/:/g, '');
  return (
    <span
      className={clsx(
        'inline-flex shrink-0 items-center justify-center rounded-xl transition-transform duration-300',
        glow && 'hover:drop-shadow-[0_0_18px_rgba(99,102,241,0.55)] hover:-rotate-3 hover:scale-105',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 64 64" width={size} height={size} role="img" aria-label="Harness Engineering logo">
        <defs>
          <linearGradient id={`lg-${id}`} x1="4" y1="4" x2="60" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#4f46e5" />
            <stop offset="0.55" stopColor="#6d5ce7" />
            <stop offset="1" stopColor="#9333ea" />
          </linearGradient>
          <linearGradient id={`rien-${id}`} x1="16" y1="40" x2="48" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="60" height="60" rx="17" fill={`url(#lg-${id})`} />
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="17"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        <path
          d="M22.5 19.5H15.5V44.5H22.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path
          d="M41.5 19.5H48.5V44.5H41.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path
          d="M18.5 38.5C25 38.5 24 25.5 32 25.5C40 25.5 39 38.5 45.5 38.5"
          fill="none"
          stroke={`url(#rien-${id})`}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle cx="18.5" cy="38.5" r="3" fill="#fff" />
        <circle cx="45.5" cy="38.5" r="3" fill="#fff" />
        <circle cx="32" cy="25.5" r="3.6" fill="#fb923c" stroke="#fff" strokeWidth="1.4" />
      </svg>
    </span>
  );
}

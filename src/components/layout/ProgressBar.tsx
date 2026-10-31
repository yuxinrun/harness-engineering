import { useReadingProgress } from '../../lib/hooks';

export function ProgressBar() {
  const progress = useReadingProgress();
  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-16 z-40 h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full gradient-line origin-left transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

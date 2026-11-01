import { useLang } from '../lib/i18n';
import { useTts } from '../lib/TtsContext';

function HeadphonesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.6 10.4V8a5.4 5.4 0 0 1 10.8 0v2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="1.2" y="9.4" width="3.2" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="11.6" y="9.4" width="3.2" height="5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function ListenButton({ chapterId }: { chapterId: string }) {
  const { lang } = useLang();
  const tts = useTts();
  const T = (zh: string, en: string) => (lang === 'en' ? en : zh);

  const reading = tts.chapterId === chapterId && (tts.status === 'playing' || tts.status === 'paused');
  const loading = tts.status === 'loading' && tts.chapterId === chapterId;

  return (
    <button
      type="button"
      onClick={() => tts.playChapter(chapterId)}
      title={tts.supported ? undefined : T('这台设备暂不支持朗读，点一下看说明', 'Read-aloud is unavailable here; click to see why')}
      className={
        reading
          ? 'ml-auto inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-3 py-1 text-[0.7rem] font-semibold text-brand transition'
          : 'ml-auto inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1 text-[0.7rem] font-medium text-muted transition hover:border-brand/40 hover:text-brand'
      }
    >
      <HeadphonesIcon />
      <span>{reading ? T('朗读中', 'Playing') : loading ? T('准备中', 'Preparing') : T('听本章', 'Listen')}</span>
    </button>
  );
}

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Outline } from './Outline';
import { Footer } from './Footer';
import { ProgressBar } from './ProgressBar';
import { BackToTop } from './BackToTop';
import { AudioPlayer } from '../AudioPlayer';
import { useRevealObserver } from '../../lib/hooks';
import { useTts } from '../../lib/TtsContext';

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const tts = useTts();
  const withOutline = /^(\/chapter\/|\/appendix\/)/.test(location.pathname);
  const withSidebar = /^\/chapter\//.test(location.pathname);

  useRevealObserver();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!withSidebar && (tts.status === 'playing' || tts.status === 'paused' || tts.status === 'loading')) {
      tts.stop();
    }
  }, [withSidebar, tts]);

  return (
    <div className="min-h-screen" style={tts.open ? { paddingBottom: 'calc(var(--player-h, 0px) + 1rem)' } : undefined}>
      <Header onOpenMenu={() => setMenuOpen(true)} showMenu={withSidebar} />
      <ProgressBar />

      <div className="mx-auto flex w-full max-w-[1500px] pt-16">
        {withSidebar && <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />}
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 outline-none">
          <div key={location.pathname} className="page-enter">
            <Outlet />
          </div>
        </main>
        {withOutline && <Outline />}
      </div>

      <Footer />
      <BackToTop />
      <AudioPlayer />
    </div>
  );
}

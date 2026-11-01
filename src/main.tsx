import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { LangProvider } from './lib/i18n';
import { ThemeProvider } from './lib/theme';
import { OutlineProvider } from './components/layout/OutlineContext';
import { TtsProvider } from './lib/TtsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <HashRouter>
          <TtsProvider>
            <OutlineProvider>
              <App />
            </OutlineProvider>
          </TtsProvider>
        </HashRouter>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
);

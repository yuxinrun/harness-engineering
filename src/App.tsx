import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { ChapterPage } from './pages/ChapterPage';
import { NotFoundPage } from './pages/NotFoundPage';

const PatternsPage = lazy(() => import('./pages/PatternsPage').then((m) => ({ default: m.PatternsPage })));
const LabPage = lazy(() => import('./pages/LabPage').then((m) => ({ default: m.LabPage })));
const GatesPage = lazy(() => import('./pages/GatesPage').then((m) => ({ default: m.GatesPage })));
const MuseumPage = lazy(() => import('./pages/MuseumPage').then((m) => ({ default: m.MuseumPage })));
const ToolkitPage = lazy(() => import('./pages/ToolkitPage').then((m) => ({ default: m.ToolkitPage })));
const AppendixPage = lazy(() => import('./pages/AppendixPage').then((m) => ({ default: m.AppendixPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));

function Spinner() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <span className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-brand" />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="chapter/:chapterId" element={<ChapterPage />} />
        <Route
          path="patterns"
          element={
            <Suspense fallback={<Spinner />}>
              <PatternsPage />
            </Suspense>
          }
        />
        <Route
          path="lab"
          element={
            <Suspense fallback={<Spinner />}>
              <LabPage />
            </Suspense>
          }
        />
        <Route
          path="gates"
          element={
            <Suspense fallback={<Spinner />}>
              <GatesPage />
            </Suspense>
          }
        />
        <Route
          path="museum"
          element={
            <Suspense fallback={<Spinner />}>
              <MuseumPage />
            </Suspense>
          }
        />
        <Route
          path="toolkit"
          element={
            <Suspense fallback={<Spinner />}>
              <ToolkitPage />
            </Suspense>
          }
        />
        <Route
          path="appendix/:letter"
          element={
            <Suspense fallback={<Spinner />}>
              <AppendixPage />
            </Suspense>
          }
        />
        <Route
          path="about"
          element={
            <Suspense fallback={<Spinner />}>
              <AboutPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

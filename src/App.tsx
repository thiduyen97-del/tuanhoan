/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId } from './types/circulation';
import { Navbar } from './components/Navbar';
import { Page1Intro } from './components/Page1Intro';
import { Page2Explorer } from './components/Page2Explorer';
import { Page3Simulation } from './components/Page3Simulation';
import { LegendModal } from './components/LegendModal';
import { QuizModal } from './components/QuizModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('intro');
  const [isLegendOpen, setIsLegendOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false);

  const handleToggleAudio = () => {
    const nextState = soundManager.toggle();
    setIsAudioOn(nextState);
  };

  // Keyboard navigation shortcuts (1: Intro, 2: Explorer, 3: Simulation)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === '1') setCurrentPage('intro');
      else if (e.key === '2') setCurrentPage('explorer');
      else if (e.key === '3') setCurrentPage('simulation');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased selection:bg-rose-100 selection:text-rose-700">
      {/* Top Bar Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onOpenLegend={() => setIsLegendOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
      />

      {/* Main Learning Pages */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col justify-center">
        {currentPage === 'intro' && (
          <Page1Intro onStart={() => setCurrentPage('explorer')} />
        )}

        {currentPage === 'explorer' && (
          <Page2Explorer onNavigate={(page) => setCurrentPage(page)} />
        )}

        {currentPage === 'simulation' && (
          <Page3Simulation
            onNavigate={(page) => setCurrentPage(page)}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <LegendModal
        isOpen={isLegendOpen}
        onClose={() => setIsLegendOpen(false)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}

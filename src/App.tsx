/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { RenderViewer } from './components/RenderViewer';
import { SchematicView } from './components/SchematicView';
import { FillingSimulationPanel } from './components/FillingSimulationPanel';
import { ComponentBar } from './components/ComponentBar';
import { HotspotDetailModal } from './components/HotspotDetailModal';
import { TechnicalSpecsModal } from './components/TechnicalSpecsModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { SkidComponent, ViewMode } from './types';
import { industrialAudio } from './utils/audioSynth';
import { usePWAInstall } from './utils/usePWAInstall';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [lang, setLang] = useState<'fa' | 'en'>('fa');
  const [viewMode, setViewMode] = useState<ViewMode>('isometric-full');
  const [neonBoost, setNeonBoost] = useState<boolean>(true);
  const [showDimensions, setShowDimensions] = useState<boolean>(true);
  const [showHotspots, setShowHotspots] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedComponent, setSelectedComponent] = useState<SkidComponent | null>(null);
  const [isSpecsOpen, setIsSpecsOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState<boolean>(false);

  // Android PWA installation hook
  const { isInstallable, isInstalled, triggerInstall } = usePWAInstall();

  // Dynamic RTL / LTR based on language
  useEffect(() => {
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Toggle Audio Mute
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    industrialAudio.setMuted(nextMuted);
    if (!nextMuted) {
      industrialAudio.playBeep(660, 0.08);
    }
  };

  // Toggle Language
  const handleToggleLang = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const t = TRANSLATIONS[lang];

  return (
    <div className={`min-h-screen bg-[#020305] text-neutral-100 flex flex-col ${lang === 'fa' ? "font-['Vazirmatn',sans-serif]" : "font-['Plus_Jakarta_Sans',sans-serif]"}`}>
      {/* Top Engineering Control Header */}
      <Header
        viewMode={viewMode}
        onViewModeChange={(mode) => setViewMode(mode)}
        neonBoost={neonBoost}
        onToggleNeonBoost={() => setNeonBoost(!neonBoost)}
        showDimensions={showDimensions}
        onToggleDimensions={() => setShowDimensions(!showDimensions)}
        showHotspots={showHotspots}
        onToggleHotspots={() => setShowHotspots(!showHotspots)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenSpecs={() => setIsSpecsOpen(true)}
        onToggleFullscreen={handleToggleFullscreen}
        isFullscreen={isFullscreen}
        onOpenAndroidInstall={() => setIsAndroidModalOpen(true)}
        lang={lang}
        onToggleLang={handleToggleLang}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 lg:p-6 flex flex-col gap-5">
        {/* Render Viewport Section */}
        <section aria-label="3D Industrial Render Stage">
          {viewMode === 'schematic-pid' ? (
            <SchematicView />
          ) : (
            <RenderViewer
              viewMode={viewMode}
              neonBoost={neonBoost}
              showDimensions={showDimensions}
              showHotspots={showHotspots}
              onSelectComponent={(comp) => setSelectedComponent(comp)}
              selectedComponent={selectedComponent}
              lang={lang}
            />
          )}
        </section>

        {/* Component Selector Bar */}
        <section aria-label="Skid Components Explorer">
          <ComponentBar
            selectedComponent={selectedComponent}
            onSelectComponent={(comp) => setSelectedComponent(comp)}
            lang={lang}
          />
        </section>

        {/* Interactive Digital Filling Scale & LPG Pump Controller */}
        <section aria-label="Filling Process Simulation">
          <FillingSimulationPanel lang={lang} />
        </section>
      </main>

      {/* Footer Details */}
      <footer className="w-full bg-[#050608] border-t border-[#131722] py-4 px-4 text-xs font-mono-tech text-neutral-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
          <div>
            <span className="text-neutral-300 font-bold">{t.footerTitle}</span>
            <span className="text-neutral-600 mx-2">•</span>
            <span>{t.standardsTag}</span>
            <span className="text-neutral-600 mx-2">•</span>
            <span className="text-cyan-400">{t.cyanAccent} (490nm)</span>
          </div>
          <div className="text-neutral-400 flex items-center gap-2">
            <span>{t.footerLighting}</span>
            <span className="text-neutral-600">•</span>
            <button 
              onClick={() => setIsAndroidModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
            >
              {isInstalled ? 'نصب‌شده روی اندروید ✓' : 'نصب روی اندروید (PWA)'}
            </button>
          </div>
        </div>
      </footer>

      {/* Component Detail Modal */}
      <HotspotDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        lang={lang}
      />

      {/* Technical Specifications Modal */}
      <TechnicalSpecsModal
        isOpen={isSpecsOpen}
        onClose={() => setIsSpecsOpen(false)}
        lang={lang}
      />

      {/* Android PWA Installation Modal */}
      <AndroidInstallModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        onInstall={triggerInstall}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
      />
    </div>
  );
}

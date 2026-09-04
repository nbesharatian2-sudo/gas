import React from 'react';
import { 
  Box, 
  Layers, 
  Eye, 
  FileText, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Sparkles,
  Maximize2,
  Smartphone,
  Globe
} from 'lucide-react';
import { ViewMode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  neonBoost: boolean;
  onToggleNeonBoost: () => void;
  showDimensions: boolean;
  onToggleDimensions: () => void;
  showHotspots: boolean;
  onToggleHotspots: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenSpecs: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onOpenAndroidInstall: () => void;
  lang: 'fa' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onViewModeChange,
  neonBoost,
  onToggleNeonBoost,
  showDimensions,
  onToggleDimensions,
  showHotspots,
  onToggleHotspots,
  isMuted,
  onToggleMute,
  onOpenSpecs,
  onToggleFullscreen,
  isFullscreen,
  onOpenAndroidInstall,
  lang,
  onToggleLang,
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <header className="w-full bg-[#07080b] border-b border-[#1c2230] px-3 sm:px-4 py-2.5 sm:py-3 sticky top-0 z-40 select-none">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Title & Technical Tags */}
        <div className="flex items-center justify-between w-full lg:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded border border-cyan-500/40 bg-cyan-950/40 flex items-center justify-center text-cyan-400 shrink-0">
              <Box className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xs sm:text-sm md:text-base font-bold text-neutral-100 tracking-wide">
                  {t.appTitle}
                </h1>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono-tech font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded">
                  {t.renderTag}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 flex items-center gap-2 flex-wrap mt-0.5">
                <span>{t.standardsTag}</span>
                <span className="text-neutral-600 hidden sm:inline">•</span>
                <span className="hidden sm:inline">Ex-d IIB T4 ضدانفجار</span>
                <span className="text-neutral-600">•</span>
                <span className="text-cyan-400/90 font-mono-tech">1.77 MPa (250 PSI)</span>
              </p>
            </div>
          </div>

          {/* Mobile Android PWA quick button */}
          <button
            onClick={onOpenAndroidInstall}
            className="lg:hidden p-1.5 rounded-lg border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex items-center gap-1 text-[11px] font-medium"
            title="قابلیت اجرا روی اندروید"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden xs:inline">اندروید</span>
          </button>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-[#0d1117] border border-[#212634] p-1 rounded-lg w-full sm:w-auto justify-center overflow-x-auto">
          <button
            onClick={() => onViewModeChange('isometric-full')}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'isometric-full'
                ? 'bg-[#1a2333] text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.fullAssemblyView}</span>
          </button>

          <button
            onClick={() => onViewModeChange('scale-detail')}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'scale-detail'
                ? 'bg-[#1a2333] text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.scaleDetailView}</span>
          </button>

          <button
            onClick={() => onViewModeChange('schematic-pid')}
            className={`px-2.5 sm:px-3 py-1.5 rounded text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              viewMode === 'schematic-pid'
                ? 'bg-[#1a2333] text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>{t.schematicPidView}</span>
          </button>
        </div>

        {/* Quick Tooling Toggles & Android Install */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
          {/* Android PWA Install Button (Desktop & Tablet) */}
          <button
            onClick={onOpenAndroidInstall}
            title="نصب اپلیکیشن روی گوشی و تبلت اندروید (PWA)"
            className="px-2.5 py-1.5 rounded border border-cyan-500/50 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm glow-cyan-sm"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{t.installAndroid}</span>
          </button>

          {/* Neon Boost Toggle */}
          <button
            onClick={onToggleNeonBoost}
            title={t.neonBoost}
            className={`px-2.5 py-1.5 rounded border text-xs font-mono-tech transition-colors flex items-center gap-1.5 ${
              neonBoost
                ? 'bg-cyan-950/60 border-cyan-400/80 text-cyan-300 glow-cyan-sm'
                : 'bg-[#121620] border-[#222938] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{t.neonBoost}</span>
          </button>

          {/* CAD Dimensions Toggle */}
          <button
            onClick={onToggleDimensions}
            title={t.cadDimensions}
            className={`px-2.5 py-1.5 rounded border text-xs font-mono-tech transition-colors flex items-center gap-1.5 ${
              showDimensions
                ? 'bg-neutral-800 border-neutral-600 text-neutral-100'
                : 'bg-[#121620] border-[#222938] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>{t.cadDimensions}</span>
          </button>

          {/* Hotspots Toggle */}
          <button
            onClick={onToggleHotspots}
            title={t.callouts}
            className={`px-2.5 py-1.5 rounded border text-xs font-mono-tech transition-colors flex items-center gap-1.5 ${
              showHotspots
                ? 'bg-neutral-800 border-neutral-600 text-neutral-100'
                : 'bg-[#121620] border-[#222938] text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <span>{t.callouts}</span>
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            title={isMuted ? 'فعال‌سازی صدا' : 'بی‌صدا کردن'}
            className="p-1.5 rounded border border-[#222938] bg-[#121620] text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Datasheet modal button */}
          <button
            onClick={onOpenSpecs}
            className="px-2.5 sm:px-3 py-1.5 rounded border border-neutral-700 bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-neutral-300" />
            <span className="hidden sm:inline">{t.datasheet}</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            title="تغییر زبان / Switch Language"
            className="px-2 py-1.5 rounded border border-[#222938] bg-[#121620] text-cyan-300 hover:text-white text-xs font-mono-tech transition-colors flex items-center gap-1"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'fa' ? 'FA' : 'EN'}</span>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            title={t.fullscreen}
            className="p-1.5 rounded border border-[#222938] bg-[#121620] text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

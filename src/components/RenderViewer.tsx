import React, { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Crosshair, 
  Sparkles,
  Search,
  Activity,
  Maximize
} from 'lucide-react';
import { SkidComponent, ViewMode } from '../types';
import { SKID_COMPONENTS } from '../data/skidData';
import { TRANSLATIONS } from '../data/translations';
import fullSkidImg from '../assets/images/lpg_skid_render_1788527548011.jpg';
import closeupImg from '../assets/images/lpg_scale_closeup_1788527565606.jpg';

interface RenderViewerProps {
  viewMode: ViewMode;
  neonBoost: boolean;
  showDimensions: boolean;
  showHotspots: boolean;
  onSelectComponent: (component: SkidComponent) => void;
  selectedComponent: SkidComponent | null;
  lang: 'fa' | 'en';
}

export const RenderViewer: React.FC<RenderViewerProps> = ({
  viewMode,
  neonBoost,
  showDimensions,
  showHotspots,
  onSelectComponent,
  selectedComponent,
  lang,
}) => {
  const t = TRANSLATIONS[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredHotspot, setHoveredHotspot] = useState<SkidComponent | null>(null);

  // Touch pinch-to-zoom tracking for Android
  const touchStartDistRef = useRef<number | null>(null);
  const touchStartZoomRef = useRef<number>(1);
  
  // Loupe / Magnifier tool
  const [loupeActive, setLoupeActive] = useState<boolean>(false);
  const [loupePos, setLoupePos] = useState<{ x: number; y: number; relX: number; relY: number }>({
    x: 0,
    y: 0,
    relX: 0,
    relY: 0,
  });

  const currentImage = viewMode === 'scale-detail' ? closeupImg : fullSkidImg;

  // Reset pan & zoom when view mode switches
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [viewMode]);

  // Haptic feedback helper for Android
  const triggerHaptic = (duration = 15) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(duration);
      } catch {
        // ignore
      }
    }
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (loupeActive) return;
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging && zoom > 1) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }

    if (loupeActive && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const relX = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const relY = Math.max(0, Math.min(100, (y / rect.height) * 100));
      setLoupePos({ x, y, relX, relY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Gestures for Android Phones & Tablets
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      if (zoom > 1) {
        setIsDragging(true);
        setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
      }
    } else if (e.touches.length === 2) {
      // Pinch gesture
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchStartDistRef.current = dist;
      touchStartZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1 && isDragging && zoom > 1) {
      const touch = e.touches[0];
      setPan({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && touchStartDistRef.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchStartDistRef.current;
      const nextZoom = Math.max(1, Math.min(3, touchStartZoomRef.current * factor));
      setZoom(nextZoom);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchStartDistRef.current = null;
  };

  const resetView = () => {
    triggerHaptic(10);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const adjustZoom = (delta: number) => {
    triggerHaptic(12);
    setZoom((prev) => {
      const next = Math.max(1, Math.min(3, prev + delta));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  return (
    <div className="relative w-full bg-[#000000] rounded-xl border border-[#161a24] overflow-hidden select-none flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[620px]">
      {/* Background Radial Ambient Lighting Accent */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: neonBoost 
            ? 'radial-gradient(ellipse at 40% 60%, rgba(0, 229, 255, 0.08) 0%, rgba(0, 0, 0, 0.95) 70%)'
            : 'radial-gradient(ellipse at 50% 50%, rgba(20, 26, 36, 0.4) 0%, rgba(0, 0, 0, 1) 75%)',
        }}
      />

      {/* Engineering Cad Isometric Grid Overlay (Subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 229, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Image Stage with Touch & Mouse support */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`relative w-full h-full max-w-6xl mx-auto flex items-center justify-center p-2 sm:p-4 lg:p-8 touch-none ${
          zoom > 1 ? 'cursor-grab active:cursor-grabbing' : loupeActive ? 'cursor-none' : 'cursor-default'
        }`}
      >
        <div
          className="relative transition-transform duration-100 ease-out"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Photorealistic Render Image with Studio Lighting Effect */}
          <div className="relative group">
            <img
              src={currentImage}
              alt="رندر سه‌بعدی اسکید پرکننده ۲ تنی سیلندر گاز مایع LPG با نورپردازی نئون فیروزه‌ای"
              referrerPolicy="no-referrer"
              className={`w-full max-h-[580px] object-contain rounded-lg transition-all duration-500 ${
                neonBoost ? 'filter drop-shadow-[0_0_35px_rgba(0,229,255,0.45)] brightness-105' : 'filter brightness-100'
              }`}
            />

            {/* Dark Floor Shadow Reflection effect */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-cyan-950/20 blur-xl rounded-full pointer-events-none" />

            {/* CAD Dimensional Annotations Overlay */}
            {showDimensions && viewMode === 'isometric-full' && (
              <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal Length Dimension (4,850 mm) */}
                <div className="absolute bottom-[8%] left-[12%] right-[12%] border-b border-dashed border-cyan-400/60 flex items-center justify-center">
                  <span className="bg-[#050608]/90 text-cyan-300 font-mono-tech text-[10px] sm:text-[11px] px-2 py-0.5 border border-cyan-500/40 rounded -translate-y-1/2">
                    {t.cadLength}
                  </span>
                  <div className="absolute left-0 -top-2 bottom-0 w-px bg-cyan-400" />
                  <div className="absolute right-0 -top-2 bottom-0 w-px bg-cyan-400" />
                </div>

                {/* Vertical Height Dimension (2,400 mm) */}
                <div className="absolute right-[6%] top-[20%] bottom-[20%] border-r border-dashed border-cyan-400/60 flex items-center justify-center">
                  <span className="bg-[#050608]/90 text-cyan-300 font-mono-tech text-[10px] sm:text-[11px] px-2 py-0.5 border border-cyan-500/40 rounded translate-x-1/2 rotate-90">
                    {t.cadHeight}
                  </span>
                  <div className="absolute top-0 -left-2 right-0 h-px bg-cyan-400" />
                  <div className="absolute bottom-0 -left-2 right-0 h-px bg-cyan-400" />
                </div>

                {/* Tank Specification Badge */}
                <div className="absolute top-[18%] left-[34%] bg-[#080c14]/90 border border-neutral-600/80 px-2 py-1 rounded text-[9px] sm:text-[10px] font-mono-tech text-neutral-300 flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-100" />
                  <span>{t.cadTankSpec}</span>
                </div>

                {/* Neon Accent Component Tag */}
                <div className="absolute top-[48%] left-[8%] bg-cyan-950/90 border border-cyan-400/70 px-2 py-1 rounded text-[9px] sm:text-[10px] font-mono-tech text-cyan-300 flex items-center gap-1.5 glow-cyan-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>{t.cadScaleSpec}</span>
                </div>
              </div>
            )}

            {/* Interactive Hotspot Callout Markers */}
            {showHotspots && (
              <div className="absolute inset-0">
                {SKID_COMPONENTS.map((comp) => {
                  const posX = viewMode === 'scale-detail' ? comp.closeupX : comp.xPercent;
                  const posY = viewMode === 'scale-detail' ? comp.closeupY : comp.yPercent;
                  if (posX === undefined || posY === undefined) return null;

                  const isSelected = selectedComponent?.id === comp.id;

                  return (
                    <div
                      key={comp.id}
                      style={{ left: `${posX}%`, top: `${posY}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      {/* Interactive Button with Touch Support */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          triggerHaptic(20);
                          onSelectComponent(comp);
                        }}
                        onMouseEnter={() => setHoveredHotspot(comp)}
                        onMouseLeave={() => setHoveredHotspot(null)}
                        className={`relative group/btn p-2 rounded-full transition-transform duration-300 focus:outline-none ${
                          isSelected ? 'scale-125' : 'hover:scale-115'
                        }`}
                        title={comp.name}
                      >
                        {/* Concentric Glow Pulse Rings */}
                        <span 
                          className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                            comp.hasNeonAccent ? 'bg-cyan-400' : 'bg-neutral-300'
                          }`}
                        />
                        
                        {/* Solid Inner Core */}
                        <span 
                          className={`relative flex items-center justify-center w-6 h-6 rounded-full border shadow-lg ${
                            comp.hasNeonAccent 
                              ? 'bg-cyan-500 border-white text-black font-bold glow-cyan-md' 
                              : 'bg-neutral-800 border-neutral-300 text-neutral-100'
                          }`}
                        >
                          <Crosshair className="w-3.5 h-3.5" />
                        </span>

                        {/* Floating Hotspot Tag Label */}
                        <div 
                          className={`absolute ${lang === 'fa' ? 'right-7' : 'left-7'} top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-mono-tech border backdrop-blur-md transition-all duration-200 pointer-events-none ${
                            isSelected
                              ? 'bg-cyan-900/90 text-cyan-200 border-cyan-400 opacity-100 translate-x-1'
                              : 'bg-[#080a10]/85 text-neutral-300 border-neutral-700/80 opacity-80 group-hover/btn:opacity-100 group-hover/btn:translate-x-1'
                          }`}
                        >
                          {comp.highlightTag}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Loupe / Magnifier Lens Overlay */}
        {loupeActive && (
          <div
            className="absolute pointer-events-none rounded-full border-2 border-cyan-400 overflow-hidden shadow-2xl z-30 glow-cyan-md"
            style={{
              width: '180px',
              height: '180px',
              left: `${loupePos.x - 90}px`,
              top: `${loupePos.y - 90}px`,
              backgroundImage: `url(${currentImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: `${loupePos.relX}% ${loupePos.relY}%`,
              backgroundSize: '450%',
            }}
          >
            {/* Loupe Crosshair */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40">
              <div className="w-full h-px bg-cyan-400" />
              <div className="h-full w-px bg-cyan-400 absolute" />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-black/80 text-cyan-300 font-mono-tech text-[9px]">
              {t.magnify3x}
            </div>
          </div>
        )}
      </div>

      {/* Floating Viewport Controls Toolbar */}
      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2 bg-[#080c14]/90 border border-[#1b2230] backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs font-mono-tech text-neutral-400 z-20">
        {/* Left: Render Spec Telemetry */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold text-neutral-200">{t.iso3dView}</span>
          </div>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-neutral-400">{t.resolution8k}</span>
          <span className="hidden md:inline text-neutral-600">|</span>
          <span className="hidden md:inline text-cyan-400/90 font-medium">{t.neonWavelength}</span>
        </div>

        {/* Right: Zoom & Loupe Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Loupe Toggle */}
          <button
            onClick={() => {
              triggerHaptic(15);
              setLoupeActive(!loupeActive);
            }}
            className={`px-2 py-1 rounded border flex items-center gap-1 transition-colors ${
              loupeActive
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300'
                : 'bg-neutral-800/80 border-neutral-700 text-neutral-300 hover:text-white'
            }`}
            title={t.inspectLoupe}
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.inspectLoupe}</span>
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => adjustZoom(-0.25)}
            disabled={zoom <= 1}
            className="p-1 rounded border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="بزرگنمایی کمتر"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Readout */}
          <span className="px-1 text-[11px] text-cyan-300 font-bold min-w-[38px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          {/* Zoom In */}
          <button
            onClick={() => adjustZoom(0.25)}
            disabled={zoom >= 3}
            className="p-1 rounded border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            title="بزرگنمایی بیشتر"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Reset */}
          {(zoom > 1 || pan.x !== 0 || pan.y !== 0) && (
            <button
              onClick={resetView}
              className="p-1 rounded border border-neutral-700 bg-neutral-800 text-neutral-300 hover:text-white"
              title={t.zoomReset}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Hover Tooltip for Hotspot */}
      {hoveredHotspot && !selectedComponent && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#0d121c]/95 border border-cyan-500/50 rounded-lg p-2.5 shadow-2xl backdrop-blur-md z-30 pointer-events-none flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <div className="text-xs font-bold text-neutral-100 flex items-center gap-2">
              <span>{hoveredHotspot.name}</span>
              {hoveredHotspot.hasNeonAccent && (
                <span className="text-[9px] font-mono-tech px-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
                  {t.cyanAccent}
                </span>
              )}
            </div>
            <div className="text-[11px] text-neutral-400">{t.clickToInspect}</div>
          </div>
        </div>
      )}
    </div>
  );
};

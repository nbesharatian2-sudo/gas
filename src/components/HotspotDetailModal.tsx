import React from 'react';
import { X, CheckCircle2, Shield, Wrench, Sparkles, Cpu } from 'lucide-react';
import { SkidComponent } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HotspotDetailModalProps {
  component: SkidComponent | null;
  onClose: () => void;
  lang: 'fa' | 'en';
}

export const HotspotDetailModal: React.FC<HotspotDetailModalProps> = ({
  component,
  onClose,
  lang,
}) => {
  if (!component) return null;
  const t = TRANSLATIONS[lang];
  const categoryName = t.categories[component.category] || component.category;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#090c14] border border-[#202738] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-[#1b2334] bg-[#0c101a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${
              component.hasNeonAccent 
                ? 'border-cyan-400 bg-cyan-950/60 text-cyan-300 glow-cyan-sm' 
                : 'border-neutral-700 bg-neutral-800 text-neutral-300'
            }`}>
              {component.category === 'Pumping' ? (
                <Cpu className="w-5 h-5" />
              ) : component.category === 'Safety' ? (
                <Shield className="w-5 h-5" />
              ) : (
                <Wrench className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#171f30] text-neutral-300 border border-neutral-700">
                  {categoryName}
                </span>
                {component.hasNeonAccent && (
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/50 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {t.cyanAccent}
                  </span>
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-neutral-100 mt-0.5">
                {component.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Description */}
          <div className="text-xs text-neutral-300 leading-relaxed bg-[#0e131f] border border-[#1d2538] rounded-lg p-3.5">
            {component.description}
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono-tech mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {t.technicalSpecs}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {component.specs.map((item, i) => (
                <div 
                  key={i} 
                  className="bg-[#0b0e17] border border-[#1a2130] p-2.5 rounded-lg flex flex-col justify-between"
                >
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {item.label}
                  </span>
                  <span className="text-xs font-mono-tech font-semibold text-neutral-100 mt-1" dir="ltr">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#1b2334] bg-[#0c101a] flex items-center justify-between text-xs text-neutral-400">
          <span className="font-mono-tech text-[10px] sm:text-[11px]">
            {t.certifiedStandards}
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded border border-neutral-700 bg-neutral-800 text-neutral-200 hover:text-white text-xs transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

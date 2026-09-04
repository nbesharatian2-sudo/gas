import React from 'react';
import { SKID_COMPONENTS } from '../data/skidData';
import { SkidComponent } from '../types';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

interface ComponentBarProps {
  selectedComponent: SkidComponent | null;
  onSelectComponent: (comp: SkidComponent) => void;
  lang: 'fa' | 'en';
}

export const ComponentBar: React.FC<ComponentBarProps> = ({
  selectedComponent,
  onSelectComponent,
  lang,
}) => {
  const t = TRANSLATIONS[lang];

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(15);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="w-full bg-[#080a10] border border-[#161c28] rounded-xl p-3 select-none">
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold tracking-wider text-neutral-300 font-mono-tech">
            {t.componentsExplorer}
          </span>
          <span className="text-[10px] text-neutral-500 font-mono-tech">
            {t.componentsExplorerSub}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {SKID_COMPONENTS.map((comp) => {
          const isSelected = selectedComponent?.id === comp.id;
          const categoryName = t.categories[comp.category] || comp.category;

          return (
            <button
              key={comp.id}
              onClick={() => {
                triggerHaptic();
                onSelectComponent(comp);
              }}
              className={`p-2.5 rounded-lg border text-right transition-all relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md glow-cyan-sm'
                  : 'bg-[#0d121c] border-[#1c2436] text-neutral-300 hover:border-neutral-600 hover:bg-[#121927]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[9px] font-mono-tech uppercase px-1 rounded bg-[#161e30] text-neutral-400 border border-[#242f48]">
                    {categoryName}
                  </span>
                  {comp.hasNeonAccent && (
                    <span 
                      className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse glow-cyan-sm" 
                      title={t.cyanAccent}
                    />
                  )}
                </div>
                <div className="text-xs font-semibold line-clamp-2 leading-snug">
                  {comp.name}
                </div>
              </div>

              <div className="mt-2 pt-1.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono-tech">
                <span className={comp.hasNeonAccent ? 'text-cyan-400' : 'text-neutral-500'}>
                  {comp.hasNeonAccent ? t.cyanAccent : t.steelWhite}
                </span>
                {isSelected && <CheckCircle2 className="w-3 h-3 text-cyan-400" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

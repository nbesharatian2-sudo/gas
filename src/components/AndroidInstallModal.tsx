import React from 'react';
import { Smartphone, Download, X, CheckCircle2, Share2, PlusSquare } from 'lucide-react';
import { industrialAudio } from '../utils/audioSynth';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInstall: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
  onInstall,
  isInstallable,
  isInstalled,
}) => {
  if (!isOpen) return null;

  const handleInstallClick = () => {
    industrialAudio.playBeep(700, 0.1);
    onInstall();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-[#090c14] border border-[#202738] rounded-xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#1b2334] bg-[#0c101a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex items-center justify-center shadow-md glow-cyan-sm">
              <Smartphone className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-100">
                قابلیت اجرا روی گوشی و تبلت اندروید (PWA)
              </h2>
              <span className="text-[11px] text-cyan-400 font-mono-tech">
                Progressive Web App • اجرای مستقل
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs text-neutral-300">
          <div className="flex items-center gap-3 p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-lg">
            <img 
              src="/pwa-192x192.png" 
              alt="LPG Skid Icon" 
              className="w-12 h-12 rounded-xl shadow-md border border-cyan-500/40 object-cover" 
            />
            <div>
              <div className="font-bold text-neutral-100 text-sm">اسکید پرکننده ۲ تنی LPG</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">نسخه استاندارد صنعتی مخصوص موبایل و تبلت</div>
            </div>
          </div>

          {isInstalled ? (
            <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>این اپلیکیشن هم‌اکنون روی دستگاه شما نصب و به‌صورت مستقل فعال است.</span>
            </div>
          ) : (
            <>
              <p className="leading-relaxed">
                این برنامه دارای گواهی وب‌اپلیکیشن پیش‌رونده (PWA) است و می‌توانید آن را بدون نیاز به گوگل‌پلی، مستقیماً مانند یک نرم‌افزار نیتیو اندروید با آیکون اختصاصی روی صفحه اصلی گوشی خود نصب و اجرا کنید:
              </p>

              <div className="space-y-2.5 bg-[#0e131f] border border-[#1c2438] p-3 rounded-lg text-neutral-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-600/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">۱</span>
                  <span><strong>نصب تک‌کلیک:</strong> دکمه سبز رنگ «نصب روی اندروید» زیر را فشار دهید.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-600/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">۲</span>
                  <span><strong>یا از منوی کروم / سامسونگ:</strong> لمس منوی سه نقطه <span className="font-bold text-cyan-300">⁝</span> در گوشه مرورگر و انتخاب <strong>«افزودن به صفحه اصلی» (Add to Home screen)</strong> یا <strong>«نصب برنامه» (Install app)</strong>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-600/40 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">۳</span>
                  <span><strong>اجرای تمام‌صفحه:</strong> پس از نصب، اپلیکیشن با نوار وضعیت تیره و تمام‌صفحه، بدون کادر مرورگر باز می‌شود.</span>
                </div>
              </div>
            </>
          )}

          {/* Features highlight on Android */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded bg-[#0b0e17] border border-[#192234] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>پشتیبانی لمسی و Pinch-to-Zoom</span>
            </div>
            <div className="p-2 rounded bg-[#0b0e17] border border-[#192234] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>حالت آفلاین با Service Worker</span>
            </div>
            <div className="p-2 rounded bg-[#0b0e17] border border-[#192234] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>لرزش هپتیک لمسی در دکمه‌ها</span>
            </div>
            <div className="p-2 rounded bg-[#0b0e17] border border-[#192234] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>پیمایش افقی و عمودی روان</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#1b2334] bg-[#0c101a] flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-300 text-xs hover:text-white transition-colors"
          >
            بستن
          </button>

          {!isInstalled && (
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs shadow-md glow-cyan-sm transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>نصب مستقیم روی اندروید</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

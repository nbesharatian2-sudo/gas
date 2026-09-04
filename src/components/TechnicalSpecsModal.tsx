import React from 'react';
import { X, FileText, CheckCircle, Shield } from 'lucide-react';
import { TECHNICAL_DATASHEET } from '../data/skidData';
import { TRANSLATIONS } from '../data/translations';

interface TechnicalSpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fa' | 'en';
}

export const TechnicalSpecsModal: React.FC<TechnicalSpecsModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#090c14] border border-[#202738] rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        dir={lang === 'fa' ? 'rtl' : 'ltr'}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#1b2334] bg-[#0c101a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border border-cyan-500/40 bg-cyan-950/60 text-cyan-300 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                  DOC # ENG-LPG-2T-REV-3
                </span>
                <span className="text-xs text-neutral-400 font-mono-tech">
                  مدل: {TECHNICAL_DATASHEET.skidModel}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-neutral-100 mt-0.5">
                برگه مشخصات فنی و مهندسی اسکید پرکننده ۲ تنی گاز مایع
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-neutral-700 bg-neutral-800/80 text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 text-xs text-neutral-300 font-mono-tech">
          {/* Section 1: Physical Footprint & Dimensions */}
          <div className="bg-[#0b0e17] border border-[#1b2334] rounded-lg p-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              ۱. ابعاد فیزیکی شاسی و اوزان سازه
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <div className="text-neutral-400 text-[11px]">طول کلی شاسی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.dimensions.length}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">عرض شاسی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.dimensions.width}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">ارتفاع کل:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.dimensions.height}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">مساحت سطح اشغال:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.dimensions.totalSkidArea}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">وزن شاسی خشک:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.weights.dryWeight}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">حداکثر وزن عملیاتی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.weights.maxGrossOperating}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">رنگ‌آمیزی پایه فولادی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">RAL 9003 سفید / RAL 7015 خاکستری</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">اتصال فونداسیون:</div>
                <div className="text-neutral-100 font-bold mt-0.5">۶ عدد پاکت بولت M24</div>
              </div>
            </div>
          </div>

          {/* Section 2: Process Fluid & Pressure Ratings */}
          <div className="bg-[#0b0e17] border border-[#1b2334] rounded-lg p-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              ۲. پارامترهای سیال فرایندی و مخزن تحت فشار
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="text-neutral-400 text-[11px]">سیال عملیاتی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.medium.fluid}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">چگالی کاری مایع:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.medium.operatingDensity}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">استاندارد مخزن:</div>
                <div className="text-neutral-100 font-bold mt-0.5">ASME Boiler & Pressure Vessel Code Sec VIII Div 1</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">متریال بدنه و عدسی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">ورق بویلری کربن استیل نرمالایز SA-516 Gr 70</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">فشار طراحی مخزن:</div>
                <div className="text-neutral-100 font-bold mt-0.5">۱٫۷۷ مگاپاسکال (۲۵۶٫۷ PSI / ۱۷٫۷ بار)</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">فشار آزمون هیدرواستاتیک:</div>
                <div className="text-neutral-100 font-bold mt-0.5">۲٫۶۵ مگاپاسکال (۳۸۴٫۳ PSI)</div>
              </div>
            </div>
          </div>

          {/* Section 3: Pumping & Filling Throughput */}
          <div className="bg-[#0b0e17] border border-[#1b2334] rounded-lg p-4">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              ۳. عملکرد پمپاژ، توزین و دبی شارژ سیلندر
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <div className="text-neutral-400 text-[11px]">مدت‌زمان پرکنی سیلندر ۲ کیلویی:</div>
                <div className="text-cyan-300 font-bold mt-0.5">{TECHNICAL_DATASHEET.throughput.cycleTime2kg}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">بازده ساعتی هر نازل:</div>
                <div className="text-cyan-300 font-bold mt-0.5">{TECHNICAL_DATASHEET.throughput.hourlyYield}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">دقت تفکیک باسکول دیجیتال:</div>
                <div className="text-cyan-300 font-bold mt-0.5">{TECHNICAL_DATASHEET.throughput.accuracy}</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">کلاس ضدانفجار الکتریکی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">Ex d IIB T4 Gb (محیط ضدحریق زون ۱)</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">توان موتور پمپ اصلی:</div>
                <div className="text-neutral-100 font-bold mt-0.5">۳٫۰ کیلووات، ۴۰۰ ولت سه‌فاز، ۱۴۵۰ RPM</div>
              </div>
              <div>
                <div className="text-neutral-400 text-[11px]">تغذیه هوای فشرده ابزاردقیق:</div>
                <div className="text-neutral-100 font-bold mt-0.5">{TECHNICAL_DATASHEET.powerSupply.instrumentAir}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1b2334] bg-[#0c101a] flex items-center justify-between">
          <span className="text-[10px] sm:text-[11px] font-mono-tech text-neutral-500">
            ENGINEERING SCHEMATIC ARCHIVE • CERTIFICATE VALIDATED
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold border border-neutral-600 transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};

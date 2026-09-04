import React, { useState } from 'react';
import { ShieldCheck, Info } from 'lucide-react';

interface SchematicNode {
  id: string;
  tag: string;
  title: string;
  desc: string;
  x: number;
  y: number;
  type: 'tank' | 'pump' | 'valve' | 'scale' | 'cylinder' | 'instrument';
}

const NODES: SchematicNode[] = [
  {
    id: 'tk1',
    tag: 'TK-101',
    title: 'مخزن ذخیره افقی ۲ تنی گاز مایع',
    desc: 'ظرفیت آبی ۴,۷۶۰ لیتر، فولاد SA-516 Gr 70، فشار طراحی ۱٫۷۷ مگاپاسکال. دارای دو شیر اطمینان دوبل PSV-101A/B با تنظیم ۱٫۷۲ MPa.',
    x: 120,
    y: 200,
    type: 'tank',
  },
  {
    id: 'esv1',
    tag: 'ESV-101',
    title: 'شیر قطع اضطراری فرایند (ESD)',
    desc: 'شیر توپی ضدحریق پنوماتیک با فنر برگشت (Fail-Closed) جهت قطع سریع خط در مواقع بحرانی.',
    x: 290,
    y: 200,
    type: 'valve',
  },
  {
    id: 'str1',
    tag: 'STR-101',
    title: 'استرینر مکش نوع Y',
    desc: 'صافی توری استیل ضدزنگ مش ۴۰ جهت محافظت از پره‌های پمپ در برابر ذرات معلق و رسوبات.',
    x: 380,
    y: 200,
    type: 'instrument',
  },
  {
    id: 'pmp1',
    tag: 'P-101',
    title: 'پمپ اصلی جابجایی مثبت انتقال گاز مایع',
    desc: 'پمپ پره‌ای کشویی ضدانفجار Ex-d IIB T4 با حلقه نئون فیروزه‌ای و مسیر بای‌پاس فشار تفاضلی پیوسته.',
    x: 480,
    y: 200,
    type: 'pump',
  },
  {
    id: 'byp1',
    tag: 'PRV-102',
    title: 'شیر رگولاتور بای‌پاس تفاضلی',
    desc: 'حلقه برگشت به مخزن جهت جلوگیری از پدیده قفل گاز و اضافه‌فشار در زمان قطع موقت نازل.',
    x: 480,
    y: 90,
    type: 'valve',
  },
  {
    id: 'sol1',
    tag: 'XV-102',
    title: 'شیر برقی پنوماتیک قطع پرکنی',
    desc: 'شیر برقی دوراهه سریع دومرحله‌ای متصل مستقیم به میکروکنترلر باسکول جهت چکه‌گیری دقیق وزن.',
    x: 640,
    y: 200,
    type: 'valve',
  },
  {
    id: 'scl1',
    tag: 'WT-101',
    title: 'سکوی باسکول دیجیتال پرکنی سیلندر',
    desc: 'باسکول ذاتاً ایمن Ex-ia با لودسل استیل، نمایشگر فیروزه‌ای پرنور و کلمپ هوای فشرده نازل.',
    x: 770,
    y: 200,
    type: 'scale',
  },
  {
    id: 'cyl1',
    tag: 'CYL-2KG',
    title: 'سیلندر پرتابل ۲ کیلوگرمی با حلقه نئون',
    desc: 'متصل به کوپلینگ خشک ضدچکه. دارای حلقه نئون فیروزه‌ای ایمنی در طوقه و دستگیره.',
    x: 900,
    y: 200,
    type: 'cylinder',
  },
];

export const SchematicView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<SchematicNode | null>(NODES[0]);

  return (
    <div className="w-full bg-[#000000] border border-[#161a24] rounded-xl p-4 lg:p-6 text-neutral-200 min-h-[500px] flex flex-col justify-between" dir="rtl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#1c2230] pb-3 mb-3 gap-2">
        <div className="flex items-center gap-2 font-mono-tech text-xs flex-wrap">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span className="font-bold text-neutral-100 tracking-wide">
            دیاگرام خطوط لوله و ابزاردقیق (P&ID) فرآیند پرکنی اسکید گاز مایع
          </span>
          <span className="text-neutral-500">|</span>
          <span className="text-cyan-400/80" dir="ltr">DWG NO: LPG-SKID-2026-001</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono-tech text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>اینترلاک‌های ایمنی استاندارد NFPA 58 / EN 12542 فعال</span>
        </div>
      </div>

      {/* SVG Diagram Canvas */}
      <div className="w-full overflow-x-auto py-4" dir="ltr">
        <svg
          viewBox="0 0 1020 320"
          className="w-full min-w-[780px] h-auto select-none"
        >
          <defs>
            {/* Cyan glowing drop-shadow filter */}
            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Cyan flow animation dash */}
            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#00e5ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Liquid LPG Main Line (From Tank to Cylinder) */}
          <path
            d="M 190 200 L 840 200"
            stroke="#1e293b"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M 190 200 L 840 200"
            stroke="url(#pipeGrad)"
            strokeWidth="3"
            strokeDasharray="8 8"
            className="animate-pulse"
          />

          {/* Bypass Line back to Tank */}
          <path
            d="M 520 180 L 520 90 L 190 90 L 190 160"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          <text x="320" y="80" fill="#38bdf8" fontSize="10" fontFamily="monospace" textAnchor="middle">
            VAPOR / BYPASS RETURN LINE (SCH 80)
          </text>

          {/* Vapor purge line from filling nozzle */}
          <path
            d="M 770 170 L 770 120 L 520 120"
            fill="none"
            stroke="#0ea5e9"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            opacity="0.5"
          />

          {/* Pressure Relief Valves atop Tank */}
          <path d="M 100 130 L 100 80" stroke="#64748b" strokeWidth="3" />
          <path d="M 140 130 L 140 80" stroke="#64748b" strokeWidth="3" />
          <circle cx="100" cy="70" r="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
          <text x="100" y="73" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle">PSV</text>
          <circle cx="140" cy="70" r="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="2" />
          <text x="140" y="73" fill="#f43f5e" fontSize="7" fontWeight="bold" textAnchor="middle">PSV</text>

          {/* Tank Graphic (TK-101) */}
          <g 
            onClick={() => setSelectedNode(NODES[0])}
            className="cursor-pointer group"
          >
            <rect
              x="50"
              y="130"
              width="140"
              height="140"
              rx="24"
              fill="#0b101b"
              stroke={selectedNode?.id === 'tk1' ? '#00e5ff' : '#475569'}
              strokeWidth="2"
              className="transition-colors"
            />
            {/* Level indicator inside tank */}
            <rect x="58" y="170" width="124" height="92" rx="16" fill="#0284c7" opacity="0.25" />
            <line x1="58" y1="170" x2="182" y2="170" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />
            <text x="120" y="195" fill="#f8fafc" fontSize="11" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              TK-101
            </text>
            <text x="120" y="215" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              2-TON LPG TANK
            </text>
            <text x="120" y="230" fill="#38bdf8" fontSize="8" fontFamily="monospace" textAnchor="middle">
              LEVEL: 68% (1.28 MPa)
            </text>
          </g>

          {/* ESV-101 Emergency Shut-off Valve */}
          <g
            onClick={() => setSelectedNode(NODES[1])}
            className="cursor-pointer group"
          >
            <polygon
              points="270,185 290,200 270,215"
              fill="#f43f5e"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <polygon
              points="310,185 290,200 310,215"
              fill="#f43f5e"
              stroke="#cbd5e1"
              strokeWidth="1"
            />
            <circle cx="290" cy="180" r="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="290" y="235" fill="#f43f5e" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ESV-101
            </text>
          </g>

          {/* Strainer STR-101 */}
          <g
            onClick={() => setSelectedNode(NODES[2])}
            className="cursor-pointer group"
          >
            <circle
              cx="380"
              cy="200"
              r="16"
              fill="#0f172a"
              stroke={selectedNode?.id === 'str1' ? '#00e5ff' : '#64748b'}
              strokeWidth="2"
            />
            <line x1="372" y1="192" x2="388" y2="208" stroke="#94a3b8" strokeWidth="2" />
            <line x1="372" y1="208" x2="388" y2="192" stroke="#94a3b8" strokeWidth="2" />
            <text x="380" y="235" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              STR-101
            </text>
          </g>

          {/* Pump P-101 (With Glowing Cyan Ring) */}
          <g
            onClick={() => setSelectedNode(NODES[3])}
            className="cursor-pointer group"
          >
            {/* Pump body circle */}
            <circle
              cx="480"
              cy="200"
              r="34"
              fill="#090d16"
              stroke={selectedNode?.id === 'pmp1' ? '#00e5ff' : '#00e5ff'}
              strokeWidth="3"
              filter="url(#cyanGlow)"
            />
            <polygon
              points="468,175 504,200 468,225"
              fill="#00e5ff"
              opacity="0.8"
            />
            <text x="480" y="195" fill="#000000" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              P-101
            </text>
            <text x="480" y="250" fill="#00e5ff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              PUMP [CYAN]
            </text>
          </g>

          {/* Bypass PRV-102 */}
          <g
            onClick={() => setSelectedNode(NODES[4])}
            className="cursor-pointer group"
          >
            <polygon points="465,80 480,90 465,100" fill="#0284c7" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="495,80 480,90 495,100" fill="#0284c7" stroke="#cbd5e1" strokeWidth="1" />
            <text x="480" y="70" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">
              PRV-102
            </text>
          </g>

          {/* Filling Solenoid XV-102 */}
          <g
            onClick={() => setSelectedNode(NODES[5])}
            className="cursor-pointer group"
          >
            <polygon points="625,190 640,200 625,210" fill="#06b6d4" stroke="#cbd5e1" strokeWidth="1" />
            <polygon points="655,190 640,200 655,210" fill="#06b6d4" stroke="#cbd5e1" strokeWidth="1" />
            <rect x="634" y="174" width="12" height="12" fill="#082f49" stroke="#06b6d4" strokeWidth="1.5" />
            <text x="640" y="235" fill="#06b6d4" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              XV-102
            </text>
          </g>

          {/* Digital Scale WT-101 */}
          <g
            onClick={() => setSelectedNode(NODES[6])}
            className="cursor-pointer group"
          >
            <rect
              x="730"
              y="180"
              width="80"
              height="45"
              rx="6"
              fill="#090d16"
              stroke={selectedNode?.id === 'scl1' ? '#00e5ff' : '#38bdf8'}
              strokeWidth="2"
              filter="url(#cyanGlow)"
            />
            <text x="770" y="200" fill="#00e5ff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              SCALE WT-101
            </text>
            <text x="770" y="215" fill="#67e8f9" fontSize="8" fontFamily="monospace" textAnchor="middle">
              DIGITAL TARE
            </text>
          </g>

          {/* 2kg Gas Cylinder */}
          <g
            onClick={() => setSelectedNode(NODES[7])}
            className="cursor-pointer group"
          >
            <rect
              x="875"
              y="160"
              width="50"
              height="75"
              rx="12"
              fill="#090d16"
              stroke={selectedNode?.id === 'cyl1' ? '#00e5ff' : '#00e5ff'}
              strokeWidth="2.5"
              filter="url(#cyanGlow)"
            />
            {/* Cyan neon collar ring */}
            <line x1="880" y1="172" x2="920" y2="172" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
            <text x="900" y="200" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              2kg GAS
            </text>
            <text x="900" y="215" fill="#00e5ff" fontSize="8" fontFamily="monospace" textAnchor="middle">
              CYLINDER
            </text>
          </g>
        </svg>
      </div>

      {/* Selected Node Spec Inspector Box */}
      {selectedNode && (
        <div className="bg-[#090d16] border border-cyan-500/40 rounded-lg p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-mono-tech font-bold flex items-center justify-center shrink-0">
              {selectedNode.tag.slice(0, 3)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono-tech font-bold text-cyan-300" dir="ltr">{selectedNode.tag}</span>
                <span className="text-neutral-500">•</span>
                <span className="font-bold text-neutral-100">{selectedNode.title}</span>
              </div>
              <p className="text-neutral-300 text-[11px] mt-0.5 leading-relaxed">{selectedNode.desc}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono-tech text-[11px] text-cyan-400/90 whitespace-nowrap">
            <Info className="w-3.5 h-3.5" />
            <span>برای بررسی مشخصات هر قطعه روی آن کلیک کنید</span>
          </div>
        </div>
      )}
    </div>
  );
};

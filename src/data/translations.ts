export interface TranslationStrings {
  appTitle: string;
  appSubtitle: string;
  renderTag: string;
  standardsTag: string;
  fullAssemblyView: string;
  scaleDetailView: string;
  schematicPidView: string;
  neonBoost: string;
  cadDimensions: string;
  callouts: string;
  datasheet: string;
  fullscreen: string;
  iso3dView: string;
  resolution8k: string;
  neonWavelength: string;
  inspectLoupe: string;
  magnify3x: string;
  zoomReset: string;
  clickToInspect: string;
  componentsExplorer: string;
  componentsExplorerSub: string;
  steelWhite: string;
  cyanAccent: string;
  technicalSpecs: string;
  close: string;
  certifiedStandards: string;
  interactiveScaleTitle: string;
  batchFilled: string;
  cylinders: string;
  nozzleType: string;
  digitalTerminal: string;
  netWeightLabel: string;
  targetCapacity: string;
  tareWeightLabel: string;
  grossWeightLabel: string;
  mainPumpTitle: string;
  pumpRunning: string;
  pumpStandby: string;
  dischargePressure: string;
  flowRateTitle: string;
  pneumaticSolenoid: string;
  flowRate: string;
  storageTankTitle: string;
  magneticLevel: string;
  tankPressure: string;
  cycleState: string;
  stateIdle: string;
  stateLoaded: string;
  stateClamped: string;
  stateFilling: string;
  stateComplete: string;
  stateEsd: string;
  loadCylinderBtn: string;
  startAutoFillBtn: string;
  esdTripBtn: string;
  resetScaleBtn: string;
  schematicTitle: string;
  schematicStandards: string;
  schematicDesc: string;
  cadLength: string;
  cadHeight: string;
  cadTankSpec: string;
  cadScaleSpec: string;
  footerTitle: string;
  footerStudio: string;
  installAndroid: string;
  installAndroidDesc: string;
  installNow: string;
  installLater: string;
  installedApp: string;
  categories: {
    Storage: string;
    Pumping: string;
    Metering: string;
    Structural: string;
    Piping: string;
    Safety: string;
  };
}

export const TRANSLATIONS = {
  fa: {
    appTitle: 'اسکید پرکننده ۲ تنی سیلندر گاز مایع (LPG)',
    appSubtitle: 'طراحی مهندسی مطابق ASME Sec VIII Div 1 • ضدانفجار Ex-d IIB T4 • فشار طراحی ۱٫۷۷ مگاپاسکال',
    renderTag: 'رندر صنعتی سه‌بعدی 8K',
    standardsTag: 'استاندارد ASME Sec VIII Div 1',
    fullAssemblyView: 'نمای کلی مجموعه اسکید',
    scaleDetailView: 'جزئیات باسکول و سیلندر ۲ کیلویی',
    schematicPidView: 'نقشه پایپینگ و ابزاردقیق (P&ID)',
    neonBoost: 'تقویت نئون',
    cadDimensions: 'ابعاد CAD',
    callouts: 'نشانگرها',
    datasheet: 'برگه مشخصات',
    fullscreen: 'تمام‌صفحه',
    iso3dView: 'نمای ایزومتریک ۳ بعدی',
    resolution8k: 'کیفیت ۸K UHD (۷۶۸۰×۴۳۲۰)',
    neonWavelength: 'طول‌موج نئون: ۴۹۰ نانومتر',
    inspectLoupe: 'ذره‌بین بازرسی',
    magnify3x: 'بزرگنمایی ۳ برابر',
    zoomReset: 'بازنشانی نما',
    clickToInspect: 'جهت مشاهده مشخصات فنی کلیک کنید',
    componentsExplorer: 'کاوشگر اجزا و تجهیزات اسکید',
    componentsExplorerSub: '(برای بررسی مشخصات فنی هر قطعه کلیک کنید)',
    steelWhite: 'فولادی / سفید',
    cyanAccent: 'نورپردازی فیروزه‌ای',
    technicalSpecs: 'مشخصات و پارامترهای مهندسی',
    close: 'بستن',
    certifiedStandards: 'دارای گواهینامه ISO-9001 / ASME SEC VIII',
    interactiveScaleTitle: 'کنسول هوشمند باسکول دیجیتال و کنترلر پمپ LPG',
    batchFilled: 'تعداد سیلندر پرشده در این شیفت:',
    cylinders: 'سیلندر',
    nozzleType: 'نازل پنوماتیک خودکار ۲ کیلوگرم',
    digitalTerminal: 'ترمینال دیجیتال ضدانفجار ATEX',
    netWeightLabel: 'وزن خالص (انتقال گاز مایع LPG)',
    targetCapacity: 'ظرفیت هدف:',
    tareWeightLabel: 'وزن تاره (پوکه سیلندر):',
    grossWeightLabel: 'وزن ناخالص کل:',
    mainPumpTitle: 'پمپ اصلی انتقال گاز مایع',
    pumpRunning: 'روشن و در حال انتقال • ۱۴۵۰ دور در دقیقه',
    pumpStandby: 'آماده‌به‌کار (Ex-d ضدانفجار)',
    dischargePressure: 'فشار تخلیه پمپ',
    flowRateTitle: 'نرخ دبی جرمی جریان',
    pneumaticSolenoid: 'شیر برقی سولنوئید پنوماتیک',
    flowRate: 'نرخ جریان',
    storageTankTitle: 'مخزن ذخیره افقی ۲ تنی',
    magneticLevel: 'سطح مایع مغناطیسی: ۷۸٫۴٪',
    tankPressure: 'فشار مخزن',
    cycleState: 'وضعیت چرخه:',
    stateIdle: 'آماده بارگذاری سیلندر ۲ کیلوگرمی',
    stateLoaded: 'سیلندر مستقر شد (وزن پوکه تأیید گردید)',
    stateClamped: 'نازل پنوماتیک قفل و آب‌بندی شد',
    stateFilling: 'تزریق پیوسته گاز مایع (۲٫۰۰ کیلوگرم)',
    stateComplete: 'قطع خودکار و تزریق موفق (۲٫۰۰ کیلوگرم خالص)',
    stateEsd: 'توقف اضطراری فعال شد (سیستم ESD)',
    loadCylinderBtn: 'بارگذاری سیلندر ۲ کیلویی',
    startAutoFillBtn: 'شروع پرکنی خودکار',
    esdTripBtn: 'قطع اضطراری (ESD)',
    resetScaleBtn: 'تنظیم مجدد باسکول',
    schematicTitle: 'نقشه پایپینگ و خطوط فرایندی ایستگاه گاز مایع (P&ID)',
    schematicStandards: 'سیستم‌های ایمنی NFPA 58 و EN 12542 فعال',
    schematicDesc: 'شماره نقشه: LPG-SKID-2026-001 • مسیر جریان گاز از مخزن افقی از طریق پمپ پره‌ای به باسکول دیجیتال',
    cadLength: 'طول کل شاسی: ۴,۸۵۰ میلی‌متر',
    cadHeight: 'ارتفاع کل: ۲,۴۰۰ میلی‌متر',
    cadTankSpec: 'مخزن تحت فشار ۲ تنی • قطر ۱,۲۰۰ میلی‌متر',
    cadScaleSpec: 'باسکول دیجیتال و سیلندر ۲ کیلویی',
    footerTitle: 'اسکید صنعتی پرکننده ۲ تنی سیلندر گاز مایع (LPG)',
    footerStudio: 'نورپردازی استودیویی تیره • زاویه ایزومتریک مهندسی • رندر با کیفیت 8K',
    installAndroid: 'نصب روی اندروید',
    installAndroidDesc: 'اجرای روان و سریع به‌صورت اپلیکیشن مجزا روی گوشی و تبلت اندروید بدون نیاز به مرورگر',
    installNow: 'نصب اپلیکیشن',
    installLater: 'بعداً',
    installedApp: 'اپلیکیشن با موفقیت روی دستگاه شما نصب شد',
    categories: {
      Storage: 'مخزن ذخیره',
      Pumping: 'پمپاژ و انتقال',
      Metering: 'اندازه‌گیری و دیسپنسر',
      Structural: 'سازه و اسکلت',
      Piping: 'پایپینگ و اتصالات',
      Safety: 'سیستم ایمنی و ESD',
    },
  },
  en: {
    appTitle: '2-Ton LPG Cylinder Filling Skid',
    appSubtitle: 'ASME Sec VIII Div 1 • Ex-d IIB T4 Flameproof • Design Pressure 1.77 MPa',
    renderTag: '8K 3D RENDER',
    standardsTag: 'ASME Sec VIII Div 1',
    fullAssemblyView: 'Full Skid Assembly',
    scaleDetailView: 'Scale & 2kg Cylinder',
    schematicPidView: 'P&ID Flow Diagram',
    neonBoost: 'Neon Boost',
    cadDimensions: 'CAD Dim',
    callouts: 'Callouts',
    datasheet: 'Datasheet',
    fullscreen: 'Fullscreen',
    iso3dView: 'ISO-3D VIEW',
    resolution8k: '8K UHD (7680×4320)',
    neonWavelength: 'NEON ACCENTS: 490nm',
    inspectLoupe: 'Inspect Loupe',
    magnify3x: '3× MAGNIFY',
    zoomReset: 'Reset View',
    clickToInspect: 'Click to view CAD engineering specifications',
    componentsExplorer: 'Skid Assembly Components Explorer',
    componentsExplorerSub: '(Select to inspect CAD engineering specs)',
    steelWhite: 'STEEL/WHITE',
    cyanAccent: 'CYAN ACCENT',
    technicalSpecs: 'Technical Engineering Data',
    close: 'Close',
    certifiedStandards: 'ISO-9001 / ASME SEC VIII CERTIFIED',
    interactiveScaleTitle: 'Interactive Digital Filling Scale & LPG Pump Controller',
    batchFilled: 'BATCH FILLED:',
    cylinders: 'CYLINDERS',
    nozzleType: 'NOZZLE: AUTO-CLAMP 2kg',
    digitalTerminal: 'CYAN DIGITAL ATEX TERMINAL',
    netWeightLabel: 'Net Weight (LPG Liquid Transfer)',
    targetCapacity: 'TARGET CAPACITY:',
    tareWeightLabel: 'TARE (BOTTLE):',
    grossWeightLabel: 'GROSS WEIGHT:',
    mainPumpTitle: 'Main LPG Transfer Pump',
    pumpRunning: 'RUNNING • 1450 RPM',
    pumpStandby: 'STANDBY (EX-D)',
    dischargePressure: 'Discharge',
    flowRateTitle: 'Mass Flow Rate',
    pneumaticSolenoid: 'Pneumatic Cutoff Solenoid',
    flowRate: 'Rate',
    storageTankTitle: '2-Ton Storage Tank',
    magneticLevel: 'Magnetic Level: 78.4%',
    tankPressure: 'Vessel Press.',
    cycleState: 'CYCLE STATE:',
    stateIdle: 'READY FOR 2kg CYLINDER',
    stateLoaded: 'CYLINDER SEATED (TARE CHECKED)',
    stateClamped: 'PNEUMATIC NOZZLE CLAMPED',
    stateFilling: 'LIQUID LPG CHARGING (2.00 kg)',
    stateComplete: 'AUTO-CUTOFF SUCCESSFUL (2.00 kg NET)',
    stateEsd: 'EMERGENCY SHUTDOWN TRIPPED',
    loadCylinderBtn: 'Load 2kg Cylinder',
    startAutoFillBtn: 'Start Auto Fill',
    esdTripBtn: 'ESD TRIP',
    resetScaleBtn: 'Reset Scale Telemetry',
    schematicTitle: 'P&ID Process Piping & Instrumentation Diagram',
    schematicStandards: 'NFPA 58 / EN 12542 SAFETY INTERLOCKS ACTIVE',
    schematicDesc: 'DWG NO: LPG-SKID-2026-001 • Positive displacement transfer loop with fail-safe bypass',
    cadLength: 'L: 4,850 mm (SKID BASE)',
    cadHeight: 'H: 2,400 mm',
    cadTankSpec: '2-TON BULLET TANK • Ø 1,200 mm',
    cadScaleSpec: 'DIGITAL SCALE & 2kg CYLINDER',
    footerTitle: '2-TON LPG CYLINDER FILLING SKID',
    footerStudio: 'SOLID BLACK STUDIO • CLEAN ISOMETRIC LIGHTING • 8K RENDER PASS',
    installAndroid: 'Install on Android',
    installAndroidDesc: 'Run as a standalone native app on Android phones and tablets with touch responsiveness',
    installNow: 'Install App',
    installLater: 'Later',
    installedApp: 'Application successfully installed on device',
    categories: {
      Storage: 'Storage',
      Pumping: 'Pumping',
      Metering: 'Metering',
      Structural: 'Structural',
      Piping: 'Piping',
      Safety: 'Safety',
    },
  },
};

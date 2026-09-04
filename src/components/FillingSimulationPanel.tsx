import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  AlertOctagon, 
  Gauge, 
  Activity, 
  CheckCircle, 
  Flame,
  Zap,
  ArrowRight
} from 'lucide-react';
import { industrialAudio } from '../utils/audioSynth';
import { TRANSLATIONS } from '../data/translations';

interface FillingSimulationPanelProps {
  lang: 'fa' | 'en';
}

export const FillingSimulationPanel: React.FC<FillingSimulationPanelProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];
  const [fillState, setFillState] = useState<'IDLE' | 'LOADED' | 'CLAMPED' | 'FILLING' | 'COMPLETE' | 'ESD_TRIGGERED'>('IDLE');
  const [grossWeight, setGrossWeight] = useState<number>(0.00);
  const [tareWeight, setTareWeight] = useState<number>(0.00);
  const [netWeight, setNetWeight] = useState<number>(0.00);
  const [targetNet] = useState<number>(2.00); // 2kg Cylinder
  const [tareConstant] = useState<number>(2.45); // 2kg empty cylinder tare
  const [pumpPressure, setPumpPressure] = useState<number>(0.0);
  const [flowRate, setFlowRate] = useState<number>(0);
  const [cylinderCounter, setCylinderCounter] = useState<number>(142);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Haptic feedback for Android
  const triggerHaptic = (ms = 25) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(ms);
      } catch {
        // ignore
      }
    }
  };

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      industrialAudio.stopPumpHum();
    };
  }, []);

  // Place Cylinder on scale
  const handlePlaceCylinder = () => {
    if (fillState !== 'IDLE' && fillState !== 'COMPLETE' && fillState !== 'ESD_TRIGGERED') return;
    triggerHaptic(30);
    industrialAudio.playValveClick();
    setFillState('LOADED');
    setTareWeight(tareConstant);
    setGrossWeight(tareConstant);
    setNetWeight(0.00);
    setPumpPressure(0.0);
    setFlowRate(0);
  };

  // Start Automated Filling Sequence
  const handleStartFill = () => {
    if (fillState !== 'LOADED') return;
    triggerHaptic(40);
    
    // Step 1: Clamp engaged
    setFillState('CLAMPED');
    industrialAudio.playValveClick();

    setTimeout(() => {
      // Step 2: Pump starts & liquid LPG begins flowing
      setFillState('FILLING');
      industrialAudio.startPumpHum();
      setPumpPressure(1.24); // 1.24 MPa
      setFlowRate(72); // L/min

      let currentNet = 0.0;
      const fillInterval = setInterval(() => {
        currentNet += 0.08;
        if (currentNet >= targetNet) {
          currentNet = targetNet;
          clearInterval(fillInterval);
          industrialAudio.stopPumpHum();
          industrialAudio.playCompleteChime();
          triggerHaptic(100);
          setFillState('COMPLETE');
          setPumpPressure(0.0);
          setFlowRate(0);
          setCylinderCounter((c) => c + 1);
        } else {
          // Dynamic jitter for realistic load cell telemetry
          const jitter = (Math.random() - 0.5) * 0.01;
          setNetWeight(Number((currentNet + jitter).toFixed(2)));
          setGrossWeight(Number((tareConstant + currentNet + jitter).toFixed(2)));
        }
      }, 100);

      timerRef.current = fillInterval;
    }, 600);
  };

  // Emergency Stop Trigger
  const handleEmergencyStop = () => {
    triggerHaptic(200);
    if (timerRef.current) clearInterval(timerRef.current);
    industrialAudio.stopPumpHum();
    industrialAudio.playBeep(440, 0.4);
    setFillState('ESD_TRIGGERED');
    setPumpPressure(0.0);
    setFlowRate(0);
  };

  // Reset Scale
  const handleReset = () => {
    triggerHaptic(20);
    if (timerRef.current) clearInterval(timerRef.current);
    industrialAudio.stopPumpHum();
    industrialAudio.playValveClick();
    setFillState('IDLE');
    setGrossWeight(0.00);
    setTareWeight(0.00);
    setNetWeight(0.00);
    setPumpPressure(0.0);
    setFlowRate(0);
  };

  return (
    <div className="w-full bg-[#080b11] border border-[#1b2230] rounded-xl p-3 sm:p-4 lg:p-5 flex flex-col gap-4 text-neutral-200">
      {/* Panel Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#171d2b] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
          <h2 className="text-xs sm:text-sm font-bold tracking-wider text-neutral-100 font-mono-tech">
            {t.interactiveScaleTitle}
          </h2>
        </div>
        <div className="flex items-center gap-3 text-[11px] sm:text-xs font-mono-tech text-neutral-400 flex-wrap">
          <span>{t.batchFilled} <strong className="text-cyan-400">{cylinderCounter}</strong> {t.cylinders}</span>
          <span className="text-neutral-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline">{t.nozzleType}</span>
        </div>
      </div>

      {/* Main Console Layout: Scale Display + Telemetry Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Digital Scale Readout Console (Glowing Cyan 7-Segment style) */}
        <div className="lg:col-span-7 bg-[#040609] border border-cyan-500/40 rounded-xl p-4 flex flex-col justify-between shadow-inner relative overflow-hidden">
          {/* Subtle Scanlines & Cyan Glow */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(0,229,255,0.06),transparent_70%)]" />

          {/* Top Bar of the Scale */}
          <div className="flex items-center justify-between text-xs font-mono-tech border-b border-cyan-900/40 pb-2 mb-3">
            <span className="text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              {t.digitalTerminal}
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
              CLASS III e=0.02kg
            </span>
          </div>

          {/* Big High-Luminance Weight Digits */}
          <div className="py-2 text-center">
            <div className="text-[11px] font-mono-tech text-neutral-400 tracking-wider mb-1">
              {t.netWeightLabel}
            </div>
            <div className="font-mono-tech font-bold text-4xl sm:text-5xl text-cyan-300 tracking-tight text-glow-cyan flex items-baseline justify-center gap-2" dir="ltr">
              <span>{netWeight.toFixed(2)}</span>
              <span className="text-xl sm:text-2xl text-cyan-500 font-normal">kg</span>
            </div>
            <div className="text-xs font-mono-tech text-neutral-400 mt-1">
              {t.targetCapacity} <span className="text-cyan-400 font-bold" dir="ltr">{targetNet.toFixed(2)} kg</span>
            </div>
          </div>

          {/* Secondary Tare and Gross Readouts */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#141d2c] font-mono-tech text-xs">
            <div className="bg-[#080d17] p-2 rounded border border-[#1b263b] flex items-center justify-between">
              <span className="text-neutral-400 text-[10px] sm:text-[11px]">{t.tareWeightLabel}</span>
              <span className="text-cyan-400 font-bold" dir="ltr">{tareWeight.toFixed(2)} kg</span>
            </div>
            <div className="bg-[#080d17] p-2 rounded border border-[#1b263b] flex items-center justify-between">
              <span className="text-neutral-400 text-[10px] sm:text-[11px]">{t.grossWeightLabel}</span>
              <span className="text-neutral-100 font-bold" dir="ltr">{grossWeight.toFixed(2)} kg</span>
            </div>
          </div>

          {/* Live Progress Bar towards 2kg */}
          <div className="mt-3">
            <div className="w-full bg-[#101724] h-2 rounded-full overflow-hidden border border-cyan-900/50">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 transition-all duration-150 glow-cyan-sm"
                style={{ width: `${Math.min(100, (netWeight / targetNet) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Pump & Process Telemetry Gauges */}
        <div className="lg:col-span-5 flex flex-col gap-2.5 justify-between">
          {/* Pump Status Card */}
          <div className="bg-[#0a0e17] border border-[#1e273a] p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${
                fillState === 'FILLING' 
                  ? 'border-cyan-400 bg-cyan-950 text-cyan-300 glow-cyan-sm animate-pulse' 
                  : 'border-neutral-700 bg-neutral-800 text-neutral-400'
              }`}>
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-100">{t.mainPumpTitle}</div>
                <div className="text-[11px] font-mono-tech text-neutral-400">
                  {fillState === 'FILLING' ? (
                    <span className="text-cyan-400 font-semibold">{t.pumpRunning}</span>
                  ) : (
                    <span>{t.pumpStandby}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right font-mono-tech">
              <div className="text-[10px] text-neutral-400">{t.dischargePressure}</div>
              <div className="text-sm font-bold text-cyan-300" dir="ltr">
                {pumpPressure.toFixed(2)} <span className="text-[10px] text-neutral-400">MPa</span>
              </div>
            </div>
          </div>

          {/* Flow Rate Card */}
          <div className="bg-[#0a0e17] border border-[#1e273a] p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-neutral-700 bg-neutral-800 text-neutral-400 shrink-0">
                <Gauge className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-100">{t.flowRateTitle}</div>
                <div className="text-[11px] font-mono-tech text-neutral-400">{t.pneumaticSolenoid}</div>
              </div>
            </div>
            <div className="text-right font-mono-tech">
              <div className="text-[10px] text-neutral-400">{t.flowRate}</div>
              <div className="text-sm font-bold text-cyan-300" dir="ltr">
                {flowRate} <span className="text-[10px] text-neutral-400">L/min</span>
              </div>
            </div>
          </div>

          {/* Storage Tank Status */}
          <div className="bg-[#0a0e17] border border-[#1e273a] p-3 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-neutral-700 bg-neutral-800 text-neutral-400 shrink-0">
                <Flame className="w-4 h-4 text-neutral-300" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-100">{t.storageTankTitle}</div>
                <div className="text-[11px] font-mono-tech text-neutral-400">{t.magneticLevel}</div>
              </div>
            </div>
            <div className="text-right font-mono-tech">
              <div className="text-[10px] text-neutral-400">{t.tankPressure}</div>
              <div className="text-sm font-bold text-neutral-100" dir="ltr">
                1.28 <span className="text-[10px] text-neutral-400">MPa</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Sequence Step Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#171d2b]">
        {/* Sequence State Pill */}
        <div className="flex items-center gap-2 text-xs font-mono-tech flex-wrap">
          <span className="text-neutral-400">{t.cycleState}</span>
          {fillState === 'IDLE' && (
            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
              {t.stateIdle}
            </span>
          )}
          {fillState === 'LOADED' && (
            <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-700">
              {t.stateLoaded}
            </span>
          )}
          {fillState === 'CLAMPED' && (
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              {t.stateClamped}
            </span>
          )}
          {fillState === 'FILLING' && (
            <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-400 glow-cyan-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              {t.stateFilling}
            </span>
          )}
          {fillState === 'COMPLETE' && (
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              {t.stateComplete}
            </span>
          )}
          {fillState === 'ESD_TRIGGERED' && (
            <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-600 flex items-center gap-1">
              <AlertOctagon className="w-3.5 h-3.5" />
              {t.stateEsd}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end flex-wrap">
          {/* Place Cylinder */}
          {(fillState === 'IDLE' || fillState === 'COMPLETE' || fillState === 'ESD_TRIGGERED') && (
            <button
              onClick={handlePlaceCylinder}
              className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-100 text-xs font-semibold border border-neutral-600 transition-colors flex items-center gap-1.5"
            >
              <span>{t.loadCylinderBtn}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          )}

          {/* Start Fill Cycle */}
          {fillState === 'LOADED' && (
            <button
              onClick={handleStartFill}
              className="px-4 py-1.5 rounded bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs shadow-md glow-cyan-sm transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{t.startAutoFillBtn}</span>
            </button>
          )}

          {/* Emergency Stop Button (Mushroom push style) */}
          <button
            onClick={handleEmergencyStop}
            className="px-3 py-1.5 rounded bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-600/80 text-xs font-mono-tech font-bold transition-colors flex items-center gap-1.5"
            title="قطع فوری اضطراری"
          >
            <AlertOctagon className="w-3.5 h-3.5" />
            <span>{t.esdTripBtn}</span>
          </button>

          {/* Reset button */}
          <button
            onClick={handleReset}
            className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 transition-colors"
            title={t.resetScaleBtn}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

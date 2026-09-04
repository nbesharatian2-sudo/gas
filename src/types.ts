export interface SkidComponent {
  id: string;
  name: string;
  category: 'Storage' | 'Pumping' | 'Metering' | 'Structural' | 'Piping' | 'Safety';
  status: 'Normal' | 'Active' | 'Standby';
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  neonAccentColor?: string;
  hasNeonAccent: boolean;
  xPercent: number; // For main skid render hotspot (0-100)
  yPercent: number; // For main skid render hotspot (0-100)
  closeupX?: number; // Hotspot for scale closeup view (0-100)
  closeupY?: number;
  highlightTag: string;
}

export type ViewMode = 'isometric-full' | 'scale-detail' | 'schematic-pid';

export interface TelemetryState {
  tankLevelPercent: number;
  tankPressureBar: number;
  tankTempC: number;
  pumpRunning: boolean;
  pumpRpm: number;
  pumpPressureBar: number;
  pumpFlowLpm: number;
  scaleGrossKg: number;
  scaleTareKg: number;
  scaleNetKg: number;
  fillStatus: 'IDLE' | 'CLAMPED' | 'FILLING' | 'THROTTLE' | 'COMPLETE' | 'PURGED';
  cylinderTargetKg: number;
  emergencyStop: boolean;
}

export interface HotspotPin {
  id: string;
  title: string;
  subtitle: string;
  componentId: string;
  x: number;
  y: number;
  isNeonGlow: boolean;
}

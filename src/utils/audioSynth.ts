class IndustrialAudioEngine {
  private ctx: AudioContext | null = null;
  private pumpOsc: OscillatorNode | null = null;
  private pumpGain: GainNode | null = null;
  private isMuted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.pumpGain && this.ctx) {
      this.pumpGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public playValveClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.09);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  public playBeep(freq: number = 880, duration: number = 0.1) {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  public playCompleteChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.09, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.45);
    });
  }

  public startPumpHum() {
    if (this.isMuted || this.pumpOsc) return;
    this.init();
    if (!this.ctx) return;

    try {
      this.pumpOsc = this.ctx.createOscillator();
      this.pumpGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      this.pumpOsc.type = 'sawtooth';
      this.pumpOsc.frequency.setValueAtTime(65, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, this.ctx.currentTime);

      this.pumpGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.pumpGain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.3);

      this.pumpOsc.connect(filter);
      filter.connect(this.pumpGain);
      this.pumpGain.connect(this.ctx.destination);

      this.pumpOsc.start();
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  public stopPumpHum() {
    if (this.pumpGain && this.ctx && this.pumpOsc) {
      try {
        this.pumpGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
        const osc = this.pumpOsc;
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        }, 220);
      } catch {
        // ignore
      }
      this.pumpOsc = null;
      this.pumpGain = null;
    }
  }
}

export const industrialAudio = new IndustrialAudioEngine();

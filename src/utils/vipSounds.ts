// Enhanced VIP Audio System
class VipAudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isEnabled = true;
  private volume = 0.7;

  constructor() {
    this.initializeAudioContext();
  }

  private initializeAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
    } catch (error) {
      console.warn('Audio context not available:', error);
    }
  }

  private async createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<void> {
    if (!this.audioContext || !this.masterGain || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    // Enhanced envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  private async createChord(frequencies: number[], duration: number): Promise<void> {
    const promises = frequencies.map(freq => this.createTone(freq, duration, 'sine'));
    await Promise.all(promises);
  }

  // VIP Enhanced Growth Sound - Harmonious chords
  async playVipGrowthSound(): Promise<void> {
    if (!this.isEnabled) return;

    // Beautiful major chord progression
    const chords = [
      [440, 554.37, 659.25], // A major
      [493.88, 622.25, 739.99], // B major  
      [523.25, 659.25, 783.99], // C major
    ];

    for (let i = 0; i < chords.length; i++) {
      setTimeout(() => {
        this.createChord(chords[i], 0.4);
      }, i * 200);
    }
  }

  // VIP Success Sound - Triumphant fanfare
  async playVipSuccessSound(): Promise<void> {
    if (!this.isEnabled) return;

    // Triumphant ascending melody
    const melody = [
      { freq: 523.25, duration: 0.15 }, // C5
      { freq: 659.25, duration: 0.15 }, // E5
      { freq: 783.99, duration: 0.15 }, // G5
      { freq: 1046.5, duration: 0.3 },  // C6
      { freq: 1174.7, duration: 0.15 }, // D6
      { freq: 1318.5, duration: 0.4 },  // E6
    ];

    let delay = 0;
    melody.forEach((note, index) => {
      setTimeout(() => {
        this.createTone(note.freq, note.duration, 'triangle');
        
        // Add harmonic
        if (index >= 3) {
          this.createTone(note.freq * 0.5, note.duration, 'sine');
        }
      }, delay);
      delay += note.duration * 1000 * 0.8;
    });

    // Final chord burst
    setTimeout(() => {
      this.createChord([1046.5, 1318.5, 1568], 1.0);
    }, delay);
  }

  // VIP Notification Sound - Ethereal bells
  async playVipNotification(): Promise<void> {
    if (!this.isEnabled) return;

    // Bell-like tones with harmonics
    const bellFreqs = [880, 1108.73, 1318.51];
    
    bellFreqs.forEach((freq, index) => {
      setTimeout(() => {
        this.createTone(freq, 0.8, 'sine');
        // Add subtle harmonics
        this.createTone(freq * 2, 0.4, 'triangle');
        this.createTone(freq * 0.5, 1.0, 'sine');
      }, index * 100);
    });
  }

  // VIP Ambient Nature Sounds (Synthesized)
  async playVipAmbientGarden(): Promise<void> {
    if (!this.isEnabled) return;

    // Gentle wind-like sound
    const windDuration = 3.0;
    const windFreq = 200;
    
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(windFreq, this.audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.audioContext.currentTime);
    filter.Q.setValueAtTime(0.5, this.audioContext.currentTime);

    // Gentle volume envelope
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.5);
    gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + windDuration - 0.5);
    gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + windDuration);

    // Add subtle frequency modulation
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    
    lfo.frequency.setValueAtTime(0.2, this.audioContext.currentTime);
    lfoGain.gain.setValueAtTime(20, this.audioContext.currentTime);

    oscillator.start(this.audioContext.currentTime);
    lfo.start(this.audioContext.currentTime);
    
    oscillator.stop(this.audioContext.currentTime + windDuration);
    lfo.stop(this.audioContext.currentTime + windDuration);
  }

  // VIP Level up sound
  async playVipLevelUp(): Promise<void> {
    if (!this.isEnabled) return;

    // Magical ascending arpeggio
    const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
    
    arpeggio.forEach((freq, index) => {
      setTimeout(() => {
        this.createTone(freq, 0.2, 'triangle');
        // Add sparkle effect
        setTimeout(() => {
          this.createTone(freq * 2, 0.1, 'sine');
        }, 50);
      }, index * 80);
    });

    // Final powerful chord
    setTimeout(() => {
      this.createChord([880, 1108.73, 1318.51, 1760], 0.8);
    }, arpeggio.length * 80 + 200);
  }

  // Controls
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioContext?.currentTime || 0);
    }
  }

  getVolume(): number {
    return this.volume;
  }

  isAudioEnabled(): boolean {
    return this.isEnabled;
  }
}

// Create singleton instance
export const vipAudioManager = new VipAudioManager();

// Convenience functions
export const playVipGrowthSound = () => vipAudioManager.playVipGrowthSound();
export const playVipSuccessSound = () => vipAudioManager.playVipSuccessSound();
export const playVipNotification = () => vipAudioManager.playVipNotification();
export const playVipAmbientGarden = () => vipAudioManager.playVipAmbientGarden();
export const playVipLevelUp = () => vipAudioManager.playVipLevelUp();
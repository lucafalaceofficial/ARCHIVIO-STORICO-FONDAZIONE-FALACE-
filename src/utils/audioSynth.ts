// Sintetizzatore Acustico Armonico 432 Hz per la sperimentazione sinergica AIC
let audioContext: AudioContext | null = null;
let oscLeft: OscillatorNode | null = null;
let oscRight: OscillatorNode | null = null;
let gainNode: GainNode | null = null;
let running = false;

export function startHertzianCarrier(freq = 432, modFreq = 8): boolean {
  if (running) stopHertzianCarrier();

  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioContext = new AudioCtx();
    
    oscLeft = audioContext.createOscillator();
    oscRight = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscLeft.type = 'sine';
    oscLeft.frequency.setValueAtTime(freq, audioContext.currentTime);

    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(freq + modFreq, audioContext.currentTime);

    // Morbido fade in per evitare click acustici
    gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 1.2);

    // Stereo panning se supportato per creare un vero battimento binaurale (binaural beat)
    if (audioContext.createStereoPanner) {
      const pannerLeft = audioContext.createStereoPanner();
      const pannerRight = audioContext.createStereoPanner();
      pannerLeft.pan.setValueAtTime(-1, audioContext.currentTime);
      pannerRight.pan.setValueAtTime(1, audioContext.currentTime);

      oscLeft.connect(pannerLeft);
      pannerLeft.connect(gainNode);

      oscRight.connect(pannerRight);
      pannerRight.connect(gainNode);
    } else {
      oscLeft.connect(gainNode);
      oscRight.connect(gainNode);
    }

    gainNode.connect(audioContext.destination);

    oscLeft.start();
    oscRight.start();
    running = true;
    return true;
  } catch (e) {
    console.warn("AudioContext non avviabile nel contesto corrente browser:", e);
    running = false;
    return false;
  }
}

export function stopHertzianCarrier() {
  if (!running || !audioContext) return;

  try {
    if (gainNode) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.8);
    }
    const currentOscLeft = oscLeft;
    const currentOscRight = oscRight;
    const currentCtx = audioContext;
    
    setTimeout(() => {
      try {
        currentOscLeft?.stop();
        currentOscLeft?.disconnect();
        currentOscRight?.stop();
        currentOscRight?.disconnect();
        currentCtx?.close();
      } catch (err) {
        // Safe catch
      }
      running = false;
    }, 800);
  } catch (e) {
    running = false;
  }
}

export function isAudioRunning(): boolean {
  return running;
}

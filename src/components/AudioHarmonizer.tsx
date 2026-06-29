import React, { useState, useRef, useEffect } from 'react';
import { Radio, Play, Pause, Volume2, Zap, Sliders, Shield, Activity, Cpu, Clock } from 'lucide-react';

export default function AudioHarmonizer() {
  // --- Audio State ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [carrierFreq, setCarrierFreq] = useState(432);
  const [binauralBeat, setBinauralBeat] = useState(8); // Differential Beat
  const [volume, setVolume] = useState(0.2);
  const [synthMode, setSynthMode] = useState<'binaural' | 'isochronic' | 'pure'>('binaural');

  // --- PELAQ Input Variables (0 to 10, maps to 0 to 1 internally) ---
  const [pensiero, setPensiero] = useState(5); // P
  const [emozione, setEmozione] = useState(6); // E
  const [lateralita, setLateralita] = useState(5); // L
  const [azione, setAzione] = useState(4); // A
  const [quantico, setQuantico] = useState(3); // Q

  // --- Formula Helper Parameters ---
  const [deltaTime, setDeltaTime] = useState(10); // Δt (seconds)
  const [tau, setTau] = useState(30); // τ (lifetime decay constant)
  const [psiQuantum, setPsiQuantum] = useState(0.8); // Ψ_quantistica
  const [gMetrica, setGMetrica] = useState(1.2); // G_metrica

  // --- Audio References (Lazy loaded) ---
  const audioCtxRef = useRef<AudioContext | null>(null);
  const leftOscRef = useRef<OscillatorNode | null>(null);
  const rightOscRef = useRef<OscillatorNode | null>(null);
  const leftGainRef = useRef<GainNode | null>(null);
  const rightGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
  };

  const startSound = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    try {
      // 1. Master Gain
      masterGainRef.current = ctx.createGain();
      masterGainRef.current.gain.setValueAtTime(volume, ctx.currentTime);
      masterGainRef.current.connect(ctx.destination);

      // 2. Stereo Channel Merger
      const merger = ctx.createChannelMerger(2);
      merger.connect(masterGainRef.current);

      // 3. Left and Right Oscillators
      leftOscRef.current = ctx.createOscillator();
      rightOscRef.current = ctx.createOscillator();

      leftGainRef.current = ctx.createGain();
      rightGainRef.current = ctx.createGain();

      leftOscRef.current.type = 'sine';
      rightOscRef.current.type = 'sine';

      // Set Frequencies according to modes
      if (synthMode === 'pure') {
        leftOscRef.current.frequency.setValueAtTime(carrierFreq, ctx.currentTime);
        rightOscRef.current.frequency.setValueAtTime(carrierFreq, ctx.currentTime);
      } else if (synthMode === 'binaural') {
        leftOscRef.current.frequency.setValueAtTime(carrierFreq - (binauralBeat / 2), ctx.currentTime);
        rightOscRef.current.frequency.setValueAtTime(carrierFreq + (binauralBeat / 2), ctx.currentTime);
      } else if (synthMode === 'isochronic') {
        leftOscRef.current.frequency.setValueAtTime(carrierFreq, ctx.currentTime);
        rightOscRef.current.frequency.setValueAtTime(carrierFreq, ctx.currentTime);

        // Low frequency gain pulse (LFO)
        const lfo = ctx.createOscillator();
        lfo.type = 'square';
        lfo.frequency.setValueAtTime(binauralBeat, ctx.currentTime);
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(volume, ctx.currentTime);
        lfo.connect(lfoGain.gain);
        lfo.start();
      }

      leftOscRef.current.connect(leftGainRef.current);
      rightOscRef.current.connect(rightGainRef.current);

      leftGainRef.current.connect(merger, 0, 0); // left output
      rightGainRef.current.connect(merger, 0, 1); // right output

      leftOscRef.current.start();
      rightOscRef.current.start();

      setIsPlaying(true);
    } catch (err) {
      console.error("Audio Web Synth Error:", err);
    }
  };

  const stopSound = () => {
    if (leftOscRef.current) {
      try { leftOscRef.current.stop(); } catch (e) {}
      leftOscRef.current.disconnect();
      leftOscRef.current = null;
    }
    if (rightOscRef.current) {
      try { rightOscRef.current.stop(); } catch (e) {}
      rightOscRef.current.disconnect();
      rightOscRef.current = null;
    }
    setIsPlaying(false);
  };

  // Dynamically update frequencies on sliders shift
  useEffect(() => {
    if (isPlaying && leftOscRef.current && rightOscRef.current) {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (synthMode === 'pure') {
        leftOscRef.current.frequency.setValueAtTime(carrierFreq, ctx.currentTime);
        rightOscRef.current.frequency.setValueAtTime(carrierFreq, ctx.currentTime);
      } else {
        leftOscRef.current.frequency.setValueAtTime(carrierFreq - (binauralBeat / 2), ctx.currentTime);
        rightOscRef.current.frequency.setValueAtTime(carrierFreq + (binauralBeat / 2), ctx.currentTime);
      }
    }
  }, [carrierFreq, binauralBeat, synthMode, isPlaying]);

  // Dynamically update master volume
  useEffect(() => {
    if (isPlaying && masterGainRef.current) {
      const ctx = audioCtxRef.current;
      if (ctx) {
        masterGainRef.current.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.1);
      }
    }
  }, [volume, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSound();
    };
  }, []);

  // --- MATHEMATICAL FORMULAS ENGINE (VERBATIM FOR CERN PAPERS) ---

  // 1. Logistic activation function: σ(X) = 1 / (1 + e^(-6 * (X - 0.5)))
  const sigma = (val: number) => {
    const x = val / 10; // Scale from 0-10 input to 0-1 range
    return 1 / (1 + Math.exp(-6 * (x - 0.5)));
  };

  const pSig = sigma(pensiero);
  const eSig = sigma(emozione);
  const lSig = sigma(lateralita);
  const aSig = sigma(azione);
  const qSig = sigma(quantico);

  const sigs = [pSig, eSig, lSig, aSig, qSig];
  const weights = [0.22, 0.22, 0.18, 0.18, 0.20]; // w_i vector (sums to 1.0)

  // 2. Creative Tensor 5x5 T_ij:
  // Diagonal T_ii = w_i * σ(X_i)
  // Off-diagonal T_ij = 0.5 * (w_i + w_j) * σ(X_i)*σ(X_j) representing mutual synergies
  const buildCreativeTensor = (): number[][] => {
    const T: number[][] = Array(5).fill(0).map(() => Array(5).fill(0));
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (i === j) {
          T[i][j] = weights[i] * sigs[i];
        } else {
          T[i][j] = 0.5 * (weights[i] + weights[j]) * sigs[i] * sigs[j] * 0.45; // reduced by synergy coefficient
        }
      }
    }
    return T;
  };

  const tensor = buildCreativeTensor();

  // 3. Synchronistic Unit: US = Tr(T) = Σ T_ii (expressed out of 10)
  const trace = tensor[0][0] + tensor[1][1] + tensor[2][2] + tensor[3][3] + tensor[4][4];
  const synchronisticUnit = Number((trace * 10).toFixed(3));

  // 4. Synchronistic Intensity: S = Σ w_i σ(X_i) + Σ_jk w_jk σ(X_j)σ(X_k) (expressed out of 10)
  let sumLinear = 0;
  for (let i = 0; i < 5; i++) {
    sumLinear += weights[i] * sigs[i];
  }
  let sumQuadratic = 0;
  for (let j = 0; j < 5; j++) {
    for (let k = 0; k < 5; k++) {
      if (j !== k) {
        sumQuadratic += 0.05 * sigs[j] * sigs[k]; // interactive weights w_jk
      }
    }
  }
  const rawS = sumLinear + sumQuadratic;
  const synchronisticIntensity = Number((rawS * 10).toFixed(2));

  // 5. Total Creative Potential: Π_Creativa = (Σ w_i σ(X_i)) * e^(-Δt/τ) * Ψ * G_metrica (expressed out of 10)
  const tempDecay = Math.exp(-deltaTime / tau);
  const rawPi = sumLinear * tempDecay * psiQuantum * gMetrica;
  const totalCreativePotential = Number((rawPi * 10).toFixed(2));

  // 6. 9 Levels of Synchronicity mapping based on computed Synchronistic Intensity S
  const get9LevelsInfo = (s: number) => {
    if (s <= 1.5) return { lvl: 1, name: "Debole (Passivo)", bio: "Delta: 0.5-4 Hz • RMSSD < 20 ms", desc: "Piccole coincidenze casuali. Osservazione passiva senza risonanze stabili." };
    if (s <= 2.8) return { lvl: 2, name: "Tematica (Pattern)", bio: "Theta: 4-8 Hz • RMSSD 20-35 ms", desc: "Eventi ripetuti legati a un tema o simbolo. Rilevato accoppiamento cardiaco embrionale." };
    if (s <= 4.0) return { lvl: 3, name: "Direzionale (Orientativa)", bio: "Alpha: 8-12 Hz • RMSSD 35-45 ms", desc: "Eventi che orientano verso scelte specifiche. Strumento di navigazione esistenziale ordinata." };
    if (s <= 5.0) return { lvl: 4, name: "Catalitica (Accelerativa)", bio: "Beta bassa: 12-20 Hz • RMSSD 45-55 ms", desc: "Accelerazione improvvisa dei processi interiori. Sblocco attivo di situazioni stagnanti." };
    if (s <= 6.2) return { lvl: 5, name: "Operativa (Brevettuale)", bio: "Beta alta & 7 Hz • LF/HF = 1:1", desc: "Puntamento sintonizzato mente-cuore. Intuizioni utili per tutele ed equilibri d'ingegno fisici." };
    if (s <= 7.2) return { lvl: 6, name: "Riflessiva (Specchio)", bio: "Beta + Schumann 7.83 Hz • > 70% Inter.", desc: "Rispecchiamento quasi istantaneo tra stato interiore e ambiente circostante." };
    if (s <= 8.3) return { lvl: 7, name: "Generativa (Creativa)", bio: "Gamma > 40 Hz & 7 Hz • > 0.7 Coer.", desc: "Sincronicità indotta in doppio cieco. Unione armonica del Meccanismo MAEE spinale." };
    if (s <= 9.3) return { lvl: 8, name: "Magnetica (Imprenditoriale)", bio: "Gamma + Schumann Intenso • > 85% Coer.", desc: "Attrazione costante di risorse ed opportunità. Il soggetto agisce come vero hub del campo." };
    return { lvl: 9, name: "Creativa Totale (Non-Dualità)", bio: "Gamma + 51.625 GHz DNA & 7 Hz • > 90% Coer.", desc: "Co-creazione consapevole istantanea. Modulazione e coerenza molecolare nel DNA. S = φ(f) stabile." };
  };

  const levelInfo = get9LevelsInfo(synchronisticIntensity);

  // Auto-sync audio differential frequency based on level parameters for immersion!
  useEffect(() => {
    if (isPlaying) {
      if (levelInfo.lvl === 1) setBinauralBeat(4); // Delta
      else if (levelInfo.lvl === 2) setBinauralBeat(6); // Theta
      else if (levelInfo.lvl === 3) setBinauralBeat(10); // Alpha
      else if (levelInfo.lvl === 4) setBinauralBeat(15); // Beta
      else if (levelInfo.lvl === 5) setBinauralBeat(18); // Beta alta
      else if (levelInfo.lvl >= 6) setBinauralBeat(40); // Gamma brain resonance!
    }
  }, [levelInfo.lvl, isPlaying]);

  return (
    <div className="bg-white border-2 border-[#0066CC] rounded-3xl p-6 md:p-8 relative overflow-hidden" id="frequency-experiment-lab">
      {/* Dynamic top header bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0066CC] via-[#3399FF] to-[#0066CC]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#0066CC] pb-5 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50/50 border border-[#0066CC] rounded-xl text-[#0066CC]">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-black text-base text-[#0066CC] tracking-wider uppercase">
              Laboratorio Frequenze ed Esperimenti Coerenti
            </h3>
            <p className="text-[10px] font-mono text-black uppercase tracking-wider font-bold">
              Simulatore Algoritmico del Sistema Brevettato AIC-Sync© &amp; Trilogia AIC-EC
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[10px] font-mono text-black bg-slate-100/80 border border-[#0066CC] px-3.5 py-1.5 rounded-full select-all font-bold">
          <Shield className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>DOI: 10.5281/zenodo.17041593</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 items-start">
        
        {/* LEFT COLUMN: Sliders & Controls */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Section 1: PELAQ Input Parameters */}
          <div className="border border-[#0066CC]/40 rounded-2xl p-5 bg-white space-y-4">
            <h4 className="text-xs font-sans font-bold text-black uppercase tracking-wider flex items-center gap-2 border-b border-[#0066CC]/30 pb-2">
              <Sliders className="w-4 h-4 text-[#0066CC]" />
              <span>1. Modulo di Input Biofisiologico (Parametri PELAQ)</span>
            </h4>

            {/* P Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="font-bold text-black uppercase">P - Pensiero (Coerenza Onde Gamma)</span>
                <span className="text-[#0066CC] font-black">{pensiero} / 10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="0.5"
                value={pensiero} onChange={(e) => setPensiero(Number(e.target.value))}
                className="w-full h-1.2 rounded bg-slate-100 appearance-none cursor-pointer accent-[#0066CC]"
              />
            </div>

            {/* E Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="font-bold text-black uppercase">E - Emozione (RMSSD Coerenza Cardiaca)</span>
                <span className="text-[#0066CC] font-black">{emozione} / 10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="0.5"
                value={emozione} onChange={(e) => setEmozione(Number(e.target.value))}
                className="w-full h-1.2 rounded bg-slate-100 appearance-none cursor-pointer accent-[#0066CC]"
              />
            </div>

            {/* L Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="font-bold text-black uppercase">L - Lateralità (Connettività Interemisferica)</span>
                <span className="text-[#0066CC] font-black">{lateralita} / 10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="0.5"
                value={lateralita} onChange={(e) => setLateralita(Number(e.target.value))}
                className="w-full h-1.2 rounded bg-slate-100 appearance-none cursor-pointer accent-[#0066CC]"
              />
            </div>

            {/* A Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="font-bold text-black uppercase">A - Azione (Intenzionalità Motoria)</span>
                <span className="text-[#0066CC] font-black">{azione} / 10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="0.5"
                value={azione} onChange={(e) => setAzione(Number(e.target.value))}
                className="w-full h-1.2 rounded bg-slate-100 appearance-none cursor-pointer accent-[#0066CC]"
              />
            </div>

            {/* Q Slider */}
            <div>
              <div className="flex justify-between text-[11px] font-mono mb-1">
                <span className="font-bold text-black uppercase">Q - Coerenza Quantistica (Campo Locale)</span>
                <span className="text-[#0066CC] font-black">{quantico} / 10</span>
              </div>
              <input 
                type="range" min="0" max="10" step="0.5"
                value={quantico} onChange={(e) => setQuantico(Number(e.target.value))}
                className="w-full h-1.2 rounded bg-slate-100 appearance-none cursor-pointer accent-[#0066CC]"
              />
            </div>
          </div>

          {/* Section 2: Temporal & Contextual parameters */}
          <div className="border border-[#0066CC]/40 rounded-2xl p-5 bg-white space-y-4">
            <h4 className="text-xs font-sans font-bold text-black uppercase tracking-wider flex items-center gap-2 border-b border-[#0066CC]/30 pb-2">
              <Clock className="w-4 h-4 text-[#0066CC]" />
              <span>2. Variabili di Contesto Cosmico &amp; Decadimento</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-black uppercase">Ritardo Tempo (Δt)</span>
                  <span className="text-[#0066CC] font-bold">{deltaTime} s</span>
                </div>
                <input 
                  type="range" min="0" max="120" value={deltaTime} 
                  onChange={(e) => setDeltaTime(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer accent-[#0066CC]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-black uppercase">Costante di Tempo (τ)</span>
                  <span className="text-[#0066CC] font-bold">{tau} s</span>
                </div>
                <input 
                  type="range" min="10" max="90" value={tau} 
                  onChange={(e) => setTau(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer accent-[#0066CC]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-black uppercase">Coerenza Funzione Ψ</span>
                  <span className="text-[#0066CC] font-bold">{psiQuantum}</span>
                </div>
                <input 
                  type="range" min="0.1" max="1.0" step="0.05" value={psiQuantum} 
                  onChange={(e) => setPsiQuantum(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer accent-[#0066CC]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-black uppercase">Geometria Metrica G</span>
                  <span className="text-[#0066CC] font-bold">{gMetrica} x</span>
                </div>
                <input 
                  type="range" min="1.0" max="2.0" step="0.05" value={gMetrica} 
                  onChange={(e) => setGMetrica(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer accent-[#0066CC]"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Math Outcomes, Matrix, & Audio synth */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Scientific Formulas Outputs */}
          <div className="bg-blue-50/30 border-2 border-[#0066CC] rounded-3xl p-6 text-black space-y-5">
            <h4 className="text-xs font-sans font-bold text-black uppercase tracking-wider flex items-center gap-2 border-b border-[#0066CC]/30 pb-2">
              <Activity className="w-4 h-4 text-[#0066CC]" />
              <span>3. Risultanze Matematiche in Tempo Reale</span>
            </h4>

            {/* Dynamic S, US, Pi Gauges */}
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-white border border-[#0066CC]/60 rounded-xl p-3">
                <span className="text-[8px] font-mono text-slate-500 uppercase block leading-none mb-1 font-bold">Intensity (S)</span>
                <span className="text-xl font-serif font-black text-black block leading-none">{synchronisticIntensity}</span>
                <span className="text-[7.5px] font-mono text-[#0066CC] block mt-1 uppercase leading-none font-semibold">Σ w_i σ(X_i) + Σ_jk</span>
              </div>
              <div className="bg-white border border-[#0066CC]/60 rounded-xl p-3">
                <span className="text-[8px] font-mono text-slate-500 uppercase block leading-none mb-1 font-bold">Trace US = Tr(T)</span>
                <span className="text-xl font-serif font-black text-black block leading-none">{synchronisticUnit}</span>
                <span className="text-[7.5px] font-mono text-[#0066CC] block mt-1 uppercase leading-none font-semibold">Diag. Coherence</span>
              </div>
              <div className="bg-white border border-[#0066CC]/60 rounded-xl p-3">
                <span className="text-[8px] font-mono text-slate-500 uppercase block leading-none mb-1 font-bold">Potential (Π)</span>
                <span className="text-xl font-serif font-black text-black block leading-none">{totalCreativePotential}</span>
                <span className="text-[7.5px] font-mono text-[#0066CC] block mt-1 uppercase leading-none font-semibold">Σ · e<sup>-Δt/τ</sup> · Ψ · G</span>
              </div>
            </div>

            {/* The 5x5 Creative Tensor interactive rendering */}
            <div>
              <span className="text-[8px] font-mono text-slate-500 uppercase block mb-1.5 font-bold">Rappresentazione Visiva del Tensore Creativo 5×5 (T<sub>ij</sub>)</span>
              <div className="grid grid-cols-5 gap-1 p-2 bg-white border border-[#0066CC]/45 rounded-xl font-mono text-[9px]">
                {tensor.map((row, rIdx) => 
                  row.map((cell, cIdx) => {
                    const isDiagonal = rIdx === cIdx;
                    return (
                      <div 
                        key={`${rIdx}-${cIdx}`}
                        className={`h-7 rounded flex items-center justify-center transition-all ${
                          isDiagonal 
                            ? 'bg-[#0066CC] text-white border border-blue-900 font-bold' 
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-black text-[8px]'
                        }`}
                        title={isDiagonal ? `T_diag: PELAQ_${rIdx}` : `Synergy T[${rIdx}][${cIdx}]: ${cell.toFixed(4)}`}
                      >
                        {cell.toFixed(2)}
                      </div>
                    );
                  })
                )}
              </div>
              <div className="flex justify-between text-[7px] font-mono text-slate-500 mt-1 uppercase tracking-wider">
                <span>*Blu = Diagonale Tr(T) (Unità Sincronica)</span>
                <span>*Grigio = Sinergie Off-Diagonal (Attività mutua)</span>
              </div>
            </div>

            {/* Simulated 9 Levels Status Card */}
            <div className="bg-white border border-[#0066CC] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono px-2 py-0.5 bg-[#0066CC] text-white rounded font-bold uppercase leading-none">
                  LIVELLO {levelInfo.lvl} / 9
                </span>
                <span className="text-[8.5px] font-mono text-slate-500 uppercase font-black">{levelInfo.bio}</span>
              </div>
              <h5 className="text-xs font-sans font-bold text-black uppercase mb-1">
                {levelInfo.name}
              </h5>
              <p className="text-[10px] text-slate-700 leading-relaxed font-sans">
                {levelInfo.desc}
              </p>
            </div>

          </div>

          {/* Sintonico Sound wave synthesizer */}
          <div className="border border-black rounded-2xl p-5 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h4 className="text-xs font-sans font-bold text-black uppercase tracking-wider flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#0066CC]" />
                <span>4. Generatore di Onde Isocroniche (432 Hz)</span>
              </h4>
              <span className="text-[8px] font-mono text-white bg-[#0066CC] px-2 py-0.5 rounded leading-none uppercase font-bold">
                Binaural Loop
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-black uppercase">Portante Carrier</span>
                  <span className="text-[#0066CC] font-bold">{carrierFreq} Hz</span>
                </div>
                <input 
                  type="range" min="400" max="450" value={carrierFreq} 
                  onChange={(e) => setCarrierFreq(Number(e.target.value))}
                  className="w-full h-1 appearance-none cursor-pointer accent-[#0066CC]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] font-mono mb-1">
                  <span className="text-black uppercase">Volume Audio</span>
                  <span className="text-[#0066CC] font-bold">{Math.round(volume * 100)}%</span>
                </div>
                <div className="flex items-center gap-1">
                  <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                  <input 
                    type="range" min="0" max="0.5" step="0.05" value={volume} 
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-full h-1 appearance-none cursor-pointer accent-[#0066CC]"
                  />
                </div>
              </div>
            </div>

            {/* Play/Pause triggers and real frequency match indicators */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {!isPlaying ? (
                <button
                  onClick={startSound}
                  className="flex-1 py-3 bg-[#0066CC] hover:bg-black text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer border border-[#004C99]"
                >
                  <Play className="w-4 h-4 fill-current text-white" />
                  <span>AVVIA ACCORDATORE DI RISONANZA 432 HZ</span>
                </button>
              ) : (
                <button
                  onClick={stopSound}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer border border-red-700"
                >
                  <Pause className="w-4 h-4 fill-current text-white" />
                  <span>ARRESTA EMISSIONE FREQUENZE</span>
                </button>
              )}
            </div>

            <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-500 uppercase tracking-widest pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1 text-[#0066CC]">
                <Zap className="w-3 h-3 text-[#0066CC]" />
                <span>Differenziale sincronizzato sul Livello {levelInfo.lvl}: {binauralBeat} Hz ({levelInfo.lvl >= 6 ? 'Cognitive Gamma' : levelInfo.lvl >= 4 ? 'Beta/Focus' : 'Alpha/Relax'})</span>
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Official Footnote citation of European Union patent & certificates registries */}
      <div className="pt-4 border-t border-[#0066CC]/50 flex flex-col sm:flex-row justify-between items-center text-[8.5px] font-mono text-black uppercase tracking-wider gap-2">
        <span className="flex items-center gap-1 font-bold text-[#0066CC]">
          <Zap className="w-3.5 h-3.5 text-[#0066CC]" />
          <span>FDL INTEGRATED PATENTS AND REGISTRIES SYSTEM APPROVED</span>
        </span>
        <span className="text-slate-700 font-semibold">
          FONDAZIONE FALACE delle AIC • PATRIMONIO DELLE ATTIVITÀ INTELLETTIVE CREATIVE NEI RIGUARDI DELLE ARTI E DELLE SCIENZE
        </span>
      </div>
    </div>
  );
}

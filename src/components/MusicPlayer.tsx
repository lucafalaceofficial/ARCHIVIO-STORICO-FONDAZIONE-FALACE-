import React, { useState, useEffect } from 'react';
import { MUSIC_PLAYLIST } from '../data/archiveData.js';
import { startHertzianCarrier, stopHertzianCarrier, isAudioRunning } from '../utils/audioSynth.js';
import { Music, Play, Square, Headphones, Info, Radio } from 'lucide-react';

export default function MusicPlayer() {
  const [playingTrackNum, setPlayingTrackNum] = useState<number | null>(null);
  const [carrierFreq, setCarrierFreq] = useState(432);
  const [alphaFreq, setAlphaFreq] = useState(8);

  const handleToggleTrack = (num: number) => {
    if (playingTrackNum === num) {
      stopHertzianCarrier();
      setPlayingTrackNum(null);
    } else {
      // Different configurations based on selected track
      let cf = 432;
      let af = 8; // Alpha deep

      if (num === 2) { af = 4; } // Theta deep
      if (num === 3) { af = 10; } // Alpha light
      if (num === 4) { af = 6; } // Alpha-Theta threshold
      if (num === 5) { af = 7.83; } // Schumann Resonance
      if (num === 6) { af = 12; } // Beta threshold

      setCarrierFreq(cf);
      setAlphaFreq(af);

      const success = startHertzianCarrier(cf, af);
      if (success) {
        setPlayingTrackNum(num);
      }
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopHertzianCarrier();
    };
  }, []);

  return (
    <section className="py-16 px-6 border-b border-[#0066CC] bg-white scroll-mt-16" id="hertzian-synthesizer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Visual explanation / control panel (Left) */}
        <div className="lg:col-span-5">
          <div className="inline-flex items-center gap-2 text-[#0066CC] font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Radio className="w-4 h-4 text-[#0066CC] animate-pulse" />
            <span>Sintonia Frequenziale 432 Hz</span>
          </div>
          
          <h2 className="text-3xl font-serif font-black tracking-tight text-black sm:text-4xl">
            Laboratorio Bioacustico
          </h2>
          
          <p className="text-black text-sm mt-3 leading-relaxed font-sans">
            Il Dott. Luca Falace teorizza nel volume <strong className="text-black">"Frequenze Hertziane"</strong> l'interazione diretta della coscienza con i campi elettrofisiologici del cervello. Sperimenta qui una configurazione di risonanza isocronica sintonizzata sul cardine aureo a 432 Hz e modulante a 8 Hz (Picco Alpha).
          </p>

          {/* Headphones alert banner */}
          <div className="mt-6 p-4 bg-white border border-[#0066CC] rounded-2xl flex items-start gap-3.5 text-xs text-black ">
            <Headphones className="w-6 h-6 text-[#0066CC] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-black mb-0.5 font-bold font-sans">Si Consiglia l'Uso di Cuffie</strong>
              I battiti binaurali teorizzati nel brevetto <strong className="text-black">AIC-SYNC©</strong> generano onde coerenti sincronizzando l'emisfero sinistro (canale a {carrierFreq} Hz) ed l'emisfero destro (canale a {carrierFreq + alphaFreq} Hz).
            </div>
          </div>

          {/* Active stats */}
          {playingTrackNum !== null && (
            <div className="mt-6 bg-white border border-[#0066CC] p-4 rounded-xl flex items-center justify-between ">
              <div>
                <span className="text-[9px] font-mono text-black uppercase block font-bold">Portante Attiva</span>
                <span className="text-sm font-mono font-black text-[#0066CC]">{carrierFreq} Hz + {alphaFreq} Hz (Alpha)</span>
              </div>
              
              {/* Waves pulse design */}
              <div className="flex items-end gap-1 h-8">
                {[1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 5, 2, 1].map((h, i) => (
                  <span 
                    key={i} 
                    className="w-[3px] bg-[#0066CC] rounded-full animate-bounce"
                    style={{ 
                      height: `${h * 15}%`, 
                      animationDuration: `${0.4 + (i * 0.08)}s`,
                      animationDelay: `${i * 0.05}s` 
                    }} 
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tracks List (Right) */}
        <div className="lg:col-span-7 bg-white border border-[#0066CC] rounded-2xl p-6 md:p-8 ">
          <h3 className="text-black font-mono text-xs uppercase tracking-widest border-b border-[#0066CC] pb-3 mb-4 font-bold flex justify-between">
            <span>Composizioni dello Studio ({MUSIC_PLAYLIST.length})</span>
            <span className="text-[#0066CC]">432 Hz + Binaural Hz</span>
          </h3>

          <div className="space-y-2.5">
            {MUSIC_PLAYLIST.map((track) => {
              const isPlaying = playingTrackNum === track.num;
              return (
                <div 
                  key={track.num}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    isPlaying 
                      ? 'bg-white border-[#0066CC] text-[#0066CC]  ring-1 ring-[#0066CC]/20' 
                      : 'bg-white/60 border-[#0066CC] text-black hover:border-[#0066CC] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className={`p-2 rounded-lg border text-xs font-mono font-bold shrink-0 ${
                      isPlaying 
                        ? 'bg-white border-2 border-[#0066CC] border-[#0066CC] text-[#0066CC] animate-pulse' 
                        : 'bg-white border-[#0066CC] text-black'
                    }`}>
                      {String(track.num).padStart(2, '0')}
                    </div>
                    
                    <div className="truncate">
                      <p className={`text-xs sm:text-sm font-bold truncate ${isPlaying ? 'text-black' : 'text-black'}`}>
                        {track.title}
                      </p>
                      <p className="text-[9.5px] font-mono text-black font-semibold uppercase">
                        Sincronizzazione Isocronica
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleTrack(track.num)}
                    className={`p-2.5 rounded-xl cursor-pointer  transition-all ${
                      isPlaying 
                        ? 'bg-red-50 hover:bg-red-100 border border-red-200 text-red-650' 
                        : 'bg-[#0066CC] text-white hover:bg-blue-750 border border-[#004C99] active:scale-95'
                    }`}
                    title={isPlaying ? "Disattiva Sintonia" : "Attiva Risonanza"}
                    aria-label={isPlaying ? "Stop Track" : "Play Track"}
                  >
                    {isPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-5 text-right">
            <span className="text-[10px] font-mono text-black font-bold uppercase">
              U.S. Copyright Registry &amp; CERN Zenodo Academic Registry
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

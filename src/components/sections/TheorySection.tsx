import React, { useState } from 'react';
import { SYNCHRONICITY_THEORY } from '../../data/archiveData.js';
import { Sparkles, Info, ShieldCheck, Flame, Layers, Radio } from 'lucide-react';
import AudioHarmonizer from '../AudioHarmonizer.js';

export default function TheorySection() {
  const [activeLevel, setActiveLevel] = useState<number | null>(3); // Default to Level 3

  return (
    <section className="py-16 px-6 border-b border-[#0066CC] bg-white scroll-mt-16" id="theory-section">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 text-[#0066CC] font-mono text-xs uppercase tracking-widest mb-3 font-semibold">
            <Layers className="w-4 h-4 text-[#0066CC]" />
            <span>Fisica dei Campi &amp; Sincronismo Indotto</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-black">
            Teoria del Sincronismo Creativo &amp; Campo Unificato AIC
          </h2>
          
          <p className="text-black text-sm mt-3 max-w-3xl leading-relaxed">
            Il corpus dottrinario del Dott. Luca Falace formalizza l'interazione diretta della mente con i campi elettromagnetici e quantistici ambientali. Questa tesi è depositata stabilmente su <strong className="text-black">CERN Zenodo</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">
          
          <div className="lg:col-span-5 bg-white border border-[#0066CC] rounded-2xl p-8 flex flex-col justify-between  relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl pointer-events-none" />
            
            <div>
              <span className="text-[10px] font-mono text-black uppercase tracking-wider block mb-4">
                La Legge di Risonanza del Campo Unificato
              </span>
              
              <div className="py-8 text-center bg-white border border-[#EAE5DF] rounded-xl my-4 ">
                <div className="text-4xl md:text-5xl font-serif font-bold text-black tracking-wider select-all">
                  S = φ(f)
                </div>
                <div className="text-[10px] font-mono text-black mt-3 uppercase tracking-widest font-semibold">
                  Equazione di Sintonizzazione Strutturata
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-black italic leading-relaxed font-serif pl-3 border-l-2 border-[#0066CC]">
                "{SYNCHRONICITY_THEORY.description_it}."
              </p>
              
              <div className="mt-5 pt-4 border-t border-black flex items-center justify-between">
                <span className="text-[10px] font-mono text-black">Zenodo ID: 10.5281/zenodo.20414984</span>
                <span className="text-[10px] uppercase font-bold text-[#0066CC] font-sans tracking-wider">Trilogia Vol. III</span>
              </div>
            </div>

          </div>

          <div className="lg:col-span-7 bg-white border border-[#0066CC] rounded-2xl p-6 sm:p-8 flex flex-col justify-between ">
            
            <div>
              <h3 className="text-sm font-sans font-bold text-black uppercase tracking-wider mb-6 pb-2 border-b border-[#0066CC] flex items-center gap-2">
                <Flame className="w-4.5 h-4.5 text-[#0066CC]" />
                <span>I 9 Livelli della Sincronicità (Brevetto AIC-SYNC©)</span>
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 mb-6">
                {SYNCHRONICITY_THEORY.levels.map((level) => {
                  const isActive = activeLevel === level.num;
                  return (
                    <button
                      key={level.num}
                      onClick={() => setActiveLevel(level.num)}
                      className={`h-11 rounded-xl font-mono text-xs font-bold transition-all border flex flex-col items-center justify-center cursor-pointer ${
                        isActive
                           ? 'bg-white border-2 border-[#0066CC] text-[#0066CC] scale-105'
                           : 'bg-white border-[#0066CC] text-black hover:border-[#0066CC] hover:text-[#0066CC]'
                      }`}
                      title={level.title}
                    >
                      <span className="text-[9px] text-[#0066CC] font-mono block">Lvl</span>
                      <span>{level.num}</span>
                    </button>
                  );
                })}
              </div>

              {activeLevel !== null && (
                <div className="bg-white border border-[#0066CC] rounded-xl p-6 flex flex-col justify-between min-h-[140px] animate-fade-in">
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-white border-2 border-[#0066CC] text-[#0066CC] border border-[#0066CC] rounded font-bold">
                        LIVELLO {activeLevel}
                      </span>
                      <h4 className="text-sm font-sans font-bold text-black">
                        {SYNCHRONICITY_THEORY.levels[activeLevel - 1].title}
                      </h4>
                    </div>
                    <p className="text-xs text-black leading-relaxed font-sans">
                      {SYNCHRONICITY_THEORY.levels[activeLevel - 1].description}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 text-right">
              <span className="text-[9.5px] text-black font-mono">
                *Analizzato storiograficamente nel deposito di brevetto UIBM-2024-AIC01
              </span>
            </div>

          </div>

        </div>

        {/* Coherent Frequencies Laboratory segment Integration */}
        <div className="mt-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-[#0066CC] font-mono text-xs uppercase tracking-widest mb-2 font-bold animate-pulse">
              <Radio className="w-4 h-4 text-[#0066CC]" />
              <span>Attivazione Sperimentale • Sintonizzazione Hertziana</span>
            </div>
            <h3 className="text-xl font-serif font-black tracking-tight text-black">
              Laboratorio di Sperimentazione e Calcolo Sincronico Coerente
            </h3>
            <p className="text-xs text-slate-700 mt-1 max-w-3xl leading-relaxed">
              Interagisci con i parametri ed eleva la sintonizzazione psicofisica (PELAQ) per misurare l'intensità sincronica S, Tr(T) ed il potenziale creativo Π in accordo con i depositi Zenodo e CERN del Fondatore.
            </p>
          </div>
          
          <AudioHarmonizer />
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { RefreshCw, Cpu, Layers, Sparkles } from 'lucide-react';

export default function PatternConnector() {
  const [stage, setStage] = useState<'emission' | 'coupling' | 'coherence'>('emission');

  const stageData = {
    'emission': {
      title: "Emissione EEG Coerente (f)",
      formula: "f = α, θ (8Hz - 12Hz)",
      desc: "Il cervello entra in stato meditativo o di focus d'ingegno, riducendo lo spettro delle interferenze termiche neurali."
    },
    'coupling': {
      title: "Accoppiamento Isocronico (φ)",
      formula: "φ = Fattore di Risonanza FDL",
      desc: "L'allineamento di fase legante le portanti cerebrali con le fluttuazioni magnetoelettriche ambientali a 432 Hz."
    },
    'coherence': {
      title: "Coerenza e Sincronicità (S)",
      formula: "S = φ(f) di Solvay CERN",
      desc: "Collasso della coincidenza significativa: l'evento esterno collima con l'intento interno in un picco d'ingegno."
    }
  };

  return (
    <div className="bg-white border border-[#0066CC] rounded-2xl p-6 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-4 mb-4">
        <div className="p-2 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Layers className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
            Connessione di Pattern Isocronico
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Ciclo di Feedback Mente-Spazio • FDL-SYNC
          </p>
        </div>
      </div>

      <p className="text-xs text-black leading-relaxed mb-4">
        Il processo di accoppiamento si avvale di tre passaggi stazionari logici, registrati nella tesi della trilogia e nel brevetto del Dott. Luca Falace.
      </p>

      {/* Selector Stages */}
      <div className="grid grid-cols-3 gap-1.5 p-1 bg-white border border-[#0066CC] rounded-xl mb-4">
        {(Object.keys(stageData) as Array<keyof typeof stageData>).map((st) => (
          <button
            key={st}
            onClick={() => setStage(st)}
            className={`py-2 text-center rounded-lg text-[9.5px] font-mono font-bold uppercase tracking-wider cursor-pointer ${
              stage === st 
                ? 'bg-white border border-black text-[#0066CC] ' 
                : 'text-slate-505 hover:text-black'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Screen panel */}
      <div className="bg-white border border-[#0066CC] p-4.5 rounded-xl">
        <div className="flex justify-between items-center mb-2 pb-1.5 border-b border-[#0066CC]">
          <span className="text-[11.5px] font-bold text-black uppercase font-sans">
            {stageData[stage].title}
          </span>
          <span className="text-[9.5px] font-mono bg-white border border-[#0066CC] px-2 py-0.5 rounded font-black text-[#0066CC]">
            {stageData[stage].formula}
          </span>
        </div>
        <p className="text-[11px] text-black leading-relaxed font-sans">
          {stageData[stage].desc}
        </p>
      </div>
    </div>
  );
}

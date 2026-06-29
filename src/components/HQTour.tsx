import React from 'react';
import { Building2, MapPin, Compass, Eye } from 'lucide-react';

export default function HQTour({ language }: { language: string }) {
  const isIt = language === 'IT' || language === 'it';
  return (
    <div className="bg-[#FAF9F5] border border-[#b8963e]/30 rounded-3xl p-8 shadow-xl text-[#0a2342] my-8">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-8 h-8 text-[#b8963e]" />
        <div>
          <h3 className="font-serif text-2xl font-bold tracking-tight">
            {isIt ? "Tour Virtuale Quartier Generale & Sede Istituzionale" : "Virtual Tour: AIC Headquarters & Foundation Hub"}
          </h3>
          <p className="text-xs font-mono text-[#0a2342]/70 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-[#b8963e]" /> Roma / Ginevra — Palazzo Falace della Sincronicità
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <Compass className="w-6 h-6 text-[#0a2342] mb-3" />
            <h4 className="font-bold text-lg mb-2">{isIt ? "Sala della Teoria Unificata" : "Unified Theory Hall"}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isIt ? "Esposizione permanente dei manoscritti originali sui 9 livelli di sincronicità e schemi di risonanza cosmica." : "Permanent exhibition of original manuscripts detailing the 9 levels of synchronicity."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#b8963e] mt-4 font-semibold uppercase tracking-wider block">Livello +1 — Archivio</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <Eye className="w-6 h-6 text-[#0a2342] mb-3" />
            <h4 className="font-bold text-lg mb-2">{isIt ? "Polo Museale & Pinacoteca" : "Art Collection Gallery"}</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {isIt ? "Oltre 250 opere d'arte della Collezione Falace connesse ai paradigmi quantistici della forma e del colore." : "Over 250 artworks from the Falace Collection connected to quantum aesthetics."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#b8963e] mt-4 font-semibold uppercase tracking-wider block">Livello +2 — Arte & Cultura</span>
        </div>
        <div className="bg-white text-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <Building2 className="w-6 h-6 text-[#1877F2] mb-3" />
            <h4 className="font-bold text-lg mb-2 text-slate-900">{isIt ? "Laboratori di Armonizzazione" : "432 Hz Acoustics Lab"}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {isIt ? "Stanze acusticamente isolate calibrate sulle frequenze biologiche a 432 Hz per la sperimentazione sinergica." : "Acoustically isolated chambers calibrated to 432 Hz biological frequencies."}
            </p>
          </div>
          <span className="text-xs font-mono text-[#1877F2] mt-4 font-semibold uppercase tracking-wider block">Livello -1 — Ricerca</span>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { FileCode2, Search, Shield, Cpu, Zap, Lightbulb, ExternalLink } from 'lucide-react';

interface FatherPatentsProps {
  language?: string;
}

const LUCIO_PATENTS_SAMPLE = [
  { id: 'WO1992015144A1', title: 'Electronic Ballast with High Power Factor for Fluorescent Lamps', year: '1992', office: 'WIPO / PCT', category: 'Illuminotecnica' },
  { id: 'IT1254890B', title: 'Circuito modulatore di frequenza d’onda per il risparmio d’energia', year: '1990', office: 'UIBM Italia', category: 'Elettronica di Potenza' },
  { id: 'EP0542111A1', title: 'Solid State Frequency Converter with Automatic Resonance Tracking', year: '1993', office: 'EPO Europa', category: 'Convertitori' },
  { id: 'SG1994022A', title: 'Compressed Gas Fluorescent Lighting Control Unit', year: '1994', office: 'Singapore IP', category: 'Illuminotecnica' },
  { id: 'TR19950089A', title: 'Yüksek Verimli Elektronik Kontrol Cihazı (High Efficiency Controller)', year: '1995', office: 'TPI Turchia', category: 'Elettronica' },
  { id: 'WO1998011234A2', title: 'Synchronized Pulse Generator for Industrial Electro-Pneumatic Actuators', year: '1998', office: 'WIPO / PCT', category: 'Automazione' }
];

export default function FatherPatents({ language = 'it' }: FatherPatentsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const isIt = language === 'it';

  const filtered = LUCIO_PATENTS_SAMPLE.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-[#1877F2] border border-blue-100">
            <FileCode2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1877F2]">
              {isIt ? 'Corpus Brevettuale Integrale · WIPO Patentscope' : 'Complete Patent Corpus · WIPO Patentscope'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
              {isIt ? 'Le 46 Invenzioni di Lucio Falace' : 'The 46 Inventions of Lucio Falace'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-800 border border-slate-200">
            46 Brevetti Registrati
          </span>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <h4 className="font-bold text-base text-slate-900 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          {isIt ? "Pioniere dell'Elettronica di Potenza e della Risonanza" : "Pioneer of Power Electronics & Resonance"}
        </h4>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {isIt
            ? "Lucio Falace, padre del Fondatore Dott. Luca Falace, ha costruito una carriera straordinaria come perito elettronico e inventore dominando l'illuminotecnica a fluorescenza compressa, i reattori elettronici ad altissimo fattore di potenza e la modulazione di segnale. Le sue intuizioni hanno anticipato di decenni le odierne normative sul risparmio energetico globale."
            : "Lucio Falace, father of Founder Dr. Luca Falace, built an extraordinary career as an electronic inventor dominating compressed fluorescent lighting and high power factor electronic ballasts."}
        </p>
      </div>

      {/* Ricerca e Filtri */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isIt ? "Cerca tra i brevetti di Lucio Falace..." : "Search Lucio Falace patents..."}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-[#1877F2] bg-white shadow-2xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="p-5 rounded-xl border border-slate-200 bg-white hover:border-[#1877F2] transition-colors flex flex-col justify-between space-y-3 shadow-2xs">
              <div>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-50 text-[#1877F2] rounded">
                    {p.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-bold">{p.year}</span>
                </div>
                <h5 className="font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                  {p.title}
                </h5>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-slate-400" />
                  {p.category}
                </span>
                <span className="font-bold text-slate-700">{p.office}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-mono">
            {isIt 
              ? "L'elenco integrale dei 46 fascicoli brevettuali con disegni tecnici e rivendicazioni è consultabile nel Dipartimento Istituzionale dell'Archivio WIPO."
              : "The complete list of 46 patent files is accessible in the Institutional WIPO Archive Department."}
          </p>
        </div>
      </div>
    </div>
  );
}

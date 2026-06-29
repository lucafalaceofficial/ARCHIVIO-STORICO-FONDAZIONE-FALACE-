import React from 'react';
import { Tv, Play, Award, Film, CheckCircle2 } from 'lucide-react';

interface FatherVideosProps {
  language?: string;
}

const VIDEOS_LIST = [
  {
    id: 'costanzo_show',
    title: 'Maurizio Costanzo Show (Canale 5)',
    subtitle: 'Dimostrazione empirica del risparmio energetico e primato italiano',
    year: '1994',
    network: 'Mediaset · Canale 5',
    desc: 'Lucio Falace presenta sul celebre palcoscenico del Teatro Parioli il primo reattore elettronico ad alta efficienza per lampade fluorescenti compresse.'
  },
  {
    id: 'cervelloni_bonolis',
    title: 'I Cervelloni — con Paolo Bonolis (Rai / Mediaset)',
    subtitle: 'Vincitore del Primo Premio Assoluto d’Invenzione',
    year: '1995',
    network: 'Rai 1 / Mediaset',
    desc: 'Lucio Falace trionfa nella storica trasmissione televisiva dedicata alle eccellenze inventive nazionali ricevendo il plauso tecnico e il primo premio.'
  },
  {
    id: 'teche_scienza',
    title: 'Speciale TG Scienza e Tecnica',
    subtitle: 'L’innovazione elettronica nella piccola e media impresa',
    year: '1996',
    network: 'Rai Teche',
    desc: 'Servizio di approfondimento sui laboratori di ricerca elettronica di Lucio Falace e sull’impatto delle sue 46 registrazioni WIPO.'
  }
];

export default function FatherVideos({ language = 'it' }: FatherVideosProps) {
  const isIt = language === 'it';

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-[#1877F2] border border-blue-100">
            <Tv className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1877F2]">
              {isIt ? 'Teche TV Nazionali & Dimostrazioni Storiche' : 'National TV Archives & Historic Demos'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
              {isIt ? 'Lucio Falace in TV — Costanzo Show & I Cervelloni' : 'Lucio Falace on TV — National Broadcasts'}
            </h3>
          </div>
        </div>

        <span className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full font-mono text-xs font-bold w-fit">
          Digitalizzazione HD Teche
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {isIt
            ? "Le innovazioni del perito elettronico Lucio Falace (padre del Fondatore Luca Falace) raggiunsero il grande pubblico attraverso le trasmissioni televisive di maggior prestigio del periodo d'oro dei media italiani, testimoniando il valore civile e tecnologico del suo ingegno."
            : "The innovations of electronic technologist Lucio Falace reached the general public through Italy's most prestigious television broadcasts."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {VIDEOS_LIST.map(v => (
          <div key={v.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
            <div>
              <div className="aspect-video bg-slate-900 relative flex items-center justify-center group cursor-pointer">
                <Film className="w-12 h-12 text-slate-700 absolute select-none" />
                <div className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform z-10">
                  <Play className="w-6 h-6 ml-0.5 fill-current" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[10px]">
                  Archivio RAI/Mediaset
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                  <span>{v.network}</span>
                  <span className="font-bold text-slate-600">{v.year}</span>
                </div>
                <h4 className="font-bold text-base text-slate-900 leading-snug">
                  {v.title}
                </h4>
                <span className="block text-xs font-semibold text-[#1877F2]">
                  {v.subtitle}
                </span>
                <p className="text-xs text-slate-600 pt-2 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                {isIt ? "Audio/Video Verbatim" : "Verified Master"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

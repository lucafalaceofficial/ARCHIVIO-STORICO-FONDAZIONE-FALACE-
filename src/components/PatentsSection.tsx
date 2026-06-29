import React, { useState } from 'react';
import { INVENTIONS_CATALOG, Invention } from '../data/archiveData.js';
import { Award, Cpu, ShieldCheck, Heart, HelpCircle, ArrowRight } from 'lucide-react';

export default function PatentsSection() {
  const [activePatent, setActivePatent] = useState<Invention>(INVENTIONS_CATALOG[0]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registered':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">Ufficiale Reg. (UIBM)</span>;
      case 'donated':
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">Dono Umanitario Libero</span>;
      case 'deposited':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-mono font-semibold">Depositato / Tutelato</span>;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 px-6 border-b border-[#0066CC] bg-white scroll-mt-16" id="patents">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-[#0066CC] font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Cpu className="w-4 h-4 text-[#0066CC]" />
            <span>Proprietà Industriale &amp; Tutele Ministeriali</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-black">
            Brevetti d'Invenzione &amp; Codici Logici FDL
          </h2>
          
          <p className="text-black text-sm mt-3 max-w-2xl leading-relaxed">
            Il corpus brevettuale e scientifico tutela i dispositivi e i codici logici ideati dal Dott. Luca Falace. Spazia dalle tecnologie bio-informatiche per il Sincronismo ai compattatori termodinamici ecologici.
          </p>
        </div>

        {/* Dynamic Interactive Panel Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* IP list (Left side) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <p className="text-xs font-mono text-black uppercase tracking-wider mb-2 font-semibold">
              Seleziona un Brevetto per visualizzare l'architettura tecnica ({INVENTIONS_CATALOG.length})
            </p>
            
            {INVENTIONS_CATALOG.map((inv) => {
              const isSelected = activePatent.id === inv.id;
              return (
                <button
                  key={inv.id}
                  onClick={() => setActivePatent(inv)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isSelected 
                      ? 'bg-white border-[#0066CC]  ring-1 ring-[#0066CC]/30' 
                      : 'bg-white/65 border-[#0066CC] hover:border-[#0066CC] hover:bg-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg border text-xs font-mono font-bold mt-1 shrink-0 ${
                    isSelected 
                      ? 'bg-white border-2 border-[#0066CC] border-[#0066CC] text-[#0066CC]' 
                      : 'bg-white border-[#0066CC] text-black'
                  }`}>
                    #{inv.number}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono text-black font-bold">{inv.year}</span>
                      {getStatusBadge(inv.status)}
                    </div>
                    
                    <h3 className={`text-xs font-bold leading-tight ${
                      isSelected ? 'text-black' : 'text-black'
                    }`}>
                      {inv.title}
                    </h3>
                    
                    <p className="text-[11px] text-black line-clamp-1 mt-1 font-sans">
                      {inv.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Patent specifications blueprint detail card (Right side) */}
          <div className="lg:col-span-7 bg-white border border-[#0066CC] rounded-2xl p-6 md:p-8 relative overflow-hidden ">
            {/* Hologram or grid matrix background decor */}
            <div className="absolute inset-0 bg-white   pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              
              {/* Card Header and Registry Number */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0066CC] pb-4 mb-6 gap-3">
                <div>
                  <span className="text-[9px] font-mono text-[#0066CC] uppercase tracking-widest font-bold">Deputazione d'Ingegneria Sincronica</span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-black">{activePatent.title}</h3>
                </div>
                
                {activePatent.patentNum && (
                  <div className="bg-white px-3 py-1.5 rounded-xl border border-[#0066CC] flex flex-col items-end min-w-[125px]">
                    <span className="text-[8px] font-mono text-black uppercase tracking-wider font-semibold">Targatura Brevetto</span>
                    <span className="text-xs font-mono text-[#0066CC] font-bold">{activePatent.patentNum}</span>
                  </div>
                )}
              </div>

              {/* Specs & Description Section */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] font-mono text-black uppercase tracking-wider mb-2 flex items-center gap-1.5 font-bold">
                    <span className="text-[#0066CC]">■</span> Oggetto del Brevetto
                  </h4>
                  <p className="text-black text-xs sm:text-sm leading-relaxed font-sans">
                    {activePatent.description}
                  </p>
                </div>

                <div className="bg-white border border-[#0066CC] p-4.5 rounded-xl">
                  <h4 className="text-[11px] font-mono text-[#0066CC] uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-bold">
                    <span>■</span> Specifiche di Risonanza o Architettura Fisica
                  </h4>
                  <p className="text-black text-xs leading-relaxed font-sans">
                    {activePatent.details}
                  </p>
                </div>
              </div>

              {/* Special highlights banner for specific key patents */}
              {activePatent.id === 'patent-2' && (
                <div className="mt-6 p-4.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-850">
                  <Award className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-emerald-900 mb-0.5">Premio Internazionale ed Ecomondo Green 2014</span>
                    Compattatore ad altissimo risparmio termodinamico realizzato con tesi d'ingegneria collegate ad ex-collaboratori NASA. Ha riscosso l'adesione del Presidente della Repubblica ed è storicizzato su Wikipedia per la straordinaria offerta in diretta a Shark Tank di €250.000 da parte di Fabio Cannavale.
                  </div>
                </div>
              )}

              {activePatent.id === 'patent-1' && (
                <div className="mt-6 p-4.5 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-900">
                  <Cpu className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-blue-950 mb-0.5">Attuatore AIC-SYNC© a Coerenza Isocronica</span>
                    Sviluppato partendo dall'esperimento a Città della Scienza (Napoli, 200 soggetti controllati tramite sensori EEG), il sistema adatta in tempo reale impulsi di portante 432Hz per allineare l'emisfero cerebrale sinistro e destro.
                  </div>
                </div>
              )}

              {activePatent.status === 'donated' && (
                <div className="mt-6 p-4.5 bg-white border-2 border-[#0066CC] border border-[#0066CC] rounded-xl flex items-start gap-3 text-xs text-black">
                  <Heart className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-black mb-0.5">Donazione Umanitaria Integrale</span>
                    Tecnologia brevettata di climatizzazione avanzata donata liberamente dal Dott. Luca Falace al corpo di Protezione Civile per agevolare l'immunità degli operatori sanitari.
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

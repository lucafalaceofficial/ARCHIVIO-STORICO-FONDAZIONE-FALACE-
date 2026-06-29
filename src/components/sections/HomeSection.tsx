import React from 'react';
import { Landmark, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { FOUNDATION_METADATA } from '../../data/archiveData.js';

interface HomeSectionProps {
  activeTab?: string;
  setActiveTab?: (tab: 'home' | 'institution' | 'departments' | 'patents' | 'catalog' | 'heritage' | 'music_lab') => void;
}

export default function HomeSection({ activeTab, setActiveTab }: HomeSectionProps) {
  const handleGoToDepartments = () => {
    if (setActiveTab) {
      setActiveTab('departments');
      setTimeout(() => {
        const element = document.getElementById('departments-section');
        if (element) {
          const offset = 140;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 150);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white border-b-4 border-[#0066CC] text-black py-12 px-6 font-sans">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        
        {/* Upper Corporate header inspired directly by Italian Government ministries layouts */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-b border-black pb-6 mb-8 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#0066CC] flex items-center justify-center shrink-0">
              <Landmark className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <div className="text-[#0066CC] font-serif font-bold text-sm tracking-widest uppercase leading-tight">
                {FOUNDATION_METADATA.denomination_it}
              </div>
              <div className="text-[10px] font-mono text-black uppercase tracking-widest leading-none mt-1">
                PATRIMONIO DELLE ATTIVITÀ INTELLETTIVE CREATIVE NEI RIGUARDI DELLE ARTI E DELLE SCIENZE
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap justify-end md:text-right">
            <span className="text-[10px] font-mono font-bold text-[#0066CC] tracking-wider uppercase">
              ARCHIVIO DOCUMENTAZIONE FONDAZIONE FALACE
            </span>
            <div className="px-3 py-1 bg-white border-2 border-[#0066CC] text-[9px] font-mono font-bold tracking-widest text-[#0066CC] flex items-center gap-1.5 uppercase shrink-0">
              <Globe className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>6 ENTI DI TUTELA</span>
            </div>
          </div>
        </div>

        {/* Central Dashboard Introduction and CTA button */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-3xl text-left">
            <span className="text-[10px] font-mono text-[#0066CC] uppercase tracking-[0.2em] font-black block mb-2">
              DIREZIONE GENERALE ARCHIVI • PORTALE UNICO DI ACCESSO
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight leading-tight text-black mb-4">
              La Tutela ed il Patrimonio di Studio e Ricerca
            </h2>
            <p className="text-black text-xs sm:text-sm leading-relaxed font-serif italic pl-4 border-l-2 border-[#0066CC]">
              In conformità alle linee guida e agli standard di catalogazione ministeriali, l'intero patrimonio scientifico, artistico, bibliografico e brevettuale del Fondatore d’Ingegno è registrato e tutelato legalmente.
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              onClick={handleGoToDepartments}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0066CC] hover:bg-black text-white font-mono font-bold text-xs uppercase tracking-widest px-6 py-4 border-2 border-black cursor-pointer transition-all active:scale-95"
            >
              <span>Vedi i 6 Dipartimenti</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tutela secondo registrazione dei 6 Enti */}
        <div className="mt-8 pt-6 border-t border-black flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10.5px] font-mono text-black">
          <div className="flex flex-wrap items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0066CC] shrink-0" />
            <span className="font-extrabold text-[#0066CC]">TUTELA E REGISTRAZIONE PRESSO GLI ENTI:</span>
            <span>1. MiC / MiBAC • 2. UIBM • 3. OPAC SBN • 4. CERN Zenodo • 5. Discoteca di Stato • 6. Museo MAXXI</span>
          </div>
        </div>

      </div>
    </section>
  );
}

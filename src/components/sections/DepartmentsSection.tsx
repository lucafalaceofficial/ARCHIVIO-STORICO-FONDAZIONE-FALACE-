import React from 'react';
import { Landmark, Cpu, BookOpen, ShieldCheck, Radio, Layers, ArrowRight } from 'lucide-react';
import { FOUNDATION_METADATA } from '../../data/archiveData.js';

interface DepartmentsSectionProps {
  setActiveTab?: (tab: 'institution' | 'patents' | 'catalog' | 'heritage' | 'music_lab' | 'departments') => void;
}

export default function DepartmentsSection({ setActiveTab }: DepartmentsSectionProps) {
  const portalItems = [
    {
      id: 'institution',
      title: '1. MiC / MiBAC',
      subtitle: 'Sezione 03 • Tutela Diritto d’Autore',
      description: 'Ministero della Cultura — Tutela e Registro diritto d’autore. Deposito formale di 250 Opere d’Arte e Libri registrati e tutelati presso l’Ufficio Diritto d’Autore.',
      icon: Landmark,
      anchorId: 'fondazione-falace-section',
      badge: 'MINISTERO'
    },
    {
      id: 'patents',
      title: '2. UIBM',
      subtitle: 'Sezione 04 • Proprietà Intellettuale',
      description: 'Ufficio Italiano Brevetti e Marchi. Registrazione di 3 Brevetti d’Invenzione Industriale (Aero-Massaggiatore, GeniusOM, Eco-Tuta Termodinamica) per la tutela dell’anteriorità.',
      icon: Cpu,
      anchorId: 'theory-section',
      badge: 'BREVETTI'
    },
    {
      id: "catalog",
      title: "3. OPAC SBN-ISBN",
      subtitle: "Sezione 08 • Registro Bibliotecario Nazionale",
      description: "ICCU Catalogo Bibliotecario Nazionale. Catalogazione e deposito statale ufficiale di 49 Monografie e Libri d’arte e scienza del fondatore inseriti nell'Indice Bibliografico Nazionale.",
      icon: BookOpen,
      anchorId: "books",
      badge: "CATALOGO"
    },
    {
      id: "patents",
      title: "4. CERN Zenodo",
      subtitle: "Sezione 05 • Archivio Digitale DOI Europe",
      description: "Archivio Digitale DOI dell’Unione Europea. Deposito permanente dei paper accademici e della Gold Trilogy scientifica con indici DOI immutabili per priorità internazionale.",
      icon: ShieldCheck,
      anchorId: "theory-section",
      badge: "CERN DOI"
    },
    {
      id: "music_lab",
      title: "5. Dds Discoteca di Stato",
      subtitle: "Sezione 15 • Deposito Legale Sonoro",
      description: "Dds Discoteca di Stato e Museo dell'audiovisivo. Deposito legale certificato (dal 2007) delle registrazioni audio e video delle Attività Intellettive Creative (AIC).",
      icon: Radio,
      anchorId: "hertzian-synthesizer",
      badge: "AUDIOVISIVO"
    },
    {
      id: "catalog",
      title: "6. Museo MAXXI",
      subtitle: "Sezione 06 • Catalogazione Contemporanea",
      description: "Catalogazione e deposito opere d'arte contemporanea. Integrazione e conservazione nel circuito digitale d'arte contemporanea nazionale e tutela d'anteriorità.",
      icon: Layers,
      anchorId: "books",
      badge: "MAXXI"
    }
  ];

  const handlePortalClick = (tabId: 'institution' | 'patents' | 'catalog' | 'heritage' | 'music_lab' | 'departments', anchorId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    setTimeout(() => {
      const element = document.getElementById(anchorId);
      if (element) {
        const offset = 140; // sticky header padding offset
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 150);
  };

  return (
    <div id="departments-section" className="bg-white border-2 border-[#0066CC] rounded-none p-6 sm:p-10  relative overflow-hidden">
      {/* Golden accent line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066CC] via-[#3399FF] to-[#9F802B]" />

      <div className="flex items-center gap-4 border-b-2 border-[#0066CC] pb-5 mb-8">
        <div className="p-3 bg-white border border-[#0066CC] rounded-none text-[#0066CC]">
          <Layers className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#0066CC] uppercase tracking-widest block font-black">
            6 DIPARTIMENTI ISTITUZIONALI
          </span>
          <h3 className="font-serif font-extrabold text-xl text-black tracking-wide uppercase leading-tight mt-1">
            I Sei Dipartimenti Istituzionali di Tutela
          </h3>
        </div>
      </div>

      <p className="text-black text-sm leading-relaxed font-serif italic mb-8 border-l-2 border-[#0066CC] pl-4">
        In conformità alle linee guida e agli standard di catalogazione ministeriali, l'intero patrimonio scientifico, artistico, bibliografico e brevettuale è tutelato e depositato presso 6 enti istituzionali di riferimento. Seleziona un dipartimento per avviarne la consultazione certificata.
      </p>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portalItems.map((portal) => {
          const IconComponent = portal.icon;
          
          return (
            <div 
              key={portal.title}
              onClick={() => handlePortalClick(portal.id as any, portal.anchorId)}
              className="group border-2 border-[#0066CC] bg-white p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer text-left relative hover:border-[#0066CC]/60 hover:bg-white"
            >
              {/* Micro corner badge */}
              <span className="absolute top-1.5 right-1.5 text-[8px] font-mono text-[#0066CC]/60 font-black tracking-widest">
                {portal.badge}
              </span>

              <div>
                <div className="w-11 h-11 bg-white border border-[#0066CC] flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-[#3399FF]/20 group-hover:border-[#0066CC]">
                  <IconComponent className="w-5 h-5 text-[#0066CC] transition-transform duration-300 group-hover:scale-110" />
                </div>

                <span className="text-[10px] font-mono text-[#0066CC] font-bold block mb-1.5">
                  {portal.subtitle}
                </span>
                
                <h4 className="font-serif font-extrabold text-base text-black group-hover:text-[#0066CC] transition-colors leading-tight mb-3">
                  {portal.title}
                </h4>
                
                <p className="text-[11.5px] text-black leading-relaxed font-sans mb-6">
                  {portal.description}
                </p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-[#0066CC] border-t border-[#0066CC] pt-4 group-hover:text-black transition-colors">
                <span>Accedi alla sezione</span>
                <ArrowRight className="w-3.5 h-3.5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

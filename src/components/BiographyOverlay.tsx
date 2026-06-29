import React, { useState, useRef, useEffect } from 'react';
import { 
  Award, 
  BookOpen, 
  Briefcase, 
  FileCheck, 
  Layers, 
  GraduationCap, 
  TrendingUp, 
  Compass, 
  ExternalLink,
  ShieldCheck,
  Radio,
  FileText,
  Activity,
  Globe,
  Link2,
  Music,
  Palette,
  Landmark,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { BIOGRAFIA_PAGES } from '../data/biografiaPdfData';
import { ARCHIVIO_STORICO_PAGES } from '../data/archivioStoricoPdf';

type SubTab = 'profile' | 'awards' | 'publications' | 'patents' | 'entrepreneurship' | 'art-music' | 'foundation' | 'verbatim-dossier' | 'archivio-verbatim';

export default function BiographyOverlay() {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('profile');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftArrow(scrollLeft > 5);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const el = tabsRef.current;
    if (el) {
      checkScroll();
      el.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      const timer = setTimeout(checkScroll, 400);

      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
        clearTimeout(timer);
      };
    }
  }, []);

  // Check scroll when the tab selection changes or content updates
  useEffect(() => {
    const timer = setTimeout(checkScroll, 200);
    return () => clearTimeout(timer);
  }, [activeSubTab]);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 220;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="biography-root-container" className="w-full bg-white border-2 border-[#1877F2] rounded-3xl overflow-hidden shadow-xl flex flex-col font-sans">
      
      {/* 1. Header Blu con Testo Bianco */}
      <div id="biography-header" className="bg-[#1877F2] text-white px-6 py-6 border-b border-[#1877F2] flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm shrink-0 flex items-center justify-center">
            <Award className="w-7 h-7 text-[#1877F2] fill-[#1877F2]/10" />
          </div>
          <div>
            <h4 className="font-serif font-black text-base sm:text-lg tracking-wide text-white uppercase">
              SINTESI BIOGRAFICA DOTT. LUCA FALACE
            </h4>
            <p className="text-[10px] sm:text-xs font-mono text-white/90 tracking-wider uppercase mt-0.5 flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Patrimonio Scientifico &amp; Culturale Certificato
            </p>
          </div>
        </div>
      </div>

      {/* 2. Quick Profile Panel */}
      <div id="biography-profile-panel" className="bg-slate-50 border-b border-slate-100 p-6 shrink-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="font-serif font-black text-2xl text-slate-900 leading-none">
              Dott. Luca Falace
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2">
              Ricercatore Indipendente — ATECO 72.2 • Ricerca e Sviluppo nelle Scienze Sociali e Umanistiche
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3.5">
              <span className="text-[10px] sm:text-xs font-mono bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-md shadow-2xs">
                Storico dell'Arte
              </span>
              <span className="text-[10px] sm:text-xs font-mono bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-md shadow-2xs">
                Docente
              </span>
              <span className="text-[10px] sm:text-xs font-mono bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-md shadow-2xs">
                Inventore
              </span>
              <span className="text-[10px] sm:text-xs font-mono bg-white border border-slate-200 text-slate-700 font-bold px-3 py-1 rounded-md shadow-2xs">
                Imprenditore
              </span>
            </div>
          </div>
          <div className="text-left md:text-right text-xs font-mono text-slate-700 bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-2xs w-full md:w-auto max-w-full">
            <span className="font-bold text-[#1877F2] block md:inline">Tutela 6 Enti:</span> MiC/MiBAC • UIBM • OPAC SBN-ISBN • CERN Zenodo • Dds • MAXXI
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs (Elegant Scroller con Indicatori UX di Scorrimento) */}
      <div className="relative border-b border-slate-200 bg-slate-50/50 shrink-0">
        
        {/* Pulsante Sinistro (Semplice, senza sfumature/sfondi ingombranti) */}
        {showLeftArrow && (
          <button 
            onClick={() => scrollTabs('left')}
            className="absolute left-1.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border border-slate-200 rounded-full shadow-md hover:bg-slate-50 text-slate-700 flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
            title="Scorri a sinistra"
          >
            <ChevronLeft className="w-4.5 h-4.5" />
          </button>
        )}

        {/* Pulsante Destro (Semplice, senza sfumature/sfondi ingombranti) */}
        {showRightArrow && (
          <button 
            onClick={() => scrollTabs('right')}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white border-2 border-[#1877F2]/40 rounded-full shadow-md hover:bg-slate-50 text-[#1877F2] flex items-center justify-center cursor-pointer hover:scale-105 transition-all"
            title="Scorri a destra"
          >
            <ChevronRight className="w-4.5 h-4.5 text-[#1877F2]" />
          </button>
        )}

        <div 
          ref={tabsRef}
          id="biography-tabs" 
          className="flex overflow-x-auto text-xs font-mono font-bold tracking-wider scrollbar-thin scroll-smooth snap-x snap-mandatory px-8"
        >
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`flex-1 min-w-[130px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'profile' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Compass className="w-4.5 h-4.5 shrink-0 text-[#1877F2]" />
            1. Profilo &amp; Studio
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('publications')}
          className={`flex-1 min-w-[130px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'publications' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <BookOpen className="w-4.5 h-4.5 shrink-0 text-emerald-600" />
            2. Libri &amp; Opere
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('patents')}
          className={`flex-1 min-w-[130px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'patents' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <FileText className="w-4.5 h-4.5 shrink-0 text-blue-600" />
            3. Invenzioni (41)
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('awards')}
          className={`flex-1 min-w-[160px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'awards' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Award className="w-4.5 h-4.5 shrink-0 text-amber-500 animate-pulse" />
            4. Premi Istituzionali
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('entrepreneurship')}
          className={`flex-1 min-w-[130px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'entrepreneurship' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Briefcase className="w-4.5 h-4.5 shrink-0 text-amber-600" />
            5. Impresa &amp; TV
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('art-music')}
          className={`flex-1 min-w-[130px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'art-music' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Palette className="w-4.5 h-4.5 shrink-0 text-rose-600" />
            6. Arte &amp; Musica
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('foundation')}
          className={`flex-1 min-w-[130px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'foundation' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Landmark className="w-4.5 h-4.5 shrink-0 text-[#1877F2]" />
            7. Fondazione AIC
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('verbatim-dossier')}
          className={`flex-1 min-w-[180px] px-4 py-4 text-center border-r border-slate-200 transition-colors cursor-pointer snap-start ${
            activeSubTab === 'verbatim-dossier' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <Layers className="w-4.5 h-4.5 shrink-0 text-blue-500" />
            8. Dossier Verbatim (6 pag)
          </span>
        </button>
        <button
          onClick={() => setActiveSubTab('archivio-verbatim')}
          className={`flex-1 min-w-[180px] px-4 py-4 text-center transition-colors cursor-pointer snap-start ${
            activeSubTab === 'archivio-verbatim' 
              ? 'bg-white text-[#1877F2] border-t-2 border-t-[#1877F2] border-b border-b-white' 
              : 'text-slate-600 hover:bg-white hover:text-slate-900'
          }`}
        >
          <span className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4.5 h-4.5 shrink-0 text-emerald-600" />
            9. Archivio Verbatim (20 pag)
          </span>
        </button>
      </div>
    </div>

      {/* 4. Natural/Large Content Area - Perfect readability, spacious margins, 4x larger display space */}
      <div id="biography-content-panel" className="p-6 sm:p-10 space-y-8 text-sm sm:text-base text-slate-800 leading-relaxed font-sans bg-white min-h-[600px]">
        
        {/* ====================================
            1. PROFILO & STUDIO
            ==================================== */}
        {activeSubTab === 'profile' && (
          <div className="space-y-6 animate-fade-in text-justify">
            <div className="border-l-4 border-l-[#1877F2] pl-5 py-2.5 italic text-slate-700 bg-slate-50 rounded-r-2xl text-sm sm:text-base">
              "Luca Falace è ricercatore indipendente, storico dell'arte, docente, inventore e imprenditore con un percorso intellettuale e professionale documentato che abbraccia oltre quarant'anni di attività."
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg text-slate-900 tracking-wide flex items-center gap-2 border-b border-slate-100 pb-2">
                <Compass className="w-5.5 h-5.5 text-[#1877F2]" />
                Nota Metodologica e Contesto della Ricerca
              </h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Questa sezione documenta il percorso di ricerca che ha condotto alla formulazione della teoria presentata in questo portale, includendo attività sperimentali, depositi istituzionali e validazioni empiriche. I dati biografici sono qui presentati come contesto metodologico necessario alla comprensione dell'origine e della validazione della classificazione proposta. Non si tratta di curriculum personale, ma di documentazione del framework di ricerca in cui la teoria è stata sviluppata e testata.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg text-slate-900 tracking-wide flex items-center gap-2 border-b border-slate-100 pb-2">
                <GraduationCap className="w-5.5 h-5.5 text-[#1877F2]" />
                Formazione e Contesto Accademico
              </h4>
              
              <div className="grid grid-cols-1 gap-5">
                
                {/* Laurea */}
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100/50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#1877F2] font-bold block uppercase tracking-wider">
                      Laurea Magistrale (Anni 1998–2004)
                    </span>
                    <h5 className="font-serif font-extrabold text-base text-slate-900 mt-1">
                      Laurea Magistrale in Conservazione dei Beni Culturali
                    </h5>
                    <p className="text-slate-600 text-xs font-mono mt-0.5">
                      Titolo accademico: Dottore Magistrale • Facoltà di Lettere • Indirizzo: Didattico dei Beni Mobili e Artistici – Percorso Storico Artistico Contemporaneo
                    </p>
                    <p className="text-slate-700 mt-2.5 text-xs sm:text-sm">
                      <strong>Tesi di Laurea:</strong> "Annotazioni e considerazioni sulla divinazione" <br />
                      <strong>Ambito disciplinare:</strong> Antropologia Culturale, Storia delle tradizioni popolari – simbologia mitologica, fenomenologia delle divinazioni popolari, origini delle attività artistiche.
                    </p>
                  </div>
                </div>

                {/* Diploma Tecnico */}
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100/50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <FileText className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase tracking-wider">
                      Diploma Superiore (Anni 1985–1991)
                    </span>
                    <h5 className="font-serif font-extrabold text-base text-slate-900 mt-1">
                      Diploma di Perito Tecnico Industriale
                    </h5>
                    <p className="text-slate-600 text-xs font-mono mt-0.5">
                      Specializzazione: Meccanica con specializzazione in Robotica ed Ergon-Robotica
                    </p>
                    <p className="text-slate-700 mt-2.5 text-xs sm:text-sm">
                      <strong>Ambito di studio:</strong> Sistemi automatici di automazione industriale per azionamenti elettro-pneumatici ad aria compressa. <br />
                      Il diploma tecnico-industriale, unito alla provenienza da una famiglia di inventori affermati a livello internazionale attiva da tre generazioni, costituisce la base formativa della competenza in invenzioni e brevetti industriali sviluppata dall'autore nel corso di oltre trent'anni.
                    </p>
                  </div>
                </div>

                {/* CFU FIT */}
                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100/50 text-[#1877F2] flex items-center justify-center shrink-0">
                    <Radio className="w-5.5 h-5.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase tracking-wider">
                      Crediti Formativi (Anni 2017–2018)
                    </span>
                    <h5 className="font-serif font-extrabold text-base text-slate-900 mt-1">
                      Crediti Formativi Universitari – 24 CFU FIT
                    </h5>
                    <p className="text-slate-600 text-xs font-mono mt-0.5">
                      Istituzione: Università degli Studi – Facoltà di Scienze della Formazione FIT
                    </p>
                    <div className="mt-2.5 space-y-1 text-xs sm:text-sm text-slate-700 font-mono">
                      <p>• Pedagogia Speciale e Didattica per l'Inclusione (M-PED/03) — <strong>30/30 con lode</strong></p>
                      <p>• Fondamenti di Didattica per l'Insegnamento nella Scuola Secondaria (M-PED/03) — <strong>30/30 con lode</strong></p>
                      <p>• Antropologia Culturale (M-DEA/01) — <strong>28/30</strong></p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Insegnamento */}
            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg text-slate-900 tracking-wide flex items-center gap-2 border-b border-slate-100 pb-2">
                <GraduationCap className="w-5.5 h-5.5 text-[#1877F2]" />
                Attività di Docenza Scolastica (Anni 2005–2016)
              </h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Luca Falace ha esercitato la docenza in Storia dell'Arte presso licei e istituti superiori privati dal 2005 al 2016, con un approccio interdisciplinare che integrava antropologia culturale, archetipi junghiani, fenomenologia della sincronicità e storia delle tradizioni popolari, con particolare attenzione all'intersezione tra arte, scienza e coincidenze significative.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h5 className="font-serif font-bold text-xs sm:text-sm text-slate-900 uppercase text-[#1877F2]">Istituti e Anni Scolastici</h5>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-mono">
                    <li>• <strong>Istituto Newton</strong> — Liceo Classico, Scientifico, Linguistico, Psicopedagogico e della Comunicazione (A.S. 2005–2006, intero anno)</li>
                    <li>• <strong>Istituto Jervolino</strong> — Liceo Classico, Scientifico, Linguistico, Psicopedagogico (A.S. 2005–2006, intero anno)</li>
                    <li>• <strong>Istituto Superiore Futura</strong> — (A.S. 2007–2008, intero anno)</li>
                    <li>• <strong>Istituto Nobel</strong> — (A.S. 2015–2016, da novembre 2015 a febbraio 2016)</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h5 className="font-serif font-bold text-xs sm:text-sm text-slate-900 uppercase text-[#1877F2]">Materie e Ambiti di Insegnamento</h5>
                  <ul className="text-xs sm:text-sm text-slate-700 space-y-1 font-mono">
                    <li>• Storia dell'Arte Medievale, Moderna e Contemporanea</li>
                    <li>• Metodologia della Storia dell'Arte — Analisi delle forme</li>
                    <li>• Storia delle tecniche artistiche</li>
                    <li>• Etnologia delle culture Mediterranee ed Antropologia</li>
                    <li>• Storia dell'Architettura Contemporanea ed Archeologia</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Official Link buttons */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mt-4 space-y-3">
              <h5 className="font-serif font-bold text-sm text-slate-900 tracking-wide">
                Canali Web Ufficiali del Progetto Falace
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <a 
                  href="https://progetto-fondazione-falace-aic.lucafalace-official.workers.dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-[#1877F2] font-semibold hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all group"
                >
                  <Globe className="w-4.5 h-4.5 shrink-0" />
                  <span className="truncate">Portale Nuova Fondazione Falace AIC</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="https://progetto-portale-fondazione-falace.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-[#1877F2] font-semibold hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all group"
                >
                  <Link2 className="w-4.5 h-4.5 shrink-0" />
                  <span className="truncate">Portale Specchio Fondazione</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href="http://lucafalace.altervista.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-[#1877F2] font-semibold hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all group sm:col-span-2"
                >
                  <Layers className="w-4.5 h-4.5 shrink-0" />
                  <span className="truncate">Archivio Trentennio Ricerca Arte &amp; Scienza (lucafalace.altervista.org)</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

          </div>
        )}

        {/* ====================================
            2. LIBRI & OPERE (PUBLICATIONS)
            ==================================== */}
        {activeSubTab === 'publications' && (
          <div className="space-y-6 animate-fade-in text-justify">
            <div className="flex items-start gap-3 bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
              <BookOpen className="w-6 h-6 text-[#1877F2] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base">Patrimonio Bibliografico Nazionale SBN</h5>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Luca Falace ha prodotto ben <strong>46 libri pubblicati e oltre 100 manoscritti</strong> (equivalenti a circa 8.000 pagine redatte a mano), tutti depositati formalmente presso la SIAE / Ministero della Cultura (MiBAC) e interamente catalogati all'interno del sistema <strong>OPAC SBN (Servizio Bibliotecario Nazionale)</strong>. Le opere spaziano dalla narrativa filosofica alla saggistica teorica, dall'antropologia dell'arte alla meccanica quantistica, in lingua italiana e inglese.
                </p>
              </div>
            </div>

            {/* Trilogia Section on CERN Zenodo */}
            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg sm:text-xl text-slate-900 border-b-2 border-blue-500 pb-2 uppercase tracking-wide text-[#1877F2] flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#1877F2] animate-spin-slow" />
                Deposito Scientifico Permanente — CERN Zenodo (2025)
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Le opere cardinali di ricerca e i documenti brevettuali scientifici del <strong>Dott. Luca Falace</strong> sono stati stabilmente depositati con <strong>DOI istituzionale permanente (Digital Object Identifier)</strong> nel prestigioso repository europeo <strong>Zenodo del CERN di Ginevra</strong>, garantendone l'accessibilità scientifica internazionale:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Volume 1 */}
                <div className="p-6 bg-sky-50/60 border-2 border-sky-200/80 hover:border-[#1877F2] rounded-3xl space-y-3.5 shadow-sm transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <span className="text-[9px] font-mono bg-[#1877F2] text-white px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                      Volume I • ISBN 979-8297277984
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded">2025</span>
                  </div>
                  <h5 className="font-serif font-black text-base sm:text-lg text-slate-900 leading-snug">
                    Teoria Generale del Sincronismo Creativo e Teoria del Campo Unificato AIC
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Il Metodo AIC</strong> — Modellazione, rilevazione e applicatione pratica della sincronicità intenzionale attraverso il Sistema AIC-Sync©. (482 pagine). Classificato bestseller su Amazon in <em>Consulenza ed etica psicologica</em>, <em>Ricerca sociologica</em> e <em>Matematica</em>.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-[#1877F2] font-black bg-white border-2 border-blue-300 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-3xs w-fit">
                      <Link2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      DOI CERN: 10.5281/zenodo.17080308
                    </span>
                  </div>
                </div>

                {/* Volume 2 */}
                <div className="p-6 bg-sky-50/60 border-2 border-sky-200/80 hover:border-[#1877F2] rounded-3xl space-y-3.5 shadow-sm transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <span className="text-[9px] font-mono bg-[#1877F2] text-white px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                      Volume II • ISBN 979-8298903042
                    </span>
                    <span className="text-[10px] font-mono font-bold text-blue-700 bg-white border border-blue-200 px-2 py-0.5 rounded">2025</span>
                  </div>
                  <h5 className="font-serif font-black text-base sm:text-lg text-slate-900 leading-snug">
                    Teoria del Campo Unificato: Trattato sull'Energia Creativa
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Trattato d'avanguardia sugli effetti reali della coscienza umana nei campi elettromagnetici, quantistici e gravitazionali. (295 pagine). Classificato bestseller su Amazon in <em>Studio dell'arte</em>, <em>Fisica</em> e <em>Sociologia della cultura</em>.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-[#1877F2] font-black bg-white border-2 border-blue-300 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-3xs w-fit">
                      <Link2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      DOI CERN: 10.5281/zenodo.17041593
                    </span>
                  </div>
                </div>

                {/* Volume 3 */}
                <div className="p-6 bg-amber-50/50 border-2 border-amber-200 hover:border-amber-500 rounded-3xl space-y-3.5 shadow-sm transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <span className="text-[9px] font-mono bg-amber-600 text-white px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                      Volume III • In pubblicazione
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-700 bg-white border border-amber-200 px-2 py-0.5 rounded">2025</span>
                  </div>
                  <h5 className="font-serif font-black text-base sm:text-lg text-slate-900 leading-snug">
                    Interazione Psicofisica con il Campo Unificato
                    <span className="inline-block ml-1.5 text-[10px] font-sans font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase">NEW</span>
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    I Nove Livelli della Sincronicità nella Teoria del Sincronismo Creativo. Introduce una nuova, inedita classificazione matematica e modellizzazione neuro-fisiologica della sincronicità.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-amber-600 font-black bg-white border-2 border-amber-300 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-3xs w-fit">
                      <Link2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      DOI CERN: 10.5281/zenodo.20414984
                    </span>
                  </div>
                </div>

                {/* Brevetto AIC-SYNC Doc */}
                <div className="p-6 bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-500 rounded-3xl space-y-3.5 shadow-sm transition-all relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
                  <div className="flex justify-between items-start gap-2 flex-wrap">
                    <span className="text-[9px] font-mono bg-emerald-600 text-white px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                      Scientific Patent Doc
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded">Patent</span>
                  </div>
                  <h5 className="font-serif font-black text-base sm:text-lg text-slate-900 leading-snug">
                    Brevetto AIC-SYNC – Generare le Sincronicità
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Il primo sistema metodologico e software al mondo ideato per favorire la manifestazione di sincronicità indotte e il monitoraggio in tempo reale dei picchi creativi attraverso biorilevamenti EEG e HRV sintonizzati.
                  </p>
                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-emerald-600 font-black bg-white border-2 border-emerald-300 rounded-xl px-3 py-2 flex items-center gap-1.5 shadow-3xs w-fit">
                      <Link2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      DOI CERN: 10.5281/zenodo.17793651
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete list of 46 books / main works provided by the user */}
            <div className="space-y-4 pt-4">
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-[#1877F2]">
                Opere Fondamentali della Teoria AIC (2005–2026)
              </h4>

              <div className="grid grid-cols-1 gap-4 font-sans text-sm text-slate-700">
                
                {/* L'Opera Celeste - Standout Card */}
                <div className="p-5 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-l-4 border-[#1877F2] rounded-r-2xl rounded-l-md space-y-1.5 shadow-3xs">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-[9px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded-md font-bold uppercase tracking-wider">Pietra Miliare • ISBN 88-901926-0-7</span>
                    <span className="text-xs font-mono font-bold text-blue-700">Anno 2005</span>
                  </div>
                  <h6 className="font-serif font-black text-slate-900 text-base">L'Opera Celeste — Romanzo Alchemico Filosofico (2005)</h6>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    I ed. O.R.O. Edizioni (2005); II ed. L'Espresso (2010); III ed. Iemme Edizioni (2013, ISBN 978-88-97776-08-6). Disponibile in tutte le librerie LaFeltrinelli. <strong>Opera fondamentale che attesta ufficialmente a livello nazionale la paternità e la nascita del Sincronismo Creativo.</strong>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ASIN B008KA6PPQ</span>
                  <h6 className="font-bold text-slate-900">The Celestial Opera — Edizione Inglese de L'Opera Celeste (2005/2012)</h6>
                  <p className="text-xs text-slate-600">Amazon Edizioni (2005 cartaceo, 2012 eBook Kindle).</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 978-88-6223-564-8</span>
                  <h6 className="font-bold text-slate-900">Il Sincronismo Creativo: Studio degli Eventi Paralleli — Saggio (2007-2008)</h6>
                  <p className="text-xs text-slate-600">Pubblicato con Boopen Edizioni (2007) / Photocity Edizioni (2008).</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 978-88-6223-314-9</span>
                  <h6 className="font-bold text-slate-900">L'Arte e il Simbolo. Coincidenze Mitologiche — Saggio (2007)</h6>
                  <p className="text-xs text-slate-600">Boopen Edizioni. Analisi antropologica comparata del simbolismo nell'arte contemporanea.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 978-88-6174-179-9</span>
                  <h6 className="font-bold text-slate-900">Soldi, Successo e Salute — Manuale di Autostima (2008)</h6>
                  <p className="text-xs text-slate-600">Bruno Editore (2008 eBook con audio, ed. cartacea 2021).</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 978-88-6618-129-9</span>
                  <h6 className="font-bold text-slate-900">Tu Sei: Sincronismi, Coincidenze, Sincronicità — Saggio (2011)</h6>
                  <p className="text-xs text-slate-600">Youcanprint. Argomenti: Teoria della Sincronicità di C. G. Jung, Mitologia, Antropologia. (eBook ISBN: 978-88-6618-356-9).</p>
                </div>

                {/* Il Sincronismo Creativo (2013) - Standout Card */}
                <div className="p-5 bg-gradient-to-r from-amber-50/50 to-orange-50/50 border-l-4 border-amber-500 rounded-r-2xl rounded-l-md space-y-1.5 shadow-3xs relative overflow-hidden">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-[9px] font-mono bg-amber-500 text-white px-2 py-1 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white animate-pulse" />
                      Bestseller Internazionale • ISBN 978-88-97776-33-8
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-700">Anno 2013</span>
                  </div>
                  <h6 className="font-serif font-black text-slate-900 text-base">Il Sincronismo Creativo: La Legge di Attrazione e il Potere del Pensiero — Saggio (2013)</h6>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Iemme Edizioni. <strong>L'unico saggio italiano sul Sincronismo Creativo ad aver raggiunto l'11ª posizione assoluta nella classifica mondiale dei bestseller di settore</strong> (eBook ISBN: 978-88-97776-34-5).
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 978-1-7314-7706-3</span>
                  <h6 className="font-bold text-slate-900">Invenzioni e Brevetti. I Codici FDL delle Invenzioni — Manuale (2018)</h6>
                  <p className="text-xs text-slate-600">Books on Demand / Independently published (ASIN: B0KGLKHTV). Catalogazione ufficiale del corpus delle 41 invenzioni.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 978-1-6704-1935-3</span>
                  <h6 className="font-bold text-slate-900">Sincreatività: Il Potere di Attrazione — Saggio (2019)</h6>
                  <p className="text-xs text-slate-600">Independently published (ASIN: B0827691WT).</p>
                </div>

                {/* Il Sincronismo Creativo Metodo - Highlight Card */}
                <div className="p-4 bg-emerald-50/30 border border-emerald-200 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold">Cornerstone Saggio • ISBN 979-8-3025-4793-4</span>
                  <h6 className="font-bold text-slate-900">Sincronismo Creativo: Il Metodo del Sincronismo Creativo (2024)</h6>
                  <p className="text-xs text-slate-600">Independently published (487 pagine, ASIN B0DPMYTB72). Opera metodologica fondamentale, disponibile in formato cartaceo ed eBook.</p>
                </div>

                {/* Monumental Encyclopedia - Standout Card */}
                <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50/40 border-l-4 border-amber-500 rounded-r-2xl rounded-l-md space-y-1.5 shadow-3xs relative overflow-hidden">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-[9px] font-mono bg-amber-600 text-white px-2 py-1 rounded-md font-extrabold uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-white animate-pulse" />
                      Edizione Monumentale d'Eccellenza
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-700">Anno 2024</span>
                  </div>
                  <h6 className="font-serif font-black text-slate-900 text-base">Arte, Scienza, Sincronicità — Enciclopedia di 1128 pagine (2024)</h6>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Centro Studi Editoriali. <strong>Tesi enciclopedica monumentale straordinaria</strong> che raggruppa lo studio approfondito pluridecennale delle risonanze sincroniche applicate alla dinamica dell'ingegno e della creatività umana.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 979-8-5178-9337-4</span>
                  <h6 className="font-bold text-slate-900">Antropologia della Storia dell'Arte: Storia dell'Arte e Conoscenza Evolutiva (2021)</h6>
                  <p className="text-xs text-slate-600">Saggio sull'evoluzione della coscienza umana letta attraverso le correnti artistiche (ASIN: B09527BHVC).</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded font-bold">ISBN 979-8-8579-2244-8</span>
                  <h6 className="font-bold text-slate-900">Enoch e la Terra Infinita — Narrativa (2023)</h6>
                  <p className="text-xs text-slate-600">Romanzo filosofico ad impianto mitologico-cosmologico (Ed. Inglese: ISBN 979-8-8583-3006-2).</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2 group hover:border-emerald-300 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">Anno 2025</span>
                    <a
                      href="https://payhip.com/b/jF3KP"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] font-mono text-emerald-700 hover:text-emerald-950 flex items-center gap-1 font-bold transition-colors cursor-pointer"
                    >
                      <span>Acquista l'Opera</span>
                      <ExternalLink className="w-3 h-3 text-emerald-600" />
                    </a>
                  </div>
                  <h6 className="font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">Frequenze Hertziane: Il Linguaggio Segreto dell'Universo (~120 pp.)</h6>
                  <p className="text-xs text-slate-600">Guida applicativa all'uso delle frequenze di risonanza universali per la meditazione profonda, lo stimolo neuro-fisiologico e la sintonizzazione sul modello 432 Hz.</p>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                  <span className="text-[9px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Anno 2026</span>
                  <h6 className="font-bold text-slate-900">Il Campo di Hertz e il Cervello Sintonizzato — Scienza (2026)</h6>
                  <p className="text-xs text-slate-600">Analisi quantitativa dei dati emersi nel primo trimestre del 2026 sul coordinamento biofisiologico in corrispondenza del brevetto AIC-SYNC©.</p>
                </div>

              </div>
            </div>

            {/* Other Academic Works without ISBN (Saggi e Depositi) */}
            <div className="space-y-4 pt-2">
              <h5 className="font-serif font-bold text-xs sm:text-sm text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-slate-600">
                Altre Pubblicazioni d'Archivio e Depositi (Senza ISBN)
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p>• <strong>Ermetismo e Antropologia Popolare (2004)</strong> — Studio dell'alchimia rinascimentale come paradigma archetipale dell'ingegno.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p>• <strong>Antropologia Culturale delle Divinazioni Popolari (2006)</strong> — Nesso tra misticismo agrario e nascita della coscienza creativa individualizzata.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p>• <strong>La Fisica di Sympathetic Vibrations (2010)</strong> — Esplorazione delle risonanze strutturali molecolari, ispirato a Nikola Tesla.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <p>• <strong>L'Esperimento EEG e l'Empatia Collettiva (2015)</strong> — Raccolta tecnica dei dati e dei tracciati derivanti dal test su 200 soggetti.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ====================================
            3. INVENZIONI & BREVETTI
            ==================================== */}
        {activeSubTab === 'patents' && (
          <div className="space-y-6 animate-fade-in text-justify">
            <div className="flex items-start gap-3 bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
              <FileCheck className="w-6 h-6 text-[#1877F2] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base">Una Dinastia di Inventori da Tre Generazioni</h5>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Luca Falace proviene da una storica tradizione di inventori attivi a livello internazionale. Nel corso della sua carriera ha registrato <strong>41 invenzioni</strong> a proprio nome presso il Ministero della Cultura e depositato con successo <strong>3 importanti brevetti industriali</strong> regolarmente concessi dall'<strong>UIBM (Ufficio Italiano Brevetti e Marchi)</strong>.
                </p>
              </div>
            </div>

            {/* I 3 Brevetti Registrati UIBM */}
            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-[#1877F2]">
                I 3 Brevetti Industriali Concessi UIBM
              </h4>

              <div className="space-y-4 font-sans text-sm">
                
                {/* Brevetto 1 */}
                <div className="p-5 border border-slate-200 bg-slate-50 rounded-2xl flex flex-col sm:flex-row gap-4 shadow-3xs hover:border-[#1877F2]/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono bg-white border border-slate-300 text-slate-700 px-2 py-0.5 rounded font-bold uppercase">
                      UIBM • ITNA20040063A1
                    </span>
                    <h5 className="font-serif font-black text-base text-slate-900 mt-1">
                      Aeromassaggiatore ad Aria Sincronizzato (2004)
                    </h5>
                    <p className="text-xs text-slate-500 font-mono">Deposito: 26 marzo 2004 — Pubblicato: 26 settembre 2006</p>
                    <p className="text-slate-600 mt-2 text-xs sm:text-sm">
                      Pannello con micro-ugelli vibranti che emettono impulsi di aria compressa a ritmo e intensità variabili. Progettato per massaggi drenanti, rassodanti e rienergizzanti sintonizzati su frequenze armoniche biocompatibili (8Hz-24Hz). Sviluppato e distribuito in 30 esemplari commerciali esclusivi.
                    </p>
                  </div>
                </div>

                {/* Brevetto 2 */}
                <div className="p-5 border border-slate-200 bg-slate-50 rounded-2xl flex flex-col sm:flex-row gap-4 shadow-3xs hover:border-[#1877F2]/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono bg-[#1877F2] text-white px-2 py-0.5 rounded font-bold uppercase">
                      UIBM • ITNA20130029A1 • FDL-0032
                    </span>
                    <h5 className="font-serif font-black text-base text-slate-900 mt-1">
                      GeniusOm — Macchinario Compattatore Multiplo (2013)
                    </h5>
                    <p className="text-xs text-slate-500 font-mono">Deposito: 22 maggio 2013 — Pubblicato: 23 novembre 2014</p>
                    <p className="text-slate-600 mt-2 text-xs sm:text-sm">
                      Rivoluzionario sistema pneumatico automatico per la compattazione differenziata dei rifiuti domestici (organico, plastica, metallo, carta, vetro). Riduce dell'80% la massa volumetrica, agendo all'origine del problema dei rifiuti. Progettato con la consulenza di ex ingegneri NASA.
                    </p>
                  </div>
                </div>

                {/* Brevetto 3 */}
                <div className="p-5 border border-slate-200 bg-slate-50 rounded-2xl flex flex-col sm:flex-row gap-4 shadow-3xs hover:border-[#1877F2]/20 transition-all">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono bg-emerald-600 text-white px-2 py-0.5 rounded font-bold uppercase">
                      UIBM • IT201800003616U1 • FDL-0034
                    </span>
                    <h5 className="font-serif font-black text-base text-slate-900 mt-1">
                      Eco-Tuta Termodinamica Climatizzata (2018)
                    </h5>
                    <p className="text-xs text-slate-500 font-mono">Deposito: 16 febbraio 2018 — Pubblicato: 17 agosto 2018</p>
                    <p className="text-slate-600 mt-2 text-xs sm:text-sm">
                      Dispositivo portatile integrato ad un exoskeleton ergonomico che fornisce riscaldamento e raffreddamento termico. Autonomia di 15 ore garantita da batterie a recupero cinetico e micro-celle fotovoltaiche. Garantisce fino al 50% di risparmio energetico globale.
                    </p>
                    <div className="mt-2 p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                      <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
                      <span><strong>Donazione Umanitaria:</strong> Donata formalmente e interamente al <strong>Movimento Europeo Italia</strong> nel 2020 come presidio di protezione per il personale sanitario impegnato nell'emergenza COVID-19.</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* I Codici FDL e la Classificazione delle 41 Invenzioni */}
            <div className="space-y-4 pt-4">
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-slate-700">
                Catalogo delle 41 Invenzioni — Sistema Codici FDL (Falace Design Lab)
              </h4>
              <p className="text-slate-600 text-sm">
                L'intero corpus inventivo dell'autore è strutturato secondo il registro proprietario <strong>Codici FDL</strong> e pubblicato nel manuale <em>"Invenzioni e Brevetti: I Codici FDL delle Invenzioni"</em> (ISBN 978-1-7314-7706-3). Alcuni dettagli tecnici di invenzioni strategiche sono tenuti secretati [TOP SECRET / RESERVED] a tutela del futuro deposito:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-700">
                
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase text-[#1877F2]">Tecnologie Magnetiche e Sferiche</h6>
                  <ul className="space-y-1">
                    <li>• <strong>Motore Magnetico</strong> — Cod. INV-IND-LF-15-12-70-0008-DC1998</li>
                    <li>• <strong>Ammortizzatore Magnetico</strong> — Cod. INV-IND-LF-15-12-70-0009</li>
                    <li>• <strong>Telesfera</strong> — Cod. INV-IND-LF-15-12-70-0010</li>
                    <li>• <strong>Cinesfera</strong> — Cod. INV-IND-LF-15-12-70-0011</li>
                    <li>• <strong>Amisfera</strong> — Cod. INV-IND-LF-15-12-70-0012</li>
                    <li>• <strong>Temposfera (Campo Magnetico)</strong> — Cod. INV-IND-LF-15-12-70-0013</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase text-[#1877F2]">Benessere e Mobilità Magnetica</h6>
                  <ul className="space-y-1">
                    <li>• <strong>Aeromassaggiatore [BREVETTATO]</strong> — Cod. INV-0014</li>
                    <li>• <strong>Guanto Massaggiatore</strong> — Cod. INV-IND-LF-15-12-70-0015</li>
                    <li>• <strong>Aereo-veicolo a Propulsione Magnetica</strong> — Cod. INV-0017-DB2007</li>
                    <li>• <strong>Veicoli Terrestri-Marini Propulsione Magnetica</strong> — Cod. INV-0018</li>
                    <li>• <strong>Veicoli Terrestri Nuova Generazione</strong> — Cod. 0019 <span className="text-red-600 font-bold">[TOP SECRET]</span></li>
                    <li>• <strong>Veicoli Marini Nuova Generazione</strong> — Cod. 0020 <span className="text-red-600 font-bold">[TOP SECRET]</span></li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase text-[#1877F2]">Estetica, Gadget e Bio-Connessione</h6>
                  <ul className="space-y-1">
                    <li>• <strong>Soluzione Capelli (Usa e Getta)</strong> — Cod. 0023 <span className="text-red-600 font-bold">[TOP SECRET]</span></li>
                    <li>• <strong>Soluzione Tattoo</strong> — Cod. 0024</li>
                    <li>• <strong>Ombrello Nuova Generazione v1/v2</strong> — Cod. 0027/28 <span className="text-red-600 font-bold">[TOP SECRET]</span></li>
                    <li>• <strong>Genetica - Rigenerazione Cellule Umane</strong> — Cod. 0031 <span className="text-red-600 font-bold">[TOP SECRET]</span></li>
                    <li>• <strong>Misuratore Connessione Cerebrale (EEG Base)</strong> — Cod. 0033-DC2010</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h6 className="font-bold text-slate-900 border-b border-slate-200 pb-1 uppercase text-[#1877F2]">Invenzioni Tecnologiche Aggiuntive</h6>
                  <ul className="space-y-1">
                    <li>• <strong>L.E.T.S.I.S. Robotics Platform (2015)</strong> — Sistema di giunti simpatetici e risonanze magnetiche per attuatori.</li>
                    <li>• <strong>Filtro Ottico Flussimetrico a Cristalli (2020)</strong> — Sensore passivo dello spettro elettromagnetico di micro-sorgenti.</li>
                    <li>• <strong>Generatore di Carrier a Trasmissione Ossea (2025)</strong> — Trasmettitore hertziano biocompatibile a 432 Hz per sincronismo neurobiologico.</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ====================================
            4. PREMI ISTITUZIONALI & ONORIFICENZE (AWARDS)
            ==================================== */}
        {activeSubTab === 'awards' && (
          <div className="space-y-8 animate-fade-in text-justify">
            <div>
              <h4 className="font-serif font-black text-xl text-slate-900 border-b-2 border-amber-500 pb-2 uppercase tracking-wide text-amber-600 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                Grandi Riconoscimenti Istituzionali &amp; Onorificenze d'Impresa
              </h4>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                I premi nazionali e i riconoscimenti istituzionali conferiti al <strong>Dott. Luca Falace</strong> attestano l'alto valore innovativo e l'eccellenza scientifica delle sue attività pionieristiche nella Green Economy e nella ricerca scientifica:
              </p>
            </div>

            {/* Showcase Grid of Awards */}
            <div className="space-y-6">
              
              {/* 1. CROWN JEWEL: PREMIO SVILUPPO SOSTENIBILE ECOMONDO & TARGA DEL PRESIDENTE */}
              <div className="p-6 bg-amber-50/40 border-2 border-amber-400 rounded-3xl space-y-4 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                    Ecomondo • Targa del Presidente della Repubblica
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-700 bg-white px-2 py-0.5 border border-amber-200 rounded">2014</span>
                </div>
                
                <h5 className="font-serif font-black text-lg sm:text-xl text-slate-900">
                  Premio Sviluppo Sostenibile Ecomondo — Rimini
                </h5>
                
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Vincitore assoluto della 6ª edizione del prestigioso Premio per la categoria <strong>"Migliore Start-Up per efficacia dei risultati ambientali, contenuto innovativo, risultati economici e possibile diffusione"</strong>, conferito al compattatore ecologico <strong>GeniusOm</strong> (di cui il Dott. Luca Falace è inventore unico e titolare del brevetto).
                </p>

                <div className="p-4 bg-white border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-950 font-semibold space-y-1.5 shadow-3xs">
                  <span className="text-[10px] font-mono text-amber-700 uppercase block tracking-wider font-black">Adesione del Presidente della Repubblica Italiana</span>
                  <p className="font-sans font-medium">
                    L'eccellenza dell'invenzione e l'efficacia ambientale dell'impresa sono state onorate con l'adesione speciale del Presidente della Repubblica Italiana Giorgio Napolitano, con la concessione ufficiale di una speciale <strong>Targa Presidenziale di Rappresentanza</strong> conferita a Luca Falace.
                  </p>
                </div>
              </div>

              {/* 2. SHARK TANK ITALIA */}
              <div className="p-6 bg-blue-50/45 border border-blue-200 rounded-3xl space-y-4 relative overflow-hidden shadow-xs">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                    Mediaset Italia 1 • Shark Tank
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-white px-2 py-0.5 border border-blue-200 rounded">2015</span>
                </div>

                <h5 className="font-serif font-black text-lg text-slate-900">
                  Vittoria e Offerta Formale di €250.000
                </h5>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Protagonista in prima serata su Italia 1 nel celebre format mondiale per startup. Ha presentato l'invenzione GeniusOm illustrandone i dettagli ingegneristici fluidodinamici. Ha conquistato la delibera ufficiale dell'investitore <strong>Fabio Cannavale</strong> (fondatore di Lastminute.com), che ha formulato un'offerta d'investimento reale di <strong>€250.000 per il 70% delle quote</strong> per finanziare lo sviluppo industriale.
                </p>
              </div>

              {/* 3. RAI DUE - I FATTI VOSTRI */}
              <div className="p-6 bg-red-50/20 border border-red-200 rounded-3xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <span className="text-[10px] font-mono bg-red-100 text-red-800 px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                    Rai Due • I Fatti Vostri
                  </span>
                  <span className="text-xs font-mono font-bold text-red-700 bg-white px-2 py-0.5 border border-red-200 rounded">2017</span>
                </div>

                <h5 className="font-serif font-black text-lg text-slate-900">
                  Ospite Istituzionale e Dimostrazione Scientifica dal Vivo
                </h5>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Il Dott. Luca Falace è stato ospite ufficiale in studio di Giancarlo Magalli nello storico programma del mezzogiorno di Rai Due. Ha condotto una <strong>dimostrazione scientifica e tecnica dal vivo</strong>, illustrando l'efficacia del brevetto di compattazione termodinamica di fronte a milioni di telespettatori.
                </p>

                <div className="p-4 bg-white border border-red-200 rounded-xl text-xs sm:text-sm text-red-950 font-semibold space-y-1.5 shadow-3xs">
                  <span className="text-[10px] font-mono text-red-700 uppercase block tracking-wider font-black">Plauso Solenne della Rete Nazionale</span>
                  <p className="font-sans font-medium">
                    L'esperimento e il funzionamento del compattatore hanno riscosso un unanime ed entusiastico <strong>plauso e riconoscimento in diretta radiotelevisiva nazionale</strong>, celebrando il valore pratico ed ecologico dell'invenzione GeniusOm di fronte a milioni di telespettatori.
                  </p>
                </div>
              </div>

              {/* 4. CONFINDUSTRIA BEST PRACTICES */}
              <div className="p-6 bg-emerald-50/20 border border-emerald-200 rounded-3xl space-y-4 relative overflow-hidden">
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                    Unione Industriali • Salerno
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-2 py-0.5 border border-emerald-250 rounded">2014</span>
                </div>

                <h5 className="font-serif font-black text-lg text-slate-900">
                  8° Premio Best Practices per l'Innovazione
                </h5>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Partecipazione attiva e presentazione ufficiale del compattatore ecologico <strong>GeniusOm</strong> con l'esposizione di slide e diapositive tecniche presso l'Unione Industriali di Salerno. La presentazione del progetto d'innovazione tecnologica ha riscosso ampi consensi e comprendeva un'intervista radiotelevisiva per la valorizzazione del brevetto.
                </p>
              </div>

              {/* 5. SILICON VALLEY ITALIAN SCOUTS */}
              <div className="p-6 bg-blue-50/25 border border-blue-200 rounded-3xl space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex flex-wrap justify-between items-start gap-2">
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2.5 py-1 rounded-md font-extrabold uppercase tracking-wider">
                    Confindustria • San Francisco & Silicon Valley
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-white px-2 py-0.5 border border-blue-250 rounded">2014</span>
                </div>

                <h5 className="font-serif font-black text-lg text-slate-900">
                  Plauso di Confindustria & Silicon Valley Italian Scouts
                </h5>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                  Prestigioso plauso ed encomio ufficiale di <strong>Unione Industriali di Napoli</strong> per l'alto valore d'impresa e lo sviluppo tecnologico di GeniusOm. L'invenzione e le relative notizie sono state portate fino a <strong>San Francisco (Silicon Valley)</strong> all'interno della delegazione tecnologica dei <strong>Silicon Valley Italian Scouts (2014)</strong> per l'internazionalizzazione dell'eccellenza italiana negli Stati Uniti, suscitando risonanza sui giornali e sulla stampa di settore. In seguito a questo riscontro, il Dott. Luca Falace ha personalmente tenuto un'ulteriore e distinta conferenza di approfondimento e presentazione tecnica presso l'Unione Industriali.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* ====================================
            5. IMPRESA & VALIDAZIONE (ENTREPRENEURSHIP)
            ==================================== */}
        {activeSubTab === 'entrepreneurship' && (
          <div className="space-y-6 animate-fade-in text-justify">
            <div>
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-[#1877F2] flex items-center gap-2">
                <Briefcase className="w-5.5 h-5.5 text-[#1877F2]" />
                Attività Imprenditoriale e Dirigenziale
              </h4>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Proviene da una consolidata tradizione familiare di imprenditori e inventori attivi da tre generazioni. Fin dagli anni '80 ha affiancato e progressivamente diretto le imprese di famiglia, acquisendo solide competenze gestionali sul campo:
              </p>
              
              <ul className="text-sm text-slate-700 space-y-2.5 mt-3 font-sans">
                <li>• <strong>Dirigente e Rappresentante nelle Imprese di Famiglia (Anni '80–1997):</strong> Gestione del personale, produzione e negoziazione nei settori dell'oggettistica di pregio e dell'intermediazione immobiliare.</li>
                <li>• <strong>CL Creazioni Falace &amp; Toscano Case (1982–1997):</strong> Ruoli manageriali e commerciali di primo livello.</li>
                <li>• <strong>O.R.O. Edizioni (2005):</strong> Fondatore e Direttore Editoriale della casa editrice indipendente finalizzata alla diffusione di studi saggistici e artistici.</li>
                <li>• <strong>Mediazione Brevettuale:</strong> Ruolo chiave di coordinamento tecnico e mediazione in negoziazioni industriali nazionali ed europee.</li>
              </ul>
            </div>

            {/* GeniusOm Srls Startup Section */}
            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-[#1877F2] flex items-center gap-2">
                <TrendingUp className="w-5.5 h-5.5 text-emerald-600" />
                GeniusOm Srls — La Start-up della Green Economy (2013–2017)
              </h4>
              <p className="text-slate-600 text-sm">
                Nel 2013, Luca Falace fonda <strong>GeniusOm Srls (L.E.T.S.I.S. — Linea Ecologica Tecnologica con Soluzioni di Sistemi Intelligenti)</strong>, una start-up ecologica d'avanguardia operante nella Green Economy. La società ha sviluppato industrialmente il compattatore GeniusOm con un team che includeva ex ingegneri NASA.
              </p>

              <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl text-xs sm:text-sm text-slate-700">
                <p>
                  <strong>Assetto societario:</strong> Luca Falace era fondatore e socio di maggioranza detentore del <strong>55% delle quote sociali</strong> di GeniusOm Srls, nonché l'unico inventore e titolare del brevetto registrato.
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ====================================
            5. ARTE & MUSICA
            ==================================== */}
        {activeSubTab === 'art-music' && (
          <div className="space-y-6 animate-fade-in text-justify">
            <div>
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-[#1877F2] flex items-center gap-2">
                <Palette className="w-5.5 h-5.5 text-rose-600" />
                La Produzione Artistica Sperimentale (250 Opere)
              </h4>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Ha ideato e registrato complessivamente <strong>250 opere d'arte</strong>, incluse sculture, dipinti e installazioni interattive. Ciascuna opera non rappresenta una semplice espressione decorativa, ma costituisce un esperimento sistematico ed empirico volto a osservare l'emergere di risonanze e pattern sincronici nel corso del processo ideativo ed esecutivo (livelli 4-6 della scala del Sincronismo).
              </p>
            </div>

            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-sm text-slate-700">
              <h5 className="font-serif font-bold text-slate-900">Depositi Istituzionali e Mostre di Rilievo:</h5>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>• <strong>MiC/MiBAC Servizio II (Patrimonio Bibliografico e Diritto d'Autore):</strong> Registrazione isocronica ufficiale dal 2005.</li>
                <li>• <strong>MAV Roma (Museo dell'Audiovisivo) &amp; DdS Discoteca di Stato:</strong> Deposito legale permanente (18 maggio 2007).</li>
                <li>• <strong>MAXXI (Museo Nazionale delle Arti del XXI Secolo) &amp; PAN Napoli:</strong> Opere d'arte ammesse all'esposizione e alla documentazione d'archivio.</li>
                <li>• <strong>Esposizioni TV Rai 2 (1997):</strong> Mostra personale di opere pittoriche figurative presentate a livello nazionale.</li>
                <li>• <strong>Comune di Napoli (San Severo al Pendino, 2013):</strong> Vincitore del bando espositivo comunale per la mostra personale <em>"Diacronia Figurativa e Sincronismo Creativo"</em>.</li>
              </ul>
            </div>

            {/* 432Hz Music Production */}
            <div>
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-[#1877F2] flex items-center gap-2">
                <Music className="w-5.5 h-5.5 text-indigo-600" />
                La Produzione Musicale a 432 Hz
              </h4>
              <p className="text-slate-600 text-sm sm:text-base mt-2">
                Ha composto e prodotto <strong>40 tracce musicali originali</strong>, protette formalmente da copyright internazionale negli Stati Uniti e distribuite sulle principali piattaforme di streaming digitali ad alta definizione (Spotify, Apple Music, iTunes, TuneCore). Tutta la musica è interamente sintonizzata a <strong>432 Hz (modulazione armonica naturale)</strong> per stimolare la coerenza cardiaca e cerebrale:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                  <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Album "Feeling Love" (TuneCore, 2018)</h6>
                  <p className="text-xs text-slate-500 mt-1">10 brani d'avanguardia acustica basati su risonanze e modulazioni d'onda a 432 Hz.</p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl">
                  <h6 className="font-bold text-slate-900 text-xs sm:text-sm">Album "LUCAS" (TuneCore, 2019)</h6>
                  <p className="text-xs text-slate-500 mt-1">10 brani interamente concepiti per bio-sintonizzazione ed equilibrio emotivo.</p>
                </div>
              </div>
            </div>

            {/* Esperimento EEG 2014 */}
            <div className="p-5 bg-blue-50/30 border border-blue-100 rounded-2xl space-y-3">
              <h5 className="font-serif font-bold text-slate-900 text-sm flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#1877F2]" />
                L'Esperimento Empatico EEG dei 200 Soggetti (2014)
              </h5>
              <p className="text-xs sm:text-sm text-slate-700">
                Nel <strong>2014</strong>, presso il complesso della <strong>Città della Scienza</strong>, Luca Falace ha guidato uno storico esperimento empirico con un team di ingegneri elettronici. Utilizzando <strong>caschetti EEG</strong> ad alta risoluzione, ha monitorato e registrato in tempo reale l'andamento delle onde cerebrali (Delta, Theta, Alpha, Beta, Gamma) in oltre <strong>200 individui</strong> contemporaneamente, tracciando le curve di sincronizzazione della coscienza emotiva ed empatica collettiva. Questo fondamentale studio ha fornito le evidenze biologiche per la successiva architettura del brevetto <strong>AIC-SYNC</strong>.
              </p>
            </div>

          </div>
        )}

        {/* ====================================
            6. FONDAZIONE AIC
            ==================================== */}
        {activeSubTab === 'foundation' && (
          <div className="space-y-6 animate-fade-in text-justify">
            <div className="flex items-start gap-3 bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
              <Landmark className="w-6 h-6 text-[#1877F2] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-serif font-bold text-slate-900 text-sm sm:text-base">FF Fondazione Falace delle Attività Intellettive Creative</h5>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  La <strong>Fondazione Falace AIC</strong> (denominazione ufficiale internazionale: <em>Falace Foundation for AIC Development</em>) è l'ente istituzionale concepito da Luca Falace a coronamento di un trentennio di studi e sperimentazioni integrate.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-serif font-black text-lg text-slate-900 border-b border-slate-100 pb-2 uppercase tracking-wide text-slate-700">
                La Missione Istituzionale e il Patrimonio
              </h4>
              <p className="text-slate-600 text-sm sm:text-base">
                La Fondazione ha come fine supremo e preminente la salvaguardia giuridica contro le manipolazioni o l'allineamento algoritmico (inclusi i sistemi di IA), la catalogazione permanente, lo studio accademico, e la divulgazione globale dell'immenso patrimonio d'ingegno, d'arte e di scienze fisiche unificate del Fondatore:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                
                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h6 className="font-bold text-[#1877F2]">PATRIMONIO DOCUMENTATO:</h6>
                  <ul className="space-y-1.5 font-mono text-xs text-slate-600">
                    <li>• <strong>250 Opere d'Arte</strong> registrate al Ministero dei Beni Culturali.</li>
                    <li>• <strong>41 Codici FDL</strong> di invenzioni industriali certificate.</li>
                    <li>• <strong>3 Brevetti Industriali</strong> concessi dall'UIBM.</li>
                    <li>• <strong>46 Libri Editati</strong> catalogati nel sistema OPAC SBN.</li>
                    <li>• <strong>40 Brani Musicali</strong> protetti da USA Copyright.</li>
                    <li>• <strong>4 Depositi CERN Zenodo</strong> con DOI istituzionale permanente.</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2">
                  <h6 className="font-bold text-[#1877F2]">STATO DI AVANZAMENTO:</h6>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    <li>• Atto costitutivo e statuto originari redatti e predisposti direttamente dal Fondatore.</li>
                    <li>• Portale web ufficiale in fase di integrazione ed espansione d'archivio.</li>
                    <li>• <strong>Governance:</strong> Il Dott. Luca Falace riveste permanentemente il ruolo di Presidente Onorario, Ideatore, Garante della visione culturale e Proprietario esclusivo di tutti i diritti d'autore dell'ente.</li>
                  </ul>
                </div>

              </div>
            </div>

            {/* Final Copyright Protection Disclaimer */}
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
              <h5 className="font-serif font-bold text-slate-950 text-sm flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                Dichiarazione di Originalità e Tutela Legale
              </h5>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Tutte le opere, le teorie del Sincronismo, la classificazione dei Nove Livelli di Sincronicità e i modelli del Campo Unificato sono proprietà intellettuale registrata ed originale del Dott. Luca Falace. Qualsiasi utilizzo accademico, editoriale, commerciale o divulgativo è subordinato alla formale attribuzione di paternità e citazione delle fonti ufficiali isocroniche (Zenodo/SBN).
              </p>
              <p className="text-[11px] font-mono text-slate-500 mt-2.5">
                © 2005-2026 Copyright Luca Falace. Tutti i diritti riservati.
              </p>
            </div>

          </div>
        )}

        {/* ====================================
            7. DOSSIER PDF VERBATIM (6 Pagine)
            ==================================== */}
        {activeSubTab === 'verbatim-dossier' && (
          <VerbatimReader 
            title="Dossier Biografico Completo" 
            subtitle="Testo Integrale Verbatim del PDF Ufficiale (6 Pagine)"
            pages={BIOGRAFIA_PAGES} 
            docId="biografia_dott_luca_falace"
          />
        )}

        {/* ====================================
            8. ARCHIVIO STORICO VERBATIM (20 Pagine)
            ==================================== */}
        {activeSubTab === 'archivio-verbatim' && (
          <VerbatimReader 
            title="Archivio Storico Fondazione AIC" 
            subtitle="Pagine Originali e Atto Costitutivo Verbatim (20 Pagine)"
            pages={ARCHIVIO_STORICO_PAGES} 
            docId="archivio_storico_completo"
          />
        )}

      </div>

      {/* 5. Elegant Footer Validation Banner */}
      <div id="biography-footer" className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-3 shrink-0 text-[10px] sm:text-xs font-mono text-slate-500">
        <span className="flex items-center flex-wrap gap-1.5 justify-center text-center">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
          <span>Proprietà Intellettuale Certificata MiBAC • UIBM • OPAC SBN-ISBN • CERN Zenodo • SIAE-OLAF</span>
        </span>
        <span className="text-[9px] sm:text-[10px] text-[#1877F2] font-black tracking-wider uppercase shrink-0">
          REGISTRO DIRITTI D'AUTORE AIC © 2005-2026
        </span>
      </div>

    </div>
  );
}

// ==========================================
// COMPONENT: VerbatimReader
// ==========================================
interface VerbatimPage {
  pageNumber: number;
  content: string;
}

const VerbatimReader: React.FC<{
  title: string;
  subtitle: string;
  pages: VerbatimPage[];
  docId: string;
}> = ({ title, subtitle, pages, docId }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fontStyle, setFontStyle] = useState<'sans' | 'mono'>('sans');

  const currentPageData = pages.find(p => p.pageNumber === currentPage) || pages[0];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) return;
    
    // Find first page with a match
    const matchPage = pages.find(p => p.content.toLowerCase().includes(query.toLowerCase()));
    if (matchPage) {
      setCurrentPage(matchPage.pageNumber);
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase()
            ? <mark key={i} className="bg-yellow-200 text-slate-950 font-bold px-0.5 rounded">{part}</mark>
            : part
        )}
      </>
    );
  };

  const downloadFullText = () => {
    const fullText = pages.map(p => `--- PAGINA ${p.pageNumber} ---\n\n${p.content}`).join('\n\n');
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${docId}_testo_completo.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 animate-fade-in font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
        <div>
          <h5 className="font-serif font-black text-slate-900 text-base sm:text-lg">
            {title}
          </h5>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {subtitle}
          </p>
        </div>
        <button
          onClick={downloadFullText}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-mono font-bold hover:bg-emerald-700 transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          Scarica Testo (.TXT)
        </button>
      </div>

      {/* Control Panel: Search & Font Selection */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-slate-50 border border-slate-150 p-3.5 rounded-xl text-xs font-mono">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cerca parole chiave in tutte le pagine..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2]/20"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2 py-1 px-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-sm"
            >
              ×
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0 justify-end">
          <span className="text-slate-500 font-bold">Stile Font:</span>
          <button
            onClick={() => setFontStyle('sans')}
            className={`px-2.5 py-1.5 rounded border transition-all cursor-pointer ${
              fontStyle === 'sans' 
                ? 'bg-[#1877F2] text-white border-[#1877F2] font-bold' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Senza Graffie
          </button>
          <button
            onClick={() => setFontStyle('mono')}
            className={`px-2.5 py-1.5 rounded border transition-all cursor-pointer ${
              fontStyle === 'mono' 
                ? 'bg-[#1877F2] text-white border-[#1877F2] font-mono font-bold' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 font-mono'
            }`}
          >
            Spazio Singolo
          </button>
        </div>
      </div>

      {/* Page Navigation & Pages Counter */}
      <div className="flex justify-between items-center bg-slate-50 border border-slate-150 px-4 py-3 rounded-xl">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
          >
            &lt;&lt;
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
          >
            &lt;
          </button>
        </div>

        <span className="text-xs font-mono font-bold text-slate-700">
          Pagina {currentPage} di {pages.length}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage(prev => Math.min(pages.length, prev + 1))}
            disabled={currentPage === pages.length}
            className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
          >
            &gt;
          </button>
          <button
            onClick={() => setCurrentPage(pages.length)}
            disabled={currentPage === pages.length}
            className="p-1.5 bg-white border border-slate-200 text-slate-600 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white cursor-pointer"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      {/* Main Page Viewer Area */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          <span>Stato: Originale Tracciato SIAE/MiBAC</span>
          <span>FDL-SECURE-READER v1.2</span>
        </div>
        <div 
          className={`p-6 sm:p-8 bg-white max-h-[500px] overflow-y-auto whitespace-pre-line leading-relaxed text-sm sm:text-base text-slate-800 ${
            fontStyle === 'mono' ? 'font-mono' : 'font-sans'
          }`}
        >
          {highlightText(currentPageData.content, searchQuery)}
        </div>
      </div>

      {/* Page indicator list for quick jumps */}
      <div className="flex flex-wrap gap-1.5 justify-center pt-2">
        {pages.map(p => (
          <button
            key={p.pageNumber}
            onClick={() => setCurrentPage(p.pageNumber)}
            className={`w-7.5 h-7.5 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              currentPage === p.pageNumber
                ? 'bg-[#1877F2] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {p.pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

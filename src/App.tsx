/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  User, 
  LogOut, 
  BookOpen, 
  Activity, 
  ShieldCheck, 
  ArrowUp, 
  Layers, 
  FileText, 
  Compass, 
  Award,
  ChevronDown
} from 'lucide-react';

// Firebase Auth
import { auth, db } from './lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// --- CAPITOLO 1: Hero + Fondazione + About ---
import Hero from './components/Hero';
import FondazioneFalaceSection from './components/sections/FondazioneFalaceSection';
import FondazioneAicSection from './components/sections/FondazioneAicSection';
import AboutSection from './components/sections/AboutSection';
import Foundations from './components/Foundations';
import PortalPresentation from './components/PortalPresentation';

// --- CAPITOLO 2: Teoria AIC (9 Livelli di Sincronicità) ---
import TheorySection from './components/sections/TheorySection';
import TheoryAIC from './components/TheoryAIC';
import TheoryAICUnifiedField from './components/TheoryAICUnifiedField';
import PatternConnector from './components/PatternConnector';
import AicSymbols from './components/AicSymbols';

// --- CAPITOLO 3: 50 Libri ---
import BooksSection from './components/BooksSection';
import BibliotecaDigitale from './components/BibliotecaDigitale';

// --- CAPITOLO 4: 250 Opere d'Arte (Collezione Falace) ---
import WorksSection from './components/sections/WorksSection';
import ArtworksSection from './components/ArtworksSection';
import Catalogs from './components/Catalogs';

// --- CAPITOLO 5: 41 Invenzioni + 3 Brevetti UIBM ---
import InventionsSection from './components/sections/InventionsSection';
import PatentsSection from './components/PatentsSection';
import AirTherapy from './components/heritage/AirTherapy';

// --- CAPITOLO 6: 40 Composizioni Musicali 432 Hz ---
import AudioHarmonizer from './components/AudioHarmonizer';
import MusicPlayer from './components/MusicPlayer';

// --- CAPITOLO 7: Documentari + TV + Premi ---
import DocumentariView from './components/DocumentariView';
import ArchivioDocumentari from './components/ArchivioDocumentari';
import DocumentarySection from './components/DocumentarySection';
import MediaArchive from './components/MediaArchive';

// --- CAPITOLO 8: Imprenditorialità (GeniusOm, Shark Tank, RAI 2) ---
import EntrepreneurshipView from './components/EntrepreneurshipView';

// --- CAPITOLO 9: Zenodo/CERN (4 DOI scientifici) ---
import ZenodoPaper from './components/ZenodoPaper';

// --- CAPITOLO 10: Famiglia (Lucio Falace 46 brevetti WIPO + Paolo Falace) ---
import DynastyHistory from './components/heritage/DynastyHistory';
import FatherPatents from './components/heritage/FatherPatents';
import FatherVideos from './components/heritage/FatherVideos';
import PaoloArchive from './components/heritage/PaoloArchive';

// --- CAPITOLO 11: Dipartimenti AIC sezioni A–H ---
import DepartmentsSection from './components/sections/DepartmentsSection';

// --- CAPITOLO 12: SocialHub community ---
import SocialHub from './components/SocialHub';
import UserMigration from './components/UserMigration';
import UserProfileManager from './components/UserProfileManager';

// --- CAPITOLO 13: Polo Museale digitale ---
import PoloMuseale from './components/PoloMuseale';
import HQTour from './components/HQTour';

// --- CAPITOLO 14: Etica + Copyright + Deposito ---
import CoreEthics from './components/CoreEthics';
import CopyrightDeposit from './components/CopyrightDeposit';

// --- CAPITOLO 15: Futuro + HUMANA HUB AIC ---
import FutureProjects from './components/FutureProjects';
import NavigationStar from './components/NavigationStar';

// --- CAPITOLO 16: Archivio + Contatti + PDF ---
import ArchiveContactSection from './components/sections/ArchiveContactSection';
import ArchivioAicSito from './components/ArchivioAicSito';
import PDFViewerSimulator from './components/heritage/PDFViewerSimulator';
import AICDossierVerbatim from './components/AICDossierVerbatim';
import AicDocPlayer from './components/AicDocPlayer';
import NuovaFondazioneManifesto from './components/NuovaFondazioneManifesto';
import Footer from './components/Footer';

// --- Modali, Floating & Autosave ---
import AiAssistant from './components/AiAssistant';
import BiographyOverlay from './components/BiographyOverlay';
import AuthModal from './components/AuthModal';
import AutoSaveManager from './components/AutoSaveManager';

/** Helper Component: Card del Feed con IntersectionObserver e Anno Watermark dorato */
const FeedCard: React.FC<{ children: React.ReactNode; year?: string; className?: string }> = ({ 
  children, 
  year,
  className = ""
}) => {
  return (
    <div className={`relative bg-white rounded-xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-xs ${className}`}>
      {year && (
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-100">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">Archivio Cronologico</span>
          <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 font-mono text-xs font-bold rounded-md border border-slate-200">
            {year}
          </span>
        </div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

/** Helper Component: Chapter Divider Sticky con layout pulito */
const ChapterDivider: React.FC<{ number: number; title: string; subtitle?: string }> = ({ 
  number, 
  title, 
  subtitle 
}) => {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const checkCompleted = () => {
      const el = document.getElementById(`capitolo-${number}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        setCompleted(rect.top <= 100);
      }
    };
    window.addEventListener('scroll', checkCompleted, { passive: true });
    checkCompleted();
    return () => window.removeEventListener('scroll', checkCompleted);
  }, [number]);

  return (
    <div id={`capitolo-${number}`} className={`sticky top-[72px] z-30 backdrop-blur-md py-2.5 sm:py-3.5 px-3 sm:px-6 border-b flex items-center justify-between transition-all duration-300 my-4 sm:my-6 ${completed ? 'bg-[#1877F2] text-white border-[#1877F2] shadow-sm' : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'}`}>
      <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
        <span className={`font-mono text-[10px] sm:text-xs md:text-sm px-2.5 sm:px-3 py-1 font-bold rounded-full tracking-wider select-none flex items-center gap-1 shrink-0 whitespace-nowrap transition-colors duration-300 ${completed ? 'bg-white text-[#1877F2]' : 'bg-[#1877F2] text-white'}`}>
          {completed && <span className="font-black animate-scale-in">✓</span>}
          CAP. {number < 10 ? `0${number}` : number}
        </span>
        <h2 className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide leading-tight break-words flex-1 min-w-0">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-3 shrink-0 pl-4">
        {completed && (
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-white/20 text-white font-mono text-[11px] font-bold tracking-wider uppercase">
            ✓ Completato
          </span>
        )}
        {subtitle && (
          <span className={`hidden md:inline font-mono text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${completed ? 'text-emerald-400/90' : 'text-[#b8963e]'}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default function App() {
  // Global App State
  const [lang, setLang] = useState<any>('it');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Modal & Overlay States
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedBookForAi, setSelectedBookForAi] = useState<string | null>(null);
  const [isProfileManagerOpen, setIsProfileManagerOpen] = useState(false);

  // Monitor Auth Session
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Monitor Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress((window.scrollY / docHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAskAboutBook = (bookTitle: string) => {
    setSelectedBookForAi(bookTitle);
    setIsChatOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 relative pb-20">
      
      {/* 0. HEADER FISSO BIANCO PULITO */}
      <header className="fixed top-0 left-0 right-0 min-h-[72px] py-2 bg-white text-slate-900 z-40 px-4 sm:px-8 flex items-center justify-between shadow-xs border-b border-slate-200">
        <div className="flex items-center space-x-3 sm:space-x-4 cursor-pointer" onClick={scrollToTop}>
          <div className="w-10 h-10 shrink-0 rounded-full bg-[#1877F2] flex items-center justify-center text-white font-black font-serif text-lg shadow-xs">
            FF
          </div>
          <div className="flex flex-col leading-tight space-y-0.5">
            <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-slate-900">
              FONDAZIONE FALACE
            </span>
            <span className="font-sans text-[11px] text-slate-700 font-bold">
              Patrimonio Luca Falace
            </span>
            <span className="font-sans text-[10px] text-slate-500 font-medium">
              Progetto Fondazione Falace
            </span>
            <span className="font-mono text-[9px] text-[#1877F2] font-bold uppercase tracking-wider">
              ARCHIVIO STORICO FF
            </span>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Quick Chapters Jump */}
          <div className="hidden lg:flex items-center space-x-1.5 font-mono text-[10px] text-slate-500 font-bold">
            <span>SCROLL INFINITO</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#1877F2] animate-bounce" />
          </div>
        </div>

        {/* SCROLL PROGRESS BAR BLU */}
        <div 
          className="absolute bottom-0 left-0 h-[3px] bg-[#1877F2] transition-all duration-150 shadow-[0_0_8px_#1877F2]"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* --- WORKSPACE CENTRALE A FEED INFINITO VERTICALE --- */}
      <main className="mt-[82px] max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-10 pt-4">

        {/* ==================== CAPITOLO 1: Origini e Fondazione ==================== */}
        <ChapterDivider number={1} title="Origini e Fondazione Falace" subtitle="Fondazione Falace delle AIC" />
        <FeedCard year="2005">
          <Hero />
          <div className="mt-6 max-w-xl mx-auto border-t border-slate-100 pt-6">
            <BiographyOverlay />
          </div>
        </FeedCard>
        <FeedCard year="2010">
          <FondazioneFalaceSection />
        </FeedCard>
        <FeedCard year="2015">
          <FondazioneAicSection />
        </FeedCard>
        <FeedCard year="2018">
          <AboutSection />
        </FeedCard>
        <FeedCard year="2020">
          <Foundations />
        </FeedCard>
        <FeedCard year="2024">
          <PortalPresentation />
        </FeedCard>

        {/* ==================== CAPITOLO 2: Teoria AIC (9 Livelli di Sincronicità) ==================== */}
        <ChapterDivider number={2} title="Teoria AIC & 9 Livelli di Sincronicità" subtitle="Fisica del Campo Unificato" />
        <FeedCard year="2012">
          <TheorySection />
        </FeedCard>
        <FeedCard year="2014">
          <TheoryAIC />
        </FeedCard>
        <FeedCard year="2019">
          <TheoryAICUnifiedField />
        </FeedCard>
        <FeedCard year="2022">
          <PatternConnector />
        </FeedCard>
        <FeedCard year="2025">
          <AicSymbols />
        </FeedCard>

        {/* ==================== CAPITOLO 3: 50 Libri (cronologici) ==================== */}
        <ChapterDivider number={3} title="50 Libri & Opera Omnia Cronologica" subtitle="OPAC SBN · Catalogo Ufficiale" />
        <FeedCard year="2008–2025">
          <BooksSection onAskAboutBook={handleAskAboutBook} />
        </FeedCard>
        <FeedCard year="2024">
          <BibliotecaDigitale />
        </FeedCard>

        {/* ==================== CAPITOLO 4: 250 Opere d'Arte (Collezione Falace) ==================== */}
        <ChapterDivider number={4} title="250 Opere d'Arte — Collezione Falace" subtitle="MiBAC · MAXXI Deposito" />
        <FeedCard year="1980–2026">
          <WorksSection />
        </FeedCard>
        <FeedCard year="2022">
          <ArtworksSection />
        </FeedCard>
        <FeedCard year="2025">
          <Catalogs />
        </FeedCard>

        {/* ==================== CAPITOLO 5: 41 Invenzioni + 3 Brevetti UIBM ==================== */}
        <ChapterDivider number={5} title="41 Invenzioni & Brevetti Ministeriali UIBM" subtitle="Ingegneria Sincronica" />
        <FeedCard year="1985">
          <InventionsSection />
        </FeedCard>
        <FeedCard year="2016">
          <PatentsSection />
        </FeedCard>
        <FeedCard year="2021">
          <AirTherapy language={lang} />
        </FeedCard>

        {/* ==================== CAPITOLO 6: 40 Composizioni Musicali 432 Hz ==================== */}
        <ChapterDivider number={6} title="Laboratorio Musicale 432 Hz" subtitle="Bio-Frequenze Sincroniche" />
        <FeedCard year="2015">
          <AudioHarmonizer />
        </FeedCard>
        <FeedCard year="2023">
          <MusicPlayer />
        </FeedCard>

        {/* ==================== CAPITOLO 7: Documentari + TV + Premi ==================== */}
        <ChapterDivider number={7} title="Documentari, Teche TV & Premi Internazionali" subtitle="RAI · Discoteca di Stato" />
        <FeedCard year="2011">
          <DocumentariView />
        </FeedCard>
        <FeedCard year="2017">
          <ArchivioDocumentari />
        </FeedCard>
        <FeedCard year="2020">
          <DocumentarySection />
        </FeedCard>
        <FeedCard year="2024">
          <MediaArchive />
        </FeedCard>

        {/* ==================== CAPITOLO 8: Imprenditorialità (GeniusOm, Shark Tank, RAI 2) ==================== */}
        <ChapterDivider number={8} title="Imprenditorialità — GeniusOm & Shark Tank RAI 2" subtitle="Innovazione & Mercato" />
        <FeedCard year="2015">
          <EntrepreneurshipView />
        </FeedCard>

        {/* ==================== CAPITOLO 9: Zenodo/CERN (4 DOI scientifici) ==================== */}
        <ChapterDivider number={9} title="CERN / Zenodo — Pubblicazioni Scientifiche DOI" subtitle="Open Science Repository" />
        <FeedCard year="2023">
          <ZenodoPaper />
        </FeedCard>

        {/* ==================== CAPITOLO 10: Famiglia (Lucio Falace 46 brevetti WIPO + Paolo Falace) ==================== */}
        <ChapterDivider number={10} title="Dinastia Falace — Lucio & Paolo Falace" subtitle="46 Brevetti WIPO · Eredità" />
        <FeedCard year="1970">
          <DynastyHistory language={lang} />
        </FeedCard>
        <FeedCard year="1982">
          <FatherPatents language={lang} />
        </FeedCard>
        <FeedCard year="1990">
          <FatherVideos language={lang} />
        </FeedCard>
        <FeedCard year="2005">
          <PaoloArchive language={lang} />
        </FeedCard>

        {/* ==================== CAPITOLO 11: Dipartimenti AIC sezioni A–H ==================== */}
        <ChapterDivider number={11} title="Dipartimenti AIC Sezioni A–H" subtitle="Struttura Accademica Integrata" />
        <FeedCard year="2018">
          <DepartmentsSection setActiveTab={() => {}} />
        </FeedCard>

        {/* ==================== CAPITOLO 12: SocialHub community ==================== */}
        <ChapterDivider number={12} title="SocialHub Community & Migrazione Account" subtitle="Web3 & Creators AIC" />
        <FeedCard year="2025">
          <SocialHub onGoToDeposit={() => {
            const el = document.getElementById('capitolo-14');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }} />
        </FeedCard>
        <FeedCard year="2025">
          <UserMigration />
        </FeedCard>

        {/* ==================== CAPITOLO 13: Polo Museale digitale ==================== */}
        <ChapterDivider number={13} title="Polo Museale Digitale & Tour Virtuale" subtitle="Meta-Gallerie Falace" />
        <FeedCard year="2025">
          <PoloMuseale />
        </FeedCard>
        <FeedCard year="2026">
          <HQTour language={lang} />
        </FeedCard>

        {/* ==================== CAPITOLO 14: Etica + Copyright + Deposito ==================== */}
        <ChapterDivider number={14} title="Etica AIC, Deposito Copyright & Tutela SIAE" subtitle="Garanzie & Blockchain" />
        <FeedCard year="2005–2026">
          <CoreEthics />
        </FeedCard>
        <FeedCard year="2026">
          <CopyrightDeposit />
        </FeedCard>

        {/* ==================== CAPITOLO 15: Futuro + HUMANA HUB AIC ==================== */}
        <ChapterDivider number={15} title="Progetti Futuri & HUMANA HUB AIC" subtitle="Visione 2030" />
        <FeedCard year="2028">
          <FutureProjects />
        </FeedCard>
        <FeedCard year="2030">
          <NavigationStar />
        </FeedCard>

        {/* ==================== CAPITOLO 16: Archivio + Contatti + PDF ==================== */}
        <ChapterDivider number={16} title="Archivio Generale, Contatti & Dossier PDF" subtitle="Sintesi Ufficiale Verbatim" />
        <FeedCard year="2026">
          <ArchiveContactSection />
        </FeedCard>
        <FeedCard year="2026">
          <ArchivioAicSito />
        </FeedCard>
        <FeedCard year="2026">
          <PDFViewerSimulator documentId="dossier_falace" language={lang} />
        </FeedCard>
        <FeedCard year="2026">
          <AICDossierVerbatim language={lang} />
        </FeedCard>
        <FeedCard year="2026">
          <AicDocPlayer documentId="libro_completo" language={lang} />
        </FeedCard>
        <FeedCard year="2026">
          <NuovaFondazioneManifesto language={lang} />
        </FeedCard>

      </main>

      {/* --- PIÈ DI PAGINA UNIFICATO --- */}
      <div className="mt-16">
        <Footer />
      </div>

      {/* --- MODALI INTERATTIVE & OVERLAY --- */}

      {/* 1. Modal Assistente AI Sincronico */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsChatOpen(false)}
        >
          <div 
            className="w-full max-w-4xl h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AiAssistant 
              preselectedTopic={selectedBookForAi} 
              onClearPreselected={() => setSelectedBookForAi(null)} 
              onClose={() => setIsChatOpen(false)}
            />
          </div>
        </div>
      )}

      {/* 2. Modal Biografia Overlay */}

      {/* 5. Floating Pulsante Torna in Cima in basso a destra */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {scrollProgress > 5 && (
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-[#1877F2] hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all cursor-pointer transform hover:-translate-y-1"
            title="Torna all'inizio del Feed / Scroll to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 6. Firebase AutoSave Manager invisibile in background */}
      <AutoSaveManager />

    </div>
  );
}

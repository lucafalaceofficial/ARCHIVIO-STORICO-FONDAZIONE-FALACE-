import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar.js';
import Header from './components/Header.js';
import AiAssistant from './components/AiAssistant.js';
import MusicPlayer from './components/MusicPlayer.js';

// Heritage folder components
import AirTherapy from './components/heritage/AirTherapy.js';
import DynastyHistory from './components/heritage/DynastyHistory.js';
import FatherPatents from './components/heritage/FatherPatents.js';
import FatherVideos from './components/heritage/FatherVideos.js';
import PaoloArchive from './components/heritage/PaoloArchive.js';
import PDFViewerSimulator from './components/heritage/PDFViewerSimulator.js';

// Sections folder components
import AboutSection from './components/sections/AboutSection.js';
import ArchiveContactSection from './components/sections/ArchiveContactSection.js';
import FondazioneAicSection from './components/sections/FondazioneAicSection.js';
import FondazioneFalaceSection from './components/sections/FondazioneFalaceSection.js';
import HomeSection from './components/sections/HomeSection.js';
import InventionsSection from './components/sections/InventionsSection.js';
import TheorySection from './components/sections/TheorySection.js';
import WorksSection from './components/sections/WorksSection.js';
import BooksSection from './components/BooksSection.js';
import DepartmentsSection from './components/sections/DepartmentsSection.js';
import BibliotecaDigitale from './components/BibliotecaDigitale.js';

// Base components
import AudioHarmonizer from './components/AudioHarmonizer.js';
import BiographyOverlay from './components/BiographyOverlay.js';
import Catalogs from './components/Catalogs.js';
import DocumentariView from './components/DocumentariView.js';
import ArchivioDocumentari from './components/ArchivioDocumentari.js';
import EntrepreneurshipView from './components/EntrepreneurshipView.js';
import Footer from './components/Footer.js';
import Foundations from './components/Foundations.js';
import FutureProjects from './components/FutureProjects.js';
import MediaArchive from './components/MediaArchive.js';
import PatternConnector from './components/PatternConnector.js';
import TheoryAIC from './components/TheoryAIC.js';
import TheoryAICUnifiedField from './components/TheoryAICUnifiedField.js';
import ZenodoPaper from './components/ZenodoPaper.js';
import ArchivioAicSito from './components/ArchivioAicSito.js';

import { auth, db } from './utils/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import AuthModal from './components/AuthModal.js';

import { Sparkles, Library, FileText, Layers, ShieldCheck, X, Save, Clock } from 'lucide-react';

type MainTab = 'institution' | 'departments' | 'patents' | 'catalog' | 'heritage' | 'music_lab' | 'documentaries' | 'library' | 'cern_zenodo' | 'archivio_aic';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTab>(() => {
    const saved = localStorage.getItem('aic_active_tab');
    return (saved as MainTab) || 'institution';
  });
  const [selectedBookForAi, setSelectedBookForAi] = useState<string | null>(() => {
    return localStorage.getItem('aic_selected_book') || null;
  });
  const [isChatOpen, setIsChatOpen] = useState(() => {
    return localStorage.getItem('aic_chat_open') === 'true';
  });

  // Autosave UI status states
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [saveReason, setSaveReason] = useState<'periodic' | 'inactivity' | null>(null);
  
  // Custom Firebase Authentication & Sincronizzazione states
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [cloudSynced, setCloudSynced] = useState(false);

  // Monitor Authentication Session State changed
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid, 'states', 'current');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.activeTab) {
              setActiveTab(data.activeTab as MainTab);
            }
            if (data.selectedBookForAi !== undefined) {
              setSelectedBookForAi(data.selectedBookForAi);
            }
            if (data.isChatOpen !== undefined) {
              setIsChatOpen(data.isChatOpen);
            }
            console.log("Stato ripristinato dal Cloud Firebase.");
          }
        } catch (error) {
          console.warn("Recupero stato iniziale da Database ignorato/off-line:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const lastActiveRef = useRef<number>(Date.now());
  const stateRef = useRef({ activeTab, selectedBookForAi, isChatOpen });

  // Keep state sync ref updated to prevent resetting timers on state modifications
  useEffect(() => {
    stateRef.current = { activeTab, selectedBookForAi, isChatOpen };
  }, [activeTab, selectedBookForAi, isChatOpen]);

  // Track user interactive activities to monitor precise idle times
  useEffect(() => {
    const handleActivity = () => {
      lastActiveRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, []);

  const saveStateInstance = async (reason: 'periodic' | 'inactivity') => {
    const { activeTab: currentTab, selectedBookForAi: currentBook, isChatOpen: chatOpen } = stateRef.current;
    
    // Save to LocalStorage
    localStorage.setItem('aic_active_tab', currentTab);
    localStorage.setItem('aic_selected_book', currentBook || '');
    localStorage.setItem('aic_chat_open', chatOpen ? 'true' : 'false');
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    
    // Async synchronization to cloud if logged in
    let isCloudSaved = false;
    const user = auth.currentUser;
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid, 'states', 'current');
        await setDoc(docRef, {
          activeTab: currentTab,
          selectedBookForAi: currentBook,
          isChatOpen: chatOpen,
          updatedAt: now.toISOString()
        });
        isCloudSaved = true;
      } catch (error) {
        console.error("Firebase Sync-Error:", error);
      }
    }

    setLastSaved(timeString);
    setSaveReason(reason);
    setCloudSynced(isCloudSaved);
    setShowSaveNotification(true);
    
    const timeoutId = setTimeout(() => {
      setShowSaveNotification(false);
    }, 4500);
    
    return timeoutId;
  };

  // Automated core logic: save periodically (every 2 minutes) or saved on inactivity (after 45s of no raw activity)
  useEffect(() => {
    let lastSavedTime = Date.now();
    let isInactiveSaved = false;
    let toastTimer: any = null;

    const interval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActiveRef.current;
      const timeSinceLastSave = now - lastSavedTime;

      // 1. Periodic autosave every 2 minutes (120000 ms)
      if (timeSinceLastSave >= 120000) {
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = saveStateInstance('periodic');
        lastSavedTime = now;
        isInactiveSaved = false;
      }
      // 2. Inactivity autosave after 45 seconds of continuous idle time
      else if (idleTime >= 45000 && !isInactiveSaved) {
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = saveStateInstance('inactivity');
        isInactiveSaved = true;
        lastSavedTime = now;
      }

      // Reset inactivity save gate if the user becomes active again
      if (idleTime < 45000) {
        isInactiveSaved = false;
      }
    }, 5000); // Check loop running every 5 seconds

    return () => {
      clearInterval(interval);
      if (toastTimer) clearTimeout(toastTimer);
    };
  }, []);

  const handleAskAboutBook = (bookTitle: string) => {
    setSelectedBookForAi(bookTitle);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-white selection:text-black font-sans antialiased">
      {/* 0. Sticky Top Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAiChat={() => setIsChatOpen(true)} 
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={() => signOut(auth)}
      />

      {/* 1. Header Hero Panel with dynamic name label mapping */}
      <HomeSection activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Main Workspace Layout */}
      <main id="main-workspace-layout" className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 w-full flex-grow">
        
        {/* Active main tab view - spans 9 columns on desktop */}
        <div className="lg:col-span-9 flex flex-col gap-10">
          
          {activeTab === 'institution' && (
            <div className="space-y-10 animate-fade-in">
              <FondazioneFalaceSection />
              <FondazioneAicSection />
              <AboutSection />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0066CC] animate-pulse" />
                  <span className="text-[10.5px] font-mono text-[#0066CC] uppercase tracking-widest font-black">
                    Sfoglia il Curriculum Vitae &amp; Biografia Certificata (PDF Ufficiale)
                  </span>
                </div>
                <PDFViewerSimulator defaultDocIndex={3} />
              </div>

              <BiographyOverlay />
              <ArchiveContactSection />
            </div>
          )}

          {activeTab === 'departments' && (
            <div className="space-y-10 animate-fade-in">
              <DepartmentsSection setActiveTab={setActiveTab} />
            </div>
          )}

          {activeTab === 'patents' && (
            <div className="space-y-10 animate-fade-in">
              <TheorySection />
              <TheoryAIC />
              <TheoryAICUnifiedField />
              <InventionsSection />
              <PatternConnector />
              <EntrepreneurshipView />
              <AirTherapy />
              <DynastyHistory />
            </div>
          )}

          {activeTab === 'catalog' && (
            <div className="space-y-10 animate-fade-in">
              <WorksSection />
              <BooksSection onAskAboutBook={handleAskAboutBook} />
              <Catalogs />
              <Foundations />
              <PDFViewerSimulator />
            </div>
          )}

          {activeTab === 'cern_zenodo' && (
            <div className="space-y-10 animate-fade-in">
              <ZenodoPaper />
            </div>
          )}

          {activeTab === 'heritage' && (
            <div className="space-y-10 animate-fade-in">
              <FatherPatents />
              <FatherVideos />
              <PaoloArchive />
              <DocumentariView />
              <MediaArchive />
              <FutureProjects />
            </div>
          )}

          {activeTab === 'music_lab' && (
            <div className="space-y-10 animate-fade-in">
              <AudioHarmonizer />
              <MusicPlayer />
            </div>
          )}

          {activeTab === 'documentaries' && (
            <div className="space-y-10 animate-fade-in">
              <ArchivioDocumentari />
            </div>
          )}

          {activeTab === 'library' && (
            <div className="space-y-10 animate-fade-in">
              <BibliotecaDigitale />
            </div>
          )}

          {activeTab === 'archivio_aic' && (
            <div className="space-y-10 animate-fade-in">
              <ArchivioAicSito />
            </div>
          )}

        </div>

        {/* Right Sticky Column (Side controls) - spans 3 columns on desktop */}
        <div className="lg:col-span-3 lg:sticky lg:top-24 self-start flex flex-col gap-8">
          
          {/* Quick Stats Certification stamps */}
          <div className="bg-white border border-black p-5 rounded-none text-black ">
            <span className="text-[8px] font-mono tracking-widest text-[#0066CC] uppercase block mb-3 font-bold">
              Registro Integrato Garanzie
            </span>
            <div className="space-y-2.5 text-[10.5px] font-sans">
              <div className="flex justify-between items-center pb-2 border-b border-black">
                <span className="text-black">1. MiC / MiBAC (Tutela &amp; Diritto d'Autore)</span>
                <span className="font-mono text-[#0066CC] font-bold">250 Opere d'Arte</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-black">
                <span className="text-black">2. UIBM (Brevetti Ministeriali Sincronismo)</span>
                <span className="font-mono text-[#0066CC] font-bold">3 Brevetti</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-black">
                <span className="text-black">3. OPAC SBN-ISBN (Catalogazione Libri)</span>
                <span className="font-mono text-[#0066CC] font-bold">49 Monografie</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-black">
                <span className="text-black">4. CERN Zenodo (Archivio Digitale DOI)</span>
                <span className="font-mono text-[#0066CC] font-bold">3 Pubblicazioni</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-black">
                <span className="text-black">5. Dds Discoteca di Stato (Registrazioni)</span>
                <span className="font-mono text-[#0066CC] font-bold font-black">Audio &amp; Video</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-black">6. Museo MAXXI (Deposito Contemporaneo)</span>
                <span className="font-mono text-[#0066CC] font-bold font-black">Opere Catalogate</span>
              </div>
            </div>
          </div>

        </div>

      </main>

      {/* 3. Refined Signature Footer */}
      <Footer />

      {/* Centered Modal Overlay for AI Chat - Guarantees perfect alignment and responsive layout on all devices */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-fade-in"
          onClick={() => setIsChatOpen(false)}
        >
          <div 
            className="w-full max-w-3xl h-[85vh] sm:h-[650px] bg-white border-2 border-[#0066CC] rounded-2xl shadow-2xl flex flex-col relative animate-scale-up overflow-hidden"
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

      {/* Floating Circular Trigger button always accessible at the bottom-right */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Circular Toggle Button representing official Sages/Advisors */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="pointer-events-auto w-9.5 h-9.5 bg-[#0066CC] border text-white rounded-full flex items-center justify-center hover:bg-black hover:scale-105 transition-all duration-300 relative group cursor-pointer focus:outline-none"
          title={isChatOpen ? "Chiudi Assistente AI" : "Chiedi all'Assistente AI Sincronico"}
          id="researcher-chat"
        >
          {isChatOpen ? (
            <X className="w-4 h-4 transform rotate-90 transition-transform duration-300" />
          ) : (
            <>
              <span className="absolute -top-1 -right-1 w-3.2 h-3.2 bg-red-600 rounded-full flex items-center justify-center text-[7px] font-mono font-bold text-white uppercase animate-pulse">
                AIC
              </span>
              <Sparkles className="w-4 h-4" />
            </>
          )}

          {/* Hovering label text for user guidance */}
          <span className="absolute right-12 bg-white border border-black text-black text-[9px] font-mono uppercase font-black tracking-widest px-2.5 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block select-none">
            Chiedi all'AI Sincronica
          </span>
        </button>
      </div>

      {/* Elegant floating autosave notification in bottom-left */}
      {showSaveNotification && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#003b71] text-white border border-white/20 shadow-2xl px-4 py-3 flex items-center gap-3 animate-fade-in font-mono text-[11px] rounded-xs select-none">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${saveReason === 'inactivity' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${saveReason === 'inactivity' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
          </span>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider uppercase text-white leading-none">
              {saveReason === 'inactivity' ? 'Inattività Rilevata' : 'Salvataggio Automatico'}
            </span>
            <span className="text-[10px] text-white/80 mt-1 leading-none">
              Stato sintonizzato {cloudSynced ? 'sul Cloud' : 'localmente'} alle {lastSaved}
            </span>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

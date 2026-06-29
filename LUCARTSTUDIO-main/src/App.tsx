import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import Foundations from './components/Foundations';
import ZenodoPaper from './components/ZenodoPaper';
import TheorySection from './components/sections/TheorySection';
import Catalogs from './components/Catalogs';
import InventionsSection from './components/sections/InventionsSection';
import AudioHarmonizer from './components/AudioHarmonizer';
import HQTour from './components/HQTour';
import FutureProjects from './components/FutureProjects';
import DocumentariView from './components/DocumentariView';
import ArchiveContactSection from './components/sections/ArchiveContactSection';
import Footer from './components/Footer';
import NavigationStar from './components/NavigationStar';
import EntrepreneurshipView from './components/EntrepreneurshipView';
import BiographyOverlay from './components/BiographyOverlay';
import { BookOpen, CheckCircle, Cloud, CloudLightning } from 'lucide-react';
import FondazioneAicSection from './components/sections/FondazioneAicSection';
import AICDossierVerbatim from './components/AICDossierVerbatim';
import ArchivioAicSito from './components/ArchivioAicSito';
import AicWidget from './components/AicWidget';
import { 
  initAuth, 
  ensureAnonymousSession, 
  saveUserPreferencesToCloud, 
  getUserPreferencesFromCloud 
} from './lib/firebase';

const projectLogoImage = new URL('./assets/images/hq_logo_details_1779745349476.png', import.meta.url).href;

export default function App() {
  const [language, setLanguage] = useState<'it' | 'en'>(() => {
    const saved = localStorage.getItem('falace_language');
    return (saved === 'it' || saved === 'en') ? saved : 'it';
  });
  const [activeSection, setActiveSection] = useState<number>(() => {
    const saved = localStorage.getItem('falace_active_section');
    return saved ? Number(saved) : 1;
  });
  const [isBiographyOpen, setIsBiographyOpen] = useState<boolean>(() => {
    return localStorage.getItem('falace_biography_open') === 'true';
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'syncing' | 'synced' | 'disconnected'>('disconnected');
  const [saveNotification, setSaveNotification] = useState<{ show: boolean; message: string } | null>(null);
  const stateRef = useRef({ language, activeSection, isBiographyOpen, userId });

  // Keep stateRef up to date with latest states
  useEffect(() => {
    stateRef.current = { language, activeSection, isBiographyOpen, userId };
  }, [language, activeSection, isBiographyOpen, userId]);

  // Connect & load credentials with cloud on startup
  useEffect(() => {
    const unsubscribe = initAuth(
      async (user) => {
        setUserId(user.uid);
        setCloudSyncStatus('syncing');
        // Retrieve settings from Firestore
        const prefs = await getUserPreferencesFromCloud(user.uid);
        if (prefs) {
          setLanguage(prefs.language);
          setActiveSection(prefs.activeSection);
          setIsBiographyOpen(prefs.isBiographyOpen);
          setCloudSyncStatus('synced');
        } else {
          // If no cloud data yet, back up current local ones immediately to bootstrap
          const { language, activeSection, isBiographyOpen } = stateRef.current;
          await saveUserPreferencesToCloud(user.uid, { language, activeSection, isBiographyOpen });
          setCloudSyncStatus('synced');
        }
      },
      () => {
        setUserId(null);
        setCloudSyncStatus('disconnected');
      }
    );

    // Prompt background secure session creation
    ensureAnonymousSession().catch(err => {
      console.warn('[Firebase Auth] Background session creation failed:', err);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Save changes locally and backup to cloud whenever state changes
  useEffect(() => {
    localStorage.setItem('falace_language', language);
    localStorage.setItem('falace_active_section', activeSection.toString());
    localStorage.setItem('falace_biography_open', isBiographyOpen ? 'true' : 'false');
    
    if (userId) {
      setCloudSyncStatus('syncing');
      saveUserPreferencesToCloud(userId, { language, activeSection, isBiographyOpen })
        .then(() => setCloudSyncStatus('synced'))
        .catch(() => setCloudSyncStatus('disconnected'));
    }
  }, [language, activeSection, isBiographyOpen, userId]);

  // Joint state-save executor
  const saveData = (trigger: 'periodico' | 'inattivita' | 'manuale') => {
    const { language, activeSection, isBiographyOpen, userId } = stateRef.current;
    
    localStorage.setItem('falace_language', language);
    localStorage.setItem('falace_active_section', activeSection.toString());
    localStorage.setItem('falace_biography_open', isBiographyOpen ? 'true' : 'false');
    
    // Dispatch a global custom event to trigger sub-module autosaves (e.g., chat)
    window.dispatchEvent(new CustomEvent('falace-global-save'));

    if (userId) {
      setCloudSyncStatus('syncing');
      saveUserPreferencesToCloud(userId, { language, activeSection, isBiographyOpen })
        .then(() => setCloudSyncStatus('synced'))
        .catch(() => setCloudSyncStatus('disconnected'));
    }
    
    const timeStr = new Date().toLocaleTimeString(undefined, { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });

    const msg = language === 'it'
      ? (trigger === 'periodico' 
          ? `Stato salvato automaticamente e sincronizzato nel Cloud alle ${timeStr}`
          : trigger === 'inattivita'
            ? `Autosave per inattività completato nel Cloud alle ${timeStr}`
            : `Stato salvato e sincronizzato con successo alle ${timeStr}`)
      : (trigger === 'periodico'
          ? `State auto-saved and synced to Cloud at ${timeStr}`
          : trigger === 'inattivita'
            ? `Auto-saved to Cloud due to inactivity at ${timeStr}`
            : `State saved and synchronized to Cloud at ${timeStr}`);

    setSaveNotification({ show: true, message: msg });
  };


  // Implement auto-save loops and inactivity detection
  useEffect(() => {
    // 1. Periodic autosave every 3 minutes (180,000 ms)
    const periodicInterval = setInterval(() => {
      saveData('periodico');
    }, 180000);

    // 2. Inactivity autosave (60 seconds of zero interaction)
    let inactivityTimeout: NodeJS.Timeout;
    
    const triggerInactivitySave = () => {
      saveData('inattivita');
    };

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(triggerInactivitySave, 60000);
    };

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach((evtName) => {
      window.addEventListener(evtName, resetInactivityTimer);
    });

    resetInactivityTimer();

    return () => {
      clearInterval(periodicInterval);
      clearTimeout(inactivityTimeout);
      activityEvents.forEach((evtName) => {
        window.removeEventListener(evtName, resetInactivityTimer);
      });
    };
  }, []);

  // Auto dismiss notification after a few seconds
  useEffect(() => {
    if (saveNotification && saveNotification.show) {
      const timer = setTimeout(() => {
        setSaveNotification(prev => prev ? { ...prev, show: false } : null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [saveNotification]);

  // Smooth redirection from Section 9 (Sintonizzatore) to Section 11 (Ricerca) scrolling to the acoustics block
  useEffect(() => {
    if (activeSection === 9) {
      setActiveSection(11);
      setTimeout(() => {
        const el = document.getElementById('composizioni-canali');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, [activeSection]);

  return (
    <div className="bg-[#FAFAF8] text-brand-navy-dark selection:bg-brand-gold/30 selection:text-brand-navy-dark min-h-screen relative flex flex-col justify-between">
      
      {/* 1. Universal Sticky Header with Language Trigger and Link Bindings */}
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        onOpenBiography={() => setIsBiographyOpen(true)}
      />

      {/* Spacing alignment helper for the sticky nav */}
      <div className="h-[90px] sm:h-[102px] w-full bg-[#FAFAF8] flex-none" />

      {/* 2. Institutional Image Banner shown on open (Home Page) before the Navigation Star */}
      {activeSection === 1 && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-6 relative z-20"
        >
          <div className="border border-brand-gold bg-[#FAFAF8] p-1.5 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] max-h-[500px] overflow-hidden bg-[#07132a] border border-brand-gold/15">
              <div className="absolute inset-y-0 left-0 w-[132%] ml-[-28%] h-full">
                <img 
                  src={projectLogoImage} 
                  alt="PROGETTO FONDAZIONE FALACE delle Attività Intellettive Creative" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.05]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Elegant tiny didascalia (caption) below the image */}
            <div className="mt-1.5 text-center select-none border-t border-brand-gold/10 pt-1.5">
              <p className="font-serif text-[10px] sm:text-[11px] tracking-wider text-[#737373] max-w-xl mx-auto leading-tight">
                {language === 'it' ? (
                  <>
                    PROGETTO FONDAZIONE FALACE<br />DELLE ATTIVITÀ INTELLETTIVE CREATIVE
                  </>
                ) : (
                  <>
                    PROJECT FONDAZIONE FALACE<br />OF CREATIVE INTELLECTUAL ACTIVITIES
                  </>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* 3. Global Navigation Compass Rose near the entrance to ground the user on every section */}
      <NavigationStar language={language} setActiveSection={setActiveSection} />

      <div id="main-content-anchor" className="scroll-mt-24" />

      {/* 4. Dynamic Interactive Main Sections Renderer */}
      <main className="grow py-6 sm:py-10">
        
        {activeSection === 1 && (
          <HomeSection language={language} setActiveSection={setActiveSection} onOpenBiography={() => setIsBiographyOpen(true)} />
        )}

        {activeSection === 2 && (
          <AboutSection language={language} />
        )}

        {activeSection === 3 && (
          <Foundations language={language} />
        )}

        {activeSection === 16 && (
          <div className="space-y-12 animate-fade-in bg-[#FAFAF8] py-8">
            <FondazioneAicSection language={language} />
            
            {/* Embedded fully autonomous secondary Portal replica built from XML */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ArchivioAicSito language={language} />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-brand-gold/15 pt-12">
              <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#8A6D3B] block mb-4 font-mono">
                {language === 'it' ? 'DOCUMENTI, VERBALI E ATTI DI REGISTRO COPIE VERBATIM (EX FAIC)' : 'OFFICIAL TRANSCRIPTS, RECORDS & REGISTER EVIDENCE'}
              </span>
              <AICDossierVerbatim language={language} />
            </div>
          </div>
        )}

        {activeSection === 4 && (
          <TheorySection language={language} />
        )}

        {activeSection === 5 && (
          <DocumentariView language={language} />
        )}

        {activeSection === 6 && (
          <TheorySection language={language} initialSubTab="documentary" />
        )}

        {(activeSection === 7 || activeSection === 13 || activeSection === 14) && (
          <Catalogs 
            language={language} 
            initialTab={
              activeSection === 13 ? 'exhibitions' : 
              activeSection === 14 ? 'certificates' : 
              activeSection === 7 ? 'books' :
              undefined
            } 
          />
        )}

        {activeSection === 8 && (
          <InventionsSection language={language} />
        )}

        {activeSection === 9 && (
          <AudioHarmonizer language={language} />
        )}

        {activeSection === 10 && (
          <HQTour language={language} />
        )}

        {activeSection === 11 && (
          <>
            <FutureProjects language={language} />
            <ZenodoPaper language={language} />
            <AudioHarmonizer language={language} />
          </>
        )}

        {activeSection === 12 && (
          <ArchiveContactSection language={language} />
        )}

        {activeSection === 15 && (
          <EntrepreneurshipView language={language} />
        )}

      </main>

      {/* Floating Global Button for Biography (FAB) - Placed on the bottom-left to balance layout with AI-C */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:block">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBiographyOpen(true)}
          className="flex items-center gap-2.5 bg-[#0F2347] hover:bg-brand-gold text-brand-gold hover:text-[#0F2347] border-2 border-brand-gold shadow-2xl px-5 py-3.5 text-[10px] tracking-widest font-black uppercase transition-all duration-300 rounded-none cursor-pointer"
        >
          <BookOpen className="w-4.5 h-4.5 animate-pulse" />
          <span>BIOGRAFIA DI LUCA FALACE</span>
        </motion.button>
      </div>

      {/* Mobile Floating Button - Placed on the bottom-left */}
      <div className="fixed bottom-4 left-4 z-40 md:hidden">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsBiographyOpen(true)}
          className="flex items-center justify-center w-12 h-12 bg-[#0F2347] text-brand-gold border-2 border-brand-gold shadow-2xl rounded-none cursor-pointer"
          aria-label="Biografia Luca Falace"
        >
          <BookOpen className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Isolated Generative AI Cultural Assistant Layer (Fixed Bottom-Right overlay) */}
      <AicWidget language={language} />

      {/* 4. Standard Deluxe Seal Footer */}
      <Footer language={language} onOpenBiography={() => setIsBiographyOpen(true)} setActiveSection={setActiveSection} />

      {/* 5. Complete Verbatim Biography Overlay */}
      <BiographyOverlay 
        isOpen={isBiographyOpen} 
        onClose={() => setIsBiographyOpen(false)} 
        language={language}
      />

      {/* 6. Subtle, premium Auto-Save Toast Message */}
      <AnimatePresence>
        {saveNotification && saveNotification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed bottom-24 right-5 sm:right-6 md:right-24 z-[99999] bg-[#07132a] border border-brand-gold/40 shadow-2xl px-4 py-3 text-brand-gold max-w-sm flex items-center gap-3 select-none"
          >
            <div className="bg-brand-gold/10 p-1.5 border border-brand-gold/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-brand-gold animate-pulse shrink-0" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.15em] font-black text-[#A68A56] leading-none mb-1">
                {language === 'it' ? 'FONDAZIONE FALACE • AUTOSAVE' : 'FALACE FOUNDATION • AUTOSAVE'}
              </span>
              <p className="text-[11px] font-sans font-medium text-brand-gold tracking-wide leading-tight">
                {saveNotification.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

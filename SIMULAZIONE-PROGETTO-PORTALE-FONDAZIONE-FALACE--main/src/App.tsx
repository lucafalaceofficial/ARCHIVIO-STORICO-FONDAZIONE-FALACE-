/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Globe, 
  Bot, 
  Activity, 
  Award, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Coins,
  ArrowRight,
  Menu,
  X,
  MessageSquare,
  FileCode,
  User
} from 'lucide-react';

// Import our modular components
import AicSymbols from './components/AicSymbols';
import UserMigration from './components/UserMigration';
import CopyrightDeposit from './components/CopyrightDeposit';
import PortalPresentation from './components/PortalPresentation';
import CoreEthics from './components/CoreEthics';
import AicChatAdvisor from './components/AicChatAdvisor';
import SocialHub, { INITIAL_CREATORS, SECTION_LITERALS, SUBSECTION_LITERALS } from './components/SocialHub';
import PoloMuseale from './components/PoloMuseale';
import DipartimentiAIC from './components/DipartimentiAIC';
import AutoSaveManager from './components/AutoSaveManager';
import UserProfileManager from './components/UserProfileManager';

import { triggerXMLDownload, generateXMLContent } from './utils/xmlExporter';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'museum' | 'departments' | 'migration' | 'crowdfunding' | 'presentation' | 'ethics' | 'advisor' | 'account'>('home');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // XML Fallback copy-paste modal state
  const [isXmlModalOpen, setIsXmlModalOpen] = useState(false);
  const [generatedXmlText, setGeneratedXmlText] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);

  // Real-time tick for UTC/Local clock to showcase synchronization
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('it-IT') + ' UTC' + (now.getTimezoneOffset() >= 0 ? '-' : '+') + Math.abs(now.getTimezoneOffset()/60));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navigateTo = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    // Smooth scroll to top of main view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadEntireSiteXml = () => {
    let finalPosts: any[] = [];
    const savedPosts = localStorage.getItem('aic_social_posts');
    if (savedPosts) {
      try {
        finalPosts = JSON.parse(savedPosts);
      } catch (e) {
        // ignore
      }
    }

    if (finalPosts.length === 0) {
      INITIAL_CREATORS.forEach(creator => {
        creator.posts.forEach(post => {
          finalPosts.push(post);
        });
      });
    }

    const xmlData = {
      portal: {
        name: "HUMANA HUB AIC - Fondazione Falace delle Attività Intellettive Creative",
        description: "Portale telematico di integrazione accademica basato sulla simmetria emisferica e la tutela delle opere e dell'ingegneria d'arte no-profit.",
        founder: "Dott. Luca Falace",
        established: "2005",
        legalStatus: "Fondazione Accademica Classica Non-ETS",
        philosophicalFramework: "Conciliazione sincronica Arte-Scienza ed equilibrio Feng Shui",
        patentCredits: "Tute termodinamiche e brevetto Geniusom registrato nell'archivio CERN-Zenodo"
      },
      sections: SECTION_LITERALS.map(s => ({
        id: s.id,
        title: s.title,
        hemisphere: s.hemisphere,
        desc: s.desc
      })),
      subsections: SUBSECTION_LITERALS.map(sub => ({
        id: sub.id,
        sectionId: sub.sectionId,
        name: sub.name
      })),
      creators: INITIAL_CREATORS.map(c => ({
        id: c.id,
        fullName: c.fullName,
        username: c.username,
        category: c.category,
        followers: c.followers,
        following: c.following,
        activeBio: c.activeBio,
        website: c.website,
        gender: c.gender
      })),
      posts: finalPosts.map(p => {
        const sectionInfo = SECTION_LITERALS.find(sec => sec.id === p.section);
        return {
          id: p.id,
          title: p.title,
          author: p.author,
          section: p.section,
          sectionName: sectionInfo ? sectionInfo.title : p.sectionName || '',
          technique: p.technique || '',
          description: p.description || '',
          likes: p.likes || 0,
          priorityId: p.priorityId,
          timestamp: p.timestamp || '',
          comments: (p.comments || []).map((c: any) => ({
            author: c.author || '',
            text: c.text || '',
            timestamp: c.timestamp || ''
          }))
        };
      })
    };

    const xmlText = generateXMLContent(xmlData);
    setGeneratedXmlText(xmlText);
    setIsXmlModalOpen(true);
    setCopyStatus(false);
    
    try {
      triggerXMLDownload(xmlData);
    } catch (e) {
      console.warn("L'autodownload diretto è stato bloccato dalle regole iframe del browser. È possibile copiare i dati direttamente tramite la finestra modale aperta sul portale.", e);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      
      {/* Light Curved Celestial Header (Feng Shui style: rounded outer bounds, no hard edges) */}
      <header className="w-full max-w-7xl mx-auto px-4 pt-4 z-40">
        <div className="bg-white border border-slate-200 p-4 rounded-[2rem] flex items-center justify-between shadow-xs">
          {/* Logo Brand Signatures */}
          <div 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 cursor-pointer group active:scale-95 transition-transform"
          >
            <div className="relative w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center border border-blue-200/50 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all">
              {/* Chemical sign for Gold (☉ - circle with dot) with alchemy gold texturing */}
              <svg viewBox="0 0 100 100" className="w-6 h-6 text-yellow-600">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#d4af37" strokeWidth="6" />
                <circle cx="50" cy="50" r="10" fill="#d4af37" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-display font-bold text-slate-900 block uppercase tracking-wider">
                HUMANA HUB AIC
              </span>
              <span className="text-[10px] text-yellow-600 font-mono tracking-widest block uppercase font-bold">
                Fondazione Falace
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'home' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Bacheca Social
            </button>
            <button
              onClick={() => navigateTo('museum')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'museum' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Polo Museale
            </button>
            <button
              onClick={() => navigateTo('departments')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'departments' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Dipartimenti (A-H)
            </button>
            <button
              onClick={() => navigateTo('migration')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'migration' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Migrazione Utenti
            </button>
            <button
              onClick={() => navigateTo('crowdfunding')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'crowdfunding' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Tutela d'Autore & Bandi
            </button>
            <button
              onClick={() => navigateTo('presentation')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'presentation' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Presentazione & Statuto
            </button>
            <button
              onClick={() => navigateTo('ethics')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'ethics' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Codice Etico
            </button>
            <button
              onClick={() => navigateTo('account')}
              className={`px-3 py-2 rounded-xl transition-all ${activeTab === 'account' ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Gestione Account
            </button>
          </nav>

          {/* AI Advisor Badge Action & Clock details */}
          <div className="hidden md:flex items-center gap-3">
            <AutoSaveManager />
            <div className="text-right font-mono text-[9px] text-slate-400 leading-none">
              <span>Sincronizzato</span>
              <span className="block text-slate-800 font-bold mt-0.5">{currentTime}</span>
            </div>
            
            <button
              onClick={() => navigateTo('advisor')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              <Bot size={13} />
              Consulenza AI
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="mt-2 p-4 bg-white border border-slate-200 rounded-3xl flex flex-col gap-1 z-50 absolute left-4 right-4 shadow-lg animate-fadeIn">
            <button
              onClick={() => navigateTo('home')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Bacheca Sociale
            </button>
            <button
              onClick={() => navigateTo('museum')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'museum' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Polo Museale dell'Arte & Scienza
            </button>
            <button
              onClick={() => navigateTo('departments')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'departments' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Dipartimenti AIC (A-H)
            </button>
            <button
              onClick={() => navigateTo('migration')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'migration' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Migrazione Utenti (NING)
            </button>
            <button
              onClick={() => navigateTo('crowdfunding')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'crowdfunding' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Tutela d'Autore & Bandi
            </button>
            <button
              onClick={() => navigateTo('presentation')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'presentation' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Presentazione & Statuto
            </button>
            <button
              onClick={() => navigateTo('ethics')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'ethics' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Statuto & Codice Etico
            </button>
            <button
              onClick={() => navigateTo('account')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider ${activeTab === 'account' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
            >
              Gestione Account
            </button>
            <button
              onClick={() => navigateTo('advisor')}
              className={`w-full text-left p-3 rounded-2xl text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 ${activeTab === 'advisor' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}
            >
              <Bot size={14} />
              Consulenza AI Sincrona
            </button>
          </div>
        )}
      </header>

      {/* Main Content Sections Section-by-Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 relative">

        {/* Social Hub view */}
        {activeTab === 'home' && (
          <div className="animate-fadeIn">
            <SocialHub onGoToDeposit={() => navigateTo('crowdfunding')} />
          </div>
        )}

        {/* Polo Museale view */}
        {activeTab === 'museum' && (
          <div className="animate-fadeIn">
            <PoloMuseale />
          </div>
        )}

        {/* Dipartimenti AIC A-H view */}
        {activeTab === 'departments' && (
          <div className="animate-fadeIn">
            <DipartimentiAIC />
          </div>
        )}

        {/* User Migration tab */}
        {activeTab === 'migration' && (
          <div className="animate-fadeIn">
            <UserMigration />
          </div>
        )}

        {/* Donations & Crowdfunding Tracker */}
        {activeTab === 'crowdfunding' && (
          <div className="animate-fadeIn">
            <CopyrightDeposit />
            <div className="mt-8 bg-white border border-slate-200 p-6 rounded-[2.5rem] max-w-4xl mx-auto space-y-4 shadow-xs">
              <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2 font-semibold">
                <Compass className="text-yellow-600" size={18} /> Governance e Trasparenza No-Profit Falace
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                HUMANA HUB AIC gestisce i contributi strumentali della Fase A indirizzandoli al 100% alla tutela legale dei brevetti, all'allestimento virtuale della galleria ed all'assistenza per i bandi agevolati per gli iscritti. Ogni rapporto contrattuale, licenza e tax planning no-profit è supervisionato con rigore dal CLO <strong>Avv. Pier Francesco De Juliis</strong>, a completa tutela degli inventori e degli artisti.
              </p>
            </div>
          </div>
        )}

        {/* Presentazione Portale e Statuto */}
        {activeTab === 'presentation' && (
          <div className="animate-fadeIn">
            <PortalPresentation />
          </div>
        )}

        {/* Core Ethics & code values */}
        {activeTab === 'ethics' && (
          <div className="animate-fadeIn">
            <CoreEthics />
          </div>
        )}

        {/* Advisor: Gemini AI Chat assistant */}
        {activeTab === 'advisor' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
            <div className="text-center">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 text-xs rounded-full font-mono uppercase tracking-widest font-bold inline-block">
                Assistenza telematica interattiva
              </span>
              <h2 className="text-3xl font-display font-medium text-slate-950 tracking-tight mt-3">
                Scrivania del Consulente AI
              </h2>
              <p className="text-slate-600 mt-2 text-sm max-w-xl mx-auto font-sans">
                Parla con l'assistente curatore della Fondazione Falace e del portale HUMANA HUB AIC per conoscere la doppia missione di tutela intellettuale o per l'accesso a bandi pubblici europei.
              </p>
            </div>
            
            <AicChatAdvisor />
          </div>
        )}

        {/* Account management and profiles dashboard */}
        {activeTab === 'account' && (
          <div className="animate-fadeIn max-w-4xl mx-auto">
            <UserProfileManager />
          </div>
        )}

      </main>

      {/* Footer (Feng Shui rounded border accents, clear human label credentials, light bright theme) */}
      <footer className="w-full max-w-7xl mx-auto px-4 pb-6 mt-12 z-10" id="portal-global-footer">
        <div className="p-6 bg-white border border-slate-200 rounded-[2rem] text-center space-y-4 shadow-xs">
          <p className="text-xs text-slate-500 leading-normal font-mono">
            © 2005 - 2026 <strong>FONDAZIONE FALACE DELLE ATTIVITÀ INTELLETTIVE CREATIVE</strong>. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10px] font-mono text-slate-400 uppercase font-bold">
            <span>HUMANA HUB AIC 2026</span>
            <span>•</span>
            <span>Patrimonio 41+ Libri ISBN</span>
            <span>•</span>
            <span>Archivio CERN-Zenodo</span>
            <span>•</span>
            <span>Classic Non-ETS Foundation</span>
            <span>•</span>
            <span className="text-yellow-600 font-semibold">Simmetria Feng Shui</span>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex justify-center">
            <button
              onClick={handleDownloadEntireSiteXml}
              className="px-6 py-2.5 bg-blue-600 border border-blue-700 text-white rounded-full text-[10px] font-mono font-bold flex items-center gap-2 hover:bg-blue-700 transition-all cursor-pointer shadow-sm active:scale-95"
              id="download-entire-site-button"
              title="Scarica e visualizza l'intero database relazionale del sito in formato XML conforme agli standard di preservazione digitale"
            >
              <FileCode size={13} className="text-white" />
              <span>SCARICA INTERO PORTALE (DATABASE XML)</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Elegant Fallback XML Copy Modal */}
      {isXmlModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                  Preservazione Digitale Conforme
                </span>
                <h3 className="text-lg font-bold text-slate-950 font-display">
                  Database Relazionale del Portale (XML)
                </h3>
              </div>
              <button 
                onClick={() => setIsXmlModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              I file XML generati contengono la struttura accademica completa, i profili d'ingegno sincronizzati e la bacheca post della Fondazione. 
              <span className="block mt-1 font-bold text-blue-700">
                Nota: Se lo scaricamento automatico del file è bloccato dalle impostazioni dell'iframe, puoi fare click su &quot;Copia&quot; qui sotto per salvare il database nei tuoi appunti.
              </span>
            </p>

            <div className="flex-1 min-h-0 relative">
              <pre className="h-full max-h-[40vh] overflow-auto bg-slate-50 border border-slate-200 rounded-xl p-4 text-[10px] sm:text-xs font-mono text-slate-800 select-all leading-normal">
                {generatedXmlText}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedXmlText);
                  setCopyStatus(true);
                  setTimeout(() => setCopyStatus(false), 2000);
                }}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs ${
                  copyStatus 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <span>{copyStatus ? '✓ COPIATO CON SUCCESSO!' : '🗎 COPIA NEGLI APPUNTI'}</span>
              </button>

              <button
                onClick={() => setIsXmlModalOpen(false)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-bold rounded-full text-xs transition-all cursor-pointer"
              >
                CHIUDI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

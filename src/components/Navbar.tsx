import React, { useState, useEffect } from 'react';
import { FOUNDATION_METADATA } from '../data/archiveData.js';
import { 
  Menu, 
  X, 
  BookOpen, 
  Cpu, 
  Palette, 
  Tv, 
  Radio, 
  Sparkles, 
  PhoneCall, 
  Layers, 
  ShieldCheck, 
  ChevronRight,
  Cloud,
  LogOut,
  User
} from 'lucide-react';

type MainTab = 'institution' | 'departments' | 'patents' | 'catalog' | 'heritage' | 'music_lab' | 'documentaries' | 'library' | 'cern_zenodo' | 'archivio_aic';

interface NavbarProps {
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  onOpenAiChat?: () => void;
  currentUser: any;
  onOpenAuth: () => void;
  onLogout: () => void;
}

const workspaceTabs = [
  { id: 'institution' as const, label: 'Istituzionale & Sede' },
  { id: 'departments' as const, label: 'I 6 Dipartimenti' },
  { id: 'patents' as const, label: 'La Teoria & Invenzioni' },
  { id: 'catalog' as const, label: 'Catalogo SBN & Opere' },
  { id: 'cern_zenodo' as const, label: 'Depositi CERN Zenodo' },
  { id: 'archivio_aic' as const, label: 'ARCHIVIO PRECEDENTE FONDAZIONE AIC' },
  { id: 'heritage' as const, label: 'Archivio di Famiglia' },
  { id: 'music_lab' as const, label: 'Sintonia Hertziana' },
  { id: 'library' as const, label: 'Biblioteca Digitale' },
  { id: 'documentaries' as const, label: 'Archivio Documentari' },
];

export default function Navbar({ activeTab, setActiveTab, onOpenAiChat, currentUser, onOpenAuth, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'fondazione-falace-section', label: 'Fondazione', icon: Sparkles, tab: 'institution' as const },
    { id: 'departments-section', label: '6 Dipartimenti', icon: ShieldCheck, tab: 'departments' as const },
    { id: 'theory-section', label: 'Teoria S=φ(f)', icon: Sparkles, tab: 'patents' as const },
    { id: 'cern-zenodo-registry', label: 'Depositi CERN', icon: BookOpen, tab: 'cern_zenodo' as const },
    { id: 'books', label: 'Libri SBN', icon: BookOpen, tab: 'catalog' as const },
    { id: 'inventions-section', label: 'Brevetti UIBM', icon: Cpu, tab: 'patents' as const },
    { id: 'works-section', label: 'Opere d’Arte', icon: Palette, tab: 'catalog' as const },
    { id: 'biblioteca-digitale-section', label: 'Biblioteca Digitale', icon: BookOpen, tab: 'library' as const },
    { id: 'documentaries-archive-section', label: 'Archivio Documentari', icon: Tv, tab: 'documentaries' as const },
    { id: 'hertzian-synthesizer', label: 'Laboratorio 432Hz', icon: Radio, tab: 'music_lab' as const },
    { id: 'researcher-chat', label: 'Chiedi all’AI', icon: Sparkles, tab: 'institution' as const },
  ];

  const handleScrollTo = (id: string, tabName: MainTab) => {
    setIsOpen(false);
    
    if (id === 'researcher-chat' && onOpenAiChat) {
      onOpenAiChat();
      return;
    }
    
    // 1. Switch active main tab
    setActiveTab(tabName);
    
    // 2. Wait for tab rendering to complete, then perform smooth scroll
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 180; // adjusted for dual-row sticky navbar
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

  const handleWorkspaceTabClick = (tabId: MainTab) => {
    setActiveTab(tabId);
    
    // Smooth scroll to the main workspace layout start so the user isn't lost
    setTimeout(() => {
      const mainLayoutElement = document.getElementById('main-workspace-layout');
      if (mainLayoutElement) {
        const offset = 180; // account for dual-row sticky header height
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = mainLayoutElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="sticky top-0 z-50 w-full flex flex-col font-sans bg-white border-b border-slate-200 shadow-sm">
      
      {/* Main Bar */}
      <nav className={`transition-all duration-300 w-full ${
        scrolled 
          ? 'bg-white/95 py-1 hover:bg-white' 
          : 'bg-white py-2.5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Brand Emblem & Logo */}
          <div 
            onClick={() => handleScrollTo('fondazione-falace-section', 'institution')}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 bg-[#0066CC] flex items-center justify-center font-serif text-white text-sm relative">
              FF
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[12px] sm:text-sm font-serif font-bold tracking-[0.1em] block uppercase leading-none">
                <span className="text-black">FONDAZIONE </span>
                <span className="text-[#0066CC]">FALACE</span>
              </span>
              <span className="text-[8.5px] font-bold text-[#0066CC] tracking-[0.08em] uppercase block mt-1 leading-none">
                PATRIMONIO ATTIVITÀ INTELLETTIVE CREATIVE
              </span>
              <span className="text-[8.5px] text-black tracking-[0.06em] font-medium uppercase block mt-1 leading-none">
                PROGETTO FONDAZIONE FALACE
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden xl:flex items-center gap-1.5 font-sans">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isTabActive = activeTab === item.tab;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id, item.tab)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[10px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    isTabActive 
                      ? 'text-[#0066CC]' 
                      : 'text-black hover:text-[#0066CC]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Institutional Contact & Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`mailto:${FOUNDATION_METADATA.email}`}
              className="inline-flex items-center gap-2 bg-[#0066CC] hover:bg-black text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2 transition-all duration-200 active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contatto SBN</span>
            </a>

            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[9.5px] font-mono uppercase tracking-wider px-3.5 py-2">
                  <Cloud className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span className="truncate max-w-[120px]" title={currentUser.email}>
                    {currentUser.email}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-black text-white text-[9.5px] font-mono uppercase tracking-wider px-3.5 py-2 transition-colors cursor-pointer"
                  title="Disconnetti account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center gap-2 bg-[#00468C] hover:bg-black text-white text-[10px] font-mono uppercase tracking-widest px-4 py-2 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Cloud Sync / Accedi</span>
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-black hover:text-[#0066CC] cursor-pointer transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white p-6 flex flex-col gap-2 animate-fade-in relative z-50 border-b border-slate-200 shadow-lg">
            <div className="text-[9px] font-mono text-black font-bold uppercase tracking-widest pb-2 mb-3">
              Archivi &amp; Registri del Patrimonio
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isTabActive = activeTab === item.tab;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id, item.tab)}
                  className={`flex items-center gap-3 w-full text-left p-3 text-[10.5px] font-mono font-bold tracking-wider uppercase transition-all ${
                    isTabActive 
                      ? 'text-[#0066CC] border-b-2 border-[#0066CC]' 
                      : 'bg-white text-black hover:text-[#0066CC]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#0066CC]" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Mobile Auth options */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2">
              <div className="text-[9px] font-mono text-black font-bold uppercase tracking-widest pb-2">
                Sincronizzazione Cloud
              </div>
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[10.5px] font-mono text-emerald-800 p-3 bg-emerald-50">
                    <Cloud className="w-4 h-4 text-emerald-600 animate-pulse animate-duration-1000" />
                    <span>Attivo: {currentUser.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onLogout();
                    }}
                    className="flex items-center justify-center gap-2 w-full p-3 bg-red-600 hover:bg-black text-white text-[10.5px] font-mono font-bold uppercase tracking-widest cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Disconnetti</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAuth();
                  }}
                  className="flex items-center justify-center gap-2 w-full p-3 bg-[#00468C] hover:bg-black text-white text-[10.5px] font-mono font-bold uppercase tracking-widest cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Configura Cloud Sync</span>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Second Row: Main Workspace Tabs (Cohesive Architrave Panel) */}
      <div className="border-t border-slate-100 bg-slate-50 w-full relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          
          {/* Scrollable layout area */}
          <div className="overflow-x-auto flex flex-1 scrollbar-none text-[10.5px] font-mono uppercase tracking-[0.05em] relative scroll-smooth" id="navbar-tabs-scroller">
            {workspaceTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleWorkspaceTabClick(tab.id)}
                  className={`py-3.5 px-5 shrink-0 transition-all cursor-pointer font-bold border-b-2 text-center select-none ${
                    isSelected
                      ? 'border-[#0066CC] text-[#0066CC] bg-white'
                      : 'border-transparent text-slate-700 hover:text-[#0066CC] hover:bg-white/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Elegant classical indicators to clearly show horizontal scroll is possible to the right */}
          <button 
            type="button"
            onClick={() => {
              const scroller = document.getElementById('navbar-tabs-scroller');
              if (scroller) {
                const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
                // If we are at or near the end of scroll, loop back to start, else scroll right
                if (scroller.scrollLeft >= maxScrollLeft - 10) {
                  scroller.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                  scroller.scrollBy({ left: 200, behavior: 'smooth' });
                }
              }
            }}
            className="sticky right-0 top-0 bottom-0 flex items-center gap-1 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent pl-8 pr-4 py-3 shrink-0 border-l border-slate-100 shadow-[-10px_0_15px_-3px_rgba(248,250,252,0.8)] cursor-pointer text-slate-700 hover:text-[#0066CC] transition-colors focus:outline-none select-none group"
            aria-label="Scorri le sezioni a destra"
            title="Scorri le sezioni a destra"
          >
            <span className="text-[8px] font-mono text-[#0066CC]/80 group-hover:text-[#0066CC] font-black tracking-widest uppercase hidden xs:inline transition-colors">
              ALTRE SEZIONI
            </span>
            <ChevronRight className="w-4 h-4 text-[#0066CC] animate-pulse shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>
      </div>

    </div>
  );
}

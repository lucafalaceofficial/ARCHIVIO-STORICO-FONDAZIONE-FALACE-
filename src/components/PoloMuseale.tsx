/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Layers, 
  Image, 
  Cpu, 
  BookOpen, 
  Music, 
  Video, 
  Heart, 
  Plus, 
  Search, 
  ShieldCheck, 
  Download, 
  X, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { ArtworkDeposit } from '../types';

// Precise Subcategories mapped out from the official document
export const SUB_SECTIONS = [
  { id: 'A1', title: 'A1) Disegno e Pittura manuali (olio, acquerello, tempera...)', parent: 'A' },
  { id: 'A2', title: 'A2) Pittura Multimediale (tecniche manuali e digitali)', parent: 'A' },
  { id: 'A3', title: 'A3) Fotografia manuale e digitale', parent: 'A' },
  
  { id: 'B1', title: 'B1) Scultura e tecniche incisorie manuali', parent: 'B' },
  { id: 'B2', title: 'B2) Scultura Multimediale e installazioni contemporanee', parent: 'B' },
  
  { id: 'C1', title: 'C1) Design di oggetti di uso comune (reale/virtuale)', parent: 'C' },
  { id: 'C2', title: 'C2) Design architettonico di città e strutture (reale/virtuale)', parent: 'C' },
  { id: 'C3', title: 'C3) Design dei mezzi di trasporto (reale/virtuale)', parent: 'C' },
  
  { id: 'D1', title: 'D1) Letteratura: Romanzi, saggistica, racconti, poesie...', parent: 'D' },
  { id: 'D2', title: 'D2) Pubblicazione e lettura libri interi di esordienti/affemati', parent: 'D' },
  
  { id: 'E1', title: 'E1) Testi di commedie teatrali e cinematografiche', parent: 'E' },
  { id: 'E2', title: 'E2) Visione di video clip e corti cinematografici', parent: 'E' },
  { id: 'E3', title: 'E3) Danza e coreografie', parent: 'E' },
  
  { id: 'F1', title: 'F1) Testi di canzoni, melodie, sinfonie e opere liriche', parent: 'F' },
  { id: 'F2', title: 'F2) Ascolto di brani musicali e video musicali', parent: 'F' },
  
  { id: 'G1', title: 'G1) Invenzioni artistiche e scientifiche', parent: 'G' },
  { id: 'G2', title: 'G2) Scoperte scientifiche e brevetti', parent: 'G' },
  { id: 'G3', title: 'G3) Invenzioni su fonti di energia alternativa (solare, eolica...)', parent: 'G' },
  
  { id: 'H1', title: 'H1) Benessere: Tecniche e Discipline Filosofiche', parent: 'H' },
  { id: 'H2', title: 'H2) Benessere: Innovazioni Materiali (Macchinari e idee tecniche)', parent: 'H' },
  { id: 'H3', title: 'H3) Benessere: Innovazioni Mentali (Musicoterapia, Cromoterapia...)', parent: 'H' }
];

export const MACRO_SECTIONS = [
  { id: 'ALL', title: "Tutte le Sezioni", icon: Layers, desc: "Panoramica globale dell'unione di Arte & Scienza" },
  { id: 'A', title: "A) Arte Bidimensionale", icon: Image, desc: "Pittura, disegno e grafiche" },
  { id: 'B', title: "B) Arte Tridimensionale", icon: Layers, desc: "Scultura, istallazioni e plasticità Feng Shui" },
  { id: 'C', title: "C) Design & Architettura", icon: Layers, desc: "Bioarchitettura, design industriale d'oggetti e trasporti" },
  { id: 'D', title: "D) Biblioteca Virtuale", icon: BookOpen, desc: "Opere letterarie, libri e cataloghi in PDF scaricabili" },
  { id: 'E', title: "E) Regia, Spettacolo e Danza", icon: Video, desc: "Testi teatrali, video-danza e cortometraggi" },
  { id: 'F', title: "F) Musica e Composizione", icon: Music, desc: "Componimenti, testi melodici, sinfonie e video-clip musicali" },
  { id: 'G', title: "G) Invenzioni e Brevetti", icon: Cpu, desc: "Scoperte d'ingegno, energie rinnovabili, tute termodinamiche" },
  { id: 'H', title: "H) Benessere e Filosofia", icon: Heart, desc: "Discipline olistiche, musicoterapia e integrazione spirituale" }
];

const INITIAL_ARTWORKS: ArtworkDeposit[] = [
  {
    id: 'art-1',
    title: "L'Origine Celeste (Opera N° 1)",
    author: "Dott. Luca Falace",
    email: "dr.lucafalace@gmail.com",
    section: "A1",
    floor: 3,
    technique: "Olio manuale circolare con foglia d'oro",
    support: "Tela montata su supporto tondo privo di angoli",
    dimensions: "120cm x 120cm",
    description: "Esposizione del quadro emblematico della Fondazione, teso a diffondere serenità e accordo armonico. Totalmente privo di angoli acuti, favorisce il libero fluire dell'energia Ch'i in ossequio al Feng Shui.",
    priorityId: "AIC-PRI-200508",
    isPaid: true,
    rentalPeriodMonths: 24,
    timestamp: "14/11/2005"
  },
  {
    id: 'art-2',
    title: "Eco-Thermodynamic Suit (Brevetto Originale)",
    author: "Luca Falace Team",
    email: "brevetti@humanaaic.it",
    section: "G3",
    floor: 3,
    technique: "Formula termodinamica complessa e rendering CAD virtuale",
    support: "Dispositivo/Tuta autorigenerante a cattura piezoelettrica",
    dimensions: "Progetto CAD virtuale - Scala 1:1",
    description: "Invenzione brevettata di abbigliamento protettivo intelligente che accumula l'energia termica rilasciata dal movimento respiratorio biologico restituendo calore e alimentando fino a 15W/h di microcarichi.",
    priorityId: "AIC-PRI-202209",
    isPaid: true,
    rentalPeriodMonths: 36,
    timestamp: "04/09/2022"
  },
  {
    id: 'art-3',
    title: "Brain Symmetrical Building (Modello Ovoidale)",
    author: "Studio LucArt Architects",
    email: "architecture@lucartstudio.org",
    section: "C2",
    floor: 3,
    technique: "Bioarchitettura e design sferico integrato",
    support: "Rendering in Plastico virtuale e pianta interattiva",
    dimensions: "100m diametro virtuale",
    description: "Il disegno architettonico del Polo Museale dell'Arte e della Scienza: un complesso ovoidale simmetrico studiato per risonare con l'equilibrio dei due emisferi cerebrali del fruitore.",
    priorityId: "AIC-PRI-200705",
    isPaid: true,
    rentalPeriodMonths: 12,
    timestamp: "18/05/2007"
  },
  {
    id: 'art-4',
    title: "Soffio di Sole a 432 Hertz (Traccia 1)",
    author: "Sofia Luce (Danzatrice e Musicoterapeuta)",
    email: "sofia.wellness@gmail.com",
    section: "H3",
    floor: 1,
    technique: "Pianoforte ed arpa accordati a frequenze biologiche Auree",
    support: "File audio FLAC con spettrogramma cromoterapeutico smeraldo",
    dimensions: "Durata 12 min",
    description: "Brano per flussi rilassanti sintonizzato sulla musicoterapia olistica. Studiato espressamente per allievi e docenti delle accademie per stimolare l'ispirazione priva di schema punitivo.",
    priorityId: "AIC-PRI-202611",
    isPaid: true,
    rentalPeriodMonths: 6,
    timestamp: "11/06/2026"
  }
];

export default function PoloMuseale() {
  const [artworks, setArtworks] = useState<ArtworkDeposit[]>(INITIAL_ARTWORKS);
  const [activeFloor, setActiveFloor] = useState<1 | 3>(3);
  const [selectedMacroSection, setSelectedMacroSection] = useState<string>('ALL');
  const [selectedSubSection, setSelectedSubSection] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals state
  const [selectedArt, setSelectedArt] = useState<ArtworkDeposit | null>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  
  // Submission Form State
  const [form, setForm] = useState({
    title: '',
    author: '',
    email: '',
    macroSection: 'A',
    subSection: 'A1',
    floor: '1' as '1' | '3',
    technique: '',
    support: '',
    dimensions: '',
    description: '',
    rentalMonths: 12
  });

  // Handle category changing to auto-align subsections
  const handleMacroSectionChange = (macroId: string) => {
    const firstSub = SUB_SECTIONS.find(sub => sub.parent === macroId)?.id || `${macroId}1`;
    setForm(prev => ({
      ...prev,
      macroSection: macroId,
      subSection: firstSub
    }));
  };

  // Submit artwork to localized client state
  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.email || !form.description) return;

    const code = `AIC-PRI-${Math.floor(100000 + Math.random() * 900000)}`;
    const newArt: ArtworkDeposit = {
      id: `art-${Date.now()}`,
      title: form.title,
      author: form.author,
      email: form.email,
      section: form.subSection,
      floor: Number(form.floor) as 1 | 3,
      technique: form.technique || "Ingegno Multitecnico Digitale",
      support: form.support || "Supporto Virtuale / Portale",
      dimensions: form.dimensions || "Versione digitale",
      description: form.description,
      priorityId: code,
      isPaid: true,
      rentalPeriodMonths: form.rentalMonths,
      timestamp: new Date().toLocaleDateString('it-IT')
    };

    setArtworks([newArt, ...artworks]);
    setSubmitSuccess(`Complimenti Maestro! L'opera "${form.title}" è stata depositata con data certa nel Polo Museale contemporaneo. Codice Priorità Generato: ${code}`);

    // Reset Form
    setForm({
      title: '',
      author: '',
      email: '',
      macroSection: 'A',
      subSection: 'A1',
      floor: '1',
      technique: '',
      support: '',
      dimensions: '',
      description: '',
      rentalMonths: 12
    });

    // Close screen after delay
    setTimeout(() => {
      setShowSubmitModal(false);
      setSubmitSuccess(null);
    }, 4000);
  };

  // Filter masterpieces
  const filteredMasterpieces = artworks.filter(art => {
    const matchesFloor = art.floor === activeFloor;
    
    // Check section hierarchy matches
    let matchesSection = true;
    if (selectedMacroSection !== 'ALL') {
      if (selectedSubSection === 'ALL') {
        // Must start with selected letter (A, B, C...)
        matchesSection = art.section.startsWith(selectedMacroSection);
      } else {
        // Must match exact code (A1, H3...)
        matchesSection = art.section === selectedSubSection;
      }
    }

    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.technique.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFloor && matchesSection && matchesSearch;
  });

  const activeMacroObj = MACRO_SECTIONS.find(m => m.id === selectedMacroSection);
  const relevantSubsections = SUB_SECTIONS.filter(s => s.parent === selectedMacroSection);

  return (
    <div className="space-y-8 animate-fadeIn" id="polo-museale-root-view">
      
      {/* Radiant celestial header */}
      <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-xs text-center space-y-3" id="museum-brand-intro">
        <span className="px-3.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-xs rounded-full font-mono uppercase tracking-wider font-bold inline-block">
          La Sede Operativa e il Polo Museale dell'Avanguardia
        </span>
        <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
          Il Polo Museale dell’Arte e della Scienza
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed font-sans">
          Organizziamo, tuteliamo e valorizziamo le creazioni collettive dei nostri iscritti fondendole in un unico, splendido mosaico. Le opere materiali ed immateriali sono esposte a seconda dei requisiti degli inventori, divise per piani di accesso ed esposte per sempre.
        </p>
      </div>

      {/* Structured Floor Sizing Selector: 1st Floor vs 3rd Floor */}
      <div className="bg-white border border-slate-200 p-3 rounded-full shadow-xs max-w-xl mx-auto flex gap-2" id="museo-floor-plan-switcher">
        <button
          onClick={() => { setActiveFloor(1); }}
          className={`flex-1 py-3 px-5 text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeFloor === 1
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers size={14} />
          Primo Piano: Aula Studenti & Esordienti
        </button>
        <button
          onClick={() => { setActiveFloor(3); }}
          className={`flex-1 py-3 px-5 text-xs font-bold rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeFloor === 3
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Layers size={14} />
          Terzo Piano: Maestri & Professionisti
        </button>
      </div>

      {/* Multi-Section Filter System */}
      <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4" id="sezione-filtro-box">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest leading-none">Classificazione Cataloghi</h3>
            <span className="text-sm font-display font-medium text-slate-900 block mt-1 font-bold">Filtra per Categoria Culturale A-H</span>
          </div>
          
          {/* Action trigger button */}
          <button
            onClick={() => {
              setForm(prev => ({ ...prev, floor: String(activeFloor) as '1' | '3' }));
              setShowSubmitModal(true);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-transform"
          >
            <Plus size={14} />
            Affitta Spazio & Tutela Opera
          </button>
        </div>

        {/* Macro Categories pills */}
        <div className="flex flex-wrap gap-2" id="macro-filter-pills">
          {MACRO_SECTIONS.map((m) => {
            const Icon = m.icon;
            const isSelected = selectedMacroSection === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMacroSection(m.id);
                  setSelectedSubSection('ALL'); // Reset sub-level filter
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 text-blue-600 border-blue-200 font-bold'
                    : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50'
                }`}
              >
                <Icon size={12} className={isSelected ? 'text-blue-600' : 'text-amber-500'} />
                <span>{m.id === 'ALL' ? 'Tutte (A-H)' : m.title.split(')')[0] + ')'}</span>
              </button>
            );
          })}
        </div>

        {/* Subcategories selector (renders if a specific macro category is active) */}
        {selectedMacroSection !== 'ALL' && relevantSubsections.length > 0 && (
          <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100 animate-fadeIn" id="sub-filter-selector">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">Sotto-Sezioni Specifiche dell'Ingegno:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSubSection('ALL')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                  selectedSubSection === 'ALL'
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Tutte le sotto-sezioni
              </button>
              {relevantSubsections.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedSubSection(sub.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] transition-all border ${
                    selectedSubSection === sub.id
                      ? 'bg-blue-600 text-white font-bold border-blue-400'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 font-medium'
                  }`}
                >
                  {sub.title}
                </button>
              ))}
            </div>
            
            {activeMacroObj && (
              <p className="text-[10px] italic text-slate-500 mt-1 font-sans">
                {activeMacroObj.desc}
              </p>
            )}
          </div>
        )}

        {/* Direct Text Search Bar */}
        <div className="relative pt-2">
          <Search className="absolute left-3 top-5 text-slate-400" size={14} />
          <input
            type="text"
            placeholder="Ricerca manuale nei cataloghi dell'Arte & Scienza per tag, autore o titolo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>
      </div>

      {/* Masterpieces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="museo-grid-gallery">
        {filteredMasterpieces.length === 0 ? (
          <div className="col-span-full border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400 space-y-2">
            <Layers size={36} className="mx-auto text-slate-300" />
            <h4 className="font-display font-semibold text-slate-800 text-sm">Nessun'opera esposta con questi criteri</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto font-sans">
              Non sono ancora presenti opere caricate al Piano {activeFloor} per questa sezione. Sii il primo a esibire la tua opera per data certa spingendo il pulsante in alto!
            </p>
          </div>
        ) : (
          filteredMasterpieces.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArt(art)}
              className="bg-white border border-slate-200 p-5 rounded-3xl flex flex-col justify-between hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group"
              id={`artwork-exhibit-${art.id}`}
            >
              <div className="space-y-3">
                {/* Badge layout */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-mono font-bold rounded-lg uppercase">
                    Sezione {art.section}
                  </span>
                  
                  <span className="flex items-center gap-1 text-[9px] text-green-700 font-mono font-bold bg-green-50 px-2 py-0.5 rounded-lg border border-green-105">
                    <ShieldCheck size={11} />
                    Data Certa
                  </span>
                </div>

                <h3 className="text-sm font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 block leading-tight">
                  {art.title}
                </h3>
                
                <span className="text-[11px] text-amber-700 font-mono bg-amber-50/50 px-2 py-0.5 rounded block w-max font-bold leading-none">
                  Maestro: {art.author}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                  {art.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>PRIORITÀ: {art.priorityId}</span>
                <span className="text-blue-600 font-semibold group-hover:translate-x-1.5 transition-transform flex items-center gap-1 text-xs">
                  Vedi Saggio <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Rules and Legal Guidance block */}
      <div className="bg-amber-50 border border-amber-250 p-6 rounded-[2rem] flex flex-col sm:flex-row gap-4 items-start" id="museo-ethical-regulation">
        <Info className="text-amber-600 flex-shrink-0 mt-0.5" size={20} />
        <div className="space-y-1.5 text-xs text-amber-900">
          <h4 className="font-display font-bold uppercase tracking-wider text-slate-900">Nota di Priorità e Conformità Legale</h4>
          <p className="leading-relaxed font-sans">
            La Fondazione Falace non assume compiti di giudizio o profitto sull'opera caricata, né alcuna responsabilità di perdita o simili. Si ricorda agli inventori che le opere non pubblicate o non depositate sono maggiormente esposte alla volgarizzazione e plagio. Il deposito temporale unito a contribuzione della password garantisce una <strong>prova dell'esistenza dell'opera con data certa</strong> nel nostro polo d'archivio protetta dal Diritto d'Autore. Allestiamo spazi per arte virtuale, modelli architettonici 3D, tute tecnologiche, opere e-book e musicoterapia.
          </p>
        </div>
      </div>

      {/* Masterpiece visualizer modal detail */}
      {selectedArt && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn" id="masterpiece-detail-modal">
          <div className="bg-white border border-slate-205 rounded-[2.5rem] p-6 sm:p-8 max-w-2xl w-full space-y-6 relative max-h-[85vh] overflow-y-auto no-scrollbar">
            
            {/* Close trigger button */}
            <button
              onClick={() => setSelectedArt(null)}
              className="absolute right-6 top-6 p-1.5 text-slate-400 hover:text-slate-800 bg-slate-100 border border-slate-200 rounded-full cursor-pointer transition-transform duration-200 active:scale-95"
            >
              <X size={18} />
            </button>

            <div>
              <span className="px-3.5 py-1 bg-amber-50 text-amber-600 border border-amber-150 text-[10px] rounded-full font-mono uppercase tracking-widest font-bold inline-block">
                Allestimento Piano {selectedArt.floor} • Sezione {selectedArt.section}
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-900 mt-2 tracking-tight">
                {selectedArt.title}
              </h3>
              <p className="text-xs text-blue-650 font-mono font-bold mt-1">
                Autore / Inventore Registrato: {selectedArt.author} ({selectedArt.email})
              </p>
            </div>

            {/* Structured details table */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-mono text-slate-705">
              <div>
                <span className="text-slate-400 block mb-0.5">Tecnica espressiva:</span>
                <span className="text-slate-900 font-bold">{selectedArt.technique}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Supporto d'esistenza:</span>
                <span className="text-slate-900 font-bold">{selectedArt.support}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Misure / Peso:</span>
                <span className="text-slate-900 font-bold">{selectedArt.dimensions}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Validità data certa:</span>
                <span className="text-slate-900 font-bold">{selectedArt.rentalPeriodMonths} Mesi</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Descrizione intellettiva dell'opera:</span>
              <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-sans">
                {selectedArt.description}
              </p>
            </div>

            {/* Stamp certification decoration card */}
            <div className="p-4 bg-green-50 text-green-800 border border-green-150 rounded-2xl space-y-2">
              <div className="flex items-center gap-1.5 font-bold font-mono text-xs uppercase text-green-700">
                <ShieldCheck size={16} />
                <span>Certificato di Deposito n° {selectedArt.priorityId}</span>
              </div>
              <ul className="text-[10px] font-mono leading-relaxed text-green-700 space-y-0.5">
                <li>• Data di registrazione: <span className="font-bold">{selectedArt.timestamp}</span></li>
                <li>• Certificazione: <span className="font-bold">Emanata da HUMANA HUB AIC</span></li>
                <li>• Diritto di Priorità: <span className="font-bold text-green-800">Verificato dall'Ufficio Legale</span></li>
                <li>• Archivazione: <span className="font-bold text-green-800">CERN-Zenodo Sincronizzata</span></li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Download size={14} />
                Stampa Certificazione
              </button>
              <button
                onClick={() => setSelectedArt(null)}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit master work modal form */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn font-sans" id="artwork-exhibit-modal-form">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-8 max-w-2xl w-full space-y-5 relative max-h-[90vh] overflow-y-auto no-scrollbar">
            
            {/* Close button modal form */}
            <button
              onClick={() => setShowSubmitModal(false)}
              className="absolute right-6 top-6 p-1.5 text-slate-400 hover:text-slate-800 bg-slate-100 border border-slate-200 rounded-full cursor-pointer duration-200 active:scale-95"
            >
              <X size={18} />
            </button>

            <div>
              <h3 className="text-xl font-display font-bold text-slate-900">
                Sottoponi Opera Inedita per il Deposito a Data Certa
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Compila i campi seguenti relativi alle tue tesi, opere letterarie, pittura circolare, sculture o brevetti per allestire il tuo spazio nel museo.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-4 bg-green-50 text-green-800 border border-green-150 rounded-2xl space-y-3 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold font-mono text-xs uppercase text-green-700">
                  <ShieldCheck size={16} />
                  <span>Sottomissione Eseguita</span>
                </div>
                <p className="text-xs">{submitSuccess}</p>
                <p className="text-[10px] text-slate-500 tracking-tight leading-none">Questa schermata si chiuderà fra breve...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmission} className="space-y-4 text-xs" id="museum-exhibition-form">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Titolo del Capolavoro</label>
                    <input
                      type="text"
                      required
                      placeholder="Es. Le Coincidenze Parallele"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Nome Autore o Inventore</label>
                    <input
                      type="text"
                      required
                      placeholder="Es. Elena Rosati"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Mail per ricevimento Certificato</label>
                    <input
                      type="email"
                      required
                      placeholder="elena@esempio.it"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Seleziona Piano Espositivo</label>
                    <select
                      value={form.floor}
                      onChange={(e) => setForm({ ...form, floor: e.target.value as '1' | '3' })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                    >
                      <option value="1">Primo Piano (Studenti, Accadici, Esordienti)</option>
                      <option value="3">Terzo Piano (Professionisti, con tesi ed esposizione anni)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Macro-Sezione (Selettore)</label>
                    <select
                      value={form.macroSection}
                      onChange={(e) => handleMacroSectionChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                    >
                      {MACRO_SECTIONS.filter(m => m.id !== 'ALL').map(m => (
                        <option key={m.id} value={m.id}>{m.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Codice tipologico</label>
                    <select
                      value={form.subSection}
                      onChange={(e) => setForm({ ...form, subSection: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                    >
                      {SUB_SECTIONS.filter(s => s.parent === form.macroSection).map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tempo Deposito</label>
                    <select
                      value={form.rentalMonths}
                      onChange={(e) => setForm({ ...form, rentalMonths: Number(e.target.value) })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                    >
                      <option value="12">Affitto Spazio 12 Mesi</option>
                      <option value="24">Affitto Spazio 24 Mesi</option>
                      <option value="36">Affitto Spazio 36 Mesi</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tecnica descritta</label>
                    <input
                      type="text"
                      required
                      placeholder="Es. Olio circolare, pittura multimediale, dente di sega..."
                      value={form.technique}
                      onChange={(e) => setForm({ ...form, technique: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Misure or Supporto</label>
                    <input
                      type="text"
                      placeholder="Es. Tela 100x100cm, PDF digitale, modello virtuale"
                      value={form.support}
                      onChange={(e) => setForm({ ...form, support: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Descrizione delle Tesi o Simbologia Olfattiva/Armonica</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Approfondisci qui i dettagli delle scoperte, dell'energia, dei sogni, etc..."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-850 placeholder-slate-450 focus:outline-none focus:border-blue-500 leading-relaxed font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-transform cursor-pointer active:scale-95"
                >
                  <ShieldCheck size={14} />
                  Genera Certificato & Pubblica l'Opera
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  Book, 
  Heart, 
  AlertTriangle, 
  Library, 
  ExternalLink,
  Search,
  BookOpen,
  GraduationCap,
  Sparkles,
  Layers,
  FileText,
  BadgeAlert,
  Award,
  Globe,
  Plus
} from 'lucide-react';

const PRINCIPLES = [
  { id: 1, title: 'Rispetto della Natura', text: 'L\'amore ed il rispetto verso la natura e tutti gli esseri viventi.' },
  { id: 2, title: 'Libertà e Fratellanza', text: 'La libertà, il rispetto e la fratellanza tra gli uomini e le rispettive tradizioni popolari.' },
  { id: 3, title: 'Ricerca della Conoscenza', text: 'La ricerca della conoscenza attraverso il continuo studio.' },
  { id: 4, title: 'Pensiero Creativo', text: 'Il pensiero creativo intellettuale in tutte le sue infinite forme e tradizioni culturali.' },
  { id: 5, title: 'Evoluzione Benevola', text: 'La valorizzazione del pensiero creativo a scopo benefico per l\'evoluzione ed il benessere dell\'uomo.' },
  { id: 6, title: 'Apporto alla Felicità', text: 'L\'apporto ed il sostegno a tutti gli esseri che creano il bene e la felicità della comunità.' }
];

const SEZIONI = [
  {
    letter: 'A',
    title: 'Attività Creative Intellettive Artistiche — Sezione Arte figurativa bidimensionale',
    items: [
      { code: 'A1', label: 'Disegno e Pittura manuali comprese le varie tecniche: olio, acquerello, tempera, affresco ecc.' },
      { code: 'A2', label: 'Pittura Multimediale comprese le varie tecniche manuali e digitali ecc.' },
      { code: 'A3', label: 'Fotografia manuale e digitale' }
    ]
  },
  {
    letter: 'B',
    title: 'Sezione Arte figurativa tridimensionale',
    items: [
      { code: 'B1', label: 'Scultura e tecniche incisorie manuali' },
      { code: 'B2', label: 'Scultura Multimediale e installazioni contemporanee' }
    ]
  },
  {
    letter: 'C',
    title: 'Sezione Design',
    items: [
      { code: 'C1', label: 'Design di oggetti di uso comune. Immagine reale in plastico o virtuale' },
      { code: 'C2', label: 'Design architettonico di città e strutture abitative di lavoro o di svago. Immagine reale in plastico o virtuale' },
      { code: 'C3', label: 'Design dei mezzi di trasporto. Immagine reale in plastico o virtuale' },
      { code: 'C4', label: 'Arte AI, intelligenza artificiale' }
    ]
  },
  {
    letter: 'D',
    title: 'Attività Creative Intellettive Artistiche inerenti la lettura e scrittura',
    items: [
      { code: 'D1', label: 'Creazioni e interpretazioni nel settore letterario: romanzi, saggistica, racconti, poesie ecc.' },
      { code: 'D2', label: 'Pubblicazione e lettura di interi libri di esordienti e scrittori affermati' },
      { code: 'D3', label: 'Archivio storico e biblioteca della Fondazione' }
    ]
  },
  {
    letter: 'E',
    title: 'Attività Creative Intellettive Artistiche inerenti la Creazione, Regia, Spettacolo',
    items: [
      { code: 'E1', label: 'Testi di commedie teatrali e cinematografiche' },
      { code: 'E2', label: 'Visione di video clip e corti cinematografici' },
      { code: 'E3', label: 'Danza e coreografie' }
    ]
  },
  {
    letter: 'F',
    title: 'Creazioni e Interpretazioni nel settore della Musica',
    items: [
      { code: 'F1', label: 'Testi di canzoni, melodie, sinfonie e opere liriche e tutti gli altri tipi di musica' },
      { code: 'F2', label: 'Ascolto di brani musicali e visione di video-musicali' },
      { code: 'F3', label: 'Convegni, conferenze, premi della Fondazione' }
    ]
  },
  {
    letter: 'G',
    title: 'Attività Creative Intellettive Artistiche inerenti le Idee Innovative e Brevetti',
    items: [
      { code: 'G1', label: 'Invenzioni artistiche e scientifiche' },
      { code: 'G2', label: 'Scoperte scientifiche e brevetti' },
      { code: 'G3', label: 'Invenzioni su fonti di energia alternativa: solare, eolica, marina, magnetica, elettrica ecc.' },
      { code: 'G4', label: 'Brevetti e Marchi in qualsiasi settore' }
    ]
  },
  {
    letter: 'H',
    title: 'Benessere Materiale e Spirituale',
    items: [
      { code: 'H1', label: 'Tecniche del Benessere – Discipline Filosofiche' },
      { code: 'H2', label: 'Innovazioni Materiali per il Benessere: Macchinari e idee tecniche' },
      { code: 'H3', label: 'Innovazioni Mentali per il Benessere: Musicoterapia, Cromoterapia, Yoga, ecc.' },
      { code: 'H4', label: 'Arti mediche, medicine unite e Olistiche.' }
    ]
  }
];

const COURSES = [
  { id: 1, name: 'Corsi di lingua straniera', desc: 'Corsi di inglese, francese, spagnolo, tedesco, cinese, giapponese, ecc.', cat: 'Lingue' },
  { id: 2, name: 'Corsi di informatica e tecnologia', desc: 'Programmazione, sviluppo web, data science, sicurezza informatica, ecc.', cat: 'Tecnologia' },
  { id: 3, name: 'Corsi di marketing e business', desc: 'Marketing digitale, gestione aziendale, finanza, leadership, ecc.', cat: 'Business & Management' },
  { id: 4, name: 'Corsi di fotografia e videografia', desc: 'Fotografia digitale, post-produzione, riprese video, ecc.', cat: 'Arte & Design' },
  { id: 5, name: 'Corsi di cucina e pasticceria', desc: 'Cucina italiana, cucina internazionale, pasticceria, ecc.', cat: 'Cultura & Mestieri' },
  { id: 6, name: 'Corsi di yoga e benessere', desc: 'Yoga, meditazione, mindfulness, ecc.', cat: 'Benessere' },
  { id: 7, name: 'Corsi di arte e design', desc: 'Disegno, pittura, grafica, architettura, ecc.', cat: 'Arte & Design' },
  { id: 8, name: 'Corsi di sport e fitness', desc: 'Fitness, danza, arti marziali, ecc.', cat: 'Benessere' },
  { id: 9, name: 'Corsi di coaching e sviluppo personale', desc: 'Autostima, comunicazione, gestione dello stress, ecc.', cat: 'Benessere' },
  { id: 10, name: 'Corsi di scrittura e narrazione', desc: 'Scrittura creativa, giornalismo, copywriting, ecc.', cat: 'Scrittura & Umanistica' },
  { id: 11, name: 'Corsi di psicologia e counseling', desc: 'Psicologia clinica, psicoterapia, counseling, ecc.', cat: 'Scienze' },
  { id: 12, name: 'Corsi di giurisprudenza e diritto', desc: 'Diritto penale, diritto civile, diritto commerciale, ecc.', cat: 'Scienze' },
  { id: 13, name: 'Corsi di scienze e ingegneria', desc: 'Fisica, chimica, ingegneria meccanica, ingegneria elettronica, ecc.', cat: 'Scienze' },
  { id: 14, name: 'Corsi di lingue straniere per scopi specifici', desc: 'Inglese commerciale, inglese medico, francese giuridico, ecc.', cat: 'Lingue' },
  { id: 15, name: 'Corsi di educazione e insegnamento', desc: 'Pedagogia, didattica, educazione degli adulti, ecc.', cat: 'Scienze' },
  { id: 16, name: 'Corsi di musica e teatro', desc: 'Musica classica, jazz, teatro, recitazione, ecc.', cat: 'Arte & Design' },
  { id: 17, name: 'Corsi di storia e archeologia', desc: 'Storia dell\'arte, archeologia, storia antica, ecc.', cat: 'Scrittura & Umanistica' },
  { id: 18, name: 'Corsi di ecologia e ambiente', desc: 'Ecologia, gestione ambientale, energia rinnovabile, ecc.', cat: 'Scienze' },
  { id: 19, name: 'Corsi di turismo e ospitalità', desc: 'Gestione turistica, ospitalità, enogastronomia, ecc.', cat: 'Business & Management' },
  { id: 20, name: 'Corsi di moda e design di moda', desc: 'Design di moda, styling, visual merchandising, ecc.', cat: 'Arte & Design' },
  { id: 21, name: 'Corsi di leadership e gestione del tempo', desc: 'Leadership efficace, gestione del tempo, pianificazione strategica, ecc.', cat: 'Business & Management' },
  { id: 22, name: 'Corsi di comunicazione e relazioni interpersonali', desc: 'Comunicazione efficace, negoziazione, gestione dei conflitti, ecc.', cat: 'Business & Management' },
  { id: 23, name: 'Corsi di salute e benessere', desc: 'Nutrizione, fitness, gestione dello stress, ecc.', cat: 'Benessere' },
  { id: 24, name: 'Corsi di design e architettura d\'interni', desc: 'Design d\'interni, decorazione, architettura sostenibile, ecc.', cat: 'Arte & Design' },
  { id: 25, name: 'Corsi di gestione del progetto e del team', desc: 'Gestione del progetto, gestione del team, teamwork, ecc.', cat: 'Business & Management' },
  { id: 26, name: 'Corsi di lingua dei segni', desc: 'LIS americana, LIS britannica, LIS internazionale, ecc.', cat: 'Lingue' },
  { id: 27, name: 'Corsi di scrittura tecnica e scientifica', desc: 'Scrittura tecnica, scrittura scientifica, editing, ecc.', cat: 'Scrittura & Umanistica' },
  { id: 28, name: 'Corsi di storytelling e narrazione per il marketing', desc: 'Storytelling, marketing narrativo, copywriting, ecc.', cat: 'Business & Management' },
  { id: 29, name: 'Corsi di leadership femminile', desc: 'Empowerment femminile, leadership al femminile, mentoring, ecc.', cat: 'Business & Management' },
  { id: 30, name: 'Corsi di sviluppo di app e giochi', desc: 'Sviluppo di app, sviluppo di giochi, programmazione, ecc.', cat: 'Tecnologia' },
  { id: 31, name: 'Corsi di fotografia', desc: 'Fotografia digitale, fotografia di ritratto, fotografia di paesaggio, ecc.', cat: 'Arte & Design' },
  { id: 32, name: 'Corsi di marketing digitale', desc: 'SEO, social media marketing, email marketing, ecc.', cat: 'Business & Management' },
  { id: 33, name: 'Corsi di programmazione e sviluppo web', desc: 'HTML, CSS, JavaScript, PHP, Python, ecc.', cat: 'Tecnologia' },
  { id: 34, name: 'Corsi di e-commerce', desc: 'Creazione e gestione di un negozio online, marketing online, ecc.', cat: 'Business & Management' },
  { id: 35, name: 'Corsi di management e organizzazione aziendale', desc: 'Gestione aziendale, finanza aziendale, risorse umane, ecc.', cat: 'Business & Management' },
  { id: 36, name: 'Corsi di cucina e pasticceria speciale', desc: 'Cucina italiana, internazionale, pasticceria d\'autore, ecc.', cat: 'Cultura & Mestieri' },
  { id: 37, name: 'Corsi di fitness e sport speciali', desc: 'Yoga, pilates, allenamento funzionale, arti marziali, ecc.', cat: 'Benessere' },
  { id: 38, name: 'Corsi di creatività e arte applicata', desc: 'Pittura, disegno, scultura, artigianato, ecc.', cat: 'Arte & Design' },
  { id: 39, name: 'Corsi di psicologia positiva e benessere mentale', desc: 'Meditazione, mindfulness, auto-miglioramento, ecc.', cat: 'Benessere' },
  { id: 40, name: 'Corsi di blockchain e criptovalute', desc: 'Bitcoin, Ethereum, tecnologie criptografiche, ecc.', cat: 'Tecnologia' }
];

export default function CoreEthics() {
  const [activeTab, setActiveTab] = useState<'statuto' | 'sezioni' | 'didattica' | 'servizi' | 'regolamento' | 'libro'>('statuto');
  const [didacticsSearch, setDidacticsSearch] = useState('');
  const [selectedDidacticsCat, setSelectedDidacticsCat] = useState('Tutti');

  const categories = ['Tutti', 'Lingue', 'Tecnologia', 'Business & Management', 'Arte & Design', 'Cultura & Mestieri', 'Benessere', 'Scrittura & Umanistica', 'Scienze'];

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(didacticsSearch.toLowerCase()) || 
                          course.desc.toLowerCase().includes(didacticsSearch.toLowerCase());
    const matchesCat = selectedDidacticsCat === 'Tutti' || course.cat === selectedDidacticsCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-6 space-y-8" id="core-ethics-root">
      
      {/* Title */}
      <div className="text-center">
        <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs rounded-full font-mono uppercase tracking-widest font-bold">
          Statuto Federale 2026 delle AIC
        </span>
        <h2 className="text-3xl font-display font-medium text-slate-900 tracking-tight mt-3 font-bold">
          Statuto & Classificazione della Fondazione Falace
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mt-2 text-sm leading-relaxed font-sans">
          Inquadramento normativo, scopi statuari dell'Ente e archiviazione scientifico-didattica del Metodo del Sincronismo Creativo.
        </p>
      </div>

      {/* Six grid principles */}
      <div className="bg-slate-50 border border-slate-200 p-6 rounded-[2.5rem] max-w-5xl mx-auto">
        <span className="text-[9px] font-mono font-black text-slate-400 block tracking-widest uppercase mb-4 text-center">
          I Principi Fondanti dello Statuto (Art. 3)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="principles-cards-grid">
          {PRINCIPLES.map((pri) => (
            <div key={pri.id} className="bg-white border border-slate-200 rounded-3xl p-5 flex gap-4 items-start group hover:border-amber-400 transition-all shadow-2xs">
              <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center font-mono font-bold text-amber-700 text-xs flex-shrink-0 group-hover:scale-105 transition-transform border border-amber-100">
                {pri.id}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-900 tracking-wide font-sans block">
                  {pri.title}
                </span>
                <p className="text-slate-600 text-[11px] leading-relaxed font-sans">
                  {pri.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Tab Buttons styled brightly - Horizontal scrolling on mobile */}
        <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar text-xs font-semibold tracking-wide gap-1">
          <button
            onClick={() => setActiveTab('statuto')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === 'statuto' 
                ? 'border-blue-600 text-blue-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Costituzione & Scopo (Art. 1-3)
          </button>
          <button
            onClick={() => setActiveTab('sezioni')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === 'sezioni' 
                ? 'border-blue-600 text-blue-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Sezioni Attività (A1 - H4)
          </button>
          <button
            onClick={() => setActiveTab('didattica')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === 'didattica' 
                ? 'border-blue-600 text-blue-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            40 Corsi Didattici
          </button>
          <button
            onClick={() => setActiveTab('servizi')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === 'servizi' 
                ? 'border-blue-600 text-blue-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Servizi & Gestione Separata
          </button>
          <button
            onClick={() => setActiveTab('regolamento')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === 'regolamento' 
                ? 'border-blue-600 text-blue-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Vigilanza & Memoria Storica
          </button>
          <button
            onClick={() => setActiveTab('libro')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === 'libro' 
                ? 'border-blue-600 text-blue-600 font-bold' 
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Monografia ASIN
          </button>
        </div>

        {/* Tab Contents */}
        <div className="py-6" id="ethics-tabs-contents">
          
          {/* STATUTO TAB */}
          {activeTab === 'statuto' && (
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-755 leading-relaxed animate-fadeIn shadow-sm">
              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pb-3">
                <Shield className="text-blue-600" size={20} />
                <h3 className="font-bold">ARTICOLO 1 — COSTITUZIONE E DENOMINAZIONE</h3>
              </div>
              <div className="space-y-3 font-sans">
                <p>
                  È costituita una Fondazione denominata <strong className="text-slate-905">«FONDAZIONE FALACE – ATTIVITÀ INTELLETTIVE CREATIVE»</strong> (in forma abbreviata anche <strong className="text-yellow-700">«FF FONDAZIONE FALACE delle AIC»</strong>).
                </p>
                <p>
                  La Fondazione è un ente con personalità giuridica di diritto privato legalmente riconosciuto senza fine di lucro; è apolitica ed apartitica, rifiuta discriminazioni di sesso, etnia, lingua e religione ed opera come organismo di ricerca, promozione e formazione.
                </p>
                <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-[11px] text-slate-600 font-mono">
                  La denominazione, i loghi, gli acronimi (AIC) e i sigilli dell'Ente integrano i diritti d'autore e i marchi del Fondatore. È fatto divieto assoluto a chiunque altro di utilizzare o rivendicare la denominazione «Falace» legata al Metodo AIC, la cui titolarità resta indissolubilmente legata alla persona del Fondatore Unico.
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pt-4 pb-3">
                <BookOpen className="text-yellow-600" size={20} />
                <h3 className="font-bold">ARTICOLO 3 — SCOPO E ATTIVITÀ DELLA FONDAZIONE</h3>
              </div>
              <div className="space-y-3.5 font-sans">
                <p>
                  La Fondazione ha come oggetto e scopo esclusivo e preminente la salvaguardia, la protezione giuridica dall'allineamento o contraffazione algoritmica (ivi incluse le manipolazioni operate da sistemi di Intelligenza Artificiale), l'archiviazione logica, la sistematizzazione rigorosa e la divulgazione del <strong className="font-bold">METODO DEL SINCRONISMO CREATIVO (Metodo AIC©)</strong>, di esclusiva paternità, titolarità e proprietà intellettuale del Fondatore <strong className="font-bold">Dott. Luca Falace</strong>.
                </p>
                <p>
                  La Fondazione ha per scopo quello di attuare iniziative del più alto interesse sociale inerenti il «Pensiero Creativo Intellettivo ed Intellettuale», in tutte le sue forme al fine di esaltare le attività intellettuali artistiche tutelabili con il diritto d'autore, la proprietà intellettuale ed industriale, comprendente anche idee innovative brevettabili. 
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
                    <span className="font-bold block uppercase text-[10px] tracking-wide text-blue-750 mb-1">Ambiti e Formazione</span>
                    Inerenti principalmente i settori delle Arti e delle Scienze. Le attività creative vertono su formazione didattica, ricreativa, riabilitativa, formativa, nella conservazione e tutela.
                  </div>
                  <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-105 text-xs text-yellow-905">
                    <span className="font-bold block uppercase text-[10px] tracking-wide text-yellow-750 mb-1">Unione delle Discipline</span>
                    Sostiene la cultura artistica e scientifica, compresa la scienza dell'economia, dei problemi sociali e delle Scienze Unite attraverso la creazione d'impresa e brevetti.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CLASSIFICAZIONE DELLE ATTIVITA (A1 - H4) */}
          {activeTab === 'sezioni' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl text-xs font-sans">
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-1.5">
                  <Layers className="text-blue-600 animate-pulse" size={16} />
                  Classificazione Codificata delle Attività Culturali Intellettuali (SIAE-AIC)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Il Metodo AIC© del Sincronismo Creativo suddivide ufficialmente tutte le espressioni dello spirito d'ingegno in 8 distinte aree, ciascuna catalogata con identificatori specifici da consultare per il deposito legalmente provvisto.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="siae-sections-grid">
                {SEZIONI.map((sect) => (
                  <div key={sect.letter} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3 text-left">
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2">
                      <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-mono font-bold flex items-center justify-center text-xs shadow-xs">
                        {sect.letter}
                      </span>
                      <h4 className="text-[11px] font-bold text-slate-900 uppercase font-display leading-tight">
                        {sect.title}
                      </h4>
                    </div>
                    <div className="space-y-2 font-sans text-xs">
                      {sect.items.map(item => (
                        <div key={item.code} className="flex gap-2 items-start py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors">
                          <code className="text-[10px] font-bold font-mono text-amber-700 bg-amber-50 px-1.5 rounded border border-amber-200/50">
                            {item.code}
                          </code>
                          <p className="text-slate-700 text-[11px] leading-snug">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 40 CORSI DIDATTICI TAB */}
          {activeTab === 'didattica' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Info block & Search bar */}
              <div className="bg-white border border-slate-200 p-5 sm:p-6 rounded-[2rem] shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                      <GraduationCap className="text-blue-600" size={20} />
                      Catalogo Didattico Accademico (40 Corsi Formativi)
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-[11px] font-sans">
                      Attività didattiche svolte direttamente o in convenzione con Istituti, Università e Ministero della Ricerca Scientifica.
                    </p>
                  </div>
                  
                  {/* Search input inside tab */}
                  <div className="relative shrink-0 max-w-xs w-full">
                    <input 
                      type="text"
                      placeholder="Cerca corso..."
                      value={didacticsSearch}
                      onChange={(e) => setDidacticsSearch(e.target.value)}
                      className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-250 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-sans text-black font-medium"
                    />
                    <Search className="absolute left-2.5 top-2.5 text-slate-400" size={12} />
                  </div>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5 pt-1.5 overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedDidacticsCat(cat)}
                      className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all border cursor-pointer ${
                        selectedDidacticsCat === cat 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-3xs' 
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid course results */}
              {filteredCourses.length === 0 ? (
                <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl text-xs text-slate-400 font-sans">
                  Nessun corso didattico corrisponde ai filtri di ricerca impostati.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="academic-courses-grid">
                  {filteredCourses.map((course, idx) => (
                    <div key={course.id} className="bg-white border border-slate-200 p-4 rounded-2xl shadow-3xs hover:border-blue-400 transition-all text-left flex flex-col justify-between space-y-2 font-sans">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8.5px] font-mono bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase transition-transform">
                            {course.cat}
                          </span>
                          <span className="text-[9px] text-slate-400 font-mono font-bold">
                            Cod. AIC-{idx + 101}
                          </span>
                        </div>
                        <h4 className="text-[11.5px] font-bold text-slate-900 leading-snug">
                          {course.name}
                        </h4>
                        <p className="text-slate-600 text-[10.5px] leading-normal font-sans">
                          {course.desc}
                        </p>
                      </div>
                      
                      <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-[10px]">
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-mono font-bold block select-none">DISPONIBILE</span>
                        <button 
                          onClick={() => alert(`Pre-iscrizione inviata per: ${course.name}. Verrai guidato dal nostro team legale.`)} 
                          className="font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                        >
                          Iscriviti <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SERVIZI & GESTIONE SEPARATA */}
          {activeTab === 'servizi' && (
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-650 leading-relaxed animate-fadeIn shadow-sm text-left">
              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pb-3">
                <BookOpen className="text-emerald-600" size={18} />
                <h3 className="font-bold uppercase tracking-tight">Attività Editoriale</h3>
              </div>
              <p className="font-sans">
                La Fondazione vanta una propria struttura editoriale no-profit finalizzata alla divulgazione intellettuale tramite supporti cartacei, digitali o audio-visivi:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[9px] font-mono text-emerald-700 block uppercase mb-1">RIVISTE & BOLLETTINI</span>
                  Pubblicazione periodica cartacea e telematica dell'Opera di sincronismo.
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[9px] font-mono text-emerald-700 block uppercase mb-1">ACTI CONVECNI</span>
                  Stampa e pubblicazione di atti di simposi, cataloghi critici collettivi.
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-[9px] font-mono text-emerald-700 block uppercase mb-1">WEB TV</span>
                  Promozione e realizzazione tecnologica di una web TV d'informazione d'Ingegno.
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pt-4 pb-3">
                <Layers className="text-blue-600" size={18} />
                <h3 className="font-bold uppercase tracking-tight">Attività di Servizi alle Imprese ed agli Enti Pubblici</h3>
              </div>
              <ul className="space-y-2 list-disc list-inside font-sans ml-1 text-slate-700">
                <li><strong>Creazione di impresa:</strong> Assistenza legale e operativa alla costituzione di start-up culturali ed artistiche.</li>
                <li><strong>Organizzazione aziendale:</strong> Consulenza strategica B1B per enti ed istituzioni museali pubbliche.</li>
                <li><strong>Innovazione tecnologica:</strong> Protocollo di trasferimento dei brevetti su energie alternative e di Sincronismo d'Arte.</li>
                <li><strong>Istruttoria finanziamenti:</strong> Supporto a bandi e agevolazioni territoriali nazionali ed europee.</li>
              </ul>

              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pt-4 pb-3">
                <Sparkles className="text-amber-600" size={18} />
                <h3 className="font-bold uppercase tracking-tight">Altre Attività Imprenditoriali in Gestione Separata</h3>
              </div>
              <p className="font-sans text-slate-700">
                L'Ente persegue la sostenibilità economica strumentale per via estrattiva mediante attività commerciali marginali amministrate in gestioni separate:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 text-xs">
                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
                  <span className="font-bold text-amber-800 block text-[10px] mb-1 uppercase font-mono">Bookshop & Merchandising</span>
                  Produzione e vendita di materiale didattico, informativo, giochi e giocattoli scientifici o tecnologici brevettati.
                </div>
                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50">
                  <span className="font-bold text-amber-800 block text-[10px] mb-1 uppercase font-mono">Gestione Luoghi di Ristoro</span>
                  Gestione di luoghi fissi di aggregazione culturale e dei relativi servizi di accoglienza ed ospitalità museale.
                </div>
              </div>
            </div>
          )}

          {/* VIGILANZA, CURATION & MEMORIA STORICA */}
          {activeTab === 'regolamento' && (
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 space-y-6 text-xs sm:text-sm text-slate-650 leading-relaxed animate-fadeIn shadow-sm text-left">
              
              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pb-3">
                <AlertTriangle className="text-amber-600" size={18} />
                <span className="font-bold font-display uppercase tracking-tight">Regolamento di Vigilanza del Museo e Sanzioni</span>
              </div>
              <div className="space-y-3.5 font-sans">
                <p>
                  La partecipazione al portale dell'Opera Celeste richiede l'abbraccio incondizionato degli ideali di pace, tutela ambientale e benessere scientifico collettivo. Le opere caricate non devono evocare sentimenti distruttivi, odio sociale o violenza verbale.
                </p>
                <div className="p-4 bg-red-50 rounded-2xl border border-red-150 text-red-900 space-y-2">
                  <strong className="font-bold flex items-center gap-1">
                    <BadgeAlert size={14} />
                    Sanzioni Curation in caso di infrazione:
                  </strong>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-800 font-mono text-[10.5px]">
                    <div className="p-2 border border-red-200 bg-white rounded-lg">
                      <strong className="text-red-700 block mb-0.5">1. RICHIAMO</strong>
                      Warning ufficiale telematico d'ufficio.
                    </div>
                    <div className="p-2 border border-red-200 bg-white rounded-lg">
                      <strong className="text-red-700 block mb-0.5">2. DIFFIDA FORMALE</strong>
                      Sospensione immediata della priorità dell'Opera.
                    </div>
                    <div className="p-2 border border-red-200 bg-white rounded-lg">
                      <strong className="text-red-700 block mb-0.5">3. ESPULSIONE</strong>
                      Interdetto permanente dal Portale Virtuale.
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-slate-900 font-display font-medium text-base border-b border-slate-100 pt-4 pb-3">
                <Library className="text-blue-600" size={18} />
                <span className="font-bold font-display uppercase tracking-tight">Valorizzazione della Memoria Storica di Famiglia (Scienza & Arte)</span>
              </div>
              <div className="space-y-3.5 font-sans">
                <p>
                  In via sussidiaria la Fondazione persegue la valorizzazione e la tutela della memoria della Scienza e dell'Arte di famiglia, attraverso:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-slate-700">
                  <li>La salvaguardia documentale e tecnica dei brevetti storici di <strong>Lucio Falace</strong>.</li>
                  <li>La tutela dei diritti d'autore, d'attore e di interpretazione teatrale, cinematografica e televisiva di <strong>Paolo Falace</strong> (gestiti con coordinamento ad organo Nuovo IMAIE e SIAE).</li>
                </ol>
              </div>
            </div>
          )}

          {/* MONOGRAFIA TAB */}
          {activeTab === 'libro' && (
            <div className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 space-y-5 text-xs sm:text-sm text-slate-650 leading-relaxed animate-fadeIn shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3 bg-slate-50 border border-slate-200 p-5 rounded-2xl flex flex-col items-center justify-between space-y-4 text-center">
                  <div className="w-20 h-28 bg-amber-50 border-2 border-amber-400 rounded-lg flex flex-col items-center justify-center p-2 relative shadow-md">
                    <span className="text-[7px] text-slate-500 font-mono text-center uppercase tracking-wider block font-bold">Luca Falace</span>
                    <span className="text-[9px] text-slate-900 font-black font-display font-bold text-center uppercase block mt-3">Start-up Culturale</span>
                    <span className="text-[6px] text-amber-700 font-mono text-center block mt-1">Arte & Scienza</span>
                    <span className="absolute bottom-2 right-2 text-[5px] text-slate-400 font-mono">2005-2026</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 block font-mono">Kindle E-Book Amazon</span>
                    <span className="text-red-650 font-bold font-mono">ASIN: B0774WCKJ9</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 text-left">
                  <div className="flex items-center gap-2 text-slate-905 font-display font-medium text-base">
                    <Library className="text-amber-600" size={18} />
                    <h3 className="font-bold">Pubblicazione Brevettata l'Opera Celeste</h3>
                  </div>
                  <p className="font-sans">
                    I fondamenti del portale sono pubblicati nel saggio: <strong className="text-slate-900 leading-snug">"Centro Culturale Arte e Scienza. Progetto Start-up Culturale"</strong> scritto da Luca Falace, depositato nel 2005 presso il Ministero dei Beni Culturali e pubblicato in formato digitale edito da <strong>Amazon Edizioni</strong>.
                  </p>
                  <p className="font-sans text-xs">
                    Il saggio contiene le guide antropologiche e fenomenologiche elaborate durante un percorso di ricerca ventennale sulle Coincidenze Significative e sulla bioarchitettura.
                  </p>
                  
                  <div className="pt-3">
                    <a
                      href="http://amzn.eu/7Vh98UA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all active:scale-95 border border-amber-400"
                    >
                      <span>Vedi Scheda Kindle su Amazon</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

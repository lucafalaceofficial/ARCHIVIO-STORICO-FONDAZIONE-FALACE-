/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  BookOpen, 
  Atom, 
  Bookmark, 
  Award, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Info,
  Scale,
  Brain,
  Cpu,
  FileText,
  BadgeAlert,
  Sparkles,
  Heart,
  Globe
} from 'lucide-react';

const COMPONENT_PRINCIPLES = [
  { id: 1, title: "Natura e Rispetto", text: "L'amore ed il rispetto verso la natura e tutti gli esseri viventi." },
  { id: 2, title: "Libertà e Fratellanza", text: "La libertà, il rispetto e la fratellanza tra gli uomini e le rispettive tradizioni popolari." },
  { id: 3, title: "Ricerca e Studio", text: "La ricerca della conoscenza attraverso il continuo studio." },
  { id: 4, title: "Pensiero Creativo", text: "Il pensiero creativo intellettuale in tutte le sue infinite forme e tradizioni culturali." },
  { id: 5, title: "Evoluzione Umana", text: "La valorizzazione del pensiero creativo a scopo benefico per l'evoluzione ed il benessere dell'uomo." },
  { id: 6, title: "Sostegno Unitario", text: "L'apporto ed il sostegno a tutti gli esseri che creano il bene e la felicità della comunità." }
];

const COMPONENT_SECTIONS = [
  {
    code: "A",
    title: "Sezione Arte figurativa bidimensionale",
    items: [
      { id: "A1", desc: "Disegno e Pittura manuali comprese le varie tecniche: olio, acquerello, tempera, affresco ecc." },
      { id: "A2", desc: "Pittura Multimediale comprese le varie tecniche manuali e digitali ecc." },
      { id: "A3", desc: "Fotografia manuale e digitale" }
    ]
  },
  {
    code: "B",
    title: "Sezione Arte figurativa tridimensionale",
    items: [
      { id: "B1", desc: "Scultura e tecniche incisorie manuali" },
      { id: "B2", desc: "Scultura Multimediale e installazioni contemporanee" }
    ]
  },
  {
    code: "C",
    title: "Sezione Design",
    items: [
      { id: "C1", desc: "Design di oggetti di uso comune. Immagine reale in plastico o virtuale" },
      { id: "C2", desc: "Design architettonico di città e strutture abitative di lavoro o di svago. Immagine reale in plastico o virtuale" },
      { id: "C3", desc: "Design dei mezzi di trasporto. Immagine reale in plastico o virtuale" },
      { id: "C4", desc: "Arte AI, intelligenza artificiale" }
    ]
  },
  {
    code: "D",
    title: "Lettura e Scrittura",
    items: [
      { id: "D1", desc: "Creazioni e interpretazioni nel settore letterario: romanzi, saggistica, racconti, poesie ecc." },
      { id: "D2", desc: "Pubblicazione e lettura di interi libri di esordienti e scrittori affermati" },
      { id: "D3", desc: "Archivio storico e biblioteca della Fondazione" }
    ]
  },
  {
    code: "E",
    title: "Regia, Spettacolo e Danza",
    items: [
      { id: "E1", desc: "Testi di commedie teatrali e cinematografiche" },
      { id: "E2", desc: "Visione di video clip e corti cinematografici" },
      { id: "E3", desc: "Danza e coreografie" }
    ]
  },
  {
    code: "F",
    title: "Musica",
    items: [
      { id: "F1", desc: "Testi di canzoni, melodie, sinfonie e opere liriche e tutti gli altri tipi di musica" },
      { id: "F2", desc: "Ascolto di brani musicali e visione di video-musicali" },
      { id: "F3", desc: "Convegni, conferenze, premi della Fondazione" }
    ]
  },
  {
    code: "G",
    title: "Idee Innovative e Invenzioni",
    items: [
      { id: "G1", desc: "Invenzioni artistiche e scientifiche" },
      { id: "G2", desc: "Scoperte scientifiche e brevetti" },
      { id: "G3", desc: "Invenzioni su fonti di energia alternativa: solare, eolica, marina, magnetica, elettrica ecc." },
      { id: "G4", desc: "Brevetti e Marchi in qualsiasi settore" }
    ]
  },
  {
    code: "H",
    title: "Benessere Materiale e Spirituale",
    items: [
      { id: "H1", desc: "Tecniche del Benessere – Discipline Filosofiche" },
      { id: "H2", desc: "Innovazioni Materiali per il Benessere: Macchinari e idee tecniche" },
      { id: "H3", desc: "Innovazioni Mentali per il Benessere: Musicoterapia, Cromoterapia, Yoga, ecc." },
      { id: "H4", desc: "Arti mediche, medicine unite e Olistiche." }
    ]
  }
];

const COMPONENT_COURSES = [
  { id: 1, name: "Corsi di lingua straniera", desc: "Inglese, francese, spagnolo, tedesco, cinese, giapponese, ecc.", cat: "Lingue" },
  { id: 2, name: "Corsi di informatica e tecnologia", desc: "Programmazione, sviluppo web, data science, sicurezza informatica, ecc.", cat: "Scienze & Tech" },
  { id: 3, name: "Corsi di marketing e business", desc: "Marketing digitale, gestione aziendale, finanza, leadership, ecc.", cat: "Business & Management" },
  { id: 4, name: "Corsi di fotografia e videografia", desc: "Fotografia digitale, post-produzione, riprese video, ecc.", cat: "Arti Visive" },
  { id: 5, name: "Corsi di cucina e pasticceria", desc: "Cucina italiana, cucina internazionale, pasticceria, ecc.", cat: "Enogastronomia" },
  { id: 6, name: "Corsi di yoga e benessere", desc: "Yoga, meditazione, mindfulness, ecc.", cat: "Benessere" },
  { id: 7, name: "Corsi di arte e design", desc: "Disegno, pittura, grafica, architettura, ecc.", cat: "Arti Visive" },
  { id: 8, name: "Corsi di sport e fitness", desc: "Fitness, danza, arti marziali, ecc.", cat: "Benessere" },
  { id: 9, name: "Corsi di coaching e sviluppo personale", desc: "Autostima, comunicazione, gestione dello stress, ecc.", cat: "Benessere" },
  { id: 10, name: "Corsi di scrittura e narrazione", desc: "Scrittura creativa, giornalismo, copywriting, ecc.", cat: "Scrittura & Umanistica" },
  { id: 11, name: "Corsi di psicologia e counseling", desc: "Psicologia clinica, psicoterapia, counseling, ecc.", cat: "Scienze & Tech" },
  { id: 12, name: "Corsi di giurisprudenza e diritto", desc: "Diritto penale, diritto civile, diritto commerciale, ecc.", cat: "Scienze & Tech" },
  { id: 13, name: "Corsi di scienze e ingegneria", desc: "Fisica, chimica, ingegneria meccanica, ingegneria elettronica, ecc.", cat: "Scienze & Tech" },
  { id: 14, name: "Corsi di lingue straniere per scopi specifici", desc: "Inglese commerciale, inglese medico, francese giuridico, ecc.", cat: "Lingue" },
  { id: 15, name: "Corsi di educazione e insegnamento", desc: "Pedagogia, didattica, educazione degli adulti, ecc.", cat: "Scienze & Tech" },
  { id: 16, name: "Corsi di musica e teatro", desc: "Musica classica, jazz, teatro, recitazione, ecc.", cat: "Arti Visive" },
  { id: 17, name: "Corsi di storia e archeologia", desc: "Storia dell'arte, archeologia, storia antica, ecc.", cat: "Scrittura & Umanistica" },
  { id: 18, name: "Corsi di ecologia e ambiente", desc: "Ecologia, gestione ambientale, energia rinnovabile, ecc.", cat: "Scienze & Tech" },
  { id: 19, name: "Corsi di turismo e ospitalità", desc: "Gestione turistica, ospitalità, enogastronomia, ecc.", cat: "Business & Management" },
  { id: 20, name: "Corsi di moda e design di moda", desc: "Design di moda, styling, visual merchandising, ecc.", cat: "Arti Visive" },
  { id: 21, name: "Corsi di leadership e gestione del tempo", desc: "Leadership efficace, gestione del tempo, pianificazione strategica, ecc.", cat: "Business & Management" },
  { id: 22, name: "Corsi di comunicazione e relazioni interpersonali", desc: "Comunicazione efficace, negoziazione, gestione dei conflitti, ecc.", cat: "Business & Management" },
  { id: 23, name: "Corsi di salute e benessere", desc: "Nutrizione, fitness, gestione dello stress, etc.", cat: "Benessere" },
  { id: 24, name: "Corsi di design e architettura d'interni", desc: "Design d'interni, decorazione, architettura sostenibile, ecc.", cat: "Arti Visive" },
  { id: 25, name: "Corsi di gestione del progetto e del team", desc: "Gestione del progetto, gestione del team, teamwork, ecc.", cat: "Business & Management" },
  { id: 26, name: "Corsi di lingua dei segni", desc: "LIS americana, LIS britannica, LIS internazionale, ecc.", cat: "Lingue" },
  { id: 27, name: "Corsi di scrittura tecnica e scientifica", desc: "Scrittura tecnica, scrittura scientifica, editing, ecc.", cat: "Scrittura & Umanistica" },
  { id: 28, name: "Corsi di storytelling e narrazione per il marketing", desc: "Storytelling, marketing narrativo, copywriting, ecc.", cat: "Business & Management" },
  { id: 29, name: "Corsi di leadership femminile", desc: "Empowerment femminile, leadership al femminile, mentoring, ecc.", cat: "Business & Management" },
  { id: 30, name: "Corsi di sviluppo di app e giochi", desc: "Sviluppo di app, sviluppo di giochi, programmazione, ecc.", cat: "Scienze & Tech" },
  { id: 31, name: "Corsi di fotografia specifica", desc: "Fotografia digitale, fotografia di ritratto, fotografia di paesaggio, ecc.", cat: "Arti Visive" },
  { id: 32, name: "Corsi di marketing digitale", desc: "SEO, social media marketing, email marketing, ecc.", cat: "Business & Management" },
  { id: 33, name: "Corsi di programmazione e sviluppo web", desc: "HTML, CSS, JavaScript, PHP, Python, ecc.", cat: "Scienze & Tech" },
  { id: 34, name: "Corsi di e-commerce", desc: "Creazione e gestione di un negozio online, marketing online, ecc.", cat: "Business & Management" },
  { id: 35, name: "Corsi di management e organizzazione aziendale", desc: "Gestione aziendale, finanza aziendale, risorse umane, ecc.", cat: "Business & Management" },
  { id: 36, name: "Corsi di cucina e pasticceria italiana ed estera", desc: "Cucina italiana, internazionale, pasticceria, ecc.", cat: "Enogastronomia" },
  { id: 37, name: "Corsi di fitness e sport per tutti", desc: "Yoga, pilates, allenamento funzionale, arti marziali, ecc.", cat: "Benessere" },
  { id: 38, name: "Corsi di creatività e arte libera", desc: "Pittura, disegno, scultura, artigianato, ecc.", cat: "Arti Visive" },
  { id: 39, name: "Corsi di psicologia positiva e benessere mentale", desc: "Meditazione, mindfulness, auto-miglioramento, ecc.", cat: "Benessere" },
  { id: 40, name: "Corsi di blockchain e criptovalute", desc: "Bitcoin, Ethereum, criptovalute, ecc.", cat: "Scienze & Tech" }
];

export default function PortalPresentation() {
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tutti');
  const [activeSectionTab, setActiveSectionTab] = useState('all');

  const courseCategories = ['Tutti', 'Lingue', 'Scienze & Tech', 'Business & Management', 'Arti Visive', 'Enogastronomia', 'Benessere', 'Scrittura & Umanistica'];

  const filteredCourses = COMPONENT_COURSES.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(courseSearch.toLowerCase()) || 
                          course.desc.toLowerCase().includes(courseSearch.toLowerCase());
    const matchesCat = selectedCategory === 'Tutti' || course.cat === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-2 space-y-12 max-w-6xl mx-auto" id="portal-presentation-root">
      
      {/* SECTION 1: HEADER & INTRO (HUMANA HUB AIC SECTION) */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs rounded-full font-mono uppercase tracking-widest font-black inline-block">
          Infrastruttura Ufficiale dell'Ente
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-medium text-slate-900 tracking-tight font-black leading-tight">
          HUMANA HUB AIC — Presentazione & Statuto
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed font-sans">
          Il compendio storico della Fondazione Falace delle Attività Intellettive Creative (AIC), dei suoi obiettivi strutturali di tutela ed inquadramenti normativi statutari.
        </p>
      </div>

      {/* CORE PRESENTATION CARD */}
      <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-10 shadow-sm space-y-8 text-left relative overflow-hidden" id="presentation-intro-card">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
        
        {/* Paragraph 1 */}
        <div className="space-y-4 font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
          <p className="font-medium text-slate-900 text-lg">
            <strong>HUMANA HUB AIC</strong> è il portale internazionale della <strong className="text-blue-600">Fondazione Falace delle Attività Intellettive Creative</strong>, strumento di servizi per la tutela, valorizzazione, divulgazione, promozione, creazione e mediazione del patrimonio intellettivo e culturale umano.
          </p>
          <p>
            Opera nel campo delle <strong>Attività Intellettive Creative (AIC)</strong>, intese come l'insieme delle produzioni della mente umana in ambito artistico, scientifico, culturale e progettuale.
          </p>
          <p className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 font-mono text-xs text-slate-600 relative">
            <span className="absolute top-2 right-3 font-bold text-[9px] uppercase tracking-wider text-slate-400">Nota Istituzionale</span>
            Il portale ha funzione di <strong>infrastruttura operativa della Fondazione</strong> per la gestione integrata del patrimonio intellettivo umano. Non è una società, non è una startup, non è un'impresa: è il <strong>braccio operativo digitale e scalabile della Fondazione Falace</strong>.
          </p>
        </div>

        {/* Paragraph 1.2 */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-amber-50 border border-amber-300 text-amber-800 text-[10px] font-mono font-bold rounded">
              SEZ. 1.2
            </span>
            <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 tracking-tight">
              Perché Adesso — Contesto Storico e Ragione di Nascita
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8 space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
              <p>
                Il progetto nasce in un contesto storico caratterizzato dall'<strong>accelerazione dei sistemi di intelligenza artificiale</strong>.
              </p>
              <p>
                La normativa internazionale non ha ancora sviluppato un quadro regolatorio pienamente strutturato per la tutela delle produzioni intellettive umane in questo nuovo scenario tecnologico. Questo crea un <strong>vuoto normativo globale</strong> che riguarda la protezione, l'attribuzione e la valorizzazione delle idee, delle opere e delle creazioni generate dalla mente umana.
              </p>
              <p>
                In questo scenario, la tutela delle Attività Intellettive Creative diventa una <strong>necessità strutturale</strong> e non più un ambito settoriale.
              </p>
              <p className="font-semibold text-slate-900">
                Il portale HUMANA HUB AIC nasce come risposta operativa diretta a questa transizione storica, nell'ambito della missione istituzionale della Fondazione Falace.
              </p>
            </div>

            <div className="md:col-span-4 p-5 bg-gradient-to-br from-slate-50 to-amber-50/20 border border-slate-200 rounded-2xl space-y-3 text-left">
              <div className="flex items-center gap-1.5 text-amber-800 font-mono font-bold text-xs uppercase tracking-wide">
                <Cpu size={14} className="text-amber-600" />
                <span>Rischio Algoritmico</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                La contraffazione silenziosa della mente tramite addestramenti non autorizzati di Large Language Models e generatori visivi minaccia la paternità originale dell'uomo.
              </p>
              <div className="text-[10px] bg-white px-2.5 py-1 rounded border border-slate-100 font-mono text-slate-500 font-bold block text-center">
                Sigillo di Priorità AIC© 2026
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: STATUTO COMPREHENSIVE TEXT */}
      <div className="space-y-8" id="statute-content-section">
        
        {/* Banner divisor */}
        <div className="relative py-4 text-center">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 py-1.5 bg-slate-50 text-xs text-slate-500 font-mono font-black uppercase tracking-widest border border-slate-200 rounded-full">
              Atto Costitutivo & Statuto Fondazionale
            </span>
          </div>
        </div>

        {/* STATUTO HEADER */}
        <div className="bg-white text-slate-900 rounded-[2.5rem] p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2">
            <span className="text-[#1877F2] text-xs font-mono font-black tracking-widest uppercase block">
              ALLEGATO «A» ALL'ATTO COSTITUTIVO 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-medium text-slate-900 tracking-wide font-black">
              FONDAZIONE FALACE delle Attività Intellettive Creative
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 text-[10px] sm:text-xs font-mono text-slate-600">
              <span className="text-[#1877F2] font-bold">Fondatore Unico: Dott. Luca Falace</span>
              <span>•</span>
              <span>ANNO COSTITUTIVO: 2026</span>
              <span>•</span>
              <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200 font-bold">Versione Integrale Atto</span>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-4 text-[10px] sm:text-xs font-mono text-slate-500 leading-relaxed">
            © Luca Falace 2005–2026 · SIAE · MiC · CERN Zenodo · OLAF · MAXXI · Discoteca di Stato della Repubblica Italiana
          </div>
        </div>

        {/* ARTICOLI GENERALS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
          
          {/* ART 1 */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-xs text-left space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Scale className="text-blue-600" size={18} />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight">
                ARTICOLO 1 — Costituzione e Denominazione
              </h3>
            </div>
            <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-650 leading-relaxed">
              <p>
                È costituita una Fondazione denominata <strong className="text-slate-900">«FONDAZIONE FALACE – ATTIVITÀ INTELLETTIVE CREATIVE»</strong> (in forma abbreviata anche <strong className="text-amber-700 font-bold">«FF FONDAZIONE FALACE delle AIC»</strong>).
              </p>
              <p>
                La Fondazione è un ente con personalità giuridica di diritto privato legalmente riconosciuto senza fine di lucro; è apolitica ed apartitica, rifiuta discriminazioni di sesso, etnia, lingua e religione ed opera come organismo di ricerca, promozione e formazione.
              </p>
              <p className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 font-mono">
                La denominazione, i loghi, gli acronimi (AIC) e i sigilli dell'Ente integrano i diritti d'autore e i marchi del Fondatore. È fatto divieto assoluto a chiunque altro di utilizzare o rivendicare la denominazione «Falace» legata al Metodo AIC, la cui titolarità resta indissolubilmente legata alla persona del Fondatore Unico.
              </p>
            </div>
          </div>

          {/* ART 3 */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[2rem] shadow-xs text-left space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldCheck className="text-amber-600" size={18} />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight">
                ARTICOLO 3 — Scopo e Attività
              </h3>
            </div>
            <div className="space-y-3.5 text-xs sm:text-[13px] text-slate-650 leading-relaxed">
              <p>
                La Fondazione ha come oggetto e scopo esclusivo e preminente la salvaguardia, la protezione giuridica dall'allineamento o contraffazione algoritmica (ivi incluse le manipolazioni operate da sistemi di Intelligenza Artificiale), l'archiviazione logica, la sistematizzazione rigorosa e la divulgazione del <strong className="text-slate-900">METODO DEL SINCRONISMO CREATIVO (Metodo AIC© - Attività Intellettive Creative nei riguardi di Arte e Scienza)</strong>, di esclusiva paternità, titolarità e proprietà intellettuale del Fondatore <strong className="text-slate-900">Dott. Luca Falace</strong>.
              </p>
              <p>
                La Fondazione si occupa della tutela, della formazione, della promozione delle Attività Creative Intellettuali; inerenti principalmente i settori delle Arti e delle Scienze.
              </p>
              <p>
                La Fondazione, con esclusione di qualsiasi finalità di lucro, ha come oggetto la promozione e la diffusione di idee innovative nel settore umanistico e scientifico.
              </p>
            </div>
          </div>

        </div>

        {/* SCIENTIFIC AND SOCIAL SPECIFICS CARD */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-8 space-y-6 text-left shadow-xs">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <Brain className="text-blue-600 font-bold" size={18} />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wide">
              Pensiero Creativo Intellettivo e Tutela Sussidiaria
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-[13px] text-slate-650 leading-relaxed font-sans">
            <div className="space-y-3">
              <p>
                La Fondazione ha per scopo quello di attuare iniziative del più alto interesse sociale inerenti il <strong>«Pensiero Creativo Intellettivo ed Intellettuale»</strong>, in tutte le sue forme al fine di esaltare le attività intellettuali artistiche tutelabili con il diritto d'autore, la proprietà intellettuale ed industriale, comprendente anche idee innovative brevettabili. 
              </p>
              <p>
                La Fondazione si occupa della promozione e della valorizzazione delle «Attività Creative Intellettive», della selezione di queste e della tutela quale bene culturale e di interesse artistico, umanistico e scientifico.
              </p>
              <p>
                Nel campo artistico copre ogni forma di arte esistente, mentre in ambito scientifico sostiene le attività creative e intellettive promuovendo innovazioni brevettabili.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5">
              <div className="flex items-center gap-1.5 text-xs font-black font-mono text-slate-800 uppercase tracking-wider">
                <Bookmark className="text-amber-600" size={14} />
                <span>Tutela Sussidiaria di Famiglia</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal">
                In via sussidiaria la Fondazione persegue la valorizzazione e la tutela della memoria della Scienza e dell'Arte di famiglia, attraverso la salvaguardia documentale dei brevetti storici di <strong className="text-slate-800">Lucio Falace</strong> e dei diritti d'attore, di interpretazione teatrale, cinematografica e televisiva di <strong className="text-slate-800">Paolo Falace</strong> (gestiti via Nuovo IMAIE e SIAE).
              </p>
            </div>
          </div>
        </div>

        {/* STATUTE SIX KEY POINTS */}
        <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-[2.5rem] space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-wider font-display">
              I Sei Punti Chiave Statutari
            </h3>
            <p className="text-slate-500 text-[11px] font-sans">
              I principi etici e filosofici immutabili scritti all'atto costitutivo della Fondazione Luca Falace.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="statute-ethics-6point-grid">
            {COMPONENT_PRINCIPLES.map((princ) => (
              <div key={princ.id} className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-2 text-left hover:border-amber-400 transition-all shadow-3xs flex flex-col justify-between">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 font-mono font-black flex items-center justify-center text-[10px] shadow-3xs">
                  {princ.id}
                </span>
                <div className="space-y-1 pt-1 font-sans">
                  <span className="text-[11.5px] font-bold text-slate-900 block tracking-wide">{princ.title}</span>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed">{princ.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* POWERS AND ACTIONS PERMITTED BY STATUTE */}
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 sm:p-8 text-left space-y-6" id="statute-powers-box">
          <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
            <Award className="text-blue-600" size={18} />
            <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight">
              Iniziative e Diritti Istituzionali dell'Ente
            </h3>
          </div>

          <p className="text-[13px] text-slate-600 font-sans leading-relaxed">
            Al fine di perseguire i suoi scopi la Fondazione potrà compiere tutte le attività idonee, tra cui:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-xs text-slate-700 font-sans">
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Promuovere ed organizzare la produzione artistica in tutti i suoi possibili aspetti.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Diffondere la cultura letteraria, le arti figurative, la musica, la scienza ed il benessere.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Concorsi letterari, delle arti figurative, musicali, teatrali e cinematografiche.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Pubblicazione di opere letterarie, saggistiche e cataloghi d'arte.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Valorizzare il territorio e del patrimonio culturale ed demo-etnoantropologico.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>L'esplorazione delle potenzialità artistiche della Scienza e viceversa.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Fare uso del Marchio Nazionale e Internazionale Sincronismo Creativo© e Concept®.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Insegnare il Metodo Sincronismo Creativo© per la formazione di personale qualificato.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Collaborare con istituzioni quali Ospedali, Università, Scuole, Musei d'arte.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Salvaguardare e conservare la denominazione, il logo, il marchio ed i segni identificativi.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Promuovere la realizzazione di una web TV tematica dell'Ingegno.</span>
            </div>
            <div className="flex gap-2 items-start">
              <ChevronRight size={14} className="text-blue-500 mt-0.5 shrink-0" />
              <span>Erogare servizi di tutela della proprietà intellettuale e deposito opere per artisti.</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: CLASSIFY OF ACTIVITIES (A1 - H4) */}
        <div className="space-y-6 text-left">
          <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-xs">
            <h3 className="text-sm font-display font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <BookOpen size={16} className="text-blue-600" />
              Classificazione Codificata delle Attività Creative Intellettuali
            </h3>
            <p className="text-slate-500 text-xs font-sans">
              La mappatura analitica ideata da Luca Falace per catalogare i settori operativi d'ingegno ammessi al deposito.
            </p>

            {/* Sections tabulation result */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {COMPONENT_SECTIONS.map((section) => (
                <div key={section.code} className="p-4 bg-slate-50 border border-slate-250/60 rounded-2xl space-y-2 text-left flex flex-col justify-between">
                  <div className="flex items-center gap-2 border-b border-slate-200/50 pb-2">
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-[10px] shadow-xs">
                      {section.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wide leading-tight">
                      {section.title}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-1.5">
                    {section.items.map((sub) => (
                      <div key={sub.id} className="flex gap-2 items-start text-[10.5px] leading-relaxed text-slate-650 font-sans hover:text-slate-900 transition-colors">
                        <code className="text-[9px] font-bold font-mono text-amber-700 bg-amber-50 px-1 rounded select-none shrink-0 border border-amber-250/30">
                          {sub.id}
                        </code>
                        <span>{sub.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: 40 ACCADEMIC COURSE LIST */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-[2.5rem] text-left space-y-6" id="statute-academic-courses">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="space-y-0.5">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base uppercase tracking-tight flex items-center gap-2">
                <Atom className="text-amber-500 animate-spin-slow" size={20} />
                Regolamento Didattico: 40 Corsi della Fondazione
              </h3>
              <p className="text-slate-500 text-xs font-sans">
                La Fondazione svolge attività didattiche finalizzate all'istruzione ed alla formazione scientifico-artistica multidisciplinare.
              </p>
            </div>

            {/* Filter Search inside Presentazione */}
            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Cerca corso didattico..."
                value={courseSearch}
                onChange={(e) => setCourseSearch(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-500 font-sans text-black"
              />
              <Search className="absolute left-2.5 top-2.5 text-slate-400" size={12} />
            </div>
          </div>

          {/* Quick categories pills */}
          <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {courseCategories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all border cursor-pointer ${
                  selectedCategory === c 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-slate-50 text-slate-650 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Courses grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="courses-bento-grid">
            {filteredCourses.slice(0, 16).map((course, idx) => (
              <div key={course.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-2 text-left flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-1 py-0.5 rounded border border-blue-105">
                      {course.cat}
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono font-bold">
                      #{course.id}
                    </span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-900 leading-tight">
                    {course.name}
                  </h4>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    {course.desc}
                  </p>
                </div>
                <div className="pt-1.5 border-t border-slate-200/50 flex items-center justify-between">
                  <span className="text-[8.5px] font-mono text-emerald-700 bg-emerald-50 px-1 rounded font-bold uppercase select-none">Ufficiale</span>
                  <span className="text-[8.5px] font-semibold text-slate-400 font-mono">AIC-EDU</span>
                </div>
              </div>
            ))}
            
            {filteredCourses.length > 16 && (
              <div className="p-4 bg-slate-900 text-white rounded-xl flex flex-col items-center justify-center text-center space-y-1 block border border-slate-800">
                <span className="text-amber-400 text-lg font-bold">+{filteredCourses.length - 16} Corsi</span>
                <span className="text-[9px] text-slate-400 font-mono">Usa la barra di ricerca o i filtri in alto per sfogliare il catalogo completo dei 40 corsi didattici ufficiali.</span>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 5: SECONDARY STATUTE EXTRACT ACTIVITIES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
          
          {/* EDITORIA */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2rem] text-left space-y-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black font-mono text-slate-950 uppercase tracking-wide border-b border-slate-100 pb-2">
              <FileText className="text-blue-600" size={16} />
              <span>Attività Editoriale</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-xs leading-relaxed">
              <li>• Pubblicazione di riviste scientifiche e bollettini AIC.</li>
              <li>• Atti di convegni, seminari e cataloghi critici.</li>
              <li>• Edizione e distribuzione di materiale di stampa, discografico, cinetelevisivo e multimediale.</li>
            </ul>
          </div>

          {/* SERVIZI IMPRESA */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2rem] text-left space-y-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black font-mono text-slate-950 uppercase tracking-wide border-b border-slate-100 pb-2">
              <Scale className="text-amber-600" size={16} />
              <span>Servizi alle Imprese</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-xs leading-relaxed">
              <li>• Assistenza legale per la creazione di idee innovative d'impresa.</li>
              <li>• Protocolli di trasferimento tecnologico d'organigramma.</li>
              <li>• Assistenza per istruttoria ed erogazione di finanziamenti e contributi europei (B2B).</li>
            </ul>
          </div>

          {/* GESTIONE SEPARATA */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2rem] text-left space-y-3.5 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black font-mono text-slate-950 uppercase tracking-wide border-b border-slate-100 pb-2">
              <Sparkles className="text-emerald-600" size={16} />
              <span>Gestione Separata</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 text-xs leading-relaxed">
              <li>• Margini commerciali reinvestiti al 100% per gli scopi istituzionali.</li>
              <li>• Vendita di e-book Kindle Amazon (ASIN B0774WCKJ9) e giocattoli scientifici.</li>
              <li>• Servizi accessori e di ristorazione museale in galleria.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

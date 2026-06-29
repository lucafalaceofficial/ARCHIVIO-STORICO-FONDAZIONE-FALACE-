import React, { useState } from 'react';
import { 
  History, ShieldCheck, Sparkles, Database, FileText, CheckCircle, 
  ArrowRight, Layers, BookOpen, Users, Video, Award, GraduationCap, 
  Scale, Brain, Search, Info, ExternalLink, HelpCircle, Eye, EyeOff,
  Download
} from 'lucide-react';
import AicDocPlayer from './AicDocPlayer';

interface ArchiveSection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  category: 'fondativi' | 'teoria' | 'media' | 'documenti';
}

export default function ArchivioAicSito() {
  const [activeSectionId, setActiveSectionId] = useState<string>('benvenuto');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSequentialScroll, setIsSequentialScroll] = useState<boolean>(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(true);
  const [inputPassword, setInputPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [isPatrimonioUnlocked, setIsPatrimonioUnlocked] = useState<boolean>(false);
  const [patrimonioPasswordInput, setPatrimonioPasswordInput] = useState<string>('');
  const [patrimonioPasswordError, setPatrimonioPasswordError] = useState<string>('');
  const [showPatrimonioPassword, setShowPatrimonioPassword] = useState<boolean>(false);

  // Sfondi e classi per estetica
  const cardStyle = "bg-white border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all rounded-none";
  const headingStyle = "font-serif text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 mb-4 flex items-center gap-2";

  // Gestore per i link fittizi o reali del vecchio sito
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Funzione per scaricare l'intero archivio storico in formato XML
  const handleDownloadXml = () => {
    const escapeXml = (unsafe: string): string => {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    let xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xmlOutput += `<fondazione_aic>\n`;
    
    // Metadata
    xmlOutput += `  <metadata>\n`;
    xmlOutput += `    <denominazione_it>FALACE FOUNDATION FOR AIC DEVELOPMENT - FONDAZIONE FALACE PER LE ATTIVITA’ INTELLETTIVE CREATIVE</denominazione_it>\n`;
    xmlOutput += `    <denominazione_en>FALACE FOUNDATION FOR AIC DEVELOPMENT</denominazione_en>\n`;
    xmlOutput += `    <fondatore>Dott. Luca Falace</fondatore>\n`;
    xmlOutput += `    <email>dott.lucafalace@gmail.com</email>\n`;
    xmlOutput += `    <codice_ateco>94.99.10 - Attività di organizzazioni per la tutela dei cittadini</codice_ateco>\n`;
    xmlOutput += `    <scopo_istituzionale>La Fondazione si occupa della tutela, della formazione, della promozione delle Attività Creative Intellettuali, principalmente nei settori delle Arti e delle Scienze.</scopo_istituzionale>\n`;
    xmlOutput += `    <deposito_siae>ARCHIVIO SIAE OLAF COD. 05-07</deposito_siae>\n`;
    xmlOutput += `  </metadata>\n\n`;

    // 1. Archive sezioni
    xmlOutput += `  <archivio_sezioni>\n`;
    xmlOutput += `    <sezione id="benvenuto">\n`;
    xmlOutput += `      <titolo>DOCUMENTI ATTO E STATUTO - BUSINESS MODEL</titolo>\n`;
    xmlOutput += `      <sottotitolo>Benvenuto sul nostro Sito Privato della Fondazione Culturale AIC</sottotitolo>\n`;
    xmlOutput += `      <categoria>fondativi</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>La Fondazione si occupa della tutela, della formazione, della promozione delle Attività Creative Intellettuali, principalmente nei settori delle Arti e delle Scienze. Essa non ha scopo di lucro e non può distribuire utili; è apolitica ed apartitica. Rifiuta discriminazioni di sesso, etnia, lingua e religione.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;
    
    xmlOutput += `    <sezione id="progetto_sede">\n`;
    xmlOutput += `      <titolo>PROGETTO SEDE &amp; LAYOUT INTERNI 3D</titolo>\n`;
    xmlOutput += `      <sottotitolo>Raffigurazione degli interni e rendering 3D delle sale di studio della Fondazione</sottotitolo>\n`;
    xmlOutput += `      <categoria>fondativi</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>Raffigurazione degli interni e rendering 3D delle sale di studio della Fondazione. Planimetria, interni ed estetici della sede con parquet ed illuminazione a LED progettati dal Dott. Luca Falace.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;

    xmlOutput += `    <sezione id="origini">\n`;
    xmlOutput += `      <titolo>LE ORIGINI E IL SINCRONISMO CREATIVO</titolo>\n`;
    xmlOutput += `      <sottotitolo>Il superamento attivo della Sincronicità di Carl Gustav Jung</sottotitolo>\n`;
    xmlOutput += `      <categoria>teoria</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>Il Sincronismo Creativo si configura come un passo successivo e propedeutico alla teoria junghiana, ampliando la sincronicità in un contesto attivo: l'individuo, attraverso l'attivazione della propria creatività e l'uso conscio delle Attività Intellettive Creative (AIC), partecipa alla manifestazione cosciente degli eventi significativi. I 5 Principi Cardinali del Metodo Sincronico includono: Osservazione e Documentazione, Consapevolezza Creativa, Armonizzazione con l'Energia Celeste, Integrazione Psiche, Fisica e Metafisica, Applicazione Pratica.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;

    xmlOutput += `    <sezione id="statuto_atto">\n`;
    xmlOutput += `      <titolo>ESTRATTI ATTO NOTARILE &amp; STATUTO</titolo>\n`;
    xmlOutput += `      <sottotitolo>La stesura ufficiale del settembre 2024 registrata presso il Notaio</sottotitolo>\n`;
    xmlOutput += `      <categoria>documenti</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>Estratto Atto Notarile Statuto Articolo 20: La presidenza onoraria della Fondazione è conferita al Dott. Luca Falace sua vita natural durante e senza altro adempimento da operarsi, per l'iniziativa, l'impegno, la divulgazione del Metodo del Sincronismo Creativo di cui è ideatore nonché la dedizione sin dalla sua istituzione.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;

    xmlOutput += `    <sezione id="didattica">\n`;
    xmlOutput += `      <titolo>LE ATTIVITÀ DIDATTICHE E ACCADEMICHE</titolo>\n`;
    xmlOutput += `      <sottotitolo>Il Manifesto dei 40 Corsi Formativi descritto nello Statuto</sottotitolo>\n`;
    xmlOutput += `      <categoria>documenti</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>Il Manifesto formativo descritto nello Statuto comprende i 40 corsi formativi ufficiali e accademici per le capacità dell'ingegno d'adulti ed allievi.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;

    xmlOutput += `    <sezione id="cineteca">\n`;
    xmlOutput += `      <titolo>CINETECA PRIVATA &amp; DOCUMENTARI</titolo>\n`;
    xmlOutput += `      <sottotitolo>Registro Storico di 13 Video e rassegne originali di Luca Falace</sottotitolo>\n`;
    xmlOutput += `      <categoria>media</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>La videoteca privata contiene 13 documentari e video montati e scritti interamente da Luca Falace dedicati alle capacità cognitive ed energetiche.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;

    xmlOutput += `    <sezione id="membri">\n`;
    xmlOutput += `      <titolo>IL REGISTRO DEI MEMBRI DELLA FONDAZIONE</titolo>\n`;
    xmlOutput += `      <sottotitolo>Il coordinamento attivo di oltre 100 associati del 2023-2024</sottotitolo>\n`;
    xmlOutput += `      <categoria>fondativi</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>Nel corso delle fases preparatorie del 2023, la Fondazione AIC ha coordinato un club di circa 110-130 amici e sostenitori attivi, uniti nel promuovere il potenziamento dei picchi creativi e delle meditazioni.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;

    xmlOutput += `    <sezione id="patrimonio">\n`;
    xmlOutput += `      <titolo>IL PATRIMONIO FONDATIVO &amp; PERIZIE stima</titolo>\n`;
    xmlOutput += `      <sottotitolo>La classificazione del fondo artistico stimato e depositato</sottotitolo>\n`;
    xmlOutput += `      <categoria>fondativi</categoria>\n`;
    xmlOutput += `      <contenuto_testuale>Il patrimonio della fondazione comprende la perizia di stima delle opere d'arte valutata professionalmente e depositata presso il Notaio.</contenuto_testuale>\n`;
    xmlOutput += `    </sezione>\n`;
    xmlOutput += `  </archivio_sezioni>\n\n`;

    // 2. Corsi formatted
    xmlOutput += `  <corsi_didattici>\n`;
    corsiDidattici.forEach(corso => {
      xmlOutput += `    <corso numero="${corso.num}">\n`;
      xmlOutput += `      <categoria>${escapeXml(corso.cat)}</categoria>\n`;
      xmlOutput += `      <titolo>${escapeXml(corso.title)}</titolo>\n`;
      xmlOutput += `      <descrizione>${escapeXml(corso.desc)}</descrizione>\n`;
      xmlOutput += `    </corso>\n`;
    });
    xmlOutput += `  </corsi_didattici>\n\n`;

    // 3. Documentaries formatted
    xmlOutput += `  <cineteca>\n`;
    videoCineteca.forEach(v => {
      xmlOutput += `    <documentario numero="${v.num}">\n`;
      xmlOutput += `      <titolo>${escapeXml(v.title)}</titolo>\n`;
      xmlOutput += `      <durata>${escapeXml(v.dur)}</durata>\n`;
      xmlOutput += `      <tipo>${escapeXml(v.type)}</tipo>\n`;
      xmlOutput += `      <descrizione>${escapeXml(v.desc)}</descrizione>\n`;
      xmlOutput += `      <url>${escapeXml(v.url)}</url>\n`;
      xmlOutput += `    </documentario>\n`;
    });
    xmlOutput += `  </cineteca>\n`;

    xmlOutput += `</fondazione_aic>\n`;

    const blob = new Blob([xmlOutput], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fondazione_aic_archivio_completo.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === 'fondazioneaicprotettonike' || inputPassword === 'Graalgraal8' || inputPassword.toLowerCase() === 'aic2024') {
      setIsPasswordVerified(true);
      setPasswordError('');
    } else {
      setPasswordError('Password non corretta. Controlla il carteggio originario.');
    }
  };

  // Elenco dei 40 corsi didattici ufficiali dallo statuto
  const corsiDidattici = [
    { num: 1, cat: "Lingue", title: "Corsi di lingua straniera", desc: "Inglese, francese, spagnolo, tedesco, cinese, giapponese, ecc. focalizzati su conversazione e interazione culturale." },
    { num: 2, cat: "Tecnologia", title: "Corsi di informatica e tecnologia", desc: "Programmazione avanzata, disegno e sviluppo web, data science, sicurezza informatica applicata." },
    { num: 3, cat: "Business", title: "Corsi di marketing e business", desc: "Marketing digitale per imprese creative, gestione aziendale etica, economia sociale, finanza e leadership." },
    { num: 4, cat: "Arte Visiva", title: "Corsi di fotografia e videografia", desc: "Fotografia digitale professionale, post-produzione, riprese video, montaggio artistico e creativo." },
    { num: 5, cat: "Gastronomia", title: "Corsi di cucina e pasticceria", desc: "Cucina tradizionale italiana, gastronomia internazionale e pasticceria ornamentale." },
    { num: 6, cat: "Benessere", title: "Corsi di yoga e benessere", desc: "Teorie di yoga, tecniche di meditazione attiva, percorsi di mindfulness corporea e mentale." },
    { num: 7, cat: "Design", title: "Corsi di arte e design", desc: "Disegno manuale ed estemporaneo, tecniche pittoriche ordinarie, grafica integrata, architettura d'interni." },
    { num: 8, cat: "Dinamica", title: "Corsi di sport e fitness", desc: "Fitness olistico, espressioni di danza contemporanea, discipline di autodifesa e arti marziali filosofiche." },
    { num: 9, cat: "Crescita", title: "Corsi di coaching e sviluppo personale", desc: "Autostima, comunicazione empatica, gestione dello stress ossidativo e mentale, programmazione neuro-intenzionale." },
    { num: 10, cat: "Scrittura", title: "Corsi di scrittura e narrazione", desc: "Tecniche di scrittura creativa, giornalismo d'inchiesta, copywriting strategico e narrazione analogica." },
    { num: 11, cat: "Mente", title: "Corsi di psicologia e counseling", desc: "Elementi di psicologia clinica, orientamenti di psicoterapia umanistica, percorsi di counseling relazionale." },
    { num: 12, cat: "Diritto", title: "Corsi di giurisprudenza e diritto", desc: "Elementi di diritto penale, civile, commerciale internazionale e tutela dei brevetti d'ingegno." },
    { num: 13, cat: "Ingegneria", title: "Corsi di scienze e ingegneria", desc: "Fisica applicata, chimica delle materie, ingegneria meccanica sperimentale, ingegneria elettronica d'avanguardia." },
    { num: 14, cat: "Lingue Bis", title: "Corsi di lingue straniere per scopi specifici", desc: "Inglese commerciale avanzato, comunicazione medica internazionale, francese giuridico." },
    { num: 15, cat: "Flipped", title: "Corsi di educazione e insegnamento", desc: "Pedagogia della creatività, strategie didattiche avanzate, metodologie di educazione continua per adulti." },
    { num: 16, cat: "Suono", title: "Corsi di musica e teatro", desc: "Analisi della musica classica ed hertziana, improvvisazione jazz, recitazione teatrale e corporea." },
    { num: 17, cat: "Storia", title: "Corsi di storia e archeologia", desc: "Storia dell'arte antica e moderna, archeologia classica, studio delle civiltà demo-etno-antropologiche." },
    { num: 18, cat: "Eco", title: "Corsi di ecologia e ambiente", desc: "Sostenibilità ambientale, gestione delle risorse naturali, applicazione pratica di fonti energetiche rinnovabili." },
    { num: 19, cat: "Turismo", title: "Corsi di turismo e ospitalità", desc: "Sviluppo turistico ecosostenibile, management delle strutture di accoglienza, valorizzazione enogastronomica." },
    { num: 20, cat: "Styling", title: "Corsi di moda e design di moda", desc: "Stilismo contemporaneo d'abbigliamento, visual merchandising, modellistica e coordinamento eventi di sfilata." },
    { num: 21, cat: "Time", title: "Corsi di leadership e gestione del tempo", desc: "Leadership d'avanguardia, pianificazione temporale efficace, formulazione di programmi strategici." },
    { num: 22, cat: "Sintonia", title: "Corsi di comunicazione e relazioni interpersonali", desc: "Risoluzione dei conflitti, tecniche di negoziazione commerciale strutturata, dialettica e argomentazione." },
    { num: 23, cat: "Health", title: "Corsi di salute e benessere corporeo", desc: "Educazione alimentare e nutrizionale, strategie di allenamento e ritmi bioenergetici." },
    { num: 24, cat: "Interior", title: "Corsi di design e architettura d'interni", desc: "Arredamento d'interni, decorazione artistica integrata, bioarchitettura ecosostenibile." },
    { num: 25, cat: "Agile", title: "Corsi di gestione del progetto e del team", desc: "Metodologie agili, lavoro di squadra e dinamiche di collaborazione interfunzionale." },
    { num: 26, cat: "Muto", title: "Corsi di lingua dei segni", desc: "Lingua dei segni nazionale, internazionale e tecniche di mimica mimico-gestuale." },
    { num: 27, cat: "Tech", title: "Corsi di scrittura tecnica e scientifica", desc: "Redazione e redazione di tesi, dispense scientifiche, manuali tecnici per brevettiindustriali." },
    { num: 28, cat: "Brand", title: "Corsi di storytelling e narrazione per il marketing", desc: "Campagne di marketing narrativo e metodologie di persuasione etica commerciale." },
    { num: 29, cat: "Donna", title: "Corsi di leadership femminile", desc: "Empowerment, programmi di mentoring al femminile e alleanza di genere." },
    { num: 30, cat: "Gaming", title: "Corsi di sviluppo di app e giochi", desc: "Programmazione di app industriali, animazione tridimensionale e logiche di gaming didattico." },
    { num: 31, cat: "Ritrattistica", title: "Corsi di ritrattismo e paesaggio", desc: "Focalizzazione su fotografia analogica di reportage e ritratto d'ispirazione psicologica." },
    { num: 32, cat: "SEO", title: "Corsi di marketing sui motori di ricerca", desc: "Posizionamento organico SEO, campagne di email marketing, social media management." },
    { num: 33, cat: "Programming", title: "Corsi di programmazione e sviluppo web", desc: "Acquisizione di logiche di programmazione procedurale ed ereditarietà ad oggetti." },
    { num: 34, cat: "E-Store", title: "Corsi di commercio elettronico (E-commerce)", desc: "Creazione e gestione autonoma di canali distributivi d'impresa digitale ed e-shop." },
    { num: 35, cat: "Risorse", title: "Corsi di management d'impresa", desc: "Gestione strategica delle risorse umane, pianificazione finanziaria, controllo di gestione integrato." },
    { num: 36, cat: "Decorazione", title: "Corsi di decorazione e pasticceria", desc: "Pasticceria artistica e composizioni alimentari d'alto impatto visivo." },
    { num: 37, cat: "Pilates", title: "Corsi di ginnastica posturale e pilates", desc: "Ginnastica posturale per il riequilibrio muscolare e l'armonizzazione corporea." },
    { num: 38, cat: "Artigianato", title: "Corsi di artigianato artistico ceramico", desc: "Lavorazione manuale di argille naturali, creazioni in ceramica smaltata e manufatti d'argilla." },
    { num: 39, cat: "Positive", title: "Corsi di psicologia cognitiva positiva", desc: "Sviluppo di abitudini virtuose per il miglioramento dell'autosufficienza emotiva." },
    { num: 40, cat: "Web3", title: "Corsi di tecnologie Blockchain", desc: "Criptovalute storiche, nodi distribuiti di consenso, smart-contracts e sicurezza di reti decentrate." }
  ];

  // Elenco dei 13 documentari e rassegne video in cineteca
  const videoCineteca = [
    { num: 1, title: 'Introduzione Fondazione AIC', dur: '01:01', type: 'Istituzionale', url: 'https://www.dailymotion.com/video/k6T91DLcc7whw6zikJA', desc: 'Creazione e scrittura integrale di Luca Falace. Video di presentazione rapido con testo registrato.' },
    { num: 2, title: 'Presentazione Video Integrale Progetto & Team', dur: '11:54', type: 'Istituzionale', url: 'https://www.dailymotion.com/video/kmfcgQFhTzO9ThzikRt', desc: 'Presentazione estesa del business plan, delle competenze originarie dei soci e del modello d\'imposta culturale.' },
    { num: 3, title: 'Presentazione Fondazione AIC - Lingua Inglese', dur: '02:09', type: 'Internazionale', url: 'https://www.dailymotion.com/video/k5gEJiPeQqgFk1zGJZI', desc: 'Documentario tradotto in inglese rivolto ad investitori e curatori esteri, focalizzato sul Sincronismo Creativo.' },
    { num: 4, title: 'Fondazione AIC: I Fondamenti dello Statuto', dur: '03:03', type: 'Istituzionale', url: '#', desc: 'Esposizione schematica e doppiata di tutti i principali articoli regolamentari concordati notarilmente.' },
    { num: 5, title: 'Presentazione Fondazione Culturale delle Arti e Scienze', dur: '07:00', type: 'Culturale', url: 'https://www.dailymotion.com/video/k5FehPv1i3unw8zLJaj', desc: 'Videoregistrazione storiografica sulle scienze unite, le specialità dell\'ingegno e i modelli di estro artistico.' },
    { num: 6, title: 'Introduzione alle Capacità Intellettive', dur: '05:42', type: 'Teorico', url: 'https://www.dailymotion.com/video/k7fmPbGaSu9LCizilbO', desc: 'Analisi filosofica sulle capacità latenti dell\'emisfero cerebrale destro e sull\'attivazione di ritmi intensi.' },
    { num: 7, title: 'Zen: La Concentrazione dell\'Attimo Presente', dur: '12:37', type: 'Filosofico', url: 'https://www.dailymotion.com/video/k5rVSKJMu5qBIHzCQDh', desc: 'Viaggio meditativo sul tempo soggettivo, la percezione non lineare e lo stato di estasi creativa.' },
    { num: 8, title: 'La Gestione del Bene', dur: '10:00', type: 'Socio-Culturale', url: 'https://www.dailymotion.com/video/k3miaoBUJ8ss8DAkcVo', desc: 'Documentario storiografico redatto e montato da Luca Falace sulla conservazione di beni archivistici storici.' },
    { num: 9, title: 'Film Documentario AIC (Edizione Integrale)', dur: '45:05', type: 'Film Documentario', url: 'https://www.dailymotion.com/video/k5v5SZtpFs5hQYzjfZw', desc: 'Il film capolavoro sul Sincronismo Creativo, l\'intersezione con la Meccanica Quantistica e la fisica contemporanea.' },
    { num: 10, title: 'Energia, Frequenza, Vibrazione', dur: '16:20', type: 'Scientifico', url: 'https://dai.ly/k25oLkks4qgPXSzilkD', desc: 'Rielaborazione originale dei concetti di Tesla e delle frequenze hertziane applicate alla rigenerazione cellulare.' },
    { num: 11, title: 'THE GATEWAY - Documenti CIA di Sincronicità', dur: '17:36', type: 'Informativo', url: 'https://dai.ly/kiPSToRUuwuAT3zj6yx', desc: 'Analisi investigativa strutturata dei documenti declassificati della CIA relativi alla sincronizzazione emisferica.' },
    { num: 12, title: 'The Secret of the Pineal Gland', dur: '23:22', type: 'Ermetico', url: 'https://dai.ly/k1miMvX7YkJGTVzjesS', desc: 'Il segreto della Ghiandola Pineale analizzato sotto il profilo antropologico, chimico e delle filosofie orientali.' },
    { num: 13, title: 'Sintesi Quantistica & Manifestazione', dur: '14:30', type: 'Scientifico', url: 'https://dai.ly/k18pyexHR3f4mPzHqfL', desc: 'Modello riassuntivo che allinea vibrazione cerebrale, frequenza affettiva e l\'intenzione di sblocco d\'obiettivi.' }
  ];

  // Le sezioni d'archivio principali basate su tutto il codice XML
  const archiveSections: ArchiveSection[] = [
    {
      id: 'benvenuto',
      title: 'DOCUMENTI ATTO E STATUTO - BUSINESS MODEL',
      subtitle: 'Benvenuto sul nostro Sito Privato della Fondazione Culturale AIC',
      icon: <Info className="w-5 h-5" />,
      category: 'fondativi',
      content: (
        <div className="space-y-6 font-sans">
          <div className="bg-blue-50/50 border-l-4 border-[#0066CC] p-4 text-xs text-slate-800 leading-relaxed font-sans">
            <p className="font-serif italic font-bold text-sm mb-1 text-black font-semibold text-black">Lettore Atto Costitutivo & Social Business Model</p>
            Sfoglia di seguito il volume registrato del <strong>Progetto di Sviluppo della Fondazione AIC</strong>. Usa le frecce per cambiare pagina o l'indice laterale per navigare tra i capitoli.
          </div>

          {/* Interactive Document Player for Sviluppo */}
          <AicDocPlayer documentId="sviluppo" />

          <div className="space-y-4">
            <h4 className="font-serif font-black uppercase text-sm tracking-wider text-black">Principi Fondanti di AIC (6 Punti Chiave)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { num: 1, title: 'Rispetto della Natura', desc: 'L’amore ed il rispetto verso la natura e tutti gli esseri viventi.' },
                { num: 2, title: 'Libertà e Fratellanza', desc: 'La libertà, il rispetto e la fratellanza tra gli uomini e le rispettive tradizioni popolari.' },
                { num: 3, title: 'Ricerca della Conoscenza', desc: 'La ricerca della conoscenza attraverso il continuo studio.' },
                { num: 4, title: 'Pensiero Creativo Infinito', desc: 'Il pensiero creativo intellettuale in tutte le sue infinite forme e tradizioni culturali.' },
                { num: 5, title: 'Valorizzazione a Scopo Benefico', desc: 'La valorizzazione del pensiero creativo a scopo benefico per l’evoluzione ed il benessere dell’uomo.' },
                { num: 6, title: 'Supporto Sociale Attivo', desc: 'L’apporto ed il sostegno a tutti gli esseri che creano il bene e la felicità della comunità.' }
              ].map(point => (
                <div key={point.num} className="border border-slate-200 p-4 relative bg-slate-50/50">
                  <span className="absolute top-2 right-3 font-mono font-black text-rose-500/20 text-xl">0{point.num}</span>
                  <strong className="text-xs text-black block mb-1 font-serif uppercase tracking-wide">{point.title}</strong>
                  <p className="text-xs text-slate-600 leading-snug">{point.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 p-5 bg-white">
            <h4 className="font-serif font-bold text-sm text-[#0066CC] uppercase mb-2">Social Model & Non Profit</h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              La Fondazione si occupa della tutela, della formazione, della promozione delle Attività Creative Intellettuali, principalmente nei settori delle Arti e delle Scienze. Essa non ha scopo di lucro e non può distribuire utili; è apolitica ed apartitica. Rifiuta discriminazioni di sesso, etnia, lingua e religione. La sede in futuro potrà istituire questa e altre sezioni secondarie su tutto il territorio nazionale ed estero.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'sintesi_progetto_originario',
      title: 'SINTESI PROGETTO ORIGINARIO (VOLUME III)',
      subtitle: 'Il testo originale riassunto del vecchio progetto originario (Pagg. 102 - 124 Integrali)',
      icon: <BookOpen className="w-5 h-5 text-amber-700" />,
      category: 'fondativi',
      content: (
        <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="border-l-4 border-amber-600 bg-amber-50 p-4 text-slate-900">
            <strong className="font-serif uppercase text-amber-950 tracking-wider text-xs block mb-1">COMPENDIO COMPLETO DEL PROGETTO ORIGINARIO (SINTESI)</strong>
            <p className="italic leading-normal text-[11.5px]">
              Questo volume rappresenta la sintesi integrale del faldone originario con tutte le rielaborazioni, l'esperienza virtuale del ventennio, i registri del Ministero ed i depositi SIAE 2005. Contiene il compendio completo del Sincronismo Creativo e le attitudini di impresa.
            </p>
          </div>

          <div className="bg-blue-50/50 border-l-4 border-[#0066CC] p-4 text-xs text-slate-850 leading-relaxed font-sans">
            <p className="font-serif italic font-bold text-sm mb-1 text-black font-semibold text-black">Lettore del compendio storiografico (Pagg. 102 - 124 in pdf sfogliabile)</p>
            Sfoglia di seguito le pagine registrate del manoscritto originale. Puoi navigare tra i capitoli usando l'indice o caricare il PDF integrale.
          </div>

          <AicDocPlayer documentId="sintesi" />
        </div>
      )
    },
    {
      id: 'libro_notaio',
      title: 'IL LIBRO DEPOSITATO DAL NOTAIO (PRE-ATTO)',
      subtitle: 'La stesura originale fondante dell\'opera stesa da Luca Falace depositata prima delle firme (127 Pagg.)',
      icon: <BookOpen className="w-5 h-5 text-rose-700" />,
      category: 'fondativi',
      content: (
        <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="border-l-4 border-rose-600 bg-rose-50 p-4 text-slate-900">
            <strong className="font-serif uppercase text-rose-950 tracking-wider text-xs block mb-1">ATTO INTEGRALE DELLA FONDAZIONE AIC - 127 PAGINE</strong>
            <p className="italic leading-normal text-[11.5px]">
              Questo è il vero documento originale costitutivo di 127 pagine redatto personalmente dal Dott. Luca Falace e depositato ufficialmente prima della stipula pubblica. Costituisce la base legale, statutaria e teorica di tutto il compendio "Arti e Scienze".
            </p>
          </div>

          <div className="bg-emerald-50/50 border-l-4 border-emerald-600 p-4 text-xs text-slate-850 leading-relaxed font-sans">
            <p className="font-serif italic font-bold text-sm mb-1 text-black font-semibold text-black">Lettore Immersivo Atto Notarile (Visualizzatore PDF Ufficiale attivo)</p>
            Sfoglia l'Atto originale della Fondazione. Per attivare l'intera scansione di 127 pagine e sfogliarla pagina per pagina ad alta fedeltà, carichi il file PDF nativo cliccando su "Carica PDF Vero" sul pannello a comparsa.
          </div>

          <AicDocPlayer documentId="notaio" />
        </div>
      )
    },
    {
      id: 'progetto_sede',
      title: 'PROGETTO SEDE & LAYOUT INTERNI 3D',
      subtitle: 'Raffigurazione degli interni e rendering 3D delle sale di studio della Fondazione',
      icon: <Layers className="w-5 h-5" />,
      category: 'fondativi',
      content: (
        <div className="space-y-6 font-sans">
          <div className="bg-blue-50/50 border-l-4 border-[#0066CC] p-4 text-xs text-slate-800 leading-relaxed font-sans">
            <p className="font-serif italic font-bold text-sm mb-1 text-black font-semibold text-black">Lettore Planimetria, Interni ed Estetici della Sede</p>
            Sfoglia di seguito la documentazione architetturale con planimetrie in parquet ed illuminazione a LED del <strong>Progetto Sede AIC</strong> ideata dal Dott. Luca Falace.
          </div>

          {/* Interactive Document Player for Sede */}
          <AicDocPlayer documentId="sede" />
        </div>
      )
    },
    {
      id: 'origini',
      title: 'LE ORIGINI E IL SINCRONISMO CREATIVO',
      subtitle: 'Il superamento attivo della Sincronicità di Carl Gustav Jung',
      icon: <Brain className="w-5 h-5" />,
      category: 'teoria',
      content: (
        <div className="space-y-6">
          <div className="font-serif text-sm text-slate-800 leading-relaxed space-y-4">
            <p>
              La sincronicità, come descritta da Jung, si concentra sulla coincidenza di eventi significativi che sembrano non avere una causa diretta ma che, al contrario, sono uniti da un significato simbolico. Tuttavia, Jung non ha avuto il tempo o la possibilità di espandere completamente la sua teoria, soprattutto in relazione a come questi eventi sincronici possano essere attivati o influenzati.
            </p>
            <p className="border-l-4 border-[#0066CC] pl-4 italic text-black font-semibold bg-blue-50/20 p-2">
              Il Sincronismo Creativo si configura come un passo successivo e propedeutico alla teoria junghiana, ampliando la sincronicità in un contesto attivo: l'individuo, attraverso l'attivazione della propria creatività e l'uso conscio delle Attività Intellettive Creative (AIC), partecipa alla manifestazione cosciente degli eventi significativi.
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-100 pt-4">
            <h4 className="font-mono font-bold text-xs uppercase text-[#0066CC]">I 5 Principi Cardinali del Metodo Sincronico</h4>
            <div className="space-y-3.5">
              {[
                { title: '1. Osservazione e Documentazione', desc: 'Registrazione sistematica degli eventi paralleli personali per riconoscere gli schemi e comprendere la comunicazione simbolica dell\'universo.' },
                { title: '2. Consapevolezza Creativa', desc: 'I rulli energetici dell\'intelletto. La creatività vista come una vibrazione emotiva profonda in grado di interferire positivamente con la materia.' },
                { title: '3. Armonizzazione con l\'Energia Celeste', desc: 'Rielaborazione delle filosofie orientali del Chi o Prana. Sintonizzazione della propria frequenza vibrante con il ritmo celeste.' },
                { title: '4. Integrazione Psiche, Fisica e Metafisica', desc: 'Coniugare la Teoria della Relatività e la Meccanica Quantistica con la spiritualità estatica, spiegando le non-linearità del tempo.' },
                { title: '5. Applicazione Pratica', desc: 'Vedere e vivere le coincidenze non come casi fortuiti, ma come indicazioni oggettive d\'armonizzazione e direzione esistenziale.' }
              ].map((p, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border-l-2 border-slate-400">
                  <strong className="text-xs font-serif text-black block mb-0.5">{p.title}</strong>
                  <p className="text-xs text-slate-600 leading-normal">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'statuto_atto',
      title: 'ESTRATTI ATTO NOTARILE & STATUTO',
      subtitle: 'La stesura ufficiale del settembre 2024 registrata presso il Notaio',
      icon: <Scale className="w-5 h-5" />,
      category: 'documenti',
      content: (
        <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="bg-rose-50/50 p-4 border border-rose-100 text-slate-900 space-y-2">
            <strong className="font-serif block text-rose-800 uppercase tracking-wide text-xs">Clausola di Presidenza Onoraria a Vita (Articolo 20)</strong>
            <p className="font-serif italic font-semibold text-[13px] leading-relaxed">
              "La presidenza onoraria della Fondazione è conferita al Dott. Luca Falace sua vita natural durante e senza altro adempimento da operarsi, per l'iniziativa, l'impegno, la divulgazione del Metodo del 'Sincronismo Creativo' di cui è ideatore nonché la dedizione sin dalla sua istituzione (Pagina 16 dello Statuto)."
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-black uppercase tracking-wider text-black border-b pb-1 text-[11px]">Estratti Ufficiali dell'Articolo 2 (Atto Costitutivo)</h4>
            <p>
              "La Fondazione si occupa della tutela, della formazione, della promozione delle Attività Creative Intellettuali; inerenti principalmente i settori delle Arti e delle Scienze... con esclusione di qualsiasi finalità di lucro, ha come oggetto la promozione e la diffusione di idee innovative nel settore umanistico e scientifico..."
            </p>
            <p>
              "La Fondazione ha per scopo quello di attuare iniziative del più alto interesse sociale inerenti il 'Pensiero Creativo Intellettivo ed Intellettuale', in tutte le sue forme al fine di esaltare le attività intellettuali artistiche tutelabili con il diritto d'autore, la proprietà intellettuale ed industriale, comprendente anche idee innovative brevettabili."
            </p>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 border border-slate-200">
            <span className="font-mono text-[9px] text-[#0066CC] uppercase font-black block">Amministrazione e Patrimonio (Articolo 4)</span>
            <p className="text-[11px] leading-snug">
              Il patrimonio della Fondazione, comprensivo di eventuali ricavi, rendite, proventi, entrate comunque denominate, è utilizzato per lo svolgimento dell'attività statutaria ai fini dell'esclusivo perseguimento delle finalità solidaristiche, civiche e di utilità sociale. Custodito per fini accademici ed amministrativi separati.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'didattica',
      title: 'LE ATTIVITÀ DIDATTICHE E ACCADEMICHE',
      subtitle: 'Il Manifesto dei 40 Corsi Formativi descritto nello Statuto',
      icon: <GraduationCap className="w-5 h-5" />,
      category: 'documenti',
      content: (
        <div className="space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Come definito originariamente dallo Statuto dell'Atto Costitutivo Notarile (Articolo 3), la Fondazione si proponeva come centro di eccellenza per l'insegnamento alternativo. Sfoglia il piano di studi ed il checkpoint d'aula per l'ascolto dei giovani:
          </p>

          {/* Interactive Document Player for Corsi di Formazione */}
          <AicDocPlayer documentId="corsi" />

          <div className="border border-slate-200 bg-white p-4">
            <h5 className="font-serif font-bold text-sm mb-3">Tutti i 40 Corsi Formativi Ufficiali dallo Statuto</h5>
            <div className="max-h-[380px] overflow-y-auto bg-slate-50 divide-y divide-slate-100 pr-2 scrollbar-thin">
              {corsiDidattici.map(corso => (
                <div key={corso.num} className="p-3 hover:bg-white transition-colors flex items-start gap-2.5">
                  <span className="font-mono font-black text-rose-500 text-[10px] w-6 shrink-0 text-right mt-0.5">#{corso.num}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <strong className="text-xs text-black font-semibold">{corso.title}</strong>
                      <span className="text-[8px] font-mono font-black bg-blue-100 text-blue-700 px-1.5 py-0.25 rounded uppercase">
                        {corso.cat}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-sans">{corso.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-400 block text-right font-black uppercase">
            REGOLAMENTO D'ISCRIZIONE ANNO 24 • CONVENZIONE MINISTERO RICERCA SCIENTIFICA
          </span>
        </div>
      )
    },
    {
      id: 'cineteca',
      title: 'CINETECA PRIVATA & DOCUMENTARI',
      subtitle: 'Registro Storico di 13 Video e rassegne originali di Luca Falace',
      icon: <Video className="w-5 h-5" />,
      category: 'media',
      content: (
        <div className="space-y-6">
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            La videoteca privata della vecchia Fondazione AIC conteneva documentari dedicati alla focalizzazione energetica, al benessere, e al Sincronismo Creativo. Moliti di questi documentari combinavano creazioni originali con rielaborazioni creative di estratti rilevanti:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videoCineteca.map(video => (
              <div key={video.num} className="border border-slate-200 bg-white p-4 flex flex-col justify-between hover:border-slate-400 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#0066CC] font-black uppercase bg-blue-50 px-2 py-0.5 rounded">
                      Cap. {video.num} • {video.type}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">{video.dur} min</span>
                  </div>
                  <h5 className="font-serif font-bold text-xs text-black leading-tight">{video.title}</h5>
                  <p className="text-[10.5px] text-slate-500 leading-snug font-sans">{video.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400 uppercase">Dailymotion Media</span>
                  {video.url !== '#' ? (
                    <button 
                      onClick={() => handleExternalLink(video.url)}
                      className="text-[10px] font-mono font-black text-[#0066CC] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Vedi Video</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  ) : (
                    <span className="text-[9.5px] font-mono text-slate-350 italic">Contenuto d'Arsenale</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'membri',
      title: 'IL REGISTRO DEI MEMBRI DELLA FONDAZIONE',
      subtitle: 'Il coordinamento attivo di oltre 100 associati del 2023-2024',
      icon: <Users className="w-5 h-5" />,
      category: 'fondativi',
      content: (
        <div className="space-y-4 text-xs leading-relaxed font-sans">
          <p>
            Nel corso delle fasi preparatorie del 2023, la <strong>Fondazione AIC</strong> ha coordinato un club di circa 110-130 amici e sostenitori. Questo coordinamento avveniva attraverso una chat whatsapp denominata <strong>"Gli Amici della Fondazione AIC"</strong>, con un tasso di attività e riscontro elevato.
          </p>

          <div className="border border-slate-200 bg-slate-50 p-4 space-y-3.5">
            <span className="font-mono text-[9px] text-[#0066CC] uppercase font-black block">Messaggio d'Archivio per gli Amici d'AIC (20 Luglio 2023)</span>
            <p className="font-serif italic text-slate-800 leading-normal">
              "Cari 110 amici della Fondazione AIC, siamo entusiasti di condividere con voi una serie speciale di documentari dedicati alle capacità intellettive creative del cervello. Come sapete, la Fondazione AIC, il nostro prezioso acronimo per Attività Intellettive Creative, promuove l'apertura della mente e il potenziamento della creatività. Proprio per questo motivo, ho creato personalmente questi documentari per intrattenervi e ispirarvi. Buona visione. Luca"
            </p>
          </div>

          <div className="p-4 border border-rose-100 bg-rose-50/25 space-y-2">
            <strong className="block text-[11px] text-rose-800 font-serif uppercase tracking-wide">Elenco Registrazioni Video Gruppo:</strong>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
              <li>Registrazione video membri attivi dal mese di marzo 2023 ad oggi (`YouCut_20230724_143143580.mp4`).</li>
              <li>Sintesi ed elenco dei candidati sostenitori della Fondazione aggiornato al 24 Luglio 2023 (`YouCut_20230724_150317429.mp4`).</li>
              <li>Presentazione in chat del clip curato per mostre interne (`FONDAZIONE-AIC-MEMBRI-GRUPPO-online-video-cutter.com_.mp4`).</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'patrimonio',
      title: 'IL PATRIMONIO FONDATIVO & PERIZIE stima',
      subtitle: 'La classificazione del fondo artistico stimato e depositato',
      icon: <Database className="w-5 h-5" />,
      category: 'fondativi',
      content: !isPatrimonioUnlocked ? (
        <div className="bg-slate-50 border border-slate-200 p-8 text-center space-y-6 max-w-xl mx-auto my-4">
          <div className="w-14 h-14 bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center rounded-full mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-sm tracking-wide text-black uppercase">Sezione Protetta da Password</h4>
            <p className="text-[11px] text-slate-500 font-sans max-w-sm mx-auto">
              I dati del Patrimonio Fondativo & Perizie di Stima della Fondazione AIC sono ad accesso riservato. Inserisci la chiave autorizzativa per sbloccare.
            </p>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (patrimonioPasswordInput === 'Graalgraal888') {
                setIsPatrimonioUnlocked(true);
                setPatrimonioPasswordError('');
              } else {
                setPatrimonioPasswordError('Password non corretta. Controlla le chiavi dell\'archivio.');
              }
            }}
            className="space-y-3 max-w-xs mx-auto text-left"
          >
            <div className="relative">
              <input
                type={showPatrimonioPassword ? 'text' : 'password'}
                placeholder="Inserisci password d'accesso..."
                value={patrimonioPasswordInput}
                onChange={(e) => setPatrimonioPasswordInput(e.target.value)}
                className="w-full pl-3 pr-9 py-2 border border-slate-350 text-xs rounded-none bg-white text-black font-sans focus:outline-none focus:border-rose-500"
              />
              <button
                type="button"
                onClick={() => setShowPatrimonioPassword(!showPatrimonioPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                {showPatrimonioPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {patrimonioPasswordError && (
              <p className="text-[10px] text-rose-600 font-mono italic leading-none">{patrimonioPasswordError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-[#0066CC] hover:bg-blue-700 text-white py-2 text-xs font-mono font-bold tracking-wider cursor-pointer transition-colors"
            >
              SBLOCCA DATI PATRIMONIO
            </button>
          </form>
          <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest pt-2">
            RILASCIO CONGIUNTO NOTARILE — ATTO RISERVATO
          </div>
        </div>
      ) : (
        <div className="space-y-5 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="bg-emerald-50 border border-emerald-250 text-emerald-800 p-3 flex items-center gap-2 mb-2 font-mono text-[11px]">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Sezione Patrimonio Sbloccata con Successo (Autorizzata)</span>
          </div>

          <p>
            Il <strong>Patrimonio Fondativo</strong> rappresenta il fondo costituito al momento della stipula notarile per garantire gli scopi sociali della fondazione. Nel caso di AIC, tale patrimonio includeva una cospicua stima di beni artistici e intellettuali depositati, valutati professionalmente:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { doc: 'Luca Falace Perizia di Stima', spec: 'Di Opere d\'Arte', size: '7.5 MB', desc: 'Valutazione delle principali 151 opere pittoriche, sculture e manoscritti catalogati.' },
              { doc: 'Cesare Molinaro Perizia di Stima', spec: 'Opera d\'Arte', size: '1.6 MB', desc: 'Certificato di perizia svolto per l\'inclusione d\'un quadro fondativo nel fondo vincolato.' },
              { doc: 'Fabio Perricone Perizia di Stima', spec: 'Di Opere d\'Armi/Arte', size: '4.5 MB', desc: 'Dichiarazione ufficiale ed autenticata di stima patrimoniale per requisiti UIBM notarili.' }
            ].map((p, idx) => (
              <div key={idx} className="border border-slate-200 bg-white p-4 hover:bg-slate-50/50 transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[#0066CC] mb-1.5">
                    <FileText className="w-4 h-4 shrink-0" />
                    <strong className="font-serif text-black font-black text-xs block">{p.doc}</strong>
                  </div>
                  <span className="font-mono text-[9px] text-slate-400 block mb-2">{p.spec} — {p.size}</span>
                  <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                </div>
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between mt-4">
                  <span className="text-[9px] font-mono uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.25">Vincolato ✅</span>
                  <span className="text-[10px] font-mono text-slate-400 italic">Lettera d'Atto Notarile</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 font-serif italic text-slate-600">
            "SOCIAL BUSINESS – Rielaborazione del progetto già in essere di una Fondazione dei Beni Culturali, inerenti le attività didattiche e formative, nei riguardi di materie artistiche e scientifiche per quanto concerne il patrimonio culturale. Ideazione e Progetto Dott. Luca Falace. Dottore in Conservazione dei Beni Culturali."
          </div>
        </div>
      )
    },
    {
      id: 'libro',
      title: 'IL LIBRO - SINCRONISMO CREATIVO',
      subtitle: 'Il Manifesto Cartaceo d\'Insegnamento del Metodo (487 Pagine)',
      icon: <BookOpen className="w-5 h-5" />,
      category: 'teoria',
      content: (
        <div className="space-y-6">
          <div className="md:flex gap-6 items-start">
            <div className="w-full md:w-36 bg-slate-100 border border-slate-300 p-4 aspect-[2/3] shrink-0 flex flex-col justify-between relative shadow-inner overflow-hidden mb-4 md:mb-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#0066CC]" />
              <div className="space-y-1">
                <span className="text-[8px] font-mono uppercase tracking-widest text-[#0066CC] font-bold">Luca Falace</span>
                <h6 className="font-serif font-bold text-[10px] text-black leading-tight uppercase">Sincronismo Creativo: Il Metodo</h6>
              </div>
              <div className="text-right">
                <span className="text-[7.5px] font-mono text-slate-400 block">ISBN 9798302547934</span>
                <span className="text-[9px] font-serif italic text-rose-600">487 Pagine</span>
              </div>
            </div>

            <div className="space-y-4 font-sans text-xs">
              <h5 className="font-serif text-sm text-black font-black uppercase">SINCRONISMO CREATIVO: IL METODO. ARCHETIPI, SIMBOLI, SINCRONICITÀ</h5>
              <p className="text-slate-600 leading-relaxed font-sans">
                Il <strong>Sincronismo Creativo</strong> non è solo una teoria, ma un metodo pratico sviluppato da Luca Falace dal 2005 al 2025. Una rivoluzionaria scoperta che collega la mente, le neuroscienze, la biologia molecolare e le sincronicità, trasformando il nostro modo di interagire con la realtà. Registrato presso l’O.L.A.F. e al Ministero dei Beni Culturali, è inserito anche in autorevoli bibliografie nazionali ed estere sulla sincronicità junghiana.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                <button 
                  onClick={() => handleExternalLink('https://amzn.eu/d/h0R2Arz')}
                  className="p-3 bg-white border border-slate-200 hover:border-[#0066CC] text-left cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-[8px] font-mono text-[#0066CC] block uppercase font-bold">Spedizione Fisica</span>
                    <strong className="text-xs text-black block">Libro Cartaceo su Amazon</strong>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>

                <button 
                  onClick={() => handleExternalLink('https://payhip.com/b/5zMOE')}
                  className="p-3 bg-white border border-slate-200 hover:border-emerald-600 text-left cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <span className="text-[8px] font-mono text-emerald-600 block uppercase font-bold">Download Digitale</span>
                    <strong className="text-xs text-black block">Ebook (Formato PDF)</strong>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'club_genius',
      title: 'IL CLUB GENIUS',
      subtitle: 'Integrazione delle Teorie di Howard Gardner ed E. Paul Torrance',
      icon: <Award className="w-5 h-5" />,
      category: 'teoria',
      content: (
        <div className="space-y-5 text-xs inline-block text-slate-800 leading-relaxed font-sans w-full">
          <p>
            Il <strong>Club Genius</strong> rappresentava un’innovativa iniziativa all’interno della vecchia Fondazione AIC creata da Luca Falace, volta alla valorizzazione dei talenti e delle eccellenze intellettuali e creative senza alcuna discriminazione selettiva o di quoziente intellettivo (QI).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 p-4 bg-white">
              <strong className="font-serif text-black uppercase tracking-wide text-xs mb-2 block border-b pb-1.5 text-[#0066CC]">
                Silvio Ceccato & Howard Gardner (8 Intelligenze)
              </strong>
              <p className="text-[11px] text-slate-600 leading-relaxed mb-3">
                Identificazione sistemica delle intelligenze predominanti di ciascun membro secondo le Otto Intelligenze della psicologia cognitiva:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['Linguistica', 'Logico-Matematica', 'Spaziale', 'Musicale', 'Corporea-Cinestetica', 'Interpersonale', 'Intrapersonale', 'Naturalistica'].map(el => (
                  <span key={el} className="text-[8.5px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 border border-slate-200">
                    {el}
                  </span>
                ))}
              </div>
            </div>

            <div className="border border-slate-200 p-4 bg-white">
              <strong className="font-serif text-black uppercase tracking-wide text-xs mb-2 block border-b pb-1.5 text-[#0066CC]">
                E. Paul Torrance (Intelligenza Creativa)
              </strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Misurazione e stimolazione del <strong>pensiero divergente</strong>. I membri affrontavano test grafici e intuitivi per analizzare la risonanza del loro estro rispetto alle coincidenze parallele della vita, ottenendo una certificazione finale d'eccellenza.
              </p>
              <div className="bg-emerald-50 border border-emerald-100 p-2 text-[10px] text-emerald-800 mt-3 font-serif italic">
                La creatività non è solo un dono astratto: può essere misurata, certificata e incanalata!
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'proprieta',
      title: 'PROPRIETÀ INTELLETTUALE & COPYRIGHT',
      subtitle: 'Precisazioni legali a tutela delle scoperte storiche di Luca Falace',
      icon: <ShieldCheck className="w-5 h-5" />,
      category: 'documenti',
      content: (
        <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="border-l-4 border-rose-500 bg-rose-50 p-4 text-slate-900">
            <strong className="font-serif uppercase text-rose-900 tracking-wider text-xs block mb-1">Dichiarazione Esplicita di Esclusività Legale</strong>
            <p className="italic leading-normal text-[11.5px]">
              La proprietà intellettuale relativa al progetto della fondazione, comprese tutte le sue creazioni, come l’atto costitutivo, lo statuto, la teoria del Sincronismo Creativo, il nome della fondazione "AIC" (Attività Intellettive Creative), le relative creazioni grafiche, loghi ed editorie, è di <strong>esclusiva titolarità di Luca Falace</strong>. Tali diritti non sono stati ceduti a nessuno, nemmeno al momento della ratifica notarile del settembre 2024.
            </p>
          </div>

          <div className="bg-amber-50/50 border-l-4 border-amber-500 p-4 text-xs text-slate-850 leading-relaxed font-sans">
            <p className="font-serif italic font-bold text-sm mb-1 text-black font-semibold text-black">Lettore Volume d'Officina Notarile (124 Pagine Antologiche)</p>
            Sfoglia di seguito il volume cartaceo depositato a tutela delle scoperte scientifiche con registrazioni MIBAC, SIAE / OLAF e censimento di 142k utenti dell'iniziativa originaria <strong>L'Opera Celeste</strong>. Modifica le pagine usando i controlli in fondo.
          </div>

          {/* Interactive Document Player for Carteggio Storico & Copyright */}
          <AicDocPlayer documentId="carteggio" />

          <div className="space-y-3.5">
            <h4 className="font-serif font-black uppercase text-xs tracking-wider text-black">Le 5 Prove Inconfutabili di Paternità d'Opera (dal 2005)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {[
                { title: '1. Il carteggio email col Notaio', desc: 'Le email ed i manoscritti programmatici scambiati nel 2024 con l\'ufficio notarile confermano la stesura originaria dei documenti fondativi.' },
                { title: '2. Pubblicazioni su Pagine Web (2005)', desc: 'I link storici degli arsenalicreativi (sites.google.com/site/loperaceleste/) testimoniano la dicitura di Centro Culturale d\'Arte e Scienza prima di ogni altra fusione.' },
                { title: '3. Volume su Amazon (2017)', desc: 'La pubblicazione su Amazon del saggio di Social Business della Fondazione nel 2017 stabilisce una datazione antecedente e coperta da diritti esclusivi.' },
                { title: '4. Libro della Fondazione (2022)', desc: 'Un resoconto stampato di 490 pagine sull\'intero organigramma concordato ed i progetti in simulazione 3D registrati.' },
                { title: '5. Registrazione OLAF SIAE & Ministero', desc: 'La registrazione ufficiale eseguita nell\'anno 2005 presso l\'OLAF SIAE e nel 2007 presso il Ministero dei Beni Culturali, recanti il nome di Luca Falace.' }
              ].map((p, idx) => (
                <div key={idx} className="border border-slate-250 p-3 bg-white hover:border-slate-400 transition-all">
                  <strong className="text-black text-xs block font-serif mb-1">{p.title}</strong>
                  <p className="text-[11px] text-slate-500 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 bg-white p-4">
            <strong className="font-mono text-[#0066CC] uppercase text-[10px] tracking-widest block mb-2 font-black">Restrizioni d'Uso della Proprietà Intellettuale:</strong>
            <p className="text-[11px] leading-relaxed text-slate-700">
              L’uso non autorizzato di materiale protetto da diritti di proprietà intellettuale di Luca Falace, da parte di chiunque (compresi i soci fondatori o chi ricopre cariche ufficiali all'interno dell'ente), costituisce violazione delle leggi sul copyright e sui diritti d'autore. Senza un accordo scritto formale di delega, l’uso del nome "AIC", dei loghi originari, della teoria e dei manoscritti è severamente interdetto.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'genesi',
      title: 'GENESI DELLA FONDAZIONE & LE RADICI DI UN SOGNO',
      subtitle: 'La Famiglia Falace, Lucio e Paolo Falace, Ecomondo e Shark Tank',
      icon: <History className="w-5 h-5" />,
      category: 'fondativi',
      content: (
        <div className="space-y-6 text-xs text-slate-800 leading-relaxed font-sans">
          <div className="md:flex gap-6 items-center">
            <div className="border border-slate-200 p-4 bg-slate-50 space-y-2 shrink-0 md:w-64 w-full">
              <span className="font-mono text-[9px] text-rose-500 uppercase font-black block">Archivio Invenzioni Famigliari</span>
              <strong className="font-serif text-black uppercase tracking-wide text-xs block mb-1">Lucio Falace</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Mio padre, inventore e imprenditore d'alta tecnologia, inventò le iconiche lampade a risparmio energetico. Ho gestito personalmente la vendita del brevetto a investitori arabi a soli 28 anni in una complessa trattativa internazionale.
              </p>
              <strong className="font-serif text-black uppercase tracking-wide text-xs block mb-1">Paolo Falace (Zio)</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Notissimo attore teatrale e studioso di Shakesperiane estetiche. La sua propensione formò lo spirito filosofico e intellettuale di Luca Falace.
              </p>
            </div>

            <div className="space-y-3.5">
              <h5 className="font-serif text-sm text-black font-black uppercase">Successi Internazionali nella Green Economy (Luca Falace)</h5>
              <p className="text-slate-600 leading-relaxed">
                Unendo la precisione tecnologica di mio padre e la sensibilità artistica di mio zio, ho sviluppato numerosi brevetti. Nel 2014 ho vinto il prestigioso <strong>Premio Ecomondo</strong> con adesione del Presidente della Repubblica Giorgio Napolitano per il mio compattatore unico <strong>Geniusom</strong> per la gestione dei rifiuti.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nel 2015 ho vinto il format mondiale <strong>Shark Tank (prima serata su Italia 1, Mediaset)</strong>, ottenendo un investimento reale di <strong>$250.000</strong> per la prototipazione commerciale da Fabio Cannavale. Nel 2017 ho presentato il funzionamento del brevetto su <strong>RAI 2 (il programma "I Fatti Vostri" con Giancarlo Magalli)</strong> all'Ufficio Brevetti Nazionale.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Nel 2018 ho brevettato l'<strong>Eco-Tuta Termodinamica Asettica Climatizzata</strong>, donando ufficialmente l'invenzione e l'unione dei disegni brevettuali ad organizzazioni internazionali per l'isolamento asettico del personale medico operante nei primi periodi pandemici da COVID-19.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'sezioni_arte_scienza',
      title: 'RIPARTIZIONE ARTE, SCIENZA E DIVISIONI EDITORIALI',
      subtitle: 'Il catalogo delle 8 divisioni d\'ingegno del portale unificato',
      icon: <Layers className="w-5 h-5" />,
      category: 'documenti',
      content: (
        <div className="space-y-6 font-sans">
          <div className="bg-slate-50 border border-slate-200 p-4 text-xs text-slate-700 leading-relaxed rounded-none">
            <p className="font-serif italic font-bold text-sm mb-1 text-black font-semibold">Divisioni d'Ingegno del Portale Unificato (2022)</p>
            Il vecchio portale organizzava tutte le espressioni creative e scientifiche in otto macro-sezioni programmatiche (dalla A alla H) per garantire la catalogazione e la mediazione con il mercato:
          </div>

          <div className="space-y-4 divide-y divide-slate-100">
            <div className="pt-1">
              <strong className="text-xs text-[#0066CC] block mb-1">A &amp; B) Arti Figurative (Bidimensionali e Tridimensionali)</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Sezione Arte figurativa bidimensionale (A):</strong> Disegno e pittura manuale con varie tecniche (olio, acquerello, tempera, affresco, ecc.), pittura multimediale (digitale + manuale) e fotografia.<br />
                <strong>Sezione Arte figurativa tridimensionale (B):</strong> Scultura tradizionale (marmo, bronzo), tecniche incisorie manuali, scultura multimediale e installazioni contemporanee.<br />
                <span className="text-[11px] text-slate-400 block mt-1 font-mono">Vetrina di riferimento: larteintellettuale.blogspot.it</span>
              </p>
            </div>

            <div className="pt-4">
              <strong className="text-xs text-[#0066CC] block mb-1">C) Sezione Design &amp; Strutture</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Progettazione ed ingegnerizzazione estetica divisa in: <strong>C1)</strong> Design di oggetti di uso comune, <strong>C2)</strong> Design architettonico di città e strutture abitative, di lavoro o di svago, e <strong>C3)</strong> Design dei mezzi di trasporto (barche, aerei, automobili).
              </p>
            </div>

            <div className="pt-4">
              <strong className="text-xs text-[#0066CC] block mb-1">D) Sezione Libri ed Editoria Digitale</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Biblioteca virtuale con consultazione in formato PDF scaricabile: <strong>D) Biblioteca virtuale consulto in pdf scaricabile</strong>, <strong>D1)</strong> Creazioni nel settore letterario (romanzi, saggistica, racconti, poesie), e <strong>D2)</strong> Pubblicazione e promozione di interi libri di scrittori esordienti e affermati.<br />
                <span className="text-[11px] text-slate-400 block mt-1 font-mono">Servizi associati: lucafalace.altervista.org/manoscritti/</span>
              </p>
            </div>

            <div className="pt-4">
              <strong className="text-xs text-[#0066CC] block mb-1">E &amp; F) Musica, Spettacolo &amp; Regia</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>Sezione Spettacolo (E):</strong> Creazioni e interpretazioni nel settore della regia e dello spettacolo (E1: commedie teatrali e cinematografiche, E2: visione videoclip e corti, E3: danza e coreografie).<br />
                <strong>Sezione Musica (F):</strong> Testi di canzoni, melodie, sinfonie hertziane ed opere liriche (F1), ascolto e visione di brani ed editto-video musicali (F2).
              </p>
            </div>

            <div className="pt-4">
              <strong className="text-xs text-[#0066CC] block mb-1">G) Invenzioni, Marchi e Brevetti Scientifici</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Invenzioni nel campo delle tecnologie: <strong>G1)</strong> Invenzioni artistiche e scientifiche, <strong>G2)</strong> Scoperte e depositi di brevetti d'utilità, e <strong>G3)</strong> Invenzioni su fonti di energia alternativa (solare, eolica, marina, magnetica, elettrica) e tutela <strong>G4)</strong> di Brevetti e Marchi.<br />
                <span className="text-[11px] text-slate-400 block mt-1 font-mono">Brevetti storici di riferimento: GeniusOm Srls, Eco-Tuta Termodinamica</span>
              </p>
            </div>

            <div className="pt-4">
              <strong className="text-xs text-[#0066CC] block mb-1">H) Sezione Ricerca per il Benessere Collettivo</strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Benessere Materiale e Spirituale: <strong>H1)</strong> Tecniche del benessere e discipline filosofiche, <strong>H2)</strong> Innovazioni materiali (macchinari, idee tecniche), <strong>H3)</strong> Innovazioni mentali (musicoterapia, cromoterapia, yoga) e <strong>H4)</strong> Arti mediche, medicine unite e discipline olistiche.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'museo_portal_model',
      title: 'MUSEO VIRTUALE & MODALITÀ ECONOMICHE',
      subtitle: 'Il modello di polo museale interattivo e il sistema di accesso (2022)',
      icon: <Database className="w-5 h-5" />,
      category: 'teoria',
      content: (
        <div className="space-y-6 font-sans text-xs text-slate-705 leading-relaxed">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-none">
            <h4 className="font-serif font-bold text-sm mb-2 text-[#0066CC]">Il Polo Museale Interattivo</h4>
            <p className="leading-relaxed">
              L’obiettivo dell’iniziativa è creare un adeguato contenitore interattivo d’arte e invenzioni: un vero e proprio <strong>Museo Virtuale dell’Arte e della Scienza</strong>. Una struttura ordinata in base alle svariate attività culturali che incentiva una fruizione dinamica dei Beni Culturali, valorizzando il lavoro di artisti emergenti o già affermati e di inventori che faticano a insersi nei canali tradizionali.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 p-4 bg-white space-y-2">
              <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">La Struttura delle Sale</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <strong>Al Primo Piano:</strong> Dedicato alle opere dei giovani esordienti, autodidatti o studenti di Accademie e Conservatori, per agevolare l'apprendistato sociale gratuito.<br />
                <strong>Al Terzo Piano:</strong> Dedicato ai professionisti con anni di esposizioni sul territorio nazionale ed un collezionismo e critica accreditati.<br />
                Le opere sono custodite ed esposte con l'indicazione esatta di tecniche manuali ed usi digitali.
              </p>
            </div>

            <div className="border border-slate-200 p-4 bg-white space-y-2">
              <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">La Prova d'Esistenza (Data Certa)</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Il deposito delle opere all'interno del Museo ha carattere oneroso (quota temporanea). Al momento dell'iscrizione e del pagamento dello spazio, l'autore ottiene una <strong>prova dell'esistenza dell'opera con data certa</strong>. Questo attesta il diritto di priorità sull'opera inedita (letteraria, cinematografica, musicale o industriale) salvaguardandola da imitazioni.
              </p>
            </div>
          </div>

          <div className="border border-slate-200 p-4 bg-white space-y-2">
            <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">Modalità Economiche e Regolamento Password</strong>
            <p className="text-[11.5px] text-slate-600 leading-relaxed">
              Le risorse dell'associazione sono alimentate prevalentemente dalle quote associative regolate dalla redazione del portale. Il visitatore esterno, per consultare le mostre e l'antologia, riceve una <strong>tessera-password personale</strong> ad accessi scalabili (ad esempio: cento accessi con un contributo simbolico di 10 Euro). Tutto il ricavato viene reinvestito per la stampa annuale del catalogo generale e la manutenzione asettica della mediateca.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'etica_statuto',
      title: 'ETICA DEL PORTALE & STATUTO ORIGINARIO 2005',
      subtitle: 'I canali di rispetto emotivo e le vecchie regole del Centro L\'Opera Celeste',
      icon: <Scale className="w-5 h-5" />,
      category: 'documenti',
      content: (
        <div className="space-y-6 font-sans text-xs text-slate-705 leading-relaxed">
          <div className="bg-amber-50/50 border border-amber-200 p-4 rounded-none text-slate-800 font-serif leading-relaxed italic">
            <strong className="font-sans font-bold text-xs uppercase text-amber-900 not-italic block mb-1">Copyright d'Ingegno dal 2005</strong>
            "Tutto il materiale presente su questo sito è Registrato nell'anno 2005 presso L’O.l.a.f. e nel 2007 presso il Ministero dei Beni Culturali. Pertanto l'intero corpus è coperto da diritti d'autore esclusivi e non può essere replicato senza il consenso dell'autore Luca Falace."
          </div>

          <div className="space-y-4">
            <h4 className="font-serif font-black uppercase text-xs tracking-wider text-black border-b pb-1">Statuto Etico del Centro Culturale</h4>
            
            <div className="space-y-3">
              <p>
                <strong>1. Costituzione ed Apocrisia:</strong> Il Centro Arte &amp; Scienza "L'Opera Celeste", ideato, presieduto e fondato dal Dott. Luca Falace nel 2005, è un centro culturale virtuale privo di orientamenti politici o religiosi. Esso rifiuta discriminazioni, persegue scopi benefici per la collettività ed ha durata illimitata nel tempo.
              </p>
              <p>
                <strong>2. Il Marchio dell'Oro Alchemico:</strong> Il logo del centro (un cerchio con il simbolo chimico dell'Oro ed una dicitura in latino simboleggiante l'intelligenza e l'evoluzione della Grande Opera) rappresenta la purezza dell'intento. Le attività degli associati sono prestate in maniera prevalentemente gratuita e filantropica.
              </p>
              <p>
                <strong>3. La Didattica Armoniosa:</strong> L'insegnamento e lo studio non sono intesi in senso punitivo o accademizzante, ma crescono attraverso la gioia, l'armonia ed il diletto. La cultura crea benessere e lavoro quando l'estetica si accorda con la serenità.
              </p>
            </div>
          </div>

          <div className="border border-slate-200 p-4 bg-slate-50 space-y-2">
            <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">La Politica del Lessico e delle Sinergie Emotive</strong>
            <p className="text-[11.5px] leading-relaxed text-slate-600">
              Le opere (pittoriche, musicali o letterarie) e i linguaggi devono armonizzarsi con i principi etici del Centro. Le parole hanno la capacità di agire sulle emozioni umane, per questo il lessico deve rispettare i sentimenti del prossimo. L’uso di simboli armonici, melodie rilassanti o cromaticità bilanciate ha la capacità di elevare le vibrazioni emozionali positive dell'individuo, esercitando un effetto purificatore sulla psiche e stimolando il potenziale saggio latente di ciascuno.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'polo_cultural_mission',
      title: 'IL POLO MUSEALE & C.S.E.P. (CENTRO STUDI)',
      subtitle: 'Lo studio fenomenologico delle coincidenze e la connessione estatica',
      icon: <Brain className="w-5 h-5" />,
      category: 'teoria',
      content: (
        <div className="space-y-6 font-sans text-xs text-slate-705 leading-relaxed">
          <div className="bg-slate-50 border border-slate-200 p-4 text-xs font-serif text-slate-700 leading-relaxed rounded-none">
            <p className="font-sans font-bold text-xs uppercase text-[#0066CC] not-italic mb-1">C.S.E.P. — Centro Studi Sugli Eventi Paralleli</p>
            Fondato ed ideato dal Dott. Luca Falace, il centro cura ed analizza la fenomenologia delle coincidenze significative e dei nessi sincronici, traendo riscontri antropologici dalla rete web (about.me/csep).
          </div>

          <div className="space-y-3.5">
            <h4 className="font-serif font-black uppercase text-xs tracking-wider text-black">La Mission della Fondazione Arte &amp; Scienza</h4>
            <p>
              La missione del portale risiede nello sviluppo del benessere collettivo attraverso la fusione delle discipline. Tramite la pubblicazione di indagini antropologiche, l'ente analizza in chiave neutrale ed oggettiva l'insorgere di nuove fenomenologie collegate all'unione delle scienze (fisica dei quanti, astrofisica, biologia molecolare) con la sensibilità delle arti figurative e letterarie.
            </p>
            <p>
              I concetti di "diacronia figurativa" e "Sincronismo Creativo" si pongono l'obiettivo di superare la frammentazione degli insegnamenti ordinari scolastici per stimolare un potenziamento globale della consapevolezza, risvegliando lo spirito saggio e divergente degli allievi.
            </p>
          </div>

          <div className="border border-slate-200 p-4 bg-white space-y-2">
            <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">Itinerari Turistici &amp; Connessioni con il Territorio</strong>
            <p className="text-[11px] text-slate-600 leading-normal">
              Il polo d'ingegno non si limita ad operare online, ma intende valorizzare le risorse ambientali, storiografiche e archeologiche del territorio campano tramite convenzioni ed itinerari turistici dedicati all'analisi ermetica di monumenti e complessi di Napoli e della Magna Grecia, favorendo un riscontro turistico virtuoso.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'donazione_supporto',
      title: 'DONAZIONE & CANALI DI SUPPORTO ARTISTICO',
      subtitle: 'I link di sostegno e il supporto gratuito filantropico dei canali social (2022)',
      icon: <Sparkles className="w-5 h-5" />,
      category: 'media',
      content: (
        <div className="space-y-6 font-sans text-xs text-slate-705 leading-relaxed">
          <div className="bg-emerald-50/50 border border-emerald-200 p-5 space-y-3">
            <strong className="font-serif text-[#0066CC] font-bold text-sm block text-emerald-950">Sostegno Filantropico &amp; Donazione Libera</strong>
            <p className="text-xs text-slate-700 leading-relaxed font-sans">
              La Fondazione AIC e tutte le piattaforme del vecchio portale operano senza fini speculativi. Chi ritiene valido il nostro sforzo di promozione delle scienze e delle arti liberali può contribuire liberamente con una donazione a supporto delle spese d'archivio e di rilegatura dei manoscritti e delle opere stimate.
            </p>
            
            <button 
              onClick={() => handleExternalLink('https://paypal.me/LucaFalace')}
              className="px-4 py-2 border border-[#0066CC] bg-blue-50/30 text-[#0066CC] font-mono font-bold hover:bg-[#0066CC] hover:text-white transition-all duration-200 cursor-pointer text-xs"
            >
              Effettua Donazione su Paypal.me
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 p-4 bg-white space-y-2">
              <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">Supporto Gratuito ad Artisti Emergenti</strong>
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                Dal 2005, la missione delle nostre reti ha incluso il supporto gratuito a pittori, scultori e scrittori esordienti. Offriamo la pubblicazione e la recensione delle loro opere d'ingegno sui nostri canali social per aiutarli a superare le rigidità dei galleristi ordinari:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-0.5 text-slate-500 font-mono text-[9.5px]">
                <li>Instagram: @montecarloarts (Free Support)</li>
                <li>Email Contatto: dott.lucafalace@gmail.com</li>
              </ul>
            </div>

            <div className="border border-slate-200 p-4 bg-white space-y-2 flex flex-col justify-between">
              <div>
                <strong className="text-xs font-serif text-black uppercase block tracking-wider text-[#0066CC]">Patrimonio d'Arsenale Artistico</strong>
                <p className="text-[11px] text-slate-600 leading-normal font-sans">
                  L'intero arsenale figurativo si compone di oltre 150 opere materiche ed installazioni uniche che Luca Falace destina alla Fondazione come patrimonio inestimabile a tutela e promozione.
                </p>
              </div>
              <span className="text-[9px] font-mono text-slate-400 block text-right font-black uppercase">
                COPERTURA COPYRIGHT © 2005 - 2026 LUCA FALACE
              </span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Gestore di ricerca globale nell'archivio testi dell'XML vecchio sito
  const handleSearchKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filtraggio delle sezioni basato sulla query di ricerca (itera profondamente sui testi se necessario)
  const filteredSections = archiveSections.filter(section => {
    const q = searchQuery.toLowerCase();
    if (!q) return true;
    
    // Convertiamo a stringa l'id, titolo e subtitle
    const titleMatch = section.title.toLowerCase().includes(q);
    const subtitleMatch = section.subtitle.toLowerCase().includes(q);
    const idMatch = section.id.toLowerCase().includes(q);
    
    return titleMatch || subtitleMatch || idMatch;
  });

  return (
    <div className="space-y-10 font-sans" id="archivio-aic-website-root">
      
      {/* 1. Elegante Intestazione in Stile Archivo Storico */}
      <section className="bg-white border-2 border-black p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-5" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-black text-white rounded-none">
              <History className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#0066CC] uppercase tracking-widest font-bold block">
                ARCHIVIO ACCADEMICO E REGISTRO EDITORIALE (ANNO 2024)
              </span>
              <h1 className="font-serif font-black text-2xl text-black uppercase tracking-wide leading-tight mt-0.5">
                Le origini della fondazione AIC
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Proprietà Intellettuale Depositata
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-l-4 border-[#0066CC] pl-4 py-1.5 bg-blue-50/20">
            <p className="text-sm font-serif italic text-black leading-relaxed font-bold">
              "La Fondazione AIC 2024 è di proprietà intellettuale di Luca Falace presidente onorario, ideatore e fondatore."
            </p>
          </div>
          <p className="text-xs font-serif text-slate-600 leading-normal max-w-3xl">
            In questa sezione dedicata viene integrato interamente il contenuto e l'antologia storica estratti dal file XML del vecchio portale della Fondazione AIC (2024). Un lavoro immane di anni di studio, ricerca, loghi, brevetti e documentari, mantenuto e consultabile qui per fini di trasparenza, certificazione accademica ed orgoglio storiografico familiare.
          </p>
        </div>
      </section>

      {/* 2. Barra di Controllo della Ricerca e Visualizzazione */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-slate-50 border border-slate-200">
        
        {/* Motore di Ricerca Interno */}
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Cerca parole o concetti nell'intero vecchio sito..."
            value={searchQuery}
            onChange={handleSearchKeyPress}
            className="w-full pl-9 pr-4 py-2 border border-slate-350 bg-white text-xs rounded-none text-black focus:outline-none focus:border-black font-sans"
          />
        </div>

        {/* Pulsanti per Scelta Visualizzazione */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsSequentialScroll(false)}
            className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer ${
              !isSequentialScroll 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-55'
            }`}
          >
            Dashboard a Schede
          </button>
          <button
            type="button"
            onClick={() => setIsSequentialScroll(true)}
            className={`px-3 py-1.5 text-xs font-mono font-bold border transition-all cursor-pointer ${
              isSequentialScroll 
                ? 'bg-black text-white border-black' 
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-55'
            }`}
          >
            Manoscritto Continuo
          </button>
        </div>
      </div>

      {/* 3. Layout del Contenuto dell'Archivio */}
      {!isSequentialScroll ? (
        
        // VISUALIZZAZIONE TABBED (DASHBOARD)
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Menu d'archivio laterale - Spazio 4 colonne */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase tracking-wider">
              Catalogo Sottosezioni Vecchio Sito ({filteredSections.length})
            </span>
            <div className="flex flex-col border border-slate-200 divide-y divide-slate-100 bg-white">
              {filteredSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-left p-4 transition-all cursor-pointer flex items-center justify-between group ${
                    activeSectionId === section.id 
                      ? 'bg-blue-50/30' 
                      : 'hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 border mt-0.5 rounded-none shrink-0 ${
                      activeSectionId === section.id 
                        ? 'border-[#0066CC] text-[#0066CC]' 
                        : 'border-slate-200 text-slate-500'
                    }`}>
                      {section.icon}
                    </div>
                    <div>
                      <strong className={`text-xs block leading-tight font-serif ${
                        activeSectionId === section.id ? 'text-[#0066CC]' : 'text-black group-hover:text-[#0066CC]'
                      }`}>
                        {section.title}
                      </strong>
                      <span className="text-[10px] text-slate-400 block leading-tight truncate mt-0.5 max-w-[200px]">
                        {section.subtitle}
                      </span>
                    </div>
                  </div>
                  <ChevronArrow className={`w-4 h-4 shrink-0 transition-transform ${
                    activeSectionId === section.id ? 'text-[#0066CC] translate-x-1' : 'text-slate-400'
                  }`} />
                </button>
              ))}
            </div>

            {/* Avviso Legalità di Paternità in fondo alla barra */}
            <div className="border border-amber-200 bg-amber-50/45 p-4 space-y-2">
              <div className="flex items-center gap-2 text-amber-800">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span className="text-[10px] font-mono font-black uppercase tracking-wider">
                  Nessuna Cessione Diritti
                </span>
              </div>
              <p className="text-[10.5px] text-slate-600 leading-normal font-sans">
                La fondazione AIC nasce su input di Luca Falace ma l'intero corpus scientifico ed i moduli non recano cessione di diritto industriale.
              </p>
            </div>
          </div>

          {/* Dettaglio della sezione attiva - Spazio 8 colonne */}
          <div className="lg:col-span-8 space-y-6">
            {filteredSections.length > 0 ? (
              (() => {
                const currentSection = filteredSections.find(s => s.id === activeSectionId) || filteredSections[0];
                return (
                  <div className="bg-white border border-slate-310 p-6 sm:p-8 space-y-6 relative animate-fade-in">
                    <div className="border-b border-slate-100 pb-4">
                      <span className="text-[9px] font-mono text-[#0066CC] uppercase font-bold tracking-widest block mb-0.5">
                        REGISTRO STORICO • SEZIONE ATTIVA
                      </span>
                      <h2 className="font-serif font-black text-xl text-black uppercase leading-tight">
                        {currentSection.title}
                      </h2>
                      <p className="text-xs text-slate-500 font-sans mt-1">
                        {currentSection.subtitle}
                      </p>
                    </div>

                    {currentSection.content}
                  </div>
                );
              })()
            ) : (
              <div className="bg-white border border-slate-200 p-12 text-center space-y-4">
                <HelpCircle className="w-10 h-10 text-slate-350 mx-auto" />
                <strong className="text-sm block text-black">Nessun paragrafo o documento rilevato</strong>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  La ricerca di "{searchQuery}" non ha prodotto alcun riscontro testuale. Prova ad inserire termini come "Sincronismo", "Corsi", "Aic", "Perizie" o "Brevetti".
                </p>
              </div>
            )}
          </div>

        </div>
        
      ) : (
        
        // VISUALIZZAZIONE SEQUENTIAL SCROLL (MANOSCRITTO CONTINUO)
        <div className="space-y-12">
          <div className="bg-amber-50/20 border border-amber-200 p-4 text-xs text-slate-800 font-serif leading-relaxed">
            <p className="font-bold text-black mb-1">📖 Modalità Lettura Sequenziale</p>
            Stai visualizzando l'antologia e l'intero vecchio sito del 2024 come un unico documento continuativo ordinato. Perfetto per la consultazione, lo studio offline o la stampa dell'archivio delle Attività Intellettive Creative (AIC).
          </div>

          {filteredSections.map(section => (
            <div key={section.id} className="bg-white border-b border-l-4 border-l-slate-400 border-slate-200 p-6 sm:p-8 space-y-4 hover:border-l-[#0066CC] transition-all">
              <div className="pb-3 border-b border-slate-100 mb-2">
                <strong className="text-[9.5px] font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  Sezione d'Archivio: #{section.id.toUpperCase()}
                </strong>
                <h3 className="font-serif font-black text-lg text-black uppercase">
                  {section.title}
                </h3>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  {section.subtitle}
                </p>
              </div>

              {section.content}
            </div>
          ))}
        </div>
      )}

      {/* Siti Web di Riferimento */}
      <div className="mt-12 p-6 border border-slate-200 bg-slate-50/50">
        <h4 className="font-serif font-black text-xs uppercase tracking-wider text-[#0066CC] mb-4">
          Siti Web di Riferimento & Archivio Storico
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'lucafalace.altervista.org', url: 'https://lucafalace.altervista.org' },
            { label: 'fondazioneaic.altervista.org', url: 'https://fondazioneaic.altervista.org' },
            { label: 'fondazionefaic.altervista.org', url: 'https://fondazionefaic.altervista.org' },
            { label: 'aic-foundation.wegic.app', url: 'https://aic-foundation.wegic.app' },
            { label: 'fondazioneartescienza.altervista.org', url: 'https://fondazioneartescienza.altervista.org/' },
          ].map((site, index) => (
            <a
              key={index}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-slate-200 bg-white hover:bg-blue-50/30 hover:border-blue-400 transition-all flex items-center justify-between group duration-200"
            >
              <span className="font-mono text-xs text-slate-700 group-hover:text-blue-700 select-all">
                {site.label}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 shrink-0 ml-2" />
            </a>
          ))}
          {/* Pulsante di download XML */}
          <button
            onClick={handleDownloadXml}
            className="p-3 border-2 border-dashed border-[#0066CC] bg-blue-50/30 hover:bg-blue-50 hover:border-solid hover:border-[#0066CC] transition-all flex items-center justify-between group duration-200 cursor-pointer text-left w-full h-full"
            title="Scarica l'intero archivio della fondazione AIC in formato XML"
          >
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#0066CC] shrink-0" />
              <span className="font-mono text-xs text-[#0066CC] font-bold uppercase tracking-wider">
                Scarica intero sito (XML)
              </span>
            </div>
            <Download className="w-4 h-4 text-[#0066CC] group-hover:translate-y-0.5 transition-transform shrink-0" />
          </button>
        </div>
      </div>

      {/* 4. Pie di Pagina della Sezione */}
      <footer className="border-t border-slate-200 pt-6 text-center space-y-2 text-[10.5px] text-slate-500 font-sans">
        <p>
          © 2005 - 2026 Fondazione Falace e Fondazione AIC. Tutti i diritti di paternità intellettuale riservati a Dott. Luca Falace.
        </p>
        <p className="font-mono text-[9px] tracking-wider text-slate-400">
          UFFICIALMENTE DEPOSITATO AL MINISTERO PER I BENI CULTURALI DAL 2007 • ARCHIVIO SIAE OLAF COD. 05-07
        </p>
      </footer>

    </div>
  );
}

// Icona freccia per menu
function ChevronArrow({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={2.5} 
      stroke="currentColor" 
      className={className}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

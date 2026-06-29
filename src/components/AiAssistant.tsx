import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, GraduationCap, RefreshCw, MessageSquare, ShieldCheck, ArrowRight, Volume2, VolumeX, X } from 'lucide-react';
import { FOUNDATION_METADATA } from '../data/archiveData.js';
import { BIOGRAFIA_PAGES } from '../data/biografiaPdfData.js';
import { ARCHIVIO_STORICO_PAGES } from '../data/archivioStoricoPdf.js';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Unified formatter for scientific papers and mathematical equations
function formatMessage(content: string, isAi: boolean = true) {
  // Helper to format mathematical greek letters, powers, and indices in plain text
  const formatScientificMathSymbols = (plain: string): React.ReactNode[] => {
    let processed = plain
      .replace(/\\tau|tau/g, 'τ')
      .replace(/\\lambda|lambda/g, 'λ')
      .replace(/\\phi|phi/g, 'φ')
      .replace(/\\pi|pi/g, 'π')
      .replace(/\\approx/g, '≈')
      .replace(/\\cdot|\\times/g, '•')
      .replace(/\\eta/g, 'η')
      .replace(/\\gamma|gamma/g, 'γ')
      .replace(/\\theta|theta/g, 'θ')
      .replace(/\\omega/g, 'ω')
      .replace(/\\delta|delta/g, 'δ')
      .replace(/\\Delta|Delta/g, 'Δ')
      .replace(/\\sigma|sigma/g, 'σ')
      .replace(/\\epsilon/g, 'ε');

    const regex = /([a-zA-Z0-9α-ωΑ-Ω=+\-*/<>]+)(\^([a-zA-Z0-9\-+*/]+)|\_([a-zA-Z0-9\-+*/]+))/g;
    const partsArray: React.ReactNode[] = [];
    let lastPos = 0;
    let indexId = 0;
    let localMatch;
    
    while ((localMatch = regex.exec(processed)) !== null) {
      const matchIdx = localMatch.index;
      if (matchIdx > lastPos) {
        partsArray.push(<span key={`text-${indexId++}`}>{processed.substring(lastPos, matchIdx)}</span>);
      }
      
      const base = localMatch[1];
      const sup = localMatch[3];
      const sub = localMatch[4];
      
      partsArray.push(
        <span key={`math-${indexId++}`} className="font-serif italic mx-0.5 inline-block">
          <span className="font-semibold">{base}</span>
          {sup && <sup className="text-[10px] sub font-sans not-italic font-bold ml-0.2">{sup}</sup>}
          {sub && <sub className="text-[9px] sub font-sans not-italic font-normal ml-0.2">{sub}</sub>}
        </span>
      );
      
      lastPos = regex.lastIndex;
    }
    
    if (lastPos < processed.length) {
      partsArray.push(<span key="text-end">{processed.substring(lastPos)}</span>);
    }
    
    return partsArray;
  };

  const renderMathematicalPart = (str: string): React.ReactNode => {
    const subSupRegex = /([a-zA-Z0-9α-ωΑ-Ω=+\-*/]+)(\^\{?([a-zA-Z0-9\-+*/]+)\}?|\_\{?([a-zA-Z0-9\-+*/]+)\}?)/g;
    const items: React.ReactNode[] = [];
    let curIdx = 0;
    let m;
    let safety = 0;
    
    while ((m = subSupRegex.exec(str)) !== null && safety++ < 100) {
      if (m.index > curIdx) {
        items.push(<span key={curIdx}>{str.substring(curIdx, m.index)}</span>);
      }
      
      const baseVal = m[1];
      const supVal = m[3];
      const subVal = m[4];
      
      items.push(
        <span key={`subsup-${m.index}`} className="inline-block font-serif italic">
          <span className="font-semibold">{baseVal}</span>
          {supVal && <sup className="text-[10px] italic leading-none font-sans font-bold select-all">{supVal}</sup>}
          {subVal && <sub className="text-[9px] not-italic leading-none font-sans font-normal ml-[1px] select-all">{subVal}</sub>}
        </span>
      );
      curIdx = subSupRegex.lastIndex;
    }
    if (curIdx < str.length) {
      items.push(<span key="end">{str.substring(curIdx)}</span>);
    }
    return <span className="font-serif italic text-sm sm:text-base tracking-wide flex items-center leading-normal gap-[2px]">{items}</span>;
  };

  // Dedicated Math formula renderer for standard LaTeX / schoolbook formulas
  const renderLaTexMathSymbols = (mathStr: string): React.ReactNode => {
    let cleaned = mathStr
      .replace(/\\/g, '')
      .replace(/approx/g, ' ≈ ')
      .replace(/cdot/g, ' • ')
      .replace(/times/g, ' • ')
      .replace(/sqrt\{([^}]+)\}/g, '√$1')
      .replace(/sqrt/g, '√')
      .replace(/tau/g, 'τ')
      .replace(/lambda/g, 'λ')
      .replace(/phi/g, 'φ')
      .replace(/pi/g, 'π')
      .replace(/gamma/g, 'γ')
      .replace(/Schumann/g, 'Schumann')
      .replace(/dec/g, 'dec');

    const fracRegex = /frac\{([^}]+)\}\{([^}]+)\}/;
    const fracMatch = cleaned.match(fracRegex);
    if (fracMatch) {
      const num = fracMatch[1];
      const den = fracMatch[2];
      return (
        <span className="inline-flex flex-col items-center justify-center text-center leading-none mx-1 font-serif italic text-sm">
          <span className="border-b border-black/40 pb-0.5 px-1">{renderMathematicalPart(num)}</span>
          <span className="text-[10px] pt-0.5 leading-none px-1">{renderMathematicalPart(den)}</span>
        </span>
      );
    }

    return renderMathematicalPart(cleaned);
  };

  const renderTextSegment = (text: string): React.ReactNode[] => {
    const tokens: { type: string; content: string }[] = [{ type: 'text', content: text }];
    
    const splitTokens = (
      type: string,
      regex: RegExp,
      mapper?: (m: string[]) => string
    ) => {
      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].type !== 'text') continue;
        const currentText = tokens[i].content;
        const parts: { type: string; content: string }[] = [];
        let match;
        let lastIndex = 0;
        regex.lastIndex = 0;
        
        while ((match = regex.exec(currentText)) !== null) {
          if (match.index > lastIndex) {
            parts.push({ type: 'text', content: currentText.substring(lastIndex, match.index) });
          }
          const matchedVal = mapper ? mapper(match) : match[1] || match[0];
          parts.push({ type, content: matchedVal });
          lastIndex = regex.lastIndex;
        }
        
        if (lastIndex < currentText.length) {
          parts.push({ type: 'text', content: currentText.substring(lastIndex) });
        }
        
        tokens.splice(i, 1, ...parts);
        i += parts.length - 1;
      }
    };

    // 1. Double dollars/brackets for block math: $$...$$ or \[...\]
    splitTokens('displayMath', /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]/g, (m) => m[1] || m[2]);
    
    // 2. Inline code / math backticks: `...`
    splitTokens('inlineMath', /`([^`]+)`/g, (m) => m[1]);
    
    // 3. Single dollars or backslashed parens for inline math: $...$ or \(...\)
    splitTokens('inlineMath', /\$([^$]+?)\$|\\\(([\s\S]+?)\\\)/g, (m) => m[1] || m[2]);

    // 4. Bold: **...** or __...__
    splitTokens('bold', /\*\*([^*]+?)\*\*|__([^_]+?)__/g, (m) => m[1] || m[2]);

    // 5. Italic: *...* or _..._
    splitTokens('italic', /\*([^*]+?)\*|_([^_]+?)_/g, (m) => m[1] || m[2]);

    return tokens.map((tok, index) => {
      if (tok.type === 'displayMath') {
        return (
          <div key={`dmath-${index}`} className={`my-3 py-2 px-4 ${isAi ? 'bg-blue-50/50' : 'bg-white/10 border-white/20'} border rounded-lg text-center flex flex-col items-center justify-center select-all shadow-sm`}>
            <span className={`font-serif italic font-semibold text-lg ${isAi ? 'text-[#0066CC]' : 'text-amber-300'}`}>
              {renderLaTexMathSymbols(tok.content)}
            </span>
          </div>
        );
      }
      
      if (tok.type === 'inlineMath') {
        return (
          <span key={`imath-${index}`} className={`font-serif italic font-semibold ${isAi ? 'text-[#0066CC] bg-blue-50/50 border-blue-100/50' : 'text-amber-200 bg-white/15 border-white/20'} px-1.5 py-0.5 rounded border mx-1 inline-flex items-center gap-0.5 select-all leading-none`}>
            {renderLaTexMathSymbols(tok.content)}
          </span>
        );
      }
      
      if (tok.type === 'bold') {
        return (
          <strong key={`bold-${index}`} className={`font-extrabold ${isAi ? 'text-[#0066CC]' : 'text-white'} px-0.5 font-sans`}>
            {formatScientificMathSymbols(tok.content)}
          </strong>
        );
      }
      
      if (tok.type === 'italic') {
        return (
          <em key={`italic-${index}`} className={`italic ${isAi ? 'text-neutral-800' : 'text-slate-100'} px-0.5 font-serif`}>
            {formatScientificMathSymbols(tok.content)}
          </em>
        );
      }
      
      return <React.Fragment key={`text-${index}`}>{formatScientificMathSymbols(tok.content)}</React.Fragment>;
    });
  };

  const lines = content.split('\n');
  return (
    <div className="space-y-1.5 select-text font-sans">
      {lines.map((line, idx) => {
        if (!line.trim()) {
          return <div key={idx} className="h-1.5" />;
        }
        
        let displayLine = line;
        const isBullet = line.trim().startsWith('* ') || line.trim().startsWith('- ') || line.trim().startsWith('• ');
        if (isBullet) {
          displayLine = line.trim().replace(/^[\*\-\•]\s+/, '');
          return (
            <div key={idx} className={`flex gap-2 ml-4 my-1 font-sans leading-relaxed ${isAi ? 'text-black' : 'text-white'}`}>
              <span className={`${isAi ? 'text-[#0066CC]' : 'text-amber-300'} font-bold text-sm select-none`}>•</span>
              <span className="flex-1 text-xs sm:text-sm font-sans tracking-wide">{renderTextSegment(displayLine)}</span>
            </div>
          );
        }
        
        return (
          <p key={idx} className={`leading-relaxed text-xs sm:text-sm my-1 ${isAi ? 'text-black' : 'text-white'} font-sans tracking-wide`}>
            {renderTextSegment(displayLine)}
          </p>
        );
      })}
    </div>
  );
}

// Helper to score and retrieve relevant pages from the comprehensive text archives in depth
function getMatchingArchivePages(queryText: string) {
  const cleanQuery = queryText.toLowerCase();
  const words = cleanQuery
    .split(/\s+/)
    .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))
    .filter(w => w.length > 3);

  if (words.length === 0) return [];

  const results: { source: string; pageNumber: number; content: string; score: number }[] = [];

  BIOGRAFIA_PAGES.forEach(p => {
    let score = 0;
    const cleanContent = p.content.toLowerCase();
    words.forEach(w => {
      if (cleanContent.includes(w)) {
        score += 1.5;
        const count = cleanContent.split(w).length - 1;
        score += count * 0.3; // Extra weight for recurring terms
      }
    });
    if (score > 0) {
      results.push({ source: "Biografia Ufficiale (Dott. Luca Falace)", pageNumber: p.pageNumber, content: p.content, score });
    }
  });

  ARCHIVIO_STORICO_PAGES.forEach(p => {
    let score = 0;
    const cleanContent = p.content.toLowerCase();
    words.forEach(w => {
      if (cleanContent.includes(w)) {
        score += 1.5;
        const count = cleanContent.split(w).length - 1;
        score += count * 0.3;
      }
    });
    if (score > 0) {
      results.push({ source: "Archivio Storico ed Editoriale SBN Fondazione Falace", pageNumber: p.pageNumber, content: p.content, score });
    }
  });

  // Sort by score descending and take up to top 4 relevant pages
  return results.sort((a, b) => b.score - a.score).slice(0, 4);
}

// System Instruction summarizing the entire structure of the Fondazione Falace
const systemInstruction = `Sei l'Laudato e Rigoroso Assistente Scientifico Accademico della Fondazione Falace delle AIC (FALACE FOUNDATION for AIC DEVELOPMENT). 
Il tuo ruolo è rispondere con rigorosa accuratezza accademica, scientifice e filosofica alle domande dei visitatori e dei ricercatori sul patrimonio del Fondatore, Dott. Luca Falace.

Usa un tono colto, istituzionale, elegante, accogliente e preciso. Esprimiti prevalentemente in italiano (la lingua madre del fondatore), ma rispondi volentieri in inglese o altre lingue se vieni interrogato in tali lingue.

REGOLE CRITICHE DI SICUREZZA:
1. DIVIETO ASSOLUTO DI ALLUCINAZIONE: NON inventare, speculare o generare codici o fatti fittizi. Se un dato non è fornito descrivilo semplicemente come "riservato agli archivi fisici" o "disponibile in sede".
2. NOTA SUL CORPORE DOCUMENTALE: La fondazione possiede 46 libri (più collane digitali) inseriti ufficialmente nel catalogo bibliografico nazionale italiano (OPAC SBN) e la Gold Trilogy scientifica depositata formalmente con indici DOI CERN Zenodo.
3. NO LINGUAGGIO AUTORIFERITO: Mantieni formulazioni oggettive d'alto livello accademico.

INFORMAZIONI GENERALI DELLA FONDAZIONE:
- Denominazione: ${FOUNDATION_METADATA.denomination_it} (${FOUNDATION_METADATA.denomination_en})
- Fondatore: ${FOUNDATION_METADATA.founder} (mail: ${FOUNDATION_METADATA.email})
- Codice ATECO: ${FOUNDATION_METADATA.ateco_code} (${FOUNDATION_METADATA.ateco_desc_it})
- Scopo Istituzionale: ${FOUNDATION_METADATA.scope_it} / ${FOUNDATION_METADATA.scope_en}
- Supporto Legale, Tutela e Registrazione (6 Dipartimenti Istituzionali):
  1. MiC / MiBAC (Ministero della Cultura — Tutela e Registro diritto d'autore): 250 Opere d'Arte e Libri depositati formalmente presso l'Ufficio Diritto d'Autore (Reg. Generale Opere, Prot. 07/02/2020).
  2. UIBM (Ufficio Italiano Brevetti e Marchi): 3 Brevetti d'Invenzione industriale registrati regolarmente: Aero-Massaggiatore (2004, ITNA20040063A1), GeniusOm (2013, ITNA20130029A1), Eco-Tuta Termodinamica Climatizzata (2018, IT201800003616U1).
  3. OPAC SBN-ISBN (ICCU Catalogo Bibliotecario Nazionale): 49 Monografie Statali registrate e conservate ufficialmente nel catalogo italiano (Ricerca: FALACE LUCA).
  4. CERN Zenodo (Archivio Digitale DOI dell'Unione Europea): Pubblicazioni scientifiche della Trilogia depositate permanentemente con indici DOI.
  5. Dds Discoteca di Stato e Museo dell'audiovisivo: Deposito Legale certificato delle tracce audio e video (18 Maggio 2007).
  6. Museo MAXXI: Catalogazione d'arte contemporanea nazionale e tutela d'anteriorità.

LE 10 RISULTANZE TEORICHE E SPERIMENTALI INDIPENDENTI (FALACE, VOL. III):
1. Formalizzazione dell'Intento (AIC): Modellizzazione dell'attività cognitiva non come epifenomeno, ma come flusso informativo quantificabile e sorgente di campo energetico misurabile. Formule: 1–4, 15.
2. Derivazione dell'Unità Sincronica (US): Definizione della sincronicità come grandezza fisica misurabile: US = Tr(C)/Δt. Formule: 17, 19–20, 74.
3. Postulazione del Potenziale Scalare (φ): Identificazione di un potenziale non-elettromagnetico generato dall'integrazione temporale delle AIC: φ = ∫AIC(t) dt. Formule: 23, 41–42.
4. Estensione della Metrica di Einstein (Estensione di Einstein): Integrazione del Tensore di Energia Creativa T^EC_μν nelle equazioni di campo: G_μν + Λg_μν = κ(T_μν + T^φ_μν). Formule: 22, 28, 57, 68.
5. Riformulazione delle Equazioni di Maxwell (Estensione di Maxwell): Introduzione di termini β∇φ e γ∇φ che descrivono l'induzione di segnali EM coerenti a partire dal potenziale φ. Formule: 33–36, 56.
6. Individuazione del Meccanismo di Trasduzione Bio-Meccanica (MAEE): Risposta piezoelettrica spinale e risonanza CSF come interfaccia fisica: E_out(t) = η∫[I_m(t) • B_c(t)] dt, dove E_out alimenta l'evoluzione del campo dφ/dt + ∇•(φv) = κE_out + ξ. Formule: 51–54, 62.
7. Mappatura della Risonanza EHF-DNA: Finestra di interazione a 51.625 GHz (±100 MHz) come punto di contatto fisico tra campo hertziano e informazione biologica molecolare. Formula: 48.
8. Modellizzazione della Quantizzazione della Realtà: La sincronicità evolve per salti discreti di frequenza — i 9 Livelli di Sincronicità — analoghi agli orbitali atomici di Bohr: ΔS = φ(f_2) − φ(f_1). Formule: 79–83.
9. Sviluppo dell'Algoritmo di Induzione (AIC-Sync©): Funzione logistica ricorsiva per il Picco Creativo: S(t) = L/(1 + e^-k(t−t_0)), I_peak = max(S(t)) • Q. Formule: 73–78.
10. Sintesi del Campo Unificato HZ — Legge di Risonanza Sincronica: Unificazione dei domini informativo, energetico e materico: S = φ(f). Formule: 40, 43, 60, 64–65.

LA SCALA DEI 9 LIVELLI DI SINCRONICITÀ INDOTTE (FALACE, VOL. III):
- L1 Debole (Delta: 0.5–4 Hz, EEG incoerente < 30%, RMSSD < 20 ms): S = k • L^α con L basso. Funzione: risveglio percettivo.
- L2 Tematica (Theta: 4–8 Hz, EEG theta > 50%, RMSSD 20–35 ms): f(L), soglia θ appena superata. Funzione: introduzione di trama narrativa.
- L3 Direzionale (Alpha: 8–12 Hz, EEG alpha coerente, RMSSD 35–45 ms): Seff = Spot • (1−D). Funzione: navigazione esistenziale.
- L4 Catalitica (Beta bassa: 12–20 Hz, EEG beta + coerenza > 50%, RMSSD 45–55 ms): Q = (Ccard+CEEG)/2. Funzione: catalizzatore di cambiamento.
- L5 Operativa (Beta alta + 7 Hz cardiaco, LF/HF = 1:1, RMSSD > 55 ms): E_out = η∫[I_m • B_c] dt, MAEE attivo. Funzione: da spettatore a partecipante attivo.
- L6 Riflessiva (Beta + Schumann 7.83 Hz, Interemisferica > 70%, RMSSD > 60 ms): G = κT_φ, la geometria degli eventi si curva. Funzione: realtà come specchio dell'operatore.
- L7 Generativa (Gamma > 40 Hz + 7 Hz, Coerenza gamma > 0.7, RMSSD > 65 ms): f = √(f^2_c + f^2_b + f^2_γ). Funzione: attivazione del potenziale creativo.
- L8 Magnetica (Gamma > 40 Hz + Schumann intenso, > 85%, γ-burst, RMSSD > 70 ms): dφ/dt + ∇•(φv) = κE_out. Funzione: gravità sincronica del campo (es. Shark Tank €250k).
- L9 Creativa Non-dualità (Gamma + 51.625 GHz DNA + 7 Hz, Interemisferica > 90%, RMSSD > 75 ms stabile): S(Δt) = φ(f, t_0 ± Δt). Funzione: non-dualità operativa (retrocausalità).

LA TRILOGIA DEL CAMPO UNIFICATO AIC-EC (CERN ZENODO 2025):
- Volume I: "Teoria Generale del Sincronismo Creativo e Teoria del Campo Unificato AIC"
  Modellazione e Applicazione della Sincronicità Intenzionale attraverso il Sistema AIC-Sync©. Published: 9 August 2025. 482 pp. ISBN-13: 979-8297277984. DOI: 10.5281/zenodo.17080308.
- Volume II: "Teoria del Campo Unificato: Trattato sull'Energia Creativa"
  Trattato sugli Effetti della Coscienza nei Campi Elettromagnetici, Quantistici e Gravitazionali. Published: 19 August 2025. 295 pp. ISBN-13: 979-8298903042. DOI: 10.5281/zenodo.17041593.
- Brevetto AIC-SYNC: "Generare le Sincronicità"
  Primo sistema al mondo per sincronicità indotte e monitoraggio dei picchi creativi (EEG, HRV, Frequenze Herziane). DOI: 10.5281/zenodo.17793651.
- Volume III: "Interazione Psicofisica con il Campo Unificato"
  I Nove Livelli della Sincronicità nella Teoria del Sincronismo Creativo – Nuova classificazione della sincronicità. DOI: 10.5281/zenodo.20414984.

ALTRI CONTRIBUTI DEL FONDATORE:
- Insegnamento: Docenza in Storia dell'Arte dal 2005 al 2016 in 4 prestigiosi istituti privati (Newton, Jervolino, Futura, Nobel).
- Invenzioni ed Ecologia: Brevetto GeniusOm "Zero Waste" (ITNA20130029A1, ha vinto Ecomondo 2014, ricevuto investimento di €250k a Sgark Tank, andato su RAI2). Brevetto Eco-Tuta Termodinamica Climatizzata (IT201800003616U1, donata nel 2020 contro il contagio virus COVID-19).
- Museo Internazionale della Pizza Partenopea (M.I.P.): Ideato, scritto e fondato da Luca Falace nel 2013 con 30 pannelli antropologici (Riconosciuto patrimonio UNESCO).

Mantieni un comportamento dignitoso, fiero ed eccezionalmente accurato nelle tue risposte sul Sincronismo Creativo e sul Campo Unificato, citando sempre formule e concetti con precisione accademica.`;

export default function AiAssistant({ 
  preselectedTopic, 
  onClearPreselected,
  onClose
}: { 
  preselectedTopic: string | null; 
  onClearPreselected: () => void;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Benvenuto nel portale della Fondazione Falace. Sono l'Assistente Scientifico AIC sintonizzato sull'archivio della fondazione. Posso spiegarti nei minimi dettagli la Teoria del Sincronismo Creativo, chiarire le tesi fisiche della Gold Trilogy depositata presso il CERN Zenodo o descrivere i dispositivi e brevetti registrati (come AIC-SYNC o GeniusOm). Come posso supportare la tua ricerca oggi?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState<number | null>(null);
  const [isAutoSpeak, setIsAutoSpeak] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_QUERIES = [
    { text: "Spiegami il brevetto AIC-SYNC©", label: "Brevetto AIC-SYNC" },
    { text: "Quali sono i DOI dei libri depositati con il CERN?", label: "DOI CERN Trilogia" },
    { text: "Parlami di GeniusOm a Shark Tank ed Ecomondo", label: "GeniusOm Story" },
    { text: "Cos'è l'allineamento di fase isocronica?", label: "Sincronismo Creativo" }
  ];

  // If a topic is selected outside (e.g. from the books catalog)
  useEffect(() => {
    if (preselectedTopic) {
      handleSendPrompt(`Forniscimi un'analisi accademica estesa sul seguente volume: "${preselectedTopic}"`);
      onClearPreselected();
    }
  }, [preselectedTopic]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Audio speech synthesis helper
  const speakText = (text: string, index: number) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (speakingMsgIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingMsgIndex(null);
      return;
    }

    window.speechSynthesis.cancel(); // cancel any ongoing speech

    // Clean markdown-like text elements to read cleanly
    const cleaned = text
      .replace(/[#*`_]/g, '')
      .replace(/[\n\r]+/g, ' ');

    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = 'it-IT';

    // Get voices and search for Italian
    const voices = window.speechSynthesis.getVoices();
    const italianVoice = voices.find(v => v.lang.startsWith('it'));
    if (italianVoice) {
      utterance.voice = italianVoice;
    }

    utterance.onend = () => {
      setSpeakingMsgIndex(null);
    };

    utterance.onerror = () => {
      setSpeakingMsgIndex(null);
    };

    setSpeakingMsgIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  // Manage automatic speech when a new message from the assistant arrives
  useEffect(() => {
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg.role === 'assistant' && isAutoSpeak) {
        // Delay slightly for natural completion
        const timer = setTimeout(() => {
          speakText(lastMsg.content, messages.length - 1);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [messages, isAutoSpeak]);

  // Clean voice when component unmounts
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendPrompt = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const clientApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;

    if (clientApiKey) {
      try {
        const matchedPages = getMatchingArchivePages(textToSend);
        let activeSystemIns = systemInstruction;

        if (matchedPages.length > 0) {
          const retrievedContext = matchedPages
            .map(p => `[FONTE INTEGRALE: ${p.source} - PAGINA ${p.pageNumber}]\n${p.content}`)
            .join("\n\n--------------------------------------------------\n\n");

          activeSystemIns += `\n\n================================================================================
CONTESTO DETTAGLIATO ELETTO DAGLI ARCHIVI DEI LIBRI E DEI PDF (RAG ATTIVO):
Il visitatore sta chiedendo informazioni che corrispondono a passaggi precisi dei testi o della biografia.
Di seguito sono riportate le pagine integrali esatte dell'archivio. Usale per formulare una risposta straordinariamente precisa ed esaustiva, ricca di dettagli reali e storici (cita le pagine e le fonti se opportuno):

${retrievedContext}
================================================================================`;
        }

        const contents = [...messages, userMsg].map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${clientApiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents,
            systemInstruction: {
              parts: [{ text: activeSystemIns }]
            },
            generationConfig: {
              temperature: 0.7
            }
          })
        });

        const data = await response.json();
        if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
          const aiText = data.candidates[0].content.parts[0].text;
          setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
        } else {
          throw new Error("Invalid response form from direct Gemini");
        }
      } catch (err) {
        console.error("Direct Gemini call failed:", err);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: "La sintonizzazione diretta del chip cerebrale sul client è fallita. Verifica la validità della chiave 'VITE_GEMINI_API_KEY' sintonizzata nelle variabili ambientali di compilazione di Netlify." 
        }]);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        let errMsg = data.text || "Si è verificato un ritardo nella sintonizzazione elettrofisiologica.";
        if (window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify')) {
          errMsg += "\n\n⚠️ **Nota su Sintonizzazione Netlify:** Poiché questa istanza è ospitata su **Netlify** (hosting statico), il server di backend Express non è in esecuzione. Per attivare l'AI qui, inserisci la variabile d'ambiente di compilazione `VITE_GEMINI_API_KEY` nelle impostazioni di Netlify e riesegui il deploy dell'applet.";
        }
        setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
      }
    } catch (err) {
      console.error(err);
      let errMsg = "La chiamata scientifica ha riscontrato un'eccezione temporanea. Verifica la connessione o l'API key.";
      if (window.location.hostname.includes('netlify.app') || window.location.hostname.includes('netlify')) {
        errMsg += "\n\n⚠️ **Nota su Sintonizzazione Netlify:** Questa istanza è ospitata su **Netlify** (hosting statico), che serve solo file front-end statici e non esegue il backend Express `/api/chat`. Per attivare la sintonizzazione AI direttamente dal browser su Netlify, configura nei segreti di Netlify la variabile d'ambiente di compilazione nominata **'VITE_GEMINI_API_KEY'** con la tua chiave Google Gemini e riesegui il deploy dell'applet.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const val = inputValue;
    setInputValue('');
    handleSendPrompt(val);
  };

  const handleResetChat = () => {
    // stop speech if any is speaking
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgIndex(null);

    setMessages([
      {
        role: 'assistant',
        content: "Archivio sintonizzato correttamente. Sono pronto per analizzare nuove tesi scientifiche o chiarire dettagli brevettuali. Cosa desideri approfondire?"
      }
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden" id="researcher-chat">
      {/* Decorative gradient top bar */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#0066CC] via-[#3399FF] to-[#0066CC]" />
      
      {/* Panel header */}
      <div className="px-6 py-4.5 border-b border-[#0066CC] bg-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1 px-2 bg-[#0066CC] text-white rounded-lg text-xs font-mono font-bold animate-pulse">
            AIC AI
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-black font-sans flex items-center gap-1.5">
              <span>Saggio AI Sincronico</span>
            </h3>
            <span className="text-[10px] text-black font-mono font-semibold">Sintonizzato su 49 Monografie ed Invenzioni del Registro SBN</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Automatic Vocal Reading Toggle */}
          <button
            onClick={() => {
              if (isAutoSpeak) {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                  window.speechSynthesis.cancel();
                }
                setSpeakingMsgIndex(null);
              }
              setIsAutoSpeak(!isAutoSpeak);
            }}
            className={`p-2 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold ${
              isAutoSpeak 
                ? 'text-[#0066CC] bg-white border-2 border-[#0066CC] hover:bg-white border-2 border-[#0066CC] border border-[#0066CC]' 
                : 'text-black border border-transparent hover:text-black hover:bg-white'
            }`}
            title={isAutoSpeak ? "Disattiva Lettura Vocale Automatica" : "Attiva Lettura Vocale Automatica"}
          >
            {isAutoSpeak ? (
              <Volume2 className="w-4 h-4 text-[#0066CC] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            <span className="hidden sm:inline font-sans text-[10px] uppercase font-bold tracking-wider">
              {isAutoSpeak ? "Voce ON" : "Voce OFF"}
            </span>
          </button>

          <button 
            onClick={handleResetChat}
            className="p-2 text-black border border-transparent hover:text-black rounded-lg hover:bg-white cursor-pointer transition-colors"
            title="Ripristina Sintonizzazione"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {onClose && (
            <button 
              onClick={onClose}
              className="p-2 text-black border border-transparent hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
              title="Chiudi conversazione"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, i) => {
          const isAi = msg.role === 'assistant';
          return (
            <div 
              key={i} 
              className={`flex ${isAi ? 'justify-start' : 'justify-end'} animate-fade-in`}
            >
              <div className={`flex items-center gap-2 max-w-[85%] ${isAi ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isAi 
                    ? 'bg-white border border-[#0066CC] text-black rounded-tl-none font-sans ' 
                    : 'bg-[#0066CC] text-white font-medium rounded-tr-none  font-sans border border-black/20'
                }`}>
                  {/* Tone indicator labels */}
                  {isAi && (
                    <span className="text-[9px] font-mono text-[#0066CC] block mb-1.5 font-bold uppercase tracking-wider">
                      FALACE ACADEMIC CONSULTATION ENGINE
                    </span>
                  )}
                  
                  {/* Message text */}
                  <div className="leading-relaxed">
                    {formatMessage(msg.content, isAi)}
                  </div>
                </div>

                {isAi && (
                  <button
                    onClick={() => speakText(msg.content, i)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer  shrink-0 flex items-center justify-center ${
                      speakingMsgIndex === i
                        ? 'bg-[#0066CC] text-white border-[#0066CC] animate-pulse scale-105'
                        : 'bg-white text-black hover:text-black border-[#0066CC] hover:border-[#0066CC]'
                    }`}
                    title={speakingMsgIndex === i ? "Interrompi lettura vocale" : "Leggi a voce alta"}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-[#0066CC] rounded-2xl rounded-tl-none p-4 max-w-[85%]">
              <span className="text-[9px] font-mono text-[#0066CC] block mb-2 font-bold uppercase tracking-wider animate-pulse">
                Sintonizzazione dei Sincronismi...
              </span>
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-2 h-2 rounded-full bg-[#0066CC] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#3399FF] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#0066CC] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input panel & suggestions */}
      <div className="border-t border-[#0066CC] bg-white/55 p-4 space-y-3">
        {/* Helper query tags */}
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(q.text)}
              className="text-[10px] font-sans px-2.5 py-1 bg-white hover:bg-white border border-[#0066CC] text-black hover:text-black rounded-lg transition-colors cursor-pointer font-bold "
            >
              {q.label}
            </button>
          ))}
        </div>

        {/* Submit Form */}
        <form onSubmit={handleSubmit} className="flex gap-2 relative">
          <input
            type="text"
            placeholder="Interroga sui libri, il Campo di Hertz, i brevetti o la fisica..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading}
            className="flex-1 bg-white border border-[#0066CC] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:border-[#0066CC] disabled:opacity-50 "
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-[#0066CC] hover:bg-black text-white p-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm cursor-pointer transition-colors  disabled:opacity-50 flex items-center justify-center gap-1"
          >
            <Send className="w-4 h-4 cursor-pointer" />
          </button>
        </form>
      </div>
    </div>
  );
}

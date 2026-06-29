import React, { useState } from 'react';
import { 
  FileText, ExternalLink, Download, Award, Calendar, 
  ChevronLeft, ChevronRight, Share2, Clipboard, Check, BookOpen, Clock, ShieldCheck
} from 'lucide-react';

interface PaperDetails {
  id: string;
  title: string;
  published: string;
  doi: string;
  type: string;
  views: number;
  downloads: number;
  pagesCount: number;
  link: string;
  abstract: string;
  keywords: string[];
  citation: string;
  pagesText: string[];
}

export default function ZenodoPaper() {
  const [activePaperId, setActiveDocId] = useState<string>("paper-brevetto");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const depositsList: PaperDetails[] = [
    {
      id: "paper-brevetto",
      title: "Brevetto AIC-Sync© Un Nuovo Paradigma per la Misurazione e l'Attivazione del Picco Creativo: Invenzione, Brevetto e Metodo di Luca Falace",
      published: "2025-09-01",
      doi: "10.5281/zenodo.17041593",
      type: "Preprint • Brevetto (Hardware + Algoritmo)",
      views: 100,
      downloads: 57,
      pagesCount: 4,
      link: "https://zenodo.org/records/17041593",
      keywords: ["Sincronismo Creativo", "Campo Unificato", "Energia Creativa", "Coscienza", "Fisica Quantistica", "Neuroscienze", "Luca Falace", "AIC-Sync"],
      abstract: "Il presente brevetto introduce il Sistema AIC-Sync© per quantificare l'Intensità Sincronica S(t) ed Unità Sincronica (US) attraverso riscontri biologici (EEG a onde gamma, variabilità cardiaca HRV) e stimoli bioadattivi. Rappresenta l'applicazione tecnologica ed algoritmica della Trilogia del Campo Unificato sviluppata dal 2005 al 2025.",
      citation: "Falace, L. (2025). Brevetto AIC-Sync© Un Nuovo Paradigma per la Misurazione e l'Attivazione del Picco Creativo Invenzione, Brevetto e Metodo di Luca Falace. Zenodo. https://doi.org/10.5281/zenodo.17041593",
      pagesText: [
        "PAGINA 1 — INTRODUZIONE E PRINCIPI BREVETTUALI\n\nBrevetto AIC-Sync©\nUn Nuovo Paradigma per la Misurazione e l'Attivazione del Picco Creativo\nInvenzione, Brevetto e Metodo di Luca Falace\n\nMetodo, fondamenti teorici e applicazioni tecnologiche di un sistema integrato per la quantificazione degli stati sincronici.\nLa ricerca neuroscientifica ha storicamente affrontato la sfida di quantificare oggettivamente i processi creativi e gli stati di sincronicità cognitiva. Il presente lavoro introduce il Sistema AIC-Sync©, che rappresenta l'applicazione tecnologica della Trilogia del Campo Unificato sviluppata dal 2005 al 2025, culminando in una doppia innovazione brevettuale che integra acquisizione neurofisiologica, modellazione matematica proprietaria e protocolli operativi strutturati per la misurazione e l'attivazione controllata del 'picco creativo'.\n\nIl sistema brevettuale si articola in due componenti integrati: Un modulo hardware multi-sensore e un core algoritmico software.",
        "PAGINA 2 — CARATTERISTICHE HARDWARE & ALGORITMICA\n\n1. Brevetto Hardware:\nDispositivo multisensoriale che include caschetto EEG per onde gamma (30-100 Hz), sensori HRV per coerenza cardiaca, sensori indossabili miniaturizzati e moduli di input comportamentale, con feedback bioadattivo attraverso LED RGB, vibrazioni e stimolazione sonora.\n\n2. Brevetto Algoritmo:\nSistema computazionale proprietario basato su funzioni logistiche con retroazione dinamica per il calcolo dell'Intensità Sincronica S(t) e dell'Unità Sincronica (US), implementando il modello matematico dell'Energia Creativa (φ) sviluppato nella teoria del Campo Unificato.\n\nIl protocollo metodologico denominato ciclo PELAQ (Pensiero-Emozione-Lateralità-Azione-Coerenza Quantistica) deriva direttamente dalla formalizzazione tensoriale dell'Energia Creativa come campo scalare quantistico, trasformando venti anni di ricerca teorica in applicazione tecnologica verificabile.",
        "PAGINA 3 — STORIA E STRUTTURA DELLA TRILOGIA\n\nInquadramento Teorico: La Trilogia del Campo Unificato (2005-2025)\n\n• Volume I - 'Teoria Generale del Sincronismo Creativo e Teoria del Campo Unificato AIC' (2005-2015)\nQuesto volume ha stabilito i primi modelli teorici del Sincronismo Creativo come fenomeno misurabile, definendo le Attività Intellettive Creative (AIC) come categoria scientifica quantificabile e introducendo il concetto del sistema AIC-Sync© come ponte tra creatività, pensiero laterale e formalizzazione matematica.\n\n• Volume II - 'Teoria del Campo Unificato (Energia Creativa)' (2016-2024)\nIl secondo volume ha fornito la formalizzazione matematica completa, introducendo l'Energia Creativa (EC) come campo scalare quantistico φ e sviluppando la prima unificazione formale tra Relatività Generale e Meccanica Quantistica attraverso la modifica tensoriale delle equazioni di Einstein:\n\nEC = G_μν + α φ g_μν - 8πG/c^4 (T_μν + β ∇_μ ∇_ν φ + Λ_EC g_μν)\n\nDove Λ_EC = γφ² rappresenta una 'costante cosmologica dinamica' modulata dalla coscienza, con costanti di accoppiamento α ≈ 10^(-52) kg^(-1)⋅m^(-1)⋅s².",
        "PAGINA 4 — APPLICAZIONI & COLLASSO QUANTISTICO\n\n• Volume III - 'Sincronismo Creativo, Kundalini e il Campo Unificato' (2024-2025)\nIl terzo volume ha trasformato la teoria in protocolli applicativi, sviluppando il metodo 'Compressione e Rilascio' per l'attivazione del Campo Unificato attraverso la Kundalini e altre AIC, come vettore operativo, con sperimentazione diretta su tecnologia, natura e fenomeni probabilistici.\n\nDall'Equazione alla Tecnologia: La Formula Sintetica del Sincronismo Creativo\nIl cuore matematico del sistema AIC-Sync© deriva dalla Formula Sintetica del Sincronismo Creativo sviluppata nel Volume II:\n\nΠ_Creativa = Σ_i w_i σ(X_i) × e^(-Δt/τ) × Ψ_quantistica × G_metrica\n\nQuesta equazione unifica parametri psicofisici (P,E,L,A,Q) e fisici, descrivendo come la creatività generi effetti sincronici attraverso la modulazione quantistica della realtà. Il brevetto algoritmo implementa computazionalmente questa formulazione teorica, trasformando venti anni di ricerca in dispositivo tecnologico misurabile."
      ]
    },
    {
      id: "paper-sincronismo",
      title: "La Teoria del Sincronismo Creativo: Formalizzazione del Campo Unificato Esteso e della Potenzialità Creativa con Evidenze Sperimentali Preliminari",
      published: "2025-09-08",
      doi: "10.5281/zenodo.17080308",
      type: "Preprint • Articolo Scientifico",
      views: 136,
      downloads: 60,
      pagesCount: 4,
      link: "https://zenodo.org/records/17080308",
      keywords: ["Sincronismo Creativo", "Teoria del Campo Unificato", "Energia Creativa", "Coscienza Quantistica", "Fisica della Coscienza", "Luca Falace", "Modelli Matematici"],
      abstract: "Questo articolo presenta la formalizzazione matematica completa e definitiva della Teoria Generale del Sincronismo Creativo, un paradigma interdisciplinare innovativo che integra fisica teorica avanzata, neuroscienze computazionali e filosofia della mente. Proponiamo due modelli fondamentali: il Campo Unificato Esteso (EC_μν) e la Potenzialità Creativa Totale (Π_Creativa).",
      citation: "Falace, L. (2025). La Teoria del Sincronismo Creativo: Formalizzazione del Campo Unificato Esteso e della Potenzialità Creativa con Evidenze Sperimentali Preliminari. Zenodo. https://doi.org/10.5281/zenodo.17080308",
      pagesText: [
        "PAGINA 1 — INTRODUZIONE SCIENTIFICA\n\nLa Teoria del Sincronismo Creativo: Formalizzazione del Campo Unificato Esteso e della Potenzialità Creativa con Evidenze Sperimentali Preliminari\n\nAutore: Dott. Luca Falace\nAffiliazione: Centro di Ricerca CESP-AIC Indipendente per la Fisica della Coscienza - Teoria Generale del Sincronismo Creativo\nData di Pubblicazione: Settembre 2025\nDOI: 10.5281/zenodo.17080308\nLicenza: CC BY-NC-ND 4.0 International\n\nPrefazione:\nQuesto articolo presenta la formalizzazione matematica completa e definitiva della Teoria Generale del Sincronismo Creativo, un paradigma interdisciplinare innovativo che integra fisica teorica avanzata, neuroscienze computazionali e filosofia della mente.",
        "PAGINA 2 — DUE MODELLI MATEMATICI CRUCIALI\n\nProponiamo due modelli matematici fondamentali:\n\n1. Il Campo Unificato Esteso (EC_μν):\nUna modificazione delle equazioni di campo di Einstein che incorpora un campo scalare quantistico φ associato alla coscienza attiva dell'osservatore.\n\n2. La Potenzialità Creativa Totale (Π_Creativa):\nUn operatore quantistico che quantifica e traccia la probabilità di occorrenza di eventi sincronici sulla base di stimoli neurocognitivi coordinati.\n\nQuesti modelli si distinguono radicalmente da approcci teorici esistenti come l'Integrated Information Theory (IIT) di Tononi e l'Orchestrated Objective Reduction (Orch-OR) di Penrose-Hameroff, proponendo la coscienza non come epifenomeno ma come agente fisico attivo con effetti misurabili sulla struttura spaziotemporale.",
        "PAGINA 3 — PREDIZIONI NUMERICHE & PILOT STUDY\n\nLe predizioni del modello includono:\n- Microvariazioni gravitazionali locali misurabili (Δg/g ≈ 10⁻¹²)\n- Correlazioni statisticamente significative tra coerenza EEG gamma (40-100 Hz) e fluttuazioni interferometriche (ρ > 0.7, p < 0.01)\n\nTali predizioni sono supportate da studi pilota controllati (N=50, 2023; N=100, 2024) condotti con il Sistema AIC-Sync©, descritto in Allegato A.\n\nRiconosciamo la natura pionieristica del framework e invitiamo attivamente la comunità scientifica alla sua verifica attraverso protocolli di replica indipendente. In accordo con i principi della scienza aperta, tutti i dati sperimentali e il codice di analisi sono pubblicati su Zenodo.",
        "PAGINA 4 — CAMBIO DI PARADIGMA\n\nIntroduzione e Contesto Scientifico:\n\nLa Teoria Generale del Sincronismo Creativo avanza un cambio di paradigma fondamentale nell'approccio scientifico al problema della coscienza, suggerendo che essa non sia un epifenomeno computazionale emergente, bensì un agente fisico attivo in grado di interagire dinamicamente con la geometria dello spazio-tempo attraverso un campo scalare quantistico φ.\n\nQuesta ipotesi rivoluzionaria, concettualmente ispirata ai pionieristici lavori di Jung (1952) sulla sincronicità, alle intuizioni fisico-matematiche di Pauli (1994), e agli sviluppi contemporanei nella fisica dell'informazione quantistica di Wheeler (1990) e Tegmark (2014), si distingue radicalmente da teorie esistenti."
      ]
    },
    {
      id: "paper-livelli",
      title: "I Nove Livelli della Sincronicità nella Teoria del Sincronismo Creativo",
      published: "2025-12-02",
      doi: "10.5281/zenodo.17793651",
      type: "Journal Article • Studio Classificatorio",
      views: 152,
      downloads: 110,
      pagesCount: 4,
      link: "https://zenodo.org/records/17793651",
      keywords: ["Classificazione Sincronicità", "Jung", "Pauli", "9 Livelli", "Sincronismo Creativo", "Fenomenologia", "Fisica della Coscienza", "Zenodo CERN"],
      abstract: "Questo saggio propone una tassonomia sistematica e formale in 9 gradi progressivi di complessità della sincronicità, mossa dal superamento del vuoto classificatorio presente in letteratura da Jung ed Husserl, fino ai moderni paradigmi tecnologico-quantistici.",
      citation: "Falace, L. (2025). I Nove Livelli della Sincronicità nella Teoria del Sincronismo Creativo. Zenodo. https://doi.org/10.5281/zenodo.17793651",
      pagesText: [
        "PAGINA 1 — STATO FENOMENOLOGICO\n\nI Nove Livelli della Sincronicità nella Teoria del Sincronismo Creativo\n\nEstratto dal Volume III del Trattato sulla Teoria di Campo Unificato: una nuova classificazione della sincronicità\nINTERAZIONE PSICOFISICA CON IL CAMPO UNIFICATO\nApplicazioni Sperimentali\nAutore: Luca Falace\nData di pubblicazione: 2 dicembre 2025 - Italia\n\nEstratto:\nLa sincronicità, concetto introdotto da Carl Gustav Jung come 'coincidenza significativa acausale' tra eventi psichici e fisici, rappresenta uno dei fenomeni più enigmatici nell'intersezione tra psicologia del profondo e fenomenologia dell'esperienza. Nonostante il riconoscimento del fenomeno, la letteratura manca di una tassonomia sistematica che ne distingua le gradazioni, l'intensità e le modalità operative.",
        "PAGINA 2 — STRUTTURA DEL MODELLO GRADUATO\n\nQuesto articolo propone una classificazione formale dei livelli di sincronicità, articolata in nove gradi progressivi di complessità e interazione. La scala si estende dalla sincronicità passiva e osservazionale fino alla sincronicità creativa e generativa, costituendo un nucleo teorico della più ampia Teoria del Sincronismo Creativo.\n\nIl modello integra i fondamenti junghiani con apporti della psicologia contemporanea, della fenomenologia husserliana, del pensiero laterale di De Bono e delle tradizioni contemplative orientali. Essa fornisce una mappa fenomenologica per comprendere la progressione dall'esperienza sincronica casuale alla partecipazione cosciente e co-creativa.",
        "PAGINA 3 — CONFRONTO JUNG-PAULI\n\nLa definizione junghiana:\nCarl Gustav Jung introdusse il concetto di sincronicità nel 1952, definendola come una 'coincidenza significativa' tra uno stato psichico sottomesso ed un evento oggettivo esterno, in assenza di nesso causale classico. Jung lo propose come principio esplicativo complementare alla causalità meccanica.\n\nIl vuoto classificatorio della letteratura:\nSebbene la sincronicità sia stata discussa, mancava una gerarchia sistematica. Il presente vuoto viene colmato con la scala a nove livelli (Fase Latente: Livelli 1-3, Fase di Transizione: Livelli 4-6, Fase Co-creativa: Livelli 7-9) caratterizzati da parametri specifici di intensità, frequenza e partecipazione conscia del soggetto.",
        "PAGINA 4 — I 9 LIVELLI SINTETIZZATI\n\nSchema della progressione dei 9 Livelli:\n\n• Livello 1: Sincronicità Debole (Passiva-Osservazionale)\n• Livello 2: Tematica (Pattern Ricorrenti)\n• Livello 3: Direzionale (Orientativa / Navigazione esistenziale)\n• Livello 4: Catalitica (Accelerativa / Sblocco di flussi)\n• Livello 5: Operativa (Partecipativa / Dialogo attivo col campo)\n• Livello 6: Riflessiva (Specchio Immediato / Coerenza e coordinazione)\n• Livello 7: Generativa (Pieno rilascio del potenziale creativo)\n• Livello 8: Magnetica (Hub attrattivo e gravità sincronica stabile)\n• Livello 9: Sincronicità Creativa (Co-creazione pura, non-dualità, risonanza a 51.625 GHz)"
      ]
    },
    {
      id: "paper-interazione",
      title: "Interazione Psicofisica con il Campo Unificato AIC-EC: Formalizzazione della Legge S = φ(f) e del Ciclo Operativo AIC-EC-HZ",
      published: "2026-05-27",
      doi: "10.5281/zenodo.20414984",
      type: "Publication • Ricerca e Sviluppo",
      views: 34,
      downloads: 21,
      pagesCount: 4,
      link: "https://zenodo.org/records/20414984",
      keywords: ["Legge S = φ(f)", "Ciclo AIC-EC-HZ", "Risonanza DNA", "CERN Zenodo", "Interazione Psicofisica", "Spazio-Tempo", "Luca Falace", "MAEE"],
      abstract: "Il presente articolo formalizza per la prima volta la Legge di Risonanza Sincronica S = φ(f) ed il ciclo operativo del Campo Unificato. Dimostra sperimentalmente che le sincronicità umane non sono eventi casuali ma provocate da risonanze biologiche hertziane proiettate.",
      citation: "Falace, L. (2026). INTERAZIONE PSICOFISICA CON IL CAMPO UNIFICATO AIC-EC: Formalizzazione della Legge S = φ(f) e del Ciclo Operativo AIC-EC-HZ. Zenodo. https://doi.org/10.5281/zenodo.20414984",
      pagesText: [
        "PAGINA 1 — IL PARADIGMA DELLA RISONANZA\n\nINTERAZIONE PSICOFISICA CON IL CAMPO UNIFICATO AIC-EC\nFormalizzazione della Legge S = φ(f) e del Ciclo Operativo AIC-EC-HZ\n\nDott. Luca Falace\nTrilogia AIC-EC, Volume III (2005–2026)\n\nAbstract:\nIl presente articolo formalizza la Legge di Risonanza Sincronica S = φ(f) e il ciclo operativo AIC-EC-HZ, argomentando che le sincronicità umane non sono fenomeni acausali, ma il risultato misurabile di una risonanza tra la frequenza hertziana del campo bio-elettromagnetico dell'operatore e il Campo Unificato EC (φ). Per la prima volta nella storia della fisica, viene proposto un metodo sperimentale coerente e replicabile per programmare fenomeni sincronici attraverso frequenze biologiche e campi intenzionali.",
        "PAGINA 2 — IL MECCANISMO MAEE E DNA\n\nIl protocollo sperimentale AIC-Sync© induce coerenza interemisferica superiore al 90% e risonanza molecolare nel DNA alla frequenza millimetrica (EHF) di 51.625 GHz, consentendo la proiezione di algoritmi hertziani nel dominio spazio-temporale. \n\nL'estensione dell'equazione di Dirac, delle equazioni di Maxwell e del tensore di Einstein con il campo scalare EC (φ) fornisce il fondamento matematico per comprendere come la coscienza dell'osservatore — attraverso il Meccanismo di Amplificazione Energetica Endogena (MAEE) — interagisca fisicamente con il Campo Unificato, generando sincronicità di classe S prevedibili e riproducibili.\n\nContributo metodologico: Questo studio dimostra un metodo sperimentale coerente per indurre e misurare fenomeni sincronici attraverso frequenze biologiche.",
        "PAGINA 3 — LE 10 RISULTANZE SCIENTIFICHE\n\nOgni risultanza costituisce una scoperta autonoma e proprietà intellettuale indipendente, supportata dalle formule depositate:\n\n1. Formalizzazione dell'Intento (AIC): Attività cognitiva non come epifenomeno ma flusso quantificabile.\n2. Derivazione dell'Unità Sincronica (US): US = Tr(C)/Δt.\n3. Postulazione del Potenziale Scalare (φ): φ = ∫AIC(t) dt.\n4. Estensione della Metrica di Einstein: G_μν + Λg_μν = κ(T_μν + T^φ_μν).\n5. Riformulazione delle Equazioni di Maxwell: termini β∇φ e γ∇φ.\n6. Meccanismo di Trasduzione (MAEE): Eout(t) = η∫[Im(t) • Bc(t)] dt.\n7. Risonanza EHF-DNA: Interazione millimetrica a 51.625 GHz (±100 MHz).",
        "PAGINA 4 — QUANTIZZAZIONE DELLA REALTÀ & CONCLUSIONI\n\n8. Modellizzazione della Quantizzazione della Realtà: La sincronicità evolve per salti discreti di frequenza — i 9 Livelli — analoga agli orbitali atomici di Bohr: ΔS = φ(f2) - φ(f1).\n9. Sviluppo dell'Algoritmo di Induzione (AIC-Sync©) per il Picco Creativo.\n10. Sintesi del Campo Unificato HZ — Legge di Risonanza Sincronica: Unificazione dei domini informativo, energetico e materico in: S = φ(f).\n\nL'osservatore fisico non è separabile dal campo che osserva. In ogni scala della realtà fisica — subatomica, macroscopica, biologica — l'osservatore entra nel campo e ne modifica le dinamiche attraverso interazione fisica diretta."
      ]
    }
  ];

  const activePaper = depositsList.find(p => p.id === activePaperId) || depositsList[0];

  const handleCopyCitation = (paperId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(paperId);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    if (direction === 'next' && currentPage < activePaper.pagesCount) {
      setCurrentPage(prev => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="bg-white border-2 border-[#0066CC] rounded-3xl p-6 md:p-8" id="cern-zenodo-registry">
      
      {/* Zenodo Header Emulation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#0066CC]/50 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-slate-100 border border-[#0066CC] rounded-xl text-slate-800">
            <Award className="w-6 h-6 text-[#0066CC]" />
          </div>
          <div>
            <h3 className="font-serif font-black text-base text-black uppercase tracking-wider">
              Depositi Scientifici CERN Zenodo
            </h3>
            <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
              Archivio Digitale Scientifico Dell'Unione Europea • Preprints, Papers &amp; Brevetti Certificati
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[9px] font-mono font-bold uppercase text-white bg-[#0066CC] px-3.5 py-1.5 rounded-full shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-white" />
          <span>Europe-West Research Access Allowed</span>
        </div>
      </div>

      <p className="text-xs text-black leading-relaxed mb-6 font-sans">
        In accordo con i principi di trasparenza totale e open-access, la produzione teorica, brevettuale ed inventiva del <strong>Dott. Luca Falace</strong> è depositata e catalogata con indici perenni <strong>DOI (Digital Object Identifier)</strong> sui server del <strong>CERN (Centro Europeo di Ricerca Nucleare)</strong> di Ginevra tramite il repository <strong>Zenodo</strong>.
      </p>

      {/* Grid of the 4 Deposits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5 mb-8">
        {depositsList.map((paper) => {
          const isActive = activePaperId === paper.id;
          return (
            <button
              key={paper.id}
              onClick={() => {
                setActiveDocId(paper.id);
                setCurrentPage(1);
              }}
              className={`p-4 rounded-xl border transition-all text-left flex flex-col justify-between h-auto cursor-pointer ${
                isActive
                  ? 'bg-[#00468C] border-transparent ring-2 ring-[#0066CC] text-white'
                  : 'bg-white border-slate-200 hover:border-[#0066CC] hover:bg-slate-50 text-black'
              }`}
            >
              <div>
                <span className={`text-[8.5px] font-mono uppercase px-2.5 py-1 rounded font-black block w-fit mb-2.5 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-[#0066CC] bg-[#0066CC]/10'
                }`}>
                  {paper.published}
                </span>
                <strong className={`text-[11px] font-bold block leading-snug line-clamp-3 mb-2 font-serif ${
                  isActive ? 'text-white' : 'text-black'
                }`}>
                  {paper.title}
                </strong>
                <p className={`text-[10px] font-mono leading-none lowercase ${
                  isActive ? 'text-slate-200' : 'text-slate-500'
                }`}>
                  {paper.type}
                </p>
              </div>
              
              <div className={`flex justify-between items-center mt-3 pt-2.5 border-t text-[9px] font-mono ${
                isActive ? 'border-white/20 text-slate-200' : 'border-slate-100 text-slate-600'
              }`}>
                <span className="font-bold">DOI: ..{paper.doi.substring(13)}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Selected Document Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 items-start">
        
        {/* Left Side: Web Page Details Emulation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <span className="text-[8.5px] font-mono text-[#0066CC] uppercase font-bold tracking-widest block mb-1">
              Dettagli del Deposito CERN-Zenodo
            </span>
            <h4 className="text-xs font-sans font-bold text-black uppercase leading-snug font-serif">
              {activePaper.title}
            </h4>
          </div>

          <div className="space-y-2 text-[10.5px]">
            <div className="flex justify-between pb-1.5 border-b border-slate-200">
              <span className="text-slate-500 font-mono uppercase text-[9px]">DOI Permanente</span>
              <span className="font-mono text-black font-bold select-all">{activePaper.doi}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-slate-200">
              <span className="text-slate-500 font-mono uppercase text-[9px]">Tipo Risorsa</span>
              <span className="text-black font-semibold">{activePaper.type}</span>
            </div>
            <div className="flex justify-between pb-1.5 border-b border-slate-200">
              <span className="text-slate-500 font-mono uppercase text-[9px]">Pubblicato</span>
              <span className="font-mono text-black">{activePaper.published}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-mono uppercase text-[9px]">Editore</span>
              <span className="text-black font-bold">Zenodo Repository, CERN Data Centre</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-3 rounded-lg text-[10.5px]">
            <strong className="text-black uppercase text-[8px] font-mono block mb-1">Abstract Ufficiale</strong>
            <p className="text-slate-800 leading-relaxed font-sans text-xs">
              {activePaper.abstract}
            </p>
          </div>

          <div className="flex flex-wrap gap-1">
            {activePaper.keywords.map((kw, i) => (
              <span key={i} className="text-[8px] font-mono font-bold text-[#0066CC] uppercase bg-white border border-[#0066CC]/30 px-2 py-0.5 rounded">
                #{kw}
              </span>
            ))}
          </div>

          {/* Citation card and copy details */}
          <div className="bg-white border border-[#0066CC]/40 p-3 rounded-lg text-[10px]">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-500 uppercase text-[8px] font-mono font-bold">Citazione Standard (Stile APA)</span>
              <button
                onClick={() => handleCopyCitation(activePaper.id, activePaper.citation)}
                className="text-[#0066CC] hover:text-black flex items-center gap-1 font-mono text-[8px] uppercase tracking-wider font-bold cursor-pointer"
                title="Copia citazione"
              >
                {copiedId === activePaper.id ? (
                  <>
                    <Check className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-bold">Copiato!</span>
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3 h-3" />
                    <span>Copia Citazione</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-slate-700 leading-relaxed font-serif italic select-all">
              "{activePaper.citation}"
            </p>
          </div>

          {/* External Access Links */}
          <div className="flex gap-2">
            <a
              href={activePaper.link}
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="flex-1 bg-white border border-black hover:bg-black hover:text-white text-center py-2.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Vedi record su Zenodo.org</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Right Side: Virtual Unified Paper PDF Simulator Reader */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between">
          
          {/* Virtual Reader Title */}
          <div className="bg-[#00468C] px-4 py-3 flex justify-between items-center text-white border-b border-black">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-white" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">Letto-Simulatore di Consultazione Coerente</span>
            </div>
            <div className="text-[9px] font-mono bg-white/10 px-2 py-0.5 border border-white/20 rounded text-white/95">
              Standard PDF Stream
            </div>
          </div>

          {/* Display simulated PDF area */}
          <div className="p-6 bg-slate-100 flex flex-col items-center justify-center min-h-[340px] select-text">
            <div className="bg-white border-l-4 border-l-[#0066CC] border border-[#0066CC]/40 p-6 rounded shadow-sm w-full max-w-lg aspect-[5/6] overflow-y-auto relative font-sans leading-relaxed">
              
              {/* Paper Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none">
                <span className="font-serif font-black text-2xl uppercase tracking-widest text-[#0066CC] rotate-45 select-none">
                  FALACE RESEARCH • CERTIFIED
                </span>
              </div>

              <div className="relative z-10 text-xs text-slate-800 space-y-4">
                <div className="flex justify-between items-center text-[7.5px] font-mono text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">
                  <span>Zenodo CERN Repository Database</span>
                  <span>DOI: {activePaper.doi}</span>
                </div>

                {/* Simulated Content inside Page */}
                <span className="whitespace-pre-line font-serif leading-relaxed text-black text-[11px] block">
                  {activePaper.pagesText[currentPage - 1]}
                </span>
              </div>
            </div>

            {/* Page flip navigation */}
            <div className="flex justify-between items-center w-full max-w-lg mt-4 px-1 gap-2">
              <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange('prev')}
                className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-black hover:text-[#00468C] rounded-lg text-[10px] font-mono font-bold uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                &larr; Indietro
              </button>
              
              <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                Pagina {currentPage} di {activePaper.pagesCount}
              </span>

              <button
                disabled={currentPage >= activePaper.pagesCount}
                onClick={() => handlePageChange('next')}
                className="px-3.5 py-1.5 bg-[#00468C] hover:bg-black text-white rounded-lg text-[10px] font-mono font-bold uppercase transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Avanti &rarr;
              </button>
            </div>
          </div>

          {/* Micro disclaimer bottom */}
          <div className="bg-slate-50 border-t border-slate-100 px-4 py-2.5 text-[8.5px] font-mono text-slate-500 flex justify-between uppercase">
            <span>© 2025-2026 Luca Falace • Tutti i Diritti Riservati</span>
            <span>Accredited Open Science</span>
          </div>

        </div>

      </div>

    </div>
  );
}

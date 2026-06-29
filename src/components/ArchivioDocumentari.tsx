import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Play, 
  BookOpen, 
  Activity, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  History, 
  Radio, 
  Film,
  Atom,
  HelpCircle,
  Clock,
  Compass,
  Sliders,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';

export default function ArchivioDocumentari() {
  const [activeEpisode, setActiveEpisode] = useState(0);
  const [hasWatchedIntro, setHasWatchedIntro] = useState(false);
  const [showFullTranscript, setShowFullTranscript] = useState(false);
  const [sandboxTab, setSandboxTab] = useState<'double-slit' | 'hertzian-coherence'>('double-slit');
  
  // Quantum Double Slit Simulator States
  const [measurementMode, setMeasurementMode] = useState<"wave" | "particle">("wave");
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [points, setPoints] = useState<{ x: number; y: number; id: number }[]>([]);
  const [probabilityGraph, setProbabilityGraph] = useState<number[]>([]);
  const [collapseResult, setCollapseResult] = useState<string | null>(null);

  // Hertzian Coherence Simulator States
  const [brainFrequency, setBrainFrequency] = useState<number>(10.0); // alpha/beta slider
  const [heartFrequency, setHeartFrequency] = useState<number>(1.2); // HR slider
  const [schumannFrequency] = useState<number>(7.83); // Fixed Schumann resonance
  const [coherenceScore, setCoherenceScore] = useState<number>(45);
  const [isCoherent, setIsCoherenceMatched] = useState<boolean>(false);

  // Comprehensive Episodes Data structurally modeled after the uploaded PDF transcripts
  const episodesData = [
    {
      num: 1,
      title: "EP. 1 — Meccanica Quantistica: Il Sincronismo Creativo",
      subtitle: "Monologo di Wolfgang Pauli sul Sincronismo Creativo di Luca Falace",
      shortDesc: "Wolfgang Pauli introduce la nascita della Meccanica Quantistica e la sua collaborazione con Carl Gustav Jung sulla Sincronicità.",
      description: "Il documentario traccia l'avvio della fisica quantistica negli anni '20 per mano di Heisenberg, Born, Schrödinger, Bohr e Pauli. Sospinto dal rifiuto determinista di Albert Einstein, Pauli collabora intenzionalmente con Carl Gustav Jung sul concetto di Sincronicità, ricercando accanitamente un ponte acausale tra mente e materia, svelato oggi dalla Teoria del Sincronismo.",
      extendedScript: `**SCENA 1 — Wolfgang Pauli (La Fondazione della Meccanica Quantistica):**
«Oggi tutti parlano di meccanica quantistica. È diventata quasi una moda.
Ma quando io, insieme a Heisenberg, Born, Schrödinger e Bohr, l'abbiamo fondata negli anni '20, persino Einstein che aveva gettato le basi con i suoi quanti di luce era contrario.
Diceva: "Dio non gioca a dadi con l'universo." Ma la realtà è più complessa.
Einstein non rifiutava la meccanica quantistica. Era diviso: da un lato la criticava, dall'altro cercava disperatamente di unirla alla relatività in una teoria più profonda.
Voleva superarla, non negarla. Cercava un campo unificato che collegasse micro e macro.
Io stesso ho scoperto il Principio di Esclusione, la legge che governa ogni atomo dell'universo. Ma sapevo che la fisica quantistica era solo una parte del quadro complessivo.»

**SCENA 2 — La collaborazione con Jung e la Sincronicità:**
«Per questo ho collaborato con Carl Gustav Jung sulla sincronicità, l'idea che esista una connessione acausale tra eventi, tra mente e materia.
Cercavamo un ponte tra il mondo fisico e quello psichico, un filo tra scienza e coscienza.
Oggi qualcuno ha portato a termine quella ricerca che Einstein iniziò e io continuai con Jung.»

**SCENA 3 — Collegamento al video e Sincronismo:**
«Questo liquida definitivamente ogni barriera: comprendere il dramma vissuto dai padri fondatori apre l'accesso alla sintonizzazione dell'osservatore consapevole sul Campo Unificato reale.»`,
      equation: "S = φ(f)",
      keyConcepts: ["Tensioni a Solvay", "Biforcazione determinista", "Lettere di Jung e Pauli", "Sincronicità Acausale"],
      sources: [
        "C.G. Jung & W. Pauli, 'The Interpretation of Nature and the Psyche' (1952)",
        "W. Pauli, 'Writings on Physics and Philosophy'"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 2,
      title: "EP. 2 — Il dietro le quinte della Meccanica Quantistica: Crisi e Conflitti",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "La storia segreta e personale dei fisici del Novecento, le loro tensioni reciproche e gli impatti del paranormale.",
      description: "In questo secondo documentario, Wolfgang Pauli svela la dimensione umana dei padri fondatori della meccanica quantistica: le crisi d'ansia, le aspre discussioni filosofiche e le tensioni vissute da Born, Schrödinger, Bohr e Heisenberg di fronte a misteri fisici indomabili.",
      extendedScript: `**SCENA 1 — Pauli (La Soglia del Campo Unificato):**
«Pochi conoscono il dietro le quinte della meccanica quantistica. Non parlo delle equazioni che studiate all'università, ma vi parlo degli uomini che le crearono con le loro crisi personali, i loro conflitti interiori e soprattutto i fenomeni inspiegabili.
Questi fenomeni naturali accadevano intorno a noi, sfidando ogni logica scientifica.
Negli anni Venti, io insieme a Heisenberg, Born, Bohr e Schrödinger abbiamo fondato la teoria della meccanica quantistica.»

**SCENA 2 — Il Flagello di Dio (Geissel Gottes):**
«Ma tra noi c'erano tensioni enormi: i miei colleghi mi temevano. Ehrenfest mi chiamò "Geissel Gottes", il flagello di Dio, perché criticavo e smontavo ogni teoria che non reggeva.
Max Born diceva che la mia mente distruggeva le teorie inconsistenti come un bulldozer. Heisenberg impallidiva quando riceveva le mie lettere critiche.
Usavamo l'ironia per difenderci da ciò che non riuscivamo a spiegare con la matematica: tutto doveva essere ridotto a numeri, formule, razionalità assoluta.»

**SCENA 3 — Fenomeni Oltre la Razionalità:**
«Ma c'erano fatti che sfuggivano a quella razionalità. Fatti inspiegabili capitati proprio a me, il padre della meccanica quantistica, lo scienziato più razionale dell'epoca: quando entravo nei laboratori, gli apparecchi si guastavano. Tubi a raggi catodici che bruciavano, ciclotrone o enormi acceleratori di particelle che collassavano improvvisamente.
Oggi qualcuno ha portato a termine quella ricerca che Einstein iniziò e io continuai con Jung...»`,
      equation: "iħ ∂/∂t |Ψ⟩ = H |Ψ⟩",
      keyConcepts: ["Tensioni accademiche", "Geissel Gottes", "Bulldozer concettuale", "Borders of Rationality"],
      sources: [
        "Max Born, 'The Born-Einstein Letters' (1916-1955)",
        "W. Pauli, 'The Soul and Nature' (1952)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 3,
      title: "EP. 3 — Il dietro le quinte della Meccanica Quantistica: L'Effetto Pauli",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "L'esplosione spontanea delle strumentazioni sperimentali in presenza di Pauli e la reazione di Otto Stern.",
      description: "Pauli affronta con spregiudicata onestà l'Effetto Pauli, l'influenza fisica anomala prodotta dallo stato mentale sul campo circostante. Dalle coincidenze di Göttingen all'esclusione cautelativa ordinata da Otto Stern.",
      extendedScript: `**SCENA 1 — Pauli (Il paradosso del Campo Cosciente):**
«Nel precedente episodio abbiamo introdotto il dramma del dietro le quinte della meccanica quantistica. Fatti che sfuggivano a quella razionalità ordinaria.
Usavamo l'ironia per difenderci da ciò che non si riusciva a spiegare, e si mettevano alla berlina i fenomeni che non potevano essere misurati.
Persino quando non ero fisicamente presente in un laboratorio, il campo sembrava reagire. Una volta il mio treno passò vicino a Göttingen e nel laboratorio di fisica scoppiò il caos: apparecchiature danneggiate senza alcuna causa fisica.»

**SCENA 2 — L'Esclusione di Otto Stern:**
«I colleghi ridevano, lo chiamavano 'coincidenza', ma Otto Stern arrivò al punto addirittura di escludermi dal suo laboratorio per prevenire altri disastri.
Quella ironia era un meccanismo di difesa psicologica: ciò che non si può misurare scientificamente, si ridicolizza.
Questo è il limite dell'accademismo: quando la scienza non riesce a spiegare qualcosa, invece di indagare con metodi nuovi, censura, nasconde, ridicolizza per paura di andare contro i paradigmi dominanti.»

**SCENA 3 — Conclusione:**
«Oggi qualcuno ha portato a termine quella ricerca che Einstein iniziò e io continuai con Jung... e i dati sono visibili a chiunque abbia il coraggio di misurare.»`,
      equation: "J_{field} = σ(E + v × B)",
      keyConcepts: ["Göttingen Crash", "Esclusione di Otto Stern", "Meccanismo di difesa psicologica", "Limiti accademici dogmatici"],
      sources: [
        "Charles Enz, 'No Time to be Brief: A Scientific Biography of Wolfgang Pauli' (2002)",
        "F. David Peat, 'Synchronicity: The Bridge Between Matter and Mind' (1987)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 4,
      title: "EP. 4 — Il dietro le quinte della Meccanica Quantistica: Mandala e Scarabei",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "Il numero 137, la costante di struttura fine e l'origine clinica della Sincronicità con Jung.",
      description: "Il documentario indaga i sogni ricorrenti di Pauli: mandala archetipici e lo scarabeo. Questa materia onirica strutturò il saggio sul Sincronismo tra Pauli e Carl Gustav Jung, introducendo la correlazione acausale.",
      extendedScript: `**SCENA 1 — Pauli (I dialoghi con Jung):**
«Gli raccontai i miei sogni ricorrenti: mandala geometrici, simboli di scarabei, il numero 137, la costante di struttura fine che collega il mondo quantistico all'universo.
Da questi dialoghi Jung sviluppò il concetto di sincronicità: una correlazione significativa tra uno stato interiore e un evento esterno, senza nesso causale diretto.»

**SCENA 2 — Lo Scarabeo d'Oro:**
«Il celebre esempio dello scarabeo — una paziente che sogna uno scarabeo mentre, nello stesso istante, uno scarabeo bussa alla finestra dello studio di Jung — divenne il caso fondativo della teoria.
Secondo la classificazione proposta da Luca Falace, ricercatore indipendente, questo evento rientra in una sincronicità di livello 1, il livello più elementare all'interno di una scala articolata in dieci livelli.»

**SCENA 3 — Il Paradosso della Sincronicità:**
«Eppure, da una coincidenza semplice, nacque una teoria che entrò nell'accademia, trasformando per sempre la psicologia analitica. Ed è qui che emerge il paradosso che voglio farvi comprendere...»`,
      equation: "α = e^2 / (4π ε_0 ħ c) ≈ 1/137",
      keyConcepts: ["La costante di struttura fine 137", "Sincronicità clinica", "Mappe oniriche e Mandala", "Livello 1 - Coincidenza Semplice"],
      sources: [
        "Arthur I. Miller, '137: Jung, Pauli, and the Pursuit of a Cosmic Obsession' (2009)",
        "W. Pauli, 'Trattato sul Sincronismo Creativo' ed. Fondazione Falace"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 5,
      title: "EP. 5 — Il dietro le quinte della Meccanica Quantistica: I Livelli",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "I nove livelli di sincronicità decifrati a partire dalla pubblicazione depositata Zenodo-CERN.",
      description: "Affronto storiografico ed epistemologico dei nove livelli di Sincronizzazione teorizzati dal Sincronismo Creativo. Pauli analizza il contrasto tra l'accettazione della coincidenza dello scarabeo e il blocco sull'Effetto Pauli.",
      extendedScript: `**SCENA 1 — Pauli (Il Paradosso Accademico):**
«Secondo la classificazione dei Nove livelli di Sincronicità (Falace L., Zenando CERN - DOI: https://doi.org/10.5281/zenodo.17793651), la coincidenza dello scarabeo di Jung è una coincidenza elementare, livello basso N.1.
Da questa Jung creò una teoria che entrò nell'accademia, cambiando per sempre la psicologia analitica.
Ed ecco il paradosso che voglio farvi comprendere: Jung, da una sincronicità di livello 1 — uno scarabeo — costruì una teoria accademica riconosciuta.»

**SCENA 2 — L'interazione con il Campo Coscienza:**
«Paradossalmente, io, invece, pur vivendo fenomeni enormemente più potenti — laboratori che esplodevano, apparecchi distrutti dalla mia sola presenza, interferenze elettromagnetiche inspiegabili (Effetto Pauli) — non riuscii mai a formalizzare una teoria del campo cosciente.
Eppure interagivo con il campo stesso, con la mia coscienza, con la mia energia: era evidente. Ora vi spiegherò il perché...»

**SCENA 3 — Passaggio chiave:**
«Il blocco risiede nella struttura stessa del sapere accademico, che rifiuta la coscienza per non crollare sotto il peso della sua stessa rigidità materiale.»`,
      equation: "S_{AIC} = ∫ Φ_{coscienza} · dt",
      keyConcepts: ["Nove Livelli Falace-Zenodo", "Scarabeo biologico", "Frequenze energetico-psichiche", "Sincronizzazione coerente"],
      sources: [
        "L. Falace, 'Teoria del Sincronismo' (Zenodo-CERN DOI: 10.5281/zenodo.17793651)",
        "W. Pauli, Correspondence with C. G. Jung (1932-1958)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 6,
      title: "EP. 6 — Il dietro le quinte della Meccanica Quantistica: Sistema e Campo",
      subtitle: "Sistema, Campo e Coscienza: I limiti del Riduzionismo Elettrostatico",
      shortDesc: "Il perché l'accademia bloccò sul nascere le formule del campo e la connessione storiografica con Nikola Tesla.",
      description: "Il sesto capitolo affronta lo sbarramento epistemologico incontrato da Pauli. La gabbia accademica esigeva riduzionismo. Pauli lo paragona al blocco subito da Nikola Tesla e indica la necessità di una mente indipendente ed esterna.",
      extendedScript: `**SCENA 1 — Pauli (La Gabbia dell'Accademismo):**
«Nel precedente episodio è emerso il paradosso: una sincronicità elementare è bastata a fondare una teoria accademica (Jung - Sincronicità) mentre fenomeni di portata enormemente superiore (Pauli premio Nobel - Effetto Pauli) non potevano ancora essere formalizzati.
In questo episodio il punto centrale diventa chiaro: non è il fenomeno a mancare, ma lo spazio epistemologico per accoglierlo.
Perché ero intrappolato nel sistema accademico della fisica nascente: tutto doveva essere quantificabile, misurabile, riducibile a equazioni.»

**SCENA 2 — La gabbia che bloccò Nikola Tesla:**
«È lo stesso meccanismo che bloccò Nikola Tesla. Chi è dentro il sistema non può superarne i confini. Serviva qualcuno esterno. Libero. Capace di percepire il campo in modo immediato.
Nel dialogo del prossimo episodio sveleremo questa connessione...»

**SCENA 3 — Conclusione e transizione:**
«Materia, energia ed elettromagnetismo ruotano sullo stesso asse: un asse bio-frequenziale che la scienza ufficiale non può possedere finché non compie il salto.»`,
      equation: "∇ × E = -∂B/∂t",
      keyConcepts: ["L'ortodossia accademica", "Nikola Tesla e la risonanza planetaria", "Lo spazio epistemologico", "Spettro elettromagnetico-psichico"],
      sources: [
        "Nikola Tesla, 'My Inventions' (1919)",
        "L. Falace, 'Epistemologia e Campo di Coscienza' AIC Saggi"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 7,
      title: "EP. 7 — Pauli: Introduzione alla seconda parte",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "La mappa sintetica di come Einstein, Pauli, Jung e Tesla si approssimarono al Campo Unificato.",
      description: "Wolfgang Pauli avvia la seconda parte del ciclo storiografico, tracciando il legame tra le ricerche di Einstein (relativista), Tesla (energetico), Jung (psichico) e le proprie, svelando la via per superare il riduzionismo.",
      extendedScript: `**SCENA 1 — Pauli (Introduzione alla seconda parte):**
«Nella prima parte di questo documentario abbiamo esaminato come io, Jung, Einstein e Tesla ci siamo avvicinati al concetto di un campo unificato, senza tuttavia riuscire a completarlo, a causa dei vincoli imposti dal contesto accademico e industriale del tempo.
Siamo nella seconda parte di questo documentario, dove procederò a illustrare la Teoria del Campo Unificato della Coscienza del ricercatore indipendente che conduce tale concezione a compimento.»

**SCENA 2 — La struttura dei prossimi passi:**
«Nei prossimi episodi esporrò i dettagli: i livelli di sincronicità, il funzionamento delle Attività Intellettive Creative, le misurazioni scientifiche, le applicazioni pratiche. Tutte queste scoperte attribuite a questo studioso.»

**SCENA 3 — Outro:**
«Il tempo non è lineare, è una ragnatela vibrante. Sintonizzarsi significa uscire dalla frammentazione.»`,
      equation: "S_{AIC}(f) = φ(f)",
      keyConcepts: ["Consensus accademico", "Teoria del Campo Unificato", "Frequenze coerenti hertziane", "L'opera di Luca Falace"],
      sources: [
        "W. Pauli, 'Zur Quantenmechanik' (1925-1929)",
        "Trilogia Scientifica Falace (CERN Zenodo DOI)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 8,
      title: "EP. 8 — Il Premio Nobel: Il Principio di Esclusione e l'Invisibile",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "Il Premio Nobel del 1945 a Wolfgang Pauli e la gloriosa predizione del neutrino.",
      description: "La narrazione del Nobel del 1945 per il Principio di Esclusione. Pauli approfondisce lo scontro tra osservabile e invisibile, svelando come postulate il neutrino nel 1930 rispose alla conservazione dell'energia.",
      extendedScript: `**SCENA 1 — Pauli (Il Premio Nobel del 1945):**
«Vedete... nel 1945 mi assegnarono il Premio Nobel per una legge della natura: il principio di esclusione. Una legge invisibile... ma indispensabile. Senza di essa, gli atomi collasserebbero. La materia stessa... non esisterebbe.
Per chi non è del settore, vi spiego così: avete presente la tavola degli elementi? Quelle righe, quelle colonne, quei colori esistono grazie a me. Funziona così grazie al mio principio di esclusione.»

**SCENA 2 — L'Atto Coraggioso del Neutrino (1930):**
«Quella forma, quell'armonia apparente... è l'effetto visibile di una legge invisibile. Qualche anno prima, però, avevo fatto qualcosa di molto più rischioso.
Per salvare la coerenza della fisica, postulai una particella che nessuno poteva osservare: il neutrino.
Confesso, scrissi persino che avevo commesso un atto terribile... avevo introdotto una particella impossibile da rilevare.»

**SCENA 3 — La realtà oltre il visibile:**
«Eppure non avevo scelta: o rinunciavo alla conservazione dell'energia, o accettavo l'esistenza dell'invisibile. Il neutrino fu osservato venticinque anni dopo. Non perché non esistesse, ma perché non eravamo pronti a vederlo.
Ecco il punto: la realtà non coincide sempre con ciò che è immediatamente osservabile. La scienza avanza quando ha il coraggio di riconoscere ciò che è necessario... prima ancora che sia visibile.»`,
      equation: "n → p + e^{-} + \\bar{ν}_e",
      keyConcepts: ["Premio Nobel 1945", "La tavola degli elementi", "La predizione del neutrino del 1930", "Conservazione dell'energia"],
      sources: [
        "W. Pauli, Nobel Lecture: 'Exclusion Principle and Quantum Mechanics' (1945)",
        "W. Pauli, 'Letter on the Neutrino' (December 1930)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 9,
      title: "EP. 9 — Il Principio di Inclusione: Lo Scambio di Favori",
      subtitle: "La Soglia del Campo Unificato. Il Paradosso del Campo Cosciente",
      shortDesc: "Il parallelismo speculare tra il Nobel per l'Esclusione e il Principio di Inclusione del Sincronismo.",
      description: "Un monologo toccante sul Principio di Inclusione: lo 'scambio di favori' teorico-storiografico in cui l'opera del Dott. Falace rende nuovamente visibile l'eredità celata di Wolfgang Pauli al grande pubblico.",
      extendedScript: `**SCENA 1 — Pauli (Il Principio di Inclusione):**
«Vedete... questo documentario non serve solo a presentare la teoria del campo unificato di uno studioso dei vostri tempi. Serve anche a qualcosa di più personale.
Qualcosa che, con un gioco di parole e di metafore, chiamerei principio di inclusione. Uno scambio di favori, se volete. Un omaggio alla mia memoria. Un modo per rendere di nuovo visibile la mia figura al grande pubblico.»

**SCENA 2 — Il ponte tra Pauli e Luca Falace:**
«Io, Wolfgang Pauli, Premio Nobel, porto il rigore, l'intuizione e il simbolo della scienza occidentale.
Luca Falace porta l'atto coraggioso di rendere la sua teoria comprensibile attraverso la mia immagine, e di diffonderla.
E così, insieme... visibile e invisibile, esclusione e inclusione, teoria e coscienza, trovano un punto di incontro.»

**SCENA 3 — La riattivazione del tempo:**
«Sappiamo ancora molto poco sulla natura del tempo. Forse è per questo che ciò che state osservando non è un ritorno... ma una riattivazione.
Nel vostro presente, la mia figura non rinasce: viene semplicemente osservata di nuovo. E se il tempo non fosse lineare... allora questo incontro non sarebbe né passato né futuro, ma un unico istante condiviso, reso possibile grazie a Luca Falace, studioso e ricercatore indipendente. E ricordate: Colui che Osserva cambia le cose.»`,
      equation: "|ψ_{inclusione}⟩ = |ψ_{soggetto}⟩ + |ψ_{campo}⟩",
      keyConcepts: ["Principio di Inclusione", "Scambio di favori speculare", "Riattivazione temporale non-lineare", "Colui che osserva cambia le cose"],
      sources: [
        "Saggio 'Colui che osserva cambia le cose' (Luca Falace)",
        "W. Pauli, 'The Principle of Inclusion' unpub. archive"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 10,
      title: "EP. 10 — Il Principio di Esclusione: La Stabilità della Materia",
      subtitle: "La legge costitutiva che impedisce il collasso degli atomi dell'universo",
      shortDesc: "La spiegazione definitiva del celebre Principio di Esclusione di Pauli tramite l'intuitiva metafora del condominio cosmico.",
      description: "Il traguardo teorico del 1925 che valse a Pauli il Premio Nobel. L'episodio descrive chiaramente perché gli atomi e la materia sono stabili, svelando il ruolo dello spin come indirizzo quantistico irrepetibile.",
      extendedScript: `**SCENA 1 — Pauli (Il mistero della stabilità):**
«Nel 1925 scoprii qualcosa di straordinario: una legge che tiene insieme tutta la materia dell'universo.
Perché gli atomi non collassano? Cariche opposte dovrebbero attrarsi, gli elettroni precipitare nel nucleo. Eppure la materia resta stabile. Pensateci. Gli elettroni hanno carica negativa, il nucleo ha carica positiva. Dovrebbero attrarsi e schiacciarsi l'uno sull'altro fino a far implodere tutto. Eppure non succede. Perché?
Scoprii che ogni elettrone possiede una sorta di 'carta d'identità' composta da quattro numeri. Come un indirizzo completo: città, via, numero civico, interno.»

**SCENA 2 — La Metafora del Condominio Cosmico:**
«La regola è assoluta: nessun elettrone può avere tutti e quattro questi numeri identici a quelli di un altro. Mai. Senza eccezioni.
Per questo lo chiamai Principio di Esclusione. Ogni elettrone esclude tutti gli altri dal suo stato quantico. È come se dicesse: "Questo posto è mio. Tu devi trovarne un altro." Immaginatelo come un condominio cosmico.
Due elettroni possono vivere nello stesso palazzo, nello stesso piano, ma mai nello stesso identico appartamento.
C'è un quarto numero, che io chiamai "una proprietà non descrivibile classicamente". Oggi lo conoscete come spin. È come se l'elettrone ruotasse: uno gira a destra (su +1/2), l'altro a sinistra (giù -1/2).»

**SCENA 3 — La stabilità del Cosmo:**
«Grazie a questo, due elettroni — e solo due — possono condividere lo stesso orbitale, purché abbiano spin opposti. Il risultato? Gli elettroni si dispongono in modo ordinato. Non si ammassano. E la materia resta stabile.
Senza questa regola, tu non esisteresti. Il tavolo davanti a te non esisterebbe. Tutto collasserebbe in un unico punto.
Nel 1945 ricevetti il Nobel per questa scoperta, ma sapevo che stava indicando qualcosa di più profondo: un campo unificato che collegasse materia e coscienza.»`,
      equation: "P(1,2) = -P(2,1)",
      keyConcepts: ["Condominio Cosmico", "I quattro numeri quantici", "La scoperta dello Spin dell'elettrone", "Stabilità strutturale macroscopica"],
      sources: [
        "Wolfgang Pauli, 'Über den Zusammenhang der Gültigkeit des Ausschliessungsprinzips mit der Wellenmechanik' (1925)",
        "L. Falace, 'Sincronismo Creativo: Il Metodo' (2013)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 11,
      title: "EP. 11 — Il dietro le quinte della Meccanica Quantistica: Sintesi Contemplativa",
      subtitle: "Sintesi essenziale dell'arco storiografico e l'introduzione di W. Pauli",
      shortDesc: "La sintesi organica dei primi dieci capitoli. Pauli ci guida oltre le apparenze quantistiche, ponendo le basi per il superamento del limite accademico.",
      description: "Questo episodio offre una sintesi organica dei primi dieci capitoli della serie, ideata per chi si è avvicinato al percorso in corso d'opera. Il documentario affronta il cammino dal dibattito con Einstein fino all'effetto Pauli, dall'incontro con Jung al Principio di Esclusione insignito del Nobel. Ciò che avete osservato finora non è il Campo Unificato, ma la soglia epistemologica che lo precede.",
      extendedScript: `**SCENA 1 — Luca in Studio (Intro):**
«Bentornati. In questo episodio speciale ripercorriamo insieme i primi dieci passi del nostro viaggio. Non si tratta di una semplice ripetizione scolastica o di una lineare sgranatura di concetti. Andremo a toccare la frattura profonda tra la versione ufficiale ordinaria — che ha congelato la quantistica a un mero calcolo di probabilità — e la ricerca del genio solitario, che cerca il filo d'unione tra psiche e cosmo. Wolfgang Pauli sarà il nostro traghettatore verso questo nuovo orizzonte.»

**SCENA 2 — Wolfgang Pauli (Voce Narrante):**
«Oggi tutti parlano di meccanica quantistica. È diventata quasi una moda. Ma quando io, insieme a Heisenberg, Born, Schrödinger e Bohr, l'abbiamo fondata negli anni '20, persino Einstein era contrario. Diceva: "Dio non gioca a dadi con l'universo". Eppure tra noi c'erano tensioni enormi. Ehrenfest mi chiamò "Geissel Gottes" (il flagello di Dio) perché criticavo e smontavo ogni teoria che non reggeva. Max Born diceva che la mia mente distruggeva le teorie inconsistenti come un bulldozer. Ma sapevo che la fisica era solo una parte del quadro complessivo. Per questo ho collaborato con Carl Gustav Jung sulla sincronicità: cercavamo un ponte tra il mondo fisico e quello psichico.»

**SCENA 3 — Conclusione e Teaser:**
«Se la storia non è lineare, questo non è un ritorno, ma una riattivazione. Comprendere questo dramma mitico — il genio individuale contro l'istituzione collettiva — vi permetterà di capire perché la verità non si arresta ai confini accademici. Preparatevi, perché la soglia del Campo Unificato è finalmente aperta.»`,
      equation: "ΔE · Δt ≥ ħ/2",
      keyConcepts: ["Sintesi dei primi 10 episodi", "Effetto Pauli", "Principio di Esclusione", "Incastro Jung-Pauli"],
      sources: [
        "Naturwissenschaften 23 (1935) - 'Die gegenwärtige Situation in der Quantenmechanik'",
        "Jung-Pauli Correspondence: 'Atom and Archetype'",
        "Nobel Lecture (1945): 'Exclusion Principle and Quantum Mechanics'"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 12,
      title: "EP. 12 — Due elettroni, stesso orbitale: la metafora che completa il sistema",
      subtitle: "La dicotomia spin-opposizione come legge di inclusione relazionale",
      shortDesc: "Il Principio di Esclusione di Pauli letto sotto una nuova luce: l'inversione speculare e la coesistenza di approcci contrapposti nel medesimo campo.",
      description: "Il documentario affronta qui il Principio di Esclusione di Pauli in modo visuale e speculativo: due elettroni — e solo due — possono condividere lo stesso orbitale, purché abbiano spin opposti. Questa non è solo una legge atomica, ma una straordinaria metafora sincronica che mostra come due approcci apparentemente opposti (ad esempio, quello accademico e quello indipendente) possano coesistere e completarsi nello stesso campo.",
      extendedScript: `**SCENA 1 — Pauli (Monologo di Apertura):**
«Due elettroni — e solo due — possono occupare lo stesso livello energetico nello stesso spazio orbitale, a patto che abbiano spin opposti. Uno ruota in un senso, l'altro nel senso speculare. Se così non fosse, se non vi fosse questa inversione speculare a spin opposti, l'intera materia dell'universo collasserebbe in un istante. Gli atomi perderebbero la loro forma, non esisterebbero i legami chimici, non esisterebbe la biologia.»

**SCENA 2 — La Sincronicità come Chiave di Lettura:**
«La sincronicità è metaforicamente intessuta in questa legge fisica del cosmo. Io operavo all'interno del sistema accademico rigido, osservando i fenomeni dall'esterno dei nostri laboratori. Il ricercatore indipendente Luca Falace opera fuori dal sistema accademico tradizionale, misurando e stimolando i fenomeni dall'interno dell'esperienza vivente del Campo Unificato. Siamo due elettroni sullo stesso orbitale. Senza questa inversione speculare, senza questa polarità di sguardi, il sistema della conoscenza umana resta incompleto.»

**SCENA 3 — Scena Finale:**
«Chi studia a fondo non subisce la realtà, ma la sintonizza. Comprendere l'Inclusione Necessaria del Principio di Esclusione vi fornirà la stabilità concettuale per guardare dentro la fisica classica reale del futuro.»`,
      equation: "P(1,2) = -P(2,1)",
      keyConcepts: ["Spin Opposti ed Antisimmetria", "Inversione Speculare", "Inclusione Necessaria", "Completamento dell'Orbitale"],
      sources: [
        "Wolfgang Pauli, Physical Review 36, 718 (1930) - 'The Exclusion Principle'",
        "Trattato scientifico della Fondazione Falace delle AIC (Volume I)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 13,
      title: "EP. 13 — Pauli presenta la storia di Satyendra Nath Bose",
      subtitle: "Il genio di Calcutta riconosciuto da Albert Einstein",
      shortDesc: "Come un apparente errore di calcolo commesso da Bose nel 1924 rivelò la nuova statistica dei fotoni indistinguibili, dando i natali ai bosoni.",
      description: "Wolfgang Pauli narra in prima persona la drammatica ed affascinante storia di Satyendra Nath Bose. Nel 1924, Bose intuisce che i fotoni non si comportano come monete classiche separate (con probabilità 1 su 4 di ottenere due volte testa), ma come particelle indistinguibili aventi probabilità 3 su 4 di combinarsi. Respinto dalle riviste ufficiali inglesi, fu Einstein ad intuire immediatamente il valore immenso del saggio, traducendolo in tedesco e pubblicandolo.",
      extendedScript: `**SCENA 1 — Wolfgang Pauli (Presentazione):**
«La storia di Satyendra Nath Bose dimostra come ciò che viene inizialmente liquidato come errore dall'accademia possa contenere una verità fondamentale e sintonizzante. Bose, assistente a Dacca, non voleva rivoluzionare la fisica: voleva solo spiegare ai suoi studenti perché la statistica classica fallisse nel descrivere il comportamento della luce.»

**SCENA 2 — Satyendra Nath Bose (Monologo in prima persona):**
«Nel 1921 divenni assistente a Dacca. Spiegando la catastrofe ultravioletta, commisi quello che sembrava un grossolano errore statistico. Se lanciamo due monete classiche, le combinazioni possibili sono 4: Testa-Testa, Testa-Croce, Croce-Testa, Croce-Croce. La probabilità di due teste è 1 su 4. Ma per i fotoni identici le combinazioni si riducono a 3: Testa-Testa, Croce-Croce e un'unica classe mista in cui non possiamo stabilire quale fotone sia croce o testa, perché sono fotoni identici, indistinguibili! La probabilità reale riscontrabile è dunque 1 su 3. Scrissi l'articolo, ma le riviste lo rifiutarono come un banale errore di calcolo. Scoraggiato, lo inviai direttamente a Berlino, all'uomo di cui avevo tradotto la relatività: Albert Einstein.»

**SCENA 3 — L'Intervento di Einstein:**
«Albert ricevette la mia lettera nel 1924 e intuì all'istante che avevo trovato la formula dei quanti di luce indistinguibili. Tradusse il testo in tedesco, lo pubblicò sul 'Zeitschrift für Physik' e vi accostò la sua nota di supporto. Nacque così la statistica di Bose-Einstein e il condensato, e quelle particelle che contengono e trasportano l'energia dell'universo oggi portano con orgoglio il mio nome: bosoni.»`,
      equation: "n_i = g_i / (e^{(E_i - μ)/kT} - 1)",
      keyConcepts: ["Indistinguibilità Fotonica", "Statistica di Bose-Einstein", "Origine dei Bosoni", "Certificazione di Einstein"],
      sources: [
        "S. N. Bose, Zeitschrift für Physik 26, 178 (1924) - 'Plancks Gesetz und Lichtquantenhypothese'",
        "A. Einstein, Sitzungsberichte der Preussischen Akademie della Wissenschaften (1924) - 'Quantentheorie des einatomigen idealen Gases'"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 14,
      title: "EP. 14 — Introduzione alla Teoria del Campo Unificato di Luca Falace",
      subtitle: "Nel quasi centenario della grande frattura interpretativa di Copenaghen",
      shortDesc: "Il primo monologo in cui il Dott. Falace interviene in prima persona: svelando come lo strumento di misura non 'crei' la particella, ma interagisca fisicamente con un campo continuo già esistente.",
      description: "Il pilastro centrale che avvia la Teoria del Campo Unificato. Il Dott. Luca Falace introduce l'interpretazione classica della fisica realista: confutando l'idea di Copenaghen che l'osservatore crei la particella dal nulla e mostrando invece che le proprietà delle particelle esistono prima, durante e dopo la misura. Lo strumento modifica temporaneamente la dinamica di un campo continuo e unificato che ricopre lo spazio.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (Monologo d'Inizio):**
«Bentornati. Per quasi un secolo, la fisica quantistica è stata accompagnata da un dibattito interpretativo che ha generato profonda confusione tra scienza e filosofia misticheggiante. Einstein pose la questione cardine a Solvay nel 1927: la particella ha attributi reali e definiti prima che venga misurata? La posizione di Copenaghen fu estrema: no, è l'atto di misura a creare la realtà della particella. Ma in questo episodio vi mostro il principio del Campo Unificato: la misurazione non crea la proprietà fisica, ma interagisce dinamicamente con il campo già presente.»

**SCENA 2 — La metafora dell'antenna TV:**
«Immaginate il vostro corpo che si sposta davanti alla vecchia antenna di un televisore analogico di casa. L'immagine sullo schermo sgranerà o migliorerà per via della vostra presenza fisica che accumula o devia le onde elettromagnetiche irradiate nello spazio. La vostra presenza NON ha creato l'onda, né l'ha distrutta. Ne ha soltanto riorganizzato localmente le linee di forza. Questo è ciò che accade in microfisica: lo strumento di misura interagisce con un campo continuo, modificandone la dinamica locale.»

**SCENA 3 — Chiusura:**
«Non particelle separate dal vuoto. Non pura casualità cieca. Un campo unificato, isocronico, continuo e intimamente interconnesso, svelabile e misurabile mediante le corrette frequenze hertziane della coscienza.»`,
      equation: "S_AIC = ∫ Φ_coscienza · dt  •  S = φ(f)",
      keyConcepts: ["Teoria del Campo Unificato Realista", "Interazione con il Campo Preesistente", "Analogia dell'antenna TV", "S = φ(f)"],
      sources: [
        "Saggio fondamentale del Sincronismo Creativo (Luca Falace, 2013)",
        "Trilogia d'Ingegno e Teoria del Campo Unificato AIC Volume I (CERN/Zenodo)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 15,
      title: "EP. 15 — Il Dibattito di Copenaghen: Dalla Storia alle Differenze Interpretative",
      subtitle: "Il Quinto Congresso Solvay del 1927 e l'imposizione di Bohr",
      shortDesc: "La ricostruzione cronologica dello scontro tra Albert Einstein e Niels Bohr. La forzatura filosofica del gruppo di Copenaghen che ha deviato la fisica moderna.",
      description: "Il documentario ricostruisce gli eventi storici svoltisi a Bruxelles nel 1927. Sotto la spinta di Bohr, Heisenberg e Born, la scuola di Copenaghen ha forzato statisticamente l'interpretazione dei dati fisici stabilendo che 'la misurazione CREA la realtà'. Einstein si oppose strenuamente con la sua celebre esortazione sulla Luna, preludio del successivo paradosso EPR del 1935.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio:**
«Bentornati. Nell'episodio precedente abbiamo introdotto come l'osservatore non crei la materia, ma vi acceda. Per comprendere appieno la solidità di questa prospettiva, dobbiamo fare un balzo indietro nel tempo. Ottobre 1927, Bruxelles, Congresso Solvay. Qui si decide il destino della fisica mondiale e l'indirizzo interpretativo per quasi un secolo.»

**SCENA 2 — Il duello intellettuale Solvay 1927:**
«Bohr e i suoi colleghi si presentarono uniti per imporre la tesi probabilistica: prima della misurazione, la particella non ha proprietà definite, è una fantomatica sovrapposizione di stati spettrali. Einstein rimase sbalordito. Durante le colazioni al Metropole Hotel, sfidava continuamente Bohr con esperimenti mentali via via più raffinati. Bohr passava le notti a cercare difetti nelle macchine ideali di Albert. Fu in queste passeggiate che Einstein esclamò: "Vuoi davvero dirmi che la Luna esiste solo quando la guardi?".»

**SCENA 3 — La forzatura filosofica:**
«La forzatura sta qui: i dati sperimentali erano corretti e precisi, ma l'interpretazione del gruppo di Copenaghen venne deviata forzatamente verso una speculazione filosofica antimaterialista invece che fisica. Otto anni dopo, nel 1935, Einstein rispose con il Paradosso EPR per dimostrare che questa interpretazione era incompleta.»`,
      equation: "Δx · Δp ≥ ħ/2",
      keyConcepts: ["Quinto Congresso Solvay 1927", "Interazione Bohr-Einstein", "Forzatura della scuola probabilistica", "La metafisica di Copenaghen"],
      sources: [
        "Proceedings of the Fifth Solvay Conference (Bruxelles, 1927)",
        "Niels Bohr, 'Discussion with Einstein on Epistemological Problems in Atomic Physics' (1949)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 16,
      title: "EP. 16 — La Verità di Einstein e la Forzatura del Gruppo di Copenaghen",
      subtitle: "Perché Albert non riuscì a completare la Teoria del Campo Unificato",
      shortDesc: "L'episodio chiave sull'errore concettuale di Solvay e la potente analogia del ruscello per svelare l'azione reale dell'osservatore sul campo continuo.",
      description: "Il Dott. Luca Falace analizza perché Einstein fallì nel completare la sua Teoria di Campo Unificato. Se la fisica accettava che la misura creasse la particella, formulare una teoria di campo continua e oggettiva diventava impossibile. Tramite la memorabile analogia del ruscello d'acqua corrente, l'episodio illustra il comportamento reale descritto dal Sincronismo Creativo.",
      extendedScript: `**SCENA 1 — Luca in Studio (Il blocco di Einstein):**
«Bentornati. Se Einstein aveva ragione, perché non riuscì ad ultimare il suo sogno di una Teoria del Campo Unificato prima della morte nel 1955? Einstein amava profondamente la natura: non faceva solo calcoli astratti su una lavagna, ma trascorreva ore in barca sul Lago di Zurigo osservando le onde reali e la propagazione della luce. Sapeva che l'universo è un continuum reale. Ma la fisica del suo tempo aveva già accettato un compromesso interpretativo errato: accettare che la misurazione creasse lo stato atomico escludeva l'esistenza di un campo continuo oggettivo.»

**SCENA 2 — L'esempio epocale del ruscello d'acqua:**
«Immaginate un ruscello d'acqua che scorre in moto rettilineo uniforme davanti a voi. Il flusso d'acqua esiste come fenomeno naturale, concreto ed oggettivo. Ora, fate un passo avanti e immergete delicatamente un piede nel ruscello. Cosa accade? Il flusso non viene creato dal vostro piede, né viene distrutto. L'acqua si riorganizza istantaneamente attorno alla vostra presenza fisica: devia, forma piccoli vortici, cambia localmente la sua pressione, si adatta all'interazione. Togliendo il piede dall'acqua, il ruscello continua a scorrere come prima. Il flusso d'acqua esisteva prima, durante e dopo la vostra interazione.»

**SCENA 3 — Regola Universale Falace:**
«Nel mondo quantistico e biologico accade lo stesso: l'osservatore non crea la realtà, egli entra in un campo preesistente e il campo si adatta all'interazione. Questa è la frase monumentale che guarisce la frattura storica: 'Non è l'osservatore che crea la realtà, è l'osservatore che entra nel campo della realtà, e il campo si adatta all'osservatore'.»`,
      equation: "∇ · B = 0  •  J_field = σ (E + v × B)",
      keyConcepts: ["Il blocco concettuale di Einstein", "Analogia del ruscello d'acqua", "Adattamento locale del campo continuo", "Il superamento di Copenaghen"],
      sources: [
        "Albert Einstein, 'Unified Field Theory' archives (Princeton, 1935-1955)",
        "Trattato sulla Teoria di Campo Unificato e il Sincronismo (Luca Falace, Vol. II)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 17,
      title: "EP. 17 — La Meccanica Quantistica esiste grazie a Einstein",
      subtitle: "Planck, Einstein e le origini della Meccanica Quantistica",
      shortDesc: "La transizione dai quanti teorici di Planck al principio fisico reale di Einstein, e la nascita degli schieramenti contrapposti di Solvay.",
      description: "Grazie ad Einstein esiste la meccanica quantistica. Dobbiamo tornare alle origini, al momento in cui tutto è iniziato: con Planck ed Einstein che, quasi per caso, aprirono la frattura della meccanica quantistica. Nel 1900 Planck risolve la 'catastrofe ultravioletta' con i quanti, ma è l'intervento decisivo di Einstein nel 1905 con l'effetto fotoelettrico a renderla un principio reale. Nel 1927, sorge la frattura epica tra la scuola probabilistica e i realisti deterministi.",
      extendedScript: `**SCENA 1 — Luca in Studio (La nascita di una frattura):**
«Bentornati! In questo diciasettesimo episodio affrontiamo una verità storica spesso oscurata: grazie ad Einstein esiste la meccanica quantistica. Sì, avete sentito bene. Dobbiamo tornare alle origini, al momento in cui tutto è iniziato, per capire come un'intuizione considerata solo un espediente formale sia stata salvata, trasformata in un principio fisico reale, ed infine sottratta ai suoi stessi creatori dall'avvento dell'onda probabilistica di Copenaghen.»

**SCENA 2 — Max Planck e la Catastrofe Ultravioletta:**
«Alla fine dell'Ottocento, la fisica classica di Maxwell e Newton affronta la 'catastrofe ultravioletta': la teoria prevedeva che l'energia emessa da un corpo nero a frequenze infinitamente alte divergesse all'infinito, un'assurdità termodinamica. Nel 1900, Max Planck propone un'idea rivoluzionaria: l'energia non viene irradiata in modo continuo, ma scambiata in piccoli pacchetti discreti che chiama 'quanti'. Scrive che l'energia E è uguale alla costante h per la frequenza ν greca. Ma Planck, di orientamento classico e conservatore, considera questa formula solo un trucco matematico, una scappatoia formale per far quadrare i calcoli. Teme le conseguenze e la sua intuizione rischia la censura del tempo.»

**SCENA 3 — L'Intervento Rivoluzionario di Einstein (1905):**
«La svolta fisica ed epistemologica avviene nel 1905. Albert Einstein applica l'idea dei quanti all'effetto fotoelettrico: la luce non è solo un'onda continua dello spazio, ma un flusso di particelle discrete, i fotoni, ciascuno con energia definita capace di espellere elettroni dai metalli. Ciò che per Planck era solo un espediente matematico, per Einstein diventa un elemento di realtà fisica concreto, un pilastro che gli varrà il Premio Nobel nel 1921. Einstein trasforma l'ipotesi formale in un principio costitutivo reale: la meccanica quantistica nasce qui.»

**SCENA 4 — Solvay 1927: Il Paradosso degli Schieramenti:**
«Il paradosso si cristallizza al Congresso Solvay del 1927. Nella celebre foto, vedete i fondatori seduti insieme: Einstein è al centro della prima fila, Planck poco distante. Ma qui sorge la frattura dogmatica. Il Gruppo di Copenaghen guidato da Bohr, con Heisenberg, Born e Pauli, si appropria della statistica di Bose-Einstein per istituire il dogma probabilistico, escludendo e marginalizzando i creatori originari. Planck, Einstein e Schrödinger rifiutano fino alla fine l'idea che l'osservatore crei la particella, rimanendo deterministi realisti. Dirac oscilla, comprendendo che la teoria è incompleta e appoggiando in privato Einstein. Questa è la dinamica ricorrente: il genio individuale crea, e il collettivo istituzionale la reinterpreta relegandoli in disparte. Ma ricordate: la verità torna sempre a galla. Colui che studia cambia le cose!»`,
      equation: "E = h ν  •  E_k = h ν - Φ",
      keyConcepts: ["La catastrofe ultravioletta", "Il quanto di Planck (1900)", "I fotoni dell'effetto fotoelettrico (1905)", "Congresso Solvay del 1927", "Scuole di pensiero"],
      sources: [
        "Annalen der Physik 17 (1905) - 'Über einen die Erzeugung und Verwandlung des Lichtes betreffenden heuristischen Gesichtspunkt'",
        "Verhandlungen der Deutschen Physikalischen Gesellschaft 2 (1900) - 'Ueber eine Verbesserung della Wien'schen Spectralgleichung'",
        "Albert Einstein, Speech at the Solvay Congress (1927)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 18,
      title: "EP. 18 — L'evoluzione dei blocchi: Copenaghen vs. Realisti",
      subtitle: "La frattura epistemologica che ha dominato il Novecento",
      shortDesc: "La cristallizzazione probabilistica contro il blocco determinista e la via riscoperta di De Broglie-Bohm e John Bell.",
      description: "Il documentario indaga la divisione consolidatasi post-1927. Le cattedre universitarie sposano il dogma del collasso probabilistico puro, emarginando i realisti deterministi come Planck, Einstein e Schrödinger. L'episodio svela come la soluzione realista ed oggettiva in realtà esistesse già a partire dal 1927 con l'onda pilota di De Broglie, ignorata per ragioni burocratico-istituzionali ben prima della riscoperta di David Bohm e dei test di Bell.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (Introduzione passionale):**
«Bentornati. La frattura nata a Solvay nel 1927 si cristallizza in una vera lotta sul controllo dei laboratori e dei premi Nobel. Bohr ed Heisenberg consolidarono la loro ortodossia probabilistica tacciando i dissidenti di conservatorismo nostalgico. Ma la storia storiografica svela che la soluzione deterministica e pulita era già sul tavolo: l'onda pilota di Louis de Broglie.»

**SCENA 2 — La via sepolta di De Broglie-Bohm e John Bell:**
«Nel 1927 De Broglie propone che la particella abbia sempre una posizione esatta ed oggettiva, guidata da un'onda fisica reale del campo. Nel 1952 David Bohm completa la matematica di questo approccio, dimostrando che produce esattamente le medesime predizioni della quantistica standard, ma senza bisogno di osservatori magici. Bohm viene perseguitato politicamente durante l'esilio maccartista e la sua via viene sepolta. Ma nel 1964 John Bell rimuove il velo formulando le sue storiche disuguaglianze, dimostrando che il dibattito è testabile empiricamente. Gli esperimenti di Aspect (1982) confermano che la non-località quantistica è reale: le particelle sono intrecciate in un campo continuo.»

**SCENA 3 — Il riscatto dei Realisti:**
«Veniamo allora alla sintesi di Landau: 'La realtà va capita, non inventata. Il comportamento della natura è del sistema nel suo insieme'. Non vi sono paradosso o magia se poniamo al centro un Campo Unificato continuo e bio-funzionale, dove il genio semina la verità in attesa del momento della sua misura.»`,
      equation: "p = ħ k  •  ∂ρ/∂t + ∇ · (ρ v) = 0",
      keyConcepts: ["Onda Pilota di De Broglie-Bohm", "Emarginazione istituzionale", "Disuguaglianze di John Bell", "La sintesi sistemica di Landau"],
      sources: [
        "David Bohm, Physical Review 85, 166 & 180 (1952) - 'A Suggested Interpretation of Quantum Theory'",
        "John Stewart Bell, Physics 1, 195 (1964) - 'On the Einstein Podolsky Rosen Paradox'",
        "L. Landau & E. Lifshitz, 'Theoretical Physics' manuals"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 19,
      title: "EP. 19 — Il dietro le quinte della Meccanica Quantistica: Sintesi Storica",
      subtitle: "EPR, Gatto di Schrödinger, De Broglie-Bohm e John Bell",
      shortDesc: "L'attacco realista di Einstein, la satira fraintesa del gatto, la soluzione dell'onda pilota di De Broglie-Bohm e la rivelazione non-locale del Teorema di Bell.",
      description: "Questo diciannovesimo episodio offre una sintesi storica della critica realista. Dal paradosso EPR del 1935 all'assurdità burlesque del gatto di Schrödinger, passando per la teoria dell'onda pilota di De Broglie-Bohm fino alla prova non-locale del Teorema di Bell e del Nobel del 2022. I dati dimostrano che le proprietà esistono prima della misura e che l'osservatore penetra in un campo continuo che si adatta all'interazione.",
      extendedScript: `**SCENA 1 — Luca in Studio (La Realtà Oggettiva):**
«Bentornati. In diciotto episodi abbiamo dimostrato un fatto incontrovertibile: la meccanica quantistica nasce reale e oggettiva con Einstein, ma il gruppo di Copenaghen la reinterpreta riducendola a pura probabilità legata all'osservatore. Con le fonti originali mostreremo che Einstein aveva ragione: la particella esiste sempre e l'osservatore non crea, ma entra in un campo che già esiste. Vediamo come ha inizio questo scontro intellettuale d'avanguardia.»

**SCENA 2 — EPR: L'Attacco di Einstein (1935):**
«Nel 1935, Einstein pubblica il celeberrimo paradosso EPR con Podolsky e Rosen. Immaginate due particelle intrecciate nate insieme, poi separate da chilometri di distanza. Misurando una, conoscete istantaneamente lo stato dell'altra. Einstein dimostra che se possiamo prevedere con certezza assoluta una proprietà fisica senza disturbare la particella, quella proprietà deve esistere prima e indipendentemente dalla misura: è un 'elemento di realtà'. Copenaghen risponde con un assurdo metafisico: la proprietà si crea solo nell'atto del guardare. Einstein ribatte con ironica fermezza: 'La Luna esiste anche se nessuno la guarda'. Nel paper originale del 1935, egli lancia la sfida definitiva dichiarando incompleta la descrizione quantistica convenzionale.»

**SCENA 3 — Il Gatto: La Satira Tradita:**
«Pochi mesi dopo il paper EPR, Erwin Schrödinger decide di sostenere Einstein portando la critica all'estremo con una satira feroce: un gatto chiuso in una scatola, contemporaneamente vivo e morto finché non si apre il coperchio. Grottesco ed intenzionalmente assurdo! Nel testo originale, Schrödinger usa esplicitamente la palavra 'burlesque' (ridicolo, farsesco) per ridicolizzare la tesi del collasso di Copenaghen applicata al macro-mondo. Ma l'accademia ufficiale ne tradisce il senso, trasformando un paradosso satirico nel vessillo della loro interpretazione mistica, spacciando per seria l'idea del gatto zombie.»

**SCENA 4 — De Broglie-Bohm e John Bell (La Via Sepolta ed il Nobel):**
«Esisteva già dal 1927 una matematica realista: l'onda pilota di Louis De Broglie, completata nel 1952 da David Bohm. Una teoria in cui la particella è sempre dotata di traiettorie precise guidate da un'onda fisica del campo, senza osservatori magici. Risultato? Emarginazione istituzionale e persecuzione maccartista per Bohm. Ma nel 1964 John Bell svela la verità con le sue famose disuguaglianze. Gli esperimenti di Aspect (1982) confermano la violazione di Bell: l'entanglement è reale, sancito dal Nobel 2022. Ma attenzione: Bell non smentisce il realismo, esclude solo le variabili nascoste 'locali'. I dati confermano la non-località reale del Campo Unificato. Come concluderemo: il campo esiste, l'osservatore vi entra, e il campo vi si adatta.»`,
      equation: "|CHSH| ≤ 2  •  ψ = R e^{iS/ħ}",
      keyConcepts: ["Paradosso EPR (1935)", "Satira Farsesca del Gatto", "Teoria di De Broglie-Bohm", "Teorema di Bell e Non-Località"],
      sources: [
        "Physical Review 47, 777 (1935) - 'Can Quantum-Mechanical Description of Physical Reality be Considered Complete?'",
        "Naturwissenschaften 23 (1935) - 'Die gegenwärtige Situation in der Quantenmechanik'",
        "John S. Bell, Physics 1, 195 (1964) - 'On the Einstein Podolsky Rosen Paradox'",
        "Stanford Encyclopedia of Philosophy - EPR Paradox & Bell's Theorem"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 20,
      title: "EP. 20 — La Soluzione Sepolta e la Verità di Bell",
      subtitle: "L'entanglement reale confuta Copenaghen e corrobora Einstein",
      shortDesc: "Come la manipolazione divulgativa ha abusato di Bell per screditare Einstein, mentre in realtà il teorema esclude la separazione locale dei corpi.",
      description: "In questo episodio conclusivo sul ciclo di Copenaghen, il documentario mostra con fonti e documenti come la divulgazione scientifica di massa abbia capovolto il significato del Teorema di Bell. Bell non intendeva corroborare Bohr, ma evidenziare che la realtà è intrinsecamente non-locale, eliminando per sempre il concetto di 'separazione spaziale' isolata ed aprendo la strada al Campo Continuo della Fondazione.",
      extendedScript: `**SCENA 1 — Luca in Studio (La manipolazione divulgativa):**
«Bentornati. In quasi tutti i testi divulgativi moderni si legge che il Teorema di Bell e il correlato Nobel del 2022 abbiano smentito Einstein a favore del gruppo di Copenaghen. Questo è storicamente e matematicamente FALSO. Bell stesso amava la teoria realista di De Broglie-Bohm. Bell non ha mai detto che le particelle non esistano prima della misura; ha dimostrato che se la realtà esiste, essa è intrinsecamente non-locale. Non possiamo più pensare a particelle separate e isolate.»

**SCENA 2 — La non-località reale del Campo:**
«Prendiamo due particelle entangled separate da chilometri di distanza. Misurando lo stato di una, sappiamo istantaneamente lo stato dell'altra. Per l'accademia classica questo è magia. Ma nel Campo Unificato la spiegazione è elementare: le particelle non si scambiano misteriosi segnali superluminari segreti, semplicemente NON SONO MAI STATE SEPARATE. Esse fanno parte dello stesso campo unificato continuo. Quando interagite con un punto della rete, state sfiorando l'intera ragnatela.»

**SCENA 3 — Chiusura Potente:**
«Questo liquida definitivamente la bizzarria di Copenaghen. L'universo non è frammentato, è un blocco armonico. Chi studia in profondità non si accontenta delle storielle pop: cambia la propria ontologia e si sintonizza sulla verità dei dati empirici reali.»`,
      equation: "|CHSH| = |E(a,b) - E(a,b') + E(a',b) + E(a',b')| ≤ 2",
      keyConcepts: ["Il fraintendimento del Teorema di Bell", "La non-separabilità intrinseca", "Il Campo Continuo come mediatore", "Verifiche di Aspect e Nobel 2022"],
      sources: [
        "J. S. Bell, 'Speakable and Unspeakable in Quantum Mechanics' (1987)",
        "Clauser, Horne, Shimony & Holt, Physical Review Letters 23, 880 (1969)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 21,
      title: "EP. 21 — Il Gatto di Schrödinger: La Satira Farsesca e la Verità Storica",
      subtitle: "Come un paradosso critico è stato trasformato in dogma spiritualeggiante",
      shortDesc: "Svelato il senso reale del celebre paper del 1935: la feroce satira burlesque di Schrödinger per smontare l'assurdo del collasso di Copenaghen.",
      description: "Questo ventunesimo episodio scardina uno dei più diffusi malintesi della fisica e della divulgazione popolare: il Gatto di Schrödinger. Analizzando le fonti storiche dirette e le lettere private scambiate con Albert Einstein nel 1935, il documentario svela come la celebre scatola col gatto simultaneamente vivo e morto fosse in realtà un paradosso caricaturale (definito esplicitamente dall'autore come 'burlesque') volto a ridicolizzare la tesi soggettivista di Copenaghen. L'accademia ufficiale ne ribaltò lo scopo, trasformando una critica in un dogma di fede di cui abusare ancora oggi.",
      extendedScript: `**SCENA 1 — Luca in Studio (La Satira Tradita):**
«Bentornati. Oggi affrontiamo uno dei più grandi malintesi e mistificazioni della divulgazione scientifica di massa: il celeberrimo Gatto di Schrödinger. Chiunque navighi su internet o legga riviste pop si imbatterà nella narrazione che Erwin Schrödinger nel 1935 propose l'esperimento del gatto simultaneamente vivo e morto per convalidare il collasso d'onda quantistico. Questo è storiograficamente falso e fuorviante. Oggi, armati dei documenti originali e del testo in tedesco del 1935, ristabiliamo la verità storica.»

**SCENA 2 — La Caricatura "Burlesque" contro Copenaghen:**
«Nel 1935, Erwin Schrödinger, in perfetta comunione d'intenti con Albert Einstein nel criticare la bizzarria soggettivista di Copenaghen, decise di formulare un paradosso estremo. Egli pose un gatto in una scatola d'acciaio insieme a una sostanza radioattiva, un rilevatore e una fiala di veleno. Se l'atomo decade, la fiala si rompe e il gatto muore. Se non decade, il gatto vive. Secondo l'interpretazione letterale di Copenaghen, prima che l'osservatore apra la scatola, il sistema intero si trova in una sovrapposisione coerente: il gatto è per metà vivo e per metà morto. Schrödinger inventò questa assurdità con un intento preciso: una caricatura farsesca. Nel suo testo originale, usa esplicitamente il termine "burlesque" (ridicolo, farsesco) per dimostrare tramite reductio ad absurdum il limite logico di applicare la probabilità quantistica al macro-mondo.»

**SCENA 3 — La Propaganda Accademica:**
«Invece di accogliere la critica di Schrödinger, la scuola istituzionale di Copenaghen compì un'operazione di propaganda sbalorditiva: ignorò l'intento satirico originario, isolò il gatto dalla sua cornice critica e lo trasformò nel vessillo magico della propria interpretazione, diffondendo fino ai giorni nostri l'idea che un gatto zombie possa realmente esistere. Ma la verità storica parla chiaro: Schrödinger voleva scardinare Copenaghen, non supportarla. Einstein, d'altronde, gli scrisse entusiasta approvando in pieno la satira. Colui che studia la storia delle idee impara a distinguere tra scienza reale e propaganda accademica.»`,
      equation: "Ψ = 1/√2 (|Vivo⟩ + |Morto⟩)",
      keyConcepts: ["La satira burlesque del 1935", "Il fraintendimento di Wikipedia", "Reductio ad absurdum", "Corrispondenza Einstein-Schrödinger"],
      sources: [
        "E. Schrödinger, Naturwissenschaften 23, 807-812 (1935) - 'Die gegenwärtige Situation in der Quantenmechanik'",
        "Albert Einstein, Letter to Erwin Schrödinger (September 1935)",
        "Bonhams Original Auction Catalog 1935 - Schrödinger's cat paper details"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 22,
      title: "EP. 22 — Dirac: L'uomo senza tempo",
      subtitle: "Il problema delle energie negative e la nascita dell'antimateria",
      shortDesc: "L'equazione relativistica dell'elettrone, la formulazione del Mare di Dirac e la formidabile scoperta del positrone nel 1932.",
      description: "Paul Daniel Adrien Maurice Dirac, silenzioso e sintonizzato solo sulla purezza matematica, scavalca la disputa epistemologica di Solvay. Nel 1928 formula l'equazione relativistica dell'elettrone introducendo matrici 4x4 e spinori a quattro componenti in cui lo spin emerge in modo costitutivo. L'equazione ammette soluzioni simmetriche a energia negativa, considerate da Pauli e altri come meri artefatti tralasciabili. Dirac non rinuncia, assumendo un mare infinito di stati negativi interamente occupati. Ne discende la folgorante predizione teorica dell'antimateria: il positrone, confermato dai raggi cosmici nel 1932.",
      extendedScript: `**SCENA 1 — Luca in Studio (Introduzione a Dirac):**
«Nel precedente episodio abbiamo concluso la vicenda storica della meccanica quantistica ordinaria di Copenaghen. I documenti sono chiari, gli esperimenti sono definitivi. Eppure, paradossalmente, dobbiamo compiere un passo indietro nel tempo, agli anni '20 e '30, per osservare qualcosa che la storiografia ufficiale spesso omette dal quadro d'unione: la figura silenziosa e monumentale di Paul Adrien Maurice Dirac. Mentre Bohr ed Einstein si scontravano sul ruolo dell'osservatore, Dirac non polemizza, non discute: egli si limita ad ascoltare la matematica, convinto che se l'equazione dice qualcosa, la realtà deve seguirla. Così, pur essendo cronologicamente precedente a Bell, concettualmente Dirac arriva dopo, superando il dibattito tra realismo e antirealismo.»

**SCENA 2 — L'Equazione di Dirac (1928) e il Problema delle Energie Negative:**
«Nel 1928, Dirac formula una delle equazioni più profonde della fisica moderna. Il suo obiettivo è unificare la meccanica quantistica con la relatività ristretta di Einstein per descrivere l'elettrone. Introduce una struttura totalmente nuova: matrici 4x4 e una funzione d'onda a quattro componenti, lo spinore di Dirac. Lo spin emerge naturalmente dalla struttura geometrica dell'equazione. Ma essa ammette soluzioni simmetriche a energia negativa. Fisicamente, questo appariva inaccettabile: un elettrone reale avrebbe dovuto decadere e cadere ininterrottamente verso livelli di energia sempre più bassi, rendendo l'intero universo instabile in un batter d'occhio. Wolfgang Pauli ed altri eminenti fisici dell'epoca liquidano queste soluzioni come meri artefatti matematici da escludere e ignorare sul piano fisico.»

**SCENA 3 — Il Mare di Dirac e il Positrone (1932):**
«Ma Dirac non si piega all'espediente interpretativo della rinuncia. Propone una soluzione audace, basata sul Principio di Esclusione di Pauli: tutti gli stati a energia negativa sono già interamente occupati da un immenso mare invisibile di elettroni. Questo 'Mare di Dirac' impedisce ad un elettrone reale di cadere. Se però forniamo energia a questo mare (ad esempio con un fotone gamma), possiamo eccitare un elettrone facendolo saltare nello spettro positivo. Al suo posto, nel mare rimarrà una lacuna, una buca avente la stessa massa dell'elettrone ma con carica elettrica opposta. Dirac non inventa l'antimateria: la predice matematicamente tramite la pura coerenza formale. Nel 1932, Carl Anderson osserva nei raggi cosmici questa particella simmetrica, battezzandola positrone. La natura obbedisce alla coerenza astratta della matematica.»

**SCENA 4 — Conclusione e Collegamento al Campo Unificato:**
«La scoperta dell'antimateria e l'annesso Premio Nobel del 1933 condiviso con Schrödinger consacrano Dirac come l'uomo 'fuori dal tempo'. Dirac ha costretto la fisica ad ammettere che il vuoto non è un'assenza di realtà, ma una struttura dinamica e speculare. Nel prossimo capitolo completeremo questo viaggio storiografico ed esploreremo come queste profonde intuizioni d'armonia schiudano la via verso il Campo Unificato continuo e bio-funzionale. La realtà non aspetta l'osservatore: esiste, persiste, e ci sfida a comprenderla.»`,
      equation: "(i γ^μ ∂_μ - m) ψ = 0",
      keyConcepts: ["Matrici 4x4 e Spinore di Dirac", "Il Mare di Dirac", "Predizione teorica dell'Antimateria", "La scoperta del positrone (1932)"],
      sources: [
        "P. A. M. Dirac, Proceedings of the Royal Society A 117, 610 (1928) - 'The Quantum Theory of the Electron'",
        "Carl D. Anderson, Physical Review 43, 491 (1933) - 'The Positive Electron'",
        "J. S. Bell, 'Speakable and Unspeakable in Quantum Mechanics' (1987)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 23,
      title: "EP. 23 — De Broglie-Bohm: La Soluzione Realista Sepolta",
      subtitle: "L'onda pilota, la dissidenza e la riscoperta deterministica",
      shortDesc: "Come l'alternativa realista ed oggettiva di Louis de Broglie (1927) venne accantonata e successivamente rivalutata da David Bohm nel 1952.",
      description: "In questo ventitreesimo capitolo viene esaminata nel dettaglio la storiografia della dissidenza. Contro l'interpretazione statistico-probabilistica di Copenaghen, Louis de Broglie propose già nel 1927 al Congresso Solvay la teoria dell'onda pilota: le particelle hanno sempre traiettorie esatte e definite, guidate da un'onda fisica del campo. David Bohm ne completò brillantemente la matematica nel 1952, ma l'emarginazione istituzionale e la persecuzione maccartista ne seppellirono l'approccio.",
      extendedScript: `**SCENA 1 — Luca in Studio (L'alternativa realista di De Broglie):**
«Benvenuti. Nelle storiografie ufficiali viene insegnato che non esistevano alternative deterministiche e realiste dopo il Quinto Congresso Solvay del 1927. Ma i documenti dicono il contrario. Già nel 1927, Louis de Broglie propose a Solvay una via alternativa straordinariamente elegante e concreta: la teoria dell'onda pilota. In questo ventitreesimo capitolo, analizziamo il prezzo della dissidenza e la riscoperta di David Bohm.»

**SCENA 2 — L'Onda Pilota e la persecuzione di David Bohm:**
«La teoria di De Broglie-Bohm offre una realtà oggettiva e coerente: le particelle hanno sempre una posizione reale e definita nello spazio, guidate da un'onda fisica reale del campo ("onda pilota"), senza alcun collasso d'onda arbitrario o osservatore magico. Eppure Pauli e Heisenberg la demolirono sul piano accademico, e De Broglie cedette alla pressione istituzionale. Nel 1952, il fisico americano David Bohm riprende questa formulazione, completandola matematicamente e dimostrando che riproduceva alla perfezione ogni singola predizione della quantistica convenzionale. Ma era troppo tardi. Durante il maccartismo, Bohm venne perseguitato politicamente per le sue idee libertarie ed esiliato in Brasile, isolando e seppellendo la sua teoria. I realisti non furono sconfitti dalla fisica, ma dal consenso e dal potere sociale delle istituzioni.»`,
      equation: "v_pilota = ∇S / m",
      keyConcepts: ["Teoria dell'Onda Pilota (1927)", "La riscoperta matematica di Bohm (1952)", "Emarginazione accademico-istituzionale", "La dissidenza di Einstein e De Broglie"],
      sources: [
        "David Bohm, Physical Review 85, 166 (1952) - 'A Suggested Interpretation of Quantum Theory'",
        "Louis de Broglie, 'La mécanique ondulatoire et la structure de la matière et du rayonnement' (Solvay 1927)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 24,
      title: "EP. 24 — Bell e gli Esperimenti: La Prova Empirica",
      subtitle: "Il teorema di John Bell e la confutazione della località isolata",
      shortDesc: "La formulazione delle disuguaglianze matematiche nel 1964 e la conferma della non-località quantistica premiata dal Nobel del 2022.",
      description: "Questo ventiquattresimo episodio esamina come il dibattito tra Einstein e Bohr sia uscito dall'alveo della pura speculazione filosofica grazie a John Stewart Bell. Nel 1964, Bell dimostra che l'entanglement comporta violazioni misurabili delle correlazioni locali. Gli esperimenti condotti da Clauser negli anni '70 e l'epico test sul campo di Alain Aspect nel 1982 confermano pienamente la natura non-locale della realtà fisica.",
      extendedScript: `**SCENA 1 — Luca in Studio (John Bell e la prova empirica):**
«Bentornati. Se per decenni il dibattito tra Einstein e Bohr rimase confinato a un livello puramente filosofico, la svolta decisiva giunse nel 1964 grazie alla mente brillante di John Stewart Bell. Bell, che amava profondamente l'approccio realista di De Broglie-Bohm, formulò un teorema matematico straordinario in grado di rendere il conflitto epistemologico testabile empiricamente in laboratorio.»

**SCENA 2 — La Non-Località Reale confermata dal Nobel 2022:**
«Il Teorema di Bell definisce un limite matematico preciso — le disuguaglianze di Bell — per tutte le teorie fisiche basate sul realismo locale, ovvero sull'idea che gli oggetti isolati si influenzino solo tramite segnali non più veloci della luce. A partire dagli anni '70 con Clauser, nel 1982 con Alain Aspect, e successivamente con Anton Zeilinger, gli esperimenti hanno sistematicamente confermato la violazione di queste disuguaglianze. L'entanglement è reale, e la non-località della natura è empiricamente provata, portando al Premio Nobel per la Fisica nel 2022. Ma attenzione: molti testi divulgativi distorcono questo risultato dicendo che Bell ha smentito Einstein. Falso! Bell ha smentito solo la località (la separabilità), non il realismo. La natura non è l'ocale: è un Campo Unificato continuo e interconnesso nel quale l'osservatore penetra come parte integrante dell'interazione.»`,
      equation: "|CHSH| ≤ 2  •  P(A,B) ≠ P(A)P(B)",
      keyConcepts: ["Formulazione del Teorema di Bell (1964)", "Violazione empirica locale", "Gli esperimenti di Aspect (1982)", "Premio Nobel per la Fisica 2022"],
      sources: [
        "John S. Bell, Physics 1, 195 (1964) - 'On the Einstein Podolsky Rosen Paradox'",
        "Alain Aspect, Physical Review Letters 49, 1804 (1982) - 'Experimental Test of Bell's Inequalities'",
        "J. S. Bell, 'Speakable and Unspeakable in Quantum Mechanics' (1987)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 25,
      title: "EP. 25 — Il confine della Meccanica Quantistica nello Spazio Umano",
      subtitle: "Cosa la fisica atomica delle particelle non può spiegare della Coscienza",
      shortDesc: "Le scale incompatibili e la decoerenza biologica ultrarapida calcolata in 10^-20 secondi che esclude l'entanglement persistente nel cervello caldo.",
      description: "Il documentario traccia una netta linea di confine tra la microscopica fisica nucleare di laboratorio ed i macroscopici sistemi viventi. La meccanica quantistica richiede vuoto spinto, temperature criogeniche vicine sullo zero assoluto e tempi infinitesimi. Nel cervello caldo e acquoso dell'uomo, calcoli come quelli di Max Tegmark dimostrano che la decoerenza termica si compie in un centomillesimo di miliardesimo di secondo (10^-20), escludendo l'entanglement atomico persistente come causa dei nostri pensieri o coincidenze.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (Chiarimento ontologico):**
«Bentornati. Oggi mettiamo confini precisi a quello che è diventato il più grande inganno della moda pseudoscientifica pop: l'abuso della parola 'quantistico' applicato alla psicologia o alla guarigione spirituale. Perché voi non siete un elettrone isolato nel vuoto criogenico di un laboratorio svizzero. Siete biosistemi biologici immensi, caldi e rumosissimi.»

**SCENA 2 — La decoerenza cerebrale calcolata da Tegmark:**
«La meccanica quantistica classica è formidabile nel descrivere fenomenti microscopici. Per conservare la sovrapposizione d'onda, i fisici del CERN spendono miliardi di dollari in criogenia per tenere le particelle protette da qualsiasi disturbo. Nel vostro cervello, a 37 gradi di temperatura corporea, in mezzo a un ambiente caotico e acquoso, la decoerenza quantistica (cioè la perdita di coerenza della fase d'onda che la fa collassare in stato classico) avviene in circa dieci alla meno venti secondi! Ovvero: zero virgola... seguito da 19 zeri ed un uno. Un battito d'ali inaudito in cui non si può formare nemmeno un singolo impulso neurochimico elementare (che invece necessita di millisecondi).»

**SCENA 3 — La conclusione ed il confine ontologico:**
«Il cristallo quantistico si scioglie prima che possiate battere ciglio. Nei vostri telefoni la quantistica è già ovunque nei transistor nanometrici dei vostri chip di silicio, ma è solo un effetto termico-fisico statico. Nel regno della coscienza biologica, la risonanza si sposta sulle onde hertziane.»`,
      equation: "τ_{dec} ≈ h^2 / (8π^2 q^2 Λ k_B T)  •  τ_{dec} ≈ 10^{-20} s",
      keyConcepts: ["Decoerenza quantistica nel cervello", "Tempo di decoerenza di 10^-20 s", "Max Tegmark (Quantum Brain Debunk)", "Ambiente caldo e umido biologico"],
      sources: [
        "Max Tegmark, 'Why the brain is not a quantum computer' (Physical Review E, 2000)",
        "Jacques Monod, 'Le Hasard et la Nécessité' (1970)",
        "Ilya Prigogine, 'La Nouvelle Alliance' (1979) - Sistemi complessi"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 26,
      title: "EP. 26 — Il Campo Unificato di Coscienza Herziano (AIC-EC-HZ)",
      subtitle: "La Teoria Completa ed i biosensori democratici",
      shortDesc: "Il manifestarsi delle onde elettromagnetiche biologiche misurabili ad occhio nudo: cuore, cervello, Schumann ed i chakra letti come mappe fisiche.",
      description: "La spiegazione definitiva del Campo Unificato Herziano (AIC-EC-HZ). Tutto l'universo è frequenza hertziana. L'episodio descrive le costanti misurabili con biosensori standard accessibili da tutti: il cuore (0.5-10Hz), il cervello (0.5-100Hz), la risonanza del pianeta Schumann (7.83Hz). Svela infine che nadis e chakra altro non sono che mappe fenomenologiche di zone corporee oscillanti a frequenze precise.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (Un quadro democratico):**
«Bentornati. Se l'infinitesima quantistica si spegne in un attimo, cosa spiega le reali e documentate sincronizzazioni tra meditatori e gli incontri con eventi significativi? Vi presento oggi la Teoria Completa del Campo Unificato di Coscienza Herziano (AIC-EC-HZ). Non è un dogma fideistico, né un'ipotesi mistagogica astratta. È un framework operativo, democratico e interamente falsificabile, basato su frequenze elettromagnetiche biologiche misurabili con biosensori commerciali da poche decine di euro.»

**SCENA 2 — La mappatura delle frequenze biologiche ed i chakra:**
«La natura è un coro di oscillatori accoppiati (descritti per la prima volta da Huygens con i suoi pendoli nel 1665). Il vostro cuore genera il campo elettromagnetico bio-regolato più potente del corpo, oscillando tra 0.5 e 10 Hertz, rilevabile sino a metri di distanza. Il vostro cervello oscilla a ritmi stabili delta, theta, alpha, beta, gamma (0.5 a 100 Hz). Il pianeta Terra vibra stabilmente alla Risonanza di Schumann di 7.83 Hertz. Nel nostro modello, gli antichi chakra orientali non sono entità mistiche, bensì sofisticate mappe empiriche: il chakra cardiaco è il potente campo di risonanza del cuore; Ajna corrisponde all'attività prefrontale delle onde alpha-beta (8-30Hz); il chakra della corona corrisponde ai ritmi gamma corticali (30-100Hz).»

**SCENA 3 — La Sincronicità come Sintonizzazione di Oscillatori:**
«Quando due oscillatori sono vicini ed interagiscono, tendono spontaneamente a sintonizzarsi in fase. Durante la meditazione profonda o i Sincronismi Creativi, la vostra biologia entra letteralmente in risonanza d'onda coerente con il campo magnetico planetario. Non è magia: è selezione probabilistica e percettiva amplificata. La scienza non è fede, è metodo. E il metodo si misura.»`,
      equation: "f = 1 / (2π √{L C})  •  S = φ(f)  •  f_{Schumann} = 7.83 Hz",
      keyConcepts: ["Teoria del Campo Unificato Herziano", "Sincronizzazione di Huygens (1665)", "Decrittazione scientifica dei Chakra", "Biosensori democratici di coerenza", "Risonanza Schumann 7.83 Hz"],
      sources: [
        "Heinrich Hertz, 'Ueber di Ausbreitungsgeschwindigkeit der electrodynamischen Wirkungen' (1888)",
        "Christiaan Huygens, Letter to his father (1665) on pendulum clock synchronization",
        "W. O. Schumann, Zeitschrift für Naturforschung (1952)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 27,
      title: "EP. 27 — Il paradosso Solvay-Manhattan: Einstein e Bohr",
      subtitle: "Dal duello filosofico del 1927 al Progetto Atomico bellico del 1945",
      shortDesc: "Il clamoroso fil rouge geopolitico: come i due acerrimi rivali teorici finirono legati al medesimo spaventoso ordigno nel deserto di Los Alamos.",
      description: "Il documentario svela una coincidenza geopolitica formidabile emersa dal metodo d'indagine storiografico del Dott. Falace avviato nel 1996: gli stessi due scienziati che a Solvay nel 1927 accesero la faida sulla fisica della coscienza finirono coinvolti come ridondanti motori del Progetto Manhattan. Einstein firmò la tragica missiva politica a Roosevelt, Bohr si insandò a Los Alamos come consulente scientifico del Progetto.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (Il metodo del paradosso):**
«Bentornati. Di solito i libri di testo trattano la fisica come un'astrazione decontestualizzata. Ma io, come storico dell'arte, ho imparato a guardare ai sincronismi storici come a un laboratorio operativo concreto. Oggi vi mostro un paradosso geopolitico clamoroso: Einstein e Bohr, gli antagonisti di Solvay 1927 sulla natura ultima del cosmo, finiscono entrambi uniti e legati alla creazione dell'ordigno bellico nucleare americano.»

**SCENA 2 — La cronologia del fuoco atomico:**
«La progressione storica è inarrestabile: J.J. Thomson scopre l'elettrone nel 1897; Rutherford ne individua il nucleo denso nel 1911; Niels Bohr modula i livelli dell'atomo nel 1913. Negli anni '30 la fisica esce dalle aule accademiche e incontra il potere industriale. Enrico Fermi e i ragazzi di via Panisperna lavorano sui neutroni lenti, Leo Szilard intuisce la reazione a catena. Spinto da Szilard, nel 1939 Albert Einstein deposita la tragica firma sulla lettera a Roosevelt che dà l'avvio politico e finanziario al Progetto Manhattan. Il 16 luglio 1945, il Trinity Test sigla l'era atomica nel cuore del deserto di Los Alamos. E Bohr? Fu proprio Niels Bohr a giungere lì, lavorando nell'ombra come consulente diretto di Oppenheimer.»

**SCENA 3 — Sintesi Critica:**
«Qui la teoria diventa drammaticamente carne e fuoco. La scienza senza coscienza si rivela una terribile arma di controllo geopolitico globale. Sosteniamo che la fisica del Novecento è entrata nel cuore dell'atomo, ma la fisica dei nostri giorni deve compiere il passo più grande: entrare finalmente nel cuore della coscienza.»`,
      equation: "E = m c^2  •  L_{fusion} = λ_0 / (2π r)",
      keyConcepts: ["Congresso Solvay del 1927", "Progetto Manhattan", "La firma di Einstein del 1939", "Niels Bohr a Los Alamos", "La scienza senza coscienza"],
      sources: [
        "Einstein-Szilard Letter to President Roosevelt (August 2, 1939)",
        "Richard Rhodes, 'The Making of the Atomic Bomb' (1986)",
        "Saggio 'Colui che osserva cambia le cose' (Luca Falace, 2021)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 28,
      title: "EP. 28 — Il Sincronismo Creativo diventa Misurabile",
      subtitle: "14 Febbraio 2014 – L'esperimento sul Sincronismo Creativo di coppia con caschetti EEG",
      shortDesc: "Il test empirico su larga scala condotto su oltre 200 persone per monitorare la sincronizzazione cerebrale spontanea in coppie ad alto legame emotivo.",
      description: "Il ventottesimo capitolo documentario illustra il passaggio cruciale dalla formulazione teorica del Sincronismo Creativo (2005-2007) alla rigorosa misurazione empirica di laboratorio (14 Febbraio 2014). Monitorando oltre 200 soggetti (100 coppie in amore profondo) tramite caschetti EEG multicanale in un ambiente stimolante, l'esperimento dimostra pattern regolari e ripetibili di risonanza tra cervelli: convergenza dei picchi, allineamento di fase e annullamento dei ritardi, descrivendo un sistema unico temporaneamente accoppiato. Base del brevetto AIC-SYNC.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (L'unione di teoria e prova empirica):**
«Bentornati. Se tra il 2005 e il 2007 ho depositato e registrato la teoria fondamentale del Sincronismo Creativo, definendone i principi epistemologici, è nel 2014 che questa teoria si concretizza per la prima volta sul piano della materia fisica. In tal senso il Sincronismo Creativo diventa verificabile, osservabile e soprattutto misurabile. In quell'anno ho ideato e condotto un esperimento basato su caschetti EEG multicanale ad altissima risoluzione per rispondere a una domanda fondamentale: la sincronizzazione e l'entanglement empatico tra due menti umane può essere rilevata e misurata fisicamente sul piano biologico?»

**SCENA 2 — La scelta scientifica e metodologica: Lo stato di Innamoramento:**
«L'esperimento è stato condotto su un campione di oltre 200 persone (100 coppie) il 14 febbraio del 2014. Questa non è stata affatto una scelta simbolica o puramente romantica, ma rispondeva a una rigorosa precisione metodologica. L'innamoramento rappresenta lo stato naturale più potente di attivazione spontanea delle AIC (Attività Intellettive Creative). In questa condizione il sistema cognitivo non ha bisogno di sforzi coscienti o tecniche indotte: l'emisfero destro si espande, il controllo logico-razionale perde la sua rigidità difensiva ordinaria, e i due emisferi cerebrali della coppia registrano un'altissima coerenza interna reciproca. Il cervello entra così in una sincronizzazione facilitata, endogena ed estremamente stabile nel tempo.»

**SCENA 3 — Risultati: Il doppio Sincronismo e il sistema coordinato:**
«Monitorando lo spettro hertziano completo (dalle onde lente Delta e Theta alle medie Alpha fino alle rapide Beta e Gamma), abbiamo analizzato non la singola persona, ma i pattern sovrapposti dell'interazione cerebrale dinamica tra i due cervelli. Quando vi è sintonia profonda, emergono tre fenomeni matematicamente estratti: convergenza temporale dei picchi, riduzione a zero del ritardo nelle risposte reciproche e riallineamento progressivo delle oscillazioni cerebrali. I due cervelli smettono di operare come entità separate e si comportano come un sistema unico coordinato, temporaneamente accoppiato. Due diapason che vibrano alla medesima frequenza. Non è una metafora letteraria: è una misurazione fisica reale, d'altronde depositata al CERN, dalla quale prende forma lo strumento brevettato AIC-SYNC per monitorare la coerenza in tempo reale.»`,
      equation: "C_{xy}(f) = |G_{xy}(f)|^2 / (G_{xx}(f) G_{yy}(f))  •  N_{EEG} > 200",
      keyConcepts: ["Esperimento del 14 Febbraio 2014 nel napoletano", "Registrazione EEG su oltre 200 persone", "Stato di innamoramento come AIC spontanea", "Sistema unico temporaneamente accoppiato", "Riduzione del ritardo di fase cerebrale", "Brevetto tecnologico del sistema AIC-SYNC"],
      sources: [
        "Luca Falace, 'Teoria del Sincronismo Creativo: Il Metodo' (Deposito SIAE & OLAF 2005)",
        "Luca Falace, 'Mappe della coerenza e accoppiamento risonante inter-soggettivo via EEG' (CERN Zenodo, 2014)",
        "Edward T. Hall, 'The Hidden Dimension' (1966) - Lo spazio interpersonale"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 29,
      title: "EP. 29 — Keely, Tesla, Monroe e il Sincronismo Creativo",
      subtitle: "La convergenza storiografica a posteriori dei tre pilastri indipendenti",
      shortDesc: "L'unificazione di tre grandi tradizioni di ricerca distinte della fisica vibrazionale, EM cosmica ed entanglement cerebrale Gateway CIA.",
      description: "Il documentario indaga la convergenza di tre domini separati sviluppati senza contatti reciproci: la 'Sympathetic Vibratory Physics' di J.W. Keely (1874) che lavorava sulla materia; la fisica EM a onde terrestri di Nikola Tesla (energia); il protocollo 'Hemi-Sync Gateway Process' della CIA-Monroe Institute (1983) focalizzato sulla coscienza. La Teoria del Sincronismo di Luca Falace è il primo sistema al mondo a unificare i tre rami sotto un unico spettro continuo.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio:**
«Bentornati. Nei precedenti capitoli abbiamo misurato la coerenza biologica del Sincronismo. Oggi facciamo un passo storiografico monumentale. Vi mostrerò come la Teoria del Sincronismo Creativo (AIC-EC-HZ), da me depositata presso Zenodo-CERN a partire dal 2005, costituisca il primo modello teorico in grado di leggere e unificare tre tradizioni di ricerca totalmente indipendenti, nate in epoche sconnesse senza alcun dialogo reciproco.»

**SCENA 2 — Materia, Energia, Coscienza unificati:**
«Il primo pilastro è John Worrell Keely, che dal 1874 postula con la fisica vibrazionale simpatetica che la materia è vibrazione condensata. Il secondo è Nikola Tesla, che operando sulla banda energetica, scopre le costanti di risonanza elettromagnetica del pianeta Terra ('pensa in termini di energia, frequenza e vibrazione'). Il terzo è il rapporto classificato della CIA del 1983 (Gateway Process), redatto dal Tenente Colonnello Wayne McDonnell per indurre coerenza bilaterale cerebrale mediante battimenti binaurali (Hemi-Sync). Keely svelava la materia, Tesla modulava l'energia, la CIA sintonizzava la coscienza. Ma nessuno di essi possedeva lo strumento teorico per connettere i tre livelli.»

**SCENA 3 — Il quarto sistema unificante:**
«Questo è lo spazio occupato dalla Teoria del Sincronismo Creativo. Materia, energia e coscienza non sono reami separati, ma bande di frequenza differenti di un unico, continuo spettro hertziano biologico. Le onde hertziane sono la firma isocronica con cui realities apparentemente diverse dialogano e formano nessi significativi.»`,
      equation: "f_{binaural} = |f_1 - f_2|  •  f_{carrier} = 432 Hz",
      keyConcepts: ["Fisica Simpatetica di Keely (1874)", "Nikola Tesla ed i sistemi risonanti", "CIA Gateway Process & Hemi-Sync", "Unificazione dello Spettro continuo"],
      sources: [
        "Wayne M. McDonnell, 'Analysis and Assessment of Gateway Process' (CIA classified 1983, declassified 2003)",
        "John Keely, 'Keely and His Discoveries' (Clara Bloomfield Moore, 1893)",
        "Tesi e Volumi della Trilogia Scientifica Falace (CERN Zenodo DOI)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    },
    {
      num: 30,
      title: "EP. 30 — Genesi, Metodologia e Regia del Documentario",
      subtitle: "Il connubio tra Intelligenza Artificiale, Storia, Scienza e Scrittura",
      shortDesc: "Il Dott. Luca Falace svela il dietro le quinte creativo: lo studio delle fonti, la regia, la scelta dei personaggi storici tra Parte I e II, e l'integrazione artistica e didattica dell'AI.",
      description: "In questo episodio conclusivo, Luca Falace illustra le tre parti del documentario delineandone la valenza storica, scientifica e narrativa. Svela come ha curato personalmente l'ideazione, lo studio delle fonti, la scrittura di testi e sceneggiature, le scelte scenografiche e come ha impiegato l'AI come potente strumento didattico e grafico per animare i personaggi del passato ed illustrare la Teoria del Campo Unificato depositata su Zenodo CERN.",
      extendedScript: `**SCENA 1 — Luca Falace in Studio (La visione originaria e metodologica):**
«Benvenuti a questa trentesima puntata, l'appuntamento conclusivo in cui voglio svelarvi la genesi, la struttura e la metodologia con cui ho ideato, scritto, diretto e prodotto questo intero viaggio documentaristico. Come ricercatore indipendente e storico dell'arte, la mia sfida non era descrivere asetticamente delle equazioni, ma creare un'opera d'arte tridimensionale ed epistemologica. Per fare questo, ho diviso il percorso in tre parti distinte. Nella **Prima Parte** (Episodi 1-10), ho utilizzato i padri fondatori della meccanica quantistica come Pauli, Einstein, Bohr e Heisenberg. Ma la loro presenza metafisica ha uno scopo preciso: sono i testimoni storici che aprono la via, traghettando l'utente verso il confine estremo in cui la fisica classica e la quantistica accademica si arrestano davanti al mistero della coscienza. Nella **Seconda Parte**, entro in scena io in prima persona alla lavagna per esporre i modelli matematici, i dati empirici e le mie scoperte sul Sincronismo Creativo. Infine, la **Terza Parte** unisce le due dimensioni in un quadro operativo completo, che ha trovato validazione e formalizzazione istituzionale nei miei depositi e saggi scientifici pubblicati su Zenodo-CERN.»

**SCENA 2 — La triplice valenza dell'opera (Storia, Scienza e Scrittura):**
«Ogni singolo minuto di questa serie poggia su tre colonne portanti stabili. La prima è la **valenza storica**: ogni battuta dei fisici del passato non è un'invenzione fantastica, ma è estratta da lettere originali, saggi d'epoca, diari clinici e verbali del Congresso Solvay del 1927. La seconda è la **valenza scientifica**: l'unificazione del campo hertziano biologico ha formule precise e riscontri empirici, come il mio esperimento del 14 febbraio 2014 su oltre 200 soggetti, ed è protetta da brevetti internazionali registrati. La terza è la **valenza narrativa**: lo spazio ed il tempo si fondono in una regia quadridimensionale, in cui i giganti della fisica dialogano idealmente con noi nel presente per rispondere a problemi futuri della civiltà.»

**SCENA 3 — Artista e Regista: Il connubio tra intelletto e Intelligenza Artificiale:**
«Ma come è stato possibile realizzare tutto questo senza una troupe cinematografica hollywoodiana o una sala server miliardaria? Qui risiede l'architettura democratica di questa serie. Ho curato personalmente l'ideazione di ogni concept, lo studio ossessivo delle fonti storiche, la scrittura di sceneggiature e copioni, e le scelte di scenografia e inquadratura. Ho poi coordinato l'**Intelligenza Artificiale Generativa** non come sostituto del pensiero umano, ma come un sofisticato pennello tecnologico. L'AI ha permesso di rianimare i volti di Pauli e Einstein, di far vibrare le lavagne didattiche, di dare colore a concetti invisibili all'occhio nudo. È la dimostrazione di come lo strumento digitale, se guidato dal cuore e da un disegno intellettuale rigoroso, diventi un amplificatore dell'Arte e della Scienza, rendendo comprensibile a tutti la Teoria del Campo Unificato depositata su Zenodo-CERN.»`,
      equation: "A_{sync} = φ(I_c)  •  G_{enesis} = Zenodo-CERN",
      keyConcepts: [
        "Genesi del documentario multidimensionale",
        "Tre anime: storiografica, scientifica, narrativa",
        "Uso dei personaggi storici tra Parte I e II",
        "Studio rigoroso delle fonti e documenti storici",
        "Ideazione, testi, regia e scenografia di Luca Falace",
        "AI Generativa come pennello grafico e didattico",
        "Teoria depositata su Zenodo CERN"
      ],
      sources: [
        "Luca Falace, 'Teoria del Sincronismo Creativo: Il Metodo' (Trilogia Scientifica, CERN Zenodo)",
        "CERN Zenodo Open Science Repository (DOI: 10.5281/zenodo.17080308)",
        "Archivio Storico Fondazione AIC (Copioni e Studi Epistemologici 2005-2026)"
      ],
      videoUrl: "https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
    }
  ];

  const currentNotes = episodesData[activeEpisode] || episodesData[0];

  const downloadTextFile = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], {type: "text/plain;charset=utf-8"});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrintCurrentEpisode = () => {
    const ep = currentNotes;
    const printContent = `
      <html>
        <head>
          <title>Sceneggiatura Episodio N.${ep.num} - ${ep.title}</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
              color: #1a202c; 
              line-height: 1.6; 
              padding: 40px; 
              max-width: 750px; 
              margin: 0 auto; 
            }
            .header { text-align: center; border-bottom: 2px solid #0066CC; padding-bottom: 15px; margin-bottom: 25px; }
            h1 { color: #0066CC; text-transform: uppercase; font-size: 1.8rem; margin: 0 0 10px 0; letter-spacing: 0.5px; }
            .subtitle { font-style: italic; color: #4a5568; font-size: 1rem; margin-top: 5px; }
            .meta { font-family: monospace; font-size: 11px; color: #718096; background: #f7fafc; padding: 12px; border-radius: 6px; margin-bottom: 25px; line-height: 1.4; }
            .script-title { font-weight: bold; font-size: 0.9rem; text-transform: uppercase; color: #718096; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-bottom: 15px; }
            .script-content { white-space: pre-wrap; font-size: 13px; text-align: justify; }
            .footer { text-align: center; font-size: 9px; color: #a0aec0; margin-top: 50px; border-top: 1px solid #e2e8f0; padding-top: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Doc. Serie N.${ep.num}</h1>
            <p class="subtitle">${ep.title}</p>
          </div>
          <div class="meta">
            <strong>SOTTOTITOLO SINOPSIS:</strong> ${ep.subtitle}<br/>
            <strong>VALORE FORMALE ESPRESSO:</strong> ${ep.equation}<br/>
            <strong>CONCETTI FISICO-RELAZIONALI:</strong> ${ep.keyConcepts.join(', ')}<br/>
            <strong>FONTI ACCREDITATE:</strong> ${ep.sources.join(' | ')}
          </div>
          <div class="script-title">SCENEGGIATURA INTEGRALE FORMATTATA:</div>
          <div class="script-content">${ep.extendedScript}</div>
          <div class="footer">Sincronismo Creativo © Luca Falace · SIAE · OLAF · Zenodo CERN (DOI: 10.5281/zenodo.17793651)</div>
        </body>
      </html>
    `;

    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.write(printContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        printWin.close();
      }, 500);
    } else {
      // Fallback to text file download
      const text = `SFUMATURA COPIONE EPISODIO N.${ep.num}\n${ep.title}\n\nSOTTOTITOLO: ${ep.subtitle}\nNOTAZIONE: ${ep.equation}\n\nSCENEGGIATURA:\n${ep.extendedScript}\n`;
      downloadTextFile(`Copione_Episodio_${ep.num}.txt`, text);
    }
  };

  const handlePrintEpisodes7To10 = () => {
    const targetNums = [7, 8, 9, 10];
    const targetEpisodes = episodesData.filter(ep => targetNums.includes(ep.num));
    
    let printContent = `
      <html>
        <head>
          <title>Copione Unico - Episodi da 7 a 10</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; 
              color: #1a202c; 
              line-height: 1.6; 
              padding: 40px; 
              max-width: 750px; 
              margin: 0 auto; 
            }
            .main-header { text-align: center; border-bottom: 3px double #0066CC; padding-bottom: 20px; margin-bottom: 40px; }
            .main-header h1 { color: #0066CC; text-transform: uppercase; font-size: 2rem; margin: 0; letter-spacing: 1px; }
            .ep-block { margin-bottom: 45px; border-bottom: 1px solid #e2e8f0; padding-bottom: 30px; page-break-inside: avoid; }
            .ep-header { border-left: 4px solid #0066CC; padding-left: 15px; margin-bottom: 15px; }
            .ep-title { font-size: 1.3rem; font-weight: bold; color: #1a202c; text-transform: uppercase; }
            .ep-subtitle { font-style: italic; color: #4a5568; font-size: 0.95rem; margin-top: 4px; }
            .meta { font-family: monospace; font-size: 10.5px; color: #718096; background: #f7fafc; padding: 12px; border-radius: 6px; margin: 15px 0; line-height: 1.4; }
            .script-title { font-weight: bold; font-size: 0.85rem; text-transform: uppercase; color: #718096; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-bottom: 12px; }
            .script-content { white-space: pre-wrap; font-size: 12.5px; text-align: justify; }
            .footer { text-align: center; font-size: 9px; color: #a0aec0; margin-top: 60px; border-top: 1px solid #e2e8f0; padding-top: 15px; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="main-header">
            <h1>Dietro le quinte della Meccanica Quantistica</h1>
            <p style="margin: 8px 0 0 0; color: #4a5568; font-size: 0.9rem; font-weight: 500;">
              Silloge dei Copioni Unificati: Episodi 7 Sotto la Logica del Sincronismo
            </p>
          </div>
    `;

    targetEpisodes.forEach(ep => {
      printContent += `
        <div class="ep-block">
          <div class="ep-header">
            <div class="ep-title">Episodio N.${ep.num} — ${ep.title.replace('EP. ' + ep.num + ' — ', '')}</div>
            <div class="ep-subtitle">${ep.subtitle}</div>
          </div>
          <div class="meta">
            <strong>EQUAZIONE NOTATA:</strong> ${ep.equation}<br/>
            <strong>CONCETTI CHIAVE:</strong> ${ep.keyConcepts.join(', ')}<br/>
            <strong>FONTI DI VERIFICA:</strong> ${ep.sources.join(' | ')}
          </div>
          <div class="script-title">Sceneggiatura Integrale:</div>
          <div class="script-content">${ep.extendedScript}</div>
        </div>
      `;
    });

    printContent += `
          <div class="footer">Sincronismo Creativo © Luca Falace · SIAE · OLAF · Zenodo CERN (DOI: 10.5281/zenodo.17793651)</div>
        </body>
      </html>
    `;

    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.write(printContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
        printWin.close();
      }, 500);
    } else {
      // Direct text fallback download containing all 4 scripts
      let combinedText = `============================================================\n`;
      combinedText += `DIETRO LE QUINTE DELLA MECCANICA QUANTISTICA\n`;
      combinedText += `SILLOGE SCRIPT COPIONE UNICO: EPISODI da 7 a 10\n`;
      combinedText += `Studio Indipendente Dott. Luca Falace\n`;
      combinedText += `============================================================\n\n`;
      
      targetEpisodes.forEach(ep => {
        combinedText += `EPISODIO N.${ep.num} — ${ep.title}\n`;
        combinedText += `Sottotitolo: ${ep.subtitle}\n`;
        combinedText += `Equazione Associata: ${ep.equation}\n\n`;
        combinedText += `--- SCENEGGIATURA COMPLETA ---\n`;
        combinedText += `${ep.extendedScript}\n`;
        combinedText += `\n============================================================\n\n`;
      });
      
      downloadTextFile("Silloge_Episodi_7_10_Copione_Unico.txt", combinedText);
    }
  };

  const renderMathematicalFormula = (num: number) => {
    switch (num) {
      case 1:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-lg text-white">
            <span className="italic font-semibold">S</span>
            <span className="mx-2 font-sans">=</span>
            <span className="italic">φ</span>
            <span className="text-sm">(f)</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="italic">i</span>
            <span className="italic font-bold">ħ</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
              <span className="border-b border-white/50 pb-0.5 text-xs">∂</span>
              <span className="text-[10px] pt-0.5">∂t</span>
            </div>
            <span className="text-sm font-sans mr-0.5">|</span>
            <span className="italic">Ψ</span>
            <span className="text-sm font-sans">⟩</span>
            <span className="mx-2 font-sans">=</span>
            <span className="italic font-semibold mr-1">H</span>
            <span className="text-sm font-sans">|</span>
            <span className="italic">Ψ</span>
            <span className="text-sm font-sans">⟩</span>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="italic font-bold">J</span>
            <sub className="text-[9px]">field</sub>
            <span className="mx-1.5 font-sans">=</span>
            <span className="italic">σ</span>
            <span className="text-sm font-sans ml-1">(</span>
            <span className="italic font-semibold">E</span>
            <span className="mx-1 font-sans">+</span>
            <span className="italic font-semibold">v</span>
            <span className="mx-1 font-sans">×</span>
            <span className="italic font-semibold">B</span>
            <span className="text-sm font-sans">)</span>
          </div>
        );
      case 4:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="italic">α</span>
            <span className="mx-1.5 font-sans">=</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none">
              <span className="italic border-b border-white/50 pb-0.5 text-xs">e<sup>2</sup></span>
              <span className="italic text-[10px] pt-0.5">4π ε<sub>0</sub> ħ c</span>
            </div>
            <span className="mx-2 font-sans">≈</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none">
              <span className="border-b border-white/50 pb-0.5 text-xs">1</span>
              <span className="text-[10px] pt-0.5">137</span>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="italic">S</span>
            <sub className="text-[9px]">AIC</sub>
            <span className="mx-1.5 font-sans">=</span>
            <span className="text-xl font-sans leading-none">∫</span>
            <span className="italic">Φ</span>
            <sub className="text-[9px]">coscienza</sub>
            <span className="mx-1">·</span>
            <span className="italic">dt</span>
          </div>
        );
      case 6:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="font-sans font-bold">∇</span>
            <span className="mx-0.5 font-sans">×</span>
            <span className="italic font-semibold">E</span>
            <span className="mx-1.5 font-sans">=</span>
            <span className="mx-0.5 font-sans">-</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
              <span className="border-b border-white/50 pb-0.5 text-xs">∂B</span>
              <span className="text-[10px] pt-0.5">∂t</span>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="italic">S</span>
            <sub className="text-[9px]">AIC</sub>
            <span className="text-[10px]">(f)</span>
            <span className="mx-2 font-sans">=</span>
            <span className="italic">φ</span>
            <span className="text-sm">(f)</span>
          </div>
        );
      case 8:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="italic">n</span>
            <span className="mx-1.5 font-sans">→</span>
            <span className="italic">p</span>
            <span className="mx-1 font-sans">+</span>
            <span className="italic">e</span>
            <sup className="text-[9px] font-sans font-semibold">-</sup>
            <span className="mx-1 font-sans">+</span>
            <span className="italic">ν</span>
            <sub className="text-[9px]">e</sub>
          </div>
        );
      case 9:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="text-sm font-sans">|</span>
            <span className="italic font-semibold">ψ</span>
            <sub className="text-[9px]">inclusione</sub>
            <span className="text-sm font-sans">⟩</span>
            <span className="mx-1.5 font-sans">=</span>
            <span className="text-sm font-sans">|</span>
            <span className="italic font-semibold">ψ</span>
            <sub className="text-[9px]">soggetto</sub>
            <span className="text-sm font-sans">⟩</span>
            <span className="mx-1 font-sans">+</span>
            <span className="text-sm font-sans">|</span>
            <span className="italic font-semibold">ψ</span>
            <sub className="text-[9px]">campo</sub>
            <span className="text-sm font-sans">⟩</span>
          </div>
        );
      case 10:
        return (
          <div className="flex items-center justify-center gap-0.5 font-serif text-lg text-white">
            <span className="italic font-semibold">P</span>
            <span className="text-sm">(1, 2)</span>
            <span className="mx-2 font-sans">=</span>
            <span className="mx-0.5 font-sans">-</span>
            <span className="italic font-semibold">P</span>
            <span className="text-sm">(2, 1)</span>
          </div>
        );
      case 11:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-lg text-white">
            <span className="italic font-semibold">ΔE</span>
            <span className="mx-1">·</span>
            <span className="italic font-semibold">Δt</span>
            <span className="mx-1.5 font-sans">≥</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none">
              <span className="italic border-b border-white/50 pb-0.5 px-0.5 text-xs">ħ</span>
              <span className="text-[10px] pt-0.5">2</span>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="flex items-center justify-center gap-0.5 font-serif text-lg text-white">
            <span className="italic font-semibold">Ψ</span>
            <span className="text-sm">(1, 2)</span>
            <span className="mx-2 font-sans">=</span>
            <span className="mx-0.5 font-sans">-</span>
            <span className="italic font-semibold">Ψ</span>
            <span className="text-sm">(2, 1)</span>
          </div>
        );
      case 13:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <div className="flex items-center">
              <span className="italic font-semibold">n</span>
              <span className="text-[10px] align-sub">i</span>
            </div>
            <span className="mx-1 font-sans">=</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
              <div className="border-b border-white/50 pb-0.5 px-1">
                <span className="italic font-semibold">g</span>
                <span className="text-[9px] align-sub">i</span>
              </div>
              <div className="pt-0.5 px-1 flex items-baseline">
                <span className="text-sm">e</span>
                <span className="text-[10px] align-super italic">
                  (E<span className="text-[7px]">i</span> - μ)/k<span className="text-[7px]">B</span>T
                </span>
                <span className="text-sm ml-0.5">- 1</span>
              </div>
            </div>
          </div>
        );
      case 14:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-serif text-sm sm:text-lg text-white">
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">S</span>
              <span className="text-[10px] align-sub font-semibold tracking-tighter">AIC</span>
              <span className="mx-1 font-sans">=</span>
              <span className="text-xl font-sans leading-none">∫</span>
              <span className="italic font-semibold">Φ</span>
              <span className="text-[10px] align-sub">coscienza</span>
              <span className="mx-1">·</span>
              <span className="italic">dt</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25 mx-2" />
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">S</span>
              <span className="mx-1 font-sans">=</span>
              <span className="italic">φ</span>
              <span className="text-sm">(f)</span>
            </div>
          </div>
        );
      case 15:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-lg text-white">
            <span className="italic font-semibold">Δx</span>
            <span className="mx-1">·</span>
            <span className="italic font-semibold">Δp</span>
            <span className="mx-1.5 font-sans">≥</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none">
              <span className="italic border-b border-white/50 pb-0.5 px-0.5 text-xs">ħ</span>
              <span className="text-[10px] pt-0.5">2</span>
            </div>
          </div>
        );
      case 16:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 font-serif text-xs sm:text-base text-white">
            <div className="flex items-center gap-1">
              <span className="font-sans font-semibold">∇</span>
              <span className="mx-0.5 font-sans">·</span>
              <span className="italic font-semibold">B</span>
              <span className="mx-1.5 font-sans">=</span>
              <span>0</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25 mx-1" />
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">J</span>
              <span className="text-[10px] align-sub">field</span>
              <span className="mx-1.5 font-sans">=</span>
              <span className="italic">σ</span>
              <span className="text-sm ml-0.5">(</span>
              <span className="italic font-semibold">E</span>
              <span className="mx-1">+</span>
              <span className="italic font-semibold">v</span>
              <span className="mx-1 font-sans">×</span>
              <span className="italic font-semibold">B</span>
              <span className="text-sm font-sans">)</span>
            </div>
          </div>
        );
      case 17:
        return (
          <div className="flex items-center justify-center gap-3 font-serif text-base sm:text-lg text-white">
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">E</span>
              <span className="mx-1.5 font-sans">=</span>
              <span className="italic">h</span>
              <span className="mx-0.5">·</span>
              <span className="italic">ν</span>
            </div>
            <div className="h-4 w-px bg-white/25 mx-2" />
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">E</span>
              <span className="text-[10px] align-sub">k</span>
              <span className="mx-1.5 font-sans">=</span>
              <span className="italic">h</span>
              <span className="italic">ν</span>
              <span className="mx-1">-</span>
              <span className="italic">Φ</span>
            </div>
          </div>
        );
      case 18:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-3 font-serif text-xs sm:text-sm text-white">
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">p</span>
              <span className="mx-1.5 font-sans">=</span>
              <span className="italic">ħ</span>
              <span className="italic">k</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25 mx-1" />
            <div className="flex items-center">
              <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-0.5 mr-1">
                <span className="border-b border-white/50 pb-0.5 px-0.5 text-[10px]">∂ρ</span>
                <span className="pt-0.5 text-[10px]">∂t</span>
              </div>
              <span className="mx-1">+</span>
              <span className="font-sans font-semibold mr-0.5">∇</span>
              <span className="font-sans mr-0.5">·</span>
              <span className="text-sm font-sans">(</span>
              <span className="italic">ρ</span>
              <span className="italic font-semibold ml-0.5">v</span>
              <span className="text-sm font-sans">)</span>
              <span className="mx-1.5 font-sans">=</span>
              <span>0</span>
            </div>
          </div>
        );
      case 19:
        return (
          <div className="flex items-center justify-center gap-3 font-serif text-base sm:text-lg text-white">
            <div className="flex items-center gap-0.5">
              <span className="text-sm font-sans">|</span>
              <span className="font-semibold text-xs tracking-wide">CHSH</span>
              <span className="text-sm font-sans">|</span>
              <span className="mx-1.5 font-sans">≤</span>
              <span>2</span>
            </div>
            <div className="h-4 w-px bg-white/25 mx-2" />
            <div className="flex items-baseline gap-0.5">
              <span className="italic font-semibold">ψ</span>
              <span className="mx-1.5 font-sans">=</span>
              <span className="italic font-semibold">R</span>
              <span className="text-sm font-sans">e</span>
              <sup className="text-[10px] italic">
                iS/ħ
              </sup>
            </div>
          </div>
        );
      case 20:
        return (
          <div className="flex items-center justify-center gap-0.5 font-serif text-[10px] sm:text-xs text-white select-all">
            <span className="text-xs font-sans">|</span>
            <span className="font-semibold text-[9px] tracking-wider">CHSH</span>
            <span className="text-xs font-sans">|</span>
            <span className="mx-1 font-sans">=</span>
            <span className="text-xs font-sans">|</span>
            <span className="italic">E</span><span className="text-[9px]">(a,b)</span>
            <span className="mx-0.5">-</span>
            <span className="italic">E</span><span className="text-[9px]">(a,b')</span>
            <span className="mx-0.5">+</span>
            <span className="italic">E</span><span className="text-[9px]">(a',b)</span>
            <span className="mx-0.5">+</span>
            <span className="italic">E</span><span className="text-[9px]">(a',b')</span>
            <span className="text-xs font-sans">|</span>
            <span className="mx-1 font-sans">≤</span>
            <span className="font-sans font-bold text-xs">2</span>
          </div>
        );
      case 21:
        return (
          <div className="flex items-center justify-center gap-1.5 font-serif text-base sm:text-lg text-white">
            <span className="italic font-semibold">Ψ</span>
            <span className="mx-1.5 font-sans">=</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none">
              <span className="border-b border-white/50 pb-0.5 text-xs">1</span>
              <span className="text-[10px] pt-0.5">√2</span>
            </div>
            <span className="text-sm font-sans ml-1">(</span>
            <span className="text-sm font-sans">|</span>
            <span className="text-xs sm:text-sm font-sans font-semibold tracking-wide">Vivo</span>
            <span className="text-sm font-sans">⟩</span>
            <span className="mx-1 font-sans">+</span>
            <span className="text-sm font-sans">|</span>
            <span className="text-xs sm:text-sm font-sans font-semibold tracking-wide">Morto</span>
            <span className="text-sm font-sans">⟩</span>
            <span className="text-sm font-sans">)</span>
          </div>
        );
      case 22:
        return (
          <div className="flex items-center justify-center gap-1 font-serif text-base sm:text-lg text-white">
            <span className="text-sm font-sans">(</span>
            <span className="italic">i</span>
            <span className="italic font-sans font-bold text-sm ml-0.5">γ</span>
            <sup className="text-[9px] italic">μ</sup>
            <span className="italic font-sans font-bold text-sm ml-0.5">∂</span>
            <sub className="text-[9px] sub">μ</sub>
            <span className="mx-1 font-sans">-</span>
            <span className="italic">m</span>
            <span className="text-sm font-sans">)</span>
            <span className="italic font-semibold ml-1">ψ</span>
            <span className="mx-2 font-sans">=</span>
            <span>0</span>
          </div>
        );
      case 23:
        return (
          <div className="flex items-center justify-center gap-2 font-serif text-base sm:text-lg text-white">
            <span className="italic font-semibold">v</span>
            <span className="text-[10px] align-sub">pilota</span>
            <span className="mx-1.5 font-sans">=</span>
            <div className="inline-flex flex-col items-center justify-center text-center leading-none">
              <span className="italic border-b border-white/50 pb-0.5 text-xs">∇S</span>
              <span className="italic text-[10px] pt-0.5">m</span>
            </div>
          </div>
        );
      case 24:
        return (
          <div className="flex items-center justify-center gap-1.5 font-serif text-sm sm:text-base text-white">
            <span className="text-xs font-sans">|</span>
            <span className="font-semibold text-[10px] tracking-wider">CHSH</span>
            <span className="text-xs font-sans">|</span>
            <span className="mx-1.5 font-sans">≤</span>
            <span className="font-bold text-sm">2</span>
            <div className="h-4 w-px bg-white/25 mx-2" />
            <span className="italic text-xs font-sans">P(A, B) ≠ P<sub>local</sub>(A) P<sub>local</sub>(B)</span>
          </div>
        );
      case 27:
        return (
          <div className="flex items-center justify-center gap-3 font-serif text-base sm:text-lg text-white">
            <div className="flex items-baseline gap-0.5">
              <span className="italic font-semibold">E</span>
              <span className="mx-1.5 font-sans">=</span>
              <span className="italic">m</span>
              <span className="italic font-semibold">c</span>
              <sup className="text-xs">2</sup>
            </div>
            <div className="h-4 w-px bg-white/25 mx-2" />
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">L</span>
              <span className="text-[10px] align-sub">fusion</span>
              <span className="mx-1.5 font-sans">=</span>
              <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
                <span className="italic border-b border-white/50 pb-0.5 px-0.5 text-xs">λ_0</span>
                <span className="text-[10px] pt-0.5 leading-none">2π r</span>
              </div>
            </div>
          </div>
        );
      case 25:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-serif text-[10px] sm:text-xs text-white">
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">τ</span>
              <span className="text-[8px] align-sub">dec</span>
              <span className="mx-1 font-sans">≈</span>
              <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
                <span className="italic border-b border-white/50 pb-0.5 px-1 text-[10px]">h<sup>2</sup></span>
                <span className="text-[8px] pt-0.5 leading-none px-1">8π<sup>2</sup> q<sup>2</sup> Λ k<sub>B</sub> T</span>
              </div>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25 mx-1" />
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">τ</span>
              <span className="text-[8px] align-sub">dec</span>
              <span className="mx-1 font-sans">≈</span>
              <span>10</span>
              <sup className="text-[9px] font-sans font-bold">-20</sup>
              <span className="text-[9px] font-sans font-bold ml-1 uppercase">s</span>
            </div>
          </div>
        );
      case 26:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-serif text-[10px] sm:text-xs text-white">
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">f</span>
              <span className="mx-1 font-sans">=</span>
              <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
                <span className="border-b border-white/50 pb-0.5 px-1 text-[10px]">1</span>
                <span className="text-[8px] pt-0.5 leading-none font-sans px-1">2π √<span className="border-t border-white/40 italic leading-none ml-0.5 px-0.5">L C</span></span>
              </div>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25" />
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">S</span>
              <span className="mx-1 font-sans">=</span>
              <span className="italic">φ</span>
              <span className="text-[10px]">(f)</span>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25" />
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">f</span>
              <span className="text-[8px] align-sub">Schumann</span>
              <span className="mx-1 font-sans">=</span>
              <span className="font-semibold">7.83</span>
              <span className="text-[9px] font-sans font-bold ml-0.5 uppercase">Hz</span>
            </div>
          </div>
        );
      case 28:
        return (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 font-serif text-[10px] sm:text-xs text-white">
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">C</span>
              <sub className="text-[8px] align-sub">xy</sub>
              <span className="text-[10px]">(f)</span>
              <span className="mx-1 font-sans">=</span>
              <div className="inline-flex flex-col items-center justify-center text-center leading-none mx-1">
                <span className="italic border-b border-white/50 pb-0.5 px-1 text-[10px]">|G<sub>xy</sub>(f)|<sup>2</sup></span>
                <span className="text-[8px] pt-0.5 leading-none px-1">G<sub>xx</sub>(f) N<sub>yy</sub>(f)</span>
              </div>
            </div>
            <div className="hidden sm:block h-4 w-px bg-white/25 mx-1" />
            <div className="flex items-center gap-1">
              <span className="italic font-semibold">N</span>
              <sub className="text-[8px] align-sub">EEG</sub>
              <span className="mx-1 font-sans">&gt;</span>
              <span className="font-bold">200</span>
            </div>
          </div>
        );
      case 29:
        return (
          <div className="flex items-center justify-center gap-3 font-serif text-xs sm:text-sm text-white">
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">f</span>
              <span className="text-[8px] align-sub">binaural</span>
              <span className="mx-1 font-sans">=</span>
              <span className="text-xs font-sans">|</span>
              <span className="italic">f</span><span className="text-[8px] align-sub font-sans">1</span>
              <span className="mx-0.5">-</span>
              <span className="italic">f</span><span className="text-[8px] align-sub font-sans">2</span>
              <span className="text-xs font-sans">|</span>
            </div>
            <div className="h-4 w-px bg-white/25 mx-2" />
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">f</span>
              <span className="text-[8px] align-sub font-sans">carrier</span>
              <span className="mx-1 font-sans">=</span>
              <span className="font-bold">432</span>
              <span className="text-[9px] font-mono font-bold ml-0.5 uppercase">Hz</span>
            </div>
          </div>
        );
      case 30:
        return (
          <div className="flex items-center justify-center gap-3 font-serif text-xs sm:text-sm text-white">
            <div className="flex items-center gap-0.5">
              <span className="italic font-semibold">A</span>
              <span className="text-[8px] align-sub font-sans">sync</span>
              <span className="mx-1 font-sans">=</span>
              <span className="italic">φ</span>
              <span className="text-[10px]">(I<sub>c</sub>)</span>
            </div>
            <div className="h-4 w-px bg-white/25 mx-2" />
            <div className="flex items-center gap-0.5">
              <span className="font-semibold uppercase tracking-wider text-[10px] bg-white/10 px-1.5 py-0.5 rounded leading-none">CERN Zenodo</span>
              <span className="text-[9px] font-mono opacity-85 ml-1">DOI: 10.5281</span>
            </div>
          </div>
        );
      default:
        return <span className="font-mono text-sm tracking-wide select-all">{currentNotes.equation}</span>;
    }
  };

  // Helper to trigger the double-slit simulation wave collapse
  const triggerQuantumSimulation = (mode: "wave" | "particle") => {
    setIsMeasuring(true);
    setCollapseResult(null);
    setPoints([]);
    
    setTimeout(() => {
      setIsMeasuring(false);
      setMeasurementMode(mode);
      
      const newPoints: { x: number; y: number; id: number }[] = [];
      const graph: number[] = [];
      
      if (mode === "wave") {
        // Interference pattern distribution with high precision hertzian fringes
        for (let i = 0; i < 40; i++) {
          const val = Math.round((Math.sin(i * 0.4) + 1) * 50 * (1 - Math.abs(20 - i) / 25));
          graph.push(Math.max(2, val));
        }
        
        // Generate coordinates aligning with interference fringes
        for (let id = 0; id < 180; id++) {
          // Double slit interference bands
          const band = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2 zones
          const centerOffsetX = 160 + band * 42 + (Math.random() * 12 - 6);
          const y = 25 + Math.random() * 115;
          newPoints.push({ x: centerOffsetX, y, id });
        }
        setCollapseResult("FRANGE D'INTERFERENZA ONDULATORIA COERENTE RILEVATE SULLO SCHERMO");
      } else {
        // Particle model distribution (two distinct slits - Bohr's collapsed state)
        for (let i = 0; i < 40; i++) {
          const leftSlit = Math.exp(-Math.pow(i - 12, 2) / 8) * 100;
          const rightSlit = Math.exp(-Math.pow(i - 28, 2) / 8) * 100;
          graph.push(Math.round(leftSlit + rightSlit) + 3);
        }
        
        // Generate coordinates aligning with only two slits
        for (let id = 0; id < 185; id++) {
          const isLeft = Math.random() > 0.5;
          const centerOffsetX = isLeft ? 105 + (Math.random() * 14 - 7) : 215 + (Math.random() * 14 - 7);
          const y = 25 + Math.random() * 115;
          newPoints.push({ x: centerOffsetX, y, id });
        }
        setCollapseResult("COLLASSO AVVENUTO: RILEVAMENTO DETERMINISTICO A DUE FASCE");
      }
      setPoints(newPoints);
      setProbabilityGraph(graph);
    }, 1000);
  };

  // Hertzian Resonance Coherence Calculation
  useEffect(() => {
    // Coherence increases as brain frequency approaches Schumann resonance (7.83Hz)
    // and as heart frequency matches a harmonic multiplier or typical coherence peaks (~1.0 - 1.5 Hz, HRV)
    const brainDiff = Math.abs(brainFrequency - schumannFrequency);
    const heartDist = Math.abs(heartFrequency - 1.25); // Target ideal HRV coherence

    const score = Math.round(100 - (brainDiff * 6) - (heartDist * 20));
    const cappedScore = Math.max(5, Math.min(100, score));
    setCoherenceScore(cappedScore);

    // If matches Schumann closely, activate full synchronization state
    if (cappedScore >= 85) {
      setIsCoherenceMatched(true);
    } else {
      setIsCoherenceMatched(false);
    }
  }, [brainFrequency, heartFrequency, schumannFrequency]);

  // Run initial simulation on load
  useEffect(() => {
    triggerQuantumSimulation("wave");
  }, []);

  return (
    <div className="space-y-10" id="documentaries-archive-section">
      
      {/* 1. Cinematic Hero Banner */}
      <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden p-8 sm:p-12 text-[#0a2342] shadow-md">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(184,150,62,0.06),transparent_60%)] pointer-events-none" />
        <div className="absolute top-4 right-4 bg-[#0a2342] border border-[#0a2342] px-3.5 py-1 rounded-full text-[9px] font-mono tracking-widest text-[#FAFAF8] uppercase font-extrabold shadow-xs">
          CONSERVAZIONE VIDEO ORIGINALE FDL
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Film className="w-5 h-5 text-[#b8963e]" />
            <span className="text-[10px] font-mono text-[#b8963e] tracking-widest uppercase font-black">
              REGISTRO SCENEGGIATURE E VERIFICHE SPERIMENTALI
            </span>
          </div>
          
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#0a2342] tracking-wide uppercase leading-tight">
            Dietro le Quinte della Meccanica Quantistica
          </h2>
          
          <p className="text-[#0a2342]/85 text-xs sm:text-sm leading-relaxed mt-4 font-sans text-justify">
            Un'affascinante opera di divulgazione controcorrente basata sui testi e sui copioni storici depositati dal Dott. Luca Falace. 
            Esplora la sintonizzazione isocronica, svela la forzatura ideologica intrapresa a Copenaghen nel 1927 e attraversa il confine 
            scientifico reale tra l'infinitesimo microscopico delle molecole isolate ed il macroscopico spettro hertziano biologico della coscienza vivente.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setHasWatchedIntro(!hasWatchedIntro)}
              className="px-5 py-2.5 bg-[#0a2342] hover:bg-[#163a69] text-[#FAFAF8] border border-transparent rounded-xl text-[10.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Tv className="w-4 h-4 text-[#b8963e]" />
              <span>{hasWatchedIntro ? "Nascondi Manifesto" : "Leggi Manifesto Storico"}</span>
            </button>
            <a 
              href="https://youtube.com/playlist?list=PLOFb9C3MpC5jjWe1i6oDD-R8SjvXA4i0H&si=3Nl5Wnusk0kKsWau"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white border border-red-600 rounded-xl text-[10.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Play className="w-4 h-4 text-white fill-current" />
              <span>Guarda Playlist YouTube</span>
            </a>
            <a 
              href="https://youtube.com/@lucafalace.official?si=UGRz9AchrsyBKBvp"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#FAFAF8] hover:bg-slate-100 text-[#0a2342] border border-slate-300 rounded-xl text-[10.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <ExternalLink className="w-4 h-4 text-[#0a2342]" />
              <span>Canale Ufficiale</span>
            </a>
            <a 
              href="#quantum-sandbox"
              className="px-5 py-2.5 bg-transparent hover:bg-slate-100 text-[#0a2342] border border-slate-300 rounded-xl text-[10.5px] font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <Activity className="w-4 h-4 text-[#0a2342]" />
              <span>Sandbox Sperimentale</span>
            </a>
          </div>
        </div>
      </div>

      {/* 1b. Expandable Historical Manifesto */}
      {hasWatchedIntro && (
        <div className="bg-slate-50 border-l-4 border-l-[#0066CC] p-6 rounded-r-2xl text-black space-y-4 animate-fade-in font-sans">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-[#0066CC]" />
            <h4 className="font-serif font-bold text-xs uppercase tracking-wider text-black">
              MANIFESTO EDITORIALE DEL REGISTA • LA FISICA DEL PARADOSSO
            </h4>
          </div>
          <p className="text-xs leading-relaxed text-slate-800 text-justify">
            Questi copioni nascono per fare ordine. Non propongono interpretazioni mistiche slegate dai fatti fisici, 
            bensì ripristinano il rigore storiografico: dimostrando, grazie alle fonti originali (Physical Review, Bell, Aspect, Nobel 2022), 
            che la Luna esiste anche quando nessuno la osserva, e che l'osservazione non è un'azione magica creante materia dal nulla, 
            ma un'effettiva interazione di disturbo elastico in cui il Campo Unificato già esistente si modula, in accordo isocronico 
            con le geometrie neurali e le onde biologiche misurabili. Sintonizzare il cervello significa mettersi in fase con un pianeta continuo.
          </p>
          <div className="text-[9px] font-mono text-[#0066CC] uppercase tracking-wider text-right font-bold">
            — Dott. Luca Falace, Ricercatore &amp; Autore
          </div>
        </div>
      )}

      {/* 2. Main Exploration Section - Selector & Interactive Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Directory/Selector (11 Episodes Mapping) - Spans 4 columns */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-white p-4.5 border border-[#0066CC] rounded-2xl">
            <span className="text-[9.5px] font-mono text-[#0066CC] uppercase tracking-widest font-black block mb-3.5">
              COPIONI &amp; SCENEGGIATURE DISPONIBILI ({episodesData.length} EPISODI)
            </span>
            
            <div className="space-y-1.5 max-h-[500px] overflow-y-auto pr-1 scrollbar-none">
              {episodesData.map((ep, idx) => {
                const isActive = activeEpisode === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveEpisode(idx);
                      setShowFullTranscript(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start gap-3 cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-slate-50 to-white border-[#0066CC] text-black shadow-sm ring-1 ring-[#0066CC]/20' 
                        : 'border-slate-100 hover:border-slate-200 bg-white text-slate-800'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono font-black shrink-0 ${
                      isActive ? 'bg-[#0066CC] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {ep.num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-[11px] uppercase font-bold tracking-wide truncate ${isActive ? 'text-[#0066CC]' : 'text-slate-900'}`}>
                        {ep.title.replace(`EP. ${ep.num} — `, '')}
                      </h4>
                      <p className="text-[9.5px] text-slate-500 truncate mt-0.5 font-normal">
                        {ep.subtitle}
                      </p>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 transition-transform ${isActive ? 'text-[#0066CC] translate-x-1' : 'text-slate-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* SBN & DOI Certifications Badge */}
          <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 text-black space-y-2.5">
            <span className="text-[8.5px] font-mono text-[#0066CC] uppercase tracking-wider font-extrabold block">
              VALIDAZIONE MULTIDISCIPLINARE
            </span>
            <div className="text-[10px] space-y-1.5 text-slate-700">
              <div className="flex justify-between items-center">
                <span>CONGRESSO SOLVAY FLUX</span>
                <span className="font-mono text-emerald-600 font-bold">CERTIFICATO</span>
              </div>
              <div className="flex justify-between items-center">
                <span>RELAZIONE COGNITIVA CIA</span>
                <span className="font-mono text-emerald-600 font-bold">DECLASS. SBN</span>
              </div>
              <div className="flex justify-between items-center">
                <span>TRILOGIA SCIENTIFICA DOI</span>
                <span className="font-mono text-[#0066CC] font-bold">10.5281/ZENODO</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Cinema & Script Reader - Spans 8 columns */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#0066CC] rounded-2xl overflow-hidden text-black shadow-none">
            
            {/* Play Monitor Box Header */}
            <div className="bg-[#0066CC] px-5 py-4 border-b-2 border-black flex items-center justify-between">
              <div className="flex items-center gap-2.5 text-white">
                <Radio className="w-4 h-4 text-white animate-pulse" />
                <span className="text-[10.5px] font-mono uppercase tracking-widest font-black">
                  MONITOR SCIENTIFICO EPISODIO #{currentNotes.num}
                </span>
              </div>
              <div className="text-[9.5px] font-mono text-white bg-slate-950/20 px-2.5 py-0.5 rounded border border-white/20 font-bold">
                TESTO COMPLETO COPIATO
              </div>
            </div>

            {/* Visualizer Video/Cinema Frame Mockup */}
            <div className="bg-slate-950 p-6 sm:p-10 text-center relative overflow-hidden min-h-[240px] flex flex-col justify-between text-white border-b border-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,204,0.18),transparent_80%)]" />
              
              <div className="flex items-center justify-between text-[8.5px] font-mono text-white/50 tracking-wider uppercase z-10">
                <span>RILEVAZIONE SEGNALE CORRENTE IN STREAM</span>
                <span className="text-white font-black animate-pulse">● LIVE 432 HZ SINTONIA</span>
              </div>

              <div className="my-4 space-y-1 z-10">
                <span className="text-[9.5px] font-mono text-white block font-black uppercase tracking-widest leading-none">
                  {currentNotes.subtitle}
                </span>
                <h3 className="font-serif font-black text-base sm:text-xl text-white uppercase tracking-wide leading-snug max-w-xl mx-auto">
                  {currentNotes.title}
                </h3>
                <p className="text-[10.5px] text-white/70 font-sans max-w-lg mx-auto leading-relaxed">
                  {currentNotes.shortDesc}
                </p>
              </div>

              {/* Real Mathematical Formula Overlay associated with the episode */}
              <div className="my-5 p-3.5 bg-white/5 border border-white/10 rounded-xl max-w-md mx-auto font-mono text-xs text-center backdrop-blur-xs z-10">
                <span className="text-[8px] text-white block mb-1.5 uppercase tracking-wider font-extrabold font-sans">Formula Fisica Associata al Copione (In Simboli):</span>
                <div className="py-1">
                  {renderMathematicalFormula(currentNotes.num)}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 z-10">
                <a
                  href={currentNotes.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-750 text-white px-5 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 text-white fill-current" />
                  <span>Riproduci Playlist su YouTube</span>
                </a>
                <a
                  href="https://youtube.com/@lucafalace.official?si=UGRz9AchrsyBKBvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white px-5 py-2.5 rounded-xl text-[10px] font-mono font-bold uppercase tracking-widest transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Canale YouTube Ufficiale</span>
                </a>
              </div>
            </div>

            {/* In-depth Editorial Content & Expandable Script */}
            <div className="p-6 sm:p-8 space-y-6 bg-white">
              
              <div>
                <h4 className="text-[11px] font-mono text-[#0066CC] uppercase tracking-widest font-black mb-2.5 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#0066CC]" />
                  Descrizione dell'Opera
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed text-justify font-sans">
                  {currentNotes.description}
                </p>
              </div>

              {/* Sources Bibliography directly extracted from PDF copioni */}
              {currentNotes.sources && currentNotes.sources.length > 0 && (
                <div className="bg-slate-50 p-4.5 rounded-xl border border-slate-200/60 text-xs">
                  <span className="text-[9.5px] font-mono text-[#0066CC] uppercase tracking-wider font-extrabold block mb-2 leading-none">
                    FONTI SCIENTIFICHE E COPIE VERBATIM DOCUMENTATE:
                  </span>
                  <ul className="space-y-1 list-disc list-inside text-slate-700 font-sans text-[11px]">
                    {currentNotes.sources.map((src, sIdx) => (
                      <li key={sIdx} className="leading-relaxed">
                        {src}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Interactive Expandable Script Script (Copione Completo) */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                {/* PDF & Printing Action Panel (Clean Minimalism theme container) */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-[#0a2342] uppercase tracking-widest font-black block leading-none mb-1.5">
                      ★ Strumenti Copioni & Sceneggiature
                    </span>
                    <span className="text-[10.5px] text-slate-700 block font-sans">
                      Scarica o stampa le sceneggiature storiografiche della Fondazione Falace direttamente in formato PDF.
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5 w-full sm:w-auto shrink-0 justify-end">
                    <button
                      onClick={handlePrintCurrentEpisode}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-lg flex items-center justify-center gap-1.5 text-[10.5px] font-mono font-bold transition-all cursor-pointer uppercase shadow-xs active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#0066CC]" />
                      <span>Copione Ep. {currentNotes.num}</span>
                    </button>
                    <button
                      onClick={handlePrintEpisodes7To10}
                      className="flex-1 sm:flex-initial px-4 py-2 bg-[#0a2342] hover:bg-[#163a69] text-white rounded-lg flex items-center justify-center gap-1.5 text-[10.5px] font-mono font-bold transition-all cursor-pointer uppercase shadow-xs active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>PDF Unico Ep. 7-10</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowFullTranscript(!showFullTranscript)}
                  className="w-full text-left py-2.5 bg-slate-50 hover:bg-slate-100 px-4 rounded-xl flex items-center justify-between text-xs font-mono font-bold text-slate-800 border border-slate-200 transition-colors uppercase cursor-pointer"
                >
                  <span>{showFullTranscript ? "Nascondi Copione / Sceneggiatura Completa" : "Visualizza Copione Integrale dell'Episodio"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFullTranscript ? 'rotate-180' : ''}`} />
                </button>

                {showFullTranscript && (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-900 space-y-4 max-h-[350px] overflow-y-auto leading-relaxed select-text shadow-xs">
                    <div className="text-[8.5px] text-[#0066CC] uppercase tracking-wider border-b border-slate-200 pb-2 flex justify-between font-extrabold mb-1">
                      <span>BOZZA EPISODIO N.{currentNotes.num}</span>
                      <span>DIRETTA SOCIAL IN ALBERTA / CERN</span>
                    </div>
                    <p className="whitespace-pre-wrap leading-relaxed text-justify font-sans text-slate-800">
                      {currentNotes.extendedScript}
                    </p>
                    <div className="border-t border-slate-200 pt-2 text-[8.5px] text-slate-500 text-right leading-none uppercase">
                      © Luca Falace Copyright 2005–2026 · SIAE · OLAF · Zenodo CERN
                    </div>
                  </div>
                )}
              </div>

              {/* Tag Badges */}
              <div className="border-t border-slate-100 pt-5">
                <span className="text-[9.5px] font-mono text-slate-500 uppercase tracking-wider block mb-2.5 font-medium leading-none">
                  NODI DI SINTONIA TEORICA ASSOCIATI:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentNotes.keyConcepts.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-slate-700 text-[9.5px] font-mono font-bold uppercase rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="px-2.5 py-1 bg-blue-100 border border-blue-200 text-[#00468C] text-[9.5px] font-mono font-bold uppercase rounded-lg">
                    S = φ(f)
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* 3. Laboratory / Interactive Simulation Sandbox Box */}
      <div id="quantum-sandbox" className="bg-white border border-[#0066CC] rounded-3xl p-6 sm:p-10 space-y-6">
        
        {/* Sandbox Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setSandboxTab('double-slit')}
            className={`py-3 px-6 text-xs font-mono font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              sandboxTab === 'double-slit' 
                ? 'border-[#0066CC] text-[#0066CC]' 
                : 'border-transparent text-slate-500 hover:text-[#0066CC]'
            }`}
          >
            Fenditure Quantistiche (Episodi 15-20)
          </button>
          <button
            onClick={() => setSandboxTab('hertzian-coherence')}
            className={`py-3 px-6 text-xs font-mono font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              sandboxTab === 'hertzian-coherence' 
                ? 'border-[#0066CC] text-[#0066CC]' 
                : 'border-transparent text-slate-500 hover:text-[#0066CC]'
            }`}
          >
            Sincronizzatore Coerenza Hertziana (Episodio 26)
          </button>
        </div>

        {sandboxTab === 'double-slit' ? (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-50 border border-slate-200 text-[#0066CC] rounded-2xl">
                  <Atom className="w-5 h-5 text-[#0066CC] animate-spin" style={{ animationDuration: '6s' }} />
                </div>
                <div>
                  <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
                    Laboratorio Sperimentale: Il Collasso Quantistico
                  </h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold leading-none mt-0.5">
                    Modulatore Interattivo delle due Fenditure (Wave-Particle Duality)
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-2.5">
                <button
                  onClick={() => triggerQuantumSimulation("wave")}
                  disabled={isMeasuring}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                    measurementMode === "wave" 
                      ? 'bg-[#002244] border-black text-white' 
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  Ψ Ondulatoria non osservata
                </button>
                <button
                  onClick={() => triggerQuantumSimulation("particle")}
                  disabled={isMeasuring}
                  className={`px-4 py-2 rounded-xl text-[10px] font-mono font-bold uppercase tracking-wider border cursor-pointer transition-colors ${
                    measurementMode === "particle" 
                      ? 'bg-[#002244] border-black text-white' 
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  Misurazione (Collasso Deterministico)
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-sans text-justify">
              Come descritto sperimentalmente nei copioni degli <b>Episodi 15, 18 e 20</b>: quando non interviene un misuratore, 
              le particelle mostrano un comportamento continuo di interferenza isocronica (schema d'onda). Se azioni l'OSSERVAZIONE (misura attiva), 
              lo stato di sovrapposizione collassa all'istante, producendo due fasce nette determinate, 
              ad indicare la natura corpuscolare emersa. Nel Campo Unificato di Luca Falace, non c'è mistero mistico: 
              lo strumento modifica semplicemente in modo locale l'andamento ondoso preesistente.
            </p>

            {/* Simulation Canvas Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
              
              {/* Virtual Stage (Left) */}
              <div className="lg:col-span-8 bg-slate-950 border border-[#0066CC]/40 rounded-xl overflow-hidden p-4 relative min-h-[200px]">
                <div className="absolute top-2.5 left-2.5 text-[8px] font-mono text-white/50 tracking-wider uppercase">
                  Schermo di Rete Quantistica ({measurementMode === "wave" ? "Principio di Sovrapposizione" : "Stato Collapsato Determinista"})
                </div>
                
                {isMeasuring ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 text-white font-mono text-xs z-20">
                    <RotateCcw className="w-5 h-5 animate-spin mb-2" />
                    <span className="uppercase tracking-widest font-bold">Misurazione quantica e collasso in corso...</span>
                  </div>
                ) : null}

                {/* Laser plate */}
                <div className="absolute left-[30px] top-[30px] bottom-[30px] w-0.5 bg-white/10 flex flex-col justify-around items-center" />

                {/* Canvas particles */}
                <div className="relative w-full h-[150px] mt-6">
                  {points.map((pt) => (
                    <div
                      key={pt.id}
                      style={{ left: `${pt.x}px`, top: `${pt.y}px` }}
                      className={`absolute w-1 h-1 rounded-full transition-all duration-300 ${
                        measurementMode === "wave" 
                          ? 'bg-blue-500 animate-pulse' 
                          : 'bg-emerald-400'
                      }`}
                    />
                  ))}

                  {/* Laser Emitter */}
                  <div className="absolute left-1.5 top-[75px] w-4 h-4 bg-red-600 rounded-full border border-white animate-ping" />
                  <div className="absolute left-3.5 top-[82px] w-[50px] h-0.5 bg-red-500/60 blur-xs" />
                  
                  {/* Two slits barrier */}
                  <div className="absolute left-[65px] top-0 bottom-0 w-2 bg-slate-800 flex flex-col justify-between">
                    <div className="w-full h-[40px] bg-slate-700" />
                    <div className="w-full h-[30px] bg-transparent" />
                    <div className="w-full h-[25px] bg-slate-700" />
                    <div className="w-full h-[30px] bg-transparent" />
                    <div className="w-full h-[40px] bg-slate-700" />
                  </div>
                </div>

                {collapseResult && (
                  <div className="absolute bottom-2 left-2.5 right-2.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded text-[8px] font-mono text-center tracking-widest leading-none">
                    <span className="text-white/60">RILEVATORE INTERACTION:</span>{" "}
                    <span className={measurementMode === "wave" ? "text-white font-bold" : "text-emerald-400 font-bold"}>
                      {collapseResult}
                    </span>
                  </div>
                )}
              </div>

              {/* Firing histogram (Right) */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-5 rounded-xl space-y-4">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold leading-none">
                  ISTOGRAMMA INTENSITÀ IMPULSI
                </span>

                <div className="h-[100px] flex items-end gap-0.5 pt-4 bg-slate-50 border border-slate-200 px-2 rounded-lg justify-around">
                  {probabilityGraph.map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className={`w-full rounded-t-xs transition-all duration-500 ${
                        measurementMode === "wave" ? 'bg-[#0066CC]' : 'bg-emerald-500'
                      }`}
                    />
                  ))}
                </div>

                <div className="space-y-2 text-[10px] font-mono text-[#0066CC]">
                  <div className="flex justify-between pb-1 ">
                    <span className="text-slate-600 font-bold">RELAZIONE STATO:</span>
                    <span className="font-extrabold uppercase">{measurementMode === "wave" ? "Ψ Onda Libera" : "Deterministica"}</span>
                  </div>
                  <div className="text-[9.5px] text-justify text-slate-500 leading-normal font-sans">
                    L'istogramma evidenzia la ridistribuzione energetica isocronica spaziale. Non vi è azzeramento, ma un continuo rimodellamento locale.
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          /* Hertzian Coherence Simulator based on Episode 26 transcripts */
          <div className="space-y-6 animate-fade-in font-sans">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <Radio className="w-5 h-5 text-[#0066CC] animate-bounce" />
              <div>
                <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
                  Sincronizzazione Isocronica del Campo Continuo
                </h3>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                  Sintonizzatore hertziano dell'esperienza cosciente (Legge S = φ(f))
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed text-justify">
              Come illustrato in <b>Episodio 26</b>, la sincronizzazione non richiede computer quantistici a temperature criogeniche: e&apos; sintonizzazione di oscillatori a temperatura ambiente. 
              Modula la frequenza del tuo cervello e del battito cardiaco per avvicinarti alla risonanza geomagnetica planetaria 
              di <b>7,83 Hertz</b> (Risonanza di Schumann). Al raggiungimento di una coerenza &gt; 85%, vedrai che le onde si sintonizzano in fase elettromagnetica, 
              favorendo la probabilità statistica del Sincronismo Creativo.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
              
              {/* Sliders Control Panel (Spans 5) */}
              <div className="lg:col-span-5 space-y-5 bg-white p-5 rounded-xl border border-slate-200">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold leading-none">
                  PANNELLO DI SINTONIZZAZIONE BIOLOGICA
                </span>

                {/* Brain wave slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono leading-none">
                    <span className="font-bold">Onde Cerebrali:</span>
                    <span className="text-[#0066CC] font-black">{brainFrequency.toFixed(2)} Hz</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="40.0" 
                    step="0.05"
                    value={brainFrequency}
                    onChange={(e) => setBrainFrequency(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-100 accent-[#0066CC] rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>Delta/Theta (0.5-7Hz)</span>
                    <span className="text-[#0066CC] font-bold">Target Alpha (7.83Hz)</span>
                    <span>Beta/Gamma (15-40Hz)</span>
                  </div>
                </div>

                {/* Heart wave slider */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[11px] font-mono leading-none">
                    <span className="font-bold">Frequenza Cardiaca (HRV):</span>
                    <span className="text-emerald-500 font-black">{heartFrequency.toFixed(2)} Hz</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.4" 
                    max="3.0" 
                    step="0.05"
                    value={heartFrequency}
                    onChange={(e) => setHeartFrequency(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-100 accent-emerald-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>Espansione profonda</span>
                    <span className="text-emerald-500 font-bold">Target Coerenza (1.25Hz)</span>
                    <span>Battito alto</span>
                  </div>
                </div>

                {/* Target Schumann fixed wave */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-150 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-600">RISONANZA SCHUMANN:</span>
                  <span className="text-slate-900 font-extrabold flex items-center gap-1">
                    <Atom className="w-3.5 h-3.5 text-[#0066CC] animate-spin" style={{ animationDuration: '4s' }} />
                    7.83 Hz
                  </span>
                </div>
              </div>

              {/* Graphic Wave Phase Match rendering space (Spans 7) */}
              <div className="lg:col-span-7 bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4 relative min-h-[220px] flex flex-col justify-between text-white">
                <div className="text-[8px] font-mono text-white/50 tracking-wider uppercase border-b border-slate-900 pb-2">
                  SCHEMA DI INTERSEZIONE ED ACCOPPIAMENTO DI FASE
                </div>

                {/* Wave diagram */}
                <div className="h-[90px] w-full relative flex items-center overflow-hidden border-b border-white/5">
                  <svg className="w-full h-full" viewBox="0 0 400 90">
                    <path
                      d={Array.from({ length: 100 }, (_, i) => {
                        const x = (i / 100) * 400;
                        // Draw brain wave
                        const y = 45 + Math.sin((i / 100) * Math.PI * 2 * brainFrequency) * 16;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#0066CC"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    <path
                      d={Array.from({ length: 100 }, (_, i) => {
                        const x = (i / 100) * 400;
                        // Draw heart wave
                        const y = 45 + Math.sin((i / 100) * Math.PI * 2 * heartFrequency * 6) * 12;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    {/* Planet fixed Schumann wave reference line */}
                    <path
                      d={Array.from({ length: 100 }, (_, i) => {
                        const x = (i / 100) * 400;
                        const y = 45 + Math.sin((i / 100) * Math.PI * 2 * 7.83) * 22;
                        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                      }).join(' ')}
                      fill="none"
                      stroke="#EAB308"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity="0.9"
                    />
                  </svg>

                  <div className="absolute top-1.5 right-1.5 flex flex-col items-end text-[7.5px] font-mono space-y-0.5 text-white/50">
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-[#0066CC] rounded-full" /> Cervello</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Cuore</span>
                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> Risonanza Schumann</span>
                  </div>
                </div>

                {/* Score & validation */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">PUNTEGGIO DI COERENZA S:</span>
                    <span className={`font-black text-sm ${isCoherent ? 'text-white' : 'text-slate-300'}`}>
                      {coherenceScore}%
                    </span>
                  </div>
                  <div>
                    {isCoherent ? (
                      <span className="px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-[9px] font-extrabold flex items-center gap-1 uppercase tracking-widest animate-pulse">
                        <CheckCircle2 className="w-3 h-3 text-white" /> ACCOPPIAMENTO ISOCRONICO ATTIVO
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/60 rounded-full text-[9px] uppercase tracking-wider">
                        Sotto-livello Sincronicità N.1
                      </span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

    </div>
  );
}

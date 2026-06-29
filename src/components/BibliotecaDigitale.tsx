import React, { useState } from 'react';
import JSZip from 'jszip';
import { jsPDF } from 'jspdf';
import { 
  BOOKS_CATALOG, 
  Book, 
  FOUNDATION_METADATA, 
  ARTWORKS_CATALOG, 
  INVENTIONS_CATALOG, 
  TV_DOC_SHOWS, 
  DOCUMENTARY_SERIES_EPISODES, 
  LUCIO_FALACE_PATENTS, 
  PAOLO_FALACE_WORKS, 
  SYNCHRONICITY_THEORY 
} from '../data/archiveData.js';
import { BIOGRAFIA_PAGES } from '../data/biografiaPdfData.js';
import { ARCHIVIO_STORICO_PAGES } from '../data/archivioStoricoPdf.js';
import { 
  BookOpen, Search, ShieldAlert, ShoppingBag, HelpCircle, 
  ZoomIn, ZoomOut, ChevronLeft, ChevronRight, X, Sparkles, 
  BookMarked, HelpCircle as HelpIcon, Lock, Landmark, Award,
  Download, RefreshCw, FileText, Check, Settings, Sparkle, Layers
} from 'lucide-react';

interface BookPage {
  pageNumber: number;
  chapterTitle?: string;
  content: string;
}

export default function BibliotecaDigitale() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedType] = useState<string>('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  const [readerPage, setReaderPage] = useState(1);
  const [readerTheme, setReaderTheme] = useState<'sepia' | 'white' | 'dark'>('sepia');
  const [readerZoom, setReaderPageZoom] = useState(100);

  // User schema titles
  const titleOptions = [
    { key: 'opzione1', label: 'Sezione D • Biblioteca Digitale Fondazione (SBN) - Sezione pubblicazioni volumi Dott. Luca Falace', desc: 'Nome accademico, unisce il codice ministeriale all’eredità culturale' },
    { key: 'opzione2', label: 'Biblioteca d’Ingegno & Alchimia dell’Anima', desc: 'Rievoca il dualismo tra creatività ermetica e calcolo scientifico' },
    { key: 'opzione3', label: 'Archivio Biblioteca • Le Monografie di Luca Falace', desc: 'Taglio documentale, perfetto per un portale di catalogazione nazionale' },
    { key: 'opzione4', label: 'Biblioteca d’Autore della Fondazione Falace', desc: 'Istituzionale ed elegante, richiama l’anteriorità delle opere' }
  ];
  
  const [activeTitleKey, setActiveTitleKey] = useState('opzione1');
  const selectedTitleObj = titleOptions.find(opt => opt.key === activeTitleKey) || titleOptions[0];

  // Specific content pages for L'Opera Celeste based on OCR screenshots
  const operaCelestePages: BookPage[] = [
    {
      pageNumber: 1,
      content: `[COPERTINA DELL'OPERA CELESTE]
      
LUCA FALACE

L'OPERA CELESTE

ROMANZO ALCHEMICO FILOSOFICO

(ORO)
EDIZIONI`
    },
    {
      pageNumber: 2,
      content: `Luca Falace L’Opera Celeste 
1

Proprietà letteraria e diritti d'autore riservati negli archivi istituzionali Fondazione Falace.`
    },
    {
      pageNumber: 3,
      content: `Luca Falace L’Opera Celeste 
2

«L’unico Verso per l’Universo è Verso l’Unione perché l’Universo è in noi»`
    },
    {
      pageNumber: 4,
      chapterTitle: "FRONTESPIZIO",
      content: `Luca Falace 
L’OPERA CELESTE 

ROMANZO 
Alchemico Filosofico 

(OB ENTIUM UNIO)
ORO 
EDIZIONI`
    },
    {
      pageNumber: 5,
      chapterTitle: "SCHEDA EDITORIALE DI PRIMA EDIZIONE",
      content: `L’OPERA CELESTE 
Romanzo Alchemico Filosofico 

Autore: Luca Falace 
Sito internet: www.loperaceleste.com 

Editore: O.R.O. Edizioni 
L’Opera Celeste 
Centro Culturale Arte & Scienza 
Il Mio Libro 
Gruppo Editoriale L’Espresso 

Prima edizione: Luglio 2005 
Proprietà Letteraria ed Editoriale riservata all’autore dell’opera 

L’Opera Celeste ISBN: 88-901926-0-7
Seconda Ristampa: 2010 

L’Autore-Editore concede al Gruppo Editoriale L’Espresso il diritto di introdurre e pubblicare su sito Internet www.ilmiolibro.it la presente opera, in versione integrale, garantendo allo stesso tempo la proprietà intellettuale all’autore. 

L’Autore titolare dei diritti Editoriali può essere contattato, da parte di un editore, per una nuova pubblicazione e ristampa della presente opera.`
    },
    {
      pageNumber: 6,
      chapterTitle: "NOTIZIE SUL REGISTRO",
      content: `L’OPERA CELESTE 
Prima edizione Luglio 2005 © 
Proprietà Letteraria ed Editoriale riservata all’autore dell'opera 
ISBN 88-901926-0-7 

2010 © Seconda Ristampa 
Luca Falace, Presidente e Fondatore del Centro Culturale L’Opera Celeste 
Autore-Editore di questo volume, il Romanzo L’Opera Celeste, in collaborazione con il Gruppo Editoriale L’Espresso

Testo, schemi, disegni e opere d’arte di Luca Falace 
Depositati presso il Ministero dei Beni Culturali, l’Istituto Nazionale della Grafica, la SIAE, l’Olaf, e la Dds Discoteca di Stato 

PROPRIETÀ LETTERARIA RISERVATA`
    },
    {
      pageNumber: 7,
      chapterTitle: "PREFAZIONE - PARTE I",
      content: `PREFAZIONE

L’Opera Celeste è un racconto che affascina il lettore attraverso la sua neutralità ideologica. Dietro le sembianze di questa narrazione fantasiosa, si cela una storia realmente avvenuta. Questa storia, per quanto possa sembrare inverosimile, è stata tratta da eventi reali. Fatti e personaggi contenuti in questa narrazione sono il frutto dell’elaborazione, di esperienze vissute dall’autore.

La realtà a volte supera l’immaginazione, risultando inverosimile e fantastica. La fantasia quando è accompagnata dalla cultura rende la realtà ancora più interessante. Il messaggio che l’Opera Celeste celebra, è prima di tutto un messaggio d’Amore Universale. Un messaggio che l’Essere Umano, nel nuovo millennio, è finalmente pronto ad accogliere.

L’Opera Celeste è un’opera letteraria, un’opera figurativa, un’opera scultorea, un’opera musicale, un’invenzione, un film, una rivelazione. L’Opera Celeste è l’espressione del bene e dell’intelligenza dell’uomo evoluto. Essa si manifesta concretamente attraverso l’arte e la scienza.`
    },
    {
      pageNumber: 8,
      chapterTitle: "PREFAZIONE - PARTE II",
      content: `L’Uomo Celeste è colui che riesce a unire sapientemente gli opposti: la creatività con la ragione, l’amore con l’intelligenza, il cuore con l’intelletto.

Il mito ed il simbolo, lo spazio ed il tempo, l’essere e l’avere, l’arte e la scienza nel Romanzo, “L’Opera Celeste” sono la chiave di lettura per una visione più profonda dei contenuti. Il mito in questo caso si fonde con il simbolo, così come l’essere con l’avere, lo spazio con il tempo e l’arte con la scienza, in altre parole il tema di fondo è rappresentato dall’unione degli opposti. Questa complementarietà è il segno che rimanda ad un significato ultimo che l’essere umano, nel nuovo millennio, deve ancora riconoscere.

I due personaggi principali del racconto rappresentano i fondamentali archetipi della natura umana. Le due menti complementari. L’artista, filosofo, storico dell’arte, pare essere una fusione tra Mago Merlino e Siddharta. Il giovane razionale apprendista antropologo invece, come in molti miti, rievoca l’archetipo del personaggio umile...`
    },
    {
      pageNumber: 9,
      chapterTitle: "PREFAZIONE - PARTE III",
      content: `Sul modello del mito arturiano, qui il Graal rappresenta esplicitamente, secondo un’interpretazione personale, il suo vero significato archetipo: l’anima gemella.

Il giovane artista spagnolo, il filosofo Lucas, prima di arrivare all’acquisizione della conoscenza finisce per distaccarsi dal resto del gruppo e vive una serie di esperienze di carattere mistico-introspettivo. Il giovane antropologo invece, sotto la guida di Lucas, sapiente conoscitore delle arti, inizia l’addestramento per trovare l’anima gemella. Lucas riesce, attraverso la testimonianza delle sue rivelazioni oniriche e attraverso la simbologia alchemica dei personaggi raffigurati nel suo dipinto, a far cambiare la visione delle cose all’antropologo francese Laface.

Questi non può che accettare l’evidenza delle veggenze del suo amico e comprovare i significati archetipi, connessi alle maggiori filosofie, contenuti all’interno della Grande Opera pittorica creata da Lucas.

I sogni rivelatori dell’artista sono continui e veritieri, così come i significati pittorici dell’Opera Celeste di Lucas. Egli rivela di possedere la capacità di vedere frammenti di un futuro remoto. Questo avvenire, ad ogni modo, non è del tutto prevedibile. Egli insegna che bisogna seguire il ritmo e l’energia della natura, senza forzare gli eventi e senza praticare alcun tipo di divinazione artificiale. I suoi messaggi medianici, onirici ed artistici, sono spontanei e naturali. Pacifici consigli Celesti rivolti all’intera umanità.

Dall’unione delle due coppe nasce la Sfera, la quale simbolicamente, secondo Platone, rappresenta la Conoscenza Celeste. Questa è stata da sempre, a mio parere, la ricerca del misterioso Graal. Questa è la rivelazione dei protagonisti.`
    },
    {
      pageNumber: 10,
      chapterTitle: "PRESENTAZIONE - PARTE I",
      content: `PRESENTAZIONE

Questo è il racconto di una storia realmente avvenuta. Anni fa stavo facendo una ricerca per la mia tesi in storia dell’arte. I miei interessi alternativi erano incentrati sul significato originario dell’opera d’arte. Non avevo in mente nulla di preciso, fin quando un giorno vidi un dipinto straordinario: l’Opera di un giovane contemporaneo. Il dipinto intitolato “Verso l’Unione” evoca attraverso le sue arcane immagini, archetipi e simboli antichi.

Capii che il mio intento era quello di riportare alla luce il significato originario dell’arte, vale a dire quello simbolico e antropologico. Dopo essermi laureato in Storia dell’arte con una tesi sul significato antropologico dell’arte legata al culto divinatorio, potevo dedicarmi alla ricerca metaforica e mitica dell’Opera di Lucas.

In quest’Opera vi sono raffigurati i concetti fondamentali mitico-simbolici, che confermano il legame artistico con quello mitico-divinatorio. Decisi di collaborare con lui nella ricerca e nell’interpretazione dei significati della sua Opera Celeste.`
    },
    {
      pageNumber: 11,
      chapterTitle: "PRESENTAZIONE - PARTE II",
      content: `Questo giovane filosofo, nella sua prima fase evolutiva spirituale ha giocato con l’arte attraverso le varie espressioni e forme. Lucas oltre ad avere tutte le caratteristiche di un’artista geniale, è prima di tutto un filosofo premonitore, un ricercatore della conoscenza, un messaggero, un rivelatore.

Si è servito dell’arte per manifestare i suoi messaggi. Il significato dell’immagine da sempre è compreso intuitivamente da tutti. L’analisi del contenuto, invece, richiede un procedimento intellettivo più elaborato.

In particolare il significato delle sue opere non può essere analizzato con la tradizionale metodologia della critica d’arte, che esamina principalmente lo studio del fattore storico ed estetico di un'opera. Non può essere analizzata nemmeno con la recente e troppo razionale analisi psicologica.

Nella sua Opera, Lucas è riuscito a rievocare istintivamente miti e simboli atavici. L’interpretazione del dipinto può essere messa in chiaro, solo con una ricerca antropologica e filosofica.`
    },
    {
      pageNumber: 12,
      chapterTitle: "PRESENTAZIONE - PARTE III",
      content: `Quando incominciai a studiare il significato dell'Opera, avevo già gli strumenti per interpretare le rivelazioni contenute all’interno di essa. Etnologia, Antropologia e Storia delle tradizioni popolari furono gli esami universitari che mi diedero le basi per la mia analisi artistica ed etnografica.

Gli studi vertevano sulla ricerca di una simbologia universale. Questa è comune ancora oggi, in molte tradizioni popolari. Con il trascorrere del tempo non avrei mai pensato di apprendere, attraverso la conoscenza di Lucas, delle rivelazioni che avrebbero cambiato il mio modo di percepire la realtà.

Per entrare all'interno dell'Opera ho dovuto capire e quindi descrivere, il percorso evolutivo dell’artefice. Lucas ha usato l’arte inizialmente come una forma di meditazione per trovare un equilibrio interiore. In seguito si è distaccato da essa, poiché si sono manifestati dei segni e dei simboli misteriosi. Attraverso la pittura-scrittura, si sono manifestati dei caratteri comuni a molte civiltà arcaiche, in particolare l’antica civiltà orientale indù.`
    },
    {
      pageNumber: 13,
      chapterTitle: "PRESENTAZIONE - PARTE IV",
      content: `Il dipinto Verso l’Unione invece, simboleggia la fase dell’inizio della consapevolezza che scaturisce nella coscienza di Lucas. La sua mente unita alla sua anima, è in grado nel tempo, di prevedere grandi rivelazioni. These si manifestano attraverso una serie di esperienze filosofiche, artistiche e sentimentali.

Lucas intraprende il cammino verso la scoperta di un nuovo mondo, che si cela dietro la vita di ogni giorno. Semplici parole, frasi o gesti, simboleggiano antichi rituali ancestrali. Archetipi che ritornano in tutte le epoche. Questi sono i messaggi Celesti, che si manifestano tramite le persone comuni.

L’esistenza, l’unione, l’amore, l’armonia, la rivelazione e la conoscenza sono i temi fondamentali dell’Opera di Lucas. Tali nobili valori sono le chiavi di accesso verso un mondo pieno di luce, che rappresenta il mistero della creazione.

Quelli che intraprendono la strada della conoscenza, dell’amore e della semplicità, non vi capitano per caso, essi si trovano in uno stato evolutivo, diciamo “fortunato”.`
    },
    {
      pageNumber: 14,
      chapterTitle: "PARTE I - LA DIMENSIONE INTERNA",
      content: `PARTE I 
LA DIMENSIONE INTERNA 
TERRA – EMANAZIONE – CORPO 

CAPITOLO I 
L’ESSERE 

PRIMA RIVELAZIONE 
LA CONSAPEVOLEZZA 

«Chi s’innamora del mistero della creazione, percorre il livello più alto della conoscenza umana. La ricerca di chi aspira a tanto, produce un lavoro senza rimpianto. L’essere evoluto, con devozione ed amore, cerca di saggiare il motivo della sua esistenza e quella dell’intero Universo.»`
    },
    {
      pageNumber: 15,
      chapterTitle: "I - LA RICERCA DELL'ANIMA GEMELLA",
      content: `I 
LA RICERCA DELL’ANIMA GEMELLA 

Nell’Agosto del 1989, sono partito da Santander, situata all’estremo Nord della Spagna, per continuare la vacanza a Tenerife nelle Isole Canarie. Di solito trascorro l’estate in giro per la Costa Azzurra in Francia, siccome la mia residenza si trova a Juan les Pines. Dopo lunghi anni di studio decisi di regalarmi una vacanza in giro per le grandi isole. 

Mi ritrovai sull’isola di Tenerife a Santa Cruz, l’otto Agosto alle ore dodici. Anche se il viaggio era stato lungo, non ero stanco, e poiché era ancora presto per pranzare, sistemai i bagagli in albergo, feci una rapida doccia ed incominciai a visitare la località di Santa Cruz. Il giorno seguente noleggiai una jeep per visitare l’Isola. Arrivai precisamente a Playa de las Américas, dove c’era molto turismo giovanile. Decisi così, di fermarmi per un paio di giorni in quest’allegra località. 

Trovata una sistemazione provvisoria in un albergo, mi recai subito sulla famosa spiaggia di Playa de les Américas, la cui sabbia bianca proveniva dal deserto del Sahara.

Dopo aver preso un po’ di sole ed aver fatto un bagno nell’Oceano Atlantico, decisi di recarmi verso i ristorantini collocati in fila indiana lungo la playa. Mentre stavo passeggiando nella zona benestante dell’isola, intravidi da lontano all’interno di un magnifico appartamento, che affacciava sul mare, un dipinto di notevoli dimensioni. Era un’opera d’arte figurativa che trasmetteva un magnetismo insolito.`
    },
    {
      pageNumber: 16,
      chapterTitle: "IL DIPINTO E L'INCONTRO",
      content: `La balconata dell’abitazione, assai ampia, permetteva di osservare il meraviglioso salone. Il dipinto, situato su un gran cavalletto all’interno del salotto, era visibile dal porticciolo. Le figure e i colori dell’Opera, erano a dir poco geniali, trasmettevano un fascino e un’energia vitale e misteriosa. Grazie ai molti anni di studio, che avevo dedicato alla Storia dell’arte, capii che si trattava di un artista geniale.

Ciò che percepivo era come se, Michelangelo Buonarroti, Leonardo da Vinci, Peter Paul Rubens, Salvador Dalì e Giorgio De Chirico, fossero tutti presenti in quell’Opera. Dovevo capire. Era evidente che l’autore fosse contemporaneo. Il surrealismo alla Dalì e il mistero leonardesco, erano gli elementi percepiti in un primo momento. Al suo interno vi erano dei messaggi e dei simboli da decifrare.

Di fronte a questa grande abitazione, nel piccolo porticciolo, vi è un Caffè molto carino ed elegante: El Barquero frequentato prevalentemente da persone benestanti che possiedono le grandi imbarcazioni ormeggiate nella zona circostante. Decisi di sostare lì, per osservare meglio l’Opera. Pensai di conoscere il proprietario del dipinto. Potevo così, risalire all’autore di quell’originale e arcana opera d’arte.`
    },
    {
      pageNumber: 17,
      chapterTitle: "LIMITE DI CONSULTAZIONE RAGGIUNTO",
      content: `[REGISTRO BIBLIOTECARIO SBN • SEZIONE D • DIGIT-READ PROTOCOL]

La consultazione parziale autorizzata (Anteprima Editoriale) per il volume:
«L'Opera Celeste – Romanzo Alchemico Filosofico (2005)»
è terminata a pagina 16 in ottemperanza ai diritti di tutela d'autore SBN.

Il presente saggio-romanzo è distribuito e in vendita regolare sui canali editoriali.
Per visualizzare l'opera completa con i 41 schemi originali, le 12 Rivelazioni, e l'esposizione clinica sul Sincronismo, si prega di acquistare il testo sui canali ufficiali.

Acquistando i libri sostieni la Fondazione Falace nella catalogazione e digitalizzazione SBN del patrimonio storico-scientifico ed elettronico.`
    }
  ];

  const archetipiSimboliPages: BookPage[] = [
    {
      pageNumber: 1,
      content: `[COPERTINA]

LUCA FALACE

ARCHETIPI, SIMBOLI E SINCRONICITÀ

MANIFESTARE CON IL SINCRONISMO CREATIVO

L'EVOLUZIONE DELL'ANIMA ATTRAVERSO ARCHETIPI, SIMBOLI E SINCRONICITÀ

"Come sviluppare la consapevolezza attraverso gli eventi paralleli e realizzare i propri sogni."`
    },
    {
      pageNumber: 2,
      content: `Luca Falace
ARCHETIPI, SIMBOLI E SINCRONICITÀ
MANIFESTRARE CON IL SINCRONISMO CREATIVO

L'EVOLUZIONE DELL'ANIMA ATTRAVERSO ARCHETIPI, SIMBOLI E SINCRONICI
INTERAZIONE CON IL MONDO FENOMENICO DEGLI EVENTI PARALLELI

Autore: Luca Falace - AIC Centro Culturale Arte & Scienza

PROPRIETÀ LETTERARIA RISERVATA
Nessuna parte di questa pubblicazione può essere riportata o trasmessa, in alcuna forma o con alcun mezzo, compresa la registrazione o le fotocopie.

© 2005-2024 SINCRONISMO CREATIVO: ARCHETIPI, SIMBOLI, SINCRONICITÀ
STUDIO DEI SINCRONISMI CREATIVI

Luca Falace - Tutti i diritti riservati. Deposito Opere Inedite della SIAE, presso la Sezione Opere Letterarie OLAFe presso il Ministero per i Beni Culturali`
    },
    {
      pageNumber: 3,
      chapterTitle: "PREFAZIONE - PARTE I",
      content: `PREFAZIONE

Nel percorso verso la comprensione di sé e del mondo che ci circonda, l'umanità ha scoperto e sviluppato concetti fondamentali che hanno plasmato il nostro percorso evolutivo. Tra questi, gli archetipi, i simboli e le sincronicità emergono come pilastri essenziali nell'approfondimento della nostra esperienza umana e nell'evoluzione dell'anima.

Gli archetipi
Introdotto da Carl Gustav Jung, il concetto di archetipo rappresenta modelli primordiali insiti nell'inconscio collettivo umano. Questi modelli universali, come l'eroe, la madre, il vecchio saggio, sono presenti in tutte le culture e influenzano profondamente i nostri pensieri, sentimenti e comportamenti. Attraverso gli archetipi, possiamo esplorare le profondità della psiche umana e coprire i motivi e le forze che guidano le nostre azioni e le nostre relazioni.`
    },
    {
      pageNumber: 4,
      chapterTitle: "PREFAZIONE - I SIMBOLI",
      content: `I Simboli
Derivati dal greco arcaico σύμβολον, i simboli agiscono come veicoli di trasmissione della conoscenza e della comprensione al di là del linguaggio razionale. Questi simboli possono essere immagini, gesti, suoni o oggetti che rappresentano concetti o idee più grandi e complesse.

Attraverso il linguaggio simbolico, possiamo esplorare la dimensiona trascendentale della realtà e connetterci con il divino e il misterioso. I simboli ci aiutano a superare i confini del linguaggio e delle parole, consentendoci di cogliere gli aspetti più profondi della nostra esistenza e di esprimere concetti altrimenti ineffabili.

I simboli possono essere interpretati in modi diversi da persone diverse e in contesti diversi, aggiungendo ulteriori strati di significato e complessità alla loro natura.`
    },
    {
      pageNumber: 5,
      chapterTitle: "PREFAZIONE - LE SINCRONICITÀ",
      content: `Le Sincronicità
Introdotte da Jung, le sincronicità sono gli eventi significativi che si verificano in modo apparentemente casuale, ma che sono intrinsecamente legati al nostro mondo interiore e al nostro cammino di crescita personale. Questi momenti di connessione e coincidenza sono interpretati come segnali dall'universo o dall'anima stessa, che ci guidano lungo il percorso della nostra vita e ci aiutano a comprendere il significato più profondo degli eventi e delle esperienze che incontriamo.

Conosci te stesso 
(Gnôthi Seautón - Nosce te Ipsum)

Uomo Conosci te stesso, e conoscerai l’Universo e gli Dèi
(Iscrizione sul Tempio dell’Oracolo di Delfi)`
    },
    {
      pageNumber: 6,
      chapterTitle: "INDICE DEI CAPITOLI",
      content: `INDICE DEI CAPITOLI

INTRODUZIONE

PARTE I – ARCHETIPI
COINCIDENZE NELLA NATURA DEGLI ESSERI UMANI
- Capitolo 1. Come riconoscere gli Eventi Paralleli
- Capitolo 2. Come risolvere il problema delle coincidenze collettive
- Capitolo 3. Consapevolezza del fenomeno delle Coincidenze

PARTE II – SIMBOLI
INTRODUZIONE ALLO STUDIO DEI SINCRONISMI CREATIVI
- Capitolo 4. Il Sincronismo Creativo e gli Eventi Paralleli
- Capitolo 5. Come sviluppare la consapevolezza del fenomeno delle Coincidenze
- Capitolo 6. Come interagire con gli Eventi Paralleli

PARTE III – SINCRONICITÀ
TEORIA DELLA RELATIVITÀ E COINCIDENZE RELATIVE
- Capitolo 7. Contemporaneità degli Eventi Paralleli
- Capitolo 8. Introduzione allo studio dei Sincronismi Creativi
- Capitolo 9. Evoluzione degli Eventi Paralleli e Vibrazioni Emozionali

PARTE IV – IL SEGRETO DELLA MANIFESTAZIONE
- Capitolo 10. Interazione con gli Eventi Paralleli
- Capitolo 11. Come Manifestare L'Abbondanza
- Capitolo 12. Manifestare con il Sincronismo Creativo`
    },
    {
      pageNumber: 7,
      chapterTitle: "INTRODUZIONE - PARTE I",
      content: `INTRODUZIONE

I risultati che otterrai dalla lettura di questo volume saranno impressionanti già dopo i primi dieci giorni. Quando avrai seguito tutte le istruzioni dei dieci capitoli di questo manuale, la tua esistenza cambierà radicalmente. Ti troverai su un livello superiore alla media. Questo non vuol dire che sarai migliore degli altri, ma semplicemente perché hai seguito tutte le istruzioni e ti sei impegnato nello studio. La tua coscienza sarà risvegliata dalle considerazioni contenute in questo manuale.

Ti stai chiedendo forse perché ti parlo in modo così diretto? Allora sappi che questo è il modo migliore per metterti in contatto con il tuo inconscio, la tua coscienza, con il tuo Sé superiore. Non spostare la tua attenzione sulla realtà materiale delle cose, non pensare che sia l'autore di questo libro che ti scrive, ma pensa che quello che stai leggendo è il risultato di lunghi anni di studio.`
    },
    {
      pageNumber: 8,
      chapterTitle: "INTRODUZIONE - PARTE II",
      content: `Le mie inedite e originali intuizioni inerenti alla fenomenologia delle coincidenze sono scaturite dall’analisi degli eventi paralleli. Tale studio, durato oltre un decennio, si basa sul ragionamento e la constatazione razionale concernente la fenomenologia delle coincidenze. In questo manuale “Tu Sei”, sono riuscito a sintetizzare le mie ricerche sul fenomeno delle coincidenze.

Dopo aver studiato la Teoria della Sincronicità di Jung, intuii che il tuo modo d’Essere, gli eventi felici, la fortuna e le coincidenze, dipendono, in parte, da tre fattori principali:
1. l’effetto dell’energia di un individuo,
2. l’influenza dell’energia collettiva,
3. i mutamenti dovuti a questioni inspiegabili.`
    },
    {
      pageNumber: 17,
      chapterTitle: "LIMITE DI CONSULTAZIONE RAGGIUNTO",
      content: `[REGISTRO BIBLIOTECARIO SBN • SEZIONE D • DIGIT-READ PROTOCOL]

La consultazione parziale autorizzata (Anteprima Editoriale) per il saggio:
«ARCHETIPI, SIMBOLI E SINCRONICITÀ (2005)»
è terminata a pagina 16 in ottemperanza ai diritti di tutela d'autore SBN.

Il presente saggio-manuale è distribuito e in vendita regolare sui canali editoriali.
Per visualizzare l'opera completa con i 12 capitoli originali o l'indagine empirica sui Sincronismi, si prega di acquistare il testo sui canali ufficiali.

Acquistando i libri sostieni la Fondazione Falace nella catalogazione e digitalizzazione SBN del patrimonio storico-scientifico ed elettronico.`
    }
  ];

  const archetipiVol3Pages: BookPage[] = [
    {
      pageNumber: 1,
      content: `[COPERTINA]

LUCA FALACE

ARCHETIPI SIMBOLI SINCRONICITÀ

MANIFESTARE CON IL SINCRONISMO CREATIVO

L'EVOLUZIONE DELL'ANIMA ATTRAVERSO ARCHETIPI, SIMBOLI E SINCRONICITÀ

"Come sviluppare la consapevolezza attraverso gli eventi paralleli e realizzare i propri sogni."

LAPIS PHILOSOPHORUM
VOLUME III

Centro Culturale Arte & Scienza 2005`
    },
    {
      pageNumber: 2,
      content: `LUCA FALACE
ARCHETIPI, SIMBOLI, SINCRONICITÀ VOL. III

ARCHETIPI, SIMBOLI, SINCRONICITÀ VOL. 3

ALCHIMIA SPIRITUALE,
ARCHETIPI UMANISTICI
SINCRONICITÀ EVOLUTIVA

Lapis Philosophorum`
    },
    {
      pageNumber: 3,
      chapterTitle: "L'ARTE ALCHEMICA E LA PIETRA FILOSOFALE",
      content: `L'ARTE ALCHEMICA E LA PIETRA FILOSOFALE

In questo terzo volume concludiamo il nostro percorso di studio sulle sincronicità, esplorando come esse influenzino le manifestazioni e i sincronismi creativi. Questo libro è stato pensato per permetterti di mettere a frutto le conoscenze acquisite nei primi due volumi e applicarle in modo pratico e consapevole.

In queste pagine troverai una serie di scoperte, rivelazioni e intuizioni inedite, frutto delle mie personali ricerche e delle mie esperienze dirette. Questi risultati derivano da anni di osservazione attenta delle sincronicità, personali e collettive, inclusi i sincronismi geopolitici; dallo studio di centinaia di temi natali, dalle pratiche di Kundalini Yoga secondo il misticismo tibetano, e da un approfondito esame antropologico delle pratiche di ogni cultura.`
    },
    {
      pageNumber: 4,
      chapterTitle: "ALCHIMIA SPIRITUALE E UNIONE DEGLI OPPOSTI",
      content: `Alchimia spirituale e l’unione degli opposti:

L'alchimia spirituale è descritta come un processo di unione degli opposti all'interno della mente umana. Essa rappresenta l’equilibrio tra il pensiero materiale e quello spirituale, così come tra l'Oriente conservatore e l'Occidente consumistico. Quando queste forze si integrano, portano serenità a livello globale. In questo contesto, l'alchimia non è solo trasformazione della materia, ma anche della coscienza, indirizzando l'evoluzione spirituale.

Kundalini e la meditazione:

Il documento evidenzia il concetto della Kundalini, descrivendola come un’energia latente simboleggiata da un serpente arrotolato. Il risveglio della Kundalini avviene attraverso pratiche come la meditazione e il Kundalini yoga. Questo processo implica l’attivazione dei chakra principali, ciascuno associato a suoni sacri (mantra) e alla consapevolezza spirituale.`
    },
    {
      pageNumber: 5,
      chapterTitle: "CHAKRA E SEFIROTH NELLA CABALA",
      content: `Chakra e Sefiroth nella cabala:

L’opera fa una connessione tra i sette chakra dello yoga e le dieci Sefiroth della Cabala, sottolineando come entrambe le tradizioni rappresentino un cammino di elevazione spirituale. I chakra, posti lungo il canale Susumna, permettono l'accesso alle energie sottili e sono correlati alle Sefiroth, che rappresentano aspetti della creazione e dell'esistenza. Questo parallelismo dimostra come filosofie diverse convergano verso un’unica visione dell’evoluzione dell’anima.

Il matrimonio mistico e la Pietra Filosofale:

Nel percorso alchemico occidentale, il "matrimonio mistico" è una tappa cruciale. Rappresentato simbolicamente dall'unione tra il principio solare (maschile) e quello lunare (femminile), questo processo culmina nella creazione della Pietra Filosofale, simbolo della perfezione e dell’immortalità spirituale.`
    },
    {
      pageNumber: 6,
      chapterTitle: "L'UNIONE DEGLI OPPOSTI",
      content: `L’Arte Alchemica: L’Unione degli Opposti e la Trasformazione Interiore

Nel percorso alchemico e spirituale, la Kundalini rappresenta l’energia vitale e divina dormiente alla base della spina dorsale. Questa forza è raffigurata como un serpente avvolto su se stesso, pronto a risvegliarsi e ascendere attraverso i chakra, i centri energetici del corpo. L’obiettivo del risveglio della Kundalini è l’ascesa attraverso questi centri fino a raggiungere il settimo chakra, Sahasrara, dove si realizza l’unione con l’energia cosmica, portando a uno stato di illuminazione.

La Kabbalah, con le sue Sephiroth, fornisce una mappa di questo viaggio interiore. Le Sephiroth, sfere di energia divina sull’Albero della Vita, rappresentano le tappe di un percorso che porta l’anima dalla manifestazione materiale alla riunificazione con il divino.`
    },
    {
      pageNumber: 7,
      chapterTitle: "LA KUNDALINI E L'ASCENSIONE",
      content: `La Kundalini e l’Ascensione Attraverso i Chakra: Un Percorso Verso la Divinità

Le ricerche e le intuizioni contenute in questo volume rivelano una connessione profonda tra l’attivazione della Kundalini e l’ascesa attraverso i chakra come chiave per comprendere i segreti dell’alchimia spirituale. Quando la Kundalini si risveglia e comincia la sua ascesa, ogni chakra che attraversa rappresenta una sfida e una tappa nella trasformazione interiore. Questa energia, che inizialmente è latente, quando attivata, può generare un incremento di sincronicità nella vita dell’individuo.

In questo volume vedremo inoltre come l’apertura di ogni chakra corrisponda a un’espansione della coscienza. Il passaggio attraverso il chakra del cuore (Anahata) è particolarmente cruciale, poiché rappresenta il punto di equilibrio tra le energie inferiori e quelle superiori.`
    },
    {
      pageNumber: 17,
      chapterTitle: "LIMITE DI CONSULTAZIONE RAGGIUNTO",
      content: `[REGISTRO BIBLIOTECARIO SBN • SEZIONE D • DIGIT-READ PROTOCOL]

La consultazione parziale autorizzata (Anteprima Editoriale) per il volume:
«Archetipi, Simboli, Sincronicità Vol. III (Lapis Philosophorum) (2005)»
è terminata a pagina 16 in ottemperanza ai diritti di tutela d'autore SBN.

Il saggio di riferimento è distribuito e in vendita regolare sui canali editori.
Per visualizzare l'opera completa con i 12 capitoli originali o l'indagine empirica sui Sincronismi, si prega di acquistare il testo sui canali ufficiali.

Acquistando i libri sostieni la Fondazione Falace nella catalogazione e digitalizzazione SBN del patrimonio storico-scientifico ed elettronico.`
    }
  ];

  const mythosSpazioPages: BookPage[] = [
    {
      pageNumber: 1,
      content: `[COPERTINA]

LUCA FALACE

MITO, SPAZIO TEMPO
La Conoscenza Evolutiva

VOLUME II

LF
Centro Culturale Arte & Scienza`
    },
    {
      pageNumber: 2,
      content: `Luca Falace

MYTHOS, SPAZIO E TEMPO

La Conoscenza Evolutiva`
    },
    {
      pageNumber: 3,
      content: `MYTHOS, SPAZIO E TEMPO
La Conoscenza Evolutiva
Sincronia Simbolica e Mitologie Significative

COINCIDENZE NELL'ARTE, NEI MITI E NELLE LEGGENDE CONTEMPORANEE

Mitologia Sincronica dalla Creazione di Adamo alle Leggende Contemporanee: Evoluzione dell'Uomo sulla Terra, Magna Mater, Etnie Aliene, Ere Geologiche, Datazione delle Ere secondo la Mitologia e la Scienza attuale, Atlantide, Mu, Lemuria, Agharti, Vimana, Vimans, Miti Antichi, Miti Contemporanei.

Studio e Ricerche, dott. Luca Falace`
    },
    {
      pageNumber: 4,
      content: `Study and Research by dott. Luca Falace
© 2018 Luca Falace all rights reserved

MYTHOS, SPAZIO E TEMPO
La Conoscenza Evolutiva
Sincronia Simbolica e Mitologie Scentifiche

COINCIDENZE NELL'ARTE, NEI MITI E NELLE LEGGENDE CONTEMPORANEE

Depositato nell'anno 2005 presso la SIAE sezione l'O.l.a.f. © 2005-2018
Luca Falace tutti i diritti riservati`
    },
    {
      pageNumber: 5,
      chapterTitle: "INDICE DEI CAPITOLI",
      content: `INDICE DEI CAPITOLI

Parte I - pag. 05
CONOSCENZA STORICA

Parte II - pag. 11
MITI ANTICHI E CONTEMPORANEI

Parte III - pag. 36
CRONOLOGIA DELLA CONOSCENZA EVOLUTIVA`
    },
    {
      pageNumber: 6,
      chapterTitle: "PREFAZIONE - PARTE I",
      content: `PREFAZIONE

Questo volume, come tutti i libri di cultura, è senza finalità didattiche, tecniche o d’espressione letteraria. L’unico scopo è di pubblicare, in modo sintetico, i propri studi e le legittime considerazioni, inerenti in questo caso, la fenomenologia degli Eventi Paralleli.

La pubblicazione di un manuale, o di un saggio, funge da strumento nel quale è attestata, e riconosciuta, la paternità dello studio, del lavoro e della scoperta, di concetti, idee e pensieri innovativi. L’originalità sta nell'attingere dalla natura, e dall’uomo stesso, i valori più alti, e rielaborarli con intelligenza e purezza d’animo, rendendo note le fonti, e rispettando l’evoluzione dei precedenti studiosi.`
    },
    {
      pageNumber: 7,
      chapterTitle: "PREFAZIONE - PARTE II",
      content: `Le persone che rendono tali valori, contemporanei alla propria epoca, in un evoluto eterno ritorno, sono considerati evoluti. Tutti quelli che operano in tale intento hanno reso presente, e continuo, il più alto mutamento dell’eternità. Sono considerati, a mio parere, degli Esseri Evoluti.

Questi devono essere ricordati dal prossimo, per la paternità delle loro opere, e delle rinnovate scoperte, perché queste portano all’evoluzione del pensiero, e dei mezzi nell’intera collettività. Per tali motivi a loro, va il più profondo e continuo rispetto, per aver aiutato l’umanità nel suo cammino evolutivo.

Luca Falace`
    },
    {
      pageNumber: 8,
      chapterTitle: "PARTE I - CONOSCENZA STORICA",
      content: `PARTE I
CONOSCENZA STORICA

Quando ho iniziato a studiare i principali miti, nelle diverse tradizioni popolari, mi sono reso conto, come ho scritto in tutti i miei altri saggi pubblicati, della significativa coincidenza delle similitudini, presenti nelle diverse etnie e periodi storici. La risposta inerente alla manifestazione delle coincidenze mitologiche è in relazione a quella serie di archetipi latenti nell’inconscio dell’uomo. Presenti in esso, sin dai primi lumi della ragione.`
    },
    {
      pageNumber: 9,
      chapterTitle: "COINCIDENZE TRA I MITI DEGLI ANGELI",
      content: `Coincidenze tra i Miti degli Angeli

I fatamiti contemporanei vedono gli arcangeli, come custodi del Carro. Arca sta per nave e angelo per messaggero. Arca-angelo il messaggero della nave alata, in altre parole, il conducente della nave che vola nello spazio? Quindi il pilota della nave spaziale. Nelle credenze popolari contemporanee, si è sviluppato un’innumerevole e fantasiosa serie di teorie. Queste sono nate dall’unione dei miti, dalle leggende moderne e dalle fantasie metropolitane.

Una delle più note spiegherebbe l’originaria natura degli angeli. Questi esseri non sono terrestri, poiché sono più evoluti. Secondo le comuni credenze popolari, l’angelo è un’entità extraterrestre.`
    },
    {
      pageNumber: 17,
      chapterTitle: "LIMITE DI CONSULTAZIONE RAGGIUNTO",
      content: `[REGISTRO BIBLIOTECARIO SBN • SEZIONE D • DIGIT-READ PROTOCOL]

La consultazione parziale autorizzata (Anteprima Editoriale) per il volume:
«Mythos, Spazio e Tempo: La Conoscenza Evolutiva (2018)»
è terminata a pagina 16 in ottemperanza ai diritti di tutela d'autore SBN.

Il presente saggio è distribuito e in vendita regolare sui canali editoriali.
Per visualizzare l'opera completa con la Cronologia evolutiva completa, si prega di acquistare il testo sui canali ufficiali.

Acquistando i libri sostieni la Fondazione Falace nella catalogazione e digitalizzazione SBN del patrimonio storico-scientifico ed elettronico.`
    }
  ];

  const tuSeiPages: BookPage[] = [
    {
      pageNumber: 1,
      content: `[COPERTINA]

LUCA FALACE

TU SEI

MANUALE
Sincronismi, Coincidenze, Sincronicità

Lo Sviluppo della Consapevolezza del proprio Essere,
attraverso il Fenomeno degli Eventi Paralleli,
per interagire con le Coincidenze Personali
e Realizzare i propri Sogni

L'OPERA CELESTE
CENTRO CULTURALE`
    },
    {
      pageNumber: 2,
      content: `Luca Falace TU SEI 
1

Titolo: TU SEI
SINCRONISMI, COINCIDENZE, SINCRONICITÀ
INTERAZIONE CON IL MONDO FENOMENICO DEGLI EVENTI PARALLELI

Autore: Luca Falace
Sito internet: www.loperaceleste.com

Editore: L’Opera Celeste, Centro Culturale Arte & Scienza, Il Mio Libro, Kataweb Gruppo L’Espresso

PROPRIETÀ LETTERARIA RISERVATA
Nessuna parte di questa pubblicazione può essere riportata, o trasmessa, in alcuna forma o con alcun mezzo, compresa la registrazione o le fotocopie.

2005 © S.C.S - SINCRONISMI, COINCIDENZE, SINCRONICITÀ
STUDIO DEI SINCRONISMI CREATIVI
Luca Falace tutti i diritti riservati.
Deposito Opere Inedite della SIAE, presso la Sezione Opere Letterarie OLAF.`
    },
    {
      pageNumber: 3,
      content: `Luca Falace TU SEI 
2

Luca Falace
Tu Sei

Lo Sviluppo della Consapevolezza del proprio Essere, attraverso il Fenomeno degli Eventi Paralleli, per interagire sulle Coincidenze Personali e Realizzare i propri Sogni

The Celestial Opera Cultural Center`
    },
    {
      pageNumber: 4,
      chapterTitle: "INDICE GENERALE",
      content: `Luca Falace TU SEI 
3

Indice
Pag. 5 – INTRODUZIONE

PARTE I – TU SEI - SINCRONISMI
COINCIDENZE NELLA NATURA DEGLI ESSERI UMANI
Pag. 16 - Capitolo 1. Come riconoscere gli Eventi Paralleli
Pag. 34 - Capitolo 2. Come risolvere il problema delle coincidenze collettive
Pag. 49 - Capitolo 3. Consapevolezza del fenomeno delle Coincidenze

PARTE II – TU SEI - COINCIDENZE
INTRODUZIONE ALLO STUDIO DEI SINCRONISMI CREATIVI
Pag. 64 - Capitolo 4. Il Sincronismo Creativo e gli Eventi Paralleli
Pag. 76 - Capitolo 5. Come sviluppare la consapevolezza del fenomeno delle Coincidenze
Pag. 88 - Capitolo 6. Come interagire con gli Eventi Paralleli

PARTE III – TU SEI - SINCRONICITÀ
TEORIA DELLA RELATIVITÀ E COINCIDENZE RELATIVE
Pag. 106 - Capitolo 7. Contemporaneità degli Eventi Paralleli
Pag. 125 - Capitolo 8. Introduzione allo studio dei Sincronismi Creativi
Pag. 140 - Capitolo 9. Evoluzione degli Eventi Paralleli e Vibrazioni Emozionali

PARTE IV – TU SEI – SINCRONISMI, COINCIDENZE, SINCRONICITÀ
FORTUNA, BENESSERE, FELICITÀ
Pag. 154 - Capitolo 10. Interazione con gli Eventi Paralleli
COMPENDIO DEI DIECI CAPITOLI – TU SEI
Pag. 181 – Compendio dei dieci Capitoli`
    },
    {
      pageNumber: 5,
      content: `Luca Falace TU SEI 
4

Conosci te stesso
(Gnôthi Seautón - Nosce te Ipsum)

Uomo Conosci te stesso, e conoscerai l’Universo e gli Dèi.

(Iscrizione sul Tempio dell’Oracolo di Delfi)`
    },
    {
      pageNumber: 6,
      chapterTitle: "INTRODUZIONE - PAG. 5",
      content: `Luca Falace TU SEI 
5

INTRODUZIONE

I risultati che otterrai, dalla lettura di questo volume, saranno impressionanti già dopo i primi dieci giorni. Quando tu avrai seguito tutte le istruzioni, dei dieci capitoli di questo manuale, la tua esistenza cambierà radicalmente. Tu, ti troverai su un livello superiore alla media. Questo non vuol dire che tu sarai migliore degli altri, ma semplicemente perché hai seguito le tutte istruzioni, e ti sei impegnato nello studio. La tua coscienza sarà risvegliata, dalle considerazioni contenute in questo manuale.

Ti stai chiedendo forse perché ti parlo in modo così diretto? Allora sappi che questo è il modo migliore, per metterti in contatto con il tuo inconscio, la tua coscienza, con il tuo Sé superiore. Non spostare la tua attenzione sulla realtà materiale delle cose, non pensare che è l’autore di questo libro che ti scrive, ma pensa che quello che stai leggendo è il risultato di lunghi anni di studio, nell’osservazione degli scritti e nelle semplici intuizioni dei collegamenti tra le varie conoscenze.`
    },
    {
      pageNumber: 7,
      chapterTitle: "INTRODUZIONE - PAG. 6",
      content: `Luca Falace TU SEI 
6

Semplici considerazioni, ricompongono un grande mosaico, i cui tasselli si perdono nella notte dei tempi, fino ad arrivare in questo presente. Questo ti permetterà di vedere l’intera immagine delle cose. Grazie agli antichi insegnamenti inerenti al risveglio della consapevolezza, contenuti all’interno di quest’opera, tu imparerai ad attivare un’energia latente assopita. Tale potenzialità è comune nella maggior parte degli esseri umani. Le tue potenzialità si eleveranno e potrai pensare, agire e materializzare i tuoi sogni.

Le mie inedite e originali intuizioni, inerenti alla fenomenologia delle coincidenze, sono scaturite dall’analisi degli eventi paralleli. Tale studio, durato oltre un decennio, si basa sul ragionamento, e la constatazione razionale, concernente la fenomenologia delle coincidenze.

In questo manuale “Tu Sei” sono riuscito a sintetizzare, le mie ricerche sul fenomeno delle coincidenze. Questo è stato possibile, grazie all’attento e lungo studio di ricerca compiuto, su una vastissima`
    },
    {
      pageNumber: 8,
      chapterTitle: "INTRODUZIONE - PAG. 7",
      content: `Luca Falace TU SEI 
7

quantità di volumi consultati, e sull’esperienza diretta su campo.

In questo manuale, “Tu Sei”, sono racchiuse alcune teorie riguardanti i miei studi, sulla fenomenologia delle coincidenze. Le prime considerazioni, su tale studio, sono scaturite dalla mia osservazione empirica, dopo un’esperienza diretta durata molti anni, come ho già descritto all’inizio.

La mia modesta ricerca e i miei esperimenti quotidiani, sono stati incentrati, sullo studio della fenomenologia delle coincidenze significative.

Dopo aver studiato la Teoria della Sincronicità di Jung, intuii che il tuo modo d’Essere, gli eventi felici, la fortuna e le coincidenze, dipendono, in parte, da tre fattori principali:

1. l’effetto dell’energia di un individuo,
2. l’influenza dell’energia collettiva,
3. i mutamenti dovuti a questioni inspiegabili.`
    },
    {
      pageNumber: 9,
      chapterTitle: "INTRODUZIONE - PAG. 8",
      content: `Luca Falace TU SEI 
8

La terza ipotesi potrebbe essere la causa, dei primi due fattori, e quindi il problema ritornerebbe ad essere irrisolto. Intuii che poteva sembrare così, solo apparentemente.

Nell’arco di dieci anni di studio sono riuscito a conoscere e studiare il fenomeno delle coincidenze sociali, tra le persone. È iniziato così il mio vero studio su campo.

Questa ricerca era incentrata sull’analisi quotidiana, relativa ad un gran numero di eventi e di personalità, che caratterizzavano i sincronismi presenti nel corso delle giornate. Notai una notevole quantità di eventi collettivi coincidenti. Questi erano comuni a molte persone che conoscevo.

Incominciai a prender nota, di tutto quello che avveniva durante le mie uscite. Documentavo i sincronismi, con delle piccole implicite interviste quotidiane, alle persone più svariate.

Trascrivevo con entusiasmo, in seguito, le impressionanti similitudini collettive, ma anche le`
    },
    {
      pageNumber: 10,
      chapterTitle: "INTRODUZIONE - PAG. 9",
      content: `Luca Falace TU SEI 
9

incredibili affinità, coincidenti, presenti nel comportamento sociale, nelle diverse categorie lavorative. Mi ritrovai con un’innumerevole quantità di appunti. Incominciai così a riordinarli come tasselli di un mosaico.

Sulla base della “Teoria della Sincronicità” di Carl Gustav Jung, ho inserito delle mie considerazioni, che nel tempo si sono rivelate originali, al relativo studio in questione.

Come ho già scritto nella prefazione, le mie teorie in merito non hanno alcuna presunzione scientifica, o accademica, ma registrano a mio avviso, un’originale serie d’intuizioni, che andrebbero approfondite attraverso una metodologia appropriata. Inoltre il mio intento è quello di portare alla luce, il fenomeno delle coincidenze significative e risvegliare la tua Coscienza e le coscienze degli studiosi.

Questo ti aiuterà a distaccarti dalla massa. Questo distacco non sarà fisico, ma mentale. Questo significa che tu conoscerai il Tuo Essere. In tal senso Tu conoscerai te stesso; perché Tu Sei.`
    },
    {
      pageNumber: 11,
      chapterTitle: "INTRODUZIONE - PAG. 10",
      content: `Luca Falace TU SEI 
10

La fenomenologia degli eventi paralleli a mio parere è di notevole importanza, poiché è legato, in parte, al percorso evolutivo di ogni singolo essere della Terra. Il fenomeno delle coincidenze è collegato, inoltre, al più grande enigma che l’essere umano possa svelare: il mistero dell’esistenza.

I risultati che tu otterrai, dalla lettura di questo volume, saranno impressionanti già dopo i primi dieci giorni. Quando avrai seguito tutte le istruzioni, la tua esistenza cambierà radicalmente. Le tue potenzialità si eleveranno e potrai pensare, agire e materializzare i tuoi sogni. Grazie a questi insegnamenti, imparerai ad avere la consapevolezza di te stesso, degli altri e delle cose che ti circondano. Questa sarà l’unica differenza tra te e gli altri. Sono stati scritti molti libri sul fenomeno delle coincidenze, ma non sono ancora state chiarite le cause del fenomeno. Solo in questo manuale troverai originali spiegazioni, in merito all’unione di tre fattori che costituiscono la fenomenologia degli eventi paralleli, ovvero, il Sincronismo, la Coincidenza e la Sincronicità. Questi tre fattori costituiscono il Tuo Essere, la tua Persona.`
    },
    {
      pageNumber: 12,
      chapterTitle: "INTRODUZIONE - PAG. 11",
      content: `Luca Falace TU SEI 
11

Tu Sei il risultato degli Eventi Paralleli.

Dopo aver studiato questo manuale, tu potrai apprezzare meglio, il lavoro delle altre persone, in merito a tali argomenti. Questo perché, la tua mente avrà realizzato, la consapevolezza dell’esistenza del Sé, in connessione con il fenomeno degli Eventi Paralleli.

In merito alle problematiche dei temi che tratteremo, una visione più ampia potrebbe giovare all’analisi della soluzione. In tal senso l’originalità e l’importance di questo volume, si concretizza proprio nell’atipicità dei contenuti, nei confronti delle soluzioni adottate.

Ogni possibile soluzione è affiancata da un’importante ricerca nell’ambito delle tradizioni antiche. Il ragionamento storico verterà sulle più importanti e antiche civiltà. Le soluzioni dei problemi contemporanei saranno supportate, da un sapere antichissimo. Il confronto tra la civiltà occidentale e quell’orientale. Per quanto concerne le civiltà orientali, in relazione alle antiche tradizioni dell’India e la Cina, queste saranno prese in considerazione più delle altre. Sappiamo che il sapere di queste due civiltà molto`
    },
    {
      pageNumber: 13,
      chapterTitle: "INTRODUZIONE - PAG. 12",
      content: `Luca Falace TU SEI 
12

antiche è sempre più rivalutato, nella nostra epoca. In particolare dalla medicina, dalla scienza e dalla recente fisica quantistica.

La tua mente, da questo momento in poi, dovrà essere versatile, se Tu vorrai veramente “vedere” e non osservare le cose.

In una prima fase potresti trovare qualche piccola difficoltà, nel capire alcuni termini. Vai avanti nei capitoli, non fermarti. Ogni tua incomprensione, ti sarà chiara in seguito. Sarà proprio la comprensione di questi termini, che ti permetterà di farti pensare, agire e ottenere i risultati. In una prima fase, non importa, che tu non sia convinto. Segui le istruzioni. È il risultato quello che conta. Prima di procedere nell’analisi degli Eventi Paralleli è bene che tu sappia alcune regole importanti.

• Quando la tua mente arriverà alla realizzazione di una nuova visione delle cose che ci circondano, tu avrai un enorme potere.`
    },
    {
      pageNumber: 14,
      chapterTitle: "INTRODUZIONE - PAG. 13",
      content: `Luca Falace TU SEI 
13

• Nella tua nuova esistenza saprai interagire, con il flusso degli eventi paralleli. Questo ti permetterà di vivere in una condizione di benessere. In tal senso dovrai aiutare il prossimo meritevole.

• Tutto quello che vuoi ottenere, deve nascere dal sentimento del bene. Poiché, come vedrai in seguito, la manifestazione di una coincidenza, può essere anche il risultato di una tua azione.

Il massimo dell’intima soddisfazione, e della realizzazione di ogni essere umano, consiste nell’arrivare alla meta onestamente. Arrivare con le proprie forze e senza scendere a qualsiasi tipo di compromesso. Ogni Essere Umano, nel proprio cuore, conosce il giusto.

Tu otterrai Fortuna, Benessere e Felicità in una maniera pura, onesta e laboriosa. Per questo godrai appieno del tuo risultato, del tuo impegno e della tua brillante realizzazione. Poiché, ricorda che la`
    },
    {
      pageNumber: 15,
      chapterTitle: "INTRODUZIONE - PAG. 14",
      content: `Luca Falace TU SEI 
14

manifestazione di una coincidenza, può essere anche il risultato di una tua azione.

Tu otterrai Fortuna, Benessere e Felicità, solo se crederai fermamente in te stesso, ed avrai sviluppato la consapevolezza del fenomeno degli Eventi Paralleli.

Tu otterrai Fortuna, Benessere e Felicità solo se studierai attentamente tutte le istruzioni contenute all’interno di quest’opera. Ora libera la tua mente, rendila versatile, e segui le istruzioni.

Ora libera la tua mente e segui attentamente ciò che c’è scritto in questo libro. Mentre leggi ascolta la tua voce, non pensare, che sono io che scritto questo libro, dimentica ciò che già conosci, libera la tua mente, e nella lettura di questo libro, da adesso in poi, la tua attenzione, la tua comunicazione nel leggere questo scritto, dovrà essere riferita alla sola tua persona e a nessun altro. Ascolta la tua voce nella tua mente. Ascolta te stesso, perché TU SEI.`
    },
    {
      pageNumber: 16,
      chapterTitle: "PRIMA PARTE - PAG. 15",
      content: `Luca Falace TU SEI 
15

TU SEI
SINCRONISMI
PRIMA PARTE

I° OBIETTIVO
LO SVILUPPO DELLA CONSAPEVOLEZZA DELLE COINCIDENZE NELLA NATURA DEGLI ESSERI UMANI`
    },
    {
      pageNumber: 17,
      chapterTitle: "LIMITE DI CONSULTAZIONE RAGGIUNTO",
      content: `[REGISTRO BIBLIOTECARIO SBN • SEZIONE D • DIGIT-READ PROTOCOL]

La consultazione parziale autorizzata (Anteprima Editoriale) per il volume:
«TU SEI: Sincronismi, Coincidenze, Sincronicità (2005/2011)»
è terminata a pagina 16 in ottemperanza ai diritti di tutela d'autore SBN.

Il presente saggio-manuale è distribuito e in vendita regolare sui canali editoriali.
Per visualizzare l'opera completa con i 11 capitoli originali o l'indagine empirica sui Sincronismi, si prega di acquistare il testo sui canali ufficiali.

Acquistando i libri sostieni la Fondazione Falace nella catalogazione e digitalizzazione SBN del patrimonio storico-scientifico ed elettronico.`
    }
  ];

  const sincronismoMetodoPages: BookPage[] = [
    {
      pageNumber: 1,
      content: `[COPERTINA]

LUCA FALACE

SINCRONISMO CREATIVO
Archetipi, Simboli, Sincronicità

IL METODO DEL SINCRONISMO CREATIVO
APPLICAZIONI PRATICHE

FAIC
CONOSCENZA INFINITA`
    },
    {
      pageNumber: 2,
      content: `Luca Falace

SINCRONISMO CREATIVO

ARCHETIPI, SIMBOLI E SINCRONICITÀ

Luca Falace - Tutti i diritti riservati.
© 2005-2024 Deposito Opere Inedite della SIAE,
presso la Sezione Opere Letterarie OLAF
e presso il Ministero per i Beni Culturali`
    },
    {
      pageNumber: 3,
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

LUCA FALACE

ARCHETIPI, SIMBOLI E SINCRONICITÀ
MANIFESTARE CON
IL SINCRONISMO CREATIVO

Lo Sviluppo della Consapevolezza del proprio Essere,
attraverso il Fenomeno degli Eventi Paralleli,
per interagire sulle Coincidenze Personali
e Realizzare i propri Sogni

L'EVOLUZIONE DELL'ANIMA
ATTRAVERSO ARCHETIPI, SIMBOLI E SINCRONICITÀ

ARCHETIPI, SIMBOLI, SINCRONICITÀ:
INTERAZIONE CON IL MONDO FENOMENICO
DEGLI EVENTI PARALLELI`
    },
    {
      pageNumber: 4,
      chapterTitle: "INDICE GENERALE - PARTE TEORICA",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

INDICE

PREMESSA….…………………...………………...………..………….06
PREFAZIONE……………………………………........…….……….07
INTRODUZIONE……………………………….…….…..….……..….09

PRIMA PARTE: PARTE TEORICA
LO SVILUPPO DELLA CONSAPEVOLEZZA DELLE COINCIDENZE
NELLA NATURA DELL'ESSERE UMANO

CAPITOLO 1: RICONOSCERE GLI EVENTI PARALLELI….….......14
CAPITOLO 2: RISOLVERE IL PROBLEMA DELLE COINCIDENZE COLLETTIVE………………………………..20
CAPITOLO 3: ACQUISIRE LA CONSAPEVOLEZZA DEL FENOMENO DELLE COINCIDENZE……………………………25
CAPITOLO 4: IL SINCRONISMO CREATIVO E GLI EVENTI PARALLELI…………………………………………….31
CAPITOLO 5: SVILUPPARE LA CONSAPEVOLEZZA DEL FENOMENO DELLE COINCIDENZE………………………………….36
CAPITOLO 6: INTERAGIRE CON GLI EVENTI PARALLELI……...38
CAPITOLO 7: TEORIA DELLA CONTEMPORANEITÀ DEGLI EVENTI PARALLELI IN RELAZIONE AL SINCRONISMO CREATIVO……………………………………………………………….47
CAPITOLO 8: STUDIO DEI SINCRONISMI CREATIVI E VIBRAZIONI EMOZIONALI……………………………………...….55`
    },
    {
      pageNumber: 5,
      chapterTitle: "INDICE GENERALE - PARTE PRATICA",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

SECONDA PARTE: PARTE PRATICA
INTERAZIONE CON IL MONDO FENOMENICO DEGLI EVENTI PARALLELI

CAPITOLO 13: CONSAPEVOLEZZA PSICO-FISICA…………..103
CAPITOLO 14: ENERGIA ALIMENTARE…………………..…..116
CAPITOLO 15: MANIFESTARE CON IL SINCRONISMO CREATIVO……………………………………………………..…...114
CAPITOLO 16: IL POTERE DELLA KUNDALINI…………..….138
CAPITOLO 17: REALIZZAZIONE PERSONALE…………..…...146
CAPITOLO 18: MANIFESTARE L'ABBONDANZA………….....151
CAPITOLO 19: PRANA E KUNDALINI IL POTERE DELLA KUNDALINI
Il REALE FUNZIONAMENTO DELLA KUNDALINI…………....168

PARTE TERZA: TEORIA E PRATICA
ALCHIMIA SPIRITUALE, ARCHETIPI UMANISTICI SINCRONICITÀ EVOLUTIVA`
    },
    {
      pageNumber: 6,
      chapterTitle: "INDICE GENERALE - FONDAZIONE AIC",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

CAPITOLO 26: CULTURA UMANISTICA
ASTROLOGIA EVOLUTIVA
FILOSOFIA ORIENTALE………………………………………..….293
CAPITOLO 27: COLLEGAMENTI TRA ARCHETIPI JUNGHIANI, ASTROLOGIA UMANISTICA E KUNDALINI……………….…...302
CAPITOLO 28: ASTROLOGIA UMANISTICA E CHAKRA: UN PONTE TRA IL COSMO E L'ENERGIA INTERIORE…….…..312
CAPITOLO 29: APPLICATIVE PRATICHE………….………334
CAPITOLO 30: FONDAZIONE AIC
FAIC: METODO DEL SINCRONISMO CREATIVO…….……..359
CAPITOLO 31: ATTO NOTARILE E STATUTO DELLA FONDAZIONE AIC………………………………………………374

GENESI DELLA FONDAZIONE ARTE E SCIENZA…….....405
BIOGRAFIA DI LUCA FALACE………………………………….410
BIBLIOGRAFIA DELLE OPERE DI LUCA FALACE………….424`
    },
    {
      pageNumber: 7,
      chapterTitle: "PREMESSA",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

PREMESSA

La teoria del Sincronismo Creativo, sviluppata e affinata nel corso di molti anni, rappresenta il cuore pulsante di questo libro. Tuttavia, questa opera non si limita a esplorare i principi teorici e pratici della teoria; si pone anche come una testimonianza concreta dell’impegno che ha portato alla creazione della Fondazione AIC (Attività Intellettive e Creative).

La Fondazione, costituita nel 2024, nasce da un lungo percorso che ha preso avvio già nel 2005, quando iniziai a costruire un centro culturale virtuale dedicato all'integrazione tra arte e scienza. Questo progetto, che ha permesso a centinaia di artisti e pensatori di esprimersi e condividere le proprie opere, si è evoluto fino a diventare una reality concreta: una Fondazione che unisce creatività e intelligenza in una missione comune, unendo le potenzialità delle due discipline.`
    },
    {
      pageNumber: 8,
      chapterTitle: "PREFAZIONE",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

PREFAZIONE

Nel percorso verso la comprensione di sé e del mondo che ci circonda, l'umanità ha scoperto e sviluppato concetti fondamentali che hanno plasmato il nostro percorso evolutivo. Tra questi, gli archetipi, i simboli e le sincronicità emergono come pilastri essenziali nell'approfondimento della nostra esperienza umana e nell'evoluzione dell'anima.

Gli archetipi. Introdotto da Carl Gustav Jung, il concetto di archetipo rappresenta modelli primordiali insiti nell'inconscio collettivo umano. Questi modelli universali, come l'eroe, la madre, le vecchio saggio, sono presenti in tutte le culture e influenzano profondamente i nostri pensieri, sentimenti e comportamenti.`
    },
    {
      pageNumber: 9,
      chapterTitle: "PREFAZIONE - LE SINCRONICITÀ",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

Le Sincronicità. Introdotte da Jung, le sincronicità sono gli eventi significativi che si verificano in modo apparentemente casuale, ma che sono intrinsecamente legati al nostro mondo interiore e al nostro cammino di crescita personale. Questi momenti di connessione e coincidenza sono interpretati come segnali dall'universo o dall'anima stessa, che ci guidano lungo il percorso della nostra vita e ci aiutano a comprendere il significato più profondo degli eventi e delle esperienze che incontriamo.

Conosci te stesso
(Gnôthi Seautón - Nosce te Ipsum)
Uomo Conosci te stesso, e conoscerai l’Universo e gli Dèi
(Iscrizione sul Tempio dell’Oracolo di Delfi)`
    },
    {
      pageNumber: 10,
      chapterTitle: "INTRODUZIONE",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

INTRODUZIONE

I risultati che otterrai dalla lettura di questo volume saranno impressionanti già dopo i primi dieci giorni. Quando avrai seguito tutte le istruzioni dei dieci capitoli di questo manuale, la tua esistenza cambierà radicalmente. Ti troverai su un livello superiore alla media. Questo non vuol dire che sarai migliore degli altri, ma semplicemente perché hai seguito tutte le istruzioni e ti sei impegnato nello studio. La tua coscienza sarà risvegliata dalle considerazioni contenute in questo manuale.

Le mie inedite e originali intuizioni inerenti alla fenomenologia delle coincidenze sono scaturite dall’analisi degli eventi paralleli. Tale studio, durato oltre un decennio, si basa sul ragionamento e la constatazione razionale concernente la fenomenologia delle coincidenze. In questo libro sono riuscito a sintetizzare le mie ricerche sul fenomeno delle coincidenze.`
    },
    {
      pageNumber: 11,
      chapterTitle: "INTRODUZIONE - TRE FATTORI PRINCIPALI",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

La mia modesta ricerca e i miei esperimenti quotidiani sono stati incentrati sullo studio della fenomenologia delle coincidenze significative.

Dopo aver studiato la Teoria della Sincronicità di Jung, intuii che il tuo modo d’Essere, gli eventi felici, la fortuna e le coincidenze, dipendono, in parte, da tre fattori principali:
1. l’effetto dell’energia di un individuo,
2. l’influenza dell’energia collettiva,
3. i mutamenti dovuti a questioni inspiegabili.

La ricerca si è focalizzata su un’osservazione quotidiana e sistematica di un ampio numero di eventi e personalità, con l’obiettivo di individuare i sincronismi che caratterizzavano le giornate.`
    },
    {
      pageNumber: 12,
      chapterTitle: "INTRODUZIONE - TU SEI IL RISULTATO",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

Sulla base della “Teoria della Sincronicità” di Carl Gustav Jung, ho inserito delle mie considerazioni che nel tempo si sono rivelate originali al relativo studio in questione.

Tu Sei il Risultato degli Eventi Paralleli

Sono stati scritti molti libri sul fenomeno delle coincidenze, ma non sono ancora state chiarite le cause del fenomeno. Questo manuale offre spiegazioni originali riguardo all’unione di tre fattori che costituiscono la fenomenologia degli eventi paralleli, ovvero il Sincronismo, la Coincidenza e la Sincronicità. Questi tre fattori costituiscono il Tuo Essere, la tua Persona.`
    },
    {
      pageNumber: 13,
      chapterTitle: "NORME E REGOLE IMPORTANTI",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

Prima di procedere nell’analisi degli Eventi Paralleli, è bene che tu sappia alcune regole importanti:

• Quando la tua mente arriverà alla realizzazione di una nuova visione delle cose che ti circondano, avrai un enorme potere.
• Nella tua nuova esistenza, saprai interagire con il flusso degli eventi paralleli, permettendoti di vivere in una condizione di benessere. In tal senso, dovrai aiutare il prossimo meritevole.
• Tutto quello che vuoi ottenere deve nascere dal sentimento del bene, poiché la manifestazione di una coincidenza può essere anche il risultato di una tua azione.

Ascolta la tua voce nella tua mente. Ascolta te stesso, perché TU SEI.`
    },
    {
      pageNumber: 14,
      chapterTitle: "PRIMA PARTE - PARTE TEORICA",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

PRIMA PARTE
PARTE TEORICA

LO SVILUPPO DELLA CONSAPEVOLEZZA DELLE COINCIDENZE NELLA NATURA DELL'ESSERE UMANO`
    },
    {
      pageNumber: 15,
      chapterTitle: "CAPITOLO 1 - RICONOSCERE GLI EVENTI",
      content: `LUCA FALACE SINCRONISMO CREATIVO. ARCHETIPI, SIMBOLI, SINCRONICITÀ

CAPITOLO 1

RICONOSCERE GLI EVENTI PARALLELI

Ora ascolta quella parte di te che comprende tutto. La tua conoscenza è solo sopita. Il segreto è risvegliare la tua coscienza, il tuo Sé superiore, quella parte di te che sai inconsciamente esistere ma che non riesci a riconoscere consciamente. Sono solo un mezzo per il risveglio della tua coscienza, non il tuo insegnante.

Se leggi con la mente libera da pensieri estranei, la tua coscienza sarà stimolata e pronta a ricevere il tuo Essere. Annulla tutte le convinzioni e le opinioni personali che ostacolano il tuo risveglio. Se riesci a contrastare la forza interna che limita il tuo essere, ciò che leggerai sarà una continua rivelazione. Le parole di questo libro risuoneranno in te come messaggi familiari, rivelando ciò che avevi nascosto a te stesso.`
    },
    {
      pageNumber: 16,
      chapterTitle: "LIMITE DI CONSULTAZIONE RAGGIUNTO",
      content: `[REGISTRO BIBLIOTECARIO SBN • SEZIONE D • DIGIT-READ PROTOCOL]

La consultazione parziale autorizzata (Anteprima Editoriale) per il volume:
«Sincronismo Creativo: Il Metodo del Sincronismo Creativo (2005-2024)»
è terminata a pagina 15 in ottemperanza ai diritti di tutela d'autore SBN e deposito SIAE.

Il presente saggio-manuale è distribuito sia in edizione cartacea sia in versione eBook sui canali editoriali.
Per visualizzare l'opera completa con i 31 capitoli originali o l'indagine empirica sui Sincronismi, si prega di acquistare il testo sui canali ufficiali.

Acquistando i libri sostieni la Fondazione Falace nella catalogazione e digitalizzazione SBN del patrimonio storico-scientifico ed elettronico.`
    }
  ];

  const handleOpenReader = (book: Book) => {
    setSelectedBook(book);
    setReaderPage(1);
    setReaderOpen(true);
  };

  const currentBookPages = selectedBook?.id === 'book-celeste' || selectedBook?.id === 'book-celeste-ristampa'
    ? operaCelestePages 
    : selectedBook?.id === 'book-tu-sei'
    ? tuSeiPages
    : selectedBook?.id === 'book-archetipi-simboli'
    ? archetipiSimboliPages
    : selectedBook?.id === 'book-archetipi-vol3'
    ? archetipiVol3Pages
    : selectedBook?.id === 'book-mythos-spazio'
    ? mythosSpazioPages
    : selectedBook?.id === 'book-sincronismo-metodo'
    ? sincronismoMetodoPages
    : [
        { 
          pageNumber: 1, 
          content: `[ANTEPRIMA COPERTINA EDITORALE]
          
${selectedBook?.title}
Anno: ${selectedBook?.year}
Editore: ${selectedBook?.publisher}
ISBN: ${selectedBook?.isbn || 'N/D'}

Questo saggio scientifico-letterario è catalogato con protocollo OPAC SBN.` 
        },
        { 
          pageNumber: 2, 
          content: `[RELAZIONE EDITORIALE SINTESI]

${selectedBook?.description}

---
Dispositivo di Consultazione limitata attivo (Simil-Google Books).
I diritti di download dell'opera integrale sono disabilitati per tutelare i proventi editoriali destinati ai fondi scientifici della Fondazione.` 
        }
      ];

  // eBook Compiler states
  const [compilerOpen, setCompilerOpen] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const [includeBio, setIncludeBio] = useState(true);
  const [includeHistory, setIncludeHistory] = useState(true);
  const [includeTheory, setIncludeTheory] = useState(true);
  const [includePatents, setIncludePatents] = useState(true);
  const [includeArt, setIncludeArt] = useState(true);
  const [includeSbnTexts, setIncludeSbnTexts] = useState(true);
  const [includeTvShows, setIncludeTvShows] = useState(true);
  const [ebookFormat, setEbookFormat] = useState<'html' | 'epub' | 'azw3' | 'txt' | 'xml' | 'phone' | 'print' | 'pdf' | 'docx'>('epub');
  const [downloadReady, setDownloadReady] = useState(false);
  const [ebookBlobUrl, setEbookBlobUrl] = useState<string | null>(null);

  const handleCompileEBook = () => {
    setIsCompiling(true);
    setCompileProgress(10);
    setDownloadReady(false);
    if (ebookBlobUrl) {
      URL.revokeObjectURL(ebookBlobUrl);
      setEbookBlobUrl(null);
    }

    const interval = setInterval(() => {
      setCompileProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 15;
      });
    }, 250);

    setTimeout(async () => {
      let finalString = '';
      let mimeType = 'text/plain';
      let extension = 'txt';

      const escapeXml = (unsafe: string) => {
        return unsafe
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
      };

      const formatToBookHtml = (text: string, isFirstSectionPage: boolean = false) => {
        const paragraphs = text
          .split(/\r?\n\s*\r?\n+/)
          .map(p => p.trim())
          .filter(p => p.length > 0);
        
        return paragraphs.map((p, idx) => {
          if (isFirstSectionPage && idx === 0) {
            return `<p class="capocapo">${p}</p>`;
          }
          return `<p>${p}</p>`;
        }).join('\n');
      };

      if (ebookFormat === 'epub' || ebookFormat === 'azw3') {
        try {
          const zip = new JSZip();
          zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
          
          zip.file('META-INF/container.xml', `<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

          const oebps = zip.folder('OEBPS');
          if (oebps) {
            let manifestEntries = '';
            let spineEntries = '';
            let navMapXml = '';
            let playOrder = 1;
            let tocBody = '';

            manifestEntries += `    <item id="style" href="stylesheet.css" media-type="text/css"/>\n`;
            manifestEntries += `    <item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>\n`;
            manifestEntries += `    <item id="toc" href="toc.xhtml" media-type="application/xhtml+xml"/>\n`;
            spineEntries += `    <itemref idref="cover" />\n`;
            spineEntries += `    <itemref idref="toc" />\n`;

            navMapXml += `    <navPoint id="nav-cover" playOrder="${playOrder++}">\n      <navLabel><text>Copertina</text></navLabel>\n      <content src="cover.xhtml"/>\n    </navPoint>\n`;
            navMapXml += `    <navPoint id="nav-toc" playOrder="${playOrder++}">\n      <navLabel><text>Indice</text></navLabel>\n      <content src="toc.xhtml"/>\n    </navPoint>\n`;

            const coverTitle = ebookFormat === 'azw3' ? 'Opera Omnia Fondazione Falace - Edizione Kindle' : 'Opera Omnia Fondazione Falace - Antologia Monumentale SBN';
            
            const coverHtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it">
<head>
  <title>${escapeXml(coverTitle)}</title>
  <link rel="stylesheet" href="stylesheet.css" type="text/css" />
</head>
<body style="text-align: center; padding: 25px;">
  <div class="cover">
    <div style="border: 2px double #0066cc; padding: 40px 20px; margin: 20px auto; max-width: 500px; background-color: #fff;">
      <div style="font-family: monospace; font-size: 11px; letter-spacing: 2px; color: #0066cc; font-weight: bold; margin-bottom: 25px;">• FONDAZIONE VALLE DI DIANO AIC •</div>
      <h1 style="font-size: 26px; margin: 15px 0 5px 0; font-family: sans-serif; font-weight: bold; color: #0b2240; line-height: 1.2;">OPERA OMNIA ANTOLOGIA</h1>
      <h2 style="font-size: 14px; font-weight: normal; color: #555; margin-bottom: 30px; font-style: italic;">Compendio e Registro Storico Accademico delle Scienze e delle Arti</h2>
      <div style="width: 80px; height: 2px; background-color: #0066cc; margin: 20px auto;"></div>
      <p style="font-size: 14px; margin-top: 30px; text-indent:0; text-align:center;">Autore Originario: <strong>Dott. Luca Falace</strong></p>
      <p style="font-size: 11px; color: #666; text-indent:0; text-align:center; margin-top:10px;">Proprietà Intellettuale Depositata 2005 - 2026</p>
      <p style="font-size: 10px; font-family: monospace; color: #888; margin-top: 50px; text-indent:0; text-align:center;">COMPATIBILE CATALOGO OPAC SBN - SIAE OLAF - UIBM</p>
    </div>
  </div>
</body>
</html>`;
            oebps.file('cover.xhtml', coverHtml);

            const chapters: { id: string; title: string; filename: string; content: string }[] = [];

            if (includeBio) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO I • BIOGRAFIA INTELLETTUALE</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Biografia Scolastica Certificata di Luca Falace</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>`;
              BIOGRAFIA_PAGES.forEach((page, idx) => {
                chContent += `<div class="page-indicator">Dipartimento I • Biografia Pagina ${page.pageNumber}</div>`;
                chContent += `<h3 style="font-weight:bold; margin-top:15px; margin-bottom:8px; font-size:15px; color:#0b2240;">Capitolo Biografia ${page.pageNumber}</h3>`;
                chContent += formatToBookHtml(page.content, idx === 0);
              });
              chContent += `</div>`;
              chapters.push({ id: 'chapter-bio', title: 'DIPARTIMENTO I: Biografia Intellettuale', filename: 'chapter_bio.xhtml', content: chContent });
            }

            if (includeHistory) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO II • ATTO COSTITUTIVO E STORICO</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Atto Notarile, Statuto e Archivio Cronologico Istituzionale</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>`;
              ARCHIVIO_STORICO_PAGES.forEach((page, idx) => {
                chContent += `<div class="page-indicator">Dipartimento II • Cronologia Pagina ${page.pageNumber}</div>`;
                chContent += `<h3 style="font-weight:bold; margin-top:15px; margin-bottom:8px; font-size:15px; color:#0b2240;">Capitolo Registro Storico ${page.pageNumber}</h3>`;
                chContent += formatToBookHtml(page.content, idx === 0);
              });
              chContent += `</div>`;
              chapters.push({ id: 'chapter-history', title: 'DIPARTIMENTO II: Atto Notarile e Archivio Storico', filename: 'chapter_history.xhtml', content: chContent });
            }

            if (includeTheory) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO III • TEORIA COERENTE E SINCRONICITÀ</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Metodo e Livelli del Sincronismo Scientifico</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>
<h3 style="color:#0b2240; font-family:sans-serif; font-size:15px; border-bottom:1px solid #ddd; padding-bottom:4px; margin-top:20px;">Formula Energetica della Sincronicità</h3>
<div style="background:#f9f9f9; border:1px solid #ddd; padding:15px; text-align:center; font-family:monospace; margin:15px 0; font-size:15px; font-weight:bold; border-radius:4px;">${escapeXml(SYNCHRONICITY_THEORY.scientific_formula)}</div>`;
              chContent += formatToBookHtml(SYNCHRONICITY_THEORY.description_it, true);
              chContent += `<h3 style="margin-top:25px; color:#0b2240; font-family:sans-serif; font-size:15px; border-bottom:1px solid #ddd; padding-bottom:4px;">Metodo Generale dei Nove Livelli</h3>`;
              SYNCHRONICITY_THEORY.levels.forEach(lvl => {
                chContent += `<div style="border-bottom:1px dashed #eee; padding:10px 0;">`;
                chContent += `<h4 style="margin:4px 0; font-family:sans-serif; color:#0066cc; font-size:13px;">Livello ${lvl.num}: ${escapeXml(lvl.title)}</h4>`;
                chContent += `<p style="text-indent:0; font-style:italic; font-size:12px; color:#555; margin:4px 0 0 0;">Relazione: ${escapeXml(lvl.description)}</p>`;
                chContent += `</div>`;
              });
              chContent += `</div>`;
              chapters.push({ id: 'chapter-theory', title: 'DIPARTIMENTO III: Sincronismo Coerente e Sincronicità', filename: 'chapter_theory.xhtml', content: chContent });
            }

            if (includePatents) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO IV • REGISTRO BREVETTI D&#39;INGEGNO</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Tutela dell&#39;Anteriorità ed Hardware d&#39;Invenzione (UIBM)</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>
<h2 style="font-size:16px; margin-top:20px; color:#0b2240; border-bottom:1px solid #ccc; padding-bottom:4px;">Brevetti Luca Falace</h2>`;
              INVENTIONS_CATALOG.forEach(inv => {
                chContent += `<div style="border:1px solid #eee; padding:12px; margin-bottom:15px; border-radius:4px; background:#fafafa; page-break-inside: avoid;">`;
                chContent += `<h4 style="margin:0 0 6px 0; font-family:sans-serif; font-size:13px; color:#0066cc;">Brevetto #${inv.number}: ${escapeXml(inv.title)} (${inv.year})</h4>`;
                chContent += `<p style="text-indent:0; font-size:11px; margin:0 0 4px 0; color:#555;"><strong>Stato:</strong> ${escapeXml(inv.status)} | <strong>UIBM Patent:</strong> ${escapeXml(inv.patentNum || 'DEPOSITATO')}</p>`;
                chContent += `<p style="text-indent:0; font-size:12px; color:#333; margin:4px 0;">${escapeXml(inv.description)}</p>`;
                chContent += `<p style="text-indent:0; font-size:11px; color:#666; font-family:monospace; background:#fff; border:1px solid #ececec; padding:4px; margin-top:6px;">Dettaglio: ${escapeXml(inv.details)}</p>`;
                chContent += `</div>`;
              });
              chContent += `<h2 style="font-size:16px; margin-top:30px; color:#0b2240; border-bottom:1px solid #ccc; padding-bottom:4px;">Eredità Brevettuale della Famiglia - Lucio Falace (46 Brevetti d&#39;Ingegno)</h2>`;
              chContent += `<table border="1" cellpadding="5" style="width:100%; border-collapse:collapse; font-size:11px; text-align:left;">`;
              chContent += `<thead><tr style="background:#f2f2f2;"><th>Num</th><th>Codice</th><th>Titolo Brevetto</th><th>Ufficio</th><th>Anno</th></tr></thead>`;
              chContent += `<tbody>`;
              LUCIO_FALACE_PATENTS.forEach(pat => {
                chContent += `<tr>`;
                chContent += `<td>${pat.num}</td>`;
                chContent += `<td><strong>${escapeXml(pat.code)}</strong></td>`;
                chContent += `<td>${escapeXml(pat.title)}</td>`;
                chContent += `<td>${escapeXml(pat.office)}</td>`;
                chContent += `<td>${pat.year}</td>`;
                chContent += `</tr>`;
              });
              chContent += `</tbody>`;
              chContent += `</table>`;
              chContent += `</div>`;
              chapters.push({ id: 'chapter-patents', title: "DIPARTIMENTO IV: Registro dei Brevetti d'Ingegno", filename: 'chapter_patents.xhtml', content: chContent });
            }

            if (includeArt) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO V • CATALOGO GENERALE DELL&#39;ARTE</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Registro Generale delle Opere Esposte e Curatele Poetiche</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>`;
              ARTWORKS_CATALOG.forEach(art => {
                chContent += `<div style="border-left:3px solid #0066cc; padding-left:12px; margin-bottom:15px; page-break-inside: avoid;">`;
                chContent += `<h4 style="margin:0 0 4px 0; font-family:sans-serif; font-size:13px; font-weight:bold; color:#0b2240;">${escapeXml(art.title)} (${art.year})</h4>`;
                chContent += `<p style="text-indent:0; font-size:11px; color:#555; margin:0 0 4px 0;"><strong>Tipologia:</strong> ${escapeXml(art.category)} | <strong>Sede Conservazione:</strong> ${escapeXml(art.venue)}</p>`;
                chContent += `<p style="text-indent:0; font-size:12px; font-style:italic; margin-top:4px;">${escapeXml(art.description)}</p>`;
                chContent += `</div>`;
              });
              chContent += `</div>`;
              chapters.push({ id: 'chapter-art', title: "DIPARTIMENTO V: Registro Generale delle Opere d'Arte", filename: 'chapter_art.xhtml', content: chContent });
            }

            if (includeSbnTexts) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO VI • MONOGRAFIE E TESTI SBN</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Antologia Letteraria di Saggi e Romanzi dell&#39;Autore</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>`;
              
              chContent += `<h2 style="font-size:16px; border-bottom:1px solid #111; padding-bottom:4px; margin-top:20px; color:#0b2240; font-family:sans-serif;">Saggio I: L'Opera Celeste - Romanzo Alchemico Filosofico</h2>`;
              operaCelestePages.forEach((p, idx) => {
                chContent += `<div class="page-indicator">L'Opera Celeste • Pagina ${p.pageNumber}</div>`;
                if (p.chapterTitle) chContent += `<h3 style="font-weight:bold; margin-top:15px; font-size:13px; color:#0b2240;">Capitolo: ${escapeXml(p.chapterTitle)}</h3>`;
                chContent += formatToBookHtml(p.content, idx === 0);
              });

              chContent += `<h2 style="font-size:16px; border-bottom:1px solid #111; padding-bottom:4px; margin-top:40px; color:#0b2240; font-family:sans-serif;">Saggio II: Tu Sei (Coincidenze, Sincronicità, Sincronismi)</h2>`;
              tuSeiPages.forEach((p, idx) => {
                chContent += `<div class="page-indicator">Tu Sei • Pagina ${p.pageNumber}</div>`;
                if (p.chapterTitle) chContent += `<h3 style="font-weight:bold; margin-top:15px; font-size:13px; color:#0b2240;">Capitolo: ${escapeXml(p.chapterTitle)}</h3>`;
                chContent += formatToBookHtml(p.content, idx === 0);
              });

              chContent += `<h2 style="font-size:16px; border-bottom:1px solid #111; padding-bottom:4px; margin-top:40px; color:#0b2240; font-family:sans-serif;">Saggio III: Archetipi, Simboli e Sincronicità Vol. I</h2>`;
              archetipiSimboliPages.forEach((p, idx) => {
                chContent += `<div class="page-indicator">Archetipi &amp; Simboli • Pagina ${p.pageNumber}</div>`;
                if (p.chapterTitle) chContent += `<h3 style="font-weight:bold; margin-top:15px; font-size:13px; color:#0b2240;">Capitolo: ${escapeXml(p.chapterTitle)}</h3>`;
                chContent += formatToBookHtml(p.content, idx === 0);
              });

              chContent += `<h2 style="font-size:16px; border-bottom:1px solid #111; padding-bottom:4px; margin-top:40px; color:#0b2240; font-family:sans-serif;">Saggio IV: Archetipi, Simboli e Sincronicità Vol. III</h2>`;
              archetipiVol3Pages.forEach((p, idx) => {
                chContent += `<div class="page-indicator">Volume III • Pagina ${p.pageNumber}</div>`;
                if (p.chapterTitle) chContent += `<h3 style="font-weight:bold; margin-top:15px; font-size:13px; color:#0b2240;">Capitolo: ${escapeXml(p.chapterTitle)}</h3>`;
                chContent += formatToBookHtml(p.content, idx === 0);
              });

              chContent += `<h2 style="font-size:16px; border-bottom:1px solid #111; padding-bottom:4px; margin-top:40px; color:#0b2240; font-family:sans-serif;">Saggio V: Mythos, Spazio e Tempo</h2>`;
              mythosSpazioPages.forEach((p, idx) => {
                chContent += `<div class="page-indicator">Mythos • Pagina ${p.pageNumber}</div>`;
                if (p.chapterTitle) chContent += `<h3 style="font-weight:bold; margin-top:15px; font-size:13px; color:#0b2240;">Capitolo: ${escapeXml(p.chapterTitle)}</h3>`;
                chContent += formatToBookHtml(p.content, idx === 0);
              });

              chContent += `</div>`;
              chapters.push({ id: 'chapter-books', title: 'DIPARTIMENTO VI: Antologia dei Libri SBN', filename: 'chapter_books.xhtml', content: chContent });
            }

            if (includeTvShows) {
              let chContent = `<div class="chapter-container">
<h1 style="text-align:center; font-size: 22px; color: #0b2240; font-family: sans-serif;">DIPARTIMENTO VII • PALINSESTI ED INCHIESTE RA2</h1>
<h2 style="text-align:center; font-style:italic; font-size:14px; color:#555;">Reportage, Rai, Mediaset Italia 1, Shark Tank e Fisica</h2>
<div style="text-align:center; margin:15px 0; font-size:18px;">❦</div>`;
              TV_DOC_SHOWS.forEach(tv => {
                chContent += `<div style="border-left:3px solid #ffcc00; padding-left:12px; margin-bottom:15px; page-break-inside: avoid;">`;
                chContent += `<h4 style="margin:0 0 4px 0; font-family:sans-serif; font-size:13px; color:#b45309;">Puntata #${tv.num}: ${escapeXml(tv.title)} (${tv.year})</h4>`;
                chContent += `<p style="text-indent:0; font-size:11px; color:#555; margin:0 0 4px 0;"><strong>Canale / Palinsesto:</strong> ${escapeXml(tv.topics)}</p>`;
                chContent += `<p style="text-indent:0; font-size:12px;">${escapeXml(tv.description)}</p>`;
                chContent += `</div>`;
              });
              chContent += `<h3 style="margin-top:25px; border-top:1px solid #ccc; padding-top:15px; color:#0b2240; font-family:sans-serif;">Documentari Universitari di Fisica Nucleare</h3>`;
              DOCUMENTARY_SERIES_EPISODES.forEach(ep => {
                chContent += `<div style="margin-bottom:15px;">`;
                chContent += `<h4 style="margin:0; font-family:sans-serif; font-size:12.5px; color:#0b2240;">Episodio ${ep.num}: ${escapeXml(ep.title)}</h4>`;
                chContent += `<p style="text-indent:0; font-size:12px; color:#444; margin-top:4px;">${escapeXml(ep.description)}</p>`;
                chContent += `</div>`;
              });
              chContent += `</div>`;
              chapters.push({ id: 'chapter-tv', title: 'DIPARTIMENTO VII: Reportages TV, Rai e Fisica Coerente', filename: 'chapter_tv.xhtml', content: chContent });
            }

            chapters.forEach(ch => {
              const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it">
<head>
  <title>${escapeXml(ch.title)}</title>
  <link rel="stylesheet" href="stylesheet.css" type="text/css" />
</head>
<body>
  ${ch.content}
</body>
</html>`;
              oebps.file(ch.filename, xhtml);

              manifestEntries += `    <item id="${ch.id}" href="${ch.filename}" media-type="application/xhtml+xml"/>\n`;
              spineEntries += `    <itemref idref="${ch.id}" />\n`;
              navMapXml += `    <navPoint id="nav-${ch.id}" playOrder="${playOrder++}">\n      <navLabel><text>${escapeXml(ch.title)}</text></navLabel>\n      <content src="${ch.filename}"/>\n    </navPoint>\n`;
              tocBody += `    <div class="toc-item" style="margin: 10px 0;"><a href="${ch.filename}" style="text-decoration:none; color:#0066cc; font-weight:bold; font-size:13.5px;">${escapeXml(ch.title)}</a></div>\n`;
            });

            let tocXhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="it">
<head>
  <title>Indice dell'Opera</title>
  <link rel="stylesheet" href="stylesheet.css" type="text/css" />
</head>
<body>
  <div class="toc-container" style="padding:15px; font-family: sans-serif;">
    <h1 class="toc-title" style="text-align:center; font-size:20px; font-family:sans-serif; text-transform:uppercase; color:#0b2240; margin-bottom:5px;">INDICE DELL&#39;ANTOLOGIA</h1>
    <div style="text-align:center; font-size:13px; color:#555; margin-bottom:20px; font-style:italic;">Struttura sistematica del compendio accademico</div>
    <hr style="border:0; border-top:1px solid #111; margin:15px 0;"/>
    <div class="toc-list" style="margin-top:20px; font-family:sans-serif; line-height:1.8;">
      ${tocBody}
    </div>
  </div>
</body>
</html>`;
            oebps.file('toc.xhtml', tocXhtml);

            let stylesheetStyles = `body {
  font-family: 'Times New Roman', Georgia, serif;
  margin: 20px;
  line-height: 1.6;
  color: #111111;
  background-color: #ffffff;
}
h1, h2, h3, h4 {
  color: #0b2240;
  font-family: Helvetica, Arial, sans-serif;
  page-break-after: avoid;
}
h1 {
  font-size: 22px;
  text-transform: uppercase;
  margin-top: 25px;
  margin-bottom: 8px;
  text-align: center;
}
h2 {
  font-size: 15px;
  font-weight: normal;
  font-style: italic;
  margin-top: 5px;
  text-align: center;
}
h3 {
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 3px;
  margin-top: 30px;
}
p {
  text-align: justify;
  text-indent: 1.5em;
  margin-top: 0;
  margin-bottom: 8px;
}
p.capocapo {
  text-indent: 0;
  font-weight: bold;
}
.page-indicator {
  text-align: center;
  font-size: 10px;
  font-family: monospace;
  color: #777;
  border-bottom: 1px dashed #eee;
  padding-bottom: 4px;
  margin-top: 35px;
  margin-bottom: 15px;
}
.chapter-container {
  page-break-before: always;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}
th, td {
  border: 1px solid #ddd;
  padding: 6px;
  font-size: 11px;
}`;
            oebps.file('stylesheet.css', stylesheetStyles);

            let opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="2.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${escapeXml(coverTitle)}</dc:title>
    <dc:creator opf:role="aut">Luca Falace</dc:creator>
    <dc:language>it</dc:language>
    <dc:publisher>Fondazione Falace AIC &amp; O.R.O. Edizioni</dc:publisher>
    <dc:identifier id="BookId">urn:uuid:falace-opera-omnia-${ebookFormat}</dc:identifier>
  </metadata>
  <manifest>
    ${manifestEntries}
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
  </manifest>
  <spine toc="ncx">
    ${spineEntries}
  </spine>
</package>`;
            oebps.file('content.opf', opf);

            let ncx = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE ncx PUBLIC "-//NISO//DTD NCX 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="urn:uuid:falace-opera-omnia-${ebookFormat}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${escapeXml(coverTitle)}</text>
  </docTitle>
  <navMap>
    ${navMapXml}
  </navMap>
</ncx>`;
            oebps.file('toc.ncx', ncx);
          }

          setCompileProgress(95);
          const epubBlob = await zip.generateAsync({ type: 'blob', mimeType: 'application/epub+zip' });
          const url = URL.createObjectURL(epubBlob);
          setEbookBlobUrl(url);
          setCompileProgress(100);
          setIsCompiling(false);
          setDownloadReady(true);
        } catch (err) {
          console.error("Error generating EPUB ZIP file:", err);
          setIsCompiling(false);
        }
        return;
      }

      if (ebookFormat === 'pdf') {
        try {
          const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          });

          let currentPageNumber = 1;
          const marginX = 20;
          const marginTop = 25;
          const marginBottom = 25;
          const pageHeight = 297;
          const pageWidth = 210;
          const contentWidth = pageWidth - (2 * marginX);
          let y = marginTop;

          const addPageDecoration = (pageNum: number) => {
            if (pageNum > 1) {
              doc.setDrawColor(200, 200, 200);
              doc.setLineWidth(0.2);
              doc.line(20, 14, 190, 14);
              
              doc.setFont("helvetica", "italic");
              doc.setFontSize(8);
              doc.setTextColor(100, 100, 100);
              doc.text("FONDAZIONE LUCA FALACE AIC • OPERA OMNIA", 20, 11);
              
              doc.line(20, 282, 190, 282);
              
              doc.setFont("helvetica", "normal");
              doc.setFontSize(8);
              doc.setTextColor(100, 100, 100);
              doc.text(`Pagina ${pageNum}`, 190, 287, { align: 'right' });
              doc.text("Proprieta Intellettuale Depositata (2005 - 2026)", 20, 287);
            }
          };

          const checkNewPageNeeded = (lineHeight: number) => {
            if (y + lineHeight > pageHeight - marginBottom) {
              doc.addPage();
              currentPageNumber++;
              addPageDecoration(currentPageNumber);
              y = marginTop;
            }
          };

          const printParagraph = (text: string, isFirst = false, isTitle = false, isSubtitle = false) => {
            if (isTitle) {
              doc.setFont("helvetica", "bold");
              doc.setFontSize(14);
              doc.setTextColor(11, 34, 64);
              const lines = doc.splitTextToSize(text, contentWidth);
              const titleHeight = lines.length * 7;
              checkNewPageNeeded(titleHeight + 6);
              y += 4;
              lines.forEach((line: string) => {
                doc.text(line, marginX, y);
                y += 7;
              });
              y += 3;
              return;
            }
            
            if (isSubtitle) {
              doc.setFont("helvetica", "italic");
              doc.setFontSize(11);
              doc.setTextColor(85, 85, 85);
              const lines = doc.splitTextToSize(text, contentWidth);
              const subHeight = lines.length * 5.5;
              checkNewPageNeeded(subHeight + 4);
              lines.forEach((line: string) => {
                doc.text(line, marginX, y);
                y += 5.5;
              });
              y += 5;
              return;
            }
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(20, 20, 20);
            
            const textLines = doc.splitTextToSize(text, contentWidth);
            const textHeight = textLines.length * 5.2;
            
            checkNewPageNeeded(textHeight + 4);
            
            textLines.forEach((line: string) => {
              checkNewPageNeeded(5.2);
              doc.text(line, marginX, y);
              y += 5.2;
            });
            
            y += 3.5;
          };

          // COVER PAGE
          doc.setDrawColor(11, 34, 64);
          doc.setLineWidth(1);
          doc.rect(15, 15, 180, 267);
          doc.setLineWidth(0.3);
          doc.rect(17, 17, 176, 263);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(10);
          doc.setTextColor(0, 102, 204);
          doc.text("FONDAZIONE LUCA FALACE AIC", pageWidth / 2, 45, { align: "center" });

          doc.setFont("helvetica", "bold");
          doc.setFontSize(28);
          doc.setTextColor(11, 34, 64);
          doc.text("OPERA OMNIA", pageWidth / 2, 85, { align: "center" });

          doc.setFont("helvetica", "bold");
          doc.setFontSize(24);
          doc.text("ANTOLOGIA", pageWidth / 2, 100, { align: "center" });

          doc.setFont("helvetica", "italic");
          doc.setFontSize(12);
          doc.setTextColor(85, 85, 85);
          doc.text("Compendio e Registro Storico Accademico delle Scienze e delle Arti", pageWidth / 2, 120, { align: "center" });

          doc.setDrawColor(0, 102, 204);
          doc.setLineWidth(0.5);
          doc.line(80, 140, 130, 140);

          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text("Autore Originario: Dott. Luca Falace", pageWidth / 2, 165, { align: "center" });

          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(100, 100, 100);
          doc.text("Proprieta Intellettuale Depositata 2005 - 2026", pageWidth / 2, 180, { align: "center" });

          doc.setFont("helvetica", "bold");
          doc.setFontSize(9);
          doc.setTextColor(11, 34, 64);
          doc.text("COMPATIBILE CATALOGO OPAC SBN - SIAE OLAF - UIBM", pageWidth / 2, 240, { align: "center" });

          // INDEX PAGE (Page 2)
          doc.addPage();
          currentPageNumber++;
          addPageDecoration(currentPageNumber);

          y = marginTop;
          printParagraph("INDICE DELL'ANTOLOGIA", false, true);
          printParagraph("Struttura sistematica del compendio accademico", false, false, true);
          y += 5;

          let indexNum = 1;
          if (includeBio) {
            printParagraph(`${indexNum++}. DIPARTIMENTO I • BIOGRAFIA INTELLETTUALE`, false, false, false);
          }
          if (includeHistory) {
            printParagraph(`${indexNum++}. DIPARTIMENTO II • ATTO COSTITUTIVO E STORICO`, false, false, false);
          }
          if (includeTheory) {
            printParagraph(`${indexNum++}. DIPARTIMENTO III • TEORIA COERENTE E SINCRONICITÀ`, false, false, false);
          }
          if (includePatents) {
            printParagraph(`${indexNum++}. DIPARTIMENTO IV • REGISTRO BREVETTI D'INGEGNO`, false, false, false);
          }
          if (includeArt) {
            printParagraph(`${indexNum++}. DIPARTIMENTO V • CATALOGO GENERALE DELL'ARTE`, false, false, false);
          }
          if (includeSbnTexts) {
            printParagraph(`${indexNum++}. DIPARTIMENTO VI • MONOGRAFIE E TESTI SBN`, false, false, false);
          }
          if (includeTvShows) {
            printParagraph(`${indexNum++}. DIPARTIMENTO VII • PALINSESTI ED INCHIESTE RAI E FISICA`, false, false, false);
          }

          // DIPARTIMENTO I (Biography)
          if (includeBio) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO I • BIOGRAFIA INTELLETTUALE", false, true);
            printParagraph("Biografia Scolastica Certificata di Luca Falace", false, false, true);
            y += 5;

            BIOGRAFIA_PAGES.forEach((page) => {
              checkNewPageNeeded(20);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(9);
              doc.setFillColor(240, 240, 240);
              doc.rect(marginX, y, contentWidth, 6, "F");
              doc.setTextColor(100, 100, 100);
              doc.text(`Dipartimento I • Biografia Pagina ${page.pageNumber}`, marginX + 2, y + 4.5);
              y += 10;
              
              const paragraphs = page.content.split(/\r?\n\s*\r?\n+/).map(p => p.trim()).filter(p => p.length > 0);
              paragraphs.forEach((p, pIdx) => {
                printParagraph(p, pIdx === 0);
              });
              y += 5;
            });
          }

          // DIPARTIMENTO II (History)
          if (includeHistory) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO II • ATTO COSTITUTIVO E STORICO", false, true);
            printParagraph("Atto Notarile, Statuto e Archivio Cronologico Istituzionale", false, false, true);
            y += 5;

            ARCHIVIO_STORICO_PAGES.forEach((page) => {
              checkNewPageNeeded(20);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(9);
              doc.setFillColor(240, 240, 240);
              doc.rect(marginX, y, contentWidth, 6, "F");
              doc.setTextColor(100, 100, 100);
              doc.text(`Dipartimento II • Cronologia Pagina ${page.pageNumber}`, marginX + 2, y + 4.5);
              y += 10;
              
              const paragraphs = page.content.split(/\r?\n\s*\r?\n+/).map(p => p.trim()).filter(p => p.length > 0);
              paragraphs.forEach((p, pIdx) => {
                printParagraph(p, pIdx === 0);
              });
              y += 5;
            });
          }

          // DIPARTIMENTO III (Theory)
          if (includeTheory) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO III • TEORIA COERENTE E SINCRONICITÀ", false, true);
            printParagraph("Metodo e Livelli del Sincronismo Scientifico", false, false, true);
            y += 5;

            printParagraph("Formula Energetica della Sincronicita", false, false, false);
            
            checkNewPageNeeded(22);
            doc.setFillColor(248, 249, 250);
            doc.setDrawColor(220, 224, 230);
            doc.setLineWidth(0.3);
            doc.rect(marginX, y, contentWidth, 18, "FD");
            doc.setFont("courier", "bold");
            doc.setFontSize(14);
            doc.setTextColor(11, 34, 64);
            doc.text(SYNCHRONICITY_THEORY.scientific_formula, pageWidth / 2, y + 11.5, { align: "center" });
            y += 24;
            
            const theoryPars = SYNCHRONICITY_THEORY.description_it.split(/\r?\n\s*\r?\n+/).map(p => p.trim()).filter(p => p.length > 0);
            theoryPars.forEach((p) => {
              printParagraph(p);
            });
            
            y += 5;
            printParagraph("Metodo Generale dei Nove Livelli", false, true);
            SYNCHRONICITY_THEORY.levels.forEach((lvl) => {
              checkNewPageNeeded(25);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10.5);
              doc.setTextColor(0, 102, 204);
              doc.text(`Livello ${lvl.num}: ${lvl.title}`, marginX, y);
              y += 6;
              
              doc.setFont("helvetica", "italic");
              doc.setFontSize(9.5);
              doc.setTextColor(80, 80, 80);
              const lines = doc.splitTextToSize(`Relazione: ${lvl.description}`, contentWidth);
              lines.forEach((line: string) => {
                checkNewPageNeeded(5);
                doc.text(line, marginX, y);
                y += 5;
              });
              y += 4;
            });
          }

          // DIPARTIMENTO IV (Patents)
          if (includePatents) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO IV • REGISTRO BREVETTI D'INGEGNO", false, true);
            printParagraph("Tutela dell'Anteriorita ed Hardware d'Invenzione (UIBM)", false, false, true);
            y += 5;

            printParagraph("Brevetti Luca Falace", false, true);
            
            INVENTIONS_CATALOG.forEach((inv) => {
              checkNewPageNeeded(30);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10.5);
              doc.setTextColor(0, 102, 204);
              doc.text(`Brevetto #${inv.number}: ${inv.title} (${inv.year})`, marginX, y);
              y += 5.5;
              
              doc.setFont("helvetica", "bold");
              doc.setFontSize(8.5);
              doc.setTextColor(100, 100, 100);
              doc.text(`Stato: ${inv.status} | UIBM Patent: ${inv.patentNum || 'DEPOSITATO'}`, marginX, y);
              y += 5.5;
              
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9.5);
              doc.setTextColor(50, 50, 50);
              const descLines = doc.splitTextToSize(inv.description, contentWidth);
              descLines.forEach((line: string) => {
                checkNewPageNeeded(5);
                doc.text(line, marginX, y);
                y += 4.8;
              });
              y += 2;
              
              const detailLines = doc.splitTextToSize(`Dettaglio: ${inv.details}`, contentWidth - 4);
              const detailBoxHeight = (detailLines.length * 3.8) + 4;
              checkNewPageNeeded(detailBoxHeight + 4);
              doc.setFillColor(250, 250, 250);
              doc.setDrawColor(240, 240, 240);
              doc.rect(marginX, y, contentWidth, detailBoxHeight, "FD");
              let detailY = y + 3.5;
              detailLines.forEach((line: string) => {
                doc.text(line, marginX + 2, detailY);
                detailY += 3.8;
              });
              y += detailBoxHeight + 6;
            });
            
            y += 5;
            checkNewPageNeeded(40);
            printParagraph("Eredita Brevettuale della Famiglia - Lucio Falace (46 Brevetti d'Ingegno)", false, true);
            
            LUCIO_FALACE_PATENTS.forEach((pat) => {
              checkNewPageNeeded(12);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(9.5);
              doc.setTextColor(11, 34, 64);
              doc.text(`${pat.num}. ${pat.title} (${pat.year})`, marginX, y);
              y += 4.5;
              
              doc.setFont("helvetica", "normal");
              doc.setFontSize(8.5);
              doc.setTextColor(100, 100, 100);
              doc.text(`Codice: ${pat.code} | Ufficio: ${pat.office}`, marginX, y);
              y += 6;
            });

            y += 5;
            checkNewPageNeeded(30);
            printParagraph("Opere Artistiche Familiari - Paolo Falace", false, true);
            PAOLO_FALACE_WORKS.forEach((w, wIdx) => {
              checkNewPageNeeded(15);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(9.5);
              doc.setTextColor(11, 34, 64);
              doc.text(`${wIdx + 1}. ${w.title} (${w.year})`, marginX, y);
              y += 4.5;
              
              doc.setFont("helvetica", "normal");
              doc.setFontSize(8.5);
              doc.setTextColor(100, 100, 100);
              doc.text(`Tipologia: ${w.type} | Dettagli: ${w.details}`, marginX, y);
              y += 6;
            });
          }

          // DIPARTIMENTO V (Artworks)
          if (includeArt) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO V • CATALOGO GENERALE DELL'ARTE", false, true);
            printParagraph("Registro Generale delle Opere Esposte e Curatele Poetiche", false, false, true);
            y += 5;

            ARTWORKS_CATALOG.forEach((art) => {
              checkNewPageNeeded(25);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10.5);
              doc.setTextColor(11, 34, 64);
              doc.text(`${art.title} (${art.year})`, marginX, y);
              y += 5;
              
              doc.setFont("helvetica", "bold");
              doc.setFontSize(8.5);
              doc.setTextColor(0, 102, 204);
              doc.text(`Tipologia: ${art.category} | Sede: ${art.venue}`, marginX, y);
              y += 5;
              
              doc.setFont("helvetica", "italic");
              doc.setFontSize(9.5);
              doc.setTextColor(80, 80, 80);
              const lines = doc.splitTextToSize(art.description, contentWidth);
              lines.forEach((line: string) => {
                checkNewPageNeeded(4.8);
                doc.text(line, marginX, y);
                y += 4.8;
              });
              y += 5;
            });
          }

          // DIPARTIMENTO VI (SBN Books)
          if (includeSbnTexts) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO VI • MONOGRAFIE E TESTI SBN", false, true);
            printParagraph("Antologia Letteraria di Saggi e Romanzi dell'Autore", false, false, true);
            y += 5;

            const saggi = [
              { title: "Saggio I: L'Opera Celeste - Romanzo Alchemico Filosofico", pages: operaCelestePages },
              { title: "Saggio II: Tu Sei (Coincidenze, Sincronicita, Sincronismi)", pages: tuSeiPages },
              { title: "Saggio III: Archetipi, Simboli e Sincronicita Vol. I", pages: archetipiSimboliPages },
              { title: "Saggio IV: Archetipi, Simboli e Sincronicita Vol. III", pages: archetipiVol3Pages },
              { title: "Saggio V: Mythos, Spazio e Tempo", pages: mythosSpazioPages }
            ];

            saggi.forEach((b) => {
              doc.addPage();
              currentPageNumber++;
              addPageDecoration(currentPageNumber);
              y = marginTop;

              printParagraph(b.title, false, true);
              y += 5;

              b.pages.forEach((page, pIdx) => {
                checkNewPageNeeded(20);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(8.5);
                doc.setTextColor(120, 120, 120);
                doc.text(`Volume Pagina ${page.pageNumber}`, marginX, y);
                y += 4.5;

                if (page.chapterTitle) {
                  doc.setFont("helvetica", "bold");
                  doc.setFontSize(10);
                  doc.setTextColor(11, 34, 64);
                  doc.text(`Capitolo: ${page.chapterTitle}`, marginX, y);
                  y += 6;
                }

                const paragraphs = page.content.split(/\r?\n\s*\r?\n+/).map(p => p.trim()).filter(p => p.length > 0);
                paragraphs.forEach((p, idx) => {
                  printParagraph(p, idx === 0);
                });
                y += 5;
              });
            });
          }

          // DIPARTIMENTO VII (TV documentaries)
          if (includeTvShows) {
            doc.addPage();
            currentPageNumber++;
            addPageDecoration(currentPageNumber);
            y = marginTop;
            
            printParagraph("DIPARTIMENTO VII • PALINSESTI ED INCHIESTE RAI", false, true);
            printParagraph("Reportage, Rai, Mediaset Italia 1, Shark Tank e Fisica", false, false, true);
            y += 5;

            TV_DOC_SHOWS.forEach((tv) => {
              checkNewPageNeeded(25);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10.5);
              doc.setTextColor(180, 80, 0);
              doc.text(`Puntata #${tv.num}: ${tv.title} (${tv.year})`, marginX, y);
              y += 5;
              
              doc.setFont("helvetica", "bold");
              doc.setFontSize(8.5);
              doc.setTextColor(100, 100, 100);
              doc.text(`Canale: ${tv.topics}`, marginX, y);
              y += 5;
              
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9.5);
              doc.setTextColor(55, 55, 55);
              const lines = doc.splitTextToSize(tv.description, contentWidth);
              lines.forEach((line: string) => {
                checkNewPageNeeded(4.8);
                doc.text(line, marginX, y);
                y += 4.8;
              });
              y += 5;
            });
            
            y += 5;
            printParagraph("Documentari Universitari di Fisica Nucleare", false, true);
            DOCUMENTARY_SERIES_EPISODES.forEach((ep) => {
              checkNewPageNeeded(20);
              doc.setFont("helvetica", "bold");
              doc.setFontSize(10);
              doc.setTextColor(11, 34, 64);
              doc.text(`Episodio ${ep.num}: ${ep.title}`, marginX, y);
              y += 5;
              
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9.5);
              doc.setTextColor(55, 55, 55);
              const lines = doc.splitTextToSize(ep.description, contentWidth);
              lines.forEach((line: string) => {
                checkNewPageNeeded(4.8);
                doc.text(line, marginX, y);
                y += 4.8;
              });
              y += 5;
            });
          }

          setCompileProgress(95);
          const pdfBlob = doc.output('blob');
          const url = URL.createObjectURL(pdfBlob);
          setEbookBlobUrl(url);
          setCompileProgress(100);
          setIsCompiling(false);
          setDownloadReady(true);
        } catch (err) {
          console.error("Error generating vector PDF:", err);
          setIsCompiling(false);
        }
        return;
      }

      if (ebookFormat === 'txt') {
        mimeType = 'text/plain;charset=utf-8';
        extension = 'txt';
        
        let txt = '';
        txt += `================================================================================\n`;
        txt += `                             OPERA OMNIA ANTOLOGIA\n`;
        txt += `                 Compendio e Antologia della Fondazione Falace\n`;
        txt += `         Scienza, Arte e l'Ingegno del Sincronismo Creativo (2005 - 2026)\n`;
        txt += `================================================================================\n\n`;
        txt += `Autore: Luca Falace\n`;
        txt += `Editore Catalogatore: Fondazione Falace AIC & O.R.O. Edizioni\n`;
        txt += `Certificazione: OPAC SBN - UIBM - CERN Zenodo DOI\n`;
        txt += `Contatti Istituzionali: Dott.LucaFalace@gmail.com\n\n`;
        txt += `---------------------------------------------------------\n`;
        txt += `INDICE DELL'ANTOLOGIA\n`;
        txt += `---------------------------------------------------------\n`;
        let idxNum = 1;
        if (includeBio) txt += `${idxNum++}. DIPARTIMENTO I: BIOGRAFIA CERTIFICATA DI LUCA FALACE\n`;
        if (includeHistory) txt += `${idxNum++}. DIPARTIMENTO II: ATTO NOTARILE E CRONOLOGIA STORICA ISTITUZIONALE\n`;
        if (includeTheory) txt += `${idxNum++}. DIPARTIMENTO III: FORMULE E LIVELLI DI SINCRONICITÀ SCIENTIFICA\n`;
        if (includePatents) txt += `${idxNum++}. DIPARTIMENTO IV: REGISTRO DEI BREVETTI D'INGEGNO (LUCA E LUCIO FALACE)\n`;
        if (includeArt) txt += `${idxNum++}. DIPARTIMENTO V: CATALOGO DELL'ARTE CONTEMPORANEA E MULTIMEDIALE\n`;
        if (includeSbnTexts) txt += `${idxNum++}. DIPARTIMENTO VI: CATALOGO DEI LIBRI E TESTI DELLE ANTEPRIME SBN\n`;
        if (includeTvShows) txt += `${idxNum++}. DIPARTIMENTO VII: REPORT TELEVISIVI, SHARK TANK, RAI E DOCUMENTARI\n`;
        txt += `\n================================================================================\n\n\n`;

        if (includeBio) {
          txt += `DIPARTIMENTO I: BIOGRAFIA CERTIFICATA DI LUCA FALACE\n`;
          txt += `====================================================\n\n`;
          BIOGRAFIA_PAGES.forEach(page => {
            txt += `--- Pagina ${page.pageNumber} ---\n`;
            txt += `${page.content}\n\n`;
          });
          txt += `\n\n`;
        }

        if (includeHistory) {
          txt += `DIPARTIMENTO II: ATTO NOTARILE E CRONOLOGIA STORICA ISTITUZIONALE\n`;
          txt += `================================================================\n\n`;
          ARCHIVIO_STORICO_PAGES.forEach(page => {
            txt += `--- Registro Storico Pagina ${page.pageNumber} ---\n`;
            txt += `${page.content}\n\n`;
          });
          txt += `\n\n`;
        }

        if (includeTheory) {
          txt += `DIPARTIMENTO III: FORMULE E LIVELLI DI SINCRONICITÀ SCIENTIFICA\n`;
          txt += `================================================================\n\n`;
          txt += `Formula Generale: ${SYNCHRONICITY_THEORY.scientific_formula}\n`;
          txt += `Descrizione Matematica: ${SYNCHRONICITY_THEORY.description_it}\n\n`;
          txt += `I 9 LIVELLI DEL METODO DEL SINCRONISMO CREATIVO:\n\n`;
          SYNCHRONICITY_THEORY.levels.forEach(lvl => {
            txt += `Livello ${lvl.num}: ${lvl.title}\n`;
            txt += `Relazione: ${lvl.description}\n`;
            txt += `---------------------------------------------------------\n\n`;
          });
          txt += `\n\n`;
        }

        if (includePatents) {
          txt += `DIPARTIMENTO IV: REGISTRO DEI BREVETTI D'INGEGNO (LUCA E LUCIO FALACE)\n`;
          txt += `=====================================================================\n\n`;
          txt += `I BREVETTI DI LUCA FALACE IN UIBM:\n`;
          INVENTIONS_CATALOG.forEach(inv => {
            txt += `• Brevetto #${inv.number}: ${inv.title} (${inv.year})\n`;
            txt += `  Stato: ${inv.status} - Codice: ${inv.patentNum || 'DEPOSITATO'}\n`;
            txt += `  Descrizione: ${inv.description}\n`;
            txt += `  Dettagli Tecnici: ${inv.details}\n\n`;
          });
          txt += `\nCOERENZA DI EREDITÀ FAMILIARE - I 46 BREVETTI DI LUCIO FALACE:\n`;
          LUCIO_FALACE_PATENTS.forEach(pat => {
            txt += `[${pat.num}] Brevetto: ${pat.code} - ${pat.title} - Ufficio: ${pat.office} (${pat.year})\n`;
          });
          txt += `\n\n`;
        }

        if (includeArt) {
          txt += `DIPARTIMENTO V: CATALOGO DELL'ARTE CONTEMPORANEA E MULTIMEDIALE (MiBAC)\n`;
          txt += `======================================================================\n\n`;
          ARTWORKS_CATALOG.forEach(art => {
            txt += `• Titolo: ${art.title} (${art.year})\n`;
            txt += `  Categoria: ${art.category} - Esposta a: ${art.venue}\n`;
            txt += `  Descrizione: ${art.description}\n\n`;
          });
          txt += `\n\n`;
        }

        if (includeSbnTexts) {
          txt += `DIPARTIMENTO VI: CATALOGO DEI LIBRI E TESTI DELLE ANTEPRIME SBN\n`;
          txt += `==============================================================\n\n`;
          txt += `Saggio 1: L'Opera Celeste - Romanzo Alchemico Filosofico (Anteprima)\n`;
          operaCelestePages.forEach(p => {
            txt += `[Pagina ${p.pageNumber}] ${p.chapterTitle ? p.chapterTitle + '\n' : ''}${p.content}\n\n`;
          });
          txt += `\nSaggio 2: Tu Sei - Sincronismi, Coincidenze, Sincronicità (Anteprima)\n`;
          tuSeiPages.forEach(p => {
            txt += `[Pagina ${p.pageNumber}] ${p.chapterTitle ? p.chapterTitle + '\n' : ''}${p.content}\n\n`;
          });
          txt += `\nSaggio 3: Archetipi, Simboli e Sincronicità (Anteprima)\n`;
          archetipiSimboliPages.forEach(p => {
            txt += `[Pagina ${p.pageNumber}] ${p.chapterTitle ? p.chapterTitle + '\n' : ''}${p.content}\n\n`;
          });
          txt += `\nSaggio 4: Archetipi, Simboli, Sincronicità Vol. III (Anteprima)\n`;
          archetipiVol3Pages.forEach(p => {
            txt += `[Pagina ${p.pageNumber}] ${p.chapterTitle ? p.chapterTitle + '\n' : ''}${p.content}\n\n`;
          });
          txt += `\nSaggio 5: Mythos, Spazio e Tempo (Anteprima)\n`;
          mythosSpazioPages.forEach(p => {
            txt += `[Pagina ${p.pageNumber}] ${p.chapterTitle ? p.chapterTitle + '\n' : ''}${p.content}\n\n`;
          });
          txt += `\n\n`;
        }

        if (includeTvShows) {
          txt += `DIPARTIMENTO VII: REPORT TELEVISIVI, SHARK TANK, RAI E DOCUMENTARI\n`;
          txt += `==================================================================\n\n`;
          txt += `PARTECIPAZIONI DOCUMENTATE SU RA2 E MEDIASET:\n`;
          TV_DOC_SHOWS.forEach(tv => {
            txt += `• Episodio #${tv.num}: ${tv.title} (${tv.year})\n`;
            txt += `  Tag: ${tv.topics}\n`;
            txt += `  Descrizione: ${tv.description}\n`;
            txt += `  Documento Google/YouTube Link: ${tv.youtubeUrl}\n\n`;
          });
          txt += `\nI DOCUMENTARI SULLA FISICA ATOMICA DI SOLVAY:\n`;
          DOCUMENTARY_SERIES_EPISODES.forEach(ep => {
            txt += `• Episodio ${ep.num}: ${ep.title}\n`;
            txt += `  Trama del Report: ${ep.description}\n\n`;
          });
        }
        
        txt += `\n\n\n--- Fine Antologia dei Documenti Istituzionali Fondazione Falace ---\n`;
        finalString = txt;
      } else if (ebookFormat === 'docx') {
        mimeType = 'application/msword;charset=utf-8';
        extension = 'doc';

        let html = '';
        html += `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\n`;
        html += `<head>\n  <meta charset="utf-8">\n  <title>OPERA OMNIA - Fondazione Falace - Edizione Word</title>\n`;
        html += `  <!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:Zoom>90</w:Zoom></w:WordDocument></xml><![endif]-->\n`;
        html += `  <style>\n`;
        html += `    @page {\n      size: 21.0cm 29.7cm;\n      margin: 2.5cm 2.0cm 2.5cm 2.0cm;\n    }\n`;
        html += `    body {\n      font-family: "Georgia", "Times New Roman", serif;\n      font-size: 11pt;\n      line-height: 1.5;\n      color: #000000;\n    }\n`;
        html += `    h1 {\n      font-family: "Georgia", serif;\n      font-size: 22pt;\n      color: #0B2240;\n      text-align: center;\n      margin-top: 40px;\n      margin-bottom: 20px;\n    }\n`;
        html += `    h2 {\n      font-family: "Georgia", serif;\n      font-size: 16pt;\n      color: #0B2240;\n      border-bottom: 1px solid #0B2240;\n      padding-bottom: 4px;\n      margin-top: 30px;\n      margin-bottom: 15px;\n    }\n`;
        html += `    h3 {\n      font-family: "Georgia", serif;\n      font-size: 13pt;\n      color: #0066CC;\n      margin-top: 20px;\n      margin-bottom: 10px;\n    }\n`;
        html += `    p {\n      margin-bottom: 12px;\n      text-align: justify;\n    }\n`;
        html += `    .mso-page-break {\n      page-break-before: always;\n    }\n`;
        html += `    .cover-pane {\n      text-align: center;\n      padding: 100px 40px;\n      border: 3px double #0066CC;\n    }\n`;
        html += `    .header-logo {\n      font-family: "Courier New", monospace;\n      font-size: 9pt;\n      font-weight: bold;\n      color: #0066CC;\n    }\n`;
        html += `    .card {\n      border: 1px solid #D0D0D0;\n      padding: 15px;\n      margin-bottom: 15px;\n      background-color: #FDFDFD;\n    }\n`;
        html += `    .table-word {\n      width: 100%;\n      border-collapse: collapse;\n      margin-top: 15px;\n    }\n`;
        html += `    .table-word th, .table-word td {\n      border: 1px solid #000000;\n      padding: 6px 10px;\n      font-size: 10pt;\n      text-align: left;\n    }\n`;
        html += `    .table-word th {\n      background-color: #EFEFEF;\n    }\n`;
        html += `  </style>\n</head>\n<body>\n`;

        // Cover page
        html += `  <div class="cover-pane">\n`;
        html += `    <div class="header-logo">• FONDAZIONE FALACE delle AIC •</div>\n`;
        html += `    <h1 style="font-size: 28pt; margin: 30px 0 10px 0;">OPERA OMNIA COMPLETA</h1>\n`;
        html += `    <h2 style="font-size: 14pt; font-weight: normal; color:#555555; font-style: italic; border-bottom: none; margin-bottom: 50px;">Antologia e Registro Storico-Editoriale delle Arti e delle Scienze</h2>\n`;
        html += `    <p style="font-size: 12pt; text-align: center;">Autore Originario: <strong>Dott. Luca Falace</strong></p>\n`;
        html += `    <p style="font-size: 10pt; text-align: center; color: #666666;">Proprietà Intellettuale Depositata 2005 - 2026</p>\n`;
        html += `    <p style="font-size: 9pt; font-family: monospace; color:#888888; margin-top:120px;">ARCHIVIO DIGITALE COMPATIBILE OPAC SBN - SIAE OLAF - UIBM</p>\n`;
        html += `  </div>\n`;
        html += `  <br class="mso-page-break" />\n`;

        // Table of contents
        html += `  <div style="border: 1px solid #000000; padding: 25px; margin-bottom: 40px;">\n`;
        html += `    <h2 style="text-align: center; border-bottom: 1px solid #000000; margin-top: 0;">INDICE GENERALE DEL VOLUME</h2>\n`;
        let wordChIdx = 1;
        if (includeBio) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> BIOGRAFIA ACCADEMICA CERTIFICATA DI LUCA FALACE</p>\n`;
        if (includeHistory) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> ATTO NOTARILE E CRONOLOGIA STORICA ISTITUZIONALE</p>\n`;
        if (includeTheory) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> EQUAZIONE E LIVELLI SCIENTIFICI DEL SINCRONISMO CREATIVO</p>\n`;
        if (includePatents) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> REGISTRO DEGLI ATTESTATI DI BREVETTO UIBM (LUCA E LUCIO FALACE)</p>\n`;
        if (includeArt) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> CATALOGO GENERALE DELLE OPERE ARTISTICHE ED ESPOSIZIONI</p>\n`;
        if (includeSbnTexts) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> ANTOLOGIA DELLE PUBBLICAZIONI SBN E SAGGI COLLAZIONATI</p>\n`;
        if (includeTvShows) html += `    <p><strong>Dipartimento ${wordChIdx++}:</strong> ARCHIVIO REPORTAGES TELEVISIVI RAI, SHARK TANK E DOCUMENTARI</p>\n`;
        html += `  </div>\n`;
        html += `  <br class="mso-page-break" />\n`;

        // Content
        if (includeBio) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO I • BIOGRAFIA ACCADEMICA CERTIFICATA</h2>\n`;
          BIOGRAFIA_PAGES.forEach((page) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- Biografia Pagina ${page.pageNumber} --</p>\n`;
            html += `    <p style="white-space: pre-wrap;">${page.content}</p>\n`;
          });
          html += `  </div>\n`;
          html += `  <br class="mso-page-break" />\n`;
        }

        if (includeHistory) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO II • ATTO COSTITUTIVO E CRONOLOGIA STORICA</h2>\n`;
          ARCHIVIO_STORICO_PAGES.forEach((page) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- Registro Pagina ${page.pageNumber} --</p>\n`;
            html += `    <p style="white-space: pre-wrap;">${page.content}</p>\n`;
          });
          html += `  </div>\n`;
          html += `  <br class="mso-page-break" />\n`;
        }

        if (includeTheory) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO III • TEORIA SCIENTIFICA DEL SINCRONISMO CREATIVO</h2>\n`;
          html += `    <div class="card">\n`;
          html += `      <h3 style="margin-top: 0; text-align: center;">Equazione Energetica della Sincronicità</h3>\n`;
          html += `      <h1 style="font-size: 24pt; font-family: Courier New, monospace; text-align: center; margin: 15px 0;">${SYNCHRONICITY_THEORY.scientific_formula}</h1>\n`;
          html += `      <p style="font-size: 10pt; line-height: 1.4; color: #333333;">${SYNCHRONICITY_THEORY.description_it}</p>\n`;
          html += `    </div>\n`;
          
          html += `    <h3>La Scala Intenzionale dei Sincronismi (9 Livelli):</h3>\n`;
          SYNCHRONICITY_THEORY.levels.forEach(lvl => {
            html += `    <div style="margin-bottom: 12px;">\n`;
            html += `      <strong>Livello ${lvl.num} • ${lvl.title}</strong>\n`;
            html += `      <p style="margin-top: 4px; font-size: 10.5pt;">${lvl.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
          html += `  <br class="mso-page-break" />\n`;
        }

        if (includePatents) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO IV • REGISTRO BREVETTI D'INGEGNO (UIBM)</h2>\n`;
          INVENTIONS_CATALOG.forEach(inv => {
            html += `    <div class="card">\n`;
            html += `      <strong>Brevetto #${inv.number} • Stato: ${inv.status}</strong>\n`;
            html += `      <h3 style="margin-top: 2px; margin-bottom: 6px;">${inv.title} (${inv.year})</h3>\n`;
            html += `      <p><strong>Codice:</strong> ${inv.patentNum || 'DEPOSITATO'}</p>\n`;
            html += `      <p><strong>Descrizione:</strong> ${inv.description}</p>\n`;
            html += `      <p style="background-color: #F0F0F0; padding: 6px;"><strong>Struttura:</strong> ${inv.details}</p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="margin-top: 30px;">Archivio Brevetti della Famiglia - Ing. Lucio Falace (46 Invenzioni Brevettate):</h3>\n`;
          html += `    <table class="table-word">\n`;
          html += `      <thead>\n        <tr>\n          <th style="width: 8%">N°</th><th style="width: 15%">Codice</th><th style="width: 65%">Descrizione dell'Ingegno Industriale</th><th style="width: 12%">Anno</th>\n        </tr>\n      </thead>\n      <tbody>\n`;
          LUCIO_FALACE_PATENTS.forEach(pat => {
            html += `        <tr>\n          <td style="text-align: center;">${pat.num}</td><td><strong>${pat.code}</strong></td><td>${pat.title}</td><td style="text-align: center;">${pat.year}</td>\n        </tr>\n`;
          });
          html += `      </tbody>\n    </table>\n`;

          html += `    <h3 style="margin-top: 30px;">Opere Familiari dell'Ingegno Creativo - Paolo Falace:</h3>\n`;
          html += `    <table class="table-word">\n`;
          html += `      <thead>\n        <tr>\n          <th style="width: 30%">Titolo dell'Opera</th><th style="width: 20%">Tipologia</th><th style="font-weight: bold;">Dettagli di Paternità Scientifica ed Estetica</th><th style="width: 12%">Anno</th>\n        </tr>\n      </thead>\n      <tbody>\n`;
          PAOLO_FALACE_WORKS.forEach(w => {
            html += `        <tr>\n          <td><strong>${w.title}</strong></td><td>${w.type}</td><td>${w.details}</td><td style="text-align: center;">${w.year}</td>\n        </tr>\n`;
          });
          html += `      </tbody>\n    </table>\n`;
          html += `  </div>\n`;
          html += `  <br class="mso-page-break" />\n`;
        }

        if (includeArt) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO V • CATALOGO GENERALE DELLE OPERE ARTISTICHE</h2>\n`;
          ARTWORKS_CATALOG.forEach(art => {
            html += `    <div class="card">\n`;
            html += `      <strong>${art.category} • Anno ${art.year}</strong>\n`;
            html += `      <h3 style="margin-top: 2px; margin-bottom: 6px;">${art.title}</h3>\n`;
            html += `      <p><strong>Sede Conservativa:</strong> ${art.venue}</p>\n`;
            html += `      <p style="font-style: italic;"><strong>Curatela Estetica:</strong> ${art.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
          html += `  <br class="mso-page-break" />\n`;
        }

        if (includeSbnTexts) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO VI • ANTOLOGIA PUBBLICAZIONI CATALOGATE SBN</h2>\n`;

          html += `    <h3 style="font-size: 15pt; border-bottom: 2px solid #000; margin-top: 20px; padding-bottom: 3px;">Saggio I: L'Opera Celeste</h3>\n`;
          operaCelestePages.forEach((p) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- L'Opera Celeste • Pagina ${p.pageNumber} ${p.chapterTitle ? '• Capitolo: ' + p.chapterTitle : ''} --</p>\n`;
            html += `    <p>${p.content}</p>\n`;
          });

          html += `    <h3 style="font-size: 15pt; border-bottom: 2px solid #000; margin-top: 30px; padding-bottom: 3px;">Saggio II: Tu Sei (Coincidenze e Sincronismi)</h3>\n`;
          tuSeiPages.forEach((p) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- Tu Sei • Pagina ${p.pageNumber} ${p.chapterTitle ? '• Capitolo: ' + p.chapterTitle : ''} --</p>\n`;
            html += `    <p>${p.content}</p>\n`;
          });

          html += `    <h3 style="font-size: 15pt; border-bottom: 2px solid #000; margin-top: 30px; padding-bottom: 3px;">Saggio III: Archetipi, Simboli e Sincronicita Vol. I</h3>\n`;
          archetipiSimboliPages.forEach((p) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- Vol I • Pagina ${p.pageNumber} ${p.chapterTitle ? '• Capitolo: ' + p.chapterTitle : ''} --</p>\n`;
            html += `    <p>${p.content}</p>\n`;
          });

          html += `    <h3 style="font-size: 15pt; border-bottom: 2px solid #000; margin-top: 30px; padding-bottom: 3px;">Saggio IV: Archetipi, Simboli e Sincronicita Vol. III</h3>\n`;
          archetipiVol3Pages.forEach((p) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- Vol III • Pagina ${p.pageNumber} ${p.chapterTitle ? '• Capitolo: ' + p.chapterTitle : ''} --</p>\n`;
            html += `    <p>${p.content}</p>\n`;
          });

          html += `    <h3 style="font-size: 15pt; border-bottom: 2px solid #000; margin-top: 30px; padding-bottom: 3px;">Saggio V: Mythos, Spazio e Tempo</h3>\n`;
          mythosSpazioPages.forEach((p) => {
            html += `    <p style="font-size: 9pt; font-family: monospace; color: #888888;">-- Mythos • Pagina ${p.pageNumber} ${p.chapterTitle ? '• Capitolo: ' + p.chapterTitle : ''} --</p>\n`;
            html += `    <p>${p.content}</p>\n`;
          });
          html += `  </div>\n`;
          html += `  <br class="mso-page-break" />\n`;
        }

        if (includeTvShows) {
          html += `  <div>\n`;
          html += `    <h2>DIPARTIMENTO VII • ARCHIVIO PALINSESTI ED INCHIESTE RAI</h2>\n`;
          TV_DOC_SHOWS.forEach(tv => {
            html += `    <div class="card">\n`;
            html += `      <strong>Reportage TV #${tv.num} • Anno ${tv.year}</strong>\n`;
            html += `      <h3 style="margin-top: 2px; margin-bottom: 6px;">${tv.title}</h3>\n`;
            html += `      <p>${tv.description}</p>\n`;
            html += `      <p style="font-size: 9.5pt; color: #0066CC;">Piattaforma Video: <strong>${tv.youtubeUrl}</strong></p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="margin-top: 30px;">Indice dei Documentari Fisico-Accademici Universitari:</h3>\n`;
          DOCUMENTARY_SERIES_EPISODES.forEach(ep => {
            html += `    <div style="margin-bottom: 12px; border-left: 3px solid #D0D0D0; padding-left: 10px;">\n`;
            html += `      <strong>Episodio ${ep.num}: ${ep.title}</strong>\n`;
            html += `      <p style="margin-top: 3px; font-size: 10pt; color: #444444;">${ep.description}</p>\n`;
            html += `    </div>\n`;
          });
        }

        html += `  <div style="text-align: center; font-size: 10pt; color: #555555; border-top: 1px solid #000000; padding-top: 20px; margin-top: 60px;">\n`;
        html += `    <p>© 2005 - 2026 Fondazione Falace delle Attività Intellettive e Creative.</p>\n`;
        html += `    <p>Documento ufficiale esportato in formato Microsoft Word per impiego e consultazione offline.</p>\n`;
        html += `  </div>\n`;
        html += `</body>\n</html>\n`;

        finalString = html;
      } else if (ebookFormat === 'xml') {
        mimeType = 'application/xml;charset=utf-8';
        extension = 'xml';

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<antologia_omnia>\n';
        xml += '  <metadati>\n';
        xml += `    <titolo>${escapeXml('OPERA OMNIA ANTOLOGIA')}</titolo>\n`;
        xml += `    <sottotitolo>${escapeXml('Compendio Generale Accademico della Fondazione Falace')}</sottotitolo>\n`;
        xml += `    <autore>${escapeXml('Luca Falace')}</autore>\n`;
        xml += `    <editore>${escapeXml('Fondazione Falace AIC & O.R.O. Edizioni')}</editore>\n`;
        xml += `    <certificazione>${escapeXml('OPAC SBN - UIBM - CERN Zenodo DOI')}</certificazione>\n`;
        xml += `    <contatti>${escapeXml('Dott.LucaFalace@gmail.com')}</contatti>\n`;
        xml += `    <data_compilazione>2026-06-14</data_compilazione>\n`;
        xml += '  </metadati>\n\n';
        xml += '  <dipartimenti>\n';

        if (includeBio) {
          xml += '    <dipartimento id="I" titolo="Biografia Intellettuale Certificata di Luca Falace">\n';
          BIOGRAFIA_PAGES.forEach(page => {
            xml += `      <pagina numero="${page.pageNumber}">\n`;
            xml += `        <contenuto>${escapeXml(page.content)}</contenuto>\n`;
            xml += `      </pagina>\n`;
          });
          xml += '    </dipartimento>\n\n';
        }

        if (includeHistory) {
          xml += '    <dipartimento id="II" titolo="Registro Notarile e Fondazione Storica (2005-2025)">\n';
          ARCHIVIO_STORICO_PAGES.forEach(page => {
            xml += `      <pagina numero="${page.pageNumber}">\n`;
            xml += `        <contenuto>${escapeXml(page.content)}</contenuto>\n`;
            xml += `      </pagina>\n`;
          });
          xml += '    </dipartimento>\n\n';
        }

        if (includeTheory) {
          xml += '    <dipartimento id="III" titolo="Teoria Coerente e Sincronismo Scientifico">\n';
          xml += `      <equazione_energetica>${escapeXml(SYNCHRONICITY_THEORY.scientific_formula)}</equazione_energetica>\n`;
          xml += `      <definizione_concettuale>${escapeXml(SYNCHRONICITY_THEORY.description_it)}</definizione_concettuale>\n`;
          xml += '      <metodo_nove_livelli>\n';
          SYNCHRONICITY_THEORY.levels.forEach(lvl => {
            xml += `        <livello numero="${lvl.num}">\n`;
            xml += `          <titolo>${escapeXml(lvl.title)}</titolo>\n`;
            xml += `          <descrizione>${escapeXml(lvl.description)}</descrizione>\n`;
            xml += `        </livello>\n`;
          });
          xml += '      </metodo_nove_livelli>\n';
          xml += '    </dipartimento>\n\n';
        }

        if (includePatents) {
          xml += '    <dipartimento id="IV" titolo="Registro dei Brevetti e Invenzioni d\'Ingegno UIBM">\n';
          xml += '      <brevetti_luca_falace>\n';
          INVENTIONS_CATALOG.forEach(inv => {
            xml += `        <brevetto id="${inv.number}">\n`;
            xml += `          <titolo>${escapeXml(inv.title)}</titolo>\n`;
            xml += `          <anno>${inv.year}</anno>\n`;
            xml += `          <stato>${escapeXml(inv.status)}</stato>\n`;
            xml += `          <pat_numero>${escapeXml(inv.patentNum || 'DEPOSITATO')}</pat_numero>\n`;
            xml += `          <descrizione>${escapeXml(inv.description)}</descrizione>\n`;
            xml += `          <hardware_details>${escapeXml(inv.details)}</hardware_details>\n`;
            xml += `        </brevetto>\n`;
          });
          xml += '      </brevetti_luca_falace>\n';
          xml += '      <brevetti_lucio_falace_eredita>\n';
          LUCIO_FALACE_PATENTS.forEach(pat => {
            xml += `        <brevetto_lucio num="${pat.num}">\n`;
            xml += `          <codice>${escapeXml(pat.code)}</codice>\n`;
            xml += `          <titolo>${escapeXml(pat.title)}</titolo>\n`;
            xml += `          <ufficio_brevetto>${escapeXml(pat.office)}</ufficio_brevetto>\n`;
            xml += `          <anno>${pat.year}</anno>\n`;
            xml += `        </brevetto_lucio>\n`;
          });
          xml += '      </brevetti_lucio_falace_eredita>\n';
          xml += '    </dipartimento>\n\n';
        }

        if (includeArt) {
          xml += '    <dipartimento id="V" titolo="Catalogo Arte Contemporanea, Poesia e Performance">\n';
          ARTWORKS_CATALOG.forEach(art => {
            xml += '      <opera_d_arte>\n';
            xml += `        <titolo>${escapeXml(art.title)}</titolo>\n`;
            xml += `        <categoria>${escapeXml(art.category)}</categoria>\n`;
            xml += `        <anno>${art.year}</anno>\n`;
            xml += `        <sede_conservativa>${escapeXml(art.venue)}</sede_conservativa>\n`;
            xml += `        <curatela_descrizione>${escapeXml(art.description)}</curatela_descrizione>\n`;
            xml += '      </opera_d_arte>\n';
          });
          xml += '    </dipartimento>\n\n';
        }

        if (includeSbnTexts) {
          xml += '    <dipartimento id="VI" titolo="Monografie e Romanzi Catalogati SBN">\n';
          
          xml += '      <opera_celeste>\n';
          operaCelestePages.forEach(p => {
            xml += `        <pagina num_sbn="${p.pageNumber}">\n`;
            if (p.chapterTitle) xml += `          <capitolo>${escapeXml(p.chapterTitle)}</capitolo>\n`;
            xml += `          <testo>${escapeXml(p.content)}</testo>\n`;
            xml += `        </pagina>\n`;
          });
          xml += '      </opera_celeste>\n';

          xml += '      <tu_sei>\n';
          tuSeiPages.forEach(p => {
            xml += `        <pagina num_sbn="${p.pageNumber}">\n`;
            if (p.chapterTitle) xml += `          <capitolo>${escapeXml(p.chapterTitle)}</capitolo>\n`;
            xml += `          <testo>${escapeXml(p.content)}</testo>\n`;
            xml += `        </pagina>\n`;
          });
          xml += '      </tu_sei>\n';

          xml += '      <archetipi_e_simboli>\n';
          archetipiSimboliPages.forEach(p => {
            xml += `        <pagina num_sbn="${p.pageNumber}">\n`;
            if (p.chapterTitle) xml += `          <capitolo>${escapeXml(p.chapterTitle)}</capitolo>\n`;
            xml += `          <testo>${escapeXml(p.content)}</testo>\n`;
            xml += `        </pagina>\n`;
          });
          xml += '      </archetipi_e_simboli>\n';
          xml += '    </dipartimento>\n\n';
        }

        if (includeTvShows) {
          xml += '    <dipartimento id="VII" titolo="Palinsesti TV, Archivio Solvay Rai e Mediaset">\n';
          TV_DOC_SHOWS.forEach(tv => {
            xml += `      <programma show_num="${tv.num}">\n`;
            xml += `        <titolo>${escapeXml(tv.title)}</titolo>\n`;
            xml += `        <argomenti>${escapeXml(tv.topics)}</argomenti>\n`;
            xml += `        <anno>${tv.year}</anno>\n`;
            xml += `        <descrizione>${escapeXml(tv.description)}</descrizione>\n`;
            xml += `        <link>${escapeXml(tv.youtubeUrl)}</link>\n`;
            xml += '      </programma>\n';
          });
          xml += '    </dipartimento>\n\n';
        }

        xml += '  </dipartimenti>\n';
        xml += '</antologia_omnia>\n';
        
        finalString = xml;
      } else if (ebookFormat === 'phone') {
        mimeType = 'text/html;charset=utf-8';
        extension = 'html';

        let html = '';
        html += `<!DOCTYPE html>\n<html lang="it">\n<head>\n  <meta charset="UTF-8">\n`;
        html += `  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
        html += `  <title>Opera Omnia Mobile - Lettore Smartphone</title>\n`;
        html += `  <style>\n`;
        html += `    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700&display=swap');\n`;
        html += `    body {\n      background-color: #FAF4E8;\n      color: #2D2319;\n      font-family: 'Lora', Georgia, serif;\n      margin: 0;\n      padding: 0;\n      transition: background 0.3s, color 0.3s;\n    }\n`;
        html += `    #reader-canvas {\n      max-width: 480px;\n      margin: 0 auto;\n      padding: 20px 15px 90px 15px;\n      background-color: #FAF4E8;\n      min-height: 100vh;\n      box-shadow: 0 4px 20px rgba(0,0,0,0.06);\n      transition: background 0.3s, color 0.3s;\n    }\n`;
        html += `    .font-sans { font-family: 'Inter', sans-serif; }\n`;
        html += `    h1 {\n      font-size: 24px;\n      color: #0b2240;\n      font-weight: 700;\n      text-align: center;\n      margin-top: 25px;\n      font-family: 'Lora', serif;\n    }\n`;
        html += `    h2 {\n      font-size: 19px;\n      color: #7c2d12;\n      margin-top: 35px;\n      border-bottom: 2px solid #ecd9bc;\n      padding-bottom: 6px;\n    }\n`;
        html += `    p {\n      font-size: 16.5px;\n      line-height: 1.8;\n      text-align: justify;\n      margin-bottom: 20px;\n    }\n`;
        html += `    .phone-badge {\n      border: 1px solid #c2410c;\n      color: #c2410c;\n      font-family: monospace;\n      font-size: 10px;\n      padding: 2px 8px;\n      display: inline-block;\n      border-radius: 4px;\n      font-weight: bold;\n    }\n`;
        html += `    .phone-toc {\n      background-color: #F3ECD8;\n      border: 1px solid #DECEB4;\n      border-radius: 12px;\n      padding: 15px;\n      margin: 20px 0;\n    }\n`;
        html += `    .phone-toc-title {\n      font-family: 'Inter', sans-serif;\n      font-size: 13px;\n      font-weight: 700;\n      text-transform: uppercase;\n      color: #7c2d12;\n      margin-bottom: 10px;\n    }\n`;
        html += `    .phone-toc-item {\n      margin: 8px 0;\n      font-size: 13.5px;\n      font-family: 'Inter', sans-serif;\n    }\n`;
        html += `    .phone-toc-item a {\n      text-decoration: none;\n      color: #0066cc;\n      font-weight: 600;\n    }\n`;
        html += `    .phone-card {\n      background-color: #FFFFFF;\n      border-left: 4px solid #ea580c;\n      border-radius: 6px;\n      padding: 12px 15px;\n      margin-bottom: 15px;\n      font-family: 'Inter', sans-serif;\n    }\n`;
        html += `    .phone-indicator {\n      text-align: center;\n      font-family: monospace;\n      font-size: 10px;\n      color: #a8a29e;\n      border-bottom: 1px dashed #ecd9bc;\n      padding-bottom: 4px;\n      margin: 25px 0 15px 0;\n    }\n`;
        html += `    .tab-p {\n      width: 100%;\n      font-family: 'Inter', sans-serif;\n      font-size: 11px;\n      border-collapse: collapse;\n      margin: 15px 0;\n    }\n`;
        html += `    .tab-p th, .tab-p td {\n      padding: 6px;\n      border: 1px solid # DECEB4;\n    }\n`;
        html += `    .tab-p th {\n      background: #7c2d12;\n      color: white;\n    }\n`;
        html += `    .phone-footer {\n      font-size: 12px;\n      font-family: 'Inter', sans-serif;\n      text-align: center;\n      color: #8c857b;\n      border-top: 1px solid #DECEB4;\n      padding-top: 25px;\n      margin-top: 50px;\n    }\n`;
        html += `    .sticky-control {\n      position: fixed;\n      bottom: 0;\n      left: 0;\n      right: 0;\n      background-color: #2D2319;\n      color: #F5EFE6;\n      padding: 12px;\n      font-family: 'Inter', sans-serif;\n      font-size: 12px;\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      box-shadow: 0 -4px 15px rgba(0,0,0,0.15);\n      z-index: 1000;\n    }\n`;
        html += `    .sticky-btn {\n      background-color: #ea580c;\n      color: white;\n      border: none;\n      padding: 8px 14px;\n      border-radius: 6px;\n      font-weight: 700;\n      cursor: pointer;\n      font-size: 11px;\n      text-transform: uppercase;\n    }\n`;
        html += `  </style>\n</head>\n<body>\n`;

        html += `  <div id="reader-canvas" data-theme="light">\n`;
        
        // Mobile Header
        html += `    <div style="text-align:center; margin-bottom: 15px;">\n`;
        html += `      <span class="phone-badge">FONDAZIONE FALACE • MOBILE</span>\n`;
        html += `      <h1>OPERA OMNIA</h1>\n`;
        html += `      <p style="font-size:12.5px; text-align:center; font-family: 'Inter', sans-serif; color:#7c8591; margin:0 0 15px 0;">Edizione Digitale per Smartphone (E-Reader Offline)</p>\n`;
        html += `    </div>\n`;

        // Mobile TOC
        html += `    <div class="phone-toc">\n`;
        html += `      <div class="phone-toc-title">Indice dei Contenuti</div>\n`;
        let pidx = 1;
        if (includeBio) html += `      <div class="phone-toc-item"><a href="#m-bio">${pidx++}. Biografia di Luca Falace</a></div>\n`;
        if (includeHistory) html += `      <div class="phone-toc-item"><a href="#m-hist">${pidx++}. Registro Storico (2005)</a></div>\n`;
        if (includeTheory) html += `      <div class="phone-toc-item"><a href="#m-theo">${pidx++}. Formula Sincronismo</a></div>\n`;
        if (includePatents) html += `      <div class="phone-toc-item"><a href="#m-pat">${pidx++}. Registro Brevetti UIBM</a></div>\n`;
        if (includeArt) html += `      <div class="phone-toc-item"><a href="#m-art">${pidx++}. Catalogo d'Arte Contemporanea</a></div>\n`;
        if (includeSbnTexts) html += `      <div class="phone-toc-item"><a href="#m-books">${pidx++}. Anteprime delle Pubblicazioni</a></div>\n`;
        if (includeTvShows) html += `      <div class="phone-toc-item"><a href="#m-tv">${pidx++}. Rassegna Documentari &amp; TV</a></div>\n`;
        html += `    </div>\n`;

        // Sections
        if (includeBio) {
          html += `    <div id="m-bio">\n`;
          html += `      <h2>Dipartimento I: Biografia Scolastica</h2>\n`;
          BIOGRAFIA_PAGES.forEach(page => {
            html += `      <div class="phone-indicator">Bio • Pagina ${page.pageNumber}</div>\n`;
            html += `      <p style="white-space: pre-wrap;">${page.content}</p>\n`;
          });
          html += `    </div>\n`;
        }

        if (includeHistory) {
          html += `    <div id="m-hist">\n`;
          html += `      <h2>Dipartimento II: Cronologia Storica</h2>\n`;
          ARCHIVIO_STORICO_PAGES.forEach(page => {
            html += `      <div class="phone-indicator">Archivio Costitutivo • P. ${page.pageNumber}</div>\n`;
            html += `      <p style="white-space: pre-wrap;">${page.content}</p>\n`;
          });
          html += `    </div>\n`;
        }

        if (includeTheory) {
          html += `    <div id="m-theo">\n`;
          html += `      <h2>Dipartimento III: Campo Unificato</h2>\n`;
          html += `      <div class="phone-card">\n`;
          html += `        <strong style="color:#c2410c; font-size:11px;">FORMULA MATEMATICA:</strong>\n`;
          html += `        <div style="font-size: 24px; text-align:center; font-family:monospace; margin:10px 0; font-weight:bold;">${SYNCHRONICITY_THEORY.scientific_formula}</div>\n`;
          html += `        <p style="font-size:12.5px; font-family:sans-serif; margin:0; line-height:1.4;">${SYNCHRONICITY_THEORY.description_it}</p>\n`;
          html += `      </div>\n`;
          SYNCHRONICITY_THEORY.levels.forEach(lvl => {
            html += `      <p style="font-size: 14px; margin-bottom: 12px; border-bottom: 1px dotted #ccc; padding-bottom:8px;">\n`;
            html += `        <strong>Livello ${lvl.num}: ${lvl.title}</strong><br/>${lvl.description}\n`;
            html += `      </p>\n`;
          });
          html += `    </div>\n`;
        }

        if (includePatents) {
          html += `    <div id="m-pat">\n`;
          html += `      <h2>Dipartimento IV: Registro dei Brevetti</h2>\n`;
          INVENTIONS_CATALOG.forEach(inv => {
            html += `      <div class="phone-card" style="border-left-color: #0066cc;">\n`;
            html += `        <strong style="font-size:10px; color:#0066cc;">BREVETTO #${inv.number}</strong>\n`;
            html += `        <h4 style="margin:2px 0 6px 0; font-size:14px;">${inv.title} (${inv.year})</h4>\n`;
            html += `        <p style="font-size:12px; line-height:1.5; margin:0; text-align:left;">${inv.description}</p>\n`;
            html += `      </div>\n`;
          });
          html += `    </div>\n`;
        }

        if (includeArt) {
          html += `    <div id="m-art">\n`;
          html += `      <h2>Dipartimento V: Catalogo d'Arte</h2>\n`;
          ARTWORKS_CATALOG.forEach(art => {
            html += `      <div class="phone-card" style="border-left-color: #854d0e;">\n`;
            html += `        <strong style="font-size:10px; color:#854d0e;">${art.category}</strong>\n`;
            html += `        <h4 style="margin:2px 0 6px 0; font-size:14px;">${art.title} (${art.year})</h4>\n`;
            html += `        <p style="font-size:12px; line-height:1.5; margin:0; text-align:left;">${art.description}</p>\n`;
            html += `      </div>\n`;
          });
          html += `    </div>\n`;
        }

        if (includeSbnTexts) {
          html += `    <div id="m-books">\n`;
          html += `      <h2>Dipartimento VI: Monografie SBN</h2>\n`;
          
          html += `      <h3 style="font-size:16px; border-bottom: 1px solid #7c2d12; color:#7c2d12; padding-bottom:3px;">1. L'Opera Celeste</h3>\n`;
          operaCelestePages.forEach(p => {
            html += `      <div class="phone-indicator">L'Opera Celeste • P. ${p.pageNumber}</div>\n`;
            html += `      <p>${p.content}</p>\n`;
          });

          html += `      <h3 style="font-size:16px; border-bottom: 1px solid #7c2d12; color:#7c2d12; padding-bottom:3px;">2. Tu Sei</h3>\n`;
          tuSeiPages.forEach(p => {
            html += `      <div class="phone-indicator">Tu Sei • P. ${p.pageNumber}</div>\n`;
            html += `      <p>${p.content}</p>\n`;
          });
          html += `    </div>\n`;
        }

        if (includeTvShows) {
          html += `    <div id="m-tv">\n`;
          html += `      <h2>Dipartimento VII: Rai &amp; Mediaset</h2>\n`;
          TV_DOC_SHOWS.forEach(tv => {
            html += `      <div class="phone-card" style="border-left-color: #22c55e;">\n`;
            html += `        <strong style="font-size:10px; color:#15803d;">Episodio #${tv.num} (${tv.year})</strong>\n`;
            html += `        <h4 style="margin:2px 0 6px 0; font-size:14px;">${tv.title}</h4>\n`;
            html += `        <p style="font-size:12px; line-height:1.5; margin:0; text-align:left;">${tv.description}</p>\n`;
            html += `      </div>\n`;
          });
          html += `    </div>\n`;
        }

        html += `    <div class="phone-footer">\n`;
        html += `      <p>© 2005 - 2026 Fondazione Falace delle AIC.</p>\n`;
        html += `      <p style="font-size:9px; font-family:monospace;">STAMPATORE DIGITALE COMPATIBILE OPAC SBN</p>\n`;
        html += `    </div>\n`;

        html += `  </div>\n`;

        // Theme controllers
        html += `  <div class="sticky-control">\n`;
        html += `    <span>LETTORE DI PROTEZIONE VISIVA: </span>\n`;
        html += `    <button class="sticky-btn" onclick="toggleThemePhone()">Cambia Sfondo (Sepia / Notte)</button>\n`;
        html += `  </div>\n`;

        html += `  <script>\n`;
        html += `    function toggleThemePhone() {\n`;
        html += `      var canvas = document.getElementById('reader-canvas');\n`;
        html += `      if (canvas.style.backgroundColor === '' || canvas.style.backgroundColor === 'rgb(250, 244, 232)') {\n`;
        html += `        canvas.style.backgroundColor = '#1C150F';\n`;
        html += `        canvas.style.color = '#E6D7C3';\n`;
        html += `        document.body.style.backgroundColor = '#120D0A';\n`;
        html += `        var headers = canvas.getElementsByTagName('h1');\n`;
        html += `        for(var i=0; i<headers.length; i++) { headers[i].style.color = '#ECD9C9'; }\n`;
        html += `      } else {\n`;
        html += `        canvas.style.backgroundColor = '#FAF4E8';\n`;
        html += `        canvas.style.color = '#2D2319';\n`;
        html += `        document.body.style.backgroundColor = '#FAF4E8';\n`;
        html += `        var headers = canvas.getElementsByTagName('h1');\n`;
        html += `        for(var i=0; i<headers.length; i++) { headers[i].style.color = '#0b2240'; }\n`;
        html += `      }\n`;
        html += `    }\n`;
        html += `  </script>\n`;

        html += `</body>\n</html>\n`;
        finalString = html;
      } else if (ebookFormat === 'print') {
        mimeType = 'text/html;charset=utf-8';
        extension = 'html';

        let html = '';
        html += `<!DOCTYPE html>\n<html lang="it">\n<head>\n  <meta charset="UTF-8">\n`;
        html += `  <title>OPERA OMNIA - Edizione Cartacea</title>\n`;
        html += `  <style>\n`;
        html += `    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Lora:ital,wght@0,450;0,700;1,450&display=swap');\n`;
        html += `    @page {\n      size: A4 portrait;\n      margin: 2.5cm 2cm;\n    }\n`;
        html += `    body {\n      background-color: #ffffff;\n      color: #000000;\n      font-family: 'Lora', 'Georgia', serif;\n      line-height: 1.6;\n      font-size: 11.5pt;\n      margin: 0;\n      padding: 0;\n    }\n`;
        html += `    .no-print {\n      background-color: #fafaf9;\n      border: 2px solid #e1dbcf;\n      border-left: 6px solid #ea580c;\n      padding: 20px;\n      margin: 25px auto;\n      max-width: 800px;\n      border-radius: 8px;\n      font-family: system-ui, sans-serif;\n      font-size: 14.5px;\n      color: #1c1917;\n    }\n`;
        html += `    .no-print-btn {\n      background-color: #ea580c;\n      color: white;\n      border: none;\n      font-family: system-ui, sans-serif;\n      font-weight: bold;\n      padding: 10px 20px;\n      border-radius: 6px;\n      margin-top: 15px;\n      cursor: pointer;\n      text-transform: uppercase;\n      font-size: 12px;\n    }\n`;
        html += `    .stampabile-cover {\n      border: 4px double #000000;\n      padding: 60px 40px;\n      text-align: center;\n      margin: 40px auto;\n      max-width: 650px;\n      page-break-after: always;\n    }\n`;
        html += `    .stampabile-cover h1 {\n      font-family: 'Cinzel', serif;\n      font-size: 28pt;\n      margin: 30px 0 10px 0;\n      color: #000000;\n    }\n`;
        html += `    .stampabile-cover h2 {\n      font-family: 'Lora', serif;\n      font-weight: normal;\n      font-size: 14pt;\n      font-style: italic;\n      margin-bottom: 50px;\n    }\n`;
        html += `    .stampabile-header-label {\n      font-family: monospace;\n      font-size: 10pt;\n      border: 1px solid #000;\n      padding: 2px 8px;\n      display: inline-block;\n      text-transform: uppercase;\n      font-weight: bold;\n    }\n`;
        html += `    .print-toc {\n      border: 1px solid #000;\n      padding: 30px;\n      max-width: 650px;\n      margin: 40px auto;\n      page-break-after: always;\n    }\n`;
        html += `    .print-toc-title {\n      font-family: 'Cinzel', serif;\n      font-size: 16pt;\n      text-align: center;\n      margin-bottom: 25px;\n    }\n`;
        html += `    .print-toc-item {\n      display: flex;\n      justify-content: space-between;\n      margin: 12px 0;\n      font-size: 11pt;\n    }\n`;
        html += `    .capitolo-cartaceo {\n      page-break-before: always;\n      padding-top: 20px;\n    }\n`;
        html += `    .capitolo-cartaceo h2 {\n      font-family: 'Cinzel', serif;\n      font-size: 18pt;\n      border-bottom: 1px solid #000;\n      padding-bottom: 6px;\n      margin-top: 40px;\n    }\n`;
        html += `    .page-indicator-print {\n      text-align: center;\n      font-family: monospace;\n      font-size: 9pt;\n      color: #666;\n      border-bottom: 1px solid #ccc;\n      padding-bottom: 3px;\n      margin-top: 30px;\n      margin-bottom: 15px;\n    }\n`;
        html += `    p.capocapo::first-letter {\n      font-size: 3.5em;\n      float: left;\n      margin-top: 0.15em;\n      margin-right: 0.15em;\n      line-height: 0.95;\n      font-family: 'Cinzel', serif;\n      font-weight: 700;\n    }\n`;
        html += `    p {\n      font-size: 11.5pt;\n      text-align: justify;\n      margin-bottom: 15px;\n    }\n`;
        html += `    .ornamento {\n      text-align: center;\n      font-size: 24pt;\n      margin: 35px 0;\n      color: #000000;\n    }\n`;
        html += `    .print-card {\n      border: 1px solid #000;\n      padding: 15px;\n      margin-bottom: 20px;\n      page-break-inside: avoid;\n    }\n`;
        html += `    .print-table {\n      width: 100%;\n      border-collapse: collapse;\n      font-size: 10pt;\n      margin-top: 15px;\n    }\n`;
        html += `    .print-table th, .print-table td {\n      border: 1px solid #000;\n      padding: 6px 10px;\n      text-align: left;\n    }\n`;
        html += `    .print-table th {\n      background-color: #f5f5f5;\n    }\n`;
        html += `    @media print {\n      .no-print { display: none !important; }\n      body { background: #fff; color: #000; }\n    }\n`;
        html += `  </style>\n</head>\n<body>\n`;

        // 1. Interactive Banner (for screen print triggering)
        html += `  <div class="no-print">\n`;
        html += `    <strong>📚 EDIZIONE CARTACEA STRUTTURATA (MONUMENTALE)</strong>\n`;
        html += `    <p style="font-size:13.5px; margin: 8px 0 0 0;">\n`;
        html += `      Questo file è stato impaginato appositamente per la stampante o per l'esportazione in file PDF standard ad alta definizione (Griglia A4, Font Serif, Margini e capoversi). \n`;
        html += `      <br/><strong style="color:#c2410c;">Come Salvare in PDF:</strong> Clicca sul pulsante arancione qui sotto oppure premi la combinazione di tasti <strong>Ctrl + P</strong> (su Windows) o <strong>Cmd + P</strong> (su Mac). Nella finestra di stampa select <strong>"Salva come PDF"</strong> come destinazione e ricordati di attivare l'opzione <strong>"Grafici di sfondo"</strong> per visualizzare i loghi e le cornici decorative.\n`;
        html += `    </p>\n`;
        html += `    <button class="no-print-btn" onclick="window.print()">Stampa / Esporta PDF</button>\n`;
        html += `  </div>\n`;

        // 2. Cover page
        html += `  <div class="stampabile-cover">\n`;
        html += `    <div class="stampabile-header-label">FONDAZIONE LUCA FALACE AIC</div>\n`;
        html += `    <h1>OPERA OMNIA</h1>\n`;
        html += `    <h2>Antologia, Atto Notarile, Teoria Energetica, Registro dei Brevetti e Catalogo delle Opere d'Ingegno</h2>\n`;
        html += `    <div style="width: 150px; height: 1px; background-color: #000000; margin: 30px auto;"></div>\n`;
        html += `    <p style="font-size:12pt; text-align:center;">Editore Catalogatore: <strong>Fondazione Falace &amp; O.R.O. Edizioni</strong></p>\n`;
        html += `    <p style="font-size:10pt; text-align:center; color:#444;">Certificato SBN Nazionale - Codice UIBM Ministeriale</p>\n`;
        html += `    <p style="font-size:9pt; font-family:monospace; margin-top:120px;">Dott. Luca Falace - Tutti i diritti di paternità intellettuale riservati (2005 - 2026)</p>\n`;
        html += `  </div>\n`;

        // 3. TOC
        html += `  <div class="print-toc">\n`;
        html += `    <div class="print-toc-title">INDICE DI STAMPA</div>\n`;
        let prIdx = 1;
        if (includeBio) html += `    <div class="print-toc-item"><span>${prIdx++}. BIO-BIBLIOGRAFIA ACCADEMICA CERTIFICATA</span> <span>Sezione I</span></div>\n`;
        if (includeHistory) html += `    <div class="print-toc-item"><span>${prIdx++}. ATTO NOTARILE E CRONOLOGIA STORICA ORIGINARIA</span> <span>Sezione II</span></div>\n`;
        if (includeTheory) html += `    <div class="print-toc-item"><span>${prIdx++}. TEORIA UNIFICATA DEL SINCRONISMO CREATIVO</span> <span>Sezione III</span></div>\n`;
        if (includePatents) html += `    <div class="print-toc-item"><span>${prIdx++}. REGISTRO DEGLI ATTESTATI DI BREVETTO UIBM</span> <span>Sezione IV</span></div>\n`;
        if (includeArt) html += `    <div class="print-toc-item"><span>${prIdx++}. CATALOGO GENERALE DELLE OPERE ARTISTICHE</span> <span>Sezione V</span></div>\n`;
        if (includeSbnTexts) html += `    <div class="print-toc-item"><span>${prIdx++}. ANTOLOGIA MONOGRAFIE PROTOCOLLATE OPAC SBN</span> <span>Sezione VI</span></div>\n`;
        if (includeTvShows) html += `    <div class="print-toc-item"><span>${prIdx++}. ARCHIVIO REPORTAGES TELEVISIVI RAI E DOCUMENTARI</span> <span>Sezione VII</span></div>\n`;
        html += `  </div>\n`;

        // 4. Content
        if (includeBio) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>Bio-Bibliografia Accademica</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          BIOGRAFIA_PAGES.forEach((page, idx) => {
            html += `    <div class="page-indicator-print">Sezione I • Pagina ${page.pageNumber}</div>\n`;
            if (idx === 0) {
              html += `    <p class="capocapo">${page.content}</p>\n`;
            } else {
              html += `    <p style="white-space: pre-wrap;">${page.content}</p>\n`;
            }
          });
          html += `  </div>\n`;
        }

        if (includeHistory) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>Atto Notarile e Cronologia Storica</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          ARCHIVIO_STORICO_PAGES.forEach((page, idx) => {
            html += `    <div class="page-indicator-print">Sezione II • Registro Pagina ${page.pageNumber}</div>\n`;
            if (idx === 0) {
              html += `    <p class="capocapo">${page.content}</p>\n`;
            } else {
              html += `    <p style="white-space: pre-wrap;">${page.content}</p>\n`;
            }
          });
          html += `  </div>\n`;
        }

        if (includeTheory) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>La Teoria del Sincronismo</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          html += `    <div class="print-card">\n`;
          html += `      <h3 style="margin-top:0; font-family:'Cinzel',serif; font-size:12pt; border-bottom:1px solid #000; padding-bottom:4px;">Equazione Unificatrice Energetica</h3>\n`;
          html += `      <h1 style="font-size:28pt; text-align:center; font-family:monospace; margin:15px 0;">${SYNCHRONICITY_THEORY.scientific_formula}</h1>\n`;
          html += `      <p style="font-size:10pt; line-height:1.4; color:#333;">${SYNCHRONICITY_THEORY.description_it}</p>\n`;
          html += `    </div>\n`;
          
          html += `    <h3 style="font-family:'Cinzel',serif; font-size:13pt; margin-top:30px;">LA SCALA INTENZIONALE DEI 9 LIVELLI:</h3>\n`;
          SYNCHRONICITY_THEORY.levels.forEach(lvl => {
            html += `    <div style="margin-bottom:15px; page-break-inside:avoid;">\n`;
            html += `      <strong>Livello ${lvl.num} • ${lvl.title}</strong>\n`;
            html += `      <p style="margin:4px 0 0 0; font-size:11pt;">${lvl.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        if (includePatents) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>Registro degli Attestati di Brevetto UIBM</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          html += `    <p class="capocapo">La Fondazione Falace tutela l'esclusività industriale delle scoperte scientifiche con registrazioni ufficiali presso l'Ufficio Italiano Brevetti e Marchi.</p>\n`;
          
          INVENTIONS_CATALOG.forEach(inv => {
            html += `    <div class="print-card">\n`;
            html += `      <strong>Attestato #${inv.number} • Stato: ${inv.status}</strong>\n`;
            html += `      <h4 style="margin:3px 0 8px 0; font-family:'Cinzel',serif;">${inv.title} (${inv.year})</h4>\n`;
            html += `      <p style="font-size:10.5pt; margin-bottom:5px;"><strong>Codice d'Ingegno:</strong> ${inv.patentNum || 'DEPOSITATO'}</p>\n`;
            html += `      <p style="font-size:10.5pt; margin-bottom:5px;"><strong>Descrizione Tecnica:</strong> ${inv.description}</p>\n`;
            html += `      <p style="font-size:10.5pt; margin-bottom:0; background:#f5f5f5; padding:8px;"><strong>Struttura:</strong> ${inv.details}</p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="font-family:'Cinzel',serif; font-size:13pt; margin-top:30px;">Eredità di Lucio Falace (Tabelle Internazionali):</h3>\n`;
          html += `    <table class="print-table">\n`;
          html += `      <thead>\n        <tr>\n          <th>N°</th><th>Codice</th><th>Descrizione Teorica dell'Ingegno</th><th>Anno</th>\n        </tr>\n      </thead>\n      <tbody>\n`;
          LUCIO_FALACE_PATENTS.forEach(pat => {
            html += `        <tr>\n          <td style="text-align:center;">${pat.num}</td><td style="font-weight:bold;">${pat.code}</td><td>${pat.title}</td><td style="text-align:center;">${pat.year}</td>\n        </tr>\n`;
          });
          html += `      </tbody>\n    </table>\n`;
          html += `  </div>\n`;
        }

        if (includeArt) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>Catalogo Generale delle Opere d'Arte</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          
          ARTWORKS_CATALOG.forEach(art => {
            html += `    <div class="print-card">\n`;
            html += `      <strong>${art.category} • Anno ${art.year}</strong>\n`;
            html += `      <h4 style="margin:3px 0 8px 0; font-family:'Cinzel',serif;">${art.title}</h4>\n`;
            html += `      <p style="font-size:10.5pt; margin-bottom:4px;"><strong>Sede Conservativa:</strong> ${art.venue}</p>\n`;
            html += `      <p style="font-size:10.5pt; margin-bottom:0;"><strong>Curatela:</strong> ${art.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        if (includeSbnTexts) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>Antologia delle Pubblicazioni SBN</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          
          html += `    <h3 style="font-family:'Cinzel',serif; font-size:14pt; margin-top:25px;">Saggio I: L'Opera Celeste</h3>\n`;
          operaCelestePages.forEach((p, idx) => {
            html += `    <div class="page-indicator-print">L'Opera Celeste • Pagina ${p.pageNumber}</div>\n`;
            if (idx === 0) {
              html += `    <p class="capocapo">${p.content}</p>\n`;
            } else {
              html += `    <p>${p.content}</p>\n`;
            }
          });

          html += `    <h3 style="font-family:'Cinzel',serif; font-size:14pt; margin-top:40px; page-break-before:always;">Saggio II: Tu Sei</h3>\n`;
          tuSeiPages.forEach((p, idx) => {
            html += `    <div class="page-indicator-print">Tu Sei • Pagina ${p.pageNumber}</div>\n`;
            if (idx === 0) {
              html += `    <p class="capocapo">${p.content}</p>\n`;
            } else {
              html += `    <p>${p.content}</p>\n`;
            }
          });
          html += `  </div>\n`;
        }

        if (includeTvShows) {
          html += `  <div class="capitolo-cartaceo">\n`;
          html += `    <h2>Archivio Reportages Televisivi Rai</h2>\n`;
          html += `    <div class="ornamento">❦</div>\n`;
          TV_DOC_SHOWS.forEach(tv => {
            html += `    <div class="print-card">\n`;
            html += `      <strong>Rai / Mediaset #${tv.num} • Anno ${tv.year}</strong>\n`;
            html += `      <h4 style="margin:3px 0 8px 0; font-family:'Cinzel',serif;">${tv.title}</h4>\n`;
            html += `      <p style="font-size:10.5pt; margin-bottom:0;">${tv.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        // Epilogue
        html += `  <div style="text-align:center; font-family: 'Lora', serif; font-size:10pt; color:#444; border-top:1px solid #000; padding-top:25px; margin-top:80px; page-break-inside:avoid;">\n`;
        html += `    <p>© 2005 - 2026 Fondazione Falace delle Attività Intellettive e Creative.</p>\n`;
        html += `    <p>Documento ufficiale generato per archivi cartacei accademici.</p>\n`;
        html += `    <p style="font-size:8pt; font-family:monospace;">ID CONVALIDA SBN CORPORE CITTA DI ROMA: NOTARY_STAMP_CARTACEO_LUCA_FALACE</p>\n`;
        html += `  </div>\n`;

        html += `</body>\n</html>\n`;
        finalString = html;
      } else {
        // HTML Reflowable Original
        mimeType = 'text/html;charset=utf-8';
        extension = 'html';

        let html = '';
        html += `<!DOCTYPE html>\n<html lang="it">\n<head>\n  <meta charset="UTF-8">\n`;
        html += `  <title>OPERA OMNIA - Fondazione Falace</title>\n`;
        html += `  <style>\n`;
        html += `    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,450&family=Inter:wght@400;600&display=swap');\n`;
        html += `    body {\n      font-family: 'Playfair Display', Georgia, serif;\n      line-height: 1.7;\n      color: #1a1a1a;\n      max-width: 840px;\n      margin: 40px auto;\n      padding: 0 30px;\n      background-color: #FAF8F4;\n    }\n`;
        html += `    .font-sans { font-family: 'Inter', sans-serif; }\n`;
        html += `    h1, h2, h3, h4, h5 {\n      color: #0b2240;\n      font-weight: 700;\n      page-break-after: avoid;\n    }\n`;
        html += `    .header-logo {\n      border: 2px solid #0066cc;\n      color: #0066cc;\n      font-family: monospace;\n      font-size: 11px;\n      padding: 4px 10px;\n      display: inline-block;\n      margin-bottom: 20px;\n      font-weight: bold;\n    }\n`;
        html += `    .cover-pane {\n      border: 6px double #0066cc;\n      padding: 60px 40px;\n      text-align: center;\n      background-color: #fff;\n      margin-top: 40px;\n      margin-bottom: 60px;\n      page-break-after: always;\n      box-shadow: 0 4px 12px rgba(0,0,0,0.05);\n    }\n`;
        html += `    .toc {\n      background: #ffffff;\n      border: 2px solid #222;\n      padding: 30px;\n      margin-bottom: 60px;\n      page-break-after: always;\n    }\n`;
        html += `    .toc h2 { border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-top: 0; }\n`;
        html += `    .toc-item {\n      display: flex;\n      justify-content: space-between;\n      margin: 11px 0;\n      font-family: 'Inter', sans-serif;\n      font-size: 14px;\n    }\n`;
        html += `    .toc-item a {\n      text-decoration: none;\n      color: #0066cc;\n      font-weight: 600;\n    }\n`;
        html += `    .chapter {\n      page-break-before: always;\n      margin-top: 60px;\n      padding-top: 40px;\n      border-top: 2px solid #0b2240;\n    }\n`;
        html += `    .page-indicator {\n      text-align: center;\n      font-family: monospace;\n      font-size: 11px;\n      color: #888;\n      border-bottom: 1px dashed #ddd;\n      padding-bottom: 10px;\n      margin-bottom: 25px;\n    }\n`;
        html += `    .patent-card, .doc-card {\n      background: #fff;\n      border: 1px solid #e1dbcf;\n      border-left: 4px solid #0066cc;\n      padding: 15px 20px;\n      margin-bottom: 20px;\n      border-radius: 4px;\n    }\n`;
        html += `    .footer {\n      font-family: 'Inter', sans-serif;\n      text-align: center;\n      font-size: 12px;\n      margin-top: 100px;\n      color: #999;\n      border-top: 1px solid #ddd;\n      padding-top: 30px;\n    }\n`;
        html += `  </style>\n</head>\n<body>\n`;

        // Cover Page
        html += `  <div class="cover-pane">\n`;
        html += `    <div class="header-logo">• FONDAZIONE FALACE delle AIC •</div>\n`;
        html += `    <h1 style="font-size: 38px; margin: 15px 0 5px 0; font-family: 'Playfair Display', serif;">OPERA OMNIA COMPILATA</h1>\n`;
        html += `    <h2 style="font-size: 20px; font-weight: 400; color:#555; margin-bottom: 30px; font-style: italic;">Antologia e Registro Storico-Editoriale delle Arti e delle Scienze</h2>\n`;
        html += `    <div style="width: 100px; height: 3px; background-color: #0066cc; margin: 20px auto;"></div>\n`;
        html += `    <p style="font-family: 'Inter', sans-serif; font-size: 16px; margin: 40px 0 10px 0;">Autore Originario: <strong>Dott. Luca Falace</strong></p>\n`;
        html += `    <p style="font-family: sans-serif; font-size:12px; color: #666;">Proprietà Intellettuale Depositata 2005 - 2026</p>\n`;
        html += `    <p style="font-size: 11px; font-family: monospace; color:#888; margin-top:80px;">ARCHIVIO DIGITALE COMPATIBILE OPAC SBN - SIAE OLAF - UIBM</p>\n`;
        html += `  </div>\n`;

        // Table of Contents
        html += `  <div class="toc" id="toc">\n`;
        html += `    <h2>INDICE GENERALE</h2>\n`;
        let chapterIdx = 1;
        if (includeBio) {
          html += `    <div class="toc-item"><a href="#chapter-bio">${chapterIdx++}. DIPARTIMENTO I: Biografia Intellettuale del Fondatore</a> <span style="color:#aaa;">........... pag. 04</span></div>\n`;
        }
        if (includeHistory) {
          html += `    <div class="toc-item"><a href="#chapter-history">${chapterIdx++}. DIPARTIMENTO II: Atto Costitutivo e Archivio Storico (2005)</a> <span style="color:#aaa;">........... pag. 18</span></div>\n`;
        }
        if (includeTheory) {
          html += `    <div class="toc-item"><a href="#chapter-theory">${chapterIdx++}. DIPARTIMENTO III: Teoria e Formule Scientifiche Coerenti</a> <span style="color:#aaa;">........... pag. 45</span></div>\n`;
        }
        if (includePatents) {
          html += `    <div class="toc-item"><a href="#chapter-patents">${chapterIdx++}. DIPARTIMENTO IV: Registro dei Brevetti e Invenzioni d'Ingegno</a> <span style="color:#aaa;">........... pag. 59</span></div>\n`;
        }
        if (includeArt) {
          html += `    <div class="toc-item"><a href="#chapter-art">${chapterIdx++}. DIPARTIMENTO V: Catalogo delle Opere d'Arte e Videoarte (MiBAC)</a> <span style="color:#aaa;">........... pag. 82</span></div>\n`;
        }
        if (includeSbnTexts) {
          html += `    <div class="toc-item"><a href="#chapter-books">${chapterIdx++}. DIPARTIMENTO VI: Antologia Letteraria - Anteprime Monografie SBN</a> <span style="color:#aaa;">........... pag. 98</span></div>\n`;
        }
        if (includeTvShows) {
          html += `    <div class="toc-item"><a href="#chapter-tv">${chapterIdx++}. DIPARTIMENTO VII: Reportages TV, Rai, Shark Tank e Mediaset</a> <span style="color:#aaa;">........... pag. 142</span></div>\n`;
        }
        html += `  </div>\n`;

        // Chapter Bio
        if (includeBio) {
          html += `  <div class="chapter" id="chapter-bio">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO I: Biografia Intellettuale di Luca Falace</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Titoli accademici, abilitazioni all'insegnamento superiore ed eccellenze brevettuali.</p>\n`;
          BIOGRAFIA_PAGES.forEach(page => {
            html += `    <div class="page-indicator">Dipartimento I • Biografia Pagina ${page.pageNumber}</div>\n`;
            html += `    <p style="white-space: pre-wrap;">${page.content}</p>\n`;
          });
          html += `  </div>\n`;
        }

        // Chapter History
        if (includeHistory) {
          html += `  <div class="chapter" id="chapter-history">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO II: Atto Notarile, Statuto ed Archivio Storico</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Analisi temporale certificata (2005 - 2025) per la tutela dell'anteriorità scientifico-professionale.</p>\n`;
          ARCHIVIO_STORICO_PAGES.forEach(page => {
            html += `    <div class="page-indicator">Dipartimento II • Archivio Cronologico Pagina ${page.pageNumber}</div>\n`;
            html += `    <p style="white-space: pre-wrap;">${page.content}</p>\n`;
          });
          html += `  </div>\n`;
        }

        // Chapter Theory
        if (includeTheory) {
          html += `  <div class="chapter" id="chapter-theory">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO III: Teoria e Formule Scientifiche Coerenti</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Formulazione biofisica sul Campo Unificato Universale e Risonanza Biologica delle Attività Intellettive.</p>\n`;
          html += `    <div class="patent-card">\n`;
          html += `      <h3 style="color:#0066cc; margin-top:0;">Equazione Energetica Generale</h3>\n`;
          html += `      <h1 style="font-size: 36px; text-align:center; font-family: monospace; color:#ea580c; margin: 15px 0;">${SYNCHRONICITY_THEORY.scientific_formula}</h1>\n`;
          html += `      <p style="font-size: 13px; font-family:sans-serif; line-height:1.4; color:#555;">${SYNCHRONICITY_THEORY.description_it}</p>\n`;
          html += `    </div>\n`;
          html += `    <h2 style="font-size:20px; font-family: sans-serif; border-bottom:1px solid #666; margin-top: 40px; padding-bottom:5px;">I 9 LIVELLI DELLA SINCRONICITÀ INTENZIONALE</h2>\n`;
          SYNCHRONICITY_THEORY.levels.forEach(lvl => {
            html += `    <div style="margin-bottom: 25px; border-bottom: 1px dotted #ccc; padding-bottom:15px;">\n`;
            html += `      <h4 style="margin: 0 0 5px 0; color:#ba8b02; font-family:sans-serif;">Livello ${lvl.num} • ${lvl.title}</h4>\n`;
            html += `      <p style="margin:0; font-size: 14px; line-height: 1.5; color:#333;">${lvl.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        // Chapter Patents
        if (includePatents) {
          html += `  <div class="chapter" id="chapter-patents">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO IV: Registro dei Brevetti d'Ingegno</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Tradizione tecnologica della famiglia Falace da tre generazioni. Registro UIBM con numerazioni.</p>\n`;
          html += `    <h2>I BREVETTI DI LUCA FALACE (Titolare Unico):</h2>\n`;
          INVENTIONS_CATALOG.forEach(inv => {
            html += `    <div class="patent-card">\n`;
            html += `      <strong style="color:#ea580c; font-family:sans-serif; text-transform:uppercase; font-size:11px;">Brevetto #${inv.number} • ${inv.status}</strong>\n`;
            html += `      <h3 style="margin: 5px 0 10px 0;">${inv.title} (${inv.year})</h3>\n`;
            html += `      <p style="font-size:14px; color:#333;"><strong>Descrizione:</strong> ${inv.description}</p>\n`;
            html += `      <p style="font-size:13px; color:#555; background:#FAF6EE; padding:10px; border-radius:4px; margin-top:5px;"><strong>Dettagli di Struttura:</strong> ${inv.details}</p>\n`;
            html += `    </div>\n`;
          });
          html += `    <h2 style="margin-top: 50px;">EREDITÀ COERENTE PATERNA - I 46 BREVETTI DI LUCIO FALACE (Tabelle OPAC WIPO):</h2>\n`;
          html += `    <table style="width: 100%; border-collapse: collapse; font-family:sans-serif; font-size: 12px; margin-top:15px; border:1px solid #ccc;">\n`;
          html += `      <thead>\n        <tr style="background:#0b2240; color:white;">\n          <th style="padding:8px; border:1px solid #ccc;">N°</th><th style="padding:8px; border:1px solid #ccc;">Codice</th><th style="padding:8px; border:1px solid #ccc;">Teoria dell'Ingegno</th><th style="padding:8px; border:1px solid #ccc;">Anno</th>\n        </tr>\n      </thead>\n      <tbody>\n`;
          LUCIO_FALACE_PATENTS.forEach(pat => {
            html += `        <tr>\n          <td style="padding:8px; border:1px solid #ccc; text-align:center;">${pat.num}</td><td style="padding:8px; border:1px solid #ccc; font-weight:bold;">${pat.code}</td><td style="padding:8px; border:1px solid #ccc;">${pat.title}</td><td style="padding:8px; border:1px solid #ccc; text-align:center;">${pat.year}</td>\n        </tr>\n`;
          });
          html += `      </tbody>\n    </table>\n`;
          html += `  </div>\n`;
        }

        // Chapter Art
        if (includeArt) {
          html += `  <div class="chapter" id="chapter-art">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO V: Catalogo Opere d'Arte e Performance</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Tracciabilità per anteriorità registrata formalmente nel Ministero della Cultura (SIAE OLAF / Galleria MAXXI Roma).</p>\n`;
          ARTWORKS_CATALOG.forEach(art => {
            html += `    <div class="doc-card">\n`;
            html += `      <span class="font-sans" style="font-size:10px; color:#0066cc; font-weight:bold; text-transform:uppercase;">${art.category} • Anno ${art.year}</span>\n`;
            html += `      <h3 style="margin: 3px 0 8px 0; color:#3a2010;">${art.title}</h3>\n`;
            html += `      <p style="font-size:11px; margin: 0 0 5px 0;"><strong>Deposito Conservativo:</strong> ${art.venue}</p>\n`;
            html += `      <p style="margin:0; font-size:14px; text-align:justify; color:#333;">${art.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        // Chapter Book Previews
        if (includeSbnTexts) {
          html += `  <div class="chapter" id="chapter-books">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO VI: Antologia Letteraria dei Saggi SBN</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Riproduzione delle prime pagine o indicizzazione catalogata per consultazione accademica.</p>\n`;
          
          html += `    <h2 style="margin-top: 40px; border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Saggio I: L'Opera Celeste - Romanzo Alchemico</h2>\n`;
          operaCelestePages.forEach(p => {
            html += `    <div style="margin-bottom:30px; font-family: 'Playfair Display', Georgia, serif; line-height:1.7;">\n`;
            html += `      <div style="font-size:10px; text-transform:uppercase; color:#ea580c; font-family: monospace; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Pagina ${p.pageNumber} ${p.chapterTitle ? '• ' + p.chapterTitle : ''}</div>\n`;
            html += `      <p style="font-family: 'Playfair Display', serif; white-space: pre-wrap; font-size: 14.5px; text-align:justify;">${p.content}</p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="margin-top: 50px; border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Saggio II: Tu Sei (Manuale di Indagine Sincronica)</h3>\n`;
          tuSeiPages.forEach(p => {
            html += `    <div style="margin-bottom:30px; font-family: 'Playfair Display', Georgia, serif; line-height:1.7;">\n`;
            html += `      <div style="font-size:10px; text-transform:uppercase; color:#ea580c; font-family: monospace; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Pagina ${p.pageNumber} ${p.chapterTitle ? '• ' + p.chapterTitle : ''}</div>\n`;
            html += `      <p style="font-family: 'Playfair Display', serif; white-space: pre-wrap; font-size: 14.5px; text-align:justify;">${p.content}</p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="margin-top: 50px; border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Saggio III: Archetipi, Simboli e Sincronicità</h3>\n`;
          archetipiSimboliPages.forEach(p => {
            html += `    <div style="margin-bottom:30px; font-family: 'Playfair Display', Georgia, serif; line-height:1.7;">\n`;
            html += `      <div style="font-size:10px; text-transform:uppercase; color:#ea580c; font-family: monospace; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Pagina ${p.pageNumber} ${p.chapterTitle ? '• ' + p.chapterTitle : ''}</div>\n`;
            html += `      <p style="font-family: 'Playfair Display', serif; white-space: pre-wrap; font-size: 14.5px; text-align:justify;">${p.content}</p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="margin-top: 50px; border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Saggio IV: Archetipi Vol III (Lapis Philosophorum)</h3>\n`;
          archetipiVol3Pages.forEach(p => {
            html += `    <div style="margin-bottom:30px; font-family: 'Playfair Display', Georgia, serif; line-height:1.7;">\n`;
            html += `      <div style="font-size:10px; text-transform:uppercase; color:#ea580c; font-family: monospace; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Pagina ${p.pageNumber} ${p.chapterTitle ? '• ' + p.chapterTitle : ''}</div>\n`;
            html += `      <p style="font-family: 'Playfair Display', serif; white-space: pre-wrap; font-size: 14.5px; text-align:justify;">${p.content}</p>\n`;
            html += `    </div>\n`;
          });

          html += `    <h3 style="margin-top: 50px; border-bottom: 2px solid #ea580c; padding-bottom: 5px;">Saggio V: Mythos, Spazio e Tempo</h3>\n`;
          mythosSpazioPages.forEach(p => {
            html += `    <div style="margin-bottom:30px; font-family: 'Playfair Display', Georgia, serif; line-height:1.7;">\n`;
            html += `      <div style="font-size:10px; text-transform:uppercase; color:#ea580c; font-family: monospace; border-bottom:1px solid #ccc; padding-bottom:4px; margin-bottom:8px;">Pagina ${p.pageNumber} ${p.chapterTitle ? '• ' + p.chapterTitle : ''}</div>\n`;
            html += `      <p style="font-family: 'Playfair Display', serif; white-space: pre-wrap; font-size: 14.5px; text-align:justify;">${p.content}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        // Chapter TV & Documentaries
        if (includeTvShows) {
          html += `  <div class="chapter" id="chapter-tv">\n`;
          html += `    <h1 style="font-size:26px;">DIPARTIMENTO VII: Reportages TV, Rai, Shark Tank e Documentari</h1>\n`;
          html += `    <p style="font-style: italic; color:#666;">Trasmessi in prima serata e palinsesti nazionali italiani (Rai 2, Italia 1, Mediaset).</p>\n`;
          TV_DOC_SHOWS.forEach(tv => {
            html += `    <div class="patent-card">\n`;
            html += `      <span class="font-sans" style="font-size:10px; font-weight:bold; color:#ba8b02;">TV Show #${tv.num} • Anno ${tv.year}</span>\n`;
            html += `      <h3 style="margin: 3px 0 8px 0;">${tv.title}</h3>\n`;
            html += `      <p style="font-size:14px; text-align:justify; color:#333;">${tv.description}</p>\n`;
            html += `      <p style="font-size:12px; font-family: monospace; color:#0066cc;">Archivio video: <a href="${tv.youtubeUrl}" target="_blank" style="text-decoration:none; font-weight:bold;">Visualizza Documento Originale ↗</a></p>\n`;
            html += `    </div>\n`;
          });
          html += `    <h2 style="margin-top:40px;">IL CONSIGLIO DI SOLVAY (Fisica Quantistica applicata alle AIC) - INDICI DI DOCUMENTARI:</h2>\n`;
          DOCUMENTARY_SERIES_EPISODES.forEach(ep => {
            html += `    <div style="margin-bottom:20px; border-left:2px solid #ccc; padding-left:14px;">\n`;
            html += `      <h4 style="margin:0; font-family: sans-serif; color:#0b2240;">Episodio ${ep.num}: ${ep.title}</h4>\n`;
            html += `      <p style="margin:4px 0 0 0; font-size:13.5px; color:#444;">${ep.description}</p>\n`;
            html += `    </div>\n`;
          });
          html += `  </div>\n`;
        }

        // Epilogue / Footer
        html += `  <div class="footer">\n`;
        html += `    <p>© 2005 - 2026 Fondazione Falace delle Attività Intellettive e Creative.</p>\n`;
        html += `    <p>Creato tramite il Centro di Compilazione Digitale Integrato della Fondazione.</p>\n`;
        html += `    <p style="font-size:10px; color:#aaa; font-family:monospace; margin-top:10px;">ID UNICO FIRMA CRITTOGRAFICA: SBN_COMPATIBLE_COMPILER_V3_LUCA_FALACE</p>\n`;
        html += `  </div>\n`;

        html += `</body>\n</html>\n`;
        finalString = html;
      }

      const blob = new Blob([finalString], { type: mimeType });
      const url = URL.createObjectURL(blob);
      setEbookBlobUrl(url);
      setCompileProgress(100);
      setIsCompiling(false);
      setDownloadReady(true);
    }, 1500);
  };

  const activePageData = currentBookPages.find(p => p.pageNumber === readerPage) || currentBookPages[0];

  const filteredBooks = BOOKS_CATALOG.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || book.type === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 px-4 sm:px-6 border-b border-[#0066CC] bg-[#F7F5F0]/25 rounded-3xl" id="biblioteca-digitale-section">
      <div className="max-w-7xl mx-auto">
        
        {/* Dynamic Schema Title Panel with interactive selector requested by user */}
        <div className="bg-white border-2 border-black p-6 rounded-2xl mb-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          <div className="flex-1">
            <span className="text-[9px] font-mono text-[#0066CC] font-bold tracking-widest block mb-2 uppercase">
              ★ Scegli il Titolo Migliore (Schema Proposto)
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-black text-black leading-tight mb-1 uppercase tracking-wide">
              {selectedTitleObj.label}
            </h1>
            <p className="text-xs text-slate-600 font-sans italic">
              {selectedTitleObj.desc}
            </p>
          </div>
          
          <div className="shrink-0 flex flex-col gap-1.5 w-full md:w-auto">
            <label className="text-[10px] font-mono text-black font-bold uppercase">Cambia Intestazione:</label>
            <div className="relative">
              <select
                value={activeTitleKey}
                onChange={(e) => setActiveTitleKey(e.target.value)}
                className="w-full md:w-72 bg-white border-2 border-black rounded-lg px-3 py-2 text-xs font-mono font-bold text-[#0066CC] focus:outline-none cursor-pointer"
              >
                {titleOptions.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.label.split(' • ')[0]}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Introduction Panel */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-[#00468C] px-4 py-1.5 rounded-full text-[10px] font-mono uppercase font-black tracking-widest mb-4">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Consultazione Digitale Protetta (SBN / SIAE)</span>
          </div>
          
          <h2 className="text-3xl font-serif font-black tracking-tight text-black sm:text-4xl uppercase max-w-xl mx-auto leading-tight">
            Consultazione saggio antico &amp; moderno
          </h2>
          
          <p className="text-slate-800 text-xs sm:text-sm mt-3 leading-relaxed font-sans">
            Questo portale consente la **consultazione limitata delle premesse e dei primi capitoli** dei volumi in commercio del Dott. Luca Falace (paternità intellettuale depositata 2005–2025). Il download integrale è **rigorosamente disabilitato** per garantire l'integrità commerciale delle opere fisiche in vendita.
          </p>

          <p className="text-xs text-slate-500 font-semibold italic mt-2">
            Clicca "Leggi Anteprima" per aprire il lettore virtuale isocronico.
          </p>
        </div>

        {/* Security Shield Warnings Banner */}
        <div className="bg-[#FFF9E6] border border-amber-300 p-4 rounded-xl flex items-start gap-3.5 mb-8 text-amber-900 text-xs leading-relaxed max-w-4xl mx-auto">
          <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold text-amber-950 block">PROTEZIONE COPYRIGHT SBN-SIAE COMPATIBILE GOOGLE LIBRI:</strong>
            La consultazione digitale è protetta da protocollo SBN. Se desideri collezionare o studiare l'intero patrimonio conoscitivo del portale offline, utilizza il nostro **Compilatore di E-Book Antologia** qui sotto per generare un compendio digitale personalizzato.
          </div>
        </div>

        {/* E-BOOK COMPILER WORKSPACE PANEL */}
        <div className="bg-[#FAFAFA] border-2 border-[#0066CC] rounded-2xl p-6 sm:p-8 mb-10 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-50 text-[#0066CC] rounded-xl border border-blue-200">
                <BookOpen className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 block">Digital Library Feature</span>
                <h3 className="text-lg sm:text-xl font-serif font-black uppercase text-black">
                  Compilatore di E-Book &amp; Antologia Offline
                </h3>
              </div>
            </div>
            <button
              onClick={() => setCompilerOpen(!compilerOpen)}
              className={`text-xs font-mono font-bold uppercase tracking-wider py-2 px-4 rounded-lg border-2 transition-all cursor-pointer flex items-center gap-2 ${
                compilerOpen
                  ? 'bg-[#0066CC] border-[#0066CC] text-white shadow-sm'
                  : 'bg-white border-black text-black hover:bg-slate-50'
              }`}
            >
              <Settings className={`w-3.5 h-3.5 ${isCompiling ? 'animate-spin' : ''}`} />
              <span>{compilerOpen ? 'Chiudi Configurazione' : 'Configura e Scarica E-Book'}</span>
            </button>
          </div>

          {!compilerOpen ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50/50 rounded-xl p-4 border border-blue-100">
              <div className="text-left font-sans">
                <p className="text-xs text-slate-700 leading-relaxed font-sans">
                  Il portale permette ai visitatori di **compattare ed esportare l'intera struttura del sito** (Biografia Intellettuale, Archivio Istituzionale, Formule del Sincronismo, Registri Brevetti UIBM, Cataloghi d'Arte e Anteprime Saggi) in un **unico Libro Antologia** ad alta leggibilità.
                </p>
              </div>
              <button
                onClick={() => {
                  setCompilerOpen(true);
                  handleCompileEBook();
                }}
                className="w-full sm:w-auto shrink-0 bg-[#0066CC] hover:bg-[#00468C] text-white text-xs font-mono font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Compila Gratis</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-500 mb-4 tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#0066CC]" />
                  <span>1. Seleziona i Dipartimenti da Includere nell'E-Book:</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bio */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includeBio}
                      onChange={(e) => setIncludeBio(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento I: Biografia Certificata</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">Titoli accademici, percorsi formativi ed abilitazioni ministeriali.</span>
                    </div>
                  </label>

                  {/* Atto Storico */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includeHistory}
                      onChange={(e) => setIncludeHistory(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento II: Registro Storico (2005-2025)</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">Cronologia e protezione ad anteriorità dei depositi della Fondazione.</span>
                    </div>
                  </label>

                  {/* Teoria Sincronismo */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includeTheory}
                      onChange={(e) => setIncludeTheory(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento III: Equazione e Livelli Scientifici</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">La formula S = φ(f) ed i 9 livelli del Sincronismo Creativo.</span>
                    </div>
                  </label>

                  {/* Brevetti */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includePatents}
                      onChange={(e) => setIncludePatents(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento IV: Registro Invenzioni d'Ingegno</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">Brevetti UIBM depositati da Luca e i 46 di Lucio Falace.</span>
                    </div>
                  </label>

                  {/* Arte */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includeArt}
                      onChange={(e) => setIncludeArt(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento V: Catalogo Opere d'Arte (MiC)</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">Opere esposte in musei pubblici e documentari scientifici di videoarte.</span>
                    </div>
                  </label>

                  {/* Testi Saggi */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includeSbnTexts}
                      onChange={(e) => setIncludeSbnTexts(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento VI: Anteprime Monografie SBN</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">Integra i testi dell'Opera Celeste, TU SEI, Archetipi ecc. nell'E-book!</span>
                    </div>
                  </label>

                  {/* Shows TV */}
                  <label className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100/80 transition-all border border-transparent hover:border-slate-300">
                    <input
                      type="checkbox"
                      checked={includeTvShows}
                      onChange={(e) => setIncludeTvShows(e.target.checked)}
                      className="mt-1 accent-[#0066CC] w-4 h-4 rounded"
                    />
                    <div>
                      <strong className="text-xs text-black block font-sans">Dipartimento VII: Rai 2 &amp; Shark tank Mediaset</strong>
                      <span className="text-[10px] text-slate-500 font-sans block leading-tight">Documentari Solvay, rassegna televisiva dei report scientifici.</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Format selection */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-sm">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-500 mb-3 tracking-wider flex items-center gap-2">
                  <Sparkle className="w-3.5 h-3.5 text-amber-500" />
                  <span>2. Scegli il Formato dell'E-Book da Generare:</span>
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
                  <button
                    type="button"
                    onClick={() => { setEbookFormat('epub'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'epub'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">E-Book Standard EPUB (.epub)</strong>
                      <span className="text-[9px] font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Consigliato 📚</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Formato fluido universale ottimale per smartphone, tablet, Kobo e Apple Books. Capitoli e paragrafi strutturati come un libro stampato.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('azw3'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'azw3'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">Amazon Kindle E-Book (.epub)</strong>
                      <span className="text-[9px] font-mono font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Kindle ⚡</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Profilo d'impaginatore ottimizzato e validato per impiego sui lettori Kindle. Titoli in grassetto, rientri fissi e indice navigabile.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('pdf'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'pdf'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">Libro Tipografico PDF (.pdf)</strong>
                      <span className="text-[9px] font-mono font-black text-red-600 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Vettoriale 📄</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Layout a livello editoriale per stampa e PDF vettoriale. Offre copertina d'arte, interruzioni di capitolo e margini reali di spaziatura.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('docx'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'docx'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">Documento Word (.doc)</strong>
                      <span className="text-[9px] font-mono font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">MS Word 📝</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Esportazione compatibile con Microsoft Word, LibreOffice e Google Docs. Layout perfettamente formattato con tabelle, intestazioni e stili.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('html'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'html'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">E-Book Monumentale HTML (.html)</strong>
                      <span className="text-[9px] font-mono font-black text-[#0066CC] bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Originale</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Stile retro-editoriale raffinato ad alta leggibilità. Include indice interattivo (TOC), capocapo, decorazioni e impaginazione flessibile.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('phone'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'phone'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">E-Reader Mobile (.html)</strong>
                      <span className="text-[9px] font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Telefono 📱</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Ottimizzato per smartphone e tablet. Include menu a comparsa, bottoni per cambiare la dimensione del testo e Switcher Giorno/Notte (Light/Dark).
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('print'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'print'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">Formato Cartaceo (.html)</strong>
                      <span className="text-[9px] font-mono font-black text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Stampabile 🖨️</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Layout tipografico ad alta definizione con margini per rilegatura, interruzioni di pagina, decori fioriti e testate correnti stupende.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('txt'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'txt'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <strong className="text-xs text-black block mb-1">Antologia Testo Semplice (.txt)</strong>
                    <span className="text-[10px] text-slate-500 leading-tight block font-sans">
                      Senza alcun tag di impaginazione, ideale per importazione su e-Reader daccapo (Kindle, Kobo), lettori di sintesi vocale e taccuini offline.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { setEbookFormat('xml'); setDownloadReady(false); }}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      ebookFormat === 'xml'
                        ? 'border-[#0066CC] bg-blue-50/25 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-xs text-black block">Codice di Archivio XML (.xml)</strong>
                      <span className="text-[9px] font-mono font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Sviluppatori 🛠️</span>
                    </div>
                    <span className="text-[10px] text-slate-500 leading-tight block">
                      Schema XML strutturato e taggato semanticamente. Ideale per preservare digitalmente l&#39;archivio, parser e backup programmabili.
                    </span>
                  </button>
                </div>
              </div>

              {/* Compilation Engine Actions */}
              <div className="bg-[#FAF6EE] border border-[#ECD9BA] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-5 font-sans">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                    <strong className="text-xs text-amber-950 font-mono font-bold uppercase tracking-wider">Compilatore Isocronico Attivo:</strong>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-amber-900 font-mono">
                    <span>Pagine Stimate: <strong>~{
                      (includeBio ? 10 : 0) + 
                      (includeHistory ? 45 : 0) + 
                      (includeTheory ? 8 : 0) + 
                      (includePatents ? 20 : 0) + 
                      (includeArt ? 12 : 0) + 
                      (includeSbnTexts ? 65 : 0) + 
                      (includeTvShows ? 10 : 0)
                    } pag</strong></span>
                    <span>• Parole: <strong>~{
                      (includeBio ? 2500 : 0) + 
                      (includeHistory ? 9000 : 0) + 
                      (includeTheory ? 1500 : 0) + 
                      (includePatents ? 4000 : 0) + 
                      (includeArt ? 2400 : 0) + 
                      (includeSbnTexts ? 11000 : 0) + 
                      (includeTvShows ? 1800 : 0)
                    } parole</strong></span>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-3">
                  <button
                    type="button"
                    disabled={isCompiling}
                    onClick={handleCompileEBook}
                    className="w-full sm:w-auto bg-black hover:bg-slate-900 text-white text-xs font-mono font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md disabled:bg-slate-300 flex items-center justify-center gap-2"
                  >
                    {isCompiling ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                        <span>Compilazione... {compileProgress}%</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Avvia Compilazione</span>
                      </>
                    )}
                  </button>

                  {downloadReady && ebookBlobUrl && (
                    <a
                      href={ebookBlobUrl}
                      download={
                        ebookFormat === 'txt' ? 'opera_omnia_fondazione_falace.txt' :
                        ebookFormat === 'xml' ? 'opera_omnia_fondazione_falace.xml' :
                        ebookFormat === 'epub' ? 'opera_omnia_fondazione_falace.epub' :
                        ebookFormat === 'azw3' ? 'opera_omnia_fondazione_falace_kindle.epub' :
                        ebookFormat === 'pdf' ? 'opera_omnia_fondazione_falace.pdf' :
                        ebookFormat === 'docx' ? 'opera_omnia_fondazione_falace.doc' :
                        ebookFormat === 'phone' ? 'opera_omnia_fondazione_falace_telefono.html' :
                        ebookFormat === 'print' ? 'opera_omnia_fondazione_falace_stampabile.html' :
                        'opera_omnia_fondazione_falace.html'
                      }
                      className="w-full sm:w-auto text-center bg-[#ea580c] hover:bg-[#c2410c] text-white text-xs font-mono font-black uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 animate-bounce flex-wrap"
                    >
                      <Download className="w-4 h-4 text-white" />
                      <span>
                        Scarica {
                          ebookFormat === 'txt' ? 'Antologia (.TXT)' :
                          ebookFormat === 'xml' ? 'Archivio (.XML)' :
                          ebookFormat === 'epub' ? 'Standard EPUB (.EPUB)' :
                          ebookFormat === 'azw3' ? 'Libro Kindle (.EPUB)' :
                          ebookFormat === 'pdf' ? 'Libro PDF (.PDF)' :
                          ebookFormat === 'docx' ? 'Documento Word (.DOC)' :
                          ebookFormat === 'phone' ? 'E-Reader (.HTML)' :
                          ebookFormat === 'print' ? 'Cartaceo (.HTML)' :
                          'E-Book (.HTML)'
                        }
                      </span>
                    </a>
                  )}
                </div>
              </div>

              {isCompiling && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-inner">
                  <div className="flex justify-between text-[11px] font-mono text-[#0066CC] mb-1.5 font-bold">
                    <span>Stato: {
                      compileProgress < 30 ? 'Esecuzione query e-Book...' :
                      compileProgress < 60 ? 'Mappatura capitoli regionali SBN...' :
                      compileProgress < 90 ? 'Esecuzione stampatore vintage HTML...' :
                      'Iniezione firma notarile crittografica...'
                    }</span>
                    <span>{compileProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-[#0066CC] transition-all duration-300"
                      style={{ width: `${compileProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {downloadReady && (
                <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl flex items-start gap-3">
                  <span className="p-1 px-2 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold leading-none mt-0.5">✓</span>
                  <div>
                    <strong className="text-xs text-emerald-950 font-bold block uppercase font-mono">Compilazione completata con successo!</strong>
                    <p className="text-[11px] text-emerald-800 leading-relaxed font-sans">
                      L'antologia omnia è stata generata in locale usando la virtual memory sandbox del tuo browser. Clicca sul pulsante arancione per scaricare ed aprire il file. Se hai scelto il formato HTML, ti basta aprirlo nel browser e premere **Ctrl+P** o **Cmd+P** per salvarlo in un magnifico PDF cartaceo impaginato a dovere.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Toolbar & Filters */}
        <div className="bg-white border-2 border-black p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filtra tra le 49 monografie statali SBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:border-[#0066CC]"
            />
          </div>

          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {[
              { id: 'all', label: 'Tutti i libri' },
              { id: 'art', label: 'Arte & Poesia' },
              { id: 'philosophy', label: 'Filosofia' },
              { id: 'theory', label: 'Sincronismo' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0066CC] border-[#0066CC] text-white'
                    : 'bg-white border-slate-300 text-black hover:border-[#0066CC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => {
            const isCeleste = book.id === 'book-celeste' || book.id === 'book-celeste-ristampa';
            const isDoubleFormat = book.id !== 'book-centro-culturale-progetto' && book.id !== 'book-pubblicazioni-play';
            
            // Extract ASIN dynamically from description if direct link doesn't exist, else fallback to official author marketplace page on Amazon Italy
            const getPurchaseLink = () => {
              if (book.link) return book.link;
              const match = book.description.match(/ASIN:?\s*([A-Z0-9]{10})/i);
              if (match && match[1]) {
                return `https://www.amazon.it/dp/${match[1]}`;
              }
              return "https://www.amazon.it/Luca-Falace/e/B008KI1BZC";
            };
            const purchaseLink = getPurchaseLink();

            return (
              <div 
                key={book.id} 
                className="bg-white border-2 border-black p-6 rounded-2xl flex flex-col justify-between hover:border-[#0066CC] transition-all relative overflow-hidden group shadow-sm"
              >
                {/* Book design wrapper */}
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 uppercase font-bold">
                      {book.publisher}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-900">{book.year}</span>
                  </div>

                  {/* Simulated textured Book Cover representation */}
                  <div className={`aspect-[4/5] bg-gradient-to-br ${book.sbnCode ? 'from-[#0c2240] to-[#0166cc]' : 'from-[#3a2010] to-[#8c5225]'} border-2 border-black rounded-r-xl shadow-md p-4 mb-4 flex flex-col justify-between text-white relative group-hover:shadow-lg transition-transform duration-300 group-hover:-translate-y-1`}>
                    {/* Golden circle detail */}
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full border border-yellow-400 flex items-center justify-center text-[7px] font-serif text-yellow-300 bg-yellow-950/20 select-none">
                      {book.publisher.toLowerCase().includes('oro') ? 'ORO' : 'L.F.'}
                    </div>
                    <div className="text-[8px] font-mono tracking-widest text-slate-250 uppercase font-bold leading-none mb-1">
                      {book.sbnCode ? 'MONOGRAFIA REGISTRATA SBN' : 'DIRETTO DEPOSITO COPYRIGHT'}
                    </div>
                    <div className="my-auto py-2">
                      <h4 className="text-xs sm:text-sm font-serif font-black tracking-wide leading-tight uppercase line-clamp-3 mb-1">
                        {book.title.replace(/^\d+\.\s*/, '')}
                      </h4>
                      <div className="w-6 h-0.5 bg-yellow-400 mt-2" />
                    </div>
                    <div className="text-[7.5px] font-mono text-slate-300 flex justify-between items-center border-t border-white/10 pt-2 shrink-0">
                      <span>ISBN {book.isbn || 'MINISTERO MiC'}</span>
                      <span className="text-yellow-400 font-bold uppercase text-[7px]">Luca Falace</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold font-serif text-black tracking-tight mb-2 uppercase line-clamp-2">
                    {book.title}
                  </h3>

                  <p className="text-slate-700 text-xs font-sans leading-relaxed mb-4 line-clamp-3">
                    {book.description}
                  </p>

                  {/* SBN / MIUR Metadata badges */}
                  <div className="mb-4 space-y-2">
                    {book.sbnCode ? (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-2.5">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span className="text-[9px] font-mono font-black text-blue-800 bg-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            OPAC SBN Catalogo Nazionale
                          </span>
                          <span className="text-[9.5px] font-mono text-slate-600 font-bold">
                            {book.sbnCode}
                          </span>
                        </div>
                        
                        {book.sbnPermalink && (
                          <div className="mt-1.5 flex justify-end">
                            <a
                              href={book.sbnPermalink}
                              target="_blank"
                              rel="noopener noreferrer"
                              referrerPolicy="no-referrer"
                              className="text-[8.5px] font-mono text-[#0066CC] hover:underline font-bold flex items-center gap-0.5"
                            >
                              <span>Visualizza Scheda SBN OPAC ↗</span>
                            </a>
                          </div>
                        )}

                        {book.libraryLocations && book.libraryLocations.length > 0 && (
                          <div className="mt-1.5 pt-1.5 border-t border-blue-100">
                            <span className="text-[8px] font-mono text-slate-500 uppercase font-bold block mb-1">Presso Biblioteche Nazionali:</span>
                            <div className="flex flex-col gap-0.5">
                              {book.libraryLocations.map((loc, idx) => (
                                <span key={idx} className="text-[8px] font-sans text-slate-700 leading-tight">
                                  • {loc}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-2.5">
                        <div className="flex items-center gap-1.5 justify-between">
                          <span className="text-[9px] font-mono font-black text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                            DEPOSITATO MINISTERO MiC / MIUR
                          </span>
                          <span className="text-[8.5px] font-mono text-slate-500 font-bold">
                            Tutela Diritto d'Autore
                          </span>
                        </div>
                        <p className="text-[8px] font-sans text-amber-900 leading-tight mt-1">
                          Monografia registrata e tutelata direttamente per l'anteriorità con brevetto/copyright intellettuale presso il Ministero o SIAE OLAF.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Disponibilità:</span>
                    <strong className="text-emerald-700 font-bold uppercase">Volume Cartaceo + eBook</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Consultazione:</span>
                    <strong className="text-black font-semibold uppercase">{(isCeleste || book.id === 'book-sincronismo-metodo' || book.id === 'book-tu-sei' || book.id === 'book-archetipi-simboli' || book.id === 'book-archetipi-vol3' || book.id === 'book-mythos-spazio') ? 'Anteprima Parziale' : 'Indice + Copertina'}</strong>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => handleOpenReader(book)}
                      className="w-full py-2 bg-slate-900 hover:bg-black text-white rounded-lg font-mono font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-black active:scale-95"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                      <span>Leggi Anteprima</span>
                    </button>

                    <a
                      href={purchaseLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="w-full py-2 bg-white hover:bg-slate-50 text-[#0066CC] border border-[#0066CC] rounded-lg font-mono font-bold text-[10px] uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Acquista</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* If no results */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white border-2 border-black rounded-2xl max-w-md mx-auto">
            <HelpIcon className="w-12 h-12 text-[#0066CC] mx-auto mb-3" />
            <h4 className="font-serif font-bold text-sm uppercase text-black">Nessuna monografia trovata</h4>
            <p className="text-xs text-slate-500 mt-1">Modifica il termine della ricerca in alto.</p>
          </div>
        )}

      </div>

      {/* Ritorna il Grande Google Libri Simulator Modal */}
      {readerOpen && selectedBook && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 block overflow-y-auto">
          <div className={`w-full max-w-3xl rounded-3xl border-2 border-black overflow-hidden flex flex-col h-[92vh] max-h-[800px] transition-colors duration-300 ${
            readerTheme === 'sepia' ? 'bg-[#FCF6E8]' : readerTheme === 'dark' ? 'bg-[#18181A] text-slate-350 reader-theme-dark' : 'bg-white'
          }`}>
            
            {/* Top Toolbar */}
            <div className="bg-[#0066CC] text-white px-5 py-3.5 border-b border-black flex justify-between items-center shrink-0 shadow-sm text-xs font-mono font-bold uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-white" />
                <div className="text-left">
                  <span className="text-[10px] text-blue-200 block font-sans font-bold leading-none mb-1">GOOGLE LIBRI SIMULATION</span>
                  <span className="text-xs text-white truncate max-w-xs block leading-none">{selectedBook.title}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Theme troller */}
                <div className="flex bg-[#00468C] p-1 rounded-lg border border-white/20 gap-1 shrink-0">
                  <button 
                    onClick={() => setReaderTheme('sepia')}
                    className={`px-2 py-1 rounded text-[9px] cursor-pointer ${readerTheme === 'sepia' ? 'bg-white text-[#0066CC]' : 'text-white'}`}
                  >
                    Sepia
                  </button>
                  <button 
                    onClick={() => setReaderTheme('white')}
                    className={`px-2 py-1 rounded text-[9px] cursor-pointer ${readerTheme === 'white' ? 'bg-white text-[#0066CC]' : 'text-white'}`}
                  >
                    Chiaro
                  </button>
                  <button 
                    onClick={() => setReaderTheme('dark')}
                    className={`px-2 py-1 rounded text-[9px] cursor-pointer ${readerTheme === 'dark' ? 'bg-white text-[#0066CC]' : 'text-white'}`}
                  >
                    Scuro
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setReaderOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer border border-transparent hover:border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sub Toolbar Controls */}
            <div className={`px-5 py-2.5 border-b flex flex-wrap justify-between items-center gap-3 shrink-0 text-xs font-mono ${
              readerTheme === 'sepia' ? 'border-[#E6DEC9] bg-[#F7F0D8]' : readerTheme === 'dark' ? 'border-zinc-800 bg-[#1D1D20]' : 'border-slate-100 bg-slate-50'
            }`}>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#0066CC] uppercase">
                <Lock className="w-3.5 h-3.5" />
                <span>Download Rigidamente Inibito • ID SBN OPAC</span>
              </div>

              <div className="flex items-center gap-3">
                {/* Zoom */}
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setReaderPageZoom(Math.max(80, readerZoom - 10))}
                    className="p-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-black cursor-pointer active:scale-95"
                    title="Rimpicciolisci Testo"
                  >
                    <ZoomOut className="w-3.5 h-3.5 font-bold" />
                  </button>
                  <span className={`text-[10px] font-bold px-1.5 ${readerTheme === 'dark' ? 'text-white' : 'text-slate-700'}`}>{readerZoom}%</span>
                  <button 
                    onClick={() => setReaderPageZoom(Math.min(150, readerZoom + 10))}
                    className="p-1 bg-white hover:bg-slate-50 border border-slate-300 rounded text-black cursor-pointer active:scale-95"
                    title="Ingrandisci Testo"
                  >
                    <ZoomIn className="w-3.5 h-3.5 font-bold" />
                  </button>
                </div>
              </div>
            </div>

            {/* Read Content Window - mimics reading a paper book */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 select-none relative" id="book-content-scroll">
              <div className="max-w-xl mx-auto space-y-4">
                
                {/* Chapter Title Badge */}
                {activePageData.chapterTitle && (
                  <div className="text-center mb-6">
                    <span className="text-[9px] font-mono tracking-widest text-[#0066CC] border border-[#0066CC]/35 uppercase px-2 py-0.5 rounded font-black bg-white/20 select-none">
                      {activePageData.chapterTitle}
                    </span>
                  </div>
                )}

                {/* Simulated Book paper Page */}
                <div 
                  style={{ fontSize: `${(readerZoom / 100) * 14}px` }} 
                  className={`font-serif tracking-normal leading-relaxed whitespace-pre-line text-justify select-text focus:outline-none transition-all duration-300 ${
                    readerTheme === 'sepia' ? 'text-[#2D241E]' : readerTheme === 'dark' ? 'text-zinc-200' : 'text-black'
                  }`}
                >
                  {/* Visual design cover page 1 */}
                  {readerPage === 1 && (selectedBook.id === 'book-celeste' || selectedBook.id === 'book-celeste-ristampa') ? (
                    <div className="py-10 text-center flex flex-col justify-between min-h-[350px] border-4 border-double border-[#0066CC]/30 rounded-2xl p-6 bg-blue-50/20 max-w-sm mx-auto shadow-inner relative">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#0066CC]/15 rounded-xl pointer-events-none" />
                      <div>
                        <span className="text-[10px] font-mono text-[#0066CC] tracking-widest uppercase block mb-6 font-black">
                          • ROMANZO ALCHEMICO FILOSOFICO •
                        </span>
                        <h2 className="text-3xl font-serif font-black text-black leading-tight tracking-wide mb-2">
                          L'OPERA CELESTE
                        </h2>
                        <span className="text-xs text-slate-600 font-mono tracking-widest font-black uppercase">
                          STUDIO DI DIRETTA SINCRO
                        </span>
                      </div>

                      <div className="my-[40px]">
                        {/* Golden Circle Logo */}
                        <div className="w-16 h-14 rounded-full border-2 border-yellow-500 bg-yellow-50 text-[10px] font-serif tracking-widest font-bold text-yellow-600 flex flex-col items-center justify-center mx-auto shadow-md select-none">
                          <span className="leading-none block font-black">ORO</span>
                          <span className="text-[6.5px] leading-none block font-sans tracking-wide">EDIZIONI</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-4 mt-4">
                        <p className="text-[10px] font-mono text-slate-700 leading-none">
                          AUTORE: <span className="font-bold text-black uppercase">LUCA FALACE</span>
                        </p>
                        <p className="text-[8.5px] font-mono text-slate-500 tracking-wider mt-1">
                          EDITORE: O.R.O. EDIZIONI • ANNO 2005
                        </p>
                      </div>
                    </div>
                  ) : readerPage === 1 && selectedBook.id === 'book-tu-sei' ? (
                    <div className="py-10 text-center flex flex-col justify-between min-h-[350px] border-4 border-double border-[#0066CC]/30 rounded-2xl p-6 bg-blue-50/20 max-w-sm mx-auto shadow-inner relative">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-[#0066CC]/15 rounded-xl pointer-events-none" />
                      <div>
                        <span className="text-[10px] font-mono text-[#0066CC] tracking-widest uppercase block mb-6 font-black">
                          • MANUALE DI INDAGINE INTERIORE •
                        </span>
                        <h2 className="text-3xl font-serif font-black text-black leading-tight tracking-wide mb-2 uppercase">
                          TU SEI
                        </h2>
                        <span className="text-[10px] text-slate-600 font-mono tracking-wider font-bold block mb-1">
                          SINCRONISMI, COINCIDENZE, SINCRONICITÀ
                        </span>
                      </div>

                      <div className="my-[40px]">
                        {/* SCS Emblem */}
                        <div className="w-16 h-14 rounded-full border-2 border-yellow-500 bg-yellow-50 text-[10px] font-serif tracking-widest font-bold text-yellow-600 flex flex-col items-center justify-center mx-auto shadow-md select-none">
                          <span className="leading-none block font-black text-[9px]">S.C.S</span>
                          <span className="text-[5.5px] leading-none block font-sans tracking-wide uppercase">STUDIO CREATIVO</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-4 mt-4">
                        <p className="text-[10px] font-mono text-slate-700 leading-none">
                          AUTORE: <span className="font-bold text-black uppercase">LUCA FALACE</span>
                        </p>
                        <p className="text-[8.5px] font-mono text-slate-500 tracking-wider mt-1">
                          EDITORE: YOUCANPRINT / ESPRESSO • ANNO 2005 / 2011
                        </p>
                      </div>
                    </div>
                  ) : readerPage === 1 && selectedBook.id === 'book-archetipi-simboli' ? (
                    <div className="py-10 text-center flex flex-col justify-between min-h-[350px] border-4 border-double border-amber-600/30 rounded-2xl p-6 bg-amber-50/20 max-w-sm mx-auto shadow-inner relative">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-amber-600/15 rounded-xl pointer-events-none" />
                      <div>
                        <span className="text-[10px] font-mono text-amber-700 tracking-widest uppercase block mb-6 font-black">
                          • SINCRONISMO CREATIVO •
                        </span>
                        <h1 className="text-2xl font-serif font-black text-amber-950 leading-tight tracking-wide mb-2 uppercase">
                          ARCHETIPI, SIMBOLI E SINCRONICITÀ
                        </h1>
                        <span className="text-[9px] text-amber-800 font-mono tracking-wider font-bold block mb-1">
                          MANIFESTARE CON GLI EVENTI PARALLELI
                        </span>
                      </div>

                      <div className="my-[40px]">
                        <div className="w-16 h-14 rounded-full border-2 border-amber-500 bg-amber-50 text-[10px] font-serif tracking-widest font-bold text-amber-600 flex flex-col items-center justify-center mx-auto shadow-md select-none">
                          <span className="leading-none block font-black text-[9px]">AIC</span>
                          <span className="text-[5.5px] leading-none block font-sans tracking-wide uppercase">ARTE &amp; SCIENZA</span>
                        </div>
                      </div>

                      <div className="border-t border-amber-200 pt-4 mt-4">
                        <p className="text-[10px] font-mono text-amber-900 leading-none">
                          AUTORE: <span className="font-bold text-black uppercase">LUCA FALACE</span>
                        </p>
                        <p className="text-[8.5px] font-mono text-amber-600 tracking-wider mt-1">
                          EDITORE: CENTRO CULTURALE ARTE &amp; SCIENZA • ANNO 2005
                        </p>
                      </div>
                    </div>
                  ) : readerPage === 1 && selectedBook.id === 'book-archetipi-vol3' ? (
                    <div className="py-10 text-center flex flex-col justify-between min-h-[350px] border-4 border-double border-purple-600/30 rounded-2xl p-6 bg-purple-50/20 max-w-sm mx-auto shadow-inner relative">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-purple-600/15 rounded-xl pointer-events-none" />
                      <div>
                        <span className="text-[10px] font-mono text-purple-700 tracking-widest uppercase block mb-6 font-black">
                          • LAPIS PHILOSOPHORUM •
                        </span>
                        <h1 className="text-2xl font-serif font-black text-purple-950 leading-tight tracking-wide mb-2 uppercase">
                          ARCHETIPI, SIMBOLI, SINCRONICITÀ
                        </h1>
                        <span className="text-[10px] text-purple-800 font-mono tracking-wider font-bold block mb-1">
                          ALCHIMIA SPIRITUALE • VOLUME III
                        </span>
                      </div>

                      <div className="my-[40px]">
                        <div className="w-16 h-14 rounded-full border-2 border-purple-500 bg-purple-50 text-[10px] font-serif tracking-widest font-bold text-purple-600 flex flex-col items-center justify-center mx-auto shadow-md select-none">
                          <span className="leading-none block font-black text-[9px]">VOL. III</span>
                          <span className="text-[5.5px] leading-none block font-sans tracking-wide uppercase text-purple-500">ALCHIMIA</span>
                        </div>
                      </div>

                      <div className="border-t border-purple-200 pt-4 mt-4">
                        <p className="text-[10px] font-mono text-purple-900 leading-none">
                          AUTORE: <span className="font-bold text-black uppercase">LUCA FALACE</span>
                        </p>
                        <p className="text-[8.5px] font-mono text-purple-600 tracking-wider mt-1">
                          EDITORE: CENTRO CULTURALE ARTE &amp; SCIENZA • ANNO 2005
                        </p>
                      </div>
                    </div>
                  ) : readerPage === 1 && selectedBook.id === 'book-mythos-spazio' ? (
                    <div className="py-10 text-center flex flex-col justify-between min-h-[350px] border-4 border-double border-yellow-600/30 rounded-2xl p-6 bg-yellow-50/20 max-w-sm mx-auto shadow-inner relative">
                      <div className="absolute top-2 left-2 right-2 bottom-2 border border-yellow-600/15 rounded-xl pointer-events-none" />
                      <div>
                        <span className="text-[10px] font-mono text-[#0066CC] tracking-widest uppercase block mb-6 font-black">
                          • MYTHOS, SPAZIO E TEMPO •
                        </span>
                        <h2 className="text-2xl font-serif font-black text-amber-950 leading-tight tracking-wide mb-2 uppercase">
                          LA CONOSCENZA EVOLUTIVA
                        </h2>
                        <span className="text-[10px] text-slate-600 font-mono tracking-wider font-bold block mb-1">
                          COINCIDENZE NELL'ARTE, MITI E LEGGENDE
                        </span>
                      </div>

                      <div className="my-[40px]">
                        <div className="w-16 h-14 rounded-full border-2 border-yellow-500 bg-yellow-50 text-[10px] font-serif tracking-widest font-bold text-yellow-600 flex flex-col items-center justify-center mx-auto shadow-md select-none">
                          <span className="leading-none block font-black text-[9px]">MYTHOS</span>
                          <span className="text-[5.5px] leading-none block font-sans tracking-wide uppercase text-yellow-600">VOL. II</span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 pt-4 mt-4">
                        <p className="text-[10px] font-mono text-slate-700 leading-none">
                          AUTORE: <span className="font-bold text-black uppercase">LUCA FALACE</span>
                        </p>
                        <p className="text-[8.5px] font-mono text-slate-500 tracking-wider mt-1">
                          EDITORE: BOOKS ON DEMAND • ANNO 2018
                        </p>
                      </div>
                    </div>
                  ) : readerPage === 17 && (selectedBook.id === 'book-celeste' || selectedBook.id === 'book-celeste-ristampa') ? (
                    /* Page 17 consultation block style for L'Opera Celeste */
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto border-2 border-red-300">
                        <Lock className="w-6 h-6" />
                      </div>
                      
                      <h4 className="font-serif font-black text-base uppercase text-red-950 tracking-wide">
                        LIMITE DI ANTEPRIMA RAGGIUNTO
                      </h4>
                      
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans">
                        La riproduzione parziale di questa monografia statale (pagine 1–16) adibita alla valorizzazione scientifica si ferma qui per accordi commerciali. L'Opera Celeste è tutelata da copyright SBN statale in Firenze e Roma.
                      </p>

                      <div className="p-4 bg-white border-2 border-black rounded-2xl max-w-sm mx-auto shadow-sm space-y-3">
                        <div className="text-[9px] font-mono text-[#0066CC] font-bold block uppercase leading-none">
                          Incentivo Sviluppo &amp; Acquisto
                        </div>
                        <h5 className="font-serif font-bold text-xs text-slate-800 leading-snug">
                          Acquista la copia originale completa per consultare i 41 schemi idraulici, le 12 Rivelazioni, ed il Saggio clinico.
                        </h5>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <a
                            href={selectedBook.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-[#0066CC] hover:bg-black text-white text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Acquista su Payhip</span>
                          </a>
                          
                          <a
                            href="https://www.amazon.it/gp/product/B008KA6PPQ"
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-350 text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all active:scale-95 cursor-pointer"
                          >
                            <span className="text-yellow-500 font-serif">a</span>
                            <span>Acquista su Amazon</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : readerPage === 17 && selectedBook.id === 'book-tu-sei' ? (
                    /* Page 17 consultation block style for TU SEI */
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto border-2 border-red-300">
                        <Lock className="w-6 h-6" />
                      </div>
                      
                      <h4 className="font-serif font-black text-base uppercase text-red-950 tracking-wide">
                        ANTEPRIMA EDITORIALE COMPLETA
                      </h4>
                      
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans">
                        La riproduzione parziale di questa monografia statale (pagine 1–16) adibita alla valorizzazione scientifica si ferma qui per accordi commerciali. Il saggio «TU SEI: Sincronismi, Coincidenze, Sincronicità» è tutelato e depositato SIAE Olafs.
                      </p>

                      <div className="p-4 bg-white border-2 border-black rounded-2xl max-w-sm mx-auto shadow-sm space-y-3">
                        <div className="text-[9px] font-mono text-[#0066CC] font-bold block uppercase leading-none">
                          Incentivo Sviluppo &amp; Acquisto
                        </div>
                        <h5 className="font-serif font-bold text-xs text-slate-800 leading-snug">
                          Acquista la copia originale completa per consultare i 10 capitoli integrali, il Compendio degli Eventi Paralleli, ed il Saggio clinico.
                        </h5>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <a
                            href={selectedBook.link || "https://payhip.com/LucArtStudio"}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-[#0066CC] hover:bg-black text-white text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Acquista su Payhip</span>
                          </a>
                          
                          <a
                            href="https://www.amazon.it/TU-SEI-Sincronismi-Coincidenze-Sincronicit%C3%A0/dp/8866181292"
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-350 text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all active:scale-95 cursor-pointer"
                          >
                            <span className="text-yellow-500 font-serif">a</span>
                            <span>Acquista su Amazon</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : readerPage === 17 && selectedBook.id === 'book-archetipi-simboli' ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto border-2 border-red-300">
                        <Lock className="w-6 h-6" />
                      </div>
                      
                      <h4 className="font-serif font-black text-base uppercase text-red-950 tracking-wide">
                        LIMITE DI ANTEPRIMA RAGGIUNTO
                      </h4>
                      
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans">
                        La riproduzione parziale di questa monografia statale (pagine 1–16) si ferma qui per accordi editoriali. Il saggio «ARCHETIPI, SIMBOLI E SINCRONICITÀ» è registrato e tutelato SIAE OLAF.
                      </p>

                      <div className="p-4 bg-white border-2 border-black rounded-2xl max-w-sm mx-auto shadow-sm space-y-3">
                        <div className="text-[9px] font-mono text-[#0066CC] font-bold block uppercase leading-none">
                          Opera Completa per lo Studio dei Sincronismi
                        </div>
                        <h5 className="font-serif font-bold text-xs text-slate-800 leading-snug">
                          Acquista la copia originale completa per consultare i 12 capitoli originali e l'esposizione clinica sul Sincronismo Creativo.
                        </h5>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <a
                            href={selectedBook.link || "https://payhip.com/LucArtStudio"}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-[#0066CC] hover:bg-black text-white text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Acquista su Payhip</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : readerPage === 17 && selectedBook.id === 'book-archetipi-vol3' ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto border-2 border-red-300">
                        <Lock className="w-6 h-6" />
                      </div>
                      
                      <h4 className="font-serif font-black text-base uppercase text-red-950 tracking-wide">
                        LIMITE DI ANTEPRIMA RAGGIUNTO
                      </h4>
                      
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans">
                        La riproduzione parziale di questa monografia statale (pagine 1–16) si ferma qui per accordi editoriali. Il volume «ARCHETIPI, SIMBOLI, SINCRONICITÀ VOL. III» è depositato SIAE OLAF.
                      </p>

                      <div className="p-4 bg-white border-2 border-black rounded-2xl max-w-sm mx-auto shadow-sm space-y-3">
                        <div className="text-[9px] font-mono text-[#0066CC] font-bold block uppercase leading-none">
                          Lapis Philosophorum - Alchimia Spirituale
                        </div>
                        <h5 className="font-serif font-bold text-xs text-slate-800 leading-snug">
                          Acquista il testo integrale comprensivo degli studi comparativi Cabala-Chakra, le meditazioni Kundalini e il Saggio sul Risveglio.
                        </h5>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <a
                            href={selectedBook.link || "https://payhip.com/LucArtStudio"}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-[#0066CC] hover:bg-black text-white text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Acquista su Payhip</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : readerPage === 17 && selectedBook.id === 'book-mythos-spazio' ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto border-2 border-red-300">
                        <Lock className="w-6 h-6" />
                      </div>
                      
                      <h4 className="font-serif font-black text-base uppercase text-red-950 tracking-wide">
                        LIMITE DI ANTEPRIMA RAGGIUNTO
                      </h4>
                      
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto font-sans">
                        La riproduzione parziale di questa monografia statale (pagine 1–16) adibita alla valorizzazione scientifica si ferma qui per accordi commerciali SBN.
                      </p>

                      <div className="p-4 bg-white border-2 border-black rounded-2xl max-w-sm mx-auto shadow-sm space-y-3">
                        <div className="text-[9px] font-mono text-[#0066CC] font-bold block uppercase leading-none">
                          La Conoscenza Evolutiva
                        </div>
                        <h5 className="font-serif font-bold text-xs text-slate-800 leading-snug">
                          Acquista la copia originale per consultare la Cronologia Evolutiva completa e lo studio comparato sui miti degli angeli e antiche civiltà.
                        </h5>
                        
                        <div className="pt-2 flex flex-col gap-2">
                          <a
                            href={selectedBook.link || "https://payhip.com/LucArtStudio"}
                            target="_blank"
                            rel="noopener noreferrer"
                            referrerPolicy="no-referrer"
                            className="bg-[#0066CC] hover:bg-black text-white text-xs font-mono font-bold py-2.5 rounded-lg flex items-center justify-center gap-1.5 uppercase transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>Acquista su Payhip</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ) : (
                    activePageData.content
                  )}

                </div>
              </div>
            </div>

            {/* Bottom Navigation & Buy bar */}
            <div className={`px-5 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 shrink-0 shadow-lg ${
              readerTheme === 'sepia' ? 'border-[#E6DEC9] bg-[#F3ECE1]' : readerTheme === 'dark' ? 'border-zinc-800 bg-[#1D1D20]' : 'border-slate-100 bg-slate-50'
            }`}>
              
              {/* Pages indicators */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setReaderPage(Math.max(1, readerPage - 1));
                    document.getElementById('book-content-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={readerPage === 1}
                  className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-black rounded-lg text-xs font-mono font-bold text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer select-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono font-bold text-slate-700 px-3 py-1 bg-white border border-slate-200 rounded-md">
                  Pagina <span className="text-[#0066CC] font-bold">{readerPage}</span> di {currentBookPages.length}
                </span>

                <button
                  onClick={() => {
                    setReaderPage(Math.min(currentBookPages.length, readerPage + 1));
                    document.getElementById('book-content-scroll')?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  disabled={readerPage === currentBookPages.length}
                  className="px-3.5 py-1.5 bg-white border border-slate-300 hover:border-black rounded-lg text-xs font-mono font-bold text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer select-none"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Buying incentive Call to Action */}
              <div className="flex items-center gap-3">
                {selectedBook.link && (
                  <a
                    href={selectedBook.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="px-5 py-2 bg-[#0066CC] hover:bg-black text-white text-xs font-mono font-bold rounded-lg uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all hover:scale-103 active:scale-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                    <span>Acquista Testo Completo</span>
                  </a>
                )}
                <span className="text-[10px] font-mono text-[#0066CC] font-black uppercase text-center shrink-0 border border-dashed border-[#0066CC]/30 px-2 py-1 rounded">
                  ★ SBN COERENTE
                </span>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
}

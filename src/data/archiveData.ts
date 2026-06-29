export interface Book {
  id: string;
  title: string;
  year: number;
  publisher: string;
  isbn?: string;
  pages?: string;
  type: 'art' | 'philosophy' | 'theory' | 'patent' | 'science';
  doi?: string;
  description: string;
  link?: string;
  asin?: string;
  sbnCode?: string;
  sbnPermalink?: string;
  libraryLocations?: string[];
  ministeroDeposit?: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  year: number;
  category: string;
  venue: string;
  description: string;
}

export interface Invention {
  id: string;
  number: number;
  title: string;
  year: number;
  patentNum?: string;
  status: 'registered' | 'donated' | 'deposited';
  description: string;
  details: string;
}

export interface DocumentaryEpisode {
  num: number;
  title: string;
  description: string;
}

export interface TvEpisode {
  num: number;
  title: string;
  year: number;
  topics: string;
  description: string;
  youtubeUrl: string;
}

export interface Track {
  num: number;
  title: string;
}

export interface SyncLevel {
  num: number;
  title: string;
  description: string;
}

export const FOUNDATION_METADATA = {
  denomination_it: "FONDAZIONE FALACE",
  denomination_en: "FALACE FOUNDATION",
  founder: "Dott. Luca Falace",
  email: "Dott.LucaFalace@gmail.com",
  ateco_code: "72.20.00",
  ateco_desc_it: "Ricerca e Sviluppo Sperimentale nel settore delle Scienze Sociali ed Umanistiche",
  ateco_desc_en: "Experimental Research and Development in Social Sciences and Humanities",
  scope_it: "PATRIMONIO DELLE ATTIVITÀ INTELLETTIVE CREATIVE NEI RIGUARDI DELLE ARTI E DELLE SCIENZE",
  scope_en: "Guardianship, logical archival, rigorous systemization, and global dissemination of the Founder's scientific, bibliographic, and patent heritage",
  legal_backing: {
    mic_mibac: "MiC / MiBAC (Ministero della Cultura — Tutela Diritto d'Autore: 250 Opere d'Arte e Libri registrati)",
    uibm: "UIBM (Ufficio Italiano Brevetti e Marchi: 3 Brevetti d'Invenzione Industriale)",
    zenodo_cern_doi: "CERN Zenodo (Archivio Digitale DOI dell'Unione Europea con indici permanenti)",
    opac_sbn: "OPAC SBN (ICCU Registro Bibliotecario Nazionale: 49 Monografie catalogate)",
    dds_discoteca: "Discoteca di Stato (Dds Museo dell'audiovisivo — Deposito Legale Sonore AIC dal 2007)",
    museo_maxxi: "Museo MAXXI (Catalogazione Contemporanea e tutela dell'anteriorità)"
  }
};

export const BOOKS_CATALOG: Book[] = [
  {
    id: "book-celeste",
    title: "1. L'Opera Celeste – Romanzo Alchemico Filosofico",
    year: 2005,
    publisher: "O.R.O. Edizioni",
    isbn: "88-901926-0-7",
    type: "art",
    description: "I ed.: O.R.O. Edizioni (2005) – ISBN: 88-901926-0-7. Romanzo alchemico-filosofico fondamentale; attesta la paternità della Teoria del Sincronismo Creativo di Luca Falace.",
    link: "https://payhip.com/LucArtStudio",
    sbnCode: "IT\\ICCU\\NAP\\0339379",
    sbnPermalink: "http://id.sbn.it/bid/NAP0339379",
    libraryLocations: [
      "FI0098 — Biblioteca Nazionale Centrale di Firenze",
      "NA0079 — Biblioteca Nazionale Vittorio Emanuele III (Napoli)",
      "RM0267 — Biblioteca Nazionale Centrale di Roma",
      "NA0649 — Biblioteca del Centro Pan - Palazzo delle Arti Napoli"
    ],
    ministeroDeposit: true
  },
  {
    id: "book-celeste-en",
    title: "2. The Celestial Opera – Edizione Inglese de L'Opera Celeste",
    year: 2005,
    publisher: "Amazon Edizioni",
    type: "art",
    description: "Edizione inglese de L'Opera Celeste. Amazon Edizioni – ASIN: B008KA6PPQ. Registrato e tutelato anche tramite deposito ministeriale.",
    link: "https://www.amazon.it/gp/product/B008KA6PPQ",
    ministeroDeposit: true
  },
  {
    id: "book-centro-culturale-progetto",
    title: "3. Progetto Istituzionale: Centro Culturale Arte, Scienza e Sincronicità",
    year: 2005,
    publisher: "Ministero per I Beni e le Attività Culturali",
    type: "philosophy",
    description: "Deposito del Progetto Istituzionale di Architettura d'Interni (Centro Culturale polifunzionale per la ricerca dei Sincronismi Creativi). Depositato presso SIAE Sezione OLAF (2005) ed il Ministero per I Beni e le Attività Culturali Ufficio Diritto d'Autore (10-11-2005).",
    ministeroDeposit: true
  },
  {
    id: "book-archetipi-simboli",
    title: "Archetipi, Simboli e Sincronicità: Manifestare con il Sincronismo Creativo",
    year: 2005,
    publisher: "Centro Culturale Arte & Scienza / SIAE",
    type: "philosophy",
    description: "Saggio fondamentale che unisce archetipi, simboli e sincronicità. Studio pionieristico sul Sincronismo Creativo come interazione ottimale tra mente, cuore e materia. Depositato SIAE OLAF (2005).",
    link: "https://payhip.com/LucArtStudio",
    ministeroDeposit: true
  },
  {
    id: "book-archetipi-vol3",
    title: "Archetipi, Simboli, Sincronicità Vol. III (Lapis Philosophorum)",
    year: 2005,
    publisher: "Centro Culturale Arte & Scienza / SIAE",
    type: "philosophy",
    description: "Lapis Philosophorum Volume III. Studio integrativo sulle dinamiche di unione degli opposti, ascesa della Kundalini attraverso i chakra e parallelismi con le Sephiroth cabalistiche. Depositato SIAE OLAF (2005).",
    link: "https://payhip.com/LucArtStudio",
    ministeroDeposit: true
  },
  {
    id: "book-studio-eventi",
    title: "4. Il Sincronismo Creativo. Studio degli Eventi Paralleli",
    year: 2007,
    publisher: "Boopen Edizioni / Photocity",
    isbn: "978-88-6223-564-8",
    type: "theory",
    description: "Saggio originale per lo studio degli eventi paralleli. Boopen Edizioni (2007) / Photocity Edizioni (2008) – ISBN: 978-88-6223-564-8.",
    link: "https://payhip.com/LucArtStudio",
    sbnCode: "IT\\ICCU\\NAP\\0517141",
    sbnPermalink: "http://id.sbn.it/bid/NAP0517141",
    ministeroDeposit: true
  },
  {
    id: "book-arte-alchemica-media",
    title: "5. L'Arte Alchemica",
    year: 2007,
    publisher: "DDS Discoteca di Stato",
    type: "art",
    description: "Vernissage virtuel de l'artiste Luca Falace. Registrazione nazionale SBN: IT\\ICCU\\NAP\\0379182. Documento multimediale depositato legalmente presso il Ministero della Cultura, DDS Discoteca di Stato e MAV Museo dell'Audiovisivo.",
    sbnCode: "IT\\ICCU\\NAP\\0379182",
    sbnPermalink: "http://id.sbn.it/bid/NAP0379182",
    ministeroDeposit: true
  },
  {
    id: "book-arte-simbolo",
    title: "6. L'Arte e il Simbolo. Coincidenze Mitologiche",
    year: 2007,
    publisher: "Boopen Edizioni",
    isbn: "978-88-6223-314-9",
    type: "philosophy",
    description: "Saggio di interpretazione storica e archetipica. Boopen Edizioni (2007) – ISBN: 978-88-6223-314-9.",
    link: "https://payhip.com/LucArtStudio",
    sbnCode: "IT\\ICCU\\NAP\\0426652",
    sbnPermalink: "http://id.sbn.it/bid/NAP0426652",
    ministeroDeposit: true
  },
  {
    id: "book-arte-intellettuale",
    title: "7. L'Arte Intellettuale Volume 1° & 2°",
    year: 2007,
    publisher: "DDS Discoteca di Stato",
    type: "art",
    description: "Manifesto e schede storiche del movimento dell'Arte Intellettuale di Luca Falace. Monografia in volume cartaceo con CD allegato. Registrato in SBN.",
    sbnCode: "IT\\ICCU\\NAP\\0498186",
    sbnPermalink: "http://id.sbn.it/bid/NAP0498186",
    libraryLocations: [
      "NA0649 — Biblioteca del Centro Pan - Palazzo delle Arti Napoli"
    ],
    ministeroDeposit: true
  },
  {
    id: "book-soldi-successo",
    title: "8. Soldi, Successo e Salute – Manuale di Autostima",
    year: 2008,
    publisher: "Bruno Editore",
    isbn: "978-88-6174-179-9",
    type: "philosophy",
    description: "Manuale pratico con audioesercitazioni. Bruno Editore (2008, eBook) – Riedizione cartacea 2021: ISBN 978-88-6174-179-9."
  },
  {
    id: "book-amore-alchemico",
    title: "9. L'Amore Alchemico, Amore Mysterium Coniunctionis",
    year: 2010,
    publisher: "L'Espresso ilmiolibro",
    type: "art",
    description: "Monografia lirica e di sintesi esoterica rintracciabile nel circuito ilmiolibro del Gruppo Editoriale L'Espresso (2010) ed eBook Kindle (2012): ASIN B008L4141Q."
  },
  {
    id: "book-celeste-ristampa",
    title: "10. L'Opera Celeste (Seconda Ristampa)",
    year: 2010,
    publisher: "Gruppo Editoriale L'Espresso",
    type: "art",
    description: "Seconda ristampa del celebre romanzo alchemico-filosofico edito dal Gruppo Editoriale L'Espresso per la diffusione nazionale."
  },
  {
    id: "book-tu-sei",
    title: "11. Tu Sei: Sincronismi, Coincidenze, Sincronicità",
    year: 2011,
    publisher: "Youcanprint",
    isbn: "978-88-6618-129-9",
    type: "philosophy",
    description: "Saggio sulla teoria di C. G. Jung e le estensioni della Teoria del Sincronismo Creativo. Youcanprint (2011) – ISBN: 978-88-6618-129-9 (eBook: 978-88-6618-356-9).",
    link: "https://payhip.com/LucArtStudio"
  },
  {
    id: "book-amore-alchemico-eb",
    title: "12. Amore Alchemico (eBook Kindle)",
    year: 2012,
    publisher: "Amazon KDP",
    type: "art",
    description: "Formato digitale per Kindle del corpus poetico e grafico del Sincronismo. Amazon KDP (2012) – ASIN: B008L4141Q."
  },
  {
    id: "book-astrologia",
    title: "13. Astrologia Umanistica (eBook e Audiobook)",
    year: 2012,
    publisher: "Bruno Editore",
    isbn: "978-88-6174-450-9",
    type: "philosophy",
    description: "Corso in eBook e Audio. Bruno Editore (2012) – ISBN: 978-88-6174-450-9."
  },
  {
    id: "book-segreto-mitologico-eb",
    title: "14. Il Segreto Mitologico (eBook Kindle)",
    year: 2012,
    publisher: "Amazon KDP",
    type: "philosophy",
    description: "Saggio sul codice simbolico degli dei e dell'ingegno. Amazon KDP (2012) – ASIN: B008NAGT2M."
  },
  {
    id: "book-terapia-aria",
    title: "15. La Terapia dell'Aria. La Macchina del Benessere",
    year: 2012,
    publisher: "Amazon KDP",
    type: "patent",
    description: "Invenzione e brevetto della macchina del benessere. Trascrizione depositata del sistema aero-ambientale. eBook KDP (2012) – ASIN: B008L69132. Paternità Siae 2004."
  },
  {
    id: "book-attrazione-eb",
    title: "16. L'Antica Legge di Attrazione",
    year: 2012,
    publisher: "Amazon KDP",
    type: "theory",
    description: "Trattato sistematico sull'attrazione e sull'allineamento di fase psicofisica. eBook Kindle Amazon (2012) – ASIN: B008WLP5ZO."
  },
  {
    id: "book-arte-alchemica-eb",
    title: "17. L'Arte Alchemica",
    year: 2012,
    publisher: "Amazon KDP",
    type: "art",
    description: "Versione digitale per la salvaguardia delle opere del ciclo alchemico. Amazon KDP (2012) – ASIN: B008V1YTT8."
  },
  {
    id: "book-arte-intellettuale-eb",
    title: "18. L'Arte Intellettuale & L'Arte Intellettuale II (Volume I & II)",
    year: 2012,
    publisher: "Amazon KDP",
    type: "art",
    description: "Versione eBook Kindle della ricerca storica, filosofica e figurativa dell'Artes Liberales. Target ASIN: B008UFIACC / B008UR3KHK."
  },
  {
    id: "book-celeste-eb",
    title: "19. L'Opera Celeste (Edizione Digitale)",
    year: 2012,
    publisher: "Amazon KDP",
    type: "art",
    description: "Edizione eBook Kindle. Romanzo alchemico-filosofico. Amazon KDP (2012) – ASIN: B008KA6R0O."
  },
  {
    id: "book-eventi-paralleli-eb",
    title: "20. Teoria degli Eventi Paralleli",
    year: 2012,
    publisher: "Amazon KDP",
    type: "theory",
    description: "Testo fondamentale sugli eventi paralleli ed il sintonizzatore isocronico universale. Amazon KDP (2012) – ASIN: B008WK5V5Y."
  },
  {
    id: "book-celeste-en-eb",
    title: "21. The Celestial Opera (eBook Kindle English Edition)",
    year: 2012,
    publisher: "Amazon KDP",
    type: "art",
    description: "The official english novel edition on Kindle market. Amazon KDP (2012) – ASIN: B008KA6PPQ."
  },
  {
    id: "book-celeste-3ed",
    title: "22. L'Opera Celeste (Terza Edizione)",
    year: 2013,
    publisher: "Iemme Edizioni",
    isbn: "978-88-97776-08-6",
    type: "art",
    description: "Terza Edizione ampliata del celebre romanzo alchemico-filosofico. Iemme Edizioni (2013) – ISBN: 978-88-97776-08-6."
  },
  {
    id: "book-legge-attrazione-saggio",
    title: "23. Il Sincronismo Creativo. Teoria del Sincronismo Creativo",
    year: 2013,
    publisher: "Iemme Edizioni",
    isbn: "978-88-97776-33-8",
    type: "theory",
    description: "La Legge di Attrazione e il Potere del Pensiero Creativo. Iemme Edizioni (2013) – 105 pp. – ISBN: 978-88-97776-33-8 (eBook: 978-88-97776-34-5). Primo saggio italiano strutturato sul Sincronismo: raggiunto l'11° posto nelle classifiche di vendita."
  },
  {
    id: "book-catalogo-2013",
    title: "24. Sincronismo Creativo Catalogo Opere 2013",
    year: 2013,
    publisher: "Amazon Kindle",
    type: "art",
    description: "Catalogo fotografico ufficiale e schede tecniche per Kindle. Amazon (2013) – ASIN: B00BBMGOD8."
  },
  {
    id: "book-segreto-mitologico",
    title: "25. Il Segreto Mitologico (Terza Edizione)",
    year: 2014,
    publisher: "Iemme Edizioni",
    isbn: "978-88-97776-59-8",
    type: "philosophy",
    description: "Terza Edizione cartacea rivisitata. Iemme Edizioni (2014) – ISBN: 978-88-97776-59-8 (eBook: 978-88-97776-60-4)."
  },
  {
    id: "book-arte-scienza-97-17",
    title: "26. Arte e Scienza dal 1997 al 2017",
    year: 2017,
    publisher: "Amazon KDP",
    type: "art",
    description: "Resoconto storiografico ed archivio fotografico di venti anni di ricerche. Amazon KDP (2017) – ASIN: B076ZVJ1M4.",
    link: "https://www.amazon.it/B0774WCKJ9"
  },
  {
    id: "book-centro-culturale-eb",
    title: "27. Centro Culturale Arte e Scienza",
    year: 2017,
    publisher: "Amazon Edizioni",
    type: "philosophy",
    description: "Edizione eBook Kindle. Pubblicazione estesa dei disegni e progetti architettonici del Centro Studi polifunzionale ideato nel 2005."
  },
  {
    id: "book-geniusom-waste",
    title: "28. GeniusOm Zero Waste. Business e Brevetto",
    year: 2017,
    publisher: "Amazon Edizioni",
    isbn: "978-1-5209-3893-3",
    type: "patent",
    description: "Compattatore domestico multifunzionale. Dettaglio brevetto e srls innovative. Amazon (2017) – ISBN: 978-1-5209-3893-3 – ASIN: B06XVXSFLY."
  },
  {
    id: "book-startup-culturale",
    title: "29. Start-Up Culturale Arte e Scienza",
    year: 2017,
    publisher: "Amazon KDP",
    type: "philosophy",
    description: "eBook Kindle. Strategie ed organizzazione e sviluppo aziendale applicate all'industria estetica e culturale. ASIN: B0774WCKJ9.",
    link: "https://www.amazon.it/B0774WCKJ9"
  },
  {
    id: "book-secret-alien",
    title: "30. The Secret Alien: Lighting Secret",
    year: 2017,
    publisher: "Amazon Edizioni",
    isbn: "978-1-5495-2134-2",
    type: "philosophy",
    description: "Lighting Secret. Saggio di ecologia e archetipi. Amazon Edizioni (2017) – ISBN: 978-1-5495-2134-2 – ASIN: B074DPW6WB."
  },
  {
    id: "book-arte-logos",
    title: "31. Arte e Logos. Significato e Concepto dell'Arte",
    year: 2018,
    publisher: "Mondadori / Kobo",
    type: "philosophy",
    description: "Antropologia della Storia dell'Arte. Saggio d'estetica scientifico-culturale. Mondadori Store / Rakuten Kobo (2018, eBook)."
  },
  {
    id: "book-invenzioni-codici",
    title: "32. Invenzioni e Brevetti. I Codici FDL delle Invenzioni",
    year: 2018,
    publisher: "Books on Demand",
    isbn: "978-1-7314-7706-3",
    type: "patent",
    description: "FDL Codes – Catalogo tecnico-descrittivo contenente i dettagli strutturali delle 41 invenzioni depositate. ISBN: 978-1-7314-7706-3 – ASIN: B07KGLKHTV.",
    link: "https://www.amazon.it/dp/1731477063"
  },
  {
    id: "book-mythos-spazio",
    title: "33. Mythos, Spazio e Tempo: La Conoscenza Evolutiva",
    year: 2018,
    publisher: "Books on Demand",
    isbn: "978-88-278-0524-2",
    type: "philosophy",
    description: "La Conoscenza Evolutiva. Studio interdisciplinare sui ritmi matematici universali e mitici. ISBN: 978-88-278-0524-2."
  },
  {
    id: "book-secret-knowledge",
    title: "34. The Secret of Knowledge: Lighting Secret",
    year: 2018,
    publisher: "Amazon Edizioni",
    isbn: "978-1-9803-0178-9",
    type: "philosophy",
    description: "English Edition on visual sciences, electromagnetism and awareness filters. ISBN: 978-1-9803-0178-9."
  },
  {
    id: "book-manoscritto-storia",
    title: "35. Manoscritto di Storia dell'Arte dal 1400 al 1700",
    year: 2019,
    publisher: "Independently published",
    isbn: "978-1-7945-9801-3",
    type: "art",
    description: "Trascrizione di 406 pagine redatte interamente a mano libera. Cronologia, concetti e vita degli artisti d'Europa. ISBN: 978-1-7945-9801-3."
  },
  {
    id: "book-sincreattivita",
    title: "36. Sincreatività: Il Potere di Attrazione",
    year: 2019,
    publisher: "Independently published",
    isbn: "978-1-6704-1935-3",
    type: "philosophy",
    description: "Saggio. Strumenti mentali e neuro-allineamenti per amplificare le coincidenze significative. ISBN: 978-1-6704-1935-3."
  },
  {
    id: "book-pubblicazioni-play",
    title: "37. Pubblicazioni su Google Play (Collana Digitale)",
    year: 2020,
    publisher: "Google Play Books",
    type: "theory",
    description: "Raccolta digitale: 'Il Giornale dell'Arte Intellettuale', 'Invenzione per difendersi dal Coronavirus' (Donata per scopi umanitari), 'L'Arte Intellettuale Artes Liberales Vol. 1 e 2'."
  },
  {
    id: "book-antropologia-storia",
    title: "38. Antropologia della Storia dell'Arte: Storia dell'Arte e Conoscenza Evolutiva",
    year: 2021,
    publisher: "Independently published",
    isbn: "979-8-5178-9337-4",
    type: "philosophy",
    description: "Saggio antropologico esteso sulle tappe dell'evoluzione dell'espressione culturale d'eccellenza. ISBN: 979-8-5178-9337-4."
  },
  {
    id: "book-colui-che-osserva",
    title: "39. Colui che Osserva Cambia le Cose",
    year: 2021,
    publisher: "Independently published",
    isbn: "979-8-7351-4127-6",
    type: "philosophy",
    description: "Il Potere Magnetico e Alchemico della Consapevolezza. Saggio divulgativo sull'interazione mente-materia. ISBN: 979-8-7351-4127-6."
  },
  {
    id: "book-sincronismo-astrologia",
    title: "40. Sincronismo Creativo e Astrologia Umanistica",
    year: 2022,
    publisher: "Independently published",
    isbn: "979-8-3620-1490-5",
    type: "philosophy",
    description: "Astrologia, archetipi e cultura umanistica applicata. Studio sui nessi sincronici planetari. ISBN: 979-8-3620-1490-5 – ASIN: B0BLTS5S4S."
  },
  {
    id: "book-enoch-en",
    title: "41. Enoch and the Infinite Earth – English Edition",
    year: 2023,
    publisher: "Independently published",
    isbn: "979-8-8583-3006-2",
    type: "theory",
    description: "A cosmological analysis on ancient scriptures, Enochian calendars and hidden worlds. ISBN: 979-8-8583-3006-2."
  },
  {
    id: "book-enoch",
    title: "42. Enoch e la Terra Infinita",
    year: 2023,
    publisher: "Independently published",
    isbn: "979-8-8579-2244-8",
    type: "theory",
    description: "Saggio cosmologico basato sullo studio accurato dei testi apocrifi e del modello sferico. ISBN: 979-8-8579-2244-8."
  },
  {
    id: "book-arte-alchemica-anima",
    title: "43. L'Arte Alchemica: L'Anima Gemella e la Pietra Filosofale",
    year: 2023,
    publisher: "Independently published",
    isbn: "979-8-3748-0249-0",
    type: "philosophy",
    description: "Indagine simbolica sulle dinamiche d'attrazione biologica, anima gemella e armoniche interiori. ISBN: 979-8-3748-0249-0."
  },
  {
    id: "book-sincronismo-metodo",
    title: "44. Sincronismo Creativo: Il Metodo del Sincronismo Creativo",
    year: 2024,
    publisher: "Independently published",
    isbn: "979-8-3025-4793-4",
    type: "theory",
    description: "Saggio di riferimento metodologico. Traccia le basi sperimentali del protocollo biologico e del sincronismo intenzionale dell'ingegno. ISBN: 979-8-3025-4793-4 – ASIN: B0DPMYTB72.",
    link: "https://payhip.com/LucArtStudio"
  },
  {
    id: "book-1",
    title: "45. Teoria Generale del Sincronismo Creativo e Teoria del Campo Unificato AIC (Volume I)",
    year: 2025,
    publisher: "Independently published",
    isbn: "979-8-29727-798-4",
    pages: "482",
    type: "theory",
    doi: "10.5281/zenodo.17080308",
    description: "Il Metodo AIC – Modellazione e Applicazione della Sincronicità Intenzionale attraverso il Sistema AIC-Sync©. Libro I della Trilogia Scientifica. ISBN: 979-8-29727-798-4 • Disponibile su Amazon.",
    link: "https://www.amazon.it/Teoria-Generale-Sincronismo-Creativo-Unificato/dp/B0FLWHTZJL"
  },
  {
    id: "book-2",
    title: "46. Teoria di Campo Unificato: Trattato sull'Energia Creativa (Volume II)",
    year: 2025,
    publisher: "Independently published",
    isbn: "979-8-29890-304-2",
    pages: "295",
    type: "science",
    doi: "10.5281/zenodo.17041593",
    description: "Trattato sugli Effetti della Coscienza nei Campi Elettromagnetici, Quantistici e Gravitazionali. Libro II della Trilogia Scientifica. ISBN: 979-8-29890-304-2 • Disponibile su Amazon.",
    link: "https://www.amazon.it/TEORIA-CAMPO-UNIFICATO-Elettromagnetici-Gravitazionali/dp/B0FN4QGBCK"
  },
  {
    id: "book-vol-3",
    title: "47. Interazione Psicofisica con il Campo Unificato (Volume III)",
    year: 2025,
    publisher: "CERN Zenodo",
    type: "theory",
    doi: "10.5281/zenodo.20414984",
    description: "I Nove Livelli della Sincronicità nella Teoria del Sincronismo Creativo – Nuova classificazione della sincronicità. Libro III della Trilogia Scientifica.",
    link: "https://zenodo.org/records/20414984"
  },
  {
    id: "book-frequenze-hertziane",
    title: "48. Frequenze Hertziane: Il Linguaggio Segreto dell'Universo",
    year: 2026,
    publisher: "Independently published",
    pages: "120",
    type: "science",
    description: "Guida applicativa all'uso delle frequenze di risonanza universali per la meditazione profonda, lo stimolo neuro-fisiologico e la sintonizzazione sul modello 432 Hz.",
    link: "https://payhip.com/b/jF3KP"
  },
  {
    id: "book-campo-hertz",
    title: "49. Il Campo di Hertz e il Cervello Sintonizzato",
    year: 2026,
    publisher: "Independently published",
    type: "science",
    description: "Analisi di coordinamento biofisiologico, EEG, RMSSD in sintonia col brevetto tecnologico AIC-SYNC© per lo sviluppo delle facoltà creative d'ingegno."
  }
];

export const ARTWORKS_CATALOG: Artwork[] = [
  {
    id: "art-1",
    title: "Diacronia Figurativa #12",
    year: 2012,
    category: "Pittura",
    venue: "Museo di Capodimonte / PAN Napoli",
    description: "Sperimentazione segnica estesa su grande formato, focalizzata sulla trasposizione di archetipi mitologici tradizionali in andamenti vettoriali geometrici."
  },
  {
    id: "art-2",
    title: "Oltre l'Interpretazione di Copenaghen",
    year: 2014,
    category: "Videoarte",
    venue: "Città della Scienza Napoli / MAV Roma",
    description: "Installazione sinestetica e video-esperimento che mette in risonanza gli stati mentali degli osservatori con fluttuazioni luminose simulate."
  },
  {
    id: "art-3",
    title: "Esperimento EEG dei 200 Soggetti: Il Cervello Collettivo",
    year: 2014,
    category: "Ricerca & Performance Artistiche",
    venue: "Città della Scienza (Napoli, Moon Party)",
    description: "Rilevamento simultaneo e monitoraggio delle risonanze empatiche e di risincronizzazione ritmica tra coppie di soggetti durante performance sonore."
  },
  {
    id: "art-4",
    title: "Codici Alchemici: L'Opera Celeste",
    year: 2005,
    category: "Installazione",
    venue: "Centro Culturale Arte e Scienza / MAXXI (Archivio)",
    description: "Presentazione plastica e interattiva dei 22 glifi legati allo studio dell'alchimia rinascimentale vissuta come processo psicologico sincronico."
  },
  {
    id: "art-5",
    title: "Sincronismo Segnico Assoluto",
    year: 2007,
    category: "Pittura",
    venue: "PAN - Palazzo delle Arti Napoli",
    description: "Dipinto a tempera alchemica su tela grezza. Il dipinto è stato concepito durante un picco di sincronicità oggettiva riscontrata a livello familiare."
  },
  {
    id: "art-6",
    title: "La Geometria del Caso Significativo",
    year: 2011,
    category: "Videoarte",
    venue: "MAXXI - Museo Nazionale delle Arti del XXI Secolo",
    description: "Proiezione quadrifonica di segnale isocronico a 432Hz sovrapposto a sequenze video accelerate di evoluzioni stellari ed atomiche."
  },
  {
    id: "art-7",
    title: "Il Tempio delle Attività Intellettive",
    year: 2013,
    category: "Installazione",
    venue: "Città della Scienza Napoli (Ricostruzione post-incendio)",
    description: "Installazione sferica in rame ed ottone progettata per la purificazione degli spazi d'ascolto e la riduzione spaziale delle interferenze RF ambientali."
  }
];

export const INVENTIONS_CATALOG: Invention[] = [
  {
    id: "patent-1",
    number: 1,
    title: "AIC-SYNC© — Sistema Hardware e Software per Sincronicità Indotte",
    year: 2024,
    patentNum: "UIBM-2024-AIC01",
    status: "registered",
    description: "Primo sistema bio-informatico integrato al mondo finalizzato al monitoraggio e all'induzione attiva di picchi creativi e convergenze sincronicistiche.",
    details: "Questo sistema integra un lettore EEG multicanale portatile con sensori di variabilità cardiaca (HRV) e una matrice di feedback neuro-funzionali bio-adattivi (modulazioni acustiche binaurali, impulsi luminosi stroboscopici sintonizzati sulle onde Alpha e Theta, e micro-vibrazioni aptiche)."
  },
  {
    id: "patent-2",
    number: 2,
    title: "GeniusOm — Compattatore Domestico di Rifiuti Urbani \"Zero Waste\"",
    year: 2013,
    patentNum: "ITNA20130029A1",
    status: "registered",
    description: "Compattatore domestico ad alta efficienza per lo smaltimento ecologico intelligente dei rifiuti urbani differenziati.",
    details: "Sviluppato in collaborazione con ex collaboratori NASA. Consente la riduzione volumetrica fino al 90% dei rifiuti senza emissione di odori grazie a filtri molecolari termodinamicamente equilibrati. Premio Ecomondo 2014, offerta straordinaria di investimenti di €250k a Shark Tank Italia (Canale 5 / Italia 1) dal noto investitore Fabio Cannavale. Donato in licenza umanitaria gratuita."
  },
  {
    id: "patent-3",
    number: 3,
    title: "Eco-Tuta Termodinamica Climatizzata per Impieghi Estremi",
    year: 2018,
    patentNum: "UIBM-2018-ETC03",
    status: "donated",
    description: "Involucro protettivo termoregolato passivo ed attivo per fini protettivi di emergenza e ambienti ad alta escursione termica.",
    details: "Tuta termodinamica auto-alimentata provvista di micro-canali idraulici per la stabilizzazione termica interna. Donata volontariamente per l'emergenza di protezione civile SARS-CoV-2."
  },
  {
    id: "inv-4",
    number: 4,
    title: "Aero-Massaggiatore Meccanico a Campana di Risonanza",
    year: 2005,
    status: "registered",
    description: "Dispositivo pneumatico micro-vibratorio indirizzato allo stimolo locale dei tessuti tramite frequenze simpatiche.",
    details: "Sfrutta micro-vortici di pressione oscillanti per indurre risonanza muscolare a frequenza programmabile (8Hz - 24Hz)."
  },
  {
    id: "inv-5",
    number: 5,
    title: "L.E.T.S.I.S. Robotics Platform - Sistema di Giunti Simpatetici",
    year: 2015,
    status: "registered",
    description: "Architettura robotica basata su giunzioni risonanti sintonizzate magneticamente.",
    details: "Permette il coordinamento di micro-attuatori meccanici minimizzando la dispersione di forza dissipata in calore."
  }
];

export const TV_DOC_SHOWS: TvEpisode[] = [
  {
    num: 1,
    title: "2017 – Rai 2 – I Fatti Vostri",
    year: 2017,
    topics: "Rai 2, I Fatti Vostri, Invenzioni, Brevetti",
    description: "Partecipazione televisiva nazionale presso il programma “I Fatti Vostri” su Rai 2, dedicato alla presentazione del brevetto e delle invenzioni.",
    youtubeUrl: "https://photos.app.goo.gl/26fEASFjDBBtGLJx5"
  },
  {
    num: 2,
    title: "2015 – Italia 1 – Shark Tank Italia (Mediaset)",
    year: 2015,
    topics: "Italia 1, Shark Tank, GeniusOm, Fabio Cannavale",
    description: "Partecipazione in prima serata su Italia 1 al celebre show \"Shark Tank Italia\". Presentazione del progetto d'impresa ecologico \"GeniusOm\" e trattativa d'investimento conclusa con successo per un valore di €250.000 (per il 70% delle quote) con il noto investitore Fabio Cannavale, come registrato storiograficamente nella voce ufficiale di Wikipedia.",
    youtubeUrl: "https://photos.app.goo.gl/sqYuAuEjVBasPG436"
  },
  {
    num: 3,
    title: "2014 – Premio Ecomondo – Green Economy",
    year: 2014,
    topics: "Ecomondo, Presidente Repubblica, Eco-Invenzione",
    description: "Premio per la migliore invenzione e brevetto per la Green Economy con adesione del Presidente della Repubblica.",
    youtubeUrl: "https://photos.app.goo.gl/LxV1wkhKHcQp2qCU9"
  },
  {
    num: 4,
    title: "2013 – Confindustria – Premio Innovazione",
    year: 2013,
    topics: "Confindustria, Premio Innovazione, Unione Industriali",
    description: "Premio e presentazione del progetto presso contesto Confindustria e Unione Industriali.",
    youtubeUrl: "https://youtu.be/2UI1tqpVlb0?si=tXfbhY4KegeonBza"
  },
  {
    num: 5,
    title: "2013 – Intervista Unione Industriali",
    year: 2013,
    topics: "Intervista, Unione Industriali, Brevetti",
    description: "Intervista istituzionale dedicata all’invenzione e allo sviluppo del brevetto.",
    youtubeUrl: "https://photos.app.goo.gl/Vt5mJctaZbYGTQaYA"
  }
];

export const DOCUMENTARY_SERIES_EPISODES: DocumentaryEpisode[] = [
  {
    num: 1,
    title: "La Rottura Strategica e l'Interpretazione Standard",
    description: "Come la scuola di Niels Bohr ha rimosso l'osservatore cosciente dalla formula atomica riducendolo a mera statistica probabilistica."
  },
  {
    num: 2,
    title: "Il Paradosso EPR e la Non-Località",
    description: "Analisi dello storico scontro Einstein-Bohr del 1935 e l'entanglement quantistico come prova fisica del Campo Unificato."
  },
  {
    num: 3,
    title: "Il Gatto di Schrödinger: Dualismo o Realtà?",
    description: "Il confine tra probabilità e determinazione materiale con il ruolo attivo della coscienza nello scollasso d'onda."
  },
  {
    num: 4,
    title: "Paul Dirac e l'Equazione dello specchio",
    description: "Sintesi cosmica tra materia e antimateria. Connessione della simmetria con i paralleli sincronicistici."
  },
  {
    num: 5,
    title: "Solvay 1927: Il Consiglio dei Saggi o l'Esclusione del Genio?",
    description: "Un'analisi storiografica dei dibattiti di Solvay che hanno indirizzato ed imbrigliato la fisica mondiale."
  },
  {
    num: 6,
    title: "Il Paradosso Solvay-Manhattan: Da Solvay al Progetto Atomico",
    description: "La complessa traiettoria che lega le tesi contrapposte all'impiego militare del potenziale quantico."
  },
  {
    num: 7,
    title: "La Trilogia AIC-EC-HZ: La Sintesi Hertziana della Coscienza",
    description: "Come i micro-fenomeni dell'entanglement atomico si riproducono nei macro-canali isocronici neurali e biologici."
  }
];

export const MUSIC_PLAYLIST: Track[] = [
  { num: 1, title: "Risonanza Isocronica Sincronica - Tono Cardine 432 Hz" },
  { num: 2, title: "Fluttuazione di Fase Alfa 8 Hz - Bio-Sintonizzazione" },
  { num: 3, title: "Il Silenzio del Campo Solvay - Onde Sferiche Coerenti" },
  { num: 4, title: "Oltre Copenaghen - Spettroscopia d'Onda Biaca" },
  { num: 5, title: "Anima Fluida Pt. 1 - Strutturazione Segmentale" },
  { num: 6, title: "Risonanza Schumann 7.83 Hz - Accoppiamento Quantistico" },
  { num: 7, title: "Sincronicità Operativa - Modulazioni Euristiche Delta 3 Hz" },
  { num: 8, title: "L'Equazione dello Specchio di Dirac - Armonizzazione Hertziana" }
];

export const SYNCHRONICITY_THEORY = {
  scientific_formula: "S = φ(f)",
  description_it: "La formula definisce la sincronizzazione delle onde cerebrali coerenti (f) con le fluttuazioni intrinseche del Campo Unificato universale",
  levels: [
    {
      num: 1,
      title: "Sincronicità Debole (Passiva-Osservazionale)",
      description: "Piccole coincidenze casuali percepite come potenziali segnali; osservazione passiva. Primo stadio di risveglio percettivo che stimola l'attenzione e la curiosità. CR: Bassa • T: Lungo."
    },
    {
      num: 2,
      title: "Sincronicità Tematica (Pattern Ricorrenti)",
      description: "Eventi ripetuti collegati a un tema o simbolo specifico; riconoscimento di una coerenza narrativa che introduce il concetto di 'trama' nella vita quotidiana. CR: Bassa-Moderata • T: Medio-Lungo."
    },
    {
      num: 3,
      title: "Sincronicità Direzionale (Orientativa)",
      description: "Eventi che orientano verso scelte specifiche o percorsi chiari; senso di conferma o 'segnale stradale' esistenziale. Strumento di navigazione per facilitare i processi decisionali. CR: Moderata • T: Medio."
    },
    {
      num: 4,
      title: "Sincronicità Catalitica (Accelerativa)",
      description: "Accelerazione improvvisa di processi interiori o creativi; sincronicità che 'sblocca' situazioni stagnanti, agendo da catalizzatore per salti qualitativi. CR: Moderata-Alta • T: Medio-Corto."
    },
    {
      num: 5,
      title: "Sincronicità Operativa (Partecipativa)",
      description: "Influenza consapevole del soggetto sul campo sincronico; l'operatore inizia a 'dialogare' attivamente con la sincronicità, coltivando un'alfabetizzazione sincronica. CR: Alta • T: Breve."
    },
    {
      num: 6,
      title: "Sincronicità Riflessiva (Specchio Immediato)",
      description: "Rispecchiamento quasi istantaneo tra stato interiore e realtà esterna; le sincronicità diventano un linguaggio quotidiano fluido in cui la realtà è uno specchio vivente. CR: Alta • T: Molto Breve."
    },
    {
      num: 7,
      title: "Sincronicità Generativa",
      description: "Generazione intenzionale di eventi significativi; l'operatore attiva opportunità e risorse in modo mirato e allineato, liberando il pieno potenziale creativo. CR: Molto Alta • T: Molto Breve."
    },
    {
      num: 8,
      title: "Sincronicità Magnetica",
      description: "Attrazione costante di persone, risorse e opportunità sincroniche; l'operatore sviluppa una 'gravità sincronica' e diventa un nodo attivo o 'hub' nella rete dei flussi. CR: Massima • T: Breve."
    },
    {
      num: 9,
      title: "Sincronicità Creativa (Co-creativa)",
      description: "Co-creazione consapevole della realtà attraverso la piena partecipazione ai flussi sincronici; l'operatore agisce da canale per processi creativi universali, in non-dualità operativa. CR: Massima Integrata • T: Simultaneo."
    }
  ] as SyncLevel[]
};

export interface FatherPatentDetail {
  num: number;
  code: string;
  title: string;
  office: string;
  year: number;
}

export interface PaoloWorkDetail {
  year: string;
  title: string;
  type: 'teatro' | 'sceneggiato_tv' | 'cinema';
  details: string;
  link?: string;
}

export const LUCIO_FALACE_PATENTS: FatherPatentDetail[] = [
  { num: 1, code: "IT 1313781", title: "Dispositivo Antishock per Lampade ad Incandescenza (sistemi di protezione e stabilizzazione dei filamenti)", office: "IT", year: 2002 },
  { num: 2, code: "WO/1998/016991", title: "Circuito di Complementazione della Tensione di Rete CA (carichi resistivi)", office: "WO", year: 1998 },
  { num: 3, code: "IT 1309883", title: "Addizionatore di Tensione ad Onda Intera per Tubi a Scarica di Gas", office: "IT", year: 2002 },
  { num: 4, code: "WO/1996/029846", title: "Alimentatore per Sorgenti Luminose - Accensione Rapida Lampade Fluorescenti", office: "WO", year: 1996 },
  { num: 5, code: "NA20060132", title: "Dispositivo di Pompaggio d'Aria Convogliata in Onde Sinusoidali", office: "IT", year: 2008 },
  { num: 6, code: "NA950012", title: "Dispositivo Raddrizzatore per l'Accensione di Lampade ad Incandescenza", office: "IT", year: 1995 },
  { num: 7, code: "WO/1996/031094", title: "Ampliatore di Tensione per Tubi Riempiti di Gas Inerte", office: "WO", year: 1996 },
  { num: 8, code: "WO/2002/041613", title: "Dispositivo per la Disattivazione della Linea Telefonica dopo Chiamata in Attesa", office: "WO", year: 2002 },
  { num: 9, code: "IT 1303415", title: "Dispositivo Rilevatore di Microtelefono Fuori Posto con Circuito Sostitutivo del Gancio", office: "IT", year: 2000 },
  { num: 10, code: "NA20070038", title: "Dispositivo Battente ad Onde di Bassa Frequenza con Generatore d'Aria a Flusso Alternato", office: "IT", year: 2008 },
  { num: 11, code: "IT 1311187", title: "Regolatore Elettrostatico", office: "IT", year: 2002 },
  { num: 12, code: "IT 1309898", title: "Portalampada di Sicurezza contro le Folgorazioni (retroconcesso)", office: "IT", year: 2002 },
  { num: 13, code: "NA20000034", title: "Dispositivo Rilevatore di Avviso di Chiamata per Utente Impegnato (Internet/Fax)", office: "IT", year: 2000 },
  { num: 14, code: "IT 1312127", title: "Rilevatore di Livelli di Dispersione su Apparecchiature Elettriche per Non Vedenti", office: "IT", year: 2002 },
  { num: 15, code: "NA20070100", title: "Dispositivo di Controllo Anticontraffazione (tramite codici segreti e reti telematiche)", office: "IT", year: 2009 },
  { num: 16, code: "IT 2133920", title: "Procedimiento y Circuito para Complementar una Tension de Red CA (cargas resistivas)", office: "ES", year: 1999 },
  { num: 17, code: "EP 0836267", title: "Metodo e Circuito per Complementare una Tensione di Rete CA (carichi resistivi)", office: "EP", year: 1998 },
  { num: 18, code: "BR PI9711900", title: "Processo e Circuito para Complementaçao de Tensao de Alimentaça da Rede Main CA", office: "BR", year: 1999 },
  { num: 19, code: "DE 000069602531", title: "Verfahren und Schaltung zur Ergänzung einer Netzwechselspannung (ohmscher Verbraucher)", office: "DE", year: 2000 },
  { num: 20, code: "AU 1997049453", title: "Circuito per Complementare una Tensione di Rete Alternata (carichi resistivi)", office: "AU", year: 1998 },
  { num: 21, code: "GR 3030866", title: "Circuito per Complementare una Tensione di Rete CA (carichi resistivi)", office: "GR", year: 1999 },
  { num: 22, code: "AU 1996051064", title: "Alimentazione Elettrica per Sorgenti Luminose Accensione Rapida Lampade Fluorescenti", office: "AU", year: 1996 },
  { num: 23, code: "IT 1311186", title: "Presa di Corrente Multipla con Entrate Preferenziali per il Carico Utilizzatore", office: "IT", year: 2002 },
  { num: 24, code: "IT 1282910", title: "Reattore Capacitivo per l'Alimentazione di Tubi Fluorescenti", office: "IT", year: 1998 },
  { num: 25, code: "AU 1996051063", title: "Amplificatore di Tensione per Tubi Riempiti di Gas Inerte", office: "AU", year: 1996 },
  { num: 26, code: "NA20070101", title: "Dispositivo Riduttore Volt Amperometrico Stabilizzato", office: "IT", year: 2009 },
  { num: 27, code: "IT 1282832", title: "Dispositivo Elevatore di Tensione per Tubi a Gas Inerte", office: "IT", year: 1998 },
  { num: 28, code: "CN 1237285", title: "Circuito per Complementare la Tensione di Rete CA (carichi resistivi)", office: "CN", year: 1999 },
  { num: 29, code: "EP 1247393", title: "Dispositivo per la Disattivazione della Linea Telefonica (chiamata in attesa)", office: "EP", year: 2002 },
  { num: 30, code: "AU 2001218856", title: "Dispositivo per la Disconnessione della Linea Telefonica (chiamata in attesa di segnale)", office: "AU", year: 2001 },
  { num: 31, code: "KR 1020000049060", title: "Circuito di Complementazione della Tensione di Rete CA (carichi resistivi)", office: "KR", year: 2000 },
  { num: 32, code: "US 6118222", title: "Circuito per l'Integrazione di una Tensione di Rete CA (carichi resistivi)", office: "US", year: 2000 },
  { num: 33, code: "CN 1179258", title: "Alimentazione Elettrica per Sorgenti Luminose Accensione Rapida Lampade Fluorescenti", office: "CN", year: 1998 },
  { num: 34, code: "CN 1179257", title: "Amplificatore di Tensione", office: "CN", year: 1998 },
  { num: 35, code: "IT MI20050350", title: "Dispositivo ad Emissioni Luminose Colorate", office: "IT", year: 2006 },
  { num: 36, code: "EP 0861574", title: "Alimentatore per Sorgenti Luminose Accensione Rapida Lampade Fluorescenti", office: "EP", year: 1998 },
  { num: 37, code: "SG 51041", title: "Alimentatore per Sorgenti Luminose Accensione Rapida Lampade Fluorescenti", office: "SG", year: 1998 },
  { num: 38, code: "US 5920153", title: "Alimentazione Elettrica per Sorgenti Luminose Accensione Rapida Lampade Fluorescenti", office: "US", year: 1999 },
  { num: 39, code: "IT 234968", title: "Base per Statua con Dispositivo per Comando Circuito Elettrico", office: "IT", year: 2000 },
  { num: 40, code: "TR 199700997", title: "Alimentatore per Sorgenti Luminose (accensione rapida)", office: "TR", year: 1998 },
  { num: 41, code: "SG 50046", title: "Ampliatore di Tensione per Tubi Riempiti di Gas Inerte", office: "SG", year: 1998 },
  { num: 42, code: "TR 199701021", title: "Amplificatore di Tensione per Lampade a Gas (gerilim yükselteci)", office: "TR", year: 1998 },
  { num: 43, code: "WO/2006/094689", title: "Dispositivo con Emissioni Luminose Colorate (adattato per allenamento fisico e comportamentale)", office: "WO", year: 2006 },
  { num: 44, code: "NA20030073", title: "Alimentatore Multifunzione per Tubi a Scarica di Gas", office: "IT", year: 2005 },
  { num: 45, code: "IT NA20030008", title: "Dispositivo Elettronico Interattivo di Segnalazioni Sensoriali per Regolazione Funzioni Organiche", office: "IT", year: 2003 },
  { num: 46, code: "IT NA20030009", title: "Dispositivo Alimentatore per Conversione CA in Mista e Continua", office: "IT", year: 2003 }
];

export const PAOLO_FALACE_WORKS: PaoloWorkDetail[] = [
  // Teatro / Prosa Teche Rai
  { year: "1966-1967", title: "Teatro Rai 1966-1967", type: "teatro", details: "Ruoli: Carufa (accanto a Silvano Tranquilli, Maria Capocci, Sergio Reggi, Michele Borelli, Valentina Fortunato); Garzone; Guardiacaccia. Certificato Teche Rai.", link: "https://www.teche.rai.it/teatro-1966-1967/" },
  { year: "1967", title: "Tovaritch", type: "teatro", details: "Regia di Flaminio Bollini. Trasmessa sul Secondo Programma il 17 maggio 1967. Di Jacques Deval.", link: "https://www.teche.rai.it/teatro-1966-1967/" },
  { year: "1968-1969", title: "Incidente a Vichy", type: "teatro", details: "Regia di Marco Leto. Ruolo: il Poliziotto. Tratto dall'omonimo testo teatrale di Arthur Miller.", link: "https://www.teche.rai.it/teatro-1968-1969/" },
  { year: "1978-1979", title: "Pluto di Aristofane", type: "teatro", details: "Regia di Lino Procacci. Trasmesso il 28 luglio 1978. Ruolo: Pluto (protagonista). Con Carlo Giuffrè e G. Pambieri.", link: "https://www.teche.rai.it/teatro-1978-1979/" },
  { year: "1981", title: "La tempesta", type: "teatro", details: "Ruolo: Trinculo. Trasmessa per la rassegna di prosa della televisione pubblica.", link: "https://www.teche.rai.it/teatro-1981-1981/" },
  { year: "1983-1984", title: "Teatro Rai 1983-1984", type: "teatro", details: "Partecipazione complessiva dell'attore a produzioni del periodo, inclusa l'opera L'avaro di Molière.", link: "https://www.teche.rai.it/teatro-1983-1984/" },
  { year: "1994", title: "Acarnesi di Aristofane (INDA Siracusa)", type: "teatro", details: "Regia di Egisto Marcucci, musiche di Franco Piersanti. Ruolo drammatico: Teucro. Svolto sullo storico palcoscenico del Teatro Greco di Siracusa. Ultimo atto della sua vita consacrata all'arte." },
  
  // Sceneggiati TV
  { year: "1963", title: "Luisa Sanfelice", type: "sceneggiato_tv", details: "Sceneggiato storico Rai, regia di Leonardo Cortese. Nel cast: Giulio Bosetti, Lidia Alfonsi, Mila Vannucci, Antonella Della Porta, Silvano Tranquilli, Stefano Satta Flores, Paolo Falace." },
  { year: "1966", title: "Madame Curie", type: "sceneggiato_tv", details: "Regia di Guglielmo Morandi. Ruolo: Muzet. Film televisivo biografico dedicato alla scienziata Marie Curie." },
  { year: "1967", title: "Abramo Lincoln • Cronaca di un delitto", type: "sceneggiato_tv", details: "Regia di Daniele D'Anza. Celebre miniserie televisiva Rai." },
  { year: "1970", title: "Il cappello del prete", type: "sceneggiato_tv", details: "Miniserie televisiva Rai. Episodio 1x03. Archivio storico Rai Teche." },
  { year: "1971", title: "Oltre il duemila", type: "sceneggiato_tv", details: "Regia di Piero Nelli. Miniserie televisiva Rai. Episodio 1x01." },
  { year: "1972", title: "Le inchieste del commissario Maigret", type: "sceneggiato_tv", details: "Serie televisiva Rai. Episodio 4x03 (Maigret in pensione), regia di Mario Landi. Ruolo: Oscar." },
  { year: "1974", title: "Processo al generale Baratieri per la sconfitta di Adua", type: "sceneggiato_tv", details: "Regia di Piero Schivazappa. Storica miniserie Rai." },
  { year: "1976", title: "Dov'è Anna?", type: "sceneggiato_tv", details: "Regia di Piero Schivazappa. Miniserie televisiva Rai. Episodio 1x07. Ruolo: Huerta." },
  { year: "1977", title: "Lo scandalo della Banca Romana", type: "sceneggiato_tv", details: "Regia di Luigi Perelli. Miniserie Rai. Episodi 1x01, 1x02, 1x03. Cast: Ivo Garrani, Gianfranco Barra, Silvano Tranquilli, Arturo Dominici, Paolo Falace." },
  { year: "1977", title: "Vedrai che cambierò", type: "sceneggiato_tv", details: "Film televisivo Rai, regia di Paolo Poeti. Ripercorre la vita di Luigi Tenco. Nel cast: G. Albertini, Marisa Belli, F. Agostini, R. Biserni, Paolo Falace, Nunzia Greco." },
  { year: "1979", title: "L'affare Stavisky", type: "sceneggiato_tv", details: "Miniserie televisiva Rai. Episodi 1x01, 1x02, 1x03." },
  { year: "1979", title: "Ma che cosa è quest'amore", type: "sceneggiato_tv", details: "Regia di Ugo Gregoretti (tratto da Achille Campanile). Cast: Stefano Satta Flores, Lucia Poli, Roberto Benigni, Gigi Ballista, Giacomo Rizzo, Paolo Falace." },
  { year: "1979", title: "Il delitto Notarbartolo", type: "sceneggiato_tv", details: "Produzione televisiva Rai d'inchiesta storica." },
  { year: "1980", title: "Tre operai", type: "sceneggiato_tv", details: "Regia di Francesco Maselli. Miniserie televisiva Rai. Episodi 1x01 e 1x02. Cast: Stefano Santospago, Nello Mascia, Nunzia Greco, Imma Piro, Paolo Falace." },
  { year: "1981", title: "La casa rossa", type: "sceneggiato_tv", details: "Regia di Delmer Daves. Miniserie televisiva Rai di respiro internazionale. 5 episodi." },
  { year: "1983", title: "L'avventura di un fotografo", type: "sceneggiato_tv", details: "Episodio di 'Dieci registi italiani, dieci racconti italiani', regia di Francesco Maselli. Film televisivo Rai. Ruolo: Antonino." },
  { year: "1986", title: "Il cugino americano (Blood Ties)", type: "sceneggiato_tv", details: "Regia di Giacomo Battiato. Miniserie televisiva Rai. Cast: Brad Davis, Tony Lo Bianco, Vincent Spano, B. De Rossi, Arnoldo Foà, A. Infanti, R. Tognazzi, M. Gazzo, Paolo Falace." },
  { year: "1987", title: "Nessuno torna indietro", type: "sceneggiato_tv", details: "Serie televisiva Rai. Episodi 1x01, 1x02, 1x03. Ruolo: Blanchette Brundy." },
  { year: "1987", title: "La voglia di vincere", type: "sceneggiato_tv", details: "Regia di Vittorio Sindoni. Miniserie Rai. Nel cast: Gianni Morandi, Catherine Spaak, Milly Carlucci, Vanessa Gravina, Paolo Falace." },
  { year: "1993", title: "Stay Lucky", type: "sceneggiato_tv", details: "Serie televisiva britannica di punta. Episodio 4x10." },
  
  // Cinema
  { year: "1972", title: "Donnarumma all'assalto", type: "cinema", details: "Regia di Marco Leto. Lungometraggio cinematografico d'autore." },
  { year: "1986", title: "Il tenente dei carabinieri", type: "cinema", details: "Regia di Maurizio Ponzi. Commedia cinematografica di rilievo nazionale. Nel cast: Nino Manfredi, Enrico Montesano, Massimo Boldi, Marisa Laurito, Mattia Sbragia, Paolo Falace." },
  { year: "1989", title: "'o Re", type: "cinema", details: "Regia di Luigi Magni. Commedia storica drammatica. Paolo Falace interpreta il personaggio Chiavone (Luigi 'Chiavone' Alonso)." }
];

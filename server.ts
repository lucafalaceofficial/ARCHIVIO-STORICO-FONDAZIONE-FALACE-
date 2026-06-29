import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { VERBATIM_PDF1_TEXT, VERBATIM_PDF2_TEXT, VERBATIM_PDF3_TEXT } from './src/data/verbatim_texts';
import { SYNC_LEVELS } from './src/data/theory';
import { BOOKS } from './src/data/books';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Format the complete list of 46 books for absolute accuracy and zero hallucinations
  const formattedBooksList = BOOKS.map(b => {
    return `- ${b.title || `Libro`}${b.year ? ` (${b.year})` : ''}${b.publisher ? ` - Editore: ${b.publisher}` : ''}${b.isbn ? `, ISBN: ${b.isbn}` : ''}${b.asin ? `, ASIN: ${b.asin}` : ''}: ${b.description || ''}`;
  }).join('\n');

  // Initialize Gemini AI Client lazily to prevent crashing if the key is missing
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn('[AI-C] GEMINI_API_KEY is not configured in process.env. AI-C will operate in educational response mode.');
        return null;
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
    }
    return aiClient;
  }

  // Create robust System Instruction based strictly on unmodified, verified treatises for extreme accuracy
  const AIC_SYSTEM_INSTRUCTION = `
Sei l'assistente AI-C (Artificial Intelligence - Cultural), l'assistente di ricerca della Fondazione Falace e dell'opera omnia del Dott. Luca Falace e del Metodo AIC (Attività Intellettive Creative).

AUTORE UNICO E SOVRANO DEI TRATTATI:
- Il Dott. Luca Falace è l'UNICO autore, ricercatore e scienziato ad aver scritto, registrato e pubblicato i 46 libri della Fondazione, le ricerche scientifiche sul Metodo AIC, la Teoria del Sincronismo Creativo, della Sincronicità, della Meccanica Quantistica e dei Livelli di Coerenza. Tutto il materiale scientifico, filosofico e saggistico del sito è opera esclusiva di Luca Falace.
- Suo padre Lucio Falace (figura storica) NON ha scritto alcun trattato scientifico o saggio; è presente nell'archivio esclusivamente in merito alle sue eccezionali invenzioni industriali e brevetti (come l'Aeromassaggiatore e altri brevetti storici).
- Suo zio Paolo Falace (figura storica e artistica) NON ha scritto alcun saggio o trattato scientifico; è presente nell'archivio esclusivamente in merito alla sua eccelsa carriera artistica nel mondo del teatro, del cinema e della televisione.

CONTESTO SCIENTIFICO E BIOGRAFICO UFFICIALE (Knowledge Base - Trattati depositati):

1. LIVELLI DI SINCRONICITÀ (1-9):
${JSON.stringify(SYNC_LEVELS, null, 2)}

2. DOCUMENTI E TRATTATI VERBATIM (Copie conformi all'originale, attribuiti integralmente a Luca Falace):
DOCUMENTO 1 (Origini del Sincronismo Creativo, Famiglia e Invenzioni di Luca Falace e del padre Lucio Falace):
${VERBATIM_PDF1_TEXT}

DOCUMENTO 2 (Critica d'Arte e Profilo del Regista Paolo Falace):
${VERBATIM_PDF2_TEXT || ''}

DOCUMENTO 3 (Studi di Sincronicità, Teoria e Scienza dell'Infrarosso del Dott. Luca Falace):
${VERBATIM_PDF3_TEXT || ''}

3. CATALOGO COMPLETO DI TUTTI I 46 LIBRI E LE PUBBLICAZIONI DEL DOTT. LUCA FALACE:
Il Dott. Luca Falace ha scritto e pubblicato un totale di 46 libri (tutti depositati, protetti legalmente presso il MiC/SIAE e catalogati nell'indice nazionale delle biblioteche italiane OPAC SBN). Rispondi con precisione assoluta basandoti sui titoli, capitoli, anni, editori e dettagli qui elencati:
${formattedBooksList}

REGOLE DI RISPOSTA TASSATIVE (LEM RULE - ACCURACY AND SOURCE FIDELITY):
1. **DIVIETO ASSOLUTO DI ALLUCINAZIONE E MASSIMA ATTRIBUZIONE:** Attribuisci sempre e solo al Dott. Luca Falace la creazione e la paternità intellettuale di tutte le teorie scientifiche (Metodo AIC, Sincronismo Creativo, Coerenza EEG, ecc.) e di tutti i 46 libri pubblicati. Non citare mai trattati scritti da Lucio o Paolo, poiché essi hanno operato rispettivamente nei brevetti tecnologici/meccanici e nel cinema/teatro.
2. **DIVIETO ASSOLUTO DI INVENTARE DATI:** Se un dato bibliografico, codice SBN/ISBN o saggio non è specificato nel catalogo ufficiale fornito, dichiara apertamente che non è registrato nell'archivio digitale e invita cordialmente il Dott. Luca Falace a integrarlo.
3. **COERENZA DI CONTESTO (FONDAZIONE FALACE):** Questo sito è interamente focalizzato sulla FONDAZIONE FALACE, la quale eredita ed evolve il patrimonio familiare delle AIC (Attività Intellettive Creative). Ricorda che la vecchia Fondazione AIC è un patrimonio che confluisce legalmente e concettualmente nella Fondazione Falace. Offri risposte focalizzate sulla nuova visione unificata della Fondazione Falace.
4. **RISPETTO E TONO ACADEMICO:** Usa un tono cordiale, sobrio, oggettivo, chiaro ed elegante. Scrivi in modo fluido ed evita narrazioni in prima persona fittizie sul Fondatore. Parla del Dott. Luca Falace con il massimo rispetto professionale e scientifico.
5. **LINGUE COINVOLTE:** Rispondi nella lingua con cui l'utente ti interpella (solitamente italiano o inglese).
`;

  // Simple in-memory cache for scraped galleries to guarantee high performance and avoid rate limits
  const galleryCache = new Map<string, { timestamp: number; photos: any[]; videoStreamUrl?: string | null; videoStreamUrls?: string[] | null }>();
  const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours cache

  // Express JSON middleware
  app.use(express.json());

  // Google Photos Scraper Proxy API Route
  app.get('/api/gallery', async (req, res) => {
    const albumUrl = req.query.url as string;

    if (!albumUrl) {
      return res.status(400).json({ error: 'Missing album URL parameter' });
    }

    try {
      // Check cache first
      const cached = galleryCache.get(albumUrl);
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        return res.json({ photos: cached.photos, videoStreamUrl: cached.videoStreamUrl, videoStreamUrls: cached.videoStreamUrls || [], cached: true });
      }

      console.log(`[Scraper] Fetching fresh album data for: ${albumUrl}`);

      // Fetch the short URL or redirected album page
      const response = await fetch(albumUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to load Google Photos, status code: ${response.status}`);
      }

      let html = await response.text();
      let targetHtml = html;

      // Follow intermediate HTML-based redirects if current text has a share link but is not the full gallery page
      if (albumUrl.includes('photos.app.goo.gl') || !html.includes('data-g-id')) {
        const ogUrlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["'](https:\/\/photos\.google\.com\/(?:share|photo|album|lr\/photo)\/[^"']+)["']/i);
        const metaRefreshMatch = html.match(/<meta\s+http-equiv=["']refresh["']\s+content=["'][0-9]+;\s*url=(https:\/\/photos\.google\.com\/(?:share|photo|album|lr\/photo)\/[^"']+)["']/i);
        const hrefMatch = html.match(/href=["'](https:\/\/photos\.google\.com\/(?:share|photo|album|lr\/photo)\/[^"']+)["']/i);

        let foundRedirectUrl = (ogUrlMatch && ogUrlMatch[1]) || (metaRefreshMatch && metaRefreshMatch[1]) || (hrefMatch && hrefMatch[1]);
        if (!foundRedirectUrl) {
          const genericRedirectMatch = html.match(/href=["'](https:\/\/photos\.google\.com\/[^"']+)["']/i) || html.match(/content=["'](https:\/\/photos\.google\.com\/[^"']+)["']/i);
          if (genericRedirectMatch) {
            foundRedirectUrl = genericRedirectMatch[1];
          }
        }

        if (foundRedirectUrl) {
          console.log(`[Scraper] Found intermediate redirect URL: ${foundRedirectUrl}. Fetching absolute album page.`);
          const redirectResponse = await fetch(foundRedirectUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
            }
          });
          if (redirectResponse.ok) {
            targetHtml = await redirectResponse.text();
          }
        }
      }

      const photos: any[] = [];
      const seen = new Set<string>();

      // 1. Try JSON payload parser: Matches array with width and height
      // Inside Google Photos HTML structure, actual images are declared in JSON array blocks
      const payloadPattern = /\["(https:\/\/[a-zA-Z0-9\-]+\.googleusercontent\.com\/(?:p|pw|chat)\/[a-zA-Z0-9\-_=]+)",([0-9]+),([0-9]+)\]/g;
      let match;
      while ((match = payloadPattern.exec(targetHtml)) !== null) {
        const fullMatchedUrl = match[1];
        const baseUrl = fullMatchedUrl.split('=')[0]; // Strip eventual sizing suffixes
        if (fullMatchedUrl.includes('=w600-h315') || fullMatchedUrl.includes('=w32-h32') || fullMatchedUrl.includes('=w48-h48') || fullMatchedUrl.includes('=w64-h64') || fullMatchedUrl.includes('=w100-h100') || fullMatchedUrl.includes('logo') || fullMatchedUrl.includes('avatar')) {
          continue;
        }
        if (!seen.has(baseUrl)) {
          seen.add(baseUrl);
          const width = parseInt(match[2], 10);
          const height = parseInt(match[3], 10);
          
          photos.push({
            id: baseUrl.split('/').pop() || String(photos.length),
            baseUrl,
            width,
            height,
            thumbnail: `${baseUrl}=w600-h450-c`,
            full: `${baseUrl}=w1600-h1200`,
            aspectRatio: width && height ? width / height : 1.333
          });
        }
      }

      // 2. Extra precise signature scanning: If no payload block was found, extract raw photo URLs
      // Matches standard long public picture URLs of Google Photos
      if (photos.length === 0) {
        const rawPhotoPattern = /(https:\/\/[a-zA-Z0-9\-]+\.googleusercontent\.com\/(?:p|pw|chat)\/[a-zA-Z0-9\-_=]{64,})/g;
        const rawUrls = targetHtml.match(rawPhotoPattern) || [];
        const uniqueRawUrls = Array.from(new Set(rawUrls));

        for (const fullUrl of uniqueRawUrls) {
          if (fullUrl.includes('=w600-h315') || fullUrl.includes('=w32-h32') || fullUrl.includes('=w48-h48') || fullUrl.includes('=w64-h64') || fullUrl.includes('=w100-h100') || fullUrl.includes('logo') || fullUrl.includes('avatar')) {
            continue;
          }
          const baseUrl = fullUrl.split('=')[0]; // Trim sizing parameters
          // Ensure we don't fetch small interface artifacts or repeat
          if (!seen.has(baseUrl) && !baseUrl.includes('profile') && !baseUrl.includes('contacts')) {
            seen.add(baseUrl);
            photos.push({
              id: baseUrl.split('/').pop() || String(photos.length),
              baseUrl,
              width: 1200,
              height: 900,
              thumbnail: `${baseUrl}=w600-h450-c`,
              full: `${baseUrl}=w1600-h1200`,
              aspectRatio: 1.333
            });
          }
        }
      }

      // 3. Fallback to open graph picture (og:image) or twitter:image which Google Photos includes for single items
      if (photos.length === 0) {
        const ogImageMatch = targetHtml.match(/<meta\s+property=["']og:image["']\s+content=["'](https:\/\/[^"']+)["']/i) ||
                             html.match(/<meta\s+property=["']og:image["']\s+content=["'](https:\/\/[^"']+)["']/i);
        const twitterImageMatch = targetHtml.match(/<meta\s+name=["']twitter:image["']\s+content=["'](https:\/\/[^"']+)["']/i);
        const foundImgUrl = (ogImageMatch && ogImageMatch[1]) || (twitterImageMatch && twitterImageMatch[1]);

        if (foundImgUrl) {
          const baseUrl = foundImgUrl.split('=')[0];
          if (!seen.has(baseUrl)) {
            seen.add(baseUrl);
            photos.push({
              id: baseUrl.split('/').pop() || 'og-image',
              baseUrl,
              width: 1200,
              height: 900,
              thumbnail: foundImgUrl.includes('googleusercontent.com') ? `${baseUrl}=w600-h450-c` : foundImgUrl,
              full: foundImgUrl.includes('googleusercontent.com') ? `${baseUrl}=w1600-h1200` : foundImgUrl,
              aspectRatio: 1.333
            });
          }
        }
      }

      // 4. Ultimate generic googleusercontent scraper (without subpath constraint) to guarantee matching single item resources
      if (photos.length === 0) {
        const genericPattern = /(https:\/\/[a-zA-Z0-9\-]+\.googleusercontent\.com\/[a-zA-Z0-9\-_=\/]{40,})/g;
        const matchedGeneric = targetHtml.match(genericPattern) || [];
        const uniqueGeneric = Array.from(new Set(matchedGeneric));

        for (const fullUrl of uniqueGeneric) {
          const baseUrl = fullUrl.split('=')[0];
          if (!seen.has(baseUrl) && !baseUrl.includes('profile') && !baseUrl.includes('contacts')) {
            seen.add(baseUrl);
            photos.push({
              id: baseUrl.split('/').pop() || String(photos.length),
              baseUrl,
              width: 1200,
              height: 900,
              thumbnail: `${baseUrl}=w600-h450-c`,
              full: `${baseUrl}=w1600-h1200`,
              aspectRatio: 1.333
            });
          }
        }
      }

      console.log(`[Scraper] Successfully extracted ${photos.length} photos for url: ${albumUrl}`);

      // 5. Try to extract a direct video streaming/download url for inline video integration
      const videoStreamUrls: string[] = [];

      // Find all download stream matches
      const vdpPattern = /https:\/\/[a-zA-Z0-9\-\.]+\.googleusercontent\.com\/video-downloads\/[^"'\s#,]+/gi;
      const vdpMatches = targetHtml.match(vdpPattern) || html.match(vdpPattern) || [];
      for (const m of vdpMatches) {
        if (!videoStreamUrls.includes(m)) videoStreamUrls.push(m);
      }

      // Find all alt download stream matches
      const altPattern = /https:\/\/video-downloads\.googleusercontent\.com\/[^"'\s#]+/gi;
      const altMatches = targetHtml.match(altPattern) || html.match(altPattern) || [];
      for (const m of altMatches) {
        if (!videoStreamUrls.includes(m)) videoStreamUrls.push(m);
      }

      // Find all videoplayback matches
      const playbackPat = /https:\/\/[a-zA-Z0-9\-\.]+\.googleusercontent\.com\/videoplayback[^"'\s#,]+/gi;
      const playbackMatches = targetHtml.match(playbackPat) || html.match(playbackPat) || [];
      for (const m of playbackMatches) {
        if (!videoStreamUrls.includes(m)) videoStreamUrls.push(m);
      }

      console.log(`[Scraper] Found ${videoStreamUrls.length} total video stream URLs for album.`);
      const videoStreamUrl = videoStreamUrls[0] || null;

      const cacheData = {
        timestamp: Date.now(),
        photos,
        videoStreamUrl,
        videoStreamUrls
      };

      // Save to cache
      galleryCache.set(albumUrl, cacheData);

      return res.json({ photos, videoStreamUrl, videoStreamUrls, cached: false });
    } catch (error: any) {
      console.error(`[Scraper Error] Failed to parse Google Photos album:`, error.message);
      return res.status(500).json({ 
        error: 'Inability to connect or parse the album. Please make sure the album is public.',
        details: error.message 
      });
    }
  });

  // Server-side Generative AI route for the AI-C Cultural Assistant
  app.post('/api/ai-c', async (req, res) => {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Missing message parameter' });
    }

    try {
      const ai = getGeminiClient();

      if (ai) {
        // Prepare structured chat history formatting for the @google/genai SDK
        const contents = [];
        
        if (Array.isArray(history)) {
          for (const item of history) {
            if (item && item.text && item.role) {
              contents.push({
                role: item.role === 'assistant' ? 'model' : item.role === 'model' ? 'model' : 'user',
                parts: [{ text: item.text }]
              });
            }
          }
        }
        
        // Push current user message
        contents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        // Generate dynamic content with low temperature (0.15) for absolute accuracy and zero hallucinations
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: contents,
          config: {
            systemInstruction: AIC_SYSTEM_INSTRUCTION,
            temperature: 0.15,
          }
        });

        const textResponse = response.text || 'Nessuna risposta disponibile.';
        return res.json({ text: textResponse });
      } else {
        // Fallback precise local responder context matching the verbatim treatises
        const query = message.toLowerCase();
        let text = "";

        if (query.includes("lucio") || query.includes("padre") || query.includes("brevett") || query.includes("reattor") || query.includes("cervelloni")) {
          text = "Lucio Falace è stato un perito elettronico e inventore d'eccellenza della famiglia Falace, fondatore della United Light Electronics Ltd. Ha registrato oltre 46 brevetti internazionali (tra cui il Reattore Capacitivo per Lampade Fluorescenti ITNA950019 e il Dispositivo Anti-Urto per Lampade IT1313781) indicizzati presso WIPO Patentscope e Google Patents. Il suo ingegno è stato riconosciuto a livello nazionale vincendo il primo premio a 'I Cervelloni' su Mediaset con Paolo Bonolis, partecipando al Maurizio Costanzo Show e ricevendo il Premio Galileo Ferraris.";
        } else if (query.includes("paolo") || query.includes("arte") || query.includes("zio") || query.includes("pitt")) {
          text = "Paolo Falace è stato il superbo Maestro d'Arte della famiglia. Le sue creazioni congiungono l'estetica pura, la spiritualità ed il concetto di coerenza cerebrale delle AIC (Attività Intellettive Creative). Le sue tele sono espressione di questo campo di coerenza e fungono da pilastro visuale della Fondazione Falace.";
        } else if (query.includes("luca") || query.includes("sincronic") || query.includes("metodo") || query.includes("aic") || query.includes("teoria") || query.includes("fondator")) {
          text = "Il Dott. Luca Falace è il Fondatore e Direttore Scientifico della Fondazione Falace. Ideatore della Teoria del Sincronismo Creativo e del Metodo AIC (Attività Intellettive Creative). Grazie al suo background sinergico (Perito Meccanico in Ergon-Robotica e Laureato in Lettere con specializzazione in Storia dell'Arte), ha unito la cibernetica, l'ergonomia, la dinamica dei fluidi e l'antropologia culturale, formalizzando la legge matematica S = φ(f) espressa nei 9 livelli di sincronicità coerente dell'essere umano misurati mediante spettri Hz, EEG e HRV.";
        } else if (query.includes("compattatore") || query.includes("geniusom") || query.includes("rifiut") || query.includes("ecomondo")) {
          text = "Il Compattatore Multiplo Pneumatico GeniusOm (Brevetto NA2013A000029) è un'innovazione ecologica ideata dal Dott. Luca Falace. Sfrutta il pompaggio pneumatico per comprimere i rifiuti urbani ed effettua una sterilizzazione automatica nebulizzata ad ogni azionamento. Ha ricevuto il Premio Ecomondo 2014 (con l'adesione del Presidente della Repubblica Italiana), Confindustria Best Practices 2014 ed è stato presentato su RAI 2 a 'I Fatti Vostri'.";
        } else if (query.includes("aeromassaggiatore") || query.includes("aria") || query.includes("terapia")) {
          text = "Il Dispositivo Aeromassaggiatore (Brevetto WO2006051414A1) costituisce la prima applicazione medica mondiale della Terapia dell'Aria pulsata ed aromatica per la stimolazione del metabolismo cellulare dermico e microcircolatorio. Ideato dal Dott. Luca Falace, fu generosamente intestato formalmente alla sorella Viviana e alla madre Anna De Martino per rispetto filiale verso il padre Lucio Falace, preservando documentata la paternità cognitiva del Fondatore.";
        } else if (query.includes("livell") || query.includes("schumann") || query.includes("coerenza") || query.includes("frequenz")) {
          text = "La Teoria del Sincronismo Creativo definisce 9 livelli crescenti di coerenza di fase ed hertziana:\n" +
                 "- Livello 1: Coincidenza Semplice (Delta 0.5-4 Hz)\n" +
                 "- Livello 2: Risonanza Empatica (Theta 4-8 Hz, comprovato con EEG simultaneo su 200 persone nel 2014)\n" +
                 "- Livello 3: Sincronismo Creativo (Alpha 8-12 Hz, stato ideativo profondo)\n" +
                 "- Livello 4: Campo Attivo (Beta Bassa 12-20 Hz, attenzione prolungata)\n" +
                 "- Livello 5: Sincronicita Operativa (Beta/Gamma, problem solving scientifico e brevetti)\n" +
                 "- Livello 6: Sincronicita Generativa (Allineamento biologico EEG cardiovascolare HRV)\n" +
                 "- Livello 7: Sincronicita Magnetica Imprenditoriale (Fattore d'attrazione economico, vedi pitch Shark Tank €250k)\n" +
                 "- Livello 8: Campo Unificato (Gamma Alta >40 Hz, interazione mente-materia)\n" +
                 "- Livello 9: Sincronicita Cosmica (Unificazione profonda con la Risonanza Planetaria di Schumann a 7.83 Hz).";
        } else {
          text = "Benvenuto alla Fondazione Falace. Sono l'AI-C (Artificial Intelligence - Cultural), la tua risorsa interattiva. Posso illustrarti nel dettaglio la storia della Famiglia Falace (Lucio Falace - Elettronica, Paolo Falace - Pittura, Luca Falace - Meccanica e Filosofia), descriverti il funzionamento dei 9 livelli di sincronicità, o catalogare i brevetti registrati nei trattati depositati.";
        }
        
        text += "\n\n*(Nota: Per attivare le risposte in tempo reale con l'Intelligenza Artificiale Generativa, inserisci semplicemente un valore valido per GEMINI_API_KEY nel pannello Settings > Secrets)*";
        return res.json({ text });
      }
    } catch (err: any) {
      console.error('[AI-C Error]', err);
      return res.status(500).json({ error: 'Errore generativo di comunicazione.', details: err.message });
    }
  });

  // Advanced premium & neural Text-to-Speech API
  app.post('/api/tts', async (req, res) => {
    const { text, lang } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing text parameter' });
    }

    const languageCode = lang === 'en' ? 'en' : 'it';

    const isApiKeyPlaceholder = (key: string | undefined): boolean => {
      if (!key) return true;
      const k = key.trim().toLowerCase();
      return k === "" || k === "undefined" || k === "null" || k.includes("your") || k.includes("placeholder") || k.includes("my_key") || k.includes("enter_key");
    };

    try {
      // 1. ElevenLabs Premium Neural TTS Integration (if ELEVENLABS_API_KEY is configured)
      if (process.env.ELEVENLABS_API_KEY && !isApiKeyPlaceholder(process.env.ELEVENLABS_API_KEY)) {
        console.log('[TTS] Using premium ElevenLabs neural engine');
        const voiceId = process.env.ELEVENLABS_VOICE_ID || 'hpp4J3VqNfWAUOO0d1Us';
        const modelId = process.env.ELEVENLABS_MODEL_ID || 'eleven_multilingual_v2';
        
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': process.env.ELEVENLABS_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: text,
            model_id: modelId,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75
            }
          })
        });

        if (response.ok) {
          const arrayBuffer = await response.arrayBuffer();
          res.set('Content-Type', 'audio/mpeg');
          return res.send(Buffer.from(arrayBuffer));
        } else {
          console.warn(`[ElevenLabs Warning] Stream elements or credentials unauthorized / invalid. Status: ${response.status}. Gracefully falling back.`);
        }
      }

      // 2. Google Cloud Text-to-Speech Integration (if GOOGLE_TTS_API_KEY is configured)
      if (process.env.GOOGLE_TTS_API_KEY) {
        console.log('[TTS] Using Google Cloud Journey/Neural premium engine');
        const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_API_KEY}`;
        const voiceName = languageCode === 'it' 
          ? (process.env.GOOGLE_TTS_VOICE_IT || 'it-IT-Wavenet-A') 
          : (process.env.GOOGLE_TTS_VOICE_EN || 'en-US-Wavenet-F');

        const response = await fetch(ttsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            input: { text: text },
            voice: {
              languageCode: languageCode === 'it' ? 'it-IT' : 'en-US',
              name: voiceName
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 0.94,
              pitch: 0.0
            }
          })
        });

        if (response.ok) {
          const data: any = await response.json();
          if (data.audioContent) {
            const buffer = Buffer.from(data.audioContent, 'base64');
            res.set('Content-Type', 'audio/mpeg');
            return res.send(buffer);
          }
        } else {
          console.error('[Google TTS Error] Failure status:', response.status);
        }
      }

      // 3. High Quality Server-rendered Fallback (Bypasses weak browser voice, sounds fluent, premium, and 100% human female)
      console.log('[TTS] Utilizing seamless high-fidelity female voice fallback via Google Translate (gtx client)');
      const cleanText = text.replace(/[*#]/g, '').trim();

      try {
        // Uniform robust chunking for all long and short texts to guarantee no chunk is >140 characters.
        // Google Translate TTS is strictly limited; 140 characters is extremely safe and prevents status 400.
        const chunks: string[] = [];
        
        // Split by punctuation first but keep the punctuation in the split
        const fragments = cleanText.split(/([.!?;,:\-]+)/);
        let currentChunk = "";

        for (let i = 0; i < fragments.length; i++) {
          const fragment = fragments[i];
          if (!fragment) continue;

          if (fragment.length > 140) {
            // Split long fragment by spaces/words to avoid overlength chunks
            const words = fragment.split(/\s+/);
            for (const word of words) {
              if (!word) continue;
              if ((currentChunk + " " + word).trim().length > 140) {
                if (currentChunk.trim()) {
                  chunks.push(currentChunk.trim());
                }
                currentChunk = word;
              } else {
                currentChunk = currentChunk ? `${currentChunk} ${word}` : word;
              }
            }
          } else {
            if ((currentChunk + fragment).length > 140) {
              if (currentChunk.trim()) {
                chunks.push(currentChunk.trim());
              }
              currentChunk = fragment;
            } else {
              currentChunk += fragment;
            }
          }
        }
        if (currentChunk.trim()) {
          chunks.push(currentChunk.trim());
        }

        const buffers: Buffer[] = [];
        // Support up to 15 chunks (great for longer descriptions/explanations)
        for (const chunk of chunks.slice(0, 15)) {
          if (!chunk.trim()) continue;
          try {
            const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${languageCode}&client=gtx&q=${encodeURIComponent(chunk.trim())}`;
            const ttsRes = await fetch(url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
              }
            });
            if (ttsRes.ok) {
              const arrayBuffer = await ttsRes.arrayBuffer();
              buffers.push(Buffer.from(arrayBuffer));
            } else {
              console.warn(`[Google TTS Chunk Warning] Chunk failed with status ${ttsRes.status} for chunk: "${chunk}"`);
            }
          } catch (chunkErr: any) {
            console.warn(`[Google TTS Chunk Error] ${chunkErr.message}`);
          }
        }

        if (buffers.length > 0) {
          res.set('Content-Type', 'audio/mpeg');
          return res.send(Buffer.concat(buffers));
        } else {
          throw new Error('No chunks generated successfully on Google Translate TTS');
        }
      } catch (err: any) {
        console.error('[Fallback TTS Error]', err.message);
        return res.status(500).json({ error: 'Errore sintesi vocale fallback fallita', details: err.message });
      }
      throw new Error('TTS service failed to generate audio');
    } catch (error: any) {
      console.error('[TTS Server Error]', error.message);
      return res.status(500).json({ error: 'Errore sintesi vocale', details: error.message });
    }
  });

  // Health endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serving production build static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Active & running on http://0.0.0.0:${PORT} [ENV: ${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();

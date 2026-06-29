/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API Route: talk to Gemini representing L'Opera Celeste
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Il messaggio è richiesto" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        return res.status(400).json({
          error: "GEMINI_API_KEY non configurata",
          reply: "In quanto assistente con modalità locale, ti informiamo che puoi esplorare il Polo Museale o registrare il tuo vecchio profilo. Configura la chiave API in AI Studio per risposte intelligenti illimitate!"
        });
      }

      // Safe lazy initialization as per robust guidelines
      const ai = new GoogleGenAI({ apiKey });
      
      const systemInstruction = `
        Agisci come l'Assistente Ufficiale Internazionale di "HUMANA HUB AIC", il portale operativo della "FONDAZIONE FALACE – ATTIVITÀ INTELLETTIVE CREATIVE" (indicata abbreviata anche come "FF FONDAZIONE FALACE delle AIC"), fondata e presieduta dal Dott. Luca Falace, con la consulenza legale governata dal CLO (Chief Legal Officer) Avv. Pier Francesco De Juliis.
        Usa una terminologia estremamente elegante, colta, professionale, istituzionale ed esperta, ispirata alla pace dell'animo e alla fusione sinergica tra Arte ed Invenzione Scientifica.
        Usa i seguenti dettagli statutari ed operativi ufficiali (Stralcio Atto Costitutivo 2026) per guidare le tue risposte:
        - Natura Giuridica & Costituzione (Art. 1): Ente con personalità giuridica di diritto privato legalmente riconosciuto senza fine di lucro. È apolitica ed apartitica, rifiuta discriminazioni di sesso, etnia, lingua e religione ed opera come organismo di ricerca, promozione e formazione. Rifiuta l'iscrizione come ETS (Ente del Terzo Settore).
        - Scopo & Metodo (Art. 3): L'oggetto e lo scopo esclusivo e preminente è la salvaguardia, la protezione giuridica dall'allineamento o contraffazione algoritmica (comprese manipolazioni AI), l'archiviazione logica e la divulgazione del METODO DEL SINCRONISMO CREATIVO (Metodo AIC©).
        - Memoria di Famiglia: Sostiene in via sussidiaria la valorizzazione dei brevetti storici di Lucio Falace e la tutela dei diritti d'autore, d'attore e interpretazione teatrale o televisiva di Paolo Falace (coordinati via Nuovo IMAIE e SIAE).
        - Classificazione Attività (Sezioni A - H):
          • Sezione A: Pittura e Disegno manuale o multimediale (A1-A2), Fotografia (A3).
          • Sezione B: Scultura (B1-B2).
          • Sezione C: Design oggetti, architettura, trasporti, Arte AI (C1-C4).
          • Sezione D: Saggistica, romanzi (D1-D2), Biblioteca e Archivio storico (D3).
          • Sezione E: Regia, testi teatrali, video clip, danza (E1-E3).
          • Sezione F: Musica, canzoni, melodie, convegni (F1-F3).
          • Sezione G: Invenzioni artistiche e scientifiche, scoperte, brevetti ed energie alternative solari/marine/magnetiche/ecologiche (G1-G4).
          • Sezione H: Tecniche di benessere, musicoterapia, yoga, medicine unite e olistiche (H1-H4).
        - 40 Corsi Accademici Didattici: Propone percorsi in lingue straniere, informatica (web dev, blockchain, crypto), business management e marketing, fotografia, cucina e pasticceria, yoga e fitness, coaching, scrittura narrativa e tecnica, psicologia cellulare o clinica, giurisprudenza/diritto e scienze ecologiche.
        - Altri Servizi Strumentali:
          • Attività Editoriale: Pubblicazione di riviste, cataloghi d'arte contemporanea e sviluppo di una Web TV.
          • Servizi alle Imprese: Creazione di impresa, innovazione tecnologica e istruttorie B2B per contributi statali o europei (es. Creative Europe, Horizon).
          • Gestione Separata Commerciale supportante: Vendita di materiale didattico, e-book (ASIN B0774WCKJ9), giochi scientifici e servizi di ristorazione museale.
        
        Rispondi sempre in lingua italiana, in modo chiaro, estremamente professionale, rassicurante, scientifico ed accogliente, limitandoti a un massimo di 3-4 frasi compiute per risposta per mantenere alta la leggibilità.
      `;

      // Call Gemini 3.5 Flash (recommended basic text model in SKILL.md)
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nDomanda utente: ${message}` }] }
        ]
      });

      const replyText = response.text || "Nessuna risposta generata da Gemini.";
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error("Errore nell'integrazione Gemini:", err);
      res.status(500).json({
        error: err.message || "Errore sconosciuto",
        reply: "Siamo spiacenti, ho riscontrato una collisione energetica transitoria. Potrebbe trattarsi di una frequenza di rete instabile. Prova ad inoltrare tra pochi istanti o esplora i nostri archivi statici."
      });
    }
  });

  // Vite development middleware vs Static serve production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express server running on http://0.0.0.0:${PORT} in mode ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer();

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, AlertCircle, RefreshCw, X } from 'lucide-react';
import { ChatMessage } from '../types';

export default function AicChatAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: "Salve! Sono l'Assistente Intelligente di HUMANA HUB AIC, l'infrastruttura digitale proprietaria della Fondazione Falace delle Attività Intellettive Creative. Operando in stretto coordinamento con il fondatore Dott. Luca Falace e il nostro CLO Avv. Pier Francesco De Juliis, posso guidarti a conoscere i nostri servizi per la tutela, valorizzazione, promozione e certificazione a data certa delle opere e scoperte dell'ingegno umano. Come posso esserti utile oggi?",
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userText = inputText;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    setErrorStatus(null);

    try {
      // Call our custom backend Express route `/api/chat`
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: messages.map(m => ({ role: m.sender === 'user' ? 'user' : 'model', text: m.text })) })
      });

      if (!response.ok) {
        throw new Error("Errore risposta server");
      }

      const data = await response.json();
      
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || "Nessuna risposta disponibile.",
        timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.warn("Chiamata server fallita (possibile ambiente locale o API key assente). Uso fall-back locale.", err);
      
      // Standalone intelligent fall-back strictly mimicking Dott. Luca Falace & Avv. De Juliis guidelines
      setTimeout(() => {
        let fallbackText = "In quanto assistente di HUMANA HUB AIC, portale ufficiale della Fondazione Falace delle Attività Intellettive Creative fondata dal Dott. Luca Falace, ti informiamo che l'ente ha una duplice missione: primariamente la tutela legale e valorizzazione del patrimonio di famiglia (41+ libri ISBN, archivio scientifico CERN-Zenodo e 150k contatti storici) e, secondariamente, l'estensione degli stessi strumenti di certificazione d'autore ad altri creatori nel mondo.";
        
        const lowered = userText.toLowerCase();
        if (lowered.includes('migra') || lowered.includes('account') || lowered.includes('ning') || lowered.includes('vecchio')) {
          fallbackText = "Per migrare la tua vecchia iscrizione dall'archivio dell'Opera Celeste (portale NING 2005-2010), ti invitiamo a inserire il tuo indirizzo email storico nel nostro pannello 'Migrazione'. Questo ti ricollegherà alla nostra mailing list di 150.000 utenti e preserverà il tuo diritto storico in coordinamento con lo staff del CLO Avv. De Juliis.";
        } else if (lowered.includes('deposit') || lowered.includes('priorit') || lowered.includes('diritto') || lowered.includes('tutela') || lowered.includes('certa')) {
          fallbackText = "La Fondazione Falace offre un servizio di deposito intellettuale a data certa (con sigillo hash crittografato e numero di priorità AIC-PRI) per garantire la paternità d'autore prima della diffusione commerciale. I servizi si dividono in macro-sezioni coordinate nell'Emisfero Destro e Sinistro, fruendo della tesi brevettuale e dello schema di accumulatore solare del Dott. Falace.";
        } else if (lowered.includes('statuto') || lowered.includes('etica') || lowered.includes('principi') || lowered.includes('legale') || lowered.includes('ets')) {
          fallbackText = "Lo Statuto della Fondazione Falace delle Attività Intellettive Creative mantiene una struttura classica, tradizionale e no-profit (rifiutando statutariamente l'iscrizione come ETS o simili). Esercita funzioni di coordinamento 'holding-like' per la centralizzazione ed il tax planning del patrimonio d'ingegno, sotto il controllo legale del CLO Avv. De Juliis.";
        } else if (lowered.includes('bando') || lowered.includes('finanz') || lowered.includes('grants') || lowered.includes('europa') || lowered.includes('contribut')) {
          fallbackText = "La nostra strategia di sostentamento finanziario e di servizio (Fase A) per i creatori si focalizza sull'assistenza legale per l'accesso a bandi europei (es. Creative Europe, Horizon, bandi ministeriali transizione digitale ed ecologica). Puoi consultare l'apposito strumento di monitoraggio bandi nella scheda 'Certificazione & Bandi' per verificare l'idoneità delle tue idee.";
        } else if (lowered.includes('libro') || lowered.includes('amazon') || lowered.includes('kindle') || lowered.includes('pubblicaz')) {
          fallbackText = "La produzione intellettuale del Dott. Luca Falace conta oltre 41 saggi catalogati ISBN, tra cui 'Centro Culturale Arte e Scienza' (ASIN B0774WCKJ9) pubblicato con Amazon Kindle, base teorica di questa rivoluzione.";
        } else if (lowered.includes('avv') || lowered.includes('de juliis') || lowered.includes('legale') || lowered.includes('pier francesco')) {
          fallbackText = "L'Avv. Pier Francesco De Juliis è il Chief Legal Officer (CLO) e consulente fiscale d'eccellenza della Fondazione Falace. Governa le licenze e la cessione d'uso dei diritti, la compliance legale della fondazione classica non-ETS e l'unione dei 150.000 soci storici.";
        }
        
        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs" id="chat-advisor-root">
      {/* Header bar */}
      <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
            <Bot className="text-blue-600" size={16} />
          </div>
          <div>
            <h3 className="text-xs font-display font-bold text-slate-900 tracking-wide uppercase">Consulente HUMANA HUB AIC</h3>
            <span className="text-[9px] font-mono text-green-600 block font-bold leading-none mt-1">Connesso con Gemini AI Sincrono</span>
          </div>
        </div>
        
        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 text-[8px] font-mono rounded font-bold uppercase">
          Curation 2026
        </span>
      </div>

      {/* Messages bubble body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-slate-50 text-slate-700 border border-slate-100 leading-normal'
            }`}>
              <p className="whitespace-pre-line font-sans">{msg.text}</p>
              <span className={`text-[8px] block mt-1.5 text-right font-mono ${
                msg.sender === 'user' ? 'text-white/80' : 'text-slate-400'
              }`}>
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start items-center gap-1.5 p-2 text-xs font-mono text-slate-400">
            <RefreshCw size={12} className="animate-spin text-blue-600" />
            <span>Gemini sta analizzando lo Statuto...</span>
          </div>
        )}
        <div ref={containerRef} />
      </div>

      {/* Input query form */}
      <form onSubmit={handleSendMessage} className="p-3 bg-slate-50 border-t border-slate-200 flex gap-2" id="advisor-query-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Chiedi allo statuto, es: Come posso migrare il mio account Ning?"
          className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 font-sans"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
        >
          <Send size={13} />
          Invia
        </button>
      </form>
    </div>
  );
}

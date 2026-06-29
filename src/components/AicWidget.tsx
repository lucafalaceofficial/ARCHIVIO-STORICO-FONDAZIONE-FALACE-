import React, { useState } from 'react';
import { Sparkles, X, MessageSquareQuote, ShieldAlert } from 'lucide-react';

export default function AicWidget({ language }: { language: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const isIt = language === 'IT' || language === 'it';

  const quotes = [
    isIt ? "Sincronicità Livello 4: La forma segue la vibrazione del pensiero." : "Synchronicity Level 4: Form follows thought vibration.",
    isIt ? "Ogni frequenza a 432 Hz è un ponte di coerenza universale." : "Every 432 Hz frequency is a bridge of universal coherence.",
    isIt ? "Il Codice Falace custodisce i 9 livelli dell'essere." : "The Falace Code safeguards the 9 levels of being."
  ];

  const [quoteIdx, setQuoteIdx] = useState(0);

  return (
    <div className="fixed bottom-6 left-6 z-[100] font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0a2342] hover:bg-[#112d53] text-[#b8963e] border border-[#b8963e]/40 p-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-2.5 group cursor-pointer"
        >
          <Sparkles className="w-6 h-6 animate-pulse text-[#b8963e]" />
          <span className="text-xs font-mono font-bold tracking-wider text-white hidden sm:inline">
            {isIt ? "SINCRONICITÀ AIC" : "AIC SYNCHRONICITY"}
          </span>
        </button>
      )}

      {isOpen && (
        <div className="bg-[#0a2342] border-2 border-[#b8963e] rounded-3xl p-6 shadow-2xl max-w-sm text-white animate-fade-in relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-white/60 hover:text-white p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#b8963e] mb-3">
            <Sparkles className="w-5 h-5 shrink-0" />
            <h5 className="font-serif font-black text-sm tracking-wide uppercase">Oracle Sincronico AIC</h5>
          </div>

          <p className="font-serif italic text-sm text-white/95 leading-relaxed bg-black/30 p-4 rounded-2xl border border-white/10 my-3 min-h-[60px] flex items-center">
            "{quotes[quoteIdx]}"
          </p>

          <button
            onClick={() => setQuoteIdx((prev) => (prev + 1) % quotes.length)}
            className="w-full py-2 bg-[#b8963e] hover:bg-[#d0aa48] text-[#0a2342] font-mono text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow"
          >
            {isIt ? "Genera Nuovo Insight" : "Generate New Insight"}
          </button>
        </div>
      )}
    </div>
  );
}

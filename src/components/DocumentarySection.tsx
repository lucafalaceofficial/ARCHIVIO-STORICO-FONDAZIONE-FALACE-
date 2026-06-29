import React from 'react';
import { TV_DOC_SHOWS } from '../data/archiveData.js';
import { Play, Tv, ExternalLink, Calendar } from 'lucide-react';

export default function DocumentarySection() {
  return (
    <section className="py-16 px-6 border-b border-slate-900 bg-slate-900/10" id="documentaries">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 text-gold-400 font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
            <Tv className="w-4 h-4 text-gold-450" />
            <span>Rassegna Video &amp; Documentari Nazionali</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white font-sans sm:text-4xl">
            Passaggi Televisivi &amp; Riconoscimenti
          </h2>
          <p className="text-black text-sm mt-2 max-w-2xl font-sans">
            Archivio delle trasmissioni televisive nazionali e dei premi conferiti all'eccellenza industriale del Dott. Luca Falace.
          </p>
        </div>

        {/* Video stream list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TV_DOC_SHOWS.map((ep) => {
            return (
              <div 
                key={ep.num} 
                className="group relative bg-slate-950/80 border border-slate-900 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-850 hover:bg-slate-900/10 transition-all duration-300 "
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video bg-slate-900 flex items-center justify-center border-b border-slate-900 overflow-hidden">
                  {/* Glowing patterns representing screen or waveform */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent " />
                  <div className="absolute inset-0 bg-indigo-500/5 mix-blend-color-dodge" />
                  
                  {/* Decorative Play Button */}
                  <a 
                    href={ep.youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    referrerPolicy="no-referrer"
                    className="z-10 p-4 bg-gold-550 text-black rounded-full cursor-pointer hover:scale-110 active:scale-95 transition-all  flex items-center justify-center transform group-hover:bg-gold-400"
                  >
                    <Play className="w-5 h-5 fill-current animate-pulse" />
                  </a>

                  {/* Top tags and episode index */}
                  <div className="absolute top-3 left-3 bg-slate-950/90 text-white border border-slate-850 text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1.5">
                    <span className="text-gold-400">EPISODIO #{ep.num}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 text-gold-300 text-[10px] font-mono px-2.5 py-1 rounded border border-slate-800 font-semibold font-bold">
                    Anno {ep.year}
                  </div>
                </div>

                {/* Video Info Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-gold-300 leading-snug mb-2 transition-colors font-sans">
                      {ep.title}
                    </h3>
                    <p className="text-[11px] font-mono text-white/70 mb-4 tracking-tight">
                      Focus: <span className="text-white font-bold">{ep.topics}</span>
                    </p>
                    <p className="text-white/80 text-xs font-sans leading-relaxed">
                      {ep.description}
                    </p>
                  </div>

                  {/* REDIRECT LINK */}
                  <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-end">
                    <a 
                      href={ep.youtubeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-gold-450 hover:text-gold-300 tracking-wider font-semibold uppercase hover:underline"
                    >
                      <span>VEDI REGISTRAZIONE</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

import React from 'react';
import { ARTWORKS_CATALOG, FOUNDATION_METADATA } from '../data/archiveData.js';
import { Award, Palette, Calendar, MapPin } from 'lucide-react';

export default function ArtworksSection() {
  return (
    <section className="py-16 px-6 border-b border-[#0066CC] bg-white scroll-mt-16" id="artworks">
      <div className="max-w-7xl mx-auto">
        
        {/* Gallery Intro Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0066CC] font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
              <Palette className="w-4 h-4 text-[#0066CC]" />
              <span>Ministero della Cultura (MiC) Registro Opere</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-black">
              Pinacoteca &amp; Installazioni Sincroniche
            </h2>
            
            <p className="text-black text-sm mt-2 max-w-2xl leading-relaxed">
              Selezione delle principali installazioni multimediali, video-esperimenti e dipinti a tempera alchemica registrati presso il Ministero e la Discoteca di Stato.
            </p>
          </div>

          <div className="bg-white border border-[#0066CC] p-4.5 rounded-xl flex flex-col justify-center text-xs font-mono max-w-xs text-black ">
            <span className="text-[#0066CC] font-bold block uppercase tracking-widest text-[9px] mb-1">Catalogo Certificato MiC</span>
            <span>{FOUNDATION_METADATA.legal_backing.mic_mibac}</span>
          </div>
        </div>

        {/* Gallery Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTWORKS_CATALOG.map((art, index) => {
            return (
              <div 
                key={art.id}
                className="academic-card overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Placeholder mimicking contemporary minimalist gallery card */}
                <div className="relative aspect-video bg-white flex items-center justify-center overflow-hidden border-b border-[#0066CC]">
                  {/* Subtle vector grid and geometric overlays for alchemical aesthetic */}
                  <div className="absolute inset-0   " />
                  <div className="absolute w-24 h-24 rounded-full border border-[#0066CC]/10 group-hover:scale-125 transition-transform duration-700" />
                  <div className="absolute w-12 h-12 rounded-full border border-blue-400/5 group-hover:rotate-45 transition-transform duration-700" />

                  {/* Icon representation depending on type */}
                  <Palette className="w-8 h-8 text-slate-300 group-hover:text-[#0066CC]/85 transition-colors" />

                  {/* Year badge */}
                  <span className="absolute top-3 right-3 bg-white border border-black text-[#0066CC] text-[9.5px] font-mono px-2 py-0.5 rounded font-bold">
                    {art.year}
                  </span>
                </div>

                {/* Info Text */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2.5 font-mono text-[9.5px] text-black uppercase font-bold">
                      <span className="text-[#0066CC]">●</span>
                      <span>{art.category}</span>
                    </div>

                    <h3 className="text-sm sm:text-base font-bold font-serif text-black hover:text-[#0066CC] transition-colors leading-snug mb-2">
                      {art.title}
                    </h3>

                    <p className="text-black text-xs leading-relaxed font-sans mt-2">
                      {art.description}
                    </p>
                  </div>

                  {/* Exhibition Venue info */}
                  <div className="mt-6 pt-4 border-t border-[#FCFAF7] flex items-center gap-2 text-[11px] text-black font-mono">
                    <MapPin className="w-3.5 h-3.5 text-black shrink-0" />
                    <span className="truncate" title={art.venue}>Esposto: <strong className="text-black font-medium">{art.venue}</strong></span>
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

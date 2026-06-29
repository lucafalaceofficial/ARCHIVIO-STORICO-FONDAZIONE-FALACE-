import React from 'react';
import { ARTWORKS_CATALOG } from '../../data/archiveData.js';
import { Palette, Landmark, ShieldCheck } from 'lucide-react';

export default function WorksSection() {
  return (
    <section id="works-section" className="bg-white border border-[#0066CC] rounded-2xl p-6 sm:p-8 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-5 mb-6">
        <div className="p-2.5 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Palette className="w-5.5 h-5.5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-base text-black tracking-wide uppercase">
            Pinacoteca d'Arte MiC
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Ministero della Cultura • 250 Opere Registrate
          </p>
        </div>
      </div>

      <p className="text-xs text-black leading-relaxed mb-6 font-sans">
        Il patrimonio pittorico, sinestetico e video-artistico del fondatore comprende oltre 250 opere d'arte registrate pubblicamente a tutela legale sotto il Ministero dei Beni Culturali italiano (ora MiC).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ARTWORKS_CATALOG.map((art) => (
          <div 
            key={art.id} 
            className="border border-[#0066CC] rounded-xl p-4.5 bg-white flex flex-col justify-between hover:border-[#0066CC] hover:-xs transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-2 gap-2">
                <span className="text-[11.5px] font-bold text-black uppercase leading-tight font-sans tracking-wide">
                  {art.title}
                </span>
                <span className="text-[9px] font-mono bg-[#EAE6DF] text-black px-1.5 py-0.5 rounded font-bold shrink-0">
                  {art.year}
                </span>
              </div>
              <p className="text-[11px] text-black leading-relaxed mb-3">
                {art.description}
              </p>
            </div>

            <div className="border-t border-[#0066CC]/60 pt-3 flex items-center justify-between text-[9px] font-mono text-black">
              <span className="flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-[#0066CC]" />
                <span>{art.venue}</span>
              </span>
              <span className="font-bold text-black">{art.category}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

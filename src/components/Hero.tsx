import React from 'react';
import { Landmark, Sparkles } from 'lucide-react';
import { FOUNDATION_METADATA } from '../data/archiveData.js';

export default function Hero() {
  return (
    <div className="bg-white relative border-b-4 border-[#0066CC] px-6 py-16 text-black text-center font-sans overflow-hidden">
      <div className="absolute inset-0  pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        <Landmark className="w-12 h-12 text-[#0066CC] mb-4 stroke-1 animate-pulse" />
        <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#0066CC] uppercase tracking-tight leading-snug">
          {FOUNDATION_METADATA.denomination_it}
        </h2>
        <p className="text-[10px] font-mono tracking-[0.2em] text-black uppercase mt-2">
          {FOUNDATION_METADATA.denomination_en}
        </p>
        <p className="text-xs text-black mt-4 leading-relaxed max-w-2xl font-medium">
          Dedicato alla rigorosa archiviazione, catalogazione ed esplorazione assistita del patrimonio d'Arte (Beni Culturali), Ingegneria (Brevetti UIBM) e Letteratura Scientifica (SBN Biblioteche) del Dott. Luca Falace.
        </p>
      </div>
    </div>
  );
}

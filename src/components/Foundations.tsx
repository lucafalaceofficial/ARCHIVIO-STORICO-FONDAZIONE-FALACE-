import React from 'react';
import { BookOpen, Sparkles, Award } from 'lucide-react';
import { BOOKS_CATALOG } from '../data/archiveData.js';

export default function Foundations() {
  const primaryVol = BOOKS_CATALOG.find(b => b.id === "book-vol-3") || BOOKS_CATALOG[0];

  return (
    <div className="bg-white border border-[#0066CC] rounded-2xl p-6 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-4 mb-4">
        <div className="p-2 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <BookOpen className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
            Le Fondamenta della Trilogia d'Oro
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Gold Trilogy Vol. III • Isocronismo Certificato
          </p>
        </div>
      </div>

      <div className="p-4 bg-white border border-[#0066CC] rounded-xl mb-4 text-xs font-serif italic text-black leading-relaxed">
        "{primaryVol.description}"
      </div>

      <div className="space-y-2 text-xs text-black leading-relaxed font-sans mb-4">
        <p>
          Il culminante <strong>Volume Terzo</strong> unifica lo sforzo scientifico-umanistico del fondatore. Spiega in formule rigorose come la coscienza (S) interagisce con le frequenze (f).
        </p>

        <div className="flex justify-between items-center bg-white border border-[#0066CC] p-3 rounded-lg text-[10px] font-mono">
          <span className="text-black uppercase">Editore</span>
          <span className="text-black font-black">{primaryVol.publisher}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono border-t border-[#0066CC] pt-3.5">
        <span className="text-[#0066CC] font-bold">DOI: {primaryVol.doi}</span>
        {primaryVol.link && (
          <a
            href={primaryVol.link}
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="no-referrer"
            className="text-black hover:text-[#0066CC] font-black underline flex items-center gap-1 cursor-pointer"
          >
            <span>Vedi Record Zenodo</span>
          </a>
        )}
      </div>
    </div>
  );
}

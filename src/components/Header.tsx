import React from 'react';
import { FOUNDATION_METADATA } from '../data/archiveData.js';
import { Award, BookOpen, Music, Layers, ShieldCheck, Landmark } from 'lucide-react';

export default function Header() {
  return (
    <>
      {/* Main Broad Institutional Header styled like cultura.gov.it */}
      <header className="relative bg-[#09152C] text-white overflow-hidden py-20 px-6 border-b-2 border-[#0066CC]" id="institution-header">
        
        {/* Decorative institutional watermark or state grid */}
        <div className="absolute inset-0  bg-[size:4rem_4rem] opacity-35 pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-white blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 relative z-10">
          
          <div className="lg:max-w-3xl">
            {/* Official Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#13284F] border border-[#0066CC] text-[#0066CC] text-[10px] font-mono tracking-widest mb-6 uppercase font-black">
              <Landmark className="w-3.5 h-3.5 text-[#0066CC]" />
              <span>DIREZIONE GENERALE RICERCA E INNOVAZIONE • CODICE ATECO {FOUNDATION_METADATA.ateco_code}</span>
            </div>

            {/* Main Serifed Scholarly Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-4 leading-tight text-white">
              FF <span className="text-[#0066CC]">{FOUNDATION_METADATA.denomination_it}</span>
            </h1>
            
            <p className="text-[11px] font-mono tracking-[0.2em] text-[#0066CC]/90 uppercase font-black mb-6">
              {FOUNDATION_METADATA.denomination_en}
            </p>

            {/* Institution Intent description */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-serif italic mb-8 border-l-2 border-[#0066CC] pl-4">
              "{FOUNDATION_METADATA.scope_it}. Un patrimonio di oltre 30 anni di ricerche d'eccellenza, tesi e brevetti scientifici depositati."
            </p>

            {/* Founders metadata Row */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-[11px] font-mono border-t border-[#13284F] pt-6 uppercase tracking-wider">
              <div>
                <span className="text-white/80">Fondatore Scientifico: </span>
                <strong className="text-white font-extrabold">{FOUNDATION_METADATA.founder}</strong>
              </div>
              <div>
                <span className="text-white/80">Archivio Digitale: </span>
                <a href={`mailto:${FOUNDATION_METADATA.email}`} className="text-white hover:text-[#0066CC] hover:underline font-extrabold transition-colors">
                  {FOUNDATION_METADATA.email}
                </a>
              </div>
            </div>
          </div>

          {/* Legal counter summary Box (Premium Slate layout) */}
          <div className="bg-[#0C1A35] border-2 border-[#0066CC] p-5 lg:max-w-xs w-full flex flex-col gap-3.5  relative">
            <div className="absolute top-3 right-3 text-[9px] font-mono text-[#0066CC] font-extrabold tracking-widest bg-[#13284F] px-1.5 py-0.5 border border-[#0066CC]">
              SBN IT / EN
            </div>
            
            <h3 className="text-[10px] font-mono text-slate-200 uppercase tracking-widest border-b border-[#13284F] pb-2 font-black">
              REGISTRI STATALI &amp; INDICI
            </h3>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border-2 border-[#0066CC] border border-[#0066CC] text-[#0066CC] shrink-0">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] text-[#0066CC] uppercase font-mono tracking-wider font-extrabold leading-none">MiC / MiBAC Depositati</p>
                <p className="text-[11px] font-serif font-bold text-slate-100 mt-1">250 Opere d'Arte &amp; Libri</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border-2 border-[#0066CC] border border-[#0066CC] text-[#0066CC] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] text-[#0066CC] uppercase font-mono tracking-wider font-extrabold leading-none">Brevetti UIBM</p>
                <p className="text-[11px] font-serif font-bold text-slate-100 mt-1">3 Brevetti Registrati UIBM</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border-2 border-[#0066CC] border border-[#0066CC] text-[#0066CC] shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] text-[#0066CC] uppercase font-mono tracking-wider font-extrabold leading-none">OPAC SBN-ISBN</p>
                <p className="text-[11px] font-serif font-bold text-slate-100 mt-1">49 Monografie Statali</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border-2 border-[#0066CC] border border-[#0066CC] text-[#0066CC] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] text-[#0066CC] uppercase font-mono tracking-wider font-extrabold leading-none">Zenodo-CERN (DOI)</p>
                <p className="text-[11px] font-serif font-bold text-slate-100 mt-1">3 Pubblicazioni Scienza</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border-2 border-[#0066CC] border border-[#0066CC] text-[#0066CC] shrink-0">
                <Music className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] text-[#0066CC] uppercase font-mono tracking-wider font-extrabold leading-none">Discoteca di Stato Dds</p>
                <p className="text-[11px] font-serif font-bold text-slate-100 mt-1">Deposito sonoro certificato</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-white border-2 border-[#0066CC] border border-[#0066CC] text-[#0066CC] shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[8.5px] text-[#0066CC] uppercase font-mono tracking-wider font-extrabold leading-none">Museo MAXXI</p>
                <p className="text-[11px] font-serif font-bold text-slate-100 mt-1">Catalogo Contemporaneo</p>
              </div>
            </div>
          </div>

        </div>

        {/* Legal backing highlights list - expanded to all 6 mandatory items */}
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#13284F] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 text-[11px] font-mono text-slate-300">
          <div className="flex items-start gap-2 bg-[#0C1A35]/65 p-3.5 border border-[#13284F] relative">
            <span className="text-[#0066CC] font-bold">▶</span>
            <p>
              <strong className="text-white block mb-0.5 text-[9px] uppercase tracking-wide">1. MiC / MiBAC:</strong>
              {FOUNDATION_METADATA.legal_backing.mic_mibac}
            </p>
          </div>
          <div className="flex items-start gap-2 bg-[#0C1A35]/65 p-3.5 border border-[#13284F] relative">
            <span className="text-[#0066CC] font-bold">▶</span>
            <p>
              <strong className="text-white block mb-0.5 text-[9px] uppercase tracking-wide">2. Brevetti UIBM:</strong>
              {FOUNDATION_METADATA.legal_backing.uibm}
            </p>
          </div>
          <div className="flex items-start gap-2 bg-[#0C1A35]/65 p-3.5 border border-[#13284F] relative">
            <span className="text-[#0066CC] font-bold">▶</span>
            <p>
              <strong className="text-white block mb-0.5 text-[9px] uppercase tracking-wide">3. OPAC SBN-ISBN:</strong>
              {FOUNDATION_METADATA.legal_backing.opac_sbn}
            </p>
          </div>
          <div className="flex items-start gap-2 bg-[#0C1A35]/65 p-3.5 border border-[#13284F] relative">
            <span className="text-[#0066CC] font-bold">▶</span>
            <p>
              <strong className="text-white block mb-0.5 text-[9px] uppercase tracking-wide">4. CERN Zenodo:</strong>
              {FOUNDATION_METADATA.legal_backing.zenodo_cern_doi}
            </p>
          </div>
          <div className="flex items-start gap-2 bg-[#0C1A35]/65 p-3.5 border border-[#13284F] relative">
            <span className="text-[#0066CC] font-bold">▶</span>
            <p>
              <strong className="text-white block mb-0.5 text-[9px] uppercase tracking-wide">5. Discoteca di Stato:</strong>
              {FOUNDATION_METADATA.legal_backing.dds_discoteca}
            </p>
          </div>
          <div className="flex items-start gap-2 bg-[#0C1A35]/65 p-3.5 border border-[#13284F] relative">
            <span className="text-[#0066CC] font-bold">▶</span>
            <p>
              <strong className="text-white block mb-0.5 text-[9px] uppercase tracking-wide">6. Museo MAXXI:</strong>
              {FOUNDATION_METADATA.legal_backing.museo_maxxi}
            </p>
          </div>
        </div>

      </header>
    </>
  );
}

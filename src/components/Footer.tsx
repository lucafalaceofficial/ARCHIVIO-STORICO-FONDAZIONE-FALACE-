import React from 'react';
import { Landmark, ShieldCheck, Globe, Eye } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1877F2] text-white border-t border-white/20 py-16 px-6 sm:px-12 font-sans selection:bg-white selection:text-[#1877F2]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Brand Header & General Info */}
        <div className="space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-white">
            FONDAZIONE <span className="text-[#d4af37]">FALACE</span>
          </h2>
          <h3 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#d4af37]">
            PROGETTO FONDAZIONE FALACE
          </h3>
          <p className="text-sm sm:text-base text-white/95 leading-relaxed font-sans max-w-3xl">
            Ente ufficiale preposto alla conservazione, archiviazione logica e valorizzazione del patrimonio intellettuale del Dott. Luca Falace. Attività di Ricerca e Sviluppo interdisciplinare.
          </p>
        </div>

        {/* Sub-badges/Tutelary statuses */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-8 text-xs font-mono text-white border-b border-white/20 pb-8">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span className="uppercase tracking-wider font-semibold text-white">US DIGITAL COPYRIGHT REGISTRY</span>
          </div>
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-[#d4af37]" />
            <span className="uppercase tracking-wider font-semibold text-white">UIBM REGISTRATION ACTIVE</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#d4af37]" />
            <span className="uppercase tracking-wider font-semibold text-white">ATECO CODE: 72.20.00 (R&D IN SOCIAL SCIENCES)</span>
          </div>
        </div>

        {/* Legal registries and departments */}
        <div className="space-y-8">
          <div className="border-b border-white/20 pb-3">
            <h4 className="text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-[#d4af37]">
              PROGETTO FONDAZIONE FALACE · REGISTRI LEGALI E ENTI DI TUTELA
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            
            {/* 1. MIC / MIBAC */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                MIC / MIBAC
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Ministero della Cultura - Tutela Diritto d'Autore dal 2005
              </p>
            </div>

            {/* 2. UIBM */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                UIBM
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Ufficio Italiano Brevetti e Marchi: Brevetti d'Invenzione Industriale dal 2005
              </p>
            </div>

            {/* 3. CERN ZENODO */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                CERN ZENODO
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Archivio Digitale DOI dell'Unione Europea con indici permanenti dal 2025-2026
              </p>
              <p className="text-[10px] font-mono text-white/80">
                DOI: 10.5281/zenodo.20414984
              </p>
            </div>

            {/* 4. OPAC SBN - ISBN */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                OPAC SBN - ISBN
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                ICCU Registro Bibliotecario Nazionale dal 2005
              </p>
            </div>

            {/* 5. DISCOTECA DI STATO */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                DISCOTECA DI STATO
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Dds Museo dell'audiovisivo - Deposito Legale Sonore audio e video dal 2007
              </p>
            </div>

            {/* 6. MUSEO MAXXI */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                MUSEO MAXXI
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Catalogazione Arte Contemporanea e tutela dell'anteriorità dal 2007
              </p>
            </div>

            {/* 7. US DIGITAL COPYRIGHT REGISTRY */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                US DIGITAL COPYRIGHT REGISTRY
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Certificazione internazionale di deposito e tutela d'anteriorità digitale
              </p>
            </div>

            {/* 8. CODICE ATECO: 72.20.00 */}
            <div className="border-l border-white/30 pl-4 py-0.5 space-y-1">
              <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37]">
                CODICE ATECO: 72.20.00
              </h5>
              <p className="text-[11px] sm:text-xs text-white/90 font-sans leading-relaxed">
                Ricerca e Sviluppo Sperimentale nel campo delle Scienze Sociali e Umanistiche
              </p>
            </div>

          </div>
        </div>

        {/* Footer bottom metadata & official attestation */}
        <div className="border-t border-white/20 pt-8 space-y-6 text-center">
          <div className="space-y-1 text-[10px] font-mono tracking-wider text-white uppercase">
            <p className="font-bold">
              © 2026 FONDAZIONE FALACE delle AIC. Tutti i diritti riservati.
            </p>
            <p className="font-semibold opacity-90">
              PROPRIETÀ INTELLETTUALE DI LUCA FALACE DAL 2005-2026
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <div className="flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#d4af37] border border-[#d4af37]/40 bg-white/5 px-4 py-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer">
              <Globe className="w-4 h-4 text-[#d4af37]" />
              <span>PORTALE D'ATTESTAZIONE UFFICIALE</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}


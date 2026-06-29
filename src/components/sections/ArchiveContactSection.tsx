import React from 'react';
import { Mail, MapPin, Globe, PhoneCall, Landmark, Sparkles } from 'lucide-react';
import { FOUNDATION_METADATA } from '../../data/archiveData.js';

export default function ArchiveContactSection() {
  return (
    <section className="bg-white border border-[#0066CC] rounded-2xl p-6 sm:p-8 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-5 mb-6">
        <div className="p-2.5 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Landmark className="w-5.5 h-5.5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-base text-black tracking-wide uppercase">
            Contatti e Sede Archivio
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Catalogazione Nazionale • OPAC SBN IT
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          <p className="text-xs text-black leading-relaxed font-sans">
            La <strong>Fondazione Falace</strong> opera in costante allineamento alle linee guida del Ministero della Cultura (MiC) ed inserisce le proprie catalogazioni monografiche nel network delle biblioteche italiane OPAC SBN.
          </p>

          <div className="space-y-3 font-sans text-xs text-black">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
              <div>
                <strong className="text-black font-bold block mb-0.5">Ente Bibliotecario SBN</strong>
                <span>Punto di sincronizzazione e deposito copie autorizzato a Napoli e Roma, Italia.</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#0066CC] shrink-0" />
              <a href={`mailto:${FOUNDATION_METADATA.email}`} className="text-black font-bold underline hover:text-[#0066CC] transition-colors">
                {FOUNDATION_METADATA.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#0066CC] shrink-0" />
              <a 
                href="https://payhip.com/LucArtStudio" 
                target="_blank" 
                rel="noopener noreferrer" 
                referrerPolicy="no-referrer"
                className="text-[#0A1A36] font-mono font-bold underline hover:text-[#0066CC] transition-colors truncate"
              >
                payhip.com/LucArtStudio
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Stamp Badge */}
        <div className="md:col-span-5 bg-white border border-[#0066CC] p-5 rounded-xl flex flex-col justify-between text-center max-w-xs mx-auto w-full">
          <div>
            <span className="text-[8px] font-mono tracking-widest text-[#0066CC] uppercase font-black block mb-1">
              Registro Nazionale
            </span>
            <span className="text-[12px] font-serif font-black text-black tracking-wider block uppercase mb-1.5">
              SBN IT\ICCU\FF
            </span>
            <p className="text-[9px] font-mono text-black leading-snug">
              Certificazione storiografica permanente registrata su indici sintonici CERN Zenodo.
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-black text-left">
            <span className="text-[8px] font-mono text-black block uppercase font-bold">Ateco Spec:</span>
            <span className="text-[9.5px] font-medium text-black block leading-tight">
              {FOUNDATION_METADATA.ateco_code} • {FOUNDATION_METADATA.ateco_desc_it}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

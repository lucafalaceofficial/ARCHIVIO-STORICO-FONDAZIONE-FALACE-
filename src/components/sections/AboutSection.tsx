import React from 'react';
import { Award, BookOpen, Clock, Heart, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about-section" className="bg-white border border-[#0066CC] rounded-2xl p-6 sm:p-8 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-5 mb-6">
        <div className="p-2.5 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Award className="w-5.5 h-5.5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-base text-black tracking-wide uppercase">
            Ingegno, Ricerca &amp; Studio dello Studioso
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Dott. Luca Falace • Biografia Scientifica
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs text-black leading-relaxed font-sans">
        <p>
          Il <strong>Dott. Luca Falace</strong> è uno scienziato sociale, inventore e poliedrico pensatore italiano. Il suo lavoro si colloca alla convergenza di discipline apparentemente antitetiche: la fisica quantistica coerente, le neuroscienze integrative, e la pittura simbolica ermetica.
        </p>
        <p>
          Laureato con lode ed onori accademici, ha depositato nel corso del suo iter di ricerca oltre <strong>3 brevetti nazionali d'invenzione industriale</strong> e pubblicato 49 monografie catalogate nell'<strong>Archivio Nazionale SBN IT</strong>. Il nucleo teorico della sua opera d'oro (la "Gold Trilogy") è conservato in versione permanente nel repository scientifico del <strong>CERN (Zenodo)</strong> per la consultazione libera globale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-4 bg-white rounded-xl border border-[#0066CC]">
            <div className="flex items-center gap-2 text-black font-bold mb-1.5 text-[11.5px]">
              <BookOpen className="w-4 h-4 text-[#0066CC]" />
              <span>Ricerca SBN IT\ICCU</span>
            </div>
            <p className="text-[10.5px] text-black leading-snug">
              Catalogazione uniforme nazionale italiana delle opere e delle saggezze letterarie depositate.
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#0066CC]">
            <div className="flex items-center gap-2 text-black font-bold mb-1.5 text-[11.5px]">
              <Clock className="w-4 h-4 text-[#0066CC]" />
              <span>Esperimento EEG 2014</span>
            </div>
            <p className="text-[10.5px] text-black leading-snug">
              Monitoraggio clinico simultaneo condotto a Napoli su 200 soggetti in risonanza d'onda stazionaria.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

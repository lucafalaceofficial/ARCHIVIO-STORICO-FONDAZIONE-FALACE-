import React from 'react';
import { Landmark, ShieldCheck, Award, Database, Check, Scale } from 'lucide-react';
import { FOUNDATION_METADATA } from '../../data/archiveData.js';

export default function FondazioneFalaceSection() {
  return (
    <section id="fondazione-falace-section" className="bg-white border-2 border-[#0066CC] rounded-none p-6 sm:p-10  relative overflow-hidden">
      
      {/* Subtle gold line pattern at first boundary */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0066CC] via-[#3399FF] to-[#9F802B]" />

      <div className="flex items-center gap-4 border-b-2 border-[#0066CC] pb-5 mb-6">
        <div className="p-3 bg-white border border-[#0066CC] rounded-none text-[#0066CC]">
          <Landmark className="w-6 h-6" />
        </div>
        <div>
          <span className="text-[10px] font-mono text-[#0066CC] uppercase tracking-widest block font-black">
            03 • STATUTO &amp; FONDAZIONI • SEZIONE B (NUOVO ENTE 2025–2026)
          </span>
          <h3 className="font-serif font-extrabold text-xl text-black tracking-wide uppercase leading-tight mt-1">
            Fondazione Falace dello Studio e della Ricerca
          </h3>
        </div>
      </div>

      <div className="space-y-4 text-xs text-black leading-relaxed font-sans mb-8">
        <p>
          La <strong>Fondazione Falace dello Studio e della Ricerca</strong> rappresenta la maturazione istituzionale concepita per tutelare ed estendere la ricerca scientifica, lo studio filosofico e lo sviluppo di nuove formule teoriche.
        </p>
        <p>
          L'adozione formale del prestigioso nome della <strong>famiglia Falace</strong> agisce in veste di inviolabile sigillo di autenticità e discendenza ereditaria a diretta tutela delle pubblicazioni scientifiche sul <strong>Campo Unificato (S = φ(f))</strong> e dei relativi risvolti tecnologici e brevettuali.
        </p>
      </div>

      {/* Sub-sections: Sana Missione & Governance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Sana Missione */}
        <div className="p-5 border-2 border-[#0066CC] bg-white hover:border-[#0066CC]/50 transition-all duration-300 flex gap-4 relative rounded-none">
          <div className="w-2 h-2 bg-[#0066CC] absolute top-5 left-5" />
          <div className="pl-4 text-xs">
            <h4 className="font-serif font-black text-[#011433] uppercase text-[12px] tracking-wide mb-2">
              Sana Missione
            </h4>
            <p className="text-black leading-relaxed text-[11px]">
              Custodia rigorosa, archiviazione logica cartacea e pubblicazione digitale diffusa di <strong>49 titoli editoriali</strong>, cataloghi completi di opere d'arte ed oltre <strong>41 brevetti d'ingegno</strong> di famiglia.
            </p>
          </div>
        </div>

        {/* Governance Indipendente */}
        <div className="p-5 border-2 border-[#0066CC] bg-white hover:border-[#0066CC]/50 transition-all duration-300 flex gap-4 relative rounded-none">
          <div className="w-2 h-2 bg-[#0066CC] absolute top-5 left-5" />
          <div className="pl-4 text-xs">
            <h4 className="font-serif font-black text-[#011433] uppercase text-[12px] tracking-wide mb-2 font-black">
              Governance Indipendente
            </h4>
            <p className="text-black leading-relaxed text-[11px]">
              Organizzazione e vigilanza affidata a comitati scientifici esterni *super partes* d'alta integrità a totale e assoluta salvaguardia della trasparenza operativa ed etica dell'ente.
            </p>
          </div>
        </div>

      </div>

      {/* Grid of Legal backing & validation */}
      <div className="border-t-2 border-[#0066CC] pt-6">
        <span className="text-[10px] font-mono text-[#0066CC] uppercase tracking-widest font-black block mb-5">
          I 6 DIPARTIMENTI ISTITUZIONALI DI TUTELA E VALIDAZIONE LEGALE
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="p-4 border border-[#0066CC] bg-white flex gap-3.5 rounded-none">
            <Database className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase text-[9px] tracking-wider block mb-1">1. Registro Ministeriale MiC / MiBAC</span>
              <span className="text-black leading-normal text-[11px] font-serif italic">
                {FOUNDATION_METADATA.legal_backing.mic_mibac}
              </span>
            </div>
          </div>

          <div className="p-4 border border-[#0066CC] bg-white flex gap-3.5 rounded-none">
            <Check className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase text-[9px] tracking-wider block mb-1">2. Brevetti UIBM Atto</span>
              <span className="text-black leading-normal text-[11px] font-serif italic">
                {FOUNDATION_METADATA.legal_backing.uibm}
              </span>
            </div>
          </div>

          <div className="p-4 border border-[#0066CC] bg-white flex gap-3.5 rounded-none">
            <ShieldCheck className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase text-[9px] tracking-wider block mb-1">3. Registro Bibliografico OPAC SBN-ISBN</span>
              <span className="text-black leading-normal text-[11px] font-serif italic">
                {FOUNDATION_METADATA.legal_backing.opac_sbn}
              </span>
            </div>
          </div>

          <div className="p-4 border border-[#0066CC] bg-white flex gap-3.5 rounded-none">
            <Database className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase text-[9px] tracking-wider block mb-1">4. Indici DOI CERN Zenodo</span>
              <span className="text-black leading-normal text-[11px] font-serif italic">
                {FOUNDATION_METADATA.legal_backing.zenodo_cern_doi}
              </span>
            </div>
          </div>

          <div className="p-4 border border-[#0066CC] bg-white flex gap-3.5 rounded-none">
            <Scale className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase text-[9px] tracking-wider block mb-1">5. Discoteca di Stato Dds</span>
              <span className="text-black leading-normal text-[11px] font-serif italic">
                {FOUNDATION_METADATA.legal_backing.dds_discoteca}
              </span>
            </div>
          </div>

          <div className="p-4 border border-[#0066CC] bg-white flex gap-3.5 rounded-none">
            <Award className="w-5 h-5 text-[#0066CC] shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-black uppercase text-[9px] tracking-wider block mb-1">6. Museo MAXXI Catalogo</span>
              <span className="text-black leading-normal text-[11px] font-serif italic">
                {FOUNDATION_METADATA.legal_backing.museo_maxxi}
              </span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

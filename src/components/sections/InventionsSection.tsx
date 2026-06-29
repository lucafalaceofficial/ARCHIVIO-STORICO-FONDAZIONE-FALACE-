import React from 'react';
import { INVENTIONS_CATALOG } from '../../data/archiveData.js';
import { Cpu, Award, ShieldCheck } from 'lucide-react';

export default function InventionsSection() {
  return (
    <section id="inventions-section" className="bg-white border-2 border-[#0066CC] rounded-none p-6 sm:p-10 ">
      <div className="flex items-center gap-4 border-b-2 border-[#0066CC] pb-5 mb-6">
        <div className="p-3 bg-white border border-[#0066CC] rounded-none text-[#0066CC]">
          <Cpu className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-serif font-extrabold text-base text-black tracking-wide uppercase">
            Brevetti Invenzione UIBM
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-widest font-black">
            Ufficio Italiano Brevetti e Marchi • GeniusOm &amp; AIC-SYNC
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {INVENTIONS_CATALOG.map((invention) => (
          <div 
            key={invention.id} 
            className="border-2 border-[#0066CC] rounded-none p-5 bg-white hover:border-[#0066CC]/60 transition-all duration-300 "
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-3">
              <span className="text-[13px] font-bold text-black flex items-center gap-1.5 uppercase tracking-wide">
                <Cpu className="w-4 h-4 text-[#0066CC]" />
                {invention.title}
              </span>
              
              {invention.patentNum && (
                <span className="text-[9.5px] font-mono font-black bg-[#EAE6DF] text-black px-2.5 py-1 rounded-none border border-[#0066CC]">
                  {invention.patentNum}
                </span>
              )}
            </div>

            <p className="text-xs text-black leading-relaxed mb-4">
              {invention.description}
            </p>

            <div className="p-4 bg-white border border-[#0066CC]/85 rounded-none text-[11px] text-black leading-relaxed italic mb-4">
              <strong className="text-black not-italic block uppercase tracking-wider text-[9px] font-mono mb-1 font-black">Specifiche Tecniche:</strong> {invention.details}
            </div>

            <div className="flex items-center gap-2 text-[9.5px] font-mono font-black uppercase text-[#0066CC] border-t border-[#0066CC]/60 pt-3">
              <ShieldCheck className="w-4 h-4 text-[#0066CC]" />
              <span>Stato Ministeriale: {invention.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import { Award, FileCheck, Landmark, ShieldCheck } from 'lucide-react';
import { FOUNDATION_METADATA } from '../data/archiveData.js';

export default function MediaArchive() {
  const certifications = [
    {
      label: "Registro MiC SBN",
      value: "41 Manoscritti & 250 Opere registrate",
      entity: "Ministero della Cultura"
    },
    {
      label: "Brevetti UIBM",
      value: "3 Invenzioni Industriali attive",
      entity: "Ministero Made in Italy"
    },
    {
      label: "Indici DOI Zenodo",
      value: "Certificazione permanente CERN",
      entity: "CERN Scientific Repository"
    }
  ];

  return (
    <div className="bg-white border border-[#0066CC] rounded-2xl p-6 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-4 mb-4">
        <div className="p-2 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
            Certificati &amp; Archivi Legali
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Tutele Ministeriali • Copertura D'Ingegno
          </p>
        </div>
      </div>

      <div className="space-y-3.5 mb-4">
        {certifications.map((cert, index) => (
          <div key={index} className="flex gap-3.5 bg-white border border-[#0066CC] p-3 rounded-xl items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-black block mb-0.5">{cert.label}</span>
                <span className="text-slate-505 block text-[10.5px] font-medium leading-none">{cert.value}</span>
              </div>
            </div>
            <span className="text-[8.5px] font-mono text-black border border-[#0066CC] bg-white rounded px-1.5 py-0.5 shrink-0 select-all">
              {cert.entity}
            </span>
          </div>
        ))}
      </div>

      <div className="text-[10px] font-mono text-black border-t border-[#0066CC] pt-3 text-center">
        <span>Codice Ateco Sviluppo Umanità: {FOUNDATION_METADATA.ateco_code}</span>
      </div>
    </div>
  );
}

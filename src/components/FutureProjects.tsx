import React from 'react';
import { Calendar, Layers, MapPin, Award } from 'lucide-react';

export default function FutureProjects() {
  const steps = [
    {
      title: "Trial Clinico Isocronico Svezia",
      date: "Q3 2026",
      desc: "Studio EEG controllato in risonanza magnetica funzionale per verificare gli stimoli acustici indotti."
    },
    {
      title: "Deposito DOI Supplementare CERN",
      date: "Q4 2026",
      desc: "Upload di codici d'integrazione magnetica e codici di famiglia FDL integrati per sintonizzatori."
    }
  ];

  return (
    <div className="bg-white border border-[#0066CC] rounded-2xl p-6 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-4 mb-4">
        <div className="p-2 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Calendar className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
            Ricerca Futura &amp; Prossimi Sviluppi
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Sviluppi Clinici • Allineamento Risonanze
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex gap-4">
            <div className="w-1.5 h-1.5 bg-[#0066CC] rounded-full shrink-0 mt-2" />
            <div className="text-xs">
              <span className="font-mono text-[9px] text-[#0066CC] font-bold uppercase block mb-1">
                {step.date} • {step.title}
              </span>
              <p className="text-black leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

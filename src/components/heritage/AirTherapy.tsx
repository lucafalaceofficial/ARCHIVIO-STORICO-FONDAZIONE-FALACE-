import React from 'react';
import { Wind, ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';

interface AirTherapyProps {
  language?: string;
}

export default function AirTherapy({ language = 'it' }: AirTherapyProps) {
  const isIt = language === 'it';

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-[#1877F2] border border-blue-100">
            <Wind className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1877F2]">
              {isIt ? 'Brevetto d’Invenzione Industriale UIBM' : 'UIBM Industrial Invention Patent'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
              {isIt ? 'Dispositivo Aeromassaggiatore (AirTherapy)' : 'AirTherapy Pneumatic Massage Device'}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            NA2004A000063 · WO2006051414A1
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="md:col-span-2 space-y-4">
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            {isIt
              ? "Ideato dal Dott. Luca Falace nel 1998 e ingegnerizzato con la preziosa competenza tecnica elettronica di suo padre Lucio Falace, questo pionieristico dispositivo pneumatico a campana eroga micro-impulsi d'aria compressa calibrati per trattare i tessuti cutanei e stimolare l'epidermide in corrispondenza dei centri vitali magnetici."
              : "Conceived by Dr. Luca Falace in 1998 and engineered with the invaluable electronic expertise of his father Lucio Falace, this pioneering pneumatic bell device delivers calibrated micro-pulses of compressed air to treat cutaneous tissues and stimulate the epidermis."}
          </p>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#1877F2]" />
              {isIt ? "Dettagli Ufficiali di Deposito e Titolarità" : "Official Deposit Details & Ownership"}
            </h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px]">{isIt ? "Paternità Intellettuale:" : "Intellectual Creator:"}</span>
                <span>Dott. Luca Falace (Certificata dal 1998 e nel volume 'L'Opera Celeste', 2005)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px]">{isIt ? "Ingegnerizzazione:" : "Technical Engineering:"}</span>
                <span>Lucio Falace (Padre, Perito Elettronico e Tecnologo d'Ingegno)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px]">{isIt ? "Deposito UIBM:" : "UIBM Filing:"}</span>
                <span className="font-mono">Verbale ufficiale NA2004A000063 del 11/11/2004</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px]">{isIt ? "Sviluppo Commerciale:" : "Commercial Production:"}</span>
                <span>Promoitalia S.p.a. con il marchio Prokaire</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-[#1877F2]">
              <Award className="w-5 h-5" />
              <span className="font-bold text-sm uppercase">{isIt ? "Primato Scientifico" : "Scientific Primacy"}</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              {isIt
                ? "L'Aeromassaggiatore costituisce il primo modello applicativo al mondo di Terapia dell'Aria a variazione dinamica di frequenza, temperatura e umidità, anticipando le moderne tecnologie di veicolazione transdermica non invasiva."
                : "The AirTherapy device represents the world's first application model of dynamic air therapy varying in frequency, temperature, and humidity."}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-2.5 text-slate-800">
              <FileText className="w-5 h-5" />
              <span className="font-bold text-sm uppercase">{isIt ? "Archivio Storico" : "Historical Archive"}</span>
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              {isIt
                ? "I disegni tecnici originali, i diagrammi pneumatici e i verbali di collaudo sono interamente conservati nell'Archivio Scientifico Centrale della Fondazione Falace."
                : "Original technical drawings, pneumatic diagrams, and testing records are preserved in the Falace Foundation Central Scientific Archive."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

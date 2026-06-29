import React from 'react';
import { Theater, Award, Film, BookOpen, Star, CheckCircle2 } from 'lucide-react';

interface PaoloArchiveProps {
  language?: string;
}

export default function PaoloArchive({ language = 'it' }: PaoloArchiveProps) {
  const isIt = language === 'it';

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="border-b border-slate-200 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-[#1877F2] border border-blue-100">
            <Theater className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1877F2]">
              {isIt ? 'Archivio Storico Teatrale & Cinematografico' : 'Historic Theater & Cinema Archive'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
              {isIt ? 'Paolo Falace — Attore RAI & INDA Siracusa' : 'Paolo Falace — RAI & Classical Theater Actor'}
            </h3>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 font-mono text-xs font-bold text-slate-800 border border-slate-200">
          Tutela Nuovo IMAIE / SIAE
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {isIt
            ? "Paolo Falace, indimenticato maestro d'arte drammatica e zio del Fondatore Dott. Luca Falace, ha tracciato per oltre trent'anni una parabola artistica di altissimo profilo nel teatro classico tragico e nella prosa televisiva nazionale. Le sue interpretazioni, documentate presso gli archivi storici della RAI e dell'Istituto Nazionale del Dramma Antico (INDA) di Siracusa, rappresentano un patrimonio morale di sensibilità estetica custodito con orgoglio dalla Fondazione."
            : "Paolo Falace, unforgettable master of dramatic art and uncle of Founder Dr. Luca Falace, traced a high-profile artistic career for over thirty years in classical tragedy and national television drama."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 text-[#1877F2]">
            <Star className="w-5 h-5 fill-current" />
            <h4 className="font-serif text-lg font-bold text-slate-900">
              {isIt ? "Teatro Classico & Dramma Antico" : "Classical Theater & Tragedy"}
            </h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isIt
              ? "Protagonista nei maggiori teatri stabili italiani e nelle stagioni tragiche dell'INDA al Teatro Greco di Siracusa. La sua dizione scolpita e la profonda presenza scenica hanno reso viva la parola di Eschilo, Sofocle ed Euripide per intere generazioni di spettatori."
              : "Protagonist in major Italian classical theaters and INDA tragic seasons at the Greek Theater of Syracuse."}
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-slate-500 pt-2">
            <li className="flex items-center gap-2">✓ INDA Siracusa — Repertorio Classico</li>
            <li className="flex items-center gap-2">✓ Teatri Stabili di Prosa Nazionali</li>
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 text-[#1877F2]">
            <Film className="w-5 h-5" />
            <h4 className="font-serif text-lg font-bold text-slate-900">
              {isIt ? "Prosa Televisiva RAI & Cinema" : "RAI Television Drama & Cinema"}
            </h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isIt
              ? "Attore di solida formazione accademica, prese parte a storici sceneggiati e produzioni culturali radiotelevisive della RAI negli anni d'oro del servizio pubblico, distinguendosi per rigore espressivo e versatilità drammatica."
              : "Actor of solid academic training, he took part in historic RAI television dramas and cultural productions."}
          </p>
          <ul className="space-y-1.5 text-xs font-mono text-slate-500 pt-2">
            <li className="flex items-center gap-2">✓ Archivi Storici RAI Radiotelevisivi</li>
            <li className="flex items-center gap-2">✓ Diritti d'Attore tutelati via Nuovo IMAIE</li>
          </ul>
        </div>
      </div>

      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between text-xs font-mono text-blue-900">
        <span className="flex items-center gap-2 font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#1877F2]" />
          {isIt ? "Archivio Documentale di Famiglia — Memoria Tutelata" : "Family Document Archive — Protected Heritage"}
        </span>
      </div>
    </div>
  );
}

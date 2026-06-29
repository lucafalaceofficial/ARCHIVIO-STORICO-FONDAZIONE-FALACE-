import React from 'react';
import { History, Award, BookOpen, Heart, Shield } from 'lucide-react';

interface DynastyHistoryProps {
  language?: string;
}

export default function DynastyHistory({ language = 'it' }: DynastyHistoryProps) {
  const isIt = language === 'it';

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-50 text-[#1877F2] border border-blue-100">
            <History className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#1877F2]">
              {isIt ? 'Radici Storiografiche & Memoria Familiare' : 'Historiographical Roots & Family Heritage'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-0.5">
              {isIt ? 'Tradizione Inventiva — Lucio Falace & Paolo Falace' : 'Inventive Heritage — Lucio & Paolo Falace'}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {isIt
            ? "La Fondazione Falace delle Attività Intellettive Creative nasce per esclusiva iniziativa, volontà statutarie e titolarità intellettuale del suo unico Fondatore e Presidente vivente, il Dott. Luca Falace. L'istituzione è stata eretta anche in solenne omaggio e perpetuo ricordo del padre Lucio Falace (pioniere dell'elettronica e inventore di calibro mondiale) e dello zio Paolo Falace (maestro d'arte drammatica e attore di teatro classico), figure scomparse che rappresentano i pilastri morali e creativi della tradizione familiare."
            : "The Falace Foundation was established by the sole living Founder and President, Dr. Luca Falace. This institution also stands as a solemn tribute to his late father Lucio Falace and late uncle Paolo Falace."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-lg bg-blue-50 text-[#1877F2]">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Lucio Falace (1940 – †)
            </h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isIt
              ? "Perito elettronico, tecnologo e imprenditore di respiro internazionale, fondatore della United Light Electronics Ltd. Titolare di ben 46 brevetti internazionali censiti dal WIPO Patentscope nel settore dell'elettronica di potenza e dell'illuminotecnica applicata (tra cui le prime lampade a risparmio energetico ad altissima efficienza). Insignito del prestigioso Premio Galileo Ferraris."
              : "International electronic technologist and entrepreneur, holder of 46 WIPO international patents in power electronics and applied lighting technology. Awarded the prestigious Galileo Ferraris Prize."}
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold">
              <Shield className="w-3.5 h-3.5 text-[#1877F2]" />
              46 Brevetti Internazionali WIPO
            </span>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-slate-200 bg-white space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2 rounded-lg bg-blue-50 text-[#1877F2]">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg font-bold text-slate-900">
              Paolo Falace (Attore RAI / INDA)
            </h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {isIt
              ? "Rinomato attore di teatro classico, prosa televisiva e cinema d'autore. La sua eccezionale traiettoria artistica, svoltasi per oltre trent'anni e rintracciabile nei registri storici della RAI e dell'Istituto Nazionale del Dramma Antico (INDA) di Siracusa, rappresenta l'apice dell'espressione umanistica della famiglia e un faro estetico per la Fondazione."
              : "Renowned classical theater and RAI television actor whose 30-year artistic trajectory represents the pinnacle of the family's humanistic expression."}
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-mono text-xs font-bold">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Tutela Memoria Storica SIAE / IMAIE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

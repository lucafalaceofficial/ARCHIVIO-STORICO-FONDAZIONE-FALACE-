import React from 'react';
import { Landmark, ShieldCheck, Scale, BookOpenCheck, Award } from 'lucide-react';

interface NuovaFondazioneManifestoProps {
  language?: string;
}

export default function NuovaFondazioneManifesto({ language = 'it' }: NuovaFondazioneManifestoProps) {
  return (
    <div id="manifesto-nuova-fondazione" className="w-full bg-[#FAFAF8] border-2 border-[#0a2342] rounded-3xl p-6 sm:p-10 md:p-12 my-8 shadow-xl relative overflow-hidden text-[#0a2342]">
      {/* Sfondo decorativo istituzionale */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#b8963e]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[#0a2342]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Intestazione Principale */}
      <div className="border-b-2 border-[#b8963e]/60 pb-8 mb-10 text-center relative z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a2342] text-[#FAFAF8] font-mono text-xs sm:text-sm font-bold tracking-widest uppercase mb-4 shadow-md">
          <Landmark className="w-4 h-4 text-[#b8963e]" />
          <span>Statuto Sovrano & Identità</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0a2342] mb-4">
          IDENTITÀ E CARATTERE DELLA NUOVA E FUTURA FONDAZIONE FALACE
        </h1>
        <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-[#b8963e] tracking-wide max-w-4xl mx-auto">
          Manifesto Dottrinale e Linee Guida di Integrità Istituzionale
        </h2>
      </div>

      {/* Griglia dei 4 Pilastri Istituzionali */}
      <div className="space-y-10 relative z-10 max-w-5xl mx-auto font-sans leading-relaxed text-base sm:text-lg text-[#0a2342]/90">
        
        {/* Sezione 1 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0a2342]/15 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-[#0a2342] text-[#b8963e] rounded-xl shrink-0 mt-1 shadow-xs">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0a2342]">
                1. IL POSIZIONAMENTO ISTITUZIONALE DELLA FONDAZIONE CLASSICA
              </h3>
            </div>
          </div>
          <p className="pl-0 sm:pl-16 text-justify">
            La Nuova e futura FONDAZIONE FALACE (Fondazione delle Attività Intellettive Creative), ideata e strutturata dal Dott. Luca Falace, nasce e si sviluppa sul modello puro e ortodosso della fondazione classica di stampo conservativo, in virtù della specializzazione accademica del suo fondatore in Conservazione dei Beni Culturali.
          </p>
          <p className="pl-0 sm:pl-16 text-justify mt-4">
            La fondazione classica è, per definizione dottrinale e giuridica originaria, un ente istituzionale sovrano, il cui patrimonio è stabilmente ed esclusivamente vincolato a uno scopo ideale di altissimo rilievo sociale, scientifico e culturale. Essa si colloca strutturalmente al di fuori del sistema economico concorrenziale e delle logiche di mercato capitalistiche. Questa extraterritorialità economica è la condizione essenziale per preservare l&apos;indipendenza dell&apos;ente, sottrarlo alle trafile oppressive della tassazione ordinaria e garantirne la sopravvivenza nel lungo termine come custode disinteressato del sapere, delle arti e delle scienze applicate.
          </p>
        </section>

        {/* Sezione 2 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0a2342]/15 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-[#0a2342] text-[#b8963e] rounded-xl shrink-0 mt-1 shadow-xs">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0a2342]">
                2. L&apos;INDIPENDENZA STRUTTURALE: IL RIFIUTO DELLE LOGICHE &quot;ETS&quot;
              </h3>
            </div>
          </div>
          <p className="pl-0 sm:pl-16 text-justify">
            La Nuova e futura FONDAZIONE FALACE riafferma con fermezza la propria estraneità all&apos;acronimo <strong className="text-[#0a2342] font-extrabold">ETS (Ente del Terzo Settore)</strong> e al sistema <strong className="text-[#0a2342] font-extrabold">RUNTS (Registro Unico Nazionale del Terzo Settore)</strong>.
          </p>
          <p className="pl-0 sm:pl-16 text-justify mt-4">
            La sussunzione della figura giuridica della fondazione classica all&apos;interno del calderone normativo degli ETS viene identificata come una forma di depotenziamento strutturale e di svilimento identitario dell&apos;ente puro. L&apos;illusione di un accesso facilitato a canali di finanziamento agevolati si rivela, nell&apos;analisi macroeconomica e strategica della nostra istituzione, un&apos;esca finanziaria che cela prestiti ad alto tasso di interesse. Questo meccanismo innesca un ciclo economico-finanziario coercitivo, del tutto assimilabile a quello delle società commerciali, snaturando la vocazione filantropica originaria.
          </p>
          <div className="pl-0 sm:pl-16 mt-4 p-4 rounded-xl bg-[#FAF9F5] border-l-4 border-[#b8963e] text-sm sm:text-base italic">
            Per utilizzare una chiara analogia strutturale, l&apos;inquadramento come ETS equivale a prendere il telaio e la carrozzeria di una Ferrari per privarla del suo motore originario e sostituirlo con il motore di una Fiat 500: l&apos;aspetto esteriore conserva un&apos;apparenza di prestigio, ma l&apos;efficienza interna e la potenza strutturale risultano irrimediabilmente compromesse. L&apos;ibridazione tra logica societaria fiscale e finalità ideale produce un compromesso istituzionale che la Nuova e futura FONDAZIONE FALACE rifiuta integralmente, tutelando la propria natura di fondazione vera, pura e classica.
          </div>
        </section>

        {/* Sezione 3 */}
        <section className="bg-white p-6 sm:p-8 rounded-2xl border border-[#0a2342]/15 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-[#0a2342] text-[#b8963e] rounded-xl shrink-0 mt-1 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0a2342]">
                3. RESISTENZA CULTURALE VS RESILIENZA: UNA SCELTA SEMANTICA ED ETICA
              </h3>
            </div>
          </div>
          <p className="pl-0 sm:pl-16 text-justify">
            Nel corpus documentale, nelle ricerche, nei volumi depositati e in ogni espressione pubblica della Nuova e futura FONDAZIONE FALACE e delle attività del Dott. Luca Falace, viene rigorosamente escluso l&apos;uso del termine <strong className="text-red-900 font-extrabold">&quot;resilienza&quot;</strong>.
          </p>
          <p className="pl-0 sm:pl-16 text-justify mt-4">
            Tale vocabolo, abusato nelle retoriche sistemiche contemporanee, viene respinto per profonde ragioni linguistiche ed etiche: la resilienza implica l&apos;accettazione passiva, la sopportazione del carico e della fatica, l&apos;adeguamento forzato a condizioni esterne penalizzanti nell&apos;obbligo del silenzio e della sottomissione.
          </p>
          <p className="pl-0 sm:pl-16 text-justify mt-4 font-semibold text-[#0a2342]">
            La Nuova e futura FONDAZIONE FALACE oppone storicamente, culturalmente e filosoficamente al concetto di resilienza il principio sovrano di <strong className="text-[#b8963e] font-black uppercase tracking-wider bg-[#0a2342] text-white px-2.5 py-0.5 rounded ml-1">Resistenza Culturale</strong>. La conservazione e la tutela dei beni culturali, delle scienze e del pensiero creativo non si realizzano piegandosi alle riforme declassanti, ma resistendo attivamente a difesa delle forme classiche e dei valori tradizionali dell&apos;ingegno umano.
          </p>
        </section>

        {/* Sezione 4 */}
        <section className="bg-white text-slate-900 p-6 sm:p-10 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Award className="w-48 h-48 text-[#1877F2]" />
          </div>
          <div className="flex items-start gap-4 mb-6 relative z-10">
            <div className="p-3 bg-[#1877F2] text-white rounded-xl shrink-0 mt-1 shadow-sm">
              <BookOpenCheck className="w-6 h-6 font-black" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                4. PRINCIPI DI INTEGRITÀ E TUTELA DELLA PERSONALITÀ DELL&apos;ENTE
              </h3>
            </div>
          </div>
          <p className="pl-0 sm:pl-16 text-justify text-slate-800 mb-6 relative z-10">
            L&apos;identità della Nuova e futura FONDAZIONE FALACE è indissolubilmente legata alla salvaguardia della propria unicità intellettuale ed etica. A tal fine, l&apos;ente si dota di precise linee guida a tutela della propria personalità:
          </p>

          <ul className="pl-0 sm:pl-16 space-y-4 relative z-10">
            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[#1877F2] font-black text-lg mt-0.5">▪</span>
              <div>
                <strong className="text-[#1877F2] font-bold block mb-1">Integrità Terminologica:</strong>
                <span className="text-slate-800 text-sm sm:text-base">La Fondazione protegge la propria comunicazione da parole d&apos;ordine burocratiche o standardizzate, imponendo il rispetto rigoroso dei concetti di indipendenza ed extraterritorialità economica.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[#1877F2] font-black text-lg mt-0.5">▪</span>
              <div>
                <strong className="text-[#1877F2] font-bold block mb-1">Fedeltà scientifico-umanistica:</strong>
                <span className="text-slate-800 text-sm sm:text-base">Ogni pubblicazione, divulgazione e progetto promosso dall&apos;ente si conforma rigorosamente alle definizioni storiche, teoriche e statutarie definite dal fondatore, con particolare riferimento alla Teoria del Sincronismo Creativo, al social business autonomo e alla pura valorizzazione del patrimonio intellettuale.</span>
              </div>
            </li>

            <li className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <span className="text-[#1877F2] font-black text-lg mt-0.5">▪</span>
              <div>
                <strong className="text-[#1877F2] font-bold block mb-1">Inviolabilità del Pensiero:</strong>
                <span className="text-slate-800 text-sm sm:text-base">L&apos;istituzione opera affinché la volontà intellettuale, la proprietà letteraria e il patrimonio scientifico del fondatore Dott. Luca Falace rimangano integri, inalterati e protetti da qualsiasi forma di manipolazione, appiattimento culturale o assimilazione sistemica.</span>
              </div>
            </li>
          </ul>
        </section>

      </div>

      {/* Piè di pagina del Manifesto */}
      <div className="mt-12 pt-6 border-t border-[#0a2342]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#0a2342]/70 uppercase tracking-wider relative z-10">
        <span>Fondazione Falace delle AIC • Protocollo d&apos;Integrità</span>
        <span className="text-[#b8963e] font-bold">Immutabile &amp; Extraterritoriale</span>
      </div>
    </div>
  );
}

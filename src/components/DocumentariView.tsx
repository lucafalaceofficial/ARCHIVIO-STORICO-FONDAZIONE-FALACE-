import React from 'react';
import { Tv, Play, ExternalLink, Award, Sparkles, Tv2, Calendar, FileText, Landmark } from 'lucide-react';

export default function DocumentariView() {
  return (
    <div id="documentaries" className="bg-white border border-[#0066CC] rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
      
      {/* 1. Header Section with Golden and Blue Theme */}
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-5">
        <div className="p-2.5 bg-[#0066CC]/5 border border-[#0066CC] rounded-2xl text-[#0066CC]">
          <Tv className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-serif font-black text-lg sm:text-xl text-slate-900 tracking-wider uppercase">
            Teche TV Nazionali &amp; Grandi Riconoscimenti d'Impresa
          </h3>
          <p className="text-[10px] sm:text-xs font-mono text-[#0066CC] uppercase tracking-wider font-extrabold flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5">
            <span className="bg-[#0066CC]/10 px-1.5 py-0.5 rounded">RAI DUE</span>
            <span>•</span>
            <span className="bg-[#0066CC]/10 px-1.5 py-0.5 rounded">MEDIASET ITALIA 1</span>
            <span>•</span>
            <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">TARGA DEL PRESIDENTE DELLA REPUBBLICA</span>
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
        Raccolta della documentazione storica e storiografica dei passaggi televisivi nazionali, delle interviste istituzionali e dei massimi premi scientifici e d'impresa conferiti al <strong>Dott. Luca Falace</strong> per le sue invenzioni d'avanguardia nella Green Economy.
      </p>

      {/* 2. THE THREE MAIN SHOWCASE CARDS (Ecomondo, Shark Tank, Rai 2) */}
      <div className="space-y-6">
        
        {/* ========================================================
            CROWN JEWEL: PREMIO SVILUPPO SOSTENIBILE ECOMONDO 2014
            ======================================================== */}
        <div className="bg-amber-50/30 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs transition-all hover:shadow-md">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/25 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap justify-between items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-600 text-white text-[10px] sm:text-xs font-mono font-black uppercase rounded-lg tracking-wider">
                <Award className="w-4 h-4 shrink-0" />
                MASSIMO RICONOSCIMENTO GREEN ECONOMY
              </span>
              <span className="flex items-center gap-1 text-xs font-mono text-amber-800 font-extrabold bg-amber-100/80 border border-amber-200 px-2.5 py-1 rounded-md">
                <Calendar className="w-4 h-4 text-amber-600" />
                RIMINI, 2014
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] sm:text-xs font-mono text-amber-800 font-bold block uppercase tracking-widest">
                PREMIO SVILUPPO SOSTENIBILE • EXPO INTERNAZIONALE ECOMONDO
              </span>
              <h4 className="font-serif font-black text-lg sm:text-2xl text-slate-900 leading-snug">
                Premio Ecomondo 2014 — Migliore Invenzione e Brevetto Industriale
              </h4>
            </div>

            {/* Verbatim Content Box with Prestige Layout */}
            <div className="bg-white border border-amber-200 p-5 sm:p-6 rounded-2xl text-xs sm:text-sm text-slate-800 leading-relaxed space-y-4 shadow-2xs">
              <p className="font-medium">
                Vincitore assoluto a Rimini del prestigioso <strong>Premio Sviluppo Sostenibile</strong> per la categoria <em>"Migliore Start-Up per efficacia dei risultati ambientali, contenuto innovativo, risultati economici e possibile diffusione"</em>. Il riconoscimento è stato assegnato al compattatore volumetrico ecologico <strong>GeniusOm</strong> (Brevetto ITNA20130029A1), di cui il Dott. Luca Falace è inventore unico e titolare.
              </p>
              
              <div className="p-4 bg-amber-50/50 border-l-4 border-amber-500 text-amber-950 text-xs sm:text-sm font-semibold rounded-r-xl space-y-1">
                <div className="flex items-center gap-1.5">
                  <Landmark className="w-4.5 h-4.5 text-amber-700 shrink-0" />
                  <span className="uppercase tracking-wider text-[10px] sm:text-xs font-extrabold text-amber-800">Adesione del Presidente della Repubblica Italiana</span>
                </div>
                <p className="font-sans leading-relaxed">
                  L'iniziativa d'impresa e l'invenzione sono state onorate con l'adesione speciale del Presidente della Repubblica Italiana Giorgio Napolitano, con la concessione formale e consegna della prestigiosa <strong>Targa Presidenziale di Rappresentanza</strong> conferita a Luca Falace.
                </p>
              </div>
            </div>

            {/* Link/Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-2">
              <span className="text-[10px] sm:text-xs font-mono text-amber-800 font-bold">
                Fonte Ufficiale: premiosvilupposostenibile.org / 6ª Edizione
              </span>
              <a
                href="https://photos.app.goo.gl/LxV1wkhKHcQp2qCU9"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-600 hover:bg-slate-900 text-white px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Guarda Documentazione / Servizio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* ========================================================
            GRID OF TWO CARDS: SHARK TANK & RAI 2
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* CARD A: MEDIASET ITALIA 1 — SHARK TANK */}
          <div className="bg-blue-50/30 border-2 border-blue-400 rounded-3xl p-6 relative overflow-hidden shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/20 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-600 text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase rounded-md tracking-wider">
                  <Tv2 className="w-3.5 h-3.5" />
                  MEDIASET ITALIA 1
                </span>
                <span className="text-[11px] font-mono text-blue-800 font-extrabold bg-blue-100 px-2 py-0.5 rounded">
                  2015
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-blue-700 font-bold uppercase block tracking-wider">
                  PRIMA SERATA • SHOWCASE AZIENDALE
                </span>
                <h4 className="font-serif font-black text-base sm:text-lg text-slate-900 uppercase tracking-tight">
                  Vittoria e Offerta di €250.000 a Shark Tank
                </h4>
              </div>

              <div className="bg-white border border-blue-200 p-4 rounded-xl text-xs text-slate-800 leading-relaxed space-y-3">
                <p className="font-medium">
                  Protagonista indiscusso della trasmissione televisiva nazionale <strong>Shark Tank Italia</strong>. Ha presentato l'invenzione GeniusOm illustrando i dettagli termodinamici e la redditività ecologica del compattatore.
                </p>
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-950 font-semibold text-[11px] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Trattativa conclusa con l'investitore Fabio Cannavale per €250.000 (per il 70% delle quote).</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100 mt-4">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Voce Storiografica Wikipedia</span>
              <a
                href="https://photos.app.goo.gl/sqYuAuEjVBasPG436"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Vedi Trasm. Mediaset</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* CARD B: RAI DUE — I FATTI VOSTRI */}
          <div className="bg-red-50/20 border-2 border-red-300 rounded-3xl p-6 relative overflow-hidden shadow-xs transition-all hover:shadow-md flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/15 rounded-full blur-xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-600 text-white text-[9px] sm:text-[10px] font-mono font-bold uppercase rounded-md tracking-wider">
                  <Tv2 className="w-3.5 h-3.5" />
                  RAI DUE
                </span>
                <span className="text-[11px] font-mono text-red-800 font-extrabold bg-red-100 px-2 py-0.5 rounded">
                  2017
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono text-red-700 font-bold uppercase block tracking-wider">
                  DIRETTA NAZIONALE • DIVULGAZIONE
                </span>
                <h4 className="font-serif font-black text-base sm:text-lg text-slate-900 uppercase tracking-tight">
                  Ospite Istituzionale a "I Fatti Vostri"
                </h4>
              </div>

              <div className="bg-white border border-red-200 p-4 rounded-xl text-xs text-slate-800 leading-relaxed space-y-3">
                <p className="font-medium">
                  Invitato ufficiale in studio da <strong>Giancarlo Magalli</strong> per illustrare la sua attività di inventore e l'impatto ecologico dei suoi brevetti per la riduzione volumetrica dei rifiuti.
                </p>
                <div className="p-3 bg-red-50 border border-red-150 rounded-lg text-red-950 font-semibold text-[11px] space-y-1">
                  <div className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                    <strong>Dimostrazione dal Vivo &amp; Plauso Nazionale</strong>
                  </div>
                  <p className="text-[10px] leading-relaxed text-red-900 font-medium">
                    Ha condotto una <strong>dimostrazione scientifica dal vivo</strong>, azionando il brevetto di fronte alle telecamere in diretta nazionale, riscuotendo un unanime <strong>plauso e riconoscimento per l'efficacia dell'esperimento di compattazione</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 pt-4 border-t border-slate-100 mt-4">
              <span className="text-[9px] font-mono text-slate-400 font-bold uppercase">Teche Rai 2 Storiche</span>
              <a
                href="https://photos.app.goo.gl/26fEASFjDBBtGLJx5"
                target="_blank"
                rel="noopener noreferrer"
                referrerPolicy="no-referrer"
                className="inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider transition-all cursor-pointer text-center"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Guarda Servizio Rai 2</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* 3. ADDITIONAL INSTITUTIONAL & LOCAL RECOGNITIONS */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <h5 className="font-serif font-black text-sm text-slate-900 uppercase tracking-wider">
          Ulteriori Riconoscimenti d'Impresa e Interviste
        </h5>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Confindustria Salerno */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-3 text-xs text-slate-700">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-extrabold uppercase">
                  CONFINDUSTRIA SALERNO
                </span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">2014</span>
              </div>
              <h6 className="font-sans font-extrabold text-sm text-slate-900">
                8° Premio Best Practices per l'Innovazione
              </h6>
              <p className="leading-relaxed text-slate-600">
                Conferito dall'Unione Industriali di Salerno per l'alto valore d'impresa e la presentazione tecnica del brevetto GeniusOm. L'invenzione ha ricevuto inoltre il prestigioso encomio dall'<strong>Unione Industriali di Napoli</strong> con l'inserimento ufficiale nella delegazione tecnologica <strong>Silicon Valley Italian Scouts (2014)</strong> per l'internazionalizzazione negli Stati Uniti.
              </p>
            </div>
            <a
              href="https://youtu.be/2UI1tqpVlb0?si=tXfbhY4KegeonBza"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center justify-center gap-1 bg-slate-200 hover:bg-slate-900 hover:text-white text-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Guarda Video Confindustria</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Intervista Istituzionale Unione Industriali */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between gap-3 text-xs text-slate-700">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-extrabold uppercase">
                  UNIONE INDUSTRIALI INTERVISTA
                </span>
                <span className="font-mono text-[10px] text-slate-500 font-bold">2013</span>
              </div>
              <h6 className="font-sans font-extrabold text-sm text-slate-900">
                Intervista Istituzionale allo Sviluppo Brevetti
              </h6>
              <p className="leading-relaxed text-slate-600">
                Intervista storiografica ed economica focalizzata sulla nascita del compattatore GeniusOm e la visione ecologica pionieristica "Zero Waste".
              </p>
            </div>
            <a
              href="https://photos.app.goo.gl/Vt5mJctaZbYGTQaYA"
              target="_blank"
              rel="noopener noreferrer"
              referrerPolicy="no-referrer"
              className="inline-flex items-center justify-center gap-1 bg-slate-200 hover:bg-slate-900 hover:text-white text-slate-800 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase transition-all cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Vedi Intervista</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}

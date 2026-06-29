import React, { useState } from 'react';
import { FileText, Download, ChevronLeft, ChevronRight, Printer, CheckCircle2, ZoomIn, ZoomOut } from 'lucide-react';

interface PDFViewerSimulatorProps {
  documentId?: string;
  language?: string;
}

export default function PDFViewerSimulator({ documentId = 'dossier_falace', language = 'it' }: PDFViewerSimulatorProps) {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const isIt = language === 'it';
  const totalPages = 18;

  return (
    <div className="space-y-4 font-sans text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-lg bg-blue-50 text-[#1877F2]">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1877F2]">
              {isIt ? 'Fascicolo Istituzionale Verbatim' : 'Verbatim Institutional Dossier'}
            </span>
            <h3 className="font-serif font-bold text-lg text-slate-900 leading-snug">
              Dossier_Fondazione_Falace_AIC.pdf
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert(isIt ? "Inizio download PDF Istituzionale..." : "Starting Institutional PDF download...")}
            className="px-4 py-2 rounded-xl bg-[#1877F2] hover:bg-blue-600 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" />
            {isIt ? 'Scarica PDF' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Toolbar PDF */}
      <div className="p-3 bg-slate-100 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono border border-slate-200">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-1.5 rounded-lg bg-white disabled:opacity-40 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold px-2">Pag. {page} / {totalPages}</span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-1.5 rounded-lg bg-white disabled:opacity-40 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setZoom(z => Math.max(75, z - 15))}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="font-bold w-12 text-center">{zoom}%</span>
          <button 
            onClick={() => setZoom(z => Math.min(150, z + 15))}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-emerald-700 font-bold">
          <CheckCircle2 className="w-4 h-4" />
          {isIt ? "Firmato Digitalmente" : "Digitally Signed"}
        </div>
      </div>

      {/* Finestra di Visualizzazione Simulata */}
      <div 
        className="w-full bg-white border border-slate-300 rounded-xl p-8 sm:p-12 shadow-inner min-h-[450px] flex flex-col justify-between transition-all overflow-hidden"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
      >
        <div className="space-y-6 max-w-2xl mx-auto w-full">
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-end">
            <div>
              <span className="font-mono text-[10px] text-slate-400 block uppercase tracking-widest">Ente Morale Riconosciuto</span>
              <h4 className="font-serif font-black text-xl text-slate-900">FONDAZIONE FALACE DELLE AIC</h4>
            </div>
            <span className="font-mono text-xs font-bold text-[#1877F2]">ATTO n. 0084/2024</span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-serif pt-2">
            <h5 className="font-bold text-base text-slate-900 uppercase tracking-wide">
              {page === 1 ? "Premessa Statutaria e Principi Fondamentali" : `Capitolo ${page}: Sincronismo e Tutela dell'Ingegno`}
            </h5>
            <p>
              {isIt
                ? "Il presente documento certifica in via definitiva ed irrevocabile la titolarità d'autore del Metodo AIC (Attività Intellettive Creative) in capo al Fondatore Dott. Luca Falace. È sancita la totale autonomia giuridica e concettuale dell'ente da qualsiasi sistema di calcolo algoritmico esterno."
                : "This document definitively certifies the copyright ownership of the AIC Method by Founder Dr. Luca Falace."}
            </p>
            <p className="p-4 bg-slate-50 border-l-4 border-[#1877F2] italic text-sm font-sans text-slate-700">
              {isIt
                ? "«Ogni opera d'arte e ogni brevetto depositato sono vibrazioni coerenti che resistono all'entropia temporale.»"
                : "«Every artwork and filed patent are coherent vibrations resisting temporal entropy.»"}
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex justify-between items-center font-mono text-[10px] text-slate-400">
          <span>Documento Ufficiale · Ministero della Cultura</span>
          <span>Pagina {page} di {totalPages}</span>
        </div>
      </div>
    </div>
  );
}

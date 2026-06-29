import React, { useState } from 'react';
import { FileText, Shield, CheckCircle2, BookOpen, ExternalLink } from 'lucide-react';

export default function AICDossierVerbatim({ language }: { language: string }) {
  const isIt = language === 'IT' || language === 'it';
  const [activeTab, setActiveTab] = useState<'manuscript' | 'evidence' | 'deposit'>('manuscript');

  return (
    <div className="bg-white border border-[#b8963e]/40 rounded-3xl p-8 shadow-2xl text-[#0a2342] my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-3.5 bg-[#0a2342] rounded-2xl text-[#b8963e]">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#b8963e] uppercase font-bold tracking-widest block">Verbatim Ufficiale Fondazione</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#0a2342]">
              {isIt ? "Dossier Verbatim Integrale AIC" : "AIC Comprehensive Verbatim Dossier"}
            </h3>
          </div>
        </div>
        <div className="flex gap-2 bg-[#FAF9F5] p-1.5 rounded-xl border border-gray-200">
          <button 
            onClick={() => setActiveTab('manuscript')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'manuscript' ? 'bg-[#0a2342] text-white shadow' : 'text-gray-600 hover:text-black'}`}
          >
            {isIt ? "Manoscritto" : "Manuscript"}
          </button>
          <button 
            onClick={() => setActiveTab('evidence')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'evidence' ? 'bg-[#0a2342] text-white shadow' : 'text-gray-600 hover:text-black'}`}
          >
            {isIt ? "Evidenze DOI" : "DOI Evidence"}
          </button>
          <button 
            onClick={() => setActiveTab('deposit')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTab === 'deposit' ? 'bg-[#0a2342] text-white shadow' : 'text-gray-600 hover:text-black'}`}
          >
            {isIt ? "Deposito Legal" : "Legal Deposit"}
          </button>
        </div>
      </div>

      <div className="py-6 font-serif leading-relaxed text-gray-800 text-base">
        {activeTab === 'manuscript' && (
          <div className="space-y-4">
            <p className="first-letter:text-4xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:text-[#0a2342]">
              {isIt ? 
                "L'Associazione Internazionale dei Campi di Coscienza (AIC) definisce la struttura fondamentale dell'universo manifesto non come una casualità termodinamica, ma come una rete di sincronicità armonica strutturata su 9 livelli operativi. Ogni pensiero, atto creativo, opera d'arte o brevetto tecnologico depositato dalla Dinastia Falace rappresenta un nodo tangibile di tale campo unificato." :
                "The International Association of Consciousness Fields (AIC) defines the fundamental structure of the manifest universe as an interconnected network of harmonic synchronicity structured across 9 operational levels."}
            </p>
            <div className="bg-[#FAF9F5] p-6 rounded-2xl border-l-4 border-[#b8963e] italic text-gray-700 text-sm">
              "{isIt ? "La risonanza è il linguaggio attraverso cui la materia ricorda il proprio ordine originario." : "Resonance is the language through which matter remembers its original cosmic order."}"
              <span className="block not-italic font-mono text-xs text-[#0a2342] mt-2 font-bold">— Dott. Luca Falace, Fondatore AIC</span>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm text-[#0a2342]">CERN / Zenodo Repository (DOI: 10.5281/zenodo.142341)</h5>
                <p className="text-xs text-gray-600 mt-1">Pubblicazione peer-reviewed sulla risonanza di campo cosmico e armoniche a 432 Hz.</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 bg-gray-50 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm text-[#0a2342]">UIBM Brevetti di Invenzione Industriale</h5>
                <p className="text-xs text-gray-600 mt-1">Registrazioni ufficiali ministeriali delle apparecchiature di bio-risonanza acustica e purificazione.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deposit' && (
          <div className="text-center py-6 bg-[#0a2342] text-white rounded-2xl p-6">
            <Shield className="w-12 h-12 text-[#b8963e] mx-auto mb-3" />
            <h4 className="font-bold text-xl text-white mb-2">Certificazione di Autenticità Blockchain & Ministeriale</h4>
            <p className="text-sm text-white/80 max-w-xl mx-auto mb-4">
              Tutti i documenti, testi verbali, opere e trattati presenti in questo portale sono protetti da copyright internazionale e depositati con marcatura temporale certa.
            </p>
            <span className="inline-block px-4 py-2 bg-[#b8963e] text-[#0a2342] font-mono text-xs font-black uppercase rounded-lg shadow">
              Protocollo Sicurezza AIC: VERIFIED
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

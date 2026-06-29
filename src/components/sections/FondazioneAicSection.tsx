import React from 'react';
import { Sparkles, Brain, ShieldAlert, History, Key } from 'lucide-react';

export default function FondazioneAicSection() {
  return (
    <section id="fondazione-aic-section" className="bg-white border border-[#0066CC] rounded-2xl p-6 sm:p-8  relative overflow-hidden">
      
      {/* Decorative linear guidelines */}
      <div className="absolute top-0 right-0 w-32 h-32  pointer-events-none" />

      {/* Institutional header */}
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-5 mb-6">
        <div className="p-2.5 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <History className="w-5.5 h-5.5" />
        </div>
        <div>
          <span className="text-[9px] font-mono text-[#0066CC] uppercase tracking-wider block font-bold">
            03 • STATUTO &amp; FONDAZIONI • SEZIONE A
          </span>
          <h3 className="font-serif font-black text-base text-black tracking-wide uppercase leading-tight mt-0.5">
            Genesi Storica — Fondazione AIC
          </h3>
        </div>
      </div>

      <div className="space-y-5 text-xs text-black leading-relaxed font-sans mb-6">
        <p>
          Nata dall'alveo primordiale del <strong>Centro Culturale Arte e Scienza</strong> fondato a Napoli nel <strong>2005</strong>, la <strong>Fondazione AIC (Attività Intellettive Creative)</strong> viene costituita in veste ufficiale nel <strong>2024</strong> tramite specifico atto notarile, statuto e regolamenti operativi interni interamente concepiti, redatti ed emanati di pugno dal Presidente Fondatore Dott. Luca Falace.
        </p>
        <p>
          L'ente era originariamente deputato alla formalizzazione della legge <code className="font-mono bg-white border border-[#0066CC] px-1 py-0.5 rounded text-black font-semibold">S = φ(f)</code> e alla conservazione della trilogia del Campo Unificato. Il fondatore conserva la titolarità originaria ed esclusiva di ogni singolo diritto d'autore correlato a tale opera.
        </p>
      </div>

      {/* Gold custom callout box for the crucial Fiduciary Suspension Note */}
      <div className="p-5 rounded-xl border border-[#0066CC] bg-white relative overflow-hidden ">
        
        {/* Amber left accent line */}
        <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#0066CC]" />
        
        <div className="flex gap-4 items-start">
          <div className="p-2 bg-amber-50 border border-amber-100 rounded-xl text-[#0066CC] shrink-0">
            <ShieldAlert className="w-5 h-5 animate-pulse" />
          </div>
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-extrabold flex items-center gap-1.5 leading-none">
              <span>NOTA DI SOSPENSIONE FIDUCIARIA</span>
            </h4>
            <p className="text-[11px] text-black leading-relaxed italic pr-2">
              "Fondazione AIC in <strong>temporanea sospensione fiduciaria</strong> su espresse istanze del Fondatore Luca Falace, finalizzata alla difesa morale, integrale e incondizionata della proprietà ed integrità intellettuale dell'ente. Proprietà intellettuale e titolarità d'autore certificata presso il Ministero del diritto d'autore, deposito del diritto d'autore."
            </p>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-black mt-2">
              <Key className="w-3 h-3 text-[#0066CC]" />
              <span>Attestato Protezione Registrata • Ministero della Cultura</span>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}

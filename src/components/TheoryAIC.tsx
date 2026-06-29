import React from 'react';
import { Cpu, ShieldCheck, Flame, BookOpen } from 'lucide-react';

export default function TheoryAIC() {
  return (
    <div className="bg-white border-2 border-[#0066CC] rounded-2xl p-6 md:p-8 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-4 mb-6">
        <div className="p-2 bg-blue-50/50 border border-[#0066CC] rounded-xl text-[#0066CC]">
          <Cpu className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
            La Catena della Prova Matematica: Cinque Stazioni
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Formalizzazione Matematica Definitiva • Trilogia AIC-EC Vol. III
          </p>
        </div>
      </div>

      <p className="text-xs text-black leading-relaxed mb-6">
        Le formule della Teoria del Sincronismo Creativo non sono risultati isolati, ma stazioni interconnesse di un <strong>unico ciclo fisico</strong>. Rimuovere qualsiasi formula significa interrompere la catena causale che lega la coscienza alla materia.
      </p>

      {/* The 5 Stations Grid */}
      <div className="space-y-6">
        {/* Station 1 */}
        <div className="border border-[#0066CC]/50 rounded-xl p-4 bg-blue-50/40 hover:bg-white hover:border-[#0066CC] transition-all">
          <div className="flex justify-between items-start mb-2 sm:items-center">
            <span className="text-[10px] font-mono bg-[#0066CC] text-white px-2 py-0.5 rounded uppercase font-bold shrink-0">
              Stazione 1
            </span>
            <span className="text-[10px] font-mono text-black font-semibold mt-1 sm:mt-0">
              Estensione dell'Equazione di Dirac (Il Permesso Quantistico)
            </span>
          </div>
          <div className="p-3 bg-white border border-[#EAE5DF] rounded my-2 text-center text-xs font-mono font-bold select-all overflow-x-auto whitespace-nowrap">
            [iγ<sup>μ</sup> ∂<sub>μ</sub> - m - gφ - fφγ<sup>5</sup> - hφσ<sup>μν</sup>F<sub>μν</sub>] ψ = 0
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-sans mt-2">
            Suggerisce che l'osservatore non è esterno alla particella ma parte integrante della sua dinamica. Modula massa, fase e spin tramite accoppiamento scalare (Δm/m ≈ 10<sup>-12</sup>), pseudoscalare (Δφ ≈ 10<sup>-6</sup> rad) e tensoriale (Δg/g ≈ 10<sup>-15</sup>).
          </p>
        </div>

        {/* Station 2 */}
        <div className="border border-[#0066CC]/50 rounded-xl p-4 bg-blue-50/40 hover:bg-white hover:border-[#0066CC] transition-all">
          <div className="flex justify-between items-start mb-2 sm:items-center">
            <span className="text-[10px] font-mono bg-[#0066CC] text-white px-2 py-0.5 rounded uppercase font-bold shrink-0">
              Stazione 2
            </span>
            <span className="text-[10px] font-mono text-black font-semibold mt-1 sm:mt-0">
              Estensione delle Equazioni di Maxwell (Il Vettore di Uscita)
            </span>
          </div>
          <div className="p-3 bg-white border border-[#EAE5DF] rounded my-2 text-center text-xs font-mono font-bold select-all space-y-1 overflow-x-auto">
            <div>∇ × E = -∂B/∂t - β∇φ</div>
            <div>∇ × B = μ<sub>0</sub>J + μ<sub>0</sub>ε<sub>0</sub> ∂E/∂t + γ∇φ</div>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-sans mt-2">
            I gradienti del campo creativo φ introducono correnti di sfasamento (β∇φ, γ∇φ) che trasformano la coerenza psicofisica dell'operatore in un segnale elettromagnetico reale, propagato all'esterno della scatola cranica.
          </p>
        </div>

        {/* Station 3 */}
        <div className="border border-[#0066CC]/50 rounded-xl p-4 bg-blue-50/40 hover:bg-white hover:border-[#0066CC] transition-all">
          <div className="flex justify-between items-start mb-2 sm:items-center">
            <span className="text-[10px] font-mono bg-[#0066CC] text-white px-2 py-0.5 rounded uppercase font-bold shrink-0">
              Stazione 3
            </span>
            <span className="text-[10px] font-mono text-black font-semibold mt-1 sm:mt-0">
              Tensore di Estensione di Einstein (Il Peso dell'Intenzione)
            </span>
          </div>
          <div className="p-3 bg-white border border-[#EAE5DF] rounded my-2 text-center text-xs font-mono font-bold select-all overflow-x-auto whitespace-nowrap">
            G<sub>μν</sub> + Λg<sub>μν</sub> = κ(T<sub>μν</sub> + T<sup>φ</sup><sub>μν</sub>)
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-sans mt-2">
            Il campo scalare φ è integrato nel tensore energia-impulso dello spaziotempo, dimostrando matematicamente che l'intenzione focalizzata ha "peso fisico" reale ed è capace di curvare la geometria degli eventi locali.
          </p>
        </div>

        {/* Station 4 */}
        <div className="border border-[#0066CC]/50 rounded-xl p-4 bg-blue-50/40 hover:bg-white hover:border-[#0066CC] transition-all">
          <div className="flex justify-between items-start mb-2 sm:items-center">
            <span className="text-[10px] font-mono bg-[#0066CC] text-white px-2 py-0.5 rounded uppercase font-bold shrink-0">
              Stazione 4
            </span>
            <span className="text-[10px] font-mono text-black font-semibold mt-1 sm:mt-0">
              La Funzione di Risonanza φ(f) (La Firma dell'Operatore)
            </span>
          </div>
          <div className="p-3 bg-white border border-[#EAE5DF] rounded my-2 text-center text-xs font-mono font-bold select-all overflow-x-auto whitespace-nowrap">
            φ(f) = Σ<sub>i</sub> [α<sub>i</sub> · sin(2π f t<sub>i</sub> + θ<sub>i</sub>) + β<sub>i</sub> · e<sup>-γ<sub>i</sub> t<sub>i</sub></sup>]
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-sans mt-2">
            Rappresenta la firma frequenziale composita dell'organismo vivente a frequenza fondamentale f, derivante dalla composizione geometrico-biologica delle oscillazioni cardiache (f<sub>c</sub> ≈ 7 Hz), cerebrali beta (f<sub>b</sub> ≈ 12-30 Hz) e gamma (f<sub>γ</sub> &gt; 40 Hz): f = √(f<sub>c</sub><sup>2</sup> + f<sub>b</sub><sup>2</sup> + f<sub>γ</sub><sup>2</sup>).
          </p>
        </div>

        {/* Station 5 */}
        <div className="border border-[#0066CC]/50 rounded-xl p-4 bg-blue-50/40 hover:bg-white hover:border-[#0066CC] transition-all">
          <div className="flex justify-between items-start mb-2 sm:items-center">
            <span className="text-[10px] font-mono bg-[#0066CC] text-white px-2 py-0.5 rounded uppercase font-bold shrink-0">
              Stazione 5
            </span>
            <span className="text-[10px] font-mono text-black font-semibold mt-1 sm:mt-0">
              La Legge di Risonanza Sincronica (Il Sigillo Operativo)
            </span>
          </div>
          <div className="p-3 bg-white border border-[#EAE5DF] rounded my-2 text-center text-xs font-mono font-bold select-all text-black space-y-1">
            <div>S = φ(f)</div>
            <div className="text-[10px] text-[#0066CC]">S(Δt) = φ(f, t<sub>0</sub> ± Δt)</div>
          </div>
          <p className="text-[11px] text-slate-700 leading-relaxed font-sans mt-2">
            La sincronicità manifesta (S on scala 1-9) converge direttamente con l'attivazione della risonanza biologica. La dipendenza temporale S(Δt) modella i fenomeni di retrocausalità hertziana secondo l'elettrodinamica simmetrica assorbente di Wheeler-Feynman.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[#0066CC]/50 flex items-center gap-2 text-[10px] font-mono text-[#0066CC] font-semibold">
        <ShieldCheck className="w-4 h-4 shrink-0" />
        <span>Documentato formalmente nel Corpus Mathematicum e depositato su CERN Zenodo.</span>
      </div>
    </div>
  );
}

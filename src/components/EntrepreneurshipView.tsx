import React, { useState } from 'react';
import { Award, DollarSign, TrendingUp, Cpu, Heart, CheckCircle, HelpCircle } from 'lucide-react';

export default function EntrepreneurshipView() {
  const [fundingGoal, setFundingGoal] = useState(250000);
  const [equityProposed, setEquityProposed] = useState(70);

  // Calculate valuation indices
  const impliedValuation = fundingGoal / (equityProposed / 100);

  return (
    <div className="bg-white border border-[#0066CC] rounded-2xl p-6 ">
      <div className="flex items-center gap-3 border-b border-[#0066CC] pb-4 mb-4">
        <div className="p-2 bg-white border border-[#0066CC] rounded-xl text-[#0066CC]">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase">
            Iniziative Imprenditoriali &amp; Shark Tank
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Trattativa Ufficiale Mediaset • GeniusOm
          </p>
        </div>
      </div>

      <p className="text-xs text-black leading-relaxed mb-4">
        Nel 2015, il Dott. Luca Falace ha presentato in diretta nazionale su <strong>Italia 1 (Mediaset)</strong> la tesi d'impresa di <strong>GeniusOm©</strong>. Il compattatore brevettato per rifiuti domestici ha raccolto un successo storiografico, culminato con un'offerta di finanziamento reale pari a <strong>€250.000</strong> per il 70% delle quote sociali avanzata dal noto angel investor <strong>Fabio Cannavale</strong>.
      </p>

      {/* Interactive Simulator Card */}
      <div className="bg-white border border-[#0066CC] rounded-xl p-4 mb-4">
        <span className="text-[9px] font-mono text-black uppercase tracking-widest font-black block mb-3 text-center">
          Calcolatore Risonanza di Valutazione d'Impresa
        </span>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1 text-black">
              <span>Importo Trattato (Investment)</span>
              <span className="text-black font-bold">€ {fundingGoal.toLocaleString()}</span>
            </div>
            <input 
              type="range"
              min="50000"
              max="500000"
              step="10000"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(Number(e.target.value))}
              className="w-full h-1 bg-[#EAE6DF] accent-[#0066CC] rounded-lg appearance-none cursor-pointer" 
            />
          </div>

          <div>
            <div className="flex justify-between text-[10px] font-mono mb-1 text-black">
              <span>Quota Sociale Ceduta (Equity)</span>
              <span className="text-black font-bold">{equityProposed} % (Modello Cannavale)</span>
            </div>
            <input 
              type="range"
              min="10"
              max="90"
              value={equityProposed}
              onChange={(e) => setEquityProposed(Number(e.target.value))}
              className="w-full h-1 bg-[#EAE6DF] accent-[#0066CC] rounded-lg appearance-none cursor-pointer" 
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-white border border-[#0066CC] p-3 rounded-lg flex justify-between items-center text-xs">
          <span className="font-sans text-black font-medium">Valore d'Impresa Implicito (Valuation):</span>
          <span className="font-mono text-xs font-black text-[#0066CC] bg-white border border-black px-2 py-1 rounded">
            € {Math.round(impliedValuation).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-2.5 text-xs text-indigo-900">
        <CheckCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-[10.5px] leading-relaxed">
          <strong>Storiografia Wikipedia ed Ecomondo:</strong> Il brevetto è stato onorato in sede ministeriale e donato per finalità umanitarie nel pacchetto 'Zero Waste'.
        </p>
      </div>
    </div>
  );
}

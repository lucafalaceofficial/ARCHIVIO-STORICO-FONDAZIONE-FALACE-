/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShieldCheck, Info, Award } from 'lucide-react';

export default function AicSymbols() {
  const [activeSymbol, setActiveSymbol] = useState<number | null>(null);

  const symbols = [
    {
      id: 1,
      name: "Oro Alchemico AIC",
      subtitle: "Simbolo dell'Oro e della Conoscenza",
      description: "Il simbolo chimico ed alchemico dell'Oro (Sole/Mente) circondato dalla dicitura in latino 'Intelligentia et Bonum Universalia' (Intelligenza e Bene Universali). Rappresenta il culmine della Grande Opera della conoscenza e del benessere umano.",
      copyrightUrl: "Registrato nel 2005 presso l'O.l.a.f. e nel 2007 presso il Ministero dei Beni Culturali",
      svg: (
        <svg viewBox="0 0 120 120" className="w-full h-full text-amber-600 transition-all duration-500">
          <defs>
            <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.05" />
            </radialGradient>
            <filter id="shadow">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#d4af37" floodOpacity="0.2" />
            </filter>
          </defs>
          {/* External golden border */}
          <circle cx="60" cy="60" r="50" fill="none" stroke="#d4af37" strokeWidth="2.5" filter="url(#shadow)" />
          <circle cx="60" cy="60" r="45" fill="none" stroke="#d4af37" strokeWidth="0.75" strokeDasharray="3,3" />
          
          {/* Inner circle for gold symbol (☉) */}
          <circle cx="60" cy="60" r="20" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="4" fill="#d4af37" />

          {/* Latin Text curved along path */}
          <path id="latinPath" d="M 18,60 A 42,42 0 1,1 102,60" fill="none" stroke="none" />
          <path id="latinPathBottom" d="M 102,60 A 42,42 0 1,1 18,60" fill="none" stroke="none" />
          
          <text fontSize="5.5" fontWeight="bold" fill="#b48a21" letterSpacing="0.1">
            <textPath href="#latinPath" startOffset="50%" textAnchor="middle">
              INTELLIGENTIA ET BONUM UNIVERSALIA
            </textPath>
          </text>
          
          <text fontSize="5.5" fontWeight="bold" fill="#b48a21" letterSpacing="0.1">
            <textPath href="#latinPathBottom" startOffset="50%" textAnchor="middle">
              * HUMANA HUB AIC *
            </textPath>
          </text>
        </svg>
      )
    },
    {
      id: 2,
      name: "Il Pentacolo del Sole",
      subtitle: "Marchio di StaffLucArtStudio",
      description: "Disegnato dal fondatore Luca Falace, raffigura il Pentacolo Solare simmetrico, simbolo della forza vitale creatrice, della luce intellettuale e del movimento energetico universale.",
      copyrightUrl: "Ideazione e Simbologia © Luca Falace 2005 - Deposito Ministeriale",
      svg: (
        <svg viewBox="0 0 120 120" className="w-full h-full text-amber-600 transition-all duration-500">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#d4af37" strokeWidth="2" />
          <circle cx="60" cy="60" r="46" fill="none" stroke="#926919" strokeWidth="0.5" />
          
          {/* Rays of the sun or star segments */}
          <g stroke="#d4af37" strokeWidth="1.2" fill="none">
            {/* Draw symmetrical nested geometry */}
            <polygon points="60,15 97,42 82,85 38,85 23,42" />
            <polygon points="60,110 23,83 38,40 82,40 97,83" />
            
            {/* Radiant core */}
            <circle cx="60" cy="60" r="14" fill="#ffffff" stroke="#d4af37" strokeWidth="1.5" />
          </g>

          {/* Core inscription */}
          <text x="60" y="58" fontSize="4.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">
            LUCART
          </text>
          <text x="60" y="64" fontSize="4.5" fontWeight="bold" fill="#1e293b" textAnchor="middle">
            STUDIO
          </text>
          <text x="60" y="70" fontSize="3" fill="#d4af37" textAnchor="middle" letterSpacing="1">
            2005
          </text>
          
          {/* Solar dots */}
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = ((angle - 90) * Math.PI) / 180;
            const cx = 60 + Math.cos(rad) * 35;
            const cy = 60 + Math.sin(rad) * 35;
            return <circle key={angle} cx={cx} cy={cy} r="2" fill="#d4af37" />;
          })}
        </svg>
      )
    },
    {
      id: 3,
      name: "C.S.E.P - C.E.S.P. Tao",
      subtitle: "Centro Studi Coincidenze Significative",
      description: "Il cerchio infinito Tai-Ki / Tao, raffigurante la fusione complementare delle polarità, integrato con il C.S.E.P. (Studies Center on Parallel Events) e il C.E.S.P. (Extra Sensory Perception Center) fondato da Luca Falace.",
      copyrightUrl: "Studio sulla Fenomenologia delle Coincidenze Significative © 2005-2023",
      svg: (
        <svg viewBox="0 0 120 120" className="w-full h-full text-amber-600 transition-all duration-500">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          <circle cx="60" cy="60" r="47" fill="none" stroke="#d4af37" strokeWidth="0.5" />
          
          {/* Yin family half */}
          <path d="M 60,13 A 23.5,23.5 0 0,0 60,60 A 23.5,23.5 0 0,1 60,107 A 47,47 0 0,1 60,13 Z" fill="#d4af37" opacity="0.85" />
          
          {/* Yang family half (transparent/complementary) */}
          <path d="M 60,13 A 23.5,23.5 0 0,0 60,60 A 23.5,23.5 0 0,1 60,107 A 47,47 0 0,0 60,13 Z" fill="none" stroke="#d4af37" strokeWidth="1.5" />
          
          {/* Dots */}
          <circle cx="60" cy="36.5" r="5" fill="#1e293b" />
          <circle cx="60" cy="83.5" r="5" fill="#ffffff" stroke="#d4af37" strokeWidth="1" />

          {/* Circular Text labels */}
          <path id="taoPathTop" d="M 15,60 A 45,45 0 0,1 105,60" fill="none" stroke="none" />
          <path id="taoPathBottom" d="M 105,60 A 45,45 0 0,1 15,60" fill="none" stroke="none" />
          
          <text fontSize="4.2" fontWeight="bold" fill="#b48a21" letterSpacing="0.4">
            <textPath href="#taoPathTop" startOffset="50%" textAnchor="middle">
              C.S.E.P. - STUDIES CENTER ON PARALLEL EVENTS
            </textPath>
          </text>
          
          <text fontSize="4.2" fontWeight="bold" fill="#b48a21" letterSpacing="0.4">
            <textPath href="#taoPathBottom" startOffset="50%" textAnchor="middle">
              C.E.S.P. - COINCIDENZE SIGNIFICATIVE
            </textPath>
          </text>
        </svg>
      )
    }
  ];

  return (
    <div className="py-6 space-y-8" id="aic-symbols-container">
      <div className="text-center">
        <span className="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 text-xs rounded-full font-mono uppercase tracking-widest font-bold">
          Marchi e Simboli Depositati
        </span>
        <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight mt-3">
          Marchi e Simboli Depositati AIC
        </h2>
        <p className="text-slate-650 max-w-xl mx-auto mt-2 text-sm leading-relaxed font-sans">
          Simbologie originali ideate da Luca Falace, registrate presso il Ministero della Cultura e l'O.L.A.F., entrate a far parte del patrimonio indisponibile tutelato in via prioritaria dalla Fondazione Falace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4">
        {symbols.map((symbol) => (
          <div
            key={symbol.id}
            id={`symbol-card-${symbol.id}`}
            onClick={() => setActiveSymbol(activeSymbol === symbol.id ? null : symbol.id)}
            className={`bg-white border rounded-3xl p-6 flex flex-col items-center justify-between cursor-pointer group active:scale-95 transition-all shadow-xs hover:shadow-md ${
              activeSymbol === symbol.id ? 'border-amber-500 bg-amber-50/20' : 'border-slate-205'
            }`}
          >
            <div className="relative w-36 h-36 mb-4 flex items-center justify-center p-2 rounded-full bg-slate-50 border border-slate-200 group-hover:border-amber-300 transition-colors">
              {symbol.svg}
            </div>

            <div className="text-center">
              <h3 className="text-base font-display font-bold text-slate-900 tracking-wide group-hover:text-amber-700 transition-colors">
                {symbol.name}
              </h3>
              <p className="text-xs font-mono text-amber-600 mt-1 font-semibold">
                {symbol.subtitle}
              </p>
            </div>

            {/* Display info / detail on click or hover info icon */}
            <div className="mt-4 pt-4 border-t border-slate-100 w-full text-center">
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-amber-700 transition-colors font-medium">
                <Info size={12} className="text-amber-600" />
                {activeSymbol === symbol.id ? "Clicca per comprimere" : "Clicca per dettagli e Statuto"}
              </span>
            </div>

            {activeSymbol === symbol.id && (
              <div 
                id={`symbol-details-${symbol.id}`}
                className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 animate-fadeIn transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-slate-650 leading-relaxed font-sans">{symbol.description}</p>
                <div className="flex items-center gap-2 text-amber-700 font-mono text-[10px] mt-2 pt-2 border-t border-slate-200">
                  <ShieldCheck size={12} />
                  <span>{symbol.copyrightUrl}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center px-4 max-w-2xl mx-auto">
        <div className="p-4 bg-amber-50 rounded-2xl border border-dashed border-amber-200 text-xs text-amber-900 flex items-center gap-3 justify-center">
          <Award size={18} className="text-amber-600 flex-shrink-0" />
          <span className="font-sans leading-relaxed text-slate-700">
            <strong>Nota Legale:</strong> Ai sensi delle leggi sul Copyright Nazionale ed Internazionale (O.L.A.F. & Ministero della Cultura), è vietata la riproduzione non autorizzata dei marchi.
          </span>
        </div>
      </div>
    </div>
  );
}

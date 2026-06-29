import React, { useState } from 'react';
import { Star, Sparkles, Navigation, Globe } from 'lucide-react';

export default function NavigationStar() {
  const [selectedNode, setSelectedNode] = useState<string | null>("Gold Trilogy");

  const stellarCoordinates = [
    { name: "Gold Trilogy", cx: 120, cy: 60, desc: "S=φ(f) Volume III tesi depositata CERN." },
    { name: "AIC-SYNC", cx: 60, cy: 120, desc: "Algoritmo dei 9 livelli di sincronicità UIBM." },
    { name: "Pinacoteca", cx: 170, cy: 110, desc: "250 opere registrate tutele MiC." },
    { name: "GeniusOm", cx: 220, cy: 170, desc: "Brevetto compattatore domestico NASA Shark Tank." }
  ];

  return (
    <div className="bg-white border-4 border-[#0066CC] border-2 border-[#0066CC] rounded-2xl p-5  text-white">
      <div className="flex items-center gap-3 border-b border-black pb-3 mb-4">
        <div className="p-1.5 bg-white border border-[#0066CC] rounded-xl">
          <Star className="w-4 h-4 text-[#0066CC] animate-spin-slow" />
        </div>
        <div>
          <h3 className="font-serif font-black text-xs text-[#0066CC] tracking-wider uppercase">
            Stella di Navigazione Isocronica
          </h3>
          <p className="text-[9px] font-mono text-black">
            Connessioni Cosmiche dei Sincronismi FF
          </p>
        </div>
      </div>

      <p className="text-[10.5px] text-slate-300 leading-relaxed mb-4">
        Fai clic sulle costellazioni del sapere della Fondazione Falace per tracciare le linee di accoppiamento isocronico tra le opere filosofiche e i brevetti.
      </p>

      {/* Interactive SVG Constellation */}
      <div className="relative bg-white border-2 border-[#0066CC] border border-black rounded-xl p-4 flex justify-center mb-4">
        <svg viewBox="0 0 300 220" className="w-full max-w-[280px] h-auto">
          {/* Constellation line connections */}
          <line x1="120" y1="60" x2="60" y2="120" stroke="#0066CC" strokeWidth="1" strokeDasharray="3 3 shrink-0" opacity="0.6" />
          <line x1="120" y1="60" x2="170" y2="110" stroke="#0066CC" strokeWidth="1" opacity="0.6" />
          <line x1="60" y1="120" x2="220" y2="170" stroke="#1C3E75" strokeWidth="1.5" />
          <line x1="170" y1="110" x2="220" y2="170" stroke="#1C3E75" strokeWidth="1" />

          {/* Render node stars */}
          {stellarCoordinates.map((node, i) => {
            const isSel = selectedNode === node.name;
            return (
              <g 
                key={i} 
                onClick={() => setSelectedNode(node.name)}
                className="cursor-pointer group"
              >
                <circle 
                  cx={node.cx} 
                  cy={node.cy} 
                  r={isSel ? 7 : 4} 
                  fill={isSel ? '#3399FF' : '#1C3E75'} 
                  stroke="#0066CC" 
                  strokeWidth="1.5"
                  className="transition-all duration-200 group-hover:r-7"
                />
                <text 
                  x={node.cx + 8} 
                  y={node.cy + 4} 
                  fill="#ffffff" 
                  fontSize="8" 
                  fontFamily="monospace"
                  className=" group-hover:opacity-100 select-none font-bold"
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>

        {selectedNode && (
          <div className="absolute top-3 left-3 bg-white border border-black p-2 rounded-lg text-[9px] font-mono max-w-[140px]  animate-fade-in">
            <span className="font-bold text-[#0066CC] block mb-0.5">{selectedNode}:</span>
            <span className="text-slate-300 leading-tight block">
              {stellarCoordinates.find(n => n.name === selectedNode)?.desc}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-450 justify-between">
        <span>Coordinate: Aureo 1.618</span>
        <span className="text-[#0066CC] font-bold">Unificazione di Campo Coscienza</span>
      </div>
    </div>
  );
}

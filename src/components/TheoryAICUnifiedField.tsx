import React, { useRef, useEffect, useState } from 'react';
import { Sparkles, HelpCircle, Activity, Info } from 'lucide-react';

export default function TheoryAICUnifiedField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [waveFrequency, setWaveFrequency] = useState(0.04);
  const [pulseCount, setPulseCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#0066CC';
      ctx.lineWidth = 1.5;

      if (!isCollapsed) {
        // Draw Wave probabilities representing quantum system before measurement
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const amplitude = 30 * Math.sin((x * 0.015) + time) * Math.sin(x * 0.005);
          const y = (canvas.height / 2) + amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        ctx.strokeStyle = '#1C3E75';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x++) {
          const amplitude = 15 * Math.sin((x * 0.03) - time) * Math.cos(x * 0.008);
          const y = (canvas.height / 2) + amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      } else {
        // Collapsed Wave - localized single pulse particle
        ctx.beginPath();
        const center = canvas.width / 2;
        for (let x = 0; x < canvas.width; x++) {
          const distance = Math.abs(x - center);
          // Gaussian envelope representing localized particle
          const envelope = Math.exp(-Math.pow(distance / 25, 2));
          const amplitude = 40 * Math.sin(x * 0.4) * envelope;
          const y = (canvas.height / 2) + amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Draw node locator
        ctx.fillStyle = '#3399FF';
        ctx.beginPath();
        ctx.arc(center, canvas.height / 2, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      time += waveFrequency;
      animationId = requestAnimationFrame(render);
    };

    // Correct canvas sizing
    canvas.width = canvas.parentElement?.clientWidth || 400;
    canvas.height = 160;

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isCollapsed, waveFrequency]);

  const handleObserverInteraction = () => {
    setIsCollapsed(prev => !prev);
    setPulseCount(p => p + 1);
  };

  return (
    <div className="bg-white border-2 border-[#0066CC] rounded-2xl p-5 text-black">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#0066CC] animate-pulse" />
          <span className="font-serif font-black text-xs uppercase tracking-wide text-[#0066CC]">
            Modello Campo Unificato AIC
          </span>
        </div>
        <span className="text-[8px] font-mono text-black bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200 uppercase font-bold">
          Dualismo Onda-Particella
        </span>
      </div>

      <p className="text-[11px] text-slate-700 leading-relaxed mb-4">
        Secondo la formulazione del Dott. Luca Falace, il Collasso della Funzione d'Onda non è probabilistico ma interattivo ed isocronico. Fai clic nell'area per simulare lo sguardo attivo dell'osservatore ed indurre coerenza quantistica.
      </p>

      {/* Canvas simulator */}
      <div 
        onClick={handleObserverInteraction}
        className="bg-white border border-slate-250 rounded-xl overflow-hidden cursor-pointer relative hover:border-[#0066CC] transition-all flex items-center justify-center p-1"
        title="Clicca per misurare / collassare la funzione d'onda"
      >
        <canvas ref={canvasRef} className="w-full h-40" />
        <div className="absolute bottom-2.5 right-3 text-[8.5px] font-mono text-[#0066CC] flex items-center gap-1.5 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">
          <Sparkles className="w-3 h-3 text-[#0066CC]" />
          <span>{isCollapsed ? "STATO COERENTE: PARTICELLA" : "STATO PROBABILISTICO: ONDE"}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[9px] font-mono text-black">
        <span>Interazioni dell'Osservatore: {pulseCount}</span>
        <span className="text-[#0066CC] font-bold">Formula S = φ(f) di Rigore CERN</span>
      </div>
    </div>
  );
}

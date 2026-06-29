/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export default function AutoSaveManager() {
  const [lastSaveTime, setLastSaveTime] = useState<string>(() => {
    return localStorage.getItem('aic_last_autosave_time') || '--:--:--';
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('Bozze salvate automaticamente');
  
  // Timers and counters
  const inactivityTimeLimit = 30 * 1000; // 30 seconds of inactivity to trigger save
  const intervalTimeLimit = 2 * 60 * 1000; // auto-save every 2 minutes
  
  const lastActivityRef = useRef<number>(Date.now());
  const lastSaveRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Activity listeners
    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Periodic checker loop
    const checkTimer = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivityRef.current;
      const timeSinceLastSave = now - lastSaveRef.current;
      
      let shouldSave = false;
      let reason = '';

      // Rule A: Detect inactivity after user stops typing/moving for inactivityTimeLimit
      // Ensure we don't save too frequently (minimum 10s between saves to prevent spamming)
      if (timeSinceLastActivity >= inactivityTimeLimit && timeSinceLastSave >= 15 * 1000) {
        shouldSave = true;
        reason = 'inattività';
      }
      
      // Rule B: Force periodic save every intervalTimeLimit regardless of activity
      if (timeSinceLastSave >= intervalTimeLimit) {
        shouldSave = true;
        reason = 'periodico';
      }

      if (shouldSave) {
        triggerGlobalSave(reason);
      }
    }, 5000); // Check every 5 seconds

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(checkTimer);
    };
  }, []);

  const triggerGlobalSave = (reason: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('it-IT');
    
    // Save to local refs
    lastSaveRef.current = Date.now();
    setLastSaveTime(timeStr);
    localStorage.setItem('aic_last_autosave_time', timeStr);

    // Dispatch custom event to notify all listening components to write their draft state to localStorage
    const event = new CustomEvent('aic-trigger-autosave', { 
      detail: { timestamp: timeStr, reason } 
    });
    window.dispatchEvent(event);

    // Display beautiful white toast notification in compliance with design rules
    if (reason === 'inattività') {
      setNotificationMsg(`Bozze protette per inattività alle ${timeStr}`);
    } else {
      setNotificationMsg(`Salvataggio automatico periodico eseguito alle ${timeStr}`);
    }
    
    setShowNotification(true);
    // Dismiss after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  return (
    <>
      {/* Small subtle indicator near the celestial header / clock */}
      <div 
        className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full text-[10px] font-mono text-slate-600 shadow-3xs"
        id="autosave-header-badge"
        title="I tuoi moduli e bacheche sono salvati automaticamente su questo browser."
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="font-semibold text-slate-700">Autosalvataggio:</span>
        <span className="text-slate-500 font-bold">{lastSaveTime}</span>
      </div>

      {/* Elegant, clean white float notification toast (Bottom left overlay) */}
      {showNotification && (
        <div 
          className="fixed bottom-6 left-6 z-50 p-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl shadow-lg flex items-center gap-3 animate-slideIn max-w-sm"
          id="autosave-toast-notification"
        >
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-blue-600" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 leading-none">
              Integrità Dati Protetta
            </h4>
            <p className="text-xs font-sans text-slate-800 font-medium leading-tight">
              {notificationMsg}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

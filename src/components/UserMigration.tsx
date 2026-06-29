/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Users, Search, RefreshCw, CheckCircle2, Globe, Sparkles, Mail, Send } from 'lucide-react';
import { MigrationClaim } from '../types';

// Let's seed prefilled claimable accounts for a real, delightful interactive experience
const PRESEED_LEGACY_ACCOUNTS: MigrationClaim[] = [
  { id: '1', name: 'Luca Falace', email: 'dr.lucafalace@gmail.com', platform: 'NING', oldUsername: 'LucaFalaceFounder', followersCount: 150000, status: 'claimed', timestamp: '2026-01-10' },
  { id: '2', name: 'Clara Bernard', email: 'clara.montecarlo@val.mc', platform: 'Instagram', oldUsername: '@montecarloarts', followersCount: 30000, status: 'claimed', timestamp: '2026-03-15' },
  { id: '3', name: 'Jean-Pierre Dubois', email: 'jp.art@outlook.com', platform: 'YouTube', oldUsername: 'ArtsStarItaly', followersCount: 12000, status: 'pending', timestamp: '2026-06-12' },
  { id: '4', name: 'Akiro Tanaka', email: 'akiro.science@tokyo.edu', platform: 'NING', oldUsername: 'AkiroCelestial', followersCount: 500, status: 'verified', timestamp: '2026-05-18' },
  { id: '5', name: 'Maria Rossi', email: 'maria.rossi77@libero.it', platform: 'Facebook', oldUsername: 'LOperaCelesteFanPage', followersCount: 25000, status: 'verified', timestamp: '2026-06-14' },
  { id: '6', name: 'Emily Smith', email: 'emily.celest@gmail.com', platform: 'Other', oldUsername: 'TheCelestialOpera', followersCount: 4500, status: 'verified', timestamp: '2026-06-15' }
];

export default function UserMigration() {
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResults, setSearchResults] = useState<MigrationClaim[] | null>(null);
  
  // Custom Claim Form State
  const [claimForm, setClaimForm] = useState(() => {
    const saved = localStorage.getItem('aic_draft_migration_form');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: '',
      email: '',
      platform: 'NING' as 'NING' | 'Facebook' | 'Instagram' | 'YouTube' | 'Other',
      oldUsername: '',
      message: ''
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);

  // Auto-save trigger listener
  useEffect(() => {
    const handleGlobalAutoSave = () => {
      if (claimForm.name || claimForm.email || claimForm.oldUsername || claimForm.message) {
        localStorage.setItem('aic_draft_migration_form', JSON.stringify(claimForm));
      }
    };
    window.addEventListener('aic-trigger-autosave', handleGlobalAutoSave);
    return () => {
      window.removeEventListener('aic-trigger-autosave', handleGlobalAutoSave);
    };
  }, [claimForm]);

  // Global counts starting points
  const [stats, setStats] = useState({
    migratedNing: 74211,
    migratedSocials: 31250,
    totalMailingList: 150000,
    activeClaimsToday: 412
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchEmail.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Look up in pre-seeded accounts or match domain mock
    const found = PRESEED_LEGACY_ACCOUNTS.filter(
      acc => acc.email.toLowerCase().includes(searchEmail.toLowerCase()) || 
             acc.oldUsername.toLowerCase().includes(searchEmail.toLowerCase())
    );

    if (found.length === 0 && searchEmail.includes('@')) {
      const parts = searchEmail.split('@');
      const mockLegacy: MigrationClaim = {
        id: Math.random().toString(),
        name: parts[0].charAt(0).toUpperCase() + parts[0].slice(1),
        email: searchEmail,
        platform: 'NING',
        oldUsername: parts[0] + '_celestial',
        followersCount: 1,
        status: 'verified', // Verified in the master database, ready to claim!
        timestamp: 'Archivio NING 2005-2010'
      };
      setSearchResults([mockLegacy]);
    } else {
      setSearchResults(found);
    }
  };

  const handleClaimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setClaimSuccess(null);

    // Simulate database write
    setTimeout(() => {
      setIsSubmitting(false);
      setClaimSuccess(`Grazie ${claimForm.name}! La tua richiesta per l'account "${claimForm.oldUsername}" è stata inserita nel processo di migrazione. Riceverai un'email di conferma per l'unione dei profili.`);
      
      // Clear drafts on successful submission
      localStorage.removeItem('aic_draft_migration_form');

      setClaimForm({ name: '', email: '', platform: 'NING', oldUsername: '', message: '' });
      
      // Increment active counter
      setStats(prev => ({
        ...prev,
        activeClaimsToday: prev.activeClaimsToday + 1
      }));
    }, 1500);
  };

  const triggerClaimVerification = (claimId: string) => {
    if (searchResults) {
      setSearchResults(prev => {
        if (!prev) return null;
        return prev.map(item => {
          if (item.id === claimId) {
            return { ...item, status: 'claimed' };
          }
          return item;
        });
      });
      
      // Update general counter
      setStats(prev => ({
        ...prev,
        migratedNing: prev.migratedNing + 1
      }));
    }
  };

  return (
    <div className="py-6 space-y-12" id="user-migration-root">
      
      {/* Title block */}
      <div className="text-center mb-8">
        <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs rounded-full font-mono uppercase tracking-widest font-bold">
          Flusso di Digitalizzazione Internazionale
        </span>
        <h2 className="text-3xl font-display font-medium text-slate-900 tracking-tight mt-3 font-bold">
          Unione Storica dei Membri & Social Base
        </h2>
        <p className="text-slate-650 max-w-xl mx-auto mt-2 text-sm leading-relaxed font-sans">
          Il nucleo storico internazionale di utenti dell'Opera Celeste (142.000 iscritti su piattaforma Ning 2005-2010 e oltre 30.000 followers dei canali d'arte d'avanguardia) viene unificato nel nuovo portale <strong>HUMANA HUB AIC</strong> gestito dalla <strong>Fondazione Falace</strong>.
        </p>
      </div>

      {/* Grid statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4" id="migration-stats-grid">
        
        <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Archivio Storico NING</span>
          <div className="my-2">
            <span className="text-2xl md:text-3xl font-mono font-bold text-amber-700">
              {stats.migratedNing.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">Membri Riconnessi / 70k</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full w-[94%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <span className="text-xs text-slate-505 font-medium">Followers Pagine Social</span>
          <div className="my-2">
            <span className="text-2xl md:text-3xl font-mono font-bold text-amber-700">
              {stats.migratedSocials.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">Canali Attivi / 30k</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full w-[100%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Totale Mailing List</span>
          <div className="my-2">
            <span className="text-2xl md:text-3xl font-mono font-bold text-amber-700">
              {stats.totalMailingList.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 font-mono block">Utenti Internazionali</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-200">
            <div className="bg-gradient-to-r from-amber-400 to-amber-600 h-full w-[105%]" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs">
          <span className="text-xs font-semibold flex items-center gap-1.5 text-blue-600">
            <Sparkles size={13} /> Richieste Oggi
          </span>
          <div className="my-2">
            <span className="text-2xl md:text-3xl font-mono font-black text-slate-905">
              +{stats.activeClaimsToday}
            </span>
            <span className="text-[10px] text-green-600 font-semibold block">Attivi ora in sincrono</span>
          </div>
          <span className="text-[9px] text-slate-400">Aggiornamento automatico</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {/* Left pane: Search legacy account and global connection live map */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-blue-600" size={20} />
              <h3 className="text-base font-display font-bold text-slate-900 uppercase">Verifica il tuo vecchio account</h3>
            </div>
            
            <p className="text-slate-600 text-xs leading-relaxed mb-4 font-sans">
              Inserisci la tua vecchia email registrata su <strong>Ning (The Celestial Opera)</strong> tra il 2005 e il 2010, oppure il tuo ID social per verificare se è già presente nel nostro archivio storico di 150.000 membri presidiato dal CLO Avv. De Juliis.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 mb-4" id="search-migration-form">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 text-slate-400" size={15} />
                <input
                  type="text"
                  placeholder="Es: dr.lucafalace@gmail.com o maria.rossi77@libero.it"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-blue-500 transition-colors font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Search size={15} />
                Cerca
              </button>
            </form>

            {searchResults !== null && (
              <div className="space-y-3 mt-4" id="search-results-area">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Risultati Archivio</h4>
                
                {searchResults.length === 0 ? (
                  <p className="text-xs text-red-700 p-3 bg-red-50 rounded-xl border border-red-200">
                    Nessun profilo trovato con questi dati. Prova con un'altra email o invia la richiesta di migrazione compilando il modulo a fianco.
                  </p>
                ) : (
                  searchResults.map(claim => (
                    <div key={claim.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 animate-fadeIn">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-slate-900 text-xs font-bold">{claim.name}</span>
                          <span className="px-2 py-0.5 bg-blue-50 text-[9px] text-blue-600 rounded-md font-mono uppercase font-bold border border-blue-100">
                            {claim.platform}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                          ID: {claim.oldUsername} • {claim.email}
                        </p>
                        <p className="text-[9px] text-amber-700/85 mt-1 font-mono font-bold">
                          Rilevati {claim.followersCount.toLocaleString()} contatti collegati
                        </p>
                      </div>

                      <div>
                        {claim.status === 'claimed' ? (
                          <div className="flex items-center gap-1 text-[9px] text-green-700 font-bold uppercase font-mono tracking-wider bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                            <CheckCircle2 size={12} />
                            Associato
                          </div>
                        ) : (
                          <button
                            onClick={() => triggerClaimVerification(claim.id)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-bold rounded-lg transition-all active:scale-95 cursor-pointer"
                          >
                            Rivendica Status
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Interactive World Map Showing 150k members distribution */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Globe className="text-blue-605" size={18} />
                <h3 className="text-sm font-display font-bold text-slate-900 uppercase">Copertura Globale HUMANA HUB AIC</h3>
              </div>
              <span className="text-[10px] font-mono p-1 bg-blue-50 text-blue-600 rounded border border-blue-100 uppercase font-bold">
                Live Sincrono
              </span>
            </div>
            
            {/* Beautiful Custom SVG World Map Projection */}
            <div className="relative w-full aspect-[2/1] bg-slate-50 rounded-xl overflow-hidden border border-slate-200 group">
              <svg viewBox="0 0 400 200" className="w-full h-full text-slate-350">
                <path d="M50,45 Q70,25 90,40 T130,30 T170,45 T210,35 T250,50 T290,40 T330,45" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,3" />
                <path d="M60,115 Q90,135 120,110 T180,120 T240,115 T300,125" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,3" />
                
                {/* Interactive world nodes corresponding to history centers of Dr. Luca Falace */}
                {/* 1. Monte Carlo / Monaco */}
                <g className="cursor-pointer group/node">
                  <circle cx="178" cy="62" r="5" fill="#f59e0b" className="animate-ping opacity-75" />
                  <circle cx="178" cy="62" r="3.5" fill="#d4af37" />
                  <text x="178" y="54" fontSize="6.5" fill="#b45309" textAnchor="middle" fontWeight="bold">Monte-Carlo</text>
                </g>

                {/* 2. Rome / Italy (Headquarters) */}
                <g className="cursor-pointer group/node">
                  <circle cx="185" cy="69" r="6" fill="#3b82f6" className="animate-pulse opacity-80" />
                  <circle cx="185" cy="69" r="4" fill="#1d4ed8" />
                  <text x="185" y="79" fontSize="6.5" fill="#0f172a" textAnchor="middle" fontWeight="bold">Roma</text>
                </g>

                {/* 3. New York / USA */}
                <g className="cursor-pointer group/node">
                  <circle cx="100" cy="65" r="4" fill="#3b82f6" />
                  <circle cx="100" cy="65" r="6" fill="#60a5fa" className="animate-ping opacity-50" />
                  <text x="100" y="58" fontSize="6.5" fill="#475569" textAnchor="middle" fontWeight="bold">New York</text>
                </g>

                {/* 4. Tokyo / Japan */}
                <g className="cursor-pointer group/node">
                  <circle cx="310" cy="72" r="4" fill="#3b82f6" />
                  <text x="310" y="65" fontSize="6.5" fill="#475569" textAnchor="middle" fontWeight="bold">Tokyo</text>
                </g>

                {/* 5. Sydney / Australia */}
                <g className="cursor-pointer group/node">
                  <circle cx="340" cy="140" r="3" fill="#3b82f6" />
                  <text x="340" y="133" fontSize="6.5" fill="#475569" textAnchor="middle" fontWeight="bold">Sydney</text>
                </g>

                {/* Grid latitude lines */}
                <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="5,5" />
                <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="5,5" />
                <line x1="0" y1="150" x2="400" y2="150" stroke="#f1f5f9" strokeWidth="0.5" strokeDasharray="5,5" />
              </svg>
              
              <div className="absolute bottom-2 left-2 p-2 bg-white/95 border border-slate-200 rounded-lg text-[9px] text-slate-500 font-mono space-y-0.5 shadow-sm">
                <span className="text-amber-700 block font-bold">Integrazione Storica Isola NING</span>
                <span>• Europa Centrale: 85k membri</span>
                <span>• USA / Americhe: 35k membri</span>
                <span>• Asia & Africa: 22k membri</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right pane: New Migration Request Form */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Mail className="text-blue-600" size={20} />
            <h3 className="text-base font-display font-bold text-slate-900 uppercase">Richiedi l'Importazione Manuale</h3>
          </div>

          <p className="text-slate-600 text-xs leading-relaxed mb-4 font-sans">
            Se non hai trovato la tua email nell'archivio rapido, inserisci i dati della tua vecchia attività (Pagine Facebook, account Instagram, iscritti Ning o indirizzi mail salvati). Lo staff verificherà lo storico ed integrerà il tuo status nel portale della fondazione, conservando la priorità sulle tue creazioni.
          </p>

          <form onSubmit={handleClaimSubmit} className="space-y-4" id="request-import-form">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                Nome e Cognome
              </label>
              <input
                type="text"
                required
                placeholder="Esempio: Dott. Mario Bianchi"
                value={claimForm.name}
                onChange={(e) => setClaimForm({ ...claimForm, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                  Email Attuale di Contatto
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={claimForm.email}
                  onChange={(e) => setClaimForm({ ...claimForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                  Vecchio Social / Canale
                </label>
                <select
                  value={claimForm.platform}
                  onChange={(e) => setClaimForm({ ...claimForm, platform: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-705 focus:outline-none focus:border-blue-500"
                >
                  <option value="NING">Piattaforma NING (Celestial Opera)</option>
                  <option value="Facebook">Pagine Facebook (10 Fan Pages)</option>
                  <option value="Instagram">Instagram (@montecarloarts ecc.)</option>
                  <option value="YouTube">YouTube Videos / Canale</option>
                  <option value="Other">Altro Archivio / Associazione</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                Vecchio Username / Email Storica / Nome Canale
              </label>
              <input
                type="text"
                required
                placeholder="Es. celestial_mario77"
                value={claimForm.oldUsername}
                onChange={(e) => setClaimForm({ ...claimForm, oldUsername: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-sans"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 font-mono">
                Dettagli per la Curation (Opzionale)
              </label>
              <textarea
                rows={3}
                placeholder="Specifica se hai opere o brevetti esposti nell'Opera Celeste che desideri spostare nel nuovo Polo Museale..."
                value={claimForm.message}
                onChange={(e) => setClaimForm({ ...claimForm, message: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500 leading-normal font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[98%] cursor-pointer disabled:opacity-50 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  Verifica in corso nel database...
                </>
              ) : (
                <>
                  <Send size={14} />
                  Verifica ed Invia Richiesta di Unione
                </>
              )}
            </button>

            {claimSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-start gap-2 animate-fadeIn" id="claim-success-banner">
                <CheckCircle2 size={16} className="text-green-505 mt-0.5 flex-shrink-0" />
                <span>{claimSuccess}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

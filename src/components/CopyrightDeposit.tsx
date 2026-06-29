/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CreditCard, ShieldAlert, Award, Heart, Shield, ShieldCheck, Landmark, Flame, CheckCircle, FileText, Printer, Sparkles, HelpCircle, Coins, Briefcase } from 'lucide-react';

const DEPOSIT_SECTIONS = [
  { id: 'A', name: "A) Arte Bidimensionale" },
  { id: 'B', name: "B) Arte Tridimensionale" },
  { id: 'C', name: "C) Design & Architettura" },
  { id: 'D', name: "D) Biblioteca Virtuale" },
  { id: 'E', name: "E) Regia e Spettacolo" },
  { id: 'F', name: "F) Musica e Composizioni" },
  { id: 'G', name: "G) Invenzioni e Brevetti" },
  { id: 'H', name: "H) Filosofia e Benessere" }
];

const DEPOSIT_SUBSECTIONS = [
  // A
  { id: 'A1', sectionId: 'A', name: 'A1 - Disegno e Pittura manuali (olio, acquerello, tempera, affresco ecc.)' },
  { id: 'A2', sectionId: 'A', name: 'A2 - Pittura Multimediale (tecniche manuali e digitali)' },
  { id: 'A3', sectionId: 'A', name: 'A3 - Fotografia manuale e digitale' },
  // B
  { id: 'B1', sectionId: 'B', name: 'B1 - Scultura e tecniche incisorie manuali' },
  { id: 'B2', sectionId: 'B', name: 'B2 - Scultura Multimediale e installazioni contemporanee' },
  // C
  { id: 'C1', sectionId: 'C', name: 'C1 - Design di oggetti di uso comune (reale/virtuale)' },
  { id: 'C2', sectionId: 'C', name: 'C2 - Design architettonico di città e strutture abitative (lavoro/svago)' },
  { id: 'C3', sectionId: 'C', name: 'C3 - Design dei mezzi di trasporto (reale/virtuale)' },
  { id: 'C4', sectionId: 'C', name: 'C4 - Arte AI, intelligenza artificiale' },
  // D
  { id: 'D1', sectionId: 'D', name: 'D1 - Creazioni letterarie (romanzi, saggistica, racconti, poesie)' },
  { id: 'D2', sectionId: 'D', name: 'D2 - Pubblicazione e lettura interi libri editoria esordienti/affermati' },
  { id: 'D3', sectionId: 'D', name: 'D3 - Archivio storico e biblioteca della Fondazione' },
  // E
  { id: 'E1', sectionId: 'E', name: 'E1 - Testi di commedie teatrali e cinematografiche' },
  { id: 'E2', sectionId: 'E', name: 'E2 - Visione video clip e corti cinematografici' },
  { id: 'E3', sectionId: 'E', name: 'E3 - Danza e coreografie' },
  // F
  { id: 'F1', sectionId: 'F', name: 'F1 - Testi canzoni, melodie, sinfonie e opere liriche' },
  { id: 'F2', sectionId: 'F', name: 'F2 - Ascolto brani musicali e video-musicali' },
  { id: 'F3', sectionId: 'F', name: 'F3 - Convegni, conferenze e premi Fondazione Falace' },
  // G
  { id: 'G1', sectionId: 'G', name: 'G1 - Invenzioni artistiche e scientifiche' },
  { id: 'G2', sectionId: 'G', name: 'G2 - Scoperte scientifiche e brevetti depositati' },
  { id: 'G3', sectionId: 'G', name: 'G3 - Invenzioni su fonti rinnovabili (solare, eolica, magnetica ecc.)' },
  { id: 'G4', sectionId: 'G', name: 'G4 - Brevetti e Marchi in qualsiasi settore d\'ingegno' },
  // H
  { id: 'H1', sectionId: 'H', name: 'H1 - Tecniche del Benessere – Discipline Filosofiche' },
  { id: 'H2', sectionId: 'H', name: 'H2 - Innovazioni Materiali per il Benessere (Macchinari/Idee)' },
  { id: 'H3', sectionId: 'H', name: 'H3 - Innovazioni Mentali (Musicoterapia, Cromoterapia, Yoga)' },
  { id: 'H4', sectionId: 'H', name: 'H4 - Arti mediche, medicine unite e discipline Olistiche' }
];

export default function CopyrightDeposit() {
  const [activeSubTab, setActiveSubTab] = useState<'crowdfund' | 'grants'>('crowdfund');

  const [fundingGoal] = useState(250000); // 250k EUR target for Foundation status
  const [currentFunding, setCurrentFunding] = useState(184320); // current crowdfunding sum
  const [donorsCount, setDonorsCount] = useState(3840);

  // checkout form state
  const [selectedPlan, setSelectedPlan] = useState<'accessi' | 'annuale' | 'sostenitore' | null>(() => {
    return (localStorage.getItem('aic_draft_deposit_selectedPlan') as any) || null;
  });
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('aic_draft_deposit_form');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      fullName: '',
      email: '',
      workTitle: '',
      selectedSection: 'A',
      selectedSubsection: 'A1',
      cardNumber: '4242 •••• •••• 4242',
      notes: ''
    };
  });
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false);
  const [generatedReceipt, setGeneratedReceipt] = useState<any | null>(null);

  // Auto-save listener on trigger
  useEffect(() => {
    const handleGlobalAutoSave = () => {
      if (formData.fullName || formData.email || formData.workTitle || selectedPlan) {
        localStorage.setItem('aic_draft_deposit_form', JSON.stringify(formData));
        if (selectedPlan) {
          localStorage.setItem('aic_draft_deposit_selectedPlan', selectedPlan);
        }
      }
    };
    window.addEventListener('aic-trigger-autosave', handleGlobalAutoSave);
    return () => {
      window.removeEventListener('aic-trigger-autosave', handleGlobalAutoSave);
    };
  }, [formData, selectedPlan]);

  // Grant matcher wizard state
  const [grantSector, setGrantSector] = useState<'arte' | 'digital' | 'libri' | 'wellness'>('arte');
  const [grantInovType, setGrantInovType] = useState<'local' | 'europe'>('europe');
  const [hasSufficientLegacy, setHasSufficientLegacy] = useState<boolean>(true);
  const [grantStatusMessage, setGrantStatusMessage] = useState<any | null>(null);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    const price = selectedPlan === 'accessi' ? 10 : selectedPlan === 'annuale' ? 50 : 250;
    const planName = selectedPlan === 'accessi' ? 'Cento Accessi (Tessera Password)' : selectedPlan === 'annuale' ? 'Quota Associativa Annuale' : 'Donazione Libera Sostenitore';

    const subObj = DEPOSIT_SUBSECTIONS.find(sub => sub.id === formData.selectedSubsection);
    const subLabel = subObj ? subObj.name : formData.selectedSubsection;

    const mockReceipt = {
      receiptNumber: `AIC-REC-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('it-IT') + ' - ' + new Date().toLocaleTimeString('it-IT'),
      name: formData.fullName,
      email: formData.email,
      item: planName,
      price: price,
      stampHash: '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      priorityToken: `AIC-PRI-${Math.floor(100000 + Math.random() * 900000)}`,
      selectedSubsection: subLabel,
      workTitle: formData.workTitle || "Deposito Generico l'Opera Celeste"
    };

    setTimeout(() => {
      setGeneratedReceipt(mockReceipt);
      setPaymentComplete(true);
      
      // Clear drafts on successful payment
      localStorage.removeItem('aic_draft_deposit_form');
      localStorage.removeItem('aic_draft_deposit_selectedPlan');

      setCurrentFunding(prev => prev + price);
      setDonorsCount(prev => prev + 1);
    }, 1200);
  };

  const handleGrantCheck = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Core grant matching logic
    let score = 65;
    let grantName = '';
    let grantDesc = '';
    let maxFunding = '';
    let difficulty = 'Media';

    if (grantSector === 'arte') {
      if (grantInovType === 'europe') {
        score = 88;
        grantName = "Europa Creativa (Sezione Cultura) - Progetti di Cooperazione";
        grantDesc = "Finanzia reti transnazionali, mostre digitali itineranti e la valorizzazione del patrimonio intangibile. Perfetto per l'estensione di HUMANA HUB AIC e la collaborazione con accademie straniere.";
        maxFunding = "Fino a €1.000.000 (Tasso co-finanziamento 60-80%)";
        difficulty = "Alta";
      } else {
        score = 75;
        grantName = "Bando Periferie d'Arte e Rigenerazione Culturale (Regionale)";
        grantDesc = "Contributi pubblici a fondo perduto per la promozione dell'accessibilità digitale museale. Ottimo per la digitalizzazione di opere d'arte d'avanguardia.";
        maxFunding = "Fino a €150.000 (80% fondo perduto)";
        difficulty = "Media-Bassa";
      }
    } else if (grantSector === 'digital') {
      if (grantInovType === 'europe') {
        score = 92;
        grantName = "Horizon Europe (Cluster II: Culture, Creativity and Inclusive Society)";
        grantDesc = "Finanziamenti elevati per progetti di ricerca tecnologica applicata alla cultura, bioarchitettura sferica (come il Brain Symmetrical Building di Luca Falace) e lo sviluppo di tute brevettate autogeneratrici.";
        maxFunding = "Fino a €3.000.000 (100% dei costi ammissibili)";
        difficulty = "Altissima (Richiede consorzio internazionale)";
      } else {
        score = 85;
        grantName = "PNRR - Transizione Digitale Organismi Culturali e Creativi (TOCC)";
        grantDesc = "Misure statali mirate a favorire l'innovazione tecnologica ed ecologica degli operatori delle arti figurative e del design sostenibile. Si rivolge a fondazioni e associazioni con brevetti.";
        maxFunding = "Fino a €75.000 (80% a fondo perduto)";
        difficulty = "Media";
      }
    } else if (grantSector === 'libri') {
      score = hasSufficientLegacy ? 95 : 70;
      grantName = "CE-I-2026: Sostegno alla Circolazione di Opere Letterarie Europee";
      grantDesc = "Finanziamenti per la traduzione, pubblicazione e promozione di pacchetti di opere di narrativa e saggistica di alta valenza filosofica. Considerati i 41+ libri ISBN della Fondazione Falace, il punteggio di conformità è massimo.";
      maxFunding = "Fino a €100.000 (Co-finanziamento al 60%)";
      difficulty = "Bassa (Requisiti di catalogo superati)";
    } else { // wellness / therapy
      score = 82;
      grantName = "Bando Salute e Benessere Integrato (Fondazioni Bancarie Associate)";
      grantDesc = "Finanzia lo sviluppo di progetti pilota per la musicoterapia e la cromoterapia terapeutica a 432Hz in sinergia con cliniche d'assistenza. Perfetto per la nostra Biennale della Salute.";
      maxFunding = "Fino a €80.000 (100% a fondo perduto)";
      difficulty = "Bassa";
    }

    if (hasSufficientLegacy) {
      score += 5; // boost due ai pre-existing assets
    }
    score = Math.min(score, 99);

    setGrantStatusMessage({
      score,
      name: grantName,
      description: grantDesc,
      funding: maxFunding,
      difficulty,
      approvazioneLegale: score > 80 ? "Pre-approvato dal CLO Avv. De Juliis per robustezza dei requisiti storici." : "Richiede rimodulazione dell'idea statutaria per l'invio."
    });
  };

  const fundingPercent = Math.min(Math.round((currentFunding / fundingGoal) * 105) / 105 * 100, 100);
  const roundedPercent = Math.round(fundingPercent);

  return (
    <div className="py-6 space-y-10" id="copyright-deposit-root">
      
      {/* Title */}
      <div className="text-center">
        <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs rounded-full font-mono uppercase tracking-widest font-bold">
          Fase A: Servizi Operativi e Finanziamento Statutario
        </span>
        <h2 className="text-3xl font-display font-medium text-slate-900 tracking-tight mt-3 font-bold">
          HUMANA HUB AIC - Servizi, Certificazioni e Bandi
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto mt-2 text-sm leading-relaxed font-sans">
          Il braccio operativo internazionale della <strong>Fondazione Falace delle AIC</strong> dedicato alla tutela, certificazione a data certa e identificazione di fondi pubblici/europei.
        </p>
      </div>

      {/* Sub-tab switcher to choose between Crowdfunding/Services and Grant Advisory */}
      <div className="flex border border-slate-200 text-xs font-semibold tracking-wider max-w-2xl mx-auto justify-center bg-slate-50 p-1.5 rounded-full">
        <button
          onClick={() => { setActiveSubTab('crowdfund'); setGrantStatusMessage(null); }}
          className={`flex-1 py-1.5 px-4 rounded-full text-center transition-all cursor-pointer ${
            activeSubTab === 'crowdfund' 
              ? 'bg-amber-500 text-white font-bold shadow-xs' 
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Quota Associativa & Data Certa
        </button>
        <button
          onClick={() => setActiveSubTab('grants')}
          className={`flex-1 py-1.5 px-4 rounded-full text-center transition-all cursor-pointer ${
            activeSubTab === 'grants' 
              ? 'bg-amber-500 text-white font-bold shadow-xs' 
              : 'text-slate-605 hover:text-slate-900'
          }`}
        >
          Consultazione Bandi Pubblici & UE
        </button>
      </div>

      {activeSubTab === 'crowdfund' ? (
        <>
          {/* Crowdfunding Tracker Bar */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="p-6 rounded-[2rem] bg-white border border-slate-200 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-slate-500 font-mono flex items-center gap-1.5">
                    <Flame className="text-amber-500 animate-pulse" size={14} /> Fondo Strumentale per la Fondazione Falace
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-mono font-bold text-slate-900">€{currentFunding.toLocaleString()}</span>
                    <span className="text-sm text-slate-500 font-mono">di €{fundingGoal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="bg-amber-50 border border-amber-205 px-4 py-2 rounded-2xl text-right">
                  <span className="text-xs font-mono font-semibold block text-amber-705">Stato Avanzamento</span>
                  <span className="text-xl font-mono font-bold text-slate-900">{roundedPercent}% Sostenuto</span>
                </div>
              </div>

              {/* Graphical progress bar */}
              <div className="w-full bg-slate-105 h-4 rounded-full overflow-hidden border border-slate-200 p-0.5">
                <div 
                  style={{ width: `${roundedPercent}%` }}
                  className="bg-gradient-to-r from-amber-400 via-amber-500 to-red-500 h-full rounded-full transition-all duration-1000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-center border-t border-slate-100 text-xs font-mono text-slate-600">
                <div className="p-2">
                  <span className="text-gray-400 block uppercase text-[9px] font-bold">Donatori Attivi</span>
                  <strong className="text-slate-900 text-base">{donorsCount} Sostenitori</strong>
                </div>
                <div className="p-2 border-y sm:border-y-0 sm:border-x border-slate-100">
                  <span className="text-gray-400 block uppercase text-[9px] font-bold">Fondo di Dotazione</span>
                  <strong className="text-slate-900 text-base">Inalienabile</strong>
                </div>
                <div className="p-2">
                  <span className="text-gray-400 block uppercase text-[9px] font-bold">Trasparenza Fiscale</span>
                  <strong className="text-green-700 text-base">Contrasto Plagio</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto px-4" id="checkout-container">
            {/* Left side: Payment choices & card details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-sm font-display font-medium text-slate-905 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Coins className="text-amber-500" size={17} /> Scegli il tuo Livello di Supporto
                  </h3>
                  <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                    Le contribuzioni vengono impiegate per blindare la Data Certa ed espandere il catalogo scientifico delle AIC.
                  </p>
                </div>

                {/* Simulated Plans */}
                <div className="space-y-3">
                  <div 
                    onClick={() => { setSelectedPlan('accessi'); setPaymentComplete(false); }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedPlan === 'accessi' 
                        ? 'border-blue-500 bg-blue-50/50' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-900 block leading-tight">Tessera Visitatore Password</span>
                      <p className="text-[10px] text-slate-500 font-sans leading-normal">
                        Costo €10. Ricevi una parola-chiave per 100 accessi espositivi rinnovabili.
                      </p>
                    </div>
                    <span className="text-sm font-mono font-black text-blue-600">€ 10</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedPlan('annuale'); setPaymentComplete(false); }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedPlan === 'annuale' 
                        ? 'border-amber-500 bg-amber-50/20' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-900 block leading-tight">Quota Associativa Annuale (Membro Effettivo)</span>
                      <p className="text-[10px] text-slate-505 font-sans leading-normal">
                        Sconto 15% sui depositi. Supporto per la compilazione di bandi pubblici e data certa prioritaria.
                      </p>
                    </div>
                    <span className="text-sm font-mono font-black text-amber-700">€ 50</span>
                  </div>

                  <div 
                    onClick={() => { setSelectedPlan('sostenitore'); setPaymentComplete(false); }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex justify-between items-center ${
                      selectedPlan === 'sostenitore' 
                        ? 'border-red-500 bg-red-50/10' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/40'
                    }`}
                  >
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-slate-900 block leading-tight">Donazione Libera Sostenitore Fondatore</span>
                      <p className="text-[10px] text-slate-500 font-sans leading-normal">
                        Tethering accademico. Diritto a inserire la propria dicitura d'elogio in calce al portale AIC.
                      </p>
                    </div>
                    <span className="text-sm font-mono font-black text-red-650">€ 250</span>
                  </div>
                </div>

                {/* Interactive Checkout Form */}
                {selectedPlan && (
                  <form onSubmit={handlePayment} className="space-y-3 pt-2 text-xs animate-fadeIn" id="simulated-payment-form">
                    <div className="border-t border-slate-100 pt-3">
                      <h4 className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest mb-2">Simulatore Contribuzione Sicura</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Nome sul Documento</label>
                        <input 
                          type="text" 
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                          placeholder="Luca Falace" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-sans" 
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Email Ricevuta</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="luca@falace.it" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-sans" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1 font-mono">Macro-Sezione di Riferimento</label>
                        <select
                          value={formData.selectedSection}
                          onChange={(e) => {
                            const sec = e.target.value;
                            const firstSub = DEPOSIT_SUBSECTIONS.find(sub => sub.sectionId === sec)?.id || '';
                            setFormData({...formData, selectedSection: sec, selectedSubsection: firstSub});
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-sans text-[11px]"
                        >
                          {DEPOSIT_SECTIONS.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1 font-mono font-bold">Pratica Specifica (Sottosezione)</label>
                        <select
                          value={formData.selectedSubsection}
                          onChange={(e) => setFormData({...formData, selectedSubsection: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-sans text-[10px]"
                        >
                          {DEPOSIT_SUBSECTIONS.filter(sub => sub.sectionId === formData.selectedSection).map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Titolo dell'Opera da Depositare (Opzionale)</label>
                      <input 
                        type="text" 
                        value={formData.workTitle}
                        onChange={(e) => setFormData({...formData, workTitle: e.target.value})}
                        placeholder="Es: Formula del Motore Piezoelettrico 2026" 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-blue-500 font-sans" 
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] font-bold text-gray-500 uppercase mb-1">Carta Credito Simulata (Sandbox)</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-2 text-slate-400" size={14} />
                        <input 
                          type="text" 
                          required
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 focus:outline-none focus:border-blue-500 font-mono text-[11px]" 
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-slate-900 text-white hover:bg-slate-800 transition-colors font-bold rounded-xl"
                    >
                      Invia Contributo Sicuro No-Profit
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right side: Payment status / interactive receipt */}
            <div className="lg:col-span-5">
              {paymentComplete && generatedReceipt ? (
                /* Print receipt layout */
                <div id="receipt-box-card" className="bg-white border border-dashed border-amber-300 p-6 rounded-3xl space-y-4 animate-fadeIn shadow-xs font-mono text-xs text-slate-705">
                  <div className="text-center border-b border-slate-100 pb-3">
                    <CheckCircle className="text-green-600 mx-auto mb-1.5" size={24} />
                    <h4 className="font-bold text-slate-900 leading-none">RICEVUTA DI CONTRIBUZIONE</h4>
                    <span className="text-[9px] text-gray-400 block mt-1">FONDAZIONE FALACE - HUMANA HUB AIC</span>
                  </div>

                  <div className="space-y-1.5 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Ricevuta N.:</span>
                      <span className="text-slate-900 font-bold">{generatedReceipt.receiptNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Data e Ora:</span>
                      <span className="text-slate-800">{generatedReceipt.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sostenitore:</span>
                      <span className="text-slate-900 font-bold">{generatedReceipt.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Destinazione:</span>
                      <span className="text-slate-950 font-bold bg-amber-50 px-1 rounded">{generatedReceipt.item}</span>
                    </div>
                    {generatedReceipt.selectedSubsection && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Classificazione AIC:</span>
                        <span className="text-blue-700 font-semibold text-[9px] text-right max-w-[180px] leading-tight block">{generatedReceipt.selectedSubsection}</span>
                      </div>
                    )}
                    {generatedReceipt.workTitle && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Diritto d'autore:</span>
                        <span className="text-amber-800 font-semibold">{generatedReceipt.workTitle}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base border-t border-slate-100 pt-2 text-slate-900 font-bold">
                      <span>Importo:</span>
                      <span>€ {generatedReceipt.price},00</span>
                    </div>
                  </div>

                  {/* Legal timestamp stamp */}
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[8px] font-bold text-green-700 block uppercase">✓ DATA CERTA CODIFICATA (O.l.a.f. compl.)</span>
                    <p className="text-[8px] text-slate-500 leading-none truncate font-mono">Hash: {generatedReceipt.stampHash}</p>
                    <p className="text-[8px] text-slate-550 leading-none font-mono">Token Priority: <strong>{generatedReceipt.priorityToken}</strong></p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="flex-1 py-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-705 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Printer size={12} />
                      Stampa Ricevuta
                    </button>
                    <button
                      onClick={() => { setPaymentComplete(false); setSelectedPlan(null); }}
                      className="px-3 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl transition-colors cursor-pointer"
                    >
                      Nuovo Deposito
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl text-center h-full flex flex-col justify-center items-center py-10">
                  <ShieldCheck className="text-blue-500 mb-2" size={32} />
                  <h4 className="text-slate-800 font-bold text-sm">Fase A : Tutela e Deposito Internazionale</h4>
                  <p className="text-[11px] text-slate-500 font-sans max-w-xs mt-1.5 leading-relaxed">
                    Seleziona un'opzione ed inserisci i tuoi dati nel modulo. Il sistema simulerà il tesseramento, la data certa e produrrà la ricevuta firmata digitalmente con marca temporale prioritaria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        /* Grant Advisory & Matching Wizard */
        <div className="max-w-4xl mx-auto px-4 space-y-6 animate-fadeIn" id="grant-advisory-block">
          <div className="bg-white border border-slate-300 p-6 rounded-[2rem] shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={20} />
              <div>
                <h3 className="text-sm font-display font-medium text-slate-900 uppercase tracking-wider font-bold">
                  Bandi Pubblici & UE Matcher (Strumento d'Advisory)
                </h3>
                <p className="text-xs text-slate-500 font-sans mt-0.5">
                  Verifica l'eleggibilità del tuo progetto rispetto alle linee di contributo 2026 della Fondazione Falace.
                </p>
              </div>
            </div>

            <form onSubmit={handleGrantCheck} className="space-y-4 text-xs text-slate-700 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sector Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Settore d'Ingegno dell'Idea
                  </label>
                  <select
                    value={grantSector}
                    onChange={(e: any) => setGrantSector(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-sans"
                  >
                    <option value="arte">Arte Figurativa (Bidimensionale/Tridimensionale)</option>
                    <option value="digital">Design Tecnologico & Brevetti (Eco-Thermodynamic Suit)</option>
                    <option value="libri">Saggistica d'Autore & Opere con ISBN</option>
                    <option value="wellness">Cromoterapia / Musicoterapia a 432Hz</option>
                  </select>
                </div>

                {/* Scope Selector */}
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Ambito Territoriale dello Studio
                  </label>
                  <select
                    value={grantInovType}
                    onChange={(e: any) => setGrantInovType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 font-sans"
                  >
                    <option value="local">Nazionale / Regionale (PNRR TOCC / Fondi Italiani)</option>
                    <option value="europe">Europeo ed Internazionale (Europa Creativa / Horizon)</option>
                  </select>
                </div>
              </div>

              {/* Toggle checklist switch */}
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-150">
                <input
                  type="checkbox"
                  id="hasLegacyCheck"
                  checked={hasSufficientLegacy}
                  onChange={(e) => setHasSufficientLegacy(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-200 rounded"
                />
                <label htmlFor="hasLegacyCheck" className="text-[11px] text-slate-650 cursor-pointer select-none">
                  L'idea è integrata o supportata dal corpus storico delle Attività Intellettive Creative (AIC) del Dott. Falace? (Fornisce un forte incremento di punteggio legatario)
                </label>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold hover:glow-text-gold rounded-xl transition-all shadow-xs"
                >
                  Analizza Idoneità & Genera Match
                </button>
              </div>
            </form>

            {/* Simulated output matching box */}
            {grantStatusMessage && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-fadeIn text-slate-700 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono tracking-widest text-[#b48a21] font-bold uppercase block">BANDO PUBLICO SCOVATO</span>
                    <h4 className="text-sm font-display font-bold text-slate-900 leading-tight">
                      {grantStatusMessage.name}
                    </h4>
                  </div>

                  <div className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 text-xs font-mono font-bold rounded-lg shrink-0 text-center">
                    Match Score: {grantStatusMessage.score}%
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="leading-relaxed font-sans">{grantStatusMessage.description}</p>
                  
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-[11px] pt-1">
                    <span className="text-slate-600">
                      <strong>Finanziamento:</strong> <span className="text-slate-900 font-semibold">{grantStatusMessage.funding}</span>
                    </span>
                    <span className="text-slate-605">
                      <strong>Complessità:</strong> <span className="text-slate-900 font-semibold">{grantStatusMessage.difficulty}</span>
                    </span>
                  </div>

                  <div className="mt-3 p-3 bg-blue-10/50 rounded-xl border border-blue-50/50 text-[11px] flex gap-2 items-center text-blue-900">
                    <Shield size={12} className="text-blue-600 flex-shrink-0" />
                    <span className="font-sans leading-none">{grantStatusMessage.approvazioneLegale}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Lock, Shield, CheckCircle, AlertCircle, LogOut, Key, 
  RefreshCw, Edit3, Save, Globe, Phone, Award, Sliders, X, 
  ExternalLink, UserCheck, Check, Database, Users, Fingerprint
} from 'lucide-react';
import { SECTION_LITERALS, SUBSECTION_LITERALS } from './SocialHub';

// Default avatars list to give a polished selection experience
const AVATARS = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
];

// Seed some initial registered profiles representing an academic directory
const SEED_USERS = [
  {
    userId: "aic-auth-seed-01",
    fullName: "Luca Falace",
    email: "sincronismocreativo@gmail.com",
    selectedSection: "A",
    selectedSubsection: "A1",
    avatarUrl: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    biography: "Professore e teorico del Sincronismo Creativo nell'Arte Universale.",
    specialization: "Pittura Circolare e Sferica",
    phoneNumber: "+39 333 445 5666",
    webLink: "https://lucafalace.it",
    type: "autore",
    password: "Password123!",
    isVerified: true,
    academicToken: "AIC-MEMBER-FALACE-1998",
    createdAt: "2026-01-01T12:00:00Z"
  },
  {
    userId: "aic-auth-seed-02",
    fullName: "Clara Montecarlo",
    email: "clara.monte@academia.it",
    selectedSection: "A",
    selectedSubsection: "A2",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    biography: "Critica d'arte e curatrice di esposizioni internazionali.",
    specialization: "Arte Sacra Contemporanea",
    phoneNumber: "+39 347 123 4567",
    webLink: "https://claramontecritic.org",
    type: "autore",
    password: "Password123!",
    isVerified: true,
    academicToken: "AIC-MEMBER-CLARA-2024",
    createdAt: "2026-03-15T09:30:00Z"
  }
];

interface UserProfileManagerProps {
  onSessionChanged?: (user: any) => void;
  onClose?: () => void;
}

export default function UserProfileManager({ onSessionChanged, onClose }: UserProfileManagerProps) {
  // Navigation tabs
  type TabType = 'login' | 'register' | 'profile' | 'directory';
  const [activeTab, setActiveTab] = useState<TabType>('login');

  // Directory users list (including seeds and users registered on-the-fly)
  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('aic_registered_users_db');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    // Set seed users if none exist
    localStorage.setItem('aic_registered_users_db', JSON.stringify(SEED_USERS));
    return SEED_USERS;
  });

  // Current session values
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const savedAut = localStorage.getItem('aic_social_user');
    const savedVis = localStorage.getItem('aic_visitor_pass');
    if (savedAut) {
      try { return { ...JSON.parse(savedAut), type: 'autore' }; } catch(e){}
    } else if (savedVis) {
      try { return { ...JSON.parse(savedVis), type: 'visitatore' }; } catch(e){}
    }
    return null;
  });

  // Form states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);

  // Register Form states
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    selectedSection: 'A',
    selectedSubsection: 'A1',
    biography: '',
    specialization: '',
    phoneNumber: '',
    webLink: '',
    avatarUrl: AVATARS[0],
    type: 'autore'
  });
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);

  // Profile Edit states
  const [editForm, setEditForm] = useState<any>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [updateSuccess, setUpdateSuccess] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Switch to correct tab depending on whether user is logged in
  useEffect(() => {
    if (currentUser) {
      setActiveTab('profile');
      setEditForm({ ...currentUser });
    } else {
      setActiveTab('login');
    }
  }, [currentUser]);

  // Sync users database changes
  const saveUsersDb = (newDb: any[]) => {
    setRegisteredUsers(newDb);
    localStorage.setItem('aic_registered_users_db', JSON.stringify(newDb));
  };

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginSuccess(null);

    if (!loginEmail || !loginPassword) {
      setLoginError('Inserisci tutti i campi richiesti.');
      return;
    }

    // Authenticate user check
    const matched = registeredUsers.find(
      u => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword
    );

    if (matched) {
      setLoginSuccess(`Benvenuto ${matched.fullName}!`);
      const userSession = {
        userId: matched.userId,
        fullName: matched.fullName,
        email: matched.email,
        selectedSection: matched.selectedSection,
        selectedSubsection: matched.selectedSubsection,
        avatarUrl: matched.avatarUrl || AVATARS[0],
        biography: matched.biography || '',
        specialization: matched.specialization || '',
        phoneNumber: matched.phoneNumber || '',
        webLink: matched.webLink || '',
        type: matched.type || 'autore',
        academicToken: matched.academicToken || `AIC-AUTH-FALACE-${Math.floor(1000 + Math.random() * 9000)}`,
        isVerified: matched.isVerified || false,
        createdAt: matched.createdAt || new Date().toISOString()
      };

      if (userSession.type === 'visitatore') {
        localStorage.setItem('aic_visitor_pass', JSON.stringify(userSession));
        localStorage.setItem('aic_visitor_password', userSession.academicToken);
        localStorage.setItem('aic_visitor_access_count', '100');
      } else {
        localStorage.setItem('aic_social_user', JSON.stringify(userSession));
      }

      setCurrentUser(userSession);
      onSessionChanged?.(userSession);
      
      // Dispatch custom sync event
      window.dispatchEvent(new CustomEvent('aic-auth-sync', { detail: userSession }));
    } else {
      setLoginError('Credenziali non corrette. Controlla email e password.');
    }
  };

  // Register handler
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    setRegisterSuccess(null);

    const { 
      fullName, email, password, confirmPassword, selectedSection, 
      selectedSubsection, biography, specialization, phoneNumber, webLink, avatarUrl, type 
    } = registerForm;

    if (!fullName || !email || !password) {
      setRegisterError('I campi Nome, Email e Password sono obbligatori.');
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError('Le password inserite non coincidono.');
      return;
    }

    if (password.length < 6) {
      setRegisterError('La password deve contenere almeno 6 caratteri.');
      return;
    }

    // Duplicate check
    const exists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setRegisterError('Questo indirizzo email risulta già registrato.');
      return;
    }

    // Make new registration payload
    const newUserId = `aic-auth-${Math.floor(100000 + Math.random() * 900000)}`;
    const academicToken = `AIC-TOKEN-${Math.floor(100000 + Math.random() * 900000)}`;

    const newUserObj = {
      userId: newUserId,
      fullName,
      email,
      selectedSection,
      selectedSubsection,
      avatarUrl,
      biography,
      specialization,
      phoneNumber,
      webLink,
      type,
      password,
      isVerified: Math.random() > 0.4, // give some verification state simulated 
      academicToken,
      createdAt: new Date().toISOString()
    };

    const updatedDb = [...registeredUsers, newUserObj];
    saveUsersDb(updatedDb);

    setRegisterSuccess('Registrazione completata con successo! Ora puoi accedere.');
    
    // Clear registration fields but preserve email for fast login
    setLoginEmail(email);
    setRegisterForm({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      selectedSection: 'A',
      selectedSubsection: 'A1',
      biography: '',
      specialization: '',
      phoneNumber: '',
      webLink: '',
      avatarUrl: AVATARS[0],
      type: 'autore'
    });

    // Auto switch to login tab
    setTimeout(() => {
      setActiveTab('login');
    }, 1500);
  };

  // Update profile handler
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateError(null);
    setUpdateSuccess(null);

    if (!editForm.fullName) {
      setUpdateError('Il nome completo non può essere vuoto.');
      return;
    }

    // Sync in user db
    const updatedDb = registeredUsers.map(u => {
      if (u.userId === editForm.userId || u.email.toLowerCase() === editForm.email.toLowerCase()) {
        return {
          ...u,
          fullName: editForm.fullName,
          selectedSection: editForm.selectedSection,
          selectedSubsection: editForm.selectedSubsection,
          avatarUrl: editForm.avatarUrl,
          biography: editForm.biography,
          specialization: editForm.specialization,
          phoneNumber: editForm.phoneNumber,
          webLink: editForm.webLink
        };
      }
      return u;
    });

    saveUsersDb(updatedDb);

    // Save in session storage
    const updatedSession = { ...editForm };
    if (updatedSession.type === 'visitatore') {
      localStorage.setItem('aic_visitor_pass', JSON.stringify(updatedSession));
    } else {
      localStorage.setItem('aic_social_user', JSON.stringify(updatedSession));
    }

    setCurrentUser(updatedSession);
    onSessionChanged?.(updatedSession);

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('aic-auth-sync', { detail: updatedSession }));

    // Dispatch autosave trigger update
    window.dispatchEvent(new CustomEvent('aic-trigger-autosave', { 
      detail: { timestamp: new Date().toLocaleTimeString(), reason: 'profile-update' } 
    }));

    setUpdateSuccess('Informazioni personali e accademiche aggiornate con successo!');
    setTimeout(() => setUpdateSuccess(null), 3000);
  };

  // Simulating custom avatar file selection
  const handleSimulatedAvatarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        // Map to random avatar or a stunning unsplash portrait 
        const randomAvatars = [
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
        ];
        const selected = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
        
        if (activeTab === 'register') {
          setRegisterForm({ ...registerForm, avatarUrl: selected });
        } else if (editForm) {
          setEditForm({ ...editForm, avatarUrl: selected });
        }
        setIsUploading(false);
      }, 800);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('aic_social_user');
    localStorage.removeItem('aic_visitor_pass');
    localStorage.removeItem('aic_visitor_password');
    localStorage.removeItem('aic_visitor_access_count');
    
    setCurrentUser(null);
    setEditForm(null);
    onSessionChanged?.(null);

    // Sync other components
    window.dispatchEvent(new CustomEvent('aic-auth-sync', { detail: null }));
    
    setLoginSuccess('Sessione terminata e disconnessa.');
    setActiveTab('login');
  };

  // Quick preset loader to help user demo easily
  const handleQuickLoadSeed = (email: string) => {
    const seed = SEED_USERS.find(s => s.email === email);
    if (seed) {
      setLoginEmail(seed.email);
      setLoginPassword(seed.password);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl w-full mx-auto" id="user-management-center">
      {/* Visual Elegant Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white relative">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500 text-white rounded-lg text-xs flex items-center justify-center">
                <Shield size={16} />
              </span>
              <h2 className="text-sm font-mono uppercase tracking-wider font-bold">
                Sistema Gestione Account di Rete
              </h2>
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Archivio accademico internazionale centralizzato AIC.
            </p>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1 px-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all text-xs font-mono"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Dynamic scale counter representing physical performance */}
        <div className="absolute right-6 bottom-4 flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 px-2.5 py-1 rounded-full text-[9px] font-mono text-slate-350">
          <Database size={10} className="text-emerald-400" />
          <span>Indice Iscritti:</span>
          <span className="font-bold text-emerald-400">
            {(74211 + registeredUsers.length - SEED_USERS.length).toLocaleString('it-IT')}
          </span>
        </div>
      </div>

      {/* Internal Navigation Tabs */}
      <div className="flex border-b border-slate-100 bg-slate-50 p-1 gap-1">
        {!currentUser ? (
          <>
            <button
              onClick={() => setActiveTab('login')}
              className={`px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'login' 
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Key size={12} /> Accedi
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'register' 
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <UserCheck size={12} /> Registrati
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'profile' 
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sliders size={12} /> Profilo Personale
            </button>
            <button
              onClick={() => setActiveTab('directory')}
              className={`px-4 py-2 text-xs font-mono uppercase font-bold tracking-wider rounded-xl transition-all flex items-center gap-1.5 ${
                activeTab === 'directory' 
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Users size={12} /> Elenco Accademico ({registeredUsers.length})
            </button>
          </>
        )}
      </div>

      <div className="p-6">
        {/* TAB 1: LOGIN */}
        {activeTab === 'login' && (
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-display font-bold text-slate-900">Accedi al tuo Profilo AIC</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Autentica la tua identità di rete per gestire opere, accedere ai bandi di finanziamento della comunità ed aggiornare i tuoi dati.
                </p>
              </div>

              {loginError && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              {loginSuccess && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                  <CheckCircle size={14} className="shrink-0" />
                  <span>{loginSuccess}</span>
                </div>
              )}

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Email Accademica</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                      type="email"
                      required
                      placeholder="email@esempio.it"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider">Chiave d'Accesso (Password)</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 text-slate-400" size={14} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-black text-white font-mono font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xs shrink-0 flex items-center justify-center gap-2"
                >
                  <Fingerprint size={14} /> Autentica Credenziali
                </button>
              </form>
            </div>

            {/* Quick action helper sidebar */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3.5">
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold text-slate-900 uppercase">Demostrazione Rapida</h4>
                <p className="text-[11px] text-slate-500 leading-normal">
                  Clicca su uno dei profili accademici pre-registrati per caricare le chiavi d'accesso istantanee:
                </p>
              </div>

              <div className="space-y-2 pt-1 font-mono">
                {SEED_USERS.map(user => (
                  <button
                    key={user.userId}
                    onClick={() => handleQuickLoadSeed(user.email)}
                    type="button"
                    className="w-full text-left p-2.5 bg-white border border-slate-200 rounded-xl hover:border-blue-400 transition-all text-xs flex items-center gap-2.5"
                  >
                    <img src={user.avatarUrl} className="w-7 h-7 rounded-full object-cover border border-slate-200" alt="" />
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-800 truncate leading-none mb-1">{user.fullName}</div>
                      <div className="text-[9px] text-slate-500 truncate leading-none">{user.specialization}</div>
                    </div>
                    <span className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold uppercase">Carica</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTER */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <div className="space-y-1">
              <h3 className="text-base font-display font-bold text-slate-900">Registra un Nuovo Profilo Accademico</h3>
              <p className="text-xs text-slate-500">
                Inserisci i dati richiesti per configurare le tue credenziali crittografate. La bacheca e i commenti verranno allineati al tuo profilo.
              </p>
            </div>

            {registerError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-650 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            {registerSuccess && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                <CheckCircle size={14} className="shrink-0" />
                <span>{registerSuccess}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5 text-xs">
              {/* Left Column: Basic Auth Info */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Nome d'Arte / Pseudonimo *</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Dr. Franco Rossi"
                    value={registerForm.fullName}
                    onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Inquadramento Profilo *</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRegisterForm({ ...registerForm, type: 'autore' })}
                      className={`flex-1 py-1.5 rounded-lg border font-mono font-bold uppercase text-[9px] transition-all ${
                        registerForm.type === 'autore' 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Autore Creativo
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegisterForm({ ...registerForm, type: 'visitatore' })}
                      className={`flex-1 py-1.5 rounded-lg border font-mono font-bold uppercase text-[9px] transition-all ${
                        registerForm.type === 'visitatore' 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Visitatore
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Indirizzo Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@sezione.it"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="Min. 6 caratteri"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-0.5 pl-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Conferma *</label>
                    <input
                      type="password"
                      required
                      placeholder="Ripeti password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-0.5 pl-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                {/* Avatar select */}
                <div className="space-y-1.5">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Seleziona Avatar o Carica File</label>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5 overflow-x-auto py-1 no-scrollbar max-w-[200px]">
                      {AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setRegisterForm({ ...registerForm, avatarUrl: av })}
                          className={`shrink-0 rounded-full border-2 ${
                            registerForm.avatarUrl === av ? 'border-blue-600 scale-105' : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img src={av} className="w-7 h-7 rounded-full object-cover" alt="" />
                        </button>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">oppure</span>
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-bold">
                      {isUploading ? '...' : 'Sfoglia'}
                      <input type="file" accept="image/*" onChange={handleSimulatedAvatarFile} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Custom Professional Info representing scalableness */}
              <div className="space-y-3">
                {registerForm.type === 'autore' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Macro-Sezione d'Ingresso</label>
                        <select
                          value={registerForm.selectedSection}
                          onChange={(e) => {
                            const sec = e.target.value;
                            const firstSub = SUBSECTION_LITERALS.find(sub => sub.sectionId === sec)?.id || '';
                            setRegisterForm({ ...registerForm, selectedSection: sec, selectedSubsection: firstSub });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus:outline-none text-slate-800"
                        >
                          {SECTION_LITERALS.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Pratica Specifica</label>
                        <select
                          value={registerForm.selectedSubsection}
                          onChange={(e) => setRegisterForm({ ...registerForm, selectedSubsection: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus:outline-none text-slate-800"
                        >
                          {SUBSECTION_LITERALS.filter(s => s.sectionId === registerForm.selectedSection).map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Specializzazione Disciplinare</label>
                      <input
                        type="text"
                        placeholder="E.g., Estetica, Bioarchitettura, Filosofia"
                        value={registerForm.specialization}
                        onChange={(e) => setRegisterForm({ ...registerForm, specialization: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                      />
                    </div>
                  </>
                )}

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Contatto Telefonico (Opzionale)</label>
                  <input
                    type="tel"
                    placeholder="E.g., +39 333 444 5555"
                    value={registerForm.phoneNumber}
                    onChange={(e) => setRegisterForm({ ...registerForm, phoneNumber: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Sito Web o Link Accademico</label>
                  <input
                    type="url"
                    placeholder="https://mio-portfolio.org"
                    value={registerForm.webLink}
                    onChange={(e) => setRegisterForm({ ...registerForm, webLink: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Biografia di Rete o Presentazione</label>
                  <textarea
                    rows={2}
                    placeholder="Breve saggio o manifesto delle tue opere storiche..."
                    value={registerForm.biography}
                    onChange={(e) => setRegisterForm({ ...registerForm, biography: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 no-scrollbar"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-mono font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xs"
            >
              Crea Credenziali & Inserisci in Registro Accademico
            </button>
          </form>
        )}

        {/* TAB 3: PROFILE UPDATE & DETAIL VIEW */}
        {activeTab === 'profile' && editForm && (
          <form onSubmit={handleProfileUpdate} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-5 items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={editForm.avatarUrl} 
                    alt="Current Avatar" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-900"
                  />
                  <label className="absolute -bottom-1 -right-1 cursor-pointer bg-slate-900 border border-slate-700 text-white p-1 rounded-full text-[8px] hover:bg-black">
                    <Edit3 size={10} />
                    <input type="file" accept="image/*" onChange={handleSimulatedAvatarFile} className="hidden" />
                  </label>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-slate-900 font-display leading-none">{editForm.fullName}</h3>
                    {editForm.isVerified && (
                      <span className="text-blue-600" title="Profilo Verificato">
                        <CheckCircle size={14} fill="currentColor" className="text-white" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-bold uppercase">
                    {editForm.type === 'autore' ? 'Autore Accademico' : 'Visitatore Sostenitore'}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono font-medium max-w-[280px] truncate">
                    ID: {editForm.academicToken}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 rounded-xl text-xs font-mono font-bold flex items-center gap-1"
                >
                  <LogOut size={12} /> Esci
                </button>
              </div>
            </div>

            {updateError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                {updateError}
              </div>
            )}

            {updateSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700 flex items-center gap-2">
                <Check size={14} />
                <span>{updateSuccess}</span>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5 text-xs">
              <div className="space-y-3.5">
                <h4 className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider pb-1 border-b border-slate-100">
                  Anagrafica Personale
                </h4>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Nome d'Arte o Ragione Sociale</label>
                  <input
                    type="text"
                    required
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Indirizzo Email (Immutabile)</label>
                  <input
                    type="email"
                    disabled
                    value={editForm.email}
                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-400 font-mono select-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Numero di Telefono privato</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 text-slate-400" size={12} />
                    <input
                      type="tel"
                      value={editForm.phoneNumber || ''}
                      onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Link portfolio (Sito Web)</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 text-slate-400" size={12} />
                    <input
                      type="url"
                      value={editForm.webLink || ''}
                      onChange={(e) => setEditForm({ ...editForm, webLink: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column details */}
              <div className="space-y-3.5">
                <h4 className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider pb-1 border-b border-slate-100">
                  Settori Scientifici & Saggi
                </h4>

                {editForm.type === 'autore' ? (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Macro-Sezione</label>
                        <select
                          value={editForm.selectedSection}
                          onChange={(e) => {
                            const sec = e.target.value;
                            const firstSub = SUBSECTION_LITERALS.find(sub => sub.sectionId === sec)?.id || '';
                            setEditForm({ ...editForm, selectedSection: sec, selectedSubsection: firstSub });
                          }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus:outline-none text-slate-800"
                        >
                          {SECTION_LITERALS.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Pratica d'Ingresso</label>
                        <select
                          value={editForm.selectedSubsection}
                          onChange={(e) => setEditForm({ ...editForm, selectedSubsection: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-2 py-2 focus:outline-none text-slate-800"
                        >
                          {SUBSECTION_LITERALS.filter(s => s.sectionId === editForm.selectedSection).map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Competenza / Specializzazione</label>
                      <input
                        type="text"
                        value={editForm.specialization || ''}
                        onChange={(e) => setEditForm({ ...editForm, specialization: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none text-slate-800 font-sans"
                      />
                    </div>
                  </>
                ) : (
                  <div className="p-3 bg-blue-50/50 border border-slate-150 rounded-xl space-y-1">
                    <span className="font-mono font-bold text-[9px] text-blue-600 block">SUPPORTING MEMBER IN ALL SECTIONS</span>
                    <p className="text-[11px] text-slate-655 leading-relaxed font-sans">
                      Come visitatore sostenitore, hai accesso istantaneo alle sale museali e ai canali di commento per visionare capolavori.
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Biografia Storica (Curriculum / Studi)</label>
                  <textarea
                    rows={3}
                    value={editForm.biography || ''}
                    onChange={(e) => setEditForm({ ...editForm, biography: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 no-scrollbar font-sans"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-slate-900 border border-slate-850 hover:bg-black text-white font-mono font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Save size={14} /> Salva Modifiche Profilo
              </button>
            </div>
          </form>
        )}

        {/* TAB 4: DIRECTORY VIEWS - showing scale of users database */}
        {activeTab === 'directory' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="space-y-0.5">
                <h3 className="text-sm font-display font-bold text-slate-900">Albo Directory Accademico Sincronizzato</h3>
                <p className="text-[11px] text-slate-500 font-sans leading-none">
                  Elenco pubblico degli accademici registrati nel database internazionale centralizzato.
                </p>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-mono text-[9px] font-bold">
                {registeredUsers.length} Membri Attivi
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto no-scrollbar font-sans">
              {registeredUsers.map(u => {
                const sect = SECTION_LITERALS.find(s => s.id === u.selectedSection)?.title || 'Nessuna';
                return (
                  <div key={u.userId} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3 transition-all hover:bg-slate-100/50">
                    <img src={u.avatarUrl || AVATARS[0]} className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" alt="" />
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-slate-900 text-xs truncate leading-none">{u.fullName}</span>
                        {u.isVerified && (
                          <CheckCircle size={11} fill="currentColor" className="text-blue-600 text-white" />
                        )}
                      </div>
                      
                      {u.specialization && (
                        <div className="text-[10px] text-slate-600 font-medium truncate">
                          {u.specialization}
                        </div>
                      )}

                      <div className="text-[9px] text-slate-400 font-mono truncate">
                        Mail: <span className="text-slate-500 font-bold">{u.email}</span>
                      </div>

                      <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
                        <span className="bg-slate-150 text-slate-700 px-1.5 py-0.5 rounded text-[8px] font-mono leading-none">
                          Sezione {u.selectedSection || 'Tutt'}
                        </span>
                        
                        {u.webLink && (
                          <a 
                            href={u.webLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-[9px] font-mono flex items-center gap-0.5 leading-none shrink-0"
                          >
                            Portfolio <ExternalLink size={8} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Security Audit / Certificate Footer Badge */}
      <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Award className="text-slate-500" size={16} />
          <div className="space-y-0.5 text-left">
            <h4 className="text-[10px] font-mono font-bold text-slate-800 uppercase tracking-wide leading-none">
              Integrità Crittografica della Rete
            </h4>
            <p className="text-[9px] text-slate-550 leading-none">
              Connessione protetta via SHA-256 e sincronizzazione di sicurezza con standard GDPR compliant.
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-[9px] text-slate-400">
          <span>Stato Database:</span>
          <span className="text-emerald-600 font-bold ml-1">MONITORATO & SICURO (200 OK)</span>
        </div>
      </div>
    </div>
  );
}

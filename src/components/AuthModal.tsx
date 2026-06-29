import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { X, ShieldCheck, Mail, Lock, UserPlus, LogIn, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (!email || !password) {
      setError("Inserire email e password.");
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMsg("Account creato con successo! Ora sei connesso.");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMsg("Accesso effettuato con successo!");
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError("L'email inserita è già associata a un altro account.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Email non valida.");
      } else if (err.code === 'auth/weak-password') {
        setError("La password deve essere di almeno 6 caratteri.");
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Email o password errata.");
      } else {
        setError("Si è verificato un errore durante l'autenticazione.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 transition-opacity"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-md bg-white border border-[#00468C] p-8 text-black relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ borderRadius: '0px' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-black hover:text-[#00468C] transition-colors"
          title="Chiudi"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#00468C] flex items-center justify-center text-white font-serif">
            FF
          </div>
          <div>
            <h3 className="text-sm font-serif font-bold uppercase tracking-wider leading-none text-[#00468C]">
              Area Sincronizzazione Cloud
            </h3>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#00468C]/80 block mt-1">
              {isSignUp ? "Registrazione Nuovo Profilo" : "Accedi al Portale"}
            </span>
          </div>
        </div>

        <p className="text-xs text-[#2E3842] mb-6 leading-relaxed">
          Accedi per abilitare il salvataggio automatico sicuro sullo storage cloud di Firebase. I tuoi stati di navigazione e sessioni saranno sintonizzati istantaneamente.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#2E3842] mb-1.5 font-bold">
              Indirizzo Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nome@dominio.it"
                required
                className="w-full pl-10 pr-4 py-2 border border-slate-300 text-xs bg-white text-black outline-none focus:border-[#00468C]"
                style={{ borderRadius: '0px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#2E3842] mb-1.5 font-bold">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 text-xs bg-white text-black outline-none focus:border-[#00468C]"
                style={{ borderRadius: '0px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#00468C] hover:bg-black text-white text-[11px] font-mono font-bold uppercase tracking-widest py-2.5 transition-colors disabled:opacity-50 mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Elaborazione in corso...</span>
            ) : isSignUp ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Registrati e Attiva</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Accedi e Sincronizza</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-center text-[10.5px] font-mono text-slate-600">
          {isSignUp ? (
            <button 
              type="button"
              onClick={() => { setIsSignUp(false); setError(null); }}
              className="hover:text-[#00468C] font-bold cursor-pointer transition-colors"
            >
              Hai già un account? Accedi ora
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => { setIsSignUp(true); setError(null); }}
              className="hover:text-[#00468C] font-bold cursor-pointer transition-colors"
            >
              Non hai un account? Registrati qui
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

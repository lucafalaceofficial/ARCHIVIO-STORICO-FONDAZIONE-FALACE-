/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  Image as ImageIcon, 
  ShieldCheck, 
  Cpu, 
  BookOpen, 
  Music, 
  Video, 
  Layers, 
  Plus, 
  Sparkles, 
  Search, 
  Upload, 
  UserPlus, 
  CheckCircle,
  Globe,
  Lock,
  Printer,
  RefreshCw,
  Grid,
  Camera,
  ExternalLink,
  Award
} from 'lucide-react';

interface SocialPost {
  id: string;
  title: string;
  author: string;
  avatarUrl: string;
  section: string; // A - H
  sectionName: string;
  technique: string;
  description: string;
  imageUrl?: string;
  likes: number;
  likedByMe: boolean;
  comments: {
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }[];
  timestamp: string;
  priorityId?: string;
}

export const SECTION_LITERALS = [
  { id: 'A', title: "A) Arte Bidimensionale", icon: ImageIcon, hemisphere: "Destro", desc: "Pittura, disegno, grafiche d'avanguardia e opere sferiche senza spigoli" },
  { id: 'B', title: "B) Arte Tridimensionale", icon: Layers, hemisphere: "Destro", desc: "Scultura, installazioni plastiche tridimensionali e armonie Feng Shui" },
  { id: 'C', title: "C) Design & Architettura", icon: Layers, hemisphere: "Destro", desc: "Bioarchitettura, Brain Symmetrical Building e spazi ovali" },
  { id: 'D', title: "D) Biblioteca Virtuale", icon: BookOpen, hemisphere: "Destro", desc: "Saggistica d'autore, manoscritti inediti e 41+ volumi storici ISBN" },
  { id: 'E', title: "E) Regia e Spettacolo", icon: Video, hemisphere: "Destro", desc: "Teatro, sceneggiature, documentari espositivi e regia d'arte" },
  { id: 'F', title: "F) Musica e Composizioni", icon: Music, hemisphere: "Destro", desc: "Componimenti sinfonici, armonie corali e musicoterapia a 432Hz" },
  { id: 'G', title: "G) Invenzioni e Brevetti", icon: Cpu, hemisphere: "Sinistro", desc: "Eco-Thermodynamic Suit, brevetti Geniusom e fisica dell'energia solare" },
  { id: 'H', title: "H) Filosofia e Benessere", icon: Heart, hemisphere: "Sinistro", desc: "Integrazione psicofisica, teoria delle coincidenze e felicità comunitaria" }
];

export const SUBSECTION_LITERALS = [
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

const ARTWORK_PRESETS = [
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80", // Sec A: Arte Bidimensionale (Celestial/Circular Fine Art Abstract Painting)
  "https://images.unsplash.com/photo-1549887534-1541e9326642?auto=format&fit=crop&w=800&q=80", // Sec B: Arte Tridimensionale (Contemporary Sculpture/Design Shape/Installation)
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80", // Sec C: Design & Architettura (Futuristic Dome/Symmetrical Bioarchitecture Space)
  "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80", // Sec D: Biblioteca Virtuale (Ancient Books Pages / Monograph Book)
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80", // Sec E: Regia e Spettacolo (Director stage lights/cinema film reels)
  "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80", // Sec F: Musica e Composizioni (Elegant Grand Piano Keyboard in gold light)
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80", // Sec G: Invenzioni e Brevetti (Applied Physics Energy Sphere Laser Node)
  "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80"  // Sec H: Filosofia e Benessere (Zen garden misty water/relaxation flow)
];

export function getAvatarUrl(creatorId: string, fullName: string): string {
  let initials = "AIC";
  let color1 = "#2563EB"; // Blue
  let color2 = "#4F46E5"; // Indigo
  
  if (creatorId === 'lucafalace') {
    initials = "LF";
    color1 = "#0F172A"; // Slate-900 (Presidential)
    color2 = "#B45309"; // Amber-700 (Gold/Crest Accent)
  } else if (creatorId === 'silvia_maestri') {
    initials = "SM";
    color1 = "#DB2777"; // Pink-600
    color2 = "#7C3AED"; // Purple-600
  } else if (creatorId === 'elena_rose') {
    initials = "ER";
    color1 = "#0D9488"; // Teal-600
    color2 = "#0F766E"; // Teal-700
  } else if (creatorId === 'claudio_genio') {
    initials = "CG";
    color1 = "#1E3A8A"; // Blue-900
    color2 = "#2563EB"; // Blue-600
  } else if (fullName) {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) {
      initials = (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    } else if (parts.length === 1 && parts[0].length > 0) {
      initials = parts[0].substring(0, 2).toUpperCase();
    }
    const hash = fullName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = [
      ["#2563EB", "#1D4ED8"], 
      ["#DB2777", "#9D174D"], 
      ["#059669", "#047857"], 
      ["#D97706", "#B45309"], 
      ["#7C3AED", "#6D28D9"], 
      ["#0891B2", "#0E7490"]  
    ];
    const pair = colors[hash % colors.length];
    color1 = pair[0];
    color2 = pair[1];
  }

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><defs><linearGradient id="g_${creatorId}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${encodeURIComponent(color1)}" /><stop offset="100%" stop-color="${encodeURIComponent(color2)}" /></linearGradient></defs><circle cx="75" cy="75" r="70" fill="url(%23g_${creatorId})" stroke="%23ffffff" stroke-width="4" /><circle cx="75" cy="75" r="62" fill="none" stroke="%23ffffff" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.6"/><text x="75" y="88" font-family="'Times New Roman', Times, serif" font-size="44" font-weight="bold" fill="%23ffffff" text-anchor="middle" letter-spacing="0.5">${initials}</text></svg>`;
}

// High fidelity presets for Instagram profiling
interface CreatorProfile {
  id: string;
  fullName: string;
  username: string;
  category: string;
  avatarUrl: string;
  followers: string;
  followersRaw: number;
  following: string;
  activeBio: string;
  website: string;
  postsCount: number;
  isVerified: boolean;
  posts: SocialPost[];
  gender: 'Maschio' | 'Femmina';
}

export const INITIAL_CREATORS: CreatorProfile[] = [
  {
    id: "lucafalace",
    fullName: "Dott. Luca Falace",
    username: "lucafalace",
    category: "Storico dell'arte & Inventore d'Ingegno",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    followers: "52.4K",
    followersRaw: 52400,
    following: "482",
    gender: "Maschio",
    activeBio: "Storico dell'arte e inventore. Premio Ecomondo 2014 Presidente della Repubblica, Onorificenza per il progresso e Sincronismo d'Ingegno. Fondatore e Presidente Onorario AIC.",
    website: "lucafalace.altervista.org",
    postsCount: 9,
    isVerified: true,
    posts: [
      {
        id: "lucaf-p1",
        title: "L'Origine Celeste - Dipinto Sferico",
        author: "Dott. Luca Falace",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        section: "A",
        sectionName: "A) Arte Bidimensionale",
        technique: "Olio circolare su tela fine senza spigoli",
        description: "Un'espressione sincrona di calma ed energia cosmica. Questo quadro rappresenta l'assenza totale di angoli acuti, unificando le energie dell'universo in accordo con lo studio del Feng Shui.",
        imageUrl: "/src/assets/images/origine_celeste_painting_1781599528409.jpg",
        likes: 1243,
        likedByMe: false,
        priorityId: "AIC-PRI-200508",
        timestamp: "14/06/2026 15:30",
        comments: [
          { id: 'fc1', author: "Elena Rosati", text: "La purezza del cerchio comunica una pace immediata.", timestamp: "14:06" },
          { id: 'fc2', author: "Claudio G.", text: "Una simmetria studiata al millimetro. Un capolavoro.", timestamp: "16:10" }
        ]
      },
      {
        id: "lucaf-p2",
        title: "Geniusom - Studio d'Ingegno",
        author: "Dott. Luca Falace",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        section: "H",
        sectionName: "H) Filosofia e Benessere",
        technique: "Teoria Empirica di Sincronismo Olistico",
        description: "Ricerca e tutela del potenziale umano sintonizzato. Studio depositato presso CERN-Zenodo per la difesa e promozione del sapere d'ingegno.",
        imageUrl: ARTWORK_PRESETS[7],
        likes: 981,
        likedByMe: false,
        priorityId: "AIC-PRI-202209",
        timestamp: "13/06/2026 11:20",
        comments: [
          { id: 'fc3', author: "Elena Rosati", text: "Un fondamentale passo avanti per i nostri studi uniti.", timestamp: "12:45" }
        ]
      },
      {
        id: "lucaf-p3",
        title: "Brevetti Termodinamici Internazionali",
        author: "Dott. Luca Falace",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
        section: "C",
        sectionName: "C) Design & Architettura",
        technique: "Integrazione d'Arte e Bioarchitettura",
        description: "Saggi e documentazione brevettuale per la tutela dell'intelletto creativo contro le appropriazioni indebite, raccordato alla bioarchitettura sferica.",
        imageUrl: ARTWORK_PRESETS[2],
        likes: 852,
        likedByMe: false,
        priorityId: "AIC-PRI-202411",
        timestamp: "11/06/2026 09:12",
        comments: []
      }
    ]
  },
  {
    id: "silvia_maestri",
    fullName: "Silvia Maestri",
    username: "silvia_maestri",
    category: "Compositrice Sinfonica & Musicoterapeuta",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    followers: "18.1K",
    followersRaw: 18100,
    following: "305",
    gender: "Femmina",
    activeBio: "Ricercatrice per l'armonizzazione dei ritmi circadiani. Composizioni sinfoniche e musicoterapia accordata alla frequenza benefica a 432Hz.",
    website: "foundation-falace.org/wellness",
    postsCount: 6,
    isVerified: true,
    posts: [
      {
        id: "silvia-p1",
        title: "Sinfonia Aurica a 432 Hertz",
        author: "Silvia Maestri",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        section: "F",
        sectionName: "F) Musica e Composizioni",
        technique: "Pianoforte ed Archi accordati a 432Hz",
        description: "Tracce create appositamente per cooperare con la Cromoterapia negli istituti clinici d'avanguardia.",
        imageUrl: ARTWORK_PRESETS[5],
        likes: 412,
        likedByMe: false,
        priorityId: "AIC-PRI-202602",
        timestamp: "12/06/2026 18:05",
        comments: [
          { id: 'sc1', author: "Marco R.", text: "Aiuta moltissimo la concentrazione, grazie Silvia!", timestamp: "19:12" }
        ]
      },
      {
        id: "silvia-p2",
        title: "Armonia della Natura - Sincronismo dei Suoni",
        author: "Silvia Maestri",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        section: "H",
        sectionName: "H) Filosofia e Benessere",
        technique: "Registrazioni Binaurali di Flussi d'Acqua",
        description: "Studio empirico sull'abbassamento del cortisolo tramite l'esposizione acustica a campate di suoni naturali integrati con frequenze acustiche pure.",
        imageUrl: ARTWORK_PRESETS[7],
        likes: 389,
        likedByMe: false,
        priorityId: "AIC-PRI-202604",
        timestamp: "08/06/2026 14:22",
        comments: []
      }
    ]
  },
  {
    id: "elena_rose",
    fullName: "Elena Rosati",
    username: "elena_rose",
    category: "Curatrice & Critica d'Arte",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    followers: "12.3K",
    followersRaw: 12300,
    following: "912",
    gender: "Femmina",
    activeBio: "Conservatrice del Polo Museale dell'Arte & Scienza. Promotrice dell'integrazione accademica e d'inquadramento delle opere dell'Emisfero Destro.",
    website: "foundation-falace.org/museum-conservator",
    postsCount: 3,
    isVerified: true,
    posts: [
      {
        id: "elena-p1",
        title: "Il Saggio Storico d'Inquadramento Culturale",
        author: "Elena Rosati",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
        section: "D",
        sectionName: "D) Biblioteca Virtuale",
        technique: "Monografia d'Arte con ISBN Registrato",
        description: "Esame dettagliato degli ultimi vent'anni di produzione intellettiva della fondazione no-profit Falace, tutelato giuridicamente e depositato.",
        imageUrl: ARTWORK_PRESETS[3],
        likes: 298,
        likedByMe: false,
        priorityId: "AIC-PRI-202511",
        timestamp: "10/06/2026 16:40",
        comments: [
          { id: 'ec1', author: "Elena Rosati", text: "Presto disponibile in versione cartacea per i sostenitori attivi.", timestamp: "17:00" }
        ]
      }
    ]
  },
  {
    id: "claudio_genio",
    fullName: "Claudio G.",
    username: "claudio_genio",
    category: "Coordinatore Innovazione & Sviluppo",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    followers: "6.8K",
    followersRaw: 6800,
    following: "210",
    gender: "Maschio",
    activeBio: "Ricercatore di sistemi energetici alternativi no-profit. Sviluppo di idee d'ingegno, modelli per l'allestimento di mostre digitali e brevetti.",
    website: "foundation-falace.org/patent-clo",
    postsCount: 2,
    isVerified: false,
    posts: [
      {
        id: "claudio-p1",
        title: "Fisica dell'Energia Sferica",
        author: "Claudio G.",
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        section: "G",
        sectionName: "G) Invenzioni e Brevetti",
        technique: "Studio Tecnico Sperimentale Termico",
        description: "Un'analisi quantistica dei materiali termoriflettenti adatti alla creazione di moduli abitativi circolari ecosostenibili raccordati ai flussi terrestri.",
        imageUrl: ARTWORK_PRESETS[6],
        likes: 187,
        likedByMe: false,
        priorityId: "AIC-PRI-202605",
        timestamp: "05/06/2026 10:15",
        comments: []
      }
    ]
  },
  {
    id: "gabriele_valente",
    fullName: "Dott. Gabriele Valente",
    username: "gabriele_valente",
    category: "Ricercatore d'Ingegno & Fisica Applicata",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    followers: "32.4K",
    followersRaw: 32400,
    following: "312",
    gender: "Maschio",
    activeBio: "Coordinatore Tecnico d'Ingegneria della Fondazione AIC. Specialista in termodinamica dei tessuti attivi, fisica applicata ai sistemi biologici e brevetti interconnessi.",
    website: "foundation-falace.org/scienza-valente",
    postsCount: 1,
    isVerified: true,
    posts: [
      {
        id: "valente-p1",
        title: "Eco-Thermodynamic Suit - Brevetto",
        author: "Dott. Gabriele Valente",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
        section: "G",
        sectionName: "G) Invenzioni e Brevetti",
        technique: "Rendering CAD e Formula di Scambio Termodinamico",
        description: "Studio avanzato sulla tuta termodinamica per accumulare l'energia corporea passiva tramite dispositivi piezoelettrici brevettati ad hoc.",
        imageUrl: ARTWORK_PRESETS[6],
        likes: 890,
        likedByMe: false,
        priorityId: "AIC-PRI-202209",
        timestamp: "13/06/2026 11:20",
        comments: []
      }
    ]
  }
];

interface SocialHubProps {
  onGoToDeposit?: () => void;
}

export default function SocialHub({ onGoToDeposit }: SocialHubProps) {
  const [activeArchitecture, setActiveArchitecture] = useState<'facebook' | 'instagram'>('facebook');
  const [profileLayoutOverrides, setProfileLayoutOverrides] = useState<{ [creatorId: string]: 'facebook' | 'instagram' }>({});
  
  // Load unified posts (synced with preset posts)
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('aic_social_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback if parsing fails
      }
    }
    // Collect all posts from creators to seed global feed
    const allPresetPosts: SocialPost[] = [];
    INITIAL_CREATORS.forEach(creator => {
      creator.posts.forEach(post => {
        allPresetPosts.push(post);
      });
    });
    return allPresetPosts;
  });

  useEffect(() => {
    localStorage.setItem('aic_social_posts', JSON.stringify(posts));
  }, [posts]);

  const [selectedSection, setSelectedSection] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Instagram-specific states
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('lucafalace');
  const [instagramFollowedState, setInstagramFollowedState] = useState<{ [creatorId: string]: boolean }>({});
  const [activeInstagramSubTab, setActiveInstagramSubTab] = useState<'posts' | 'reels' | 'tagged'>('posts');
  const [isInstagramModalOpen, setIsInstagramModalOpen] = useState(false);
  const [selectedPostForModal, setSelectedPostForModal] = useState<SocialPost | null>(null);

  // Registration states
  const [registerMode, setRegisterMode] = useState<'autore' | 'visitatore'>('autore');
  const [isRegistered, setIsRegistered] = useState<boolean>(() => {
    return localStorage.getItem('aic_social_user') !== null || localStorage.getItem('aic_visitor_pass') !== null;
  });

  const [currentUser, setCurrentUser] = useState<any>(() => {
    const savedArt = localStorage.getItem('aic_social_user');
    const savedVis = localStorage.getItem('aic_visitor_pass');
    
    if (savedArt) {
      return { ...JSON.parse(savedArt), type: 'autore' };
    } else if (savedVis) {
      return { ...JSON.parse(savedVis), type: 'visitatore' };
    }
    
    return {
      fullName: '',
      email: '',
      selectedSection: 'A',
      selectedSubsection: 'A1',
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      type: 'autore'
    };
  });

  // Visitor Ticket simulated cache
  const [visitorAccessCount, setVisitorAccessCount] = useState<number>(() => {
    const savedCount = localStorage.getItem('aic_visitor_access_count');
    return savedCount ? Number(savedCount) : 100;
  });
  
  const [visitorPassword, setVisitorPassword] = useState<string>(() => {
    const savedPass = localStorage.getItem('aic_visitor_password');
    return savedPass || `FALACE-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
  });

  // Save accesses to local storage
  useEffect(() => {
    localStorage.setItem('aic_visitor_access_count', String(visitorAccessCount));
  }, [visitorAccessCount]);

  // Listen for global auth updates (registration or sign-in in UserProfileManager)
  useEffect(() => {
    const handleGlobalAuthSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      const syncedUser = customEvent.detail;
      if (syncedUser) {
        setCurrentUser(syncedUser);
        setIsRegistered(true);
        if (syncedUser.type === 'visitatore') {
          setVisitorPassword(syncedUser.academicToken || '');
          setVisitorAccessCount(100);
        }
      } else {
        setIsRegistered(false);
        setCurrentUser({
          fullName: '',
          email: '',
          selectedSection: 'A',
          selectedSubsection: 'A1',
          avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
          type: 'autore'
        });
      }
    };

    window.addEventListener('aic-auth-sync', handleGlobalAuthSync);
    return () => {
      window.removeEventListener('aic-auth-sync', handleGlobalAuthSync);
    };
  }, []);

  // Post creator form state
  const [newPostTitle, setNewPostTitle] = useState(() => {
    return localStorage.getItem('aic_draft_newPostTitle') || '';
  });
  const [newPostDesc, setNewPostDesc] = useState(() => {
    return localStorage.getItem('aic_draft_newPostDesc') || '';
  });
  const [newPostTech, setNewPostTech] = useState(() => {
    return localStorage.getItem('aic_draft_newPostTech') || '';
  });
  const [newPostSection, setNewPostSection] = useState(() => {
    return localStorage.getItem('aic_draft_newPostSection') || 'A';
  });
  const [newPostSubsection, setNewPostSubsection] = useState(() => {
    return localStorage.getItem('aic_draft_newPostSubsection') || 'A1';
  });
  const [selectedPresetImage, setSelectedPresetImage] = useState<string>(ARTWORK_PRESETS[0]);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [postSuccess, setPostSuccess] = useState<string | null>(null);

  // Auto-Save handler for writing local drafts on global trigger
  useEffect(() => {
    const handleGlobalAutoSave = () => {
      if (newPostTitle || newPostDesc || newPostTech) {
        localStorage.setItem('aic_draft_newPostTitle', newPostTitle);
        localStorage.setItem('aic_draft_newPostDesc', newPostDesc);
        localStorage.setItem('aic_draft_newPostTech', newPostTech);
        localStorage.setItem('aic_draft_newPostSection', newPostSection);
        localStorage.setItem('aic_draft_newPostSubsection', newPostSubsection);
      }
    };

    window.addEventListener('aic-trigger-autosave', handleGlobalAutoSave);
    return () => {
      window.removeEventListener('aic-trigger-autosave', handleGlobalAutoSave);
    };
  }, [newPostTitle, newPostDesc, newPostTech, newPostSection, newPostSubsection]);

  // Comment input state dictionary mapped by post ID
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  // Chatroom messages
  const [chatMessagesBySection, setChatMessagesBySection] = useState<{ [secId: string]: any[] }>({
    'ALL': [
      { sender: "Dott. Luca Falace", text: "Saluti a tutti gli accademici e ricercatori liberi del portale! Sentitevi a casa.", time: "15:00" }
    ],
    'A': [
      { sender: "Clara Montecarlo", text: "La pittura circolare sferica del Dott. Falace è di un'avanguardia pazzesca.", time: "11:20" },
      { sender: "Elena Rosati", text: "Concordo! Niente spigoli significa far scorrere l'energia vitale.", time: "11:35" }
    ],
    'G': [
      { sender: "Giorgio Ingegno", text: "Sto testando un accumulatore a flussi termodinamici per la bioarchitettura tonda. Qualcuno ha pareri?", time: "09:40" }
    ],
    'D': [
      { sender: "Prof. Alberto Neri", text: "Il saggio 'Centro Culturale Arte e Scienza' riassume alla perfezione l'intero cammino espositivo.", time: "14:10" }
    ]
  });
  const [liveChatInput, setLiveChatInput] = useState('');

  // Dual Registration
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser.fullName || !currentUser.email) return;

    if (registerMode === 'autore') {
      const userSession = {
        fullName: currentUser.fullName,
        email: currentUser.email,
        selectedSection: currentUser.selectedSection,
        selectedSubsection: currentUser.selectedSubsection || 'A1',
        avatarUrl: currentUser.avatarUrl,
        type: 'autore'
      };
      localStorage.setItem('aic_social_user', JSON.stringify(userSession));
      setCurrentUser(userSession);
    } else {
      const gPass = `FALACE-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
      setVisitorPassword(gPass);
      setVisitorAccessCount(100);
      
      const visitorSession = {
        fullName: currentUser.fullName,
        email: currentUser.email,
        avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
        type: 'visitatore'
      };
      localStorage.setItem('aic_visitor_pass', JSON.stringify(visitorSession));
      localStorage.setItem('aic_visitor_password', gPass);
      setCurrentUser(visitorSession);
    }
    setIsRegistered(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('aic_social_user');
    localStorage.removeItem('aic_visitor_pass');
    localStorage.removeItem('aic_visitor_password');
    localStorage.removeItem('aic_visitor_access_count');
    setIsRegistered(false);
    setVisitorAccessCount(100);
    setCurrentUser({
      fullName: '',
      email: '',
      selectedSection: 'A',
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      type: 'autore'
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFileName(file.name);
      const mapSectionToPresetIndex: { [key: string]: number } = {
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 3, 'G': 4, 'H': 5
      };
      const idx = mapSectionToPresetIndex[newPostSection] || 0;
      setSelectedPresetImage(ARTWORK_PRESETS[idx]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFileName(file.name);
      const mapSectionToPresetIndex: { [key: string]: number } = {
        'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 3, 'G': 4, 'H': 5
      };
      const idx = mapSectionToPresetIndex[newPostSection] || 0;
      setSelectedPresetImage(ARTWORK_PRESETS[idx]);
    }
  };

  // Publish artwork post
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle || !newPostDesc) return;

    if (currentUser.type === 'visitatore') {
      if (visitorAccessCount <= 0) {
        alert("Attenzione: La tua tessera-password non ha più entrate disponibili! Effettua una ricarica di 100 accessi.");
        return;
      }
      setVisitorAccessCount(prev => prev - 1);
    }

    const matchedSec = SECTION_LITERALS.find(s => s.id === newPostSection);
    const uniquePri = `AIC-PRI-${Math.floor(100000 + Math.random() * 900000)}`;

    const subObj = SUBSECTION_LITERALS.find(sub => sub.id === newPostSubsection);
    const subLabel = subObj ? subObj.name.split(' - ')[0] : newPostSubsection;
    
    const newPost: SocialPost = {
      id: `sp-${Date.now()}`,
      title: newPostTitle,
      author: currentUser.fullName || "Nuovo Creatore AIC",
      avatarUrl: currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      section: newPostSection,
      sectionName: matchedSec ? matchedSec.title : "Sezione Culturale",
      technique: `${newPostTech || "Studio d'Ingegno"} [Pratica: ${subLabel}]`,
      description: newPostDesc,
      imageUrl: selectedPresetImage,
      likes: 1,
      likedByMe: true,
      priorityId: uniquePri,
      timestamp: new Date().toLocaleString('it-IT', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' }),
      comments: []
    };

    setPosts([newPost, ...posts]);
    setPostSuccess(`Opera pubblicata con successo nella bacheca social!`);
    
    // Clear autosave drafts on successful publish
    localStorage.removeItem('aic_draft_newPostTitle');
    localStorage.removeItem('aic_draft_newPostDesc');
    localStorage.removeItem('aic_draft_newPostTech');

    setNewPostTitle('');
    setNewPostDesc('');
    setNewPostTech('');
    setUploadedFileName(null);

    setTimeout(() => {
      setPostSuccess(null);
    }, 4000);
  };

  const triggerAccessDemo = () => {
    if (visitorAccessCount > 0) {
      setVisitorAccessCount(prev => prev - 1);
    } else {
      alert("Tessera esaurita!");
    }
  };

  const rechargeAccesses = () => {
    setVisitorAccessCount(100);
    alert("Integrità ripristinata! Tesserino ricaricato con 100 accessi.");
  };

  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes: p.likedByMe ? p.likes - 1 : p.likes + 1,
          likedByMe: !p.likedByMe
        };
      }
      return p;
    }));
    // Also sync with selected modal post if open
    if (selectedPostForModal && selectedPostForModal.id === postId) {
      setSelectedPostForModal(prev => prev ? {
        ...prev,
        likes: prev.likedByMe ? prev.likes - 1 : prev.likes + 1,
        likedByMe: !prev.likedByMe
      } : null);
    }
  };

  const handleAddComment = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = commentInputs[postId];
    if (!commentText || !commentText.trim()) return;

    const newComment = {
      id: `c-${Date.now()}`,
      author: currentUser.fullName || "Ospite Curioso",
      text: commentText,
      timestamp: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    if (selectedPostForModal && selectedPostForModal.id === postId) {
      setSelectedPostForModal(prev => prev ? {
        ...prev,
        comments: [...prev.comments, newComment]
      } : null);
    }

    setCommentInputs(prev => ({
      ...prev,
      [postId]: ''
    }));
  };

  const handleSendGroupMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liveChatInput.trim()) return;

    const chatChannel = selectedSection === 'ALL' ? 'ALL' : selectedSection;
    const authorName = currentUser.fullName || "Ospite";

    const newMsg = {
      sender: authorName,
      text: liveChatInput,
      time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessagesBySection(prev => ({
      ...prev,
      [chatChannel]: [...(prev[chatChannel] || []), newMsg]
    }));

    setLiveChatInput('');

    setTimeout(() => {
      let automatedReply = "Molto interessante questo spunto di riflessione! Favoriamo l'accordo armonico degli opposti.";
      if (chatChannel === 'G') {
        automatedReply = "Il dipartimento brevetti della Fondazione AIC ha inserito la nota nel protocollo no-profit.";
      } else if (chatChannel === 'A') {
        automatedReply = "L'espressività artistica circolare sferica è il pilastro del nostro Emisfero Destro.";
      } else if (chatChannel === 'D') {
        automatedReply = "Le opere letterarie dotate di codice ISBN costituiscono l'antologia d'ingegno della Fondazione.";
      }

      setChatMessagesBySection(prev => ({
        ...prev,
        [chatChannel]: [...(prev[chatChannel] || []), {
          sender: "Consulente AIC",
          text: automatedReply,
          time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
        }]
      }));
    }, 1500);
  };

  const tickerRef = React.useRef<HTMLDivElement>(null);

  // Alternate Art and Science posts for the profile activity scrolling row
  const getAlternatingActivityFeed = (): SocialPost[] => {
    const artPosts = posts.filter(p => ['A', 'B', 'E', 'F'].includes(p.section));
    const sciPosts = posts.filter(p => ['C', 'D', 'G', 'H'].includes(p.section));
    
    const alternated: SocialPost[] = [];
    const maxLen = Math.max(artPosts.length, sciPosts.length);
    for (let i = 0; i < maxLen; i++) {
      if (i < artPosts.length) {
        alternated.push(artPosts[i]);
      }
      if (i < sciPosts.length) {
        alternated.push(sciPosts[i]);
      }
    }
    return alternated;
  };
  
  const tickerPosts = getAlternatingActivityFeed();

  const scrollTicker = (direction: 'left' | 'right') => {
    if (tickerRef.current) {
      const scrollAmount = 300;
      tickerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const filteredPosts = posts.filter(p => {
    // Filter posts according to active tab (instagram = Arte, facebook = Scienza)
    const isArt = ['A', 'B', 'E', 'F'].includes(p.section);
    const belongsToTab = activeArchitecture === 'instagram' ? isArt : !isArt;
    
    const matchesSection = selectedSection === 'ALL' || p.section === selectedSection;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.technique.toLowerCase().includes(searchQuery.toLowerCase());
    return belongsToTab && matchesSection && matchesSearch;
  });

  const activeSecObj = SECTION_LITERALS.find(s => s.id === selectedSection);

  // Compute creators list dynamically including currently registered author
  const getCreatorsWithCustomAuthor = (): CreatorProfile[] => {
    const list = [...INITIAL_CREATORS];
    
    // If user is registered as an author, append/prepend their custom profile!
    if (isRegistered && currentUser.type === 'autore') {
      const userPosts = posts.filter(p => p.author === currentUser.fullName);
      const userProfile: CreatorProfile = {
        id: "current_user",
        fullName: currentUser.fullName,
        username: currentUser.fullName.toLowerCase().replace(/\s+/g, '_'),
        category: `Membro Autore Sez. ${currentUser.selectedSection}`,
        avatarUrl: currentUser.avatarUrl,
        followers: "1",
        followersRaw: 1,
        following: "12",
        activeBio: `Artista ed Inventore d'ingegno associato alla galleria sincrona HUMANA HUB AIC. Email certificata: ${currentUser.email}`,
        website: "foundation-falace.org/current-member",
        postsCount: userPosts.length,
        isVerified: true,
        posts: userPosts,
        gender: "Maschio"
      };

      // Check if already exists, else insert
      const existingIdx = list.findIndex(c => c.id === "current_user");
      if (existingIdx !== -1) {
        list[existingIdx] = userProfile;
      } else {
        list.push(userProfile);
      }
    }
    return list;
  };

  const allCreators = getCreatorsWithCustomAuthor();
  const activeCreator = allCreators.find(c => c.id === selectedCreatorId) || allCreators[0];

  // Filter creator's posts based on active tab to avoid mixing Art & Science
  const creatorActivePosts = activeCreator.posts.filter(p => {
    const isArt = ['A', 'B', 'E', 'F'].includes(p.section);
    return activeArchitecture === 'instagram' ? isArt : !isArt;
  });

  const getCreatorProfileStyle = (creatorId: string): 'facebook' | 'instagram' => {
    if (profileLayoutOverrides[creatorId]) {
      return profileLayoutOverrides[creatorId];
    }
    // Claudio is Scienza (Facebook layout)
    if (creatorId === 'claudio_genio') return 'facebook';
    // Silvia and Elena are Arte (Instagram layout)
    if (creatorId === 'silvia_maestri') return 'instagram';
    if (creatorId === 'elena_rose') return 'instagram';
    if (creatorId === 'current_user') {
      const isSci = ['C', 'D', 'G', 'H'].includes(currentUser.selectedSection || 'A');
      return isSci ? 'facebook' : 'instagram';
    }
    // Dott. Luca Falace default style
    return 'facebook'; 
  };

  const getCreatorIdByAuthorName = (authorName: string): string => {
    const nameLower = authorName.toLowerCase();
    if (nameLower.includes("falace")) return 'lucafalace';
    if (nameLower.includes("maestri")) return 'silvia_maestri';
    if (nameLower.includes("rosati")) return 'elena_rose';
    if (nameLower.includes("claudio")) return 'claudio_genio';
    if (isRegistered && authorName === currentUser.fullName) return 'current_user';
    return 'lucafalace';
  };

  const selectCreatorProfile = (creatorId: string) => {
    setSelectedCreatorId(creatorId);
    setActiveArchitecture('instagram');
    setTimeout(() => {
      const card = document.getElementById("instagram-view") || document.getElementById("architecture-style-switcher");
      if (card) {
        card.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleFollowCreator = (creatorId: string) => {
    setInstagramFollowedState(prev => ({
      ...prev,
      [creatorId]: !prev[creatorId]
    }));
  };

  const openInstagramModal = (post: SocialPost) => {
    setSelectedPostForModal(post);
    setIsInstagramModalOpen(true);
  };

  return (
    <div className="space-y-8" id="social-hub-container">

      {/* Sezione Orientamento & Benvenuto Portale - Risolve la comprensione immediata per i visitatori */}
      <div className="bg-white text-slate-900 rounded-[2.5rem] p-6 lg:p-8 shadow-xs border-2 border-slate-200 relative overflow-hidden" id="homepage-academic-onboarding">
        
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-col gap-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-[9px] sm:text-[10px] font-mono tracking-widest uppercase rounded-full font-bold text-slate-800 self-start">
                  🏛️ PROGETTO SIMULATIVO DEL PORTALE DELLA FONDAZIONE FALACE
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 font-semibold">
                  ESEMPIO DELLA STRUTTURA DEL PORTALE HUMANA HUB AIC
                </div>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-black tracking-tight leading-tight text-slate-950">
                Humana Hub AIC: Dove l'Arte incontra la Scienza
              </h1>
            </div>
            {onGoToDeposit && (
              <button 
                onClick={onGoToDeposit}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full text-xs transition-all cursor-pointer shadow-xs active:scale-95 flex items-center gap-1.5 shrink-0 self-start md:self-center"
              >
                <span>🛡️ DEPOSITA LA TUA OPERA</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-w-4xl">
              <strong>HUMANA HUB AIC</strong> è il portale internazionale della Fondazione Falace delle Attività Intellettive Creative, strumento di servizi per la tutela, valorizzazione, divulgazione, promozione, creazione e mediazione del patrimonio intellettivo e culturale umano.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans max-w-4xl">
              Opera nel campo delle <strong>Attività Intellettive Creative (AIC)</strong>, intese come l'insieme delle produzioni della mente umana in ambito artistico, scientifico, culturale e progettuale.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Card 1: Visibilità & Socializzazione */}
              <div className="bg-slate-100 border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between hover:bg-slate-200/60 transition-all text-slate-900">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🤝</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-blue-700">
                      1. Socializzazione & Reti d'Ingegno
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-sans">
                    Permette l'incontro, la condivisione e l'aggregazione tra artisti, scienziati, inventori, professionisti, autodidatti, genitori e geni della nostra epoca. Un ecosistema dove far nascere collaborazioni e opportunità professionali.
                  </p>
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-mono mt-2 pt-2 border-t border-slate-200">
                  ✓ Scorri la bacheca sotto
                </div>
              </div>

              {/* Card 2: Tutela delle Opere - EVVIDENZIATA IN BLU CHIARO TINTA UNICA - TESTO SEMPRE BIANCO */}
              <div className="bg-blue-600 border border-blue-700 rounded-2xl p-4 space-y-2 flex flex-col justify-between hover:bg-blue-700 transition-all text-white">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🛡️</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-white">
                      2. Tutela d'Autore (Arte & Scienza)
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-blue-50 leading-relaxed font-sans">
                    Protegge le opere intellettuali d'arte e scienza (quadri, saggi, sculture, brevetti, spartiti musicali, progetti termodinamici) dall'appropriazione indebita e dalla contraffazione algoritmica dei chatbot AI. Registra le tue creazioni con timbro a data certa.
                  </p>
                </div>
                {onGoToDeposit && (
                  <button 
                    onClick={onGoToDeposit}
                    className="text-left text-[9px] text-white hover:underline uppercase font-bold font-mono mt-2 pt-2 border-t border-blue-500/35 block animate-pulse"
                  >
                    Procedi al Deposito →
                  </button>
                )}
              </div>

              {/* Card 3: Sviluppo & Promozione */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-2 flex flex-col justify-between hover:bg-slate-50 transition-all text-slate-900">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <h3 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-800">
                      3. Sviluppo & Bandi
                    </h3>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans">
                    Promuove esposizioni artistiche d'avanguardia, lo sviluppo di brevetti energetici ecologici, attività vibrazionali di cromoterapia e bandi di finanziamento agevolati per sostenere l'ingegno di artisti e scienziati iscritti.
                  </p>
                </div>
                <div className="text-[9px] text-slate-500 uppercase font-mono mt-2 pt-2 border-t border-slate-200">
                  ✓ Sezione Bandi attiva
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Profile Activities (Alternating) */}
      <div className="bg-white text-slate-900 rounded-[2rem] p-6 shadow-xs border border-slate-200 relative overflow-hidden" id="alternating-profiles-activity">

        <div className="flex flex-col sm:flex-row justify-between items-baseline mb-4 z-10 relative">
          <div>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-105 text-[9px] rounded-full font-mono uppercase tracking-widest font-bold inline-flex items-center gap-1.5">
              <Sparkles size={10} className="animate-pulse text-blue-600" /> Sincronismo dei Profili d'Ingegno
            </span>
            <h2 className="text-lg font-display font-semibold text-slate-800 tracking-tight mt-1">
              Cosa succede nei canali accademici AIC
            </h2>
            <p className="text-slate-500 text-[11px] font-sans">
              Uno scorrere dinamico in cui le <strong className="text-pink-600">Opere d'Arte</strong> e i <strong className="text-blue-600">Progetti di Scienza</strong> si alternano in tempo reale.
            </p>
          </div>
          
          <div className="flex gap-2 mt-3 sm:mt-0">
            <button 
              onClick={() => scrollTicker('left')}
              className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Indietro"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => scrollTicker('right')}
              className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Avanti"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Horizontal scroll strip container */}
        <div 
          ref={tickerRef}
          className="flex gap-4 overflow-x-auto pb-3 pt-2 no-scrollbar scroll-smooth snap-x select-none"
        >
          {tickerPosts.map((post) => {
            const isArt = ['A', 'B', 'E', 'F'].includes(post.section);
            return (
              <div 
                key={post.id}
                onClick={() => {
                  openInstagramModal(post);
                }}
                className={`flex-shrink-0 w-80 bg-white hover:bg-slate-50 border ${
                  isArt ? 'border-pink-500/20 hover:border-pink-500/40' : 'border-blue-500/20 hover:border-blue-500/40'
                } rounded-2xl p-4 flex flex-col justify-between hover:shadow-xs transition-all cursor-pointer relative group snap-center`}
              >
                {/* Visual side accent card border */}
                <div className={`absolute top-0 bottom-0 left-0 w-1.2 rounded-l-2xl ${
                  isArt ? 'bg-pink-500' : 'bg-blue-600'
                }`}></div>

                <div className="pl-2 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <img 
                        src={post.avatarUrl} 
                        alt={post.author} 
                        className="w-7 h-7 rounded-full object-cover border border-slate-200" 
                      />
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold text-slate-800 block truncate leading-none">{post.author}</span>
                        <span className="text-[8px] text-slate-500 font-mono mt-0.5 block leading-none">{post.timestamp}</span>
                      </div>
                    </div>
                    
                    <span className={`px-1.5 py-0.5 text-[7px] font-mono rounded font-bold uppercase ${
                      isArt ? 'bg-pink-500/10 text-pink-600 border border-pink-500/20' : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                    }`}>
                      {isArt ? '🎨 ARTE' : '🔬 SCIENZA'}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-slate-800 font-display group-hover:text-blue-600 transition-colors leading-tight truncate">
                      {post.title}
                    </h4>
                    <span className="text-[8px] text-slate-600 font-mono leading-none bg-slate-100 px-1.5 py-0.5 rounded inline-block truncate max-w-full">
                      {post.technique.split(' [')[0]}
                    </span>
                    <p className="text-slate-600 font-sans text-[10px] leading-relaxed line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="pl-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[8px] font-mono mt-2">
                  <div className="text-slate-400 font-bold uppercase tracking-wider">
                    AIC Archivio
                  </div>
                  <span className="text-slate-500 hover:text-blue-600 transition-colors font-medium">Dettagli →</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Visual Navigation to match Facebook vs Instagram styles. Elegant pill selector */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded-2xl border border-slate-200 gap-4 shadow-xs" id="architecture-style-switcher">
        <div className="space-y-0.5 text-center sm:text-left transition-all">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Sincronismo delle Attività Intellettive</h3>
          <p className="text-sm font-bold text-slate-800">Seleziona la sezione tematica per l'esplorazione dei contenuti</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-xl gap-1">
          <button
            onClick={() => {
              setActiveArchitecture('facebook');
              setSelectedSection('ALL');
              setNewPostSection('G');
            }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeArchitecture === 'facebook' 
                ? 'bg-blue-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-905 bg-transparent'
            }`}
          >
            <Globe size={13} />
            Attività Intellettive - Scienza
          </button>
          <button
            onClick={() => {
              setActiveArchitecture('instagram');
              setSelectedSection('ALL');
              setNewPostSection('A');
            }}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeArchitecture === 'instagram' 
                ? 'bg-pink-600 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-905 bg-transparent'
            }`}
          >
            <Camera size={13} />
            Attività Intellettive - Arte
          </button>
        </div>
      </div>

      {activeArchitecture === 'facebook' ? (
        /*========================================================================
                                   FACEBOOK STYLE VIEW
          ========================================================================*/
        <div className="space-y-6 animate-fadeIn" id="facebook-view">
          
          {/* Top Banner */}
          <div className="bg-white border border-slate-200 p-6 rounded-[2.5rem] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6" id="social-hub-hero">
            <div className="space-y-2 mt-1">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 text-xs rounded-full font-mono uppercase tracking-widest font-bold inline-flex items-center gap-1">
                <Globe size={11} /> Attività Intellettive - Scienza
              </span>
              <h2 className="text-2xl font-display font-black text-slate-900 tracking-tight">
                Bacheca d'Ingegno, Brevetti e Pubblicazioni Accademiche
              </h2>
              <p className="text-slate-600 text-xs leading-relaxed font-sans max-w-xl">
                Tutte le creazioni d'ingegno dello spettro scientifico, inclusi schemi teorici, brevetti di utilità, saggi letterari e trattati bioarchitettonici depositati, sotto la tutela legale della Fondazione.
              </p>
            </div>

            <div className="hidden">
              {/* Box dei membri rimosso per richiesta utente */}
            </div>
          </div>

          {/* Three-Column Facebook Feed Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="facebook-columns">
            
            {/* Left Column (Shortcuts, Status & Filters) */}
            <div className="lg:col-span-3 space-y-6" id="fb-left-column">
              
              {/* Profile Card & Logged State */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Membro Attivo</h4>
                </div>
                {isRegistered ? (
                  <div className="space-y-3 animate-fadeIn">
                    {currentUser.type === 'visitatore' ? (
                      <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-150 space-y-2.5">
                        <div className="text-center pb-2 border-b border-amber-100/70">
                          <Lock className="text-amber-600 mx-auto mb-1" size={16} />
                          <span className="text-[9px] font-mono font-bold tracking-widest text-slate-700 block">TESSERA VISITATORE</span>
                        </div>
                        <div className="text-[11px] space-y-1 font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Nome:</span>
                            <span className="text-slate-900 font-bold max-w-[120px] truncate">{currentUser.fullName}</span>
                          </div>
                          <div className="flex justify-between bg-white px-1.5 py-1 rounded border border-amber-100 mt-1">
                            <span className="text-slate-500">Pass:</span>
                            <span className="text-amber-700 font-bold text-[10px]">{visitorPassword}</span>
                          </div>
                          <div className="flex justify-between text-[10px] pt-1.5">
                            <span className="text-slate-500">Ingressi:</span>
                            <span className="font-bold text-green-700">{visitorAccessCount}/100</span>
                          </div>
                        </div>
                        <div className="space-y-1.5 pt-1 border-t border-amber-100/60">
                          <button
                            onClick={triggerAccessDemo}
                            className="w-full py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[9px] rounded-lg transition-all"
                          >
                            Simula un Ingresso (-1)
                          </button>
                          <button
                            onClick={rechargeAccesses}
                            className="w-full py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[9px] rounded-lg transition-all"
                          >
                            Ricarica (€10)
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                        <img 
                          src={currentUser.avatarUrl} 
                          alt="Avatar" 
                          className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                        />
                        <div className="min-w-0">
                          <span className="text-[8px] font-mono font-bold text-blue-605 uppercase block">Autore</span>
                          <span className="text-sm font-display font-medium text-slate-900 block truncate">{currentUser.fullName}</span>
                          <span className="text-[9px] text-slate-500 block truncate font-mono">{currentUser.email}</span>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] rounded-lg font-bold transition-all text-center"
                    >
                      Disconnetti Sessione
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <p className="text-[11px] text-slate-550 leading-relaxed font-sans">
                      Prendi parte al network. Raccordati d'ufficio alle sezioni.
                    </p>
                    <div className="flex p-0.5 bg-slate-100 rounded-lg text-[9px] font-bold">
                      <button
                        type="button"
                        onClick={() => setRegisterMode('autore')}
                        className={`flex-1 py-1 text-center rounded-md ${registerMode === 'autore' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                      >
                        Autore Creativo
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegisterMode('visitatore')}
                        className={`flex-1 py-1 text-center rounded-md ${registerMode === 'visitatore' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500'}`}
                      >
                        Visitatore
                      </button>
                    </div>

                    <div className="space-y-2 text-xs">
                      <input
                        type="text"
                        required
                        placeholder="Nome / Pseudonimo"
                        value={currentUser.fullName}
                        onChange={(e) => setCurrentUser({...currentUser, fullName: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                      <input
                        type="email"
                        required
                        placeholder="La tua email"
                        value={currentUser.email}
                        onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                      {registerMode === 'autore' && (
                        <>
                          <div className="space-y-1">
                            <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Macro-Sezione</label>
                            <select
                              value={currentUser.selectedSection}
                              onChange={(e) => {
                                const sec = e.target.value;
                                const firstSub = SUBSECTION_LITERALS.find(sub => sub.sectionId === sec)?.id || '';
                                setCurrentUser({...currentUser, selectedSection: sec, selectedSubsection: firstSub});
                              }}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] focus:outline-none focus:border-blue-500 text-slate-750 font-sans"
                            >
                              {SECTION_LITERALS.map(s => (
                                <option key={s.id} value={s.id}>{s.title}</option>
                              ))}
                            </select>
                          </div>

                          <div className="space-y-1 animate-fadeIn">
                            <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Pratica Specifica (Sottosezione d'Ingresso)</label>
                            <select
                              value={currentUser.selectedSubsection || 'A1'}
                              onChange={(e) => setCurrentUser({...currentUser, selectedSubsection: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[10px] focus:outline-none focus:border-blue-500 text-slate-750 font-sans"
                            >
                              {SUBSECTION_LITERALS.filter(sub => sub.sectionId === currentUser.selectedSection).map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                              ))}
                            </select>
                          </div>
                        </>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-lg transition-all shadow-xs"
                    >
                      {registerMode === 'autore' ? "Iscriviti d'Arte" : "Ottieni Pass Visitatore (€10)"}
                    </button>
                  </form>
                )}
              </div>

              {/* Sections Shortcuts & Filters */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-3">
                <h4 className="text-xs font-display font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 pb-1.5 border-b border-slate-100">
                  <Layers className="text-blue-600" size={14} /> Sezioni Accademiche
                </h4>
                <div className="space-y-1 max-h-[300px] overflow-y-auto no-scrollbar pt-1">
                  <button
                    onClick={() => setSelectedSection('ALL')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-all font-medium border ${
                      selectedSection === 'ALL'
                        ? 'bg-blue-600 text-white border-blue-600 font-bold'
                        : 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <Globe size={12} />
                      <span>Sezione Globale</span>
                    </span>
                  </button>

                  {SECTION_LITERALS.map(sec => {
                    const SecIcon = sec.icon;
                    const isSelected = selectedSection === sec.id;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setSelectedSection(sec.id);
                          setNewPostSection(sec.id);
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-all font-medium border ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                            : 'bg-white text-slate-700 border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <SecIcon size={12} className={isSelected ? 'text-white' : 'text-blue-500'} />
                          <span className="truncate">{sec.title}</span>
                        </span>
                        <span className="text-[7px] font-mono uppercase bg-slate-100 text-slate-800 p-1 rounded font-bold shrink-0">
                          {sec.id}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Center Column (Create Post Widget + Scrollable Posts Feed) */}
            <div className="lg:col-span-6 space-y-5" id="fb-center-column">
              
              {/* Tutela d'Autore Banner link */}
              {onGoToDeposit && (
                <div 
                  onClick={onGoToDeposit}
                  className="bg-blue-600 border border-blue-700 p-4 rounded-2xl shadow-xs hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-between gap-4 group text-white"
                  id="tutela-link-banner"
                >
                  <div className="space-y-1">
                    <span className="px-2 py-0.5 bg-white text-blue-700 text-[8px] font-mono font-bold rounded uppercase tracking-wider">
                      Servizio di Tutela Legale
                    </span>
                    <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-blue-50 transition-colors">
                      ✍️ Deposita la tua opera (Tutela d'Autore)
                    </h3>
                    <p className="text-[10px] sm:text-xs text-blue-50 leading-relaxed font-sans">
                      Per tutelare legalmente la tua opera e ricevere un Certificato di Priorità garantito e crittografato ad uso legale, procedi al deposito.
                    </p>
                  </div>
                  <div className="p-2 bg-blue-500 rounded-xl border border-blue-400 text-white group-hover:bg-white group-hover:text-blue-600 transition-all shrink-0">
                    <ExternalLink size={14} />
                  </div>
                </div>
              )}

              {/* FB Style Create Post Widget */}
              <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Plus className="text-blue-605" size={15} />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">Crea un nuovo post d'ingegno</span>
                </div>

                {!isRegistered ? (
                  <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500 font-sans">
                    Iscriviti o accedi dal pannello di sinistra per caricare foto e certificare la tua opera!
                  </div>
                ) : (
                  <form onSubmit={handlePublishPost} className="space-y-3 text-xs">
                    {postSuccess && (
                      <div className="p-2 bg-green-50 text-green-700 border border-green-150 rounded-lg font-bold flex items-center gap-1 text-[10px]">
                        <CheckCircle size={12} />
                        <span>{postSuccess}</span>
                      </div>
                    )}

                    <div className="flex gap-2.5 items-center">
                      <img 
                        src={currentUser.avatarUrl} 
                        alt="User" 
                        className="w-8 h-8 rounded-full border border-slate-200 object-cover"
                      />
                      <input
                        type="text"
                        required
                        placeholder={`Cosa c'è nei tuoi pensieri, ${currentUser.fullName || 'Creatore'}?`}
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        className="flex-1 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-blue-500 text-slate-850 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase mb-1">Tecnica</label>
                        <input
                          type="text"
                          placeholder="Es: Olio su tela"
                          value={newPostTech}
                          onChange={(e) => setNewPostTech(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-205 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500 text-slate-800 font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase mb-1">Inquadramento Sezione</label>
                        <select
                          value={newPostSection}
                          onChange={(e) => {
                            const sec = e.target.value;
                            const firstSub = SUBSECTION_LITERALS.find(sub => sub.sectionId === sec)?.id || '';
                            setNewPostSection(sec);
                            setNewPostSubsection(firstSub);
                          }}
                          className="w-full bg-slate-50 border border-slate-205 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-blue-500 text-slate-800 font-sans"
                        >
                          {SECTION_LITERALS.map(s => (
                            <option key={s.id} value={s.id}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase mb-1">Pratica Specifica</label>
                        <select
                          value={newPostSubsection}
                          onChange={(e) => setNewPostSubsection(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-205 rounded-lg px-2 py-1 text-[10px] focus:outline-none focus:border-blue-500 text-slate-800 font-sans"
                        >
                          {SUBSECTION_LITERALS.filter(s => s.sectionId === newPostSection).map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[8px] font-mono font-bold text-slate-400 uppercase">Descrizione / Tesi di invenzione</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Racconta i valori etici e la simbologia racchiusa..."
                        value={newPostDesc}
                        onChange={(e) => setNewPostDesc(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:border-blue-500 text-slate-800"
                      />
                    </div>

                    {/* Choose Presets */}
                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg border border-slate-150">
                      <span className="text-[10px] font-bold text-slate-500">Allegato d'Arte:</span>
                      <div className="flex gap-1">
                        {ARTWORK_PRESETS.map((pImg, idx) => (
                          <img 
                            key={idx}
                            src={pImg}
                            alt="Preset"
                            onClick={() => {
                              setSelectedPresetImage(pImg);
                              setUploadedFileName(`Certificato Preset ${idx + 1}`);
                            }}
                            className={`w-7 h-7 rounded object-cover cursor-pointer hover:border-blue-500 transition-all border ${
                              selectedPresetImage === pImg ? 'border-blue-600 scale-105' : 'border-slate-200 opacity-60'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Sparkles size={11} />
                      Pubblica e deposita in Bacheca
                    </button>
                  </form>
                )}
              </div>

              {/* Feed List (Facebook style feed) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                    {activeSecObj ? `FEED DI SEZIONE: ${activeSecObj.title}` : 'FEED GENERALE PORTALE'}
                  </span>
                  <div className="relative">
                    <Search className="absolute left-2 top-1.5 text-slate-400" size={10} />
                    <input
                      type="text"
                      placeholder="Cerca nei post..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-6 pr-2 py-0.5 max-w-[130px] bg-white border border-slate-200 rounded-full text-[10px] focus:outline-none text-slate-800 font-sans"
                    />
                  </div>
                </div>

                {filteredPosts.length === 0 ? (
                  <div className="p-8 bg-white border border-slate-200 rounded-2xl text-center text-xs text-slate-400 font-sans">
                    Nessun post corrisponde alla ricerca corrente o alla sezione selezionata.
                  </div>
                ) : (
                  filteredPosts.map((post) => (
                    <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3.5" id={`fb-post-${post.id}`}>
                      
                      {/* Post Header */}
                      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-2.5">
                        <div 
                          className="flex items-center gap-2.5 min-w-0 cursor-pointer hover:opacity-85 select-none"
                          onClick={() => selectCreatorProfile(getCreatorIdByAuthorName(post.author))}
                          title="Vedi Profilo d'Ingegno"
                        >
                          <img 
                            src={post.avatarUrl} 
                            alt="Avatar" 
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-slate-900 block truncate leading-none hover:underline">{post.author}</span>
                            <span className="text-[9px] text-slate-400 font-mono mt-1 block leading-none">{post.timestamp}</span>
                          </div>
                        </div>
                        
                        <div className="text-right shrink-0">
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[7px] font-mono rounded font-bold uppercase">
                            Sez. {post.section}
                          </span>
                        </div>
                      </div>

                      {/* Title & Body */}
                      <div className="space-y-1.5">
                        <h4 className="text-sm font-bold text-slate-900 leading-snug">{post.title}</h4>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold inline-block">
                          {post.technique}
                        </span>
                        <p className="text-xs text-slate-700 font-sans leading-relaxed">{post.description}</p>
                      </div>

                      {/* Image full bled */}
                      {post.imageUrl && (
                        <div className="relative rounded-xl overflow-hidden border border-slate-100 max-h-64 bg-slate-50">
                          <img 
                            referrerPolicy="no-referrer"
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover max-h-64" 
                          />
                        </div>
                      )}

                      {/* Interaction Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <button
                          onClick={() => handleToggleLike(post.id)}
                          className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                            post.likedByMe ? 'text-red-655' : 'text-slate-500 hover:text-red-500'
                          }`}
                        >
                          <Heart size={13} fill={post.likedByMe ? 'currentColor' : 'none'} />
                          <span>{post.likes} Mi piace</span>
                        </button>
                        
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          {post.comments.length} commenti accademici
                        </span>
                      </div>

                      {/* Comment History List */}
                      {post.comments.length > 0 && (
                        <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                          {post.comments.map((c) => (
                            <div key={c.id} className="text-[10.5px] leading-relaxed border-b border-dotted border-slate-200/50 pb-1 last:border-0 last:pb-0">
                              <div className="flex justify-between font-bold text-slate-900">
                                <span>{c.author}</span>
                                <span className="text-[8px] text-slate-400 font-mono font-semibold">{c.timestamp}</span>
                              </div>
                              <p className="text-slate-700 mt-0.5">{c.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Inline Comment Form */}
                      <form onSubmit={(e) => handleAddComment(post.id, e)} className="flex gap-1.5 pt-1.5">
                        <input
                          type="text"
                          placeholder={isRegistered ? "Aggiungi una lode o annotazione tecnica..." : "Iscriviti a sinistra per commentare"}
                          disabled={!isRegistered}
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-[11px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                        <button
                          type="submit"
                          disabled={!isRegistered}
                          className="p-1 px-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-full disabled:opacity-40 transition-all border border-blue-100"
                        >
                          <Send size={11} />
                        </button>
                      </form>

                    </div>
                  ))
                )}
              </div>

            </div>

            {/* Right Column (Section Live Chatroom & Online Directory) */}
            <div className="lg:col-span-3 space-y-6" id="fb-right-column">
              
              {/* Live Section Chat */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs flex flex-col justify-between min-h-[350px]">
                <div className="space-y-3">
                  <div className="border-b border-slate-100 pb-2">
                    <span className="text-[8px] font-mono font-bold text-blue-600 block uppercase">Stanza Chat live</span>
                    <h4 className="text-xs font-display font-black text-slate-900 uppercase mt-0.5 flex items-center gap-1">
                      <MessageSquare size={12} className="text-blue-500" />
                      Canale: {selectedSection}
                    </h4>
                  </div>

                  <div className="space-y-2 max-h-[220px] overflow-y-auto no-scrollbar pr-1 pt-0.5">
                    {(chatMessagesBySection[selectedSection] || []).map((msg, idx) => (
                      <div key={idx} className="text-[11px] p-2 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-baseline mb-0.5">
                          <span className="font-bold text-slate-900 truncate max-w-[120px]">{msg.sender}</span>
                          <span className="text-[7.5px] text-slate-400 font-mono leading-none">{msg.time}</span>
                        </div>
                        <p className="text-slate-700 leading-normal font-sans">{msg.text}</p>
                      </div>
                    ))}
                    {(chatMessagesBySection[selectedSection] || []).length === 0 && (
                      <p className="text-[9px] text-slate-400 text-center py-6 font-sans">
                        Nessun messaggio recente. Invia una riflessione per far sintonizzare lo staff!
                      </p>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSendGroupMessage} className="mt-3 pt-2 border-t border-slate-100 flex gap-1.5">
                  <input
                    type="text"
                    required
                    placeholder="Digita qualcosa live..."
                    value={liveChatInput}
                    onChange={(e) => setLiveChatInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Send size={10} />
                  </button>
                </form>
              </div>

              {/* Online Faculty Members simulating Facebook Sidebar contacts */}
              <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-3">
                <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block">Consulenti Accademici Online</span>
                <div className="space-y-2.5 pt-1">
                  <div 
                    onClick={() => selectCreatorProfile('lucafalace')}
                    className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors select-none"
                    title="Vedi Profilo d'Ingegno"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                          alt="Luca" 
                          className="w-6 h-6 rounded-full object-cover" 
                        />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 border border-white rounded-full"></span>
                      </div>
                      <span className="font-semibold text-slate-800 hover:underline">Dott. Luca Falace</span>
                    </div>
                    <span className="text-[8px] font-mono text-green-600 bg-green-50 px-1 rounded font-bold">DISPONIBILE</span>
                  </div>

                  <div 
                    onClick={() => selectCreatorProfile('gabriele_valente')}
                    className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors select-none"
                    title="Vedi Profilo d'Ingegno"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" 
                          alt="Gabriele" 
                          className="w-6 h-6 rounded-full object-cover" 
                        />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 border border-white rounded-full"></span>
                      </div>
                      <span className="font-semibold text-slate-800 hover:underline">Dott. Gabriele Valente</span>
                    </div>
                    <span className="text-[8px] font-mono text-green-600 bg-green-50 px-1 rounded font-bold">ONLINE</span>
                  </div>
 
                  <div 
                    onClick={() => selectCreatorProfile('silvia_maestri')}
                    className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors select-none"
                    title="Vedi Profilo d'Ingegno"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <img 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" 
                          alt="Silvia" 
                          className="w-6 h-6 rounded-full object-cover" 
                        />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 border border-white rounded-full"></span>
                      </div>
                      <span className="font-semibold text-slate-800 hover:underline">Silvia Maestri</span>
                    </div>
                    <span className="text-[8px] font-mono text-green-600 bg-green-50 px-1 rounded font-bold">ONLINE</span>
                  </div>
 
                  <div 
                    onClick={() => selectCreatorProfile('claudio_genio')}
                    className="flex items-center justify-between text-xs cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors select-none"
                    title="Vedi Profilo d'Ingegno"
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative opacity-70">
                        <img 
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80" 
                          alt="Claudio" 
                          className="w-6 h-6 rounded-full object-cover" 
                        />
                        <span className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-slate-400 border border-white rounded-full"></span>
                      </div>
                      <span className="text-slate-500 hover:underline font-semibold">Claudio G.</span>
                    </div>
                    <span className="text-[8px] font-mono text-slate-400 bg-slate-100 px-1 rounded">OFFLINE</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      ) : (
        /*========================================================================
                                  INSTAGRAM STYLE VIEW (VETRINE INDIVIDUALI)
          ========================================================================*/
        <div className="space-y-6 animate-fadeIn" id="instagram-view">
          
          {/* Instagram stories profile selector with glowing rings around Avatars */}
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2 overflow-x-auto no-scrollbar">
            <span className="text-[8.5px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2 px-1">Seleziona d'Arte o Scienza il Profilo Vetrina (Stories)</span>
            <div className="flex gap-4.5 pb-1">
              {allCreators.filter(creator => {
                if (creator.id === 'lucafalace' || creator.id === 'current_user') return true;
                const hasMatchingPosts = creator.posts.some(p => {
                  const isArt = ['A', 'B', 'E', 'F'].includes(p.section);
                  return activeArchitecture === 'instagram' ? isArt : !isArt;
                });
                return hasMatchingPosts;
              }).map((creator) => {
                const isActive = selectedCreatorId === creator.id;
                const isUser = creator.id === 'current_user';
                const isScience = getCreatorProfileStyle(creator.id) === 'facebook';
                return (
                  <div 
                    key={creator.id}
                    onClick={() => {
                      setSelectedCreatorId(creator.id);
                      setActiveInstagramSubTab('posts');
                    }}
                    className="flex flex-col items-center cursor-pointer group select-none shrink-0"
                  >
                    <div className={`relative p-0.5 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-600' 
                        : 'bg-slate-200 hover:bg-slate-300'
                    }`}>
                      <div className="bg-white p-0.5 rounded-full">
                        <img 
                          src={creator.avatarUrl} 
                          alt={creator.fullName} 
                          className="w-12 h-12 rounded-full object-cover border border-slate-100"
                        />
                      </div>
                      {creator.isVerified && (
                        <span className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-0.5 border border-white leading-none">
                          <CheckCircle size={8} fill="currentColor" />
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] font-mono mt-1 flex items-center gap-1 ${isActive ? 'font-black text-slate-900 border-b border-slate-900' : 'text-slate-500 group-hover:text-slate-800'}`}>
                      {isUser ? "Mio Profilo" : `@${creator.username}`}
                      <span className={`w-1.5 h-1.5 rounded-full ${isScience ? 'bg-blue-600' : 'bg-pink-600'}`} title={isScience ? 'Profilo Scienza' : 'Profilo Arte'}></span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sincronismo Architettura Profile Header - Information Banner for User */}
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center bg-slate-50 border border-slate-200 px-5 py-3 rounded-2xl gap-3 text-xs text-black">
            <div className="space-y-0.5 text-center sm:text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase tracking-wide">Layout Dedicato per Dipartimento Sincrono</span>
              <p className="font-sans font-medium text-slate-700">
                Inquadramento: <strong className="text-blue-600 font-bold">Profilo Scienza</strong> (Layout a bacheca) · <strong className="text-pink-600 font-bold">Profilo Arte</strong> (Layout a vetrina).
              </p>
            </div>
            
            {/* Interactive manual toggle button on each profile for exploration */}
            <div className="flex bg-white border border-slate-200 p-0.5 rounded-xl shrink-0 gap-1 shadow-2xs">
              <button
                onClick={() => setProfileLayoutOverrides(prev => ({ ...prev, [activeCreator.id]: 'facebook' }))}
                className={`px-3 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                  getCreatorProfileStyle(activeCreator.id) === 'facebook'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-905 bg-transparent'
                }`}
              >
                Layout Scienza
              </button>
              <button
                onClick={() => setProfileLayoutOverrides(prev => ({ ...prev, [activeCreator.id]: 'instagram' }))}
                className={`px-3 py-1 rounded-lg text-[9px] font-bold transition-all cursor-pointer ${
                  getCreatorProfileStyle(activeCreator.id) === 'instagram'
                    ? 'bg-pink-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-905 bg-transparent'
                }`}
              >
                Layout Arte
              </button>
            </div>
          </div>

          {/* DYNAMIC RENDERING: FACEBOOK OR INSTAGRAM COMPONENT DETAILED PROFILE */}
          {getCreatorProfileStyle(activeCreator.id) === 'facebook' ? (
            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xs max-w-4xl mx-auto space-y-6" id="facebook-profile-card">
              
              {/* Cover photo banner */}
              <div className="relative h-44 sm:h-56 bg-slate-100">
                <img 
                  src={
                    activeCreator.id === 'lucafalace' 
                      ? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" 
                      : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                  } 
                  alt="Cover Photo" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlapping Avatar circles */}
                <div className="absolute -bottom-10 left-6 sm:left-10 flex items-end gap-3.5">
                  <div className="relative group">
                    <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                      <img 
                        src={activeCreator.avatarUrl} 
                        alt={activeCreator.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Camera overlay decoration */}
                    <div className="absolute bottom-0 right-0 bg-slate-100 border border-slate-250 p-1 rounded-full cursor-pointer shadow-2xs hover:bg-slate-200">
                      <Camera size={11} className="text-black" />
                    </div>
                    
                    {/* Custom red R2 brand badge indicating broadcast/RAI certification as in Screenshot 1 */}
                    {activeCreator.id === 'lucafalace' && (
                      <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-red-650 border border-white text-white flex items-center justify-center font-mono font-bold text-[8px] tracking-widest shadow-xs" title="Integrazione Certificata RAI 2">
                        R2
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Title, verify icons, standard action rows */}
              <div className="pt-12 sm:pt-14 px-6 sm:px-10 pb-5 border-b border-slate-100 space-y-3.5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-1.5">
                      <h2 className="text-lg sm:text-xl font-bold text-black font-display tracking-tight flex items-center gap-1">
                        {activeCreator.fullName}
                        {activeCreator.isVerified && (
                          <CheckCircle size={15} className="text-blue-600 font-black inline-block" fill="currentColor" />
                        )}
                      </h2>
                      <span className="text-[8px] sm:text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-mono font-bold uppercase border border-blue-100 shrink-0">
                        Membro AIC Certificato
                      </span>
                    </div>
                    
                    <p className="text-xs text-black font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Pagina · {activeCreator.category}
                    </p>

                    <p className="text-[11px] text-slate-500 font-mono">
                      {activeCreator.followers} Follower · {activeCreator.following} seguiti · {creatorActivePosts.length} post
                    </p>
                  </div>

                  {/* Standard FB button configurations */}
                  <div className="flex flex-wrap gap-2 pt-1 font-sans">
                    <button 
                      onClick={() => alert("Accesso alla Dashboard Professionale della Fondazione AIC autorizzato come coordinatore consulente.")}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-black font-bold text-[11px] rounded-lg transition-all flex items-center gap-1 border border-slate-250 cursor-pointer"
                    >
                      <Layers size={11} className="text-blue-600" />
                      Dashboard per professionisti
                    </button>
                    <button 
                      onClick={() => alert("Deposito formale brevetto termo-dinamico guidato da consulenti accademici AIC.")}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-black font-bold text-[11px] rounded-lg transition-all border border-slate-200 cursor-pointer"
                    >
                      Pubblicizza
                    </button>
                    <button 
                      onClick={() => handleFollowCreator(activeCreator.id)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg transition-all shadow-2xs cursor-pointer"
                    >
                      {instagramFollowedState[activeCreator.id] ? "Seguito ✓" : "Segui"}
                    </button>
                  </div>
                </div>

                {/* Sub-navigation tabs matching Screenshot 1 */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 pt-3 text-[10.5px] text-black font-bold uppercase tracking-wider">
                  <span className="border-b-2 border-blue-600 pb-2 px-3 cursor-pointer text-blue-600 shrink-0">Tutti i post</span>
                  <span className="hover:text-blue-500 pb-2 px-3 cursor-pointer text-slate-500 shrink-0" onClick={() => alert("Foto d'archivio depositate presso CERN-Zenodo.")}>Foto scientifiche</span>
                  <span className="hover:text-blue-500 pb-2 px-3 cursor-pointer text-slate-500 shrink-0" onClick={() => alert("Documentari e Brevetti.")}>Reels d'ingegno</span>
                  <span className="hover:text-blue-500 pb-2 px-3 cursor-pointer text-slate-500 shrink-0" onClick={() => alert("Esposizioni future e simposi.")}>Eventi</span>
                  <span className="hover:text-blue-500 pb-2 px-3 cursor-pointer text-slate-500 shrink-0" onClick={() => alert("Menzioni esterne in brevetti d'ingegno.")}>Menzioni</span>
                </div>
              </div>

              {/* Split layout: Sidebar left, timeline blocks right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8">
                
                {/* Sidebar details */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs space-y-3.5">
                    <h4 className="text-xs font-bold text-black border-b border-slate-100 pb-1.5 uppercase font-display block">
                      Biografica & Dettagli Pagina
                    </h4>
                    
                    <div className="text-xs text-black space-y-3 font-sans leading-relaxed">
                      <p className="font-semibold text-slate-800">
                        {activeCreator.id === 'lucafalace' 
                          ? "Storico dell'arte e inventore. Premio Ecomondo 2014 Presidente della Repubblica, Onorificenza per il progresso e Sincronismo d'Ingegno. Fondatore e Presidente Onorario AIC."
                          : activeCreator.activeBio}
                      </p>
                      
                      <div className="space-y-3 pt-2 border-t border-slate-100 text-[11px]">
                        <div className="flex items-center gap-2">
                          <Globe size={12.5} className="text-blue-600 shrink-0" />
                          <a href={`https://${activeCreator.website}`} target="_blank" rel="noreferrer" className="font-bold hover:underline truncate text-blue-600">
                            {activeCreator.id === 'lucafalace' ? 'LUCA FALACE AIC SITO WEB' : activeCreator.website}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={12.5} className="text-slate-500 shrink-0" />
                          <span>Genere: <strong>Maschio</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={12.5} className="text-amber-600 shrink-0" />
                          <span>Classificazione: <strong>1 recensione · 5 stelle</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Lock size={12.5} className="text-green-600 shrink-0" />
                          <span>Membro d'Ingegno Sincronizzato</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Copyright and legal security notice */}
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-500 leading-normal font-sans">
                    <span className="font-bold text-slate-800 uppercase text-[8px] tracking-wider block font-mono mb-1">Licenza di Sincronismo</span>
                    I diritti del saggio e dei disegni esagonali depositati da questa identità accademica sono registrati alla FondazioneAIC sotto la tutela legale del CLO Avv. P. F. De Juliis.
                  </div>
                </div>

                {/* Timeline content list */}
                <div className="lg:col-span-7 space-y-4">
                  {creatorActivePosts.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-400">
                      Nessun post d'Ingegno scientifico depositato al momento.
                    </div>
                  ) : (
                    creatorActivePosts.map((post) => (
                      <div key={post.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3.5 text-left">
                        
                        {/* Header of post */}
                        <div className="flex items-center justify-between gap-2.5 border-b border-slate-100 pb-2">
                          <div className="flex items-center gap-2">
                            <img src={activeCreator.avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-slate-100" />
                            <div>
                              <span className="text-xs font-bold text-black block leading-none">{post.author}</span>
                              <span className="text-[8.5px] text-slate-400 font-mono mt-0.5 block">{post.timestamp}</span>
                            </div>
                          </div>
                          <span className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[7px] font-mono rounded font-bold uppercase">
                            Sez. {post.section}
                          </span>
                        </div>

                        {/* Text and technique detail */}
                        <div className="space-y-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-black leading-snug">{post.title}</h4>
                          <span className="text-[9px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-mono font-bold inline-block">
                            {post.technique}
                          </span>
                          <p className="text-xs text-black font-sans leading-relaxed">{post.description}</p>
                        </div>

                        {/* Attached document drawing */}
                        {post.imageUrl && (
                          <div className="relative rounded-xl overflow-hidden border border-slate-150 max-h-56 bg-slate-50">
                            <img referrerPolicy="no-referrer" src={post.imageUrl} alt={post.title} className="w-full h-full object-cover max-h-56" />
                          </div>
                        )}

                        {/* Likes comment summaries */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-black">
                          <button onClick={() => handleToggleLike(post.id)} className={`flex items-center gap-1.5 font-bold cursor-pointer ${post.likedByMe ? 'text-red-700 font-bold' : 'text-slate-500 hover:text-black'}`}>
                            <Heart size={12} fill={post.likedByMe ? 'currentColor' : 'none'} />
                            <span>{post.likes} Consigliato</span>
                          </button>
                          <span className="text-[10px] text-slate-400 font-mono font-bold">{post.comments.length} recensioni d'elogio</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

              </div>
            </div>

          ) : (
            <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-[2rem] shadow-xs max-w-4xl mx-auto space-y-8" id="instagram-profile-card">
              
              {/* Upper Username Info bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-slate-700 flex items-center gap-1">
                  <Camera size={13} className="text-pink-600" />
                  @{activeCreator.username}
                </span>
                <span className="text-[9px] bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono text-black font-bold uppercase">
                  Membro AIC Certificato
                </span>
              </div>

              {/* Header metrics stats row */}
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 border-b border-slate-100 pb-7">
                
                {/* Glowing Highlight Story Avatar */}
                <div className="relative shrink-0">
                  <div className="p-0.5 rounded-full bg-blue-600">
                    <div className="bg-white p-0.5 rounded-full">
                      <img 
                        src={activeCreator.avatarUrl} 
                        alt={activeCreator.fullName} 
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-slate-100 shadow-2xs" 
                      />
                    </div>
                  </div>
                  {activeCreator.isVerified && (
                    <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
                      <CheckCircle size={10} fill="currentColor" />
                    </div>
                  )}
                </div>

                {/* Profile detail tags */}
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 justify-center md:justify-start">
                    <h2 className="text-lg md:text-xl font-bold text-black font-display">
                      {activeCreator.username}
                    </h2>
                    {activeCreator.isVerified && (
                      <span className="bg-blue-100 text-blue-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded uppercase shrink-0">VERIFICATO</span>
                    )}
                  </div>

                  {/* Standard metrics counters */}
                  <div className="flex items-center justify-center md:justify-start gap-8 font-sans text-sm text-black">
                    <div>
                      <strong className="text-black font-mono font-bold mr-1">
                        {creatorActivePosts.length}
                      </strong> 
                      post esposti
                    </div>
                    <div>
                      <strong className="text-black font-mono font-bold mr-1">
                        {activeCreator.followers}
                      </strong> 
                      follower
                    </div>
                    <div>
                      <strong className="text-black font-mono font-bold mr-1">
                        {activeCreator.following}
                      </strong> 
                      seguiti
                    </div>
                  </div>

                  {/* Bio block precisely styled */}
                  <div className="text-xs sm:text-sm text-black space-y-1 max-w-xl font-sans text-left">
                    <span className="font-bold block text-black font-display leading-tight">{activeCreator.fullName}</span>
                    <span className="text-[10px] font-bold text-amber-700 block uppercase tracking-wider">
                      {activeCreator.category}
                    </span>
                    <p className="text-black leading-relaxed text-xs">
                      {activeCreator.activeBio}
                    </p>
                    
                    <a href={`https://${activeCreator.website}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline text-blue-700 font-bold text-[11px] pt-1">
                      <ExternalLink size={11} />
                      <span>{activeCreator.website}</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* Action buttons precisely matching Screenshot 2 */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <button 
                  onClick={() => handleFollowCreator(activeCreator.id)}
                  className={`px-6 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    instagramFollowedState[activeCreator.id] 
                      ? 'bg-slate-100 hover:bg-slate-200 text-black border-slate-200' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                  }`}
                >
                  {instagramFollowedState[activeCreator.id] ? "Seguito" : "Segui"}
                </button>
                <button 
                  onClick={() => alert(`Simulazione invio messaggio diretto a @${activeCreator.username}. Per una consulenza formale rivolgersi al sistema AIC.`)}
                  className="px-5 py-1.5 bg-slate-50 hover:bg-slate-100 text-black rounded-lg text-xs font-bold transition-all border border-slate-200 cursor-pointer"
                >
                  Invia Messaggio
                </button>
                
                {activeCreator.id === 'lucafalace' && (
                  <>
                    <button onClick={() => alert("Monografia 888 Hz frequenze d'integrazione biologica depositata.")} className="px-3 py-1.5 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-lg text-[9px] font-mono font-bold transition-all border border-yellow-200 cursor-pointer">
                      ✨ 888 Hz Frequenze Biologiche
                    </button>
                    <button onClick={() => alert("Sito istituzionale e archivio scientifico della Fondazione AIC.")} className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-[9px] font-mono font-bold transition-all border border-blue-200 cursor-pointer">
                      📘 Portale Accademico AIC
                    </button>
                  </>
                )}
              </div>

              {/* Story Highlights Circles matching Screenshot 2 */}
              <div className="flex gap-4.5 overflow-x-auto no-scrollbar py-2 border-b border-slate-150 text-center">
                <div className="flex flex-col items-center cursor-pointer shrink-0" onClick={() => alert("Opzione per aggiungere storie inedite d'ingegno d'arte.")}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-300 flex items-center justify-center bg-slate-50 text-slate-400 hover:text-slate-800">
                    <Plus size={16} />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 mt-1 block">Novità</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer shrink-0" onClick={() => alert("Monografia Documentale AIC.")}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 overflow-hidden bg-slate-100 p-0.5">
                    <img referrerPolicy="no-referrer" src={ARTWORK_PRESETS[1]} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 mt-1 block">DOCUMENTA...</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer shrink-0" onClick={() => alert("Anteprima nuovo libro Saggistica d'Ingegno.")}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 overflow-hidden bg-slate-100 p-0.5">
                    <img referrerPolicy="no-referrer" src={ARTWORK_PRESETS[2]} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 mt-1 block">NEW BOOK 2...</span>
                </div>
                <div className="flex flex-col items-center cursor-pointer shrink-0" onClick={() => alert("Sintesi ed estratti d'esposizione.")}>
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-slate-200 overflow-hidden bg-slate-100 p-0.5">
                    <img referrerPolicy="no-referrer" src={ARTWORK_PRESETS[5]} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 mt-1 block">Sintesi Episodi</span>
                </div>
              </div>

              {/* Navigation profile columns tabs */}
              <div className="flex justify-center border-t border-slate-100 pt-1">
                <div className="flex gap-8 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <button
                    onClick={() => setActiveInstagramSubTab('posts')}
                    className={`flex items-center gap-1.5 py-4 border-t-2 cursor-pointer transition-all ${
                      activeInstagramSubTab === 'posts' ? 'border-slate-900 text-slate-900 font-bold' : 'border-transparent hover:text-slate-700'
                    }`}
                  >
                    <Grid size={12} />
                    <span>Post in galleria</span>
                  </button>
                  <button
                    onClick={() => alert("Reels musicali d'arte accademica non-profit.")}
                    className="flex items-center gap-1.5 py-4 border-t-2 border-transparent text-slate-400 cursor-help"
                  >
                    <Video size={12} />
                    <span>Video</span>
                  </button>
                  <button
                    onClick={() => alert("Non sono presenti tag esterni bloccati o mensionati.")}
                    className="flex items-center gap-1.5 py-4 border-t-2 border-transparent text-slate-400 cursor-help"
                  >
                    <Users size={12} />
                    <span>Taggati</span>
                  </button>
                </div>
              </div>

              {/* Photo Square Grid */}
              {creatorActivePosts.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-sans text-xs">
                  <Camera size={36} className="mx-auto mb-2 text-slate-300" />
                  <p>Nessun post caricato in bacheca da questa identità d'arte.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1.5 sm:gap-4 pt-1" id="instagram-photos-grid">
                  {creatorActivePosts.map((post) => (
                    <div 
                      key={post.id}
                      onClick={() => openInstagramModal(post)}
                      className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer bg-slate-100 border border-slate-100"
                    >
                      <img 
                        referrerPolicy="no-referrer"
                        src={post.imageUrl || ARTWORK_PRESETS[0]} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />

                      {/* Overlays on hover */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-6 text-white text-xs font-bold font-sans">
                        <span className="flex items-center gap-1.5">
                          <Heart size={14} fill="white" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MessageSquare size={14} fill="white" />
                          {post.comments.length}
                        </span>
                      </div>

                      <div className="absolute bottom-1.5 left-1.5 bg-black/60 px-1.5 py-0.5 rounded text-[8px] text-white font-mono font-medium leading-none">
                        Sez. {post.section}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

        </div>
      )}

      {/* Shared structured grid on the 8 sections */}
      <div className="bg-white border border-slate-200 p-6 rounded-[2rem] shadow-xs max-w-5xl mx-auto space-y-4">
        <h3 className="text-sm font-display font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
          <Layers className="text-blue-600" size={17} /> I Lineamenti d'Integrazione delle 8 Sezioni (A-H)
        </h3>
        <p className="text-xs text-slate-600 leading-normal font-sans">
          Ogni utente che si iscrive viene assegnato a un coordinamento specifico. Può presentare opere inedite esagonali, brevetti tecnologici raccordati all'Eco-Thermodynamic Suit o saggi scientifici per contribuire all'unione internazionale del sapere umano sostenuto dalla Fondazione Falace delle AIC.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-1">
          {SECTION_LITERALS.map(s => (
            <div key={s.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-105 space-y-1 text-left">
              <span className="font-mono text-[9px] text-blue-600 font-bold block">{s.hemisphere === 'Destro' ? 'EMISFERO DESTRO' : 'EMISFERO SINISTRO'}</span>
              <span className="text-xs text-slate-900 font-bold font-display block">{s.title}</span>
              <p className="text-[9px] text-slate-500 leading-tight font-sans">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {isInstagramModalOpen && selectedPostForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden max-w-3xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col md:flex-row relative">
            
            {/* Close button absolute */}
            <button 
              onClick={() => {
                setIsInstagramModalOpen(false);
                setSelectedPostForModal(null);
              }}
              className="absolute top-3.5 right-3.5 z-10 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white cursor-pointer transition-colors"
            >
              <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Column: Full bleed visual post */}
            <div className="flex-1 bg-slate-50 flex items-center justify-center max-h-[40vh] md:max-h-full">
              <img 
                referrerPolicy="no-referrer"
                src={selectedPostForModal.imageUrl || ARTWORK_PRESETS[0]} 
                alt={selectedPostForModal.title}
                className="w-full h-full object-contain max-h-[40vh] md:max-h-[80vh]"
              />
            </div>

            {/* Right Column: Descriptions, priorities and comment threads */}
            <div className="w-full md:w-[320.5px] p-4 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-100 max-h-[50vh] md:max-h-full overflow-y-auto">
              <div>
                
                {/* Header author and verification */}
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                  <img 
                    src={selectedPostForModal.avatarUrl} 
                    alt="Avatar" 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block leading-none">{selectedPostForModal.author}</span>
                    <span className="text-[10px] text-amber-700 block font-semibold font-mono mt-0.5">Sezione {selectedPostForModal.section}</span>
                  </div>
                </div>

                {/* Priority detail metadata */}
                <div className="py-2.5 space-y-1 text-xs">
                  <h4 className="text-xs font-bold text-slate-905 leading-tight">{selectedPostForModal.title}</h4>
                  
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-1.5 rounded border border-slate-100 font-mono leading-none mt-1">
                    • Tecnica: {selectedPostForModal.technique}
                  </div>

                  <p className="text-slate-650 leading-relaxed font-sans text-[11px] mt-2 border-b border-slate-55 pb-2">
                    {selectedPostForModal.description}
                  </p>
                </div>

                {/* Comment feeds */}
                <div className="space-y-2.5 max-h-[140px] md:max-h-[180px] overflow-y-auto no-scrollbar pt-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 block uppercase">Recensioni d'elogio</span>
                  {selectedPostForModal.comments.map((c) => (
                    <div key={c.id} className="text-[10px] leading-relaxed bg-slate-50 p-2 rounded">
                      <div className="flex justify-between items-baseline font-bold text-slate-900">
                        <span>{c.author}</span>
                        <span className="text-[7.5px] font-mono text-slate-400">{c.timestamp}</span>
                      </div>
                      <p className="text-slate-700 font-sans mt-0.5">{c.text}</p>
                    </div>
                  ))}
                  {selectedPostForModal.comments.length === 0 && (
                    <p className="text-[9px] text-slate-400 font-sans">Ancora nessuna recensione per questo capolavoro. Lascia un commento!</p>
                  )}
                </div>

              </div>

              {/* Popup Interactions and comments form */}
              <div className="pt-3 border-t border-slate-100 mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <button 
                    onClick={() => handleToggleLike(selectedPostForModal.id)}
                    className={`flex items-center gap-1 ${selectedPostForModal.likedByMe ? 'text-red-600' : 'text-slate-500 hover:text-red-500'}`}
                  >
                    <Heart size={13} fill={selectedPostForModal.likedByMe ? "currentColor" : "none"} />
                    <span>{selectedPostForModal.likes} Mi piace</span>
                  </button>
                  <span className="text-[9px] text-slate-450 font-mono">{selectedPostForModal.timestamp}</span>
                </div>

                <form onSubmit={(e) => handleAddComment(selectedPostForModal.id, e)} className="flex gap-1">
                  <input
                    type="text"
                    placeholder={isRegistered ? "Scrivi una lode..." : "Iscriviti per scrivere"}
                    disabled={!isRegistered}
                    value={commentInputs[selectedPostForModal.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [selectedPostForModal.id]: e.target.value })}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] focus:outline-none focus:border-blue-500"
                  />
                  <button 
                    type="submit"
                    disabled={!isRegistered}
                    className="p-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-lg disabled:opacity-50"
                  >
                    <Send size={9} />
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

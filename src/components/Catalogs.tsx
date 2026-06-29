import React, { useState } from 'react';
import { BOOKS_CATALOG, ARTWORKS_CATALOG, INVENTIONS_CATALOG } from '../data/archiveData.js';
import { BookOpen, Palette, Cpu, Search, Sparkles } from 'lucide-react';

export default function Catalogs() {
  const [activeTab, setActiveTab] = useState<'books' | 'art' | 'patents'>('books');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = BOOKS_CATALOG.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArt = ARTWORKS_CATALOG.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    a.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPatents = INVENTIONS_CATALOG.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="books-catalog-section" className="bg-white border border-[#0066CC] rounded-2xl p-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#0066CC] pb-5 mb-5">
        <div>
          <h3 className="font-serif font-black text-sm text-black tracking-wider uppercase flex items-center gap-1.5">
            <Search className="w-4 h-4 text-[#0066CC]" />
            <span>Catalogo Unificato Nazionale</span>
          </h3>
          <p className="text-[10px] font-mono text-[#0066CC] uppercase tracking-wider font-bold">
            Allineamento SBN • UIBM • MiC
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-white border border-[#0066CC] p-1 rounded-xl">
          <button
            onClick={() => { setActiveTab('books'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${
              activeTab === 'books' ? 'bg-white border border-black text-[#0066CC] ' : 'text-black'
            }`}
          >
            SBN Libri
          </button>
          <button
            onClick={() => { setActiveTab('art'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${
              activeTab === 'art' ? 'bg-white border border-black text-[#0066CC] ' : 'text-black'
            }`}
          >
            MiC Opere
          </button>
          <button
            onClick={() => { setActiveTab('patents'); setSearchQuery(''); }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer ${
              activeTab === 'patents' ? 'bg-white border border-black text-[#0066CC] ' : 'text-black'
            }`}
          >
            Brevetti
          </button>
        </div>
      </div>

      {/* Query input */}
      <div className="relative mb-5">
        <input
          type="text"
          placeholder={`Cerca nel catalogo ${activeTab === 'books' ? 'SBN...' : activeTab === 'art' ? 'delle opere MiC...' : 'dei brevetti UIBM...'}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-[#0066CC] focus:border-[#0066CC] text-black rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans outline-none transition-colors"
        />
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-black" />
      </div>

      {/* Render list items */}
      <div className="space-y-3.5 max-h-[290px] overflow-y-auto pr-1">
        
        {activeTab === 'books' && filteredBooks.map(b => (
          <div key={b.id} className="border border-[#0066CC] rounded-xl p-3 bg-white text-xs">
            <div className="flex justify-between items-start mb-1 select-all">
              <strong className="text-black text-[11px] font-bold block">{b.title}</strong>
              {b.isbn && (
                <span className="text-[8.5px] font-mono text-black bg-white border border-[#0066CC] px-1.5 py-0.5 rounded ml-2 shrink-0">
                  ISBN: {b.isbn}
                </span>
              )}
            </div>
            <p className="text-black leading-snug line-clamp-2">{b.description}</p>
          </div>
        ))}

        {activeTab === 'art' && filteredArt.map(a => (
          <div key={a.id} className="border border-[#0066CC] rounded-xl p-3 bg-white text-xs">
            <div className="flex justify-between items-start mb-1">
              <strong className="text-black text-[11px] font-bold block uppercase">{a.title}</strong>
              <span className="text-[8.5px] font-mono text-black bg-white border border-[#0066CC] px-1.5 py-0.5 rounded ml-2 shrink-0">
                {a.year}
              </span>
            </div>
            <p className="text-black leading-snug line-clamp-2">{a.description}</p>
          </div>
        ))}

        {activeTab === 'patents' && filteredPatents.map(p => (
          <div key={p.id} className="border border-[#0066CC] rounded-xl p-3 bg-white text-xs">
            <div className="flex justify-between items-start mb-1">
              <strong className="text-black text-[11px] font-bold block uppercase">{p.title}</strong>
              <span className="text-[8.5px] font-mono text-[#0066CC] font-bold bg-white border border-[#0066CC] px-1.5 py-0.5 rounded ml-2 shrink-0">
                {p.status}
              </span>
            </div>
            <p className="text-black leading-snug line-clamp-2">{p.description}</p>
          </div>
        ))}

        {/* Fallbacks */}
        {((activeTab === 'books' && filteredBooks.length === 0) ||
          (activeTab === 'art' && filteredArt.length === 0) ||
          (activeTab === 'patents' && filteredPatents.length === 0)) && (
          <div className="text-center py-6 text-black text-xs font-mono">
            Nessun elemento corrisponde ai parametri di ricerca.
          </div>
        )}
      </div>
    </div>
  );
}

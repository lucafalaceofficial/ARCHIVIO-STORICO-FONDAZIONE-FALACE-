import React, { useState } from 'react';
import { BOOKS_CATALOG, Book } from '../data/archiveData.js';
import { Search, BookOpen, ExternalLink, HelpCircle, GraduationCap } from 'lucide-react';

export default function BooksSection({ onAskAboutBook }: { onAskAboutBook: (bookTitle: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredBooks = BOOKS_CATALOG.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (book.description && book.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase())) ||
      book.publisher.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || book.type === selectedType;

    return matchesSearch && matchesType;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'art':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'philosophy':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'theory':
        return 'bg-blue-100/85 text-blue-700 border-blue-200';
      case 'patent':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'science':
        return 'bg-rose-100 text-rose-750 border-rose-200';
      default:
        return 'bg-white text-black border-black';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'art': return 'Arte & Alchimia';
      case 'philosophy': return 'Filosofia Umanistica';
      case 'theory': return 'Teoria & Sincronismo';
      case 'patent': return 'Brevetti & Tecnica';
      case 'science': return 'Scienze & Campo Unificato';
      default: return 'Altro';
    }
  };

  return (
    <section className="py-16 px-6 border-b border-[#0066CC] bg-white scroll-mt-16" id="books">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#0066CC] font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Catalogo Bibliografico Nazionale • OPAC SBN</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-black">
              Le 49 Monografie Catalogate
            </h2>
            
            <p className="text-black text-sm mt-2 max-w-2xl leading-relaxed">
              Esplora i libri depositati e distribuiti a livello nazionale del Dott. Luca Falace. Ciascun volume documenta oltre trent'anni di ricerche estetiche, alchemiche ed elettrofisiologiche.
            </p>
          </div>
          
          <div className="text-xs font-mono text-black bg-white border border-[#0066CC] px-3.5 py-2 rounded-xl max-w-fit ">
            Volumi Schedati: <span className="text-[#0066CC] font-bold">{BOOKS_CATALOG.length}</span> / 49 SBN
          </div>
        </div>

        {/* Filters and Search toolbar */}
        <div className="bg-white border border-[#0066CC] p-4 rounded-2xl flex flex-col lg:flex-row gap-4 items-center justify-between mb-8 ">
          
          {/* Search Bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
            <input
              type="text"
              placeholder="Cerca per titolo, editore, parole chiave o ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-[#0066CC] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-black placeholder-slate-400 focus:outline-none focus:border-[#0066CC] transition-colors"
            />
          </div>

          {/* Quick Categories */}
          <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <span className="text-xs font-mono text-black mr-2 uppercase tracking-wider hidden xl:inline">Tematica:</span>
            {[
              { id: 'all', label: 'Tutti' },
              { id: 'theory', label: 'Sincronismo' },
              { id: 'science', label: 'Campo Unificato' },
              { id: 'art', label: 'Arte & Alchimia' },
              { id: 'philosophy', label: 'Filosofia' },
              { id: 'patent', label: 'Brevetti' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`text-[11px] font-sans font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedType === cat.id
                    ? 'bg-white border-2 border-[#0066CC] text-[#0066CC] '
                    : 'bg-white border-[#0066CC] text-black hover:text-black hover:border-[#0066CC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="academic-card p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Card header with badge and year */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[9.5px] uppercase font-mono px-2 py-0.5 rounded border font-semibold ${getBadgeColor(book.type)}`}>
                      {getTypeText(book.type)}
                    </span>
                    <span className="text-xs font-mono text-black font-bold">{book.year}</span>
                  </div>

                  {/* Title and details */}
                  <h3 className="text-base font-bold font-serif text-black tracking-tight leading-snug hover:text-[#0066CC] transition-colors mb-3">
                    {book.title}
                  </h3>

                  <div className="space-y-1.5 text-[11px] font-mono text-black mb-4 border-b border-[#FCFAF7] pb-3">
                    <p><span className="text-black">Editore:</span> <strong className="text-black">{book.publisher}</strong></p>
                    {book.isbn && <p><span className="text-black">ISBN:</span> <strong className="text-black">{book.isbn}</strong></p>}
                    {book.pages && <p><span className="text-black">Pagine:</span> <strong className="text-black">{book.pages}</strong></p>}
                    {book.doi && (
                      <p className="text-[10px] text-blue-600 truncate bg-blue-50 px-2 py-0.5 rounded border border-blue-100 max-w-full">
                        <span className="text-black">Zenodo DOI:</span> {book.doi}
                      </p>
                    )}
                  </div>

                  <p className="text-black text-xs leading-relaxed font-sans line-clamp-4 hover:line-clamp-none transition-all duration-300">
                    {book.description}
                  </p>
                </div>

                {/* Card CTA/Actions */}
                <div className="mt-6 pt-4 border-t border-[#0066CC] flex items-center justify-between gap-2 text-xs font-sans">
                  <button
                    onClick={() => onAskAboutBook(book.title)}
                    className="inline-flex items-center gap-1.5 text-black hover:text-[#0066CC] cursor-pointer font-bold transition-colors"
                    title="Interroga l'intelligenza artificiale per riassunti accademici"
                  >
                    <GraduationCap className="w-4 h-4 text-[#0066CC]" />
                    <span>Analisi AI Saggio</span>
                  </button>

                  {book.link ? (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[#0066CC] hover:text-black font-bold hover:underline"
                    >
                      <span>Consulta</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-black italic">
                      Archivio Sede
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-[#0066CC] rounded-2xl ">
            <HelpCircle className="w-10 h-10 text-slate-350 mx-auto mb-3" />
            <p className="text-black text-sm font-sans">Nessun libro soddisfa i criteri di ricerca.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedType('all'); }}
              className="text-[#0066CC] hover:underline text-xs font-bold mt-2 font-mono uppercase"
            >
              Reset dei filtri
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

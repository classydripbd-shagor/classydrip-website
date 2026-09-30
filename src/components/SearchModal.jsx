import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight, Star } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, setQuickViewProduct } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isSearchOpen]);

  // Handle Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const results = query.trim() === '' 
    ? PRODUCTS.slice(0, 4) 
    : PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.fabric.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    setQuickViewProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl z-10 overflow-hidden border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-black" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search streetwear, drop shoulder, baggy trousers, co-ord..."
            className="w-full text-base sm:text-lg font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-neutral-400 hover:text-black p-1 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 sm:px-6 py-2.5 bg-neutral-50 border-b border-neutral-100 flex items-center gap-2 overflow-x-auto text-xs text-neutral-600">
          <span className="font-semibold text-neutral-400 uppercase text-[10px] tracking-wider whitespace-nowrap">Popular:</span>
          {['Drop Shoulder', 'Duo Sets', 'Trousers', 'Co-ord', 'Heavyweight'].map((pill, i) => (
            <button
              key={i}
              onClick={() => setQuery(pill)}
              className="px-2.5 py-1 bg-white rounded-full border border-neutral-200 text-neutral-700 hover:border-black whitespace-nowrap"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
            {query.trim() === '' ? 'Recommended for you' : `Found ${results.length} results`}
          </div>

          {results.length === 0 ? (
            <div className="py-12 text-center text-neutral-500 text-sm">
              No products found matching "{query}". Try checking your spelling or searching for "Tees" or "Pants".
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className="flex items-center gap-3.5 p-2.5 rounded-2xl hover:bg-neutral-50 cursor-pointer transition border border-transparent hover:border-neutral-200"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-16 rounded-xl object-cover flex-shrink-0 bg-neutral-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 uppercase font-semibold">
                    <span>{product.gender}</span>
                    <span>•</span>
                    <span>{product.category.replace('-', ' ')}</span>
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-neutral-900 truncate">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-serif font-bold text-xs sm:text-sm text-neutral-900">
                      ৳{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-[11px] text-neutral-400 line-through">
                        ৳{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-2 text-neutral-400 hover:text-black">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function CategoriesPage() {
  const { setSelectedCategory, setCurrentPage } = useCart();

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8f8f9] py-6 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header (Like KeenCares "Categories" screen) */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-widest mb-3 shadow-sm">
            <Layers className="w-3 h-3" /> Departments & Silhouettes
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-black tracking-tight">
            Categories
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1.5">
            {CATEGORIES.length} collections, all 100% original heavyweight drops
          </p>
        </div>

        {/* 2-Column App Grid (Matches KeenCares 2-column cards layout with rounded corners) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
          {CATEGORIES.map((cat, idx) => {
            const isAll = cat.id === 'all';
            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.id)}
                className={`group relative overflow-hidden rounded-3xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-xl active:scale-[0.98] border border-neutral-200/80 flex flex-col justify-between min-h-[170px] sm:min-h-[220px] ${
                  isAll 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white text-neutral-900 shadow-sm hover:border-black'
                }`}
              >
                {/* Top: Category Title & Count */}
                <div className="relative z-10">
                  <h3 className={`font-serif font-black text-base sm:text-xl leading-snug line-clamp-2 ${isAll ? 'text-white' : 'text-black'}`}>
                    {cat.name}
                  </h3>
                  <span className={`inline-block mt-1 text-[11px] sm:text-xs font-semibold ${isAll ? 'text-neutral-300' : 'text-neutral-500'}`}>
                    {cat.count} products
                  </span>
                </div>

                {/* Bottom Graphic: Circular Product Thumbnail Stacking (KeenCares Style) */}
                <div className="relative mt-4 flex items-end justify-between">
                  <div className="flex -space-x-3 overflow-hidden items-center py-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-md bg-neutral-100 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className="w-full h-full object-cover"
                        loading="lazy" 
                      />
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-1 ${
                    isAll ? 'bg-white text-black' : 'bg-black text-white'
                  }`}>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

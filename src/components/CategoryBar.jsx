import React from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function CategoryBar() {
  const { setSelectedCategory, setCurrentPage } = useCart();

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAllCategories = () => {
    setCurrentPage('categories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-6 sm:py-14 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-8">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Curated Drops
            </div>
            <h2 className="font-serif text-xl sm:text-3xl font-black text-black tracking-tight">
              Categories
            </h2>
          </div>
          <button
            onClick={handleOpenAllCategories}
            className="text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-800 hover:text-black flex items-center gap-1 group"
          >
            <span>See All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Circular Category Avatars Row (Exactly matches KeenCares mobile horizontal avatar scroll) */}
        <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto pb-3 pt-1 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 min-w-[70px] sm:min-w-[90px]"
            >
              {/* Circular Avatar with Outline / Shadow */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-1 bg-white border-2 border-neutral-200 group-hover:border-black group-hover:scale-105 transition-all duration-300 shadow-sm flex items-center justify-center overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full rounded-full object-cover filter grayscale-[15%] group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <span className="text-[11px] sm:text-xs font-semibold text-center text-neutral-800 group-hover:text-black transition-colors line-clamp-1 max-w-[85px] sm:max-w-[100px]">
                {cat.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

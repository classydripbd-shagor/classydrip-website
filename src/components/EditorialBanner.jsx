import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function EditorialBanner() {
  const { setCurrentPage, setSelectedCategory } = useCart();

  const handleNavigate = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Box 1: Streetwear Edit */}
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-10 group border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80"
              alt="Classy Drip Streetwear"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-md inline-block">
                DROP SHOULDER & BAGGY
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-white">
                The Urban Drip Collection
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md font-light leading-relaxed">
                Engineered with high-GSM organic cotton for that authentic drape. Made for individuals who prioritize clean aesthetics.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleNavigate('streetwear-sets')}
                  className="px-7 py-3 bg-white hover:bg-neutral-200 text-black font-extrabold text-xs tracking-widest uppercase rounded-full transition flex items-center gap-2 group-hover:gap-3"
                >
                  <span>Shop Urban Drip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Box 2: Co-ord & Casual Elegance */}
          <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-10 group border border-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
              alt="Classy Drip Co-ord"
              className="absolute inset-0 w-full h-full object-cover filter brightness-[0.55] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="px-3 py-1 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-md inline-block">
                AESTHETIC ESSENTIALS
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight text-white">
                Co-ord Sets & Casual Shirts
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-md font-light leading-relaxed">
                Effortless 3-piece combos and Oxford linen weaves tailored for both smart meetings and relaxed weekends.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => handleNavigate('coord-sets')}
                  className="px-7 py-3 bg-transparent hover:bg-white text-white hover:text-black border-2 border-white font-extrabold text-xs tracking-widest uppercase rounded-full transition flex items-center gap-2 group-hover:gap-3"
                >
                  <span>Explore Co-ords</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Brand Creed Strip - Black & White */}
        <div className="mt-8 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-neutral-700 bg-white p-1 flex items-center justify-center">
              <img src="/logo-emblem.png" alt="CD" className="w-7 h-7 object-contain" />
            </div>
            <div className="text-left">
              <span className="text-xs uppercase font-serif tracking-[0.25em] text-neutral-400 block font-bold">Classy Drip Philosophy</span>
              <span className="text-sm font-bold text-white">DEFINED BY CLASS. DRIVEN BY STYLE.</span>
            </div>
          </div>
          <p className="text-xs text-neutral-400 max-w-xl text-left md:text-center">
            Premium Bangladeshi streetwear boutique blending luxury minimalist tailoring with high-grade cotton fabrics and nationwide Cash on Delivery.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-white border border-neutral-700 px-3 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4" /> 100% Authentic Quality
          </div>
        </div>

      </div>
    </section>
  );
}

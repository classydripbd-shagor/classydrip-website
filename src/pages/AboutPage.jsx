import React from 'react';
import { BRAND_INFO } from '../data/reviews';
import { Sparkles, ShieldCheck, Feather, Scissors, ExternalLink, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function AboutPage() {
  const { setCurrentPage, setSelectedCategory } = useCart();

  const handleShop = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-neutral-950 text-white min-h-[420px] flex items-center p-8 sm:p-14">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80"
            alt="Classy Drip Atelier"
            className="absolute inset-0 w-full h-full object-cover filter brightness-[0.4]"
          />
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Our Story
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
              Defined By Class. Driven By Style.
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed font-light">
              Classy Drip was born out of a simple vision: to empower Bangladesh’s modern youth with runway-grade silhouettes, heavy GSM organic fabrics, and meticulously tailored streetwear duos.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-neutral-900">Heavyweight Fabric Selection</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We exclusively use 240+ GSM compact combed cotton and heavyweight organic French Terry that hold structure without warping after laundry.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
              <Scissors className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-neutral-900">Precision Tailoring & Fit</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Our drop shoulder tees and baggy trousers are pattern-drafted specifically for optimal street drape and clean sneaker stacking.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-100 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-neutral-900">Nationwide Transparency</h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Cash on delivery, quick 24-48 hr Dhaka delivery, and hassle-free size exchange ensure peace of mind with every parcel.
            </p>
          </div>
        </div>

        {/* Brand Showcase with Logo & Social */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white p-2 flex items-center justify-center flex-shrink-0 shadow-lg">
              <img src="/logo.png" alt="Classy Drip Logo" className="w-full h-full object-contain" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif text-2xl font-bold">Classy Drip Official</h2>
              <p className="text-xs text-neutral-400 tracking-widest uppercase">
                Dhaka • Chittagong • Sylhet • Nationwide
              </p>
              <p className="text-xs text-neutral-400 max-w-md">
                Follow our official Facebook page for daily drops, model fitting videos, and flash promotions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BRAND_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center gap-2"
            >
              <span>Visit Facebook Page</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleShop}
              className="px-6 py-3 bg-white hover:bg-neutral-100 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center gap-2"
            >
              <span>Explore Shop</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight, Flame } from 'lucide-react';
import { useScrollReveal, revealClass } from '../hooks/useScrollReveal';

export default function ProductSection({ title = "NEW ARRIVALS", subtitle = "Fresh Drips & Streetwear Combos" }) {
  const [activeTab, setActiveTab] = useState('all');
  const { setCurrentPage, setSelectedCategory } = useCart();
  const [headerRef, headerVisible] = useScrollReveal();
  const [gridRef, gridVisible] = useScrollReveal({ threshold: 0.05 });

  const filteredProducts = PRODUCTS.filter(p => {
    if (activeTab === 'new') return p.isNew;
    if (activeTab === 'hot') return p.isHot;
    if (activeTab === 'bestseller') return p.isBestSeller;
    if (activeTab === 'sets') return p.category === 'streetwear-sets' || p.category === 'coord-sets';
    return true;
  });

  const handleViewAll = () => {
    setSelectedCategory('all');
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div ref={headerRef} className={`flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4 ${revealClass(headerVisible, 'fadeUp')}`}>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-black mb-1">
              <Flame className="w-3.5 h-3.5" /> Classy Drip Exclusive
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-black tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">{subtitle}</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
            {[
              { id: 'all', label: 'All Picks' },
              { id: 'new', label: 'New Arrivals' },
              { id: 'hot', label: 'Hot Drops' },
              { id: 'bestseller', label: 'Best Sellers' },
              { id: 'sets', label: 'Duo Sets' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn-press px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black border border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with stagger */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {filteredProducts.slice(0, 8).map((product, index) => (
            <div
              key={product.id}
              className={`stagger-${Math.min(index + 1, 8)}`}
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={handleViewAll}
            className="btn-press ripple inline-flex items-center gap-2 px-7 sm:px-10 py-3.5 sm:py-4 rounded-full bg-black text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-widest transition-all group shadow-lg"
          >
            <span>Shop Now — All 18+ Collections</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

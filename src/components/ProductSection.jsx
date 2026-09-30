import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import { ArrowRight, Flame } from 'lucide-react';

export default function ProductSection({ title = "NEW ARRIVALS", subtitle = "Fresh Drips & Streetwear Combos", initialFilter = "all" }) {
  const [activeTab, setActiveTab] = useState('all');
  const { setCurrentPage, setSelectedCategory } = useCart();

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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-200 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-black mb-1">
              <Flame className="w-3.5 h-3.5" /> Classy Drip Exclusive
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-black tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              {subtitle}
            </p>
          </div>

          {/* Filter Tabs - Monochrome */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
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
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white shadow-md'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-black border border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(0, 8).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-widest transition-all group shadow-md"
          >
            <span>Shop Now (All 18+ Collections)</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

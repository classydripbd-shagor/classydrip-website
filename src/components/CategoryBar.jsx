import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, ArrowRight } from 'lucide-react';

const CATEGORY_CARDS = [
  {
    id: 'streetwear-sets',
    name: 'Streetwear Duos',
    desc: 'Matching drop-tees & sweatpants',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
    tag: 'Trending'
  },
  {
    id: 'drop-shoulder',
    name: 'Drop Shoulder Tees',
    desc: '240+ GSM Boxy Cut Essentials',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
    tag: 'Hot Drop'
  },
  {
    id: 'trousers',
    name: 'Baggy Trousers',
    desc: 'Sneaker-stacking tactical pants',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
    tag: 'Best Seller'
  },
  {
    id: 'coord-sets',
    name: "Women's Co-ords",
    desc: '3-piece aesthetic silhouettes',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    tag: 'New'
  },
  {
    id: 'shirts',
    name: 'Casual Shirts',
    desc: 'Breathable Oxford & Henley',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80',
    tag: 'Classy'
  }
];

export default function CategoryBar() {
  const { setSelectedCategory, setCurrentPage } = useCart();

  const handleSelect = (catId) => {
    setSelectedCategory(catId);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-black mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Curated Drops
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-black tracking-tight">
              Shop by Categories
            </h2>
          </div>
          <button
            onClick={() => handleSelect('all')}
            className="mt-3 sm:mt-0 text-xs sm:text-sm font-bold tracking-wider uppercase text-neutral-800 hover:text-black flex items-center gap-1 group border-b border-black pb-0.5"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Category Visual Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4] shadow-sm hover:shadow-2xl transition-all duration-500 bg-neutral-900 border border-neutral-200"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />

              {/* Tag Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 bg-white text-black text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow">
                  {cat.tag}
                </span>
              </div>

              {/* Card Title & Content */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                <h3 className="font-serif font-bold text-base sm:text-lg group-hover:underline transition">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-neutral-300 line-clamp-1 mt-0.5 font-light">
                  {cat.desc}
                </p>
                <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                  <span>Explore Now</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

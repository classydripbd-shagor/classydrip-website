import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Filter, X } from 'lucide-react';

export default function ShopPage() {
  const { selectedCategory, setSelectedCategory } = useCart();
  
  const [selectedGender, setSelectedGender] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(2500);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      // Gender filter
      if (selectedGender !== 'all' && p.gender.toLowerCase() !== selectedGender.toLowerCase() && p.gender !== 'Unisex') return false;
      // Price filter
      if (p.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, selectedGender, maxPrice, sortBy]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === selectedCategory) || { name: 'All Collections' };

  return (
    <div className="min-h-screen bg-[#fafafa] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Title (KeenCares Style: Centered bold header with product count) */}
        <div className="mb-6 sm:mb-8 text-center max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-1.5 text-xs text-neutral-400 mb-1.5 font-medium">
            <span>Home</span>
            <span>/</span>
            <span className="text-black font-bold">{activeCategoryObj.name}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-black tracking-tight">
            {activeCategoryObj.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1">
            {filteredProducts.length} products
          </p>
        </div>

        {/* KeenCares-style Quick Action Buttons Row (Sort dropdown pill & Filter pill) */}
        <div className="flex items-center justify-center sm:justify-between gap-3 mb-8">
          
          {/* Left Action Pills (Sort Pill + Target Fit Pill) */}
          <div className="flex items-center gap-2.5">
            {/* Sort Pill */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white hover:bg-neutral-50 pl-4 pr-9 py-2.5 rounded-full border border-neutral-300 text-xs font-bold text-neutral-900 shadow-sm focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="featured">⇅ Newest / Featured</option>
                <option value="rating">⇅ Highest Rated</option>
                <option value="price-low">⇅ Price: Low to High</option>
                <option value="price-high">⇅ Price: High to Low</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Filter Toggle Pill (Mobile & Tablet) */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-neutral-50 rounded-full border border-neutral-300 text-xs font-bold text-neutral-900 shadow-sm"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-600" />
              <span>Filters {selectedCategory !== 'all' ? `(1)` : ''}</span>
            </button>
          </div>

          {/* Desktop Categories Quick Tabs */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-black text-white shadow'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>

        {/* Layout: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h3 className="font-serif font-bold text-sm tracking-wider uppercase">Filter Catalog</h3>
              {(selectedCategory !== 'all' || selectedGender !== 'all' || maxPrice < 2500) && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setMaxPrice(2500);
                  }}
                  className="text-xs text-black hover:underline font-semibold"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2.5">
                Target Fit
              </h4>
              <div className="space-y-1.5 text-xs">
                {['all', 'men', 'women'].map((g) => (
                  <label key={g} className="flex items-center gap-2 cursor-pointer text-neutral-700 hover:text-black">
                    <input
                      type="radio"
                      name="gender"
                      checked={selectedGender === g}
                      onChange={() => setSelectedGender(g)}
                      className="accent-black"
                    />
                    <span className="capitalize">{g === 'all' ? 'All (Men & Women)' : `${g}'s Collection`}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold uppercase tracking-wider text-neutral-500">Max Price:</span>
                <span className="font-serif font-bold text-neutral-900">৳{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="700"
                max="2500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>৳700</span>
                <span>৳2,500</span>
              </div>
            </div>

            {/* Trust badge card */}
            <div className="p-4 rounded-2xl bg-neutral-50 text-neutral-600 text-xs space-y-1.5">
              <span className="font-semibold text-neutral-900 block">Classy Drip Guarantee</span>
              <p className="text-[11px] leading-relaxed text-neutral-500">
                100% Cash on delivery with free size exchange policy nationwide.
              </p>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-white rounded-3xl border border-neutral-100 p-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-neutral-800">No items match your filter</h3>
                <p className="text-xs text-neutral-500">
                  Try adjusting the maximum price or selecting another category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedGender('all');
                    setMaxPrice(2500);
                  }}
                  className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-semibold rounded-full uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="relative w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <h3 className="font-serif font-bold text-base">Filter Collections</h3>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-neutral-500" />
                </button>
              </div>

              {/* Categories */}
              <div className="py-4 border-b border-neutral-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Category</h4>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                        selectedCategory === cat.id ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender */}
              <div className="py-4 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Target Fit</h4>
                <div className="flex gap-2">
                  {['all', 'men', 'women'].map((g) => (
                    <button
                      key={g}
                      onClick={() => setSelectedGender(g)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                        selectedGender === g ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 bg-black text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md"
            >
              Apply Filters ({filteredProducts.length} items)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

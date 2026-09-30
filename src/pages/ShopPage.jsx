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
        
        {/* Breadcrumb & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-neutral-900 font-semibold">Shop Collections</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            {activeCategoryObj.name}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Explore {filteredProducts.length} curated pieces crafted with premium heavyweight fabrics.
          </p>
        </div>

        {/* Filter & Sorting Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center justify-between w-full lg:w-auto gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-semibold text-neutral-800"
            >
              <Filter className="w-4 h-4 text-neutral-500" />
              <span>Filters ({selectedCategory !== 'all' ? 1 : 0})</span>
            </button>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-500 hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 rounded-xl border border-neutral-200 bg-white font-medium text-neutral-800 text-xs focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="featured">Featured Picks</option>
                <option value="newest">Newest Drops</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Layout: Sidebar Filter + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
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

          {/* Product Grid (3 cols on desktop) */}
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
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
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

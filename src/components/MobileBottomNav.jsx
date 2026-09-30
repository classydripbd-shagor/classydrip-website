import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, Compass, Heart, ShoppingBag, PhoneCall } from 'lucide-react';
import { BRAND_INFO } from '../data/reviews';

export default function MobileBottomNav() {
  const { 
    currentPage, 
    setCurrentPage, 
    setSelectedCategory, 
    cartCount, 
    setIsCartOpen,
    wishlist
  } = useCart();

  const handleNav = (page, category = 'all') => {
    setSelectedCategory(category);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 lg:hidden py-2 px-3 shadow-lg">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center gap-1 p-1 ${
            currentPage === 'home' ? 'text-black font-bold' : 'text-neutral-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => handleNav('shop', 'all')}
          className={`flex flex-col items-center gap-1 p-1 ${
            currentPage === 'shop' ? 'text-black font-bold' : 'text-neutral-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] tracking-tight">Shop</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => handleNav('shop', 'all')}
          className="flex flex-col items-center gap-1 p-1 text-neutral-500 relative"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Saved</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center gap-1 p-1 text-neutral-900 relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight font-semibold">Bag</span>
        </button>

        {/* Call / Hotline */}
        <a
          href={`tel:${BRAND_INFO.phone}`}
          className="flex flex-col items-center gap-1 p-1 text-neutral-500 hover:text-black"
        >
          <PhoneCall className="w-5 h-5 text-emerald-600" />
          <span className="text-[10px] tracking-tight">Call</span>
        </a>
      </div>
    </div>
  );
}

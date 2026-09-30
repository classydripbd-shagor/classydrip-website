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

  const navItems = [
    {
      label: 'Home',
      icon: Home,
      active: currentPage === 'home',
      onClick: () => handleNav('home'),
    },
    {
      label: 'Shop',
      icon: Compass,
      active: currentPage === 'shop',
      onClick: () => handleNav('shop', 'all'),
    },
    {
      label: 'Saved',
      icon: Heart,
      active: false,
      badge: wishlist.length > 0 ? wishlist.length : null,
      onClick: () => handleNav('shop', 'all'),
    },
    {
      label: 'Bag',
      icon: ShoppingBag,
      active: false,
      badge: cartCount > 0 ? cartCount : null,
      onClick: () => setIsCartOpen(true),
      special: true,
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
      {/* Safe area bg */}
      <div className="bg-white/96 backdrop-blur-xl border-t border-neutral-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around px-2 pt-2 pb-safe">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.onClick}
                className={`mobile-nav-item flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[56px] transition-all duration-200 ${
                  item.active 
                    ? 'text-black' 
                    : 'text-neutral-400 hover:text-neutral-700'
                } ${item.special ? 'relative' : ''}`}
              >
                <div className="relative">
                  {item.special ? (
                    <div className={`p-2 rounded-xl transition-all duration-200 ${item.badge ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  ) : (
                    <Icon className={`w-5 h-5 transition-all duration-200 ${item.active ? 'stroke-[2.2]' : ''}`} />
                  )}
                  {item.badge && (
                    <span className="animate-popIn absolute -top-1.5 -right-1.5 bg-black text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-semibold tracking-tight ${item.active ? 'text-black' : ''}`}>
                  {item.label}
                </span>
                {item.active && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-black rounded-full" />
                )}
              </button>
            );
          })}

          {/* Call Button */}
          <a
            href={`tel:${BRAND_INFO.phone}`}
            className="mobile-nav-item flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[56px] text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <PhoneCall className="w-5 h-5 text-emerald-600" />
            <span className="text-[10px] font-semibold tracking-tight">Call</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

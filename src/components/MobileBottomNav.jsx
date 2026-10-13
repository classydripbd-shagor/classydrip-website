import React from 'react';
import { useCart } from '../context/CartContext';
import { Home, LayoutGrid, Search, ShoppingBag, User } from 'lucide-react';

export default function MobileBottomNav() {
  const { 
    currentPage, 
    setCurrentPage, 
    setSelectedCategory, 
    cartCount, 
    setIsCartOpen,
    setIsSearchOpen
  } = useCart();

  const handleNav = (page, category = 'all') => {
    setSelectedCategory(category);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      active: currentPage === 'home',
      onClick: () => handleNav('home'),
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: LayoutGrid,
      active: currentPage === 'categories',
      onClick: () => handleNav('categories'),
      highlight: true, // KeenCares distinctive rounded pill indicator
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      active: false,
      onClick: () => setIsSearchOpen(true),
    },
    {
      id: 'bag',
      label: 'Bag',
      icon: ShoppingBag,
      active: false,
      badge: cartCount > 0 ? cartCount : null,
      onClick: () => setIsCartOpen(true),
    },
    {
      id: 'account',
      label: 'Track',
      icon: User,
      active: currentPage === 'track' || currentPage === 'contact',
      onClick: () => handleNav('track'),
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden">
      {/* App Bar Container with crisp Black & White design */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-neutral-200/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-around px-3 py-1.5 pb-safe max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isCategories = item.id === 'categories';
            
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                className={`group relative flex flex-col items-center justify-center py-1 px-2.5 rounded-2xl transition-all duration-200 active:scale-90 ${
                  item.active ? 'text-black' : 'text-neutral-400 hover:text-black'
                }`}
              >
                {/* Active indicator box for Categories (KeenCares style pill highlight) */}
                {isCategories && item.active ? (
                  <div className="w-11 h-7 bg-black text-white rounded-xl flex items-center justify-center shadow-md mb-0.5">
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                ) : (
                  <div className="relative p-1">
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${
                      item.active ? 'stroke-[2.5] scale-110 text-black' : 'stroke-[1.8]'
                    }`} />

                    {/* Cart count badge */}
                    {item.badge && (
                      <span className="animate-popIn absolute -top-1 -right-1.5 bg-black text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white shadow-sm">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                <span className={`text-[10px] tracking-tight font-bold transition-colors ${
                  item.active ? 'text-black font-extrabold' : 'text-neutral-500'
                }`}>
                  {item.label}
                </span>

                {/* Subtle active dot underneath */}
                {item.active && !isCategories && (
                  <span className="absolute bottom-0 w-1 h-1 bg-black rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

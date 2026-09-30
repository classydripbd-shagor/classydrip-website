import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/reviews';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Menu, 
  X, 
  Phone, 
  Truck, 
  ChevronDown,
  Sparkles,
  ExternalLink,
  ArrowRight
} from 'lucide-react';

export default function Header() {
  const { 
    cartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    wishlist, 
    setIsSearchOpen, 
    currentPage, 
    setCurrentPage, 
    setSelectedCategory 
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page, category = 'all') => {
    setCurrentPage(page);
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      
      {/* 1. Top Announcement Bar - Pure Black and White */}
      <div className="bg-black text-neutral-300 text-xs py-2 px-4 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Hotline & Tagline */}
          <div className="hidden md:flex items-center gap-4 text-neutral-400">
            <a 
              href={`tel:${BRAND_INFO.phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition text-[11px]"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              Hotline: <span className="text-white font-medium">{BRAND_INFO.phoneDisplay}</span>
            </a>
            <span className="text-neutral-700">|</span>
            <span className="flex items-center gap-1 text-neutral-300 text-[11px] font-medium tracking-wider">
              <Sparkles className="w-3 h-3 text-white" /> DEFINED BY CLASS. DRIVEN BY STYLE.
            </span>
          </div>

          {/* Center: Free Delivery Banner */}
          <div className="w-full md:w-auto text-center font-medium tracking-wide flex items-center justify-center gap-2 text-[11px] sm:text-xs text-white">
            <Truck className="w-3.5 h-3.5 text-white inline flex-shrink-0" />
            <span>
              Free Delivery all over Bangladesh on orders above <span className="text-white font-bold underline underline-offset-2">৳2,500</span>!
            </span>
          </div>

          {/* Right: Facebook & Track */}
          <div className="hidden lg:flex items-center gap-4 text-neutral-400 text-[11px]">
            <a 
              href={BRAND_INFO.facebookUrl} 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition flex items-center gap-1 text-white font-semibold"
            >
              Facebook Page <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-neutral-700">|</span>
            <button 
              onClick={() => handleNavClick('track')}
              className="hover:text-white transition"
            >
              Track Order
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navbar - Minimalist Black and White */}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5' 
          : 'bg-white py-3.5 border-b border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Mobile Menu & Search Button */}
          <div className="flex items-center lg:hidden gap-1">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-black hover:bg-neutral-100 rounded-lg transition"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-black hover:bg-neutral-100 rounded-lg transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo (Emblem + Monogram Typography in Pure Black) */}
          <div 
            className="flex items-center gap-3 cursor-pointer flex-shrink-0 group" 
            onClick={() => handleNavClick('home')}
          >
            <div className="h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center p-0.5 transition group-hover:scale-105">
              <img 
                src="/logo-emblem.png" 
                alt="Classy Drip Crest" 
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-[0.24em] text-lg sm:text-2xl font-bold uppercase text-black leading-none">
                CLASSY DRIP
              </span>
              <span className="text-[9px] uppercase tracking-[0.28em] text-neutral-500 font-bold mt-0.5">
                Defined By Class
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            
            {/* Home */}
            <button 
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase transition relative py-1 ${
                currentPage === 'home' 
                  ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black' 
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Home
            </button>

            {/* Shop (with Minimalist Black & White Dropdown Menu) */}
            <div 
              className="relative"
              onMouseEnter={() => setShopDropdownOpen(true)}
              onMouseLeave={() => setShopDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNavClick('shop', 'all')}
                className={`whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase transition relative py-1 flex items-center gap-1 ${
                  currentPage === 'shop' 
                    ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black' 
                    : 'text-neutral-600 hover:text-black'
                }`}
              >
                <span>Shop</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180 text-black' : 'text-neutral-400'}`} />
              </button>

              {/* Dropdown Menu */}
              {shopDropdownOpen && (
                <div className="absolute top-full -left-4 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-200 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Collections & Categories
                  </div>
                  
                  <div className="mt-1 space-y-0.5">
                    <button
                      onClick={() => handleNavClick('shop', 'all')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-black hover:text-white transition flex items-center justify-between"
                    >
                      <span>All Collections</span>
                      <span className="text-[10px] font-mono opacity-60">18 items</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('shop', 'streetwear-sets')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-black hover:text-white transition flex items-center justify-between"
                    >
                      <span>Streetwear Duo Sets</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 text-black border border-neutral-300 rounded font-bold">HOT</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('shop', 'drop-shoulder')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-black hover:text-white transition flex items-center justify-between"
                    >
                      <span>Drop Shoulder Tees (240+ GSM)</span>
                      <span className="text-[10px] font-mono opacity-60">5 items</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('shop', 'trousers')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-black hover:text-white transition flex items-center justify-between"
                    >
                      <span>Baggy Street Trousers</span>
                      <span className="text-[10px] font-mono opacity-60">4 items</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('shop', 'coord-sets')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-black hover:text-white transition flex items-center justify-between"
                    >
                      <span>Women's Co-ord Sets</span>
                      <span className="text-[10px] px-1.5 py-0.5 bg-neutral-100 text-black border border-neutral-300 rounded font-bold">NEW</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('shop', 'shirts')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-neutral-800 hover:bg-black hover:text-white transition flex items-center justify-between"
                    >
                      <span>Premium Casual Shirts</span>
                      <span className="text-[10px] font-mono opacity-60">3 items</span>
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-neutral-100 px-2">
                    <button
                      onClick={() => handleNavClick('shop', 'all')}
                      className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white text-[11px] font-bold uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-1.5"
                    >
                      <span>View All Drops</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* New Arrivals */}
            <button 
              onClick={() => handleNavClick('shop', 'all')}
              className="whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase text-neutral-600 hover:text-black transition py-1"
            >
              New Arrivals
            </button>

            {/* Men */}
            <button 
              onClick={() => handleNavClick('shop', 'drop-shoulder')}
              className="whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase text-neutral-600 hover:text-black transition py-1"
            >
              Men
            </button>

            {/* Women */}
            <button 
              onClick={() => handleNavClick('shop', 'coord-sets')}
              className="whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase text-neutral-600 hover:text-black transition py-1"
            >
              Women
            </button>

            {/* About */}
            <button 
              onClick={() => handleNavClick('about')}
              className={`whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase transition relative py-1 ${
                currentPage === 'about' 
                  ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black' 
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              About
            </button>

            {/* Contact */}
            <button 
              onClick={() => handleNavClick('contact')}
              className={`whitespace-nowrap text-xs font-bold tracking-[0.14em] uppercase transition relative py-1 ${
                currentPage === 'contact' 
                  ? 'text-black after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black' 
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Area: Shop Now Button + Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            
            {/* The Requested "Shop Now" Button */}
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 group flex-shrink-0"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Search Icon Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 sm:p-2.5 text-black hover:bg-neutral-100 rounded-full transition flex items-center justify-center"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => handleNavClick('shop', 'all')}
              className="relative p-2 sm:p-2.5 text-black hover:bg-neutral-100 rounded-full transition flex items-center justify-center"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart / Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 border-2 border-black bg-white hover:bg-black text-black hover:text-white rounded-full transition duration-200 group flex-shrink-0"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 transition group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-black group-hover:bg-white text-white group-hover:text-black font-extrabold text-[10px] rounded-full flex items-center justify-center border border-white group-hover:border-black">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold tracking-wide">
                {cartSubtotal > 0 ? `৳${cartSubtotal.toLocaleString()}` : '৳0'}
              </span>
            </button>
          </div>

        </div>
      </div>

      {/* 3. Mobile Sidebar Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 animate-slideInLeft">
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="/logo-emblem.png" alt="Classy Drip" className="w-8 h-8 object-contain" />
                <div className="flex flex-col">
                  <span className="font-serif tracking-widest font-bold text-sm text-black">CLASSY DRIP</span>
                  <span className="text-[8px] tracking-widest text-neutral-500 font-bold">DEFINED BY CLASS</span>
                </div>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-black hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1.5">
              {/* Prominent Shop Now CTA in Mobile Drawer */}
              <button
                onClick={() => handleNavClick('shop', 'all')}
                className="w-full py-3 bg-black text-white font-bold text-xs uppercase tracking-widest rounded-xl transition flex items-center justify-center gap-2 shadow-md mb-3"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                  currentPage === 'home' ? 'bg-black text-white' : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavClick('shop', 'all')}
                className={`w-full text-left px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                  currentPage === 'shop' ? 'bg-black text-white' : 'text-neutral-800 hover:bg-neutral-100'
                }`}
              >
                All Collections
              </button>

              <div className="pt-3 pb-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
                  Categories
                </div>

                <button
                  onClick={() => handleNavClick('shop', 'streetwear-sets')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg flex items-center justify-between"
                >
                  <span>Streetwear Duo Sets</span>
                  <span className="text-[9px] bg-black text-white px-1.5 py-0.5 rounded font-bold">HOT</span>
                </button>

                <button
                  onClick={() => handleNavClick('shop', 'drop-shoulder')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Drop Shoulder Tees
                </button>

                <button
                  onClick={() => handleNavClick('shop', 'trousers')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Baggy Street Trousers
                </button>

                <button
                  onClick={() => handleNavClick('shop', 'coord-sets')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Women's Co-ord Sets
                </button>

                <button
                  onClick={() => handleNavClick('shop', 'shirts')}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Casual Shirts
                </button>
              </div>

              <div className="pt-3 border-t border-neutral-100">
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 mb-1">
                  Information
                </div>
                <button
                  onClick={() => handleNavClick('about')}
                  className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  About Classy Drip
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Contact & Support
                </button>
                <button
                  onClick={() => handleNavClick('track')}
                  className="w-full text-left px-3 py-2 text-xs text-neutral-700 hover:bg-neutral-100 rounded-lg"
                >
                  Track Order
                </button>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 border-t border-neutral-100 space-y-2.5">
              <a
                href={BRAND_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-black text-white rounded-xl font-bold text-xs shadow-sm hover:bg-neutral-800"
              >
                Official Facebook Page <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-neutral-300 text-black rounded-xl font-bold text-xs"
              >
                <Phone className="w-3.5 h-3.5" /> Hotline: {BRAND_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

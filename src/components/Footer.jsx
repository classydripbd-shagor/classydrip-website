import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/reviews';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Send, 
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const { setCurrentPage, setSelectedCategory, addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleNav = (page, category = 'all') => {
    setSelectedCategory(category);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    addToast('Thanks for subscribing to Classy Drip drop alerts!');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-black text-neutral-300 pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white p-1 flex items-center justify-center">
                <img src="/logo-emblem.png" alt="Classy Drip Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <span className="font-serif tracking-[0.25em] text-xl font-bold uppercase text-white block">
                  CLASSY DRIP
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400 font-bold block">
                  Defined by Class. Driven by Style.
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-light">
              Your destination for luxury minimalist streetwear, drop shoulder tees, heavyweight co-ord duos, and everyday aesthetic casuals in Bangladesh.
            </p>

            {/* Contact details */}
            <div className="space-y-2 text-xs text-neutral-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span>Banani & Dhanmondi, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`tel:${BRAND_INFO.phone}`} className="hover:text-white transition">
                  {BRAND_INFO.phoneDisplay} (10 AM - 10 PM)
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`mailto:${BRAND_INFO.email}`} className="hover:text-white transition">
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button onClick={() => handleNav('shop', 'all')} className="hover:text-white transition">
                  All Collections
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'streetwear-sets')} className="hover:text-white transition">
                  Streetwear Duo Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'drop-shoulder')} className="hover:text-white transition">
                  Drop Shoulder Tees
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'trousers')} className="hover:text-white transition">
                  Baggy Trousers & Pants
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'coord-sets')} className="hover:text-white transition">
                  Women's Co-ord Sets
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button onClick={() => handleNav('track')} className="hover:text-white transition">
                  Track Your Order
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition">
                  Help & FAQs
                </button>
              </li>
              <li>
                <a 
                  href={BRAND_INFO.facebookUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-white transition flex items-center gap-1 text-white font-bold"
                >
                  Facebook Page <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <span className="text-neutral-500">14-Day Hassle-Free Returns</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-white">
              Join The Drip
            </h4>
            <p className="text-xs text-neutral-400 font-light">
              Subscribe for early access to limited edition drops and secret promotions.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded-xl overflow-hidden border border-neutral-700 focus-within:border-white">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="w-full px-3 py-2.5 bg-neutral-900 text-xs text-white placeholder-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-neutral-200 text-black px-4 flex items-center justify-center transition font-bold"
                  title="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-[10px] text-neutral-500 block">
                No spam. Unsubscribe anytime.
              </span>
            </form>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© 2026 Classy Drip — All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-white font-bold tracking-wider">DEFINED BY CLASS. DRIVEN BY STYLE.</span>
          </div>

          {/* Monochrome Payment Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-neutral-500 mr-1">We Accept:</span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-bold text-white">
              Cash on Delivery (COD)
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-bold text-white">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-bold text-white">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-[10px] font-bold text-white">
              Visa / Mastercard
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

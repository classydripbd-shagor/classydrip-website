import React from 'react';
import { BRAND_INFO } from '../data/reviews';
import { ExternalLink, Users, MessageCircle } from 'lucide-react';

const COMMUNITY_IMAGES = [
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80',
];

export default function CommunitySection() {
  return (
    <section className="py-14 sm:py-20 bg-white border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-black mb-1.5">
              <Users className="w-3.5 h-3.5" /> Social Hub
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-black tracking-tight">
              Join Our Community
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Tag <span className="font-bold text-black">#ClassyDrip</span> on Facebook & Instagram to be featured on our official wall.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={BRAND_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-md transition"
            >
              <span>Follow on Facebook</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`https://wa.me/${BRAND_INFO.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-neutral-100 text-black border-2 border-black text-xs font-bold uppercase tracking-widest rounded-full shadow-sm transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {COMMUNITY_IMAGES.map((img, i) => (
            <a
              key={i}
              href={BRAND_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 shadow-sm cursor-pointer block border border-neutral-200"
            >
              <img
                src={img}
                alt="Classy Drip Community"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500 filter grayscale-[20%] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <span className="text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                  View <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

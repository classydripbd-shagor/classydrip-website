import React from 'react';
import { BRAND_INFO } from '../data/reviews';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const message = encodeURIComponent("Hello Classy Drip! I want to inquire about your collections.");
  const url = `https://wa.me/${BRAND_INFO.whatsapp}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-[76px] sm:bottom-6 right-4 sm:right-5 z-40 flex items-center gap-2 group"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulseRing" />
      
      {/* Expand label on hover */}
      <span className="relative max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-[11px] font-bold tracking-wider uppercase bg-[#25D366] text-white px-0 group-hover:px-3 py-2.5 rounded-l-full">
        Chat with Us
      </span>

      {/* Button */}
      <span className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 btn-press">
        <MessageCircle className="w-6 h-6 fill-white" />
      </span>
    </a>
  );
}

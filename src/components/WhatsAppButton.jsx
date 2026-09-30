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
      className="fixed bottom-20 sm:bottom-6 right-5 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 group transition-all duration-300 hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold tracking-wider uppercase pr-1">
        Chat with Us
      </span>
    </a>
  );
}

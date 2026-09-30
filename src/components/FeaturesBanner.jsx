import React from 'react';
import { Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react';
import { useScrollReveal, revealClass } from '../hooks/useScrollReveal';

const FEATURES = [
  { icon: Truck,        title: 'Fast Nationwide Delivery', subtitle: '24-48 hrs in Dhaka, 2-3 days all over Bangladesh' },
  { icon: CreditCard,   title: 'Cash on Delivery',         subtitle: 'Pay at your doorstep or via bKash / Nagad' },
  { icon: RefreshCw,    title: '14-Day Easy Returns',      subtitle: 'Hassle-free size & color exchange guarantee' },
  { icon: Headphones,   title: 'Dedicated Support',        subtitle: 'Direct hotline & instant WhatsApp assistance' },
];

export default function FeaturesBanner() {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="bg-white border-b border-neutral-200 py-8 sm:py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl hover:bg-neutral-50 transition-all duration-200 border border-transparent hover:border-neutral-200 cursor-default ${
                  isVisible ? `animate-fadeUp stagger-${idx + 1}` : 'opacity-0'
                }`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-md transition-transform duration-300 hover:scale-110">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-xs sm:text-sm tracking-wide">{item.title}</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5 leading-snug hidden sm:block">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

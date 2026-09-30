import React from 'react';
import { Truck, CreditCard, RefreshCw, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: Truck,
    title: 'Fast Nationwide Delivery',
    subtitle: '24-48 hrs in Dhaka, 2-3 days all over Bangladesh'
  },
  {
    icon: CreditCard,
    title: 'Cash on Delivery',
    subtitle: 'Pay at your doorstep or via bKash / Nagad'
  },
  {
    icon: RefreshCw,
    title: '14-Day Easy Returns',
    subtitle: 'Hassle-free size & color exchange guarantee'
  },
  {
    icon: Headphones,
    title: 'Dedicated Support',
    subtitle: 'Direct hotline & instant WhatsApp assistance'
  }
];

export default function FeaturesBanner() {
  return (
    <section className="bg-white border-b border-neutral-200 py-8 sm:py-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-neutral-50 transition duration-200 border border-transparent hover:border-neutral-200"
              >
                <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center flex-shrink-0 shadow-md">
                  <Icon className="w-6 h-6 stroke-[1.8]" />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm tracking-wide">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-500 mt-0.5 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { REVIEWS } from '../data/reviews';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { useScrollReveal, revealClass } from '../hooks/useScrollReveal';

export default function ReviewsSection() {
  return (
    <section className="py-14 sm:py-20 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-white" /> 4.9/5 Rating from 1,200+ Drip Lovers
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-black tracking-tight">
            Hear from Our Happy Customers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-medium">
            Real feedback from fashion enthusiasts all over Bangladesh who wear Classy Drip daily.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-black">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-black text-black" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-neutral-400" />
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-neutral-800 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Product */}
              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-black flex items-center gap-1">
                    {rev.name}
                    {rev.verified && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-black" title="Verified Customer" />
                    )}
                  </h4>
                  <span className="text-[11px] text-neutral-500 block">{rev.city}</span>
                </div>
                <span className="text-[10px] text-neutral-400 font-medium">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

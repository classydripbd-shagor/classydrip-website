import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    tag: 'NEW DROP 2026',
    title: 'DEFINED BY CLASS. DRIVEN BY STYLE.',
    subtitle: 'Engineered with 260+ GSM heavyweight fabrics, drop shoulder silhouettes, and signature crest details.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=85',
    category: 'streetwear-sets',
    btnPrimary: 'Shop Now',
    btnSecondary: 'Explore All'
  },
  {
    id: 2,
    tag: 'LIMITED EDITION',
    title: 'URBAN STREETWEAR DUO SETS',
    subtitle: 'Effortless coordination. Pair oversized drop tees with relaxed twill pants designed for sneaker stacking.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=1600&q=85',
    category: 'streetwear-sets',
    btnPrimary: 'Shop Duo Sets',
    btnSecondary: 'Drop Shoulder'
  },
  {
    id: 3,
    tag: 'SPECIAL EID & SEASON SALE',
    title: 'MINIMALIST LUXURY & CO-ORD SETS',
    subtitle: 'Exclusive 3-piece sets & relaxed casuals crafted for unmatched comfort and aesthetic flow.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=85',
    category: 'coord-sets',
    btnPrimary: 'Shop Co-ords',
    btnSecondary: 'View Offers'
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const { setCurrentPage, setSelectedCategory } = useCart();

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((current + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrent((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleCta = (category) => {
    setSelectedCategory(category);
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      <div className="relative h-[560px] sm:h-[620px] lg:h-[700px] w-full">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center filter brightness-[0.65] scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40" />
            </div>

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 flex flex-col justify-center">
              <div className="max-w-2xl space-y-4 sm:space-y-6">
                
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-widest uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  {slide.tag}
                </div>

                {/* Title */}
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg text-neutral-300 font-light leading-relaxed max-w-xl">
                  {slide.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => handleCta(slide.category)}
                    className="px-8 py-3.5 bg-white hover:bg-neutral-200 text-black font-extrabold text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-xl transition-all flex items-center gap-2 group"
                  >
                    <span>{slide.btnPrimary}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                  <button
                    onClick={() => handleCta('all')}
                    className="px-7 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full border-2 border-white backdrop-blur-sm transition-all"
                  >
                    {slide.btnSecondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm border border-white/20 transition hidden sm:flex items-center justify-center"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-sm border border-white/20 transition hidden sm:flex items-center justify-center"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations.
 * Returns a ref to attach to the element and a boolean `isVisible`.
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // fire once
        }
      },
      { threshold: options.threshold || 0.12, rootMargin: options.rootMargin || '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

/**
 * Returns CSS class string for a reveal animation.
 * @param {boolean} isVisible
 * @param {string} animation - 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn' | 'slideUp'
 * @param {number} delay - delay in ms (0-800)
 */
export function revealClass(isVisible, animation = 'fadeUp', delay = 0) {
  const base = 'transition-all duration-700 ease-out';
  const delayClass = delay ? `delay-[${delay}ms]` : '';

  const hidden = {
    fadeUp: 'opacity-0 translate-y-10',
    fadeIn: 'opacity-0',
    fadeLeft: 'opacity-0 -translate-x-10',
    fadeRight: 'opacity-0 translate-x-10',
    scaleIn: 'opacity-0 scale-90',
    slideUp: 'opacity-0 translate-y-16',
  };

  const visible = 'opacity-100 translate-y-0 translate-x-0 scale-100';

  return `${base} ${delayClass} ${isVisible ? visible : hidden[animation] || hidden.fadeUp}`;
}

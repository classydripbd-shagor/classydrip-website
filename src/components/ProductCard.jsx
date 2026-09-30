import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingBag, Zap, Star } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    buyNow 
  } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [tapped, setTapped] = useState(false);
  const isWish = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  // Mobile: tap to show actions
  const handleCardTap = () => {
    setTapped(prev => !prev);
  };

  const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;

  return (
    <div 
      className={`product-card group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm animate-scaleIn ${staggerClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setTapped(false); }}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={handleCardTap}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
          className="img-zoom w-full h-full object-cover object-center"
          loading="lazy"
        />

        {/* Dark overlay for mobile tap */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${tapped ? 'opacity-100' : 'opacity-0 group-hover:opacity-0'} sm:hidden`} />

        {/* Badges Top-Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHot && (
            <span className="animate-popIn px-2.5 py-1 bg-black text-white text-[10px] font-extrabold uppercase tracking-wider rounded shadow-sm">
              HOT
            </span>
          )}
          {product.isNew && (
            <span className="animate-popIn stagger-1 px-2.5 py-1 bg-white text-black border border-black text-[10px] font-extrabold uppercase tracking-wider rounded shadow-sm">
              NEW DROP
            </span>
          )}
          {hasDiscount && (
            <span className="animate-popIn stagger-2 px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-extrabold uppercase tracking-wider rounded shadow-sm">
              {product.discount}
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`btn-press absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWish 
              ? 'bg-black text-white shadow-md scale-110' 
              : 'bg-white/90 text-black hover:bg-black hover:text-white shadow-sm'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform duration-200 ${isWish ? 'fill-current scale-110' : ''}`} />
        </button>

        {/* Quick Actions — desktop hover / mobile tap */}
        <div className={`absolute inset-x-3 bottom-3 z-10 flex flex-col gap-1.5 transition-all duration-300 ${
          tapped || isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={(e) => { e.stopPropagation(); setQuickViewProduct(product); }}
              className="btn-press ripple py-2.5 px-3 bg-white/95 hover:bg-white text-black font-bold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center gap-1.5 border border-neutral-200"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); addToCart(product); }}
              className="btn-press ripple py-2.5 px-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); buyNow(product); }}
            className="btn-press ripple w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg flex items-center justify-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>অর্ডার করুন (Order Now)</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-400 uppercase tracking-widest font-bold text-[10px]">
              {product.gender} • {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 text-black font-bold text-[11px]">
              <Star className="w-3 h-3 fill-black text-black" />
              <span>{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-black text-xs sm:text-sm hover:underline underline-offset-2 transition cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Sizes */}
        <div className="mt-2.5 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-sm sm:text-base text-black">
              ৳{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-neutral-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Size Pills */}
          <div className="flex items-center gap-1">
            {product.sizes.slice(0, 3).map((sz, i) => (
              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-700 font-bold border border-neutral-200">
                {sz.length > 3 ? sz.slice(0, 4) : sz}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingBag, Plus, Check, Star } from 'lucide-react';

export default function ProductCard({ product, index = 0 }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    buyNow 
  } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [addedAnim, setAddedAnim] = useState(false);
  const isWish = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 900);
  };

  const staggerClass = `stagger-${Math.min((index % 8) + 1, 8)}`;

  return (
    <div 
      className={`group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm hover:shadow-xl transition-all duration-300 animate-scaleIn ${staggerClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Image Container with KeenCares rounded aesthetic & floating '+' action */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-[#f4f4f5] cursor-pointer"
        onClick={() => setQuickViewProduct(product)}
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="img-zoom w-full h-full object-cover object-center filter grayscale-[8%] group-hover:grayscale-0"
          loading="lazy"
        />

        {/* Badges Top-Left (Monochrome Pill with % OFF) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {hasDiscount ? (
            <span className="px-2 py-0.5 bg-black text-white text-[10px] sm:text-xs font-black tracking-wide rounded-md shadow-md">
              -{product.discount.replace(' OFF', '')}
            </span>
          ) : product.isHot ? (
            <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black uppercase tracking-wider rounded-md shadow-md">
              HOT
            </span>
          ) : null}
        </div>

        {/* Wishlist Heart Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`btn-press absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWish 
              ? 'bg-black text-white shadow-md' 
              : 'bg-white/90 text-neutral-800 hover:bg-black hover:text-white shadow-sm'
          }`}
          aria-label="Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-current' : ''}`} />
        </button>

        {/* KeenCares Signature Floating Circular Black "+" Quick-Add Button */}
        <button
          onClick={handleQuickAdd}
          className={`btn-press absolute bottom-2.5 right-2.5 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
            addedAnim 
              ? 'bg-neutral-800 text-white scale-110' 
              : 'bg-black hover:bg-neutral-800 text-white hover:scale-105 active:scale-90'
          }`}
          title="Quick Add to Bag"
          aria-label="Add to Bag"
        >
          {addedAnim ? (
            <Check className="w-5 h-5 text-white animate-popIn" />
          ) : (
            <Plus className="w-5 h-5 stroke-[2.5]" />
          )}
        </button>
      </div>

      {/* 2. Product Details (Clean, modern typography inspired by KeenCares) */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Brand Tag / Gender */}
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-neutral-400 block mb-1">
            CLASSY DRIP • {product.gender}
          </span>

          {/* Product Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-neutral-900 text-xs sm:text-sm hover:underline underline-offset-2 transition cursor-pointer line-clamp-2 leading-tight"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-800 mt-1.5">
            <Star className="w-3 h-3 fill-black text-black" />
            <span>{product.rating}</span>
            <span className="text-neutral-400 font-normal">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price Row (KeenCares style: bold main price + strikethrough original) */}
        <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="font-serif font-black text-sm sm:text-base text-black">
              ৳{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-[11px] text-neutral-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Sizes */}
          <div className="hidden sm:flex items-center gap-1">
            {product.sizes.slice(0, 2).map((sz, i) => (
              <span key={i} className="text-[9px] px-1 py-0.5 bg-neutral-100 rounded text-neutral-700 font-bold border border-neutral-200">
                {sz}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Heart, Eye, ShoppingBag, Zap, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct,
    buyNow 
  } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const isWish = isInWishlist(product.id);

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer">
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          onClick={() => setQuickViewProduct(product)}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Top-Left - Monochrome */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isHot && (
            <span className="px-2.5 py-1 bg-black text-white text-[10px] font-extrabold uppercase tracking-wider rounded shadow-sm">
              HOT
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-white text-black border border-black text-[10px] font-extrabold uppercase tracking-wider rounded shadow-sm">
              NEW DROP
            </span>
          )}
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-neutral-900 text-white text-[10px] font-extrabold uppercase tracking-wider rounded shadow-sm">
              {product.discount}
            </span>
          )}
        </div>

        {/* Wishlist Button Top-Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWish 
              ? 'bg-black text-white shadow-md' 
              : 'bg-white/90 text-black hover:bg-black hover:text-white shadow-sm'
          }`}
          title={isWish ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions Hover Overlay */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setQuickViewProduct(product)}
              className="py-2.5 px-3 bg-white/95 hover:bg-white text-black font-bold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center gap-1.5 transition border border-neutral-300"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>

            <button
              onClick={() => addToCart(product)}
              className="py-2.5 px-3 bg-black hover:bg-neutral-800 text-white font-bold text-xs tracking-wider uppercase rounded-xl shadow-md flex items-center justify-center gap-1.5 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>
          </div>

          {/* Direct Buy Now - Pure Black & White Button */}
          <button
            onClick={() => buyNow(product)}
            className="w-full py-2.5 bg-black hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg flex items-center justify-center gap-1.5 transition border border-neutral-700"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>অর্ডার করুন (Order Now)</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-500 uppercase tracking-widest font-bold text-[10px]">
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
            className="font-bold text-black text-sm hover:underline transition cursor-pointer line-clamp-2 leading-snug"
          >
            {product.name}
          </h3>
        </div>

        {/* Price & Available Sizes */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif font-bold text-base sm:text-lg text-black">
              ৳{product.price.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Size Pills */}
          <div className="hidden sm:flex items-center gap-1">
            {product.sizes.slice(0, 3).map((sz, i) => (
              <span key={i} className="text-[10px] px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-800 font-bold border border-neutral-200">
                {sz.length > 3 ? sz.slice(0, 4) : sz}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

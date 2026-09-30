import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Zap, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Ruler 
} from 'lucide-react';

export default function QuickViewModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    buyNow, 
    isInWishlist, 
    toggleWishlist 
  } = useCart();

  if (!quickViewProduct) return null;

  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(
    quickViewProduct.colors && quickViewProduct.colors[0] ? quickViewProduct.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const isWish = isInWishlist(quickViewProduct.id);
  const hasDiscount = quickViewProduct.originalPrice && quickViewProduct.originalPrice > quickViewProduct.price;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    buyNow(quickViewProduct, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 border border-neutral-200">
        
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white hover:bg-neutral-100 text-black border border-neutral-200 shadow-sm transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Image Gallery */}
          <div className="p-4 sm:p-6 bg-neutral-100 flex flex-col justify-between">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-200 shadow-inner">
              <img
                src={quickViewProduct.images[selectedImg] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(quickViewProduct)}
                className={`absolute top-3 left-3 p-2.5 rounded-full backdrop-blur-md transition ${
                  isWish ? 'bg-black text-white shadow' : 'bg-white/90 text-black hover:bg-black hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWish ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2.5 mt-3 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition ${
                      selectedImg === idx ? 'border-black shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-2 text-xs mb-2">
                <span className="text-black font-extrabold uppercase tracking-wider text-[11px]">
                  Classy Drip Official
                </span>
                <span className="px-2 py-0.5 rounded bg-black text-white text-[10px] font-bold">
                  In Stock & Ready to Ship
                </span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-black leading-snug">
                {quickViewProduct.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-black">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
                <span className="text-xs font-bold text-black">{quickViewProduct.rating}</span>
                <span className="text-xs text-neutral-500">({quickViewProduct.reviewsCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-black">
                  ৳{quickViewProduct.price.toLocaleString()}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm sm:text-base text-neutral-400 line-through">
                      ৳{quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black text-white text-xs font-bold">
                      {quickViewProduct.discount}
                    </span>
                  </>
                )}
              </div>

              {/* Fabric & Fit Pill */}
              <div className="mt-3 p-3 rounded-xl bg-neutral-100 border border-neutral-200 text-xs text-neutral-700 space-y-1">
                <div><span className="font-bold text-black">Fabric:</span> {quickViewProduct.fabric}</div>
                <div><span className="font-bold text-black">Fit:</span> {quickViewProduct.fit}</div>
              </div>

              {/* Color Selector */}
              {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-black">
                      Color: <span className="font-normal text-neutral-600">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition ${
                          selectedColor === c.name
                            ? 'border-black bg-black text-white font-bold shadow-sm'
                            : 'border-neutral-300 bg-white text-neutral-800 hover:border-black'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-full border border-white/50 ${c.class}`} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-black">
                    Size: <span className="font-normal text-neutral-600">{selectedSize}</span>
                  </span>
                  <button 
                    onClick={() => setSizeGuideOpen(!sizeGuideOpen)}
                    className="text-black underline font-bold flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Chart
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((sz, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[42px] px-3.5 py-2 rounded-xl text-xs font-bold tracking-wider transition ${
                        selectedSize === sz
                          ? 'bg-black text-white shadow-md'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200 border border-neutral-300'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Size guide expandable drawer */}
                {sizeGuideOpen && (
                  <div className="mt-2.5 p-3 rounded-xl bg-neutral-100 text-[11px] text-neutral-700 space-y-1 border border-neutral-200">
                    <p className="font-bold text-black">Standard Size Guide (Chest / Length):</p>
                    <div className="grid grid-cols-4 gap-1 text-center font-mono">
                      <div className="bg-white p-1 rounded border border-neutral-300">M: 40/28"</div>
                      <div className="bg-white p-1 rounded border border-neutral-300">L: 42/29"</div>
                      <div className="bg-white p-1 rounded border border-neutral-300">XL: 44/30"</div>
                      <div className="bg-white p-1 rounded border border-neutral-300">XXL: 46/31"</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Counter */}
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-bold text-black">Quantity:</span>
                <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-black hover:bg-neutral-200 transition font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-black">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-black hover:bg-neutral-200 transition font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-4 border-t border-neutral-200 space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="py-3 px-4 rounded-xl border-2 border-black text-black hover:bg-neutral-100 font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl bg-black hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition shadow-lg"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>অর্ডার করুন (Buy Now)</span>
                </button>
              </div>

              {/* Delivery Assurance */}
              <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-1">
                <span className="flex items-center gap-1 font-semibold">
                  <Truck className="w-3.5 h-3.5 text-black" /> Cash on Delivery available
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-black" /> 100% Quality Checked
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

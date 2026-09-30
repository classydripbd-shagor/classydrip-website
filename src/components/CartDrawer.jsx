import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/reviews';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Zap, 
  Sparkles 
} from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartSubtotal,
    freeShippingLeft,
    freeShippingProgress,
    setIsCheckoutOpen,
    setCurrentPage,
    setSelectedCategory
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setSelectedCategory('all');
    setCurrentPage('shop');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-backdropIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col z-10 animate-slideInRight">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="font-serif text-lg font-bold text-black">Your Shopping Bag</h2>
              <span className="px-2 py-0.5 rounded-full bg-black text-white text-xs font-bold">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-neutral-500 hover:text-black hover:bg-neutral-200 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter - Monochrome */}
          <div className="p-4 bg-neutral-100 border-b border-neutral-200">
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className="flex items-center gap-1.5 text-black">
                <Truck className="w-4 h-4 text-black" />
                {freeShippingLeft > 0 ? (
                  <>Add <span className="font-extrabold underline">৳{freeShippingLeft.toLocaleString()}</span> more for <span className="font-bold">FREE Delivery</span>!</>
                ) : (
                  <span className="text-black font-extrabold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Congratulations! You unlocked Free Delivery!
                  </span>
                )}
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-black h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-neutral-200">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-xl font-bold text-black">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs">
                  Discover the latest Classy Drip streetwear duo sets, heavyweight drop-tees, and tailored trousers.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="px-7 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold tracking-widest uppercase rounded-full transition shadow-md"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div 
                  key={`${item.product.id}-${item.size}-${item.color}-${idx}`}
                  className="flex gap-4 p-3 rounded-2xl border border-neutral-200 bg-white hover:border-black transition shadow-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 rounded-xl object-cover flex-shrink-0 bg-neutral-100"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs text-black line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="text-neutral-400 hover:text-black transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-600">
                        <span className="bg-neutral-100 px-2 py-0.5 rounded font-bold border border-neutral-200">Size: {item.size}</span>
                        {item.color && (
                          <span className="bg-neutral-100 px-2 py-0.5 rounded font-medium border border-neutral-200">Color: {item.color}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="px-2.5 py-1 text-xs text-black hover:bg-neutral-200 font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-xs font-bold text-black">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="px-2.5 py-1 text-xs text-black hover:bg-neutral-200 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <span className="font-serif font-bold text-sm text-black">
                        ৳{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-neutral-600 font-medium">Subtotal:</span>
                <span className="font-serif font-extrabold text-2xl text-black">
                  ৳{cartSubtotal.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Delivery fee calculated at checkout (Dhaka ৳70, Outside Dhaka ৳130).
              </p>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-xl transition flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>অর্ডার কনফার্ম করুন (Checkout Now)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-2 bg-transparent text-neutral-600 hover:text-black font-bold text-xs uppercase tracking-wider text-center transition"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/reviews';
import confetti from 'canvas-confetti';
import { 
  X, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  ArrowRight,
  FileText
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    clearCart,
    cartSubtotal,
    checkoutDirectItem,
    setCheckoutDirectItem,
    setLatestOrder
  } = useCart();

  if (!isCheckoutOpen) return null;

  // Active items: either direct buy or full cart
  const items = checkoutDirectItem 
    ? [checkoutDirectItem] 
    : cart;

  const rawSubtotal = checkoutDirectItem 
    ? checkoutDirectItem.product.price * checkoutDirectItem.quantity 
    : cartSubtotal;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('dhaka'); // 'dhaka' or 'outside'
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' or 'bkash'
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Delivery fee logic
  const isFreeDelivery = rawSubtotal >= BRAND_INFO.freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : (city === 'dhaka' ? BRAND_INFO.deliveryInsideDhaka : BRAND_INFO.deliveryOutsideDhaka);
  const grandTotal = rawSubtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('অনুগ্রহ করে আপনার পুরো নাম লিখুন (Please enter your name)');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (!cleanPhone || cleanPhone.length < 11) {
      setError('অনুগ্রহ করে সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (e.g. 01712345678)');
      return;
    }

    if (!address.trim() || address.length < 5) {
      setError('অনুগ্রহ করে বিস্তারিত ডেলিভারি ঠিকানা লিখুন (বাসা/রোড/এলাকা)');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'CD-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        orderId,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer: { name, phone, address, city },
        items,
        subtotal: rawSubtotal,
        deliveryFee,
        grandTotal,
        paymentMethod,
        note
      };

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // fallback
      }

      setLatestOrder(newOrder);
      if (!checkoutDirectItem) clearCart();
      setCheckoutDirectItem(null);
      setIsCheckoutOpen(false);
      setIsSubmitting(false);
    }, 800);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCheckoutDirectItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200 border border-neutral-200">
        
        {/* Header - Pure Black */}
        <div className="p-4 sm:p-6 bg-black text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center">
              <img src="/logo-emblem.png" alt="Classy Drip" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold">এক ক্লিকে অর্ডার করুন (Quick Checkout)</h2>
              <p className="text-xs text-neutral-300">ক্যাশ অন ডেলিভারি (পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন)</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="p-4 bg-neutral-100 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-black">অর্ডার আইটেম:</span>
            <div className="flex -space-x-2 overflow-hidden">
              {items.map((it, idx) => (
                <img
                  key={idx}
                  src={it.product.images[0]}
                  alt={it.product.name}
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                  title={`${it.product.name} (${it.size})`}
                />
              ))}
            </div>
            <span className="text-neutral-600 font-semibold">({items.length}টি প্রোডাক্ট)</span>
          </div>

          <div className="flex items-center gap-2 font-bold">
            <span className="text-neutral-600">আইটেম সাবটোটাল:</span>
            <span className="font-serif text-black text-sm font-extrabold">৳{rawSubtotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 bg-neutral-100 border border-black text-black text-xs rounded-xl font-bold">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-black" /> আপনার পুরো নাম (Full Name) *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="যেমন: মোঃ সাব্বির আহমেদ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-black" /> মোবাইল নম্বর (Phone Number) *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="যেমন: 017XXXXXXXX"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition font-mono"
              />
            </div>
          </div>

          {/* Delivery Area Selection */}
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-black" /> ডেলিভারি এলাকা নির্বাচন করুন (Delivery Zone) *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                  city === 'dhaka' 
                    ? 'border-black bg-black text-white shadow-sm' 
                    : 'border-neutral-200 bg-white hover:border-black text-black'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="city"
                    checked={city === 'dhaka'}
                    onChange={() => setCity('dhaka')}
                    className="accent-black"
                  />
                  <div>
                    <span className="text-xs font-bold block">ঢাকার ভিতরে (Inside Dhaka)</span>
                    <span className={`text-[10px] ${city === 'dhaka' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      ২৪ - ৪৮ ঘণ্টার মধ্যে ডেলিভারি
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold">
                  {isFreeDelivery ? 'FREE' : `৳${BRAND_INFO.deliveryInsideDhaka}`}
                </span>
              </label>

              <label 
                className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition ${
                  city === 'outside' 
                    ? 'border-black bg-black text-white shadow-sm' 
                    : 'border-neutral-200 bg-white hover:border-black text-black'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="city"
                    checked={city === 'outside'}
                    onChange={() => setCity('outside')}
                    className="accent-black"
                  />
                  <div>
                    <span className="text-xs font-bold block">ঢাকার বাইরে (Outside Dhaka)</span>
                    <span className={`text-[10px] ${city === 'outside' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                      ২ - ৩ দিনের মধ্যে ডেলিভারি
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold">
                  {isFreeDelivery ? 'FREE' : `৳${BRAND_INFO.deliveryOutsideDhaka}`}
                </span>
              </label>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-black" /> বিস্তারিত ডেলিভারি ঠিকানা (Full Address) *
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলা উল্লেখ করুন..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-black" /> পেমেন্ট পদ্ধতি (Payment Method)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label 
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'cod' 
                    ? 'border-black bg-neutral-100 text-black font-bold' 
                    : 'border-neutral-200 text-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="accent-black"
                />
                <div>
                  <span className="text-xs font-bold block">ক্যাশ অন ডেলিভারি (COD)</span>
                  <span className="text-[10px] text-neutral-500">প্রোডাক্ট হাতে পেয়ে মূল্য দিন</span>
                </div>
              </label>

              <label 
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition ${
                  paymentMethod === 'bkash' 
                    ? 'border-black bg-neutral-100 text-black font-bold' 
                    : 'border-neutral-200 text-neutral-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="accent-black"
                />
                <div>
                  <span className="text-xs font-bold block">বিকাশ / নগদ (bKash)</span>
                  <span className="text-[10px] text-neutral-500">অর্ডার কনফার্মেশনের পর পেমেন্ট</span>
                </div>
              </label>
            </div>
          </div>

          {/* Special note */}
          <div>
            <label className="block text-xs font-medium text-neutral-600 mb-1 flex items-center gap-1">
              <FileText className="w-3 h-3" /> কোনো বিশেষ নির্দেশনা থাকলে লিখুন (Optional Note):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="যেমন: সাইজ নিয়ে কল দিলে ভালো হয় / ডেলিভারির আগে কল করবেন"
              className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-black"
            />
          </div>

          {/* Pricing Breakdown Card */}
          <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>মোট পণ্যের দাম (Subtotal):</span>
              <span className="font-bold text-black">৳{rawSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>ডেলিভারি চার্জ (Delivery Charge):</span>
              <span className="font-bold text-black">
                {isFreeDelivery ? <span className="font-extrabold underline">FREE ৳0</span> : `৳${deliveryFee}`}
              </span>
            </div>
            <div className="pt-2 border-t border-neutral-300 flex justify-between text-sm sm:text-base font-bold text-black">
              <span>সর্বমোট পরিশোধযোগ্য (Total Payable):</span>
              <span className="font-serif text-xl font-extrabold text-black">৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Submit Button - Pure Black */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-black hover:bg-neutral-800 text-white font-extrabold text-sm uppercase tracking-widest rounded-2xl shadow-xl transition duration-200 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>অর্ডার প্রসেস হচ্ছে...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5 fill-white text-black" />
                <span>অর্ডার নিশ্চিত করুন (Confirm Order ৳{grandTotal.toLocaleString()})</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}

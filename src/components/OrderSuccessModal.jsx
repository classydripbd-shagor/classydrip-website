import React from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/reviews';
import { 
  CheckCircle, 
  ShoppingBag, 
  MessageCircle, 
  ExternalLink, 
  Truck, 
  X,
  Phone,
  ArrowRight
} from 'lucide-react';

export default function OrderSuccessModal() {
  const { latestOrder, setLatestOrder, setCurrentPage } = useCart();

  if (!latestOrder) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello Classy Drip! I have placed an order.\n\nOrder ID: ${latestOrder.orderId}\nName: ${latestOrder.customer.name}\nPhone: ${latestOrder.customer.phone}\nAddress: ${latestOrder.customer.address}\nTotal Amount: ৳${latestOrder.grandTotal}\n\nPlease confirm my order. Thank you!`
  );

  const whatsappUrl = `https://wa.me/${BRAND_INFO.whatsapp}?text=${whatsappMessage}`;

  const handleContinue = () => {
    setLatestOrder(null);
    setCurrentPage('home');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setLatestOrder(null)}
      />

      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200">
        
        {/* Success Header */}
        <div className="p-6 bg-gradient-to-br from-[#0e0e10] via-neutral-900 to-black text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={() => setLatestOrder(null)}
              className="text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-16 h-16 rounded-full bg-white text-black mx-auto flex items-center justify-center shadow-lg mb-3">
            <CheckCircle className="w-9 h-9" />
          </div>

          <h2 className="font-serif text-2xl font-bold">অভিনন্দন! আপনার অর্ডারটি গৃহীত হয়েছে</h2>
          <p className="text-xs text-neutral-300 mt-1 font-medium">
            Thank you for ordering with Classy Drip!
          </p>

          <div className="inline-block mt-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono tracking-wider font-bold">
            Order ID: <span className="text-white underline font-bold">{latestOrder.orderId}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          {/* Order Details */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 text-xs space-y-2">
            <div className="flex justify-between pb-2 border-b border-neutral-200 font-semibold text-neutral-800">
              <span>ডেলিভারি তথ্য (Delivery Details)</span>
              <span>তারিখ: {latestOrder.date}</span>
            </div>

            <div className="space-y-1 text-neutral-600">
              <p><span className="font-medium text-neutral-800">গ্রাহকের নাম:</span> {latestOrder.customer.name}</p>
              <p><span className="font-medium text-neutral-800">ফোন নম্বর:</span> {latestOrder.customer.phone}</p>
              <p><span className="font-medium text-neutral-800">ঠিকানা:</span> {latestOrder.customer.address}</p>
              <p><span className="font-medium text-neutral-800">পেমেন্ট মেথড:</span> {latestOrder.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'bKash / Nagad'}</p>
            </div>
          </div>

          {/* Items Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">অর্ডারকৃত আইটেমসমূহ:</h4>
            {latestOrder.items.map((it, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={it.product.images[0]} alt={it.product.name} className="w-10 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold text-neutral-900 line-clamp-1">{it.product.name}</p>
                    <p className="text-[11px] text-neutral-500">Size: {it.size} • Qty: {it.quantity}</p>
                  </div>
                </div>
                <span className="font-serif font-bold text-neutral-900">
                  ৳{(it.product.price * it.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="p-3.5 rounded-xl bg-neutral-100/70 text-xs space-y-1">
            <div className="flex justify-between text-neutral-600">
              <span>আইটেম সাবটোটাল:</span>
              <span>৳{latestOrder.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>ডেলিভারি চার্জ:</span>
              <span>{latestOrder.deliveryFee === 0 ? 'FREE' : `৳${latestOrder.deliveryFee}`}</span>
            </div>
            <div className="pt-1.5 border-t border-neutral-200 flex justify-between font-bold text-sm text-neutral-900">
              <span>সর্বমোট মূল্য:</span>
              <span className="font-serif text-base text-[#0e0e10]">৳{latestOrder.grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery Note */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-100 text-neutral-700 text-xs">
            <Truck className="w-4 h-4 flex-shrink-0 text-neutral-500 mt-0.5" />
            <p>
              আমাদের কাস্টমার কেয়ার টিম শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করে অর্ডার কনফার্ম করবে।
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-neutral-100 bg-neutral-50/50 space-y-2.5">
          {/* WhatsApp Confirmation */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>হোয়াটসঅ্যাপে দ্রুত কনফার্মেশন নিন (Confirm on WhatsApp)</span>
          </a>

          {/* Facebook Link */}
          <a
            href={BRAND_INFO.facebookUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full py-2.5 px-4 bg-[#1877f2] hover:bg-[#166fe5] text-white font-medium text-xs tracking-wider rounded-xl transition flex items-center justify-center gap-2"
          >
            <span>Classy Drip ফেসবুক পেজে মেসেজ দিন</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleContinue}
            className="w-full py-2.5 text-neutral-600 hover:text-black font-semibold text-xs uppercase tracking-wider transition text-center"
          >
            আরও শপিং করুন (Continue Shopping)
          </button>
        </div>

      </div>
    </div>
  );
}

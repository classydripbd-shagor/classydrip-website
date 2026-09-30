import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { BRAND_INFO } from '../data/reviews';
import { Search, Package, Truck, CheckCircle2, Clock, Phone, ExternalLink } from 'lucide-react';

export default function TrackOrderPage() {
  const { latestOrder } = useCart();
  const [orderQuery, setOrderQuery] = useState(latestOrder ? latestOrder.orderId : '');
  const [trackingResult, setTrackingResult] = useState(latestOrder ? {
    orderId: latestOrder.orderId,
    customerName: latestOrder.customer.name,
    status: 'In Processing',
    estimatedDelivery: 'Tomorrow by 6:00 PM',
    courier: 'Steadfast Express',
    steps: [
      { title: 'Order Placed & Verified', date: 'Today, Just Now', done: true },
      { title: 'Quality Check & Packaging', date: 'In Progress', current: true },
      { title: 'Dispatched to Courier Hub', date: 'Pending', done: false },
      { title: 'Out for Doorstep Delivery', date: 'Pending', done: false }
    ]
  } : null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;

    // Mock search
    setTrackingResult({
      orderId: orderQuery.toUpperCase().startsWith('CD-') ? orderQuery.toUpperCase() : `CD-${orderQuery}`,
      customerName: 'Valued Customer',
      status: 'On the Way (Out for Delivery)',
      estimatedDelivery: 'Within 24 Hours',
      courier: 'Pathao / Steadfast Courier Express',
      steps: [
        { title: 'Order Confirmed', date: 'Yesterday, 4:15 PM', done: true },
        { title: 'At Dhaka Banani Sorting Hub', date: 'Today, 8:30 AM', done: true },
        { title: 'Assigned to Delivery Hero', date: 'Today, 11:45 AM', current: true },
        { title: 'Doorstep Handover & Payment', date: 'Expected Today by 5 PM', done: false }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-bold uppercase tracking-wider">
            <Package className="w-3.5 h-3.5 text-neutral-700" /> Nationwide Live Tracking
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Track Your Classy Drip Parcel
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
            Enter your Order ID (e.g. CD-598212) or 11-digit mobile number to view live status.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrack} className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-sm flex items-center gap-2">
          <Search className="w-5 h-5 text-neutral-400 ml-2" />
          <input
            type="text"
            required
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="Enter Order ID (e.g. CD-598212) or Phone number..."
            className="w-full text-sm font-medium focus:outline-none placeholder-neutral-400"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#0e0e10] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition flex-shrink-0"
          >
            Track Order
          </button>
        </form>

        {/* Results */}
        {trackingResult && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-md space-y-6 animate-in fade-in duration-300">
            {/* Top Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-100 gap-3">
              <div>
                <span className="text-xs text-neutral-400 uppercase font-semibold">Tracking Number:</span>
                <h3 className="font-serif font-bold text-xl text-neutral-900">{trackingResult.orderId}</h3>
              </div>
              <div className="text-left sm:text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  {trackingResult.status}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-1">
                  Est. Delivery: {trackingResult.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Courier info */}
            <div className="p-4 rounded-2xl bg-neutral-50 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-neutral-500" />
                <div>
                  <span className="font-bold text-neutral-800 block">Courier Partner</span>
                  <span className="text-neutral-500">{trackingResult.courier}</span>
                </div>
              </div>
              <a
                href={`tel:${BRAND_INFO.phone}`}
                className="text-black font-bold hover:underline flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" /> Call Rider Support
              </a>
            </div>

            {/* Step Timeline */}
            <div className="space-y-6 pt-2">
              {trackingResult.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 relative">
                  {idx !== trackingResult.steps.length - 1 && (
                    <div 
                      className={`absolute left-4 top-8 bottom-0 w-0.5 -ml-px ${
                        step.done ? 'bg-emerald-500' : 'bg-neutral-200'
                      }`}
                    />
                  )}

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    step.done 
                      ? 'bg-emerald-600 text-white' 
                      : step.current 
                        ? 'bg-black text-white font-bold ring-4 ring-black/20' 
                        : 'bg-neutral-100 text-neutral-400'
                  }`}>
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{idx + 1}</span>
                    )}
                  </div>

                  <div>
                    <h4 className={`text-sm font-semibold ${step.done || step.current ? 'text-neutral-900' : 'text-neutral-400'}`}>
                      {step.title}
                    </h4>
                    <span className="text-xs text-neutral-400">{step.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Help footer */}
            <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-2">
              <span>Delivery rider will call you prior to arrival.</span>
              <a
                href={`https://wa.me/${BRAND_INFO.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                Inquire on WhatsApp <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

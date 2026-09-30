import React, { useState } from 'react';
import { BRAND_INFO } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  ExternalLink, 
  Send, 
  Clock, 
  HelpCircle 
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useCart();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Your message has been sent to our customer care team!');
    setTimeout(() => {
      setForm({ name: '', phone: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Customer Support
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-neutral-900">
            Get in Touch with Classy Drip
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            Have questions about sizes, fabric GSM, or order tracking? We are here to assist you 7 days a week.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Details Card */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm space-y-6">
              <h3 className="font-serif font-bold text-lg text-neutral-900">Contact Channels</h3>
              
              <div className="space-y-4 text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0 text-neutral-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">Customer Hotline</span>
                    <a href={`tel:${BRAND_INFO.phone}`} className="text-neutral-600 hover:text-black font-semibold text-sm">
                      {BRAND_INFO.phoneDisplay}
                    </a>
                    <span className="text-[11px] text-neutral-400 block">Everyday: 10:00 AM – 10:00 PM</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">WhatsApp Support</span>
                    <a 
                      href={`https://wa.me/${BRAND_INFO.whatsapp}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      Chat with Support Team
                    </a>
                    <span className="text-[11px] text-neutral-400 block">Fastest response for sizing advice</span>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">Official Facebook</span>
                    <a 
                      href={BRAND_INFO.facebookUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-blue-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      Classy Drip Page <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[11px] text-neutral-400 block">Browse video reviews & drops</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center flex-shrink-0 text-neutral-500">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-neutral-900 block">HQ & Atelier</span>
                    <p className="text-neutral-600">
                      {BRAND_INFO.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Rates */}
            <div className="bg-neutral-900 text-white p-6 rounded-3xl space-y-3">
              <h4 className="font-serif font-bold text-sm tracking-wider uppercase text-neutral-300">
                Delivery Tariffs
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-300">Inside Dhaka (24-48 hrs):</span>
                  <span className="font-bold">৳{BRAND_INFO.deliveryInsideDhaka}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-800 pb-2">
                  <span className="text-neutral-300">Outside Dhaka (2-3 days):</span>
                  <span className="font-bold">৳{BRAND_INFO.deliveryOutsideDhaka}</span>
                </div>
                <div className="flex justify-between text-white font-semibold pt-1">
                  <span>Orders above ৳2,500:</span>
                  <span>FREE DELIVERY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form & FAQs */}
          <div className="lg:col-span-2 space-y-6">
            {/* Form */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-neutral-100 shadow-sm">
              <h3 className="font-serif font-bold text-xl text-neutral-900 mb-4">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-center space-y-2">
                  <span className="font-bold text-base block">Message Received!</span>
                  <p className="text-xs">Our representative will get back to you within 2-4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Tanvir Ahmed"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your.email@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase mb-1">
                      Message / Inquiry *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Ask about size recommendations, restock dates, or bulk orders..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </form>
              )}
            </div>

            {/* Quick FAQs */}
            <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm space-y-4">
              <h3 className="font-serif font-bold text-base text-neutral-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-neutral-500" /> Frequently Asked Questions
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50">
                  <p className="font-bold text-neutral-900">কিভাবে অর্ডার করব? (How to Order?)</p>
                  <p className="text-neutral-600 mt-1">
                    যেকোনো প্রোডাক্টের নিচে "অর্ডার করুন" বাটনে ক্লিক করে আপনার নাম, মোবাইল নম্বর এবং ঠিকানা দিয়ে সরাসরি এক ক্লিকে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারেন।
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50">
                  <p className="font-bold text-neutral-900">সাইজ পরিবর্তন বা রিটার্ন পলিসি কি? (Exchange Policy)</p>
                  <p className="text-neutral-600 mt-1">
                    পণ্য রিসিভ করার ৭ দিনের মধ্যে যেকোনো সাইজ বা ফিটিং সমস্যা হলে আমাদের হটলাইনে জানালে বিনামূল্যে সাইজ এক্সচেঞ্জ করে দেওয়া হবে।
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

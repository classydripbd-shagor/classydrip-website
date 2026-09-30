import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TrackOrderPage from './pages/TrackOrderPage';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import SearchModal from './components/SearchModal';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBottomNav from './components/MobileBottomNav';
import ToastContainer from './components/Toast';

function MainContent() {
  const { currentPage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] text-neutral-900 pb-16 lg:pb-0">
      {/* Global Header */}
      <Header />

      {/* Main Routed Page */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'track' && <TrackOrderPage />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccessModal />
      <SearchModal />

      {/* Floating Elements */}
      <WhatsAppButton />
      <MobileBottomNav />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}

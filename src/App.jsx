import React, { useEffect, useRef } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TrackOrderPage from './pages/TrackOrderPage';
import CategoriesPage from './pages/CategoriesPage';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import SearchModal from './components/SearchModal';
import WhatsAppButton from './components/WhatsAppButton';
import MobileBottomNav from './components/MobileBottomNav';
import ToastContainer from './components/Toast';

function PageWrapper({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.classList.remove('page-enter');
      // Force reflow to restart animation
      void ref.current.offsetWidth;
      ref.current.classList.add('page-enter');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [children]);

  return <div ref={ref} className="page-enter flex-1">{children}</div>;
}

function MainContent() {
  const { currentPage } = useCart();

  const pageMap = {
    home: <HomePage />,
    shop: <ShopPage />,
    categories: <CategoriesPage />,
    about: <AboutPage />,
    contact: <ContactPage />,
    track: <TrackOrderPage />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 pb-16 lg:pb-0">
      {/* Global Header */}
      <Header />

      {/* Main Routed Page with transition */}
      <main className="flex-1 flex flex-col">
        <PageWrapper key={currentPage}>
          {pageMap[currentPage] || <HomePage />}
        </PageWrapper>
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

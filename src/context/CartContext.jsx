import React, { createContext, useContext, useState, useEffect } from 'react';
import { BRAND_INFO } from '../data/reviews';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Navigation
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('classydrip_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('classydrip_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDirectItem, setCheckoutDirectItem] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('classydrip_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('classydrip_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart Actions
  const addToCart = (product, size, color, quantity = 1) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Standard');

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.size === selectedSize && item.color === selectedColor
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, { product, size: selectedSize, color: selectedColor, quantity }];
      }
    });

    addToast(`Added "${product.name.slice(0, 30)}..." to your bag!`);
  };

  const updateQuantity = (index, delta) => {
    setCart(prevCart => {
      const newCart = [...prevCart];
      const newQty = newCart[index].quantity + delta;
      if (newQty <= 0) {
        return newCart.filter((_, i) => i !== index);
      }
      newCart[index].quantity = newQty;
      return newCart;
    });
  };

  const removeFromCart = (index) => {
    setCart(prevCart => prevCart.filter((_, i) => i !== index));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        addToast(`Removed from wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        addToast(`Added to your wishlist!`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingLeft = Math.max(0, BRAND_INFO.freeDeliveryThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / BRAND_INFO.freeDeliveryThreshold) * 100);

  // Quick Buy (Bangladeshi fast checkout)
  const buyNow = (product, size, color, quantity = 1) => {
    const selectedSize = size || product.sizes[0];
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Standard');
    setCheckoutDirectItem({ product, size: selectedSize, color: selectedColor, quantity });
    setIsCheckoutOpen(true);
    if (quickViewProduct) setQuickViewProduct(null);
  };

  return (
    <CartContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        freeShippingLeft,
        freeShippingProgress,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutDirectItem,
        setCheckoutDirectItem,
        buyNow,
        isSearchOpen,
        setIsSearchOpen,
        latestOrder,
        setLatestOrder,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

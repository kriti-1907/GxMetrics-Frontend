import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to update the cart in the context and localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    if (user) localStorage.setItem(`cart`, JSON.stringify(newCart));
  };

  const addToCart = (product, quantity) => {
    if (user) {
      setCart((prevCart) => {
        const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

        if (existingProductIndex !== -1) {
          const updatedCart = [...prevCart];
          updatedCart[existingProductIndex].quantity += quantity;
          updateCart(updatedCart);
          return updatedCart;
        } else {
          const newCart = [...prevCart, { ...product, quantity }];
          updateCart(newCart);
          return newCart;
        }
      });
    } else {
      console.error('User not authenticated. Cannot add item to cart.');
    }
  };

  const removeFromCart = (productId) => {
    if (user) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      updateCart(updatedCart);
    } else {
      console.error('User not authenticated. Cannot remove item from cart.');
    }
  };
  const clearCart=()=>{
updateCart([]);
  }

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = localStorage.getItem(`cart`);
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setLoading(false);
  }, [user]);

  // Save cart to localStorage when user changes or cart changes
  useEffect(() => {
    if (user && cart.length > 0) {
      localStorage.setItem(`cart`, JSON.stringify(cart));
    }
  }, [user, cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, loading, setCart,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

import { useState, useEffect } from 'react';
import { CartItem, Product, CartState } from '../types';

const CART_STORAGE_KEY = 'ecommerce-cart';

export const useCart = () => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    isOpen: false,
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartState(prev => ({
          ...prev,
          items: parsedCart,
          ...calculateTotals(parsedCart)
        }));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState.items));
  }, [cartState.items]);

  const calculateTotals = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCartState(prev => {
      const existingItem = prev.items.find(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prev.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prev.items, { product, quantity }];
      }

      return {
        ...prev,
        items: newItems,
        ...calculateTotals(newItems)
      };
    });
  };

  const removeFromCart = (productId: number) => {
    setCartState(prev => {
      const newItems = prev.items.filter(item => item.product.id !== productId);
      return {
        ...prev,
        items: newItems,
        ...calculateTotals(newItems)
      };
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartState(prev => {
      const newItems = prev.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );
      return {
        ...prev,
        items: newItems,
        ...calculateTotals(newItems)
      };
    });
  };

  const clearCart = () => {
    setCartState(prev => ({
      ...prev,
      items: [],
      total: 0,
      itemCount: 0
    }));
  };

  const toggleCart = () => {
    setCartState(prev => ({ ...prev, isOpen: !prev.isOpen }));
  };

  return {
    cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart
  };
};
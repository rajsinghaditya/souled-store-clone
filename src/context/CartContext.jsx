// =====================================================
// CartContext.jsx
// Concepts: React Context, useState
// Manages cart state globally across the app
// =====================================================
import React, { useState, createContext } from "react";

// Create the context
export const CartContext = createContext();

// CartProvider wraps the whole app so any component can access cart
export function CartProvider({ children }) {
  // cartItems is an Array of objects: { ...product, selectedSize, quantity }
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // TOGGLE WISHLIST
  function toggleWishlist(product) {
    setWishlist(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  }

  // CHECK IF WISHLISTED
  const isWishlisted = (id) => wishlist.some(p => p.id === id);

  // ADD ITEM TO CART
  // Uses .findIndex (array method) to check if item already exists
  function addToCart(product, selectedSize) {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIndex !== -1) {
        // Item exists — increase quantity using .map
        return prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item — spread existing array and add new object
        return [...prevItems, { ...product, selectedSize, quantity: 1 }];
      }
    });
  }

  // REMOVE ITEM FROM CART
  // Uses .filter to remove the matching item
  function removeFromCart(productId, selectedSize) {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      )
    );
  }

  // UPDATE QUANTITY
  function updateQuantity(productId, selectedSize, delta) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === productId && item.selectedSize === selectedSize) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) // Remove if quantity hits 0
    );
  }

  // CLEAR CART
  function clearCart() {
    setCartItems([]);
  }

  // TOTAL ITEMS COUNT — uses .reduce (array method)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // TOTAL PRICE — uses .reduce
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

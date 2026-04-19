// =====================================================
// App.jsx — Root Component
// Concepts: useState (cart open/close), CartProvider context
// =====================================================
import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // State: is the cart drawer open or closed?
  const [cartOpen, setCartOpen] = useState(false);

  return (
    // Wrap entire app with CartProvider so all components can access cart
    <CartProvider>
      <div className="app">
        <Navbar onCartOpen={() => setCartOpen(true)} />
        <main className="main-content">
          <HeroBanner />
          <ProductGrid />
        </main>
        <Footer />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      </div>
    </CartProvider>
  );
}

export default App;

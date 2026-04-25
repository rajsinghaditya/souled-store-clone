import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import ProductGrid from "./components/ProductGrid";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import WishlistPage from "./pages/WishlistPage";
import SneakersPage from "./pages/SneakersPage";
import ProductDetail from "./components/ProductDetail";
import "./App.css";

function App() {
  
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home"); 
  const [selectedProduct, setSelectedProduct] = useState(null);

  
  const isCategoryPage = ["men", "women", "sneakers"].includes(currentPage);

  return (
    
    <CartProvider>
      <div className="app">
        <Navbar onCartOpen={() => setCartOpen(true)} onNavigate={setCurrentPage} activePage={currentPage} />
        <main className="main-content">
          {currentPage === "home" ? (
            <>
              <HeroBanner onNavigate={setCurrentPage} />
              <ProductGrid onProductClick={setSelectedProduct} />
            </>
          ) : currentPage === "wishlist" ? (
            <WishlistPage
              onNavigate={setCurrentPage}
              onProductClick={setSelectedProduct}
            />
          ) : currentPage === "sneakers" ? (
            <SneakersPage onProductClick={setSelectedProduct} />
          ) : (
            <ProductGrid 
              key={currentPage} 
              categoryFilter={currentPage} 
              onProductClick={setSelectedProduct} 
            />
          )}
        </main>
        <Footer />
        <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        <ProductDetail
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
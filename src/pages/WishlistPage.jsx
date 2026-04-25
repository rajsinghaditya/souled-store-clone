import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import "../styles/WishlistPage.css";

function WishlistPage({ onNavigate, onProductClick }) {
  const { wishlist } = useContext(CartContext);

  return (
    <section className="wishlist-section container">
      <h2 className="section-title">
        My Wishlist 🤍
        <span className="product-count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</span>
      </h2>

      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p className="empty-emoji">🥺</p>
          <h3>Your wishlist is feeling lonely!</h3>
          <p>Explore some merch and add your favorites here.</p>
          <button className="continue-btn" onClick={() => onNavigate('home')}>
            Explore Merch
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default WishlistPage;
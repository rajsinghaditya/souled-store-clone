// =====================================================
// ProductDetail.jsx
// Concepts: useState (selected size), useEffect (lock body scroll)
// =====================================================
import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductDetail.css";

function ProductDetail({ product, isOpen, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  // Fetch all products to find related ones
  useEffect(() => {
    if (isOpen) {
      fetch("/products.json")
        .then(res => res.json())
        .then(data => setAllProducts(data))
        .catch(err => console.error(err));
    }
  }, [isOpen]);

  // Lock scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  if (!product) return null;

  // Filter related products (same category, different ID)
  const related = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    addToCart(product, selectedSize);
    onClose();
  };

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className={`detail-overlay ${isOpen ? "visible" : ""}`} onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-detail-btn" onClick={onClose}>✕</button>

        <div className="detail-image-side">
          <img src={product.image} alt={product.name} className="detail-img" />
          {product.badge && <span className="detail-badge-overlay">{product.badge}</span>}
        </div>

        <div className="detail-info-side">
          <div className="detail-header">
            <span className="detail-fandom">{product.fandom}</span>
            <h2 className="detail-name">{product.name}</h2>
            <div className="detail-rating">
              <span className="stars">{"★".repeat(Math.floor(product.rating))}</span>
              <span className="rating-value">{product.rating}</span>
              <span className="reviews-count">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="detail-price-box">
            <span className="detail-current-price">₹{product.price}</span>
            <span className="detail-old-price">₹{product.originalPrice}</span>
            <span className="detail-discount">{discount}% OFF</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-option-group">
            <label className="option-label">Select Size</label>
            <div className="size-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-btn ${selectedSize === size ? "active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="detail-actions">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
            >
              {isWishlisted ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="detail-perks">
            <div className="perk">🚚 Free shipping on orders over ₹999</div>
            <div className="perk">↩️ 30 days easy returns</div>
          </div>

          {/* Related Products — Concepts: filter, map */}
          {related.length > 0 && (
            <div className="related-products-section">
              <h3 className="related-title">You Might Also Like</h3>
              <div className="related-grid">
                {related.map(p => (
                  <div key={p.id} className="related-item">
                    <img src={p.image} alt={p.name} className="related-img" />
                    <p className="related-name">{p.name}</p>
                    <p className="related-price">₹{p.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

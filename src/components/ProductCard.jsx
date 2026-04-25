// =====================================================
// ProductCard.jsx
// Concepts: useState (selected size, wishlist), useContext (cart)
// =====================================================
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product, onClick }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useContext(CartContext);
  
  const wishlisted = isWishlisted(product.id);

  // Calculate discount percentage using Math
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Handle add to cart
  function handleAddToCart() {
    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }
    addToCart(product, selectedSize);
    setAdded(true);
    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  }

  // Render star rating using Array + .map
  function renderStars(rating) {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= Math.round(rating) ? "star-filled" : "star-empty"}`}
      >
        ★
      </span>
    ));
  }

  return (
    <div className={`product-card ${!product.inStock ? "out-of-stock" : ""}`} id={`product-${product.id}`}>
      {/* Image */}
      <div className="card-image-wrap" onClick={onClick} style={{ cursor: 'pointer' }}>
        <img
          src={product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80&auto=format&fit=crop";
          }}
        />

        {/* Badges */}
        <div className="card-badges">
          {product.badge && (
            <span className={`badge badge-${product.badge.toLowerCase().replace(" ", "-")}`}>
              {product.badge}
            </span>
          )}
          {product.isNew && <span className="badge badge-new">New</span>}
          {!product.inStock && (
            <span className="badge badge-sold-out">Sold Out</span>
          )}
        </div>

        {/* Discount */}
        {discount > 0 && (
          <span className="card-discount">-{discount}%</span>
        )}

        {/* Wishlist button */}
        <button
          className={`wishlist-btn ${wishlisted ? "wishlisted" : ""}`}
          id={`wishlist-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          title="Add to Wishlist"
        >
          {wishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Card info */}
      <div className="card-info">
        <p className="card-fandom">{product.fandom}</p>
        <h3 className="card-name" onClick={onClick} style={{ cursor: 'pointer' }}>{product.name}</h3>

        {/* Rating */}
        <div className="card-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span className="rating-text">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="card-price">
          <span className="price-current">₹{product.price}</span>
          <span className="price-original">₹{product.originalPrice}</span>
          <span className="price-discount">{discount}% off</span>
        </div>

        {/* Size selector — .map over sizes array */}
        {product.inStock && (
          <div className="size-selector">
            <p className="size-label">Size:</p>
            <div className="size-options">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  id={`size-${product.id}-${size}`}
                  className={`size-btn ${selectedSize === size ? "size-active" : ""}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          className={`add-to-cart-btn ${added ? "btn-added" : ""} ${!product.inStock ? "btn-disabled" : ""}`}
          id={`add-cart-${product.id}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {!product.inStock
            ? "Out of Stock"
            : added
            ? "✓ Added to Cart!"
            : "Add to Cart 🛒"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

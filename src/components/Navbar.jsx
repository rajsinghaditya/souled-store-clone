// =====================================================
// Navbar.jsx
// Concepts: useState (for mobile menu & cart open state)
// =====================================================
import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";

function Navbar({ onCartOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useContext(CartContext);

  // Navbar links — array of objects, rendered with .map
  const navLinks = [
    { label: "Men",       href: "#" },
    { label: "Women",     href: "#" },
    { label: "Kids",      href: "#" },
    { label: "Marvel",    href: "#" },
    { label: "DC",        href: "#" },
    { label: "Anime",     href: "#" },
    { label: "Cricket",   href: "#" },
    { label: "Sale 🔥",   href: "#" },
  ];

  return (
    <header className="navbar">
      {/* Top bar */}
      <div className="navbar-top">
        <p className="navbar-announcement">
          🎉 FREE SHIPPING on orders above ₹999 | Use code: <strong>SOULED10</strong> for 10% off
        </p>
      </div>

      {/* Main navbar */}
      <nav className="navbar-main">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">The Souled Store</span>
        </div>

        {/* Search bar */}
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for products, fandoms, characters..."
            className="search-input"
            id="navbar-search-input"
          />
        </div>

        {/* Right actions */}
        <div className="navbar-actions">
          <button className="action-btn" id="wishlist-btn" title="Wishlist">
            <span>🤍</span>
            <span className="action-label">Wishlist</span>
          </button>
          <button className="action-btn" id="account-btn" title="Account">
            <span>👤</span>
            <span className="action-label">Account</span>
          </button>
          <button
            className="action-btn cart-btn"
            id="cart-btn"
            title="Cart"
            onClick={onCartOpen}
          >
            <span>🛒</span>
            <span className="action-label">Cart</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
          <button
            className="hamburger-btn"
            id="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Category nav links — .map over array of objects */}
      <nav className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;

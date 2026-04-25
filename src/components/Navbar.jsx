import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css";
import soulStoreLogo from "../assets/logo for soul store .webp";

function Navbar({ onCartOpen, onNavigate, activePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, wishlist } = useContext(CartContext);

  
  const navLinks = [
    { label: "Men",       id: "men" },
    { label: "Women",     id: "women" },
    { label: "Sneakers",  id: "sneakers" },
  ];

  return (
    <header className="navbar">
      
      <div className="navbar-top">
        <p className="navbar-announcement">
          🎉 FREE SHIPPING on orders above ₹999 | Use code: <strong>SOULED10</strong> for 10% off
        </p>
      </div>

      
      <nav className="navbar-main">
        
        <div className="navbar-logo" onClick={() => onNavigate('home')} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
          <img 
            src={soulStoreLogo} 
            alt="The Souled Store Logo" 
            style={{ 
              height: '48px', 
              objectFit: 'contain',
              background: '#fff',
              borderRadius: '6px',
              padding: '4px 8px'
            }} 
          />
        </div>

        
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for products, fandoms, characters..."
            className="search-input"
            id="navbar-search-input"
          />
        </div>

        
        <div className="navbar-actions">
          <button className="action-btn" id="wishlist-btn" title="Wishlist" onClick={() => onNavigate('wishlist')}>
            <span>🤍</span>
            <span className="action-label">Wishlist</span>
            {wishlist.length > 0 && (
              <span className="cart-badge">{wishlist.length}</span>
            )}
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

      
      <nav className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>
        {navLinks.map((link) => (
          <button 
            key={link.id} 
            className={`nav-link-btn ${activePage === link.id ? "active-link" : ""}`}
            onClick={() => onNavigate(link.id)}
          >
            {link.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Navbar;
// =====================================================
// HeroBanner.jsx
// Concepts: useState (activeSlide), useEffect (auto-play)
// =====================================================
import React, { useState, useEffect } from "react";
import { banners } from "../data/products";
import "../styles/HeroBanner.css";

function HeroBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  // useEffect: Auto-play the slider every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      // Update slide using functional update (prev state pattern)
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, []); // Empty dependency array = runs once on mount

  // Get active banner object from array
  const currentBanner = banners[activeSlide];

  return (
    <section className="hero-section">
      <div
        className="hero-banner"
        style={{ background: currentBanner.bg }}
        id="hero-banner"
      >
        {/* Text content */}
        <div className="hero-content">
          <span className="hero-tag">{currentBanner.tag}</span>
          <h1 className="hero-title">{currentBanner.title}</h1>
          <p className="hero-subtitle">{currentBanner.subtitle}</p>
          <button className="hero-cta" id="hero-cta-btn">
            {currentBanner.cta} →
          </button>
        </div>

        {/* Decorative */}
        <div className="hero-art">
          <div className="art-circle art-circle-1"></div>
          <div className="art-circle art-circle-2"></div>
          <div className="art-circle art-circle-3"></div>
          <span className="art-logo">TSS</span>
        </div>
      </div>

      {/* Dot indicators — .map over banners array */}
      <div className="hero-dots">
        {banners.map((_, index) => (
          <button
            key={index}
            id={`hero-dot-${index}`}
            className={`hero-dot ${index === activeSlide ? "active" : ""}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>

      {/* Trust badges */}
      <div className="trust-badges">
        {[
          { icon: "✅", text: "100% Officially Licensed" },
          { icon: "🚚", text: "Free Delivery above ₹999" },
          { icon: "↩️",  text: "Easy 30-Day Returns" },
          { icon: "🔒", text: "Secure Payments" },
        ].map((badge) => (
          <div key={badge.text} className="trust-badge">
            <span>{badge.icon}</span>
            <span>{badge.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HeroBanner;

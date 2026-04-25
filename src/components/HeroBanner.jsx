import React, { useState, useEffect } from "react";
import { banners } from "../data/products";
import "../styles/HeroBanner.css";

function HeroBanner({ onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      
      setActiveSlide((prev) => (prev + 1) % banners.length);
    }, 3000);

    
    return () => clearInterval(timer);
  }, []); 

  
  const currentBanner = banners[activeSlide];

  return (
    <section className="hero-section">
      <div
        className="hero-banner"
        style={{ background: currentBanner.bg }}
        id="hero-banner"
      >
        
        <div className="hero-content">
          <span className="hero-tag">{currentBanner.tag}</span>
          <h1 className="hero-title">{currentBanner.title}</h1>
          <p className="hero-subtitle">{currentBanner.subtitle}</p>
          <button 
            className="hero-cta" 
            id="hero-cta-btn"
            onClick={() => onNavigate(currentBanner.target)}
          >
            {currentBanner.cta} →
          </button>
        </div>

        
        <div className="hero-image-wrap">
          <img 
            src={currentBanner.image} 
            alt={currentBanner.title}
            className="hero-featured-img"
          />
          <div className="hero-image-glow"></div>
        </div>
      </div>

      
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
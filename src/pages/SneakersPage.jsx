import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/SneakersPage.css";

function SneakersPage({ onProductClick }) {
  const [sneakers, setSneakers] = useState([]);
  const [filteredSneakers, setFilteredSneakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("default");
  
  useEffect(() => {
    
    fetch("/products.json")
      .then(res => res.json())
      .then(data => {
        
        const sneakerData = data.filter(item => item.category === "sneakers");
        
        
        sneakerData.forEach(sneaker => {
          if (sneaker.originalPrice && sneaker.price < sneaker.originalPrice) {
            const discount = Math.round(((sneaker.originalPrice - sneaker.price) / sneaker.originalPrice) * 100);
            sneaker.discountLabel = `${discount}% OFF`;
          } else {
            sneaker.discountLabel = "";
          }
        });
        
        setSneakers(sneakerData);
        setFilteredSneakers(sneakerData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching sneakers:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    
    let result = [...sneakers];
    if (sortOrder === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }
    setFilteredSneakers(result);
  }, [sortOrder, sneakers]);

  return (
    <div className="sneakers-page">
      
      <div className="sneakers-hero">
        <div className="sneakers-hero-overlay"></div>
        <div className="sneakers-hero-content">
          <h1>SNEAKER REVOLUTION</h1>
          <p>Cop the freshest drops and exclusive kicks before they're gone.</p>
        </div>
      </div>
      
      <div className="sneakers-container">
        <div className="sneakers-header">
          <h2>Trending Kicks</h2>
          <div className="sneakers-toolbar">
            <span className="results-count">{filteredSneakers.length} Styles</span>
            <select className="sneakers-sort" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-container"><div className="loading-spinner"></div></div>
        ) : (
          <div className="sneakers-grid">
            
            {filteredSneakers.map(sneaker => (
              <div className="sneaker-card-wrapper" key={sneaker.id}>
                <ProductCard 
                  product={sneaker} 
                  onClick={() => onProductClick(sneaker)}
                />
                {sneaker.discountLabel && (
                  <div className="sneaker-discount-tag">{sneaker.discountLabel}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SneakersPage;
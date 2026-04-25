// =====================================================
// ProductGrid.jsx
// Concepts: useState (filters, sort, search), useEffect (filtered products)
//           .filter, .sort, .map on arrays of objects
//           Pagination (visibleCount)
// =====================================================
import React, { useState, useEffect } from "react";
import { categories, fandoms, sortOptions } from "../data/products";
import ProductCard from "./ProductCard";
import "../styles/ProductGrid.css";

function ProductGrid({ onProductClick, categoryFilter }) {
  // State variables
  const [products, setProducts]             = useState([]);
  const [loading, setLoading]               = useState(true);
  
  // Initialize filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFandom, setSelectedFandom]     = useState(() => {
    if (categoryFilter === "marvel") return "Marvel";
    if (categoryFilter === "dc")     return "DC Comics";
    if (categoryFilter === "anime")  return "Anime";
    return "all";
  });
  
  const [selectedGender, setSelectedGender] = useState(() => {
    if (["men", "women", "sneakers"].includes(categoryFilter)) return categoryFilter;
    return "all";
  });

  const [selectedSort, setSelectedSort]         = useState("default");
  const [searchQuery, setSearchQuery]           = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showInStockOnly, setShowInStockOnly]   = useState(false);
  
  // Pagination State
  const [visibleCount, setVisibleCount]         = useState(24);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/products.json");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter & Sort logic
  useEffect(() => {
    if (products.length === 0) return;

    let result = products.filter((product) => {
      const categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
      const fandomMatch = selectedFandom === "all" || product.fandom === selectedFandom;
      const genderMatch = selectedGender === "all" || product.gender === selectedGender;
      const searchMatch = searchQuery === "" || 
                         product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.fandom.toLowerCase().includes(searchQuery.toLowerCase());
      const stockMatch = !showInStockOnly || product.inStock;
      return categoryMatch && fandomMatch && genderMatch && searchMatch && stockMatch;
    });

    result = result.sort((a, b) => {
      switch (selectedSort) {
        case "price-low": return a.price - b.price;
        case "price-high": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "newest": return b.id - a.id;
        default: return a.id - b.id;
      }
    });

    setFilteredProducts(result);
    // Reset visible count when filters change to show top results
    setVisibleCount(24);
  }, [products, selectedCategory, selectedFandom, selectedGender, selectedSort, searchQuery, showInStockOnly]);

  function resetFilters() {
    setSelectedCategory("all");
    setSelectedFandom("all");
    setSelectedGender("all");
    setSelectedSort("default");
    setSearchQuery("");
    setShowInStockOnly(false);
  }

  const getPageTitle = () => {
    if (!categoryFilter || categoryFilter === "home") return "Shop All Products";
    const title = categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1);
    return `Shop ${title}'s Collection`;
  };

  const handleLoadMore = () => setVisibleCount(prev => prev + 24);

  return (
    <section className="product-section" id="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{getPageTitle()}</h2>
          <span className="product-count">{filteredProducts.length} unique items</span>
        </div>

        {/* ===== FILTERS BAR ===== */}
        <div className="filters-bar">
          <div className="filter-search">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-chips">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`filter-chip ${selectedCategory === cat.id ? "chip-active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">Fandom</label>
            <select
              value={selectedFandom}
              onChange={(e) => setSelectedFandom(e.target.value)}
              className="filter-select"
            >
              {fandoms.map((f) => (
                <option key={f.id} value={f.id}>{f.label}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Sort</label>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>

          <button className="reset-btn" onClick={resetFilters}>Reset</button>
        </div>

        {/* ===== GRID ===== */}
        {loading ? (
          <div className="loading-container"><div className="loading-spinner"></div></div>
        ) : filteredProducts.length === 0 ? (
          <div className="no-products"><h3>No products found 😕</h3></div>
        ) : (
          <>
            <div className="products-grid">
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => onProductClick(product)}
                />
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="load-more-container">
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Discover More Items
                </button>
                <p className="items-shown-text">
                  Viewing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length} items
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;

// =====================================================
// ProductGrid.jsx
// Concepts: useState (filters, sort, search), useEffect (filtered products)
//           .filter, .sort, .map on arrays of objects
// =====================================================
import React, { useState, useEffect } from "react";
import products, { categories, fandoms, sortOptions } from "../data/products";
import ProductCard from "./ProductCard";
import "../styles/ProductGrid.css";

function ProductGrid() {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFandom, setSelectedFandom]     = useState("all");
  const [selectedSort, setSelectedSort]         = useState("default");
  const [searchQuery, setSearchQuery]           = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [showInStockOnly, setShowInStockOnly]   = useState(false);

  // =====================================================
  // useEffect: Re-filter & re-sort whenever filters change
  // =====================================================
  useEffect(() => {
    // STEP 1: FILTER using .filter (array method)
    let result = products.filter((product) => {
      // Filter by category
      const categoryMatch =
        selectedCategory === "all" || product.category === selectedCategory;

      // Filter by fandom
      const fandomMatch =
        selectedFandom === "all" || product.fandom === selectedFandom;

      // Filter by search query (searches name + fandom)
      const searchMatch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fandom.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by in-stock toggle
      const stockMatch = !showInStockOnly || product.inStock;

      // All conditions must be true
      return categoryMatch && fandomMatch && searchMatch && stockMatch;
    });

    // STEP 2: SORT using .sort (array method)
    result = result.sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return a.price - b.price;          // Ascending price
        case "price-high":
          return b.price - a.price;          // Descending price
        case "rating":
          return b.rating - a.rating;        // Highest rating first
        case "newest":
          return b.isNew - a.isNew;          // New items first
        default:
          return a.id - b.id;               // Default order
      }
    });

    setFilteredProducts(result);
  }, [selectedCategory, selectedFandom, selectedSort, searchQuery, showInStockOnly]);
  // ^ Dependency array — useEffect runs when any of these change

  // Reset all filters
  function resetFilters() {
    setSelectedCategory("all");
    setSelectedFandom("all");
    setSelectedSort("default");
    setSearchQuery("");
    setShowInStockOnly(false);
  }

  return (
    <section className="product-section" id="products-section">
      <div className="container">
        <h2 className="section-title">
          Shop All Products
          <span className="product-count">{filteredProducts.length} items</span>
        </h2>

        {/* ===== FILTERS BAR ===== */}
        <div className="filters-bar">
          {/* Search */}
          <div className="filter-search">
            <span>🔍</span>
            <input
              type="text"
              id="product-search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="filter-search-input"
            />
          </div>

          {/* Category Filter — .map over categories array of objects */}
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <div className="filter-chips">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  className={`filter-chip ${selectedCategory === cat.id ? "chip-active" : ""}`}
                  onClick={() => setSelectedCategory(cat.id)}
                >
                  {cat.icon} {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fandom Filter — .map over fandoms array */}
          <div className="filter-group">
            <label className="filter-label">Fandom</label>
            <select
              id="fandom-select"
              value={selectedFandom}
              onChange={(e) => setSelectedFandom(e.target.value)}
              className="filter-select"
            >
              {fandoms.map((fandom) => (
                <option key={fandom.id} value={fandom.id}>
                  {fandom.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort — .map over sortOptions */}
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select
              id="sort-select"
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* In-stock toggle */}
          <div className="filter-group filter-toggle">
            <label className="toggle-label" htmlFor="stock-toggle">
              In Stock Only
            </label>
            <input
              type="checkbox"
              id="stock-toggle"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
              className="toggle-checkbox"
            />
          </div>

          {/* Reset */}
          <button
            className="reset-btn"
            id="reset-filters-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        {/* ===== PRODUCT GRID — .map over filteredProducts ===== */}
        {filteredProducts.length === 0 ? (
          <div className="no-products">
            <p className="no-products-emoji">😕</p>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search query</p>
            <button className="reset-btn" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;

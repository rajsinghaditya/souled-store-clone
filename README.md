# 🛍️ The Souled Store Clone — WAP Project

A React-based clone of [The Souled Store](https://www.thesouledstore.com/) — India's #1 officially licensed fan merchandise store.

## 🚀 Tech Stack
- **React** (with Vite)
- **CSS** (Vanilla, component-scoped)
- **React Hooks:** `useState`, `useEffect` only
- **JS Concepts:** Arrays, Objects, `.filter()`, `.sort()`, `.map()`, `.reduce()`

---

## 📂 Project Structure

```
src/
├── data/
│   └── products.js          # All product data (arrays of objects)
├── context/
│   └── CartContext.jsx       # Cart state management (useState)
├── components/
│   ├── Navbar.jsx            # Header with search & cart badge
│   ├── HeroBanner.jsx        # Auto-sliding banner (useEffect)
│   ├── ProductGrid.jsx       # Filter + Sort + Search grid
│   ├── ProductCard.jsx       # Individual product card
│   ├── CartDrawer.jsx        # Sliding cart sidebar
│   └── Footer.jsx            # Footer with links
├── styles/                   # Component-level CSS files
└── App.jsx                   # Root component
```

---

## 🧑‍💻 Group Commit Plan (3 Members)

### 👤 Member 1 — **Foundation + Homepage** *(Done — Commit 1)*
**Aditya's Commit**
- Project setup (Vite + React)
- `data/products.js` — 12 products as array of objects
- `CartContext.jsx` — cart state with useState
- `Navbar.jsx` — announcement bar, search, cart badge
- `HeroBanner.jsx` — auto-sliding (useState + useEffect)
- `index.css` — global CSS design system

---

### 👤 Member 2 — **Product Features + Filter/Sort**
**Suggested Commit Message:** `"feat: Product listing with filter, sort, and search"`

Things to build / enhance:
1. **`ProductGrid.jsx`** — Add a **price range slider** filter using `useState`
2. **`ProductCard.jsx`** — Add a **"Quick View" modal** popup using `useState`
3. **New page: `pages/CategoryPage.jsx`** — A dedicated page for each category (Men/Women/Kids)
4. **`data/products.js`** — Add 6 more products (Women's section)

**JS Concepts to Use:**
```js
// Price range filter (.filter)
const priceFiltered = products.filter(p => p.price >= minPrice && p.price <= maxPrice);

// Sort by multiple fields
const sorted = products.sort((a, b) => a.price - b.price || b.rating - a.rating);

// Get unique categories using .map + Set
const uniqueCategories = [...new Set(products.map(p => p.category))];
```

---

### 👤 Member 3 — **Cart + Checkout + Polish**
**Suggested Commit Message:** `"feat: Cart page, checkout form, and UI polish"`

Things to build / enhance:
1. **`pages/CartPage.jsx`** — Full cart page (not just sidebar drawer)
2. **`pages/CheckoutPage.jsx`** — Checkout form (name, address, payment)
3. **`components/SearchResults.jsx`** — Search results page with debounce
4. **`components/ProductDetail.jsx`** — Full product detail view
5. **UI Enhancements** — Loading skeleton, toast notifications

**JS Concepts to Use:**
```js
// Order summary using .reduce
const orderTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

// Group cart items by fandom using .reduce
const groupedByFandom = cartItems.reduce((acc, item) => {
  acc[item.fandom] = acc[item.fandom] ? [...acc[item.fandom], item] : [item];
  return acc;
}, {});

// Find most expensive item using .sort
const mostExpensive = [...cartItems].sort((a, b) => b.price - a.price)[0];
```

---

## 🖥️ Running Locally

```bash
npm install       # Install dependencies
npm run dev       # Start dev server at http://localhost:5173
```

## ✅ JS Concepts Reference

| Concept | Where Used |
|---------|-----------|
| **Array of Objects** | `data/products.js` — all 12 products |
| **`.map()`** | Rendering product cards, nav links, badges, stars |
| **`.filter()`** | Category filter, fandom filter, in-stock toggle, search |
| **`.sort()`** | Sort by price, rating, newest |
| **`.reduce()`** | Cart total, item count in `CartContext.jsx` |
| **`useState`** | Filters, cart open/close, selected size, wishlist |
| **`useEffect`** | Auto-play banner, re-filter when state changes |

---

## 🎨 Features (Phase 1)

- ✅ Sticky navbar with announcement bar, search, and cart badge
- ✅ Auto-sliding hero banner (3 slides, auto-play every 3s)
- ✅ Trust badges row
- ✅ Filter by category (chips), fandom (dropdown), in-stock (toggle)
- ✅ Sort by price (low/high), rating, newest
- ✅ Live search across product name + fandom
- ✅ Product cards with image zoom, wishlist, size selector
- ✅ Sliding cart drawer with quantity controls
- ✅ Free delivery progress bar in cart
- ✅ Fully responsive design

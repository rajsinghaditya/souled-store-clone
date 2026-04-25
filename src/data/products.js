// =====================================================
// CATEGORIES - Array of objects
// =====================================================
export const categories = [
  { id: "all",       label: "All",          icon: "🛍️" },
  { id: "men",       label: "Men",          icon: "👕" },
  { id: "women",     label: "Women",        icon: "👗" },
  { id: "sneakers",  label: "Sneakers",     icon: "👟" },
];

// =====================================================
// FANDOMS - Array of objects
// =====================================================
export const fandoms = [
  { id: "all",           label: "All Fandoms" },
  { id: "Marvel",        label: "Marvel" },
  { id: "DC Comics",     label: "DC Comics" },
  { id: "Anime",         label: "Anime" },
  { id: "Harry Potter",  label: "Harry Potter" },
  { id: "Friends",       label: "Friends" },
  { id: "The Office",    label: "The Office" },
  { id: "Cricket",       label: "Cricket" },
  { id: "Game of Thrones", label: "Game of Thrones" },
  { id: "Breaking Bad",  label: "Breaking Bad" },
  { id: "Stranger Things", label: "Stranger Things" },
];

// =====================================================
// SORT OPTIONS - Array of objects
// =====================================================
export const sortOptions = [
  { id: "default",      label: "Featured" },
  { id: "price-low",   label: "Price: Low to High" },
  { id: "price-high",  label: "Price: High to Low" },
  { id: "rating",      label: "Top Rated" },
  { id: "newest",      label: "New Arrivals" },
];

// =====================================================
// BANNER DATA - Array of objects
// =====================================================
export const banners = [
  {
    id: 1,
    title: "New Marvel Collection",
    subtitle: "Assemble Your Wardrobe",
    cta: "Shop Men",
    bg: "linear-gradient(135deg, #e63946 0%, #c1121f 100%)",
    tag: "Marvel",
    image: "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/1.webp",
    target: "men",
  },
  {
    id: 2,
    title: "Anime Drops Are Here",
    subtitle: "For the Otaku in You",
    cta: "Shop Women",
    bg: "linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)",
    tag: "Anime",
    image: "https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp",
    target: "women",
  },
  {
    id: 3,
    title: "Harry Potter x TSS",
    subtitle: "Magical Merchandise",
    cta: "Shop Sneakers",
    bg: "linear-gradient(135deg, #7b2d8b 0%, #4a1060 100%)",
    tag: "Harry Potter",
    image: "https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp",
    target: "sneakers",
  },
];

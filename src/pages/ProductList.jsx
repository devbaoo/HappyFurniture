import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";

// Category data
const categories = [
  { id: "sofas", label: "SOFAS" },
  { id: "sectionals", label: "SECTIONALS" },
  { id: "accent-chair", label: "ACCENT CHAIR" },
  { id: "dining-ancient-chair-sets", label: "DINING & ANCIENT CHAIR SETS" },
  { id: "coffee-tables", label: "COFFEE TABLES" },
  { id: "side-tables", label: "SIDE TABLES" },
  { id: "misc", label: "MISC" },
];

const filters = ["Filter", "Sofa", "More", "Width", "Material", "Cushion"];

const products = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: "Tocca Taupe Sheepskin Upholstered Bench a.k.a (60'-67')",
  price: "1000$",
  oldPrice: "1200$",
  colors: 5,
}));

const recentProducts = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 100),
  name: "Tocca Taupe Sheepskin Upholstered Corduroy Bench (60'-67')",
  price: "1000$",
  oldPrice: "1200$",
  colors: 5,
}));

const ProductList = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  // First page shows maximum possible items (up to 6), remaining items go to next page
  const maxItemsFirstPage = 6; // Maximum items that can fit on first page
  const firstPageItems = Math.min(categories.length, maxItemsFirstPage);
  const remainingItems = Math.max(0, categories.length - maxItemsFirstPage);
  const totalPages = remainingItems > 0 ? 2 : 1;

  const handlePageChange = (newPage) => {
    if (newPage === currentPage || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 200);
  };

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-[#888] overflow-hidden">
        <div className="absolute inset-0 bg-[#888]" />
        <Container className="relative py-16">
          <h1 className="font-heading text-4xl font-light uppercase tracking-widest text-white">
            Living Room Furniture
          </h1>
        </Container>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="py-3 flex items-center gap-2 text-xs text-muted"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-primary">Living Room</span>
          </nav>
        </Container>
      </div>

      {/* Category Pagination */}
      <section className="border-b border-border">
        <Container>
          <div className="flex justify-center gap-3 py-6 min-h-[240px]">
            <div
              className={`flex justify-center gap-3 transition-all duration-300 ${
                isTransitioning
                  ? "opacity-0 transform scale-95"
                  : "opacity-100 transform scale-100"
              }`}
            >
              {categories
                .slice(
                  currentPage === 0 ? 0 : firstPageItems,
                  currentPage === 0 ? firstPageItems : categories.length,
                )
                .map((cat, index) => (
                  <Link
                    key={cat.id}
                    to={`/product?category=${cat.id}`}
                    className="group"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div
                      className={`w-[227px] h-[204px] bg-[#666] group-hover:bg-[#555] transition-all duration-300 flex items-end justify-center transform ${
                        isTransitioning
                          ? "translate-y-4 opacity-0"
                          : "translate-y-0 opacity-100"
                      }`}
                    >
                      <span className="text-white text-sm font-medium tracking-wider text-center leading-tight px-4 pb-4">
                        {cat.label}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center gap-1.5 pb-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                disabled={isTransitioning}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 transform hover:scale-125 ${
                  i === currentPage
                    ? "bg-primary scale-125"
                    : "bg-border hover:bg-primary/50"
                } ${isTransitioning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Filter bar */}
      <section className="border-b border-border">
        <Container>
          <div className="flex items-center gap-3 py-4">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f === activeFilter ? null : f)}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wide border transition-colors ${
                  activeFilter === f
                    ? "border-primary bg-primary text-white"
                    : "border-border text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {f}
                {f === "Filter" && (
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                    />
                  </svg>
                )}
                {f !== "Filter" && (
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </Container>
      </section>

      {/* Recently Viewed Products */}
      <section className="py-12 border-t border-border">
        <Container>
          <h3 className="font-heading text-lg uppercase tracking-widest font-light mb-8">
            Recently Viewed Products
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {recentProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductList;

import { useState, useRef } from "react";
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
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tính toán số trang (slides) dựa trên chiều rộng
  const totalSlides = 3;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Tránh lỗi chia cho 0 nếu scroll chưa sẵn sàng
      if (scrollWidth > clientWidth) {
        const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
        const newSlide = Math.round(scrollPercentage * (totalSlides - 1));
        setCurrentSlide(newSlide);
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    if (scrollRef.current) {
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(scrollRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
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

      {/* Category Scroll */}
      <section className="border-b border-border">
        <Container>
          <div className="py-6">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onScroll={handleScroll}
              className={`flex gap-3 overflow-x-auto select-none pb-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/product?category=${cat.id}`}
                  className="group shrink-0 pointer-events-auto"
                  onClick={(e) => {
                    if (isDragging) e.preventDefault(); // Prevent navigating when dragging
                  }}
                  draggable={false}
                >
                  <div className="w-[227px] h-[204px] bg-[#666] group-hover:bg-[#555] transition-all duration-300 flex items-end justify-center pointer-events-none">
                    <span className="text-white text-[10px] font-semibold tracking-wider text-center leading-tight px-2 pb-2">
                      {cat.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination dots */}
            <div className="flex justify-center gap-1.5 mt-2">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-[#444]" : "bg-[#e5e5e5]"
                    }`}
                />
              ))}
            </div>

            {/* Custom style for webkit scrollbar hiding */}
            <style dangerouslySetInnerHTML={{
              __html: `
              .cursor-grab::-webkit-scrollbar,
              .cursor-grabbing::-webkit-scrollbar {
                display: none;
              }
            `}} />
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
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wide border transition-colors ${activeFilter === f
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

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";

const API_URL =
  "https://happyfurniture-huexcrecemgaesdy.southeastasia-01.azurewebsites.net/api/Products";

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

const formatPrice = (price) =>
  price != null ? `${Number(price).toLocaleString()}$` : null;

const ProductList = () => {
  const [activeFilter, setActiveFilter] = useState(null);
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setProducts(data.items ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
      <div>
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
      <section style={{ height: "243px" }}>
        <div
          className="mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full"
          style={{ height: "268px", transform: "translate(0px, -61px)" }}
        >
          <div className="py-6" style={{ height: "321px" }}>
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onScroll={handleScroll}
              className={`flex gap-3 overflow-x-auto select-none pb-4 ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
              style={{
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                height: "234px",
              }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/product?category=${cat.id}`}
                  className="group shrink-0 pointer-events-auto"
                  onClick={(e) => {
                    if (isDragging) e.preventDefault();
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
            <div
              className="flex justify-center gap-1.5 mt-2"
              style={{ height: "6px", transform: "translate(0px, -32px)" }}
            >
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "bg-[#444]" : "bg-[#e5e5e5]"
                    }`}
                />
              ))}
            </div>

            {/* Custom style for webkit scrollbar hiding */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .cursor-grab::-webkit-scrollbar,
              .cursor-grabbing::-webkit-scrollbar {
                display: none;
              }
            `,
              }}
            />
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="border-t border-border">
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
          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square bg-[#e5e5e5] mb-3" />
                  <div className="flex gap-1 mb-2">
                    {Array.from({ length: 5 }).map((__, j) => (
                      <div key={j} className="w-3 h-3 rounded-sm bg-[#e5e5e5]" />
                    ))}
                  </div>
                  <div className="h-3 bg-[#e5e5e5] rounded mb-1 w-3/4" />
                  <div className="h-3 bg-[#e5e5e5] rounded w-1/3" />
                </div>
              ))}
            </div>
          )}
          {error && (
            <p className="text-sm text-red-500 py-4">Failed to load products: {error}</p>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard
                  key={p.id}
                  id={String(p.id)}
                  name={p.name}
                  price={formatPrice(p.price)}
                  oldPrice={formatPrice(p.oldPrice)}
                  images={p.images ?? []}
                />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Recently Viewed Products */}
      {!loading && !error && products.length > 0 && (
        <section className="py-12 border-t border-border">
          <Container>
            <h3 className="font-heading text-lg uppercase tracking-widest font-light mb-8">
              Recently Viewed Products
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {products.slice(0, 6).map((p) => (
                <ProductCard
                  key={p.id}
                  id={String(p.id)}
                  name={p.name}
                  price={formatPrice(p.price)}
                  oldPrice={formatPrice(p.oldPrice)}
                  images={p.images ?? []}
                />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
};

export default ProductList;

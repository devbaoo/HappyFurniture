import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";
import ProductGalleryMagnifier from "../components/ui/ProductGalleryMagnifier";
import { productService } from "../services/product.service";
import { useFavorites } from "../context/FavoritesContext";

/* ─── helpers ─────────────────────────────────────────────────── */
const RV_KEY = "hp_recently_viewed";
const loadRecentlyViewed = () => {
  try { return JSON.parse(localStorage.getItem(RV_KEY) || "[]"); }
  catch (e) { void e; return []; }
};

/* ─── Skeleton ────────────────────────────────────────────────── */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-surface rounded ${className}`} />
);

/* ─── Accordion row ───────────────────────────────────────────── */
const AccordionRow = ({ label, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-left hover:bg-surface/50 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-medium text-primary">{label}</span>
        <svg
          className={`w-4 h-4 text-muted transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] pb-4" : "max-h-0"}`}>
        <div className="text-sm text-secondary leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

/* ─── ProductDetail ───────────────────────────────────────────── */
const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  const [prevSlug, setPrevSlug] = useState(slug);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setProduct(null);
    setLoading(true);
    setError(null);
    setActiveImg(0);
  }

  const [recentlyViewed, setRecentlyViewed] = useState(loadRecentlyViewed);
  const { favorites, toggleFavorite } = useFavorites();

  /* ── Fetch by slug ─────────────────────────────────────────── */
  useEffect(() => {
    if (!slug) return;
    productService
      .getProductBySlug(slug)
      .then((data) => {
        setProduct(data);
        // Default to first active variant
        const firstVariant = data.variants?.find((v) => v.isActive) ?? data.variants?.[0] ?? null;
        setSelectedVariant(firstVariant);
        // Sort images: primary first
        const sorted = [...(data.images ?? [])].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
        setActiveImg(0);
        // Save to recently viewed
        try {
          const existing = JSON.parse(localStorage.getItem(RV_KEY) || "[]");
          const filtered = existing.filter((p) => p.id !== data.id);
          const entry = {
            id: data.id,
            name: data.name,
            slug: data.slug,
            images: sorted,
          };
          localStorage.setItem(RV_KEY, JSON.stringify([entry, ...filtered].slice(0, 6)));
          setRecentlyViewed(loadRecentlyViewed());
        } catch (e) { void e; }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  /* ── Derived values ────────────────────────────────────────── */
  const sortedImages = product
    ? [...(product.images ?? [])].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0))
    : [];

  const categoryName = product?.categories?.[0]?.name?.trim() ?? "Products";
  const categoryId = product?.categories?.[0]?.id ?? null;

  const productCardId = product?.slug ?? String(product?.id ?? "");
  const isFavorited =
    product && favorites.some((f) => f.id === productCardId);

  /* ── Loading skeleton ──────────────────────────────────────── */
  if (loading) {
    return (
      <div className="pt-[130px]">
        <div className="border-b border-border">
          <Container><div className="py-3 h-6"><Skeleton className="w-48 h-4" /></div></Container>
        </div>
        <section className="py-10">
          <div className="mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Skeleton className="aspect-square w-full" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-12 w-full mt-4" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  /* ── Error state ───────────────────────────────────────────── */
  if (error || !product) {
    return (
      <div className="pt-[130px] min-h-[50vh] flex flex-col items-center justify-center gap-4">
        <p className="text-sm text-red-500">{error ?? "Product not found"}</p>
        <Link to="/product" className="text-xs tracking-widest uppercase border border-border px-6 py-2 hover:border-primary hover:text-primary transition-colors">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[130px]">

      {/* ── Breadcrumb ─────────────────────────────────────────── */}
      <div className="border-b border-border bg-white">
        <Container>
          <nav aria-label="Breadcrumb" className="py-3 flex items-center gap-2 text-xs text-muted">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            {categoryId ? (
              <Link to={`/product?category=${categoryId}`} className="hover:text-primary transition-colors">
                {categoryName}
              </Link>
            ) : (
              <Link to="/product" className="hover:text-primary transition-colors">Products</Link>
            )}
            <span>/</span>
            <span className="text-primary line-clamp-1">{product.name}</span>
          </nav>
        </Container>
      </div>

      {/* ── Main layout ────────────────────────────────────────── */}
      <section className="pt-8 pb-4 bg-white">
        <div className="mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── LEFT: Gallery + hover magnifier (flyout; main image stays full column width) ─ */}
            <div className="min-w-0 overflow-visible">
              <ProductGalleryMagnifier
                images={sortedImages}
                activeIndex={activeImg}
                onActiveIndexChange={setActiveImg}
                productName={product.name}
                variants={product.variants ?? []}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
              />
            </div>

            {/* ── RIGHT: Product info ───────────────────────────── */}
            <div className="flex flex-col">

              {/* Name */}
              <h1 className="font-heading font-light text-2xl lg:text-3xl uppercase tracking-wide leading-tight mb-1">
                {product.name}
              </h1>
              <p className="mb-3 text-sm text-muted tracking-wide">
                #{product.slug || String(product.id)}
              </p>

              <button
                type="button"
                onClick={() =>
                  toggleFavorite({
                    id: productCardId,
                    name: product.name,
                    images: sortedImages,
                  })
                }
                className="mb-3 flex w-full items-center justify-center gap-2 bg-primary py-3.5 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-accent"
              >
                {isFavorited ? "Saved to favourites" : "Add your favourite"}
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill={isFavorited ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-secondary leading-relaxed mb-4">{product.description}</p>
              )}

              {/* Accordions */}
              <div className="border-t border-border">

                <AccordionRow label="1. Size" defaultOpen>
                  {(product.dimensionsHeight || product.dimensionsWidth || product.dimensionsDepth || product.weight) ? (
                    <div className="flex flex-wrap gap-x-8 gap-y-2 py-1">
                      {product.dimensionsHeight && <div><span className="text-muted">Height: </span><span className="font-medium">{product.dimensionsHeight} {product.dimensionUnit}</span></div>}
                      {product.dimensionsWidth && <div><span className="text-muted">Width: </span><span className="font-medium">{product.dimensionsWidth} {product.dimensionUnit}</span></div>}
                      {product.dimensionsDepth && <div><span className="text-muted">Depth: </span><span className="font-medium">{product.dimensionsDepth} {product.dimensionUnit}</span></div>}
                      {product.weight && <div><span className="text-muted">Weight: </span><span className="font-medium">{product.weight} kg</span></div>}
                    </div>
                  ) : (
                    <p className="py-1 text-muted/60 italic">Size information will be added soon.</p>
                  )}
                </AccordionRow>

                <AccordionRow label="2. Material">
                  {product.detail
                    ? <p className="py-1">{product.detail}</p>
                    : <p className="py-1 text-muted/60 italic">Material details will be added soon.</p>
                  }
                </AccordionRow>

                <AccordionRow label="3. Delivery &amp; Return">
                  {product.deliveryInfo
                    ? <p className="py-1">{product.deliveryInfo}</p>
                    : <p className="py-1 text-muted/60 italic">Standard delivery: 15–30 days. Returns accepted within 30 days.</p>
                  }
                </AccordionRow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recently Viewed ────────────────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section className="py-6 border-t border-border bg-white">
          <Container>
            <h3 className="font-heading text-lg uppercase tracking-widest font-medium mb-4 text-primary">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {recentlyViewed.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.slug ?? String(p.id)}
                  name={p.name}
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

export default ProductDetail;

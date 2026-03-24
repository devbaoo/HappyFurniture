import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";
import { productService } from "../services/product.service";

/* ─── helpers ─────────────────────────────────────────────────── */
const formatPrice = (v) => (v != null ? `${Number(v).toLocaleString()}$` : null);

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
  const [quantity, setQuantity] = useState(1);

  const [recentlyViewed, setRecentlyViewed] = useState(loadRecentlyViewed);

  /* ── Fetch by slug ─────────────────────────────────────────── */
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
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
            price: data.price,
            oldPrice: data.oldPrice,
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

  // Base price + variant surcharge = final price
  const basePrice = product?.price ?? 0;
  const variantExtra = selectedVariant?.price ?? 0;
  const displayPrice = formatPrice(basePrice + variantExtra);

  const originalPrice = formatPrice(product?.oldPrice);

  const categoryName = product?.categories?.[0]?.name?.trim() ?? "Products";
  const categoryId   = product?.categories?.[0]?.id ?? null;

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
      <section className="py-10 bg-white">
        <div className="mx-auto max-w-[1800px] px-8 md:px-14 lg:px-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* ── LEFT: Gallery ────────────────────────────────── */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              {sortedImages.length > 1 && (
                <div className="flex flex-col gap-2 w-20 shrink-0">
                  {sortedImages.map((img, i) => (
                    <button
                      key={img.id ?? i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      className={`w-16 h-16 shrink-0 border-2 overflow-hidden transition-all duration-200 ${
                        activeImg === i ? "border-primary" : "border-border hover:border-secondary"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={img.imageUrl} alt={img.altText || product.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main image */}
              <div className="flex-1">
                <div className="aspect-square bg-surface overflow-hidden relative">
                  {sortedImages[activeImg] ? (
                    <img
                      src={sortedImages[activeImg].imageUrl}
                      alt={sortedImages[activeImg].altText || product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface" />
                  )}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Product info ───────────────────────────── */}
            <div className="flex flex-col">

              {/* Name */}
              <h1 className="font-heading font-light text-2xl lg:text-3xl uppercase tracking-wide leading-tight mb-2">
                {product.name}
              </h1>

              {/* Stars + Reviews + Add Your Favourite */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {/* 5 stars — placeholder rating (no rating API yet) */}
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <svg key={s} className={`w-4 h-4 ${s <= 3 ? "text-primary" : "text-stone-200"}`} viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-muted">10 Reviews</span>
                </div>

                {/* Add Your Favourite */}
                <button
                  type="button"
                  onClick={() => {}}
                  className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
                >
                  Add Your Favourite
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                  </svg>
                </button>
              </div>

              {/* Description */}
              {product.description && (
                <p className="text-sm text-secondary leading-relaxed mb-4">{product.description}</p>
              )}

              {/* Price */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-light text-primary">{displayPrice}</span>
                  {originalPrice && originalPrice !== displayPrice && (
                    <span className="text-sm text-muted line-through">Reg: {originalPrice}</span>
                  )}
                </div>
                {/* Quantity inline — same row as price like original */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted">Quantity:</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 border border-border flex items-center justify-center hover:bg-surface transition-colors"
                    aria-label="Decrease"
                  >−</button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 border border-border flex items-center justify-center hover:bg-surface transition-colors"
                    aria-label="Increase"
                  >+</button>
                </div>
              </div>

              {/* Add to Basket */}
              <button
                type="button"
                className="w-full bg-primary text-white text-xs tracking-widest uppercase py-3.5 hover:bg-accent transition-colors mb-6"
              >
                Add to Basket
              </button>

              {/* Accordions */}
              <div className="border-t border-border">

                {/* Size */}
                {(product.dimensionsHeight || product.dimensionsWidth || product.dimensionsDepth) && (
                  <AccordionRow label="1. Size" defaultOpen>
                    <div className="flex gap-8 py-1">
                      {product.dimensionsHeight && <div><span className="text-muted">Height: </span><span className="font-medium">{product.dimensionsHeight} {product.dimensionUnit}</span></div>}
                      {product.dimensionsWidth  && <div><span className="text-muted">Width: </span><span className="font-medium">{product.dimensionsWidth} {product.dimensionUnit}</span></div>}
                      {product.dimensionsDepth  && <div><span className="text-muted">Depth: </span><span className="font-medium">{product.dimensionsDepth} {product.dimensionUnit}</span></div>}
                      {product.weight           && <div><span className="text-muted">Weight: </span><span className="font-medium">{product.weight} kg</span></div>}
                    </div>
                  </AccordionRow>
                )}

                {/* Colour / Finish — always show accordion; swatches from variants */}
                <AccordionRow label="2. Colour / Finish" defaultOpen>
                  {product.variants && product.variants.length > 0 ? (
                    <div className="py-1">
                      <div className="grid grid-cols-4 gap-3 max-w-xs mb-2">
                        {product.variants.filter((v) => v.isActive).map((v) => (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            title={v.colorName}
                            className={`aspect-square border-2 transition-colors ${
                              selectedVariant?.id === v.id ? "border-primary" : "border-border hover:border-secondary"
                            }`}
                            style={{ backgroundColor: `#${v.colorCode}` }}
                            aria-label={v.colorName}
                          />
                        ))}
                      </div>
                      {selectedVariant && (
                        <p className="text-xs text-secondary capitalize">{selectedVariant.colorName}</p>
                      )}
                    </div>
                  ) : (
                    <p className="py-1 text-xs text-muted/60 italic">Colour options coming soon.</p>
                  )}
                </AccordionRow>

                {/* Dimensions & Detail */}
                <AccordionRow label="3. Dimensions &amp; Detail">
                  {product.detail
                    ? <p className="py-1">{product.detail}</p>
                    : <p className="py-1 text-muted/60 italic">Details will be added soon.</p>
                  }
                </AccordionRow>

                {/* Delivery */}
                <AccordionRow label="4. Delivery &amp; Return">
                  {product.deliveryInfo
                    ? <p className="py-1">{product.deliveryInfo}</p>
                    : <p className="py-1 text-muted/60 italic">Standard delivery: 15–30 days. Returns accepted within 30 days.</p>
                  }
                </AccordionRow>

                {/* Reviews */}
                <AccordionRow label="5. Reviews">
                  <div className="py-1">
                    <h4 className="font-medium text-primary text-base mb-2">{product.name}</h4>
                    <p className="text-sm text-muted">Be the first to share your experience with this product. Your review helps other customers make informed decisions.</p>
                  </div>
                </AccordionRow>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recently Viewed ────────────────────────────────────── */}
      {recentlyViewed.length > 0 && (
        <section className="py-12 border-t border-border bg-white">
          <Container>
            <h3 className="font-heading text-lg uppercase tracking-widest font-light mb-8 text-primary">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.slug ?? String(p.id)}
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

export default ProductDetail;

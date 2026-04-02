import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ui/ProductCard";
import ProductGalleryMagnifier from "../components/ui/ProductGalleryMagnifier";
import { productService } from "../services/product.service";
import { useFavorites } from "../context/FavoritesContext";
import SEOHead from "../components/SEOHead";

const RV_KEY = "hp_recently_viewed";

const loadRecentlyViewed = () => {
  try {
    return JSON.parse(localStorage.getItem(RV_KEY) || "[]");
  } catch (e) {
    void e;
    return [];
  }
};

const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded bg-surface ${className}`} />
);

const formatMeasurement = (value, unit = "cm") => {
  if (value == null || Number.isNaN(Number(value))) return null;

  const numeric = Number(value);
  const normalizedUnit = String(unit).toLowerCase();
  const metric = Number.isInteger(numeric)
    ? numeric.toString()
    : numeric.toFixed(2).replace(/\.?0+$/, "");
  const unitToCm = {
    cm: 1,
    m: 100,
    mm: 0.1,
  };
  const valueInCm = unitToCm[normalizedUnit]
    ? numeric * unitToCm[normalizedUnit]
    : null;
  const inches = valueInCm != null ? valueInCm / 2.54 : null;
  const imperialValue =
    inches == null
      ? null
      : Number.isInteger(inches)
        ? inches.toString()
        : inches.toFixed(2).replace(/\.?0+$/, "");
  return {
    primary: `${metric} ${unit}`,
    secondary: imperialValue ? `${imperialValue} inch` : null,
  };
};

const MeasurementGrid = ({ items = [] }) => (
  <div className="grid grid-cols-3 gap-3 sm:gap-4">
    {items.map((item) => (
      <div
        key={item.label}
        className="grid min-w-0 grid-cols-[auto_1fr] pb-2 sm:grid-cols-[58px_1fr]"
      >
        <span className="text-[12px] text-stone-700 sm:text-[14px]">
          {item.label}
        </span>
        <span className="min-w-0 text-[14px] font-normal leading-[1.25] text-stone-900 sm:text-[17px]">
          {item.value.primary}
        </span>
        {item.value.secondary && (
          <span className="col-start-2 mt-0.5 text-[11px] leading-[1.2] text-stone-400 sm:mt-1 sm:text-[12px]">
            {item.value.secondary}
          </span>
        )}
      </div>
    ))}
  </div>
);

const DetailSection = ({ title, children, first = false, className = "" }) => (
  <div
    className={`${first ? "" : "border-t border-stone-200"} pt-4 ${className}`}
  >
    <h3 className="mb-2 font-sans text-[15px] font-semibold uppercase tracking-[0.12em] text-[#3c4a28]">
      {title}
    </h3>
    <div className="text-[15px] leading-[1.4] text-stone-700">{children}</div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [prevSlug, setPrevSlug] = useState(slug);
  const [recentlyViewed, setRecentlyViewed] = useState(loadRecentlyViewed);

  const { favorites, toggleFavorite } = useFavorites();

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setProduct(null);
    setLoading(true);
    setError(null);
    setActiveImg(0);
  }

  useEffect(() => {
    if (!slug) return;

    productService
      .getProductBySlug(slug)
      .then((data) => {
        setProduct(data);
        const firstVariant =
          data.variants?.find((v) => v.isActive) ?? data.variants?.[0] ?? null;
        setSelectedVariant(firstVariant);

        const sorted = [...(data.images ?? [])].sort(
          (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0),
        );

        setActiveImg(0);

        try {
          const existing = JSON.parse(localStorage.getItem(RV_KEY) || "[]");
          const filtered = existing.filter((p) => p.id !== data.id);
          const entry = {
            id: data.id,
            name: data.name,
            slug: data.slug,
            images: sorted,
          };

          localStorage.setItem(
            RV_KEY,
            JSON.stringify([entry, ...filtered].slice(0, 6)),
          );
          setRecentlyViewed(loadRecentlyViewed());
        } catch (e) {
          void e;
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [slug]);

  const sortedImages = product
    ? [...(product.images ?? [])].sort(
        (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0),
      )
    : [];

  const categoryName = product?.categories?.[0]?.name?.trim() ?? "Products";
  const categoryId = product?.categories?.[0]?.id ?? null;
  const measurementUnit = product?.dimensionUnit || "cm";
  const productMeasurements = [
    {
      label: "Height:",
      value: formatMeasurement(product?.dimensionsHeight, measurementUnit),
    },
    {
      label: "Width:",
      value: formatMeasurement(product?.dimensionsWidth, measurementUnit),
    },
    {
      label: "Depth:",
      value: formatMeasurement(product?.dimensionsDepth, measurementUnit),
    },
  ].filter((item) => item.value);
  const cartonMeasurements = [
    {
      label: "Height:",
      value: formatMeasurement(product?.deliveryHeight, measurementUnit),
    },
    {
      label: "Width:",
      value: formatMeasurement(product?.deliveryWidth, measurementUnit),
    },
    {
      label: "Depth:",
      value: formatMeasurement(product?.deliveryDepth, measurementUnit),
    },
  ].filter((item) => item.value);
  const materialNames = (product?.materials ?? [])
    .map((material) => material.name?.trim())
    .filter(Boolean);
  const productMaterialsText =
    materialNames.length > 0 ? materialNames.join(", ") : "";
  const productCardId = product?.slug ?? String(product?.id ?? "");
  const isFavorited = product && favorites.some((f) => f.id === productCardId);

  if (loading) {
    return (
      <div className="pt-[130px]">
        <div className="border-b border-border">
          <div className="mx-auto w-full max-w-[1800px] px-3 md:px-14 lg:px-24">
            <div className="h-6 py-3">
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
        <section className="py-10">
          <div className="mx-auto w-full max-w-[1800px] px-3 md:px-14 lg:px-24">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
              <Skeleton className="aspect-square w-full" />
              <div className="flex flex-col gap-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="mt-4 h-12 w-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 pt-[130px]">
        <p className="text-sm text-red-500">{error ?? "Product not found"}</p>
        <Link
          to="/product"
          className="border border-border px-6 py-2 text-xs uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[130px]">
      <SEOHead
        title={product.name}
        description={
          product.description
            ? product.description.slice(0, 155)
            : `${product.name} — Premium handcrafted luxury furniture by Happy Furniture.`
        }
        canonical={`/product/${product.slug}`}
        ogImage={sortedImages[0]?.imageUrl}
        ogType="product"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description:
            product.description ||
            `${product.name} — Premium luxury furniture by Happy Furniture.`,
          image: sortedImages[0]?.imageUrl,
          brand: { "@type": "Brand", name: "Happy Furniture" },
          category: categoryName,
          url: `http://happyfurniturenvn.com/product/${product.slug}`,
        }}
      />
      <div className="border-b border-border bg-white">
        <div className="mx-auto w-full max-w-[1800px] px-3 md:px-14 lg:px-24">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 py-3 text-left text-xs tracking-[0.08em] text-muted"
          >
            <Link to="/" className="transition-colors hover:text-primary">
              Home
            </Link>
            <span>/</span>
            {categoryId ? (
              <Link
                to={`/product?category=${categoryId}`}
                className="transition-colors hover:text-primary"
              >
                {categoryName}
              </Link>
            ) : (
              <Link
                to="/product"
                className="transition-colors hover:text-primary"
              >
                Products
              </Link>
            )}
            <span>/</span>
            <span className="line-clamp-1 text-primary">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="bg-white pb-4 pt-6 lg:pt-8">
        <div className="mx-auto w-full max-w-[1800px] px-3 md:px-14 lg:px-24">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12">
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

            <div className="flex flex-col items-stretch text-left">
              <h1 className="mb-1 font-heading text-2xl font-normal uppercase leading-[1.08] tracking-[0.07em] lg:text-3xl">
                {product.name}
              </h1>
              <p className="mb-3 text-sm uppercase tracking-[0.1em] text-muted">
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
                className="mb-3 flex w-full items-center justify-center gap-2 bg-[#3c4a28] py-3.5 text-sm font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#4a5a34]"
              >
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
                    d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
                  />
                </svg>
                {isFavorited ? "Saved to Quote List" : "Add to Quote List"}
              </button>

              {product.description && (
                <p className="mb-4 text-sm leading-[1.8] tracking-[0.01em] text-secondary">
                  {product.description}
                </p>
              )}

              <div className="mt-1 border-t border-stone-300 pt-3">
                <section>
                  <h2 className="mb-2 font-sans text-[18px] font-semibold text-stone-800">
                    1. Product Information
                  </h2>

                  <DetailSection title="Product Dimensions:" first className="pt-4">
                    {productMeasurements.length > 0 ? (
                      <MeasurementGrid items={productMeasurements} />
                    ) : (
                      <p className="text-stone-400">
                        Size information will be added soon.
                      </p>
                    )}
                  </DetailSection>

                  <DetailSection title="Product Materials">
                    {productMaterialsText || product.detail ? (
                      <div className="space-y-1">
                        {productMaterialsText && <p>{productMaterialsText}</p>}
                        {product.detail && <p>{product.detail}</p>}
                      </div>
                    ) : (
                      <p className="text-stone-400">
                        Material information will be added soon.
                      </p>
                    )}
                  </DetailSection>

                  <DetailSection title="ASSEMBLY">
                    <p>
                      {product.description ||
                        product.detail ||
                        "Assembly information will be added soon."}
                    </p>
                  </DetailSection>
                </section>

                <section className="mt-4 border-t border-stone-300 pt-4">
                  <h2 className="mb-2 font-sans text-[18px] font-semibold text-stone-800">
                    2. Packaging Information
                  </h2>

                  <DetailSection title="Packaging Standard" first className="pt-4">
                    <p>
                      {product.deliveryInfo ||
                        "Packaging information will be added soon."}
                    </p>
                  </DetailSection>

                  <DetailSection title="Carton Size">
                    {cartonMeasurements.length > 0 ? (
                      <MeasurementGrid items={cartonMeasurements} />
                    ) : (
                      <p className="text-stone-400">
                        Carton size will be added soon.
                      </p>
                    )}
                  </DetailSection>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="border-t border-border bg-white py-6">
          <div className="mx-auto w-full max-w-[1800px] px-3 md:px-14 lg:px-24">
            <h3 className="mb-4 font-heading text-lg font-normal uppercase leading-[1.08] tracking-[0.08em] text-primary">
              Recently Viewed
            </h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
              {recentlyViewed.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.slug ?? String(p.id)}
                  name={p.name}
                  images={p.images ?? []}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;

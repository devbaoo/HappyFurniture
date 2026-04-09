import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER_COUNT = 5;
const MOBILE_THUMB_COUNT = 3;

const ProductCard = ({
  id = "1",
  name = "Bocce Taupe Sheepskin Upholstered Bench",
  images = [],
  className = "",
  isFavorited = false,
  onToggleFavorite = null,
}) => {
  const sortedImages = useMemo(() => {
    if (!images?.length) return [];
    return [...images].sort(
      (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0),
    );
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  const resetKey = `${id}:${sortedImages.length}`;
  const [prevResetKey, setPrevResetKey] = useState(resetKey);
  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setActiveIndex(0);
    setImgError(false);
  }

  const currentImage = sortedImages[activeIndex] ?? sortedImages[0] ?? null;
  const n = sortedImages.length;
  const canNavigate = n > 1;

  const go = (e, delta) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canNavigate) return;
    setActiveIndex((i) => (i + delta + n) % n);
  };

  const swatches =
    sortedImages.length > 0
      ? sortedImages.slice(0, PLACEHOLDER_COUNT)
      : Array.from({ length: PLACEHOLDER_COUNT });
  const mobileSwatches =
    sortedImages.length > 0
      ? sortedImages.slice(0, MOBILE_THUMB_COUNT)
      : Array.from({ length: MOBILE_THUMB_COUNT });
  const mobileExtraCount = Math.max(
    0,
    sortedImages.length - MOBILE_THUMB_COUNT,
  );

  return (
    <Link
      to={`/product/${id}`}
      className={`group block ${className}`}
      aria-label={name}
    >
      {/* Main image */}
      <div className="group/image relative overflow-hidden bg-[#666] aspect-square mb-1.5">
        {currentImage && !imgError ? (
          <img
            src={currentImage.imageUrl}
            alt={currentImage.altText || name}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[#555]" />
        )}

        {canNavigate && (
          <>
            <button
              type="button"
              onClick={(e) => go(e, -1)}
              className="absolute left-0 top-1/2 z-20 flex h-8 w-6 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-200 group-hover/image:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft
                className="h-5 w-5 text-[#3c4a28] drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
                strokeWidth={2.5}
              />
            </button>
            <button
              type="button"
              onClick={(e) => go(e, 1)}
              className="absolute right-0 top-1/2 z-20 flex h-8 w-6 -translate-y-1/2 items-center justify-center opacity-0 transition-opacity duration-200 group-hover/image:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight
                className="h-5 w-5 text-[#3c4a28] drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
                strokeWidth={2.5}
              />
            </button>
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex gap-0.5 px-1.5 pb-1.5"
              aria-hidden
            >
              {sortedImages.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    i === activeIndex ? "bg-stone-800" : "bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite?.({ id, name, images });
          }}
          className={`absolute top-2 right-2 z-20 flex h-[34px] w-[34px] items-center justify-center rounded-full shadow-md transition-all duration-200 md:opacity-0 md:group-hover:opacity-100 ${
            isFavorited
              ? "bg-[#3c4a28] opacity-100"
              : "bg-[#3c4a28]/80 opacity-100 hover:bg-[#3c4a28]"
          }`}
          aria-label={
            isFavorited ? "Remove from Quote List" : "Add to Quote List"
          }
        >
          <svg
            className="h-[18px] w-[18px] text-white transition-colors duration-200"
            viewBox="0 0 24 24"
            fill={isFavorited ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
            />
          </svg>
        </button>
      </div>

      {/* Image swatches — mobile: 3 items, desktop: keep existing layout */}
      <div className="mb-2 grid w-full grid-cols-3 gap-1.5 sm:hidden">
        {mobileSwatches.map((img, i) =>
          img ? (
            <button
              key={img.id ?? i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImgError(false);
                setActiveIndex(i);
              }}
              className={`group/thumb relative aspect-square w-full overflow-hidden rounded-sm border border-transparent bg-white p-[1px] transition-all duration-300 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ${
                i === activeIndex
                  ? "shadow-none"
                  : "opacity-[0.42] hover:opacity-[0.72]"
              }`}
              aria-label={`Image ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <img
                src={img.imageUrl}
                alt=""
                className={`h-full w-full rounded-[2px] object-cover transition-[filter,transform] duration-300 ${
                  i === activeIndex
                    ? "scale-100 blur-0"
                    : "scale-[0.98] blur-[0.85px]"
                }`}
              />
              {i === MOBILE_THUMB_COUNT - 1 && mobileExtraCount > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <span className="text-[14px] font-bold tracking-[0.02em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]">
                    +{mobileExtraCount}
                  </span>
                </div>
              )}
            </button>
          ) : (
            <div
              key={i}
              className="aspect-square w-full rounded-sm border border-transparent bg-primary/20"
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ),
        )}
      </div>

      <div className="hidden gap-1.5 mb-2 sm:flex">
        {swatches.map((img, i) =>
          img ? (
            <button
              key={img.id ?? i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setImgError(false);
                setActiveIndex(i);
              }}
              className={`group/thumb relative h-8 w-8 shrink-0 overflow-hidden rounded-sm border border-transparent bg-white p-[1px] transition-all duration-300 outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 sm:h-[40px] sm:w-[40px] ${
                i === activeIndex
                  ? "shadow-none"
                  : "opacity-[0.42] hover:opacity-[0.72]"
              }`}
              aria-label={`Image ${i + 1}`}
              aria-current={i === activeIndex ? "true" : undefined}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <img
                src={img.imageUrl}
                alt=""
                className={`h-full w-full rounded-[2px] object-cover transition-[filter,transform] duration-300 ${
                  i === activeIndex
                    ? "scale-100 blur-0"
                    : "scale-[0.98] blur-[0.85px]"
                }`}
              />
            </button>
          ) : (
            <div
              key={i}
              className="h-8 w-8 shrink-0 rounded-sm border border-transparent bg-primary/20 sm:h-[40px] sm:w-[40px]"
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ),
        )}
      </div>

      {/* Name */}
      <p className="mb-1.5 line-clamp-2 text-[15px] font-medium leading-snug text-stone-900 sm:text-[17px]">
        {name}
      </p>
    </Link>
  );
};

export default ProductCard;

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Background scale in zoom pane (% of panel size). Higher = more magnification. */
const ZOOM_BG_SIZE_PCT = 260;
/** Lens size relative to main image container. */
const LENS_PCT = 34;

/**
 * Thumbnails + main image with hover magnifier + zoom result panel (desktop).
 * Mobile keeps the same structure: thumbnails left, main right; swatches below the image row.
 */
const ProductGalleryMagnifier = ({
  images = [],
  activeIndex,
  onActiveIndexChange,
  productName = "",
  variants = [],
  selectedVariant = null,
  onSelectVariant = null,
}) => {
  const containerRef = useRef(null);
  const [zoomActive, setZoomActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const sorted = images;
  const n = sorted.length;
  const current = sorted[activeIndex];
  const url = current?.imageUrl ?? null;
  const canNavigate = n > 1;
  const activeVariants = variants?.filter((v) => v.isActive) ?? [];
  const showColorBar =
    activeVariants.length > 0 && typeof onSelectVariant === "function";

  const swatchBg = (v) => {
    const c = v?.colorCode;
    if (!c) return "#888";
    return String(c).startsWith("#") ? c : `#${c}`;
  };

  const handleMove = useCallback(
    (e) => {
      const el = containerRef.current;
      if (!el || !url) return;
      const rect = el.getBoundingClientRect();
      const w = rect.width || 1;
      const h = rect.height || 1;
      const x = ((e.clientX - rect.left) / w) * 100;
      const y = ((e.clientY - rect.top) / h) * 100;
      setPos({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    },
    [url],
  );

  const handleEnter = useCallback(() => {
    if (url) setZoomActive(true);
  }, [url]);

  const handleLeave = useCallback(() => {
    setZoomActive(false);
  }, []);

  const go = (delta) => {
    if (!canNavigate) return;
    onActiveIndexChange((i) => (i + delta + n) % n);
  };

  return (
    <div className="flex min-w-0 flex-row gap-1.5 overflow-visible lg:gap-4">
      {canNavigate && (
        <div className="flex w-14 shrink-0 flex-col gap-1.5 lg:w-20 lg:gap-3">
          {sorted.map((img, i) => {
            const isActive = activeIndex === i;
            return (
              <div key={img.id ?? i} className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => onActiveIndexChange(i)}
                  className={`h-14 w-14 shrink-0 overflow-hidden border-2 transition-all duration-300 lg:h-16 lg:w-16 ${
                    isActive
                      ? "border-stone-900 opacity-100"
                      : "border-border opacity-[0.38] hover:border-stone-400 hover:opacity-[0.72]"
                  }`}
                  aria-label={`View image ${i + 1}`}
                  aria-current={isActive ? "true" : undefined}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.altText || productName}
                    className={`h-full w-full object-cover transition-[filter] duration-300 ${
                      isActive ? "" : "blur-[0.85px]"
                    }`}
                  />
                </button>
                <div
                  aria-hidden
                  className={`h-[3px] w-full shrink-0 transition-colors duration-300 ${
                    isActive ? "bg-stone-900" : "bg-transparent"
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="relative flex min-w-0 flex-1 flex-col overflow-visible">
        <div className="relative w-full">
          <div
            ref={containerRef}
            className="group/main relative aspect-square w-full cursor-default overflow-hidden bg-surface lg:cursor-crosshair"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onMouseMove={handleMove}
          >
            {current ? (
              <img
                src={current.imageUrl}
                alt={current.altText || productName}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-surface" />
            )}

            {zoomActive && url && (
              <div
                className="pointer-events-none absolute z-[8] hidden border border-white/70 bg-white/25 shadow-sm backdrop-blur-[0.5px] lg:block"
                style={{
                  width: `${LENS_PCT}%`,
                  height: `${LENS_PCT}%`,
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-hidden
              />
            )}

            {canNavigate && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-0 top-1/2 z-10 hidden h-7 w-[15px] -translate-y-1/2 items-center justify-center bg-white shadow-sm transition-opacity duration-200 hover:bg-stone-50 lg:flex lg:opacity-0 lg:group-hover/main:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft
                    className="h-3 w-3 text-stone-900"
                    strokeWidth={1}
                  />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-0 top-1/2 z-10 hidden h-7 w-[15px] -translate-y-1/2 items-center justify-center bg-white shadow-sm transition-opacity duration-200 hover:bg-stone-50 lg:flex lg:opacity-0 lg:group-hover/main:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight
                    className="h-3 w-3 text-stone-900"
                    strokeWidth={1}
                  />
                </button>
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 z-[5] flex gap-0.5 px-1.5 pb-1.5"
                  aria-hidden
                >
                  {sorted.map((_, i) => (
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
          </div>

          {zoomActive && url && (
            <div
              className="pointer-events-none absolute left-full top-0 z-20 ml-3 hidden overflow-hidden border border-border bg-white shadow-md lg:block"
              style={{
                height: "min(100%, 420px)",
                width: "min(100%, 420px)",
              }}
              aria-hidden
            >
              <div
                className="h-full w-full bg-no-repeat"
                style={{
                  backgroundImage: `url(${JSON.stringify(url)})`,
                  backgroundSize: `${ZOOM_BG_SIZE_PCT}%`,
                  backgroundPosition: `${pos.x}% ${pos.y}%`,
                }}
              />
            </div>
          )}
        </div>

        {showColorBar && (
          <div
            className={`w-full border-t-2 border-[#3c4a28] pt-3 mt-3 lg:mt-4 ${
              canNavigate
                ? "max-lg:-ml-[calc(3.5rem+0.375rem)] max-lg:w-[calc(100%+3.5rem+0.375rem)]"
                : ""
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              {activeVariants.map((v) => {
                const selected = selectedVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    title={v.colorName}
                    aria-label={v.colorName}
                    onClick={() => onSelectVariant(v)}
                    className={`h-3 min-w-[5rem] shrink-0 rounded-sm border-2 shadow-sm transition-all sm:h-4 sm:min-w-[6.5rem] ${
                      selected
                        ? "border-primary ring-1 ring-primary ring-offset-1"
                        : "border-border hover:border-secondary"
                    }`}
                    style={{ backgroundColor: swatchBg(v) }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGalleryMagnifier;

import { useState, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Background scale in zoom pane (% of panel size). Higher = more magnification. */
const ZOOM_BG_SIZE_PCT = 260;
/** Lens size relative to main image container. */
const LENS_PCT = 34;

/**
 * Thumbnails + main image with hover magnifier + zoom result panel (desktop).
 */
const ProductGalleryMagnifier = ({
  images = [],
  activeIndex,
  onActiveIndexChange,
  productName = "",
}) => {
  const containerRef = useRef(null);
  const [zoomActive, setZoomActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const sorted = images;
  const n = sorted.length;
  const current = sorted[activeIndex];
  const url = current?.imageUrl ?? null;
  const canNavigate = n > 1;

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
    [url]
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
    <div className="flex min-w-0 gap-4 overflow-visible">
      {canNavigate && (
        <div className="flex w-20 shrink-0 flex-col gap-2">
          {sorted.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => onActiveIndexChange(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden border-2 transition-all duration-200 ${
                activeIndex === i
                  ? "border-primary"
                  : "border-border hover:border-secondary"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={img.imageUrl}
                alt={img.altText || productName}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main image uses full gallery column width again; zoom panel is flyout (absolute) */}
      <div className="relative min-w-0 flex-1 overflow-visible">
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
              className="pointer-events-none absolute z-[8] border border-white/70 bg-white/25 shadow-sm backdrop-blur-[0.5px]"
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
                className="absolute left-0 top-1/2 z-10 flex h-7 w-[15px] -translate-y-1/2 items-center justify-center bg-white opacity-0 shadow-sm transition-opacity duration-200 group-hover/main:opacity-100 hover:bg-stone-50"
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
                className="absolute right-0 top-1/2 z-10 flex h-7 w-[15px] -translate-y-1/2 items-center justify-center bg-white opacity-0 shadow-sm transition-opacity duration-200 group-hover/main:opacity-100 hover:bg-stone-50"
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

        {/* Zoom result: chỉ hiện khi hover ảnh chính (desktop) */}
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
    </div>
  );
};

export default ProductGalleryMagnifier;

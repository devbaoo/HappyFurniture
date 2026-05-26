import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Background scale in zoom pane (% of panel size). Higher = more magnification. */
const ZOOM_BG_SIZE_PCT = 260;
/** Lens size relative to main image container. */
const LENS_PCT = 34;
/** Additional zoom level when the lightbox image is clicked. */
const LIGHTBOX_ZOOM_SCALE = 2;
const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

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
  isVietnamese = false,
  onSelectVariant = null,
}) => {
  const containerRef = useRef(null);
  const lightboxImageRef = useRef(null);
  const dragStateRef = useRef({
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    moved: false,
  });
  const [zoomActive, setZoomActive] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxZoomed, setLightboxZoomed] = useState(false);
  const [lightboxOffset, setLightboxOffset] = useState({ x: 0, y: 0 });
  const [isDraggingLightbox, setIsDraggingLightbox] = useState(false);
  const [isDesktopViewport, setIsDesktopViewport] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(DESKTOP_MEDIA_QUERY).matches;
  });

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

  const variantThumb = (v) => {
    const src = v?.imageUrl?.trim?.();
    return src || null;
  };
  const variantLabel = (v) =>
    (isVietnamese ? v?.colorName : v?.colorNameEn || v?.colorName || "").trim();

  const clampLightboxOffset = useCallback(
    (x, y) => {
      const img = lightboxImageRef.current;

      if (!img || !lightboxZoomed) {
        return { x: 0, y: 0 };
      }

      const maxX = Math.max(
        0,
        (img.offsetWidth * (LIGHTBOX_ZOOM_SCALE - 1)) / 2,
      );
      const maxY = Math.max(
        0,
        (img.offsetHeight * (LIGHTBOX_ZOOM_SCALE - 1)) / 2,
      );

      return {
        x: Math.max(-maxX, Math.min(maxX, x)),
        y: Math.max(-maxY, Math.min(maxY, y)),
      };
    },
    [lightboxZoomed],
  );

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

  const openLightbox = () => {
    if (current) {
      setLightboxZoomed(false);
      setLightboxOffset({ x: 0, y: 0 });
      setIsDraggingLightbox(false);
      setLightboxOpen(true);
    }
  };

  const closeLightbox = () => {
    setLightboxZoomed(false);
    setLightboxOffset({ x: 0, y: 0 });
    setIsDraggingLightbox(false);
    setLightboxOpen(false);
  };

  const go = (delta) => {
    if (!canNavigate) return;
    setLightboxZoomed(false);
    setLightboxOffset({ x: 0, y: 0 });
    setIsDraggingLightbox(false);
    onActiveIndexChange((i) => (i + delta + n) % n);
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY);
    const handleChange = (event) => {
      setIsDesktopViewport(event.matches);
      if (!event.matches) {
        setLightboxZoomed(false);
        setLightboxOffset({ x: 0, y: 0 });
        setIsDraggingLightbox(false);
      }
    };

    setIsDesktopViewport(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setLightboxZoomed(false);
        setLightboxOffset({ x: 0, y: 0 });
        setLightboxOpen(false);
        return;
      }

      if (!canNavigate) return;

      if (event.key === "ArrowLeft") {
        setLightboxZoomed(false);
        onActiveIndexChange((i) => (i - 1 + n) % n);
      }

      if (event.key === "ArrowRight") {
        setLightboxZoomed(false);
        onActiveIndexChange((i) => (i + 1) % n);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [canNavigate, lightboxOpen, n, onActiveIndexChange]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleResize = () => {
      setLightboxOffset((prev) => clampLightboxOffset(prev.x, prev.y));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [clampLightboxOffset, lightboxOpen]);

  const handleLightboxPointerDown = (event) => {
    if (!isDesktopViewport || !lightboxZoomed) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: lightboxOffset.x,
      originY: lightboxOffset.y,
      moved: false,
    };
    setIsDraggingLightbox(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleLightboxPointerMove = (event) => {
    if (
      !isDesktopViewport ||
      !lightboxZoomed ||
      !isDraggingLightbox ||
      dragStateRef.current.pointerId !== event.pointerId
    ) {
      return;
    }

    const nextX =
      dragStateRef.current.originX +
      (event.clientX - dragStateRef.current.startX);
    const nextY =
      dragStateRef.current.originY +
      (event.clientY - dragStateRef.current.startY);

    if (
      !dragStateRef.current.moved &&
      (Math.abs(event.clientX - dragStateRef.current.startX) > 3 ||
        Math.abs(event.clientY - dragStateRef.current.startY) > 3)
    ) {
      dragStateRef.current.moved = true;
    }

    setLightboxOffset(clampLightboxOffset(nextX, nextY));
  };

  const handleLightboxPointerEnd = (event) => {
    if (!isDesktopViewport) return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragStateRef.current.pointerId = null;
    setIsDraggingLightbox(false);
  };

  const handleLightboxImageClick = () => {
    if (!isDesktopViewport) return;

    if (dragStateRef.current.moved) {
      dragStateRef.current.moved = false;
      return;
    }

    if (lightboxZoomed) {
      setLightboxZoomed(false);
      setLightboxOffset({ x: 0, y: 0 });
      setIsDraggingLightbox(false);
      return;
    }

    setLightboxOffset({ x: 0, y: 0 });
    setLightboxZoomed(true);
  };

  return (
    <div className="flex min-w-0 flex-row items-start gap-1 overflow-visible lg:gap-3">
      {canNavigate && (
        <div className="flex w-14 shrink-0 flex-col gap-1 lg:w-14 lg:gap-1.5 xl:w-16 xl:gap-2">
          {sorted.map((img, i) => {
            const isActive = activeIndex === i;
            return (
              <div key={img.id ?? i} className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => onActiveIndexChange(i)}
                  className={`relative block h-14 w-14 shrink-0 overflow-hidden border-2 bg-surface transition-all duration-300 lg:h-14 lg:w-14 xl:h-16 xl:w-16 ${
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
                    className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-300 ${
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
        <div className="relative w-full lg:max-w-[32rem] xl:max-w-[36rem]">
          <div
            ref={containerRef}
            className="group/main relative aspect-square w-full cursor-zoom-in overflow-hidden bg-surface lg:h-[min(52svh,30rem)] lg:w-full lg:aspect-auto lg:cursor-crosshair xl:h-[min(58svh,34rem)]"
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onMouseMove={handleMove}
            onClick={openLightbox}
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
                  onClick={(event) => {
                    event.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-0 top-1/2 z-10 hidden h-10 w-6 -translate-y-1/2 items-center justify-center transition-opacity duration-200 lg:flex lg:opacity-0 lg:group-hover/main:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft
                    className="h-6 w-6 text-[#3c4a28] drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
                    strokeWidth={2.5}
                  />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-0 top-1/2 z-10 hidden h-10 w-6 -translate-y-1/2 items-center justify-center transition-opacity duration-200 lg:flex lg:opacity-0 lg:group-hover/main:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight
                    className="h-6 w-6 text-[#3c4a28] drop-shadow-[0_1px_3px_rgba(255,255,255,0.8)]"
                    strokeWidth={2.5}
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
            className={`mt-3 w-full border-t-2 border-[#3c4a28] pt-3 lg:mt-4 ${
              canNavigate
                ? "max-lg:-ml-[calc(3.5rem+0.375rem)] max-lg:w-[calc(100%+3.5rem+0.375rem)]"
                : ""
            }`}
          >
            <div className="flex flex-wrap items-start gap-x-2 gap-y-1.5">
              {activeVariants.map((v) => {
                const selected = selectedVariant?.id === v.id;
                const thumb = variantThumb(v);
                const label = variantLabel(v);
                return (
                  <div key={v.id} className="flex min-w-[5rem] flex-col items-start gap-1 sm:min-w-[6.5rem]">
                    <button
                      type="button"
                      title={label}
                      aria-label={label}
                      onClick={() => onSelectVariant(v)}
                      className={`relative h-3 w-full shrink-0 overflow-hidden rounded-sm border-2 shadow-sm transition-all sm:h-4 ${
                        selected
                          ? "border-primary ring-1 ring-primary ring-offset-1"
                          : "border-border hover:border-secondary"
                      }`}
                      style={thumb ? undefined : { backgroundColor: swatchBg(v) }}
                    >
                      {thumb && (
                        <img
                          src={thumb}
                          alt={label}
                          className="absolute inset-0 h-full w-full object-cover"
                          draggable={false}
                        />
                      )}
                    </button>
                    {label && (
                      <p className="text-left text-[13px] uppercase leading-tight tracking-[0.06em] text-stone-700 lg:hidden">
                        {label}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {lightboxOpen && current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Image preview for ${productName}`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-[101] flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/20"
            aria-label="Close image preview"
          >
            <span className="text-2xl leading-none">&times;</span>
          </button>

          {canNavigate && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 top-1/2 z-[101] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/20 sm:left-6"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
          )}

          <div
            className="relative flex max-h-full w-full max-w-6xl items-center justify-center overflow-auto"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleLightboxImageClick}
              onPointerDown={handleLightboxPointerDown}
              onPointerMove={handleLightboxPointerMove}
              onPointerUp={handleLightboxPointerEnd}
              onPointerCancel={handleLightboxPointerEnd}
              onPointerLeave={handleLightboxPointerEnd}
              className={`flex items-center justify-center bg-transparent p-0 ${
                lightboxZoomed
                  ? isDraggingLightbox
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : isDesktopViewport
                    ? "cursor-zoom-in"
                    : "cursor-default"
              }`}
              aria-label={
                isDesktopViewport
                  ? lightboxZoomed
                    ? "Zoom out preview image"
                    : "Zoom in preview image"
                  : "Preview image"
              }
              style={{
                touchAction:
                  isDesktopViewport && lightboxZoomed ? "none" : "auto",
              }}
            >
              <img
                ref={lightboxImageRef}
                src={current.imageUrl}
                alt={current.altText || productName}
                draggable={false}
                className="max-h-[88vh] w-auto max-w-full select-none object-contain transition-transform duration-300 ease-out"
                style={{
                  transform: lightboxZoomed
                    ? `translate(${lightboxOffset.x}px, ${lightboxOffset.y}px) scale(${LIGHTBOX_ZOOM_SCALE})`
                    : "translate(0px, 0px) scale(1)",
                  transformOrigin: "center center",
                }}
              />
            </button>
            {isDesktopViewport && (
              <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.12em] text-white/90">
                {lightboxZoomed
                  ? "Drag to move - click to zoom out"
                  : "Click image to zoom in"}
              </span>
            )}
          </div>

          {canNavigate && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
              className="absolute right-3 top-1/2 z-[101] flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/20 sm:right-6"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGalleryMagnifier;

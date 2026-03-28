import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PLACEHOLDER_COUNT = 5;

const ProductCard = ({
    id = "1",       // accepts slug string or numeric id fallback
    name = "Bocce Taupe Sheepskin Upholstered Bench",
    price = "1000$",
    oldPrice = null,
    images = [],
    className = "",
}) => {
    const sortedImages = useMemo(() => {
        if (!images?.length) return [];
        return [...images].sort(
            (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0)
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

    const currentImage =
        sortedImages[activeIndex] ?? sortedImages[0] ?? null;
    const n = sortedImages.length;
    const canNavigate = n > 1;

    const go = (e, delta) => {
        e.preventDefault();
        e.stopPropagation();
        if (!canNavigate) return;
        setActiveIndex((i) => (i + delta + n) % n);
    };

    const swatches = sortedImages.length > 0
        ? sortedImages.slice(0, PLACEHOLDER_COUNT)
        : Array.from({ length: PLACEHOLDER_COUNT });

    return (
        <Link
            to={`/product/${id}`}
            className={`group block ${className}`}
            aria-label={name}
        >
            {/* Main image */}
            <div className="group/image relative overflow-hidden bg-[#666] aspect-square mb-3">
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
                            className="absolute left-0 top-1/2 z-20 flex h-7 w-[15px] -translate-y-1/2 items-center justify-center bg-white opacity-0 shadow-sm transition-opacity duration-200 group-hover/image:opacity-100 hover:bg-stone-50"
                            aria-label="Previous image"
                        >
                            <ChevronLeft
                                className="h-3 w-3 text-stone-900"
                                strokeWidth={1}
                            />
                        </button>
                        <button
                            type="button"
                            onClick={(e) => go(e, 1)}
                            className="absolute right-0 top-1/2 z-20 flex h-7 w-[15px] -translate-y-1/2 items-center justify-center bg-white opacity-0 shadow-sm transition-opacity duration-200 group-hover/image:opacity-100 hover:bg-stone-50"
                            aria-label="Next image"
                        >
                            <ChevronRight
                                className="h-3 w-3 text-stone-900"
                                strokeWidth={1}
                            />
                        </button>
                        <div
                            className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 flex gap-0.5 px-1.5 pb-1.5"
                            aria-hidden
                        >
                            {sortedImages.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-0.5 flex-1 rounded-full transition-colors ${i === activeIndex ? "bg-stone-800" : "bg-white/60"
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
                    }}
                    className="absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-label="Add to wishlist"
                >
                    <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                    </svg>
                </button>
            </div>

            {/* Image swatches — thumbnail or placeholder squares */}
            <div className="flex gap-2 mb-2.5">
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
                            className={`w-6 h-6 shrink-0 overflow-hidden rounded-sm bg-[#ccc] sm:h-[26px] sm:w-[26px] ${i === activeIndex ? "ring-2 ring-primary ring-offset-1" : ""
                                }`}
                            aria-label={`Image ${i + 1}`}
                        >
                            <img
                                src={img.imageUrl}
                                alt=""
                                className="h-full w-full object-cover"
                            />
                        </button>
                    ) : (
                        <div
                            key={i}
                            className="h-6 w-6 shrink-0 rounded-sm bg-primary sm:h-[26px] sm:w-[26px]"
                            style={{ opacity: 0.3 + i * 0.15 }}
                        />
                    )
                )}
            </div>

            {/* Name */}
            <p className="mb-1.5 line-clamp-2 text-sm font-medium leading-snug text-stone-900 sm:text-[15px]">
                {name}
            </p>

            {/* Price */}
            <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-base font-semibold tabular-nums tracking-tight text-primary sm:text-[17px]">
                    {price}
                </span>
                {oldPrice && (
                    <span className="text-xs text-muted line-through tabular-nums sm:text-sm">{oldPrice}</span>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;

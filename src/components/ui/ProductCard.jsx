import { useState } from "react";
import { Link } from "react-router-dom";

const PLACEHOLDER_COUNT = 5;

const ProductCard = ({
    id = "1",
    name = "Bocce Taupe Sheepskin Upholstered Bench",
    price = "1000$",
    oldPrice = null,
    images = [],
    className = "",
}) => {
    const primaryImage = images.find((img) => img.isPrimary) ?? images[0] ?? null;
    const [imgError, setImgError] = useState(false);

    const swatches = images.length > 0
        ? images.slice(0, PLACEHOLDER_COUNT)
        : Array.from({ length: PLACEHOLDER_COUNT });

    return (
        <Link
            to={`/product/${id}`}
            className={`group block ${className}`}
            aria-label={name}
        >
            {/* Main image */}
            <div className="relative overflow-hidden bg-[#666] aspect-square mb-3">
                {primaryImage && !imgError ? (
                    <img
                        src={primaryImage.imageUrl}
                        alt={primaryImage.altText || name}
                        onError={() => setImgError(true)}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-[#555]" />
                )}

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    aria-label="Add to wishlist"
                >
                    <svg
                        className="w-5 h-5 text-white"
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
            <div className="flex gap-1 mb-2">
                {swatches.map((img, i) =>
                    img ? (
                        <div
                            key={img.id ?? i}
                            className="w-3 h-3 rounded-sm overflow-hidden bg-[#ccc]"
                        >
                            <img
                                src={img.imageUrl}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div
                            key={i}
                            className="w-3 h-3 rounded-sm bg-primary"
                            style={{ opacity: 0.3 + i * 0.15 }}
                        />
                    )
                )}
            </div>

            {/* Name */}
            <p className="text-xs font-medium text-primary leading-snug mb-1 line-clamp-2">{name}</p>

            {/* Price */}
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-primary">{price}</span>
                {oldPrice && (
                    <span className="text-xs text-muted line-through">{oldPrice}</span>
                )}
            </div>
        </Link>
    );
};

export default ProductCard;

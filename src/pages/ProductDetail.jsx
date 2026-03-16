import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import ProductCard from "../components/ui/ProductCard";

const colorSwatches = Array.from({ length: 11 });
const thumbnails = Array.from({ length: 5 });
const recentProducts = Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 200),
    name: "Bocce Taupe Sheepskin Upholstered Bench (62'-67')",
    price: "1000$",
    oldPrice: "1200$",
    colors: 5,
}));

const ProductDetail = () => {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeThumb, setActiveThumb] = useState(0);

    return (
        <div>
            {/* Breadcrumb */}
            <div className="border-b border-border">
                <Container>
                    <nav aria-label="Breadcrumb" className="py-3 flex items-center gap-2 text-xs text-muted">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/product" className="hover:text-primary transition-colors">Living Room</Link>
                        <span>/</span>
                        <span className="text-primary">Sofas</span>
                    </nav>
                </Container>
            </div>

            {/* Main Product Layout */}
            <section className="py-10">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* LEFT — Gallery */}
                        <div className="flex gap-3">
                            {/* Thumbnails */}
                            <div className="flex flex-col gap-2">
                                {thumbnails.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setActiveThumb(i)}
                                        className={`w-14 h-14 shrink-0 bg-[#666] border-2 transition-colors ${activeThumb === i ? "border-primary" : "border-transparent"
                                            }`}
                                        aria-label={`View image ${i + 1}`}
                                    />
                                ))}
                                {/* Down chevron */}
                                <button type="button" className="flex justify-center pt-1" aria-label="More images">
                                    <svg className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </button>
                            </div>

                            {/* Main image */}
                            <div className="flex-1 bg-[#555] aspect-square" />
                        </div>

                        {/* RIGHT — Product Info */}
                        <div>
                            <h1 className="font-heading text-2xl font-light uppercase tracking-wide mb-3 leading-snug">
                                Cromwell 2 Over 3 Chest Of<br />Drawers In Pale Olive
                            </h1>

                            {/* Rating + review */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3].map((i) => (
                                        <svg key={i} className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-muted">10 Reviews</span>
                                <button type="button" className="ml-auto text-xs text-muted hover:text-primary flex items-center gap-1">
                                    Add Your Touch
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-secondary leading-relaxed mb-6">
                                Tapered legs, a signature of midcentury design, complement our chair's striking silhouette. The impeccably upholstered seat and back is supported by a wood frame, its brushed finish providing visual contrast and warmth. Plush foam cushioning provides the perfect combination of comfort and enduring support.
                            </p>

                            {/* Price + Quantity */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-heading text-3xl font-light text-primary">1000$</span>
                                    <span className="text-sm text-muted line-through">Reg:1000$</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm">
                                    <span className="text-muted text-xs">Quantity:</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-7 h-7 border border-border flex items-center justify-center text-primary hover:bg-surface"
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-7 h-7 border border-border flex items-center justify-center text-primary hover:bg-surface"
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to basket */}
                            <Button variant="primary" className="w-full mb-8 py-4" size="lg">Add to basket</Button>

                            {/* Accordions */}
                            {/* 1. Size */}
                            <Accordion title="1. Size" defaultOpen={true}>
                                <div className="flex gap-8 pt-2">
                                    <div>
                                        <span className="text-xs text-muted uppercase">Height: </span>
                                        <span className="text-xs font-medium">90 cm</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted uppercase">Width: </span>
                                        <span className="text-xs font-medium">80 cm</span>
                                    </div>
                                    <div>
                                        <span className="text-xs text-muted uppercase">Depth: </span>
                                        <span className="text-xs font-medium">48 cm</span>
                                    </div>
                                </div>
                            </Accordion>

                            {/* 2. Colour / Finish */}
                            <Accordion title="2. Colour / Finish" defaultOpen={true}>
                                <div className="grid grid-cols-5 gap-2 pt-2">
                                    {colorSwatches.map((_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setSelectedColor(i)}
                                            aria-label={`Color option ${i + 1}`}
                                            className={`aspect-square bg-[#555] border-2 transition-colors ${selectedColor === i ? "border-primary" : "border-transparent"
                                                } hover:border-primary/50`}
                                        />
                                    ))}
                                </div>
                            </Accordion>

                            {/* 3. Dimensions & Detail */}
                            <Accordion title="3. Dimensions & Detail">
                                <p>Full detailed specifications for this product including assembly instructions and material composition.</p>
                            </Accordion>

                            {/* 4. Delivery & Return */}
                            <Accordion title="4. Delivery & Return">
                                <p>Standard delivery: 15–30 days. Express delivery: 7–14 days. Returns accepted within 30 days of receipt.</p>
                            </Accordion>

                            {/* 5. Review */}
                            <Accordion title="5. Review">
                                <p>Be the first to share your experience with this product. Your review helps other customers make informed decisions.</p>
                            </Accordion>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Recently Viewed Products */}
            <section className="py-12 border-t border-border">
                <Container>
                    <h3 className="font-heading text-lg uppercase tracking-widest font-light mb-8">
                        Recently Viewed Products
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {recentProducts.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default ProductDetail;

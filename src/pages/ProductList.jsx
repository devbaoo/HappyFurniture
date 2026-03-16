import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import ProductCard from "../components/ui/ProductCard";

// Category data
const categories = [
    { id: "sofa", label: "Sofa" },
    { id: "bed", label: "Bed Room" },
    { id: "product-detail", label: "Product Detail" },
    { id: "exclusive", label: "Exclusive Product On Website" },
    { id: "coffee", label: "Coffee Table" },
    { id: "side-table", label: "Side Table" },
    { id: "misc", label: "Misc" },
];

const filters = ["Filter", "Sofa", "More", "Width", "Material", "Cushion"];

const products = Array.from({ length: 12 }, (_, i) => ({
    id: String(i + 1),
    name: "Tocca Taupe Sheepskin Upholstered Bench a.k.a (60'-67')",
    price: "1000$",
    oldPrice: "1200$",
    colors: 5,
}));

const recentProducts = Array.from({ length: 6 }, (_, i) => ({
    id: String(i + 100),
    name: "Tocca Taupe Sheepskin Upholstered Corduroy Bench (60'-67')",
    price: "1000$",
    oldPrice: "1200$",
    colors: 5,
}));

const ProductList = () => {
    const [activeFilter, setActiveFilter] = useState(null);

    return (
        <div>
            {/* Hero Banner */}
            <section className="relative bg-[#888] overflow-hidden">
                <div className="absolute inset-0 bg-[#888]" />
                <Container className="relative py-16">
                    <h1 className="font-heading text-4xl font-light uppercase tracking-widest text-white">
                        Living Room Furniture
                    </h1>
                </Container>
            </section>

            {/* Breadcrumb */}
            <div className="border-b border-border">
                <Container>
                    <nav aria-label="Breadcrumb" className="py-3 flex items-center gap-2 text-xs text-muted">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-primary">Living Room</span>
                    </nav>
                </Container>
            </div>

            {/* Category Scroll */}
            <section className="border-b border-border">
                <Container>
                    <div className="flex gap-2 py-4 overflow-x-auto scrollbar-none">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/product?category=${cat.id}`}
                                className="flex flex-col items-center gap-2 shrink-0 group"
                            >
                                <div className="w-20 h-20 bg-[#666] group-hover:bg-[#555] transition-colors" />
                                <span className="text-[10px] text-center text-secondary group-hover:text-primary tracking-wide whitespace-nowrap max-w-[80px] leading-tight">
                                    {cat.label}
                                </span>
                            </Link>
                        ))}
                    </div>
                    {/* Dots indicator */}
                    <div className="flex justify-center gap-1.5 pb-3">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-border"}`} />
                        ))}
                    </div>
                </Container>
            </section>

            {/* Filter bar */}
            <section className="border-b border-border">
                <Container>
                    <div className="flex items-center gap-3 py-4">
                        {filters.map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setActiveFilter(f === activeFilter ? null : f)}
                                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs tracking-wide border transition-colors ${activeFilter === f
                                        ? "border-primary bg-primary text-white"
                                        : "border-border text-secondary hover:border-primary hover:text-primary"
                                    }`}
                            >
                                {f}
                                {f === "Filter" && (
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                    </svg>
                                )}
                                {f !== "Filter" && (
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </Container>
            </section>

            {/* Product Grid */}
            <section className="py-10">
                <Container>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
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

export default ProductList;

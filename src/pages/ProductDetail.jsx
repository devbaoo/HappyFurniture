import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "../components/ui/Container";
import Button from "../components/ui/Button";
import Accordion from "../components/ui/Accordion";
import ProductCard from "../components/ui/ProductCard";

const colorSwatches = Array.from({ length: 11 });
const thumbnails = Array.from({ length: 6 });
const recentProducts = Array.from({ length: 6 }, (_, i) => ({
  id: String(i + 200),
  name: "Bocce Taupe Sheepskin Upholstered Bench (62'-67')",
  price: "1000$",
  oldPrice: "1200$",
  colors: 5,
}));

const ProductDetail = () => {
  const { id: _productId } = useParams();
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className="relative pt-32">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white relative z-10">
        <Container>
          <nav
            aria-label="Breadcrumb"
            className="py-3 flex items-center gap-2 text-xs text-gray-500"
          >
            <Link to="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/product" className="hover:text-black transition-colors">
              Living Room
            </Link>
            <span>/</span>
            <span className="text-black">Sofas</span>
          </nav>
        </Container>
      </div>

      {/* Main Product Layout */}
      <section className="py-10 bg-white relative">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
            {/* LEFT — Gallery */}
            <div className="flex gap-4 relative">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 relative w-20">
                {thumbnails.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveThumb(i)}
                    className={`w-16 h-16 shrink-0 border transition-all duration-200 ${
                      activeThumb === i
                        ? "border-gray-800 border-2 bg-gray-800"
                        : "border-gray-300 border bg-gray-200"
                    } hover:border-gray-600 flex items-center justify-center overflow-hidden`}
                    aria-label={`View image ${i + 1}`}
                  ></button>
                ))}
                {/* Down chevron */}
                <button
                  type="button"
                  className="flex justify-center pt-1 pb-2"
                  aria-label="More images"
                >
                  <svg
                    className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Main Image */}
              <div className="flex-1 relative">
                <div className="aspect-square bg-gray-600 flex items-center justify-center overflow-hidden">
                </div>
              </div>
            </div>

            {/* RIGHT — Product Info */}
            <div className="space-y-6 relative">
              <h1 className="font-light text-2xl lg:text-3xl uppercase tracking-wide leading-tight">
                Cromwell 2 Over 3 Chest Of
                <br />
                Drawers In Pale Olive
              </h1>

              {/* Rating + review */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map((i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                    {[1, 2].map((i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">10 Reviews</span>
                </div>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
                >
                  Add Your Favourite
                  <svg
                    className="w-4 h-4"
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

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                Tapered legs - a signature of mid-century design - complement
                our chair's striking silhouette. The impeccably upholstered seat
                and back is supported by a wood frame, its brushed finish
                providing visual contrast and warmth. Plush foam cushioning
                provides the perfect combination of comfort and enduring
                support.
              </p>

              {/* Price + Quantity */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-light">1000$</span>
                  <span className="text-lg text-gray-400 line-through">
                    Reg:1000$
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Quantity:</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to basket */}
              <Button
                variant="primary"
                className="w-full py-4 bg-gray-800 hover:bg-gray-900 text-white font-medium"
                size="lg"
              >
                Add to basket
              </Button>

              {/* Accordions */}
              <div className="space-y-0 border-t border-gray-200">
                {/* 1. Size */}
                <Accordion title="1. Size" defaultOpen={true}>
                  <div className="flex gap-8 pt-4 pb-4">
                    <div>
                      <span className="text-sm text-gray-500">Height: </span>
                      <span className="text-sm font-medium">90 cm</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Width: </span>
                      <span className="text-sm font-medium">80 cm</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Depth: </span>
                      <span className="text-sm font-medium">46 cm</span>
                    </div>
                  </div>
                </Accordion>

                {/* 2. Colour / Finish */}
                <Accordion title="2. Colour / Finish" defaultOpen={true}>
                  <div className="grid grid-cols-4 gap-3 pt-4 pb-4 max-w-xs">
                    {colorSwatches.map((_, i) => {
                      const colors = [
                        "bg-gray-100",
                        "bg-gray-200",
                        "bg-gray-300",
                        "bg-gray-400",
                        "bg-gray-500",
                        "bg-gray-600",
                        "bg-gray-700",
                        "bg-gray-800",
                        "bg-gray-900",
                        "bg-black",
                        "bg-white",
                      ];
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedColor(i)}
                          aria-label={`Color option ${i + 1}`}
                          className={`aspect-square border-2 transition-colors ${colors[i] || "bg-gray-300"} ${
                            selectedColor === i
                              ? "border-black"
                              : "border-gray-200"
                          } hover:border-gray-500`}
                        />
                      );
                    })}
                  </div>
                </Accordion>

                {/* 3. Dimensions & Detail */}
                <Accordion title="3. Dimensions & Detail">
                  <div className="pt-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Full detailed specifications for this product including
                      assembly instructions and material composition.
                    </p>
                  </div>
                </Accordion>

                {/* 4. Delivery & Return */}
                <Accordion title="4. Delivery & Return">
                  <div className="pt-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Standard delivery: 15–30 days. Express delivery: 7–14
                      days. Returns accepted within 30 days of receipt.
                    </p>
                  </div>
                </Accordion>

                {/* 5. Review */}
                <Accordion title="5. Review">
                  <div className="pt-4 pb-4">
                    <div className="mb-6">
                      <h4 className="font-medium text-black text-base leading-relaxed">
                        Cromwell 2 Over 3 Chest Of Drawers In Pale Olive
                      </h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Be the first to share your experience with this product.
                      Your review helps other customers make informed decisions.
                    </p>
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Recently Viewed Products */}
      <section className="py-12 border-t border-gray-200 bg-white relative">
        <Container>
          <h3 className="text-lg uppercase tracking-widest font-light mb-8">
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

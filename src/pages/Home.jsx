import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

/* ─────────────────────────────────────────────
   Reusable image placeholder
   Dùng tạm cho đến khi bạn thêm ảnh thật vào
───────────────────────────────────────────── */
const Img = ({
  src,
  alt = "",
  className = "",
  style = {},
  placeholderBg = "#c8bfb0",
}) =>
  src ? (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      style={style}
    />
  ) : (
    <div
      className={`w-full h-full ${className}`}
      style={{ backgroundColor: placeholderBg, ...style }}
      aria-label={alt || "image placeholder"}
    />
  );

/* ─── Room/Category card ─── */
const CategoryCard = ({ label, src, bg, className = "" }) => (
  <div className={`relative overflow-hidden group cursor-pointer ${className}`}>
    <Img
      src={src}
      alt={label}
      placeholderBg={bg || "#3a3530"}
      className="transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
    />
    {/* Gradient layer to make text pop */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
    <span className="absolute bottom-4 right-5 text-white text-[16px] md:text-[18px] tracking-[0.15em] uppercase font-medium drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-right">
      {label}
    </span>
  </div>
);

/* ─── Promo card (dark section 3-col) ─── */
const PromoCard = ({ label, src, bg, className = "" }) => (
  <div className={`relative overflow-hidden group cursor-pointer ${className}`}>
    <Img
      src={src}
      alt={label}
      placeholderBg={bg || "#4a443d"}
      className="transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
    {label && (
      <span className="absolute bottom-3 left-4 text-white text-[10px] tracking-widest uppercase font-light transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        {label}
      </span>
    )}
  </div>
);

/* ─── Custom hook for scroll animations ─── */
const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '-50px' }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

const Home = () => {
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const visibleElements = useScrollAnimation();
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      {/* ══════════════════════════════════════════════
          1. HERO — Full-width background image + text + 2 CTA buttons
         ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ minHeight: "calc(100vh - 96px)" }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 bg-no-repeat transition-all duration-2000 ease-out ${isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            style={{
              backgroundImage: "url('/images/home/Home-main.jpg')",
              backgroundSize: "100% 100%", /* Ép ảnh hiển thị đủ 100% chiều ngang và dọc */
              backgroundPosition: "center"
            }}
          />

          {/* overlay - Đã tắt hoàn toàn để ảnh sáng nhất có thể */}
          <div className={`absolute inset-0 transition-opacity duration-1500 ${isLoaded ? 'opacity-0' : 'opacity-0'
            }`} />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* TITLE */}
          <h1
            className={`text-white font-light uppercase leading-tight text-center transform transition-all duration-1500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            style={{
              fontSize: "clamp(1rem, 2vw, 4.5rem)",
              letterSpacing: "0.02em",
              transitionDelay: "0.3s"
            }}
          >
            SOLID WOOD FURNITURE MANUFACTURER
            <br />
            FOR GLOBAL BRANDS
          </h1>

          {/* DESCRIPTION */}
          <p className={`text-white/80 text-sm mt-6 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: "0.6s" }}>
            We manufacture high-quality solid wood furniture with stable
            production capacity, strict quality control, and long-term
            partnership commitment
          </p>

          {/* BUTTON */}
          <div className={`mt-10 transform transition-all duration-1500 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: "0.9s" }}>
            <Link
              to="/product"
              className="inline-flex items-center justify-center bg-[#D8D2C9] text-gray-800 text-[16px] font-medium tracking-[0.1em] uppercase w-[280px] h-[52px] hover:brightness-95 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
            >
              OUR PRODUCT RANGE
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. OUR PRODUCT CATEGORIES — White bg, 2-row grid
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-16" data-animate id="categories">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          {/* Section title */}
          <div className={`text-center mb-4 transform transition-all duration-1000 ease-out ${visibleElements.has('categories') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <h2 className="font-heading text-3xl md:text-4xl font-light uppercase tracking-widest text-[#3f4a2f] mb-1">
              Our Product Categories
            </h2>

            <p className="text-base md:text-lg text-stone-500 max-w-3xl mx-auto leading-relaxed">
              Comprehensive solid wood furniture collections developed for
              residential
              <br />
              and commercial markets
            </p>
          </div>

          {/* Top row — 2 large equal images */}
          <div className={`grid grid-cols-2 gap-2 mb-2 transform transition-all duration-1000 ease-out ${visibleElements.has('categories') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: "0.2s" }}>
            <CategoryCard
              label="Living Room"
              src="/images/home/Home-Dining.jpg"
              bg="#3a3530"
              className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]"
            />
            <CategoryCard
              label="Bedroom"
              src="/images/home/Home-Bedroom.jpg"
              bg="#2e2a26"
              className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]"
            />
          </div>

          {/* Bottom row — 4 smaller equal images */}
          <div className={`grid grid-cols-4 gap-2 transform transition-all duration-1000 ease-out ${visibleElements.has('categories') ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`} style={{ transitionDelay: "0.4s" }}>
            <CategoryCard
              label="Dining Room"
              src="/images/home/Home-Dining.jpg"
              bg="#3d3832"
              className="aspect-square"
            />
            <CategoryCard
              label="Vanity"
              src="/images/home/Home-Vanity.jpg"
              bg="#312d29"
              className="aspect-square"
            />
            <CategoryCard
              label="Youth Room"
              src="/images/home/Home-Youth.jpg"
              bg="#3a3530"
              className="aspect-square"
            />
            <CategoryCard
              label="Accessories"
              src="/images/home/Home-Accessories.jpg"
              bg="#2e2a26"
              className="aspect-square"
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. DARK PROMO — Full-width dark bg + 3-col images beneath
         ══════════════════════════════════════════════ */}
      <section className="bg-[#d8d1c9] py-24" data-animate id="promo">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          {/* Title */}
          <h2
            className={`text-center font-heading uppercase text-[#4b4a3f] mb-20 transition-all duration-1000 ease-out ${visibleElements.has('promo') ? 'opacity-100' : 'opacity-0'
              }`}
            style={{
              fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
              letterSpacing: "0.08em",
              lineHeight: "1.4",
              height: "0.677085px",
              transform: visibleElements.has('promo') ? "translate(0px, -33.3334px)" : "translate(0px, 0px)",
            }}
          >
            WE ARE KNOWN AS ONE OF THE TOP <br />
            KD MANUFACTURERS IN VIETNAM.
          </h2>

          {/* 4 images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {[
              {
                src: "/images/home/Quality.jpg",
                text: "Cam kết chất lượng",
              },
              {
                src: "/images/home/InternationalStandard.jpg",
                text: "Tiêu chuẩn quốc tế",
              },
              {
                src: "/images/home/SustainableProduction.jpg",
                text: "Sản xuất bền vững",
              },
              {
                src: "/images/home/ExportRegulations.jpg",
                text: "Tuân thủ quy định xuất khẩu",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm group"
              >
                <Img
                  src={item.src}
                  alt={item.text}
                  className="w-full h-[290px] object-cover transition duration-500 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80" />

                {/* caption */}
                <p className="absolute bottom-3 left-0 right-0 text-center text-white text-[16px] md:text-[18px] font-medium tracking-wide drop-shadow-md">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. ABOUT THE COMPANY — White bg, 2-col (text left, image right)
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-20">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 max-w-[1300px] mx-auto items-center">
            {/* Left: Text */}
            <div className="lg:col-span-5 h-full py-2">
              <div>
                <p className="text-sm tracking-wide text-[#3f4a2f] mb-2 font-bold font-sans">
                  About the Company
                </p>
                <h2
                  className="font-heading font-light uppercase text-[#3f4a2f] mb-8 leading-snug"
                  style={{
                    fontSize: "clamp(1.6rem, 2.5vw, 2.3rem)",
                    letterSpacing: "0.01em",
                  }}
                >
                  A TRUSTED FURNITURE
                  <br />
                  MANUFACTURING PARTNER
                </h2>
              </div>
              <p className="text-[12px] text-stone-800 font-medium leading-relaxed mb-3">
                Founded in 2005, Happy Furniture is a Vietnam-based manufacturer
                specializing in knock-down (KD) wooden furniture for global
                markets. With nearly two decades of experience, we have built a
                strong reputation as a reliable partner for international
                furniture brands, retailers, and importers.
              </p>
              <p className="text-[12px] text-stone-800 font-medium leading-relaxed mb-3">
                Our product range focuses on mid- to high-end indoor furniture
                collections, including dining, bedroom, and living room
                furniture. In addition to finished furniture, we also supply
                selected wood materials, particularly pine and oak, supporting
                partners with both manufacturing and material sourcing
                solutions. At Happy Furniture, we combine skilled craftsmanship
                with efficient production processes to deliver consistent
                quality at competitive prices. Our team continuously improves
                production systems, quality control, and supply chain management
                to meet the expectations of international customers.
              </p>
              <p className="text-[12px] text-stone-800 font-medium leading-relaxed">
                Today, Happy Furniture is recognized as one of Vietnam's leading
                knock-down (KD) furniture manufacturers, serving partners across
                the United States, the United Kingdom, Ireland, Italy,
                Australia, and other global markets.
              </p>
            </div>

            {/* Right: image */}
            <div className="lg:col-span-7 overflow-hidden w-full">
              <Img
                src="/images/home/AboutCompany.jpg"
                alt="About Happy Furniture"
                placeholderBg="#b5a898"
                className="aspect-[4/3] w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          5. 4-COLUMN FEATURES — White bg, thin rule, vertical dividers
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-10 -mt-10">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="border-t-[3px] border-[#5a564f] mb-0" />

          <div className="bg-[rgb(241,240,238)] py-0">
            <div className="grid grid-cols-1 md:grid-cols-4 text-center divide-x divide-[#c9c5be]">
              {[
                {
                  title: "Delivery",
                  desc: "Efficient year-round shipping with clear production schedules and reliable lead times",
                },
                {
                  title: "Order",
                  desc: "A diverse collection of 500+ designs available with flexible MOQ for global partners",
                },
                {
                  title: "OEM",
                  desc: "Professional design support from concept development to technical drawings and sample creation",
                },
                {
                  title: "Packaging and Dispatch",
                  desc: "International-standard packaging solutions tailored to client requirements and shipping safety",
                },
              ].map((item) => (
                <div key={item.title} className="px-20 py-5">
                  <h3
                    className="mb-3 font-semibold"
                    style={{
                      fontSize: "22px",
                      letterSpacing: "0.04em",
                      color: "#2b2925", // chữ tiêu đề thêm đậm và đen hơn
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="leading-7 font-medium"
                    style={{
                      fontSize: "14.5px",
                      color: "#4a4742", // chữ mô tả đậm và rõ nét hơn
                      maxWidth: "240px",
                      margin: "0 auto",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          6. INSIDE OUR FACTORY — Full-width dark video/image section
         ══════════════════════════════════════════════ */}
      <section
        className="pt-64 mt-20 pb-20 relative"
        style={{
          backgroundImage:
            "url(/images/home/InsideFactoryBackGround.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/0"></div>
        <div
          className="max-w-5xl mx-auto absolute left-0 right-0 -top-16 overflow-hidden shadow-xl z-10"
          style={{ height: "520px" }}
        >
          <Img
            src="/images/home/InsideFactoryBackGround.jpg"
            alt="Inside our factory"
          />

          <div className="absolute inset-0" />

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center hover:bg-white/30 transition">
              <svg
                className="w-8 h-8 text-white ml-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="text-center mt-56 px-6 relative z-10">
          <h2
            className="font-heading text-white font-light uppercase tracking-widest mb-5"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", height: "29.5487px" }}
          >
            Inside Our Factory
          </h2>

          <p className="text-white/60 text-sm max-w-3xl mx-auto leading-relaxed">
            A look inside our operations, from office and product development to
            white wood production, finishing, packaging, showroom and warehouse
            facilities
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. PARTNERS / CERTIFICATIONS — White bg, centered logos row
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-20" data-selected="true" data-label-id="0" style={{ height: "621.545px" }}>
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          {/* ===== Partners ===== */}
          <div className="text-center mb-16">
            <h3 className="text-[#4b4a3f] text-xl md:text-2xl font-medium tracking-wide mb-2 uppercase">
              Our Global Partners
            </h3>

            <div className="w-80 h-[2px] bg-stone-300 mx-auto mb-10"></div>

            <div className="flex justify-center gap-12" style={{ height: "88.1945px", transform: "translate(0px, -57.7778px)" }}>
              {[
                "/images/home/GlobalPartners.jpg",
                "/images/home/GlobalPartners.jpg",
                "/images/home/GlobalPartners.jpg",
              ].map((src, i) => (
                <div key={i} className="w-24 h-24 rounded-full overflow-hidden">
                  <Img
                    src={src}
                    alt={`Global partner ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== Certifications ===== */}
          <div className="text-center">
            <h3 className="text-[#4b4a3f] text-xl md:text-2xl font-medium tracking-wide mb-2 uppercase">
              Our Certifications
            </h3>

            <div className="w-80 h-[2px] bg-stone-300 mx-auto mb-12"></div>

            <div
              className="grid grid-cols-3 items-center max-w-3xl mx-auto gap-12"
              data-selected="true"
              data-label-id="0"
              style={{ height: "130.278px", transform: "translate(0px, -87.7778px)" }}
            >
              <Img
                src="/images/home/CTPAT.jpg"
                alt="CTPAT"
                className="h-10 object-contain mx-auto"
              />

              <Img
                src="/images/home/Amfori.jpg"
                alt="BSCI"
                className="h-10 object-contain mx-auto"
              />

              <Img
                src="/images/home/SMETA.jpg"
                alt="SMETA Sedex"
                className="h-12 object-contain mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. TIMBER MERCHANDISING — Beige bg, 2-col: text left, image grid right
         ══════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#d6cec6" }} className="py-4">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
            {/* LEFT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2
                className="font-serif uppercase mb-3 text-[#273927] whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.5rem, 2.5vw, 2.3rem)",
                  letterSpacing: "0.08em",
                  lineHeight: "1.15",
                }}
              >
                TIMBER MERCHANDISING
              </h2>

              <div className="mb-5 flex flex-col gap-2 text-sm font-light text-stone-600">
                <p className="leading-relaxed">
                  We enjoy advantages of having large warehousing facilities,
                  with storage capacity of up to 10,000 cubic meter of raw
                  material and more than 60 containers.
                </p>
                <p className="leading-relaxed">
                  We have established long-term relationship with our licensed
                  suppliers in New Zealand, Chile, Brazil, Germany, and Uruguay.
                  All sourced timber is 100% FSC certified and passing relevant
                  controlled wood regulatory requirements.
                </p>
              </div>

              {/* QUALITY */}
              <div className="mb-5">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-500 font-medium mb-3">
                  QUALITY
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {["Industrial Grade", "Millrun", "COL"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white text-stone-600 text-[11px] font-medium uppercase tracking-wider px-4 py-1.5 rounded-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["FCOL", "ACOL"].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white text-stone-600 text-[11px] font-medium uppercase tracking-wider px-4 py-1.5 rounded-sm shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-6">
                <p className="text-xs tracking-[0.2em] uppercase text-stone-500 font-medium mb-2">
                  SIZE
                </p>
                <p className="text-sm text-stone-600 font-light">
                  Varied thickness (11mm to 50mm)
                </p>
              </div>

              {/* BUTTON */}
              <div>
                <Link
                  to="/product"
                  className="inline-block bg-[#273927] text-white text-[12px] tracking-[0.2em] font-medium uppercase px-8 py-3.5 rounded-sm hover:bg-[#1f2d1f] transition duration-300"
                >
                  LEARN MORE
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE LAYOUT - 60% */}
            <div className="lg:col-span-3 flex flex-col gap-1">
              {/* TOP IMAGE */}
              <div className="w-full h-[360px] lg:h-[420px] overflow-hidden rounded-sm">
                <Img
                  src="/images/home/Timber.jpg"
                  alt="Bedroom furniture"
                  className="w-full h-full object-cover"
                  placeholderBg="#b5a898"
                />
              </div>

              {/* BOTTOM IMAGES */}
              <div className="grid grid-cols-2 gap-1">
                <div className="overflow-hidden rounded-sm h-[200px] lg:h-[280px]">
                  <Img
                    src="/images/home/Timber2.jpg"
                    alt="Dining tables"
                    className="w-full h-full object-cover"
                    placeholderBg="#b5a898"
                  />
                </div>
                <div className="overflow-hidden rounded-sm h-[200px] lg:h-[280px]">
                  <Img
                    src="/images/home/Timber3.jpg"
                    alt="Dining specific"
                    className="w-full h-full object-cover"
                    placeholderBg="#b5a898"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          9. BE THE FIRST TO KNOW (Newsletter) — 2-col: form left, image right
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center max-w-[1300px] mx-auto">
            {/* LEFT IMAGE - 60% */}
            <div className="lg:col-span-3 overflow-hidden rounded-sm shadow-md h-[380px] lg:h-[460px]">
              <Img
                src="/images/home/Furniture.jpg"
                alt="Furniture showroom"
                className="w-full h-full object-cover"
                placeholderBg="#d1cec7"
              />
            </div>

            {/* RIGHT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center">
              <h2
                className="font-serif uppercase mb-3 text-[#2d3a2d] whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.3rem, 2vw, 1.8rem)", // ↓ nhỏ lại
                  letterSpacing: "0.05em",
                  lineHeight: "1.3",
                }}
              >
                LET’S BUILD YOUR NEXT <br />
                COLLECTION TOGETHER
              </h2>

              <p className="text-[17px] font-light text-stone-500 mb-5 max-w-[500px] leading-relaxed">
                Contact our team to receive product catalogs, technical
                specifications, and partnership information.
              </p>

              {/* EMAIL FORM */}
              <div className="flex w-full max-w-[900px] mb-4">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 h-[42px] text-[14px] 
                                                border border-stone-300 
                                                bg-white 
                                                outline-none 
                                                placeholder:text-stone-400 
                                                text-stone-700"
                />

                <button
                  className="ml-2 shrink-0 bg-[#2d3a2d] text-white text-[13px] 
                                                tracking-widest uppercase font-medium 
                                                px-5 h-[42px] 
                                                hover:bg-[#222c22] transition duration-300"
                >
                  Send
                </button>
              </div>

              {/* CONTACT LINK */}
              <div className="flex items-center gap-4 text-[#2d3a2d] hover:opacity-80 transition cursor-pointer group">
                <span className="w-8 h-[1px] bg-[#2d3a2d] transition-all group-hover:w-10" />
                <span className="text-[13px] uppercase tracking-widest font-medium">
                  Contact now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

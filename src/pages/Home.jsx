import { useState } from "react";
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
    <div className={`relative overflow-hidden group ${className}`}>
        <Img src={src} alt={label} placeholderBg={bg || "#3a3530"} className="transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute bottom-3 right-4 text-white text-[10px] tracking-[0.2em] uppercase font-light drop-shadow">
            {label}
        </span>
    </div>
);

/* ─── Promo card (dark section 3-col) ─── */
const PromoCard = ({ label, src, bg, className = "" }) => (
    <div className={`relative overflow-hidden group ${className}`}>
        <Img src={src} alt={label} placeholderBg={bg || "#4a443d"} className="transition-transform duration-500 group-hover:scale-105" />
        {label && (
            <span className="absolute bottom-3 left-4 text-white text-[10px] tracking-widest uppercase font-light">
                {label}
            </span>
        )}
    </div>
);

const Home = () => {
    const [email, setEmail] = useState("");

    return (
        <div className="w-full">

            {/* ══════════════════════════════════════════════
          1. HERO — Full-width background image + text + 2 CTA buttons
         ══════════════════════════════════════════════ */}
            <section
                className="relative flex items-center justify-center overflow-hidden"
                style={{ minHeight: "calc(100vh - 96px)" }}
            >
                {/* Background */}
                <div className="absolute inset-0">
                    <Img
                        src="/images/hero-bedroom.jpg"
                        alt="Hero background"
                        className="w-full h-full object-cover"
                    />

                    {/* overlay */}
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-6 max-w-5xl">

                    {/* TITLE */}
                    <h1
                        className="text-white font-light uppercase leading-tight text-center"
                        style={{
                            fontSize: "clamp(1rem, 2vw, 4.5rem)",
                            letterSpacing: "0.02em",
                        }}
                    >
                        SOLID WOOD FURNITURE MANUFACTURER
                        <br />
                        FOR GLOBAL BRANDS
                    </h1>

                    {/* DESCRIPTION */}
                    <p className="text-white/80 text-sm mt-6 max-w-2xl mx-auto leading-relaxed">

                        LWe manufacture high-quality solid wood furniture with stable production capacity, strict quality control, and long-term partnership commitment
                    </p>

                    {/* BUTTON */}
                    <div className="mt-10">
                        <Link
                            to="/product"
                            className="inline-flex items-center justify-center bg-[#D8D2C9] text-gray-800 text-[16px] font-medium tracking-[0.1em] uppercase w-[280px] h-[52px] hover:brightness-95 transition"
                        >
                            OUR PRODUCT RANGE
                        </Link>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════
          2. OUR PRODUCT CATEGORIES — White bg, 2-row grid
         ══════════════════════════════════════════════ */}
            <section className="bg-white py-16">
                <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
                    {/* Section title */}
                    <div className="text-center mb-10">
                        <h2 className="font-heading text-3xl md:text-4xl font-light uppercase tracking-widest text-[#3f4a2f] mb-4">
                            Our Product Categories
                        </h2>

                        <p className="text-base md:text-lg text-stone-500 max-w-3xl mx-auto leading-relaxed">
                            Comprehensive solid wood furniture collections developed for residential
                            <br />
                            and commercial markets
                        </p>
                    </div>

                    {/* Top row — 2 large equal images */}
                    <div className="grid grid-cols-2 gap-2 mb-2">
                        <CategoryCard label="Living Room" bg="#3a3530" className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]" />
                        <CategoryCard label="Bedroom" bg="#2e2a26" className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]" />
                    </div>

                    {/* Bottom row — 4 smaller equal images */}
                    <div className="grid grid-cols-4 gap-2">
                        <CategoryCard label="Dining Room" bg="#3d3832" className="aspect-square" />
                        <CategoryCard label="Vanity" bg="#312d29" className="aspect-square" />
                        <CategoryCard label="Youth Room" bg="#3a3530" className="aspect-square" />
                        <CategoryCard label="Accessories" bg="#2e2a26" className="aspect-square" />
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          3. DARK PROMO — Full-width dark bg + 3-col images beneath
         ══════════════════════════════════════════════ */}
            <section className="bg-[#d8d1c9] py-24">
                <div className="max-w-7xl mx-auto px-6">

                    {/* Title */}
                    <h2
                        className="text-center font-heading uppercase text-[#4b4a3f] mb-16"
                        style={{
                            fontSize: "clamp(1.5rem, 2.4vw, 2.1rem)",
                            letterSpacing: "0.08em",
                            lineHeight: "1.4",
                        }}
                    >
                        WE ARE KNOWN AS ONE OF THE TOP <br />
                        KD MANUFACTURERS IN VIETNAM.
                    </h2>

                    {/* 4 images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        {[
                            { src: "/images/factory1.jpg", text: "Cam kết chất lượng" },
                            { src: "/images/factory2.jpg", text: "Tiêu chuẩn quốc tế" },
                            { src: "/images/factory3.jpg", text: "Sản xuất bền vững" },
                            { src: "/images/factory4.jpg", text: "Tuân thủ quy định xuất khẩu" },
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                {/* caption */}
                                <p className="absolute bottom-5 left-0 right-0 text-center text-white text-sm font-light tracking-wide">
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
                                    style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.3rem)", letterSpacing: "0.01em" }}
                                >
                                    A TRUSTED FURNITURE<br />MANUFACTURING PARTNER
                                </h2>
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed mb-3">
                                Founded in 2005, Happy Furniture is a Vietnam-based manufacturer specializing in knock-down (KD) wooden furniture for global markets. With nearly two decades of experience, we have built a strong reputation as a reliable partner for international furniture brands, retailers, and importers.
                            </p>
                            <p className="text-sm text-stone-600 leading-relaxed mb-3">
                                Our product range focuses on mid- to high-end indoor furniture collections, including dining, bedroom, and living room furniture. In addition to finished furniture, we also supply selected wood materials, particularly pine and oak, supporting partners with both manufacturing and material sourcing solutions. At Happy Furniture, we combine skilled craftsmanship with efficient production processes to deliver consistent quality at competitive prices. Our team continuously improves production systems, quality control, and supply chain management to meet the expectations of international customers.
                            </p>
                            <p className="text-sm text-stone-600 leading-relaxed">
                                Today, Happy Furniture is recognized as one of Vietnam's leading knock-down (KD) furniture manufacturers, serving partners across the United States, the United Kingdom, Ireland, Italy, Australia, and other global markets.
                            </p>
                        </div>

                        {/* Right: image */}
                        <div
                            className="lg:col-span-7 overflow-hidden w-full"
                        >
                            <Img src="" alt="About Happy Furniture" placeholderBg="#b5a898" className="aspect-[4/3] w-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════
          5. 4-COLUMN FEATURES — White bg, thin rule, vertical dividers
         ══════════════════════════════════════════════ */}
            <section className="bg-white py-10 -mt-10">
                <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">


                    <div className="border-t-2 border-[#8a857d] mb-4" />

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
                                        className="mb-3 font-medium"
                                        style={{
                                            fontSize: "15px",
                                            letterSpacing: "0.04em",
                                            color: "#3f3c37",   // chữ đậm hơn
                                        }}
                                    >
                                        {item.title}
                                    </h3>

                                    <p
                                        className="leading-7"
                                        style={{
                                            fontSize: "13px",
                                            color: "#5f5b55",   // chữ mô tả đậm hơn
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
            <section className="bg-[#111] pt-60 pb-20 relative">

                <div
                    className="max-w-5xl mx-auto absolute left-0 right-0 -top-16 overflow-hidden shadow-2xl"
                    style={{ height: "520px" }}
                >
                    <Img src="" alt="Inside our factory" placeholderBg="#2a2520" />

                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center hover:bg-white/30 transition">
                            <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="text-center mt-56 px-6">
                    <h2
                        className="font-heading text-white font-light uppercase tracking-widest mb-5"
                        style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)" }}
                    >
                        Inside Our Factory
                    </h2>

                    <p className="text-white/60 text-sm max-w-3xl mx-auto leading-relaxed">
                        A look inside our operations, from office and product development to white wood production,
                        finishing, packaging, showroom and warehouse facilities
                    </p>
                </div>

            </section>

            {/* ══════════════════════════════════════════════
          7. PARTNERS / CERTIFICATIONS — White bg, centered logos row
         ══════════════════════════════════════════════ */}
            <section className="bg-[#f5f5f3] py-20">
                <div className="max-w-6xl mx-auto px-6">

                    {/* ===== Partners ===== */}
                    <div className="text-center mb-16">
                        <h3 className="text-[#4b4a3f] font-medium mb-4">
                            Our Global Partners
                        </h3>

                        <div className="w-48 h-px bg-stone-300 mx-auto mb-8"></div>

                        <div className="flex justify-center gap-12">
                            {[
                                "/images/flag-us.png",
                                "/images/flag-us.png",
                                "/images/flag-us.png",
                            ].map((src, i) => (
                                <div key={i} className="w-24 h-24 rounded-full overflow-hidden">
                                    <Img
                                        src={src}
                                        alt="partner"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== Certifications ===== */}
                    <div className="text-center">
                        <h3 className="text-[#4b4a3f] font-medium mb-4">
                            Our Certifications
                        </h3>

                        <div className="w-48 h-px bg-stone-300 mx-auto mb-10"></div>

                        <div className="grid grid-cols-3 items-center max-w-3xl mx-auto gap-12">

                            <Img
                                src="/images/ctpat.png"
                                alt="CTPAT"
                                className="h-10 object-contain mx-auto"
                            />

                            <Img
                                src="/images/bsci.png"
                                alt="BSCI"
                                className="h-10 object-contain mx-auto"
                            />

                            <Img
                                src="/images/smeta.png"
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
            <section style={{ backgroundColor: "#f0ede8" }} className="py-24">
                <div className="max-w-7xl mx-auto px-10">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                        {/* LEFT CONTENT */}
                        <div>

                            <h2
                                className="font-heading uppercase font-light mb-6"
                                style={{
                                    fontSize: "clamp(1.6rem,2.5vw,2.1rem)",
                                    letterSpacing: "0.06em",
                                    color: "#3f4a2f",
                                }}
                            >
                                TIMBER MERCHANDISING
                            </h2>

                            <p className="text-sm text-stone-600 leading-relaxed mb-5 max-w-md">
                                We enjoy advantages of having large warehousing facilities, with storage
                                capacity of up to 10,000 cubic meter of raw material and more than 60 containers.
                            </p>

                            <p className="text-sm text-stone-600 leading-relaxed mb-10 max-w-md">
                                We have established long-term relationship with our licensed suppliers
                                in New Zealand, Chile, Brazil, Germany, and Uruguay. All sourced timber
                                is 100% FSC certified and passing relevant controlled wood regulatory requirements.
                            </p>

                            {/* QUALITY */}
                            <div className="mb-8">
                                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-semibold mb-3">
                                    QUALITY
                                </p>

                                <div className="flex flex-wrap gap-3 max-w-md">
                                    {["Industrial Grade", "Millrun", "COL", "FCOL", "ACOL"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-[#e6e3df] text-stone-700 text-[11px] px-5 py-2"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* SIZE */}
                            <div className="mb-10">
                                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-500 font-semibold mb-2">
                                    SIZE
                                </p>
                                <p className="text-sm text-stone-600">
                                    Varied thickness (11mm to 50mm)
                                </p>
                            </div>

                            {/* BUTTON */}
                            <Link
                                to="/product"
                                className="inline-block bg-[#3f4c2f] text-white text-[12px] tracking-[0.25em] uppercase px-10 py-3 hover:bg-[#2f3923] transition"
                            >
                                LEARN MORE
                            </Link>

                        </div>

                        {/* RIGHT IMAGE LAYOUT */}
                        <div className="grid grid-cols-2 gap-4">

                            {/* TOP IMAGE */}
                            <div className="col-span-2 overflow-hidden rounded-sm">
                                <Img
                                    src="/images/timber-main.jpg"
                                    alt="Timber bedroom"
                                    className="w-full h-[300px] object-cover"
                                />
                            </div>

                            {/* BOTTOM LEFT */}
                            <div className="overflow-hidden rounded-sm">
                                <Img
                                    src="/images/timber-dining.jpg"
                                    alt="Timber dining"
                                    className="w-full h-[180px] object-cover"
                                />
                            </div>

                            {/* BOTTOM RIGHT */}
                            <div className="overflow-hidden rounded-sm">
                                <Img
                                    src="/images/timber-chairs.jpg"
                                    alt="Timber chairs"
                                    className="w-full h-[180px] object-cover"
                                />
                            </div>

                        </div>

                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════════════
          9. BE THE FIRST TO KNOW (Newsletter) — 2-col: form left, image right
         ══════════════════════════════════════════════ */}
            <section className="bg-white py-24">
                <div className="max-w-7xl mx-auto px-10">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* LEFT IMAGE */}
                        <div className="overflow-hidden">
                            <Img
                                src="/images/contact-furniture.jpg"
                                alt="Furniture showroom"
                                className="w-full h-[380px] object-cover"
                            />
                        </div>

                        {/* RIGHT CONTENT */}
                        <div>

                            <h2
                                className="font-heading font-light uppercase mb-4"
                                style={{
                                    fontSize: "clamp(1.8rem,2.6vw,2.4rem)",
                                    letterSpacing: "0.05em",
                                    color: "#3f4c2f",
                                    lineHeight: "1.3"
                                }}
                            >
                                LET’S BUILD YOUR NEXT <br />
                                COLLECTION TOGETHER
                            </h2>

                            <p className="text-sm text-stone-600 mb-8 max-w-md">
                                Contact our team to receive product catalogs, technical specifications,
                                and partnership information
                            </p>

                            {/* EMAIL FORM */}
                            <div className="flex max-w-lg border border-stone-300">

                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 px-4 py-3 text-sm bg-transparent outline-none placeholder:text-stone-400"
                                />

                                <button
                                    className="bg-[#3f4c2f] text-white text-[12px] px-8 hover:bg-[#2f3923] transition"
                                >
                                    Send
                                </button>

                            </div>

                            {/* CONTACT LINK */}
                            <div className="flex items-center gap-3 mt-8 text-sm text-[#3f4c2f]">
                                <span className="w-6 h-px bg-[#3f4c2f]" />
                                Contact now
                            </div>

                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
};

export default Home;

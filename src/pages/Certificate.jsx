import { Link } from "react-router-dom";

/* ── reusable placeholder image ── */
const Img = ({ src, alt = "", className = "", placeholderBg = "#c8bfb0" }) =>
    src ? (
        <img src={src} alt={alt} className={`object-cover ${className}`} />
    ) : (
        <div
            className={className}
            style={{ backgroundColor: placeholderBg }}
            aria-label={alt || "image placeholder"}
        />
    );

const Certificate = () => {
    return (
        <div className="w-full bg-white">

            {/* ── BREADCRUMB ── */}
            <div className="max-w-[1800px] mx-auto px-10 pt-[130px] pb-4">
                <nav className="flex items-center gap-2 text-[11px] text-stone-400 tracking-wide uppercase">
                    <Link to="/" className="hover:text-stone-600 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-stone-600">Certificates</span>
                </nav>
            </div>

            {/* ══════════════════════════════════════════
              HERO — centered furniture image + title + description
             ══════════════════════════════════════════ */}
            <section className="py-10 text-center">
                <div className="max-w-xl mx-auto px-6">

                    {/* Decorative furniture illustration / image */}
                    <div className="flex justify-center mb-6">
                        <Img
                            src="/images/cert-hero.png"
                            alt="Certificate hero furniture"
                            className="w-48 h-48 object-contain"
                            placeholderBg="transparent"
                        />
                    </div>

                    <h1
                        className="font-heading uppercase font-light mb-6 text-[#3a3530]"
                        style={{
                            fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                            letterSpacing: "0.12em",
                        }}
                    >
                        ON WHAT TO EXPECT
                    </h1>

                    <p className="text-sm text-stone-500 leading-relaxed max-w-sm mx-auto">
                        Tapered legs – a signature of midcentury design – complement our
                        chair's striking silhouette. The impeccably upholstered seat and
                        back is supported by a wood frame, its crushed finish providing
                        visual contrast and warmth. Plush foam cushioning provides the
                        perfect combination of comfort and enduring support.
                    </p>

                </div>
            </section>

            {/* ══════════════════════════════════════════
              MAIN — 2-col: left image/video | right certifications
             ══════════════════════════════════════════ */}
            <section className="pb-24">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* ── LEFT: image with play button ── */}
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                        <Img
                            src="/images/cert-workshop.jpg"
                            alt="Workshop inspection"
                            className="w-full h-full object-cover"
                            placeholderBg="#c8bfb0"
                        />
                        {/* overlay */}
                        <div className="absolute inset-0 bg-black/20" />
                        {/* play button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                aria-label="Play video"
                                className="w-16 h-16 rounded-full bg-white/25 border-2 border-white flex items-center justify-center hover:bg-white/40 transition"
                            >
                                <svg className="w-6 h-6 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ── RIGHT: certifications list ── */}
                    <div className="flex flex-col gap-0">

                        {/* ─── CTPAT ─── */}
                        <div className="pb-8">
                            <div className="mb-3">
                                <Img
                                    src="/images/ctpat.png"
                                    alt="CTPAT"
                                    className="h-10 object-contain"
                                    placeholderBg="transparent"
                                />
                            </div>
                            <h2
                                className="font-heading uppercase font-medium text-[#2c2c2c] mb-3"
                                style={{ fontSize: "1.15rem", letterSpacing: "0.05em" }}
                            >
                                CTPAT
                            </h2>
                            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
                                Tapered legs – a signature of midcentury design – complement our
                                chair's striking silhouette. The impeccably upholstered seat and back
                                is supported by a wood frame.
                            </p>
                        </div>

                        {/* divider */}
                        <div className="border-t border-stone-200 mb-8" />

                        {/* ─── BSCI ─── */}
                        <div className="pb-8">
                            <div className="mb-3">
                                <Img
                                    src="/images/bsci.png"
                                    alt="BSCI"
                                    className="h-10 object-contain"
                                    placeholderBg="transparent"
                                />
                            </div>
                            <h2
                                className="font-heading uppercase font-medium text-[#2c2c2c] mb-3"
                                style={{ fontSize: "1.15rem", letterSpacing: "0.05em" }}
                            >
                                BSCI
                            </h2>
                            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
                                Tapered legs – a signature of midcentury design – complement our
                                chair's striking silhouette. The impeccably upholstered seat and back
                                is supported by a wood frame.
                            </p>
                        </div>

                        {/* divider */}
                        <div className="border-t border-stone-200 mb-8" />

                        {/* ─── SMETA ─── */}
                        <div className="pb-2">
                            {/* Two logos row */}
                            <div className="flex items-center gap-4 mb-3">
                                <Img
                                    src="/images/smeta.png"
                                    alt="SMETA Sedex"
                                    className="h-10 object-contain"
                                    placeholderBg="transparent"
                                />
                                {/* Sedex circular badge */}
                                <Img
                                    src="/images/sedex-badge.png"
                                    alt="Sedex badge"
                                    className="w-12 h-12 object-contain"
                                    placeholderBg="transparent"
                                />
                            </div>
                            <h2
                                className="font-heading uppercase font-medium text-[#2c2c2c] mb-3"
                                style={{ fontSize: "1.15rem", letterSpacing: "0.05em" }}
                            >
                                SMETA
                            </h2>
                            <p className="text-sm text-stone-500 leading-relaxed max-w-sm">
                                Tapered legs – a signature of midcentury design – complement our
                                chair's striking silhouette. The impeccably upholstered seat and back
                                is supported by a wood frame.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
};

export default Certificate;

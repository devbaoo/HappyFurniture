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
      <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] pt-[130px] pb-4">
        <nav className="flex items-center gap-2 text-[11px] text-stone-400 tracking-wide uppercase">
          <Link to="/" className="hover:text-stone-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-stone-600">Certificates</span>
        </nav>
      </div>

      {/* ══════════════════════════════════════════
              HERO — centered furniture image + title + description
             ══════════════════════════════════════════ */}
      <section className="py-10 text-center">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
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

          <p className="text-sm text-stone-800 leading-relaxed max-w-3xl mx-auto">
            Tapered legs - a signature of midcentury design - complement our{" "}
            <br />
            chair's striking silhouette. The impeccably upholstered seat and{" "}
            <br />
            back is supported by a wood frame, its brushed finish providing{" "}
            <br />
            visual contrast and warmth. Plush foam cushioning provides the{" "}
            <br />
            perfect combination of comfort and enduring support.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
              MAIN — 2-col: left image/video | right certifications
             ══════════════════════════════════════════ */}
      <section className="pb-24">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* ── LEFT: image with play button ── */}
          <div
            className="relative overflow-hidden"
            style={{ aspectRatio: "4/3" }}
          >
            <Img
              src="/images/cert-workshop.jpg"
              alt="Workshop inspection"
              className="object-cover w-full h-full"
              placeholderBg="#c8bfb0"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-black/20" />
            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ height: "578.941px", transform: "translate(0px, -1.11109px)" }}>
              <button
                aria-label="Play video"
                className="w-16 h-16 rounded-full bg-white/25 border-2 border-white flex items-center justify-center hover:bg-white/40 transition"
              >
                <svg
                  className="w-6 h-6 text-white ml-1"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── RIGHT: certifications list ── */}
          <div className="flex flex-col gap-0">
            {/* ─── CTPAT ─── */}
            <div className="pb-8" style={{ width: "740.903px", transform: "translate(31.1112px, 0px)", height: "185.885px" }}>
              <div className="mb-3">
                <Img
                  src="/images/ctpat.png"
                  alt="CTPAT"
                  className="h-12 md:h-14 object-contain"
                  placeholderBg="transparent"
                />
              </div>
              <h2
                className="font-heading uppercase font-semibold text-[#2c2c2c] mb-3"
                style={{ fontSize: "1.3rem", letterSpacing: "0.05em", height: "59.4444px", transform: "translate(0px, -30px)" }}
              >
                CTPAT
              </h2>
              <p className="text-[15px] font-medium text-stone-600 leading-relaxed max-w-lg" style={{ height: "132.257px", transform: "translate(0px, -68.8889px)" }}>
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>

            {/* divider */}
            <div className="border-t border-stone-200 mb-8" style={{ height: "1.11111px" }} />

            {/* ─── BSCI ─── */}
            <div className="pb-8" style={{ width: "740.903px", transform: "translate(31.1111px, 0px)", height: "182.5px" }}>
              <div className="mb-3" style={{ height: "103.299px", transform: "translate(0px, -28.8889px)" }}>
                <Img
                  src="/images/bsci.png"
                  alt="BSCI"
                  className="h-12 md:h-14 object-contain"
                  placeholderBg="transparent"
                />
              </div>
              <h2
                className="font-heading uppercase font-semibold text-[#2c2c2c] mb-3"
                style={{ fontSize: "1.3rem", letterSpacing: "0.05em", height: "107.222px", transform: "translate(0px, -77.7778px)" }}
              >
                BSCI
              </h2>
              <p className="text-[15px] font-medium text-stone-600 leading-relaxed max-w-lg" style={{ height: "228.941px", transform: "translate(0px, -165.556px)" }}>
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>

            {/* divider */}
            <div className="border-t border-stone-200 mb-8" />

            {/* ─── SMETA ─── */}
            <div className="pb-2" style={{ width: "756.458px", transform: "translate(15.5555px, 0px)", height: "184.566px" }}>
              {/* Two logos row */}
              <div className="flex items-center gap-4 mb-3" style={{ height: "141.111px", transform: "translate(16.6667px, -61.1111px)", width: "739.757px" }}>
                <Img
                  src="/images/smeta.png"
                  alt="SMETA Sedex"
                  className="h-12 md:h-14 object-contain"
                  placeholderBg="transparent"
                />
              </div>
              <h2
                className="font-heading uppercase font-semibold text-[#2c2c2c] mb-3"
                style={{ fontSize: "1.3rem", letterSpacing: "0.05em", height: "117.222px", transform: "translate(15.5556px, -87.7778px)", width: "740.886px" }}
              >
                SMETA
              </h2>
              <p className="text-[15px] font-medium text-stone-600 leading-relaxed max-w-lg" style={{ height: "260.052px", transform: "translate(16.6666px, -196.667px)" }}>
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificate;

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
      <style>{`
        @media (max-width: 1279px) { .cert-breadcrumb { display: none !important; } }
      `}</style>
      <div className="cert-breadcrumb w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] pt-[130px] pb-4">
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
      <section className="pt-[100px] lg:pt-10 pb-10 text-center">
        <div className="w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          {/* Decorative furniture illustration / image */}
          <div className="flex justify-center mb-6" style={{ height: "154px" }}>
            <img alt="Certificate hero furniture" className="object-cover w-48 h-48 object-contain" src="/images/cert-hero.png" />
          </div>
          <h1 className="font-heading uppercase font-light mb-6 text-[#3a3530]" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "0.12em", height: "9.1875px" }}>
            ON WHAT TO EXPECT
          </h1>
          <p className="text-sm text-stone-800 leading-relaxed max-w-3xl mx-auto">
            Tapered legs - a signature of midcentury design - complement our{" "}
            <span className="hidden md:inline"><br /></span>
            chair's striking silhouette. The impeccably upholstered seat and{" "}
            <span className="hidden md:inline"><br /></span>
            back is supported by a wood frame, its brushed finish providing{" "}
            <span className="hidden md:inline"><br /></span>
            visual contrast and warmth. Plush foam cushioning provides the{" "}
            <span className="hidden md:inline"><br /></span>
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
          <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 0.5" }}>
            <img
              alt="Workshop inspection"
              className="object-cover w-full h-full"
              src="/images/cert-workshop.jpg"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-black/20" />
            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
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
          {/* Desktop */}
          <div className="hidden lg:flex flex-col gap-8 pl-20">
            <div className="pb-8" style={{ height: "139px" }}>
              <div className="mb-6" style={{ height: "45px", transform: "translate(0px, -41px)" }}>
                <img alt="CTPAT" className="object-cover h-24 md:h-32 object-contain" src="/images/ctpat.png" />
              </div>
              <h2 className="font-heading uppercase font-semibold text-[#2c2c2c] mb-4 text-3xl tracking-wide" style={{ height: "79px", transform: "translate(0px, -35px)" }}>
                CTPAT
              </h2>
              <p className="text-[16px] font-medium text-stone-600 leading-relaxed max-w-lg" style={{ height: "84px", transform: "translate(0px, -102px)" }}>
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>
            <div className="border-t border-stone-200 mb-8"></div>
            <div className="pb-8" style={{ height: "29px", transform: "translate(0px, 3px)" }}>
              <div className="mb-6" style={{ height: "120px", transform: "translate(0px, -145px)" }}>
                <img alt="BSCI" className="object-cover h-24 md:h-32 object-contain" src="/images/bsci.png" />
              </div>
              <h2 className="font-heading uppercase font-semibold text-[#2c2c2c] mb-4 text-3xl tracking-wide" style={{ height: "31px", transform: "translate(0px, -211px)" }}>
                BSCI
              </h2>
              <p className="text-[16px] font-medium text-stone-600 leading-relaxed max-w-lg" style={{ height: "6px", transform: "translate(0px, -230px)" }}>
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>
            <div className="border-t border-stone-200 mb-8" style={{ height: "0px", width: "691px", transform: "translate(0px, -20px)" }}></div>
            <div className="pb-2" style={{ height: "179px" }}>
              <div className="flex items-center gap-4 mb-6" style={{ height: "116px", transform: "translate(0px, -9px)" }}>
                <img alt="SMETA Sedex" className="object-cover h-24 md:h-32 object-contain" src="/images/smeta.png" style={{ height: "94px", transform: "translate(0px, -123px)", width: "139.844px" }} />
              </div>
              <h2 className="font-heading uppercase font-semibold text-[#2c2c2c] mb-4 text-3xl tracking-wide" style={{ height: "39px", transform: "translate(0px, -175px)" }}>
                SMETA
              </h2>
              <p className="text-[16px] font-medium text-stone-600 leading-relaxed max-w-lg" style={{ height: "80px", transform: "translate(0px, -203px)" }}>
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col">
            {/* ─── CTPAT ─── */}
            <div>
              <img alt="CTPAT" className="h-20 object-contain mb-1" src="/images/ctpat.png" />
              <h2 className="font-heading uppercase font-semibold text-[#2c2c2c] mb-1 text-2xl tracking-wide">
                CTPAT
              </h2>
              <p className="text-[14px] font-medium text-stone-600 leading-relaxed">
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>

            <div className="border-t border-stone-200 my-3"></div>

            {/* ─── BSCI ─── */}
            <div>
              <img alt="BSCI" className="h-20 object-contain mb-1" src="/images/bsci.png" />
              <h2 className="font-heading uppercase font-semibold text-[#2c2c2c] mb-1 text-2xl tracking-wide">
                BSCI
              </h2>
              <p className="text-[14px] font-medium text-stone-600 leading-relaxed">
                Tapered legs – a signature of midcentury design – complement our
                chair's striking silhouette. The impeccably upholstered seat and
                back is supported by a wood frame.
              </p>
            </div>

            <div className="border-t border-stone-200 my-3"></div>

            {/* ─── SMETA ─── */}
            <div>
              <img alt="SMETA Sedex" className="h-24 object-contain mb-1" src="/images/smeta.png" />
              <h2 className="font-heading uppercase font-semibold text-[#2c2c2c] mb-1 text-2xl tracking-wide">
                SMETA
              </h2>
              <p className="text-[14px] font-medium text-stone-600 leading-relaxed">
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

import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import useScrollAnimation from "../hooks/useScrollAnimation";

const CERT_MEDIA = {
  ctpat: "/images/ctpat.png",
  bsci: "/images/bsci.png",
  smeta: "/images/smeta.png",
};

const Certificate = () => {
  const { lang } = useLanguage();
  const c = siteCopy.certificatePage;
  const blocks = c.blocks[lang];
  const visibleElements = useScrollAnimation();

  return (
    <div className="w-full bg-white">
      <SEOHead
        title="Certificates"
        description="Happy Furniture holds internationally recognized quality certifications including C-TPAT, BSCI, and SMETA — ensuring ethical sourcing and manufacturing standards."
        canonical="/certificate"
      />
      <style>{`
        @media (max-width: 1279px) { .cert-breadcrumb { display: none !important; } }
      `}</style>
      <div className="cert-breadcrumb w-full px-8 md:px-14 lg:px-24 mx-auto max-w-[1800px] pt-[130px] pb-4">
        <nav className="flex items-center gap-2 text-[12px] md:text-[13px] text-stone-400 tracking-[0.08em] uppercase">
          <Link to="/" className="hover:text-stone-600 transition-colors">
            {c.breadcrumbHome[lang]}
          </Link>
          <span>/</span>
          <span className="text-stone-600">{c.breadcrumbCurrent[lang]}</span>
        </nav>
      </div>

      <section
        className="pt-[64px] lg:pt-10 pb-6 md:pb-10 text-center"
        data-animate
        id="certificate-hero"
      >
        <div
          className={`w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1800px] transform transition-all duration-1000 ease-out ${
            visibleElements.has("certificate-hero")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex justify-center mb-4 md:mb-5">
            <img
              alt=""
              className="object-contain w-40 h-40 md:w-48 md:h-48"
              src="/images/cert-hero.png"
            />
          </div>
          <h1
            className="font-heading uppercase font-normal mb-1 md:mb-1.5 text-[#3a3530] tracking-[0.06em] md:tracking-[0.08em] leading-[1.08]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)" }}
          >
            {c.heroTitle[lang]}
          </h1>
          <p className="text-[15px] md:text-[18px] text-stone-800 font-normal leading-[1.8] tracking-[0.01em] max-w-3xl mx-auto text-left md:text-center">
            {c.heroIntro[lang]}
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24" data-animate id="certificate-blocks">
        <div
          className={`w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1800px] grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8 items-start transform transition-all duration-1000 ease-out ${
            visibleElements.has("certificate-blocks")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-sm w-full h-[180px] sm:h-[225px] lg:h-[350px]">
            <img
              alt=""
              className="object-cover w-full h-full"
              src="/images/cert-workshop.jpg"
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label={siteCopy.common.playVideo[lang]}
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

          <div className="flex flex-col gap-2.5 lg:gap-3">
            {blocks.map((b, index) => (
              <article
                key={b.key}
                className={`${index > 0 ? "pt-2.5 lg:pt-3 border-t border-stone-200" : ""}`}
              >
                <img
                  alt=""
                  className="h-8 md:h-9 object-contain object-left mb-0.5"
                  src={CERT_MEDIA[b.key]}
                />
                <h2 className="font-heading font-normal text-[#2c2c2c] mb-0 text-xl md:text-[22px] tracking-[0.06em] leading-[1.08] uppercase">
                  {b.heading}
                </h2>
                <p className="text-[15px] md:text-[17px] font-normal text-stone-600 leading-[1.8] tracking-[0.01em] max-w-xl">
                  {b.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificate;

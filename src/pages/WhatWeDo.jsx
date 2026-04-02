import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Warehouse, Users, PackageOpen, Factory, Armchair } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";

// ── Image imports ──────────────────────────────────────────────────────────
import heroImg from "/images/about-us/InsideFactoryBackGround.jpg";
import manufacturingImg from "/images/about-us/FurnitureManufacturing.jpg";
import finishingImg from "/images/about-us/Finishing.jpg";

const iconProps = { size: 22, strokeWidth: 1.4 };

const Img = ({ src, alt = "", className = "" }) => (
  <img
    src={src}
    alt={alt}
    className={`w-full h-full object-cover ${className}`}
  />
);

const useScrollAnimation = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};
const promoHoverContent = [
  {
    title: {
      en: "Quality Commitment",
      vi: "Cam kết chất lượng",
    },
    body: {
      en: "Consistent craftsmanship and strict quality control throughout every production stage.",
      vi: "Tay nghề ổn định cùng hệ thống kiểm soát chất lượng nghiêm ngặt trong toàn bộ quá trình sản xuất.",
    },
  },
  {
    title: {
      en: "International Standards",
      vi: "Tiêu chuẩn quốc tế",
    },
    body: {
      en: "Products developed to meet international standards for global furniture markets.",
      vi: "Sản phẩm được phát triển theo các tiêu chuẩn quốc tế cho thị trường nội thất toàn cầu.",
    },
  },
  {
    title: {
      en: "Sustainable Production",
      vi: "Sản xuất bền vững",
    },
    body: {
      en: "Responsible manufacturing with sustainable materials and efficient production practices.",
      vi: "Sản xuất có trách nhiệm với vật liệu bền vững và quy trình tối ưu, thân thiện môi trường.",
    },
  },
  {
    title: {
      en: "Export Compliance",
      vi: "Tuân thủ quy định xuất khẩu",
    },
    body: {
      en: "Fully compliant with export regulations and documentation for international shipments.",
      vi: "Tuân thủ đầy đủ các quy định và chứng từ xuất khẩu cho các thị trường quốc tế.",
    },
  },
];

// ── Page ───────────────────────────────────────────────────────────────────
export default function WhatWeDo() {
  const { lang } = useLanguage();
  const h = siteCopy.home;
  const w = siteCopy.whatWeDoPage;
  const specs = w.specs;
  const visibleElements = useScrollAnimation();

  const stats = useMemo(() => {
    const icons = [
      <Warehouse key="a" {...iconProps} />,
      <Users key="b" {...iconProps} />,
      <PackageOpen key="c" {...iconProps} />,
      <Factory key="d" {...iconProps} />,
      <Armchair key="e" {...iconProps} />,
    ];
    return w.stats[lang].map((s, i) => ({
      icon: icons[i],
      label: s.label,
      detail: s.detail,
    }));
  }, [lang, w]);

  const productRangeLabels = w.productRange[lang];
  const promoCaptions = h.promoCaptions[lang];
  const timberTags = h.timberTags[lang];
  const timberAlts = h.timberAlts[lang];

  const [headerH, setHeaderH] = useState(152);

  useEffect(() => {
    const measure = () => {
      const el = document.querySelector("header");
      if (el) setHeaderH(el.getBoundingClientRect().height);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <main className="bg-white text-primary">
      <SEOHead
        title="What We Do"
        description="Discover Happy Furniture's craft, materials, and production philosophy. From raw timber to finished luxury pieces — built with passion and precision."
        canonical="/what-we-do"
      />
      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden h-[clamp(220px,45vw,580px)] md:h-[70vh] md:min-h-[480px]"
        style={{ marginTop: headerH }}
      >
        <img
          src={heroImg}
          alt={w.heroAlt[lang]}
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[1.5]"
        />
        {/* subtle dark gradient at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-[5%]">
          <h1 className={`hidden md:block font-heading text-white text-4xl md:text-5xl tracking-[0.1em] font-normal leading-[1.08] ${lang === "vi" ? "normal-case" : "uppercase"}`}>
            {w.heroTitle[lang]}
          </h1>
        </div>
      </section>

      {/* ══ FURNITURE MANUFACTURING ═══════════════════════════════════════ */}
      <section className="wwd-mfg-section">
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          <div className="wwd-mfg-inner">
            {/* ── LEFT: green block + photo ── */}
            <div className="wwd-mfg-left">
              <div
                className="wwd-green-block"
              />
              <div
                className="wwd-photo-wrap"
                style={{
                  height: "466.094px", transform: "translate(0px, 34px)",
                }}
              >
                <img
                  src={manufacturingImg}
                  alt={w.mfgPhotoAlt[lang]}
                  className="wwd-mfg-photo" style={{ height: "540.094px", width: "556.438px", transform: "translate(20px, 16px)" }}
                />
              </div>
            </div>

            {/* ── RIGHT: editorial text content ── */}
            <div className="wwd-mfg-right">
              <div className="wwd-mfg-right-inner">
                <h2 className={`wwd-mfg-heading ${lang === "vi" ? "normal-case" : ""}`}>{w.mfgHeading[lang]}</h2>

                <p className="wwd-mfg-intro">
                  {w.mfgIntro[lang]}
                </p>

                <ul className="wwd-stat-list">
                  {stats.map(({ icon, label, detail }) => (
                    <li key={label} className="wwd-stat-item">
                      <span className="wwd-stat-icon">{icon}</span>
                      <div>
                        <p className="wwd-stat-label">{label}</p>
                        <p className="wwd-stat-detail">{detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          3. DARK PROMO — Full-width dark bg + 4-col images beneath
         ══════════════════════════════════════════════ */}
      <section
        className="bg-[#d8d1c9] py-4 md:py-10 lg:h-[498px]"
        data-animate
        id="promo"
      >
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px] lg:h-full">
          {/* Title */}
          <h2

            className={`text-center font-heading text-[#4b4a3f] max-w-[468px] md:max-w-none mx-auto mb-3 md:mb-0 text-[23px] md:text-[clamp(1.5rem,2.4vw,2.1rem)] tracking-[0.04em] md:tracking-[0.07em] leading-[1.18] md:leading-[1.22] transition-all duration-1000 ease-out md:-translate-y-[33.3334px] ${visibleElements.has('promo') ? 'opacity-100' : 'opacity-0'
              } ${lang === 'vi' ? 'normal-case' : 'uppercase'}`}
          >
            <span className="md:hidden">
              <span className="whitespace-nowrap">
                {h.promoLineMobile1[lang]}
              </span>{" "}
              <br />
              {h.promoLineMobile2[lang]} <br />
              {h.promoLineMobile3[lang]}
            </span>
            <span className="hidden md:inline">
              {h.promoLineDesktop1[lang]} <br />
              {h.promoLineDesktop2[lang]}
            </span>
          </h2>

          {/* 4 images */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 lg:h-[290px]">
            {[
              { src: "/images/home/Quality.jpg" },
              { src: "/images/home/InternationalStandard.jpg" },
              { src: "/images/home/SustainableProduction.jpg" },
              { src: "/images/home/ExportRegulations.jpg" },
            ].map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm group h-[175px] md:h-[290px] lg:h-full"
              >
                <Img
                  src={item.src}
                  alt={promoCaptions[i]}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                {/* caption */}
                <p className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center text-white text-[12px] md:text-[18px] font-medium tracking-[0.08em] drop-shadow-md transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                  {promoCaptions[i]}
                </p>

                <div className="absolute inset-0 flex items-end md:items-center justify-center p-3 md:p-5">
                  <div className="w-full max-w-[280px] text-white text-center opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-[12px] md:text-[16px] font-semibold tracking-[0.08em] uppercase">
                      {promoHoverContent[i].title[lang]}
                    </p>
                    <p className="mt-1.5 md:mt-2 text-[11px] md:text-[13px] leading-[1.55] md:leading-[1.7] text-white/90">
                      {promoHoverContent[i].body[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FINISHING / MATERIALS / PRODUCT RANGE ════════════════════════ */}
      <section className="wwd-specs-section lg:h-[692px]">
        <div className="mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full lg:h-full">
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start lg:h-full">
            {/* Ảnh ẩn trên mobile, hiện từ lg trở lên */}
            <div className="hidden lg:block w-full lg:w-[40%] flex-shrink-0 lg:h-full">
              <img
                alt={w.designSketchesAlt[lang]}
                className="w-full h-[500px] lg:h-full object-cover"
                src={finishingImg}
              />
            </div>
            <div className="flex-1 w-full lg:h-full">
              <div className="wwd-specs-columns lg:h-full">
                <div className="wwd-specs-left">
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">{specs.finishingTitle[lang]}</h3>
                    <ul className="wwd-spec-list">
                      {specs.finishingItems[lang].map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">{specs.materialsTitle[lang]}</h3>
                    <ul className="wwd-spec-list">
                      {specs.materialsItems[lang].map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">{specs.specializingTitle[lang]}</h3>
                    <ul className="wwd-spec-list">
                      {specs.specializingItems[lang].map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="wwd-specs-right">
                  <div className="wwd-spec-block">
                    <h3 className="wwd-spec-heading">{specs.productRangeTitle[lang]}</h3>
                    <ul className="wwd-spec-list">
                      {productRangeLabels.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TIMBER MERCHANDISING ═════════════════════════════════════════ */}
      <section className="bg-[#eae4db] lg:bg-[#d6cec6] pt-6 pb-3 lg:pt-14 lg:pb-8 w-full lg:h-[826px]">
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px] lg:h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-12 lg:gap-16 items-center w-full lg:h-full">
            {/* LEFT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center w-full lg:h-full">
              <h2
                className={`font-heading lg:font-heading whitespace-normal lg:whitespace-nowrap mb-2 md:mb-3 text-[#2a2c26] md:text-[#273927] font-normal ${lang === "vi" ? "normal-case" : "uppercase"}`}
                style={{
                  fontSize: "clamp(1.6rem, 6vw, 2.05rem)",
                  letterSpacing: "0.05em",
                  lineHeight: "1.1",
                }}
              >
                {h.timberHeading[lang]}
              </h2>

              <div className="mb-3 md:mb-4 flex flex-col gap-2 md:gap-2.5 text-[12px] md:text-[15px] font-normal md:font-light text-[#303030] md:text-stone-700 text-left">
                {h.timberBody[lang].map((para, idx) => (
                  <p
                    key={idx}
                    className="leading-[1.72] md:leading-[1.82] tracking-[0.01em] text-left md:text-left pr-1 md:pr-0"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* QUALITY */}
              <div className="mb-2 md:mb-4">
                <p className="text-[13px] md:text-xs tracking-[0.08em] md:tracking-[0.16em] font-semibold capitalize md:uppercase text-[#1c1c1c] md:text-stone-500 mb-1.5 md:mb-3">
                  {h.timberQuality[lang]}
                </p>

                <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-3 w-full">
                  {timberTags.map((tag) => (
                    <span
                      key={tag}
                      className="w-full md:w-auto bg-white text-stone-800 md:text-stone-600 text-[11px] md:text-[11px] font-normal md:font-medium normal-case md:uppercase tracking-normal md:tracking-wider py-1.5 md:py-1.5 px-2.5 md:px-6 md:min-w-[85px] text-center rounded-sm shadow-sm flex items-center justify-center"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div className="mb-2.5 md:mb-6">
                <p className="text-[13px] md:text-xs tracking-[0.08em] md:tracking-[0.16em] font-semibold capitalize md:uppercase text-[#1c1c1c] md:text-stone-500 mb-1 md:mb-2">
                  {h.timberSize[lang]}
                </p>
                <p className="text-[13px] md:text-[15px] text-[#303030] md:text-stone-700 font-normal leading-[1.7] tracking-[0.01em]">
                  {h.timberThickness[lang]}
                </p>
              </div>

              {/* BUTTON */}
              <div className="w-full md:w-auto">
                <Link
                  to="/what-we-do"
                  className="inline-flex justify-center items-center whitespace-nowrap w-[160px] md:w-[200px] bg-[#3c4a28] text-white text-[12px] tracking-[0.1em] md:tracking-[0.2em] font-medium uppercase px-4 md:px-8 py-2.5 ring-[0.5px] ring-[#3c4a28] hover:bg-white hover:text-[#3c4a28] hover:ring-stone-400 transition-all duration-200"
                >
                  {h.timberCta[lang]}
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE LAYOUT - 60% */}
            <div className="lg:col-span-3 flex flex-col gap-1.5 md:gap-1 mt-1 md:mt-0 w-full mb-0 pb-0 lg:h-full">
              {/* TOP IMAGE */}
              <div className="w-full h-[190px] sm:h-[360px] lg:h-[420px] overflow-hidden rounded-sm">
                <Img
                  src="/images/home/Timber.jpg"
                  alt={timberAlts[0]}
                  className="w-full h-full object-cover"
                  placeholderBg="#b5a898"
                />
              </div>

              {/* BOTTOM IMAGES */}
              <div className="grid grid-cols-2 gap-2 md:gap-1 w-full">
                <div className="overflow-hidden rounded-sm h-[130px] sm:h-[200px] lg:h-[280px]">
                  <Img
                    src="/images/home/Timber2.jpg"
                    alt={timberAlts[1]}
                    className="w-full h-full object-cover"
                    placeholderBg="#b5a898"
                  />
                </div>
                <div className="overflow-hidden rounded-sm h-[130px] sm:h-[200px] lg:h-[280px]">
                  <Img
                    src="/images/home/Timber3.jpg"
                    alt={timberAlts[2]}
                    className="w-full h-full object-cover"
                    placeholderBg="#b5a898"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

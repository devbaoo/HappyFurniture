import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";

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
  objectFit = "cover",
}) =>
  src ? (
    <img
      src={src}
      alt={alt}
      className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"} ${className}`}
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
    <span className="absolute bottom-4 right-5 font-sans text-white text-[13px] md:text-[15px] tracking-[0.08em] uppercase font-normal drop-shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 text-right leading-none">
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
      <span className="absolute bottom-3 left-4 text-white text-[10px] tracking-[0.14em] uppercase font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
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
            setVisibleElements((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" },
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return visibleElements;
};

const PARTNER_LOGO_SRCS = [
  "/images/home/GlobalPartners.jpg",
  "/images/home/UKPartners.jpg",
  "/images/home/IrelandPartners.jpg",
  "/images/home/ItaliaPartners.jpg",
  "/images/home/AustraliaPartners.jpg",
];

const PartnerLogoCircle = ({ src, index, altPrefix }) => (
  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 shadow-sm md:shadow-none">
    <Img
      src={src}
      alt={`${altPrefix} ${index + 1}`}
      className={
        index === 0
          ? "w-full h-full object-cover"
          : "w-full h-full object-cover origin-center scale-[1.3] sm:scale-[1.27] md:scale-[1.24]"
      }
    />
  </div>
);

const CERT_LOGO_SRCS = [
  "/images/home/CTPAT.jpg",
  "/images/home/Amfori.jpg",
  "/images/home/SMETA.jpg",
  "/images/home/FSC.png",
];

const HERO_VIDEO_SRC =
  "https://res.cloudinary.com/djy7tgscw/video/upload/f_auto,q_auto/happy_video_ux7k1r.mp4";

const Home = () => {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const visibleElements = useScrollAnimation();
  const heroRef = useRef(null);
  const aboutParagraphs = siteCopy.home.aboutBody[lang];
  const certItems = siteCopy.home.certItems[lang];
  const h = siteCopy.home;
  const categoryLabels = h.categoryLabels[lang];
  const featureColumns = h.featureColumns[lang];
  const promoCaptions = h.promoCaptions[lang];
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
  const timberTags = h.timberTags[lang];
  const timberTagRows = [
    timberTags.slice(0, 3),
    timberTags.slice(3, 6),
    timberTags.slice(6, 8),
  ];
  const timberAlts = h.timberAlts[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full">
      <SEOHead
        title="Premium Luxury Furniture"
        description="Make life more comfortable. Discover handcrafted luxury furniture crafted to perfection — beds, sofas, dining sets, and more at Happy Furniture."
        canonical="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Happy Furniture",
          url: "http://happyfurniturenvn.com",
          logo: "http://happyfurniturenvn.com/images/logo-brown.png",
          description: "Premium luxury furniture crafted to perfection.",
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
          },
        }}
      />
      {/* ══════════════════════════════════════════════
          1. HERO — Full-width background image + text + 2 CTA buttons
         ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ minHeight: "100svh" }}
      >
        {/* Background Video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            disablePictureInPicture
            className={`transition-opacity duration-2000 ease-out ${isLoaded ? "opacity-100" : "opacity-0"
              } absolute inset-0 h-full w-full object-cover`}
          >
            <source src={HERO_VIDEO_SRC} type="video/mp4" />
          </video>
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 pb-16 pt-28 text-center md:px-6 md:pb-20 md:pt-40 lg:px-8 lg:pt-48 [@media(max-height:820px)]:pt-32 [@media(max-height:720px)]:pt-36">
          {/* TITLE */}
          <h1
            className={`font-heading text-white font-normal leading-[1.08] md:leading-[1.02] text-center transform transition-all duration-1500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              } text-[20px] sm:text-[24px] md:text-3xl lg:text-[40px] xl:text-[44px] xl:whitespace-nowrap [@media(max-height:820px)]:text-[clamp(1.75rem,3.2vw,2.5rem)] uppercase`}
            style={{
              letterSpacing: "0.05em",
              transitionDelay: "0.3s",
            }}
          >
            <span className="block">{h.heroTitleLine1[lang]}</span>
            <span className="block">{h.heroTitleLine2[lang]}</span>
          </h1>

          {/* DESCRIPTION */}
          <p
            className={`text-white/90 md:text-white/80 text-sm md:text-base mt-4 md:mt-6 max-w-2xl mx-auto leading-[1.8] tracking-[0.01em] transform transition-all duration-1500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "0.6s" }}
          >
            {h.heroSubtitle[lang]}
          </p>

          {/* BUTTON */}
          <div
            className={`mt-8 md:mt-10 transform transition-all duration-1500 ease-out ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "0.9s" }}
          >
            <Link
              to="/product"
              className="inline-flex min-w-[250px] md:min-w-[305px] items-center justify-center whitespace-nowrap bg-[#D8D2C9] px-5 md:px-6 text-gray-800 text-[14px] md:text-[16px] font-medium tracking-[0.12em] uppercase h-[48px] md:h-[52px] hover:brightness-95 hover:scale-105 hover:shadow-lg transition-all duration-300 transform"
            >
              {h.heroCta[lang]}
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          2. OUR PRODUCT CATEGORIES — White bg, 2-row grid
         ══════════════════════════════════════════════ */}
      <section
        className="bg-white py-6 md:py-16 md:mt-0"
        data-animate
        id="categories"
      >
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px]">
          {/* Section title */}
          <div
            className={`text-center mb-6 md:mb-6 transform transition-all duration-1000 ease-out ${visibleElements.has("categories")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
              }`}
          >
            <h2
              className="font-heading text-[20px] md:text-4xl font-normal tracking-[0.08em] text-[#3c4a28] mb-2 md:mb-2 leading-[1.08] uppercase"
            >
              {h.categoriesHeading[lang]}
            </h2>

            <p className="home-categories-subtext text-stone-600 max-w-3xl mx-auto mb-1 md:mb-0">
              {h.categoriesSubBeforeBreak[lang]}
              <br className="hidden md:block" />
              {` ${h.categoriesSubAfterBreak[lang]}`}
            </p>
          </div>

          {/* Top row — 2 large equal images */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-1.5 mb-1.5 transform transition-all duration-1000 ease-out ${visibleElements.has("categories")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "0.2s" }}
          >
            <CategoryCard
              label={categoryLabels[0]}
              src="/images/home/Home-LivingRoom.jpg"
              bg="#3a3530"
              className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]"
            />
            <CategoryCard
              label={categoryLabels[1]}
              src="/images/home/Home-Bedroom.jpg"
              bg="#2e2a26"
              className="aspect-[4/3] md:aspect-[3/2] lg:aspect-[16/11]"
            />
          </div>

          {/* Bottom row — 4 smaller equal images */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-1.5 transform transition-all duration-1000 ease-out ${visibleElements.has("categories")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
              }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <CategoryCard
              label={categoryLabels[2]}
              src="/images/home/Home-Dining.jpg"
              bg="#3d3832"
              className="aspect-square"
            />
            <CategoryCard
              label={categoryLabels[3]}
              src="/images/home/Home-Vanity.jpg"
              bg="#312d29"
              className="aspect-square"
            />
            <CategoryCard
              label={categoryLabels[4]}
              src="/images/home/Home-Youth.jpg"
              bg="#3a3530"
              className="aspect-square"
            />
            <CategoryCard
              label={categoryLabels[5]}
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
      <section
        className="bg-[#d8d1c9] py-4 md:py-10 lg:h-[498px]"
        data-animate
        id="promo"
      >
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px] lg:h-full">
          {/* Title */}
          <h2

            className={`text-center font-heading text-[#3c4a28] max-w-[468px] md:max-w-none mx-auto mb-3 md:mb-0 text-[23px] md:text-[clamp(1.5rem,2.4vw,2.1rem)] tracking-[0.04em] md:tracking-[0.07em] leading-[1.18] md:leading-[1.22] transition-all duration-1000 ease-out md:-translate-y-[33.3334px] ${visibleElements.has('promo') ? 'opacity-100' : 'opacity-0'
              } uppercase`}
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

                {/* default image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-0" />

                {/* green hover overlay */}
                <div className="absolute inset-x-0 bottom-0 h-full bg-[#3c4a28] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0" />

                {/* caption */}
                <p className="absolute bottom-2 md:bottom-3 left-0 right-0 text-center text-white text-[12px] md:text-[18px] font-medium tracking-[0.08em] drop-shadow-md transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-2">
                  {promoCaptions[i]}
                </p>

                <div className="absolute inset-0 flex items-center justify-center p-3 md:p-5">
                  <div className="relative z-10 w-full max-w-[280px] text-white text-center opacity-0 translate-y-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    <p className="text-[11px] md:text-[13px] leading-[1.55] md:leading-[1.7] text-white/95">
                      {promoHoverContent[i].body[lang]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          4. ABOUT THE COMPANY — White bg, 2-col (text left, image right)
         ══════════════════════════════════════════════ */}
      <section className="bg-white py-5 md:py-10">
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-14 items-center">
            {/* Left: Text */}
            <div className="lg:col-span-5 h-full py-1">
              <div className="text-center md:text-left">
                <p className="text-[14px] md:text-[15px] tracking-[0.12em] text-[#3c4a28] mb-2 font-semibold uppercase font-sans">
                  {siteCopy.home.aboutKicker[lang]}
                </p>
                <h2
                  className={`font-heading font-normal text-[#3c4a28] mb-3 md:mb-6 mx-auto md:mx-0 max-w-xl md:max-w-none uppercase ${lang === "vi" ? "leading-[1.3] md:leading-[1.28] pt-1" : "leading-[1.1]"}`}
                  style={{
                    fontSize: "clamp(1.5rem, 2.8vw, 2.45rem)",
                    letterSpacing: lang === "vi" ? "0" : "0.01em",
                  }}
                >
                  {lang === "vi" ? (
                    "Đối tác sản xuất nội thất đáng tin cậy"
                  ) : (
                    <>
                      A TRUSTED FURNITURE
                      <br />
                      MANUFACTURING PARTNER
                    </>
                  )}
                </h2>
              </div>
              {aboutParagraphs.map((text, idx) => (
                <p
                  key={idx}
                  className={`text-[15px] md:text-[16px] text-stone-800 font-normal leading-[1.74] tracking-[0.01em] text-justify md:text-left ${idx < aboutParagraphs.length - 1 ? "mb-3" : ""}`}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Right: image */}
            <div className="lg:col-span-7 overflow-hidden w-full mt-2 md:mt-0">
              <Img
                src="/images/home/AboutCompany.jpg"
                alt={h.aboutImageAlt[lang]}
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
      <section className="bg-white pb-4 md:pb-10 pt-1 md:pt-3 lg:h-[317px]">
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px] lg:h-full lg:flex lg:flex-col">
          <div className="border-t-[3px] border-[#5a564f] mb-0" />

          <div className="bg-[rgb(241,240,238)] lg:flex-1">
            <div className="grid grid-cols-2 md:grid-cols-4 text-center md:divide-x divide-[#c9c5be] lg:h-full">
              {featureColumns.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className={`px-3 md:px-6 lg:px-10 py-3 md:py-5 flex flex-col justify-center lg:h-full ${index < 2 ? "border-b md:border-b-0 border-[#c9c5be]" : ""
                    } ${index % 2 === 0
                      ? "border-r md:border-r-0 border-[#c9c5be]"
                      : ""
                    }`}
                >
                  <h3
                    className="mb-1 md:mb-2 font-semibold"
                    style={{
                      fontSize: "clamp(15px, 4vw, 18px)",
                      letterSpacing: "0.04em",
                      color: "#2b2925",
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="leading-tight md:leading-6 font-medium"
                    style={{
                      fontSize: "clamp(12px, 3vw, 13.5px)",
                      color: "#4a4742",
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
        className="pt-0 md:pt-64 mt-4 md:mt-20 pb-2 md:pb-20 relative bg-transparent"
        data-animate
        id="factory"
        style={{
          backgroundImage: "url(/images/home/InsideFactoryBackGround.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/35 md:bg-black/0 z-0"></div>
        <div className="absolute top-0 left-0 right-0 h-8 md:hidden bg-white z-[1]"></div>

        <div className="w-[92%] md:w-full md:max-w-5xl mx-auto -mt-1 md:mt-0 relative md:absolute left-0 right-0 top-0 md:-top-16 overflow-hidden shadow-xl md:shadow-xl z-10 aspect-[2/1] md:aspect-auto md:h-[520px] bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src="https://www.youtube.com/embed/kB50RuQ-LFk?controls=1&rel=0"
            title="Inside Our Factory"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          <div className="pointer-events-none absolute inset-0 bg-black/20 md:bg-black/20" />
        </div>

        <div className="text-center mt-1 md:mt-56 px-5 md:px-6 py-3 md:py-0 relative z-10 container mx-auto">
          <h2
            className="font-heading text-[#f4ecd8] md:text-white tracking-[0.05em] md:tracking-[0.08em] mb-2 md:mb-5 text-[26px] md:text-[clamp(1.6rem,6vw,2.5rem)] leading-[1.04] whitespace-nowrap font-normal uppercase"
          >
            {h.factoryHeading[lang]}
          </h2>

          <p className="text-[#e5e5e5] md:text-white/60 text-[10px] md:text-sm max-w-[330px] md:max-w-3xl mx-auto leading-[1.7] tracking-[0.01em]">
            {h.factorySub[lang]}
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          7. PARTNERS / CERTIFICATIONS — White bg, centered logos row
         ══════════════════════════════════════════════ */}
      <section className="bg-white pt-3 pb-4 md:py-7">
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1800px]">
          {/* ===== Partners ===== */}
          <div className="text-center mb-4 md:mb-7">
            <h3 className={`text-[14px] sm:text-base md:text-lg font-semibold text-[#3c4a28] mb-2 md:mb-4 font-sans tracking-[0.1em] uppercase`}>

              {h.partnersHeading[lang]}
            </h3>

            <div className="w-32 md:w-48 h-[2px] bg-stone-300 mx-auto mb-2 md:mb-5"></div>

            {/* Mobile / tablet: hàng 3 + hàng 2; md+: một hàng như cũ */}
            <div className="md:hidden flex flex-col items-center gap-2.5 sm:gap-3">
              <div className="flex justify-center gap-3 sm:gap-5">
                {PARTNER_LOGO_SRCS.slice(0, 3).map((src, i) => (
                  <PartnerLogoCircle
                    key={src}
                    src={src}
                    index={i}
                    altPrefix={h.partnerLogoAlt[lang]}
                  />
                ))}
              </div>
              <div className="flex justify-center gap-3 sm:gap-5">
                {PARTNER_LOGO_SRCS.slice(3, 5).map((src, i) => (
                  <PartnerLogoCircle
                    key={src}
                    src={src}
                    index={i + 3}
                    altPrefix={h.partnerLogoAlt[lang]}
                  />
                ))}
              </div>
            </div>
            <div className="hidden md:flex justify-center gap-8">
              {PARTNER_LOGO_SRCS.map((src, i) => (
                <PartnerLogoCircle
                  key={src}
                  src={src}
                  index={i}
                  altPrefix={h.partnerLogoAlt[lang]}
                />
              ))}
            </div>
          </div>

          {/* ===== Certifications ===== */}
          <div className="text-center">
            <h3 className="text-[15px] sm:text-base md:text-lg font-semibold text-[#3c4a28] mb-2 md:mb-4 font-sans tracking-[0.1em] uppercase">
              {siteCopy.home.certificationsHeading[lang]}
            </h3>

            <div className="w-48 md:w-80 h-[2px] bg-stone-300 mx-auto mb-2 md:mb-5"></div>

            <p className="text-[15px] md:text-[17px] text-stone-700 font-normal leading-[1.8] tracking-[0.01em] max-w-3xl mx-auto mb-4 md:mb-6 text-left md:text-center">
              {siteCopy.home.certificationsIntro[lang]}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-items-center max-w-3xl mx-auto gap-3 sm:gap-5 md:gap-8">
              {CERT_LOGO_SRCS.map((src, i) => (
                <Img
                  key={src}
                  src={src}
                  alt={certItems[i]?.title ?? "FSC"}
                  className="h-8 sm:h-10 md:h-12"
                  objectFit="contain"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          8. TIMBER MERCHANDISING — Beige bg, 2-col: text left, image grid right
         ══════════════════════════════════════════════ */}
      <section className="bg-[#eae4db] lg:bg-[#d6cec6] pt-6 pb-3 lg:pt-14 lg:pb-8 w-full lg:h-[826px]">
        <div className="w-full px-2 md:px-14 lg:px-24 mx-auto max-w-[1700px] lg:h-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 md:gap-12 lg:gap-16 items-center w-full lg:h-full">
            {/* LEFT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center w-full lg:h-full">
              <h2
                className="font-heading lg:font-heading whitespace-normal lg:whitespace-nowrap mb-2 md:mb-3 text-[#3c4a28] font-normal uppercase"
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

                <div className="flex w-full max-w-[560px] flex-col gap-1.5 md:gap-2">
                  {timberTagRows.map((row, rowIndex) => (
                    <div
                      key={`timber-row-${rowIndex}`}
                      className={`grid gap-1.5 md:gap-2 ${row.length === 3 ? "grid-cols-3" : "grid-cols-2"
                        }`}
                    >
                      {row.map((tag) => (
                        <span
                          key={tag}
                          className={`w-full bg-white text-stone-800 md:text-stone-600 text-center rounded-sm shadow-sm flex items-center justify-center min-h-[28px] md:min-h-[30px] px-2 py-0.1 leading-[1.15] tracking-[0.01em] font-medium ${tag === "FAS - First and Second"
                            ? "text-[12px] md:text-[11px]"
                            : "text-[13px] md:text-[12px]"
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
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

      {/* ══════════════════════════════════════════════
          9. BE THE FIRST TO KNOW (Newsletter) — 2-col: form left, image right
         ══════════════════════════════════════════════ */}
      <section className="bg-[#fbfcfa] md:bg-white pt-2 pb-7 md:pt-20 md:pb-16 font-sans">
        <div className="w-full px-2 md:px-14 lg:px-24 md:mx-auto md:max-w-[1700px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-7 lg:gap-16 items-center lg:h-[365px] lg:-translate-y-[35px]">
            {/* LEFT IMAGE - 60% */}
            <div className="hidden lg:block lg:col-span-3 overflow-hidden rounded-sm shadow-md h-[360px] lg:h-[420px]">
              <Img
                src="/images/home/Furniture.jpg"
                alt={h.newsletterImageAlt[lang]}
                className="w-full h-full object-cover"
                placeholderBg="#d1cec7"
              />
            </div>

            {/* RIGHT CONTENT - 40% */}
            <div className="lg:col-span-2 flex flex-col justify-center w-full min-w-0">
              <h2
                className="font-heading mb-3 md:mb-3 text-[#3c4a28] whitespace-normal md:whitespace-nowrap font-normal uppercase"
                style={{
                  fontSize: "clamp(1.55rem, 5.5vw, 1.8rem)",
                  letterSpacing: "0.06em",
                  lineHeight: "1.12",
                }}
              >
                {h.newsletterTitleLine1[lang]} <br />
                {h.newsletterTitleLine2[lang]}
              </h2>

              <p className="text-[12px] md:text-[17px] font-normal text-[#303030] md:text-stone-500 mb-5 max-w-full md:max-w-[500px] leading-[1.75] tracking-[0.01em]">
                {h.newsletterBody[lang]}
              </p>

              {/* EMAIL FORM */}
              <div className="flex w-full mb-5 md:mb-4">
                <input
                  type="email"
                  placeholder={h.newsletterEmailPh[lang]}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 min-w-0 px-4 md:px-5 h-[44px] md:h-[42px] text-[13px] md:text-[14px]
                                                border border-stone-300
                                                bg-white
                                                outline-none
                                                placeholder:text-stone-400
                                                text-stone-700 font-medium"
                />
                <button
                  type="button"
                  className="shrink-0 md:ml-2 bg-[#314028] md:bg-[#2d3a2d] text-white text-[13px] md:text-[13px]
                                                tracking-wide md:tracking-widest capitalize md:uppercase font-medium
                                                px-7 md:px-5 h-[44px] md:h-[42px]
                                                hover:bg-[#222c22] transition duration-300"
                >
                  {h.newsletterSend[lang]}
                </button>
              </div>

              {/* CONTACT LINK */}
              <Link
                to="/contact"
                className="flex items-center gap-4 text-[#314028] md:text-[#2d3a2d] hover:opacity-80 transition cursor-pointer group w-fit"
              >
                <span className="w-8 h-[1px] bg-[#314028] md:bg-[#2d3a2d] transition-all group-hover:w-10" />
                <span className="text-[14px] md:text-[13px] leading-none capitalize md:uppercase tracking-normal md:tracking-widest font-semibold md:font-medium">
                  {h.newsletterContactLink[lang]}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

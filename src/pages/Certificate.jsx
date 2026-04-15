import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";
import SEOHead from "../components/SEOHead";
import useScrollAnimation from "../hooks/useScrollAnimation";
import PageBreadcrumb from "../components/layout/PageBreadcrumb";
import { certificateService } from "../services/certificate.service";

const CERT_MEDIA = {
  ctpat: "/images/ctpat.png",
  bsci: "/images/bsci.png",
  smeta: "/images/smeta.png",
};

const Certificate = () => {
  const { lang } = useLanguage();
  const c = siteCopy.certificatePage;
  const visibleElements = useScrollAnimation();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    certificateService
      .getActiveCertificates()
      .then((data) => {
        setCertificates(data);
      })
      .catch(() => {
        // Silently fail — show nothing if API is down
      })
      .finally(() => setLoading(false));
  }, []);

  const getName = (cert) =>
    lang === "vi" ? cert.nameVi : cert.nameEn || cert.nameVi;

  const getDescription = (cert) =>
    lang === "vi"
      ? cert.descriptionVi
      : cert.descriptionEn || cert.descriptionVi;

  return (
    <div className="w-full bg-white">
      <SEOHead
        title="Certificates"
        description="Happy Furniture holds internationally recognized quality certifications including C-TPAT, BSCI, and SMETA — ensuring ethical sourcing and manufacturing standards."
        canonical="/certificate"
      />
      <PageBreadcrumb
        items={[
          { label: siteCopy.nav[lang].home, to: "/" },
          { label: siteCopy.nav[lang].certificate },
        ]}
      />
      <section
        className="pt-4 md:pt-0 pb-6 md:pb-10 text-center"
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
          <h1
            className="font-heading uppercase font-normal mb-1 md:mb-1.5 text-[#3c4a28] tracking-[0.06em] md:tracking-[0.08em] leading-[1.08]"
            style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.1rem)" }}
          >
            {c.heroTitle[lang]}
          </h1>
          <p className="text-[15px] md:text-[18px] text-stone-800 font-normal leading-[1.8] tracking-[0.01em] max-w-3xl mx-auto text-left md:text-center">
            {c.heroIntro[lang]}
          </p>
        </div>
        {/* Mobile/Tablet — image below the content */}
        <div className="lg:hidden order-2 lg:order-none relative overflow-hidden rounded-sm w-full h-[160px] sm:h-[200px] md:h-[250px] bg-white mt-4 md:mt-6">
          <img
            src="/images/certificates/chứng chỉ.jpg"
            alt="Happy Furniture certificates"
            className="h-full w-full object-contain"
          />
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
          {/* Left column — combined image (desktop only) */}
          <div className="hidden lg:block relative overflow-hidden rounded-sm w-full h-[350px] bg-white">
            <img
              src="/images/certificates/chứng chỉ.jpg"
              alt="Happy Furniture certificates"
              className="h-full w-full object-contain"
            />
          </div>

          {/* Right column — certificate list */}
          <div className="flex flex-col gap-2.5 lg:gap-3">
            {loading
              ? /* Skeleton loading */
                Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse border-t border-stone-200 pt-2.5 lg:pt-3"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="h-8 w-20 bg-gray-200 rounded" />
                      <div className="h-5 w-48 bg-gray-200 rounded" />
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded" />
                  </div>
                ))
              : certificates.length > 0
                ? /* Dynamic certificates from API */
                  certificates.map((cert, index) => (
                    <article
                      key={cert.id}
                      className={`${
                        index > 0
                          ? "pt-2.5 lg:pt-3 border-t border-stone-200"
                          : ""
                      }`}
                    >
                      {/* Logo */}
                      {cert.logoUrl && (
                        <img
                          alt={cert.nameVi}
                          className="h-8 md:h-9 object-contain object-left mb-0.5"
                          src={cert.logoUrl}
                        />
                      )}

                      {/* Title */}
                      <h2 className="font-heading font-normal text-[#2c2c2c] mb-0 text-xl md:text-[22px] tracking-[0.06em] leading-[1.08] uppercase">
                        {getName(cert)}
                      </h2>

                      {/* Description */}
                      {getDescription(cert) && (
                        <p className="text-[15px] md:text-[17px] font-normal text-stone-600 leading-[1.8] tracking-[0.01em] max-w-xl">
                          {getDescription(cert)}
                        </p>
                      )}
                    </article>
                  ))
                : /* Fallback: static blocks from siteCopy */
                  c.blocks[lang].map((b, index) => (
                    <article
                      key={b.key}
                      className={`${
                        index > 0
                          ? "pt-2.5 lg:pt-3 border-t border-stone-200"
                          : ""
                      }`}
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

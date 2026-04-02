import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import SEOHead from "../components/SEOHead";
import useScrollAnimation from "../hooks/useScrollAnimation";
import { useLanguage } from "../context/LanguageContext";
import { siteCopy } from "../i18n/siteCopy";

const SectionHeading = ({ children, light = false, className = "" }) => (
  <h2
    className={`font-heading font-normal uppercase text-2xl md:text-3xl leading-[1.08] tracking-[0.08em] ${light ? "text-white" : "text-primary"} ${className}`}
  >
    {children}
  </h2>
);

const OrderDelivery = () => {
  const { lang } = useLanguage();
  const [headerH, setHeaderH] = useState(0);
  const visibleElements = useScrollAnimation();
  const o = siteCopy.orderDeliveryPage;

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
    <div className="overflow-x-hidden">
      <SEOHead
        title={o.seoTitle[lang]}
        description={o.seoDescription[lang]}
        canonical="/order-delivery"
      />

      <section
        className="bg-white py-6 md:py-24"
        data-animate
        id="order-delivery-delivery"
        style={{ marginTop: headerH, paddingTop: "0.1rem" }}
      >
        <div className="mx-auto mb-1 w-[calc(100%-4rem)] max-w-[1800px] border-t border-[#d8d6d1] md:mb-12 md:w-[calc(100%-7rem)] lg:w-[calc(100%-12rem)]" />
        <div
          className={`mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full transform transition-all duration-1000 ease-out ${
            visibleElements.has("order-delivery-delivery")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <div className="flex flex-col md:pt-10 lg:pt-14">
              <div className="bg-[#3b442b] text-white px-4 py-3 md:px-5 md:py-4 mb-4 md:mb-5 w-full">
                <SectionHeading
                  light
                  className="mb-1.5 text-xl md:text-2xl mt-0"
                >
                  {o.deliveryTitle[lang]}
                </SectionHeading>
                <p className="font-sans max-w-none text-[15px] md:text-[16px] text-white mb-0 leading-[1.35] tracking-[0.01em]">
                  {o.deliveryIntro[lang]}
                </p>
              </div>

              <ul className="space-y-4 list-none pl-0">
                {o.deliveryBullets[lang].map((item) => (
                  <li
                    key={item.strong}
                    className="font-sans flex items-start gap-3 text-[15px] md:text-[16px] text-black leading-[1.72] tracking-[0.01em]"
                  >
                    <span
                      className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-black"
                      aria-hidden
                    />
                    <span>
                      {item.prefix} <strong>{item.strong}</strong>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative hidden w-full min-h-[220px] md:block md:h-full md:min-h-0">
              <img
                src="/images/order/order-02.jpg"
                alt={o.deliveryImageAlt[lang]}
                className="w-full h-full min-h-[220px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-[#f5f5f3] overflow-hidden"
        data-animate
        id="order-delivery-order"
      >
        <div
          className={`flex flex-col md:h-[455px] md:flex-row md:items-stretch transform transition-all duration-1000 ease-out ${
            visibleElements.has("order-delivery-order")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative hidden w-full min-h-[260px] md:block md:h-full md:w-1/2">
            <img
              src="/images/order/order-03.jpg"
              alt={o.orderImageAlt[lang]}
              className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_center]"
              style={{ height: "582px", transform: "translate(0px, -127px)" }}
            />
            <div
              className="absolute bottom-0 right-0 flex items-center justify-center w-[72%] sm:w-[58%] md:w-auto md:min-w-[340px] md:max-w-[360px] bg-[#35462a] px-4 py-3 md:px-7 md:py-3"
              style={{
                width: "313.484px",
                minHeight: "57.25px",
              }}
            >
              <p
                className="font-sans text-[11px] sm:text-[12px] md:text-[13px] text-white tracking-[0.01em] leading-[1.25] text-center md:whitespace-nowrap"
              >
                {o.orderImageBadge[lang]}
              </p>
            </div>
          </div>

          <div className="flex items-center bg-[#f5f5f3] px-4 py-8 md:w-1/2 md:px-6 md:py-8 lg:px-8">
            <div className="flex w-full max-w-[760px] flex-col justify-center">
              <div className="max-w-none md:max-w-[560px]">
                <h2
                  className="font-heading font-normal uppercase text-[32px] md:text-[36px] text-primary mb-6 tracking-[0.08em] leading-none"
                  style={{ height: "23px", transform: "translate(0px, 13px)" }}
                >
                  {o.orderTitle[lang]}
                </h2>
                <p className="font-sans max-w-none text-[15px] md:text-[16px] text-secondary mb-1 leading-[1.35] tracking-[0.01em]">
                  {o.orderIntro[lang]}
                </p>
                <p className="font-sans max-w-none text-[15px] md:text-[16px] text-secondary mb-0 leading-[1.35] tracking-[0.01em]">
                  {o.orderBody[lang]}
                </p>
              </div>

              <div className="mt-4 grid w-full max-w-none grid-cols-2 gap-2 md:mt-5 md:max-w-[560px] md:gap-3">
                <img
                  src="/images/order/order-04.jpg"
                  alt={o.orderGalleryAlt[lang][0]}
                  className="aspect-[1.75/1] w-full object-cover object-center md:h-[164px] md:aspect-auto md:-translate-y-[11px]"
                />
                <img
                  src="/images/order/order-05.jpg"
                  alt={o.orderGalleryAlt[lang][1]}
                  className="aspect-[1.75/1] w-full object-cover object-center md:h-[164px] md:aspect-auto md:-translate-y-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="bg-white pt-4 pb-6 md:pt-[4.5rem] md:pb-16"
        data-animate
        id="order-delivery-oem"
      >
        <Container>
          <div
            className={`transform transition-all duration-1000 ease-out ${
              visibleElements.has("order-delivery-oem")
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="mx-auto mb-1 max-w-[760px] text-center md:mb-3">
              <SectionHeading className="mb-3 text-[28px] md:text-[42px] tracking-[0.04em]">
                {o.oemTitle[lang]}
              </SectionHeading>
              <p className="mx-auto max-w-[900px] font-sans text-[12px] md:text-[15px] text-gray-800 font-normal leading-[1.38] tracking-[0.01em]">
                {o.oemIntro[lang]}
              </p>
            </div>

            <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-1 md:gap-2">
              <img
                src="/images/order/order-06.jpg"
                alt={o.oemGalleryAlt[lang][0]}
                className="aspect-square w-full object-cover object-center"
              />
              <img
                src="/images/order/order-07.jpg"
                alt={o.oemGalleryAlt[lang][1]}
                className="aspect-square w-full object-cover object-center"
              />
              <img
                src="/images/order/order-08.jpg"
                alt={o.oemGalleryAlt[lang][2]}
                className="aspect-square w-full object-cover object-center"
              />
            </div>
          </div>
        </Container>
      </section>

      <section
        className="relative overflow-hidden py-16 md:py-20"
        data-animate
        id="order-delivery-packaging"
        style={{
          backgroundImage: "url('/images/order/order-09.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div
          className={`relative mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full transform transition-all duration-1000 ease-out ${
            visibleElements.has("order-delivery-packaging")
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="font-heading font-normal uppercase whitespace-nowrap text-[20px] md:text-3xl text-white mb-2 md:mb-2.5 tracking-[0.03em] md:tracking-[0.08em] leading-[1.08]">
              {o.packagingTitle[lang]}
            </h2>
            <p className="mx-auto w-full max-w-[760px] font-sans text-[14px] md:w-[750px] md:text-[18px] text-white/100 leading-[1.45] tracking-[0.01em] md:-translate-x-[39px]">
              {o.packagingIntro[lang]}
            </p>
          </div>

          <div className="mx-auto grid max-w-[1020px] grid-cols-2 justify-items-center gap-3 md:gap-x-4 md:gap-y-3">
            {o.packagingCards[lang].map((card) => (
              <div
                key={card.title}
                className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5"
              >
                <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                  {card.title}
                </h3>
                <p className="order-packaging-card-body mt-1 md:mt-1.5 font-sans max-w-none text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDelivery;

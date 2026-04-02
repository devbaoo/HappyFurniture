import { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import SEOHead from "../components/SEOHead";

/* ─── static data ──────────────────────────────────────────────── */

/* ─── sub-components ───────────────────────────────────────────── */

/** Reusable section heading — uppercase serif, tracked */
const SectionHeading = ({ children, light = false, className = "" }) => (
  <h2
    className={`font-heading font-normal uppercase text-2xl md:text-3xl leading-[1.08] tracking-[0.08em] ${light ? "text-white" : "text-primary"} ${className}`}
  >
    {children}
  </h2>
);

/** Generic gray image placeholder */
const ImgPlaceholder = ({ className = "", tone = "mid" }) => {
  const bg =
    tone === "dark"
      ? "bg-[#1a1a1a]"
      : tone === "light"
        ? "bg-[#d4d4d4]"
        : "bg-[#aaaaaa]";
  return <div className={`${bg} ${className}`} />;
};

/* ─── page ─────────────────────────────────────────────────────── */
const OrderDelivery = () => {
  const [headerH, setHeaderH] = useState(0);

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
        title="Order & Delivery"
        description="Learn about Happy Furniture's ordering process, shipping options, lead times, and delivery policies. Contact us to place a custom order today."
        canonical="/order-delivery"
      />

      {/* ══ DELIVERY ══════════════════════════════════════════════ */}
      <section
        className="bg-white py-6 md:py-24"
        style={{ marginTop: headerH, paddingTop: "0.1rem" }}
      >
        <div className="mx-auto mb-1 w-[calc(100%-4rem)] max-w-[1800px] border-t border-[#d8d6d1] md:mb-12 md:w-[calc(100%-7rem)] lg:w-[calc(100%-12rem)]" />
        <div className="mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <div className="flex flex-col md:pt-10 lg:pt-14">
              <div className="bg-[#3b442b] text-white px-4 py-3 md:px-5 md:py-4 mb-4 md:mb-5 w-full">
                <SectionHeading
                  light
                  className="mb-1.5 text-xl md:text-2xl mt-0"
                >
                  Delivery
                </SectionHeading>
                <p className="font-sans text-white text-sm xl:text-[15px] text-justify leading-[1.55] md:leading-[1.6] tracking-[0.01em]">
                  Our goal is to achieve optimal delivery efficiency, which
                  means the shortest delivery time while minimizing delivery
                  error. We are able to ship year round, except for Lunar New
                  Year. To actively arrange orders, Happy always notice
                  customers three months ahead.
                </p>
              </div>
              <ul className="space-y-4 list-none pl-0">
                <li className="font-sans flex items-start gap-3 text-sm text-black leading-[1.72] tracking-[0.01em]">
                  <span
                    className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-black"
                    aria-hidden
                  />
                  <span>
                    Samples are usually made within{" "}
                    <strong>15 to 30 days</strong>
                  </span>
                </li>
                <li className="font-sans flex items-start gap-3 text-sm text-black leading-[1.72] tracking-[0.01em]">
                  <span
                    className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-black"
                    aria-hidden
                  />
                  <span>
                    New order lead time takes <strong>60 to 75 days</strong>
                  </span>
                </li>
                <li className="font-sans flex items-start gap-3 text-sm text-black leading-[1.72] tracking-[0.01em]">
                  <span
                    className="mt-[7px] w-[5px] h-[5px] shrink-0 rounded-full bg-black"
                    aria-hidden
                  />
                  <span>
                    Reorder takes <strong>45 to 50 days</strong>
                  </span>
                </li>
              </ul>
            </div>
            <div className="relative hidden w-full min-h-[220px] md:block md:h-full md:min-h-0">
              <img
                src="/images/order/order-02.jpg"
                alt="Happy Furniture delivery and shipping logistics"
                className="w-full h-full min-h-[220px] object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ ORDER ═════════════════════════════════════════════════ */}
      <section className="bg-[#f5f5f3] overflow-hidden">
        <div className="flex flex-col md:h-[400px] md:flex-row md:items-stretch">
          <div className="relative hidden w-full min-h-[260px] md:block md:h-full md:w-1/2">
            <img
              src="/images/order/order-03.jpg"
              alt="Happy Furniture product showroom display"
              className="absolute inset-0 h-full w-full object-cover object-center md:object-[center_center]"
              style={{ height: "557px", transform: "translate(0px, -127px)" }}
            />
            <div
              className="absolute bottom-0 right-0 w-[72%] sm:w-[58%] md:w-auto md:min-w-[340px] md:max-w-[360px] bg-[#35462a] px-4 py-3 md:px-7 md:py-3"
              style={{
                width: "313.484px",
                height: "57.25px",
                transform: "translate(0px, 7px)",
              }}
            >
              <p
                className="font-sans text-[11px] sm:text-[12px] md:text-[13px] text-white tracking-[0.01em] leading-[1.25] text-center md:whitespace-nowrap"
                style={{ height: "23.25px", transform: "translate(0px, -7px)" }}
              >
                There are approximately 500 designs
              </p>
            </div>
          </div>
          <div className="flex items-center bg-[#f5f5f3] px-4 py-6 md:w-1/2 md:px-6 md:py-6 lg:px-8">
            <div className="flex w-full max-w-[760px] flex-col justify-center">
              <div className="max-w-none md:max-w-[560px]">
                <h2
                  className="font-heading font-normal uppercase text-[32px] md:text-[36px] text-primary mb-6 tracking-[0.08em] leading-none"
                  style={{ height: "23px", transform: "translate(0px, 13px)" }}
                >
                  Order
                </h2>
                <p className="font-sans max-w-none text-[15px] md:text-[16px] text-secondary mb-4 leading-[1.35] tracking-[0.01em]">
                  Our current and past product ranges are displayed in our
                  showroom for your references.
                </p>
                <p className="font-sans max-w-none text-[15px] md:text-[16px] text-secondary mb-0 leading-[1.35] tracking-[0.01em]">
                  Orders made for any of these designs are subject to MOQ, which
                  is at least 200 for chairs and 50 for other products.
                </p>
              </div>
              <div className="mt-2.5 grid w-full max-w-none grid-cols-2 gap-2 md:mt-3 md:max-w-[560px] md:gap-3">
                <img
                  src="/images/order/order-04.jpg"
                  alt="Furniture design sample"
                  className="aspect-[1.75/1] w-full object-cover object-center md:aspect-[2.35/1]"
                />
                <img
                  src="/images/order/order-05.jpg"
                  alt="Furniture design sample"
                  className="aspect-[1.75/1] w-full object-cover object-center md:aspect-[2.35/1]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ OEM ═══════════════════════════════════════════════════ */}
      <section className="bg-white pt-4 pb-6 md:pt-[4.5rem] md:pb-16">
        <Container>
          {/* centered text block */}
          <div className="mx-auto mb-1 max-w-[760px] text-center md:mb-3">
            <SectionHeading className="mb-3 text-[28px] md:text-[42px] tracking-[0.04em]">
              OEM
            </SectionHeading>
            <p className="mx-auto max-w-[900px] font-sans text-[12px] md:text-[15px] text-gray-800 font-normal leading-[1.38] tracking-[0.01em]">
              Our experienced and highly skilled designers can assist clients
              from product customisation through to furniture structure. Our
              team members have been running the modification running 30 times
              to provide our clients with complete technical drawings within 3–5
              days.
            </p>
          </div>

          {/* 3-column image row */}
          <div className="mx-auto grid max-w-[1180px] grid-cols-3 gap-1 md:gap-2">
            <img
              src="/images/order/order-06.jpg"
              alt="Furniture crafting process"
              className="aspect-square w-full object-cover object-center"
            />
            <img
              src="/images/order/order-07.jpg"
              alt="OEM chair prototype in workshop"
              className="aspect-square w-full object-cover object-center"
            />
            <img
              src="/images/order/order-08.jpg"
              alt="Furniture material and detail close-up"
              className="aspect-square w-full object-cover object-center"
            />
          </div>
        </Container>
      </section>

      {/* ══ PACKAGING AND DISPATCH ════════════════════════════════ */}
      <section
        className="relative overflow-hidden py-16 md:py-20"
        style={{
          backgroundImage: "url('/images/order/order-09.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative mx-auto max-w-[1800px] px-2 md:px-14 lg:px-24 w-full">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="font-heading font-normal uppercase whitespace-nowrap text-[20px] md:text-3xl text-white mb-2 md:mb-2.5 tracking-[0.03em] md:tracking-[0.08em] leading-[1.08]">
              Packaging and Dispatch
            </h2>
            <p className="mx-auto w-full max-w-[760px] font-sans text-[14px] md:w-[750px] md:text-[18px] text-white/100 leading-[1.45] tracking-[0.01em] md:-translate-x-[39px]">
              We are committed to offering our clients international standards
              packaging and dispatch process are affiliated to various
              international accredited consulting.
            </p>
          </div>
          <div className="mx-auto grid max-w-[1020px] grid-cols-2 justify-items-center gap-3 md:gap-x-4 md:gap-y-3">
            <div className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5">
              <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                Standard Transit Packaging
              </h3>
              <p className="mt-1 md:mt-1.5 font-sans text-[11px] md:text-[15px] leading-[1.3] text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                Designed to meet ISTA 1A standards, ensuring reliable protection
                throughout transportation.
              </p>
            </div>
            <div className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5">
              <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                Advanced Transit Testing
              </h3>
              <p className="mt-1 md:mt-1.5 font-sans text-[11px] md:text-[15px] leading-[1.3] text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                Tested to ISTA 3A standards to ensure durability for e-commerce
                distribution.
              </p>
            </div>
            <div className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5">
              <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                E-commerce Packaging
              </h3>
              <p className="mt-1 md:mt-1.5 font-sans text-[11px] md:text-[15px] leading-[1.3] text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                Optimized to withstand parcel shipping and multi-stop handling
                conditions.
              </p>
            </div>
            <div className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5">
              <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                Flexible Packaging Standards
              </h3>
              <p className="mt-1 md:mt-1.5 font-sans text-[11px] md:text-[15px] leading-[1.3] text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                Customized packaging solutions balancing quality, safety, and
                cost efficiency.
              </p>
            </div>
            <div className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5">
              <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                Client-specific Solutions
              </h3>
              <p className="mt-1 md:mt-1.5 font-sans text-[11px] md:text-[15px] leading-[1.3] text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                Tailored packaging solutions based on product characteristics
                and target markets.
              </p>
            </div>
            <div className="w-full bg-[#3C4A28]/95 border border-[#3C4A28] px-3 py-3 text-center text-white cursor-default md:h-[120px] md:w-[496px] md:px-6 md:py-4 lg:h-auto lg:min-h-0 lg:py-3.5">
              <h3 className="font-sans text-[14px] md:text-[19px] font-semibold leading-[1.2] md:h-[43.7969px] md:-translate-y-[21px] lg:h-auto lg:translate-y-0">
                Packaging Design &amp; Approval
              </h3>
              <p className="mt-1 md:mt-1.5 font-sans text-[11px] md:text-[15px] leading-[1.3] text-white/95 md:h-[82px] md:-translate-y-[43px] lg:h-auto lg:translate-y-0">
                Detailed packaging design and strict approval process before
                mass production.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderDelivery;
